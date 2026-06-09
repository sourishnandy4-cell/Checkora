#!/bin/bash
# Checkora Icon Generation Script
# Usage: Place your 1024x1024 source icon as "icon-source.png" in this directory,
#        then run: ./generate-icons.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SOURCE_ICON="$SCRIPT_DIR/icon-source.png"

if [ ! -f "$SOURCE_ICON" ]; then
    echo "❌ Error: Place your 1024x1024 source icon as 'icon-source.png' in this directory"
    echo "   Expected path: $SOURCE_ICON"
    exit 1
fi

echo "🎨 Checkora Icon Generator"
echo "=========================="
echo ""

# ──────────────────────────────────────────────
# 0. Remove outer white background (flood-fill)
# ──────────────────────────────────────────────
echo "🧹 Removing white background…"
if command -v python3 &> /dev/null; then
    if python3 -c "import PIL" 2>/dev/null; then
        python3 "$SCRIPT_DIR/remove-background.py"
        echo "   ✅ Background removed from icon-source.png"
    else
        echo "   ⚠️  Pillow not installed — skipping BG removal."
        echo "      Run: pip3 install Pillow --break-system-packages"
    fi
else
    echo "   ⚠️  python3 not found — skipping BG removal."
fi
echo ""

# ──────────────────────────────────────────────
# 1. macOS ICNS
# ──────────────────────────────────────────────
echo "📱 Generating macOS icons..."

ICONSET_DIR="$SCRIPT_DIR/icon.iconset"
mkdir -p "$ICONSET_DIR"

# For macOS, we need the icon baked into a rounded rectangle
# First create the rounded rectangle mask
sips -z 1024 1024 "$SOURCE_ICON" --out "$ICONSET_DIR/source_1024.png" 2>/dev/null

# Generate all required sizes for .icns
sips -z 16 16     "$SOURCE_ICON" --out "$ICONSET_DIR/icon_16x16.png" 2>/dev/null
sips -z 32 32     "$SOURCE_ICON" --out "$ICONSET_DIR/icon_16x16@2x.png" 2>/dev/null
sips -z 32 32     "$SOURCE_ICON" --out "$ICONSET_DIR/icon_32x32.png" 2>/dev/null
sips -z 64 64     "$SOURCE_ICON" --out "$ICONSET_DIR/icon_32x32@2x.png" 2>/dev/null
sips -z 128 128   "$SOURCE_ICON" --out "$ICONSET_DIR/icon_128x128.png" 2>/dev/null
sips -z 256 256   "$SOURCE_ICON" --out "$ICONSET_DIR/icon_128x128@2x.png" 2>/dev/null
sips -z 256 256   "$SOURCE_ICON" --out "$ICONSET_DIR/icon_256x256.png" 2>/dev/null
sips -z 512 512   "$SOURCE_ICON" --out "$ICONSET_DIR/icon_256x256@2x.png" 2>/dev/null
sips -z 512 512   "$SOURCE_ICON" --out "$ICONSET_DIR/icon_512x512.png" 2>/dev/null
cp "$SOURCE_ICON" "$ICONSET_DIR/icon_512x512@2x.png"

# Generate ICNS
iconutil -c icns "$ICONSET_DIR" -o "$SCRIPT_DIR/icon.icns"
echo "   ✅ Created: icon.icns"

# Copy to the location electron-builder expects
mkdir -p "$SCRIPT_DIR/icons"
cp "$SCRIPT_DIR/icon.icns" "$SCRIPT_DIR/icons/icon.icns"

# ──────────────────────────────────────────────
# 2. Windows ICO
# ──────────────────────────────────────────────
echo "🪟 Generating Windows icons..."

# Create Windows icon directory
WIN_ICON_DIR="$SCRIPT_DIR/win-icons"
mkdir -p "$WIN_ICON_DIR"

# Generate required sizes for .ico
sips -z 16 16     "$SOURCE_ICON" --out "$WIN_ICON_DIR/icon_16.png" 2>/dev/null
sips -z 24 24     "$SOURCE_ICON" --out "$WIN_ICON_DIR/icon_24.png" 2>/dev/null
sips -z 32 32     "$SOURCE_ICON" --out "$WIN_ICON_DIR/icon_32.png" 2>/dev/null
sips -z 48 48     "$SOURCE_ICON" --out "$WIN_ICON_DIR/icon_48.png" 2>/dev/null
sips -z 64 64     "$SOURCE_ICON" --out "$WIN_ICON_DIR/icon_64.png" 2>/dev/null
sips -z 128 128   "$SOURCE_ICON" --out "$WIN_ICON_DIR/icon_128.png" 2>/dev/null
sips -z 256 256   "$SOURCE_ICON" --out "$WIN_ICON_DIR/icon_256.png" 2>/dev/null

# Use python3 and create-ico.py to generate .ico (if available), otherwise fallback to ImageMagick
if python3 "$SCRIPT_DIR/create-ico.py" 2>/dev/null; then
    cp "$SCRIPT_DIR/icons/icon.ico" "$SCRIPT_DIR/icon.ico"
    echo "   ✅ Created: icon.ico (using Python PIL)"
elif command -v convert &> /dev/null; then
    convert "$WIN_ICON_DIR/icon_16.png" \
            "$WIN_ICON_DIR/icon_24.png" \
            "$WIN_ICON_DIR/icon_32.png" \
            "$WIN_ICON_DIR/icon_48.png" \
            "$WIN_ICON_DIR/icon_64.png" \
            "$WIN_ICON_DIR/icon_128.png" \
            "$WIN_ICON_DIR/icon_256.png" \
            "$SCRIPT_DIR/icon.ico"
    echo "   ✅ Created: icon.ico (using ImageMagick)"
    cp "$SCRIPT_DIR/icon.ico" "$SCRIPT_DIR/icons/icon.ico"
