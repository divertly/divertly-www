// Interactive selection-method explorer for the Platform page.
(function () {
  var list = document.getElementById("lab-list");
  var panel = document.getElementById("lab-panel");
  if (!list || !panel) return;

  var ACME = "acme.dev";
  var MATCH_NOTE = "The first target whose pattern matches the visitor's value gets the visit.";

  var M = {
    weighted: {
      name: "Weighted", all: true, mode: "dist", strategy: "weighted",
      blurb: "Give each target a share. Weights are relative, so 90 and 10 sends nine visitors in ten to the first target. Turn on sticky routing and a returning visitor keeps the target they got.",
      targets: [{ url: ACME + "/v2", w: 90 }, { url: ACME + "/v3-canary", w: 10 }]
    },
    random: {
      name: "Random", all: true, mode: "dist", strategy: "random",
      blurb: "Every target has the same chance on every request. Add a target and everyone's share shrinks to match.",
      targets: [{ url: ACME + "/a", w: 1 }, { url: ACME + "/b", w: 1 }, { url: ACME + "/c", w: 1 }]
    },
    country: {
      name: "Country", strategy: "country", signal: "Country", how: "Looked up from the visitor's IP address.",
      visitors: [{ l: "United States", v: "US" }, { l: "Germany", v: "DE" }, { l: "Brazil", v: "BR" }, { l: "Japan", v: "JP" }],
      targets: [{ sel: "^US$", url: ACME + "/us" }, { sel: "^(DE|FR|ES|IT)$", url: ACME + "/eu" }], fallback: ACME + "/global"
    },
    language: {
      name: "Language", strategy: "language", signal: "Accept-Language", how: "Read from the language list the visitor's browser sends.",
      visitors: [{ l: "Spanish (Mexico)", v: "es-MX,es;q=0.9" }, { l: "German", v: "de-DE,de;q=0.8" }, { l: "English (US)", v: "en-US,en;q=0.9" }],
      targets: [{ sel: "^es", url: ACME + "/es" }, { sel: "^de", url: ACME + "/de" }], fallback: ACME + "/en"
    },
    device: {
      name: "Device type", strategy: "device_type", signal: "Device type", how: "Worked out from the visitor's user agent.",
      visitors: [{ l: "Phone", v: "mobile" }, { l: "Laptop", v: "desktop" }, { l: "Tablet", v: "tablet" }],
      targets: [{ sel: "^mobile$", url: "m." + ACME }, { sel: "^desktop$", url: "app." + ACME }], fallback: "app." + ACME
    },
    browser: {
      name: "Browser type", strategy: "browser_make", signal: "Browser", how: "Worked out from the visitor's user agent.",
      visitors: [{ l: "Chrome", v: "Chrome" }, { l: "Safari", v: "Safari" }, { l: "Firefox", v: "Firefox" }],
      targets: [{ sel: "^Chrome$", url: ACME + "/modern" }, { sel: "^Safari$", url: ACME + "/safari" }], fallback: ACME + "/standard"
    },
    os: {
      name: "Operating system", strategy: "os", signal: "Operating system", how: "Worked out from the visitor's user agent.",
      visitors: [{ l: "iPhone", v: "iOS" }, { l: "Pixel", v: "Android" }, { l: "Windows PC", v: "Windows" }],
      targets: [{ sel: "^iOS$", url: "apps.apple.com/…" }, { sel: "^Android$", url: "play.google.com/…" }], fallback: ACME + "/download"
    },
    header: {
      name: "HTTP header", strategy: "header", selector: "x-tier", signal: "x-tier header", how: "The value of whichever request header you name. No header means no match.",
      visitors: [{ l: "x-tier: pro", v: "pro" }, { l: "x-tier: team", v: "team" }, { l: "No header", v: "" }],
      targets: [{ sel: "^pro$", url: ACME + "/pro" }, { sel: "^team$", url: ACME + "/team" }], fallback: ACME + "/standard"
    },
    query: {
      name: "Query parameter", strategy: "query_string", selector: "ref", signal: "?ref= parameter", how: "The value of whichever query parameter you name. No parameter means no match.",
      visitors: [{ l: "?ref=ad", v: "ad" }, { l: "?ref=email", v: "email" }, { l: "No ref", v: "" }],
      targets: [{ sel: "^ad$", url: ACME + "/landing-ads" }, { sel: "^email$", url: ACME + "/landing-email" }], fallback: ACME + "/home"
    },
    ua: {
      name: "User agent", strategy: "user_agent", signal: "User-Agent", how: "The full user-agent string the client sends.",
      visitors: [{ l: "curl", v: "curl/8.4.0" }, { l: "Googlebot", v: "Googlebot/2.1" }, { l: "iPhone Safari", v: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0) Safari/604.1" }],
      targets: [{ sel: "curl", url: "api." + ACME + "/raw" }, { sel: "Googlebot", url: ACME + "/static" }], fallback: "app." + ACME
    },
    human: {
      name: "Human vs bot", strategy: "human", mode: "label", signal: "Human or bot", how: "We classify each request. Targets are labeled human, bot, or any.",
      visitors: [{ l: "A person", v: "human" }, { l: "A crawler", v: "bot" }],
      targets: [{ sel: "human", url: "app." + ACME }, { sel: "bot", url: ACME + "/static" }], fallback: "app." + ACME
    },
    cidr: {
      name: "CIDR range", strategy: "ip_cidr", mode: "cidr", signal: "Source IP", how: "The visitor's IP address, checked against single addresses or ranges.",
      visitors: [{ l: "Office", v: "10.4.2.17" }, { l: "Partner", v: "203.0.113.50" }, { l: "Everyone else", v: "198.51.100.9" }],
      targets: [{ sel: "10.0.0.0/8", url: "intranet." + ACME }, { sel: "203.0.113.0/24", url: "partners." + ACME }], fallback: "www." + ACME
    }
  };

  function ipToInt(ip) {
    var p = ip.split(".");
    return ((+p[0] << 24) >>> 0) + (+p[1] << 16) + (+p[2] << 8) + +p[3];
  }
  function inCidr(ip, cidr) {
    var parts = cidr.split("/"), bits = parts.length > 1 ? +parts[1] : 32;
    var mask = bits === 0 ? 0 : (~0 << (32 - bits)) >>> 0;
    return (ipToInt(ip) & mask) >>> 0 === (ipToInt(parts[0]) & mask) >>> 0;
  }
  function matches(m, sel, v) {
    if (m.mode === "cidr") return inCidr(v, sel);
    if (m.mode === "label") return sel === v || sel === "any";
    if (v === "") return false;
    try { return new RegExp(sel).test(v); } catch (e) { return false; }
  }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  var current = null, tally = null, timer = null;

  function planTag(m) {
    var t = el("span", "plan-tag" + (m.all ? " all" : ""));
    if (!m.all) { var i = el("i", "bi bi-lock-fill"); t.appendChild(i); t.appendChild(document.createTextNode(" Paid plans")); }
    else t.textContent = "All plans";
    return t;
  }

  function configText(m) {
    var out = ['{ "targetStrategy": "' + m.strategy + '"' + (m.selector ? ', "targetStrategySelector": "' + m.selector + '"' : "") + " }", ""];
    m.targets.forEach(function (t) {
      if (m.mode === "dist") out.push((m.strategy === "weighted" ? '{ "weight": ' + t.w + " }" : "{ }") + "  →  " + t.url);
      else out.push('{ "selectorValue": "' + t.sel + '" }  →  ' + t.url);
    });
    if (m.fallback) out.push("", "no match  →  default target (" + m.fallback + ")");
    return out.join("\n");
  }

  function renderMatchSim(m) {
    var wrap = el("div", "lp-sim");
    var left = el("div", "lp-visitor");
    left.appendChild(el("p", "lp-label", "Try a visitor"));
    var chips = el("div", "lp-chips");
    var signal = el("div", "lp-signal");
    var rows = [];
    var tgtBox = el("div", "lp-targets");
    tgtBox.appendChild(el("p", "lp-label", "Targets, checked in order"));
    m.targets.forEach(function (t) {
      var r = el("div", "lp-target");
      r.appendChild(el("code", "lp-sel", t.sel));
      r.appendChild(el("span", "lp-url", t.url));
      tgtBox.appendChild(r); rows.push(r);
    });
    var fb = el("div", "lp-target fb");
    fb.appendChild(el("code", "lp-sel", "no match"));
    fb.appendChild(el("span", "lp-url", m.fallback));
    tgtBox.appendChild(fb); rows.push(fb);

    function pick(i) {
      var v = m.visitors[i];
      Array.prototype.forEach.call(chips.children, function (c, k) { c.classList.toggle("on", k === i); });
      signal.textContent = "";
      signal.appendChild(el("span", "k", m.signal));
      signal.appendChild(document.createTextNode(" = "));
      signal.appendChild(el("code", null, v.v === "" ? "(empty)" : v.v));
      var hit = -1;
      for (var k = 0; k < m.targets.length; k++) { if (matches(m, m.targets[k].sel, v.v)) { hit = k; break; } }
      if (hit < 0) hit = m.targets.length;
      rows.forEach(function (r, k) { r.classList.toggle("hit", k === hit); r.classList.toggle("dim", k !== hit); });
    }
    m.visitors.forEach(function (v, i) {
      var b = el("button", "lp-chip", v.l); b.type = "button";
      b.addEventListener("click", function () { pick(i); });
      chips.appendChild(b);
    });
    left.appendChild(chips); left.appendChild(signal); left.appendChild(el("p", "lp-how", m.how));
    wrap.appendChild(left); wrap.appendChild(el("div", "lp-arrow")); wrap.appendChild(tgtBox);
    pick(0);
    return wrap;
  }

  function renderDistSim(m) {
    var wrap = el("div", "lp-sim dist");
    var total = m.targets.reduce(function (a, t) { return a + t.w; }, 0);
    var bars = [], counts = m.targets.map(function () { return 0; }), sent = 0;
    var box = el("div", "lp-targets");
    box.appendChild(el("p", "lp-label", "Targets"));
    m.targets.forEach(function (t, i) {
      var r = el("div", "lp-target");
      var top = el("div", "lp-top");
      top.appendChild(el("span", "lp-url", t.url));
      top.appendChild(el("code", "lp-sel", m.strategy === "weighted" ? "weight " + t.w : Math.round(100 / m.targets.length) + "%"));
      var bar = el("div", "lp-bar"), fill = el("div", "lp-fill"), num = el("span", "lp-num", "0");
      bar.appendChild(fill); r.appendChild(top); r.appendChild(bar); r.appendChild(num);
      box.appendChild(r); bars.push({ fill: fill, num: num });
    });
    var ctl = el("div", "lp-ctl");
    var go = el("button", "btn btn-primary btn-sm", "Send 20 visitors"); go.type = "button";
    var reset = el("button", "btn btn-ghost btn-sm", "Reset"); reset.type = "button";
    var status = el("span", "lp-status", "Nobody yet.");
    function draw() {
      bars.forEach(function (b, i) {
        b.fill.style.width = sent ? (counts[i] / sent * 100) + "%" : "0%";
        b.num.textContent = counts[i] + (sent ? " (" + Math.round(counts[i] / sent * 100) + "%)" : "");
      });
      status.textContent = sent ? sent + " visitors sent." : "Nobody yet.";
    }
    // Pick the next visitor's target at random, but never let any target's running count
    // drift a full visitor away from its configured share. That keeps the split honest
    // (90/10 stays 90/10) while the order of visitors still looks random.
    function nextTarget() {
      var next = sent + 1, eligible = [], weight = [], sum = 0, i;
      for (i = 0; i < m.targets.length; i++) {
        var expected = next * m.targets[i].w / total;
        if (counts[i] + 1 <= Math.ceil(expected - 1e-9)) {
          var room = Math.max(expected - counts[i], 0.05);
          eligible.push(i); weight.push(room); sum += room;
        }
      }
      var r = Math.random() * sum, acc = 0;
      for (i = 0; i < eligible.length; i++) { acc += weight[i]; if (r < acc) return eligible[i]; }
      return eligible[eligible.length - 1];
    }
    go.addEventListener("click", function () {
      for (var n = 0; n < 20; n++) { counts[nextTarget()]++; sent++; }
      draw();
    });
    reset.addEventListener("click", function () { counts = counts.map(function () { return 0; }); sent = 0; draw(); });
    ctl.appendChild(go); ctl.appendChild(reset); ctl.appendChild(status);
    wrap.appendChild(box); wrap.appendChild(ctl);
    draw();
    return wrap;
  }

  function show(key) {
    var m = M[key]; if (!m) return;
    current = key;
    Array.prototype.forEach.call(list.querySelectorAll(".lab-item"), function (b) {
      var on = b.getAttribute("data-m") === key;
      b.classList.toggle("active", on);
      b.setAttribute("aria-selected", on ? "true" : "false");
    });
    panel.textContent = "";
    var head = el("div", "lp-head");
    head.appendChild(el("h3", null, m.name)); head.appendChild(planTag(m));
    panel.appendChild(head);
    panel.appendChild(el("p", "lp-blurb", m.mode === "dist" ? m.blurb : MATCH_NOTE + (m.selector ? " You choose which " + (m.strategy === "header" ? "header" : "parameter") + " to read." : "")));
    panel.appendChild(m.mode === "dist" ? renderDistSim(m) : renderMatchSim(m));
    var code = el("pre", "lp-code", configText(m));
    panel.appendChild(code);
    if (!m.all) panel.appendChild(el("p", "lp-note", "Available on Dev, Team, and Scale."));
  }

  Array.prototype.forEach.call(list.querySelectorAll(".lab-item"), function (b) {
    b.addEventListener("click", function () { show(b.getAttribute("data-m")); });
    b.addEventListener("mouseenter", function () {
      if (!window.matchMedia("(hover: hover)").matches) return;
      clearTimeout(timer);
      timer = setTimeout(function () { show(b.getAttribute("data-m")); }, 90);
    });
    b.addEventListener("mouseleave", function () { clearTimeout(timer); });
  });
  show("weighted");
})();
