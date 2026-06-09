#!/usr/bin/env python3
"""
Generate Windows ICO file from source images with multiple sizes.
"""

from PIL import Image
import os
import sys

def create_ico(source_path, output_path):
    """Create ICO file with multiple sizes from source PNG."""
    # Open source image
    img = Image.open(source_path).convert('RGBA')
    
    # ICO sizes needed (width, height)
    sizes = [(16, 16), (24, 24), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)]
    
    # Create list of resized images
    ico_images = []
    for size in sizes:
        # Create a new image with the target size
        resized = img.copy()
        resized.thumbnail(size, Image.Resampling.LANCZOS)
        
        # Create a new image with exact target size and paste centered
        new_img = Image.new('RGBA', size, (0, 0, 0, 0))
        paste_x = (size[0] - resized.width) // 2
        paste_y = (size[1] - resized.height) // 2
        new_img.paste(resized, (paste_x, paste_y))
        ico_images.append(new_img)
    
    # Save as ICO with all sizes
    # Pillow's ICO save uses the first image as the base and append_images for others
    ico_images[-1].save(
        output_path,
        format='ICO',
        append_images=ico_images[:-1]
    )
    
    print(f"✅ Created: {output_path}")
    print(f"   Sizes: {', '.join([f'{s[0]}x{s[1]}' for s in sizes])}")

if __name__ == '__main__':
    script_dir = os.path.dirname(os.path.abspath(__file__))
    source = os.path.join(script_dir, 'icon-source.png')
    output = os.path.join(script_dir, 'icons', 'icon.ico')
    
    if not os.path.exists(source):
        print(f"❌ Source image not found: {source}")
        sys.exit(1)
    
    os.makedirs(os.path.dirname(output), exist_ok=True)
    
    print("🎨 Creating Windows ICO file with multiple sizes...")
    create_ico(source, output)
