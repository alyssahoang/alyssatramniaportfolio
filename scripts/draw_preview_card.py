"""Draw public/preview.png — the 1200x630 link-preview card (og:image).

The logo is drawn from public/logo.svg itself, so the card cannot drift from the
real mark. No SVG rasteriser is needed: the logo is a handful of circles, a
polygon and M/L/C/Z paths, flattened here and painted with Pillow at 2x, then
downsampled for anti-aliasing.

    python scripts/draw_preview_card.py

After regenerating, bump the ?v= key on PREVIEW_IMAGE in
components/common/layout.tsx so LinkedIn/Slack re-fetch the image.
"""
import re
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "preview.png"
LOGO = ROOT / "public" / "logo.svg"

W, H = 1200, 630
S = 2  # supersample factor

NAME = "Alyssa Tramnia"
TAGLINE = "I help teams uncover the story behind their data and turn it into action"
DOMAIN = "alyssatramnia.com"

# Technical palette (see content/color-cheat-sheet-palettes.ts)
CANVAS = (0x12, 0x15, 0x1A)
DEEP = (0x1B, 0x2A, 0x4A)
TEAL = (0x21, 0x91, 0x90)
MINT = (0x57, 0xC7, 0x85)
TEXT = (0xFF, 0xFF, 0xFF)
MUTED = (0xC5, 0xCD, 0xD6)


def hex_rgb(value):
    value = value.lstrip("#")
    if len(value) == 3:
        value = "".join(c * 2 for c in value)
    return tuple(int(value[i : i + 2], 16) for i in (0, 2, 4))


def font(file_name, fallback, size):
    """Site font first (Google Sans woff2 needs FreeType with Brotli)."""
    for candidate in (ROOT / "public" / "fonts" / file_name, Path("C:/Windows/Fonts") / fallback):
        try:
            return ImageFont.truetype(str(candidate), size), candidate.name
        except OSError:
            continue
    raise SystemExit(f"no usable font for {file_name} / {fallback}")


# ---------------------------------------------------------------- logo ----

def flatten_path(d, steps=28):
    """Absolute M/L/C/Z path -> list of closed polygons (lists of points)."""
    tokens = re.findall(r"[A-Za-z]|-?\d*\.?\d+(?:e-?\d+)?", d)
    polys, cur, pts = [], None, []
    i, cmd = 0, None
    num = lambda: float(tokens[i])  # noqa: E731
    while i < len(tokens):
        tok = tokens[i]
        if tok.isalpha():
            if tok.islower():
                raise SystemExit(f"relative path command '{tok}' not supported — update the flattener")
            cmd = tok
            i += 1
            if cmd == "Z":
                if pts:
                    polys.append(pts)
                pts = []
            continue
        if cmd == "M":
            if pts:
                polys.append(pts)
            cur = (float(tokens[i]), float(tokens[i + 1]))
            pts = [cur]
            i += 2
            cmd = "L"  # implicit lineto after moveto
        elif cmd == "L":
            cur = (float(tokens[i]), float(tokens[i + 1]))
            pts.append(cur)
            i += 2
        elif cmd == "C":
            p1 = (float(tokens[i]), float(tokens[i + 1]))
            p2 = (float(tokens[i + 2]), float(tokens[i + 3]))
            p3 = (float(tokens[i + 4]), float(tokens[i + 5]))
            p0 = cur
            for n in range(1, steps + 1):
                t = n / steps
                mt = 1 - t
                pts.append((
                    mt**3 * p0[0] + 3 * mt**2 * t * p1[0] + 3 * mt * t**2 * p2[0] + t**3 * p3[0],
                    mt**3 * p0[1] + 3 * mt**2 * t * p1[1] + 3 * mt * t**2 * p2[1] + t**3 * p3[1],
                ))
            cur = p3
            i += 6
        else:
            raise SystemExit(f"unsupported path command '{cmd}'")
    if pts:
        polys.append(pts)
    return polys


def attr(tag, name, default=None):
    m = re.search(rf'\b{name}="([^"]*)"', tag)
    return m.group(1) if m else default


def parse_logo(svg):
    """Return (viewbox_size, shapes) where each shape is painted in order."""
    view = attr(re.search(r"<svg[^>]*>", svg).group(0), "viewBox").split()
    size = float(view[2])

    # One optional <g transform="translate(tx ty) scale(k)"> wrapper.
    tx = ty = 0.0
    k = 1.0
    g = re.search(r"<g[^>]*transform=\"([^\"]+)\"", svg)
    if g:
        tr = re.search(r"translate\(\s*([-\d.]+)[ ,]+([-\d.]+)\s*\)", g.group(1))
        sc = re.search(r"scale\(\s*([-\d.]+)\s*\)", g.group(1))
        tx, ty = (float(tr.group(1)), float(tr.group(2))) if tr else (0.0, 0.0)
        k = float(sc.group(1)) if sc else 1.0
    g_start = g.start() if g else len(svg)

    shapes = []
    for m in re.finditer(r"<(circle|path|polygon)\b[^>]*/?>", svg):
        tag, kind = m.group(0), m.group(1)
        inside = m.start() > g_start
        fx = (lambda x, y: (tx + k * x, ty + k * y)) if inside else (lambda x, y: (x, y))
        scale = k if inside else 1.0
        fill = attr(tag, "fill", "#000")
        stroke = attr(tag, "stroke")
        width = float(attr(tag, "stroke-width", "0")) * scale
        if kind == "circle":
            cx, cy = fx(float(attr(tag, "cx")), float(attr(tag, "cy")))
            shapes.append(("circle", (cx, cy, float(attr(tag, "r")) * scale), fill, stroke, width))
        elif kind == "polygon":
            nums = [float(v) for v in re.findall(r"-?\d*\.?\d+", attr(tag, "points"))]
            poly = [fx(nums[j], nums[j + 1]) for j in range(0, len(nums), 2)]
            shapes.append(("poly", [poly], fill, stroke, width))
        else:
            polys = [[fx(x, y) for x, y in p] for p in flatten_path(attr(tag, "d"))]
            shapes.append(("poly", polys, fill, stroke, width))
    return size, shapes


