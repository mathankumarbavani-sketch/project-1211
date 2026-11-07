(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    const time = document.getElementById("intro-time");
    const line1 = document.getElementById("intro-line-1");
    const name = document.getElementById("intro-name");
    const line2 = document.getElementById("intro-line-2");
    const btn = document.getElementById("btn-enter");
    const skipBtn = document.getElementById("btn-skip");

    function show(el) {
      if (el) { el.style.opacity = "1"; el.style.filter = "blur(0)"; el.style.transform = "translateY(0)"; }
    }

    // Intro Animation
    setTimeout(() => show(time), 500);
    setTimeout(() => show(line1), 1500);
    setTimeout(() => show(name), 3000);
    setTimeout(() => show(line2), 4000);
    setTimeout(() => show(btn), 5000);

    // Enter click panna
    if (btn) {
      btn.addEventListener("click", () => {
        document.getElementById("intro").classList.add("is-hidden");
        document.getElementById("app").classList.add("is-active");
        document.getElementById("app").setAttribute("aria-hidden", "false");
        if (window.renderPlanets) window.renderPlanets();
      });
    }

    // Skip Intro click panna
    if (skipBtn) {
      skipBtn.addEventListener("click", () => {
        document.getElementById("intro").classList.add("is-hidden");
        document.getElementById("app").classList.add("is-active");
        document.getElementById("app").setAttribute("aria-hidden", "false");
        if (window.renderPlanets) window.renderPlanets();
      });
    }
  });
})();
