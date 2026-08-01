const isMobile = window.innerWidth < 768;
const COUNT     = isMobile ? 50 : 90;
const LINK_DIST = isMobile ? 100 : 135;
// ═══ HERO LEFT BG — GOLD PARTICLE NETWORK ═══
(function () {
  const canvas = document.getElementById('heroBgCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles;
  const mouse = { x: -9999, y: -9999 };
  const COUNT = 90;
  const LINK_DIST = 135;

  function resize() {
    const hero = canvas.closest('.hero');
    W = canvas.width = hero ? hero.offsetWidth  : window.innerWidth ;
    H = canvas.height = hero ? hero.offsetHeight : window.innerHeight;
  }

  function initParticles() {
    particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.48,
      vy: (Math.random() - 0.5) * 0.48,
      r: Math.random() * 2 + 1.2,
      alpha: Math.random() * 0.45 + 0.35
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Dark gold background
    ctx.fillStyle = '#0d0800';
    ctx.fillRect(0, 0, W, H);

    // Subtle radial glow center-left
    const grd = ctx.createRadialGradient(W * 0.4, H * 0.45, 0, W * 0.4, H * 0.45, W * 0.85);
    grd.addColorStop(0, 'rgba(201,162,39,0.10)');
    grd.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, W, H);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;

      // Lines between nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x, dy = p.y - q.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < LINK_DIST) {
          const a = (1 - dist / LINK_DIST) * 0.55;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(201,162,39,${a})`;
          ctx.lineWidth = 0.65;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }

      // Mouse interaction
      const dm = Math.sqrt((p.x - mouse.x) ** 2 + (p.y - mouse.y) ** 2);
      const glow = dm < 110 ? 1 + (110 - dm) / 110 * 0.9 : 1;

      // Dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * glow, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201,162,39,${p.alpha})`;
      ctx.fill();

      // Mouse halo
      if (dm < 85) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,162,39,${0.13 * (1 - dm / 85)})`;
        ctx.fill();
      }
    }

    requestAnimationFrame(draw);
  }

  // Mouse tracking — hero left side only
  const heroEl = canvas.closest('.hero') || document.body;
  heroEl.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  heroEl.addEventListener('mouseleave', () => {
    mouse.x = -9999;
    mouse.y = -9999;
  });

  resize();
  initParticles();
  draw();

  window.addEventListener('resize', () => {
    resize();
    initParticles();
  });
})();
/* ═══════════════════════════════════════════════
   LUXURY LOADING SCREEN
═══════════════════════════════════════════════ */
(function initLoader() {
  const loader    = document.getElementById('luxuryLoader');
  const barFill   = document.getElementById('loaderBarFill');
  const barLabel  = document.getElementById('loaderBarLabel');
  if (!loader) return;

  const messages = [
    'Preparing your experience…',
    'Loading premium listings…',
    'Almost ready…'
  ];
  let progress = 0;
  let msgIdx   = 0;

  const interval = setInterval(() => {
    progress += Math.random() * 18 + 8;
    if (progress > 100) progress = 100;
    barFill.style.width = progress + '%';

    if (progress > 40 && msgIdx === 0) { msgIdx = 1; barLabel.textContent = messages[1]; }
    if (progress > 75 && msgIdx === 1) { msgIdx = 2; barLabel.textContent = messages[2]; }
if (progress >= 100) {
  clearInterval(interval);

  setTimeout(() => {
    loader.classList.add('fade-out');

    setTimeout(() => {
      loader.classList.add('hidden');
    }, 1800);

  }, 800);

}

}, 180);
})();

/* ═══════════════════════════════════════════════
   CUSTOM CURSOR — NEON TRAIL
═══════════════════════════════════════════════ */
(function initCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  const glow = document.getElementById('mouseGlow');
  if (!dot) return;

  if (ring) ring.style.display = 'none';

  document.addEventListener('mousemove', e => {
    const x = e.clientX, y = e.clientY;

    dot.style.left = x + 'px';
    dot.style.top  = y + 'px';
    if (glow) { glow.style.left = x + 'px'; glow.style.top = y + 'px'; }

    const p = document.createElement('div');
    p.style.cssText = `
      position: fixed;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: #ffffff;
      pointer-events: none;
      z-index: 99997;
      left: ${x}px;
      top: ${y}px;
      transform: translate(-50%, -50%);
      opacity: 0.75;
      transition: opacity 0.4s ease, width 0.4s ease, height 0.4s ease;
      box-shadow: 0 0 6px rgba(255,255,255,0.8);
    `;
    document.body.appendChild(p);

    requestAnimationFrame(() => {
      setTimeout(() => {
        p.style.opacity = '0';
        p.style.width   = '2px';
        p.style.height  = '2px';
      }, 30);
      setTimeout(() => p.remove(), 450);
    });
  });
})();

/* ═══════════════════════════════════════════════
   PARTICLE CANVAS SYSTEM
═══════════════════════════════════════════════ */
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = canvas.parentElement.offsetWidth  || window.innerWidth;
    canvas.height = canvas.parentElement.offsetHeight || window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const PARTICLE_COUNT = window.innerWidth < 768 ? 35 : 65;
  const MAX_DIST = 130;
  const particles = [];

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x  = Math.random() * canvas.width;
      this.y  = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.r  = Math.random() * 1.8 + 0.6;
      this.alpha = Math.random() * 0.5 + 0.15;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width)  this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height)  this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201,150,42,${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });

    // Draw connection lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < MAX_DIST) {
          const alpha = (1 - dist / MAX_DIST) * 0.18;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(201,150,42,${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(loop);
  }
  loop();
})();


/* ═══════════════════════════════════════════════
   NAVBAR GLASSMORPHISM ON SCROLL
═══════════════════════════════════════════════ */
(function initNavScroll() {
  const nav = document.querySelector('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
})();


/* ═══════════════════════════════════════════════
   SCROLL REVEAL — IntersectionObserver
═══════════════════════════════════════════════ */
(function initReveal() {
  const selectors = [
    '.section', '.proj-card', '.test-card',
    '.value-card', '.svc-card', '.about-text',
    '.about-img', '.contact-card', '.contact-form-card',
    '.hero-stat', '.section-label', '.footer-brand',
    '.footer-col', '#ctaBanner h2', '#ctaBanner p'
  ];

  const elements = document.querySelectorAll(selectors.join(','));
  elements.forEach((el, i) => {
    el.classList.add('reveal');
    // Stagger for grid children
    const parent = el.parentElement;
    const siblings = parent ? [...parent.children].filter(c => c.classList.contains(el.classList[0])) : [];
    const idx = siblings.indexOf(el);
    if (idx > 0 && idx < 5) el.classList.add(`reveal-delay-${idx}`);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Trigger gold underline on section-label
        if (entry.target.classList.contains('section-label')) {
          entry.target.classList.add('revealed');
        }
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
})();


/* ═══════════════════════════════════════════════
   3D TILT ON PROJECT CARDS
═══════════════════════════════════════════════ */
(function initTilt() {
  function applyTilt(cards) {
    cards.forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width  - 0.5;
        const y = (e.clientY - rect.top)  / rect.height - 0.5;
        card.style.transform = `
          perspective(800px)
          rotateY(${x * 10}deg)
          rotateX(${-y * 8}deg)
          translateY(-6px)
          scale(1.02)
        `;
        card.style.boxShadow = `
          ${-x * 20}px ${-y * 20}px 40px rgba(201,150,42,0.15),
          0 20px 60px rgba(0,0,0,0.4)
        `;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.boxShadow = '';
      });
    });
  }

  // Apply immediately and re-apply after page switches (your SPA uses showPage())
  applyTilt(document.querySelectorAll('.proj-card'));

  // Hook into your existing showPage function for SPA navigation
  const _origShowPage = window.showPage;
  if (typeof _origShowPage === 'function') {
    window.showPage = function(page) {
      _origShowPage(page);
      setTimeout(() => {
        applyTilt(document.querySelectorAll('.proj-card'));
      }, 100);
    };
  }
})();


/* ═══════════════════════════════════════════════
   MAGNETIC BUTTONS
═══════════════════════════════════════════════ */
(function initMagnetic() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  document.querySelectorAll('.btn-primary, .btn-outline, .nav-cta').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width  / 2) * 0.25;
      const y = (e.clientY - rect.top  - rect.height / 2) * 0.25;
      btn.style.transform = `translate(${x}px, ${y}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
})();
/* ═══════════════════════════════════════════════════════
   J SQUARE HOUSING — PRO ANIMATIONS ENGINE v2.0
   File: animations.js
   Usage: <script src="animations.js"></script> (before </body>)
═══════════════════════════════════════════════════════ */


/* ── 2. SCROLL REVEAL — Stagger Children ── */
(function initScrollReveal() {
  const cfg = { threshold: 0.12, rootMargin: '0px 0px -40px 0px' };

  /* Observe any element with data-reveal or .reveal */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.classList.add('jsr-visible');
      io.unobserve(el);
    });
  }, cfg);

  /* Auto-assign stagger to grid children */
  const STAGGER_SELECTORS = [
    '.projects-grid','.services-grid','.area-cards',
    '.about-values','.listings-grid','.footer-grid'
  ];
  STAGGER_SELECTORS.forEach(sel => {
    document.querySelectorAll(sel).forEach(grid => {
      [...grid.children].forEach((child, i) => {
        child.style.transitionDelay = (i * 90) + 'ms';
        child.classList.add('jsr-item');
        io.observe(child);
      });
    });
  });

  /* Observe hero stats, section labels, titles */
  document.querySelectorAll(
    '.section-label,.section-title,.about-quote,.hero-badge,.hero-stat,.edge-list li'
  ).forEach((el,i) => {
    el.classList.add('jsr-item');
    el.style.transitionDelay = (i * 60) + 'ms';
    io.observe(el);
  });
})();


