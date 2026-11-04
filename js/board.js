/* Mmaah Menuboard: drei Screens 1080 x 1920. Alle Bewegung hängt an MB.zeit(t), periodisch in 30 s, dadurch nahtlose Schleife und exakte Video Ausgabe.
   Screens laufen über die Weltzeit synchron, auch wenn jeder Screen einen eigenen Player hat. Preise stehen nur in daten.js. */
(function () {
  "use strict";
  var LOOP = 30, AKT = 8, TAKE_AN = 24, TAKE_AUS = 29.1;
  var K = window.MB_KARTE, INFO = window.MB_INFO || {};
  var LOGO = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 509.47 159.71"><use href="#mb-logo"/></svg>';

  function klemm(x, a, b) { return Math.max(a === undefined ? 0 : a, Math.min(b === undefined ? 1 : b, x)); }
  function expoOut(x) { return x >= 1 ? 1 : 1 - Math.pow(2, -10 * x); }
  function backOut(x) { var c = 1.9; x -= 1; return 1 + (c + 1) * x * x * x + c * x * x; }
  function inOut(x) { return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }

  function preis(p) {
    var t = p.toFixed(2).split(".");
    return '<span class="pr"><b style="font-weight:inherit">' + t[0] + ".</b><sup>" + t[1] + "</sup><i>€</i></span>";
  }
  var BLATT = '<path d="M50 6C74 20 86 44 74 68 67 80 58 88 50 94 42 88 33 80 26 68 14 44 26 20 50 6Z" fill="#fff"/><path d="M50 30V92" stroke="currentColor" stroke-width="7" fill="none"/>';
  function zeichen(tag) {
    if (tag === "vegan") return '<svg class="ic" viewBox="0 0 100 100" style="color:#3db11f" aria-label="Vegan"><circle cx="50" cy="50" r="50" fill="#3db11f"/><g transform="translate(20 18) scale(.6)">' + BLATT + "</g></svg>";
    if (tag === "veggie") return '<svg class="ic" viewBox="0 0 100 100" style="color:#a6d98f" aria-label="Veggie"><circle cx="50" cy="50" r="50" fill="#a6d98f"/><g transform="translate(20 18) scale(.6)">' + BLATT + "</g></svg>";
    return '<svg class="ic" viewBox="0 0 100 100" aria-label="Spicy"><path d="M70 8c-6 2-8 8-8 14-22 4-40 26-46 66 26-4 58-22 62-52 4-4 8-8 6-14-6 2-10 2-14-14z" fill="#ff4005" stroke="#fff" stroke-width="5"/></svg>';
  }
  function tagsHtml(t) { return t && t.length ? '<span class="tg">' + t.map(zeichen).join("") + "</span>" : ""; }
  function tagAttr(t) { return ' data-tags="' + (t || []).join(" ") + '"'; }

  function bildHtml(it) {
    if (it.bild) return '<img src="assets/food/' + it.bild + '.webp" alt="" draggable="false">';
    if (it.ill) return '<img class="ill" src="assets/marke/' + it.ill + '" alt="" draggable="false">';
    return "";
  }
  /* Kachel an fester Stelle. groesse: l, m, s. quer: Bild links, Text rechts */
  function kachel(id, x, y, w, h, groesse, quer, zusatz) {
    var it = K[id];
    var pr = it.preise ? it.preise.map(function (r) { return '<span class="zeile"><span class="d" style="font-size:33px">' + r[0] + "</span>" + preis(r[1]) + "</span>"; }).join("") : '<span class="k-preis">' + preis(it.preis) + "</span>";
    return '<button class="kachel k--' + groesse + (quer ? " k--quer" : "") + '" data-id="' + id + '"' + tagAttr(it.tags) + ' style="left:' + x + "px;top:" + y + "px;width:" + w + "px;height:" + h + 'px">'
      + '<span class="k-bild">' + bildHtml(it) + "</span>"
      + '<span class="k-text"><span class="k-name d">' + it.name + tagsHtml(it.tags) + "</span>" + (it.kurz ? '<span class="k-kurz">' + it.kurz + "</span>" : "") + pr + (zusatz || "") + "</span></button>";
  }
  function wellig(farbe) {
    var n = 180, p = [], i, a, r;
    for (i = 0; i < n; i++) { a = i / n * 6.2832; r = 90 * (1 + .058 * Math.sin(9 * a)); p.push((100 + r * Math.cos(a)).toFixed(1) + "," + (100 + r * Math.sin(a)).toFixed(1)); }
    return '<svg viewBox="0 0 200 200" aria-hidden="true"><polygon points="' + p.join(" ") + '" fill="' + farbe + '"/></svg>';
  }
  function siegel(name, p, x, y, gr) {
    return '<div class="siegel" style="left:' + x + "px;top:" + y + "px;width:" + gr + "px;height:" + gr + 'px">' + wellig("#fde233") + '<div><span class="s-name d">' + name + "</span>" + preis(p) + "</div></div>";
  }
  function logoHtml(top) { return '<div class="h-logo" style="top:' + top + 'px">' + LOGO + "</div>"; }
  function legende(y) {
    return '<div class="legende" style="top:' + y + 'px"><span>' + zeichen("vegan") + "Vegan</span><span>" + zeichen("veggie") + "Veggie</span><span>" + zeichen("spicy") + "Spicy</span><span>* Mit Farbstoff</span><span>** Mit Koffein</span><span>*** Mit Farbstoff und Koffein</span></div>";
  }
  function ticker() {
    var teil = '<span><b class="d">Eat Korean since 2012</b><b class="han">먹자</b><b class="d">Bold Korean Flavours</b><b class="han">맛있는</b><b class="d">Mmaah!</b><b class="han">치킨</b></span>';
    return '<div class="ticker"><div class="ticker-spur">' + teil + teil + teil + teil + "</div></div>";
  }

  /* ---------------------------------------------------- Screen 1: Chicken */
  function tv1() {
    var d = window.MB_DIPS;
    var h = '<section class="hero hero--o" style="height:640px">'
      + logoHtml(34)
      + '<h2 class="h-titel d" style="color:#fcfaf7"><span class="fit" data-w="560" style="margin-bottom:12px">Korean</span><span class="fit" data-w="760">Fried Chicken</span></h2>'
      + '<p class="h-unter" style="top:268px;width:320px;color:#fcfaf7">Glasiert mit unserer Signature Soy-Garlic oder Yangnyom (süß-pikant) Sauce.</p>'
      + '<div class="h-akt"><div class="h-bild" style="left:400px;top:34px;width:640px"><canvas data-folge="bucket" data-frames="61" width="1200" height="1200"></canvas></div>' + siegel("Bucket, 21 Stk.", 17.9, 34, 396, 232) + "</div>"
      + '<div class="h-akt"><div class="h-bild" style="left:340px;top:256px;width:720px"><img src="assets/food/korean-fried-chicken-7st.webp" alt=""></div>' + siegel("Boneless Bites", 6.9, 34, 396, 232) + "</div>"
      + '<div class="h-akt"><div class="h-bild" style="left:340px;top:250px;width:720px"><img src="assets/food/bbq-wings.webp" alt=""></div>' + siegel("BBQ Wings", 6.9, 34, 396, 232) + "</div>"
      + "</section>";
    h += kachel("bites", 36, 652, 492, 418, "l");
    h += kachel("wings", 552, 652, 492, 418, "l");
    h += '<div class="ber" style="top:1076px"><span class="pille d">Chicken &amp; Fries</span></div>';
    h += kachel("bitesfries", 36, 1128, 492, 230, "m", true);
    h += kachel("wingsfries", 552, 1128, 492, 230, "m", true);
    h += '<div class="ber" style="top:1362px"><span class="pille d">Bucket<small>Serviert mit 2 Extra Dips deiner Wahl</small></span></div>';
    h += kachel("bucketbites", 36, 1414, 320, 276, "m");
    h += kachel("bucketwings", 380, 1414, 320, 276, "m");
    h += kachel("bucketmixed", 724, 1414, 320, 276, "m");
    h += '<div class="dips" style="top:1696px;height:104px"><span class="d d-t">Dips</span>' + preis(d.preis) + "<ul>" + d.liste.map(function (x) { return "<li" + tagAttr(x[1]) + ">" + x[0] + tagsHtml(x[1]) + (x[2] ? "<small>" + x[2] + "</small>" : "") + "</li>"; }).join("") + "</ul></div>";
    return h + legende(1810) + ticker();
  }

  /* ---------------------------------------------------- Screen 2: Reis und Fries */
  function tv2() {
    var h = '<section class="hero hero--b" style="height:520px">'
      + logoHtml(34)
      + '<h2 class="h-titel d" style="color:#fcfaf7"><span class="fit" data-w="720" style="margin-bottom:12px">Korean Dishes</span><span class="fit" data-w="430">On Rice</span></h2>'
      + '<p class="h-unter" style="top:268px;width:360px;color:#fcfaf7">Unsere koreanischen Lieblingsgerichte, serviert auf Reis mit koreanischem Krautsalat.</p>'
      + '<div class="h-akt"><div class="h-bild" style="left:380px;top:64px;width:640px"><canvas data-folge="dreh" data-frames="121" width="1200" height="1200"></canvas></div>' + siegel("Bul Gogi", 10.5, 824, 300, 216) + "</div>"
      + '<div class="h-akt"><div class="h-bild" style="left:400px;top:196px;width:580px"><img src="assets/food/bulgogi-beef.webp" alt=""></div>' + siegel("BBQ Mix", 10.9, 824, 300, 216) + "</div>"
      + '<div class="h-akt"><div class="h-bild" style="left:400px;top:196px;width:580px"><img src="assets/food/plantbased-bbq-rice.webp" alt=""></div>' + siegel("Plantbased", 8.5, 824, 300, 216) + "</div>"
      + "</section>";
    h += '<div class="ber" style="top:532px"><span class="pille d">Fleischgerichte</span></div>';
    [["bulgogi", 0, 0], ["chibap", 1, 0], ["bbqmix", 2, 0], ["hotgogi", 0, 1], ["galbi", 1, 1], ["katsu", 2, 1]].forEach(function (r) {
      h += kachel(r[0], 36 + r[1] * 340, 580 + r[2] * 262, 328, 256, "m");
    });
    h += '<div class="ber" style="top:1106px"><span class="pille d pille--b">Vegane Gerichte</span></div>';
    h += '<div class="ber" style="top:1106px;left:716px"><span class="pille d pille--g">Kids Meal</span></div>';
    h += kachel("mandubap", 36, 1152, 328, 244, "m");
    h += kachel("plantbased", 376, 1152, 328, 244, "m");
    h += kachel("kids", 716, 1152, 328, 244, "m");
    h += '<div class="ber" style="top:1402px"><span class="pille d">Korean BBQ Fries</span><span style="font-size:23px;margin-left:16px">Koreanisches BBQ auf knusprigen Pommes</span></div>';
    [["gangnam", 0], ["hongdae", 1], ["busan", 2], ["seoul", 3]].forEach(function (r) { h += kachel(r[0], 36 + r[1] * 254, 1450, 244, 354, "s k--mitkurz"); });
    return h + legende(1810) + ticker();
  }

  /* ---------------------------------------------------- Screen 3: Drinks, Snacks, Sides, Dessert */
  function reihe(id) {
    var it = K[id];
    return '<button class="reihe" data-id="' + id + '"' + tagAttr(it.tags) + '><span><span class="r-name d">' + it.name + '</span><span class="r-kurz">' + it.kurz + "</span></span><span>" + preis(it.preis) + '<span class="r-menge">' + it.menge + "</span></span></button>";
  }
  function tv3() {
    var h = '<section class="hero hero--g" style="height:660px">'
      + logoHtml(34)
      + '<h2 class="h-titel d" style="color:#4f0423;display:flex;align-items:flex-end;gap:22px"><span class="fit" data-w="430">Drinks</span><span class="han" style="font-size:96px;color:#3b8bff;line-height:.86">상큼</span></h2>'
      + '<div class="liste" style="top:156px">' + reihe("lemonade") + reihe("ksoft") + reihe("soft") + reihe("americano") + reihe("wasser") + '<p style="font-size:21px;margin-top:2px;font-weight:600">Preis inkl. Pfand.</p></div>'
      + '<div class="h-akt"><div class="h-bild" style="left:670px;top:120px;width:380px"><img src="assets/food/bluelemonade.webp" alt=""></div>' + siegel("Blue Lemonade", 3.9, 836, 442, 212) + "</div>"
      + '<div class="h-akt"><div class="h-bild" style="left:670px;top:120px;width:380px"><img src="assets/food/mango-passion-ade.webp" alt=""></div>' + siegel("Mango Passion", 3.9, 836, 442, 212) + "</div>"
      + '<div class="h-akt"><div class="h-bild" style="left:670px;top:120px;width:380px"><img src="assets/food/blueberry-ade.webp" alt=""></div>' + siegel("Blueberry Ade", 3.9, 836, 442, 212) + "</div>"
      + "</section>";
    h += '<div class="ber" style="top:672px"><span class="pille d pille--b">Snacks<small>Mandu und Kimchi Pancakes je 4 Stk.</small></span></div>';
    [["mandubeef", 0], ["manduveggie", 1], ["mandukimchi", 2], ["kcheese", 3], ["kimchipan", 4]].forEach(function (r) { h += kachel(r[0], 36 + r[1] * 203, 720, 196, 330, "s"); });
    h += '<div class="ber" style="top:1058px"><span class="pille d pille--b">Sides</span></div>';
    [["kfries", 0], ["coleslaw", 1], ["reis", 2], ["radish", 3]].forEach(function (r) { h += kachel(r[0], 36 + r[1] * 254, 1106, 244, 288, "s"); });
    h += '<div class="ber" style="top:1402px"><span class="pille d pille--b">Dessert</span></div>';
    [["pancake", 0], ["melona", 1], ["pepero", 2]].forEach(function (r) { h += kachel(r[0], 36 + r[1] * 340, 1450, 328, 354, "m"); });
    return h + legende(1810) + ticker();
  }

  function takeHtml(nr) {
    var inhalt = nr === 1
      ? '<span class="fit d" data-w="1000" style="color:#000">Eat</span><span class="fit d" data-w="1000" style="color:#000">Korean</span>'
      : nr === 2
        ? '<span class="fit han" data-w="980" style="color:#000;line-height:.9">먹자</span><img src="assets/marke/ill_zunge.svg" alt="" style="width:980px;margin-top:-90px;position:relative">'
        : '<span class="fit d" data-w="1000" style="color:#000">Since</span><span class="fit d" data-w="1000" style="color:#000">2012</span><div style="width:560px;margin-top:40px">' + LOGO + "</div>";
    return '<div class="take"><div class="t-mitte">' + inhalt + "</div></div>";
  }
  /* Essen fliegt über alle drei Screens, Koordinaten gelten für die gesamte Wand */
  var FLUG = [
    { bild: "banner-bites", w: 760, x0: -700, y0: 1500, x1: 3400, y1: -700, t0: 24.5, t1: 27.6, rot: 40 },
    { bild: "flug-schale", w: 900, x0: 3500, y0: 1650, x1: -900, y1: 200, t0: 25.4, t1: 28.7, rot: -30 },
    { bild: "flug-drink", w: 520, x0: 700, y0: -900, x1: 2500, y1: 2300, t0: 26.1, t1: 28.9, rot: 60 }
  ];

  /* ---------------------------------------------------- Bildfolge */
  function Folge(c, art) {
    this.c = c; this.x = c.getContext("2d"); this.n = +c.dataset.frames; this.name = c.dataset.folge; this.art = art;
    this.b = new Array(this.n); this.ist = -1; this.ziel = 0;
    c.width = c.height = art === "d" ? 1200 : 720;
  }
  Folge.prototype.lade = function (i) {
    var s = this;
    if (s.b[i]) return s.b[i].p;
    var im = new Image(); s.b[i] = im;
    im.p = new Promise(function (ok) { im.onload = function () { im.fertig = true; if (i === s.ziel) s.zeichne(); ok(); }; im.onerror = ok; });
    im.src = "assets/seq/" + s.name + "/" + s.art + "/" + ("00" + i).slice(-3) + ".webp";
    return im.p;
  };
  Folge.prototype.alle = function () {
    var s = this, reihe = [], sp, i;
    for (sp = 8; sp >= 1; sp >>= 1) for (i = 0; i < s.n; i += sp) if (reihe.indexOf(i) < 0) reihe.push(i);
    var offen = reihe.slice();
    function n() { if (!offen.length) return Promise.resolve(); return s.lade(offen.shift()).then(n); }
    return Promise.all([n(), n(), n(), n(), n(), n()]);
  };
  Folge.prototype.setze = function (p) { this.ziel = Math.round(klemm(p) * (this.n - 1)); this.zeichne(); };
  Folge.prototype.zeichne = function () {
    var i = this.ziel, d, im;
    for (d = 0; d < this.n; d++) {
      var a = this.b[i - d], z = this.b[i + d];
      if (a && a.fertig) { i -= d; break; }
      if (z && z.fertig) { i += d; break; }
    }
    im = this.b[i];
    if (!im || !im.fertig || i === this.ist) return;
    this.ist = i;
    this.x.clearRect(0, 0, this.c.width, this.c.height);
    this.x.drawImage(im, 0, 0, this.c.width, this.c.height);
  };

  /* ---------------------------------------------------- Screen */
  var cv = document.createElement("canvas").getContext("2d");
  function passe(el) {
    var w = +el.dataset.w, han = el.classList.contains("han");
    cv.font = (han ? "" : "900 ") + "200px " + (han ? '"MB Han"' : '"MB Display"');
    cv.letterSpacing = han ? "0px" : (-.014 * 200) + "px";
    var t = han ? el.textContent : el.textContent.toUpperCase();
    var m = cv.measureText(t), ink = m.actualBoundingBoxLeft + m.actualBoundingBoxRight;
    el.style.fontSize = (200 * w / ink).toFixed(2) + "px";
  }
  function Board(host, nr, opt) {
    opt = opt || {};
    this.nr = nr; this.el = host; this.art = opt.art || "d";
    host.classList.add("tv");
    host.innerHTML = (nr === 1 ? tv1() : nr === 2 ? tv2() : tv3()) + takeHtml(nr)
      + FLUG.map(function (f) { return '<div class="flug' + (f.bild === "banner-bites" ? " flug--maske" : "") + '" style="width:' + f.w + 'px"><img src="assets/food/' + f.bild + '.webp" alt=""></div>'; }).join("")
      + '<div class="detail"></div>';
    var s = this;
    this.akte = [].slice.call(host.querySelectorAll(".h-akt"));
    this.kacheln = [].slice.call(host.querySelectorAll(".kachel"));
    this.take = host.querySelector(".take");
    this.takeMitte = host.querySelector(".t-mitte");
    this.flug = [].slice.call(host.querySelectorAll(".flug"));
    this.spur = host.querySelector(".ticker-spur");
    this.detail = host.querySelector(".detail");
    this.folgen = [].slice.call(host.querySelectorAll("canvas[data-folge]")).map(function (c) { return new Folge(c, s.art); });
    this.teilchen = [];
    var hero = host.querySelector(".hero");
    for (var i = 0; i < (nr === 3 ? 12 : 16); i++) {
      var p = document.createElement("i"); p.className = "teilchen";
      var gr = nr === 3 ? 7 + (i * 37 % 11) : 7 + (i * 37 % 6);
      p.style.cssText = "width:" + gr + "px;height:" + (nr === 3 ? gr : gr * 1.7) + "px;background:" + (nr === 3 ? "rgba(59,139,255,.7)" : "#fcfaf7") + ";left:0;top:0";
      hero.appendChild(p); this.teilchen.push({ el: p, x: nr === 3 ? 690 + (i * 151 % 360) : 430 + (i * 151 % 620), v: 34 + (i * 53 % 70), ph: i * .61 });
    }
    host.addEventListener("click", function (e) {
      var zu = e.target.closest(".d-zu");
      if (zu || e.target === s.detail) { s.schliesse(); return; }
      var k = e.target.closest("[data-id]");
      if (k) s.zeige(k.dataset.id);
    });
    this.letzteKachel = null;
  }
  Board.prototype.passen = function () { [].forEach.call(this.el.querySelectorAll(".fit"), passe); };
  Board.prototype.laden = function () {
    var ps = this.folgen.map(function (f) { return f.alle(); });
    [].forEach.call(this.el.querySelectorAll("img"), function (im) { ps.push(im.decode ? im.decode().catch(function () {}) : Promise.resolve()); });
    return Promise.all(ps);
  };
  Board.prototype.render = function (t) {
    var s = this, nr = this.nr;
    t = ((t % LOOP) + LOOP) % LOOP;

    /* Hero: drei Akte */
    var ai = Math.min(2, Math.floor(t / AKT)), lok = t - ai * AKT;
    this.akte.forEach(function (a, i) {
      var an = t < TAKE_AUS + 1 && i === ai;
      a.style.visibility = an ? "visible" : "hidden";
      if (!an) return;
      var ein = expoOut(klemm(lok / .9)), aus = inOut(klemm((lok - AKT + .55) / .55));
      var bild = a.querySelector(".h-bild"), sg = a.querySelector(".siegel");
      bild.style.transform = "translateY(" + ((1 - ein) * 120 - aus * 60).toFixed(1) + "px) scale(" + (.86 + .14 * ein + (lok / AKT) * .035).toFixed(4) + ")";
      bild.style.opacity = (ein * (1 - aus)).toFixed(3);
      var pop = backOut(klemm((lok - .35) / .55));
      sg.style.transform = "scale(" + (Math.max(0, pop) * (1 - aus)).toFixed(3) + ") rotate(" + (-8 + Math.sin(lok * 1.6) * 3).toFixed(2) + "deg)";
    });
    /* Echtes Video als Bildfolge: Bucket füllt sich in den ersten 3,4 s, Bul Gogi dreht sich in 8 s einmal */
    this.folgen.forEach(function (f) {
      if (ai !== 0) return;
      f.setze(f.name === "bucket" ? klemm(lok / 3.4) : lok / AKT);
    });

    /* Kleine Teilchen im Hero */
    this.teilchen.forEach(function (p) {
      var hh = nr === 1 ? 640 : nr === 2 ? 520 : 660, y = hh + 30 - ((t * p.v + p.ph * 300) % (hh + 60)), x = p.x + Math.sin(t * .9 + p.ph * 5) * 26;
      p.el.style.transform = "translate(" + x.toFixed(1) + "px," + y.toFixed(1) + "px) rotate(" + ((t * 40 + p.ph * 90) % 360).toFixed(0) + "deg)";
      p.el.style.opacity = (.75 * klemm(y / 60) * klemm((hh - y) / 80)).toFixed(3);
    });

    /* Spotlight: jede Kachel kommt der Reihe nach kurz nach vorn */
    var sp = 1.15, n = this.kacheln.length, wer = Math.floor(t / sp) % n, q = (t % sp) / sp, st = Math.sin(q * Math.PI);
    if (this.letzteKachel !== null && this.letzteKachel !== wer) {
      var alt = this.kacheln[this.letzteKachel];
      alt.querySelector(".k-bild").style.transform = "";
      var ap = alt.querySelector(".k-preis, .zeile"); if (ap) ap.style.transform = "";
    }
    this.letzteKachel = wer;
    var kk = this.kacheln[wer];
    if (kk) {
      kk.querySelector(".k-bild").style.transform = "translateY(" + (-14 * st).toFixed(1) + "px) scale(" + (1 + .085 * st).toFixed(4) + ")";
      var kp = kk.querySelector(".k-preis"); if (kp) kp.style.transform = "scale(" + (1 + .14 * st).toFixed(4) + ")";
    }

    /* Laufband läuft über alle drei Screens als ein Band */
    this.spur.style.transform = "translateX(" + (-((t / LOOP) * 2160 % 2160) - (nr - 1) * 1080 % 2160).toFixed(1) + "px)";

    /* Übergreifende Animation */
    var v = (nr - 1) * .12, ein = inOut(klemm((t - TAKE_AN - v) / .6)), raus = inOut(klemm((t - TAKE_AUS - v) / .6));
    var y = ein < 1 ? (1 - ein) * 100 : -raus * 100;
    this.take.style.visibility = (ein > 0 && raus < 1) ? "visible" : "hidden";
    this.take.style.transform = "translateY(" + y.toFixed(2) + "%)";
    if (this.takeMitte) this.takeMitte.style.transform = "scale(" + (1.07 - .07 * expoOut(klemm((t - TAKE_AN - v) / 2.2))).toFixed(4) + ")";
    this.flug.forEach(function (el, i) {
      var f = FLUG[i], p = (t - f.t0) / (f.t1 - f.t0);
      if (p <= 0 || p >= 1) { el.style.visibility = "hidden"; return; }
      el.style.visibility = "visible";
      el.style.transform = "translate(" + (f.x0 + (f.x1 - f.x0) * p - (nr - 1) * 1080).toFixed(1) + "px," + (f.y0 + (f.y1 - f.y0) * p).toFixed(1) + "px) rotate(" + (f.rot * p).toFixed(1) + "deg)";
    });
  };
  Board.prototype.filter = function (tag) {
    this.el.classList.toggle("gefiltert", !!tag);
    [].forEach.call(this.el.querySelectorAll("[data-tags]"), function (e) {
      e.classList.toggle("treffer", !!tag && (" " + e.dataset.tags + " ").indexOf(" " + tag + " ") > -1);
    });
  };
  Board.prototype.zeige = function (id) {
    var it = K[id], s = this, inf = (it.w && INFO[it.w]) || {};
    var pr = it.preise ? it.preise.map(function (r) { return "<div><small>" + r[0] + "</small>" + preis(r[1]) + "</div>"; }).join("") : "<div>" + (it.menge ? "<small>" + it.menge + "</small>" : "") + preis(it.preis) + "</div>";
    var al = inf.allergene && inf.allergene.length ? '<p class="d-al">Allergene: ' + inf.allergene.join(", ") + "</p>" : '<p class="d-al">Alle Allergene findest du in der Allergenliste im Store.</p>';
    this.detail.innerHTML = '<button class="d-zu" aria-label="Schließen">×</button><div class="d-bild">' + bildHtml(it) + '</div><h3 class="d">' + it.name + tagsHtml(it.tags) + '</h3><div class="d-preise">' + pr + "</div><p>" + (inf.text || it.kurz || "") + "</p>" + al;
    this.detail.classList.add("an");
    clearTimeout(this.tz);
    this.tz = setTimeout(function () { s.schliesse(); }, 12000);
  };
  Board.prototype.schliesse = function () { this.detail.classList.remove("an"); clearTimeout(this.tz); };

  function logoSymbol(svgText) {
    var host = document.createElement("div");
    host.style.cssText = "position:absolute;width:0;height:0;overflow:hidden";
    var inner = svgText.replace(/<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");
    host.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg"><symbol id="mb-logo" viewBox="0 0 509.47 159.71">' + inner + "</symbol></svg>";
    document.body.appendChild(host);
  }

  window.MB = {
    LOOP: LOOP, boards: [],
    start: function (hosts, opt) {
      var self = this;
      return fetch("assets/marke/logo.svg").then(function (r) { return r.text(); }).then(function (svg) {
        logoSymbol(svg);
        return Promise.all([document.fonts.load('900 100px "MB Display"'), document.fonts.load('500 100px "MB Text"'), document.fonts.load('100px "MB Han"', "먹자")]);
      }).then(function () {
        self.boards = hosts.map(function (h, i) { return new Board(h.el || h, h.nr || i + 1, opt); });
        self.boards.forEach(function (b) { b.passen(); });
        return self.boards;
      });
    },
    zeit: function (t) { this.boards.forEach(function (b) { b.render(t); }); },
    filter: function (tag) { this.boards.forEach(function (b) { b.filter(tag); }); },
    laden: function () { return Promise.all(this.boards.map(function (b) { return b.laden(); })); }
  };
})();
