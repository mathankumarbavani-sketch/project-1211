/* ============================================================
   PROJECT 12:11 — BOOT + CINEMATIC INTRO
   ============================================================ */
(function() {
    "use strict";

    const prefersReducedMotion =
        window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---------- INTRO STAR FIELD ---------- */
    function initIntroStars() {
        const canvas = document.getElementById("intro-stars");
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        let stars = [];
        let rafId = null;
        let w = 0,
            h = 0;

        function resize() {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            w = canvas.clientWidth;
            h = canvas.clientHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            buildStars();
        }

        function buildStars() {
            const count = prefersReducedMotion ? 60 : Math.min(180, Math.floor((w * h) / 9000));
            stars = Array.from({ length: count }, () => ({
                x: Math.random() * w,
                y: Math.random() * h,
                r: Math.random() * 1.4 + 0.3,
                a: Math.random() * 0.7 + 0.2,
                tw: Math.random() * 0.02 + 0.005,
                phase: Math.random() * Math.PI * 2
            }));
        }

        function draw() {
            ctx.clearRect(0, 0, w, h);
            for (const s of stars) {
                s.phase += s.tw;
                const alpha = s.a * (0.6 + 0.4 * Math.sin(s.phase));
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(247, 243, 255, ${alpha})`;
                ctx.fill();
            }
            if (!prefersReducedMotion) rafId = requestAnimationFrame(draw);
        }

        resize();
        window.addEventListener("resize", resize);
        draw();

        return function stop() {
            if (rafId) cancelAnimationFrame(rafId);
            window.removeEventListener("resize", resize);
        };
    }

    /* ---------- INTRO SEQUENCE ---------- */
    function runIntroSequence() {
        const time = document.getElementById("intro-time");
        const line1 = document.getElementById("intro-line-1");
        const name = document.getElementById("intro-name");
        const line2 = document.getElementById("intro-line-2");
        const btn = document.getElementById("btn-enter");

        const seq = prefersReducedMotion ?
            [
                [0, () => show(time)],
                [300, () => show(line1)],
                [600, () => show(name)],
                [900, () => show(line2)],
                [1200, () => show(btn)]
            ] :
            [
                [400, () => show(time)],
                [1800, () => show(line1)],
                [3000, () => show(name)],
                [4200, () => show(line2)],
                [5000, () => show(btn)]
            ];

        const timers = seq.map(([ms, fn]) => setTimeout(fn, ms));

        function show(el) {
            if (!el) return;
            el.style.transition = "opacity 1.2s cubic-bezier(0.16,1,0.3,1), transform 1.2s cubic-bezier(0.16,1,0.3,1), filter 1.2s cubic-bezier(0.16,1,0.3,1)";
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            el.style.filter = "blur(0)";
        }

        return () => timers.forEach(clearTimeout);
    }

    /* ---------- ENTER / SKIP ---------- */
    function enterApp() {
        const intro = document.getElementById("intro");
        const app = document.getElementById("app");
        if (!intro || !app) return;
        intro.classList.add("is-hidden");
        app.classList.add("is-active");
        app.setAttribute("aria-hidden", "false");

        // Focus the first planet for keyboard users
        setTimeout(() => {
            const first = document.querySelector(".planet");
            if (first) first.focus({ preventScroll: true });
        }, 300);
    }

    /* ---------- BOOT ---------- */
    document.addEventListener("DOMContentLoaded", () => {
        initIntroStars();
        const stopIntro = runIntroSequence();

        const enterBtn = document.getElementById("btn-enter");
        const skipBtn = document.getElementById("btn-skip");

        enterBtn && enterBtn.addEventListener("click", () => {
            stopIntro();
            enterApp();
        });

        skipBtn && skipBtn.addEventListener("click", () => {
            stopIntro();
            enterApp();
        });

        // Keyboard: Enter or Escape on intro
        document.addEventListener("keydown", (e) => {
            const introVisible = !document.getElementById("intro").classList.contains("is-hidden");
            if (!introVisible) return;
            if (e.key === "Enter" || e.key === "Escape") {
                stopIntro();
                enterApp();
            }
        });
    });
})();