/* ── 3. COUNTER ANIMATION (hero stats) ── */
(function initCounters() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = +el.dataset.target;
      const suffix = el.dataset.suffix || '';
      const duration = 1800;
      const start = performance.now();

      (function tick(now) {
        const elapsed = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - elapsed, 3); /* ease-out-cubic */
        el.textContent = Math.floor(eased * target) + suffix;
        if (elapsed < 1) requestAnimationFrame(tick);
        else el.textContent = target + suffix;
      })(start);

      io.unobserve(el);
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-target]').forEach(el => io.observe(el));
})();


/* ── 4. PARALLAX HERO BG ── */
(function initParallax() {
  const heroBg = document.querySelector('.hero-bg');
  const heroGrid = document.querySelector('.hero-grid');
  if (!heroBg) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (heroBg) heroBg.style.transform = `translateY(${y * 0.35}px)`;
    if (heroGrid) heroGrid.style.transform = `translateY(${y * 0.18}px)`;
  }, { passive: true });
})();


/* ── 5. GOLD PARTICLE BURST on CTA clicks ── */
(function initParticleBurst() {
  function burst(x, y) {
    for (let i = 0; i < 18; i++) {
      const p = document.createElement('div');
      const angle = (Math.PI * 2 * i) / 18;
      const dist = 55 + Math.random() * 45;
      const size = 4 + Math.random() * 5;
      Object.assign(p.style, {
        position:'fixed', left: x+'px', top: y+'px',
        width: size+'px', height: size+'px',
        borderRadius: '50%',
        background: i % 3 === 0 ? '#E8B020' : i % 3 === 1 ? '#C8960C' : '#FBF0D0',
        pointerEvents:'none', zIndex:'99997',
        transform:'translate(-50%,-50%)',
        transition:'all 0.7s cubic-bezier(0.16,1,0.3,1)',
        opacity:'1'
      });
      document.body.appendChild(p);
      requestAnimationFrame(() => {
        p.style.left = (x + Math.cos(angle) * dist) + 'px';
        p.style.top  = (y + Math.sin(angle) * dist) + 'px';
        p.style.opacity = '0';
        p.style.transform = 'translate(-50%,-50%) scale(0)';
      });
      setTimeout(() => p.remove(), 750);
    }
  }

  document.querySelectorAll('.btn-primary,.btn-outline,.nav-cta,.calc-btn,.portal-post-btn')
    .forEach(btn => {
      btn.addEventListener('click', e => burst(e.clientX, e.clientY));
    });
})();


