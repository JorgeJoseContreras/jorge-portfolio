// JavaScript for Jorge Contreras Portfolio

// --- THEME TOGGLE SYSTEM ---
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});


// --- REVEAL ON SCROLL (INTERSECTION OBSERVER) ---
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target); // Reveal only once
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(element => {
  revealObserver.observe(element);
});

// --- BACK TO TOP BUTTON ---
const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// --- PROJECTS FILTERING ---
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filterValue = btn.getAttribute('data-filter');

    projectCards.forEach(card => {
      const category = card.getAttribute('data-category') || '';
      const categories = category.split(' ');
      if (filterValue === 'all' || categories.includes(filterValue)) {
        card.style.display = 'flex';
        // Trigger reflow for animation
        card.style.animation = 'none';
        card.offsetHeight; // Reflow
        card.style.animation = 'fadeIn 0.4s ease forwards';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// --- LIVE DEMO CONTACT MODAL ---
const contactModal = document.getElementById('contactModal');
const demoTrigger = document.getElementById('contactDemoTrigger');
const scholarshipTrigger = document.getElementById('scholarshipDemoTrigger');
const mileageTrigger = document.getElementById('mileageDemoTrigger');
const zengineMonitorTrigger = document.getElementById('zengineMonitorDemoTrigger');
const scholarServicesTrigger = document.getElementById('scholarServicesDemoTrigger');
const bulkPaymentsTrigger = document.getElementById('bulkPaymentsDemoTrigger');
const csvOptimizerTrigger = document.getElementById('csvOptimizerDemoTrigger');
const modalClose = document.getElementById('modalClose');
const contactForm = document.getElementById('contactForm');
const formSubmitBtn = document.getElementById('formSubmitBtn');
const formStatus = document.getElementById('formStatus');

// Open modal
const openModal = (e) => {
  e.preventDefault();
  
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const web3FormsSubject = document.getElementById('web3FormsSubject');
  const formMessageLabel = document.getElementById('formMessageLabel');
  const formMessage = document.getElementById('formMessage');
  
  if (e.currentTarget.id === 'contactDemoTrigger') {
    modalTitle.textContent = 'Request Live Demo';
    modalDesc.textContent = 'The Automated Multi-Modal Social Engagement Pipeline (AHB) runs locally on a connected emulator. Submit your contact details below to request a live demo or get detail sheets sent to your inbox!';
    web3FormsSubject.value = 'Live Demo Request - AHB App';
    formMessageLabel.textContent = 'Message / Request Detail';
    formMessage.placeholder = "Hi Jorge, I'd like to schedule a live demo or ask about...";
  } else if (e.currentTarget.id === 'scholarshipDemoTrigger') {
    modalTitle.textContent = 'Request Access';
    modalDesc.textContent = 'The Scholarship Disbursement Report Authorization Automation is an enterprise system. Submit your details below to request a demo or learn more about how it works.';
    web3FormsSubject.value = 'Demo Request - Scholarship Disbursement Automation';
    formMessageLabel.textContent = 'Message / Request Detail';
    formMessage.placeholder = "Hi Jorge, I'd like to learn more about the Scholarship Disbursement Automation...";
  } else if (e.currentTarget.id === 'mileageDemoTrigger') {
    modalTitle.textContent = 'Request a Demo';
    modalDesc.textContent = 'The Automated Mileage Report Generator is available for demonstration. Submit your details below and I will reach out to walk you through the tool!';
    web3FormsSubject.value = 'Demo Request - Mileage Report Generator';
    formMessageLabel.textContent = 'Message / Request Detail';
    formMessage.placeholder = "Hi Jorge, I'd like to see a demo of the Mileage Report Generator...";
  } else if (e.currentTarget.id === 'zengineMonitorDemoTrigger') {
    modalTitle.textContent = 'Request Access';
    modalDesc.textContent = 'The Zengine Disbursements Monitor tracks financial disbursements in real-time. Submit your details below to request more info or schedule a systems walk-through.';
    web3FormsSubject.value = 'Demo Request - Zengine Disbursements Monitor';
    formMessageLabel.textContent = 'Message / Request Detail';
    formMessage.placeholder = "Hi Jorge, I'd like to learn more about the Zengine Disbursements Monitor...";
  } else if (e.currentTarget.id === 'scholarServicesDemoTrigger') {
    modalTitle.textContent = 'Request Access';
    modalDesc.textContent = 'The Scholar Services App provides an optimized data workspace interface for departments. Submit your details below to schedule a workflow walkthrough.';
    web3FormsSubject.value = 'Demo Request - Scholar Services App';
    formMessageLabel.textContent = 'Message / Request Detail';
    formMessage.placeholder = "Hi Jorge, I'd like to request a demo of the Scholar Services App...";
  } else if (e.currentTarget.id === 'bulkPaymentsDemoTrigger') {
    modalTitle.textContent = 'Request Access';
    modalDesc.textContent = 'The Bulk Payments App is designed to simplify disbursement allocation forms inside Zengine. Submit your details below to see how it can optimize payment runs.';
    web3FormsSubject.value = 'Demo Request - Bulk Payments App';
    formMessageLabel.textContent = 'Message / Request Detail';
    formMessage.placeholder = "Hi Jorge, I'd like to request a demo of the Bulk Payments App...";
  } else if (e.currentTarget.id === 'csvOptimizerDemoTrigger') {
    modalTitle.textContent = 'Request Access';
    modalDesc.textContent = 'The Zengine CSV Optimizer leverages AI tools to clean and format spreadsheet uploads. Submit your details below to request access or detailed setup guides.';
    web3FormsSubject.value = 'Demo Request - Zengine CSV Optimizer';
    formMessageLabel.textContent = 'Message / Request Detail';
    formMessage.placeholder = "Hi Jorge, I'd like to request a demo or info on the CSV Optimizer...";
  } else {
    modalTitle.textContent = 'Contact Me';
    modalDesc.textContent = "Have a project in mind, a question about my work, or just want to connect? Send a message below and I'll get back to you shortly!";
    web3FormsSubject.value = 'Contact Form Submission - Portfolio';
    formMessageLabel.textContent = 'Your Message';
    formMessage.placeholder = "Hi Jorge, I'd like to reach out regarding...";
  }

  contactModal.classList.add('show');
  document.body.style.overflow = 'hidden'; // Lock background scrolling
};

if (demoTrigger) {
  demoTrigger.addEventListener('click', openModal);
}
if (scholarshipTrigger) {
  scholarshipTrigger.addEventListener('click', openModal);
}
if (mileageTrigger) {
  mileageTrigger.addEventListener('click', openModal);
}
if (zengineMonitorTrigger) {
  zengineMonitorTrigger.addEventListener('click', openModal);
}
if (scholarServicesTrigger) {
  scholarServicesTrigger.addEventListener('click', openModal);
}
if (bulkPaymentsTrigger) {
  bulkPaymentsTrigger.addEventListener('click', openModal);
}
if (csvOptimizerTrigger) {
  csvOptimizerTrigger.addEventListener('click', openModal);
}
const footerContactBtn = document.getElementById('contactFooterBtn');
if (footerContactBtn) {
  footerContactBtn.addEventListener('click', openModal);
}

// Close modal (via close button)
if (modalClose) {
  modalClose.addEventListener('click', () => {
    contactModal.classList.remove('show');
    document.body.style.overflow = '';
    contactForm.reset();
    formStatus.className = 'form-status';
    formStatus.textContent = '';
  });
}

// Close modal (via overlay click)
if (contactModal) {
  contactModal.addEventListener('click', (e) => {
    if (e.target === contactModal) {
      contactModal.classList.remove('show');
      document.body.style.overflow = '';
      contactForm.reset();
      formStatus.className = 'form-status';
      formStatus.textContent = '';
    }
  });
}

// Submit form via fetch
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Disable button during submit
    formSubmitBtn.disabled = true;
    formSubmitBtn.textContent = 'Sending...';
    formStatus.className = 'form-status';
    formStatus.textContent = '';

    const formData = new FormData(contactForm);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: json
    })
    .then(async (response) => {
      let res = await response.json();
      if (response.status == 200) {
        formStatus.classList.add('success');
        formStatus.textContent = 'Message sent successfully! I will reach out soon.';
        contactForm.reset();
      } else {
        console.error(response);
        formStatus.classList.add('error');
        formStatus.textContent = res.message || 'Something went wrong. Please try again.';
      }
    })
    .catch((error) => {
      console.error(error);
      formStatus.classList.add('error');
      formStatus.textContent = 'Network error. Please try again later.';
    })
    .then(() => {
      formSubmitBtn.disabled = false;
      formSubmitBtn.textContent = 'Send Message';
      // Auto-hide modal after 3 seconds on success
      if (formStatus.classList.contains('success')) {
        setTimeout(() => {
          contactModal.classList.remove('show');
          document.body.style.overflow = '';
          formStatus.className = 'form-status';
          formStatus.textContent = '';
        }, 3000);
      }
    });
  });
}

