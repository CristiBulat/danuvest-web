#!/usr/bin/env python3
"""Cuts the raw site photos down to the 24 frames the Proiecte section ships.

    python3 scripts/crop-project-photos.py [SOURCE_DIR]

SOURCE_DIR defaults to ~/Downloads/Poze and holds one folder per object, as
they came off the phones. Output goes straight into src/assets/projects/ as
<slug>-1.jpg … -4.jpg, which is where Projects.astro looks for them.

Why this is a script and not a one-off in an image editor:

  * Every frame is 16:9, because the card is 16:9 too. If a file arrives at
    some other ratio the browser re-crops it to fill the card, throwing away
    whichever part of the photograph the crop was chosen for.
  * The phones burn a timestamp into the bottom of the frame at roughly 91%
    of the height, so most of these bottom trims are sized to cut it off
    rather than publish it. The script names any crop that reaches into
    that band, to be eyeballed before committing.
  * The trims themselves are editorial — how much empty sky and dirt
    foreground to drop from each shot — and they are worth keeping written
    down. Re-running this reproduces exactly what is in the repo.

To swap a photo: point the entry at the new file, pick its trims, run the
script, and update the matching caption in src/data/projects.json.
"""
import os
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "src", "assets", "projects")
SRC = sys.argv[1] if len(sys.argv) > 1 else os.path.expanduser("~/Downloads/Poze")

AR = 16 / 9   # the card's aspect ratio, and so every output's
LONG = 1400   # long edge in px; the widest derivative astro:assets emits is 1100
QUALITY = 78

D_CR = "Casa de locuit individuala. mun. Chisinau, Or Cricova  str, Drumul Viilor"
D_CC = "Centru Comercial mun. Chisinau, com, Stauceni Str. Bucovine 29"
D_ST = "Construcții civile a PDC 11035 kV pentru parcul fotovoltaic 40 MW s Negureni , Telenesti"
D_BU = "Construirea unei case de locuit Individuale str. Bucovina Chisinau"
D_NI = "Reconstruirea imobilului cu extinderea ei pe verticală și pe orizontala mun.Chisinău. str. Ion Nistor, nr. 27"
D_RO = "Statie de tratare a apei Rogob"

# (output name, folder, file, top trim, bottom trim, x bias)
#
# The trims are fractions of the source height taken off the top and the
# bottom. Whatever width is then left over to reach 16:9 comes off the
# sides, split by the x bias: -1 keeps the left edge, +1 keeps the right,
# 0 centres. Height is never given back to reach the ratio — the trims
# exist to remove sky, foreground and timestamps, so the width gives way.
JOBS = [
    ("centru-comercial-stauceni-1", D_CC, "48.jpg",   0.05, 0.17, -0.20),
    ("centru-comercial-stauceni-2", D_CC, "39.jpg",   0.09, 0.13,  0.00),
    ("centru-comercial-stauceni-3", D_CC, "43.jpg",   0.08, 0.12,  0.15),
    ("centru-comercial-stauceni-4", D_CC, "30.1.jpg", 0.20, 0.04,  0.00),

    ("statie-110kv-negureni-1", D_ST, "WhatsApp Image 2026-08-21 at 11.45.40.jpeg", 0.24, 0.06, -0.20),
    ("statie-110kv-negureni-2", D_ST, "WhatsApp Image 2026-08-21 at 11.45.06.jpeg", 0.02, 0.12,  0.35),
    ("statie-110kv-negureni-3", D_ST, "WhatsApp Image 2026-08-21 at 11.42.27.jpeg", 0.26, 0.10,  0.00),
    ("statie-110kv-negureni-4", D_ST, "WhatsApp Image 2026-08-21 at 11.39.54.jpeg", 0.06, 0.10,  0.00),

    ("reconstructie-ion-nistor-1", D_NI, "20260226_121912.jpg", 0.03, 0.11,  0.00),
    ("reconstructie-ion-nistor-2", D_NI, "20250224_150036.jpg", 0.04, 0.15, -0.30),
    ("reconstructie-ion-nistor-3", D_NI, "20250823_092530.jpg", 0.11, 0.16,  0.00),
    ("reconstructie-ion-nistor-4", D_NI, "20260226_122012.jpg", 0.09, 0.16, -0.60),

    ("statie-apa-rogob-1", D_RO, "20260605_180350.jpg", 0.11, 0.13,  0.00),
    ("statie-apa-rogob-2", D_RO, "20260309_145439.jpg", 0.04, 0.12,  0.00),
    ("statie-apa-rogob-3", D_RO, "20260508_092310.jpg", 0.07, 0.13,  0.00),
    ("statie-apa-rogob-4", D_RO, "20260715_155409.jpg", 0.03, 0.20,  0.00),

    ("casa-cricova-1", D_CR, "20260815_115834.jpg", 0.07, 0.15,  0.10),
    ("casa-cricova-2", D_CR, "20260815_120005.jpg", 0.04, 0.13,  0.50),
    ("casa-cricova-3", D_CR, "20260728_091427.jpg", 0.03, 0.13,  0.00),
    ("casa-cricova-4", D_CR, "20260427_161638.jpg", 0.03, 0.13,  0.00),

    ("casa-bucovina-1", D_BU, "20260731_165351.jpg", 0.04, 0.13,  0.00),
    ("casa-bucovina-2", D_BU, "20260727_145645.jpg", 0.04, 0.16,  0.00),
    ("casa-bucovina-3", D_BU, "20251212_131841.jpg", 0.07, 0.05,  0.00),
    ("casa-bucovina-4", D_BU, "20251126_102949.jpg", 0.03, 0.13,  0.00),
]

