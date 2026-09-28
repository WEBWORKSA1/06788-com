#!/usr/bin/env python3
"""06788.com static builder / previewer.
Source pages are the root *.html files with YAML front matter:
  title, desc, extra (comma list of extra JS, e.g. tools-ui), type (article), report (true)
Usage:  python3 build.py   -> regenerates _layouts/default.html, sitemap.xml and a local preview in _preview/
The live site is rendered by GitHub Pages (Jekyll) from the same layout."""
import os, re, datetime

ROOT = os.path.dirname(os.path.abspath(__file__))
SITE = "https://06788.com/"
TODAY = datetime.date.today().isoformat()
V = TODAY.replace("-", "")  # cache-buster

BANNER = ('<div class="topbar" role="note">Contact, if you are interested in this '
          '<b>website / domain name / Sponsorship / Advertisement / Partnership</b> &rarr; '
          '<a href="https://web.works/contact" target="_blank" rel="noopener">Contact us</a></div>')

NAV = [("analyzer.html", "Analyzer"), ("numbers.html", "Numbers"), ("zodiac.html", "Zodiac"),
       ("calendar.html", "Lucky Dates"), ("hongbao.html", "Hongbao"), ("learn.html", "Learn"),
       ("videos.html", "Videos"), ("contests.html", "Contests"), ("support.html", "Support")]

MOON = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>'

def header(cur):
    links = "".join('<a href="%s"%s>%s</a>' % (h, ' aria-current="page"' if h == cur else "", t) for h, t in NAV)
    return f'''<a class="skip" href="#main">Skip to content</a>
{BANNER}
<header class="hdr"><div class="wrap">
<a class="logo" href="index.html" aria-label="06788 home"><span class="seal">发</span><span>067<b>88</b></span></a>
<button class="iconbtn menu-btn" aria-label="Open menu" aria-expanded="false">&#9776;</button>
<nav class="nav" aria-label="Main">{links}<a class="cta" href="desk.html">Prosperity Desk</a>
<button class="iconbtn" data-theme-toggle aria-label="Toggle dark mode">{MOON}</button></nav>
</div></header>'''

FOOTER = '''<footer class="ftr"><div class="wrap">
<div class="cols">
<div><a class="logo" href="index.html" style="color:#fff"><span class="seal">发</span><span>067<b>88</b></span></a>
<p class="small" style="margin-top:12px;color:#A8A29E">你·顺·起·发发 means “You rise smoothly into double prosperity.” Free tools to score, time and value lucky numbers, with a specialist desk for anything that matters.</p>
<p class="small"><a href="https://web.works/contact" target="_blank" rel="noopener">Interested in this website or domain? Contact &rarr;</a></p></div>
<div><h4>Tools</h4><ul><li><a href="analyzer.html">Lucky Number Analyzer</a></li><li><a href="numbers.html">Number Dictionary</a></li><li><a href="zodiac.html">Zodiac &amp; Compatibility</a></li><li><a href="calendar.html">Lucky Date Finder</a></li><li><a href="hongbao.html">Hongbao Calculator</a></li><li><a href="pricing.html">Lucky Price Tool</a></li></ul></div>
<div><h4>Explore</h4><ul><li><a href="learn.html">Guides</a></li><li><a href="videos.html">Videos</a></li><li><a href="contests.html">Contests &amp; Prizes</a></li><li><a href="desk.html">Prosperity Desk</a></li></ul></div>
<div><h4>Work with us</h4><ul><li><a href="advertise.html">Advertise / Sponsor</a></li><li><a href="support.html">Support &amp; Donate</a></li><li><a href="careers.html">Careers &amp; Talent</a></li><li><a href="contact.html">Contact</a></li></ul></div>
<div><h4>Legal</h4><ul><li><a href="about.html">About</a></li><li><a href="privacy.html">Privacy Policy</a></li><li><a href="terms.html">Terms of Use</a></li><li><a href="disclaimer.html">Trademark &amp; Copyright</a></li></ul>
<ul style="margin-top:12px"><li><a data-social="youtube" href="#">YouTube</a></li><li><a data-social="x" href="#">X</a></li><li><a data-social="instagram" href="#">Instagram</a></li><li><a data-social="tiktok" href="#">TikTok</a></li></ul></div>
</div>
<div class="legal">&copy; <span data-year>2026</span> 06788.com. All rights reserved. “06788” is used only as a generic numeric string and cultural expression. This site is independent and is not affiliated with, endorsed by, or sponsored by any company, stock exchange, listed issuer, government body or brand that uses a similar number. Third-party names and marks belong to their owners. Lucky-number, zodiac and date content is cultural entertainment and education, not financial, legal, medical or professional advice. <a href="disclaimer.html">Full trademark &amp; copyright disclosure</a>.</div>
</div></footer>
<a class="btn btn-gold float-support" href="support.html">&hearts; Support</a>
<div class="mcta"><a class="btn btn-ghost" href="analyzer.html">Score a number</a><a class="btn btn-red" href="desk.html">Prosperity Desk</a></div>
<div class="consent" role="dialog" aria-label="Cookie consent"><b>Cookies &amp; ads</b><p class="small" style="margin:6px 0 10px">We use cookies for ads (Google AdSense) and anonymous analytics that keep the tools free. Choose whether ads may be personalised. <a href="privacy.html">Privacy</a></p><div class="btns"><button class="btn btn-red btn-sm" data-consent="yes">Accept</button><button class="btn btn-ghost btn-sm" data-consent="no">Decline</button></div></div>
<div class="modal" id="exit-modal" role="dialog" aria-modal="true" aria-labelledby="exit-h"><div class="box">
<button class="iconbtn x" aria-label="Close">&times;</button>
<span class="eyebrow">Free download</span><h3 id="exit-h">The 2026–27 Prosperity Calendar</h3>
<p class="small">Every auspicious opening, signing and wedding day for the Fire Horse and Fire Goat years, plus lucky numbers for all 12 signs. Sent to your inbox.</p>
<form class="js-form" data-subject="Lead magnet: 2026-27 Prosperity Calendar" data-ok="Done! Watch your inbox for the calendar.">
<input type="text" name="_honey" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">
<div class="field"><label for="xm-n">First name</label><input id="xm-n" name="name" autocomplete="given-name" required></div>
<div class="field"><label for="xm-e">Email</label><input id="xm-e" type="email" name="email" autocomplete="email" required></div>
<button class="btn btn-red" type="submit" style="width:100%">Send me the calendar</button><div class="form-msg" role="status"></div>
<p class="hint" style="margin-top:8px">No spam. Unsubscribe any time.</p></form></div></div>'''

