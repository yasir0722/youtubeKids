from PIL import Image, ImageDraw, ImageFont
import os

def create_icon(size, filename):
    # Create a new image with red background
    img = Image.new('RGB', (size, size), '#FF0000')
    draw = ImageDraw.Draw(img)
    
    # Draw white play triangle
    center_x, center_y = size // 2, size // 2
    play_size = size // 4
    
    triangle = [
        (center_x - play_size//2, center_y - play_size//2),
        (center_x + play_size//2, center_y),
        (center_x - play_size//2, center_y + play_size//2)
    ]
    draw.polygon(triangle, fill='white')
    
    # Draw YK text
    try:
        font_size = size // 10
        font = ImageFont.load_default()
        text = "YK"
        bbox = draw.textbbox((0, 0), text, font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
        text_x = (size - text_width) // 2
        text_y = center_y + play_size//2 + size//15
        draw.text((text_x, text_y), text, fill='white', font=font)
    except:
        # Fallback if font loading fails
        pass
    
    # Save the image
    img.save(filename)
    print(f"Created {filename}")

# Create the icons
os.makedirs('./public', exist_ok=True)
create_icon(192, './public/icon-192x192.png')
create_icon(512, './public/icon-512x512.png')
print("Icons created successfully!")
