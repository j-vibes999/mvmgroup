import { expect, test } from '@playwright/test';

test('netlify forms', async ({ page }) => {
  for (const [path, name] of [['/en/contact/', 'contact'], ['/en/quote/', 'quote'], ['/en/partnership/', 'partnership']]) {
    await page.goto(path);
    const form = page.locator(`form[data-netlify="true"][name="${name}"]`);
    await expect(form, path).toHaveCount(1);
    await expect(form.locator('input[name="bot-field"]')).toHaveCount(1);
    await expect(form.locator('input[name="form-name"]')).toHaveValue(name);
    await expect(form).toHaveAttribute('action', '/en/thank-you/');
  }
});

test('form validation blocks empty submit', async ({ page }) => {
  await page.goto('/la/contact/');
  await page.locator('form[name="contact"] button[type="submit"]').click();
  await expect(page).toHaveURL(/\/la\/contact\/$/);
  await expect(page.locator('form[name="contact"] .field__error').first()).toBeVisible();
});

test.describe('360px', () => {
  test.use({ viewport: { width: 360, height: 740 }, isMobile: true, hasTouch: true });
  test('no horizontal overflow at 360px', async ({ page }) => {
    for (const url of ['/la/', '/zh/', '/la/services/tour-travel/', '/la/contact/', '/zh/brands/big-elephant-yogurt/', '/la/news/']) {
      await page.goto(url);
      const ok = await page.evaluate(() => {
        const body = document.querySelector('[data-win-body]');
        return document.documentElement.scrollWidth <= 360 && (!body || body.scrollWidth <= body.clientWidth + 1);
      });
      expect(ok, url).toBe(true);
    }
  });
});

test('news category and article open in the window', async ({ page }) => {
  await page.goto('/zh/news/');
  await expect(page.locator('[data-window] h1')).toBeVisible();
  const first = page.locator('[data-win-body] a.card').first();
  const href = await first.getAttribute('href');
  await page.goto(href!);
  await expect(page.locator('[data-window] article, [data-window] .prose').first()).toBeVisible();
});

test('localized 404', async ({ page }) => {
  await page.goto('/la/404/');
  await expect(page.locator('[data-window] h1')).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
});
