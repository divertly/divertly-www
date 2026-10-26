// Founder's Circle upsell on the Pricing page: clicking "Get Dev" opens it once, then Dev goes straight to sign-up.
(function () {
  var modal = document.getElementById("fc-modal");
  var triggers = document.querySelectorAll("[data-fc-upsell]");
  if (!modal || !triggers.length) return;
  var KEY = "dvt-fc-upsell";
  var lastFocus = null;

  function seen() { try { return !!localStorage.getItem(KEY); } catch (e) { return false; } }
  function mark() { try { localStorage.setItem(KEY, String(Date.now())); } catch (e) { } }

  function close() {
    modal.hidden = true;
    document.body.classList.remove("fc-open");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  function open() {
    lastFocus = document.activeElement;
    modal.hidden = false;
    document.body.classList.add("fc-open");
    mark();
    var first = modal.querySelector(".btn-primary");
    if (first) first.focus();
  }

  triggers.forEach(function (t) {
    t.addEventListener("click", function (e) {
      if (seen()) return;           // already shown once: carry on to sign-up
      e.preventDefault();
      open();
    });
  });
  modal.addEventListener("click", function (e) {
    if (e.target === modal || e.target.closest("[data-fc-close]")) close();
  });
  document.addEventListener("keydown", function (e) {
    if (modal.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "Tab") {
      var f = modal.querySelectorAll("a, button");
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
})();
