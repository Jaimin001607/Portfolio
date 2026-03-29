/* ================================================================
   JAIMIN SUTHAR — CUTTING MAT PORTFOLIO  |  script.js
   ================================================================ */

/* ── Year in footer ── */
document.getElementById('year').textContent = new Date().getFullYear();

/* ── Nav: scroll effect ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

/* ── Nav: hamburger menu ── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav__links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

document.addEventListener('click', (e) => {
  if (!nav.contains(e.target)) {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  }
});

/* ── Scroll reveal ── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(
  '.skill-card, .proj-card, .exp-card, .about__grid, .about__right, .contact__layout, .about__stats .stat, .tools-strip'
).forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${i * 0.06}s`;
  revealObserver.observe(el);
});

/* ── Active nav link on scroll ── */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav__links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach(s => sectionObserver.observe(s));

/* ── Contact form (demo) ── */
const form = document.getElementById('contact-form');
const successMsg = document.getElementById('form-success');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  setTimeout(() => {
    form.reset();
    btn.textContent = 'Send Message';
    btn.disabled = false;
    successMsg.classList.add('show');
    setTimeout(() => successMsg.classList.remove('show'), 5000);
  }, 1200);
});

/* ── Resume button placeholder ── */
document.getElementById('resume-btn').addEventListener('click', (e) => {
  e.preventDefault();
  alert('Replace this with your actual resume PDF link in index.html!');
});

/* ── Parallax tags on scroll ── */
const tags = document.querySelectorAll('.hero__tag');
if (window.matchMedia('(pointer: fine)').matches && tags.length) {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    tags.forEach((tag, i) => {
      const speed = 0.15 + (i * 0.03);
      tag.style.transform = `translateY(${scrollY * speed}px)`;
    });
  });
}
