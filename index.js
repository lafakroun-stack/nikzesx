/* ── Scroll-triggered animations ───────────────────────────────────────────── */
(function initAnimations() {
  const targets = document.querySelectorAll('[data-animate]');
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Stagger siblings inside the same grid parent
          const parent = entry.target.parentElement;
          const siblings = Array.from(parent.querySelectorAll('[data-animate]'));
          const idx = siblings.indexOf(entry.target);
          entry.target.style.transitionDelay = `${idx * 70}ms`;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  targets.forEach((el) => observer.observe(el));
})();


/* ── Active nav link on scroll ─────────────────────────────────────────────── */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__links a[href^="#"]');

  const setActive = () => {
    let current = '';
    sections.forEach((sec) => {
      if (window.scrollY >= sec.offsetTop - 120) {
        current = sec.getAttribute('id');
      }
    });
    navLinks.forEach((a) => {
      a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
  };

  window.addEventListener('scroll', setActive, { passive: true });
  setActive();
})();


/* ── Email sign-up form ─────────────────────────────────────────────────────── */
(function initSignupForm() {
  const form = document.getElementById('signup-form');
  const msg  = document.getElementById('form-msg');
  if (!form || !msg) return;

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('email');
    const email = emailInput.value.trim();

    msg.className = 'cta-section__note';

    if (!EMAIL_RE.test(email)) {
      msg.textContent = 'Please enter a valid email address.';
      msg.classList.add('error');
      emailInput.focus();
      return;
    }

    // Simulate async submission
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending…';

    setTimeout(() => {
      msg.textContent = 'You are on the list! We will be in touch soon.';
      msg.classList.add('success');
      emailInput.value = '';
      btn.disabled = false;
      btn.textContent = 'Get early access';
    }, 900);
  });
})();


/* ── Footer year ────────────────────────────────────────────────────────────── */
(function setYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
})();


/* ── Sticky nav shadow on scroll ───────────────────────────────────────────── */
(function initNavShadow() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 10
      ? '0 4px 24px rgba(0,0,0,0.45)'
      : 'none';
  }, { passive: true });
})();
