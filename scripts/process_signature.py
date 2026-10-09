import os
from PIL import Image

src = r"C:\Users\SHARTHAK STUDIO\.gemini\antigravity-ide\brain\4f68516b-5782-4f57-b798-f6b133939c16\.user_uploaded\media_1791505723814.jpg"
dest = r"d:\Bittu - Soft\Client Project\RamGyan Website By me\public\ram_gyan_signature.png"

img = Image.open(src).convert("RGBA")
width, height = img.size

datas = list(img.getdata())
new_data = []

border_pixels = [datas[0], datas[width-1], datas[(height-1)*width], datas[height*width-1], datas[width//2]]
bg_lum = sum((r+g+b)/3 for r,g,b,a in border_pixels) / len(border_pixels)

for y in range(height):
    for x in range(width):
        r, g, b, a = datas[y * width + x]
        lum = 0.299 * r + 0.587 * g + 0.114 * b
        diff = bg_lum - lum
        
        # Also clean the very bottom area below y > height * 0.85 where there are speckles
        if diff <= 32 or (y > height * 0.82 and diff < 65):
            new_data.append((255, 255, 255, 0))
        else:
            alpha = int(min(255, max(0, ((diff - 32) / (bg_lum - 70)) ** 0.8 * 255 * 1.5)))
            ink_r = int(max(15, min(40, r * 0.4)))
            ink_g = int(max(35, min(80, g * 0.5)))
            ink_b = int(max(110, min(220, b * 1.05 + 40)))
            new_data.append((ink_r, ink_g, ink_b, alpha))

img.putdata(new_data)

bbox = img.getbbox()
if bbox:
    pad = 10
    crop_box = (max(0, bbox[0]-pad), max(0, bbox[1]-pad), min(width, bbox[2]+pad), min(height, bbox[3]+pad))
    img = img.crop(crop_box)

img.save(dest, "PNG")
print("Pristine signature saved to:", dest, "size:", img.size)
