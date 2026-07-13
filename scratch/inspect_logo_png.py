from PIL import Image

try:
    img = Image.open("public/logo.png")
    print(f"Format: {img.format}, Size: {img.size}, Mode: {img.mode}")
    
    # If transparent, let's find the bounding box
    if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
        alpha = img.convert('RGBA').split()[-1]
        bbox = alpha.getbbox()
        print(f"Bounding box: {bbox}")
    else:
        print("No alpha channel in logo.png")
except Exception as e:
    print(f"Error: {e}")
