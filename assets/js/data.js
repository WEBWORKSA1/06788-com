/* 06788.com — reference data (digits, combinations, zodiac). Lunar tables generated from lunar-javascript. */
window.DIGITS = {
  "0": { cn: "零", py: "líng", w: 1, tone: "neutral", sound: "你 nǐ (“you”) in number slang; 零 = a clean start", meaning: "Wholeness, a fresh start. In chat slang 0 stands for “you”." },
  "1": { cn: "一", py: "yī", w: 2, tone: "neutral", sound: "要 yào (“want / will”) in combinations", meaning: "Unity and first place. It powers combinations such as 168 and 518." },
  "2": { cn: "二", py: "èr", w: 4, tone: "good", sound: "“Good things come in pairs” (好事成双)", meaning: "Harmony and pairs, which makes it popular for weddings and partnerships." },
  "3": { cn: "三", py: "sān", w: 3, tone: "good", sound: "生 sheng / saang (“life, growth”) in Cantonese", meaning: "Life and growth. Avoided only in phrases where it sounds like 散 (“scatter”)." },
  "4": { cn: "四", py: "sì", w: -10, tone: "bad", sound: "死 sǐ (“death”)", meaning: "The most avoided digit. Many buildings skip 4th, 14th and 24th floors." },
  "5": { cn: "五", py: "wǔ", w: 0, tone: "neutral", sound: "我 wǒ (“me”) or 无 wú (“without”)", meaning: "The five elements and balance. Its luck depends on the digits around it." },
  "6": { cn: "六", py: "liù", w: 7, tone: "good", sound: "流 / 溜 liú (“flow, smooth”)", meaning: "Smooth progress: 六六大顺, “everything goes smoothly.” Loved by businesses." },
  "7": { cn: "七", py: "qī", w: 2, tone: "neutral", sound: "起 qǐ (“rise”) and 齐 qí (“together”)", meaning: "Rising and togetherness. Treated with caution around the Ghost Month (7th lunar month)." },
  "8": { cn: "八", py: "bā", w: 10, tone: "good", sound: "发 fā (“prosper, get rich”)", meaning: "The luckiest digit. The Beijing Olympics opened at 8:08:08 pm on 8/8/2008." },
  "9": { cn: "九", py: "jiǔ", w: 7, tone: "good", sound: "久 jiǔ (“long-lasting”)", meaning: "Longevity and lasting love. Once associated with the emperor." }
};

/* combinations: code → [reading, meaning, score bonus (neg = bad)] */
window.COMBOS = {
  "06788": ["你顺起发发", "“You rise smoothly into double prosperity.” The namesake of this site.", 18],
  "678": ["顺起发", "Smoothly rising into prosperity.", 10],
  "788": ["起发发", "Rise to double prosperity.", 10],
  "6788": ["顺起发发", "Smooth rise, double prosperity.", 14],
  "8888": ["发发发发", "Quadruple prosperity, a collector-grade pattern.", 22],
  "888": ["发发发", "Triple prosperity, used in shop prices and plates.", 16],
  "88": ["发发 / 拜拜", "Double prosperity. In chat it also means “bye-bye.”", 9],
  "168": ["一路发", "“Prosperity all the way.” A top business number.", 14],
  "1688": ["一路发发", "Prosperity all the way, doubled.", 16],
  "518": ["我要发", "“I will prosper.”", 12],
  "158": ["要我发", "“Make me prosper.”", 8],
  "668": ["路路发", "Prosperity on every road.", 12],
  "6688": ["顺顺发发", "Smooth-smooth, prosper-prosper.", 16],
  "688": ["顺发发", "Smooth double prosperity.", 10],
  "868": ["发路发", "Prosperity along the road.", 8],
  "898": ["发久发", "Prosperity that lasts.", 8],
  "998": ["久久发", "Long, long prosperity.", 9],
  "666": ["六六大顺", "Everything goes smoothly. Online it also means “awesome.”", 12],
  "66": ["顺顺", "Smooth and smooth.", 6],
  "99": ["久久", "Forever and ever, a favourite for anniversaries.", 6],
  "999": ["久久久", "Eternity.", 9],
  "28": ["易发", "“Easy prosperity” in Cantonese. HK plate “28” sold for HK$18.1M.", 8],
  "18": ["实发", "“Sure prosperity” in Cantonese. HK plate “18” sold for HK$16.5M.", 8],
  "138": ["一生发", "Prosperity for a lifetime.", 8],
  "520": ["我爱你", "“I love you”. 20 May is China's online Valentine's Day.", 6],
  "521": ["我爱你", "“I love you” (alternate).", 5],
  "1314": ["一生一世", "“One life, one world”, i.e. forever. It contains a 4 but is still positive.", 10],
  "5201314": ["我爱你一生一世", "“I love you forever.”", 14],
  "3344": ["生生世世", "Lifetime after lifetime. The 4s are read positively here.", 8],
  "9420": ["就是爱你", "“It's you I love.”", 4],
  "886": ["拜拜了", "“Bye-bye” in chat slang.", 1],
  "14": ["要死", "Sounds like “going to die.” Avoid it.", -10],
  "24": ["易死", "“Easy death” in Cantonese. Avoid it.", -8],
  "74": ["气死", "“Furious to death.” Avoid it.", -6],
  "54": ["我死", "“I die.” Avoid it.", -8],
  "514": ["我要死", "“I'm going to die.” Avoid it.", -12],
  "748": ["去死吧", "An insult (“go die”). Avoid it.", -12],
  "250": ["二百五", "Slang for a fool. Avoid it on prices and gifts.", -8],
  "38": ["三八", "Slang for a gossip. Mildly negative, except on 8 March (Women's Day).", -3],
  "44": ["死死", "Double death. The least wanted pair.", -12],
  "444": ["死死死", "Triple death.", -18]
};

