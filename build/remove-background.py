#!/usr/bin/env python3
"""
Remove outer white background from Checkora icon using flood-fill.
Unlike a naive threshold approach, flood-fill only erases pixels
connected to the image edges — so white chess pieces are preserved.
"""

from PIL import Image
from collections import deque
import sys
import os


def remove_outer_background(input_path: str, output_path: str, threshold: int = 220):
    """
    Flood-fill from all four edges and remove near-white background pixels.

    Args:
        input_path:  Source PNG (white background chess icon)
        output_path: Destination PNG (transparent background)
        threshold:   R/G/B value above which a pixel is treated as background (0-255)
    """
    img = Image.open(input_path).convert("RGBA")
    w, h = img.size
    px = img.load()
    print(f"Processing {w}×{h} image (threshold={threshold})…")

    def is_bg(pixel):
        r, g, b, _ = pixel
        return r >= threshold and g >= threshold and b >= threshold

    visited = [[False] * h for _ in range(w)]
    queue = deque()

    # Seed from every edge pixel that qualifies as background
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

    print(f"  Flood-fill seeded with {len(queue):,} edge pixels")

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

    total = w * h
    print(f"  Made {count:,} pixels transparent ({count / total * 100:.1f}% of image)")
    img.save(output_path, "PNG")
    print(f"  ✅ Saved: {output_path}")


if __name__ == "__main__":
    script_dir = os.path.dirname(os.path.abspath(__file__))
    src = os.path.join(script_dir, "icon-source.png")
    dst = os.path.join(script_dir, "icon-source.png")   # overwrite in-place

    if not os.path.exists(src):
        print(f"❌  Source image not found: {src}")
        sys.exit(1)

    threshold = int(sys.argv[1]) if len(sys.argv) > 1 else 220
    print("🎨  Flood-fill background removal…")
    remove_outer_background(src, dst, threshold)
    print("\n💡  Tip: Adjust threshold if over/under-removal occurs:")
    print("      python3 remove-background.py 230  # more aggressive")
    print("      python3 remove-background.py 210  # less aggressive")
