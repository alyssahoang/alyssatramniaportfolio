"""Hand-drawn SVG card illustrations in the portfolio palette, rendered to 1200x750 PNG with headless Chrome."""
import math, random, subprocess, sys
from pathlib import Path

SP = Path(__file__).parent
OUT = Path(r"C:\(Local) Projects\web-portfolio\public\projects")
CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

BG, CHIP, BLUE, LIGHT, ORANGE = "#111827", "#1F2937", "#3B82F6", "#93C5FD", "#F27D0D"
W, H = 1200, 750

DEFS = f"""
<defs>
  <radialGradient id="glow" cx="50%" cy="45%" r="65%">
    <stop offset="0" stop-color="#1e3a8a" stop-opacity="0.55"/><stop offset="1" stop-color="{BG}" stop-opacity="0"/>
  </radialGradient>
  <linearGradient id="route" x1="0" x2="1"><stop offset="0" stop-color="{BLUE}" stop-opacity="0.15"/><stop offset="1" stop-color="{LIGHT}"/></linearGradient>
  <linearGradient id="screen" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1e3a8a"/><stop offset="1" stop-color="{CHIP}"/></linearGradient>
  <linearGradient id="wet" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{BLUE}" stop-opacity="0.35"/><stop offset="1" stop-color="{BG}" stop-opacity="0"/></linearGradient>
  <filter id="blur"><feGaussianBlur stdDeviation="6"/></filter>
  <filter id="soft"><feGaussianBlur stdDeviation="1.2"/></filter>
</defs>
<rect width="{W}" height="{H}" fill="{BG}"/>
<rect width="{W}" height="{H}" fill="url(#glow)"/>
"""


def svg(body: str) -> str:
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">{DEFS}{body}</svg>'


def grid(step=60, op=0.06):
    out = []
    for x in range(0, W + 1, step):
        out.append(f'<line x1="{x}" y1="0" x2="{x}" y2="{H}" stroke="{LIGHT}" stroke-opacity="{op}"/>')
    for y in range(0, H + 1, step):
        out.append(f'<line x1="0" y1="{y}" x2="{W}" y2="{y}" stroke="{LIGHT}" stroke-opacity="{op}"/>')
    return "".join(out)


