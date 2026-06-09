#!/bin/bash
# Clear macOS icon cache for Checkora
# Run this if the old Electron icon is still showing

echo "🧹 Clearing macOS icon cache..."

# Kill any running Checkora instances
pkill -f "Checkora" 2>/dev/null || true

# Clear icon cache
sudo rm -rf /Library/Caches/com.apple.iconservices*
sudo rm -rf ~/Library/Caches/com.apple.iconservices*

# Reset Launch Services database
/System/Library/Frameworks/CoreServices.framework/Frameworks/LaunchServices.framework/Support/lsregister -kill -r -domain local -domain system -domain user

# Touch the app to refresh
if [ -d "/Applications/Checkora.app" ]; then
    touch "/Applications/Checkora.app"
fi

echo "✅ Icon cache cleared"
echo "💡 Restart your Mac or log out/in for changes to take full effect"
