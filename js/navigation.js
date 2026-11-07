(function () {
  "use strict";

  // 1. RENDER PLANETS (Ithu Enter click panna dhaan velai seiyum)
  window.renderPlanets = function() {
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
      
      // Planet click panna section open aagum
      btn.addEventListener("click", () => {
        document.getElementById("universe").style.display = "none";
        const sections = document.getElementById("sections");
        sections.style.display = "block";
        
        let content = "";
        if (dest.id === "universe") {
          content = `<h1 style="color:#e8d5a3; font-family:'Playfair Display', serif; font-size:3rem;">Happy Birthday, Yugapriya</h1><p style="color:#b8a9d9; font-style:italic;">Today, this universe exists just for you.</p>`;
        } else if (dest.id === "story") {
          content = `<h2 style="color:#e8d5a3; font-family:'Playfair Display', serif;">Our Story</h2>`;
        } else if (dest.id === "museum") {
          content = `<h2 style="color:#e8d5a3; font-family:'Playfair Display', serif;">Memory Museum</h2>`;
        } else if (dest.id === "letters") {
          content = `<h2 style="color:#e8d5a3; font-family:'Playfair Display', serif;">Twelve Letters</h2>`;
        } else {
          content = `<h1 style="color:#e8d5a3;">${dest.label}</h1>`;
        }

        sections.innerHTML = `
          <div style="min-height:100vh; padding: 4rem 1rem; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center;">
            ${content}
            <button onclick="window.goBackToUniverse()" style="margin-top:4rem; background:transparent; border:1px solid #e8d5a3; color:#e8d5a3; padding: 1rem 2rem; border-radius: 999px; cursor:pointer;">
              ← Back to Universe
            </button>
          </div>
        `;
      });
      
      li.appendChild(btn);
      list.appendChild(li);
    });
  };

  // 2. GO BACK TO UNIVERSE
  window.goBackToUniverse = function() {
    document.getElementById("sections").style.display = "none";
    document.getElementById("universe").style.display = "flex"; 
  };

})();