// --- LIVE P&L FETCH FOR ALPACA BOT ---
const fetchAlpacaPnL = () => {
  const badge = document.getElementById('alpaca-pnl-badge');
  if (!badge) return;

  fetch('https://invest.jorgejosecontreras.com/api/data')
    .then(res => {
      if (!res.ok) throw new Error('Response error');
      return res.json();
    })
    .then(data => {
      const pnlUsd = data.pnl_usd || 0;
      const pnlPct = data.pnl_pct || 0;
      const formattedPct = pnlPct >= 0 ? `+${pnlPct.toFixed(2)}%` : `${pnlPct.toFixed(2)}%`;
      
      badge.textContent = formattedPct;
      
      if (pnlUsd >= 0) {
        badge.style.backgroundColor = 'rgba(16, 185, 129, 0.15)'; // light green bg
        badge.style.color = '#10B981'; // emerald green
        badge.style.border = '1px solid rgba(16, 185, 129, 0.3)';
      } else {
        badge.style.backgroundColor = 'rgba(239, 68, 68, 0.15)'; // light red bg
        badge.style.color = '#EF4444'; // red
        badge.style.border = '1px solid rgba(239, 68, 68, 0.3)';
      }
    })
    .catch(err => {
      console.error('Error fetching Alpaca PnL:', err);
      // Fallback state
      badge.textContent = 'Offline';
      badge.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
      badge.style.color = '#9ca3af';
      badge.style.border = '1px solid rgba(255, 255, 255, 0.1)';
    });
};

