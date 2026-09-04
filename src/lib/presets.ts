/**
 * Presets and standard DPI configurations for InchPixels
 */

export interface DpiOption {
  value: number;
  label: string;
  category: 'Screen' | 'Standard' | 'Print' | 'Fine Art';
  description: string;
}

export const STANDARD_DPIS: DpiOption[] = [
  { value: 72, label: '72 DPI', category: 'Screen', description: 'Legacy Web / macOS Classic Baseline' },
  { value: 96, label: '96 DPI', category: 'Standard', description: 'Modern Web Standard (1 CSS in = 96px)' },
  { value: 150, label: '150 DPI', category: 'Print', description: 'Draft / Newsprint / Medium Quality' },
  { value: 300, label: '300 DPI', category: 'Print', description: 'Professional Print & Magazine Standard' },
  { value: 600, label: '600 DPI', category: 'Fine Art', description: 'Archival & Fine Art Giclée Printing' },
];

export interface DimensionPreset {
  id: string;
  name: string;
  category: 'print' | 'photo' | 'screen';
  widthIn: number;
  heightIn: number;
  defaultDpi: number;
  description: string;
  popular?: boolean;
}

export const PRESET_TRAY: DimensionPreset[] = [
  // Print Standard
  {
    id: 'us-letter',
    name: 'US Letter',
    category: 'print',
    widthIn: 8.5,
    heightIn: 11,
    defaultDpi: 300,
    description: 'Standard North American office document format (8.5 × 11 in)',
    popular: true,
  },
  {
    id: 'a4',
    name: 'A4 Document',
    category: 'print',
    widthIn: 8.27,
    heightIn: 11.69,
    defaultDpi: 300,
    description: 'Standard International ISO 216 paper format (210 × 297 mm)',
    popular: true,
  },
  {
    id: 'us-legal',
    name: 'US Legal',
    category: 'print',
    widthIn: 8.5,
    heightIn: 14,
    defaultDpi: 300,
    description: 'Extended US Legal document size (8.5 × 14 in)',
  },
  {
    id: 'tabloid',
    name: 'Tabloid / Ledger',
    category: 'print',
    widthIn: 11,
    heightIn: 17,
    defaultDpi: 300,
    description: 'ANSI B large format print size (11 × 17 in)',
  },
  {
    id: 'a3',
    name: 'A3 Poster',
    category: 'print',
    widthIn: 11.69,
    heightIn: 16.54,
    defaultDpi: 300,
    description: 'ISO 216 double A4 print format (297 × 420 mm)',
  },
  {
    id: 'a5',
    name: 'A5 Booklet',
    category: 'print',
    widthIn: 5.83,
    heightIn: 8.27,
    defaultDpi: 300,
    description: 'ISO 216 flyer and notebook format (148 × 210 mm)',
  },

  // Photo & Art
  {
    id: 'photo-4x6',
    name: '4 × 6" Photo',
    category: 'photo',
    widthIn: 4,
    heightIn: 6,
    defaultDpi: 300,
    description: 'Standard snapshot photographic print (4 × 6 in / 10 × 15 cm)',
    popular: true,
  },
  {
    id: 'photo-5x7',
    name: '5 × 7" Photo',
    category: 'photo',
    widthIn: 5,
    heightIn: 7,
    defaultDpi: 300,
    description: 'Framed portrait photographic print (5 × 7 in)',
  },
  {
    id: 'photo-8x10',
    name: '8 × 10" Portrait',
    category: 'photo',
    widthIn: 8,
    heightIn: 10,
    defaultDpi: 300,
    description: 'Standard gallery and headshot frame size (8 × 10 in)',
    popular: true,
  },
  {
    id: 'photo-11x14',
    name: '11 × 14" Print',
    category: 'photo',
    widthIn: 11,
    heightIn: 14,
    defaultDpi: 300,
    description: 'Medium fine art & photographic exhibition print',
  },
  {
    id: 'photo-16x20',
    name: '16 × 20" Poster',
    category: 'photo',
    widthIn: 16,
    heightIn: 20,
    defaultDpi: 300,
    description: 'Standard art wall print size',
  },
  {
    id: 'poster-24x36',
    name: '24 × 36" Cinema Poster',
    category: 'photo',
    widthIn: 24,
    heightIn: 36,
    defaultDpi: 300,
    description: 'Architectural C / Standard movie one-sheet poster size',
    popular: true,
  },

  // Screen & Social Media (Normalized to inches at 96 DPI)
  {
    id: 'screen-1080p',
    name: '1080p Full HD',
    category: 'screen',
    widthIn: 20, // 1920px @ 96 DPI
    heightIn: 11.25, // 1080px @ 96 DPI
    defaultDpi: 96,
    description: 'Standard widescreen display resolution (1920 × 1080 px)',
    popular: true,
  },
  {
    id: 'screen-4k',
    name: '4K UHD',
    category: 'screen',
    widthIn: 40, // 3840px @ 96 DPI
    heightIn: 22.5, // 2160px @ 96 DPI
    defaultDpi: 96,
    description: 'Ultra High Definition display (3840 × 2160 px)',
  },
  {
    id: 'social-ig-square',
    name: 'Instagram Square',
    category: 'screen',
    widthIn: 11.25, // 1080px @ 96 DPI
    heightIn: 11.25,
    defaultDpi: 96,
    description: 'Square feed image (1080 × 1080 px)',
    popular: true,
  },
  {
    id: 'social-ig-story',
    name: 'Story / Reel / TikTok',
    category: 'screen',
    widthIn: 11.25, // 1080px @ 96 DPI
    heightIn: 20, // 1920px @ 96 DPI
    defaultDpi: 96,
    description: 'Vertical 9:16 mobile format (1080 × 1920 px)',
    popular: true,
  },
  {
    id: 'social-x-header',
    name: 'X (Twitter) Header',
    category: 'screen',
    widthIn: 15.625, // 1500px @ 96 DPI
    heightIn: 5.208, // 500px @ 96 DPI
    defaultDpi: 96,
    description: 'Profile banner standard (1500 × 500 px)',
  },
  {
    id: 'social-yt-thumb',
    name: 'YouTube Thumbnail',
    category: 'screen',
    widthIn: 13.333, // 1280px @ 96 DPI
    heightIn: 7.5, // 720px @ 96 DPI
    defaultDpi: 96,
    description: 'Standard video thumbnail format (1280 × 720 px)',
  },
];
