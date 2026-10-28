import { Marked } from 'marked';

const esc = (s: unknown) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

const marked = new Marked({ gfm: true, breaks: false });

// Open external links in a new tab and lazy-load images inside articles.
marked.use({
  renderer: {
    link({ href, title, tokens }) {
      const text = this.parser.parseInline(tokens);
      const external = /^https?:\/\//i.test(href || '');
      const t = title ? ` title="${esc(title)}"` : '';
      return `<a href="${esc(href)}"${t}${external ? ' target="_blank" rel="noopener"' : ''}>${text}</a>`;
    },
    image({ href, title, text }) {
      const cap = title ? `<figcaption>${esc(title)}</figcaption>` : '';
      return `<figure class="prose-figure"><img src="${esc(href)}" alt="${esc(text || '')}" loading="lazy" decoding="async">${cap}</figure>`;
    },
  },
});

export const md = (text: unknown): string => (text ? (marked.parse(String(text)) as string) : '');
export const mdInline = (text: unknown): string => (text ? (marked.parseInline(String(text)) as string) : '');

// Plain text from markdown, for meta descriptions.
export function plain(text: unknown, max = 160): string {
  const s = String(text || '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`~|-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return s.length > max ? s.slice(0, max - 1).replace(/\s+\S*$/, '') + '…' : s;
}