// --- LIVE P&L FETCH FOR ROBINHOOD BOT (via allorigins proxy → /api/portfolio JSON) ---
const fetchRobinhoodPnL = () => {
  const badge = document.getElementById('robinhood-pnl-badge');
  if (!badge) return;

  const targetUrl = encodeURIComponent('https://robinhood-bot-v2.onrender.com/api/portfolio');
  fetch(`https://api.allorigins.win/get?url=${targetUrl}`)
    .then(res => {
      if (!res.ok) throw new Error('Proxy error');
      return res.json();
    })
    .then(proxy => {
      const data = JSON.parse(proxy.contents);
      if (data.error) throw new Error(data.error);

      const equity = parseFloat(data.account.equity || data.account.cash || 0);
      // P&L % from initial $1000 deposit (same formula as the bot dashboard)
      const pnlPct = ((equity - 1000) / 1000) * 100;
      const formattedPct = pnlPct >= 0 ? `+${pnlPct.toFixed(2)}%` : `${pnlPct.toFixed(2)}%`;

      badge.textContent = formattedPct;

      if (pnlPct >= 0) {
        badge.style.backgroundColor = 'rgba(16, 185, 129, 0.15)';
        badge.style.color = '#10B981';
        badge.style.border = '1px solid rgba(16, 185, 129, 0.3)';
      } else {
        badge.style.backgroundColor = 'rgba(239, 68, 68, 0.15)';
        badge.style.color = '#EF4444';
        badge.style.border = '1px solid rgba(239, 68, 68, 0.3)';
      }
    })
    .catch(err => {
      console.error('Error fetching Robinhood PnL:', err);
      badge.textContent = 'Offline';
      badge.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
      badge.style.color = '#9ca3af';
      badge.style.border = '1px solid rgba(255, 255, 255, 0.1)';
    });
};

