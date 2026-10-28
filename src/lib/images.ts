import fs from 'node:fs';
import path from 'node:path';

// Prefer a .webp next to a .jpg/.png in public/ (the photo set ships both).
export function webp(src: string | undefined): string | undefined {
  if (!src || !/\.(jpe?g|png)$/i.test(src) || /^https?:/.test(src)) return src;
  const candidate = src.replace(/\.(jpe?g|png)$/i, '.webp');
  return fs.existsSync(path.join(process.cwd(), 'public', candidate)) ? candidate : src;
}
