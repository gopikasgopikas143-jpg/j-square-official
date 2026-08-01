
// Cursor glow
const glow = document.getElementById('cursor-glow');
document.addEventListener('mousemove', e => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});
 
// Particles
const container = document.getElementById('particles');
for(let i=0;i<24;i++){
  const p = document.createElement('div');
  p.className = 'particle';
  p.style.cssText = `
    left:${5+Math.random()*90}%;
    top:${20+Math.random()*60}%;
    --dur:${7+Math.random()*8}s;
    --del:${Math.random()*6}s;
    --op:${0.3+Math.random()*0.5};
    width:${1+Math.random()*2}px;
    height:${1+Math.random()*2}px;
  `;
  container.appendChild(p);
}
 
// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal, .reveal-left');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting){
      e.target.classList.add('visible');
    }
  });
},{threshold:0.70,rootMargin:'0px 0px -40px 0px'});
revealEls.forEach(el => io.observe(el));
// Hero reveals immediately
document.querySelectorAll('#hero .reveal').forEach(el => el.classList.add('visible'));
 
// Counter animation
function animateCounter(el){
  const target = parseInt(el.dataset.target);
  const suffix = el.textContent.includes('+') ? '+' : (el.textContent.includes('%') ? '%' : '');
  let start = null;
  const dur = 1800;
  function step(ts){
    if(!start) start = ts;
    const progress = Math.min((ts-start)/dur,1);
    const ease = 1 - Math.pow(1-progress,3);
    el.textContent = Math.round(ease * target) + suffix;
    if(progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting && e.target.dataset.target){
      animateCounter(e.target);
      counterObs.unobserve(e.target);
    }
  });
},{threshold:0.5});
document.querySelectorAll('[data-target]').forEach(el => counterObs.observe(el));
 
// Filter pills
const pills = document.querySelectorAll('.pill');
const cards = document.querySelectorAll('.svc-card');
pills.forEach(pill => {
  pill.addEventListener('click',() => {
    pills.forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    const cat = pill.dataset.cat;
    cards.forEach(card => {
      if(cat === 'all' || card.dataset.cat === cat){
        card.style.display = '';
        card.style.opacity = '1';
      } else {
        card.style.opacity = '0';
        card.style.display = 'none';
      }
    });
  });
});
 
// FAQ accordion
function toggleFaq(el){
  const answer = el.nextElementSibling;
  const isOpen = el.classList.contains('open');
  document.querySelectorAll('.faq-q').forEach(q => {
    q.classList.remove('open');
    q.nextElementSibling.classList.remove('open');
  });
  if(!isOpen){
    el.classList.add('open');
    answer.classList.add('open');
  }
}
 
// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll',() => {
  let current = '';
  sections.forEach(s => {
    if(window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.remove('active');
    if(a.getAttribute('href') === '#' + current) a.classList.add('active');
  });
},{ passive:true });
 
// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth',block:'start'});
    }
  });
});
/* ═══ LUXURY SERVICES PAGE JS ═══ */

// Particles
function lsvcInitParticles(){
  const c = document.getElementById('lsvcParticles');
  if(!c) return;
  c.innerHTML = '';
  for(let i=0;i<20;i++){
    const p = document.createElement('div');
    p.className = 'lsvc-particle';
    p.style.cssText = `left:${5+Math.random()*90}%;top:${20+Math.random()*60}%;
      --dur:${7+Math.random()*8}s;--del:${Math.random()*6}s;
      --op:${0.3+Math.random()*0.5};
      width:${1+Math.random()*2}px;height:${1+Math.random()*2}px;`;
    c.appendChild(p);
  }
}

