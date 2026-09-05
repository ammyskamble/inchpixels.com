# InchPixels Design System (DESIGN.md)

**Domain:** inchpixels.com  
**Design Philosophy:** Precision engineering meets modern creative workflow. Ultra-clean dark/light aesthetic optimized for UI/UX designers, printmakers, and developers who demand pixel-perfect accuracy, instantaneous feedback, and export efficiency.

---

## 1. Color Palette (OKLCH Color Space)

We utilize the `oklch` perceptual color model for consistent perceived lightness across shades and vibrant, wide-gamut accents.

### 1.1 Base & Surface Tokens

| Token | Light Mode Value | Dark Mode Value | Usage |
|---|---|---|---|
| `--background` | `oklch(0.978 0.005 250)` | `oklch(0.12 0.015 260)` | Main application canvas |
| `--foreground` | `oklch(0.18 0.02 260)` | `oklch(0.98 0.005 250)` | Primary body typography |
| `--card` | `oklch(1 0 0)` | `oklch(0.155 0.018 260)` | Elevated surfaces and tool cards |
| `--card-foreground` | `oklch(0.18 0.02 260)` | `oklch(0.98 0.005 250)` | Text inside cards |
| `--muted` | `oklch(0.94 0.008 250)` | `oklch(0.19 0.02 260)` | Inactive pills, subtle tags, input wells |
| `--muted-foreground` | `oklch(0.46 0.03 260)` | `oklch(0.68 0.02 260)` | Secondary labels, descriptions |
| `--border` | `oklch(0.89 0.012 250)` | `oklch(0.24 0.02 260)` | Card and section borders |
| `--input` | `oklch(0.89 0.012 250)` | `oklch(0.24 0.02 260)` | Form input borders |
| `--ring` | `oklch(0.52 0.22 260)` | `oklch(0.65 0.22 255)` | Focus states and active outlines |

### 1.2 Brand Accents (Electric Indigo & Cyan)

| Token | Light Mode Value | Dark Mode Value | Usage |
|---|---|---|---|
| `--primary` | `oklch(0.52 0.22 260)` | `oklch(0.65 0.22 255)` | Primary actions, CTA buttons, active tabs |
| `--primary-foreground` | `oklch(0.99 0 0)` | `oklch(0.10 0.02 260)` | Text on primary backgrounds |
| `--accent` | `oklch(0.94 0.04 220)` | `oklch(0.24 0.05 240)` | Interactive hovers, highlight backdrops |
| `--accent-foreground` | `oklch(0.35 0.18 250)` | `oklch(0.85 0.12 220)` | Highlight text / icons |
| `--cyan-glow` | `oklch(0.78 0.15 210)` | `oklch(0.75 0.18 205)` | Metric badges, aspect ratio highlights |
| `--success` | `oklch(0.62 0.17 145)` | `oklch(0.68 0.18 145)` | Copy success toast, confirmed actions |

---

## 2. Typography

1. **Display & Body Font:** Inter / System Sans  
   - Font family: `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`  
   - Weights: `400` (Regular), `500` (Medium), `600` (SemiBold), `700` (Bold), `800` (ExtraBold).
2. **Numeric & Code Font:** Tabular Monospace  
   - Font family: `"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`  
   - Used for: Live dimensions, formula readouts, pixel calculations, CSS output blocks, export snippets.
   - Numeric features: `font-variant-numeric: tabular-nums lining-nums;` to prevent jitter during fast live typing.

---

## 3. Elevation, Radius & Spacing

- **Border Radius:**
  - Standard containers / cards: `--radius: 0.75rem` (12px)
  - Interactive inputs & buttons: `0.5rem` (8px)
  - Badges & pill tags: `9999px` (Full rounded)
- **Shadows & Glassmorphism:**
  - Tool Card: Subtle border with backdrop-blur `backdrop-blur-md` and `shadow-sm` or dark-mode ambient glow `shadow-[0_4px_24px_rgba(0,0,0,0.3)]`.
  - Focused Element: Clean offset ring `ring-2 ring-primary/40 outline-none`.

---

## 4. Component Design Patterns

### 4.1 Input Fields
- Large high-contrast numerical fields with attached unit labels (`in`, `px`, `DPI`).
- Dual synchronized bindings: Real-time update on `onChange` without requiring "Calculate" button clicks.
- Visual stepper buttons for quick micro-increments (+0.5 in, +10 px, etc.).

### 4.2 Live Aspect Ratio Visualizer Canvas
- Fixed container bounds (e.g. `w-full max-w-md h-52`) with dynamic nested SVG/box.
- Maintains exact aspect ratio via mathematical bounding-box clamping.
- Horizontal & vertical dimension indicator guides (tick rulers with dimension text).
- Glassmorphic center badge displaying active aspect ratio (e.g. `16:9`, `1:1.29`), orientation icon, and Megapixel calculation.

### 4.3 Export Cards
- Compact, high-utility code blocks.
- One-click copy with immediate tactile feedback (icon transitions from `Copy` to `Check` with green flash).
- Formats:
  1. Raw PX
  2. CSS Declaration
  3. Tailwind CSS v4 Class
  4. Print CSS `@page`
  5. SVG `viewBox`
  6. JSON Spec

### 4.4 Reference Tables
- Pre-rendered, striped tabular layout with fixed headers.
- Monospace numbers aligned to the right for easy vertical scanning.
- Instant client-side search/filter to locate specific measurements immediately.
