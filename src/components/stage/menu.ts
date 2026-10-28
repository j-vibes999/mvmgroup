import { t, url, type Lang } from '../../lib/i18n';

// The four destinations in the top bar (desktop) and the dock (mobile).
export const menuFor = (lang: Lang) => [
  { key: 'about', label: t(lang, 'nav.about'), href: url(lang, 'about'), icon: 'building' },
  { key: 'projects', label: t(lang, 'nav.projects'), href: url(lang, 'projects'), icon: 'chart' },
  { key: 'news', label: t(lang, 'nav.news'), href: url(lang, 'news'), icon: 'news' },
  { key: 'contact', label: t(lang, 'nav.contact'), href: url(lang, 'contact'), icon: 'chat' },
];
