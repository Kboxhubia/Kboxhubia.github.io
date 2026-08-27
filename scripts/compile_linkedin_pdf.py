import os
from PIL import Image
from reportlab.lib.pagesizes import landscape, letter
from reportlab.pdfgen import canvas

os.makedirs('assets/docs', exist_ok=True)
os.makedirs('/tmp/file_attachments/Presentacion', exist_ok=True)

input_folder = 'assets/images/slides'
output_pdf_path = 'assets/docs/Presentacion_Ing_Jorge_Huerta_DeepTech_LinkedIn.pdf'
tmp_pdf_path = '/tmp/file_attachments/Presentacion/Presentacion_Ing_Jorge_Huerta_DeepTech_LinkedIn.pdf'

# Collect all 18 screen PNGs in sorted order
slide_files = [f"screen{i:02d}.png" for i in range(1, 19)]

# Target page size: 1376 x 768 points landscape
page_width = 1376.0
page_height = 768.0

c = canvas.Canvas(output_pdf_path, pagesize=(page_width, page_height))

for fname in slide_files:
    img_path = os.path.join(input_folder, fname)
    if os.path.exists(img_path):
        # Draw image fitting canvas exactly
        c.drawImage(img_path, 0, 0, width=page_width, height=page_height)
        c.showPage()
    else:
        print(f"Warning: {img_path} not found!")

c.save()

# Also copy/save to /tmp/file_attachments/Presentacion/
with open(output_pdf_path, 'rb') as src, open(tmp_pdf_path, 'wb') as dst:
    dst.write(src.read())

print(f"Successfully compiled 18-slide PDF: {output_pdf_path} ({os.path.getsize(output_pdf_path)} bytes)")
print(f"Copy saved to: {tmp_pdf_path}")
