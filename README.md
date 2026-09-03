# Engineering portfolio

A hand-written static site: HTML, CSS and about 80 lines of JavaScript. No
framework, no build step, no dependencies. Open any `.html` file in a browser
and it works; push it to GitHub and it is live.

That choice is deliberate. A portfolio needs to still deploy in three years,
when you have not touched it in eighteen months and the toolchain has moved on
twice. There is nothing here to break.

---

## Layout

```
.
├── index.html               Home
├── 404.html                 Not-found page (see the <base> note inside)
├── projects/
│   ├── index.html           Project index
│   ├── nasa-ltv-frunk.html            LTV front trunk — NASA JSC
│   ├── apptronik-hmi.html             Humanoid HMI handles — Apptronik
│   ├── frc-2468-integration.html      Robot integration — FRC 2468
│   ├── frc-2468-transfer.html         Transfer subsystem
│   ├── frc-2468-hopper.html           Expanding hopper
│   └── quiet-supersonic-aircraft.html NASA SEES research
├── experience/index.html    Roles, education, leadership, skills, awards
├── resume/index.html        PDF viewer + a readable web version
├── contact/index.html       Email, LinkedIn, GitHub, résumé
├── assets/
│   ├── css/site.css         The whole design system
│   ├── js/site.js           Nav toggle, theme toggle, footer year
│   ├── img/                 portrait.jpg, favicon.svg, project photos
│   └── resume/resume.pdf    Replace this file to update the résumé
├── .github/workflows/deploy.yml
├── .nojekyll                Serve files as-is; do not run Jekyll
├── robots.txt
└── sitemap.xml
```

The site is published at **https://dharmasabapathy.github.io/**.

Every page links with **relative** paths (`../assets/…`), so the site works
whether it is served from `username.github.io` or `username.github.io/repo/`,
and also straight off your local disk. The single exception is `404.html`,
which uses a `<base href="/">` tag — that file is explained in its own comment.

---

## Publishing to GitHub Pages

1. Create a repository named exactly **`DharmaSabapathy.github.io`** and push
   these files to its `main` branch.
   - If you use a differently-named repo instead, the site will live at
     `dharmasabapathy.github.io/<repo>/`. In that case change `<base href="/">`
     in `404.html` to `<base href="/<repo>/">`, and update the URLs in
     `sitemap.xml`, `robots.txt` and the `canonical`/`og:url` tags.
2. **Settings → Pages → Build and deployment.** Pick one:
   - **Deploy from a branch** → `main` / `/ (root)`. Simplest. Delete
     `.github/workflows/deploy.yml` if you go this way.
   - **GitHub Actions.** Uses the included workflow, which uploads the repo
     unchanged and gives you a deployment log.
3. Wait a minute, then load the URL Pages shows you.

`.nojekyll` matters: without it GitHub runs the files through Jekyll, which
silently ignores anything starting with an underscore. Leave the file in place.

### If Git isn't installed

It currently isn't on this machine. Two options:

**Install Git** (cleaner, and you'll want it anyway):

```powershell
winget install --id Git.Git -e
# reopen the terminal, then from this folder:
git init -b main
git add -A
git commit -m "Portfolio site"
git remote add origin https://github.com/DharmaSabapathy/DharmaSabapathy.github.io.git
git push -u origin main
```

**Or upload through the browser:** create the repo, choose *uploading an
existing file*, and drag in the contents of this folder. Then add the dotfiles
by hand with *Add file → Create new file*, since the uploader skips them:
`.nojekyll` (leave it empty) and, if you want the Actions workflow,
`.github/workflows/deploy.yml`.

### Custom domain

Add a file named `CNAME` at the root containing only your domain
(`example.com`), point a DNS `CNAME` record at `username.github.io`, then
enable **Enforce HTTPS** in Settings → Pages.

---

## Editing it

**Content** lives directly in the HTML — there is no data file and no CMS. See
[CONTENT-CHECKLIST.md](CONTENT-CHECKLIST.md) for what is still outstanding
(short version: the LinkedIn URL, and project photos).

**Design** lives in the custom properties at the top of `assets/css/site.css`.
Change `--accent` and the whole site follows. The type scale, spacing scale and
both colour themes are defined in that one block.

**Adding a project:**

1. `copy projects\nasa-ltv-frunk.html projects\my-project.html` — that page is
   the fullest example of the structure.
2. Write it up. Each page follows the same arc: what the thing had to do, the
   decision that mattered, how it was built, and what it cost you. Update the
   `<title>`, `description`, `canonical` and `og:url` in the head, and the spec
   panel in the aside.
3. Fix the prev/next links in the `.pager` of the pages either side of it.
4. Add a row to `projects/index.html`, and to *Selected work* on `index.html`
   if it belongs in your top three.
5. Add the URL to `sitemap.xml`.

### The one thing that is duplicated

The header and footer markup is repeated in each page. That is the honest cost
of having no build step. It is roughly 40 lines per file, it changes maybe
twice a year, and a find-and-replace across `*.html` handles it. The trade was
made in favour of pages that render instantly, work without JavaScript, and
never break because a tool got upgraded.

---

## Design notes

- **Type carries the hierarchy.** IBM Plex Sans for reading, IBM Plex Mono for
  labels, figures and technical metadata, so specification data reads as data.
- **Hairlines, not cards.** Projects are rows separated by 1px rules rather
  than a grid of floating rounded boxes.
- **One accent colour**, used for links, active navigation and a single rule
  under each capability heading. No gradients, no glows, no decorative blobs.
- **Motion is limited** to hover and focus transitions under 200 ms, and all of
  it is disabled under `prefers-reduced-motion`.
- **Accessibility:** skip link, visible focus rings, `aria-current` on the
  active nav item, labelled icon buttons, semantic landmarks, and a colour
  palette that clears WCAG AA for body text in both themes.
- **Dark mode** follows the operating system and can be overridden with the
  toggle; the choice is remembered in `localStorage`. An inline script in each
  `<head>` applies it before first paint so there is no flash.

## Browser support

Anything from roughly 2023 onward. The site uses CSS nesting-free plain CSS,
custom properties, `clamp()`, `color-mix()` and `:focus-visible`. Older
browsers lose the translucent header background and some colour mixing; the
content is unaffected.
