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

  fetch('https://alpaca-trading-bot-xw33.onrender.com/api/data')
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
// --- ADMIN PANEL SYSTEM ---
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

function loadAdminSettings() {
  try { return JSON.parse(localStorage.getItem('adminSettings') || '{}'); } catch { return {}; }
}
function saveAdminSettings(s) { localStorage.setItem('adminSettings', JSON.stringify(s)); }

function applyAdminSettings() {
  const s = loadAdminSettings();
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
  const s = loadAdminSettings();
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
document.getElementById('adminTrigger').addEventListener('click', () => {
  sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true' ? showAdminPanel() : showAdminLogin();
});

// Login logic
document.getElementById('adminLoginSubmit').addEventListener('click', () => {
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
document.getElementById('adminPasswordInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') document.getElementById('adminLoginSubmit').click();
});
document.getElementById('adminLoginCancel').addEventListener('click', hideAdminLogin);

// Panel controls
document.getElementById('adminPanelClose').addEventListener('click', hideAdminPanel);

document.getElementById('adminSaveBtn').addEventListener('click', () => {
  const s = loadAdminSettings();
  document.querySelectorAll('#adminProjectList input[data-id]').forEach(cb => { s[cb.dataset.id] = cb.checked; });
  document.querySelectorAll('#adminBadgeList input[data-badge]').forEach(cb => { s['badge_' + cb.dataset.badge] = cb.checked; });
  saveAdminSettings(s);
  applyAdminSettings();
  hideAdminPanel();
});

document.getElementById('adminLogoutBtn').addEventListener('click', () => {
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
  hideAdminPanel();
});

// Close on backdrop click
adminLoginModal.addEventListener('click', e => { if (e.target === adminLoginModal) hideAdminLogin(); });
adminPanelModal.addEventListener('click', e => { if (e.target === adminPanelModal) hideAdminPanel(); });

// Apply on load
applyAdminSettings();
