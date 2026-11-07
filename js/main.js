(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("btn-enter");
    const skip = document.getElementById("btn-skip");
    const intro = document.getElementById("intro");
    const app = document.getElementById("app");

    // Reveal text elements after some time
    setTimeout(() => {
      const els = ["intro-time", "intro-line-1", "intro-name", "intro-line-2", "btn-enter"];
      els.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          el.style.filter = "blur(0)";
        }
      });
    }, 1000); // 1 second kazhichu ellame varum (wait panna vendaam)

    // Enter button click
    if (btn) {
      btn.addEventListener("click", () => {
        intro.classList.add("is-hidden");
        app.classList.add("is-active");
        app.setAttribute("aria-hidden", "false");
        if (window.renderPlanets) window.renderPlanets();
      });
    }

    // Skip button click
    if (skip) {
      skip.addEventListener("click", () => {
        intro.classList.add("is-hidden");
        app.classList.add("is-active");
        app.setAttribute("aria-hidden", "false");
        if (window.renderPlanets) window.renderPlanets();
      });
    }
  });
})();
