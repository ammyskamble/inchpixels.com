// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://inchpixels.com',
  output: 'static',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'ja', 'fr', 'de', 'pt', 'ko', 'it'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react(), sitemap({
    filter: (page) => !page.includes('/404') && !page.includes('/500'),
    i18n: {
      defaultLocale: 'en',
      locales: {
        en: 'en',
        es: 'es',
        ja: 'ja',
        fr: 'fr',
        de: 'de',
        pt: 'pt',
        ko: 'ko',
        it: 'it',
      },
    },
  }), mdx()],
});