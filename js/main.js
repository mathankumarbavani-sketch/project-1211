(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    // Background stars
    const canvas = document.getElementById("intro-stars");
    if (canvas) {
      const ctx = canvas.getContext("2d");
      let w = canvas.clientWidth, h = canvas.clientHeight;
      canvas.width = w; canvas.height = h;
      for (let i = 0; i < 100; i++) {
        ctx.beginPath();
        ctx.arc(Math.random() * w, Math.random() * h, Math.random() * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${Math.random()})`;
        ctx.fill();
      }
    }

    // Reveal elements sequentially
    const time = document.getElementById("intro-time");
    const line1 = document.getElementById("intro-line-1");
    const name = document.getElementById("intro-name");
    const line2 = document.getElementById("intro-line-2");
    const btn = document.getElementById("btn-enter");

    function show(el) {
      if (el) { el.style.opacity = "1"; el.style.filter = "blur(0)"; el.style.transform = "translateY(0)"; }
    }

    setTimeout(() => show(time), 500);
    setTimeout(() => show(line1), 1500);
    setTimeout(() => show(name), 3000);
    setTimeout(() => show(line2), 4000);
    setTimeout(() => show(btn), 5000);

    // Enter button logic
    const enterBtn = document.getElementById("btn-enter");
    if (enterBtn) {
      enterBtn.addEventListener("click", () => {
        document.getElementById("intro").classList.add("is-hidden");
        document.getElementById("app").classList.add("is-active");
        document.getElementById("app").setAttribute("aria-hidden", "false");
        // Trigger planet render
        if (window.renderPlanets) window.renderPlanets();
      });
    }
  });
})();