/* ── 6. FLOATING GOLD ORBS (Hero ambient) ── */
(function initOrbs() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const orbs = [
    { s:180, x:15, y:20, dur:14 },
    { s:100, x:75, y:60, dur:18 },
    { s:60,  x:50, y:80, dur:11 },
    { s:130, x:90, y:15, dur:20 },
  ];
  orbs.forEach(({ s, x, y, dur }) => {
    const o = document.createElement('div');
    Object.assign(o.style, {
      position:'absolute',
      width: s+'px', height: s+'px',
      borderRadius:'50%',
      background:'radial-gradient(circle, rgba(200,150,12,0.13) 0%, transparent 70%)',
      left: x+'%', top: y+'%',
      transform:'translate(-50%,-50%)',
      animation:`jOrb ${dur}s ease-in-out infinite alternate`,
      pointerEvents:'none', zIndex:'1'
    });
    hero.appendChild(o);
  });

  if (!document.getElementById('jOrbKeyframes')) {
    const s = document.createElement('style');
    s.id = 'jOrbKeyframes';
    s.textContent = `
      @keyframes jOrb {
        from { transform:translate(-50%,-50%) scale(1); opacity:.7; }
        to   { transform:translate(-50%,-50%) scale(1.35) translateY(-20px); opacity:1; }
      }
    `;
    document.head.appendChild(s);
  }
})();