// --- LIVE P&L FETCH FOR KRAKEN CRYPTO BOT ---
const fetchKrakenPnL = () => {
  const badge = document.getElementById('kraken-pnl-badge');
  if (!badge) return;

  const targetUrl = encodeURIComponent('https://kraken-trading-bot-lafb.onrender.com/health');
  fetch(`https://api.allorigins.win/get?url=${targetUrl}`)
    .then(res => {
      if (!res.ok) throw new Error('Proxy error');
      return res.json();
    })
    .then(proxy => {
      const data = JSON.parse(proxy.contents);
      const state = data.state;
      const balances = state.balances || {};
      const prices = state.prices || {};
      const initialDeposit = state.initial_deposit || 100.0;

      // Compute net liquidation: USD cash + all crypto holdings × current price
      let netLiq = parseFloat(balances['USD'] || 0);
      for (const [coin, amount] of Object.entries(balances)) {
        if (coin === 'USD') continue;
        const price = parseFloat(prices[`${coin}/USD`] || 0);
        netLiq += parseFloat(amount || 0) * price;
      }

      const allTimePLPct = initialDeposit > 0 ? ((netLiq - initialDeposit) / initialDeposit) * 100 : 0;
      const formattedPct = allTimePLPct >= 0 ? `+${allTimePLPct.toFixed(2)}%` : `${allTimePLPct.toFixed(2)}%`;

      badge.textContent = formattedPct;

      if (allTimePLPct >= 0) {
        badge.style.backgroundColor = 'rgba(16, 185, 129, 0.15)';
        badge.style.color = '#10B981';
        badge.style.border = '1px solid rgba(16, 185, 129, 0.3)';
      } else {
        badge.style.backgroundColor = 'rgba(239, 68, 68, 0.15)';
        badge.style.color = '#EF4444';
        badge.style.border = '1px solid rgba(239, 68, 68, 0.3)';
      }
    })
    .catch(err => {
      console.error('Error fetching Kraken PnL:', err);
      badge.textContent = 'Offline';
      badge.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
      badge.style.color = '#9ca3af';
      badge.style.border = '1px solid rgba(255, 255, 255, 0.1)';
    });
};

// --- LIVE P&L FETCH FOR KALSHI PREDICTION MARKET BOT ---
const fetchKalshiPnL = () => {
  const badge = document.getElementById('kalshi-pnl-badge');
  if (!badge) return;

  const targetUrl = encodeURIComponent('https://kalshi-trading-bot-70rb.onrender.com/api/data');
  fetch(`https://api.allorigins.win/get?url=${targetUrl}`)
    .then(res => {
      if (!res.ok) throw new Error('Proxy error');
      return res.json();
    })
    .then(proxy => {
      const data = JSON.parse(proxy.contents);
      if (data.error) throw new Error(data.error);

      const totalPnl = parseFloat(data.total_pnl || 0);
      const totalDeposits = parseFloat(data.total_deposits || 1);
      const pnlPct = (totalPnl / totalDeposits) * 100;
      const formattedPct = pnlPct >= 0 ? `+${pnlPct.toFixed(2)}%` : `${pnlPct.toFixed(2)}%`;

      badge.textContent = formattedPct;

      if (pnlPct >= 0) {
        badge.style.backgroundColor = 'rgba(16, 185, 129, 0.15)';
        badge.style.color = '#10B981';
        badge.style.border = '1px solid rgba(16, 185, 129, 0.3)';
      } else {
        badge.style.backgroundColor = 'rgba(239, 68, 68, 0.15)';
        badge.style.color = '#EF4444';
        badge.style.border = '1px solid rgba(239, 68, 68, 0.3)';
      }
    })
    .catch(err => {
      console.error('Error fetching Kalshi PnL:', err);
      badge.textContent = 'Offline';
      badge.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
      badge.style.color = '#9ca3af';
      badge.style.border = '1px solid rgba(255, 255, 255, 0.1)';
    });
};

// Run immediately upon script execution since script is loaded at the bottom of the document
fetchAlpacaPnL();
fetchRobinhoodPnL();
fetchKrakenPnL();
fetchKalshiPnL();

// Poll every 30 seconds
setInterval(fetchAlpacaPnL, 30000);
setInterval(fetchRobinhoodPnL, 30000);
setInterval(fetchKrakenPnL, 30000);
setInterval(fetchKalshiPnL, 30000);

// =============================================================
// --- DYNAMIC LOGO LETTER WAVE EFFECT ---
// =============================================================
function initLogoWave() {
  const logoLink = document.getElementById('logoLink');
  if (!logoLink) return;

  const text = logoLink.textContent.trim();
  logoLink.innerHTML = '';

  const spans = [];
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const span = document.createElement('span');
    if (char === ' ') {
      span.className = 'logo-space';
      span.innerHTML = '&nbsp;';
    } else {
      span.className = 'logo-letter';
      span.textContent = char;
    }
    logoLink.appendChild(span);
    spans.push(span);
  }

  const radius = 65; // Influence radius in px

  logoLink.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    spans.forEach(span => {
      if (span.classList.contains('logo-space')) return;
      const rect = span.getBoundingClientRect();
      const center = rect.left + rect.width / 2;
      const dist = Math.abs(mouseX - center);

      if (dist < radius) {
        const factor = Math.cos((dist / radius) * (Math.PI / 2)); // Smooth cosine wave curve
        const translateY = -14 * factor;
        const scale = 1 + 0.25 * factor;
        const rotate = (mouseX < center ? 12 : -12) * factor;
        span.style.transform = `translateY(${translateY}px) scale(${scale}) rotate(${rotate}deg)`;
        span.style.filter = `drop-shadow(0 6px 12px rgba(168, 85, 247, ${0.4 * factor}))`;
      } else {
        span.style.transform = 'translateY(0) scale(1) rotate(0deg)';
        span.style.filter = 'none';
      }
    });
  });

  logoLink.addEventListener('mouseleave', () => {
    spans.forEach(span => {
      span.style.transform = 'translateY(0) scale(1) rotate(0deg)';
      span.style.filter = 'none';
    });
  });
}

