# Astro i18n & hreflang Implementation Plan

**Objective:** Set up native Astro internationalization (i18n) routing and translation utilities according to the official Astro docs recipe (https://docs.astro.build/en/recipes/i18n/) for 8 languages (`en`, `es`, `ja`, `fr`, `de`, `pt`, `ko`, `it`).

---

## Phase 1: Astro Configuration (`astro.config.mjs`)
- [x] **1.1 Native i18n Routing Configuration**
  - Configure `i18n` block in `astro.config.mjs`:
    - `defaultLocale: 'en'`
    - `locales: ['en', 'es', 'ja', 'fr', 'de', 'pt', 'ko', 'it']`
    - `routing: { prefixDefaultLocale: false }`
  - Maintain `site: 'https://inchpixels.com'`, `output: 'static'`, Vite Tailwind plugin, React, and Sitemap integrations.

---

## Phase 2: Translation Dictionaries (`src/i18n/ui.ts`)
- [x] **2.1 Language Map Definition**
  - Define `languages` record:
    - `en`: "English"
    - `es`: "Español"
    - `ja`: "日本語"
    - `fr`: "Français"
    - `de`: "Deutsch"
    - `pt`: "Português"
    - `ko`: "한국어"
    - `it`: "Italiano"
  - Export `defaultLang = 'en'`.
- [x] **2.2 Multi-Language UI Translation Dictionary (`ui`)**
  - Create comprehensive UI dictionaries for all 8 locales covering:
    - Navigation: calculator, reference tables, guide, FAQ
    - Hero: title, subtitle, badges
    - Converter island labels: 1D/2D modes, width, height, resolution, presets, export actions, copy toast
    - Static reference table headers and captions
    - Formula cards and resolution guide headings
    - FAQ questions and answers

---

## Phase 3: Translation & Route Helper Utilities (`src/i18n/utils.ts`)
- [x] **3.1 URL Language Extractor (`getLangFromUrl`)**
  - Extract active locale code from `URL` pathname (e.g., `/es/` -> `'es'`, `/` -> `'en'`).
  - Fallback cleanly to `defaultLang` (`'en'`).
- [x] **3.2 UI Translation Hook (`useTranslations`)**
  - Provide typed translation getter `t(key)` returning localized string or falling back to default English string if untranslated.
- [x] **3.3 Route & Path Translation Hook (`useTranslatedPath`)**
  - Translate paths according to locale:
    - `en` returns `/path` (since `prefixDefaultLocale: false`)
    - Non-default locales return `/${locale}/path`
- [x] **3.4 Hreflang Canonical & Alternate Generator**
  - Helper to generate `<link rel="alternate" hreflang="..." href="..." />` tags for all 8 locales + `x-default` pointing to `https://inchpixels.com/`.

---

## Phase 4: Layout & Hreflang Integration (`src/layouts/Layout.astro`)
- [x] **4.1 Dynamic HTML Lang Attribute**
  - Bind `<html lang={lang}>` dynamically based on current page locale.
- [x] **4.2 SEO hreflang Alternates**
  - Render bidirectional alternate links in `<head>`:
    - `hreflang="en"` -> `https://inchpixels.com/`
    - `hreflang="es"` -> `https://inchpixels.com/es/`
    - `hreflang="ja"` -> `https://inchpixels.com/ja/`
    - `hreflang="fr"` -> `https://inchpixels.com/fr/`
    - `hreflang="de"` -> `https://inchpixels.com/de/`
    - `hreflang="pt"` -> `https://inchpixels.com/pt/`
    - `hreflang="ko"` -> `https://inchpixels.com/ko/`
    - `hreflang="it"` -> `https://inchpixels.com/it/`
    - `hreflang="x-default"` -> `https://inchpixels.com/`

---

## Phase 5: Verification & Testing
- [x] **5.1 Typecheck & Production Build**
  - Run `npm run build` to verify that Astro i18n routing compiles without errors.
- [x] **5.2 Unit Verification of i18n Utilities**
  - Validate that `getLangFromUrl`, `useTranslations`, and `useTranslatedPath` behave correctly for all 8 languages.