/* ── 7. TYPEWRITER EFFECT — Hero h1 ── */
(function initTypewriter() {
  const el = document.querySelector('.hero h1');
  if (!el) return;
  const original = el.innerHTML;
  /* Only animate on first load, not on SPA page switches */
  if (sessionStorage.getItem('jHeroTyped')) return;
  sessionStorage.setItem('jHeroTyped', '1');

  el.style.opacity = '1'; /* override slideInLeft flash */
  const plain = el.textContent;
  el.textContent = '';
  el.style.borderRight = '2px solid #C8960C';

  let i = 0;
  const timer = setInterval(() => {
    el.textContent = plain.slice(0, ++i);
    if (i >= plain.length) {
      clearInterval(timer);
      setTimeout(() => {
        el.innerHTML = original; /* restore em tag */
        el.style.borderRight = 'none';
      }, 400);
    }
  }, 38);
})();


/* ── 8. NAV SCROLL PROGRESS BAR ── */
(function initProgressBar() {
  const bar = document.createElement('div');
  Object.assign(bar.style, {
    position:'fixed', top:'68px', left:'0', right:'0',
    height:'2px',
    background:'linear-gradient(90deg,#C8960C,#E8B020,#FBF0D0)',
    transformOrigin:'left', transform:'scaleX(0)',
    zIndex:'999', transition:'transform .1s',
    pointerEvents:'none'
  });
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
  }, { passive: true });
})();


/* ── 9. TILT CARD EFFECT (Project + Service cards) ── */
(function initTiltCards() {
  const CARDS = '.proj-card,.svc-card,.listing-card,.value-card,.test-card';
  document.querySelectorAll(CARDS).forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / (r.width  / 2);
      const dy = (e.clientY - cy) / (r.height / 2);
      card.style.transform = `translateY(-8px) rotateY(${dx*6}deg) rotateX(${-dy*5}deg)`;
      card.style.transition = 'transform .05s';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform .5s cubic-bezier(0.16,1,0.3,1)';
    });
  });
})();


