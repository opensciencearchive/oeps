# OSA Design System — Style Guide

A comprehensive reference for building interfaces within the Open Science Archive ecosystem. This document serves as the authoritative guide for LLM agents and developers creating websites, applications, and documentation using the OSA UI kit.

---

## Design Philosophy

### The Aesthetic: Refined Editorial & Organic Modernism

The OSA design language pursues a **bold aesthetic direction** that combines the structured authority of an editorial magazine with the calm, sophisticated feel of organic modernism. It draws from **scientific publishing** and **editorial design** traditions, communicating authority, precision, and trust — qualities essential to a platform dedicated to scientific data integrity.

**The Vision:**

The design is clean, refined, and trustworthy, with memorable visual details. The key memorable feature is the **combination of sharp, editorial typography with an airy, refined light theme**. It feels more like a high-end digital journal than a typical tech specification website.

**Tone:** Authoritative, Refined, Modern, Organic.

**Core Principles:**

1. **Authoritative Restraint** — Confidence expressed through simplicity, not decoration
2. **Typographic Hierarchy** — Content structure communicated primarily through type
3. **Purposeful Negative Space** — Generous whitespace that allows content to breathe
4. **Laboratory Precision** — Clean lines, measured spacing, deliberate color

**What OSA Is Not:**

- Not playful or casual (no rounded corners, bouncy animations, or emoji-heavy UI)
- Not dark-mode-first (light theme establishes trust and readability)
- Not maximalist (every element must earn its place)
- Not trendy (avoid fleeting design fads; aim for timeless)

### Design Thinking Process

Before coding any new interface, understand the context and commit to the aesthetic direction:

- **Purpose:** What problem does this interface solve? Who uses it?
- **Tone:** OSA's tone is editorial/magazine meets organic/natural — luxury/refined without being cold
- **Constraints:** Technical requirements (framework, performance, accessibility)
- **Differentiation:** What makes this UNFORGETTABLE? What's the one thing someone will remember?

**CRITICAL:** The key is intentionality, not intensity. Execute the vision with precision. Every element must earn its place.

Then implement working code that is:

- Production-grade and functional
- Visually striking and memorable
- Cohesive with a clear aesthetic point-of-view
- Meticulously refined in every detail

### Spatial Composition & Visual Interest

The layout uses a **strong grid as a foundation** but **intentionally breaks it** for visual interest:

- **Overlapping elements** — Especially in hero sections and diagrams, elements may overlap to create depth and tension
- **Asymmetry** — Avoid perfectly balanced layouts; controlled imbalance creates energy
- **Diagonal flow** — Break the horizontal/vertical rigidity with occasional diagonal movement
- **Grid-breaking elements** — Strategic elements that escape the grid draw the eye
- **Unexpected details** — Small surprises reward close attention (a decorative glyph, an unusual margin, a considered interaction)

The core specification content remains in a highly readable, single-column layout with sticky navigation — but hero sections, diagrams, and landing pages should explore compositional tension.

**Balance restraint with surprise:** The overall aesthetic is refined and minimal, but punctuated by moments of visual interest that make it memorable.

---

## Color System

### Palette Philosophy

The palette is intentionally restrained: a **monochrome foundation** with a single **sage green accent**. This creates a clinical, trustworthy aesthetic reminiscent of scientific instruments and archival materials.

### Color Tokens

```css
/* Backgrounds */
--color-bg: hsl(0, 0%, 100%);           /* Pure white — primary background */
--color-bg-alt: hsl(0, 0%, 97%);        /* Off-white — code blocks, cards */
--color-bg-elevated: hsl(0, 0%, 100%);  /* Elevated surfaces */

/* Text */
--color-text: hsl(0, 0%, 5%);           /* Near-black — primary text */
--color-text-muted: hsl(0, 0%, 38%);    /* Secondary text, captions */
--color-text-subtle: hsl(0, 0%, 64%);   /* Tertiary text, labels */

/* Accent — Sage Green */
--color-accent: hsl(160, 25%, 55%);         /* Primary accent — links, highlights */
--color-accent-hover: hsl(160, 35%, 35%);   /* Hover state — darker, more saturated */
--color-accent-subtle: hsl(160, 25%, 85%);  /* Backgrounds, selections */
--color-accent-muted: hsl(160, 25%, 75%);   /* Borders, decorative elements */

/* Borders */
--color-border: hsl(0, 0%, 88%);        /* Primary borders */
--color-border-subtle: hsl(0, 0%, 94%); /* Subtle dividers */
```