else
    echo "   ❌ Error: Could not generate Windows .ico file. Neither python3 create-ico.py nor ImageMagick (convert) succeeded."
    exit 1
fi

# ──────────────────────────────────────────────
# 3. Android Icons
# ──────────────────────────────────────────────
echo "🤖 Generating Android icons..."

ANDROID_RES="$SCRIPT_DIR/../android/app/src/main/res"

# Android icon sizes by density
generate_android_icons() {
    local density=$1
    local size=$2
    local dir="$ANDROID_RES/$density"
    mkdir -p "$dir"
    
    sips -z $size $size "$SOURCE_ICON" --out "$dir/ic_launcher.png" 2>/dev/null
    sips -z $size $size "$SOURCE_ICON" --out "$dir/ic_launcher_round.png" 2>/dev/null
    sips -z $((size * 2)) $((size * 2)) "$SOURCE_ICON" --out "$dir/ic_launcher_foreground.png" 2>/dev/null
}

generate_android_icons "mipmap-mdpi" 48
generate_android_icons "mipmap-hdpi" 72
generate_android_icons "mipmap-xhdpi" 96
generate_android_icons "mipmap-xxhdpi" 144
generate_android_icons "mipmap-xxxhdpi" 192
echo "   ✅ Created Android icons in: $ANDROID_RES"

# ──────────────────────────────────────────────
# 4. Web favicon
# ──────────────────────────────────────────────
echo "🌐 Generating web favicon..."

PUBLIC_DIR="$SCRIPT_DIR/../public"
mkdir -p "$PUBLIC_DIR"

sips -z 32 32 "$SOURCE_ICON" --out "$PUBLIC_DIR/favicon-32x32.png" 2>/dev/null
sips -z 16 16 "$SOURCE_ICON" --out "$PUBLIC_DIR/favicon-16x16.png" 2>/dev/null
sips -z 180 180 "$SOURCE_ICON" --out "$PUBLIC_DIR/apple-touch-icon.png" 2>/dev/null
sips -z 192 192 "$SOURCE_ICON" --out "$PUBLIC_DIR/android-chrome-192x192.png" 2>/dev/null
sips -z 512 512 "$SOURCE_ICON" --out "$PUBLIC_DIR/android-chrome-512x512.png" 2>/dev/null
sips -z 512 512 "$SOURCE_ICON" --out "$PUBLIC_DIR/icon.png" 2>/dev/null
echo "   ✅ Created web favicons in: $PUBLIC_DIR"

# ──────────────────────────────────────────────
# 5. iOS (iPhone/iPad) Icons
# ──────────────────────────────────────────────
echo "📱 Generating iOS icons..."

IOS_RES="$SCRIPT_DIR/../ios/App/App/Assets.xcassets/AppIcon.appiconset"
if [ -d "$IOS_RES" ]; then
    sips -z 20 20     "$SOURCE_ICON" --out "$IOS_RES/AppIcon-20.png" 2>/dev/null
    sips -z 40 40     "$SOURCE_ICON" --out "$IOS_RES/AppIcon-20@2x.png" 2>/dev/null
    sips -z 60 60     "$SOURCE_ICON" --out "$IOS_RES/AppIcon-20@3x.png" 2>/dev/null
    sips -z 29 29     "$SOURCE_ICON" --out "$IOS_RES/AppIcon-29.png" 2>/dev/null
    sips -z 58 58     "$SOURCE_ICON" --out "$IOS_RES/AppIcon-29@2x.png" 2>/dev/null
    sips -z 87 87     "$SOURCE_ICON" --out "$IOS_RES/AppIcon-29@3x.png" 2>/dev/null
    sips -z 40 40     "$SOURCE_ICON" --out "$IOS_RES/AppIcon-40.png" 2>/dev/null
    sips -z 80 80     "$SOURCE_ICON" --out "$IOS_RES/AppIcon-40@2x.png" 2>/dev/null
    sips -z 120 120   "$SOURCE_ICON" --out "$IOS_RES/AppIcon-40@3x.png" 2>/dev/null
    sips -z 120 120   "$SOURCE_ICON" --out "$IOS_RES/AppIcon-60@2x.png" 2>/dev/null
    sips -z 180 180   "$SOURCE_ICON" --out "$IOS_RES/AppIcon-60@3x.png" 2>/dev/null
    sips -z 76 76     "$SOURCE_ICON" --out "$IOS_RES/AppIcon-76.png" 2>/dev/null
    sips -z 152 152   "$SOURCE_ICON" --out "$IOS_RES/AppIcon-76@2x.png" 2>/dev/null
    sips -z 167 167   "$SOURCE_ICON" --out "$IOS_RES/AppIcon-83.5@2x.png" 2>/dev/null
    sips -z 1024 1024 "$SOURCE_ICON" --out "$IOS_RES/AppIcon-1024.png" 2>/dev/null
    echo "   ✅ Created iOS icons in: $IOS_RES"
else
    echo "   ⚠️  iOS Assets directory not found at $IOS_RES — skipping."
fi

# ──────────────────────────────────────────────
# Cleanup
# ──────────────────────────────────────────────
rm -rf "$ICONSET_DIR"

echo ""
echo "🎉 Icon generation complete!"
echo ""
echo "Next steps:"
echo "  1. Review the generated icons in the 'icons' directory"
echo "  2. For macOS: The icon.icns is ready for electron-builder"
echo "  3. For Windows: icon.ico is ready (or use online converter)"
echo "  4. For Android: Icons are in android/app/src/main/res/"
echo ""
