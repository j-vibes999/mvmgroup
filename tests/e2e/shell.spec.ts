import { expect, test, type Page } from '@playwright/test';

const collectErrors = (page: Page) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  return errors;
};

test('ring has 8 rooms', async ({ page }) => {
  await page.goto('/en/');
  const rooms = page.locator('[data-ring] a');
  await expect(rooms).toHaveCount(8);
  await expect(rooms.first()).toHaveAttribute('href', '/en/services/tour-travel/');
});

test('html lang per locale', async ({ page }) => {
  await page.goto('/la/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'lo');
  await page.goto('/zh/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'zh-Hans');
});

test('hreflang alternates', async ({ page }) => {
  await page.goto('/en/about/');
  await expect(page.locator('link[rel=alternate][hreflang]')).toHaveCount(4);
  await expect(page.locator('link[hreflang="x-default"]')).toHaveAttribute('href', 'https://www.mvmgroup.la/en/about/');
});

test('language switch keeps path', async ({ page }) => {
  await page.goto('/en/services/tour-travel/');
  await expect(page.locator('[data-topbar] [data-lang-link="la"]')).toHaveAttribute('href', '/la/services/tour-travel/');
});

test('deep link opens window', async ({ page }) => {
  await page.goto('/la/services/tour-travel/');
  await expect(page.locator('[data-window][open]')).toBeVisible();
  await expect(page.locator('[data-window] h1')).toContainText('ທົວທ່ຽວລາວ'); // hub_title, as on the old site
  await expect(page.locator('[data-stage]')).toHaveCount(1);
});

test('close returns home', async ({ page }) => {
  await page.goto('/la/services/tour-travel/');
  await page.locator('[data-window-close]').click();
  await expect(page).toHaveURL(/\/la\/$/);
  await expect(page.locator('[data-window][open]')).toHaveCount(0);
});

test('page never scrolls', async ({ page }) => {
  for (const url of ['/en/', '/en/services/tour-travel/']) {
    await page.goto(url);
    const fits = await page.evaluate(() => document.scrollingElement!.scrollHeight <= innerHeight + 1);
    expect(fits, url).toBe(true);
  }
});

test('3D ready on desktop', async ({ page }) => {
  const errors = collectErrors(page);
  await page.goto('/en/');
  await expect(page.locator('canvas[data-3d="ready"]')).toHaveCount(1, { timeout: 10000 });
  expect(errors).toEqual([]);
});

test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' });
  test('no 3D with reduced motion', async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto('/en/');
    await page.waitForTimeout(1500);
    await expect(page.locator('canvas[data-3d="ready"]')).toHaveCount(0);
    await expect(page.locator('[data-stage-poster]')).toBeVisible();
    expect(errors).toEqual([]);
  });
});

test.describe('mobile', () => {
  test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  test('mobile shows dock', async ({ page }) => {
    await page.goto('/la/');
    await expect(page.locator('[data-dock] a')).toHaveCount(4);
    const allIn = await page.$$eval('[data-ring] a', (els) =>
      els.every((e) => {
        const r = e.getBoundingClientRect();
        return r.top >= 0 && r.bottom <= innerHeight;
      }),
    );
    expect(allIn).toBe(true);
  });
});

test('desktop ring sits around the emblem', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/en/');
  const boxes = await page.$$eval('[data-ring] a', (els) => els.map((e) => e.getBoundingClientRect().toJSON()));
  const centers = boxes.map((b) => ({ x: b.x + b.width / 2, y: b.y + b.height / 2 }));
  // first room at the top centre, fifth at the bottom centre, all on screen and clear of the top bar
  expect(Math.abs(centers[0].x - 720)).toBeLessThan(4);
  expect(centers[4].y).toBeGreaterThan(centers[0].y + 400);
  const bar = await page.$$eval('[data-topbar] > *', (els) => els.map((e) => e.getBoundingClientRect().toJSON()));
  const overlaps = (a: DOMRect, b: DOMRect) => a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom;
  for (const b of boxes) {
    expect(b.top).toBeGreaterThan(0);
    expect(b.bottom).toBeLessThan(900);
    for (const t of bar) expect(overlaps(b, t)).toBe(false);
  }
});

test('opening a window moves focus into it', async ({ page }) => {
  await page.goto('/en/');
  await page.locator('[data-room="0"]').click();
  await expect(page.locator('[data-window][open]')).toBeVisible();
  await expect(page.locator('[data-window] h1')).toBeFocused();
});
