#!/usr/bin/env python3
import sys
import os
from pathlib import Path
from collections import deque
from PIL import Image

SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_DIR = SCRIPT_DIR.parent

def find_logo_bbox(img: Image.Image, threshold: int = 240) -> tuple:
    """Find the bounding box of the non-white squircle in the original image."""
    img = img.convert("RGB")
    w, h = img.size
    px = img.load()
    
    left = w
    right = 0
    top = h
    bottom = 0
    
    for x in range(w):
        for y in range(h):
            r, g, b = px[x, y]
            # If the pixel is not white/near-white, it's part of the logo/squircle
            if r < threshold or g < threshold or b < threshold:
                if x < left: left = x
                if x > right: right = x
                if y < top: top = y
                if y > bottom: bottom = y
                
    return (left, top, right + 1, bottom + 1)

def flood_remove_bg(img: Image.Image, threshold: int = 220) -> Image.Image:
    """Flood-fill from edges to remove the corner background pixels."""
    img = img.convert("RGBA")
    w, h = img.size
    px = img.load()

    def is_bg(p):
        r, g, b, _ = p
        return r >= threshold and g >= threshold and b >= threshold

    visited = [[False] * h for _ in range(w)]
    queue = deque()

    # Seed from the corners
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
    src = SCRIPT_DIR / "icon-source-original.png"
    if not src.exists():
        print(f"❌ Original source file not found at: {src}")
        sys.exit(1)
        
    print(f"🎨 Processing original icon: {src}")
    img = Image.open(src)
    
    # 1. Find the bounding box of the squircle logo
    bbox = find_logo_bbox(img)
    print(f"1/4 Detected logo bounding box: {bbox}")
    
    # 2. Crop the image to the squircle logo (removing white margins)
    cropped = img.crop(bbox)
    print(f"2/4 Cropped to logo size: {cropped.size}")
    
    # 3. Resize to 1024x1024
    print("3/4 Resizing to 1024x1024...")
    resized = cropped.resize((1024, 1024), Image.LANCZOS)
    
    # 4. Remove background corners
    print("4/4 Removing white background corners...")
    final_img = flood_remove_bg(resized)
    
    # Save the result
    dest = SCRIPT_DIR / "icon-source.png"
    final_img.save(dest, "PNG")
    print(f"✅ Saved full-bleed icon to: {dest}")
    
    # Check new bbox
    print(f"   New BBox: {final_img.getbbox()}")

if __name__ == "__main__":
    main()
