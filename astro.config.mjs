// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

import mdx from '@astrojs/mdx';

function interactionDirective() {
  return {
    name: 'client-interaction-directive',
    hooks: {
      'astro:config:setup': ({ addClientDirective }) => {
        addClientDirective({
          name: 'interaction',
          entrypoint: './src/directives/interaction.js',
        });
      },
    },
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://inchpixels.com',
  output: 'static',
  trailingSlash: 'always',
  server: {
    host: true,
    port: 4321,
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'ja', 'fr', 'de', 'pt', 'ko', 'it'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  build: {
    inlineStylesheets: 'always',
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [interactionDirective(), react(), sitemap({
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