def draw_logo(img, center, diameter):
    size, shapes = parse_logo(LOGO.read_text(encoding="utf-8"))
    unit = diameter / size
    ox, oy = center[0] - diameter / 2, center[1] - diameter / 2
    to_px = lambda p: (ox + p[0] * unit, oy + p[1] * unit)  # noqa: E731
    draw = ImageDraw.Draw(img)
    for kind, geom, fill, stroke, width in shapes:
        if kind == "circle":
            cx, cy, r = geom
            (px, py), pr = to_px((cx, cy)), r * unit
            if fill and fill != "none":
                draw.ellipse([px - pr, py - pr, px + pr, py + pr], fill=hex_rgb(fill))
        else:
            for poly in geom:
                pts = [to_px(p) for p in poly]
                if fill and fill != "none":
                    draw.polygon(pts, fill=hex_rgb(fill))
                if stroke and width:
                    draw.line(pts + [pts[0]], fill=hex_rgb(stroke), width=max(1, round(width * unit)), joint="curve")
    return len(shapes)


# ---------------------------------------------------------------- card ----

def gradient(w, h, start, end):
    """Diagonal gradient: start at top-left, end at bottom-right."""
    vertical = Image.linear_gradient("L").resize((w, h))
    horizontal = Image.linear_gradient("L").rotate(90, expand=True).transpose(Image.FLIP_LEFT_RIGHT).resize((w, h))
    mask = Image.blend(vertical, horizontal, 0.5)
    return Image.composite(Image.new("RGB", (w, h), end), Image.new("RGB", (w, h), start), mask)


def main():
    w, h = W * S, H * S
    card = gradient(w, h, CANVAS, DEEP).convert("RGBA")

    # Soft teal glow behind the logo, the same move as the site's hero glow.
    glow = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gx, gy, gr = w // 2, int(h * 0.30), int(300 * S)
    gd.ellipse([gx - gr, gy - gr, gx + gr, gy + gr], fill=TEAL + (70,))
    card = Image.alpha_composite(card, glow.filter(ImageFilter.GaussianBlur(120 * S)))

    name_font, name_file = font("GoogleSans-Bold.woff2", "segoeuib.ttf", 84 * S)
    domain_font, _ = font("GoogleSans-Medium.woff2", "segoeui.ttf", 22 * S)
    # Shrink the tagline until it fits the safe width.
    tag_size = 32
    while True:
        tag_font, tag_file = font("GoogleSans-Medium.woff2", "segoeui.ttf", tag_size * S)
        if ImageDraw.Draw(card).textlength(TAGLINE, font=tag_font) <= 1000 * S or tag_size <= 22:
            break
        tag_size -= 1

    draw = ImageDraw.Draw(card)
    logo_d = 132 * S
    name_box = draw.textbbox((0, 0), NAME, font=name_font, anchor="ls")
    name_h = -name_box[1]  # ascent above the baseline
    tag_box = draw.textbbox((0, 0), TAGLINE, font=tag_font, anchor="ls")
    tag_h = -tag_box[1]

    gap1, gap2, rule_h, gap3 = 40 * S, 30 * S, 6 * S, 34 * S
    block = logo_d + gap1 + name_h + gap2 + rule_h + gap3 + tag_h
    top = (h - block) // 2 - 18 * S  # nudge up; the domain sits below

    shapes = draw_logo(card, (w // 2, top + logo_d // 2), logo_d)

    y = top + logo_d + gap1 + name_h
    draw.text((w // 2, y), NAME, font=name_font, fill=TEXT, anchor="ms")

    y += gap2
    rule_w = 96 * S
    for x in range(rule_w):
        t = x / (rule_w - 1)
        c = tuple(round(TEAL[i] + (MINT[i] - TEAL[i]) * t) for i in range(3))
        draw.line([(w // 2 - rule_w // 2 + x, y), (w // 2 - rule_w // 2 + x, y + rule_h)], fill=c)

    y += rule_h + gap3 + tag_h
    draw.text((w // 2, y), TAGLINE, font=tag_font, fill=MUTED, anchor="ms")

    # Domain, tracked out, pinned near the bottom edge.
    tracking = 3 * S
    label = DOMAIN.upper()
    total = sum(draw.textlength(ch, font=domain_font) for ch in label) + tracking * (len(label) - 1)
    x = w // 2 - total / 2
    for ch in label:
        draw.text((x, h - 52 * S), ch, font=domain_font, fill=MINT, anchor="ls")
        x += draw.textlength(ch, font=domain_font) + tracking

    card = card.convert("RGB").resize((W, H), Image.LANCZOS)
    card.save(OUT, optimize=True)
    print(f"wrote {OUT.relative_to(ROOT)}  {W}x{H}  {OUT.stat().st_size:,} B")
    print(f"logo shapes drawn: {shapes}  name font: {name_file}  tagline font: {tag_file} @ {tag_size}px")


if __name__ == "__main__":
    main()
