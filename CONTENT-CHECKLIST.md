# What's left

The site is written and publishable. Everything below is optional except the
first item.

---

## 1. LinkedIn URL — the one thing that is broken

Every page links to `https://www.linkedin.com/in/your-linkedin/`, which does not
exist. Nothing else on the site is a placeholder. Fix it from the repository
root:

```powershell
Get-ChildItem -Recurse -Include *.html | ForEach-Object {
  $p = $_.FullName
  $t = [IO.File]::ReadAllText($p)
  [IO.File]::WriteAllText($p, $t.Replace('your-linkedin', 'your-actual-slug'))
}
```

Your slug is the part after `/in/` in your profile URL. Then check nothing is
left:

```powershell
Select-String -Recurse -Path *.html -Pattern 'your-linkedin'
```

---

## 2. Project images

Every project page has a commented-out `<figure>` block showing exactly where an
image goes and what filename to use. Uncomment it, drop the file in, done.

| Page | Images worth adding |
| --- | --- |
| `projects/nasa-ltv-frunk.html` | Full front-end CAD assembly; gas-spring assembly; latch bracket |
| `projects/apptronik-hmi.html` | Handle CAD; the SLS part on the robot |
| `projects/frc-2468-integration.html` | Integrated robot CAD; master sketch; robot at the Championship |
| `projects/frc-2468-transfer.html` | V2 CAD; V2 with pivot-shaft integration; V1 hardware |
| `projects/frc-2468-hopper.html` | V2 CAD; V2 deployed; V1 hardware |
| `projects/quiet-supersonic-aircraft.html` | Configuration model; CFD pressure field |

Save them under `assets/img/<project-slug>/`. Export at about 1600 px wide and
keep each under ~300 KB — GitHub Pages serves exactly what you commit.

**Thumbnails.** The project rows on the home page and `projects/index.html`
currently run two-column, with no image frame. When a project has a photo,
delete `project-row--no-thumb` from its `<article>` and add:

```html
<div class="project-row__thumb">
  <img src="../assets/img/nasa-ltv-frunk/thumb.jpg" alt="" width="480" height="360">
</div>
```

---

## 3. Numbers, if they are releasable

The write-ups describe what you did but carry almost no figures, because your
portfolio deck didn't have any. Numbers are what make a technical reader believe
a page. Each of these has a `TODO(you)` comment marking the spot:

- **LTV front trunk** — hood mass, calculated gas-spring force, opening angle,
  part count.
- **Quiet supersonic aircraft** — the metric you were optimising, and what your
  best configuration achieved.

Only publish what you're cleared to. See the note on releasability below.

---

## 4. Things to confirm

- **`index.html`** — "Open to Summer 2027 internships" in the facts strip. This
  is the only line on the site I inferred rather than took from your résumé.
- **`experience/index.html`** — I dated the Yale Book Award 2025 (it's normally
  given junior year). Correct it if that's wrong.
- **`resume/index.html`** — "Last updated: August 2026". Update whenever you
  replace `assets/resume/resume.pdf`.

---

## 5. Releasability

Two pages describe work done inside other organisations:

- `projects/nasa-ltv-frunk.html` — NASA LTV programme hardware.
- `projects/apptronik-hmi.html` — an unreleased Apptronik product subsystem.

Everything on those pages comes from the portfolio deck you already share, so
this is probably fine. But a public website is a different distribution than a
PDF you hand to one recruiter, and NASA hardware programmes can carry export
control restrictions. Worth one email to your former managers before you publish
— it costs you a day and removes the risk entirely.

---

## 6. Before you publish

- [ ] Click every link, including the résumé PDF.
- [ ] Read the site at 375 px and at 1440 px.
- [ ] Toggle dark mode.
- [ ] Tab through the home page — focus should always be visible.
