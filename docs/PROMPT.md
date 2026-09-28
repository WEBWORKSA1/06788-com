# Phase-wise build prompt for 06788.com, "The Prosperity Number Desk"

Run the phases in order and hand each one to an AI coding agent or a developer as its own prompt. Every phase must end with a working site that can be deployed.

---

## Global constraints (paste these at the top of every phase)
- Domain: **06788.com**. Read it as 你·顺·起·发发, "You rise smoothly into double prosperity."
- Stack: static HTML, CSS and vanilla JS only. No backend. It must run on the **free GitHub Pages plan** (repo `webworksa1/06788-com`, branch `main`, root folder). Use relative links only, so it works at both `username.github.io/06788-com/` and `06788.com`.
- Every page opens with a top bar: **"Contact, if you are interested in this website / domain name / Sponsorship / Advertisement / Partnership"** linked to `https://web.works/contact`.
- Send every form and contact to one inbox only: **webworksa1@gmail.com**. The address must **never appear in the rendered page, a link label or a mailto**. Store it obfuscated (reversed char codes) in `assets/js/config.js`, assemble it at runtime, and POST through FormSubmit's AJAX endpoint. Include a honeypot, `_subject`, `_template: table` and `_captcha: false`.
- Trademark safety: "06788" is used only as a generic numeric string. No stock tickers, company names or logos, no copyrighted imagery. Include a full Trademark & Copyright disclosure page, and put a short version in every footer.
- Design tokens: Chinese red `#B8141F`, imperial gold `#D4A017`, ink `#1C1917`, rice-paper cream `#FBF7EF`. Serif display type (Noto Serif), sans body (Inter), tabular numerals. Dark mode supported.
- Performance and SEO: Lighthouse score of 90+, semantic HTML, a unique title and description on every page, canonical URL, OG/Twitter tags, JSON-LD (WebSite, FAQPage, Article), sitemap.xml, robots.txt, ads.txt.
- Accessibility: skip link, focus states, ARIA on the tools, AA contrast, respect for reduced motion.

## Phase 1: Foundation and brand shell
1. Create the folder structure: `/assets/css/site.css`, `/assets/js/{config,main,tools}.js`, `/src/pages/*.html` fragments, and `build.py`, which wraps fragments in a shared head, top bar, header, footer and consent banner and writes finished `.html` files to the root.
2. Header: logo (a red seal holding "发") and navigation: Analyzer, Numbers, Zodiac, Lucky Dates, Hongbao, Learn, Videos, Contests, a Support button and a gold **"Prosperity Desk"** CTA. Mobile drawer menu and theme toggle.
3. Footer: Tools, Explore, Work With Us and Legal columns, social links, short trademark disclosure, and a floating **♥ Support** button.
4. Cookie/consent banner with Accept/Decline, stored in localStorage. It gates AdSense personalisation.
5. `config.js` holds the AdSense client ID, slot IDs, donation links (PayPal, Ko-fi, Buy Me a Coffee, Stripe), YouTube channel, social URLs and the obfuscated relay email.

## Phase 2: Core tools (the traffic engine)
1. **Lucky Number Analyzer** (hero on the home page and its own page). Input any digit string: phone, plate, address, price, bank-card tail, date. Output:
   - a 0–100 "Prosperity Score" with a letter grade and an animated gauge
   - the meaning of each digit (colour-coded lucky / neutral / caution)
   - a pair and pattern detector: 88/888/8888, 168 一路发, 518 我要发, 668, 1314, 520, AAAA, ABAB, ABBA, ascending runs, hidden 4 and 14/74 warnings
   - a match against the user's zodiac animal (optional birth-year field)
   - a "Market tier" estimate (Standard / Premium / Golden / Collector)
   - buttons for Share, Download a PNG share card (canvas), Email me the full report (lead capture), and **Value / sell this number** (Prosperity Desk)
2. **Number Meaning Dictionary**: 0–9, 40+ famous combinations, and a lookup for any number with a deep link (`numbers.html?n=168`).
3. **Zodiac Calculator**: accurate Chinese New Year boundaries for 1930–2031, the animal and element, lucky numbers, colours and directions, the 2026 Fire Horse and 2027 Fire Goat outlooks, and a compatibility checker (six harmonies, three harmonies, six clashes).
4. **Auspicious Date Finder** (Tong Shu logic): day stem-branch from the Julian Day Number, month branch from solar-term dates, the Twelve Day Officers (建除满平定执破危成收开闭), the day's clash animal, and an event filter (business opening, wedding, moving, signing, travel). Month grid view.
5. **Hongbao (Red Envelope) Calculator**: relationship × occasion × region × budget produces recommended lucky amounts, avoids 4, and outputs even amounts for weddings. Includes an etiquette table.
6. **Lucky Price Tool** (inside Prosperity for Business): converts a base price into charm-price options ending in 8, 88, 68 or 168.

