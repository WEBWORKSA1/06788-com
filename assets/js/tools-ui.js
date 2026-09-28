/* 06788.com — tool UIs. Each block runs only if its root element exists on the page. */
(function () {
  var L = window.L88, Z = window.ZODIAC, D = window.DIGITS, C = window.COMBOS;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var qs = new URLSearchParams(location.search);
  var store = (window.$u || {}).store || function () {};

  function gauge(score) {
    var r = 70, c = 2 * Math.PI * r, off = c * (1 - score / 100);
    var col = score >= 70 ? "var(--gold)" : score >= 45 ? "#D97706" : "var(--red)";
    return '<div class="gauge"><svg width="170" height="170" viewBox="0 0 170 170" aria-hidden="true"><circle cx="85" cy="85" r="' + r + '" fill="none" stroke="var(--surface-2)" stroke-width="14"/>' +
      '<circle cx="85" cy="85" r="' + r + '" fill="none" stroke="' + col + '" stroke-width="14" stroke-linecap="round" stroke-dasharray="' + c + '" stroke-dashoffset="' + c + '"><animate attributeName="stroke-dashoffset" from="' + c + '" to="' + off + '" dur="0.9s" fill="freeze"/></circle></svg>' +
      '<div class="val"><div><b class="num">' + score + '</b><span>/ 99 Prosperity</span></div></div></div>';
  }

  /* ---------- Lucky Number Analyzer ---------- */
  var an = $("#analyzer");
  if (an) {
    var out = $("#an-result"), last = null;
    $$(".chip[data-type]", an).forEach(function (c) {
      c.addEventListener("click", function () {
        $$(".chip[data-type]", an).forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
        c.setAttribute("aria-pressed", "true"); an.setAttribute("data-kind", c.getAttribute("data-type"));
        $("#an-num").placeholder = c.getAttribute("data-ph"); $("#an-num").focus();
      });
    });
    function run(e) {
      if (e) e.preventDefault();
      var v = $("#an-num").value, y = +($("#an-year") ? $("#an-year").value : 0);
      var r = L.analyze(v, y);
      if (!r) { $("#an-num").focus(); window.toast && toast("Enter at least one digit"); return; }
      last = r; store("lastNumber", r.n); if (y) store("birthYear", y);
      var kind = an.getAttribute("data-kind") || "number";
      var badge = r.score >= 70 ? "b-good" : r.score >= 45 ? "b-warn" : "b-bad";
      var h = '<div class="scorebox">' + gauge(r.score) + '<div><span class="badge ' + badge + '">' + esc(r.verdict) + '</span> <span class="badge b-gold">Grade ' + r.grade + '</span> <span class="badge b-gold">' + r.tier + ' tier</span>' +
        '<h3 style="margin:10px 0 4px" class="num">' + esc(r.n.replace(/(\d{4})(?=\d)/g, "$1 ")) + '</h3><p class="hint mb0">Your ' + esc(kind) + ': ' + r.n.length + ' digits · ' + r.eights + '× “8” (发) · ' + r.fours + '× “4” (死)</p></div></div>';
      h += '<div class="dgrid" aria-label="Digit breakdown">' + r.digits.map(function (x) {
        var t = x.info.tone; return '<div class="dcell ' + t + '" title="' + esc(x.info.sound) + '"><b>' + x.d + '</b><small>' + x.info.cn + ' ' + x.info.py + '</small></div>';
      }).join("") + '</div>';
      if (r.combos.length) h += '<h4>Meaningful combinations</h4><ul class="list">' + r.combos.map(function (c) { return '<li><b class="num">' + c.code + '</b> ' + esc(c.reading) + ' — ' + esc(c.meaning) + ' <span class="badge ' + (c.bonus >= 0 ? "b-good" : "b-bad") + '">' + (c.bonus >= 0 ? "lucky" : "avoid") + '</span></li>'; }).join("") + '</ul>';
      if (r.patterns.length) h += '<h4>Collector patterns</h4><ul class="list">' + r.patterns.map(function (p) { return '<li>' + esc(p.label) + '</li>'; }).join("") + '</ul>';
      if (r.zodiac) h += '<div class="callout"><b>' + r.zodiac.animal.e + ' ' + r.zodiac.animal.n + ' match: ' + r.zodiac.pct + '%</b>. ' + r.zodiac.hits + ' of your digits are traditional lucky numbers for the ' + r.zodiac.animal.n + ' (' + r.zodiac.animal.lucky.join(", ") + ').</div>';
      var tip = r.fours ? "Tip: each “4” costs points. If you can, choose a number without 4, or pair it with 1314/3344 so it reads positively." :
        r.score >= 85 ? "This number has real market appeal. Collectors and businesses pay premiums for strings like this." :
          "Tip: ending on 8, or adding pairs like 68, 88 or 168, lifts a score fast.";
      h += '<p class="hint">' + tip + '</p>';
      h += '<div class="btns mt"><button class="btn btn-gold btn-sm" type="button" id="an-share">Share score</button><button class="btn btn-ghost btn-sm" type="button" id="an-card">Download share card</button>' +
        '<button class="btn btn-ghost btn-sm" type="button" id="an-email">Email me the full report</button><a class="btn btn-red btn-sm" href="desk.html?intent=value&n=' + r.n + '">Value / sell this number →</a></div>';
      h += '<div class="ad" data-slot="afterTool">Advertisement</div>';
      out.innerHTML = h; out.classList.add("show");
      $("#an-share").onclick = function () { shareText("My " + kind + " " + r.n + " scored " + r.score + "/99 (" + r.verdict + ") on the 06788 Lucky Number Analyzer. Check yours:"); };
      $("#an-card").onclick = function () { card(r, kind); };
      $("#an-email").onclick = function () { var f = $("#report-form"); if (f) { f.number.value = r.n; f.score.value = r.score + "/99 " + r.grade; } openModal("report-modal"); };
      if (history.replaceState) history.replaceState(null, "", location.pathname + "?n=" + r.n + (y ? "&y=" + y : "") + location.hash);
    }
    an.addEventListener("submit", run);
    var pre = qs.get("n") || "";
    if (qs.get("y") && $("#an-year")) $("#an-year").value = qs.get("y");
    else if ($("#an-year") && store("birthYear")) $("#an-year").value = store("birthYear");
    if (pre) { $("#an-num").value = pre; run(); }
    $$("[data-try]").forEach(function (b) { b.addEventListener("click", function () { $("#an-num").value = b.getAttribute("data-try"); run(); an.scrollIntoView({ behavior: "smooth", block: "start" }); }); });
  }

  function card(r, kind) {
    var cv = document.createElement("canvas"); cv.width = 1080; cv.height = 1080; var x = cv.getContext("2d");
    var g = x.createLinearGradient(0, 0, 1080, 1080); g.addColorStop(0, "#B8141F"); g.addColorStop(1, "#6E0A12"); x.fillStyle = g; x.fillRect(0, 0, 1080, 1080);
    x.strokeStyle = "#D4A017"; x.lineWidth = 10; x.strokeRect(40, 40, 1000, 1000); x.lineWidth = 3; x.strokeRect(62, 62, 956, 956);
    x.fillStyle = "rgba(255,231,163,.08)"; x.font = "bold 620px serif"; x.textAlign = "center"; x.fillText("发", 540, 780);
    x.fillStyle = "#FFE7A3"; x.font = "600 44px sans-serif"; x.fillText("LUCKY NUMBER SCORE", 540, 190);
    x.fillStyle = "#fff"; x.font = "bold 96px sans-serif"; x.fillText(r.n.length > 12 ? r.n.slice(0, 12) + "…" : r.n, 540, 330);
    x.fillStyle = "#D4A017"; x.font = "bold 300px serif"; x.fillText(r.score, 540, 640);
    x.fillStyle = "#fff"; x.font = "600 52px sans-serif"; x.fillText(r.verdict + " · Grade " + r.grade, 540, 750);
    x.fillStyle = "#FFE7A3"; x.font = "500 40px sans-serif"; x.fillText(r.tier + " tier " + kind, 540, 820);
    x.fillStyle = "#fff"; x.font = "bold 46px sans-serif"; x.fillText("Score yours free at 06788.com", 540, 960);
    var a = document.createElement("a"); a.download = "06788-lucky-" + r.n + ".png"; a.href = cv.toDataURL("image/png"); a.click();
  }

  /* report modal form (lead capture from analyzer) */
  var rf = $("#report-form");
  if (rf) rf.addEventListener("sent", function () { setTimeout(function () { $("#report-modal").classList.remove("show"); }, 2200); });

  /* ---------- Number dictionary ---------- */
  var dict = $("#dict");
  if (dict) {
    var grid = $("#digit-grid"), tb = $("#combo-body"), inp = $("#dict-q"), det = $("#dict-detail");
    grid.innerHTML = Object.keys(D).map(function (k) {
      var d = D[k], b = d.tone === "good" ? "b-good" : d.tone === "bad" ? "b-bad" : "b-warn";
      return '<article class="card" id="n' + k + '"><div style="display:flex;justify-content:space-between;align-items:center"><b style="font:800 2.6rem/1 var(--serif);color:var(--red)">' + k + '</b><span class="badge ' + b + '">' + (d.tone === "good" ? "Lucky" : d.tone === "bad" ? "Unlucky" : "Neutral") + '</span></div>' +
        '<h3 style="margin:8px 0 2px">' + d.cn + ' <span class="hint">' + d.py + '</span></h3><p class="small"><b>Sounds like:</b> ' + esc(d.sound) + '</p><p class="small">' + esc(d.meaning) + '</p></article>';
    }).join("");
    function rows(f) {
      var ks = Object.keys(C).filter(function (k) { return !f || k.indexOf(f) > -1 || C[k][0].indexOf(f) > -1 || C[k][1].toLowerCase().indexOf(f.toLowerCase()) > -1; });
      tb.innerHTML = ks.map(function (k) { var c = C[k]; return '<tr><td class="num"><a href="analyzer.html?n=' + k + '"><b>' + k + '</b></a></td><td>' + c[0] + '</td><td>' + esc(c[1]) + '</td><td><span class="badge ' + (c[2] >= 0 ? "b-good" : "b-bad") + '">' + (c[2] >= 0 ? "Lucky" : "Avoid") + '</span></td></tr>'; }).join("") || '<tr><td colspan="4">No match. Try the Analyzer for any number.</td></tr>';
    }
    function look(v) {
      v = (v || "").trim(); rows(v.replace(/\D/g, "") ? v.replace(/\D/g, "") : v);
      var n = L.clean(v);
      if (!n) { det.innerHTML = ""; return; }
      var r = L.analyze(n);
      det.innerHTML = '<div class="tool"><div style="display:flex;gap:18px;align-items:center;flex-wrap:wrap"><b style="font:800 2.8rem/1 var(--serif);color:var(--red)" class="num">' + n + '</b><div><span class="badge ' + (r.score >= 70 ? "b-good" : r.score >= 45 ? "b-warn" : "b-bad") + '">' + r.verdict + '</span> <span class="badge b-gold">' + r.score + '/99</span><p class="hint mb0">' +
        (C[n] ? esc(C[n][0] + " — " + C[n][1]) : r.digits.map(function (x) { return x.d + " " + x.info.cn + " (" + x.info.sound.split("(")[0].trim() + ")"; }).join(" · ")) + '</p></div></div><p class="mt mb0"><a class="btn btn-red btn-sm" href="analyzer.html?n=' + n + '">Full analysis →</a></p></div>';
    }
    inp.addEventListener("input", function () { look(inp.value); });
    $("#dict-form").addEventListener("submit", function (e) { e.preventDefault(); look(inp.value); });
    rows(""); if (qs.get("n")) { inp.value = qs.get("n"); look(qs.get("n")); }
  }

  /* ---------- Zodiac ---------- */
  var zg = $("#zgrid");
  if (zg) {
    var zd = $("#zdetail"), Y1 = 2026, Y2 = 2027;
    zg.innerHTML = Z.map(function (a, i) { return '<button class="zcell" type="button" data-i="' + i + '"><span class="e">' + a.e + '</span><b>' + a.n + '</b><small>' + a.cn + '</small></button>'; }).join("");
    function stars(n) { return "★★★★★".slice(0, n) + "☆☆☆☆☆".slice(0, 5 - n); }
    function yearsOf(i) { var ys = []; for (var y = 1936; y <= 2031; y++) if (L.animalIndexForYear(y) === i) ys.push(y); return ys; }
    function show(i, extra) {
      $$(".zcell", zg).forEach(function (c) { c.classList.toggle("on", +c.getAttribute("data-i") === i); });
      var a = Z[i], o1 = L.yearOutlook(i, Y1), o2 = L.yearOutlook(i, Y2);
      var best = Z.filter(function (b, j) { var r = L.relation(i, j); return r.k === "liuhe" || r.k === "sanhe"; }).map(function (b) { return b.e + " " + b.n; }).join(", ");
      var clash = Z[(i + 6) % 12];
      zd.innerHTML = (extra || "") + '<div class="tool"><div style="display:flex;gap:14px;align-items:center"><span style="font-size:3.2rem">' + a.e + '</span><div><h2 class="mb0">Year of the ' + a.n + ' ' + a.cn + '</h2><p class="hint mb0">' + esc(a.trait) + '</p></div></div>' +
        '<div class="grid g3 mt"><div><div class="lbl">Lucky numbers</div><p class="num" style="font:800 1.6rem var(--serif);color:var(--red);margin:0">' + a.lucky.join(" · ") + '</p></div><div><div class="lbl">Lucky colours</div><p>' + a.colors.join(", ") + '</p></div><div><div class="lbl">Best matches · Clash</div><p>' + best + ' · <span style="color:var(--bad)">' + clash.e + " " + clash.n + '</span></p></div></div>' +
        '<p class="hint">Recent years: ' + yearsOf(i).slice(-8).join(", ") + ' (the sign changes at Chinese New Year, not on 1 January)</p>' +
        '<div class="grid g2 mt"><div class="card"><span class="tag">2026 · ' + o1.yearName + '</span><h3>' + stars(o1.stars) + ' ' + esc(o1.head) + '</h3><p class="small">' + esc(o1.body) + '</p></div>' +
        '<div class="card"><span class="tag">2027 · ' + o2.yearName + '</span><h3>' + stars(o2.stars) + ' ' + esc(o2.head) + '</h3><p class="small">' + esc(o2.body) + '</p></div></div>' +
        '<div class="btns mt"><a class="btn btn-red btn-sm" href="calendar.html?a=' + i + '">Lucky dates for the ' + a.n + '</a><a class="btn btn-ghost btn-sm" href="analyzer.html?y=' + (yearsOf(i).slice(-3)[0]) + '">Score my number as a ' + a.n + '</a></div></div>';
    }
    zg.addEventListener("click", function (e) { var b = e.target.closest(".zcell"); if (b) show(+b.getAttribute("data-i")); });
    $("#zform").addEventListener("submit", function (e) {
      e.preventDefault(); var v = $("#zbirth").value; var r = L.zodiacForDate(v); if (!r) return;
      store("birthYear", r.lunarYear);
      show(r.idx, '<div class="callout"><b>You are a ' + (r.yin ? "Yin " : "Yang ") + r.element + ' ' + r.animal.n + ' ' + r.animal.e + '</b> (' + r.ganzhi + ' year). ' +
        (r.cnyUsed ? 'Your lunar year began on ' + r.cnyUsed + '.' : '') + (v.slice(0, 4) != r.lunarYear ? ' Born before Chinese New Year, so you belong to the previous lunar year.' : '') + '</div>');
      zd.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    var sa = $("#ca"), sb = $("#cb");
    [sa, sb].forEach(function (s, k) { s.innerHTML = Z.map(function (a, i) { return '<option value="' + i + '"' + (i === (k ? 7 : 6) ? " selected" : "") + '>' + a.e + " " + a.n + '</option>'; }).join(""); });
    $("#cform").addEventListener("submit", function (e) {
      e.preventDefault(); var r = L.relation(+sa.value, +sb.value), A = Z[+sa.value], B = Z[+sb.value];
      $("#cres").innerHTML = '<div class="tool">' + gauge(r.score).replace("/ 99 Prosperity", "% match") + '<h3>' + A.e + " " + A.n + " + " + B.e + " " + B.n + ': ' + r.label + '</h3><p>' + esc(r.note) + '</p><button class="btn btn-gold btn-sm" type="button" data-share="' + A.n + ' + ' + B.n + ' = ' + r.score + '% (' + r.label + ') on 06788 Zodiac Match">Share result</button></div>';
      $("#cres [data-share]").onclick = function () { shareText(this.getAttribute("data-share")); };
    });
    var start = qs.get("a") != null ? +qs.get("a") : (store("birthYear") ? L.animalIndexForYear(+store("birthYear")) : 6);
    show(start);
  }

  /* ---------- Auspicious date calendar ---------- */
  var cal = $("#cal");
  if (cal) {
    var now = new Date(), ym = $("#c-month"), ev = $("#c-event"), ca = $("#c-animal"), dt = $("#c-detail");
    var opts = "";
    for (var y = 2024; y <= 2032; y++) for (var m = 1; m <= 12; m++) opts += '<option value="' + y + "-" + m + '">' + new Date(y, m - 1, 1).toLocaleString("en", { month: "long" }) + " " + y + "</option>";
    ym.innerHTML = opts;
    ym.value = (qs.get("m") || (now.getFullYear() + "-" + (now.getMonth() + 1)));
    if (!ym.value) ym.value = "2026-10";
    ca.innerHTML = '<option value="">— any —</option>' + Z.map(function (a, i) { return '<option value="' + i + '">' + a.e + " " + a.n + '</option>'; }).join("");
    if (qs.get("a") != null) ca.value = qs.get("a"); else if (store("birthYear")) ca.value = L.animalIndexForYear(+store("birthYear"));
    if (qs.get("e")) ev.value = qs.get("e");
    function detail(y, m, d) {
      var i = L.dayInfo(y, m, d), r = L.rateDay(i, ev.value, ca.value === "" ? null : +ca.value);
      $$(".cday.sel", cal).forEach(function (c) { c.classList.remove("sel"); });
      var el = $('.cday[data-d="' + d + '"]', cal); el && el.classList.add("sel");
      dt.innerHTML = '<div class="tool"><span class="tag">' + new Date(y, m - 1, d).toLocaleDateString("en", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) + '</span>' +
        '<h3 style="margin:6px 0">' + i.officer[0] + ' ' + i.officer[1] + ' day <span class="badge ' + (r === "good" ? "b-good" : r === "bad" ? "b-bad" : "b-warn") + '">' + (r === "good" ? "Auspicious for " + ev.options[ev.selectedIndex].text : r === "bad" ? "Avoid" : "Neutral") + '</span></h3>' +
        '<p>' + esc(i.officer[2]) + '</p><p class="small"><b>Day pillar:</b> ' + i.ganzhi + ' (' + i.dayAnimal.e + ' ' + i.dayAnimal.n + ' day) · <b>Clashes with:</b> ' + i.clash.e + ' ' + i.clash.n + (ca.value !== "" && +ca.value === i.clashIdx ? ' <span class="badge b-bad">your sign</span>' : '') + '</p>' +
        '<a class="btn btn-red btn-sm" href="desk.html?intent=date&d=' + y + "-" + m + "-" + d + '">Get a personal date reading →</a></div>';
    }
    function draw() {
      var p = ym.value.split("-"), y = +p[0], m = +p[1], first = new Date(y, m - 1, 1).getDay(), days = new Date(y, m, 0).getDate();
      var h = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(function (d) { return '<div class="dow">' + d + '</div>'; }).join("");
      for (var k = 0; k < first; k++) h += '<div class="cday empty" aria-hidden="true"></div>';
      var good = 0;
      for (var d = 1; d <= days; d++) {
        var i = L.dayInfo(y, m, d), r = L.rateDay(i, ev.value, ca.value === "" ? null : +ca.value); if (r === "good") good++;
        var today = (y === now.getFullYear() && m === now.getMonth() + 1 && d === now.getDate());
        h += '<button type="button" class="cday ' + (r !== "neutral" ? r : "") + (today ? " today" : "") + '" data-d="' + d + '" aria-label="' + d + ' ' + i.officer[1] + ' day, ' + r + '"><span class="d">' + d + '</span><span class="o">' + i.officer[0] + ' ' + i.officer[1] + '</span><span class="z">' + i.ganzhi + ' · ⚠' + i.clash.e + '</span></button>';
      }
      cal.innerHTML = h;
      $("#c-sum").textContent = good + " auspicious days for " + ev.options[ev.selectedIndex].text.toLowerCase() + " this month" + (ca.value !== "" ? " (clash days for the " + Z[+ca.value].n + " removed)" : "") + ".";
      var td = (y === now.getFullYear() && m === now.getMonth() + 1) ? now.getDate() : (($('.cday.good', cal) || {}).getAttribute ? +$('.cday.good', cal).getAttribute("data-d") : 1);
      detail(y, m, td);
    }
    cal.addEventListener("click", function (e) { var b = e.target.closest(".cday:not(.empty)"); if (!b) return; var p = ym.value.split("-"); detail(+p[0], +p[1], +b.getAttribute("data-d")); });
    [ym, ev, ca].forEach(function (s) { s.addEventListener("change", draw); });
    $("#c-prev").onclick = function () { if (ym.selectedIndex > 0) { ym.selectedIndex--; draw(); } };
    $("#c-next").onclick = function () { if (ym.selectedIndex < ym.options.length - 1) { ym.selectedIndex++; draw(); } };
    draw();
  }

  /* ---------- Hongbao ---------- */
  var hb = $("#hbform");
  if (hb) {
    hb.addEventListener("submit", function (e) {
      e.preventDefault();
      var amts = L.hongbao(hb.rel.value, hb.occ.value, +hb.budget.value || 0), cur = hb.cur.value;
      $("#hbres").innerHTML = '<div class="tool"><span class="tag">Recommended amounts</span><div class="dgrid">' + amts.map(function (a) { var r = L.analyze(String(a)); return '<div class="dcell good" style="min-width:110px"><b class="num">' + cur + a + '</b><small>' + (C[String(a)] ? C[String(a)][0] : r.verdict) + '</small></div>'; }).join("") + '</div>' +
        '<ul class="list small"><li>Use crisp new notes and give with both hands.</li><li>' + (hb.occ.value === "wedding" ? "Weddings: even amounts only (好事成双). Never odd, never with a 4." : "Avoid any amount containing 4. Amounts with 6, 8 or 9 are best.") + '</li><li>' + (hb.occ.value === "funeral" ? "Funerals (帛金): use a white envelope and odd amounts. Don't use red." : "Don't open the envelope in front of the giver.") + '</li></ul>' +
        '<button class="btn btn-gold btn-sm" type="button" id="hbshare">Share</button></div>';
      $("#hbshare").onclick = function () { shareText("Lucky red-envelope amounts: " + amts.map(function (a) { return cur + a; }).join(", ") + " via the 06788 Hongbao Calculator"); };
      if (hb.occ.value === "funeral") { $("#hbres .dgrid").innerHTML = '<div class="dcell neutral" style="min-width:160px"><b class="num">' + cur + ((+hb.budget.value || 101) % 2 ? (+hb.budget.value || 101) : (+hb.budget.value || 100) + 1) + '</b><small>odd amount, white envelope</small></div>'; }
    });
  }

  /* ---------- Charm pricing ---------- */
  var pf = $("#priceform");
  if (pf) pf.addEventListener("submit", function (e) {
    e.preventDefault(); var p = +pf.price.value, res = L.charmPrices(p), cur = pf.cur.value;
    $("#priceres").innerHTML = res.length ? '<div class="tbl-wrap"><table><thead><tr><th>Lucky price</th><th>Score</th><th>vs. your price</th></tr></thead><tbody>' +
      res.map(function (r) { return '<tr><td class="num"><b>' + cur + r.price.toLocaleString() + '</b></td><td>' + r.score + '/99</td><td class="num">' + (r.diff >= 0 ? "+" : "") + r.diff.toFixed(1) + '%</td></tr>'; }).join("") + '</tbody></table></div><p class="hint">Scores use the same engine as the Analyzer. Every option avoids 4, and prices ending in 8 read as 发 (“prosper”).</p>' : '<p>Enter a price above 0.</p>';
  });

  /* ---------- Prosperity Desk multi-step ---------- */
  var desk = $("#deskform");
  if (desk) {
    var steps = $$(".step", desk), bar = $(".progress i", desk), cur = 0;
    function go(n) {
      if (n > cur) { var inputs = $$("input,select,textarea", steps[cur]); for (var i = 0; i < inputs.length; i++) if (!inputs[i].checkValidity()) { inputs[i].reportValidity(); return; } }
      cur = Math.max(0, Math.min(steps.length - 1, n));
      steps.forEach(function (s, i) { s.classList.toggle("on", i === cur); });
      bar.style.width = ((cur + 1) / steps.length * 100) + "%";
      $("#step-lbl").textContent = "Step " + (cur + 1) + " of " + steps.length;
      var intent = (desk.querySelector("input[name=intent]:checked") || {}).value || "";
      $$("[data-for]", desk).forEach(function (el) { var on = el.getAttribute("data-for").split(" ").indexOf(intent) > -1; el.style.display = on ? "" : "none"; $$("input,select,textarea", el).forEach(function (x) { x.disabled = !on; }); });
    }
    $$("[data-next]", desk).forEach(function (b) { b.addEventListener("click", function () { go(cur + 1); }); });
    $$("[data-back]", desk).forEach(function (b) { b.addEventListener("click", function () { go(cur - 1); }); });
    $$("input[name=intent]", desk).forEach(function (r) { r.addEventListener("change", function () { setTimeout(function () { go(1); }, 180); }); });
    var pi = qs.get("intent"); if (pi) { var rr = desk.querySelector('input[name=intent][value="' + pi + '"]'); if (rr) rr.checked = true; }
    if (qs.get("n") && desk.number) desk.number.value = qs.get("n");
    if (qs.get("d") && desk.date_wanted) desk.date_wanted.value = qs.get("d").split("-").map(function (x) { return x.padStart(2, "0"); }).join("-");
    desk.addEventListener("submit", function (e) {
      e.preventDefault(); if (!desk.reportValidity()) return;
      var intent = (desk.querySelector("input[name=intent]:checked") || {}).value;
      desk.setAttribute("data-subject", "LEAD — Prosperity Desk: " + intent);
      window.sendForm(desk).then(function (ok) { if (ok) { $("#desk-done").style.display = "block"; desk.style.display = "none"; $("#desk-done").scrollIntoView({ behavior: "smooth", block: "center" }); } });
    });
    go(pi ? 1 : 0);
  }

  /* ---------- Support tiers ---------- */
  var tiers = $("#tiers");
  if (tiers) {
    var S = window.SITE || {}, amt = 18, freq = "one-time";
    $$(".tier", tiers).forEach(function (t) { t.addEventListener("click", function () { $$(".tier", tiers).forEach(function (x) { x.classList.remove("on"); }); t.classList.add("on"); amt = +t.getAttribute("data-amt"); $("#d-custom").value = ""; upd(); }); });
    $$(".chip[data-freq]").forEach(function (c) { c.addEventListener("click", function () { $$(".chip[data-freq]").forEach(function (x) { x.setAttribute("aria-pressed", "false"); }); c.setAttribute("aria-pressed", "true"); freq = c.getAttribute("data-freq"); upd(); }); });
    $("#d-custom").addEventListener("input", function (e) { var v = +e.target.value; if (v > 0) { amt = v; $$(".tier", tiers).forEach(function (x) { x.classList.remove("on"); }); } upd(); });
    function upd() {
      $("#d-sum").textContent = "$" + amt + (freq === "monthly" ? " / month" : " one-time");
      var pf = $("#pledgeform"); if (pf) { pf.amount.value = amt; pf.frequency.value = freq; }
    }
    var pays = [["paypal", "PayPal"], ["stripe", "Card (Stripe)"], ["kofi", "Ko-fi"], ["buymeacoffee", "Buy Me a Coffee"]].filter(function (p) { return S.donate && S.donate[p[0]]; });
    var pb = $("#paybtns");
    if (pays.length) pb.innerHTML = pays.map(function (p) { return '<a class="btn btn-red" target="_blank" rel="noopener" href="' + S.donate[p[0]] + '">Give with ' + p[1] + '</a>'; }).join("");
    else pb.innerHTML = '<a class="btn btn-red" href="#pledge">Pledge your support →</a>';
    upd();
  }
})();
