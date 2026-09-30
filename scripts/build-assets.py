"""Build responsive scene derivatives from the approved scene masters."""

from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
SCENES = ROOT / "public" / "assets" / "scenes"
MASTERS = ROOT / "design-assets" / "masters"

CHAPTERS = ("hero", "train", "fuel", "adapt", "connect", "prove")


def export_scene(name: str, orientation: str) -> None:
    source = SCENES / f"{name}-{orientation}.png"
    image = Image.open(source).convert("RGB")
    landscape = orientation == "landscape"
    master_size = (3840, 2160) if landscape else (2160, 3840)
    master = ImageOps.fit(image, master_size, method=Image.Resampling.LANCZOS)
    MASTERS.mkdir(parents=True, exist_ok=True)
    master.save(MASTERS / f"{name}-{orientation}-master.webp", "WEBP", quality=95, method=6)

    widths = (3840, 1920, 1280) if landscape else (2160, 1080, 720)
    for width in widths:
        height = round(width * (9 / 16 if landscape else 16 / 9))
        derivative = master.resize((width, height), Image.Resampling.LANCZOS)
        stem = SCENES / f"{name}-{orientation}-{width}"
        derivative.save(stem.with_suffix(".avif"), "AVIF", quality=55, speed=5)
        derivative.save(stem.with_suffix(".webp"), "WEBP", quality=80, method=6)


for chapter in CHAPTERS:
    export_scene(chapter, "landscape")
    export_scene(chapter, "portrait")
