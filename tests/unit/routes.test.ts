import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, test } from 'vitest';

// Every page of the old site must exist in the new build (same URLs).
const OLD = path.resolve('../MVMGROUP.LA/preview');
const NEW = path.resolve('dist');

function pages(dir: string, base = ''): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const rel = path.join(base, e.name);
    if (e.isDirectory()) return pages(path.join(dir, e.name), rel);
    return e.name === 'index.html' ? [base] : [];
  });
}

const oldPages = pages(OLD).filter((p) => /^(en|la|zh)(\/|$)/.test(p));
const missing = (prefix: RegExp) => oldPages.filter((p) => prefix.test(p) && !fs.existsSync(path.join(NEW, p, 'index.html')));

describe('route parity (run after npm run build)', () => {
  test('old routes exist (group/services/brands)', () => {
    expect(oldPages.length).toBeGreaterThan(50);
    expect(missing(/^(en|la|zh)\/(about|group|services|brands)(\/|$)/)).toEqual([]);
  });
  test('old routes exist (all)', () => {
    expect(missing(/./)).toEqual([]);
  });
});