// =============================================================
// --- FILE-PERSISTENT ADMIN PANEL SYSTEM ---
// =============================================================

const ADMIN_PASSWORD = '0138';
const ADMIN_SESSION_KEY = 'adminSession';

// All projects: [cardId, displayName]
const ADMIN_PROJECTS = [
  ['card-imessage',        'iMessage AI Assistant'],
  ['card-adminbot',        'Admin Coding Bot'],
  ['card-alpaca',          'Agentic Stock Trading Bot'],
  ['card-robinhood',       'Telegram Stock Trading Bot'],
  ['card-kraken',          'Agentic Crypto Trading Bot'],
  ['card-kalshi',          'Agentic Prediction Market Bot'],
  ['card-scholarship',     'Scholarship Disbursement Authorization Automation'],
  ['card-mileage',         'Automated Mileage Report Generator'],
  ['card-zengine-monitor', 'Zengine Disbursements Monitor'],
  ['card-scholar-services','Scholar Services Zengine App'],
  ['card-bulk-payments',   'Zengine Live Form Data Editor'],
  ['card-csv-optimizer',   'Zengine CSV Optimizer'],
  ['card-social',          'Automated Multi-Modal Social Engagement Pipeline'],
];

// Investment badges: [badgeId, displayName]
const ADMIN_BADGES = [
  ['alpaca-pnl-badge',   'Alpaca — Agentic Stock Bot'],
  ['robinhood-pnl-badge','Robinhood — Telegram Stock Bot'],
  ['kraken-pnl-badge',   'Kraken — Agentic Crypto Bot'],
  ['kalshi-pnl-badge',   'Kalshi — Prediction Market Bot'],
];

let fileAdminSettings = {};

async function fetchAdminConfigFile() {
  try {
    const res = await fetch('admin-settings.json?t=' + Date.now());
    if (res.ok) {
      fileAdminSettings = await res.json();
    }
  } catch (e) {
    console.warn('Could not fetch admin-settings.json:', e);
  }
}

function getMergedAdminSettings() {
  let local = {};
  try { local = JSON.parse(localStorage.getItem('adminSettings') || '{}'); } catch {}
  return Object.assign({}, fileAdminSettings, local);
}

function saveAdminSettings(s) {
  localStorage.setItem('adminSettings', JSON.stringify(s));
  fileAdminSettings = Object.assign({}, fileAdminSettings, s);
}

function applyAdminSettings() {
  const s = getMergedAdminSettings();
  ADMIN_PROJECTS.forEach(([id]) => {
    const el = document.getElementById(id);
    if (el) el.style.display = (s[id] === false) ? 'none' : '';
  });
  ADMIN_BADGES.forEach(([id]) => {
    const el = document.getElementById(id);
    if (el) el.style.display = (s['badge_' + id] === false) ? 'none' : '';
  });
}

function populateAdminPanel() {
  const s = getMergedAdminSettings();
  const projectList = document.getElementById('adminProjectList');
  projectList.innerHTML = '';
  ADMIN_PROJECTS.forEach(([id, label]) => {
    const visible = s[id] !== false;
    const row = document.createElement('label');
    row.style.cssText = 'display:flex;align-items:center;gap:12px;cursor:pointer;padding:10px 14px;border-radius:8px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);';
    row.innerHTML = `<input type="checkbox" data-id="${id}" ${visible ? 'checked' : ''} style="width:16px;height:16px;accent-color:#8b5cf6;cursor:pointer;"><span style="color:var(--text-primary,#fff);font-size:0.88rem;flex:1;">${label}</span>`;
    projectList.appendChild(row);
  });

  const badgeList = document.getElementById('adminBadgeList');
  badgeList.innerHTML = '';
  ADMIN_BADGES.forEach(([id, label]) => {
    const visible = s['badge_' + id] !== false;
    const row = document.createElement('label');
    row.style.cssText = 'display:flex;align-items:center;gap:12px;cursor:pointer;padding:10px 14px;border-radius:8px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);';
    row.innerHTML = `<input type="checkbox" data-badge="${id}" ${visible ? 'checked' : ''} style="width:16px;height:16px;accent-color:#8b5cf6;cursor:pointer;"><span style="color:var(--text-primary,#fff);font-size:0.88rem;flex:1;">${label}</span>`;
    badgeList.appendChild(row);
  });
}

