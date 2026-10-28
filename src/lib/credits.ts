// Photo credits for licensed images (Wikimedia Commons). CC BY and CC BY-SA
// require a visible credit; pages list the photos they show and the footer
// prints the matching lines. Sources: design/references/CREDITS.csv,
// design/photos/CREDITS.csv.
export const PHOTO_CREDITS: Record<string, string> = {
  '/img/lao/that-luang-sunrise.jpg': 'Pha That Luang: Benh Lieu Song, CC BY-SA 4.0',
  '/img/lao/xt-monks-yard.jpg': 'Wat Xieng Thong: Basile Morin, CC BY-SA 4.0',
  '/img/lao/xt-evening-prayer.jpg': 'Wat Xieng Thong: McKay Savage, CC BY 2.0',
  '/img/lao/xt-golden-wall.jpg': 'Wat Xieng Thong golden wall: Phillip Maiwald, CC BY-SA 3.0',
  '/img/lao/xt-black-gold-interior.jpg': 'Wat Xieng Thong interior: shankar s., CC BY 2.0',
  '/img/lao/xt-door.jpg': 'Wat Xieng Thong door: Gerd Eichmann, CC BY-SA 4.0',
};

const OLD_PHOTOS = /\/img\/photos\/laos-(kuang-si|vang-vieng|mekong|phou-si|wat-mai)/;
const THAT_LUANG_OLD = /\/img\/photos\/laos-that-luang/;

// Credit lines for the given image paths (unknown or CC0 paths are skipped).
export function creditsFor(paths: (string | undefined)[]): string[] {
  const out = new Set<string>();
  for (const p of paths) {
    if (!p) continue;
    if (PHOTO_CREDITS[p]) out.add(PHOTO_CREDITS[p]);
    else if (OLD_PHOTOS.test(p)) out.add('Laos landscapes: Basile Morin, CC BY-SA 4.0');
    else if (THAT_LUANG_OLD.test(p)) out.add('Pha That Luang: Benh Lieu Song, CC BY-SA 3.0');
  }
  return [...out];
}
