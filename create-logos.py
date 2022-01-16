import re
from PIL import Image

img = Image.open("images/favicon.png").convert("RGBA")

sizes = (72,96,128,144,192,360)

for i in sizes:
    img.resize((i,i)).save(f"images/logo{i}.png")

src = open("manifest.json").read()

template = """        {{
            "src": "/images/logo{0}.png",
            "type": "image/png",
            "sizes": "{0}x{0}",
            "purpose": "any"
        }},
        {{
            "src": "/images/logo{0}.png",
            "type": "image/png",
            "sizes": "{0}x{0}",
            "purpose": "maskable"
        }}"""

src = re.sub(r'(?<="icons": \[\n).*?(?=\s+\])', ",\n".join(template.format(size) for size in sizes), src, flags=re.DOTALL)

open("manifest.json", 'w', encoding='utf-8').write(src)