// Filter Pills
function lsvcInitPills(){
  const pills = document.querySelectorAll('.lsvc-pill');
  const cards = document.querySelectorAll('.lsvc-card');
  pills.forEach(pill => {
    pill.addEventListener('click',()=>{
      pills.forEach(p=>p.classList.remove('active'));
      pill.classList.add('active');
      const cat = pill.dataset.cat;
      cards.forEach(card=>{
        card.style.display = (cat==='all'||card.dataset.cat===cat)?'':'none';
      });
    });
  });
}

// Counter animation
function lsvcAnimateCounters(){
  document.querySelectorAll('.lsvc-cnt-num').forEach(el=>{
    const obs = new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          const target = parseInt(el.dataset.target);
          const suffix = el.dataset.suffix||'';
          let start = null;
          const dur = 1600;
          function step(ts){
            if(!start) start=ts;
            const p = Math.min((ts-start)/dur,1);
            const ease = 1-Math.pow(1-p,3);
            el.textContent = Math.round(ease*target)+suffix;
            if(p<1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
          obs.unobserve(el);
        }
      });
    },{threshold:0.5});
    obs.observe(el);
  });
}

// FAQ
function lsvcToggleFaq(el){
  const a = el.nextElementSibling;
  const isOpen = el.classList.contains('open');
  document.querySelectorAll('.lsvc-faq-q').forEach(q=>{
    q.classList.remove('open');
    q.nextElementSibling.classList.remove('open');
  });
  if(!isOpen){ el.classList.add('open'); a.classList.add('open'); }
}

