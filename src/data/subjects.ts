export interface SubjectTableItem {
  resolution: string;
  dpi: number;
  dimensions: string;
  megapixels: string;
  useCase: string;
}

export interface SubjectStep {
  step: number;
  title: string;
  description: string;
  shortcut?: string;
}

export interface SubjectFaq {
  question: string;
  answer: string;
}

export interface SubjectItem {
  id: string;
  slug: string;
  category: 'dimension' | 'guide';
  name: string;
  shortTitle: string;
  metaTitle: string;
  metaDesc: string;
  badge: string;
  h1: string;
  tagline: string;
  overview: string;
  initialCalc: {
    mode: '1d' | '2d';
    width?: number;
    height?: number;
    single?: number;
    dpi: number;
  };
  quickStats: { label: string; value: string }[];
  tableData?: SubjectTableItem[];
  formulas?: { title: string; formula: string; explanation: string }[];
  steps?: SubjectStep[];
  faqItems: SubjectFaq[];
  relatedSlugs: string[];
}

export const SUBJECTS: SubjectItem[] = [
  // 1. 8.5 x 11 Inches to Pixels
  {
    id: '8-5-x-11-inches-to-pixels',
    slug: '8-5-x-11-inches-to-pixels',
    category: 'dimension',
    name: '8.5 × 11 Inches to Pixels',
    shortTitle: '8.5 × 11" US Letter',
    metaTitle: '8.5 x 11 Inches to Pixels | US Letter Dimensions (DPI / PPI)',
    metaDesc: 'Convert 8.5 x 11 inches to pixels across 72, 96, 150, 300, and 600 DPI. Pre-computed pixel dimensions for standard US Letter office documents, flyers, and print press.',
    badge: 'Standard Document • US Letter',
    h1: '8.5 × 11 Inches to Pixels Conversion Guide',
    tagline: 'Instant digital resolution, aspect ratio, and CSS specifications for standard North American US Letter paper (8.5 × 11 in).',
    overview: 'A sheet of 8.5 × 11 inches is the standard US Letter size used across North American printing, stationery, and digital document distribution. Converting 8.5 x 11 inches to pixels depends entirely on resolution: at commercial 300 DPI print quality, 8.5 × 11 inches equals 2,550 × 3,300 pixels (8.42 MP). At 96 DPI web standard, it measures 816 × 1,056 pixels (0.86 MP).',
    initialCalc: {
      mode: '2d',
      width: 8.5,
      height: 11,
      dpi: 300,
    },
    quickStats: [
      { label: '300 DPI (Commercial Print)', value: '2,550 × 3,300 px' },
      { label: '96 DPI (Web Display)', value: '816 × 1,056 px' },
      { label: 'Aspect Ratio', value: '1:1.294 (17:22)' },
      { label: 'Total Pixels (300 DPI)', value: '8.42 Megapixels' },
    ],
    tableData: [
      { resolution: 'Legacy Screen', dpi: 72, dimensions: '612 × 792 px', megapixels: '0.48 MP', useCase: 'Archival Mac OS screens' },
      { resolution: 'Modern Web / CSS', dpi: 96, dimensions: '816 × 1,056 px', megapixels: '0.86 MP', useCase: 'HTML/CSS layout, email newsletters' },
      { resolution: 'Draft Newspaper', dpi: 150, dimensions: '1,275 × 1,650 px', megapixels: '2.10 MP', useCase: 'Low-cost desktop laser printing' },
      { resolution: 'High-Res Print', dpi: 300, dimensions: '2,550 × 3,300 px', megapixels: '8.42 MP', useCase: 'Brochures, flyers, resumes, PDFs' },
      { resolution: 'Fine Art / Archival', dpi: 600, dimensions: '5,100 × 6,600 px', megapixels: '33.66 MP', useCase: 'Gallery reproduction & vector rasterization' },
    ],
    formulas: [
      { title: 'Width in Pixels (300 DPI)', formula: '8.5 in × 300 DPI = 2,550 px', explanation: 'Multiply physical width in inches by dot density.' },
      { title: 'Height in Pixels (300 DPI)', formula: '11.0 in × 300 DPI = 3,300 px', explanation: 'Multiply physical height in inches by dot density.' },
    ],
    faqItems: [
      {
        question: 'What is 8.5 x 11 inches to pixels at 300 DPI?',
        answer: 'At 300 DPI, 8.5 x 11 inches equals exactly 2,550 × 3,300 pixels, yielding a total pixel resolution of 8,415,000 pixels (~8.42 megapixels).',
      },
      {
        question: 'What is 8.5 x 11 inches in pixels for web display (96 DPI)?',
        answer: 'For web design and digital screen display (96 DPI according to W3C standards), 8.5 x 11 inches equals 816 × 1,056 pixels (~0.86 megapixels).',
      },
    ],
    relatedSlugs: ['8-5-inches-to-pixels', '4x6-inches-in-pixels-at-300-dpi', 'a4-inches-to-pixels', 'how-to-convert-inches-to-pixels'],
  },

  // 2. 4x6 Inches in Pixels at 300 DPI
  {
    id: '4x6-inches-in-pixels-at-300-dpi',
    slug: '4x6-inches-in-pixels-at-300-dpi',
    category: 'dimension',
    name: '4 × 6 Inches in Pixels at 300 DPI',
    shortTitle: '4 × 6" Photo (300 DPI)',
    metaTitle: '4x6 Inches in Pixels at 300 DPI | Photo Print Dimensions',
    metaDesc: 'Convert 4x6 inches in pixels at 300 DPI. Exact pixel dimensions for standard photographic prints, postcards, digital darkrooms, and photo lab uploads.',
    badge: 'Photo Lab Standard • 4 × 6"',
    h1: '4 × 6 Inches in Pixels at 300 DPI Guide',
    tagline: 'Accurate pixel dimensions, 2:3 aspect ratio specs, and file requirements for high-definition 4 × 6 photo printing.',
    overview: 'The 4 × 6 inch format is the world standard for postcard prints and classic 35mm film photography with an authentic 2:3 aspect ratio. When printing at commercial photo lab quality (300 DPI), 4x6 inches in pixels equals exactly 1,200 × 1,800 pixels in portrait orientation, or 1,800 × 1,200 pixels in landscape orientation, with a total resolution of 2.16 megapixels.',
    initialCalc: {
      mode: '2d',
      width: 4,
      height: 6,
      dpi: 300,
    },
    quickStats: [
      { label: '300 DPI (Commercial Print)', value: '1,200 × 1,800 px' },
      { label: '96 DPI (Web Display)', value: '384 × 576 px' },
      { label: 'Aspect Ratio', value: '2:3 (Classic 35mm)' },
      { label: 'Total Megapixels', value: '2.16 MP' },
    ],
    tableData: [
      { resolution: 'Web Thumbnail', dpi: 72, dimensions: '288 × 432 px', megapixels: '0.12 MP', useCase: 'Social media previews' },
      { resolution: 'CSS Display', dpi: 96, dimensions: '384 × 576 px', megapixels: '0.22 MP', useCase: 'Portfolio web display' },
      { resolution: 'Standard Photo Lab', dpi: 300, dimensions: '1,200 × 1,800 px', megapixels: '2.16 MP', useCase: 'Walgreens, CVS, Shutterfly prints' },
      { resolution: 'Fine Art Giclée', dpi: 600, dimensions: '2,400 × 3,600 px', megapixels: '8.64 MP', useCase: 'Museum-grade archival cotton rag' },
    ],
    formulas: [
      { title: 'Width (300 DPI)', formula: '4 in × 300 DPI = 1,200 px', explanation: 'Multiply photo width by 300 pixels per inch.' },
      { title: 'Height (300 DPI)', formula: '6 in × 300 DPI = 1,800 px', explanation: 'Multiply photo height by 300 pixels per inch.' },
    ],
    faqItems: [
      {
        question: 'How many pixels is a 4x6 photo at 300 DPI?',
        answer: 'A 4x6 inch photo at 300 DPI measures exactly 1,200 × 1,800 pixels (portrait) or 1,800 × 1,200 pixels (landscape), totaling 2,160,000 pixels (2.16 MP).',
      },
      {
        question: 'Can I print a 4x6 photo with less than 1200x1800 pixels?',
        answer: 'Yes, but if the resolution drops below 200 DPI (800 × 1200 px), you may notice graininess or blurriness upon close visual inspection.',
      },
    ],
    relatedSlugs: ['5x7-inches-in-pixels', '8x10-inches-in-pixels', '8-5-x-11-inches-to-pixels', 'how-many-pixels-in-an-inch'],
  },

  // 3. 8.5 Inches to Pixels
  {
    id: '8-5-inches-to-pixels',
    slug: '8-5-inches-to-pixels',
    category: 'dimension',
    name: '8.5 Inches to Pixels',
    shortTitle: '8.5" Linear In to Px',
    metaTitle: '8.5 Inches to Pixels | Instant 1D Conversion Across Any DPI',
    metaDesc: 'How many pixels is 8.5 inches? Convert 8.5 inches to pixels at 72, 96, 150, 300, and 600 DPI with instant mathematical formulas and metric values.',
    badge: '1D Linear Conversion • 8.5"',
    h1: '8.5 Inches to Pixels Conversion Guide',
    tagline: 'Calculate exact linear pixels and metric millimeters for an 8.5 inch measurement across all major display and print standards.',
    overview: 'An 8.5 inch dimension is a cornerstone imperial measurement in graphic arts. In linear pixels, 8.5 inches equals 2,550 pixels at 300 DPI print quality, 816 pixels at 96 DPI modern screen resolution, and 612 pixels at legacy 72 DPI. In metric units, 8.5 inches converts to exactly 21.59 centimeters (215.9 mm).',
    initialCalc: {
      mode: '1d',
      single: 8.5,
      dpi: 300,
    },
    quickStats: [
      { label: '300 DPI (Commercial Print)', value: '2,550 px' },
      { label: '96 DPI (Web Display)', value: '816 px' },
      { label: 'Metric Equivalent', value: '21.59 cm / 215.9 mm' },
      { label: '150 DPI (Draft)', value: '1,275 px' },
    ],
    tableData: [
      { resolution: '72 DPI', dpi: 72, dimensions: '612 px', megapixels: 'N/A (1D)', useCase: 'Legacy displays' },
      { resolution: '96 DPI', dpi: 96, dimensions: '816 px', megapixels: 'N/A (1D)', useCase: 'CSS width / height property' },
      { resolution: '150 DPI', dpi: 150, dimensions: '1,275 px', megapixels: 'N/A (1D)', useCase: 'Draft desktop printing' },
      { resolution: '300 DPI', dpi: 300, dimensions: '2,550 px', megapixels: 'N/A (1D)', useCase: 'Commercial offset press' },
      { resolution: '600 DPI', dpi: 600, dimensions: '5,100 px', megapixels: 'N/A (1D)', useCase: 'High-definition digital press' },
    ],
    formulas: [
      { title: 'Linear In to Px Formula', formula: 'Pixels = Inches × DPI', explanation: '8.5 × 300 = 2,550 pixels.' },
    ],
    faqItems: [
      {
        question: 'How many pixels are in 8.5 inches?',
        answer: 'At 300 DPI (print), 8.5 inches contains 2,550 pixels. At 96 DPI (web), 8.5 inches contains 816 pixels.',
      },
    ],
    relatedSlugs: ['8-5-x-11-inches-to-pixels', 'how-many-pixels-in-an-inch', 'how-to-convert-inches-to-pixels'],
  },

  // 4. 5x7 Inches in Pixels
  {
    id: '5x7-inches-in-pixels',
    slug: '5x7-inches-in-pixels',
    category: 'dimension',
    name: '5 × 7 Inches in Pixels',
    shortTitle: '5 × 7" Framed Photo',
    metaTitle: '5x7 Inches in Pixels | 5x7 Photo Print Resolution (300 DPI)',
    metaDesc: 'Convert 5x7 inches to pixels at 300 DPI, 96 DPI, and 150 DPI. Exact pixel dimensions for greeting cards, framed portraits, and photo studio prints.',
    badge: 'Framed Portrait Standard • 5 × 7"',
    h1: '5 × 7 Inches in Pixels Resolution Guide',
    tagline: 'Precise pixel dimensions and aspect ratio specifications for 5 × 7 inch greeting cards, invitations, and framed photography.',
    overview: 'The 5 × 7 inch size (12.7 × 17.78 cm) is popular for wedding invitations, greeting cards, and framed tabletop portraits. At 300 DPI print quality, 5x7 inches equals 1,500 × 2,100 pixels (3.15 megapixels). At 96 DPI screen display, it measures 480 × 672 pixels.',
    initialCalc: {
      mode: '2d',
      width: 5,
      height: 7,
      dpi: 300,
    },
    quickStats: [
      { label: '300 DPI (Commercial Print)', value: '1,500 × 2,100 px' },
      { label: '96 DPI (Web Display)', value: '480 × 672 px' },
      { label: 'Aspect Ratio', value: '5:7 (1:1.4)' },
      { label: 'Total Megapixels (300 DPI)', value: '3.15 MP' },
    ],
    tableData: [
      { resolution: '72 DPI', dpi: 72, dimensions: '360 × 504 px', megapixels: '0.18 MP', useCase: 'Web banner mockup' },
      { resolution: '96 DPI', dpi: 96, dimensions: '480 × 672 px', megapixels: '0.32 MP', useCase: 'Web image gallery' },
      { resolution: '150 DPI', dpi: 150, dimensions: '750 × 1,050 px', megapixels: '0.79 MP', useCase: 'Draft proof print' },
      { resolution: '300 DPI', dpi: 300, dimensions: '1,500 × 2,100 px', megapixels: '3.15 MP', useCase: 'Lab photo print & cardstock' },
      { resolution: '600 DPI', dpi: 600, dimensions: '3,000 × 4,200 px', megapixels: '12.60 MP', useCase: 'Archival fine art' },
    ],
    faqItems: [
      {
        question: 'What is 5x7 inches in pixels at 300 DPI?',
        answer: 'At 300 DPI, 5x7 inches equals 1,500 × 2,100 pixels in portrait orientation, or 2,100 × 1,500 pixels in landscape, totaling 3.15 megapixels.',
      },
    ],
    relatedSlugs: ['4x6-inches-in-pixels-at-300-dpi', '8x10-inches-in-pixels', '8-5-x-11-inches-to-pixels'],
  },

  // 5. 8x10 Inches in Pixels
  {
    id: '8x10-inches-in-pixels',
    slug: '8x10-inches-in-pixels',
    category: 'dimension',
    name: '8 × 10 Inches in Pixels',
    shortTitle: '8 × 10" Portrait',
    metaTitle: '8x10 Inches in Pixels | Portrait & Art Print Dimensions',
    metaDesc: 'Convert 8x10 inches in pixels at 300 DPI, 96 DPI, and 150 DPI. Exact pixel sizes for professional portraits, headshots, wall gallery art, and frames.',
    badge: 'Gallery Portrait Standard • 8 × 10"',
    h1: '8 × 10 Inches in Pixels Conversion Guide',
    tagline: 'Standard 4:5 aspect ratio specifications and pixel dimensions for professional headshots, fine art prints, and photo frames.',
    overview: 'The 8 × 10 inch dimension (20.32 × 25.4 cm) features a classic 4:5 aspect ratio. Widely regarded as the industry standard for actor headshots, school portraits, and standard photo frames, 8x10 inches at 300 DPI equals exactly 2,400 × 3,000 pixels (7.20 megapixels).',
    initialCalc: {
      mode: '2d',
      width: 8,
      height: 10,
      dpi: 300,
    },
    quickStats: [
      { label: '300 DPI (Commercial Print)', value: '2,400 × 3,000 px' },
      { label: '96 DPI (Web Display)', value: '768 × 960 px' },
      { label: 'Aspect Ratio', value: '4:5 (Standard Headshot)' },
      { label: 'Total Megapixels (300 DPI)', value: '7.20 MP' },
    ],
    tableData: [
      { resolution: '72 DPI', dpi: 72, dimensions: '576 × 720 px', megapixels: '0.41 MP', useCase: 'Web preview' },
      { resolution: '96 DPI', dpi: 96, dimensions: '768 × 960 px', megapixels: '0.74 MP', useCase: 'High-res desktop web' },
      { resolution: '150 DPI', dpi: 150, dimensions: '1,200 × 1,500 px', megapixels: '1.80 MP', useCase: 'Inkjet test print' },
      { resolution: '300 DPI', dpi: 300, dimensions: '2,400 × 3,000 px', megapixels: '7.20 MP', useCase: 'Professional photo lab print' },
      { resolution: '600 DPI', dpi: 600, dimensions: '4,800 × 6,000 px', megapixels: '28.80 MP', useCase: 'Gallery reproduction' },
    ],
    faqItems: [
      {
        question: 'What is 8x10 inches in pixels at 300 DPI?',
        answer: 'At 300 DPI, 8x10 inches equals 2,400 × 3,000 pixels (or 3,000 × 2,400 in landscape), producing 7.2 megapixels.',
      },
    ],
    relatedSlugs: ['4x6-inches-in-pixels-at-300-dpi', '5x7-inches-in-pixels', '8-5-x-11-inches-to-pixels'],
  },

  // 6. A4 Paper in Pixels
  {
    id: 'a4-inches-to-pixels',
    slug: 'a4-inches-to-pixels',
    category: 'dimension',
    name: 'A4 Paper in Pixels (ISO 216)',
    shortTitle: 'A4 International Paper',
    metaTitle: 'A4 Inches to Pixels | A4 Size in Pixels at 300 DPI (ISO 216)',
    metaDesc: 'Convert A4 paper size (8.27 x 11.69 inches / 210 x 297 mm) to pixels across 72, 96, 150, 300, and 600 DPI. Precomputed dimensions for international documents.',
    badge: 'ISO 216 International • A4',
    h1: 'A4 Paper in Pixels Conversion Guide',
    tagline: 'Standard international ISO 216 document format (210 × 297 mm / 8.27 × 11.69 in) converted to digital pixels and web CSS.',
    overview: 'A4 is the official paper standard across the United Kingdom, Europe, Asia, and Latin America. Measuring 8.27 × 11.69 inches (210 × 297 mm) with a √2 (1:1.414) aspect ratio, A4 at 300 DPI equals 2,480 × 3,508 pixels (~8.70 megapixels).',
    initialCalc: {
      mode: '2d',
      width: 8.27,
      height: 11.69,
      dpi: 300,
    },
    quickStats: [
      { label: '300 DPI (Commercial Print)', value: '2,480 × 3,508 px' },
      { label: '96 DPI (Web Display)', value: '794 × 1,123 px' },
      { label: 'Aspect Ratio', value: '1:1.414 (√2 ISO 216)' },
      { label: 'Total Megapixels (300 DPI)', value: '8.70 MP' },
    ],
    tableData: [
      { resolution: '72 DPI', dpi: 72, dimensions: '595 × 842 px', megapixels: '0.50 MP', useCase: 'PDF digital rendering' },
      { resolution: '96 DPI', dpi: 96, dimensions: '794 × 1,123 px', megapixels: '0.89 MP', useCase: 'Modern browser CSS' },
      { resolution: '150 DPI', dpi: 150, dimensions: '1,240 × 1,754 px', megapixels: '2.17 MP', useCase: 'Office laser printing' },
      { resolution: '300 DPI', dpi: 300, dimensions: '2,480 × 3,508 px', megapixels: '8.70 MP', useCase: 'Commercial brochures and magazines' },
      { resolution: '600 DPI', dpi: 600, dimensions: '4,960 × 7,016 px', megapixels: '34.80 MP', useCase: 'Precision technical blueprints' },
    ],
    faqItems: [
      {
        question: 'What is A4 size in pixels at 300 DPI?',
        answer: 'At 300 DPI, A4 paper measures 2,480 × 3,508 pixels, which equals approximately 8.70 megapixels.',
      },
    ],
    relatedSlugs: ['8-5-x-11-inches-to-pixels', 'how-many-pixels-in-an-inch', 'how-to-convert-inches-to-pixels'],
  },

  // 7. How Many Pixels in an Inch?
  {
    id: 'how-many-pixels-in-an-inch',
    slug: 'how-many-pixels-in-an-inch',
    category: 'guide',
    name: 'How Many Pixels in an Inch?',
    shortTitle: 'DPI vs. PPI Explained',
    metaTitle: 'How Many Pixels in an Inch? | DPI vs PPI Resolution Guide',
    metaDesc: 'Discover exactly how many pixels are in an inch across web screens (96 DPI), print press (300 DPI), and legacy displays (72 DPI). Includes Device Pixel Ratio (DPR) guide.',
    badge: 'Foundational Resolution Guide',
    h1: 'How Many Pixels in an Inch? The DPI/PPI Relationship',
    tagline: 'Understanding the physical and digital relationship between imperial inches and digital pixel resolution.',
    overview: 'A digital pixel has no fixed physical size—it is simply an electronic point of color data. An inch, however, is a fixed imperial physical length equal to 2.54 centimeters. The bridge connecting them is density resolution, measured as DPI (Dots Per Inch) or PPI (Pixels Per Inch). In modern CSS web specifications, 1 inch equals exactly 96 pixels. In commercial offset printing, 1 inch equals 300 pixels.',
    initialCalc: {
      mode: '1d',
      single: 1,
      dpi: 96,
    },
    quickStats: [
      { label: 'W3C CSS Web Standard', value: '1 in = 96 px' },
      { label: 'Commercial Print Standard', value: '1 in = 300 px' },
      { label: 'Draft Newsprint Baseline', value: '1 in = 150 px' },
      { label: 'Legacy Display Baseline', value: '1 in = 72 px' },
    ],
    tableData: [
      { resolution: 'Legacy Apple Monitor', dpi: 72, dimensions: '72 px per inch', megapixels: 'N/A', useCase: '1984 Macintosh display baseline' },
      { resolution: 'W3C CSS Standard', dpi: 96, dimensions: '96 px per inch', megapixels: 'N/A', useCase: 'Modern browser layout engine' },
      { resolution: 'Draft Newspaper', dpi: 150, dimensions: '150 px per inch', megapixels: 'N/A', useCase: 'Newsprint and paperback books' },
      { resolution: 'Commercial Offset', dpi: 300, dimensions: '300 px per inch', megapixels: 'N/A', useCase: 'Magazines, photos, brochures' },
      { resolution: 'Archival Giclée', dpi: 600, dimensions: '600 px per inch', megapixels: 'N/A', useCase: 'Museum-grade photographic prints' },
    ],
    faqItems: [
      {
        question: 'Why does CSS define 1 inch as 96 pixels?',
        answer: 'The W3C anchored the CSS reference pixel to an angular measurement (1/96th of an inch at typical arm-length viewing distance). This provides visual consistency across desktop monitors.',
      },
      {
        question: 'What is the difference between DPI and PPI?',
        answer: 'PPI (Pixels Per Inch) measures digital display and sensor density. DPI (Dots Per Inch) measures physical ink droplets on paper. Both use the identical mathematical equation.',
      },
    ],
    relatedSlugs: ['how-to-convert-inches-to-pixels', '8-5-x-11-inches-to-pixels', '4x6-inches-in-pixels-at-300-dpi'],
  },

  // 8. How to Convert Inches to Pixels (Formula & Math)
  {
    id: 'how-to-convert-inches-to-pixels',
    slug: 'how-to-convert-inches-to-pixels',
    category: 'guide',
    name: 'How to Convert Inches to Pixels',
    shortTitle: 'Formulas & Math',
    metaTitle: 'How to Convert Inches to Pixels | Math Formula & Step-by-Step',
    metaDesc: 'Learn the exact mathematical formulas to convert inches to pixels (Pixels = Inches × DPI) and pixels to inches (Inches = Pixels ÷ DPI) with worked examples.',
    badge: 'Mathematical Principles',
    h1: 'How to Convert Inches to Pixels (Formulas & Math)',
    tagline: 'Step-by-step arithmetic equations, reverse conversions, and real-world calculation walkthroughs.',
    overview: 'Converting inches to pixels requires linear multiplication: multiply physical inches by target resolution (DPI/PPI). In reverse, converting pixels to inches requires division: divide digital pixel dimensions by DPI. These simple formulas power all digital prepress and graphic design engines.',
    initialCalc: {
      mode: '2d',
      width: 8.5,
      height: 11,
      dpi: 300,
    },
    quickStats: [
      { label: 'Forward Equation', value: 'Pixels = Inches × DPI' },
      { label: 'Reverse Equation', value: 'Inches = Pixels ÷ DPI' },
      { label: 'Web Ratio', value: '1 in = 96 px' },
      { label: 'Print Ratio', value: '1 in = 300 px' },
    ],
    formulas: [
      { title: 'Forward Conversion: Inches to Pixels', formula: 'Pixels = Inches × DPI (or PPI)', explanation: 'Multiply your linear measurement in physical inches by the resolution density.' },
      { title: 'Reverse Conversion: Pixels to Inches', formula: 'Inches = Pixels ÷ DPI (or PPI)', explanation: 'Divide the pixel count by your target resolution density.' },
    ],
    faqItems: [
      {
        question: 'What is the formula to convert inches to pixels?',
        answer: 'The formula is: Pixels = Inches × DPI. For example, 10 inches at 300 DPI equals 10 × 300 = 3,000 pixels.',
      },
      {
        question: 'How do I convert pixels back into inches?',
        answer: 'The reverse formula is: Inches = Pixels ÷ DPI. For example, 2,400 pixels at 300 DPI equals 2,400 ÷ 300 = 8 inches.',
      },
    ],
    relatedSlugs: ['how-many-pixels-in-an-inch', '8-5-x-11-inches-to-pixels', 'how-to-change-pixels-to-inches-in-photoshop'],
  },

  // 9. How to Change Pixels to Inches in Photoshop
  {
    id: 'how-to-change-pixels-to-inches-in-photoshop',
    slug: 'how-to-change-pixels-to-inches-in-photoshop',
    category: 'guide',
    name: 'How to Change Pixels to Inches in Photoshop',
    shortTitle: 'Photoshop Prepress Guide',
    metaTitle: 'How to Change Pixels to Inches in Photoshop | Step-by-Step Guide',
    metaDesc: 'Step-by-step instructions to convert pixels to inches in Adobe Photoshop. Learn how to use Image Size, adjust Resolution (DPI), toggle Resample, and configure Rulers.',
    badge: 'Adobe Photoshop Tutorial',
    h1: 'How to Change Pixels to Inches in Photoshop',
    tagline: 'Complete workflow for setting document dimensions, checking print DPI, and adjusting units in Adobe Photoshop.',
    overview: 'Whether preparing a digital illustration for gallery printing or checking photo dimensions, Adobe Photoshop makes switching between pixels and inches seamless via the Image Size dialogue and ruler preferences.',
    initialCalc: {
      mode: '2d',
      width: 8.5,
      height: 11,
      dpi: 300,
    },
    quickStats: [
      { label: 'Image Size Shortcut', value: 'Ctrl + Alt + I (Win) / Cmd + Option + I (Mac)' },
      { label: 'Ruler Shortcut', value: 'Ctrl + R / Cmd + R' },
      { label: 'Standard Print DPI', value: '300 Pixels/Inch' },
      { label: 'Standard Web DPI', value: '72 or 96 Pixels/Inch' },
    ],
    steps: [
      { step: 1, title: 'Open Image Size Dialogue', description: 'Navigate to Image > Image Size in the top menu, or press Ctrl+Alt+I (Windows) / Cmd+Option+I (Mac).', shortcut: 'Ctrl + Alt + I' },
      { step: 2, title: 'Change Dimension Units to Inches', description: 'Click the dropdown unit menu next to Width and Height and change it from "Pixels" to "Inches".' },
      { step: 3, title: 'Configure Resample Option', description: 'To resize the canvas without losing original pixels, UNCHECK "Resample". If you want Photoshop to interpolate new pixels, leave "Resample" checked.' },
      { step: 4, title: 'Adjust Target Resolution', description: 'Set the Resolution field to 300 Pixels/Inch for professional printing, or 96 Pixels/Inch for digital display.' },
      { step: 5, title: 'Enable Workspace Rulers', description: 'Press Ctrl+R (Cmd+R) to show rulers, then right-click either ruler and select "Inches" for live canvas measurement.', shortcut: 'Ctrl + R' },
    ],
    faqItems: [
      {
        question: 'Why did my image quality decrease when changing to inches in Photoshop?',
        answer: 'If "Resample" is checked and you lower the resolution or dimensions, Photoshop discards pixel data. Always duplicate your layer before downsampling.',
      },
    ],
    relatedSlugs: ['how-to-change-pixels-to-inches-in-illustrator', 'how-to-convert-inches-to-pixels', 'how-many-pixels-in-an-inch'],
  },

  // 10. How to Change Pixels to Inches in Illustrator
  {
    id: 'how-to-change-pixels-to-inches-in-illustrator',
    slug: 'how-to-change-pixels-to-inches-in-illustrator',
    category: 'guide',
    name: 'How to Change Pixels to Inches in Illustrator',
    shortTitle: 'Illustrator Vector Guide',
    metaTitle: 'How to Change Pixels to Inches in Illustrator | Vector Guide',
    metaDesc: 'Step-by-step tutorial to switch document units from pixels to inches in Adobe Illustrator. Artboard setup, ruler settings, and vector prepress resolution.',
    badge: 'Adobe Illustrator Tutorial',
    h1: 'How to Change Pixels to Inches in Illustrator',
    tagline: 'Master document units, artboard dimensions, and raster effect settings in Adobe Illustrator.',
    overview: 'Adobe Illustrator is a resolution-independent vector graphics application, but setting document units to inches is critical when designing print collateral, packaging, and signboards.',
    initialCalc: {
      mode: '2d',
      width: 8.5,
      height: 11,
      dpi: 300,
    },
    quickStats: [
      { label: 'Document Setup Shortcut', value: 'Ctrl + Alt + P (Win) / Cmd + Option + P (Mac)' },
      { label: 'Rulers Shortcut', value: 'Ctrl + R / Cmd + R' },
      { label: 'Raster Effects Quality', value: 'High (300 ppi)' },
      { label: 'Default Color Mode', value: 'CMYK for Print / RGB for Web' },
    ],
    steps: [
      { step: 1, title: 'Open Document Setup', description: 'Go to File > Document Setup or press Ctrl+Alt+P (Cmd+Option+P on Mac).', shortcut: 'Ctrl + Alt + P' },
      { step: 2, title: 'Set Units to Inches', description: 'Under the General section, click the Units dropdown and select "Inches". Click OK.' },
      { step: 3, title: 'Right-Click Workspace Rulers', description: 'Press Ctrl+R to reveal rulers, right-click the top or side ruler bar, and choose "Inches" for instant unit switching.', shortcut: 'Ctrl + R' },
      { step: 4, title: 'Configure Raster Effects to 300 PPI', description: 'Go to Effect > Document Raster Effects Settings and verify Color Model is CMYK and Resolution is set to High (300 ppi).' },
      { step: 5, title: 'Edit Artboards in Inches', description: 'Press Shift+O to enter Artboard mode. The Properties panel now displays width and height in physical inches.' },
    ],
    faqItems: [
      {
        question: 'Does changing units in Illustrator degrade vector shapes?',
        answer: 'No. Vector shapes in Illustrator are defined by mathematical curves, not pixels. Changing units simply updates the ruler display without altering artwork quality.',
      },
    ],
    relatedSlugs: ['how-to-change-pixels-to-inches-in-photoshop', 'how-to-convert-inches-to-pixels', 'how-many-pixels-in-an-inch'],
  },
];
