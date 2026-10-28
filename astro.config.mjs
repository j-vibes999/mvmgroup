import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://www.mvmgroup.la',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  server: { port: 4400 },
  integrations: [
    sitemap({
      filter: (page) => !/\/(404|thank-you)\/$/.test(page),
      i18n: { defaultLocale: 'en', locales: { en: 'en', la: 'lo', zh: 'zh-Hans' } },
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
