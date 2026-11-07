(function () {
  "use strict";

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

  // Open Section function (Ithula dhaan 8 sections-um irukku)
  function openSection(id) {
    const universe = document.getElementById("universe");
    const sections = document.getElementById("sections");
    if (!universe || !sections) return;

    universe.style.display = "none";
    sections.style.display = "block";
    sections.style.opacity = "1";

    let contentHTML = "";

    if (id === "universe") {
      contentHTML = `<h1 style="color:#e8d5a3; font-family:'Playfair Display', serif; font-size:3rem;">Happy Birthday, Yugapriya</h1><p style="color:#b8a9d9; font-style:italic; font-size:1.2rem;">Today, this little universe exists just to celebrate you.</p>`;
    } 
    else if (id === "story") {
      contentHTML = `<h2 style="color:#e8d5a3; font-family:'Playfair Display', serif; text-align:center; font-size:2.5rem; margin-bottom:2rem;">Our Story</h2>
      <div style="text-align:left; max-width:600px; margin:0 auto;">
      ${TIMELINE.map(t => `<div style="border-left:2px solid #e8d5a3; padding-left:1rem; margin-bottom:2rem;"><p style="color:#b8a9d9; font-size:0.8rem;">${t.date}</p><h3 style="color:white; margin-bottom:0.5rem;">${t.title}</h3><p style="color:gray; font-size:0.9rem;">${t.story}</p></div>`).join('')}
      </div>`;
    }
    else if (id === "museum") {
      contentHTML = `<h2 style="color:#e8d5a3; font-family:'Playfair Display', serif; text-align:center; font-size:2.5rem; margin-bottom:2rem;">Memory Museum</h2>
      <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(200px, 1fr)); gap:1rem; max-width:800px; margin:0 auto;">
      ${GALLERY.map(g => `<div style="background:#1a0f2e; border:1px solid #e8d5a3; border-radius:10px; padding:2rem 1rem; text-align:center;"><p style="color:#e8d5a3; font-size:1.2rem; font-style:italic;">${g.caption}</p><p style="color:gray; font-size:0.8rem;">${g.category}</p></div>`).join('')}
      </div>`;
    }
    else if (id === "letters") {
      contentHTML = `<h2 style="color:#e8d5a3; font-family:'Playfair Display', serif; text-align:center; font-size:2.5rem; margin-bottom:2rem;">Twelve Letters</h2>
      <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(150px, 1fr)); gap:1rem; max-width:800px; margin:0 auto;">
      ${LETTERS.map(l => `<div onclick="window.openLetter(${l.id})" style="background:#1a0f2e; border:1px solid #e8d5a3; border-radius:8px; padding:1.5rem; text-align:center; cursor:pointer;"><span style="font-size:2rem;">💌</span><p style="color:white; font-size:0.9rem; margin-top:1rem;">${l.title}</p></div>`).join('')}
      </div>`;
    }
    // --- BOTTOM 4 SECTIONS ADD PANNIRUKEN ---
    else if (id === "admire") {
      contentHTML = `<h2 style="color:#e8d5a3; font-family:'Playfair Display', serif; text-align:center; font-size:2.5rem; margin-bottom:2rem;">Things I Admire</h2>
      <div style="display:flex; flex-direction:column; gap:1rem; max-width:600px; margin:0 auto; text-align:left;">
      ${ADMIRE.map(a => `<div style="background:#1a0f2e; border:1px solid #e8d5a3; border-radius:10px; padding:1.5rem;"><h3 style="color:#e8d5a3; margin-bottom:0.5rem;">${a.title}</h3><p style="color:white; font-size:0.9rem;">${a.text}</p></div>`).join('')}
      </div>`;
    }
    else if (id === "voice") {
      contentHTML = `<h2 style="color:#e8d5a3; font-family:'Playfair Display', serif; text-align:center; font-size:2.5rem; margin-bottom:2rem;">A Voice From Me</h2>
      <div style="background:#1a0f2e; border:1px solid #e8d5a3; border-radius:20px; padding:2rem; display:inline-block;">
      <audio controls style="outline:none;"><source src="${CONFIG.audio.voice}" type="audio/mpeg">Your browser does not support audio.</audio>
      </div>`;
    }
    else if (id === "surprises") {
      contentHTML = `<h2 style="color:#e8d5a3; font-family:'Playfair Display', serif; text-align:center; font-size:2.5rem; margin-bottom:2rem;">Hidden Surprises</h2>
      <p style="color:white; margin-bottom:2rem;">Open all 12 letters to unlock the final surprise...</p>
      <div style="font-size:4rem;">🎁</div>
      <button onclick="window.openSection('letters')" style="margin-top:2rem; background:#e8d5a3; color:#0a0618; padding:1rem 2rem; border-radius:999px; border:none; font-weight:bold; cursor:pointer;">Go to Letters</button>`;
    }
    else if (id === "finale") {
      contentHTML = `<h2 style="color:#e8d5a3; font-family:'Playfair Display', serif; text-align:center; font-size:3rem; margin-bottom:1.5rem;">Happy Birthday, Yugapriya</h2>
      <p style="color:#b8a9d9; font-style:italic; font-size:1.2rem; max-width:600px; margin:0 auto 2rem auto; white-space:pre-wrap;">${CONFIG.finale.message}</p>
      <div style="margin-top:2rem;">
        <p style="color:#e8d5a3; letter-spacing:0.2em; font-size:1rem;">${CONFIG.finale.signature}</p>
        <p style="color:gray; font-size:0.8rem; margin-top:0.5rem;">${CONFIG.finale.tagline}</p>
      </div>`;
    }
    else {
      contentHTML = `<h2 style="color:#e8d5a3; font-family:'Playfair Display', serif; font-size:2.5rem;">${id.toUpperCase()}</h2><p style="color:white; margin-top:1rem;">Section is ready to be built.</p>`;
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

  window.openLetter = function(id) {
    const letter = LETTERS.find(l => l.id === id);
    if (!letter) return;
    const sections = document.getElementById("sections");
    sections.innerHTML = `
      <div style="min-height:100vh; padding: 4rem 2rem; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:left; max-width:700px; margin:0 auto;">
        <p style="color:#b8a9d9; font-size:0.8rem; text-transform:uppercase;">Letter ${letter.id}</p>
        <h2 style="color:#e8d5a3; font-family:'Playfair Display', serif; font-size:2.5rem; margin:1rem 0;">${letter.title}</h2>
        <div style="color:white; font-size:1.1rem; line-height:1.8; white-space:pre-wrap;">${letter.body}</div>
        <button onclick="window.openSection('letters')" style="margin-top:3rem; background:transparent; border:1px solid #e8d5a3; color:#e8d5a3; padding: 1rem 2rem; border-radius: 999px; cursor:pointer;">
          ← Back to Letters
        </button>
      </div>
    `;
  };

  window.goBackToUniverse = function() {
    document.getElementById("sections").style.display = "none";
    document.getElementById("universe").style.display = "flex"; 
  };

  window.renderPlanets = renderPlanets;
  window.openSection = openSection;

  document.addEventListener("DOMContentLoaded", renderPlanets);

})();
