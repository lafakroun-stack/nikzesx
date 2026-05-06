# nikzesx

A simple, modern landing page — built with plain HTML, CSS, and JavaScript. No frameworks, no build step, no dependencies.

## Features

- Hero section with gradient background and call-to-action buttons
- Features grid showcasing six key product highlights
- Testimonials section with card layout
- Email sign-up form with client-side validation
- Scroll-triggered fade-in animations
- Sticky navigation with active-link highlighting
- Fully responsive (mobile, tablet, desktop)
- Dark theme using CSS custom properties

## Project structure

```
nikzesx/
├── index.html   # Page markup
├── index.css    # All styles (CSS variables, flexbox, grid, animations)
└── index.js     # Scroll animations, nav highlight, form handling
```

## Getting started

No build tools required. Just open the file in a browser:

```bash
# Option 1 — open directly
open index.html

# Option 2 — serve locally (any static server works)
npx serve .
# or
python3 -m http.server 8080
```

Then visit `http://localhost:8080` (or whichever port your server uses).

## Customisation

All colours, spacing, and type sizes are defined as CSS custom properties at the top of `index.css` inside `:root { … }`. Change the values there to retheme the entire page in seconds.