// Init when services page shown — call inside your showPage() function
function lsvcInit(){
  lsvcInitParticles();
  lsvcInitPills();
  lsvcAnimateCounters();
   initServicesOrbit(); 
    initReviewStack();
}
function initServicesOrbit() {
  const canvas = document.getElementById('svcOrbitCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const wrap = canvas.parentElement;
  let W, H, t = 0, mx = 0.5, my = 0.5;

  const rings = Array.from({length: 7}, (_, i) => ({
    baseR: 25 + i * 48,
    speed: (i % 2 === 0 ? 1 : -1) * (0.06 + i * 0.022),
    phase: (i / 7) * Math.PI * 2,
    dash:  4 + i * 3,
    gap:   8 + i * 2,
    dots:  2 + i
  }));

  function resize() {
    W = wrap.offsetWidth;
    H = wrap.offsetHeight;
    canvas.width  = W;
    canvas.height = H;
  }

  wrap.addEventListener('mousemove', e => {
    const r = wrap.getBoundingClientRect();
    mx = (e.clientX - r.left) / r.width;
    my = (e.clientY - r.top)  / r.height;
  });

  function frame() {
    t += 0.008;
    ctx.clearRect(0, 0, W, H);

    const cx    = W * (0.28 + mx * 0.44);
    const cy    = H * (0.28 + my * 0.44);
    const scale = Math.min(W, H) / 360;

    rings.forEach((ring, i) => {
      const r     = ring.baseR * scale;
      const alpha = 0.07 + 0.2 * (1 - i / 7);

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(t * ring.speed + ring.phase);
      ctx.setLineDash([ring.dash * scale, ring.gap * scale]);
      ctx.strokeStyle = `rgba(201,168,76,${alpha})`;
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      for (let d = 0; d < ring.dots; d++) {
        const a     = (d / ring.dots) * Math.PI * 2;
        const pulse = 0.5 + 0.5 * Math.sin(t * 2 + d + i);
        ctx.beginPath();
        ctx.arc(Math.cos(a) * r, Math.sin(a) * r, 1.8 * scale * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,210,100,${0.4 + 0.4 * pulse})`;
        ctx.fill();
      }
      ctx.restore();
    });

    // center glow
    const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 38 * scale);
    grd.addColorStop(0, 'rgba(201,168,76,0.2)');
    grd.addColorStop(1, 'rgba(201,168,76,0)');
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(cx, cy, 38 * scale, 0, Math.PI * 2);
    ctx.fill();

    // center dot
    ctx.beginPath();
    ctx.arc(cx, cy, 2.5 * scale, 0, Math.PI * 2);
    ctx.fillStyle = '#C9A84C';
    ctx.fill();

    requestAnimationFrame(frame);
  }

  resize();
  frame();
  window.addEventListener('resize', resize);
}
//card review
function initReviewStack() {
  (function () {

    const staticReviews = [
      { name:"Muthu Kumar",   role:"Property Buyer",   rating:5, review:"J Square made my first land purchase completely stress-free. The documentation was crystal clear and they guided me at every step." },
      { name:"Priya Rajendran", role:"NRI Investor",   rating:5, review:"As an NRI investor, trust is everything. J Square's transparent process and DTCP approval gave me full confidence." },
      { name:"Selvam Rajan",  role:"Plot Buyer",       rating:5, review:"The team helped me compare multiple plots using their own calculator tools. Excellent service and honest pricing throughout!" },
      { name:"Karthik S",     role:"Investment Buyer", rating:5, review:"DTCP approval and legal clarity were top-notch. Best real estate experience in Salem." },
      { name:"Deepa M",       role:"Home Buyer",       rating:5, review:"Smooth documentation and zero hidden charges. Truly a premium experience from start to finish." }
    ];

    function getAllReviews() {
      try {
        const local = JSON.parse(localStorage.getItem('jsq_reviews') || '[]');
        const localMapped = local.map(r => ({
          name:   r.name  || 'Anonymous',
          role:   r.loc   || 'Salem',
          rating: r.stars || 5,
          review: r.text  || ''
        }));
        return [...localMapped, ...staticReviews];
      } catch(e) { return staticReviews; }
    }

    function injectCSS() {
      if (document.getElementById('lrsStyle2')) return;
      const style = document.createElement('style');
      style.id = 'lrsStyle2';
      style.textContent = `
        #lsvcReviewStack {
          position: absolute;
          top: 0; right: 0; bottom: 0; left: 0;
          pointer-events: none;
          z-index: 10;
        }
        .lrs-slot {
          position: absolute;
          pointer-events: auto;
          transition: opacity 1.2s ease, filter 1.2s ease, transform 1.2s ease;
        }
        .lrs-slot-a {
          top: 8%; left: 58%; width: 260px;
          opacity: 0.72; filter: blur(0.6px);
        }
        .lrs-slot-b {
          bottom: 10%; left: 54%; width: 260px;
          opacity: 0.68; filter: blur(0.8px);
        }
        .lrs-slot-c {
          top: 50%; right: 2%;
          transform: translateY(-50%);
          width: 300px; opacity: 1; filter: none;
        }
        .lrs-slot.lrs-focused {
          opacity: 1 !important; filter: none !important;
        }
        .lrs-slot.lrs-focused .lrs-card-w {
          transform: scale(1.045) translateY(-4px) !important;
          box-shadow: 0 16px 56px rgba(0,0,0,0.28), 0 0 0 1.5px rgba(212,175,55,0.55), 0 0 36px rgba(212,175,55,0.22) !important;
          animation: lrsGlowFocus 2.6s ease-in-out infinite !important;
        }
        .lrs-slot.lrs-unfocused {
          opacity: 0.45 !important; filter: blur(1.2px) !important;
        }
        .lrs-slot.lrs-unfocused .lrs-card-w {
          animation-play-state: paused !important;
        }
        .lrs-card-w {
          background: rgba(255,255,255,0.97);
          border-radius: 18px; padding: 20px 22px;
          box-sizing: border-box;
          border: 1px solid rgba(212,175,55,0.28);
          box-shadow: 0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(212,175,55,0.12);
          position: relative; overflow: hidden;
            transition: transform 1.2s ease, box-shadow 1.2s ease, opacity 0.4s ease;
          will-change: transform;
        }
        .lrs-card-w::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, #B8860B, #D4AF37, transparent);
        }
        .lrs-card-w::after {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at 70% 0%, rgba(212,175,55,0.07) 0%, transparent 65%);
          pointer-events: none;
        }
        .lrs-slot-c .lrs-stars-w { display: none; }
        .lrs-stars-w { color: #D4AF37; font-size: 12px; margin-bottom: 8px; }
        .lrs-text-w {
          font-size: 12.5px;
          color: #F5ECD7 !important;
          line-height: 1.65;
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-style: italic;
          margin-bottom: 12px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          background: rgba(10,7,2,0.88) !important;
          border-left: 2px solid #C9962A;
          padding: 8px 12px;
          border-radius: 6px;
        }
        .lrs-author-w {
          display: flex; align-items: center; gap: 9px;
          border-top: 1px solid rgba(212,175,55,0.2);
          padding-top: 10px;
        }
        .lrs-avatar-w {
          width: 32px; height: 32px; border-radius: 50%;
          background: linear-gradient(135deg, #FDF0C0, #F4D06F);
          border: 1.5px solid #D4AF37;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 700; color: #8B6914;
          font-family: 'DM Sans', sans-serif; flex-shrink: 0;
        }
        .lrs-name-w { font-size: 12px; font-weight: 600; color: #1A1208; font-family: 'DM Sans', sans-serif; }
        .lrs-role-w { font-size: 10px; color: #9A8A5A; font-family: 'DM Sans', sans-serif; margin-top: 1px; }
        .lrs-verified-w {
          margin-left: auto; font-size: 9.5px; color: #5C8A3C;
          background: #EEF7E8; border: 1px solid #A8D88A;
          border-radius: 10px; padding: 2px 8px;
          font-family: 'DM Sans', sans-serif; font-weight: 600; white-space: nowrap;
        }
        @keyframes lrsFloatA {
          0%   { transform: translateY(0px) rotate(-1.2deg) scale(1); }
          33%  { transform: translateY(-9px) rotate(-0.3deg) scale(1.008); }
          66%  { transform: translateY(-4px) rotate(-1.5deg) scale(0.995); }
          100% { transform: translateY(0px) rotate(-1.2deg) scale(1); }
        }
        @keyframes lrsFloatB {
          0%   { transform: translateY(0px) rotate(1.1deg) scale(1); }
          40%  { transform: translateY(-7px) rotate(0.2deg) scale(1.006); }
          70%  { transform: translateY(-2px) rotate(1.4deg) scale(0.997); }
          100% { transform: translateY(0px) rotate(1.1deg) scale(1); }
        }
        @keyframes lrsFloatC {
          0%   { transform: translateY(-50%) scale(1); }
          35%  { transform: translateY(calc(-50% - 6px)) scale(1.012); }
          70%  { transform: translateY(calc(-50% - 2px)) scale(1.006); }
          100% { transform: translateY(-50%) scale(1); }
        }
        @keyframes lrsGlow {
          0%,100% { box-shadow: 0 8px 32px rgba(0,0,0,0.18), 0 0 0 1px rgba(212,175,55,0.2); }
          50%      { box-shadow: 0 12px 40px rgba(0,0,0,0.22), 0 0 0 1.5px rgba(212,175,55,0.42), 0 0 28px rgba(212,175,55,0.14); }
        }
        @keyframes lrsGlowFocus {
          0%,100% { box-shadow: 0 16px 56px rgba(0,0,0,0.26), 0 0 0 1.5px rgba(212,175,55,0.5), 0 0 32px rgba(212,175,55,0.18); }
          50%      { box-shadow: 0 20px 64px rgba(0,0,0,0.3), 0 0 0 2px rgba(212,175,55,0.7), 0 0 48px rgba(212,175,55,0.28); }
        }
        .lrs-slot-a .lrs-card-w { animation: lrsFloatA 6.5s ease-in-out infinite; }
        .lrs-slot-b .lrs-card-w { animation: lrsFloatB 7.2s ease-in-out 1.1s infinite; }
        .lrs-slot-c             { animation: lrsFloatC 7.8s ease-in-out 0.4s infinite; }
        .lrs-slot-c .lrs-card-w { animation: lrsGlow 3s ease-in-out infinite; }
        @media (max-width: 900px) {
          .lrs-slot-a, .lrs-slot-b { display: none; }
          .lrs-slot-c {
            position: relative; top: auto; right: auto;
            transform: none !important;
            width: 100%; max-width: 340px;
            margin: 24px auto 0; animation: none !important;
          }
          .lrs-slot-c .lrs-card-w { animation: lrsGlow 3s ease-in-out infinite !important; }
          #lsvcReviewStack { position: relative; }
        }
      `;
      document.head.appendChild(style);
    }

    function buildCardHTML(r) {
      const stars = '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating);
      const initials = r.name.split(' ').map(w => w[0]).join('').substring(0,2).toUpperCase();
      return `
        <div class="lrs-stars-w">${stars}</div>
        <div class="lrs-text-w">"${r.review}"</div>
        <div class="lrs-author-w">
          <div class="lrs-avatar-w">${initials}</div>
          <div>
            <div class="lrs-name-w">${r.name}</div>
            <div class="lrs-role-w">${r.role}</div>
          </div>
          <span class="lrs-verified-w">✓ Verified</span>
        </div>`;
    }

    function injectHTML() {
      const hero = document.querySelector('.lsvc-hero');
      if (!hero) return;
      hero.style.position = 'relative';
      hero.style.overflow = 'hidden';
      const old = document.getElementById('lsvcReviewStack');
      if (old) old.remove();

      const wrap = document.createElement('div');
      wrap.id = 'lsvcReviewStack';
      wrap.innerHTML = `
        <div class="lrs-slot lrs-slot-a" id="lrsSlotA">
          <div class="lrs-card-w" id="lrsCardA"></div>
        </div>
        <div class="lrs-slot lrs-slot-b" id="lrsSlotB">
          <div class="lrs-card-w" id="lrsCardB"></div>
        </div>
        <div class="lrs-slot lrs-slot-c" id="lrsSlotC">
          <div class="lrs-card-w" id="lrsCardC"></div>
        </div>
      `;
      hero.appendChild(wrap);
    }

    let reviews = [], focusIdx = 0, timer = null;
    const SLOTS = ['lrsSlotA', 'lrsSlotB', 'lrsSlotC'];
    const CARDS = ['lrsCardA', 'lrsCardB', 'lrsCardC'];

    function render() {
      reviews = getAllReviews();
      CARDS.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = buildCardHTML(reviews[i % reviews.length]);
      });
      applyFocus(focusIdx);
    }

    function applyFocus(newFocus) {
      SLOTS.forEach((id, i) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.classList.remove('lrs-focused', 'lrs-unfocused');
        el.classList.add(i === newFocus ? 'lrs-focused' : 'lrs-unfocused');
      });
      focusIdx = newFocus;
    }

   function rotateFocus() {
  const next = (focusIdx + 1) % SLOTS.length;
  const total = reviews.length;


  setTimeout(() => {
    CARDS.forEach((id, i) => {
      const el = document.getElementById(id);
      if (el) {
        el.innerHTML = buildCardHTML(reviews[(next + i) % total]);
        el.style.transition = 'opacity 0.4s ease';
        el.style.opacity = '1';
      }
    });
    applyFocus(next);
  }, 350);
}
    function startAuto() { timer = setInterval(rotateFocus, 1500); }
    function stopAuto()  { clearInterval(timer); }

    injectCSS();
    injectHTML();
    render();
    startAuto();

    const stackWrap = document.getElementById('lsvcReviewStack');
    if (stackWrap) {
      stackWrap.addEventListener('mouseenter', stopAuto);
      stackWrap.addEventListener('mouseleave', startAuto);
    }

  })();
}
