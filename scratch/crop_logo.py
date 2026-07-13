from PIL import Image

try:
    img = Image.open("public/logo.webp")
    print(f"Original size: {img.size}")
    
    # Convert to RGBA to ensure alpha channel exists
    rgba = img.convert("RGBA")
    alpha = rgba.split()[-1]
    
    # Get bounding box of non-zero alpha
    bbox = alpha.getbbox()
    if bbox:
        print(f"Bounding box: {bbox}")
        # Crop the original image using the bbox
        cropped_img = img.crop(bbox)
        print(f"New size: {cropped_img.size}")
        
        # Save back to webp
        cropped_img.save("public/logo.webp", "WEBP")
        print("Successfully cropped and updated public/logo.webp")
    else:
        print("Error: Could not find bounding box for cropping.")
except Exception as e:
    print(f"Error occurred: {e}")
