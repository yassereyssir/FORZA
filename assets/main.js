/* Site behaviour: menu, catalogue, forms. Edit content in config.js and products.js. */
(function () {
  const S = window.SITE || {};
  const C = window.CATEGORIES || [];
  const P = (window.PRODUCTS || []).filter((p) => p && p.image); // only items with a photo
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const el = (tag, attrs = {}, text) => {
    const n = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => n.setAttribute(k, v));
    if (text != null) n.textContent = text;
    return n;
  };
  const qs = new URLSearchParams(location.search);
  const wa = (msg) => `https://wa.me/${S.whatsapp}?text=${encodeURIComponent(msg || "Hi, I have a question.")}`;
  const price = (p) => (p.priceFrom ? `From £${Number(p.priceFrom).toLocaleString("en-GB")}` : "Price on enquiry");
  const live = C.filter((c) => c.status === "live");
  const soon = C.filter((c) => c.status === "soon");

  /* Settings into the page */
  $$("[data-reply-time]").forEach((n) => (n.textContent = S.replyTime));
  $$("[data-lead-time]").forEach((n) => (n.textContent = S.leadTime));
  $$("[data-sourcing-time]").forEach((n) => (n.textContent = S.sourcingTime));
  $$("[data-whatsapp]").forEach((n) => (n.href = wa()));
  $$("[data-email]").forEach((n) => { n.href = `mailto:${S.email}`; if (!n.textContent.trim()) n.textContent = S.email; });

  /* Mobile menu */
  const toggle = $(".nav-toggle"), nav = $("#main-nav");
  if (toggle && nav) toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.textContent = open ? "Close" : "Menu";
  });

  /* Arch image with a plain fallback if the file isn't uploaded yet */
  function arch(src, alt, fallback) {
    const box = el("div", { class: "arch" });
    const empty = el("span", { class: "arch__empty" }, fallback || "");
    if (src) {
      const img = el("img", { src: `images/${src}`, alt: alt || "", loading: "lazy" });
      img.addEventListener("error", () => { img.remove(); box.appendChild(empty); });
      box.appendChild(img);
    } else box.appendChild(empty);
    return box;
  }
  $$("img[data-fallback]").forEach((img) => img.addEventListener("error", () => {
    const box = img.parentElement; img.remove();
    box.appendChild(el("span", { class: "arch__empty" }, img.dataset.fallback));
  }));

  /* Category rows (home + shop) */
  const rows = $("#category-rows");
  if (rows) {
    live.forEach((c) => {
      const row = el("article", { class: "row" });
      const text = el("div", { class: "stack" });
      const link = el("a", { href: `category.html?c=${encodeURIComponent(c.id)}`, class: "btn btn--line" }, `See ${c.name.toLowerCase()}`);
      text.append(el("h3", {}, c.name), el("p", { class: "measure" }, c.intro), el("p", { class: "row__price" }, c.priceBand));
      const btns = el("div", { class: "btn-row" }); btns.append(link); text.append(btns);
      row.append(arch(c.image, c.name, c.name), text);
      rows.appendChild(row);
    });
  }
  const extras = $("#category-extras");
  if (extras) {
    soon.forEach((c) => {
      const p = el("p", { class: "muted" });
      p.append(el("strong", {}, `Coming soon: ${c.name}. `), document.createTextNode(c.intro));
      extras.appendChild(p);
    });
    const ask = el("p", { class: "muted" });
    ask.append(el("strong", {}, "Looking for something else? "), document.createTextNode("We can often find a manufacturer who makes it. "));
    ask.append(el("a", { href: $("#request-form") ? "#request-form" : "commission.html" }, "Tell us what you need"));
    extras.appendChild(ask);
  }

  /* Item cards */
  function item(p) {
    const a = el("a", { class: "item", href: `product.html?id=${encodeURIComponent(p.id)}` });
    a.append(arch(p.image, p.name, p.name), el("h3", {}, p.name), el("p", {}, price(p)));
    return a;
  }
  function fillItems(grid, list, emptyText) {
    if (!grid) return;
    if (list.length) grid.replaceChildren(...list.map(item));
    else {
      const box = el("div", { class: "empty stack" });
      box.append(el("p", {}, emptyText), el("a", { class: "btn btn--main", href: "quote.html" }, "Make an enquiry"));
      grid.replaceWith(box);
    }
  }
  const liveIds = live.map((c) => c.id);
  fillItems($("#all-items"), P.filter((p) => liveIds.includes(p.category)),
    "We're photographing pieces at our manufacturers now. In the meantime, send us an enquiry about anything in the categories above.");

  /* Category page */
  const catPage = $("#category-page");
  if (catPage) {
    const c = live.find((x) => x.id === qs.get("c"));
    if (!c) {
      catPage.innerHTML = `<div class="stack"><h1>We couldn't find that category</h1><p class="lead">It may not be open yet. Have a look at what we make now, or tell us what you're after.</p><div class="btn-row"><a class="btn btn--main" href="shop.html">See what we make</a><a class="btn btn--line" href="commission.html">Ask us to find it</a></div></div>`;
    } else {
      document.title = `${c.name} | ${S.brand}`;
      $("#c-name").textContent = c.name;
      $("#c-intro").textContent = c.intro;
      $("#c-price").textContent = c.priceBand;
      $("#c-image").replaceWith(arch(c.image, c.name, c.name));
      $("#c-ask").href = `quote.html?category=${encodeURIComponent(c.name)}`;
      fillItems($("#c-items"), P.filter((p) => p.category === c.id),
        `We're photographing ${c.name.toLowerCase()} with our manufacturers now. Tell us what you have in mind and we'll send you options and a price.`);
    }
  }

  /* Product page */
  const prod = $("#product-page");
  if (prod) {
    const p = P.find((x) => x.id === qs.get("id"));
    const c = p && live.find((x) => x.id === p.category);
    if (!p || !c) {
      prod.innerHTML = `<div class="stack"><h1>We couldn't find that piece</h1><p class="lead">It may have sold out or been taken down. We can usually make something similar.</p><div class="btn-row"><a class="btn btn--main" href="shop.html">See what we make</a><a class="btn btn--line" href="quote.html">Make an enquiry</a></div></div>`;
    } else {
      document.title = `${p.name} | ${S.brand}`;
      const back = $("#p-back"); back.href = `category.html?c=${c.id}`; back.textContent = `Back to ${c.name.toLowerCase()}`;
      $("#p-name").textContent = p.name;
      $("#p-price").textContent = p.priceFrom ? `${price(p)}, including delivery and UK taxes` : price(p);
      $("#p-desc").textContent = p.description || "";
      $("#p-image").replaceWith(arch(p.image, p.name, p.name));
      const dl = $("#p-specs");
      Object.entries({ ...(p.specs || {}), "Made in": p.leadTime || S.leadTime }).forEach(([k, v]) => dl.append(el("dt", {}, k), el("dd", {}, v)));
      $("#p-ask").href = `quote.html?item=${encodeURIComponent(p.name)}&category=${encodeURIComponent(c.name)}`;
      $("#p-wa").href = wa(`Hi, I'd like a price for the ${p.name}.`);
    }
  }

  /* Forms (Formspree) */
  async function send(form, onDone, onFail) {
    if (S.formspreeId === "YOUR_FORM_ID") return onFail("This form isn't connected yet. Add your Formspree ID in assets/config.js.");
    try {
      const res = await fetch(`https://formspree.io/f/${S.formspreeId}`, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error();
      form.reset(); onDone();
    } catch { onFail("That didn't send. Check your connection and try again, or message us on WhatsApp."); }
  }

  $$(".signup").forEach((f) => f.addEventListener("submit", (e) => {
    e.preventDefault();
    const msg = $(".signup__msg", f);
    if (!f.checkValidity()) return f.reportValidity();
    send(f, () => (msg.textContent = "Thanks, you're on the list."), (t) => (msg.textContent = t));
  }));

  const req = $("#request-form");
  if (req) req.addEventListener("submit", (e) => {
    e.preventDefault();
    const msg = $(".request__msg", req);
    if (!req.checkValidity()) return req.reportValidity();
    send(req, () => (msg.textContent = `Thanks, we've got your request. We'll come back to you within ${S.sourcingTime}.`), (t) => (msg.textContent = t));
  });

  const form = $("#quote-form");
  if (form) {
    const cat = $("#q-category");
    live.forEach((c) => cat.insertBefore(el("option", {}, c.name), cat.lastElementChild));
    if (qs.get("category")) cat.value = qs.get("category");
    if (qs.get("item")) $("#q-item").value = qs.get("item");
    if (qs.get("type")) $("#q-type").value = qs.get("type");
    const status = $("#q-status");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) return form.reportValidity();
      const btn = $("button[type=submit]", form);
      btn.disabled = true; btn.textContent = "Sending...";
      const show = (cls, text) => { status.className = `status ${cls}`; status.textContent = text; status.hidden = false; status.focus(); btn.disabled = false; btn.textContent = "Send my enquiry"; };
      send(form, () => show("status--ok", `Thanks, we've got your enquiry. We'll reply within ${S.replyTime}. Check your spam folder if you don't hear from us.`), (t) => show("status--err", t));
    });
  }
})();
