// "Talk to us" on the Pricing page opens the Brevo contact form in a modal.
// Brevo's styles and scripts (and Cloudflare Turnstile for bot protection) load only when it's first opened.
(function () {
  var modal = document.getElementById("contact-modal");
  var triggers = document.querySelectorAll("[data-contact-open]");
  if (!modal || !triggers.length) return;
  var lastFocus = null, loaded = false;

  function loadScript(src, opts) {
    var s = document.createElement("script");
    s.src = src; s.async = false;
    if (opts && opts.onload) s.onload = opts.onload;
    document.body.appendChild(s);
  }
  function loadForm() {
    if (loaded) return;
    loaded = true;
    var css = document.createElement("link");
    css.rel = "stylesheet"; css.href = "https://sibforms.com/forms/end-form/build/sib-styles.css";
    document.head.appendChild(css);
    loadScript("https://challenges.cloudflare.com/turnstile/v0/api.js");
    loadScript("https://sibforms.com/forms/end-form/build/main.js");
  }
  function close() {
    modal.hidden = true;
    document.body.classList.remove("fc-open");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  function open() {
    lastFocus = document.activeElement;
    modal.hidden = false;
    document.body.classList.add("fc-open");
    loadForm();
    modal.querySelector("[data-contact-close]").focus();
  }

  triggers.forEach(function (t) {
    t.addEventListener("click", function (e) { e.preventDefault(); open(); });
  });
  modal.addEventListener("click", function (e) {
    if (e.target === modal || e.target.closest("[data-contact-close]")) close();
  });
  document.addEventListener("keydown", function (e) {
    if (!modal.hidden && e.key === "Escape") close();
  });
})();
