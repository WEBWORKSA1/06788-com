# 06788.com — The Prosperity Number Desk

**你·顺·起·发发 — “You rise smoothly into double prosperity.”**
A static, responsive, interactive website for scoring, timing and valuing Chinese lucky numbers. It runs free on GitHub Pages.

## Features
- **Lucky Number Analyzer**: 0–99 prosperity score, digit meanings, 40+ combinations, collector-pattern detection, zodiac match, market tier, share button and PNG share card.
- **Number Dictionary**: digits 0–9, famous combinations, and lucky numbers by occasion.
- **Zodiac & Compatibility**: exact Chinese New Year dates for 1930–2031, 2026 Fire Horse and 2027 Fire Goat outlooks, and the six harmony / trine / clash / harm pairings.
- **Auspicious Date Finder**: Tong Shu Twelve Day Officers and clash animals for 2024–2032. Day pillars are checked against lunar-javascript with 0 mismatches over 3,287 days.
- **Hongbao Calculator** and **Lucky Price Tool**.
- **Prosperity Desk**: a dedicated 3-step lead form (value/sell, buy, date, feng shui, market entry, partnership), plus a quick lead form on the home page, a report-by-email modal, an exit-intent lead magnet and a sticky mobile CTA.
- **Monetisation**: AdSense slots (consent-aware, switched on from config), lite YouTube embeds, advertise/sponsor packages, donations (one-time/monthly, lucky-number tiers), monthly contests with prizes, and a careers page.
- **SEO**: canonical URLs, OG/Twitter tags, JSON-LD (WebSite, Organization, Article, and FAQPage generated automatically from `<details>` blocks), sitemap, robots.txt.
- Dark mode, accessibility (skip link, ARIA, focus states), and a mobile-first layout.

## Configure (`assets/js/config.js`)
| Key | What to set |
|---|---|
| `adsenseClient`, `adSlots` | Your `ca-pub-…` ID and slot IDs. Until they're set, labelled placeholders show. Also update `/ads.txt`. |
| `donate.paypal / stripe / kofi / buymeacoffee` | Payment links. Blank values fall back to the pledge form. |
| `youtubeChannel`, `social` | Channel and social URLs |
| `contestEnds` | End time of the current contest round |

**Forms:** every form posts through FormSubmit's AJAX endpoint to the site inbox. The address is stored obfuscated and assembled at submit time, so it never appears in the page, a link or a mailto. The **first submission triggers a one-time FormSubmit activation email**. Click “Activate” in it once, and every later submission is delivered.

## Edit and build
Pages are the root `*.html` files. Each has a small front-matter header (`title`, `desc`, `extra` for extra JS such as `tools-ui`, `type: article`, `report: true`). The shared `<head>` (SEO, OG, JSON-LD), top bar, header, footer, modals and scripts live in `_layouts/default.html`, which `build.py` generates. GitHub Pages' built-in Jekyll renders the final pages, so nothing else needs building.
```bash
python3 build.py   # regenerate the layout and sitemap, plus a local full preview in _preview/ (needs: pip install python-liquid)
```
**Social image:** `og.svg` is referenced by default. For the best previews on Facebook, X and WhatsApp, upload `assets/img/og.png` (1200×630) and change `og.svg` to `og.png` in `build.py`.

## Deploy (GitHub Pages, free)
Settings → Pages → Source: **Deploy from a branch** → `main` / `(root)`.
**Custom domain:** add a `CNAME` file containing `06788.com`. At your DNS provider, create A records for `@` pointing to 185.199.108.153, 185.199.109.153, 185.199.110.153 and 185.199.111.153, and a CNAME record for `www` pointing to `webworksa1.github.io`. Then tick **Enforce HTTPS**.

## Docs
- `docs/RESEARCH.md`: the meaning of 06788, market data, the 29-site competitive audit and the positioning decision.
- `docs/PROMPT.md`: the phase-wise build prompt (phases 1–8).

## Legal
The site uses “06788” only as a generic numeric string and is not affiliated with any issuer, exchange or brand. See `disclaimer.html`.
