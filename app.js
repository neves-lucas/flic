// ===== Navigation Scroll Effect =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== Mobile Menu Toggle =====
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.getElementById('nav-links');

mobileMenuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  mobileMenuBtn.classList.toggle('active');
});

// ===== Smooth Scroll for Navigation Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      navLinks.classList.remove('active');
      mobileMenuBtn.classList.remove('active');
    }
  });
});

// ===== Animated Counter =====
function animateCounter(element, target, suffix = '') {
  const duration = 2000;
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const updateCounter = () => {
    current += increment;
    if (current < target) {
      element.textContent = Math.floor(current);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  };

  updateCounter();
}

// Intersection Observer for counters
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll('.stat-number');
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        animateCounter(counter, target);
      });
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
  counterObserver.observe(heroStats);
}

// ===== Testimonials Carousel =====
const carousel = document.getElementById('testimonials-carousel');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const dotsContainer = document.getElementById('carousel-dots');

let currentSlide = 0;

function initCarousel() {
  if (!carousel) return;

  const cards = carousel.querySelectorAll('.testimonial-card');
  const totalSlides = cards.length;

  // Create dots
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }

  function updateDots() {
    document.querySelectorAll('.carousel-dots .dot').forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
  }

  function goToSlide(index) {
    currentSlide = index;
    const cardWidth = cards[0].offsetWidth + 24;
    carousel.scrollTo({ left: cardWidth * currentSlide, behavior: 'smooth' });
    updateDots();
  }

  prevBtn.addEventListener('click', () => {
    currentSlide = currentSlide > 0 ? currentSlide - 1 : totalSlides - 1;
    goToSlide(currentSlide);
  });

  nextBtn.addEventListener('click', () => {
    currentSlide = currentSlide < totalSlides - 1 ? currentSlide + 1 : 0;
    goToSlide(currentSlide);
  });

  // Auto-scroll
  setInterval(() => {
    currentSlide = currentSlide < totalSlides - 1 ? currentSlide + 1 : 0;
    goToSlide(currentSlide);
  }, 5000);
}

initCarousel();

// ===== Particles Animation =====
function createParticles() {
  const particlesContainer = document.getElementById('particles');
  if (!particlesContainer) return;

  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFloat ${Math.random() * 10 + 10}s linear infinite;
        `;
    particlesContainer.appendChild(particle);
  }
}

// Add particle animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFloat {
        0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(-100vh) translateX(50px); opacity: 0; }
    }
`;
document.head.appendChild(style);

createParticles();

// ===== Scroll Reveal Animation =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.about-card, .course-card, .method-step, .testimonial-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  revealObserver.observe(el);
});

const revealStyle = document.createElement('style');
revealStyle.textContent = `
    .revealed { opacity: 1 !important; transform: translateY(0) !important; }
`;
document.head.appendChild(revealStyle);

// ===== Form Handling =====
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);

  // Show success message
  const btn = contactForm.querySelector('.form-submit');
  const originalText = btn.innerHTML;
  btn.innerHTML = '<span>✓ Request Sent!</span>';
  btn.style.background = '#10B981';
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = originalText;
    btn.style.background = '';
    btn.disabled = false;
    contactForm.reset();
  }, 3000);

  console.log('Form submitted:', data);
});

// ===== Add Active State to Nav Links =====
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

    if (navLink && scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
      navLink.classList.add('active');
    }
  });
});

// ===== Mobile Menu Styles =====
const mobileStyles = document.createElement('style');
mobileStyles.textContent = `
    @media (max-width: 768px) {
        .nav-links {
            display: flex;
            flex-direction: column;
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background: white;
            padding: 20px;
            gap: 20px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.1);
            transform: translateY(-150%);
            opacity: 0;
            transition: all 0.3s ease;
        }
        .nav-links.active {
            transform: translateY(0);
            opacity: 1;
        }
        .nav-links a {
            color: #374151 !important;
            font-size: 18px;
            padding: 10px;
        }
        .mobile-menu-btn.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        .mobile-menu-btn.active span:nth-child(2) {
            opacity: 0;
        }
        .mobile-menu-btn.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`;
document.head.appendChild(mobileStyles);