/* ── 10. GLITCH TEXT — Logo on hover ── */
(function initGlitch() {
  const logo = document.querySelector('.logo-icon');
  if (!logo) return;
  const orig = logo.textContent;
  const chars = 'J²₂Ĵĵ J²';
  logo.addEventListener('mouseenter', () => {
    let iter = 0;
    const t = setInterval(() => {
      logo.textContent = chars[Math.floor(Math.random() * chars.length)];
      if (++iter > 8) { clearInterval(t); logo.textContent = orig; }
    }, 55);
  });
})();


/* ── 11. SMOOTH SECTION ENTRANCE (why-section items) ── */
(function initWhyReveal() {
  /* WHY ticker cards get a shimmer on first view */
  const whySec = document.querySelector('.why-section');
  if (!whySec) return;
  const io = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) return;
    whySec.style.opacity = '0';
    whySec.style.transition = 'opacity .8s ease';
    requestAnimationFrame(() => { whySec.style.opacity = '1'; });
    io.unobserve(whySec);
  }, { threshold: 0.1 });
  io.observe(whySec);
})();


/* ── 12. GOLD SHIMMER SWEEP on Section Titles ── */
(function initTitleShimmer() {
  if (!document.getElementById('jShimmerStyle')) {
    const s = document.createElement('style');
    s.id = 'jShimmerStyle';
    s.textContent = `
      .section-title.jsr-visible em, .hero h1 em {
        background: linear-gradient(90deg,#8B6A00 0%,#E8B020 40%,#FBF0D0 50%,#E8B020 60%,#8B6A00 100%);
        background-size: 200%;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: jShimmer 3s ease infinite;
      }
      @keyframes jShimmer {
        0%   { background-position: 200% center; }
        100% { background-position: -200% center; }
      }
    `;
    document.head.appendChild(s);
  }
})();


/* ── 13. SCROLL REVEAL STYLES (injected once) ── */
(function injectRevealStyles() {
  if (document.getElementById('jSRStyles')) return;
  const s = document.createElement('style');
  s.id = 'jSRStyles';
  s.textContent = `
    .jsr-item {
      opacity: 0;
      transform: translateY(28px);
      transition: opacity .65s cubic-bezier(0.16,1,0.3,1),
                  transform .65s cubic-bezier(0.16,1,0.3,1);
    }
    .jsr-item.jsr-visible {
      opacity: 1;
      transform: translateY(0);
    }
    .hero-stat.jsr-item    { transform: translateY(20px) scale(0.96); }
    .hero-stat.jsr-visible { transform: translateY(0)    scale(1); }
    .edge-list li.jsr-item    { transform: translateX(-20px); opacity:0; }
    .edge-list li.jsr-visible { transform: translateX(0);     opacity:1; }
    .value-card.jsr-item { transform: scale(0.92) translateY(16px); }
    .value-card.jsr-visible { transform: scale(1) translateY(0); }
  `;
  document.head.appendChild(s);
})();


/* ── 14. RE-INIT on SPA page switches ── */
/* Hook into your existing showPage() function */
(function patchShowPage() {
  if (typeof showPage !== 'function') return;
  const _orig = showPage;
  window.showPage = function(id) {
    _orig(id);
    /* Re-observe newly visible cards */
    setTimeout(() => {
      document.querySelectorAll('.jsr-item:not(.jsr-visible)').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9) {
          el.classList.add('jsr-visible');
        }
      });
      /* Re-apply tilt to new cards */
      initTiltForPage();
    }, 100);
  };
})();

function initTiltForPage() {
  const CARDS = '.proj-card,.svc-card,.listing-card,.value-card,.test-card';
  document.querySelectorAll(CARDS).forEach(card => {
    if (card.dataset.tiltDone) return;
    card.dataset.tiltDone = '1';
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width/2)  / (r.width/2);
      const dy = (e.clientY - r.top  - r.height/2) / (r.height/2);
      card.style.transform = `translateY(-8px) rotateY(${dx*6}deg) rotateX(${-dy*5}deg)`;
      card.style.transition = 'transform .05s';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform .5s cubic-bezier(0.16,1,0.3,1)';
    });
  });
}


