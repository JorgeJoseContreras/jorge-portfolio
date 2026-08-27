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

  // --- 3. CONTACT HANDLING (Modal + Standalone Page) ---
  function initContact() {
    // 3A. Modal Popup
    const modal = document.getElementById('contactModal');
    const openBtns = [document.getElementById('heroContactBtn')];
    const closeBtn = document.getElementById('closeContactBtn');
    const form = document.getElementById('contactForm');
    const status = document.getElementById('contactStatus');

    if (modal) {
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

    // 3B. Standalone Page Form (contact.html)
    const standaloneForm = document.getElementById('standaloneContactForm');
    const pageStatus = document.getElementById('pageContactStatus');

    if (standaloneForm && pageStatus) {
      standaloneForm.addEventListener('submit', (e) => {
        e.preventDefault();
        pageStatus.textContent = 'Sending...';
        pageStatus.style.color = 'var(--accent)';

        const formData = new FormData(standaloneForm);
        formData.append('access_key', 'f43d470c-ff11-4fbf-9159-69306b78872e');

        fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            pageStatus.textContent = 'Message sent! Thank you for reaching out.';
            pageStatus.style.color = '#10b981';
            standaloneForm.reset();
          } else {
            pageStatus.textContent = 'Error: ' + (data.message || 'Something went wrong.');
            pageStatus.style.color = '#ef4444';
          }
        })
        .catch(error => {
          pageStatus.textContent = 'Connection error. Please try again.';
          pageStatus.style.color = '#ef4444';
        });
      });
    }
  }

  // --- 4. FETCH LIVE P&L ---
  function initLivePnl() {
    const badgeIndex = document.getElementById('pnlBadgeIndex');
    const badgeProjects = document.getElementById('pnlBadgeProjects');
    
    if (badgeIndex || badgeProjects) {
      fetch(`https://alpaca-trading-bot-xw33.onrender.com/api/pnl?_t=${Date.now()}`, { cache: 'no-store' })
        .then(response => response.json())
        .then(res => {
          if (res) {
            const data = res.data || res;
            const pct = data.formatted_pct || (data.pnl_pct !== undefined ? ((data.pnl_pct >= 0 ? '+' : '') + Number(data.pnl_pct).toFixed(2) + '%') : null);
            const isPositive = data.is_positive !== undefined ? data.is_positive : ((Number(data.pnl_pct) || 0) >= 0);
            
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
          console.warn('Unable to retrieve live P&L data from API endpoint.', err);
        });
    }
  }

  initTheme();
  initFilter();
  initContact();
  initLivePnl();

  // Continuously refresh P&L every 15 seconds automatically
  setInterval(initLivePnl, 15000);
  window.addEventListener('pageshow', initLivePnl);

})();