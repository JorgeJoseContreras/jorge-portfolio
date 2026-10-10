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
    const cards = document.querySelectorAll('#projectsGrid .editorial-card');

    if (!filterBtns.length || !cards.length) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        cards.forEach(card => {
          if (card.classList.contains('admin-hidden')) {
            card.style.display = 'none';
            return;
          }

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

  // --- 3. CONTACT HANDLING & SECRET ADMIN TRIGGER ---
  function initContact() {
    function checkAdminTrigger(nameVal, emailVal, statusEl) {
      if ((nameVal || '').trim().toLowerCase() === 'admin' && (emailVal || '').trim() === '01Imre38!@$') {
        localStorage.setItem('jorge_admin_authenticated', 'true');
        if (statusEl) {
          statusEl.textContent = 'Admin access granted. Redirecting...';
          statusEl.style.color = '#10b981';
        }
        setTimeout(() => {
          window.location.href = 'admin.html';
        }, 500);
        return true;
      }
      return false;
    }

    // 3A. Modal Popup
    const modal = document.getElementById('contactModal');
    const openBtns = [document.getElementById('heroContactBtn')];
    const closeBtn = document.getElementById('closeContactBtn');
    const form = document.getElementById('contactForm');
    const status = document.getElementById('contactStatus');

    if (modal) {
      const modalHeading = modal.querySelector('.modal-header h3');
      const msgInput = document.getElementById('contactMsg');

      openBtns.forEach(btn => {
        if (btn) {
          btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (modalHeading) modalHeading.textContent = 'Send a Note';
            if (msgInput) msgInput.value = '';
            modal.style.display = 'flex';
          });
        }
      });

      // Handle Request Access for projects without a dedicated live site
      document.addEventListener('click', (e) => {
        const accessBtn = e.target.closest('.request-access-btn');
        if (!accessBtn) return;
        e.preventDefault();
        const projectName = accessBtn.getAttribute('data-project') || 'this project';
        if (modalHeading) {
          modalHeading.textContent = `Request Access — ${projectName}`;
        }
        if (msgInput) {
          msgInput.value = `Hi Jorge, I'd like to request access / demo details for ${projectName}.`;
        }
        modal.style.display = 'flex';
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
        const modalBtn = form.querySelector('button[type="submit"]');
        if (modalBtn) {
          modalBtn.addEventListener('click', (e) => {
            const nameVal = form.querySelector('[name="name"]')?.value;
            const emailVal = form.querySelector('[name="contact_info"]')?.value;
            if (checkAdminTrigger(nameVal, emailVal, status)) {
              e.preventDefault();
              e.stopPropagation();
            }
          });
        }

        form.addEventListener('submit', (e) => {
          e.preventDefault();
          const nameVal = form.querySelector('[name="name"]')?.value;
          const emailVal = form.querySelector('[name="contact_info"]')?.value;
          if (checkAdminTrigger(nameVal, emailVal, status)) {
            return;
          }

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
      const standaloneBtn = standaloneForm.querySelector('button[type="submit"]');
      if (standaloneBtn) {
        standaloneBtn.addEventListener('click', (e) => {
          const nameVal = standaloneForm.querySelector('[name="name"]')?.value;
          const emailVal = standaloneForm.querySelector('[name="contact_info"]')?.value;
          if (checkAdminTrigger(nameVal, emailVal, pageStatus)) {
            e.preventDefault();
            e.stopPropagation();
          }
        });
      }

      standaloneForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameVal = standaloneForm.querySelector('[name="name"]')?.value;
        const emailVal = standaloneForm.querySelector('[name="contact_info"]')?.value;
        if (checkAdminTrigger(nameVal, emailVal, pageStatus)) {
          return;
        }

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

    const endpoints = [
      'https://invest.jorgejosecontreras.com/api/data',
      'https://alpaca-trading-bot-xw33.onrender.com/api/data',
      'https://invest.jorgejosecontreras.com/api/pnl',
      'https://alpaca-trading-bot-xw33.onrender.com/api/pnl'
    ];

    function tryNext(idx) {
      if (idx >= endpoints.length) return;
      fetch(endpoints[idx], { cache: 'no-store' })
        .then(response => {
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          return response.json();
        })
        .then(res => {
          if (res) {
            const data = res.data || res;
            const pnlVal = data.pnl_pct !== undefined ? Number(data.pnl_pct) : null;
            const pct = data.formatted_pct || (pnlVal !== null ? ((pnlVal >= 0 ? '+' : '') + pnlVal.toFixed(2) + '%') : null);
            const isPositive = data.is_positive !== undefined ? Boolean(data.is_positive) : ((pnlVal || 0) >= 0);
            
            if (pct) {
              [badgeIndex, badgeProjects].forEach(badge => applyBadgeStyle(badge, pct, isPositive));
            }
          }
        })
        .catch(err => {
          tryNext(idx + 1);
        });
    }

    tryNext(0);
  }

  function fetchRobinhoodPnl() {
    const badgeIndex = document.getElementById('pnlBadgeRobinhoodIndex');
    const badgeProjects = document.getElementById('pnlBadgeRobinhoodProjects');
    if (!badgeIndex && !badgeProjects) return;

    fetch('https://robinhood-bot-v2.onrender.com/pnl.json', { cache: 'no-store' })
      .then(response => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then(res => {
        if (res) {
          const pnlVal = res.overall_return_pct !== undefined ? Number(res.overall_return_pct) : null;
          const pct = res.formatted_return_pct || (pnlVal !== null ? ((pnlVal >= 0 ? '+' : '') + pnlVal.toFixed(2) + '%') : null);
          const isPositive = pnlVal !== null ? (pnlVal >= 0) : true;
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
        href.indexOf('admin.html') !== -1 ||
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

          applyAdminSettings();
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

  // --- 7. ADMIN SETTINGS CONTROLLER ---
  const DEFAULT_ADMIN_SETTINGS = {
    resume_enabled: true,
    projects: {
      'card-imessage': true,
      'card-alpaca': true,
      'card-robinhood': true,
      'card-foia': true,
      'card-mileage': true,
      'card-scholarflow': true,
      'card-discovery': true,
      'card-kalshi': false,
      'card-kraken': false,
      'card-adminbot': false,
      'card-zengine-monitor': false,
      'card-scholar-services': false,
      'card-csv-optimizer': false,
      'card-social': false
    }
  };

  const FIRESTORE_SETTINGS_URL = 'https://firestore.googleapis.com/v1/projects/jorge-portfolio-site/databases/(default)/documents/portfolio_config/settings';

  function parseFirestoreDoc(doc) {
    if (!doc || !doc.fields) return null;
    const res = {
      resume_enabled: doc.fields.resume_enabled ? !!doc.fields.resume_enabled.booleanValue : true,
      projects: Object.assign({}, DEFAULT_ADMIN_SETTINGS.projects)
    };
    if (doc.fields.projects && doc.fields.projects.mapValue && doc.fields.projects.mapValue.fields) {
      const pFields = doc.fields.projects.mapValue.fields;
      for (const k in pFields) {
        if (Object.prototype.hasOwnProperty.call(pFields, k)) {
          res.projects[k] = !!pFields[k].booleanValue;
        }
      }
    }
    return res;
  }

  function getAdminSettings() {
    try {
      const stored = localStorage.getItem('jorge_admin_settings');
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          resume_enabled: parsed.resume_enabled !== undefined ? parsed.resume_enabled : true,
          projects: Object.assign({}, DEFAULT_ADMIN_SETTINGS.projects, parsed.projects || {})
        };
      }
    } catch(e) {}
    return DEFAULT_ADMIN_SETTINGS;
  }

  function applyAdminSettings(customSettings) {
    const settings = customSettings || getAdminSettings();

    // 1. Resume Page Visibility & Access Control
    const resumeLinks = document.querySelectorAll('a[href*="resume.html"], #navResumeLink');
    if (!settings.resume_enabled) {
      document.documentElement.classList.add('hide-resume-nav');
      resumeLinks.forEach(link => { link.style.display = 'none'; });

      // If visitor is currently on resume.html directly while disabled and not authenticated as admin, redirect to index.html
      if (window.location.pathname.indexOf('resume.html') !== -1) {
        if (localStorage.getItem('jorge_admin_authenticated') !== 'true') {
          window.location.replace('index.html');
          return;
        }
      }
    } else {
      document.documentElement.classList.remove('hide-resume-nav');
      resumeLinks.forEach(link => { link.style.display = ''; });
      document.documentElement.classList.remove('resume-checking');
    }

    // 2. Project Card Visibility (projects.html)
    const cards = document.querySelectorAll('#projectsGrid .editorial-card');
    let visibleCount = 0;

    cards.forEach(card => {
      const pid = card.id;
      const isVisible = settings.projects[pid] !== false;

      if (!isVisible) {
        card.classList.add('admin-hidden');
        card.style.display = 'none';
      } else {
        card.classList.remove('admin-hidden');
        card.style.display = 'block';
        visibleCount++;
      }
    });

    // Update Project Count Filter Chip in projects.html
    const allChip = document.getElementById('filterChipAll');
    if (allChip) {
      allChip.textContent = `All (${visibleCount})`;
    }

    // Update Highlights Link in index.html
    const viewAllLink = document.getElementById('viewAllProjectsLink') || document.querySelector('.view-all-link');
    if (viewAllLink && viewAllLink.getAttribute('href') === 'projects.html') {
      viewAllLink.textContent = `All ${visibleCount} projects`;
    }
  }

  // Remote sync with Firestore for global persistence across all browsers/devices
  function syncRemoteSettings() {
    fetch(FIRESTORE_SETTINGS_URL)
      .then(response => {
        if (!response.ok) throw new Error('HTTP ' + response.status);
        return response.json();
      })
      .then(doc => {
        const parsed = parseFirestoreDoc(doc);
        if (parsed) {
          localStorage.setItem('jorge_admin_settings', JSON.stringify(parsed));
          applyAdminSettings(parsed);
        }
      })
      .catch(err => {
        document.documentElement.classList.remove('resume-checking');
        console.warn('Portfolio remote settings sync skipped:', err.message);
      });
  }

  initTheme();
  applyAdminSettings();
  syncRemoteSettings();
  initFilter();
  initContact();
  initLivePnl();
  initTypewriter();
  initRouter();

  // Continuously refresh P&L every 15 seconds automatically
  setInterval(initLivePnl, 15000);
  window.addEventListener('pageshow', () => {
    applyAdminSettings();
    syncRemoteSettings();
    initLivePnl();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      initLivePnl();
      syncRemoteSettings();
    }
  });

})();