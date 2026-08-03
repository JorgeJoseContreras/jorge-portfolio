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

// --- LIVE P&L SCRAPE FOR ROBINHOOD BOT (via allorigins proxy) ---
const fetchRobinhoodPnL = () => {
  const badge = document.getElementById('robinhood-pnl-badge');
  if (!badge) return;

  const targetUrl = encodeURIComponent('https://robinhood-bot-v2.onrender.com/');
  fetch(`https://api.allorigins.win/get?url=${targetUrl}`)
    .then(res => {
      if (!res.ok) throw new Error('Proxy error');
      return res.json();
    })
    .then(data => {
      // Parse the HTML and find the #val-return-pct element
      const parser = new DOMParser();
      const doc = parser.parseFromString(data.contents, 'text/html');
      const el = doc.getElementById('val-return-pct');
      if (!el) throw new Error('Element not found');

      const text = el.textContent.trim(); // e.g. "-7.65%"
      badge.textContent = text;

      const isNegative = text.startsWith('-');
      if (!isNegative) {
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
      console.error('Error scraping Robinhood PnL:', err);
      badge.textContent = 'Offline';
      badge.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
      badge.style.color = '#9ca3af';
      badge.style.border = '1px solid rgba(255, 255, 255, 0.1)';
    });
};

// Run immediately upon script execution since script is loaded at the bottom of the document
fetchAlpacaPnL();
fetchRobinhoodPnL();

// Poll every 30 seconds
setInterval(fetchAlpacaPnL, 30000);
setInterval(fetchRobinhoodPnL, 30000);


