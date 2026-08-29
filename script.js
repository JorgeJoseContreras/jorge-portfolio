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
      document.body.classList.add('theme-transition');
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
  function applyBadgeStyle(badge, pctText, isPositive) {
    if (!badge) return;
    badge.textContent = pctText;
    if (isPositive) {
      badge.className = 'pnl-badge positive';
      badge.style.background = 'rgba(16, 185, 129, 0.12)';
      badge.style.color = '#10b981';
    } else {
      badge.className = 'pnl-badge negative';
      badge.style.background = 'rgba(239, 68, 68, 0.12)';
      badge.style.color = '#ef4444';
    }
  }

  function fetchAlpacaPnl() {
    const badgeIndex = document.getElementById('pnlBadgeIndex');
    const badgeProjects = document.getElementById('pnlBadgeProjects');
    if (!badgeIndex && !badgeProjects) return;

    fetch(`https://alpaca-trading-bot-xw33.onrender.com/api/pnl?_t=${Date.now()}`, { cache: 'no-store' })
      .then(response => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then(res => {
        if (res) {
          const data = res.data || res;
          const pct = data.formatted_pct || (data.pnl_pct !== undefined ? ((data.pnl_pct >= 0 ? '+' : '') + Number(data.pnl_pct).toFixed(2) + '%') : null);
          const isPositive = data.is_positive !== undefined ? data.is_positive : ((Number(data.pnl_pct) || 0) >= 0);
          
          if (pct) {
            [badgeIndex, badgeProjects].forEach(badge => applyBadgeStyle(badge, pct, isPositive));
          }
        }
      })
      .catch(err => {
        console.warn('Alpaca P&L fetch retry...', err);
      });
  }

  function fetchRobinhoodPnl() {
    const badgeIndex = document.getElementById('pnlBadgeRobinhoodIndex');
    const badgeProjects = document.getElementById('pnlBadgeRobinhoodProjects');
    if (!badgeIndex && !badgeProjects) return;

    fetch(`https://robinhood-bot-v2.onrender.com/pnl.json?_t=${Date.now()}`, { cache: 'no-store' })
      .then(response => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then(res => {
        if (res) {
          const pct = res.formatted_return_pct || (res.overall_return_pct !== undefined ? ((res.overall_return_pct >= 0 ? '+' : '') + Number(res.overall_return_pct).toFixed(2) + '%') : null);
          const isPositive = (Number(res.overall_return_pct) || 0) >= 0;
          if (pct) {
            [badgeIndex, badgeProjects].forEach(badge => applyBadgeStyle(badge, pct, isPositive));
          }
        }
      })
      .catch(err => {
        console.warn('Robinhood P&L fetch retry...', err);
      });
  }

  function initLivePnl() {
    fetchAlpacaPnl();
    fetchRobinhoodPnl();
  }

  // --- 5. SEAMLESS ZERO-FLASH ROUTER ---
  function initRouter() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link) return;
      const href = link.getAttribute('href');
      if (!href) return;

      if (
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        link.target === '_blank' ||
        link.hasAttribute('download')
      ) {
        return;
      }

      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin) {
        return;
      }

      e.preventDefault();
      navigateTo(url.href);
    });

    window.addEventListener('popstate', () => {
      loadPage(window.location.href, false);
    });
  }

  function navigateTo(url) {
    if (url === window.location.href) return;
    loadPage(url, true);
  }

  function loadPage(url, push = true) {
    fetch(url)
      .then(res => res.text())
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const newMain = doc.querySelector('main');
        const currentMain = document.querySelector('main');

        if (newMain && currentMain) {
          currentMain.innerHTML = newMain.innerHTML;
          currentMain.className = newMain.className;
          document.title = doc.title;

          document.body.className = doc.body.className;

          const newNavLinks = doc.querySelectorAll('.nav-link');
          const currentNavLinks = document.querySelectorAll('.nav-link');
          currentNavLinks.forEach((nav, idx) => {
            if (newNavLinks[idx]) {
              nav.className = newNavLinks[idx].className;
            }
          });

          if (push) {
            window.history.pushState({}, '', url);
          }

          window.scrollTo(0, 0);

          initFilter();
          initContact();
          initLivePnl();
          initTypewriter();
        } else {
          window.location.href = url;
        }
      })
      .catch(() => {
        window.location.href = url;
      });
  }

  // --- 6. DYNAMIC HERO TYPEWRITER ---
  let typewriterTimer = null;
  function initTypewriter() {
    const el = document.getElementById('typewriterText');
    if (!el) return;

    if (typewriterTimer) {
      clearTimeout(typewriterTimer);
      typewriterTimer = null;
    }

    const phrases = [
      'trading bots, AI workflows, and data pipelines.',
      'autonomous trading engines & market bots.',
      'multimodal AI assistants & voice agents.',
      'high-throughput scrapers & data pipelines.'
    ];

    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;

    // Clear initial content to animate fast typing on entrance
    el.textContent = '';

    function type() {
      const currentPhrase = phrases[phraseIdx];

      if (isDeleting) {
        charIdx--;
        el.textContent = currentPhrase.substring(0, charIdx);
      } else {
        charIdx++;
        el.textContent = currentPhrase.substring(0, charIdx);
      }

      let speed = isDeleting ? 20 : 34;

      if (!isDeleting && charIdx === currentPhrase.length) {
        speed = 3200; // Pause when phrase is fully typed
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        speed = 400; // Brief pause before typing next
      }

      typewriterTimer = setTimeout(type, speed);
    }

    typewriterTimer = setTimeout(type, 350);
  }

  initTheme();
  initFilter();
  initContact();
  initLivePnl();
  initTypewriter();
  initRouter();

  // Continuously refresh P&L every 15 seconds automatically
  setInterval(initLivePnl, 15000);
  window.addEventListener('pageshow', initLivePnl);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') initLivePnl();
  });

})();