### Usage Guidelines

| Element | Color Token |
|---------|-------------|
| Body text | `--color-text` |
| Secondary text | `--color-text-muted` |
| Labels, captions | `--color-text-subtle` |
| Links | `--color-accent` |
| Link hover | `--color-accent-hover` |
| List markers | `--color-accent` |
| Blockquote border | `--color-accent` |
| Code background | `--color-bg-alt` |
| Table header background | `--color-bg-alt` |
| Selection highlight | `--color-accent-subtle` |

### Color Restrictions

- **Never** use pure black (`#000`) for text — always use `--color-text`
- **Never** introduce additional accent colors — sage green is singular
- **Never** use gradients except for subtle fade effects (e.g., sticky header shadow)
- **Avoid** colored backgrounds for sections — use whitespace for separation

---

## Typography

### Type Philosophy

Typography carries the design. The pairing of a **sharp serif display font** with a **clean geometric sans-serif** creates an editorial quality — authoritative yet approachable, technical yet refined.

### Font Stack

```css
--font-display: 'DM Serif Display', Georgia, serif;
--font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
--font-mono: 'JetBrains Mono', 'SF Mono', 'Monaco', monospace;
```

### Font Roles

| Font | Usage |
|------|-------|
| **DM Serif Display** | Page titles, section headers (h1, h2), hero text |
| **Inter** | Body text, navigation, UI elements, h3–h6 |
| **JetBrains Mono** | Code blocks, inline code, technical labels, version badges |

### Type Scale

```css
--text-xs: 0.75rem;      /* 12px — labels, badges */
--text-sm: 0.875rem;     /* 14px — captions, nav items */
--text-base: 1rem;       /* 16px — body text */
--text-lg: 1.125rem;     /* 18px — lead paragraphs */
--text-xl: 1.25rem;      /* 20px — h4 */
--text-2xl: 1.5rem;      /* 24px — h3 */
--text-3xl: 1.875rem;    /* 30px — h2 */
--text-4xl: 2.25rem;     /* 36px — h1 */
--text-5xl: 3rem;        /* 48px — display headings */
--text-6xl: 3.75rem;     /* 60px — hero titles */
--text-7xl: 4.5rem;      /* 72px — splash screens */
```

### Line Heights

```css
--leading-none: 1;        /* Display text, single-line headings */
--leading-tight: 1.15;    /* Headings */
--leading-snug: 1.35;     /* Subheadings, margin notes */
--leading-normal: 1.6;    /* UI text, short paragraphs */
--leading-relaxed: 1.75;  /* Long-form body text — PREFERRED for articles */
```

### Letter Spacing

```css
--tracking-tight: -0.02em;   /* Large display headings */
--tracking-normal: 0;        /* Default */
--tracking-wide: 0.025em;    /* Subtle emphasis */
--tracking-wider: 0.05em;    /* Small caps, badges */
--tracking-widest: 0.1em;    /* Uppercase labels */
```

### Heading Styles

```css
/* H1 — Section titles in specifications */
h1 {
  font-family: var(--font-display);
  font-size: 40px;
  font-weight: 400;  /* Note: light weight for elegance */
  letter-spacing: -0.02em;
  line-height: var(--leading-tight);
}

/* H2 — Major subsections */
h2 {
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 400;
  letter-spacing: -0.02em;
}

/* H3 — Sub-subsections (switches to sans-serif) */
h3 {
  font-family: var(--font-body);
  font-size: 18px;
  font-weight: 600;
}

/* H4 — Labels, categories */
h4 {
  font-family: var(--font-body);
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-text-muted);
}
```

### Body Text

```css
p {
  font-size: var(--text-base);        /* 16px */
  line-height: var(--leading-relaxed); /* 1.75 */
  color: var(--color-text);
  max-width: var(--content-width);     /* 42rem — optimal reading width */
}
```

---

## Spacing

### Spacing Philosophy

Generous spacing conveys confidence and refinement. Cramped layouts feel amateur; ample whitespace feels intentional.

### Spacing Scale