# The burned-in timestamp sits at roughly 0.91 of the source height, so a
# crop that ends above 0.88 has certainly cleared it. Not every photo has
# one — the WhatsApp exports never do, and the setting was off on some of
# the phone shots — so this warns rather than fails, and the ones it names
# are the ones worth looking at before committing.
STAMP_SAFE_END = 0.88


def dims(path):
    """Width and height after EXIF rotation is applied."""
    out = subprocess.run(
        ["magick", path, "-auto-orient", "-format", "%w %h", "info:"],
        capture_output=True, text=True, check=True,
    ).stdout.split()
    return int(out[0]), int(out[1])


def main():
    if not os.path.isdir(SRC):
        sys.exit(f"source folder not found: {SRC}\nPass it as the first argument.")
    os.makedirs(OUT, exist_ok=True)
    unchecked = []

    for name, folder, filename, top, bottom, xbias in JOBS:
        src = os.path.join(SRC, folder, filename)
        if not os.path.exists(src):
            sys.exit(f"missing source: {src}")

        w, h = dims(src)
        y0, y1 = h * top, h * (1 - bottom)
        cw, ch = float(w), y1 - y0

        if cw > ch * AR:
            box_w, box_h = ch * AR, ch          # too wide: take it off the sides
        else:
            box_w, box_h = cw, cw / AR          # too tall: take the rest off the bottom

        x = int(round((cw - box_w) * (0.5 + xbias / 2)))
        y = int(round(y0))
        box_w, box_h = int(round(box_w)), int(round(box_h))
        x = max(0, min(x, w - box_w))
        y = max(0, min(y, h - box_h))

        end = (y + box_h) / h
        if end > STAMP_SAFE_END + 1e-6:
            unchecked.append(f"{name} (crop ends at {end:.2f} of the height)")

        subprocess.run(
            ["magick", src, "-auto-orient",
             "-crop", f"{box_w}x{box_h}+{x}+{y}", "+repage",
             "-resize", f"{LONG}x", "-strip",
             "-interlace", "Plane", "-quality", str(QUALITY),
             os.path.join(OUT, f"{name}.jpg")],
            check=True,
        )
        print(f"{name}: {w}x{h} -> {box_w}x{box_h}+{x}+{y}  ({box_w / box_h:.3f})")

    if unchecked:
        print("\nCheck these for a burned-in timestamp before committing:")
        for line in unchecked:
            print(f"  {line}")


if __name__ == "__main__":
    main()
