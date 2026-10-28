import { loadSite, type Site } from './content';
import { LOCALES, type Lang } from './i18n';

let site: Site | undefined;

// Content is read once per build.
export const getSite = (): Site => (site ??= loadSite());

export const LANGS: Lang[] = LOCALES.map((l) => l.code);

// getStaticPaths helper for pages under src/pages/[lang]/.
export const langPaths = () => LANGS.map((lang) => ({ params: { lang } }));

// Build static paths for every language × item, passing the item as a prop.
export function itemPaths<T>(param: string, items: (lang: Lang) => (T & { slug: string })[]) {
  return LANGS.flatMap((lang) => items(lang).map((item) => ({ params: { lang, [param]: item.slug }, props: { item } })));
}
