# Checkora Icon Setup

## Quick Start

1. **Save your source icon** as `icon-source.png` in this directory
   - Recommended: 1024×1024 PNG with transparent background
   - For macOS: Icon should be baked into a rounded rectangle shape
   - For Windows: Keep 10-15% padding around the logo

2. **Run the generator**:
   ```bash
   ./generate-icons.sh
   ```

3. **Generated files** will be placed in:
   - `icons/icon.icns` - macOS icon
   - `icons/icon.ico` - Windows icon (requires ImageMagick)
   - Android icons in `android/app/src/main/res/`
   - Web favicons in `public/`

## macOS Icon Requirements

For macOS, the Dock applies a rounded rectangle mask automatically, but for best results:
- Canvas: 1024×1024 PNG
- Transparent background
- Rounded rectangle with corner radius ~180-220px
- Leave 80-120px padding on all sides
- Place your logo inside the rounded rectangle

## Windows Icon Requirements

- Master artwork: 1024×1024 PNG
- Keep 10-15% padding around the logo
- Transparent background is fine
- Avoid putting important details near edges

The .ico file should contain these sizes:
- 16×16, 24×24, 32×32, 48×48, 64×64, 128×128, 256×256

## Android Icon Requirements

- Canvas: 1024×1024
- Logo centered with ~20% padding
- No rounded corners (Android applies mask)
- No shadow extending to edges

## Dependencies

For Windows .ico generation, install ImageMagick:
```bash
brew install imagemagick
```

## Electron Builder

The `package.json` is configured to use:
- macOS: `build/icons/icon.icns`
- Windows: `build/icons/icon.ico`