const adminLoginModal = document.getElementById('adminLoginModal');
const adminPanelModal = document.getElementById('adminPanelModal');

function showAdminLogin() {
  document.getElementById('adminPasswordInput').value = '';
  document.getElementById('adminLoginError').style.display = 'none';
  adminLoginModal.style.display = 'flex';
  setTimeout(() => document.getElementById('adminPasswordInput').focus(), 50);
}
function hideAdminLogin() { adminLoginModal.style.display = 'none'; }
function showAdminPanel() { populateAdminPanel(); adminPanelModal.style.display = 'flex'; }
function hideAdminPanel() { adminPanelModal.style.display = 'none'; }

// Hidden bottom-left trigger
const adminTrigger = document.getElementById('adminTrigger');
if (adminTrigger) {
  adminTrigger.addEventListener('click', () => {
    sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true' ? showAdminPanel() : showAdminLogin();
  });
}

// Login logic
const adminLoginSubmit = document.getElementById('adminLoginSubmit');
if (adminLoginSubmit) {
  adminLoginSubmit.addEventListener('click', () => {
    const val = document.getElementById('adminPasswordInput').value.trim();
    if (val === ADMIN_PASSWORD) {
      sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
      hideAdminLogin();
      showAdminPanel();
    } else {
      document.getElementById('adminLoginError').style.display = 'block';
      document.getElementById('adminPasswordInput').value = '';
      document.getElementById('adminPasswordInput').focus();
    }
  });
}

const adminPasswordInput = document.getElementById('adminPasswordInput');
if (adminPasswordInput) {
  adminPasswordInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') adminLoginSubmit.click();
  });
}

const adminLoginCancel = document.getElementById('adminLoginCancel');
if (adminLoginCancel) adminLoginCancel.addEventListener('click', hideAdminLogin);

// Panel controls
const adminPanelClose = document.getElementById('adminPanelClose');
if (adminPanelClose) adminPanelClose.addEventListener('click', hideAdminPanel);

const adminSaveBtn = document.getElementById('adminSaveBtn');
if (adminSaveBtn) {
  adminSaveBtn.addEventListener('click', () => {
    const s = getMergedAdminSettings();
    document.querySelectorAll('#adminProjectList input[data-id]').forEach(cb => { s[cb.dataset.id] = cb.checked; });
    document.querySelectorAll('#adminBadgeList input[data-badge]').forEach(cb => { s['badge_' + cb.dataset.badge] = cb.checked; });
    saveAdminSettings(s);
    applyAdminSettings();
    hideAdminPanel();
  });
}

