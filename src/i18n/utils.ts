import { ui, defaultLang, languages, type SupportedLanguage } from './ui';

const siteUrl = 'https://inchpixels.com';

export function getLangFromUrl(url: URL): SupportedLanguage {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as SupportedLanguage;
  return defaultLang;
}

export function useTranslations(lang: SupportedLanguage) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]): string {
    return ui[lang]?.[key] || ui[defaultLang][key];
  };
}

export function useTranslatedPath(lang: SupportedLanguage) {
  return function translatePath(path: string, l: SupportedLanguage = lang): string {
    const match = path.match(/^([^?#]*)([?#].*)?$/);
    let rawPath = match?.[1] || '/';
    const suffix = match?.[2] || '';
    
    // Strip any existing language prefix from rawPath to prevent duplicate prefixes
    rawPath = rawPath.replace(/^\/(es|ja|fr|de|pt|ko|it)(\/|$)/, '/') || '/';

    const withLeadingSlash = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;
    const cleanPath = withLeadingSlash === '/'
      ? '/'
      : `${withLeadingSlash.replace(/\/+$/, '')}/`;
    return `${l === defaultLang ? '' : `/${l}`}${cleanPath}${suffix}`;
  };
}

export interface HreflangEntry {
  lang: string;
  url: string;
}

export function getHreflangLinks(url: URL, siteUrl: string = 'https://inchpixels.com'): HreflangEntry[] {
  const segments = url.pathname.split('/').filter(Boolean);
  if (segments.length > 0 && segments[0] in languages) {
    segments.shift();
  }
  const baseSubpath = segments.length > 0 ? `/${segments.join('/')}/` : '/';

  const entries: HreflangEntry[] = [];
  for (const locale of Object.keys(languages) as SupportedLanguage[]) {
    const localizedPath = locale === defaultLang
      ? baseSubpath
      : `/${locale}${baseSubpath === '/' ? '/' : baseSubpath}`;
    const normalizedUrl = `${siteUrl.replace(/\/$/, '')}${localizedPath}`;
    entries.push({
      lang: locale,
      url: normalizedUrl,
    });
  }

  entries.push({
    lang: 'x-default',
    url: `${siteUrl.replace(/\/$/, '')}${baseSubpath}`,
  });

  return entries;
}
