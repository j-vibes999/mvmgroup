// Layout shared with shell.css: where the emblem sits and how big it is.
export function stageLayout(w: number, h: number) {
  const mobile = w < 760;
  if (mobile) return { mobile, cy: h * 0.27, diameter: Math.min(w * 0.6, h * 0.34) };
  const ry = h * (h <= 640 ? 0.31 : 0.335);
  return { mobile, cy: h * 0.465, diameter: ry * 1.04, ry, rx: Math.min(w * 0.36, ry * 1.45) };
}
