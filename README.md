# ZINAD — Security Writeups

Personal site for HTB writeups, bug bounty disclosures, and an About/CV page.
Dark theme, teal accent, JetBrains Mono + Inter. No build step — plain HTML/CSS/JS,
ready to push straight to GitHub Pages.

## Structure

```
index.html              Home page (hero + latest writeups)
writeups.html           All writeups, searchable + tag filter
htb.html                HTB writeups only, searchable + tag filter
bugbounty.html          Bug bounty writeups only, searchable + tag filter
about.html              About / CV page

htb/                     <- one .html file per HTB box writeup
bugbounty/               <- one .html file per bug bounty writeup
templates/               <- copy these to start a new writeup
  htb-template.html
  bugbounty-template.html

assets/css/main.css      all styling (one file, CSS variables at the top)
assets/js/writeups-data.js   <- THE REGISTRY. Every writeup must have an entry here.
assets/js/render-list.js     listing/filtering logic, shared by all list pages
assets/js/site.js            mobile nav + copy-to-clipboard for code blocks
```

## How to publish a new writeup

**1. Copy a template.**

For an HTB box:
```
cp templates/htb-template.html htb/<box-name>.html
```

For a bug bounty disclosure:
```
cp templates/bugbounty-template.html bugbounty/<slug>.html
```

**2. Edit the new file.**
Open it and fill in:
- `<title>`
- the page title / lede at the top
- the tags + meta row (date, read time)
- the info panel (box info, or disclosure summary)
- the Table of Contents links (`#recon`, `#foothold`, etc. — match your own `<h2 id="...">`)
- the actual writeup body inside `<article class="prose">`

The template already has the sidebar, header, and footer wired up with correct
relative links (`../index.html`, `../assets/css/main.css`, etc.) — don't touch those
unless you move the file out of `htb/` or `bugbounty/`.

**3. Register it.**
Open `assets/js/writeups-data.js` and add one object to the `WRITEUPS` array:

```js
{
  id: "box-name",
  title: "HTB: Box Name",
  category: "htb",                 // or "bugbounty"
  summary: "One or two sentence teaser shown on the card.",
  tags: ["sqli", "privesc"],
  difficulty: "medium",            // "easy" | "medium" | "hard" | "insane" | null
  date: "2026-06-01",
  file: "htb/box-name.html",
  featured: true
}
```

That's the only place you need to touch. The homepage, `writeups.html`, `htb.html`,
and `bugbounty.html` all read from this array and rebuild their grids, tag filters,
and search automatically — no other file needs editing.

**4. Preview locally (optional).**
```
python3 -m http.server 8000
```
then open `http://localhost:8000/`.

**5. Commit and push.** GitHub Pages will pick it up automatically.

## Writing the article body

Inside `<article class="prose">` you can use:

- `<h2 id="anchor">` for major sections — also link these from the Table of Contents
- `<h3>` for sub-sections
- `<pre><code>...</code></pre>` for terminal output / payloads — a "copy" button is
  added automatically by `site.js`, no extra markup needed
- `<code>inline</code>` for inline commands or filenames
- `.callout` for a side note, `.callout.warn` for a warning/gotcha:
  ```html
  <div class="callout">
    <span class="label">Note</span>
    Your note text here.
  </div>
  ```
- Regular `<p>`, `<ul>`, `<ol>`, `<blockquote>`, `<img>` all have styling already.

## Editing the About page

`about.html` is plain HTML, not driven by the registry — edit it directly when your
CV, certs, or stats change. Sections: hero summary, stat boxes, experience timeline,
selected projects, certifications grid, skills meters, education.

## Customizing the look

Everything lives in `assets/css/main.css`. The top of the file (`:root`) has all the
colors, fonts, and spacing as CSS variables — change `--accent` to retheme the whole
site in one edit.

## Deploying to GitHub Pages

1. Push this repo to `<your-username>.github.io` (or any repo, with Pages enabled
   on the `main` branch / root).
2. In repo Settings → Pages, set source to "Deploy from a branch", branch `main`,
   folder `/ (root)`.
3. Done — no build step, it serves as-is.
