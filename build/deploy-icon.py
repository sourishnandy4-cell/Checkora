#!/usr/bin/env python3
"""
deploy-icon.py — Drop-in icon deployer for Checkora.

Usage:
    python3 build/deploy-icon.py path/to/your-icon.png

This script will:
  1. Remove the outer white background (flood-fill, not naive threshold)
  2. Resize to 1024x1024
  3. Place the result in build/icon-source.png
  4. Run generate-icons.sh to produce .icns / .ico and all web favicons

Requirements:
    pip3 install Pillow --break-system-packages
"""

import subprocess
import sys
import os
from pathlib import Path
from collections import deque

try:
    from PIL import Image
except ImportError:
    print("❌  Pillow not found. Install it:")
    print("    pip3 install Pillow --break-system-packages")
    sys.exit(1)


SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_DIR = SCRIPT_DIR.parent


def flood_remove_bg(img: "Image.Image", threshold: int = 220) -> "Image.Image":
    """Flood-fill from edges and erase near-white background pixels."""
    img = img.convert("RGBA")
    w, h = img.size
    px = img.load()

    def is_bg(p):
        r, g, b, _ = p
        return r >= threshold and g >= threshold and b >= threshold

    visited = [[False] * h for _ in range(w)]
    queue = deque()

    for x in range(w):
        for y in (0, h - 1):
            if not visited[x][y] and is_bg(px[x, y]):
                visited[x][y] = True
                queue.append((x, y))
    for y in range(h):
        for x in (0, w - 1):
            if not visited[x][y] and is_bg(px[x, y]):
                visited[x][y] = True
                queue.append((x, y))

    count = 0
    while queue:
        cx, cy = queue.popleft()
        r, g, b, a = px[cx, cy]
        px[cx, cy] = (r, g, b, 0)
        count += 1
        for nx, ny in ((cx - 1, cy), (cx + 1, cy), (cx, cy - 1), (cx, cy + 1)):
            if 0 <= nx < w and 0 <= ny < h and not visited[nx][ny] and is_bg(px[nx, ny]):
                visited[nx][ny] = True
                queue.append((nx, ny))

    print(f"  Removed {count:,} background pixels ({count / (w * h) * 100:.1f}%)")
    return img


def main():
    if len(sys.argv) < 2:
        # default: process existing icon-source.png in-place
        src = SCRIPT_DIR / "icon-source.png"
        if not src.exists():
            print("Usage: python3 build/deploy-icon.py <path-to-icon.png>")
            sys.exit(1)
    else:
        src = Path(sys.argv[1]).resolve()

    if not src.exists():
        print(f"❌  File not found: {src}")
        sys.exit(1)

    print(f"🎨  Deploying icon: {src}")

    # 1. Load + remove background
    print("\n1/3  Removing white background…")
    img = Image.open(src)
    img = flood_remove_bg(img)

    # 2. Resize to 1024x1024
    print("2/3  Resizing to 1024×1024…")
    img = img.resize((1024, 1024), Image.LANCZOS)

    # 3. Save to build/icon-source.png
    dest = SCRIPT_DIR / "icon-source.png"
    img.save(dest, "PNG")
    print(f"     ✅  Saved: {dest}")

    # 4. Run generate-icons.sh
    print("3/3  Running generate-icons.sh…")
    gen = SCRIPT_DIR / "generate-icons.sh"
    if gen.exists():
        subprocess.run(["bash", str(gen)], check=True)
    else:
        print("     ⚠️   generate-icons.sh not found — skipping ICNS/ICO generation.")

    print("\n✅  Done! Icon deployed to all locations.")
    print("   Restart the app (npm run dev) to see the new dock icon.")


if __name__ == "__main__":
    main()