# ----------------------------------------------------------------------------- 1. VN stock scraper
def vn_stock():
    rnd = random.Random(11)
    b = [grid()]
    # skyline silhouette
    x = 0
    while x < W:
        w = rnd.randint(28, 80); h = rnd.randint(60, 220)
        b.append(f'<rect x="{x}" y="{H-h}" width="{w}" height="{h}" fill="{CHIP}"/>')
        for wy in range(H - h + 14, H - 10, 22):
            for wx in range(x + 8, x + w - 8, 16):
                if rnd.random() < 0.35:
                    b.append(f'<rect x="{wx}" y="{wy}" width="6" height="9" fill="{BLUE}" fill-opacity="0.35"/>')
        x += w + rnd.randint(6, 22)
    b.append(f'<rect x="0" y="{H-240}" width="{W}" height="240" fill="{BG}" fill-opacity="0.35"/>')

    # target table (right)
    tx, ty, tw, th = 700, 150, 400, 420
    b.append(f'<rect x="{tx-18}" y="{ty-18}" width="{tw+36}" height="{th+36}" rx="26" fill="{BLUE}" fill-opacity="0.18" filter="url(#blur)"/>')
    b.append(f'<rect x="{tx}" y="{ty}" width="{tw}" height="{th}" rx="16" fill="{CHIP}" stroke="{BLUE}" stroke-width="2"/>')
    b.append(f'<rect x="{tx}" y="{ty}" width="{tw}" height="46" rx="16" fill="{BLUE}"/>')
    b.append(f'<rect x="{tx}" y="{ty+30}" width="{tw}" height="16" fill="{BLUE}"/>')
    for r in range(9):
        y = ty + 46 + 20 + r * 40
        b.append(f'<line x1="{tx+18}" y1="{y+24}" x2="{tx+tw-18}" y2="{y+24}" stroke="{LIGHT}" stroke-opacity="0.15"/>')
        b.append(f'<rect x="{tx+24}" y="{y}" width="58" height="12" rx="6" fill="{LIGHT}" fill-opacity="0.85"/>')
        for c, cw in enumerate((70, 50, 60)):
            b.append(f'<rect x="{tx+118+c*95}" y="{y}" width="{cw}" height="12" rx="6" fill="{LIGHT}" fill-opacity="{0.25+0.15*(c%2)}"/>')
        col = ORANGE if r == 3 else BLUE
        b.append(f'<rect x="{tx+tw-70}" y="{y-2}" width="42" height="16" rx="8" fill="{col}" fill-opacity="0.9"/>')

    # scattered browser windows with candlesticks (left)
    wins = [(70, 90, 250, 160), (300, 210, 220, 140), (110, 330, 230, 150), (350, 420, 260, 160), (60, 540, 220, 130)]
    for i, (wx, wy, ww, wh) in enumerate(wins):
        b.append(f'<rect x="{wx}" y="{wy}" width="{ww}" height="{wh}" rx="12" fill="{CHIP}" stroke="{LIGHT}" stroke-opacity="0.35"/>')
        b.append(f'<rect x="{wx}" y="{wy}" width="{ww}" height="26" rx="12" fill="{BLUE}" fill-opacity="0.35"/>')
        for d in range(3):
            b.append(f'<circle cx="{wx+16+d*14}" cy="{wy+13}" r="4" fill="{LIGHT}" fill-opacity="0.7"/>')
        n = 9
        for k in range(n):
            cx = wx + 22 + k * (ww - 44) / (n - 1)
            o, c = rnd.randint(wh // 3, wh - 30), rnd.randint(wh // 3, wh - 30)
            top, bot = min(o, c), max(o, c)
            col = LIGHT if c <= o else ORANGE
            b.append(f'<line x1="{cx}" y1="{wy+top-12}" x2="{cx}" y2="{wy+bot+12}" stroke="{col}" stroke-opacity="0.8"/>')
            b.append(f'<rect x="{cx-5}" y="{wy+top}" width="10" height="{max(6, bot-top)}" rx="2" fill="{col}"/>')
        # route into table
        sx, sy = wx + ww, wy + wh / 2
        ex, ey = tx, ty + 60 + i * 70
        k = min(140, (ex - sx) * 0.45)
        b.append(f'<path d="M{sx},{sy} C{sx+k:.0f},{sy} {ex-k:.0f},{ey} {ex},{ey}" fill="none" stroke="url(#route)" stroke-width="3"/>')
        b.append(f'<circle cx="{ex}" cy="{ey}" r="6" fill="{LIGHT}"/>')
        for t in (0.35, 0.7):
            px = sx + (ex - sx) * t; py = sy + (ey - sy) * (3 * t * t - 2 * t * t * t)
            b.append(f'<circle cx="{px}" cy="{py}" r="4" fill="{LIGHT}" fill-opacity="0.9"/>')
    return svg("".join(b))


# ----------------------------------------------------------------------------- 2. weather shocks thesis
def thesis():
    rnd = random.Random(7)
    b = [grid(80, 0.04)]
    # street + wet reflection
    b.append(f'<rect x="0" y="520" width="{W}" height="230" fill="{CHIP}"/>')
    b.append(f'<rect x="0" y="520" width="{W}" height="230" fill="url(#wet)"/>')
    b.append(f'<line x1="0" y1="520" x2="{W}" y2="520" stroke="{BLUE}" stroke-opacity="0.5" stroke-width="2"/>')
    # distant city blocks
    x = 0
    while x < W:
        w = rnd.randint(50, 120); h = rnd.randint(90, 260)
        b.append(f'<rect x="{x}" y="{520-h}" width="{w}" height="{h}" fill="#172033"/>')
        b.append(f'<rect x="{x}" y="{520}" width="{w}" height="{h*0.45}" fill="#172033" fill-opacity="0.5" filter="url(#soft)"/>')
        x += w + rnd.randint(10, 30)
    # clouds
    def cloud(cx, cy, s, op):
        parts = [(0, 0, 90), (-90, 20, 65), (95, 15, 70), (-40, -35, 60), (50, -40, 62), (150, 30, 45)]
        return "".join(f'<circle cx="{cx+dx*s}" cy="{cy+dy*s}" r="{r*s}" fill="#1e293b" fill-opacity="{op}"/>' for dx, dy, r in parts)
    b.append(cloud(260, 120, 1.25, 0.95)); b.append(cloud(700, 90, 1.05, 0.9)); b.append(cloud(1050, 150, 1.15, 0.95))
    b.append(f'<rect x="0" y="0" width="{W}" height="260" fill="{BG}" fill-opacity="0"/>')
    # rain
    for _ in range(260):
        rx, ry = rnd.randint(0, W), rnd.randint(180, 700); ln = rnd.randint(14, 34)
        b.append(f'<line x1="{rx}" y1="{ry}" x2="{rx-6}" y2="{ry+ln}" stroke="{LIGHT}" stroke-opacity="{rnd.uniform(0.15,0.5)}" stroke-width="2" stroke-linecap="round"/>')
    # laptop with falling chart
    lx, ly = 300, 250
    b.append(f'<rect x="{lx-20}" y="{ly-20}" width="500" height="320" rx="24" fill="{BLUE}" fill-opacity="0.15" filter="url(#blur)"/>')
    b.append(f'<rect x="{lx}" y="{ly}" width="460" height="270" rx="14" fill="#0b1220" stroke="{LIGHT}" stroke-opacity="0.6" stroke-width="3"/>')
    b.append(f'<rect x="{lx+14}" y="{ly+14}" width="432" height="242" rx="8" fill="url(#screen)"/>')
    b.append(f'<rect x="{lx-40}" y="{ly+270}" width="540" height="18" rx="9" fill="#0b1220" stroke="{LIGHT}" stroke-opacity="0.6" stroke-width="3"/>')
    # chart axes + line dropping at the storm
    gx, gy, gw, gh = lx + 50, ly + 40, 360, 190
    for k in range(5):
        b.append(f'<line x1="{gx}" y1="{gy+k*gh/4}" x2="{gx+gw}" y2="{gy+k*gh/4}" stroke="{LIGHT}" stroke-opacity="0.12"/>')
    pts = [(0, 0.55), (0.12, 0.5), (0.24, 0.52), (0.36, 0.45), (0.46, 0.48), (0.55, 0.42), (0.62, 0.85), (0.7, 0.8), (0.8, 0.6), (0.9, 0.5), (1, 0.47)]
    d = " ".join(f"{'M' if i==0 else 'L'}{gx+px*gw:.0f},{gy+py*gh:.0f}" for i, (px, py) in enumerate(pts))
    b.append(f'<path d="{d} L{gx+gw},{gy+gh} L{gx},{gy+gh} Z" fill="{BLUE}" fill-opacity="0.18"/>')
    b.append(f'<path d="{d}" fill="none" stroke="{LIGHT}" stroke-width="4" stroke-linejoin="round"/>')
    b.append(f'<circle cx="{gx+0.62*gw:.0f}" cy="{gy+0.85*gh:.0f}" r="9" fill="{ORANGE}"/>')
    b.append(f'<line x1="{gx+0.58*gw:.0f}" y1="{gy}" x2="{gx+0.58*gw:.0f}" y2="{gy+gh}" stroke="{ORANGE}" stroke-opacity="0.6" stroke-dasharray="6 6"/>')
    # cart icon on the screen corner
    cx, cy = lx + 380, ly + 40
    b.append(f'<path d="M{cx},{cy} h12 l10,36 h34 l8,-24 h-46" fill="none" stroke="{LIGHT}" stroke-width="3" stroke-linejoin="round"/>')
    b.append(f'<circle cx="{cx+28}" cy="{cy+46}" r="4" fill="{LIGHT}"/><circle cx="{cx+52}" cy="{cy+46}" r="4" fill="{LIGHT}"/>')
    # delivery van on the wet street
    vx, vy = 880, 440
    b.append(f'<rect x="{vx}" y="{vy}" width="190" height="80" rx="12" fill="{CHIP}" stroke="{LIGHT}" stroke-opacity="0.7" stroke-width="3"/>')
    b.append(f'<path d="M{vx+190},{vy+20} h40 l30,30 v30 h-70 Z" fill="{CHIP}" stroke="{LIGHT}" stroke-opacity="0.7" stroke-width="3"/>')
    b.append(f'<rect x="{vx+200}" y="{vy+28}" width="34" height="22" rx="4" fill="{BLUE}" fill-opacity="0.6"/>')
    b.append(f'<circle cx="{vx+45}" cy="{vy+82}" r="16" fill="{BG}" stroke="{LIGHT}" stroke-width="4"/><circle cx="{vx+215}" cy="{vy+82}" r="16" fill="{BG}" stroke="{LIGHT}" stroke-width="4"/>')
    b.append(f'<rect x="{vx+256}" y="{vy+58}" width="10" height="10" rx="2" fill="{ORANGE}"/>')
    b.append(f'<rect x="{vx+10}" y="{vy+100}" width="250" height="60" fill="{LIGHT}" fill-opacity="0.08" filter="url(#blur)"/>')
    return svg("".join(b))


# ----------------------------------------------------------------------------- 3. delivery lead time
def delivery():
    rnd = random.Random(3)
    b = [grid(50, 0.05)]
    # dotted "map" of nodes
    for _ in range(140):
        b.append(f'<circle cx="{rnd.randint(40,W-40)}" cy="{rnd.randint(40,H-40)}" r="{rnd.choice([1.5,2,2.5])}" fill="{LIGHT}" fill-opacity="{rnd.uniform(0.15,0.4)}"/>')
    # state-ish regions (soft blobs)
    for cx, cy, r in ((330, 260, 210), (760, 330, 250), (560, 560, 180), (980, 560, 150)):
        b.append(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{BLUE}" fill-opacity="0.06" stroke="{BLUE}" stroke-opacity="0.25" stroke-dasharray="8 10"/>')
    warehouses = [(180, 200), (330, 120), (250, 400), (760, 150), (900, 300), (620, 620), (1040, 640)]
    homes = [(560, 300), (640, 420), (820, 520), (430, 560), (1060, 430), (300, 620)]

    def warehouse(x, y):
        # flat-roofed depot with a sawtooth roofline and an orange loading door
        return (f'<rect x="{x-34}" y="{y-14}" width="68" height="36" rx="3" fill="{CHIP}" stroke="{BLUE}" stroke-width="3"/>'
                f'<path d="M{x-34},{y-14} l17,-14 l17,14 l17,-14 l17,14 Z" fill="{BLUE}"/>'
                f'<rect x="{x-12}" y="{y+2}" width="24" height="20" rx="2" fill="{ORANGE}"/>'
                f'<line x1="{x-12}" y1="{y+9}" x2="{x+12}" y2="{y+9}" stroke="{CHIP}" stroke-width="2"/>'
                f'<line x1="{x-12}" y1="{y+16}" x2="{x+12}" y2="{y+16}" stroke="{CHIP}" stroke-width="2"/>')

    def home(x, y, hot=False):
        col = ORANGE if hot else LIGHT
        return (f'<path d="M{x-22},{y-4} L{x},{y-26} L{x+22},{y-4} Z" fill="{col}"/>'
                f'<rect x="{x-16}" y="{y-4}" width="32" height="26" rx="3" fill="{CHIP}" stroke="{col}" stroke-width="3"/>'
                f'<rect x="{x-5}" y="{y+8}" width="10" height="14" fill="{col}"/>')

    # routes: each home fed by 1-2 warehouses; short = bright, long = dim
    for hi, (hx, hy) in enumerate(homes):
        srcs = sorted(warehouses, key=lambda p: math.dist(p, (hx, hy)))[:2]
        for si, (wx, wy) in enumerate(srcs):
            dist = math.dist((wx, wy), (hx, hy))
            op = max(0.18, 1 - dist / 700)
            width = 4 if dist < 300 else 2.5
            mx, my = (wx + hx) / 2 + (hy - wy) * 0.25, (wy + hy) / 2 - (hx - wx) * 0.25
            b.append(f'<path d="M{wx},{wy} Q{mx:.0f},{my:.0f} {hx},{hy}" fill="none" stroke="{LIGHT}" stroke-opacity="{op:.2f}" stroke-width="{width}" stroke-linecap="round"/>')
            # parcels along the route
            for t in (0.3, 0.62):
                px = (1-t)**2*wx + 2*(1-t)*t*mx + t*t*hx; py = (1-t)**2*wy + 2*(1-t)*t*my + t*t*hy
                size = 10 if si == 0 else 14
                b.append(f'<rect x="{px-size/2:.0f}" y="{py-size/2:.0f}" width="{size}" height="{size}" rx="2" fill="{ORANGE if dist>420 and t==0.62 else BLUE}" transform="rotate(30 {px:.0f} {py:.0f})"/>')
    for x, y in warehouses:
        b.append(warehouse(x, y))
    for i, (x, y) in enumerate(homes):
        b.append(home(x, y, hot=(i == 4)))
    # glow behind the longest route's home
    b.append(f'<circle cx="1060" cy="430" r="60" fill="{ORANGE}" fill-opacity="0.12" filter="url(#blur)"/>')
    return svg("".join(b))


# ----------------------------------------------------------------------------- 4. credit-risk segmentation
def credit_risk():
    rnd = random.Random(5)
    b = [grid(60, 0.07)]
    # faint PC axes
    b.append(f'<line x1="80" y1="620" x2="1120" y2="180" stroke="{LIGHT}" stroke-opacity="0.18" stroke-width="2" stroke-dasharray="10 12"/>')
    b.append(f'<line x1="260" y1="120" x2="900" y2="680" stroke="{LIGHT}" stroke-opacity="0.12" stroke-width="2" stroke-dasharray="10 12"/>')

    def person(x, y, s, col, op):
        return (f'<circle cx="{x}" cy="{y-22*s}" r="{11*s}" fill="{col}" fill-opacity="{op}"/>'
                f'<path d="M{x-18*s},{y+20*s} v-18 a18,18 0 0 1 36,0 v18 Z" fill="{col}" fill-opacity="{op}"/>')

    clusters = [(300, 250, "#2563eb", 26), (820, 220, "#60a5fa", 18), (420, 560, LIGHT, 14), (930, 540, ORANGE, 10)]
    for cx, cy, col, n in clusters:
        b.append(f'<circle cx="{cx}" cy="{cy}" r="{60+n*4}" fill="{col}" fill-opacity="0.10" filter="url(#blur)"/>')
        b.append(f'<circle cx="{cx}" cy="{cy}" r="{60+n*4}" fill="none" stroke="{col}" stroke-opacity="0.35" stroke-dasharray="6 8"/>')
        for _ in range(n):
            a, r = rnd.uniform(0, 6.283), rnd.uniform(0, 45 + n * 3)
            x, y = cx + math.cos(a) * r, cy + math.sin(a) * r * 0.7
            b.append(person(x, y, rnd.uniform(0.8, 1.15), col, rnd.uniform(0.6, 1)))
    # floating cards + calendar
    def card(x, y, rot, col):
        return (f'<g transform="rotate({rot} {x} {y})"><rect x="{x-46}" y="{y-28}" width="92" height="56" rx="8" fill="{CHIP}" stroke="{col}" stroke-width="2.5"/>'
                f'<rect x="{x-46}" y="{y-14}" width="92" height="12" fill="{col}" fill-opacity="0.7"/>'
                f'<rect x="{x-34}" y="{y+8}" width="30" height="7" rx="3" fill="{LIGHT}" fill-opacity="0.7"/></g>')
    b.append(card(600, 150, -12, BLUE)); b.append(card(640, 400, 8, LIGHT)); b.append(card(160, 640, -6, ORANGE))
    cx, cy = 1080, 330
    b.append(f'<rect x="{cx-40}" y="{cy-36}" width="80" height="74" rx="8" fill="{CHIP}" stroke="{LIGHT}" stroke-width="2.5"/>')
    b.append(f'<rect x="{cx-40}" y="{cy-36}" width="80" height="18" rx="8" fill="{BLUE}"/>')
    for r in range(3):
        for c in range(4):
            fill = ORANGE if (r, c) == (1, 2) else LIGHT
            b.append(f'<rect x="{cx-32+c*18}" y="{cy-8+r*14}" width="10" height="8" rx="2" fill="{fill}" fill-opacity="0.75"/>')
    return svg("".join(b))


def render(name, s):
    p = SP / f"{name}.svg"; p.write_text(s, encoding="utf-8")
    out = OUT / f"{name}.png"
    subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars", f"--window-size={W},{H}",
                    f"--screenshot={out}", p.as_uri()], check=True, capture_output=True, timeout=120)
    print("rendered", out.name)


if __name__ == "__main__":
    for name, fn in {"vn-stock": vn_stock, "thesis": thesis, "delivery": delivery, "credit-risk": credit_risk}.items():
        if not sys.argv[1:] or name in sys.argv[1:]:
            render(name, fn())