```css
--space-1: 0.25rem;    /* 4px */
--space-2: 0.5rem;     /* 8px */
--space-3: 0.75rem;    /* 12px */
--space-4: 1rem;       /* 16px */
--space-5: 1.25rem;    /* 20px */
--space-6: 1.5rem;     /* 24px */
--space-8: 2rem;       /* 32px */
--space-10: 2.5rem;    /* 40px */
--space-12: 3rem;      /* 48px */
--space-16: 4rem;      /* 64px */
--space-20: 5rem;      /* 80px */
--space-24: 6rem;      /* 96px */
--space-32: 8rem;      /* 128px */
--space-40: 10rem;     /* 160px */
--space-48: 12rem;     /* 192px */
```

### Spacing Guidelines

| Context | Recommended Spacing |
|---------|---------------------|
| Paragraph margin-bottom | `--space-4` |
| Between sections (h2) | `--space-20` |
| Between subsections (h3) | `--space-12` |
| List item margin | `--space-2` |
| Code block margin | `--space-6` |
| Card padding | `--space-6` to `--space-8` |
| Page padding (desktop) | `--space-12` |
| Page padding (mobile) | `--space-6` or `20px` |

---

## Layout

### Layout Tokens

```css
--content-width: 42rem;        /* 672px — optimal reading width */
--content-width-wide: 56rem;   /* 896px — wide content, tables */
--margin-width: 14rem;         /* 224px — margin notes */
--page-padding: var(--space-6);
```

### Content Width

For body text paragraphs, **42rem (672px)** is the optimal width for reading comprehension — approximately 65–75 characters per line.

```css
.prose > p,
.prose > ul,
.prose > ol {
  max-width: var(--content-width);
}
```

**OEP Article Pages:** OEP detail pages use a wider container (900px) to accommodate code blocks, tables, and technical specifications while maintaining readability. The wider layout gives OEPs an article-like reading experience.

### Specification Layout

The canonical specification layout is a **two-column grid**:

```
┌─────────────────────────────────────────────────────────┐
│  Sticky Nav (260px)  │  Content (max 720px)             │
│                      │                                  │
│  • Section 1         │  # Section Title (sticky h1)     │
│  • Section 2         │                                  │
│  • Section 3         │  Body text flows here...         │
│                      │                                  │
└─────────────────────────────────────────────────────────┘
```

```css
.spec-layout {
  display: grid;
  grid-template-columns: 260px 1fr;
}

.spec-nav {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
}

.spec-article {
  padding: var(--space-8) var(--space-12) var(--space-32);
  max-width: 720px;
}
```

### Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 640px) { ... }

/* Tablet */
@media (max-width: 1024px) { ... }

/* Desktop */
@media (min-width: 1025px) { ... }

/* Wide (margin notes visible) */
@media (min-width: 1200px) { ... }
```

---

## Motion & Animation

### Motion Philosophy

Motion is **rare and purposeful**. The OSA aesthetic favors stillness — movement should feel like a subtle inhale, not a dance.

### Transition Tokens

```css
--transition-fast: 150ms ease;     /* Hover states, micro-interactions */
--transition-base: 250ms ease;     /* Standard transitions */
--transition-slow: 400ms ease;     /* Page load animations */
--transition-slower: 600ms ease;   /* Complex orchestrated reveals */
```

### Animation Keyframes

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```

### Stagger Classes

For orchestrated page-load reveals:

```css
.stagger-1 { animation-delay: 0ms; }
.stagger-2 { animation-delay: 80ms; }
.stagger-3 { animation-delay: 160ms; }
.stagger-4 { animation-delay: 240ms; }
.stagger-5 { animation-delay: 320ms; }
.stagger-6 { animation-delay: 400ms; }
```

### When to Animate

**DO animate:**
- Page load: staggered fade-in for hero content
- Hover: link color transitions, button states
- Scroll progress indicator
- Navigation active state changes

**DON'T animate:**
- Background colors or gradients
- Large layout shifts
- Continuous/looping animations
- Decorative flourishes

---

## Surfaces

### Shadows

Shadows are minimal and serve functional purposes (elevation, focus).

```css
--shadow-sm: 0 1px 2px rgba(26, 30, 28, 0.04);   /* Subtle elevation */
--shadow-md: 0 4px 12px rgba(26, 30, 28, 0.06);  /* Cards, dropdowns */
--shadow-lg: 0 8px 24px rgba(26, 30, 28, 0.08);  /* Modals, overlays */
```

### Border Radius

Minimal to none. Sharp corners convey precision.

```css
--radius-sm: 0.25rem;   /* 4px — code, badges */
--radius-md: 0.5rem;    /* 8px — cards (use sparingly) */
--radius-lg: 0.75rem;   /* 12px — rarely used */
```

