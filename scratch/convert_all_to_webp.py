import os
from PIL import Image

public_dir = r"C:\Users\hp\Desktop\projects\iptv-fr\public"

total_original_size = 0
total_new_size = 0
converted_count = 0
deleted_duplicates_count = 0

print("Starting WebP Conversion and Optimization...")

# Walk through all directories in public
for root, dirs, files in os.walk(public_dir):
    for file in files:
        file_path = os.path.join(root, file)
        ext = os.path.splitext(file)[1].lower()
        
        # 1. Handle JPEGs and PNGs
        if ext in ['.jpg', '.jpeg', '.png']:
            # Skip logo.png from deletion (it's the high-res master source)
            if file == 'logo.png':
                continue
                
            orig_size = os.path.getsize(file_path)
            webp_path = os.path.splitext(file_path)[0] + '.webp'
            
            # Check if webp version already exists (like for canal-plus.webp)
            if os.path.exists(webp_path):
                # WebP version exists, just delete the old JPG duplicate
                print(f"Duplicate found: deleting {file} (WebP equivalent already exists).")
                os.remove(file_path)
                total_original_size += orig_size
                deleted_duplicates_count += 1
            else:
                # WebP version doesn't exist, convert it
                try:
                    with Image.open(file_path) as img:
                        # Convert RGBA/P to RGB if saving to webp
                        if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
                            # WEBP supports alpha, so we can convert directly
                            img.save(webp_path, "WEBP", quality=85, method=6)
                        else:
                            img.convert("RGB").save(webp_path, "WEBP", quality=85, method=6)
                            
                    new_size = os.path.getsize(webp_path)
                    print(f"Converted {file} -> {os.path.basename(webp_path)} ({orig_size/1024:.1f} KB -> {new_size/1024:.1f} KB)")
                    os.remove(file_path)
                    total_original_size += orig_size
                    total_new_size += new_size
                    converted_count += 1
                except Exception as e:
                    print(f"Error converting {file}: {e}")

print("\n--- Optimization Report ---")
print(f"Images converted: {converted_count}")
print(f"Duplicate JPEGs deleted: {deleted_duplicates_count}")
saved_space = total_original_size - total_new_size
if total_original_size > 0:
    reduction_pct = (saved_space / total_original_size) * 100
else:
    reduction_pct = 0

print(f"Original total size: {total_original_size/1024/1024:.2f} MB ({total_original_size/1024:.1f} KB)")
print(f"New WebP total size: {total_new_size/1024/1024:.2f} MB ({total_new_size/1024:.1f} KB)")
print(f"Space Optimized (Saved): {saved_space/1024/1024:.2f} MB ({saved_space/1024:.1f} KB)")
print(f"Size Reduction: {reduction_pct:.1f}%")