// Export admin-settings.json file download
const adminExportBtn = document.getElementById('adminExportBtn');
if (adminExportBtn) {
  adminExportBtn.addEventListener('click', () => {
    const s = getMergedAdminSettings();
    document.querySelectorAll('#adminProjectList input[data-id]').forEach(cb => { s[cb.dataset.id] = cb.checked; });
    document.querySelectorAll('#adminBadgeList input[data-badge]').forEach(cb => { s['badge_' + cb.dataset.badge] = cb.checked; });
    
    const jsonStr = JSON.stringify(s, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'admin-settings.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });
}

const adminLogoutBtn = document.getElementById('adminLogoutBtn');
if (adminLogoutBtn) {
  adminLogoutBtn.addEventListener('click', () => {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    hideAdminPanel();
  });
}

// Close on backdrop click
if (adminLoginModal) adminLoginModal.addEventListener('click', e => { if (e.target === adminLoginModal) hideAdminLogin(); });
if (adminPanelModal) adminPanelModal.addEventListener('click', e => { if (e.target === adminPanelModal) hideAdminPanel(); });

// =============================================================
// --- GITHUB REPO LAST UPDATED DATE FETCHING & CACHING ---
// =============================================================

const DEFAULT_REPO_DATES = {
  'JorgeJoseContreras/notification-assistant': '2026-08-05T01:32:03Z',
  'JorgeJoseContreras/jorges-coder-bot': '2026-08-03T00:54:07Z',
  'JorgeJoseContreras/alpaca-trading-bot': '2026-08-04T22:22:40Z',
  'JorgeJoseContreras/robinhood-telegram-bot': '2026-08-05T00:44:17Z',
  'JorgeJoseContreras/kraken-trading-bot': '2026-08-04T22:16:37Z',
  'JorgeJoseContreras/kalshi-trading-bot': '2026-08-05T01:40:27Z',
  'Jorge-GSSF/Zengine-Disbursements-Auto-Auth': '2026-08-04T14:46:20Z',
  'Jorge-GSSF/Mileage-Maps-Generator': '2026-07-30T20:23:16Z',
  'Jorge-GSSF/zengine-disbursement-monitor': '2026-08-04T18:16:59Z',
  'Jorge-GSSF/Scholar-Services-App': '2026-07-30T20:15:38Z',
  'Jorge-GSSF/Bulk-Payments-App': '2026-07-30T20:14:11Z',
  'Jorge-GSSF/zengine-csv-optimizer': '2026-07-30T20:14:11Z',
  'JorgeJoseContreras/AHB-AMMSEP': '2026-07-27T02:12:49Z'
};

const GH_CACHE_KEY = 'gh_repo_updates_cache_v2';
const GH_CACHE_DURATION_MS = 60 * 60 * 1000; // 1 hour cache

function getCachedGitHubUpdates() {
  try {
    const raw = localStorage.getItem(GH_CACHE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

function setCachedGitHubUpdate(repoKey, pushedAt) {
  const cache = getCachedGitHubUpdates();
  cache[repoKey] = { pushed_at: pushedAt, timestamp: Date.now() };
  try { localStorage.setItem(GH_CACHE_KEY, JSON.stringify(cache)); } catch {}
}

async function fetchRepoPushedAt(ownerRepo) {
  const cache = getCachedGitHubUpdates();
  const cached = cache[ownerRepo];
  if (cached && (Date.now() - cached.timestamp < GH_CACHE_DURATION_MS)) {
    return cached.pushed_at;
  }

  try {
    const res = await fetch(`https://api.github.com/repos/${ownerRepo}`);
    if (res.ok) {
      const data = await res.json();
      const pushedAt = data.pushed_at || data.updated_at;
      if (pushedAt) {
        setCachedGitHubUpdate(ownerRepo, pushedAt);
        return pushedAt;
      }
    }
  } catch (e) {
    console.warn(`Could not fetch GitHub API for ${ownerRepo}:`, e);
  }

  return cached ? cached.pushed_at : null;
}

function formatGitHubDate(isoString) {
  if (!isoString) return 'Updated recently';
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return 'Updated recently';

  const now = new Date();
  const diffMs = now - date;
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours >= 0 && diffHours < 1) return 'Updated just now';
  if (diffHours >= 1 && diffHours < 24) return `Updated ${diffHours}h ago`;
  if (diffDays === 1) return 'Updated yesterday';
  if (diffDays > 1 && diffDays < 7) return `Updated ${diffDays} days ago`;

  return 'Updated ' + date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function initProjectUpdateDates() {
  const cards = document.querySelectorAll('.project-card');
  const cache = getCachedGitHubUpdates();

  cards.forEach(async (card) => {
    const ghLink = card.querySelector('a.project-link[href*="github.com/"]');
    if (!ghLink) return;

    const href = ghLink.getAttribute('href');
    const match = href.match(/github\.com\/([^\/]+\/[^\/\s#]+)/);
    if (!match) return;

    const ownerRepo = match[1].replace(/\.git$/, '');
    const initialIso = (cache[ownerRepo] && cache[ownerRepo].pushed_at) || DEFAULT_REPO_DATES[ownerRepo];
    const initialFormatted = formatGitHubDate(initialIso);

    let badge = card.querySelector('.project-updated-badge');
    if (!badge) {
      badge = document.createElement('div');
      badge.className = 'project-updated-badge';
      badge.innerHTML = `
        <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
        <span class="updated-date-text">${initialFormatted}</span>
      `;
      const linksContainer = card.querySelector('.project-links');
      if (linksContainer) {
        linksContainer.parentNode.insertBefore(badge, linksContainer);
      } else {
        card.querySelector('.project-info').appendChild(badge);
      }
    } else {
      const dateTextEl = badge.querySelector('.updated-date-text');
      if (dateTextEl && initialFormatted) {
        dateTextEl.textContent = initialFormatted;
      }
    }

    // Fetch live update if public / available
    const livePushedAt = await fetchRepoPushedAt(ownerRepo);
    if (livePushedAt) {
      const dateTextEl = badge.querySelector('.updated-date-text');
      if (dateTextEl) {
        dateTextEl.textContent = formatGitHubDate(livePushedAt);
      }
    }
  });
}

function initCardTilt() {
  const cards = document.querySelectorAll('.project-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      // Tilt max 8 degrees for physical 3D effect
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      const xPct = (x / rect.width) * 100;
      const yPct = (y / rect.height) * 100;

      card.style.setProperty('--mouse-x', `${xPct}%`);
      card.style.setProperty('--mouse-y', `${yPct}%`);
      card.style.setProperty('--mouse-x-px', `${x}px`);
      card.style.setProperty('--mouse-y-px', `${y}px`);
      card.style.setProperty('--rotate-x', `${rotateX}deg`);
      card.style.setProperty('--rotate-y', `${rotateY}deg`);
      card.style.setProperty('--card-translate-y', `-6px`);
      card.style.setProperty('--card-scale', `1.015`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--mouse-x', '50%');
      card.style.setProperty('--mouse-y', '50%');
      card.style.setProperty('--mouse-x-px', '0px');
      card.style.setProperty('--mouse-y-px', '0px');
      card.style.setProperty('--rotate-x', '0deg');
      card.style.setProperty('--rotate-y', '0deg');
      card.style.setProperty('--card-translate-y', '0px');
      card.style.setProperty('--card-scale', '1');
    });
  });
}

function initDotMatrix() {
  const canvas = document.getElementById('matrixCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;
  
  let mouse = { x: -1000, y: -1000 };
  
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  
  window.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });
  
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const spacing = 50;
  
  function draw() {
    ctx.clearRect(0, 0, width, height);
    
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    const baseColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)';
    const glowColor = isDark ? 'rgba(168, 85, 247, 0.65)' : 'rgba(124, 58, 237, 0.65)';
    
    const cols = Math.ceil(width / spacing) + 1;
    const rows = Math.ceil(height / spacing) + 1;
    
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        const x = c * spacing;
        const y = r * spacing;
        
        const dx = mouse.x - x;
        const dy = mouse.y - y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        let radius = 1.2;
        let color = baseColor;
        
        if (dist < 150) {
          const factor = (150 - dist) / 150;
          radius = 1.2 + factor * 2.8;
          ctx.beginPath();
          ctx.arc(x, y, radius * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = isDark ? `rgba(168, 85, 247, ${factor * 0.1})` : `rgba(124, 58, 237, ${factor * 0.1})`;
          ctx.fill();
          
          color = glowColor;
        }
        
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      }
    }
    
    requestAnimationFrame(draw);
  }
  
  draw();
}

function initCardColumnScrollParallax() {
  const cards = document.querySelectorAll('.project-card');
  
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    cards.forEach((card, idx) => {
      const speed = idx % 2 === 0 ? 0.04 : -0.04;
      const offset = scrollY * speed;
      if (window.innerWidth > 768) {
        card.style.setProperty('--scroll-translate-y', `${offset}px`);
      } else {
        card.style.setProperty('--scroll-translate-y', `0px`);
      }
    });
  });
}

function initLiveClock() {
  const clock = document.getElementById('miamiClock');
  if (!clock) return;
  
  function updateTime() {
    const now = new Date();
    const options = {
      timeZone: 'America/New_York',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    const timeString = new Intl.DateTimeFormat('en-US', options).format(now);
    clock.textContent = `EST ${timeString}`;
  }
  
  setInterval(updateTime, 1000);
  updateTime();
}

function initScrollReveal() {
  const revealTexts = document.querySelectorAll('.reveal-text');
  
  revealTexts.forEach(el => {
    const text = el.textContent.trim();
    const words = text.split(/\s+/);
    el.innerHTML = '';
    
    words.forEach((word, idx) => {
      const span = document.createElement('span');
      span.className = 'reveal-word';
      span.textContent = word;
      span.style.transitionDelay = `${idx * 40}ms`;
      el.appendChild(span);
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const words = entry.target.querySelectorAll('.reveal-word');
        words.forEach(word => word.classList.add('revealed'));
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });

  revealTexts.forEach(el => observer.observe(el));
}

// Initialization on DOM load
initLogoWave();
initProjectUpdateDates();
initCardTilt();
initScrollReveal();
initDotMatrix();
initCardColumnScrollParallax();
initLiveClock();
fetchAdminConfigFile().then(() => {
  applyAdminSettings();
});

