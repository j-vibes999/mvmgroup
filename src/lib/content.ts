// Loads CMS content (YAML written by Decap CMS) and localizes it.
//
// Every content file uses Decap's i18n "single_file" structure:
//   en: { ...all fields... }
//   la: { ...translated fields... }
//   zh: { ...translated fields... }
// Fields that are not translated (images, dates, order, ...) only live under
// the default locale, so localize() starts from `en` and layers the locale on
// top. Empty translations fall back to English instead of rendering blank.

import fs from 'node:fs';
import path from 'node:path';
import { load } from 'js-yaml';
import { DEFAULT_LOCALE, type Lang } from './i18n';

// Any content record: the CMS schema lives in public/admin/config.yml.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Entry = Record<string, any>;

const CONTENT_DIR = path.resolve(process.cwd(), 'content');

const isPlainObject = (v: unknown): v is Entry =>
  v !== null && typeof v === 'object' && !Array.isArray(v) && !(v instanceof Date);
const isEmpty = (v: unknown) =>
  v === undefined || v === null || (typeof v === 'string' && v.trim() === '') || (Array.isArray(v) && v.length === 0);

function mergeLocale(base: unknown, over: unknown): unknown {
  if (Array.isArray(base) || Array.isArray(over)) {
    const b = Array.isArray(base) ? base : [];
    const o = Array.isArray(over) ? over : [];
    if (!o.length) return b;
    const out = [];
    for (let i = 0; i < Math.max(b.length, o.length); i++) {
      if (i >= o.length || isEmpty(o[i])) out.push(b[i]);
      else if (isPlainObject(o[i]) && isPlainObject(b[i])) out.push(mergeLocale(b[i], o[i]));
      else out.push(o[i]);
    }
    return out.filter((v) => v !== undefined);
  }
  if (isPlainObject(base) || isPlainObject(over)) {
    const out: Entry = { ...(isPlainObject(base) ? base : {}) };
    for (const [key, value] of Object.entries(isPlainObject(over) ? over : {})) {
      if (isEmpty(value)) continue;
      out[key] = mergeLocale(out[key], value);
    }
    return out;
  }
  return isEmpty(over) ? base : over;
}

export function localize(data: Entry | undefined, lang: Lang): Entry {
  const base = (data && data[DEFAULT_LOCALE]) || {};
  if (lang === DEFAULT_LOCALE) return mergeLocale({}, base) as Entry;
  return mergeLocale(base, (data && data[lang]) || {}) as Entry;
}

function readYaml(file: string): Entry {
  try {
    return (load(fs.readFileSync(file, 'utf8')) as Entry) || {};
  } catch (err) {
    throw new Error(`Could not read ${path.relative(CONTENT_DIR, file)}: ${(err as Error).message}`);
  }
}

function readCollection(name: string) {
  const dir = path.join(CONTENT_DIR, name);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /\.ya?ml$/i.test(f))
    .map((f) => ({ slug: f.replace(/\.ya?ml$/i, ''), data: readYaml(path.join(dir, f)) }));
}

function readSingleton(name: string): Entry {
  const file = path.join(CONTENT_DIR, 'settings', `${name}.yml`);
  return fs.existsSync(file) ? readYaml(file) : {};
}

const byOrder = (a: Entry, b: Entry) => (a.order ?? 999) - (b.order ?? 999) || String(a.title).localeCompare(String(b.title));
const time = (v: unknown) => (v ? new Date(String(v)).getTime() || 0 : 0);

const COLLECTIONS = ['services', 'units', 'brands', 'projects', 'news', 'team', 'tours'] as const;
type Collection = (typeof COLLECTIONS)[number];

// Loads everything once and returns per-locale accessors.
export function loadSite() {
  const singletons = {
    site: readSingleton('site'),
    home: readSingleton('home'),
    about: readSingleton('about'),
    legal: readSingleton('legal'),
    pages: readSingleton('pages'),
  };
  const collections = Object.fromEntries(COLLECTIONS.map((c) => [c, readCollection(c)])) as Record<
    Collection,
    { slug: string; data: Entry }[]
  >;

  const cache = new Map<string, Entry[]>();
  const list = (name: Collection, lang: Lang, sort: (a: Entry, b: Entry) => number) => {
    const key = `${name}:${lang}`;
    if (!cache.has(key)) {
      const items = collections[name]
        .map(({ slug, data }) => ({ ...localize(data, lang), slug }))
        .filter((item) => item.published !== false);
      cache.set(key, items.sort(sort));
    }
    return cache.get(key)!;
  };

  return {
    settings: (lang: Lang) => localize(singletons.site, lang),
    home: (lang: Lang) => localize(singletons.home, lang),
    about: (lang: Lang) => localize(singletons.about, lang),
    legal: (lang: Lang) => localize(singletons.legal, lang),
    pages: (lang: Lang) => localize(singletons.pages, lang),
    services: (lang: Lang) => list('services', lang, byOrder),
    units: (lang: Lang) => list('units', lang, byOrder),
    brands: (lang: Lang) => list('brands', lang, byOrder),
    team: (lang: Lang) => list('team', lang, byOrder),
    tours: (lang: Lang) => list('tours', lang, byOrder),
    projects: (lang: Lang) => list('projects', lang, (a, b) => (b.year ?? 0) - (a.year ?? 0) || byOrder(a, b)),
    news: (lang: Lang) => list('news', lang, (a, b) => time(b.date) - time(a.date)),
  };
}

export type Site = ReturnType<typeof loadSite>;
