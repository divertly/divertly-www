/* Divertly — progressive enhancement. Vanilla JS, no dependencies. */
(function () {
  "use strict";

  /* --- Sticky header shadow on scroll --- */
  var header = document.getElementById("site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* --- Mobile nav drawer --- */
  var toggle = document.getElementById("navToggle");
  var drawer = document.getElementById("navDrawer");
  if (toggle && drawer) {
    var setOpen = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      drawer.hidden = !open;
      drawer.classList.toggle("open", open);
      toggle.querySelector("i").className = open ? "bi bi-x-lg" : "bi bi-list";
    };
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    // Close after picking a destination.
    drawer.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") setOpen(false);
    });
  }

  /* --- Copy-to-clipboard for code blocks --- */
  document.querySelectorAll(".code-card__copy").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var target = document.querySelector(btn.getAttribute("data-copy"));
      if (!target) return;
      var text = target.innerText;
      var done = function () {
        var icon = btn.querySelector("i");
        var prev = icon.className;
        icon.className = "bi bi-check-lg";
        btn.lastChild.textContent = " Copied";
        setTimeout(function () {
          icon.className = prev;
          btn.lastChild.textContent = " Copy";
        }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(function () {});
      } else {
        var ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand("copy"); done(); } catch (e) {}
        document.body.removeChild(ta);
      }
    });
  });

  /* --- Reveal on scroll --- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.05 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }
})();
