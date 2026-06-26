/**
 * WRITEUPS REGISTRY
 * ------------------------------------------------------------
 * To publish a new writeup:
 *   1. Copy /templates/htb-template.html (or bugbounty-template.html)
 *   2. Write the content, save it into /htb/ or /bugbounty/ as its own file
 *   3. Add one object below describing it
 * That's it — home, htb.html, bugbounty.html and writeups.html
 * all read from this single array and rebuild their lists automatically.
 *
 * fields:
 *   id        - unique slug, matches the filename (no .html)
 *   title     - display title
 *   category  - "htb" | "bugbounty"
 *   summary   - 1-2 sentence teaser shown on cards
 *   tags      - array of strings, used by the filter bar
 *   difficulty- "easy" | "medium" | "hard" | "insane" | null (bug bounty can omit)
 *   date      - "YYYY-MM-DD"
 *   file      - path to the writeup html, relative to site root
 *   featured  - true to pin on the homepage
 */
const WRITEUPS = [
  {
    id: "union",
    title: "HTB: Union",
    category: "htb",
    summary: "A tricky union-based SQL injection leaks file reads, database credentials, and a command-injection bug in the X-Forwarded-For header leads to root.",
    tags: ["sqli", "command-injection", "waf-bypass", "sudo"],
    difficulty: "medium",
    date: "2026-05-12",
    file: "htb/union.html",
    featured: true
  },
  {
    id: "example-idor",
    title: "Bug Bounty: IDOR in Internal Billing API",
    category: "bugbounty",
    summary: "Sequential invoice IDs in a billing microservice allowed cross-tenant access to other customers' invoices and payment details.",
    tags: ["idor", "api", "broken-access-control"],
    difficulty: null,
    date: "2026-04-02",
    file: "bugbounty/example-idor.html",
    featured: true
  }
];

if (typeof module !== "undefined") module.exports = WRITEUPS;
