import { describe, expect, test } from 'vitest';
import { localize } from '../../src/lib/content';
import { getSite } from '../../src/lib/site';

describe('localize', () => {
  test('localize falls back to en for empty strings and arrays', () => {
    expect(localize({ en: { a: 'A', b: ['x'] }, la: { a: '', b: [] } }, 'la')).toEqual({ a: 'A', b: ['x'] });
  });

  test('localize merges translated list items by index', () => {
    expect(localize({ en: { r: [{ t: 'A', k: 1 }] }, la: { r: [{ t: 'ກ' }] } }, 'la').r[0]).toEqual({ t: 'ກ', k: 1 });
  });
});

describe('getSite', () => {
  test('services are sorted by order and drafts hidden', () => {
    const services = getSite().services('en');
    expect(services[0].slug).toBe('tour-travel');
    expect(services.every((s) => s.published !== false)).toBe(true);
  });

  test('home rooms are localized', () => {
    expect(getSite().home('la').rooms[0].title).toBe('ທ່ອງທ່ຽວ ແລະ ທົວ');
    expect(getSite().home('la').rooms[0].link).toBe('services/tour-travel');
  });
});
