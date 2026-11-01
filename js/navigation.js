/* ============================================================
   PROJECT 12:11 — NAVIGATION & UNIVERSE (FINAL FIX)
   ============================================================ */
(function() {
        "use strict";

        const prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        /* ---------- 1. UNIVERSE BACKGROUND STARS ---------- */
        function initUniverseStars() {
            const canvas = document.getElementById("universe-stars");
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            let stars = [],
                w = 0,
                h = 0,
                rafId = null;

            function resize() {
                const dpr = Math.min(window.devicePixelRatio || 1, 2);
                w = canvas.clientWidth;
                h = canvas.clientHeight;
                canvas.width = w * dpr;
                canvas.height = h * dpr;
                ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
                const count = prefersReducedMotion ? 80 : Math.min(250, Math.floor((w * h) / 6000));
                stars = Array.from({ length: count }, () => ({
                    x: Math.random() * w,
                    y: Math.random() * h,
                    r: Math.random() * 1.5 + 0.2,
                    a: Math.random() * 0.8 + 0.1,
                    tw: Math.random() * 0.02 + 0.005,
                    phase: Math.random() * Math.PI * 2,
                    vx: (Math.random() - 0.5) * 0.05,
                    vy: (Math.random() - 0.5) * 0.05
                }));
            }

            function draw() {
                ctx.clearRect(0, 0, w, h);
                for (const s of stars) {
                    if (!prefersReducedMotion) {
                        s.x += s.vx;
                        s.y += s.vy;
                        if (s.x < 0) s.x = w;
                        if (s.x > w) s.x = 0;
                        if (s.y < 0) s.y = h;
                        if (s.y > h) s.y = 0;
                    }
                    s.phase += s.tw;
                    const alpha = s.a * (0.6 + 0.4 * Math.sin(s.phase));
                    ctx.beginPath();
                    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(247, 243, 255, ${alpha})`;
                    ctx.fill();
                }
                rafId = requestAnimationFrame(draw);
            }

            resize();
            window.addEventListener("resize", resize);
            draw();
        }

        /* ---------- 2. RENDER PLANETS ---------- */
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
                btn.setAttribute("aria-label", `Open ${dest.label}`);
                btn.dataset.target = dest.id;

                btn.innerHTML = `
        <div class="planet-orb" aria-hidden="true"></div>
        <span class="planet-label">${dest.label}</span>
      `;

                btn.addEventListener("click", () => openSection(dest.id));
                li.appendChild(btn);
                list.appendChild(li);
            });
        }

        /* ---------- 3. SECTION NAVIGATION & CONTENT ---------- */
        function openSection(id) {
            const universe = document.getElementById("universe");
            const sections = document.getElementById("sections");

            if (!universe || !sections) return;

            universe.style.display = "none";
            sections.style.display = "block";
            sections.style.opacity = "0";

            let contentHTML = "";

            if (id === "universe") {
                contentHTML = `
        <div class="section-content">
          <h1 style="font-family:'Playfair Display', serif; font-size:clamp(2.5rem, 8vw, 4rem); color:#e8d5a3; margin-bottom:1rem;">Happy Birthday, Yugapriya</h1>
          <p style="font-family:'Cormorant Garamond', serif; font-size:clamp(1.2rem, 4vw, 1.5rem); color:#b8a9d9; font-style:italic;">Today, this little universe exists just to celebrate you.</p>
          <div style="margin-top:3rem; font-size:3rem; text-shadow: 0 0 20px rgba(232,213,163,0.5);">✨</div>
        </div>
      `;
            } else if (id === "story") {
                contentHTML = `
        <div class="section-content" style="text-align: left; max-width: 800px; margin: 0 auto; padding: 0 1rem;">
          <h2 style="font-family:'Playfair Display', serif; font-size:clamp(2.5rem, 8vw, 3rem); color:#e8d5a3; text-align:center; margin-bottom:3rem;">Our Story</h2>
          ${TIMELINE.map(item => `
            <div style="border-left: 2px solid rgba(232,213,163,0.4); padding-left: 1.5rem; margin-bottom: 3rem; position: relative;">
              <div style="position:absolute; left:-7px; top:0; width:12px; height:12px; border-radius:50%; background:#e8d5a3; box-shadow: 0 0 10px #e8d5a3;"></div>
              <p style="font-size:0.85rem; color:#b8a9d9; letter-spacing:0.1em; margin-bottom:0.5rem; text-transform: uppercase;">${item.date}</p>
              <h3 style="font-size:1.4rem; color:white; margin-bottom:0.5rem; font-family:'Playfair Display', serif;">${item.title}</h3>
              <p style="color:rgba(255,255,255,0.6); line-height:1.6; font-size:0.95rem;">${item.story}</p>
            </div>
          `).join('')}
        </div>
      `;
    }
    else if (id === "museum") {
      contentHTML = `
        <div class="section-content" style="max-width: 1000px; margin: 0 auto; padding: 0 1rem;">
          <h2 style="font-family:'Playfair Display', serif; font-size:clamp(2.5rem, 8vw, 3rem); color:#e8d5a3; text-align:center; margin-bottom:3rem;">Memory Museum</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1.5rem;">
            ${GALLERY.map(item => `
              <div style="background: rgba(45,27,78,0.4); border: 1px solid rgba(232,213,163,0.2); border-radius: 12px; overflow: hidden; text-align: center; padding-bottom: 1rem;">
                <div style="width: 100%; height: 200px; background: #1a0f2e; display: flex; align-items: center; justify-content: center; color: #b8a9d9; font-size: 0.9rem;">
                  [Photo Placeholder]
                </div>
                <p style="color: #e8d5a3; font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 1.2rem; margin-top: 1rem;">${item.caption}</p>
                <p style="color: rgba(255,255,255,0.5); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em;">${item.category}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }
    else if (id === "letters") {
      contentHTML = `
        <div class="section-content" style="max-width: 900px; margin: 0 auto; padding: 0 1rem;">
          <h2 style="font-family:'Playfair Display', serif; font-size:clamp(2.5rem, 8vw, 3rem); color:#e8d5a3; text-align:center; margin-bottom:3rem;">Twelve Letters</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 1.5rem;">
            ${LETTERS.map(letter => `
              <div onclick="window.openLetter(${letter.id})" style="cursor:pointer; background: rgba(45,27,78,0.6); border: 1px solid rgba(232,213,163,0.3); border-radius: 8px; padding: 2rem 1rem; text-align: center; transition: all 0.3s;" onmouseover="this.style.borderColor='#e8d5a3'" onmouseout="this.style.borderColor='rgba(232,213,163,0.3)'">
                <div style="font-size: 2rem; margin-bottom: 1rem;">💌</div>
                <h4 style="color: white; font-size: 0.9rem; font-weight: normal;">${letter.title}</h4>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }
    else if (id === "admire") {
      contentHTML = `
        <div class="section-content" style="max-width: 800px; margin: 0 auto; padding: 0 1rem;">
          <h2 style="font-family:'Playfair Display', serif; font-size:clamp(2.5rem, 8vw, 3rem); color:#e8d5a3; text-align:center; margin-bottom:3rem;">Things I Admire</h2>
          <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            ${ADMIRE.map(item => `
              <div style="background: rgba(45,27,78,0.4); border: 1px solid rgba(232,213,163,0.2); border-radius: 12px; padding: 1.5rem; text-align: left;">
                <h3 style="color: #e8d5a3; font-family: 'Playfair Display', serif; font-size: 1.3rem; margin-bottom: 0.5rem;">${item.title}</h3>
                <p style="color: rgba(255,255,255,0.7); line-height: 1.6;">${item.text}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }
    else if (id === "voice") {
      contentHTML = `
        <div class="section-content" style="text-align: center;">
          <h2 style="font-family:'Playfair Display', serif; font-size:clamp(2.5rem, 8vw, 3rem); color:#e8d5a3; margin-bottom:2rem;">A Voice From Me</h2>
          <p style="color: rgba(255,255,255,0.7); margin-bottom: 2rem;">A little message, just for you.</p>
          <div style="background: rgba(45,27,78,0.6); padding: 2rem; border-radius: 20px; border: 1px solid rgba(232,213,163,0.3); display: inline-block;">
            <audio controls style="outline: none;">
              <source src="${CONFIG.audio.voice}" type="audio/mpeg">
              Your browser does not support the audio element.
            </audio>
          </div>
          <p style="color: #b8a9d9; font-size: 0.8rem; margin-top: 1rem;">(Add your voice recording to assets/audio/message.mp3)</p>
        </div>
      `;
    }
    else if (id === "surprises") {
      contentHTML = `
        <div class="section-content" style="text-align: center; max-width: 600px; margin: 0 auto;">
          <h2 style="font-family:'Playfair Display', serif; font-size:clamp(2.5rem, 8vw, 3rem); color:#e8d5a3; margin-bottom:2rem;">Hidden Surprises</h2>
          <p style="color: rgba(255,255,255,0.7); margin-bottom: 2rem;">Open all 12 letters to unlock the final surprise...</p>
          <div style="font-size: 4rem; margin: 2rem 0;">🎁</div>
        <button onclick="window.goBackToUniverse(); setTimeout(function(){ document.querySelectorAll('.planet')[3].click(); }, 100);" style="background: #e8d5a3; color: #0a0618; padding: 1rem 2rem; border-radius: 999px; font-weight: bold; border: none; cursor: pointer;">
  Go to Letters
</button>
        </div>
      `;
    }
    else if (id === "finale") {
      contentHTML = `
        <div class="section-content" style="text-align: center; padding: 4rem 1rem;">
          <h2 style="font-family:'Playfair Display', serif; font-size:clamp(2.5rem, 8vw, 4rem); color:#e8d5a3; margin-bottom:1.5rem;">Happy Birthday, Yugapriya</h2>
          <p style="font-family:'Cormorant Garamond', serif; font-size:clamp(1.2rem, 4vw, 1.5rem); color:#b8a9d9; font-style:italic; line-height: 1.6; max-width: 600px; margin: 0 auto 2rem auto; white-space: pre-wrap;">${CONFIG.finale.message}</p>
          <div style="margin-top: 3rem;">
            <p style="color: #e8d5a3; letter-spacing: 0.2em; font-size: 0.9rem;">${CONFIG.finale.signature}</p>
            <p style="color: #b8a9d9; font-size: 0.8rem; margin-top: 0.5rem;">${CONFIG.finale.tagline}</p>
          </div>
        </div>
      `;
    }
    else {
      contentHTML = `
        <div class="section-content">
          <h1 style="font-family:'Playfair Display', serif; font-size:clamp(2rem, 8vw, 4rem); color:#e8d5a3; margin-bottom:1rem;">${id.toUpperCase()}</h1>
          <p style="color:#b8a9d9;">This section is under construction...</p>
        </div>
      `;
    }

    sections.innerHTML = `
      <div style="min-height:100vh; padding: 4rem 1rem; display:flex; flex-direction:column; align-items:center; justify-content:center; animation: fadeIn 0.5s ease;">
        ${contentHTML}
        <button onclick="window.goBackToUniverse()" style="margin-top:4rem; background:transparent; border:1px solid #e8d5a3; color:#e8d5a3; padding: 1rem 2rem; border-radius: 999px; cursor:pointer; transition: all 0.3s;" onmouseover="this.style.background='#e8d5a3'; this.style.color='#0a0618'" onmouseout="this.style.background='transparent'; this.style.color='#e8d5a3'">
          ← Back to Universe
        </button>
      </div>
    `;

    setTimeout(() => { sections.style.transition = "opacity 0.8s ease"; sections.style.opacity = "1"; }, 50);
  }

  // Global function to open a specific letter
  window.openLetter = function(id) {
    const letter = LETTERS.find(l => l.id === id);
    if (!letter) return;

    const sections = document.getElementById("sections");
    sections.innerHTML = `
      <div style="min-height:100vh; padding: 4rem 2rem; display:flex; flex-direction:column; align-items:center; justify-content:center; background: #150a24; animation: fadeIn 0.5s ease; text-align: left; max-width: 800px; margin: 0 auto;">
        <p style="color:#b8a9d9; letter-spacing: 0.1em; text-transform: uppercase; font-size: 0.8rem; margin-bottom: 1rem;">Letter ${letter.id}</p>
        <h2 style="font-family:'Playfair Display', serif; font-size:clamp(2rem, 6vw, 3rem); color:#e8d5a3; margin-bottom: 2rem;">${letter.title}</h2>
        <div style="color: rgba(255,255,255,0.8); line-height: 1.8; font-size: 1.1rem; font-family: 'Cormorant Garamond', serif; white-space: pre-wrap;">${letter.body}</div>
       <button onclick="document.querySelectorAll('.planet')[3].click();" style="margin-top:4rem; background:transparent; border:1px solid #e8d5a3; color:#e8d5a3; padding: 1rem 2rem; border-radius: 999px; cursor:pointer; transition: all 0.3s;">
          ← Back to Letters
        </button>
      </div>
    `;
  };

  // Global function to go back to universe
  window.goBackToUniverse = function() {
    const universe = document.getElementById("universe");
    const sections = document.getElementById("sections");
    if (universe && sections) {
      sections.style.display = "none";
      universe.style.display = "flex"; 
    }
  };

  /* ---------- 4. BOOT ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    initUniverseStars();
    renderPlanets();
    
    const intro = document.getElementById("intro");
    const app = document.getElementById("app");
    
    // Intha 4 lines thaan intro-a skip panni planets-a kaattum
    if (intro && app) {
      intro.classList.add("is-hidden");
      app.classList.add("is-active");
      app.setAttribute("aria-hidden", "false");
    }
  });
})();
