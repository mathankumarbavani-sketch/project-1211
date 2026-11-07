/* ============================================================
   PROJECT 12:11 — NAVIGATION (CLEAN FIX)
   ============================================================ */
(function () {
  "use strict";

  /* 1. STARS BACKGROUND */
  function initUniverseStars() {
    const canvas = document.getElementById("universe-stars");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let stars = [], w = 0, h = 0;
    
    function resize() {
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w; canvas.height = h;
      stars = Array.from({ length: 150 }, () => ({
        x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.5
      }));
    }
    function draw() {
      ctx.clearRect(0, 0, w, h);
      stars.forEach(s => {
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.7)"; ctx.fill();
      });
      requestAnimationFrame(draw);
    }
    resize(); window.addEventListener("resize", resize); draw();
  }

  /* 2. RENDER PLANETS */
  function renderPlanets() {
    const list = document.getElementById("planet-list");
    if (!list || typeof CONFIG === "undefined") return;
    
    list.innerHTML = "";
    CONFIG.destinations.forEach((dest, index) => {
      const li = document.createElement("li");
      li.className = "planet-item animate-fade-up";
      li.style.animationDelay = `${index * 0.1}s`;

      const btn = document.createElement("button");
      btn.className = "planet";
      btn.innerHTML = `<div class="planet-orb"></div><span class="planet-label">${dest.label}</span>`;
      btn.addEventListener("click", () => openSection(dest.id));
      
      li.appendChild(btn);
      list.appendChild(li);
    });
  }

  /* 3. OPEN SECTION */
  function openSection(id) {
    const universe = document.getElementById("universe");
    const sections = document.getElementById("sections");
    if (!universe || !sections) return;

    universe.style.display = "none";
    sections.style.display = "block";

    let contentHTML = "";

    if (id === "universe") {
      contentHTML = `<h1 style="color:#e8d5a3; font-family:'Playfair Display', serif; font-size:3rem;">Happy Birthday, Yugapriya</h1><p style="color:#b8a9d9; font-style:italic;">Today, this universe exists just for you.</p>`;
    } else if (id === "story") {
      contentHTML = `<h2 style="color:#e8d5a3; font-family:'Playfair Display', serif;">Our Story</h2>`;
    } else if (id === "museum") {
      contentHTML = `<h2 style="color:#e8d5a3; font-family:'Playfair Display', serif;">Memory Museum</h2><p style="color:white;">Photos will appear here soon.</p>`;
    } else if (id === "letters") {
      contentHTML = `<h2 style="color:#e8d5a3; font-family:'Playfair Display', serif;">Twelve Letters</h2>`;
    } else {
      contentHTML = `<h1 style="color:#e8d5a3;">${id.toUpperCase()}</h1><p style="color:white;">Coming soon...</p>`;
    }

    sections.innerHTML = `
      <div style="min-height:100vh; padding: 4rem 1rem; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center;">
        ${contentHTML}
        <button onclick="window.goBackToUniverse()" style="margin-top:4rem; background:transparent; border:1px solid #e8d5a3; color:#e8d5a3; padding: 1rem 2rem; border-radius: 999px; cursor:pointer;">
          ← Back to Universe
        </button>
      </div>
    `;
  }

  /* 4. GO BACK */
  window.goBackToUniverse = function() {
    document.getElementById("sections").style.display = "none";
    document.getElementById("universe").style.display = "flex"; 
  };

  /* 5. BOOT */
  document.addEventListener("DOMContentLoaded", () => {
    initUniverseStars();
    renderPlanets();
  });

})();
