"""Render a portfolio PDF into WebP page images for the /portfolio/2026/ viewer.

Usage:
    python _scripts/render_portfolio.py PATH/TO/portfolio.pdf images/portfolio-2026

Writes p01-1600.webp, p01-3000.webp, ... into the output folder (old images there are removed).
If the page count changes, update `pages:` in _pages/portfolio-2026.html.
Requires: pip install pymupdf pillow
"""
import sys
from pathlib import Path

import pymupdf
from PIL import Image

WIDTHS = (1600, 3000)  # standard and high-resolution/zoom versions
QUALITY = 80


def main(pdf_path, out_dir):
    out = Path(out_dir)
    out.mkdir(parents=True, exist_ok=True)
    for old in out.glob("p*.webp"):
        old.unlink()

    doc = pymupdf.open(pdf_path)
    total = 0
    for page in doc:
        for width in WIDTHS:
            scale = width / page.rect.width
            pix = page.get_pixmap(matrix=pymupdf.Matrix(scale, scale), alpha=False)
            img = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
            dest = out / f"p{page.number + 1:02d}-{width}.webp"
            img.save(dest, "WEBP", quality=QUALITY, method=6)
            total += dest.stat().st_size
    print(f"{len(doc)} pages, {total / 1e6:.1f} MB written to {out}")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    main(sys.argv[1], sys.argv[2])
