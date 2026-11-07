(function () {
  "use strict";
  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("intro").classList.add("is-hidden");
    document.getElementById("app").classList.add("is-active");
    document.getElementById("app").setAttribute("aria-hidden", "false");
    if (window.renderPlanets) window.renderPlanets();
  });
})();
