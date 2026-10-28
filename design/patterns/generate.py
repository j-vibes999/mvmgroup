"""Generate the MVM Lao pattern set as SVG.

Woven motifs (sinh supplementary weft) are drawn from bitmaps, one cell per
thread crossing, so they read as weaving rather than clip-art. Lai kham
(gold stencil) rosettes are drawn from rotated petals, after the medallions
on the walls of Wat Xieng Thong.

Run: python3 generate.py   (writes *.svg next to this file)
"""
import math
import os

OUT = os.path.dirname(os.path.abspath(__file__))
GOLD = "#C9A45C"


def svg(w, h, body, extra=""):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" '
            f'width="{w}" height="{h}" fill="{GOLD}"{extra}>{body}</svg>\n')


def bitmap(rows, cell, x0=0, y0=0):
    """Turn rows of '#'/'.' into merged horizontal rects."""
    out = []
    for y, row in enumerate(rows):
        x = 0
        while x < len(row):
            if row[x] == "#":
                s = x
                while x < len(row) and row[x] == "#":
                    x += 1
                out.append(f'<rect x="{x0 + s * cell}" y="{y0 + y * cell}" '
                           f'width="{(x - s) * cell}" height="{cell}"/>')
            else:
                x += 1
    return "".join(out)


def mirror4(quarter):
    """Mirror a top-left quarter (odd size, centre row/col included) into a full motif."""
    rows = [r + r[-2::-1] for r in quarter]
    return rows + rows[-2::-1]


# ---- 1. Khor (naga hook) lozenge: the hooked diamond of Lao sinh ----------
KHOR_Q = [
    "..........#",
    ".........#.",
    "........#.#",
    ".......#.#.",
    "......#.#..",
    ".....#.#.##",
    "....#.#..#.",
    "...#.#..##.",
    "..#.#..#..#",
    ".#.#..#.##.",
    "#.#..#.#..#",
]
khor = mirror4(KHOR_Q)

# ---- 2. Diamond chain for borders (teen sinh band) -----------------------
CHAIN = [
    "###########################",
    "...........................",
    "#.....#.....#.....#.....#..",
    ".#...#.#...#.#...#.#...#.#.",
    "..#.#...#.#...#.#...#.#...#",
    "...#..#..#..#..#..#..#..#..",
    "..#.#...#.#...#.#...#.#...#",
    ".#...#.#...#.#...#.#...#.#.",
    "#.....#.....#.....#.....#..",
    "...........................",
    "###########################",
]

# ---- 3. Sawtooth "fan pla" edge -------------------------------------------
SAW = [
    "######",
    ".####.",
    "..##..",
]


def write(name, content):
    with open(os.path.join(OUT, name), "w") as f:
        f.write(content)
    print("wrote", name)