### Borders

```css
/* Standard border */
border: 1px solid var(--color-border);

/* Subtle divider */
border-bottom: 1px solid var(--color-border-subtle);

/* Accent border (blockquotes, callouts) */
border-left: 3px solid var(--color-accent);
```

---

## Components

### Code Blocks

```css
pre {
  background: var(--color-bg-alt);
  color: var(--color-text);
  padding: var(--space-5);
  border-radius: 3px;
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  line-height: 1.6;
  overflow-x: auto;
}

code {
  font-family: var(--font-mono);
  font-size: 0.85em;
  background: var(--color-bg-alt);
  padding: 0.15em 0.4em;
  border-radius: 3px;
}
```

### Links

```css
a {
  color: var(--color-accent);
  text-decoration: none;
  transition: color var(--transition-fast);
}

a:hover {
  color: var(--color-accent-hover);
  text-decoration: underline;
}
```

### Callouts

Minimal, label-driven callout boxes for notes and warnings:

```html
<aside class="callout">
  <span class="callout-label">Note</span>
  <div class="callout-content">Content here...</div>
</aside>
```

```css
.callout {
  margin: var(--space-8) 0;
}

.callout-label {
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-subtle);
}

.callout-content {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  line-height: var(--leading-relaxed);
}
```

### Margin Notes

Side annotations for wide screens:

```css
.margin-note {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  line-height: var(--leading-snug);
}

@media (min-width: 1200px) {
  .margin-note {
    position: absolute;
    right: 0;
    width: var(--margin-width);
    transform: translateX(calc(100% + var(--space-8)));
    padding-left: var(--space-4);
    border-left: 1px solid var(--color-border);
  }
}
```

### Tables

```css
table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--text-sm);
}

th {
  font-weight: 600;
  color: var(--color-text-muted);
  font-size: var(--text-xs);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  text-align: left;
  padding: var(--space-3) var(--space-4);
  background: var(--color-bg-alt);
}

td {
  padding: var(--space-3) var(--space-4);
  border-bottom: 1px solid var(--color-border);
}
```

### Badges

Version numbers, status labels:

```css
.badge {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-weight: 500;
  letter-spacing: var(--tracking-wider);
  color: var(--color-accent);
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--color-accent);
  border-radius: var(--radius-sm);
}
```

---

## Prose Class

For long-form content (specifications, RFCs, documentation), apply the `.prose` class:

```html
<article class="prose">
  <h1>Section Title</h1>
  <p>Content here...</p>
</article>
```

The `.prose` class provides:
- Sticky h1 headers with fade effect
- Proper heading hierarchy and spacing
- Optimized reading typography
- Responsive sizing
- Code block and table formatting

---

## Do's and Don'ts

### DO

- Use generous whitespace — when in doubt, add more space
- Let typography do the work — hierarchy through type, not decoration
- Keep the accent color singular — sage green only
- Prefer stillness — animate sparingly and purposefully
- Maintain sharp corners — precision over friendliness
- Use monospace for technical elements — versions, code, labels
- Test at 42rem content width — the optimal reading measure

### DON'T

- Add decorative elements without function
- Use multiple accent colors
- Add rounded corners to structural elements
- Create busy, animated interfaces
- Use dark mode as the primary theme
- Introduce new fonts beyond the three defined
- Crowd content — always prefer space
- Use emoji in formal content

---

## Implementation Checklist

When building a new page or component:

1. [ ] Import the design system: `@import '@opensciencearchive/ui'`
2. [ ] Import fonts: `@import '@opensciencearchive/ui/fonts'`
3. [ ] Configure Vite alias for font resolution (see README)
4. [ ] Use `.prose` class for long-form content
5. [ ] Verify content width doesn't exceed `--content-width`
6. [ ] Check heading hierarchy (h1 → h2 → h3)
7. [ ] Ensure links use `--color-accent`
8. [ ] Test responsive breakpoints (640px, 1024px)
9. [ ] Verify adequate spacing between sections
10. [ ] Remove any decorative elements that don't serve function

---

## Resources

- **Package:** `@opensciencearchive/ui`
- **Repository:** https://github.com/opensciencearchive/ui
- **Fonts:** DM Serif Display, Inter, JetBrains Mono

---

*This style guide defines the visual language of the Open Science Archive. Adherence to these principles ensures consistency, authority, and trust across all OSA interfaces.*
