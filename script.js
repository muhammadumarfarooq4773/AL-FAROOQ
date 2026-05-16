/**
 * AL-FAROOQ WELDING ALUMINIUM WORKS
 * Main JavaScript — navigation, animations, contact form
 */

/* --- DOM element references --- */
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

/* ============================================
   STICKY NAVBAR — shadow on scroll
   ============================================ */
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ============================================
   MOBILE NAVIGATION TOGGLE
   ============================================ */
navToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Close mobile menu when a link is clicked
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
    navMenu.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});

/* ============================================
   ACTIVE NAV LINK — highlight current section
   ============================================ */
const sections = document.querySelectorAll('section[id]');

function setActiveNavLink() {
  const scrollY = window.scrollY + 100;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', setActiveNavLink);
setActiveNavLink();

/* ============================================
   SMOOTH SCROLLING — anchor links
   ============================================ */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const offsetTop = target.offsetTop - navbar.offsetHeight;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  });
});

/* ============================================
   SCROLL REVEAL ANIMATIONS — Intersection Observer
   ============================================ */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px',
  }
);

revealElements.forEach((el) => revealObserver.observe(el));

/* ============================================
   CONTACT FORM — validation & WhatsApp redirect
   ============================================ */
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const service = document.getElementById('service').value;
  const message = document.getElementById('message').value.trim();

  // Basic validation
  if (!name || !phone || !service || !message) {
    alert('Please fill in all fields.');
    return;
  }

  // Build WhatsApp message with form details
  const whatsappText = encodeURIComponent(
    `Hello AL-FAROOQ,\n\nName: ${name}\nPhone: ${phone}\nService: ${service}\n\nMessage:\n${message}`
  );

  // Show success message
  formSuccess.hidden = false;
  contactForm.reset();

  // Open WhatsApp after short delay so user sees confirmation
  setTimeout(() => {
    window.open(`https://wa.me/923235038953?text=${whatsappText}`, '_blank');
  }, 800);

  // Hide success message after 5 seconds
  setTimeout(() => {
    formSuccess.hidden = true;
  }, 5000);
});

/* ============================================
   GALLERY — optional click to open image (light effect)
   ============================================ */
document.querySelectorAll('.gallery-item').forEach((item) => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    if (img) {
      window.open(img.src, '_blank');
    }
  });
});
