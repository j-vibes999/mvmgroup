import { expect, test } from 'vitest';
import { contactLinks, isPlaceholder } from '../../src/lib/contact';

test('placeholder contacts render no links', () => {
  const links = contactLinks(
    { contact: { phone: '+856 20 XXXX XXXX', whatsapp: '+856 20 XXXX XXXX', wechat: 'MVMGROUP-XXXX', email: 'info@mvmgroup.la' } },
    'en',
  );
  const byKind = Object.fromEntries(links.map((l) => [l.kind, l.href]));
  expect(byKind.phone).toBeNull();
  expect(byKind.whatsapp).toBeNull();
  expect(byKind.wechat).toBeNull();
  expect(byKind.email).toBe('mailto:info@mvmgroup.la');
});

test('real contacts become links', () => {
  const links = contactLinks({ contact: { phone: '+856 20 5555 1234', whatsapp: '+856 20 5555 1234', wechat: 'mvm-la', email: '' } }, 'la');
  const byKind = Object.fromEntries(links.map((l) => [l.kind, l.href]));
  expect(byKind.phone).toBe('tel:+8562055551234');
  expect(byKind.whatsapp).toBe('https://wa.me/8562055551234');
  expect(byKind.wechat).toBe('/la/contact/#wechat');
  expect(isPlaceholder('to be added')).toBe(true);
});

import { creditsFor } from '../../src/lib/credits';

test('credits list each licensed photo once and skip unknown ones', () => {
  expect(creditsFor(['/img/lao/xt-door.jpg', '/img/lao/xt-door.jpg', '/uploads/own.jpg', undefined])).toEqual([
    'Wat Xieng Thong door: Gerd Eichmann, CC BY-SA 4.0',
  ]);
});

import { webp } from '../../src/lib/images';

test('webp swaps to an existing sibling only', () => {
  expect(webp('/img/photos/laos-mekong-wide.jpg')).toBe('/img/photos/laos-mekong-wide.webp');
  expect(webp('/uploads/missing.jpg')).toBe('/uploads/missing.jpg');
  expect(webp(undefined)).toBeUndefined();
});
