# Afreen — Portfolio Website

A production-ready personal portfolio built with plain HTML5, CSS3, and vanilla JavaScript
(no build step, no framework). Dark mode by default, with a light mode toggle.

## Folder structure

```
portfolio/
├── index.html        All markup/content, organized by section
├── css/style.css      Design tokens, layout, animations, responsive rules
├── js/script.js        Loader, theme toggle, nav, typing animation, reveals, filters, form
├── assets/            Put your real images here (see below)
└── resume.pdf          Add your resume here (referenced by the Resume buttons)
```

## Before you publish — 3 things to add

1. **Your photo** — save it as `assets/profile.jpeg` (square image works best,
   at least 500×500px). Until it's added, the hero shows a clean "A" placeholder automatically.
2. **Your resume** — save it as `Resume.pdf` in the project root. The "Download Resume"
   and "Resume" buttons already point to it.
3. **Real links** — open `index.html` and search for `sec24cb016@sairamtap.edu.in`,
   `https://www.linkedin.com/in/s-afreen-734555329/`, and `https://github.com/AfreenS-Codes`, then swap in your real
   email, LinkedIn, and GitHub URLs (they appear in the hero terminal card is not
   needed, but the Contact section and footer use them).

## Achievement photos (optional)

The Achievements section has three empty placeholders (Competition Photo, Presentation,
Winning Moment). Once you have real photos, replace each `.gallery-placeholder` div in
`index.html` with an `<img>` tag pointing to an image in `assets/`.

## Contact form

The form is front-end only — submitting it opens the visitor's email client with a
pre-filled message addressed to you (via a `mailto:` link). If you'd rather receive
submissions directly, wire the form up to a service like Formspree, or a small backend
endpoint, and replace the `submit` handler in `script.js`.

## Project filter

The "AI & ML" / "Full-Stack" / "Social Impact" filters on the Projects section use
`data-tags` attributes on each `.project-card`. Add or remove tags there if you add
more projects later.

## Browser support

Uses modern CSS (`color-mix()`, `backdrop-filter`) — works in current Chrome, Edge,
Safari, and Firefox. Reduced-motion preferences are respected throughout.
