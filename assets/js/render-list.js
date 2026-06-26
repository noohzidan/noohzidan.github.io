// renderWriteupList(opts)
// opts.category: "htb" | "bugbounty" | null (null = all)
// opts.gridSelector: css selector for the grid container
// opts.tagBarSelector: css selector for the tag filter bar (optional)
// opts.searchSelector: css selector for the search input (optional)
// opts.emptySelector: css selector for the "no results" message (optional)

function renderWriteupList(opts) {
  const grid = document.querySelector(opts.gridSelector);
  if (!grid) return;

  const all = WRITEUPS.filter(w => !opts.category || w.category === opts.category);

  // collect all tags for the filter bar
  const tagSet = new Set();
  all.forEach(w => w.tags.forEach(t => tagSet.add(t)));

  let activeTag = null;
  let query = "";

  const sevLabel = { easy: "Easy", medium: "Medium", hard: "Hard", insane: "Insane" };

  function card(w) {
    const diffChip = w.difficulty
      ? `<span class="chip chip-${w.difficulty}">${sevLabel[w.difficulty]}</span>`
      : `<span class="chip chip-info">Bug Bounty</span>`;
    const tagsHtml = w.tags.map(t => `<button class="tag tag-filter-pill" data-tag="${t}" type="button">${t}</button>`).join("");
    return `
      <a class="wcard" href="${w.file}">
        <div class="wcard-top">${diffChip}<span class="article-meta" style="border:none;padding:0;margin:0;font-size:0.72rem;">${formatDate(w.date)}</span></div>
        <h3 class="wcard-title">${w.title}</h3>
        <p class="wcard-summary">${w.summary}</p>
        <div class="wcard-tags">${tagsHtml}</div>
        <div class="wcard-meta"><span>${w.category === "htb" ? "Hack The Box" : "Bug Bounty"}</span><span>Read →</span></div>
      </a>`;
  }

  function formatDate(iso) {
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  }

  function renderTagBar() {
    if (!opts.tagBarSelector) return;
    const bar = document.querySelector(opts.tagBarSelector);
    if (!bar) return;
    const tags = Array.from(tagSet).sort();
    bar.innerHTML =
      `<button class="tag ${activeTag === null ? "is-active" : ""}" data-tag="" type="button">all</button>` +
      tags.map(t => `<button class="tag ${activeTag === t ? "is-active" : ""}" data-tag="${t}" type="button">${t}</button>`).join("");

    bar.querySelectorAll(".tag").forEach(btn => {
      btn.addEventListener("click", () => {
        const t = btn.getAttribute("data-tag");
        activeTag = t === "" ? null : t;
        renderTagBar();
        renderGrid();
      });
    });
  }

  function renderGrid() {
    let items = all;
    if (activeTag) items = items.filter(w => w.tags.includes(activeTag));
    if (query.trim()) {
      const q = query.toLowerCase();
      items = items.filter(w =>
        w.title.toLowerCase().includes(q) ||
        w.summary.toLowerCase().includes(q) ||
        w.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    items = items.slice().sort((a, b) => new Date(b.date) - new Date(a.date));

    if (items.length === 0) {
      grid.innerHTML = "";
      if (opts.emptySelector) {
        const empty = document.querySelector(opts.emptySelector);
        if (empty) empty.style.display = "block";
      }
      return;
    }
    if (opts.emptySelector) {
      const empty = document.querySelector(opts.emptySelector);
      if (empty) empty.style.display = "none";
    }
    grid.innerHTML = items.map(card).join("");

    // clicking a tag pill inside a card filters instead of navigating
    grid.querySelectorAll(".tag-filter-pill").forEach(pill => {
      pill.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        activeTag = pill.getAttribute("data-tag");
        renderTagBar();
        renderGrid();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
  }

  if (opts.searchSelector) {
    const search = document.querySelector(opts.searchSelector);
    if (search) {
      search.addEventListener("input", (e) => {
        query = e.target.value;
        renderGrid();
      });
    }
  }

  renderTagBar();
  renderGrid();
}
