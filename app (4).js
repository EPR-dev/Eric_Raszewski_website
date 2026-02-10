(function () {
  const S = window.SITE;

  // Simple mobile menu
  const burger = document.querySelector(".hamburger");
  const nav = document.querySelector(".nav");
  let mobileOpen = false;
  let mobilePanel = null;

  function openMobile() {
    if (mobilePanel) return;
    mobilePanel = document.createElement("div");
    mobilePanel.style.position = "absolute";
    mobilePanel.style.top = "64px";
    mobilePanel.style.left = "0";
    mobilePanel.style.right = "0";
    mobilePanel.style.borderBottom = "1px solid rgba(255,255,255,.10)";
    mobilePanel.style.background = "rgba(7,10,15,.95)";
    mobilePanel.style.backdropFilter = "blur(12px)";
    mobilePanel.style.padding = "12px 20px";
    mobilePanel.style.display = "flex";
    mobilePanel.style.flexWrap = "wrap";
    mobilePanel.style.gap = "10px";

    [...nav.querySelectorAll("a")].forEach(a => {
      const b = a.cloneNode(true);
      b.style.padding = "10px 12px";
      b.style.border = "1px solid rgba(255,255,255,.10)";
      b.style.borderRadius = "12px";
      b.style.background = "rgba(255,255,255,.03)";
      mobilePanel.appendChild(b);
    });

    document.querySelector(".topbar").appendChild(mobilePanel);
  }

  function closeMobile() {
    if (mobilePanel) mobilePanel.remove();
    mobilePanel = null;
  }

  burger?.addEventListener("click", () => {
    mobileOpen = !mobileOpen;
    burger.setAttribute("aria-expanded", String(mobileOpen));
    mobileOpen ? openMobile() : closeMobile();
  });

  // Basics
  const b = S.basics;
  document.getElementById("brandName").textContent = b.name.split(",")[0] || "Eric";
  document.getElementById("kicker").textContent = b.kicker;
  document.getElementById("headline").textContent = b.headline;
  document.getElementById("summary").textContent = b.summary;
  document.getElementById("name").textContent = b.name;
  document.getElementById("tagline").textContent = `${b.tagline} • ${b.locationLine}`;

  // Links
  const L = b.links;
  const setHref = (id, href) => { const el = document.getElementById(id); if (el) el.href = href; };

  setHref("btnLinkedIn", L.linkedin);
  setHref("miniLinkedIn", L.linkedin);
  setHref("footerLinkedIn", L.linkedin);
  setHref("contactLinkedIn", L.linkedin);

  setHref("btnEmail", L.email);
  setHref("miniEmail", L.email);
  setHref("contactEmail", L.email);
  setHref("footerEmail", L.email);

  setHref("btnResume", L.resumePdf);
  setHref("footerResume", L.resumePdf);

  setHref("miniSite", L.site);
  setHref("footerSite", L.site);

  // Stats
  const stats = document.getElementById("stats");
  S.stats.forEach(item => {
    const wrap = document.createElement("div");
    wrap.className = "stat";
    const dt = document.createElement("dt");
    dt.textContent = item.label;
    const dd = document.createElement("dd");
    dd.textContent = item.value;
    wrap.appendChild(dt);
    wrap.appendChild(dd);
    stats.appendChild(wrap);
  });

  // Availability chips
  const chips = document.getElementById("availability");
  (S.availabilityChips || []).forEach(t => {
    const s = document.createElement("span");
    s.className = "chip";
    s.textContent = t;
    chips.appendChild(s);
  });

  // Highlights
  const hl = document.getElementById("highlights");
  (S.highlights || []).forEach(t => {
    const li = document.createElement("li");
    li.textContent = t;
    hl.appendChild(li);
  });

  // Experience
  document.getElementById("experienceIntro").textContent = S.experienceIntro || "";
  const exp = document.getElementById("experienceList");
  (S.experience || []).forEach(r => {
    const card = document.createElement("article");
    card.className = "role";

    const top = document.createElement("div");
    top.className = "role__top";

    const left = document.createElement("div");
    const title = document.createElement("div");
    title.className = "role__title";
    title.textContent = r.title;

    const company = document.createElement("div");
    company.className = "role__company";
    company.textContent = r.company;

    left.appendChild(title);
    left.appendChild(company);

    const right = document.createElement("div");
    right.className = "role__meta";
    const meta = [r.dates, r.location].filter(Boolean).join(" • ");
    right.textContent = meta;

    top.appendChild(left);
    top.appendChild(right);

    const ul = document.createElement("ul");
    ul.className = "role__bullets";
    (r.bullets || []).forEach(b => {
      const li = document.createElement("li");
      li.textContent = b;
      ul.appendChild(li);
    });

    const badges = document.createElement("div");
    badges.className = "badges";
    (r.badges || []).forEach(x => {
      const s = document.createElement("span");
      s.className = "badge";
      s.textContent = x;
      badges.appendChild(s);
    });

    card.appendChild(top);
    if ((r.bullets || []).length) card.appendChild(ul);
    if ((r.badges || []).length) card.appendChild(badges);

    exp.appendChild(card);
  });

  // Projects
  function renderCards(list, mountId) {
    const mount = document.getElementById(mountId);
    (list || []).forEach(p => {
      const a = document.createElement("a");
      a.className = "card";
      a.href = p.linkUrl;
      a.rel = "noopener";
      if (!String(p.linkUrl || "").startsWith("#")) a.target = "_blank";

      const h = document.createElement("h3");
      h.textContent = p.name;

      const b = document.createElement("p");
      b.textContent = p.blurb;

      const meta = document.createElement("div");
      meta.className = "card__meta";

      const left = document.createElement("span");
      left.textContent = p.metaLeft;

      const right = document.createElement("span");
      right.textContent = p.metaRight;

      meta.appendChild(left);
      meta.appendChild(right);

      const link = document.createElement("div");
      link.className = "card__link";
      link.textContent = p.linkText;

      a.appendChild(h);
      a.appendChild(b);
      a.appendChild(meta);
      a.appendChild(link);

      mount.appendChild(a);
    });
  }
  renderCards(S.projects, "projectGrid");

  // Skills
  const skills = document.getElementById("skillsGrid");
  (S.skills || []).forEach(g => {
    const box = document.createElement("div");
    box.className = "skill";

    const h = document.createElement("h3");
    h.textContent = g.group;

    const tags = document.createElement("div");
    tags.className = "tags";
    (g.tags || []).forEach(t => {
      const s = document.createElement("span");
      s.className = "tag";
      s.textContent = t;
      tags.appendChild(s);
    });

    box.appendChild(h);
    box.appendChild(tags);
    skills.appendChild(box);
  });



  // Testimonials
  if (S.testimonials && document.getElementById("testimonialGrid")){
    const grid = document.getElementById("testimonialGrid");
    S.testimonials.forEach(t => {
      const card = document.createElement("div");
      card.className = "card tcard";

      const mark = document.createElement("div");
      mark.className = "tmark";
      mark.textContent = "“";

      const q = document.createElement("p");
      q.className = "tquote";
      q.textContent = t.quote || "";

      const meta = document.createElement("div");
      meta.className = "tmeta";

      const name = document.createElement("div");
      name.className = "tname";
      name.textContent = t.name || "";

      const role = document.createElement("div");
      role.className = "trole";
      role.textContent = t.title || "";

      meta.appendChild(name);
      meta.appendChild(role);

      const rel = document.createElement("div");
      rel.className = "trel";

      const dot = document.createElement("span");
      dot.className = "dot";
      const relText = document.createElement("span");
      relText.textContent = t.relationship || "";

      rel.appendChild(dot);
      rel.appendChild(relText);

      card.appendChild(mark);
      card.appendChild(q);
      card.appendChild(meta);
      if (t.relationship) card.appendChild(rel);

      grid.appendChild(card);
    });
  }


  // Personal
  if (S.personal){
    const ph = document.getElementById("personalHeadline");
    const pb = document.getElementById("personalBlurb");
    const pt = document.getElementById("personalTags");
    const pbad = document.getElementById("personalBadges");
    const pg = document.getElementById("personalGallery");

    if (ph) ph.textContent = S.personal.headline || "";
    if (pb) pb.textContent = S.personal.blurb || "";

    (S.personal.tags || []).forEach(t => {
      const s = document.createElement("span");
      s.className = "tag";
      s.textContent = t;
      pt?.appendChild(s);
    });

    (S.personal.badges || []).forEach(x => {
      const s = document.createElement("span");
      s.className = "badge badge--alt";
      s.textContent = x;
      pbad?.appendChild(s);
    });

    const lb = document.getElementById("lightbox");
    const lbImg = document.getElementById("lightboxImg");
    const lbClose = document.getElementById("lightboxClose");

    function openLightbox(src, alt){
      if (!lb || !lbImg) return;
      lbImg.src = src;
      lbImg.alt = alt;
      lb.classList.add("is-open");
      lb.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
    function closeLightbox(){
      if (!lb || !lbImg) return;
      lb.classList.remove("is-open");
      lb.setAttribute("aria-hidden", "true");
      lbImg.src = "";
      document.body.style.overflow = "";
    }

    (S.personal.photos || []).forEach((p, idx) => {
      const btn = document.createElement("button");
      btn.className = "thumb";
      btn.type = "button";
      btn.setAttribute("aria-label", p.alt || ("Photo " + (idx+1)));

      const img = document.createElement("img");
      img.src = p.src;
      img.alt = p.alt || "";
      img.loading = "lazy";

      btn.appendChild(img);
      pg?.appendChild(btn);
      btn.addEventListener("click", () => openLightbox(p.src, p.alt || "Photo"));
    });

    lbClose?.addEventListener("click", closeLightbox);
    lb?.addEventListener("click", (e) => { if (e.target === lb) closeLightbox(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLightbox(); });
  }


  // Education
  const edu = document.getElementById("educationList");
  (S.education || []).forEach(e => {
    const item = document.createElement("div");
    item.className = "eduItem";

    const top = document.createElement("div");
    top.className = "eduTop";

    const name = document.createElement("div");
    name.className = "eduName";
    name.textContent = e.school;

    const meta = document.createElement("div");
    meta.className = "eduMeta";
    meta.textContent = e.dates;

    top.appendChild(name);
    top.appendChild(meta);

    const detail = document.createElement("div");
    detail.className = "eduDetail";
    detail.textContent = e.detail;

    item.appendChild(top);
    item.appendChild(detail);
    edu.appendChild(item);
  });

  // Contact
  document.getElementById("contactTitle").textContent = S.contact?.title || "Contact";
  document.getElementById("contactBlurb").textContent = S.contact?.blurb || "";

  // Footer
  document.getElementById("footerName").textContent = b.name;
  document.getElementById("footerLine").textContent = S.footerLine || "";

})();