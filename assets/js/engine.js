/* 06788.com — calculation engine (pure functions, no DOM). Works in browser and Node. */
(function (root) {
  var D = root.DIGITS, C = root.COMBOS, Z = root.ZODIAC;

  function clean(s) { return String(s || "").replace(/\D/g, "").slice(0, 24); }

  function patterns(n) {
    var out = [];
    var m;
    if ((m = n.match(/(\d)\1{3,}/))) out.push({ k: "run", label: m[0] + " — " + m[0].length + " of a kind", bonus: m[1] === "4" ? -20 : (m[1] === "8" ? 16 : 10) });
    else if ((m = n.match(/(\d)\1{2}/))) out.push({ k: "triple", label: m[0] + " — triple", bonus: m[1] === "4" ? -14 : (m[1] === "8" ? 10 : 6) });
    if (/(\d)(\d)\1\2/.test(n) && !/(\d)\1\1\1/.test(n)) { var ab = n.match(/(\d)(\d)\1\2/)[0]; if (ab[0] !== ab[1]) out.push({ k: "abab", label: ab + " — ABAB repeat", bonus: 6 }); }
    if ((m = n.match(/(\d)(\d)\2\1/)) && m[1] !== m[2]) out.push({ k: "abba", label: m[0] + " — ABBA mirror", bonus: 5 });
    if ((m = n.match(/(\d)\1(\d)\2/)) && m[1] !== m[2]) out.push({ k: "aabb", label: m[0] + " — AABB pairs", bonus: 6 });
    for (var i = 0; i + 3 < n.length + 0; i++) {
      var s = n.substr(i, 4), up = true, dn = true;
      for (var j = 1; j < 4; j++) { if (+s[j] !== +s[j - 1] + 1) up = false; if (+s[j] !== +s[j - 1] - 1) dn = false; }
      if (s.length === 4 && (up || dn)) { out.push({ k: "seq", label: s + " — " + (up ? "rising" : "falling") + " sequence", bonus: up ? 6 : 2 }); break; }
    }
    if (n.length >= 4 && n === n.split("").reverse().join("")) out.push({ k: "pal", label: "Palindrome — reads the same both ways", bonus: 6 });
    return out;
  }

  function combos(n) {
    var found = [], keys = Object.keys(C).sort(function (a, b) { return b.length - a.length; }), used = {};
    keys.forEach(function (k) {
      var idx = n.indexOf(k);
      while (idx !== -1) {
        var overlap = false;
        for (var i = idx; i < idx + k.length; i++) if (used[i] && k.length < used[i]) overlap = true;
        if (!overlap) {
          if (!found.some(function (f) { return f.code === k; })) found.push({ code: k, reading: C[k][0], meaning: C[k][1], bonus: C[k][2] });
          for (var j = idx; j < idx + k.length; j++) used[j] = Math.max(used[j] || 0, k.length);
        }
        idx = n.indexOf(k, idx + 1);
      }
    });
    return found;
  }

  function animalIndexForYear(y) { return ((y - 4) % 12 + 12) % 12; }

  function analyze(raw, birthYear) {
    var n = clean(raw);
    if (!n) return null;
    var digits = n.split("").map(function (d) { return { d: d, info: D[d] }; });
    var sum = 0, weight = 0, soft4 = /1314|3344/.test(n);
    digits.forEach(function (x, i) { var w = 1 + (i === digits.length - 1 ? 1.5 : 0); var dw = (x.d === "4" && soft4) ? 2 : D[x.d].w; sum += dw * w; weight += w; });
    var avg = sum / weight;                         // -10..10
    var score = 50 + avg * 3.2;
    var cmb = combos(n), pat = patterns(n);
    cmb.forEach(function (c) { score += c.bonus * 0.9; });
    pat.forEach(function (p) { score += p.bonus; });
    var fours = (n.match(/4/g) || []).length, eights = (n.match(/8/g) || []).length;
    var saved4 = cmb.some(function (c) { return (c.code === "1314" || c.code === "3344") ; });
    if (fours && !saved4) score -= 4 * fours;
    if (n[n.length - 1] === "8") score += 4;
    if (n[n.length - 1] === "4") score -= 6;
    var zmatch = null;
    if (birthYear && birthYear > 1900 && birthYear < 2100) {
      var a = Z[animalIndexForYear(birthYear)], hits = 0;
      n.split("").forEach(function (d) { if (a.lucky.indexOf(+d) > -1) hits++; });
      var pct = hits / n.length;
      score += Math.round(pct * 10);
      zmatch = { animal: a, hits: hits, pct: Math.round(pct * 100) };
    }
    score = Math.max(1, Math.min(99, Math.round(score)));
    var grade = score >= 90 ? "A+" : score >= 80 ? "A" : score >= 70 ? "B+" : score >= 60 ? "B" : score >= 50 ? "C" : score >= 35 ? "D" : "F";
    var verdict = score >= 85 ? "Exceptionally auspicious" : score >= 70 ? "Very lucky" : score >= 55 ? "Favourable" : score >= 40 ? "Neutral / mixed" : "Unlucky — consider another";
    var tier = "Standard";
    if (/8{4,}/.test(n) || /(\d)\1{4,}/.test(n)) tier = "Collector";
    else if (/(\d)\1{3}/.test(n) && !/4{2,}/.test(n)) tier = "Golden";
    else if (pat.length && score >= 70) tier = "Premium";
    else if (score >= 80) tier = "Premium";
    if (fours >= 2 && score < 40) tier = "Standard";
    return { n: n, digits: digits, combos: cmb, patterns: pat, fours: fours, eights: eights, score: score, grade: grade, verdict: verdict, tier: tier, zodiac: zmatch };
  }

  /* ---- zodiac ---- */
  function zodiacForDate(dateStr) {
    var d = new Date(dateStr + "T12:00:00"); if (isNaN(d)) return null;
    var y = d.getFullYear(), cny = root.CNY[y];
    var ly = y;
    if (cny && dateStr < cny) ly = y - 1;
    var stem = ((ly - 4) % 10 + 10) % 10;
    return { lunarYear: ly, animal: Z[animalIndexForYear(ly)], idx: animalIndexForYear(ly), element: root.ELEMENTS[stem], yin: stem % 2 === 1, ganzhi: root.STEMS[stem] + root.BRANCHES[animalIndexForYear(ly)], cnyUsed: root.CNY[ly] || null, approx: !cny };
  }

  function relation(a, b) {
    if (a === b) return { k: "same", label: "Same sign", score: 70, note: "Kindred spirits who understand each other easily, and may clash over who leads." };
    if ((a + b) % 12 === 1) return { k: "liuhe", label: "Six Harmonies (六合)", score: 95, note: "One of the six “secret friend” pairings. Traditionally the best match for love and business." };
    if (a % 4 === b % 4) return { k: "sanhe", label: "Three Harmonies (三合)", score: 88, note: "Members of the same harmony trine who share goals and support each other." };
    if (Math.abs(a - b) === 6) return { k: "chong", label: "Clash (六冲)", score: 32, note: "Opposite signs. There's attraction and friction, so it takes patience and clear roles." };
    if ((a + b) % 12 === 7) return { k: "hai", label: "Harm (六害)", score: 45, note: "Small misunderstandings pile up. Talk things through often." };
    var po = { "0,9": 1, "3,6": 1, "1,4": 1, "7,10": 1, "2,11": 0, "5,8": 0 };
    return { k: "neutral", label: "Neutral", score: 65, note: "No strong traditional bond either way. It comes down to the two people." };
  }

  function yearOutlook(animalIdx, year) {
    var yi = animalIndexForYear(year), r = relation(animalIdx, yi), stem = ((year - 4) % 10 + 10) % 10;
    var name = root.ELEMENTS[stem] + " " + Z[yi].n;
    var t;
    if (animalIdx === yi) t = { stars: 3, head: "Your own year (本命年, Ben Ming Nian)", body: "Tradition says your birth-sign year brings change, so people wear red (a bracelet or belt) and avoid reckless bets. Focus on health, habits and steady savings over speculation." };
    else if (r.k === "chong") t = { stars: 2, head: "Clashing with Tai Sui", body: "The year's sign opposes yours, which calls for caution with contracts, travel and large purchases. Good for renovation, moving or planned change, which is said to “turn the clash.”" };
    else if (r.k === "liuhe") t = { stars: 5, head: "Secret-friend year", body: "Helpful people and partnerships show up. A strong year for launches, networking, marriage and long-term investments." };
    else if (r.k === "sanhe") t = { stars: 5, head: "Harmony-trine year", body: "Momentum is on your side. Push career moves, raise prices, pitch big clients and act on ideas you've been holding back." };
    else if (r.k === "hai") t = { stars: 3, head: "Harm year: guard your circle", body: "Watch for gossip and money leaks. Keep agreements in writing, diversify income and don't lend what you can't lose." };
    else t = { stars: 4, head: "Steady, workable year", body: "No major opposition. Consistent effort compounds. Pick a lucky date for any launch." };
    t.yearName = name; t.relation = r;
    return t;
  }

  /* ---- Tong Shu day info ---- */
  var OFFICERS = [
    ["建", "Establish", "Good for starting study, meeting officials, planning. Avoid digging, moving house."],
    ["除", "Remove", "Good for cleaning, medical care, removing the old. Avoid weddings."],
    ["满", "Full", "Good for opening a shop, collecting money, celebrations. Avoid legal disputes."],
    ["平", "Balanced", "Good for repairs, paving and routine work. Neutral for big events."],
    ["定", "Stable", "Good for contracts, engagements, hiring, buying property."],
    ["执", "Initiate", "Good for building, planting, hiring. Avoid moving and travel."],
    ["破", "Destruction", "Generally inauspicious. Good only for demolition or breaking bad habits."],
    ["危", "Danger", "Take extra care. Avoid risky travel and heights; fine for worship."],
    ["成", "Success", "Highly auspicious: openings, weddings, signings, moving, launches."],
    ["收", "Receive", "Good for collecting debts, harvesting, buying assets. Avoid funerals."],
    ["开", "Open", "Very auspicious for grand openings, new jobs, travel and weddings."],
    ["闭", "Close", "Good for closing deals, saving and burial. Avoid openings and surgery."]
  ];
  var EVENT_GOOD = {
    opening: [2, 4, 8, 10], wedding: [4, 8, 10, 2], moving: [8, 10, 3, 4], signing: [4, 8, 9, 11], travel: [10, 8, 4], any: [8, 10, 4, 2]
  };
  var BAD = [6, 7];
  function jdn(y, m, d) { var a = Math.floor((14 - m) / 12), yy = y + 4800 - a, mm = m + 12 * a - 3; return d + Math.floor((153 * mm + 2) / 5) + 365 * yy + Math.floor(yy / 4) - Math.floor(yy / 100) + Math.floor(yy / 400) - 32045; }
  var DEF_JIE = ["1-6", "2-4", "3-6", "4-5", "5-6", "6-6", "7-7", "8-8", "9-8", "10-8", "11-7", "12-7"];
  function monthBranch(y, m, d) {
    var j = (root.JIE[y] || DEF_JIE).map(function (s) { var p = s.split("-"); return [+p[0], +p[1]]; });
    // j[0]=小寒(丑1), j[1]=立春(寅2) ... j[11]=大雪(子0)
    var br = 0; // before 小寒 → 子 (from previous 大雪)
    for (var i = 0; i < 12; i++) { var t = j[i]; if (m > t[0] || (m === t[0] && d >= t[1])) br = (i + 1) % 12; }
    return br;
  }
  function dayInfo(y, m, d) {
    var gz = ((jdn(y, m, d) + 49) % 60 + 60) % 60;
    var stem = gz % 10, br = gz % 12, mb = monthBranch(y, m, d);
    var off = ((br - mb) % 12 + 12) % 12;
    var clash = (br + 6) % 12;
    return { stem: stem, branch: br, ganzhi: root.STEMS[stem] + root.BRANCHES[br], dayAnimal: Z[br], officer: OFFICERS[off], officerIdx: off, clash: Z[clash], clashIdx: clash, monthBranch: mb, approx: !root.JIE[y] };
  }
  function rateDay(info, event, userAnimalIdx) {
    var g = EVENT_GOOD[event] || EVENT_GOOD.any;
    var r = g.indexOf(info.officerIdx) > -1 ? "good" : BAD.indexOf(info.officerIdx) > -1 ? "bad" : "neutral";
    if (userAnimalIdx != null && info.clashIdx === userAnimalIdx) r = "bad";
    return r;
  }

  /* ---- Hongbao ---- */
  var HB = {
    parent: [888, 1688, 2888], child: [88, 168, 288], niece: [68, 88, 128], employee: [88, 168, 288],
    friend: [66, 88, 168], elder: [168, 288, 388], colleague: [66, 88, 128], wedding_friend: [288, 388, 688], wedding_close: [888, 1288, 1688], wedding_family: [1688, 2888, 3888]
  };
  function hongbao(rel, occasion, budget) {
    var key = occasion === "wedding" ? (rel === "parent" || rel === "elder" || rel === "child" || rel === "niece" ? "wedding_family" : rel === "friend" ? "wedding_friend" : "wedding_close") : rel;
    var base = (HB[key] || HB.friend).slice();
    var mult = occasion === "birthday" ? 1 : occasion === "baby" ? 1.2 : occasion === "opening" ? 1.5 : 1;
    var out = base.map(function (v) { return lucky(Math.round(v * mult), occasion === "wedding"); });
    if (budget) { out = out.filter(function (v) { return v <= budget * 1.05; }); if (!out.length) out = [lucky(budget, occasion === "wedding")]; }
    return out.filter(function (v, i, a) { return a.indexOf(v) === i; });
  }
  function lucky(v, even) {
    // nearest amount with no 4, ending in 8 / 6 / 9 / 0-pattern, even for weddings
    var sv = String(v);
    if (sv.indexOf("4") < 0 && /[689]$/.test(sv) && !(even && v % 2)) return v;
    var cands = [];
    for (var x = Math.max(6, Math.floor(v * 0.85)); x <= Math.ceil(v * 1.15) + 10; x++) {
      var s = String(x);
      if (s.indexOf("4") > -1) continue;
      if (even && x % 2) continue;
      var last = s[s.length - 1];
      if (!/[689]/.test(last) && !/^(\d)\1+$/.test(s) && !/00$/.test(s)) continue;
      var sc = analyze(s).score - Math.abs(x - v) / v * 40;
      cands.push([sc, x]);
    }
    cands.sort(function (a, b) { return b[0] - a[0]; });
    return cands.length ? cands[0][1] : v;
  }
  function charmPrices(p) {
    p = +p; if (!p || p <= 0) return [];
    var res = [], mags = [1, 10, 100, 1000];
    var ends = ["8", "88", "68", "98", "168", "888"];
    var whole = Math.floor(p);
    ends.forEach(function (e) {
      var mod = Math.pow(10, e.length), base = Math.floor(whole / mod) * mod, c1 = base + +e, c2 = c1 - mod;
      [c1, c2].forEach(function (c) { if (c > 0 && Math.abs(c - p) / p < 0.2 && String(c).indexOf("4") < 0) res.push(c); });
    });
    if (p < 300) {
      for (var w = Math.floor(p * 0.8); w <= Math.ceil(p * 1.2); w++) {
        [w + 0.88, w + 0.68, w + 0.98, w].forEach(function (c) { c = +c.toFixed(2); if (Math.abs(c - p) / p < 0.2 && String(c).indexOf("4") < 0 && /[689]$/.test(String(c))) res.push(c); });
      }
    }
    res = res.filter(function (v, i, a) { return a.indexOf(v) === i; }).map(function (v) { return { price: v, score: analyze(String(v).replace(".", "")).score, diff: ((v - p) / p * 100) }; });
    res.sort(function (a, b) { return b.score - a.score || Math.abs(a.diff) - Math.abs(b.diff); });
    return res.slice(0, 6);
  }

  root.L88 = { clean: clean, analyze: analyze, combos: combos, patterns: patterns, zodiacForDate: zodiacForDate, animalIndexForYear: animalIndexForYear, relation: relation, yearOutlook: yearOutlook, dayInfo: dayInfo, rateDay: rateDay, OFFICERS: OFFICERS, hongbao: hongbao, lucky: lucky, charmPrices: charmPrices };
})(typeof window !== "undefined" ? window : globalThis);