## Phase 3: Lead generation, the Prosperity Desk (dedicated section and page)
1. Hero promise: "Turn numbers into money and good timing, then talk to a specialist." Add trust badges and a 3-step how-it-works strip.
2. **Multi-step intent form** with a progress bar and a 30-second completion time:
   - Step 1, intent: Value or sell my lucky number · Buy a lucky number (phone/plate/domain) · Pick a lucky date · Feng shui and business naming consult · China-market pricing and marketing · Sponsorship or partnership
   - Step 2, details that change by intent (number, type, region, budget, timeline)
   - Step 3, contact: name, email, optional WhatsApp/WeChat, preferred contact time, consent checkbox
   - Show a success state with a next-steps checklist and share links. Store UTM and referrer parameters in hidden fields.
3. Lead magnets: "2026–27 Prosperity Calendar" by email, and "Full Analyzer Report" by email.
4. Entry points: sticky mobile CTA bar, an in-tool CTA after every result, an exit-intent modal on desktop (once per session), and a home page section.
5. The same form feeds the Advertise, Careers, Contest and Contact pages, each with a different `_subject`.

## Phase 4: Monetisation layer
1. **AdSense**: slots after tool results, inside articles every 3–4 paragraphs, a sticky sidebar on desktop and an anchor on mobile. Load only when a client ID is set and consent is given. Show labelled placeholders in development.
2. **YouTube**: a Videos page of lite embeds (a thumbnail that loads the iframe on click, via youtube-nocookie), a channel subscribe CTA, and video blocks inside guides.
3. **Affiliate and sponsor blocks**: red envelopes, feng shui décor, number marketplaces. All clearly labelled "Sponsored" or "Affiliate".
4. **Advertise page**: audience, placements, packages (Seal / Gold / Imperial), a media-kit request form and sponsorship of tools or contests.

## Phase 5: Community, donations, contests, hiring
1. **Support page**: one-time or monthly toggle, $8 / $18 / $68 / $88 / $168 tiers (all lucky numbers), a custom amount, and a clear "where your money goes" breakdown (operations, promotions and marketing, hiring talent, contest prizes). Payment buttons come from config, with a pledge form as fallback. A supporter wall and an ad-free supporter tier.
2. **Contests page**: a monthly theme ("Luckiest Number Spotted", "Best Hongbao Design", "Prosperity Story"), prize table, countdown timer, entry form, rules and eligibility, past winners, and a prize-sponsor CTA.
3. **Careers page**: open roles (content writer (Chinese culture), video editor, SEO lead, community manager, partnerships), each with a short application form.

## Phase 6: Content and SEO engine
1. Learn hub with cornerstone guides: What 06788 means · Lucky numbers for business and pricing · Hong Kong plate auctions and the price of luck · Red envelope etiquette · Lucky phone numbers · 2026 Fire Horse prosperity guide.
2. Article template: quick-answer box → table of contents → sections → tables → FAQ (FAQPage schema) → related tools → lead CTA.
3. Programmatic expansion: `/number/{n}/`, `/zodiac/{animal}/{year}/`, `/dates/{yyyy}-{mm}/` generated from JSON by `build.py`.
4. Internal links on every tool and article page, plus breadcrumbs.

## Phase 7: Legal, QA and launch
1. Pages: Trademark & Copyright disclosure, Privacy (AdSense and cookies, FormSubmit), Terms, Disclaimer (entertainment, not financial advice), About.
2. QA: HTML validation, test every form end to end (activate FormSubmit on the first submission), check mobile at 360px, confirm the email is absent from the page (`grep`), and a Lighthouse run.
3. Deploy: push to `main`, enable GitHub Pages (Deploy from branch → main / root). For the custom domain, add a `CNAME` file containing `06788.com`, set DNS A records to 185.199.108–111.153, point www via CNAME to `webworksa1.github.io`, and tick Enforce HTTPS.
4. After launch: submit to Google Search Console, apply for AdSense, add the ads.txt publisher line, and connect GA4.

## Phase 8: Growth roadmap (expandable)
- Daily email "Lucky number and colour of the day", with a streaks badge.
- Chinese (简/繁) localisation with hreflang.
- A community Q&A ("Ask the Desk") and a lucky-number marketplace listing board (paid listings).
- Premium PDF reports (Stripe payment links), and an API/embed widget for the analyzer.
