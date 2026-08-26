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

        const formData = new FormData(form);
        formData.append('access_key', 'f43d470c-ff11-4fbf-9159-69306b78872e');

        fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            status.textContent = 'Message sent! Thanks for reaching out.';
            status.style.color = '#10b981';
            setTimeout(() => {
              modal.style.display = 'none';
              form.reset();
              status.textContent = '';
            }, 1800);
          } else {
            status.textContent = 'Error: ' + (data.message || 'Something went wrong.');
            status.style.color = '#ef4444';
          }
        })
        .catch(error => {
          status.textContent = 'Connection error. Please try again.';
          status.style.color = '#ef4444';
        });
      });
    }
  }

  // --- 4. FETCH LIVE P&L ---
  function initLivePnl() {
    const badgeIndex = document.getElementById('pnlBadgeIndex');
    const badgeProjects = document.getElementById('pnlBadgeProjects');
    
    if (badgeIndex || badgeProjects) {
      fetch('https://alpaca-trading-bot-xw33.onrender.com/api/pnl')
        .then(response => response.json())
        .then(res => {
          if (res && res.data) {
            const pct = res.data.formatted_pct || (res.data.pnl_pct !== undefined ? ((res.data.pnl_pct >= 0 ? '+' : '') + res.data.pnl_pct.toFixed(2) + '%') : null);
            const isPositive = res.data.is_positive !== undefined ? res.data.is_positive : (res.data.pnl_pct >= 0);
            
            if (pct) {
              [badgeIndex, badgeProjects].forEach(badge => {
                if (badge) {
                  badge.textContent = pct;
                  if (isPositive) {
                    badge.style.background = 'rgba(16, 185, 129, 0.12)';
                    badge.style.color = '#10b981';
                  } else {
                    badge.style.background = 'rgba(239, 68, 68, 0.12)';
                    badge.style.color = '#ef4444';
                  }
                }
              });
            }
          }
        })
        .catch(err => {
          console.warn('Unable to retrieve live P&L data from API endpoint. Utilizing default placeholder values.', err);
        });
    }

    const robinBadgeIndex = document.getElementById('pnlBadgeRobinhoodIndex');
    const robinBadgeProjects = document.getElementById('pnlBadgeRobinhoodProjects');

    if (robinBadgeIndex || robinBadgeProjects) {
      fetch('https://robinhood-bot-v2.onrender.com/pnl.json')
        .then(response => response.json())
        .then(data => {
          if (data) {
            const pct = data.formatted_return_pct;
            const isPositive = data.overall_return_pct !== undefined ? (data.overall_return_pct >= 0) : true;
            
            if (pct) {
              [robinBadgeIndex, robinBadgeProjects].forEach(badge => {
                if (badge) {
                  badge.textContent = pct;
                  if (isPositive) {
                    badge.style.background = 'rgba(16, 185, 129, 0.12)';
                    badge.style.color = '#10b981';
                  } else {
                    badge.style.background = 'rgba(239, 68, 68, 0.12)';
                    badge.style.color = '#ef4444';
                  }
                }
              });
            }
          }
        })
        .catch(err => {
          console.warn('Unable to retrieve Robinhood live P&L data from API endpoint. Utilizing default placeholder values.', err);
        });
    }
  }

  initTheme();
  initFilter();
  initContact();
  initLivePnl();

})();