REPORT_MODAL = '''<div class="modal" id="report-modal" role="dialog" aria-modal="true" aria-labelledby="rep-h"><div class="box">
<button class="iconbtn x" aria-label="Close">&times;</button>
<span class="eyebrow">Full report</span><h3 id="rep-h">Email me the full number report</h3>
<p class="small">A written reading of your number: its meaning, zodiac fit, market tier and better alternatives. A specialist reviews each request.</p>
<form class="js-form" id="report-form" data-subject="Lead: Analyzer full report" data-ok="Request received. Your report will arrive by email.">
<input type="text" name="_honey" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">
<input type="hidden" name="number"><input type="hidden" name="score">
<div class="field"><label for="rp-n">Name</label><input id="rp-n" name="name" autocomplete="name" required></div>
<div class="field"><label for="rp-e">Email</label><input id="rp-e" type="email" name="email" autocomplete="email" required></div>
<div class="field"><label for="rp-u">What is this number for?</label><select id="rp-u" name="use"><option>Phone number</option><option>Car plate</option><option>Address / unit</option><option>Business / price</option><option>Domain / brand</option><option>Other</option></select></div>
<label class="check"><input type="checkbox" name="wants_alternatives" value="yes" checked> Also suggest luckier alternatives I can buy</label>
<button class="btn btn-red mt" type="submit" style="width:100%">Send my report</button><div class="form-msg" role="status"></div></form></div></div>'''

FONTS = ('<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
         '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Noto+Serif:wght@600;800&display=swap" rel="stylesheet">')

LAYOUT_NAV = "".join('<a href="%s"{%% if page.name == "%s" %%} aria-current="page"{%% endif %%}>%s</a>' % (h, h, t) for h, t in NAV)

HEAD_LIQUID = """<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
{%- if page.title contains "06788" %}{% assign full = page.title %}{% else %}{% assign full = page.title | append: " | 06788" %}{% endif %}
{%- if page.name == "index.html" %}{% assign canon = site.url | append: "/" %}{% else %}{% assign canon = site.url | append: "/" | append: page.name %}{% endif %}
{%- assign v = site.time | date: "%Y%m%d%H%M" %}
<title>{{ full | escape }}</title>
<meta name="description" content="{{ page.desc | escape }}">
<link rel="canonical" href="{{ canon }}">{% if page.name == "404.html" %}<meta name="robots" content="noindex">{% endif %}
<meta name="theme-color" content="#B8141F">
<meta property="og:type" content="{% if page.type == 'article' %}article{% else %}website{% endif %}"><meta property="og:site_name" content="06788">
<meta property="og:title" content="{{ full | escape }}"><meta property="og:description" content="{{ page.desc | escape }}">
<meta property="og:url" content="{{ canon }}"><meta property="og:image" content="{{ site.url }}/assets/img/og.svg">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="{{ full | escape }}"><meta name="twitter:description" content="{{ page.desc | escape }}">
<link rel="icon" href="assets/img/icon.svg" type="image/svg+xml"><link rel="apple-touch-icon" href="assets/img/icon.svg"><link rel="manifest" href="manifest.webmanifest">
""" + FONTS + """
<link rel="stylesheet" href="assets/css/site.css?v={{ v }}">
<script>try{var t=localStorage.getItem("theme");if(t)document.documentElement.setAttribute("data-theme",t)}catch(e){}</script>
<script type="application/ld+json">[{"@context":"https://schema.org","@type":"WebSite","name":"06788","url":"https://06788.com/","description":"The Prosperity Number Desk: score, time and value lucky numbers.","potentialAction":{"@type":"SearchAction","target":"https://06788.com/analyzer.html?n={n}","query-input":"required name=n"}},{"@context":"https://schema.org","@type":"Organization","name":"06788.com","url":"https://06788.com/","logo":"https://06788.com/assets/img/icon.svg"}{% if page.type == "article" %},{"@context":"https://schema.org","@type":"Article","headline":{{ page.title | jsonify }},"description":{{ page.desc | jsonify }},"datePublished":"2026-09-28","dateModified":"{{ site.time | date: '%Y-%m-%d' }}","author":{"@type":"Organization","name":"06788 Editorial"},"publisher":{"@type":"Organization","name":"06788.com"},"mainEntityOfPage":"{{ canon }}"}{% endif %}]</script>"""

