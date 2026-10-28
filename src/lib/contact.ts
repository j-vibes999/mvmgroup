import { t, url, type Lang } from './i18n';
import type { Entry } from './content';

export const isPlaceholder = (v: unknown) => !v || /X{3,}|to be added|placeholder/i.test(String(v));
const digits = (v: unknown) => String(v || '').replace(/[^\d]/g, '');

export type ContactKind = 'whatsapp' | 'wechat' | 'phone' | 'email';
export type ContactLink = { kind: ContactKind; icon: string; label: string; value: string; href: string | null };

// Contact channels from Site settings. Values still holding placeholders
// (XXXX, "to be added") get no link so visitors never hit a dead number.
export function contactLinks(settings: Entry, lang: Lang): ContactLink[] {
  const c = settings.contact || {};
  const item = (kind: ContactKind, icon: string, value: unknown, href: string): ContactLink => ({
    kind,
    icon,
    label: t(lang, `contact.${kind}`),
    value: String(value || ''),
    href: isPlaceholder(value) ? null : href,
  });
  return [
    item('whatsapp', 'whatsapp', c.whatsapp, `https://wa.me/${digits(c.whatsapp)}`),
    item('wechat', 'wechat', c.wechat, `${url(lang, 'contact')}#wechat`),
    item('phone', 'phone', c.phone, `tel:+${digits(c.phone)}`),
    item('email', 'mail', c.email, `mailto:${c.email}`),
  ];
}
