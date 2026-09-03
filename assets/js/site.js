/* ==========================================================================
   Site behaviour
   --------------------------------------------------------------------------
   Deliberately small. The site is server-independent static HTML; JavaScript
   only enhances it. Everything here degrades gracefully if the file fails to
   load: the nav falls back to a visible list, and the theme falls back to the
   operating-system preference.

   The colour theme is applied by a tiny inline script in each page's <head>
   (see the `THEME BOOTSTRAP` comment in any HTML file) so there is no flash
   of the wrong theme before this file runs. The site defaults to light and
   only goes dark if the visitor picks it with the toggle — the operating
   system preference is deliberately not consulted, so the first impression
   is always the same one.
   ========================================================================== */

(function () {
  "use strict";

  /* ---------------------------------------------------------------------
     Mobile navigation disclosure
     --------------------------------------------------------------------- */

  var navToggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("primary-nav");

  if (navToggle && nav) {
    var desktop = window.matchMedia("(min-width: 60rem)");

    var setNav = function (open) {
      navToggle.setAttribute("aria-expanded", String(open));
      nav.hidden = !open;
    };

    // Collapse by default on small screens; always visible on desktop.
    var syncToViewport = function () {
      if (desktop.matches) {
        nav.hidden = false;
        navToggle.setAttribute("aria-expanded", "false");
      } else {
        setNav(false);
      }
    };

    syncToViewport();
    desktop.addEventListener("change", syncToViewport);

    navToggle.addEventListener("click", function () {
      setNav(navToggle.getAttribute("aria-expanded") !== "true");
    });

    // Close when a link is chosen or focus/pointer leaves the header.
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a") && !desktop.matches) setNav(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && navToggle.getAttribute("aria-expanded") === "true") {
        setNav(false);
        navToggle.focus();
      }
    });

    document.addEventListener("click", function (event) {
      if (desktop.matches) return;
      if (navToggle.getAttribute("aria-expanded") !== "true") return;
      if (event.target.closest(".site-header")) return;
      setNav(false);
    });
  }

  /* ---------------------------------------------------------------------
     Theme toggle (light / dark, remembered in localStorage)
     --------------------------------------------------------------------- */

  var themeToggle = document.querySelector(".theme-toggle");

  if (themeToggle) {
    var label = function (theme) {
      return theme === "dark" ? "Switch to light theme" : "Switch to dark theme";
    };

    var current = function () {
      return document.documentElement.getAttribute("data-theme") === "dark"
        ? "dark"
        : "light";
    };

    themeToggle.setAttribute("aria-label", label(current()));

    themeToggle.addEventListener("click", function () {
      var next = current() === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      themeToggle.setAttribute("aria-label", label(next));
      try {
        localStorage.setItem("theme", next);
      } catch (err) {
        /* Private browsing or storage disabled — theme just won't persist. */
      }
    });
  }

  /* ---------------------------------------------------------------------
     Footer year
     --------------------------------------------------------------------- */

  var year = document.querySelector("[data-current-year]");
  if (year) year.textContent = String(new Date().getFullYear());
})();
