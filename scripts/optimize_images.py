"""Generate web images. Requires Pillow: python -m pip install Pillow."""
import json
import sys
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "assets" / "image-originals"
OUTPUT = ROOT / "public" / "images"
OUTPUT.mkdir(parents=True, exist_ok=True)
manifest_path = ROOT / "src" / "image-manifest.json"
manifest = json.loads(manifest_path.read_text(encoding="utf-8")) if sys.argv[1:] and manifest_path.exists() else {}
original_bytes = optimized_bytes = 0
processed = 0

for source in sorted(SOURCE.iterdir()):
    if sys.argv[1:] and source.name not in sys.argv[1:]:
        continue
    if source.suffix.lower() not in {".png", ".jpg", ".jpeg"}:
        continue
    processed += 1
    original_bytes += source.stat().st_size
    with Image.open(source) as original:
        image = ImageOps.exif_transpose(original).convert("RGBA" if "A" in original.getbands() else "RGB")
        # Portraits need less resolution than banners containing small text.
        portrait = source.name.startswith(("mr_", "miss_", "qari_", "sir_")) or source.stem in {
            "amjad_raza", "adnan_ashraf", "tabinda_parwer", "muhammad_awais", "head_picc"
        }
        maximum = 800 if portrait else 1600
        if source.stem == "academy_logo":
            maximum = 192
        image.thumbnail((maximum, maximum), Image.Resampling.LANCZOS)
        sizes = sorted({min(image.width, width) for width in (320, 640, image.width)})
        variants = []
        for width in sizes:
            resized = image.resize((width, max(1, round(image.height * width / image.width))), Image.Resampling.LANCZOS)
            name = f"{source.stem}-{width}.webp"
            destination = OUTPUT / name
            resized.save(destination, "WEBP", quality=82, method=6)
            optimized_bytes += destination.stat().st_size
            variants.append(f"/images/{name} {width}w")
        manifest[f"/{source.name}"] = {
            "src": f"/images/{source.stem}-{image.width}.webp",
            "srcSet": ", ".join(variants),
            "width": image.width,
            "height": image.height,
        }
        if source.stem == "academy_logo":
            image.save(ROOT / "public" / "favicon.png", optimize=True)

(ROOT / "src" / "image-manifest.json").write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
if processed:
    print(f"Generated {processed} images: originals {original_bytes:,} bytes; all responsive variants {optimized_bytes:,} bytes ({1 - optimized_bytes / original_bytes:.1%} smaller).")
