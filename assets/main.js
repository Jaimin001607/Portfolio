const $ = (s, el = document) => el.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- theme ---------- */
const store = {
  get: (k) => { try { return localStorage.getItem(k); } catch { return null; } },
  set: (k, v) => { try { localStorage.setItem(k, v); } catch {} },
};
const savedTheme = store.get("theme");
if (savedTheme) document.documentElement.dataset.theme = savedTheme;
$("#themeBtn")?.addEventListener("click", () => {
  const dark = document.documentElement.dataset.theme
    ? document.documentElement.dataset.theme === "dark"
    : matchMedia("(prefers-color-scheme: dark)").matches;
  const next = dark ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  store.set("theme", next);
});

/* ---------- mobile menu ---------- */
$("#menuBtn")?.addEventListener("click", () => $("#navLinks").classList.toggle("open"));
document.querySelectorAll("#navLinks a").forEach((a) => a.addEventListener("click", () => $("#navLinks").classList.remove("open")));

/* ---------- profile fields ---------- */
document.querySelectorAll("[data-name]").forEach((el) => (el.textContent = PROFILE.name));
document.querySelectorAll("[data-tagline]").forEach((el) => (el.textContent = PROFILE.tagline));
document.querySelectorAll("[data-school]").forEach((el) => (el.textContent = PROFILE.school));
document.querySelectorAll("[data-gpa]").forEach((el) => (el.textContent = PROFILE.gpa + " GPA"));
document.querySelectorAll("[data-resume]").forEach((el) => (el.href = PROFILE.resume));
document.querySelectorAll("[data-email]").forEach((el) => (el.href = "mailto:" + PROFILE.email));
document.querySelectorAll("[data-linkedin]").forEach((el) => (el.href = PROFILE.linkedin));

/* ---------- media helper ---------- */
function mediaHTML(m, alt = "") {
  if (m.video) return `<video src="${m.video}" poster="${m.poster || ""}" muted loop playsinline data-autoplay aria-label="${esc(alt)}"></video>`;
  return `<img src="${m.src}" alt="${esc(alt)}" loading="lazy" />`;
}

/* ---------- home page ---------- */
if ($("#stats")) {
  $("#stats").innerHTML = PROFILE.stats.map((s) => `<div class="stat"><b>${s.value}</b><span>${s.label}</span></div>`).join("");

  // project cards + filters
  const grid = $("#projectGrid");
  grid.innerHTML = PROJECTS.map((p) => `
    <a class="card reveal" href="project.html?id=${p.id}" data-cats="${esc(p.categories.join("|"))}">
      <div class="thumb${p.cover.fit === "contain" ? " contain" : ""}">${mediaHTML(p.cover, p.title)}
        <span class="badge mono">${esc(p.kind)}</span>${p.cover.video ? '<span class="play mono">▶ Video</span>' : ""}
      </div>
      <div class="body">
        <div class="meta mono">${esc(p.org)} · ${esc(p.dates)}</div>
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.summary)}</p>
        <div class="foot">
          <span class="kpi"><b>${esc(p.results[0].value)}</b><span>${esc(p.results[0].label)}</span></span>
          <span class="arrow">→</span>
        </div>
      </div>
    </a>`).join("");

  const chips = $("#chips");
  chips.innerHTML = CATEGORIES.map((c, i) => `<button class="chip" aria-pressed="${i === 0}">${c}</button>`).join("");
  chips.addEventListener("click", (e) => {
    const btn = e.target.closest(".chip");
    if (!btn) return;
    chips.querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-pressed", c === btn));
    const cat = btn.textContent;
    grid.querySelectorAll(".card").forEach((card) => {
      card.classList.toggle("hidden", cat !== "All" && !card.dataset.cats.split("|").includes(cat));
    });
  });

  // gallery
  $("#galleryGrid").innerHTML = GALLERY.map((g, i) => `
    <button class="${g.wide ? "wide" : ""} ${g.tall ? "tall" : ""} ${g.long ? "long" : ""}" data-i="${i}" aria-label="Enlarge: ${esc(g.caption)}">
      <img src="${g.src}" alt="${esc(g.caption)}" loading="lazy" /><span class="cap">${esc(g.caption)}</span>
    </button>`).join("");
  $("#galleryGrid").addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (b) openLightbox(+b.dataset.i);
  });

  // experience
  $("#timeline").innerHTML = EXPERIENCE.map((j) => `
    <div class="job reveal">
      <div class="when mono">${esc(j.dates)}</div>
      <div>
        <h3>${esc(j.role)}</h3>
        <div class="co">${esc(j.company)}</div>
        <ul>${j.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
        ${j.points.length > 1 ? '<button class="more">Read more</button>' : ""}
        <div class="tags">${j.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
      </div>
    </div>`).join("");
  $("#timeline").addEventListener("click", (e) => {
    const b = e.target.closest(".more");
    if (!b) return;
    const job = b.closest(".job");
    job.classList.toggle("open");
    b.textContent = job.classList.contains("open") ? "Show less" : "Read more";
  });

  // skills
  $("#skillGrid").innerHTML = SKILLS.map((s) => `
    <div class="skill reveal"><h3>${esc(s.group)}</h3><ul>${s.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul></div>`).join("");
}

