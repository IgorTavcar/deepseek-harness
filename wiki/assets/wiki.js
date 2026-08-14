const PAGES = [
  { href: "index.html", id: "index", group: "Map", title: "Thesis", seq: "0001" },
  { href: "loop.html", id: "loop", group: "Kernel", title: "The loop", seq: "0002" },
  { href: "plugins.html", id: "plugins", group: "Kernel", title: "Plugins", seq: "0003" },
  { href: "session.html", id: "session", group: "Kernel", title: "Session log", seq: "0004" },
  { href: "tools.html", id: "tools", group: "Kernel", title: "Tools & Code Mode", seq: "0005" },
  { href: "seams.html", id: "seams", group: "Kernel", title: "Capability seams", seq: "0006" },
  { href: "models.html", id: "models", group: "Aspects", title: "Target models", seq: "0007" },
  { href: "ideas.html", id: "ideas", group: "Aspects", title: "Surprising ideas", seq: "0008" },
  { href: "diamonds.html", id: "diamonds", group: "Aspects", title: "Diamonds in code", seq: "0009" },
  { href: "differentiators.html", id: "differentiators", group: "Aspects", title: "Differentiators", seq: "0010" },
  { href: "self.html", id: "self", group: "Aspects", title: "Self-modification", seq: "0011" },
  { href: "continuation.html", id: "continuation", group: "Aspects", title: "Continuation", seq: "0012" },
  { href: "atlas.html", id: "atlas", group: "Map", title: "Package atlas", seq: "0013" },
];

function currentPage() {
  const file = (location.pathname.split("/").pop() || "index.html") || "index.html";
  return PAGES.find((page) => page.href === file) ?? PAGES[0];
}

function renderRail() {
  const rail = document.querySelector("[data-rail]");
  if (!rail) return;
  const here = currentPage();
  const groups = [...new Set(PAGES.map((page) => page.group))];
  const nav = groups
    .map((group) => {
      const links = PAGES.filter((page) => page.group === group)
        .map((page) => {
          const current = page.id === here.id ? ' aria-current="page"' : "";
          return `<a href="${page.href}"${current}><span>${page.title}</span></a>`;
        })
        .join("");
      return `<div class="nav-group"><h2>${group}</h2>${links}</div>`;
    })
    .join("");

  rail.innerHTML = `
    <a class="brand" href="index.html">
      <small>DeepSeek Harness</small>
      <strong>Event ledger</strong>
      <em>wiki · static atlas</em>
    </a>
    <div class="rail-tools">
      <button class="menu-btn" type="button" data-menu>Pages</button>
      <button class="icon-btn" type="button" data-theme>Theme</button>
    </div>
    <nav class="nav" aria-label="Wiki pages">${nav}</nav>
    <div class="seq-chip">seq ${here.seq} · ${here.title}</div>
  `;

  rail.querySelector("[data-menu]")?.addEventListener("click", () => {
    rail.classList.toggle("is-open");
  });
  rail.querySelector("[data-theme]")?.addEventListener("click", toggleTheme);
}

function toggleTheme() {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  localStorage.setItem("dsh-wiki-theme", next);
}

function restoreTheme() {
  const stored = localStorage.getItem("dsh-wiki-theme");
  if (stored === "dark" || stored === "light") {
    document.documentElement.dataset.theme = stored;
    return;
  }
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.documentElement.dataset.theme = "dark";
  }
}

function renderFooter() {
  const host = document.querySelector("[data-next]");
  if (!host) return;
  const here = currentPage();
  const index = PAGES.findIndex((page) => page.id === here.id);
  const prev = PAGES[index - 1];
  const next = PAGES[index + 1];
  host.innerHTML = `
    ${prev ? `<a href="${prev.href}"><span>Previous</span>${prev.title}</a>` : "<span></span>"}
    ${next ? `<a href="${next.href}" style="text-align:right"><span>Next</span>${next.title}</a>` : "<span></span>"}
  `;
}

function watchTape() {
  const tape = document.querySelector("[data-tape]");
  if (!tape) return;
  const items = [...tape.querySelectorAll("[data-mark]")];
  const headings = items
    .map((item) => document.getElementById(item.dataset.mark || ""))
    .filter(Boolean);
  if (!headings.length) return;

  const setOn = (id) => {
    for (const item of items) item.classList.toggle("is-on", item.dataset.mark === id);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target.id) setOn(visible.target.id);
    },
    { rootMargin: "-20% 0px -55% 0px", threshold: [0.1, 0.4, 0.8] },
  );
  for (const heading of headings) observer.observe(heading);
}

function loopMachine() {
  const root = document.querySelector("[data-machine]");
  if (!root) return;
  const steps = [...root.querySelectorAll("[data-step]")];
  let index = 0;
  const paint = () => {
    steps.forEach((step, i) => step.classList.toggle("is-on", i === index));
    const status = root.querySelector("[data-status]");
    if (status) status.textContent = `${index + 1} / ${steps.length}`;
  };
  root.querySelector("[data-prev]")?.addEventListener("click", () => {
    index = (index + steps.length - 1) % steps.length;
    paint();
  });
  root.querySelector("[data-next-step]")?.addEventListener("click", () => {
    index = (index + 1) % steps.length;
    paint();
  });
  paint();
}

restoreTheme();
renderRail();
renderFooter();
watchTape();
loopMachine();
