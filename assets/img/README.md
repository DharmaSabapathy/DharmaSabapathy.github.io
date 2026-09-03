# Images

Suggested layout:

```
assets/img/
├── favicon.svg
├── portrait.jpg              ~880 × 1100, home page hero
└── project-one/
    ├── hero.jpg              ~1600 px wide
    └── analysis.png
```

Guidance:

- **Export at roughly 2× the displayed size, then stop.** The hero portrait is
  never shown wider than ~350 px, so 880 px is plenty. Keep photos under about
  300 KB — GitHub Pages has no image pipeline, so whatever you commit is what
  every visitor downloads.
- **Use JPEG for photographs, PNG for plots and screenshots, SVG for diagrams.**
  WebP is fine too and usually 30% smaller.
- **Always set `alt`, `width` and `height`** on the `<img>` tag. The dimensions
  reserve space so the page does not jump while images load; the `alt` text
  should describe what an engineer would want to know, not "photo of project".
- One good photo of real hardware outperforms four renders. If a project has no
  photo, a labelled CAD screenshot or a plot beats a placeholder.
