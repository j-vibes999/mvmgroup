import { getSite } from './site';
import { t, url, type Lang } from './i18n';

export type Room = {
  title: string;
  text: string;
  kindLabel: string;
  href: string;
  external: boolean;
  host?: string;
  icon: string;
  logo?: string;
};

// The businesses on the home ring (Home page → "Businesses in the group" in the CMS).
// A room links to a page of this site or to a full website address; a brand room
// shows its brand logo unless the room has its own logo image.
export function roomsFor(lang: Lang): Room[] {
  const site = getSite();
  const brands = site.brands(lang);
  return (site.home(lang).rooms || [])
    .filter((r: { title?: string }) => r && r.title)
    .map((r: Record<string, string>) => {
      const link = String(r.link || '');
      const external = /^https?:\/\//.test(link);
      const segments = link.split('/').filter(Boolean);
      const brand = !external && segments[0] === 'brands' ? brands.find((b) => b.slug === segments[1]) : undefined;
      return {
        title: r.title,
        text: r.text || '',
        kindLabel: t(lang, r.kind === 'brand' ? 'home.kindBrand' : 'home.kindService'),
        href: external ? link : url(lang, ...segments),
        external,
        host: external ? new URL(link).hostname.replace(/^www\./, '') : undefined,
        icon: r.icon || 'compass',
        logo: r.image || brand?.logo || undefined,
      };
    });
}
