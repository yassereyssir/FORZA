/* Shared behaviour: header/footer, nav, products, quote form. */
(function () {
  const S = window.SITE || {};
  const P = window.PRODUCTS || [];
  const C = window.CATEGORIES || [];
  const catById = (id) => C.find((c) => c.id === id);
  const page = document.body.dataset.page || "";
  const $ = (sel, root = document) => root.querySelector(sel);
  const el = (tag, attrs = {}, text) => {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
    if (text != null) n.textContent = text;
    return n;
  };
  const waLink = (msg) => `https://wa.me/${S.whatsapp}?text=${encodeURIComponent(msg || "Hi, I'd like a quote.")}`;
  const price = (p) => (p.priceFrom ? `From £${p.priceFrom.toLocaleString("en-GB")}` : "Quote on request");

  /* ---------- Brand text anywhere on the page ---------- */
  document.querySelectorAll("[data-brand]").forEach((n) => (n.textContent = S.brand));
  document.querySelectorAll("[data-reply-time]").forEach((n) => (n.textContent = S.replyTime));
  document.querySelectorAll("[data-lead-time]").forEach((n) => (n.textContent = S.leadTime));
  document.querySelectorAll("[data-sourcing-time]").forEach((n) => (n.textContent = S.sourcingTime));
  document.querySelectorAll("[data-whatsapp]").forEach((n) => n.setAttribute("href", waLink()));
  if (document.title.includes("[BRAND]")) document.title = document.title.replace("[BRAND]", S.brand);

  /* ---------- Header ---------- */
  const links = [
    ["shop", "shop.html", "Shop"],
    ["business", "business.html", "For businesses"],
    ["commission", "commission.html", "Commission and sourcing"],
    ["makers", "makers.html", "Our makers"],
    ["how", "how-it-works.html", "How it works"],
  ];
  const header = $("#site-header");
  if (header) {
    header.className = "site-header";
    header.innerHTML = `<div class="wrap">
      <a class="logo" href="index.html"></a>
      <button class="nav-toggle" aria-expanded="false" aria-controls="main-nav">Menu</button>
      <nav class="nav" id="main-nav" aria-label="Main"></nav></div>`;
    $(".logo", header).textContent = S.brand;
    const nav = $("#main-nav", header);
    links.forEach(([key, href, label]) => {
      const a = el("a", { href }, label);
      if (key === page) a.setAttribute("aria-current", "page");
      nav.appendChild(a);
    });
    nav.appendChild(el("a", { href: "quote.html", class: "btn btn--dark" }, "Get a quote"));
    const toggle = $(".nav-toggle", header);
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  /* ---------- Footer ---------- */
  const footer = $("#site-footer");
  if (footer) {
    footer.className = "site-footer";
    footer.innerHTML = `<div class="wrap">
      <div style="max-width:360px"><a class="logo" href="index.html"></a><small class="tag"></small><small class="copy"></small></div>
      <nav aria-label="Footer">
        <a href="shop.html">Shop</a><a href="makers.html">Our makers</a><a href="faq.html">FAQ</a><a href="legal.html#terms">Terms</a><a href="legal.html#privacy">Privacy</a>
        <a href="legal.html#delivery">Delivery and returns</a><a href="quote.html">Contact</a><a class="wa">WhatsApp</a>
      </nav></div>`;
    $(".logo", footer).textContent = S.brand;
    $(".tag", footer).textContent = S.tagline;
    $(".copy", footer).textContent = `© ${new Date().getFullYear()} ${S.brand}`;
    $(".wa", footer).href = waLink();
  }

  /* ---------- Category tiles ---------- */
  function tile(c) {
    const live = c.status === "live";
    const a = el(live ? "a" : "div", { class: "product-card" + (live ? "" : " is-soon") });
    if (live) a.setAttribute("href", `category.html?c=${encodeURIComponent(c.id)}`);
    const box = el("div", { class: "product-card__img" + (c.image ? "" : " ph") });
    if (c.image) box.appendChild(el("img", { src: `images/${c.image}`, alt: c.name, loading: "lazy" }));
    else box.textContent = live ? "Photo coming soon" : "Coming soon";
    a.append(box, el("h3", {}, live ? c.name : `Coming soon: ${c.name}`), el("p", { class: "product-card__meta" }, live ? c.priceBand : c.intro));
    return a;
  }
  function askTile() {
    const a = el("a", { class: "product-card", href: "commission.html" });
    const box = el("div", { class: "product-card__img ph ph--ask" }, "Can't find it? Tell us what you're looking for");
    a.append(box, el("h3", {}, "Something else"), el("p", { class: "product-card__meta" }, "We'll look for a maker in Egypt"));
    return a;
  }
  const tiles = $("#category-grid");
  if (tiles) {
    const live = C.filter((c) => c.status === "live");
    const soon = C.filter((c) => c.status === "soon");
    const limit = Number(tiles.dataset.limit) || live.length;
    tiles.replaceChildren(...live.slice(0, limit).map(tile), ...soon.slice(0, 1).map(tile), askTile());
  }

  /* ---------- Product cards ---------- */
  function card(p) {
    const a = el("a", { class: "product-card", href: `product.html?id=${encodeURIComponent(p.id)}` });
    const box = el("div", { class: "product-card__img" + (p.image ? "" : " ph") });
    if (p.image) box.appendChild(el("img", { src: `images/${p.image}`, alt: p.name, loading: "lazy" }));
    else box.textContent = "Photo coming soon";
    const meta = Object.values(p.specs || {}).slice(0, 2).join(" · ");
    a.append(box, el("h3", {}, p.name), el("p", { class: "product-card__meta" }, meta), el("p", { class: "product-card__price" }, price(p)));
    return a;
  }

  /* ---------- Shop page: filters across all live categories ---------- */
  const grid = $("#product-grid");
  const filters = $("#filters");
  if (grid) {
    const liveIds = C.filter((c) => c.status === "live").map((c) => c.id);
    const fixed = grid.dataset.category;
    const render = (cat) => {
      const items = P.filter((p) => liveIds.includes(p.category) && (!cat || cat === "all" || p.category === cat));
      grid.replaceChildren(...items.map(card));
      if (!items.length) grid.appendChild(el("p", {}, "Nothing listed here yet. Ask us for a custom piece instead."));
    };
    if (filters && !fixed) {
      const mk = (id, label, on) => {
        const b = el("button", { type: "button", "aria-pressed": String(on) }, label);
        b.addEventListener("click", () => {
          filters.querySelectorAll("button").forEach((x) => x.setAttribute("aria-pressed", "false"));
          b.setAttribute("aria-pressed", "true");
          render(id);
        });
        return b;
      };
      filters.append(mk("all", "All", true), ...C.filter((c) => c.status === "live").map((c) => mk(c.id, c.name, false)));
    }
    render(fixed || "all");
  }

  /* ---------- Category page ---------- */
  const catPage = $("#category-page");
  if (catPage) {
    const c = catById(new URLSearchParams(location.search).get("c"));
    if (!c || c.status !== "live") {
      catPage.innerHTML = `<div class="stack"><h1>Category not found</h1><p class="lead">It may not be live yet. Browse the shop, or ask us to source it.</p><div class="btn-row"><a class="btn btn--primary" href="shop.html">Browse the shop</a></div></div>`;
    } else {
      document.title = `${c.name} | ${S.brand}`;
      $("#c-name").textContent = c.name;
      $("#c-intro").textContent = c.intro;
      $("#c-band").textContent = c.priceBand ? `${c.priceBand}, all-in UK delivery` : "";
      $("#c-maker").textContent = c.maker ? `Made by ${c.maker.charAt(0).toLowerCase() + c.maker.slice(1)}.` : "";
      $("#product-grid").dataset.category = c.id;
      const items = P.filter((p) => p.category === c.id);
      $("#product-grid").replaceChildren(...items.map(card));
      $("#c-custom").href = `quote.html?type=${encodeURIComponent("A custom version")}&category=${encodeURIComponent(c.name)}`;
    }
  }

  /* ---------- Product page ---------- */
  const detail = $("#product-detail");
  if (detail) {
    const p = P.find((x) => x.id === new URLSearchParams(location.search).get("id"));
    const c = p && catById(p.category);
    if (!p || !c || c.status !== "live") {
      detail.innerHTML = `<div class="stack"><h1>Item not found</h1><p class="lead">It may have been removed. Browse the shop or ask us for a custom version.</p><div class="btn-row"><a class="btn btn--primary" href="shop.html">Browse the shop</a></div></div>`;
    } else {
      document.title = `${p.name} | ${S.brand}`;
      const back = $("#p-back"); back.href = `category.html?c=${encodeURIComponent(c.id)}`; back.textContent = `Back to ${c.name}`;
      $("#p-name").textContent = p.name;
      $("#p-price").textContent = `${price(p)}${p.priceFrom ? ", all-in UK delivery" : ""}`;
      $("#p-desc").textContent = p.description;
      const dl = $("#p-specs");
      Object.entries({ ...(p.specs || {}), "Lead time": `Made to order in ${p.leadTime}` }).forEach(([k, v]) => dl.append(el("dt", {}, k), el("dd", {}, v)));
      const img = $("#p-img");
      if (p.image) { img.classList.remove("ph"); img.textContent = ""; img.appendChild(el("img", { src: `images/${p.image}`, alt: p.name })); }
      $("#p-quote").href = `quote.html?piece=${encodeURIComponent(p.name)}&category=${encodeURIComponent(c.name)}`;
      $("#p-wa").href = waLink(`Hi, I'd like a quote for the ${p.name}.`);
    }
  }

  /* ---------- New arrivals signup ---------- */
  document.querySelectorAll(".signup").forEach((f) => {
    f.action = `https://formspree.io/f/${S.formspreeId}`;
    f.addEventListener("submit", async (e) => {
      e.preventDefault();
      const msg = $(".signup__msg", f);
      if (!f.checkValidity()) { f.reportValidity(); return; }
      if (S.formspreeId === "YOUR_FORM_ID") { msg.textContent = "Signup isn't connected yet. Add your Formspree ID in assets/config.js."; return; }
      try {
        const res = await fetch(f.action, { method: "POST", body: new FormData(f), headers: { Accept: "application/json" } });
        if (!res.ok) throw new Error();
        f.reset(); msg.textContent = "You're on the list. We'll email you when new makers and categories go live.";
      } catch { msg.textContent = "That didn't go through. Check your connection and try again."; }
    });
  });

  /* ---------- Quote form ---------- */
  const form = $("#quote-form");
  if (form) {
    form.action = `https://formspree.io/f/${S.formspreeId}`;
    const catSel = $("#q-category");
    C.filter((c) => c.status === "live").forEach((c) => catSel.insertBefore(el("option", {}, c.name), catSel.lastElementChild));
    const params = new URLSearchParams(location.search);
    if (params.get("piece")) { $("#q-piece").value = params.get("piece"); $("#q-type").value = "An item from the shop"; }
    if (params.get("type")) $("#q-type").value = params.get("type");
    if (params.get("category")) catSel.value = params.get("category");

    const status = $("#form-status");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      status.hidden = true;
      if (!form.checkValidity()) { form.reportValidity(); return; }
      if (S.formspreeId === "YOUR_FORM_ID") {
        status.className = "form-status form-status--err";
        status.textContent = "The form isn't connected yet. Add your Formspree ID in assets/config.js.";
        status.hidden = false; return;
      }
      const btn = $("button[type=submit]", form);
      btn.disabled = true; btn.textContent = "Sending...";
      try {
        const res = await fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
        if (!res.ok) throw new Error();
        form.reset();
        status.className = "form-status form-status--ok";
        status.textContent = `Request sent. We'll reply within ${S.replyTime} with an all-in UK price, or within ${S.sourcingTime} for sourcing requests. Check your spam folder if you don't see us.`;
      } catch {
        status.className = "form-status form-status--err";
        status.textContent = "Your request didn't send. Check your connection and try again, or message us on WhatsApp.";
      }
      status.hidden = false;
      btn.disabled = false; btn.textContent = "Send my request";
      status.focus();
    });
  }
})();
