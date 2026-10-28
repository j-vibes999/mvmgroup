import { t, url, type Lang } from './i18n';

const SITE = 'https://www.mvmgroup.la';
export const abs = (p: string) => (/^https?:/.test(p) ? p : SITE + p);

export type Crumb = { label: string; href?: string };

export function breadcrumbLd(lang: Lang, trail: Crumb[]) {
  const all = [{ label: t(lang, 'nav.home'), href: url(lang) }, ...trail];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: abs(item.href) } : {}),
    })),
  };
}

export function faqLd(faq: { question: string; answer: string }[], plain: (s: string, n: number) => string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: plain(f.answer, 1000) } })),
  };
}