def tile_khor(cell=4):
    n = len(khor)
    size = n * cell
    body = bitmap(khor, cell)
    write("khor-lozenge.svg", svg(size, size, body))
    # Half-drop repeat tile for backgrounds: motif + four quarter motifs at corners.
    gap = 6 * cell
    t = size + gap
    parts = [bitmap(khor, cell, gap // 2, gap // 2)]
    for dx, dy in ((-t // 2, -t // 2), (t // 2, -t // 2), (-t // 2, t // 2), (t // 2, t // 2)):
        parts.append(bitmap(khor, cell, gap // 2 + dx, gap // 2 + dy))
    write("khor-lattice-tile.svg", svg(t, t, "".join(parts), ' opacity="1"'))


def border_chain(cell=3):
    w = 24 * cell  # one repeat (6-cell period x4) so it tiles seamlessly
    rows = [r[:24] for r in CHAIN]
    saw_top = "".join(bitmap(SAW, cell, i * 6 * cell, 0) for i in range(4))
    saw_bot = "".join(bitmap(SAW[::-1], cell, i * 6 * cell, (len(rows) + 4) * cell) for i in range(4))
    body = saw_top + bitmap(rows, cell, 0, 4 * cell) + saw_bot
    write("sinh-border.svg", svg(w, (len(rows) + 7) * cell, body))


def petal(r0, r1, width):
    """A pointed petal from radius r0 to r1 along -y."""
    w = width
    return (f"M0,{-r0} C{w},{-r0 - (r1 - r0) * .35} {w * .6},{-r1 + (r1 - r0) * .15} 0,{-r1} "
            f"C{-w * .6},{-r1 + (r1 - r0) * .15} {-w},{-r0 - (r1 - r0) * .35} 0,{-r0}Z")


def ring(count, d, offset=0.0, **attrs):
    a = " ".join(f'{k.replace("_", "-")}="{v}"' for k, v in attrs.items())
    return "".join(f'<path d="{d}" transform="rotate({offset + i * 360 / count})" {a}/>' for i in range(count))


def rosette():
    """Lai kham medallion: concentric petal rings, as on the Wat Xieng Thong walls."""
    b = []
    b.append('<circle r="98" fill="none" stroke-width="2" stroke="%s"/>' % GOLD)
    b.append('<circle r="92" fill="none" stroke-width="1" stroke="%s"/>' % GOLD)
    b.append(ring(48, "M0,-88 a3,3 0 1,0 0.01,0", ))  # bead ring
    b.append(ring(16, petal(46, 82, 16)))
    b.append(ring(16, petal(50, 72, 6), 11.25, fill="#0E0B08"))
    b.append('<circle r="44" fill="none" stroke-width="1.5" stroke="%s"/>' % GOLD)
    b.append(ring(8, petal(14, 40, 14), 22.5))
    b.append(ring(8, petal(18, 34, 5), 22.5, fill="#0E0B08"))
    b.append('<circle r="11"/><circle r="5" fill="#0E0B08"/>')
    write("laikham-rosette.svg", svg(200, 200, f'<g transform="translate(100 100)">{"".join(b)}</g>'))


def champa():
    """Dok champa (frangipani), Laos' national flower: five overlapping petals in a pinwheel."""
    # Broad obovate petal, offset to one side so the five overlap in a spiral.
    p = "M0,0 C16,-6 34,-26 28,-46 C22,-62 -4,-62 -12,-48 C-18,-36 -10,-14 0,0Z"
    body = ring(5, p, stroke="#0E0B08", stroke_width="2.4", stroke_linejoin="round")
    body += '<circle r="9" fill="#E8D19A"/>'
    write("dok-champa.svg", svg(120, 120, f'<g transform="translate(60 62)">{body}</g>'))


def lotus_frieze():
    """Kap bua: a row of lotus petals over a bead row, as on temple plinths and borders."""
    w, h = 48, 46
    petal = ("M24,4 C30,12 34,20 34,27 C34,33 29,36 24,36 C19,36 14,33 14,27 "
             "C14,20 18,12 24,4Z")
    inner = "M24,12 C27,17 29,22 29,26 C29,30 27,32 24,32 C21,32 19,30 19,26 C19,22 21,17 24,12Z"
    body = (f'<path d="{petal}"/><path d="{inner}" fill="#0E0B08"/>'
            f'<path d="M24,18 C25.5,21 26,24 26,26 C26,28 25,29 24,29 C23,29 22,28 22,26 C22,24 22.5,21 24,18Z"/>'
            f'<path d="M0,27 C6,27 10,31 12,36 H0Z M48,27 C42,27 38,31 36,36 H48Z"/>'
            f'<rect x="0" y="38" width="48" height="1.6"/>'
            f'<circle cx="12" cy="43" r="2.2"/><circle cx="24" cy="43" r="2.2"/><circle cx="36" cy="43" r="2.2"/>'
            f'<circle cx="0" cy="43" r="2.2"/><circle cx="48" cy="43" r="2.2"/>')
    write("lotus-frieze.svg", svg(w, h, body))


def column_strip(cell=3):
    """Vertical strip after the stencilled columns of Wat Xieng Thong: diamonds between bead rows."""
    rows = [
        "#.........#",
        "#....#....#",
        "#...#.#...#",
        "#..#.#.#..#",
        "#.#.###.#.#",
        "#..#.#.#..#",
        "#...#.#...#",
        "#....#....#",
        "#.........#",
        "#..#.#.#..#",
        "#.........#",
    ]
    write("column-strip.svg", svg(len(rows[0]) * cell, len(rows) * cell, bitmap(rows, cell)))


if __name__ == "__main__":
    tile_khor()
    border_chain()
    rosette()
    champa()
    lotus_frieze()
    column_strip()
