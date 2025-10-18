# Roommate Finder - Landing Page

Modern, minimalist landing page for a roommates search website/app.

## Features
- Hero with large heading, subheading, CTA, and email subscribe
- Friendly inline SVG illustration with subtle parallax
- About section with short copy, UI mock, and lazy-loaded Yandex Map iframe
- Features grid (4 cards) with hover/raise effects
- Secondary email CTA with gradient background
- Smooth scroll, reveal-on-scroll animations, focus states
- Accessible (semantic HTML, labels, aria-live, reduced motion support)
- Responsive (mobile-first with tablet/desktop breakpoints)
- Performance friendly (lazy map, lightweight CSS/JS)

## Getting started

### Option 1: Open directly
- Open `index.html` in a modern browser

### Option 2: Serve locally (recommended)
- Python: 
  ```bash
  python3 -m http.server 5173
  # then visit http://localhost:5173/
  ```
- Node (if installed): 
  ```bash
  npx serve -l 5173
  ```

## Structure
- `index.html`: Markup and sections
- `styles.css`: Branding, layout, components, animations
- `script.js`: Interactions (smooth scroll, parallax, reveal, lazy map, forms)

## Customization
- Edit colors via CSS variables in `styles.css`
- Update copy in `index.html`
- Replace illustration (inline SVG) in the hero
- Adjust map location via `data-map-src` in the Yandex map container

## Notes
- All animations respect `prefers-reduced-motion`
- Buttons and inputs have strong focus styles
- Social links are placeholders; update URLs as needed