SCRIPTS_LIQUID = """<script src="assets/js/config.js?v={{ v }}" defer></script>{% if page.extra %}<script src="assets/js/data.js?v={{ v }}" defer></script><script src="assets/js/engine.js?v={{ v }}" defer></script>{% assign ex = page.extra | split: "," %}{% for x in ex %}<script src="assets/js/{{ x | strip }}.js?v={{ v }}" defer></script>{% endfor %}{% endif %}<script src="assets/js/main.js?v={{ v }}" defer></script>"""

def layout():
    hdr = header("__none__").replace("".join('<a href="%s">%s</a>' % (h, t) for h, t in NAV), LAYOUT_NAV)
    return ('<!doctype html>\n<html lang="en"><head>\n' + HEAD_LIQUID + '\n</head><body>\n' + hdr +
            '\n<main id="main">\n{{ content }}\n</main>\n' + FOOTER +
            '\n{% if page.report %}' + REPORT_MODAL + '{% endif %}\n' + SCRIPTS_LIQUID + '\n</body></html>\n')

FM = re.compile(r"\A---\n(.*?)\n---\n", re.S)

def parse(raw):
    m = FM.match(raw); meta, body = {}, raw
    if m:
        body = raw[m.end():]
        for line in m.group(1).splitlines():
            if line.startswith(" ") or ":" not in line: continue
            k, v = line.split(":", 1); meta[k.strip()] = v.strip()
    for k in list(meta):
        if meta[k].startswith("'") and meta[k].endswith("'"): meta[k] = meta[k][1:-1].replace("''", "'")
    return meta, body

def q(v): return "'" + v.replace("'", "''") + "'"

def build():
    """Source of truth: root *.html pages with YAML front matter (title, desc, extra, type, report).
    Writes _layouts/default.html + sitemap.xml, and a local preview in _preview/ rendered with python-liquid.
    GitHub Pages' Jekyll renders the live site from the same layout."""
    import datetime as dt
    from liquid import Environment
    import json as _j
    env = Environment()
    env.add_filter('jsonify', lambda v: _j.dumps(v, ensure_ascii=False))
    lay = layout()
    os.makedirs(os.path.join(ROOT, "_layouts"), exist_ok=True)
    open(os.path.join(ROOT, "_layouts", "default.html"), "w", encoding="utf-8").write(lay)
    os.makedirs(os.path.join(ROOT, "_preview"), exist_ok=True)
    tpl = env.from_string(lay)
    urls = []
    for name in sorted(n for n in os.listdir(ROOT) if n.endswith(".html")):
        raw = open(os.path.join(ROOT, name), encoding="utf-8").read()
        if not FM.match(raw): continue
        meta, body = parse(raw)
        if 'id="analyzer"' in body and not meta.get("report"):
            meta["report"] = "true"
        fm = ["---", "layout: default", "title: " + q(meta["title"]), "desc: " + q(meta["desc"])]
        for k in ("extra", "type", "report"):
            if meta.get(k): fm.append(f"{k}: {meta[k]}")
        open(os.path.join(ROOT, name), "w", encoding="utf-8").write("\n".join(fm + ["---", ""]) + body.lstrip("\n"))
        page = dict(meta, name=name, report=bool(meta.get("report")))
        out = tpl.render(page=page, content=body, site={"url": "https://06788.com", "time": dt.datetime.now()})
        open(os.path.join(ROOT, "_preview", name), "w", encoding="utf-8").write(out)
        if name != "404.html": urls.append(name)
    sm = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for u in urls:
        pr = "1.0" if u == "index.html" else ("0.9" if u in ("analyzer.html", "desk.html", "calendar.html", "zodiac.html") else "0.7")
        sm.append(f"<url><loc>{SITE}{'' if u == 'index.html' else u}</loc><lastmod>{TODAY}</lastmod><priority>{pr}</priority></url>")
    sm.append("</urlset>")
    open(os.path.join(ROOT, "sitemap.xml"), "w").write("\n".join(sm) + "\n")
    print(f"Built {len(urls) + 1} pages (Jekyll sources + _preview/)")

if __name__ == "__main__":
    build()
