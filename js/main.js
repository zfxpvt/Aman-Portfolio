/* ============================================================
   GLOBAL JS — Aman Ahammed K.O Portfolio
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── NAV SCROLL ── */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  /* ── HAMBURGER ── */
  const toggle    = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.nav-mobile');

  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      mobileNav.classList.toggle('open');
    });

    // close on link click
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        toggle.classList.remove('open');
        mobileNav.classList.remove('open');
      });
    });
  }

  /* ── ACTIVE NAV LINK ── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── SCROLL REVEAL ── */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    reveals.forEach(el => observer.observe(el));
  }

  /* ── PROGRESS BARS (animated on scroll) ── */
  const bars = document.querySelectorAll('.progress-fill[data-width]');
  if (bars.length) {
    const barObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          bar.style.width = bar.dataset.width;
          barObserver.unobserve(bar);
        }
      });
    }, { threshold: 0.3 });

    bars.forEach(bar => {
      bar.style.width = '0';
      barObserver.observe(bar);
    });
  }

  /* ── TYPING EFFECT ── */
  function typeEffect(el, text, speed = 55) {
    el.textContent = '';
    let i = 0;
    const timer = setInterval(() => {
      el.textContent += text[i];
      i++;
      if (i >= text.length) clearInterval(timer);
    }, speed);
  }

  const typeTarget = document.querySelector('[data-type]');
  if (typeTarget) {
    const phrases = typeTarget.dataset.type.split('|');
    let pIdx = 0;
    function nextPhrase() {
      typeEffect(typeTarget, phrases[pIdx], 60);
      pIdx = (pIdx + 1) % phrases.length;
      setTimeout(nextPhrase, phrases[pIdx - 1 < 0 ? phrases.length - 1 : pIdx - 1].length * 60 + 2800);
    }
    nextPhrase();
  }

  /* ── CONTACT FORM ── */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      btn.textContent = '[+] Message Sent!';
      btn.style.background = 'var(--neon)';
      btn.style.color = 'var(--bg-0)';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = 'Send Message →';
        btn.style.background = '';
        btn.style.color = '';
        btn.disabled = false;
        contactForm.reset();
      }, 3500);
    });
  }

  /* ── FILTER BUTTONS (projects page) ── */
  const filterBtns = document.querySelectorAll('[data-filter]');
  const filterItems = document.querySelectorAll('[data-category]');

  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        filterItems.forEach(item => {
          const show = filter === 'all' || item.dataset.category === filter;
          item.style.opacity = show ? '1' : '0.25';
          item.style.pointerEvents = show ? '' : 'none';
          item.style.transform = show ? '' : 'scale(0.97)';
        });
      });
    });
  }

  /* ── COPY EMAIL ── */
  const copyBtn = document.getElementById('copyEmail');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(copyBtn.dataset.email).then(() => {
        copyBtn.textContent = 'Copied!';
        setTimeout(() => { copyBtn.textContent = 'Copy Email'; }, 2000);
      });
    });
  }

});
