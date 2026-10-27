// Loads analytics  only after the visitor accepts.
(function () {
  var KEY = "dvt-consent";
  var GA_ID = "G-VD902TQVYT";
  var BREVO_KEY = "x6k7ox1o9sc7nmosbj7hmni6";

  function read() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function write(v) { try { localStorage.setItem(KEY, v); } catch (e) { } }

  function loadAnalytics() {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", GA_ID);
    var ga = document.createElement("script");
    ga.async = true;
    ga.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    document.head.appendChild(ga);


    window.Brevo = window.Brevo || [];
    window.Brevo.push(["init", { client_key: BREVO_KEY }]);
    var bv = document.createElement("script");
    bv.async = true;
    bv.src = "https://cdn.brevo.com/js/sdk-loader.js";
    document.head.appendChild(bv);
  }

  function hideBanner() {
    var b = document.getElementById("cookie-banner");
    if (b) b.remove();
  }

  function showBanner() {
    if (document.getElementById("cookie-banner")) return;
    var b = document.createElement("div");
    b.id = "cookie-banner";
    b.setAttribute("role", "dialog");
    b.setAttribute("aria-label", "Cookie preferences");
    b.innerHTML =
      '<p>We use analytics and marketing cookies (Google Analytics, Brevo) to see how the site is used and fix what\'s broken. ' +
      'They stay off unless you accept. <a href="/privacy-policy">Privacy policy</a></p>' +
      '<div class="cb-actions">' +
      '<button type="button" class="btn btn-ghost btn-sm" data-choice="denied">Decline</button>' +
      '<button type="button" class="btn btn-primary btn-sm" data-choice="granted">Accept</button>' +
      '</div>';
    document.body.appendChild(b);
    b.addEventListener("click", function (e) {
      var c = e.target.getAttribute && e.target.getAttribute("data-choice");
      if (!c) return;
      var prev = read();
      write(c);
      hideBanner();
      if (c === "granted" && prev !== "granted") loadAnalytics();
      // Scripts already running can't be unloaded, so a reversal reloads the page.
      if (c === "denied" && prev === "granted") location.reload();
    });
  }

  if (read() === "granted") loadAnalytics();
  else if (read() !== "denied") showBanner();

  document.addEventListener("click", function (e) {
    var t = e.target.closest && e.target.closest("[data-cookie-settings]");
    if (t) { e.preventDefault(); showBanner(); }
  });
})();
