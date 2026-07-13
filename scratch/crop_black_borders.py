from PIL import Image, ImageChops

try:
    # Open the high-resolution logo source
    img = Image.open("public/logo.png").convert("RGBA")
    width, height = img.size
    print(f"Loaded logo.png: size={img.size}")
    
    # We will find the bounding box of the non-black pixels.
    # Since the background is black, let's look for pixels that are not close to black.
    # Threshold: R+G+B > 45 (average color value > 15)
    # Or alpha > 0 if it has alpha. But inspect said it is RGB. 
    # Let's write a custom bbox finder for black background.
    pixels = img.load()
    
    left = width
    top = height
    right = 0
    bottom = 0
    
    # Threshold for black background
    threshold = 15
    
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            # If the pixel is not black
            if r > threshold or g > threshold or b > threshold:
                if x < left: left = x
                if y < top: top = y
                if x > right: right = x
                if y > bottom: bottom = y
                
    print(f"Non-black bounding box: left={left}, top={top}, right={right}, bottom={bottom}")
    
    if right > left and bottom > top:
        # Calculate width and height of the cropped area
        w = right - left + 1
        h = bottom - top + 1
        
        # Add 3% safe margin (padding)
        padding_x = int(w * 0.03)
        padding_y = int(h * 0.03)
        
        left_padded = max(0, left - padding_x)
        top_padded = max(0, top - padding_y)
        right_padded = min(width - 1, right + padding_x)
        bottom_padded = min(height - 1, bottom + padding_y)
        
        print(f"Padded bounding box: left={left_padded}, top={top_padded}, right={right_padded}, bottom={bottom_padded}")
        
        # Crop the image
        cropped = img.crop((left_padded, top_padded, right_padded, bottom_padded))
        print(f"Cropped image size: {cropped.size}")
        
        # Make the background transparent!
        # If the background is black, we can make the black pixels transparent to look even more premium.
        # But wait, the user said "Preserve the exact design, colors, typography and branding. Do not modify the logo artwork."
        # Keeping it with black background or making it transparent?
        # If we keep the cropped image as is, it has a black background which blends perfectly with the black navbar.
        # Let's save it directly as WEBP (which supports transparency if we ever want to change it, but keeping it black is safe).
        # We will save it with alpha transparency! Let's make the background black pixels transparent.
        # Wait, if we make the black background transparent, the logo circle will blend perfectly with any navbar color.
        # Let's write a simple mask to make the background transparent.
        # Actually, let's see. If the circle logo has black elements inside it (like the black parts of the soccer ball or text), making black transparent will punch holes in the logo!
        # Ah! That is a very dangerous trap! If we make "black" transparent, the black hexagons of the soccer ball will become transparent, which is UGLY!
        # So we must NOT make black transparent! We must keep the black background intact, just cropped!
        # Yes! That is correct.
        
        # Save as WEBP to public/logo.webp
        cropped.save("public/logo.webp", "WEBP", quality=95)
        print("Successfully saved cropped logo as public/logo.webp")
        
        # Also copy it to public/logo.png for consistency if needed, but the webapp uses logo.webp.
    else:
        print("Error: Bounding box calculation failed.")
        
except Exception as e:
    print(f"Error: {e}")
