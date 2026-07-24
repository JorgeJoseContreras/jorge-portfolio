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

// --- MOBILE MENU HAMBURGER ---
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  menuToggle.classList.toggle('active');
});

// Close mobile menu when nav link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    menuToggle.classList.remove('active');
  });
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

// --- SKILLS DYNAMIC CATEGORY RENDER ---
const skillData = {
  languages: [
    { name: 'JavaScript', icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>` },
    { name: 'TypeScript', icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline></svg>` },
    { name: 'Python', icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 12m-9 0a9 9 0 1 1 18 0a9 9 0 1 1 -18 0"></path><path d="M12 12h.01"></path></svg>` },
    { name: 'Go', icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>` }
  ],
  frameworks: [
    { name: 'React', icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)"></ellipse><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(90 12 12)"></ellipse><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(150 12 12)"></ellipse><circle cx="12" cy="12" r="1"></circle></svg>` },
    { name: 'Next.js', icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path><path d="M2 12h20"></path></svg>` },
    { name: 'Node.js', icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path></svg>` },
    { name: 'Express', icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="9" x2="15" y2="15"></line><line x1="15" y1="9" x2="9" y2="15"></line></svg>` },
    { name: 'TailwindCSS', icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 3v18M3 12h18"></path></svg>` }
  ],
  tools: [
    { name: 'Git', icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="18" cy="18" r="3"></circle><circle cx="6" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><line x1="6" y1="9" x2="6" y2="15"></line><path d="M9 18h3a3 3 0 0 0 3-3V9"></path></svg>` },
    { name: 'Docker', icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="4" ry="4"></rect><line x1="6" y1="6" x2="18" y2="6"></line><line x1="6" y1="12" x2="18" y2="12"></line><line x1="6" y1="18" x2="18" y2="18"></line></svg>` },
    { name: 'Kubernetes', icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5"></polygon><line x1="12" y1="2" x2="12" y2="22"></line><line x1="2" y1="15.5" x2="22" y2="8.5"></line><line x1="2" y1="8.5" x2="22" y2="15.5"></line></svg>` },
    { name: 'AWS', icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M2 17h20L12 4z"></path></svg>` },
    { name: 'InfluxDB', icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"></rect><path d="M21 16H3M12 3v13"></path></svg>` }
  ]
};

const skillsGrid = document.getElementById('skillsGrid');
const skillCategoryButtons = document.querySelectorAll('.skills-category-btn');

function renderSkills(category) {
  skillsGrid.innerHTML = '';
  
  const skills = skillData[category];
  skills.forEach((skill, index) => {
    const card = document.createElement('div');
    card.className = 'skill-card';
    card.setAttribute('data-skill-type', category);
    card.style.opacity = '0';
    card.style.transform = 'translateY(15px)';
    card.style.transition = 'all 0.3s ease-out';
    card.style.transitionDelay = `${index * 0.05}s`;
    
    card.innerHTML = `
      ${skill.icon}
      <div class="skill-name">${skill.name}</div>
    `;
    
    skillsGrid.appendChild(card);
    
    // Trigger animations in a small timeout
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 20);
  });
}

skillCategoryButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    skillCategoryButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const category = btn.getAttribute('data-category');
    renderSkills(category);
  });
});

// Initial render
renderSkills('languages');

// --- CONTACT FORM SUBMISSION ---
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Get values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  
  // Here we would normally send to an API
  console.log('Sending message:', { name, email, message });
  
  // Simple animations for success state
  contactForm.style.transition = 'opacity 0.3s ease';
  contactForm.style.opacity = '0';
  
  setTimeout(() => {
    contactForm.style.display = 'none';
    successMessage.style.display = 'block';
    // Small timeout to trigger CSS fade-in
    setTimeout(() => {
      successMessage.classList.add('show');
    }, 20);
  }, 300);
});