window.ZODIAC = [
  { k: "rat", e: "🐀", n: "Rat", cn: "鼠", lucky: [2, 3], colors: ["blue", "gold", "green"], trait: "Quick-witted, resourceful, thrifty" },
  { k: "ox", e: "🐂", n: "Ox", cn: "牛", lucky: [1, 4], colors: ["white", "yellow", "green"], trait: "Patient, dependable, methodical" },
  { k: "tiger", e: "🐅", n: "Tiger", cn: "虎", lucky: [1, 3, 4], colors: ["blue", "grey", "orange"], trait: "Brave, competitive, magnetic" },
  { k: "rabbit", e: "🐇", n: "Rabbit", cn: "兔", lucky: [3, 4, 6], colors: ["red", "pink", "purple"], trait: "Gentle, elegant, diplomatic" },
  { k: "dragon", e: "🐉", n: "Dragon", cn: "龙", lucky: [1, 6, 7], colors: ["gold", "silver", "white"], trait: "Ambitious, charismatic, bold" },
  { k: "snake", e: "🐍", n: "Snake", cn: "蛇", lucky: [2, 8, 9], colors: ["black", "red", "yellow"], trait: "Wise, intuitive, strategic" },
  { k: "horse", e: "🐎", n: "Horse", cn: "马", lucky: [2, 3, 7], colors: ["yellow", "green"], trait: "Energetic, free-spirited, fast" },
  { k: "goat", e: "🐐", n: "Goat", cn: "羊", lucky: [3, 4, 9], colors: ["brown", "red", "purple"], trait: "Creative, kind, calm" },
  { k: "monkey", e: "🐒", n: "Monkey", cn: "猴", lucky: [1, 7, 8], colors: ["white", "blue", "gold"], trait: "Clever, playful, inventive" },
  { k: "rooster", e: "🐓", n: "Rooster", cn: "鸡", lucky: [5, 7, 8], colors: ["gold", "brown", "yellow"], trait: "Observant, hard-working, proud" },
  { k: "dog", e: "🐕", n: "Dog", cn: "狗", lucky: [3, 4, 9], colors: ["red", "green", "purple"], trait: "Loyal, honest, protective" },
  { k: "pig", e: "🐖", n: "Pig", cn: "猪", lucky: [2, 5, 8], colors: ["yellow", "grey", "gold"], trait: "Generous, warm, easy-going" }
];
window.STEMS = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
window.BRANCHES = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
window.ELEMENTS = ["Wood", "Wood", "Fire", "Fire", "Earth", "Earth", "Metal", "Metal", "Water", "Water"];
window.CNY={"1930":"1930-01-30","1931":"1931-02-17","1932":"1932-02-06","1933":"1933-01-26","1934":"1934-02-14","1935":"1935-02-04","1936":"1936-01-24","1937":"1937-02-11","1938":"1938-01-31","1939":"1939-02-19","1940":"1940-02-08","1941":"1941-01-27","1942":"1942-02-15","1943":"1943-02-05","1944":"1944-01-25","1945":"1945-02-13","1946":"1946-02-02","1947":"1947-01-22","1948":"1948-02-10","1949":"1949-01-29","1950":"1950-02-17","1951":"1951-02-06","1952":"1952-01-27","1953":"1953-02-14","1954":"1954-02-03","1955":"1955-01-24","1956":"1956-02-12","1957":"1957-01-31","1958":"1958-02-18","1959":"1959-02-08","1960":"1960-01-28","1961":"1961-02-15","1962":"1962-02-05","1963":"1963-01-25","1964":"1964-02-13","1965":"1965-02-02","1966":"1966-01-21","1967":"1967-02-09","1968":"1968-01-30","1969":"1969-02-17","1970":"1970-02-06","1971":"1971-01-27","1972":"1972-02-15","1973":"1973-02-03","1974":"1974-01-23","1975":"1975-02-11","1976":"1976-01-31","1977":"1977-02-18","1978":"1978-02-07","1979":"1979-01-28","1980":"1980-02-16","1981":"1981-02-05","1982":"1982-01-25","1983":"1983-02-13","1984":"1984-02-02","1985":"1985-02-20","1986":"1986-02-09","1987":"1987-01-29","1988":"1988-02-17","1989":"1989-02-06","1990":"1990-01-27","1991":"1991-02-15","1992":"1992-02-04","1993":"1993-01-23","1994":"1994-02-10","1995":"1995-01-31","1996":"1996-02-19","1997":"1997-02-07","1998":"1998-01-28","1999":"1999-02-16","2000":"2000-02-05","2001":"2001-01-24","2002":"2002-02-12","2003":"2003-02-01","2004":"2004-01-22","2005":"2005-02-09","2006":"2006-01-29","2007":"2007-02-18","2008":"2008-02-07","2009":"2009-01-26","2010":"2010-02-14","2011":"2011-02-03","2012":"2012-01-23","2013":"2013-02-10","2014":"2014-01-31","2015":"2015-02-19","2016":"2016-02-08","2017":"2017-01-28","2018":"2018-02-16","2019":"2019-02-05","2020":"2020-01-25","2021":"2021-02-12","2022":"2022-02-01","2023":"2023-01-22","2024":"2024-02-10","2025":"2025-01-29","2026":"2026-02-17","2027":"2027-02-06","2028":"2028-01-26","2029":"2029-02-13","2030":"2030-02-03","2031":"2031-01-23"};
window.JIE={"2024":["1-6","2-4","3-5","4-4","5-5","6-5","7-6","8-7","9-7","10-8","11-7","12-6"],"2025":["1-5","2-3","3-5","4-4","5-5","6-5","7-7","8-7","9-7","10-8","11-7","12-7"],"2026":["1-5","2-4","3-5","4-5","5-5","6-5","7-7","8-7","9-7","10-8","11-7","12-7"],"2027":["1-5","2-4","3-6","4-5","5-6","6-6","7-7","8-8","9-8","10-8","11-7","12-7"],"2028":["1-6","2-4","3-5","4-4","5-5","6-5","7-6","8-7","9-7","10-8","11-7","12-6"],"2029":["1-5","2-3","3-5","4-4","5-5","6-5","7-7","8-7","9-7","10-8","11-7","12-7"],"2030":["1-5","2-4","3-5","4-5","5-5","6-5","7-7","8-7","9-7","10-8","11-7","12-7"],"2031":["1-5","2-4","3-6","4-5","5-6","6-6","7-7","8-8","9-8","10-8","11-7","12-7"],"2032":["1-6","2-4","3-5","4-4","5-5","6-5","7-6","8-7","9-7","10-8","11-7","12-6"]};
