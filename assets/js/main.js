/* 06788.com — shared UI: nav, theme, consent, ads, forms, share, video, countdown, exit-intent */
(function () {
  var S = window.SITE || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
  function sstore(k, v) { try { if (v === undefined) return sessionStorage.getItem(k); sessionStorage.setItem(k, v); } catch (e) { return null; } }
  window.$u = { $: $, $$: $$, store: store };

  /* theme */
  var saved = store("theme"); if (saved) document.documentElement.setAttribute("data-theme", saved);
  $$("[data-theme-toggle]").forEach(function (b) {
    b.addEventListener("click", function () {
      var cur = document.documentElement.getAttribute("data-theme") ||
        (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      var nx = cur === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", nx); store("theme", nx);
    });
  });

  /* mobile nav */
  var nav = $(".nav"), mb = $(".menu-btn"), scrim = document.createElement("div");
  scrim.className = "scrim"; document.body.appendChild(scrim);
  function closeNav() { nav && nav.classList.remove("open"); scrim.classList.remove("show"); mb && mb.setAttribute("aria-expanded", "false"); }
  if (mb) mb.addEventListener("click", function () {
    var o = nav.classList.toggle("open"); scrim.classList.toggle("show", o); mb.setAttribute("aria-expanded", o ? "true" : "false");
  });
  scrim.addEventListener("click", closeNav);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") { closeNav(); $$(".modal.show").forEach(function (m) { m.classList.remove("show"); }); } });

  /* year + social */
  $$("[data-year]").forEach(function (e) { e.textContent = new Date().getFullYear(); });
  $$("[data-social]").forEach(function (a) { var u = (S.social || {})[a.getAttribute("data-social")]; if (u) { a.href = u; a.target = "_blank"; a.rel = "noopener"; } else a.parentNode && a.parentNode.removeChild(a); });
  $$("[data-yt-channel]").forEach(function (a) { if (S.youtubeChannel) a.href = S.youtubeChannel; });

  /* toast */
  var toastEl = document.createElement("div"); toastEl.className = "toast"; toastEl.setAttribute("role", "status"); document.body.appendChild(toastEl);
  window.toast = function (m) { toastEl.textContent = m; toastEl.classList.add("show"); clearTimeout(toastEl._t); toastEl._t = setTimeout(function () { toastEl.classList.remove("show"); }, 2600); };

  /* consent + AdSense */
  var consent = store("consent");
  function loadAds() {
    if (!S.adsenseClient) return;
    var s = document.createElement("script"); s.async = true; s.crossOrigin = "anonymous";
    s.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + S.adsenseClient;
    document.head.appendChild(s);
    if (consent !== "yes") { (window.adsbygoogle = window.adsbygoogle || []).requestNonPersonalizedAds = 1; }
    $$(".ad[data-slot]").forEach(function (box) {
      var slot = (S.adSlots || {})[box.getAttribute("data-slot")];
      if (!slot) return;
      box.className = "ad live"; box.innerHTML = '<ins class="adsbygoogle" style="display:block" data-ad-client="' + S.adsenseClient +
        '" data-ad-slot="' + slot + '" data-ad-format="auto" data-full-width-responsive="true"></ins>';
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    });
  }
  var cbox = $(".consent");
  if (cbox && !consent) cbox.classList.add("show");
  $$("[data-consent]").forEach(function (b) {
    b.addEventListener("click", function () { consent = b.getAttribute("data-consent"); store("consent", consent); cbox.classList.remove("show"); loadAds(); });
  });
  if (consent) loadAds();

  /* UTM capture */
  var qs = new URLSearchParams(location.search);
  ["utm_source", "utm_medium", "utm_campaign"].forEach(function (k) { if (qs.get(k)) sstore(k, qs.get(k)); });
  if (!sstore("landing")) sstore("landing", location.pathname + location.search);
  if (!sstore("ref") && document.referrer) sstore("ref", document.referrer);

  /* forms → relay (inbox never rendered) */
  window.sendForm = function (form, extra) {
    var msg = $(".form-msg", form), btn = $("button[type=submit]", form);
    if (form._honey && form._honey.value) return Promise.resolve(true);
    var data = {};
    new FormData(form).forEach(function (v, k) { if (k !== "_honey") data[k] = data[k] ? data[k] + ", " + v : v; });
    Object.assign(data, extra || {});
    data._subject = "[06788.com] " + (form.getAttribute("data-subject") || "Website enquiry");
    data._template = "table"; data._captcha = "false";
    data.page = location.href;
    ["utm_source", "utm_medium", "utm_campaign", "landing", "ref"].forEach(function (k) { var v = sstore(k); if (v) data["meta_" + k] = v; });
    if (btn) { btn.disabled = true; btn._t = btn.textContent; btn.textContent = "Sending…"; }
    if (msg) { msg.className = "form-msg"; msg.textContent = ""; }
    return fetch("https://formsubmit.co/ajax/" + window.__relay(), {
      method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data)
    }).then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { if (!r.ok) throw j; return j; }); })
      .then(function () {
        if (msg) { msg.className = "form-msg ok"; msg.textContent = form.getAttribute("data-ok") || "Thank you. Your message is in and we'll reply within 1–2 business days."; }
        form.reset(); form.dispatchEvent(new CustomEvent("sent")); return true;
      })
      .catch(function () {
        if (msg) { msg.className = "form-msg err"; msg.textContent = "The message didn't go through. Please try again, or use the Contact page."; }
        return false;
      })
      .finally(function () { if (btn) { btn.disabled = false; btn.textContent = btn._t; } });
  };
  $$("form.js-form").forEach(function (f) {
    f.addEventListener("submit", function (e) { e.preventDefault(); if (!f.reportValidity()) return; window.sendForm(f); });
  });

  /* share */
  window.shareText = function (text, url) {
    url = url || location.href;
    if (navigator.share) { navigator.share({ title: "06788", text: text, url: url }).catch(function () {}); return; }
    var t = text + " " + url;
    (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).then(function () { toast("Copied — paste it anywhere"); })
      .catch(function () { prompt("Copy this:", t); });
  };
  $$("[data-share]").forEach(function (b) { b.addEventListener("click", function () { shareText(b.getAttribute("data-share")); }); });

  /* lite YouTube */
  $$(".lyt[data-id]").forEach(function (el) {
    var id = el.getAttribute("data-id");
    el.style.backgroundImage = "url(https://i.ytimg.com/vi/" + id + "/hqdefault.jpg)";
    el.addEventListener("click", function () {
      el.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0" title="' + (el.getAttribute("aria-label") || "Video") +
        '" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
    }, { once: true });
  });

  /* reveal on scroll */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }); }, { threshold: .12 });
    $$(".reveal").forEach(function (e) { io.observe(e); });
  } else $$(".reveal").forEach(function (e) { e.classList.add("in"); });

  /* countdown */
  $$("[data-countdown]").forEach(function (el) {
    var end = new Date(el.getAttribute("data-countdown") || S.contestEnds).getTime();
    function tick() {
      var d = Math.max(0, end - Date.now()), u = [864e5, 36e5, 6e4, 1e3], lab = ["days", "hrs", "min", "sec"], out = "";
      u.forEach(function (x, i) { var v = Math.floor(d / x); d -= v * x; out += "<div><b>" + String(v).padStart(2, "0") + "</b><span>" + lab[i] + "</span></div>"; });
      el.innerHTML = out;
    }
    tick(); setInterval(tick, 1000);
  });

  /* modals */
  window.openModal = function (id) { var m = document.getElementById(id); if (m) { m.classList.add("show"); var i = $("input:not([type=hidden])", m); i && i.focus(); } };
  $$(".modal").forEach(function (m) {
    m.addEventListener("click", function (e) { if (e.target === m || e.target.closest(".x")) m.classList.remove("show"); });
  });
  $$("[data-open]").forEach(function (b) { b.addEventListener("click", function (e) { e.preventDefault(); openModal(b.getAttribute("data-open")); }); });

  /* FAQPage structured data from <details> blocks */
  var faqs = $$("main details").map(function (d) {
    var s = $("summary", d); if (!s) return null;
    var a = d.textContent.replace(s.textContent, "").replace(/\s+/g, " ").trim();
    return { "@type": "Question", name: s.textContent.trim(), acceptedAnswer: { "@type": "Answer", text: a } };
  }).filter(Boolean);
  if (faqs.length) { var ld = document.createElement("script"); ld.type = "application/ld+json"; ld.textContent = JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs }); document.head.appendChild(ld); }

  /* exit-intent (desktop, once per session, not on the desk page) */
  if (!/desk\.html/.test(location.pathname) && matchMedia("(pointer:fine)").matches) {
    document.addEventListener("mouseout", function h(e) {
      if (e.clientY < 8 && !e.relatedTarget && !sstore("exit")) { sstore("exit", "1"); openModal("exit-modal"); document.removeEventListener("mouseout", h); }
    });
  }
})();
