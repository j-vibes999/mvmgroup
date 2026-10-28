import { expect, test } from 'vitest';
import { roomsFor } from '../../src/lib/rooms';

test('rooms resolve brand logos and external links', () => {
  const rooms = roomsFor('la');
  expect(rooms).toHaveLength(8);
  expect(rooms[0].href).toBe('/la/services/tour-travel/');
  expect(rooms[0].title).toBe('ທ່ອງທ່ຽວ ແລະ ທົວ');
  expect(rooms[0].icon).toBe('mountain');
  expect(rooms[2].logo).toBe('/uploads/brands/big-elephant-logo.webp');
  expect(rooms[3].external).toBe(true);
  expect(rooms[3].href).toBe('https://www.sophanua.online/');
  expect(rooms[3].host).toBe('sophanua.online');
  expect(rooms[3].logo).toBe('/uploads/brands/sophanua-logo.webp');
});
