/* ─────────────────────────────────────────────────────────────────────────────
   Constants
   These mirror values declared in :root {} in index.css so that behavioural
   thresholds are defined alongside their visual counterparts.
───────────────────────────────────────────────────────────────────────────── */
const ANIM_STAGGER_STEP = 70;   // ms — matches --anim-stagger-step in CSS
const SUBMIT_DELAY      = 900;  // ms — matches --submit-delay in CSS
const NAV_SCROLL_OFFSET = 60;   // px — matches --nav-height in CSS (active-link detection)
const NAV_SHADOW_THRESHOLD = 10; // px — scroll depth before nav shadow appears


/* ── Scroll-triggered animations ───────────────────────────────────────────── */
(function initAnimations() {
  const targets = document.querySelectorAll('[data-animate]');
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        // Stagger siblings inside the same grid parent so cards cascade in
        const siblings = Array.from(
          entry.target.parentElement.querySelectorAll('[data-animate]')
        );
        const idx = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = `${idx * ANIM_STAGGER_STEP}ms`;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  targets.forEach((el) => observer.observe(el));
})();


/* ── Active nav link on scroll ─────────────────────────────────────────────── */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav__links a[href^="#"]');

  const updateActiveLink = () => {
    let current = '';
    sections.forEach((sec) => {
      if (window.scrollY >= sec.offsetTop - NAV_SCROLL_OFFSET) {
        current = sec.getAttribute('id');
      }
    });
    navLinks.forEach((a) => {
      a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
  };

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink(); // set correct state on page load
})();


/* ── Email sign-up form ─────────────────────────────────────────────────────── */
(function initSignupForm() {
  const form = document.getElementById('signup-form');
  const msg  = document.getElementById('form-msg');
  if (!form || !msg) return;

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const resetMsg = () => { msg.className = 'cta-section__note'; };

  const showError = (text, focusEl) => {
    msg.textContent = text;
    msg.classList.add('error');
    if (focusEl) focusEl.focus();
  };

  const showSuccess = (text) => {
    msg.textContent = text;
    msg.classList.add('success');
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = form.querySelector('#email');
    const submitBtn  = form.querySelector('button[type="submit"]');
    const email      = emailInput.value.trim();

    resetMsg();

    if (!EMAIL_RE.test(email)) {
      showError('Please enter a valid email address.', emailInput);
      return;
    }

    // Simulate async submission
    submitBtn.disabled    = true;
    submitBtn.textContent = 'Sending\u2026';

    setTimeout(() => {
      showSuccess('You are on the list! We will be in touch soon.');
      emailInput.value      = '';
      submitBtn.disabled    = false;
      submitBtn.textContent = 'Get early access';
    }, SUBMIT_DELAY);
  });
})();


/* ── Footer year ────────────────────────────────────────────────────────────── */
(function setFooterYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
})();


/* ── Sticky nav shadow on scroll ───────────────────────────────────────────── */
(function initNavShadow() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  // Use a CSS class rather than an inline style so the shadow can be
  // overridden or animated in index.css without fighting specificity.
  const updateShadow = () => {
    nav.classList.toggle('nav--scrolled', window.scrollY > NAV_SHADOW_THRESHOLD);
  };

  window.addEventListener('scroll', updateShadow, { passive: true });
  updateShadow(); // apply correct state on load (e.g. after a browser back-nav)
})();
