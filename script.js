/* ==========================================================================
   EDITORIAL PERSONAL SITE SCRIPT - JORGE CONTRERAS
   ========================================================================== */

(function () {
  'use strict';

  // --- 1. THEME TOGGLE ---
  function initTheme() {
    const toggleBtn = document.getElementById('themeToggle');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      const newTheme = isDark ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('jorge_site_theme', newTheme);
    });

    const saved = localStorage.getItem('jorge_site_theme');
    if (saved) {
      document.documentElement.setAttribute('data-theme', saved);
    }
  }

  // --- 2. PROJECT FILTERING (projects.html) ---
  function initFilter() {
    const filterBtns = document.querySelectorAll('.filter-chip');
    const cards = document.querySelectorAll('.editorial-card');

    if (!filterBtns.length || !cards.length) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        cards.forEach(card => {
          const cat = card.getAttribute('data-category');
          if (filter === 'all' || cat === filter) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // --- 3. CONTACT MODAL ---
  function initContact() {
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
        status.textContent = 'Sending...';
        status.style.color = 'var(--accent)';

        setTimeout(() => {
          status.textContent = 'Message sent! Thanks for reaching out.';
          status.style.color = '#10b981';
          setTimeout(() => {
            modal.style.display = 'none';
            form.reset();
            status.textContent = '';
          }, 1600);
        }, 600);
      });
    }
  }

  initTheme();
  initFilter();
  initContact();

})();