/* ---------- lightbox ---------- */
let lbIndex = 0;
const lb = $("#lightbox");
function openLightbox(i) {
  lbIndex = (i + GALLERY.length) % GALLERY.length;
  const g = GALLERY[lbIndex];
  $("img", lb).src = g.src;
  $("img", lb).alt = g.caption;
  $("figcaption", lb).innerHTML = `${esc(g.caption)}<a href="project.html?id=${g.project}">View project →</a>`;
  lb.classList.add("open");
  $(".lb-close", lb).focus();
}
if (lb) {
  lb.addEventListener("click", (e) => {
    if (e.target === lb || e.target.closest(".lb-close")) lb.classList.remove("open");
    if (e.target.closest(".lb-prev")) openLightbox(lbIndex - 1);
    if (e.target.closest(".lb-next")) openLightbox(lbIndex + 1);
  });
  document.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") lb.classList.remove("open");
    if (e.key === "ArrowLeft") openLightbox(lbIndex - 1);
    if (e.key === "ArrowRight") openLightbox(lbIndex + 1);
  });
}

/* ---------- project page ---------- */
if ($("#project")) {
  const id = new URLSearchParams(location.search).get("id");
  const idx = Math.max(0, PROJECTS.findIndex((p) => p.id === id));
  const p = PROJECTS[idx];
  const next = PROJECTS[(idx + 1) % PROJECTS.length];
  document.title = `${p.title} · ${PROFILE.name}`;
  let fig = 0;
  $("#project").innerHTML = `
    <div class="wrap p-hero">
      <a class="back" href="index.html#work">← All projects</a>
      <div class="eyebrow mono">${esc(p.kind)} · ${esc(p.org)}</div>
      <h1>${esc(p.title)}</h1>
      <div class="p-meta mono"><span>${esc(p.dates)}</span><span>${p.tools.map(esc).join(" · ")}</span></div>
      <div class="figure p-cover">${mediaHTML(p.cover, p.title)}</div>
      <div class="p-facts">
        <div class="fact"><h3 class="mono">The problem</h3><p>${esc(p.problem)}</p></div>
        <div class="fact"><h3 class="mono">My role</h3><p>${esc(p.role)}</p></div>
        <div class="fact"><h3 class="mono">Results</h3>${p.results.map((r) => `<b>${esc(r.value)}</b><p style="margin-bottom:10px">${esc(r.label)}</p>`).join("")}</div>
      </div>
      ${p.sections.map((s, i) => `
        <div class="p-sec reveal">
          <div class="txt"><div class="mono muted">${String(i + 1).padStart(2, "0")}</div><h2>${esc(s.heading)}</h2><p>${esc(s.text)}</p></div>
          <div class="p-media">${s.media.map((m) => `
            <figure><div class="figure">${mediaHTML(m, m.caption)}</div>
            <figcaption><span class="mono">Fig. ${String(++fig).padStart(2, "0")}</span>${esc(m.caption)}</figcaption></figure>`).join("")}
          </div>
        </div>`).join("")}
      <div class="next-proj">
        <a class="btn" href="index.html#work">← All projects</a>
        <a class="btn primary" href="project.html?id=${next.id}">Next: ${esc(next.title)} →</a>
      </div>
    </div>`;
}

/* ---------- autoplay videos only while visible; reveal on scroll ---------- */
const vidObs = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (reducedMotion) return;
    en.isIntersecting ? en.target.play().catch(() => {}) : en.target.pause();
  });
}, { threshold: 0.25 });
document.querySelectorAll("video[data-autoplay]").forEach((v) => {
  if (reducedMotion) { v.removeAttribute("autoplay"); v.controls = true; v.pause(); }
  vidObs.observe(v);
});

function revealVisible() {
  document.querySelectorAll(".reveal:not(.in)").forEach((el) => {
    if (el.getBoundingClientRect().top < innerHeight * 0.95) el.classList.add("in");
  });
}
revealVisible();
addEventListener("scroll", revealVisible, { passive: true });
addEventListener("resize", revealVisible);
