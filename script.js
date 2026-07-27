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
      const category = card.getAttribute('data-category');
      if (filterValue === 'all' || category === filterValue) {
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
const modalClose = document.getElementById('modalClose');
const contactForm = document.getElementById('contactForm');
const formSubmitBtn = document.getElementById('formSubmitBtn');
const formStatus = document.getElementById('formStatus');

// Open modal
if (demoTrigger) {
  demoTrigger.addEventListener('click', (e) => {
    e.preventDefault();
    contactModal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Lock background scrolling
  });
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


