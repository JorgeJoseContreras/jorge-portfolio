/* ==========================================================================
   SHARED JAVASCRIPT MODULE - JORGE CONTRERAS
   ========================================================================== */

(function () {
  'use strict';

  // --- 1. DYNAMIC 3D PARTICLE OCEAN WAVE SIMULATION ---
  function init3DParticleOceanWave() {
    const canvas = document.getElementById('matrixCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    window.addEventListener('mousemove', (e) => {
      targetMouseX = (e.clientX - width / 2) / (width / 2);
      targetMouseY = (e.clientY - height / 2) / (height / 2);
    });

    window.addEventListener('mouseleave', () => {
      targetMouseX = 0;
      targetMouseY = 0;
    });

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const SEPARATION_X = 28;
    const SEPARATION_Z = 28;
    const AMOUNT_X = 84;
    const AMOUNT_Z = 80;
    const FOV = 500;

    let time = 0;

    function render() {
      ctx.clearRect(0, 0, width, height);

      mouseX += (targetMouseX - mouseX) * 0.035;
      mouseY += (targetMouseY - mouseY) * 0.035;

      time += 0.015;

      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';

      const camPitch = 0.24 + mouseY * 0.12;
      const cosPitch = Math.cos(camPitch);
      const sinPitch = Math.sin(camPitch);

      const camYaw = mouseX * 0.2;
      const cosYaw = Math.cos(camYaw);
      const sinYaw = Math.sin(camYaw);

      const camY = -120 + mouseY * 45;

      const originX = width / 2;
      const originY = height * 0.48;

      for (let ix = 0; ix < AMOUNT_X; ix++) {
        for (let iz = 0; iz < AMOUNT_Z; iz++) {
          const wx0 = (ix - AMOUNT_X / 2) * SEPARATION_X;
          const wz0 = (iz + 2) * SEPARATION_Z;

          const wave1 = Math.sin(ix * 0.11 + time * 1.3) * 44;
          const wave2 = Math.cos(iz * 0.09 + time * 0.95) * 56;
          const wave3 = Math.sin((ix * 0.6 + iz * 0.4) * 0.07 + time * 1.6) * 34;

          const distFromCenter = Math.abs(ix - AMOUNT_X / 2) / (AMOUNT_X / 2);
          const sideLift = Math.pow(distFromCenter, 1.8) * 100 * Math.sin(time * 0.8 + iz * 0.06);
          const horizonBackSwell = Math.sin(wz0 * 0.0018 + time * 0.5) * 55;

          const wy0 = wave1 + wave2 + wave3 + sideLift + horizonBackSwell - camY;

          const wx = wx0 * cosYaw - wz0 * sinYaw;
          const wz1 = wx0 * sinYaw + wz0 * cosYaw;

          const wy = wy0 * cosPitch - wz1 * sinPitch;
          const wz = wy0 * sinPitch + wz1 * cosPitch;

          if (wz <= 12) continue;

          const proj = FOV / wz;
          const screenX = originX + wx * proj;
          const screenY = originY + wy * proj;

          if (screenX < -40 || screenX > width + 40 || screenY < -40 || screenY > height + 40) {
            continue;
          }

          const depthFactor = Math.max(0, Math.min(1, (2400 - wz) / 2200));
          const heightFactor = (wy0 + camY + 90) / 180;
          const brightness = Math.max(0.04, Math.min(0.96, depthFactor * 0.68 + heightFactor * 0.42));

          const radius = Math.max(0.6, Math.min(2.8, (FOV / wz) * 1.6));

          ctx.beginPath();
          ctx.arc(screenX, screenY, radius, 0, Math.PI * 2);

          if (isDark) {
            ctx.fillStyle = `rgba(255, 255, 255, ${brightness * 0.82})`;
          } else {
            ctx.fillStyle = `rgba(14, 14, 20, ${brightness * 0.72})`;
          }
          ctx.fill();
        }
      }

      requestAnimationFrame(render);
    }

    render();
  }

  // --- 2. PROJECT CATEGORY FILTERING (projects.html) ---
  function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (!filterButtons.length || !projectCards.length) return;

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter || category.includes(filter)) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 10);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(12px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 200);
          }
        });
      });
    });
  }

  // --- 3. LIVE EST CLOCK ---
  function initLiveClock() {
    const clockEl = document.getElementById('miamiClock');
    if (!clockEl) return;

    function update() {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'America/New_York',
        hour12: false
      });
      clockEl.textContent = `${timeStr} EST`;
    }

    setInterval(update, 1000);
    update();
  }

  // --- 4. THEME TOGGLE ---
  function initThemeToggle() {
    const toggleBtn = document.getElementById('themeToggle');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
      localStorage.setItem('theme_pref', isDark ? 'light' : 'dark');
    });

    const saved = localStorage.getItem('theme_pref');
    if (saved) {
      document.documentElement.setAttribute('data-theme', saved);
    }
  }

  // --- 5. CONTACT MODAL ---
  function initContactModal() {
    const modal = document.getElementById('contactModal');
    const openBtns = [document.getElementById('navContactLink'), document.getElementById('heroContactBtn')];
    const closeBtn = document.getElementById('closeContactBtn');
    const form = document.getElementById('contactForm');
    const status = document.getElementById('contactStatus');

    if (!modal) return;

    openBtns.forEach(btn => {
      if (btn) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          modal.style.display = 'flex';
        });
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
      });
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        status.textContent = 'Transmitting packet...';
        status.style.color = 'var(--accent-primary)';

        setTimeout(() => {
          status.textContent = 'Message transmitted successfully! Jorge will respond soon.';
          status.style.color = '#10b981';
          setTimeout(() => {
            modal.style.display = 'none';
            form.reset();
            status.textContent = '';
          }, 1800);
        }, 800);
      });
    }
  }

  // --- INITIALIZE ALL MODULES ---
  initProjectFilters();
  initLiveClock();
  initThemeToggle();
  initContactModal();

})();