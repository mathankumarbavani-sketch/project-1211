(function () {
  "use strict";

  // Planets render panna
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
      
      btn.addEventListener("click", () => {
        document.getElementById("universe").style.display = "none";
        document.getElementById("sections").style.display = "block";
        document.getElementById("sections").innerHTML = `
          <div style="padding: 4rem 1rem; text-align: center; min-height: 100vh; display:flex; flex-direction:column; justify-content:center; align-items:center;">
            <h2 style="color:#e8d5a3; font-family:'Playfair Display', serif; font-size:2.5rem;">${dest.label}</h2>
            <p style="color:white; margin-top:1rem;">This section is loading...</p>
            <button onclick="document.getElementById('sections').style.display='none'; document.getElementById('universe').style.display='flex';" style="margin-top:2rem; padding:1rem 2rem; border-radius:999px; border:1px solid #e8d5a3; color:#e8d5a3; background:transparent; cursor:pointer;">← Back to Universe</button>
          </div>
        `;
      });
      
      li.appendChild(btn);
      list.appendChild(li);
    });
  }

  // Direct-a planets-a kaata (Intro bypass)
  document.addEventListener("DOMContentLoaded", () => {
    renderPlanets();
    const intro = document.getElementById("intro");
    const app = document.getElementById("app");
    if(intro && app) {
      intro.classList.add("is-hidden");
      app.classList.add("is-active");
    }
  });

})();
