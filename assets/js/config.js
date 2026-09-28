/* 06788.com site configuration — edit values here, no other file needs changing. */
window.SITE = {
  name: "06788",
  url: "https://06788.com/",
  contactHub: "https://web.works/contact",

  /* Google AdSense — paste your publisher ID (ca-pub-XXXXXXXXXXXXXXXX) to switch ads on.
     Until then, labelled placeholders show where ads will render. Also update /ads.txt. */
  adsenseClient: "",
  adSlots: { inContent: "", afterTool: "", sidebar: "", footer: "" },

  /* Donation / payment links. Leave "" to fall back to the pledge form (routes to the site inbox). */
  donate: {
    paypal: "",      // e.g. https://paypal.me/yourname
    kofi: "",        // e.g. https://ko-fi.com/yourname
    buymeacoffee: "",// e.g. https://buymeacoffee.com/yourname
    stripe: ""       // e.g. https://buy.stripe.com/xxxx
  },

  youtubeChannel: "https://www.youtube.com/results?search_query=chinese+lucky+numbers",
  social: {
    youtube: "https://www.youtube.com/results?search_query=chinese+lucky+numbers",
    x: "https://x.com/search?q=%2306788",
    instagram: "https://www.instagram.com/explore/tags/luckynumbers/",
    tiktok: "https://www.tiktok.com/tag/luckynumber",
    whatsapp: ""
  },

  /* Contest schedule (end of current round, ISO). */
  contestEnds: "2026-10-31T23:59:59+08:00"
};

/* Form relay. The inbox address is stored obfuscated and assembled only at submit time.
   It is never written into the page, a link, or a mailto. */
(function () {
  var k = [116,118,106,53,115,112,104,116,110,71,56,104,122,114,121,118,126,105,108,126];
  window.__relay = function () {
    return k.map(function (c) { return String.fromCharCode(c - 7); }).reverse().join("");
  };
})();
