(function () {
  // ---- Founder's Circle banner dismissal ----
  var fcClose = document.getElementById("fc-close");
  if (fcClose) {
    fcClose.addEventListener("click", function () {
      document.getElementById("fc-banner").hidden = true;
      try { localStorage.setItem("dvt-fc-banner", "closed"); } catch (e) { }
    });
  }

  // ---- mobile nav + resources dropdown ----
  var toggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
  var dds = document.querySelectorAll(".dropdown");
  dds.forEach(function (dd) {
    var btn = dd.querySelector(".dd-btn");
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = dd.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });
  document.addEventListener("click", function () {
    dds.forEach(function (dd) {
      dd.classList.remove("open");
      dd.querySelector(".dd-btn").setAttribute("aria-expanded", "false");
    });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") document.dispatchEvent(new Event("click"));
  });

  // ---- routing diagram: methods drive the SVG ----
  var hub = document.getElementById("d-hub");
  if (hub) {
    var M = {
      weighted: { hub: "weighted", mode: "weighted", t1c: "weight 90", t1d: "app.acme.dev/v2", t2c: "weight 10", t2d: "app.acme.dev/v3-canary" },
      random: { hub: "random", mode: "equal", t1c: "~50%", t1d: "app.acme.dev/a", t2c: "~50%", t2d: "app.acme.dev/b" },
      browser: { hub: "browser", mode: "equal", t1c: "Chrome", t1d: "app.acme.dev/modern", t2c: "Safari", t2d: "app.acme.dev/legacy" },
      device: { hub: "device", mode: "equal", t1c: "mobile", t1d: "app.acme.dev/m", t2c: "desktop", t2d: "app.acme.dev/app" },
      country: { hub: "country", mode: "equal", t1c: "US", t1d: "app.acme.dev/us", t2c: "DE", t2d: "app.acme.dev/eu" },
      header: { hub: "header", mode: "equal", t1c: "x-tier: pro", t1d: "app.acme.dev/pro", t2c: "default", t2d: "app.acme.dev/standard" },
      human: { hub: "human vs bot", mode: "equal", t1c: "human", t1d: "app.acme.dev/home", t2c: "bot", t2d: "app.acme.dev/static" },
      cidr: { hub: "CIDR", mode: "equal", t1c: "10.0.0.0/8", t1d: "intranet.acme.dev", t2c: "default", t2d: "www.acme.dev" },
      language: { hub: "language", mode: "equal", t1c: "en", t1d: "app.acme.dev/en", t2c: "es", t2d: "app.acme.dev/es" },
      os: { hub: "OS", mode: "equal", t1c: "iOS", t1d: "apps.apple.com/…", t2c: "Android", t2d: "play.google.com/…" },
      query: { hub: "query", mode: "equal", t1c: "?ref=ad", t1d: "app.acme.dev/landing", t2c: "default", t2d: "app.acme.dev/home" },
      ua: { hub: "user-agent", mode: "equal", t1c: "curl/*", t1d: "api.acme.dev/raw", t2c: "browser", t2d: "app.acme.dev/page" }
    };
    var t1c = document.getElementById("d-t1-cond"), t1d = document.getElementById("d-t1-dest");
    var t2c = document.getElementById("d-t2-cond"), t2d = document.getElementById("d-t2-dest");
    var f1 = document.getElementById("d-flow1"), f2 = document.getElementById("d-flow2");
    var b1 = document.getElementById("d-box1");

    var apply = function (k) {
      var m = M[k]; if (!m) return;
      hub.textContent = m.hub;
      t1c.textContent = m.t1c; t1d.textContent = m.t1d;
      t2c.textContent = m.t2c; t2d.textContent = m.t2d;
      if (m.mode === "weighted") {
        f1.setAttribute("class", "flow flow-heavy animate");
        f2.setAttribute("class", "flow flow-light animate");
        b1.setAttribute("class", "node-box hot");
        t1c.setAttribute("class", "weight");
        t2c.setAttribute("class", "weight weight-lo");
      } else {
        f1.setAttribute("class", "flow flow-mid animate");
        f2.setAttribute("class", "flow flow-mid animate");
        b1.setAttribute("class", "node-box");
        t1c.setAttribute("class", "weight");
        t2c.setAttribute("class", "weight");
      }
    };

    var chips = document.querySelectorAll(".chip[data-method]");
    chips.forEach(function (chip) {
      ["mouseenter", "focus", "click"].forEach(function (ev) {
        chip.addEventListener(ev, function () {
          chips.forEach(function (c) { c.classList.remove("active"); });
          chip.classList.add("active");
          apply(chip.getAttribute("data-method"));
        });
      });
    });
  }

  // ---- code tabs: swap the sample ----
  var code = document.getElementById("code");
  if (code) {
    var samples = document.querySelectorAll("template[data-sample]");
    var S = {};
    samples.forEach(function (t) { S[t.getAttribute("data-sample")] = t.innerHTML; });
    var tabs = document.querySelectorAll(".chip.lang[data-sample]");
    tabs.forEach(function (b) {
      b.addEventListener("click", function () {
        tabs.forEach(function (x) { x.classList.remove("active"); });
        b.classList.add("active");
        code.innerHTML = S[b.getAttribute("data-sample")];
      });
    });
  }
})();