/* ── 15. WHATSAPP BUTTON PULSE ── */
(function initWAPulse() {
  if (!document.getElementById('jWAStyle')) {
    const s = document.createElement('style');
    s.id = 'jWAStyle';
    s.textContent = `
      .whatsapp-btn {
        animation: jWAPulse 2.5s ease infinite;
      }
      @keyframes jWAPulse {
        0%,100% { box-shadow: 0 0 0 0 rgba(37,211,102,0.45); }
        50%      { box-shadow: 0 0 0 14px rgba(37,211,102,0); }
      }
    `;
    document.head.appendChild(s);
  }
})();


/* ── 16. STICKY NAV SHRINK on scroll ── */
(function initNavShrink() {
  const nav = document.querySelector('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
})();


/* ── 17. HERO SLIDE FADE-ZOOM ── */
/* Enhances your existing slider with a scale pulse on active slide */
(function enhanceSlider() {
  if (!document.getElementById('jSlideStyle')) {
    const s = document.createElement('style');
    s.id = 'jSlideStyle';
    s.textContent = `
      .hero-slide.active {
        animation: jSlideZoom 8s ease forwards;
      }
      @keyframes jSlideZoom {
        from { transform: scale(1.06); }
        to   { transform: scale(1.0); }
      }
      .hero-slide-label {
        animation: jLabelUp .6s cubic-bezier(0.16,1,0.3,1) both;
      }
      @keyframes jLabelUp {
        from { opacity:0; transform: translateY(16px); }
        to   { opacity:1; transform: translateY(0); }
      }
      .sdot { transition: all .4s cubic-bezier(0.34,1.56,0.64,1); }
    `;
    document.head.appendChild(s);
  }
})();


/* ── 18. SECTION GOLD LINE DRAW ── */
(function initGoldLineDraw() {
  if (!document.getElementById('jGoldLineStyle')) {
    const s = document.createElement('style');
    s.id = 'jGoldLineStyle';
    s.textContent = `
      .portal-gold-line {
        transform-origin: left;
        transform: scaleX(0);
        transition: transform .9s cubic-bezier(0.16,1,0.3,1);
      }
      .portal-gold-line.jsr-visible {
        transform: scaleX(1);
      }
    `;
    document.head.appendChild(s);
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('jsr-visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.portal-gold-line').forEach(el => io.observe(el));
})();


/* ── 19. TOAST ENTRANCE ANIMATION ── */
(function patchToast() {
  if (!document.getElementById('jToastStyle')) {
    const s = document.createElement('style');
    s.id = 'jToastStyle';
    s.textContent = `
      .toa
      st.show {
        animation: jToastIn .45s cubic-bezier(0.34,1.56,0.64,1) both;
      }
      @keyframes jToastIn {
        from { transform: translateX(120px) scale(0.85); opacity:0; }
        to   { transform: translateX(0)      scale(1);    opacity:1; }
      }
    `;
    document.head.appendChild(s);
  }
})();


/* ── 20. FOOTER STAGGER REVEAL ── */
(function initFooterReveal() {
  const footer = document.querySelector('footer');
  if (!footer) return;
  const io = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) return;
    [...footer.querySelectorAll('.footer-col')].forEach((col, i) => {
      col.style.opacity = '0';
      col.style.transform = 'translateY(24px)';
      col.style.transition = `opacity .6s ${i*100}ms ease, transform .6s ${i*100}ms cubic-bezier(0.16,1,0.3,1)`;
      setTimeout(() => {
        col.style.opacity = '1';
        col.style.transform = 'translateY(0)';
      }, 50 + i * 100);
    });
    io.unobserve(footer);
  }, { threshold: 0.1 });
  io.observe(footer);
})();

console.log('%cJ Square Housing Animations v2.0 ✦ Loaded', 'color:#C8960C;font-weight:bold;font-size:13px');
