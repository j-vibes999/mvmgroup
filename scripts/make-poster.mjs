// Renders the home 3D scene once and saves it as the hero poster
// (the LCP image, and what visitors without WebGL or with reduced motion see).
// Usage: node scripts/make-poster.mjs [baseUrl]   (dev or preview server running)
import { writeFileSync } from 'node:fs';
import { chromium } from '@playwright/test';

const base = process.argv[2] || 'http://localhost:4400';
const browser = await chromium.launch({ args: ['--use-angle=metal', '--enable-gpu'] });
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1 });
await page.goto(`${base}/en/`);
await page.waitForSelector('canvas[data-3d="ready"]', { timeout: 20000 });
await page.addStyleTag({ content: '.site-header,.home-hero__copy,.home-hero__cue,.quick,astro-dev-toolbar{visibility:hidden!important}.home-hero::after{display:none}' });
await page.mouse.move(800, 300);
await page.waitForTimeout(2500);
const canvas = page.locator('canvas[data-3d="ready"]');
const png = await canvas.screenshot({ type: 'png' });
// Encode to WebP with the browser's own encoder (no native tooling needed).
const webp = await page.evaluate(async (b64) => {
  const img = new Image();
  img.src = `data:image/png;base64,${b64}`;
  await img.decode();
  const c = document.createElement('canvas');
  c.width = img.width;
  c.height = img.height;
  c.getContext('2d').drawImage(img, 0, 0);
  const blob = await new Promise((r) => c.toBlob(r, 'image/webp', 0.78));
  return btoa(String.fromCharCode(...new Uint8Array(await blob.arrayBuffer())));
}, png.toString('base64'));
writeFileSync('public/img/hero-poster.webp', Buffer.from(webp, 'base64'));
await browser.close();
console.log('saved public/img/hero-poster.webp');
