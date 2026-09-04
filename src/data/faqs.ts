export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  formula?: string;
  steps?: string[];
  badge?: string;
}

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'pixels-to-inches',
    question: 'How to convert pixels to inches (How do I convert pixels to inches / Can I convert px to inches)?',
    badge: 'Formula & Math',
    formula: 'Inches = Pixels ÷ DPI (or PPI)',
    answer:
      'Yes, you can easily convert pixels to inches by dividing the total pixel dimension by your display or print resolution (measured in DPI or PPI). For example, to convert 3,000 pixels at standard 300 DPI print quality: 3,000 ÷ 300 = 10 inches. At modern web resolution (96 DPI): 1,920 ÷ 96 = 20 inches.',
  },
  {
    id: 'inches-to-pixels',
    question: 'How to convert inches to pixels?',
    badge: 'Formula & Math',
    formula: 'Pixels = Inches × DPI (or PPI)',
    answer:
      'To convert physical inches to digital pixels, multiply the dimension in inches by the resolution in DPI (dots per inch) or PPI (pixels per inch). For example, converting a standard 8.5 × 11 inch sheet at 300 DPI print quality yields: 8.5 × 300 = 2,550 pixels in width, and 11 × 300 = 3,300 pixels in height (8.41 megapixels). At 96 DPI web standard, 8.5 × 11 inches equals 816 × 1,056 pixels.',
  },
  {
    id: 'pixels-in-one-inch',
    question: 'How many pixels are in 1 inch?',
    badge: 'Standards',
    answer:
      'The number of pixels in 1 inch depends entirely on the medium and display resolution: in standard CSS and web design (W3C specification), 1 inch equals exactly 96 pixels. In commercial high-resolution printing, 1 inch equals 300 pixels. In draft newspaper printing, 1 inch equals 150 pixels, and on legacy computer displays, 1 inch historically equaled 72 pixels.',
  },
  {
    id: 'pixels-per-inch-print',
    question: 'How many pixels per inch to print?',
    badge: 'Print Resolution',
    answer:
      'For standard high-quality printing (photographs, books, brochures, business cards), the industry gold standard is 300 DPI (pixels per inch). Large-format prints like posters and banners viewed from 3 to 6 feet away can use 150 to 200 DPI, while billboards viewed from a distance can use 100 DPI or lower.',
  },
  {
    id: 'is-100-pixels-one-inch',
    question: 'Is 100 pixels 1 inch?',
    badge: 'Quick Check',
    formula: '100 px ÷ 96 DPI = 1.042 inches | 100 px ÷ 300 DPI = 0.333 inches',
    answer:
      'No, 100 pixels is generally not 1 inch. On standard web and computer monitors (96 DPI), 100 pixels equals approximately 1.042 inches. In standard 300 DPI commercial printing, 100 pixels is only 0.333 inches (about 1/3 of an inch). 100 pixels only equals 1 inch if the canvas or display is configured to an exact resolution of 100 DPI.',
  },
  {
    id: 'one-inch-photo-pixels',
    question: 'How many pixels is a 1 inch photo?',
    badge: 'Photo Sizes',
    formula: '300 × 300 px @ 300 DPI | 96 × 96 px @ 96 DPI',
    answer:
      'A 1 × 1 inch square photo depends on the intended output format: for high-resolution photo prints (such as passport photos, license badges, or physical prints at 300 DPI), a 1 inch photo is 300 × 300 pixels (0.09 megapixels). For web, social media avatars, or digital screen display (96 DPI), a 1 inch photo equals 96 × 96 pixels.',
  },
  {
    id: 'photoshop-pixels-to-inches',
    question: 'How to change pixels to inches in Photoshop (How to change from pixels to inches in Photoshop)?',
    badge: 'Adobe Photoshop',
    answer:
      'To change dimensions from pixels to inches in Adobe Photoshop: 1. Open your image in Photoshop. 2. Go to Image > Image Size in the top menu (or press Ctrl + Alt + I on Windows, Cmd + Option + I on Mac). 3. Click the dropdown unit menus next to Width and Height and select Inches. 4. Uncheck Resample if you want to change physical print size without altering the total pixel count, or check Resample to scale the pixels. 5. Set your desired Resolution (e.g. 300 Pixels/Inch for print) and click OK. You can also right-click the workspace rulers (Ctrl + R / Cmd + R) and choose Inches.',
    steps: [
      'Open your image or document in Adobe Photoshop.',
      'Select Image > Image Size... from the top menu bar (Shortcut: Ctrl + Alt + I on Windows / Cmd + Option + I on macOS).',
      'Locate the Width and Height unit dropdowns and switch them from Pixels to Inches.',
      'Optional: Uncheck "Resample" to adjust print dimensions without altering image pixel data, or keep it checked to resize the file.',
      'Enter your desired Resolution (standard is 300 Pixels/Inch for print or 96 for screen) and click OK.',
      'Pro-tip: Press Ctrl + R (Cmd + R) to show rulers, then right-click either ruler and select "Inches" for persistent inch measurement.',
    ],
  },
  {
    id: 'illustrator-pixels-to-inches',
    question: 'How to change from pixels to inches in Illustrator?',
    badge: 'Adobe Illustrator',
    answer:
      'To change units from pixels to inches in Adobe Illustrator: 1. Open your document in Illustrator. 2. Go to File > Document Setup (Shortcut: Ctrl + Alt + P on Windows, Cmd + Option + P on Mac). 3. In the General tab, change the Units dropdown from Pixels to Inches and click OK. 4. Alternatively, press Ctrl + R (Cmd + R) to reveal the rulers, right-click either ruler bar, and choose Inches. All artboards, vector bounding boxes, and the Properties panel will now display in inches.',
    steps: [
      'Open your document in Adobe Illustrator.',
      'Navigate to File > Document Setup... in the top menu bar (Shortcut: Ctrl + Alt + P on Windows / Cmd + Option + P on macOS).',
      'In the dialog window, locate the "Units" dropdown menu and switch from "Pixels" to "Inches". Click OK.',
      'Alternatively, press Ctrl + R (Cmd + R) to show the document rulers, right-click the ruler bar, and select "Inches".',
      'The Properties panel (Window > Properties) and Transform panel will now display all artboard dimensions, object widths, and heights in inches.',
    ],
  },
];
