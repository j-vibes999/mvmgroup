import { expect, test } from 'vitest';
import { t, url } from '../../src/lib/i18n';

test('url builds trailing-slash paths', () => {
  expect(url('la', 'services', 'x')).toBe('/la/services/x/');
  expect(url('en')).toBe('/en/');
});

test('t returns locale string with en fallback', () => {
  expect(t('la', 'nav.home')).toBe('ໜ້າຫຼັກ');
  expect(t('zh', 'nav.home')).toBe('首页');
});
