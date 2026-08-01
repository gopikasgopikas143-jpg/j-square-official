/* ═══════════════════════════════════════
   SUPABASE SETUP
═══════════════════════════════════════ */
const { createClient } = supabase;
const sb = createClient(
  'https://gevrzutbjnclmenmohmn.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdldnJ6dXRiam5jbG1lbm1vaG1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0Nzk1ODUsImV4cCI6MjA5NjA1NTU4NX0.N8SVnw2TqnibVGhNNaPs85hyl2Fm0apFjbdsVySre70'
);
window.sb = sb;
/* ═══════════════════════════════════════
   COLORS
═══════════════════════════════════════ */
var var_green = '#2E7D52';
var var_red   = '#B94040';

/* ── HERO SLIDER ── */
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const dots   = document.querySelectorAll('.sdot');

function goSlide(n) {
  if (n < 0) n = slides.length - 1;
  if (n >= slides.length) n = 0;
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  currentSlide = n;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}
setInterval(() => goSlide(currentSlide + 1), 4000);

/* ── HERO STATS COUNTER ── */
function animateHeroCounter(el) {
  const target = parseInt(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const duration = 6000;
  const startTime = performance.now();
  function easeOutExpo(t) { return t === 1 ? 1 : 1 - Math.pow(2, -10 * t); }
  const update = (now) => {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = easeOutExpo(progress);
    el.textContent = Math.round(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target + suffix;
  };
  requestAnimationFrame(update);
}
window.addEventListener('load', () => {
  document.querySelectorAll('#heroStats .hero-stat-num[data-target]').forEach(animateHeroCounter);
});

/* ═══════════════════════════════════════
   MAIN SITE NAVIGATION
═══════════════════════════════════════ */
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('active');
  window.scrollTo({top:0, behavior:'smooth'});
  if(id === 'insights') renderInsights();
  if(id === 'post') renderAll();
  if(id === 'services') lsvcInit();
  updateCtaBanner(id);
}
function setActive(el) {
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  el.classList.add('active');
}
function toggleMobile() { document.getElementById('mobileMenu').classList.toggle('open'); }
function closeMobile() { document.getElementById('mobileMenu').classList.remove('open'); }
function scrollToProjects() {
  setTimeout(() => { const el = document.getElementById('projects-section'); if(el) el.scrollIntoView({behavior:'smooth'}); }, 100);
}

/* ═══════════════════════════════════════
   REVIEW SYSTEM — SUPABASE
═══════════════════════════════════════ */
let selectedStar   = 5;
let deleteTargetId = null;
let currentUser    = null;

/* ── GOOGLE SIGN-IN ── */
async function openGoogleSignIn() {
 
  await sb.auth.signOut();
  currentUser = null;

  const { data, error } = await sb.auth.signInWithOAuth({
    provider: 'google',
    options: {
      skipBrowserRedirect: true,
      queryParams: { prompt: 'select_account' }
    }
  });

  if (error) { showReviewToast('❌ Sign-in failed. Try again.'); return; }

  const popup = window.open(
    data.url,
    'GoogleSignIn',
    'width=500,height=600,left=400,top=100'
  );

  if (!popup) {
    showReviewToast('❌ Popup blocked! Please allow popups for this site.');
    return;
  }

  // Remove any old listener first
  if (window._reviewAuthHandler) {
    window.removeEventListener('message', window._reviewAuthHandler);
  }

  window._reviewAuthHandler = async function(event) {
    if (event.origin !== window.location.origin) return;
    if (event.data?.type !== 'SUPABASE_AUTH_SUCCESS') return;

    window.removeEventListener('message', window._reviewAuthHandler);
    window._reviewAuthHandler = null;

    await sb.auth.setSession(event.data.session);

    const u = event.data.session.user;
    currentUser = {
      displayName: u.user_metadata?.full_name || u.email || 'Anonymous',
      email:       u.email,
      photoURL:    u.user_metadata?.avatar_url || null
    };

    sessionStorage.removeItem('openReviewAfterLogin');
    openReviewFormDirectly();
  };

  window.addEventListener('message', window._reviewAuthHandler);
}
/* ── OPEN REVIEW OVERLAY ── */
function openReviewOverlay() {
  // BUG FIX: was inverted — checked currentUser truthy to sign in,
  // and opened form when null. Now correctly reversed.
  if (!currentUser) {
    openGoogleSignIn();   // not signed in → trigger Google OAuth
    return;
  }
  openReviewFormDirectly();  // already signed in → open form directly
}
function openReviewFormDirectly() {
  document.getElementById('rKey').value = '';
  document.getElementById('reviewText').value = '';
  setReviewStar(0);

  // Show current user photo + name
  if (currentUser) {
    const photoEl = document.getElementById('reviewUserPhoto');
    const nameEl  = document.getElementById('reviewUserName');

    if (nameEl) {
      nameEl.textContent = currentUser.displayName || currentUser.email || 'Anonymous';
    }

    if (photoEl) {
      if (currentUser.photoURL) {
        photoEl.src = currentUser.photoURL;
        photoEl.referrerPolicy = 'no-referrer';
        photoEl.style.display = 'block';
      } else {
        // No photo — hide img, name alone shows
        photoEl.style.display = 'none';
      }
    }
  }

  const overlay = document.getElementById('reviewOverlay');
  if (overlay) {
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}
/* toggleKey  */
 function toggleKeyVis(inputId, btnId) {
  const input = document.getElementById(inputId);
  const btn   = document.getElementById(btnId);
  if (input.type === 'password') {
    input.type = 'text';
    btn.textContent = '🙈';
  } else {
    input.type = 'password';
    btn.textContent = '👁️';
  }
}
/* ── CLOSE OVERLAY ── */
function closeReviewOverlay() {
  const overlay = document.getElementById('reviewOverlay');
  if (overlay) overlay.style.display = 'none';
  document.body.style.overflow = '';
}

/* ── STAR RATING ── */
function setReviewStar(n) {
  selectedStar = n;
  document.querySelectorAll('.rstar').forEach((s, i) => {
    s.textContent = i < n ? '★' : '☆';
    s.style.color = i < n ? 'var(--gold)' : '#ccc';
  });
}

/* ── SUBMIT REVIEW → SUPABASE ── */
async function submitUserReview() {
  if (!currentUser) { showReviewToast('❌ Please sign in first!'); return; }

  const textEl = document.getElementById('reviewText');
  const locEl  = document.getElementById('rLoc');
  const keyEl  = document.getElementById('rKey');

  const reviewText = textEl ? textEl.value.trim() : '';
  const loc  = locEl ? locEl.value.trim() : 'Salem';
  const key  = keyEl ? keyEl.value.trim() : '';

  if (!reviewText) { showReviewToast('❌ Please write your review!'); return; }
  if (!key)        { showReviewToast('❌ Please enter a secret key to delete later!'); return; }
  if (selectedStar === 0) { showReviewToast('❌ Please select a star rating!'); return; }

  const name = currentUser.displayName || currentUser.email || 'Anonymous';

  const { error } = await sb.from('reviews').insert([{
    name,
    loc: loc || 'Salem',
    review_text: reviewText,
    key,
    stars: selectedStar,
    pic: currentUser.photoURL || null,
    initials: name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase(),
    date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  }]);

  if (error) { showReviewToast('❌ Error saving review. Try again.'); console.error(error); return; }

  closeReviewOverlay();
  await renderUserReviews();
  showReviewToast('✅ Review submitted! Thank you.');

  // ✅ Submit ஆன உடனே sign-out — next review-க்கு fresh sign-in கேக்கும்
  await sb.auth.signOut();
  currentUser = null;
}

/* ── RENDER REVIEWS FROM SUPABASE ── */
async function renderUserReviews() {
  const grid = document.getElementById('testGrid');
  if (!grid) return;

  const { data, error } = await sb.from('reviews').select('*').order('created_at', { ascending: false });
  if (error) { console.error(error); return; }

  grid.querySelectorAll('.user-review').forEach(el => el.remove());

  (data || []).forEach(r => {
    const card = document.createElement('div');
    card.className = 'test-card user-review';
    card.style.position = 'relative';

    const avatarHtml = r.pic
      ? `<img class="test-avatar-img" src="${r.pic}" referrerpolicy="no-referrer" alt="${escapeHtml(r.name)}">`
      : `<div class="test-avatar">${escapeHtml(r.initials || '?')}</div>`;

    card.innerHTML = `
      <!-- 3-dot menu -->
      <div style="position:absolute;top:12px;right:12px;">
        <button onclick="toggleReviewMenu(event,'rmenu-${r.id}')"
          style="background:rgba(0,0,0,0.06);border:none;border-radius:50%;
                 width:30px;height:30px;cursor:pointer;font-size:16px;
                 display:flex;align-items:center;justify-content:center;
                 color:#555;line-height:1;">⋮</button>
        <div id="rmenu-${r.id}"
          style="display:none;position:absolute;right:0;top:34px;
                 background:#fff;border:1px solid #eee;border-radius:10px;
                 box-shadow:0 4px 16px rgba(0,0,0,0.12);min-width:160px;z-index:999;overflow:hidden;">
          <button onclick="openReviewDetail(${r.id})"
            style="width:100%;padding:10px 14px;border:none;background:none;
                   text-align:left;cursor:pointer;font-size:0.82rem;
                   display:flex;align-items:center;gap:8px;color:#333;">
            👁️ View Full Review
          </button>
          <div style="height:1px;background:#f0f0f0;"></div>
          <button onclick="openDeleteOverlay(${r.id})"
            style="width:100%;padding:10px 14px;border:none;background:none;
                   text-align:left;cursor:pointer;font-size:0.82rem;
                   display:flex;align-items:center;gap:8px;color:#B94040;">
            🗑️ Delete Review
          </button>
        </div>
      </div>

      <!-- Stars -->
      <div class="test-stars" style="padding-right:36px;">
        ${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}
      </div>

      <!-- Review text — clamped to 4 lines -->
      <p class="test-text review-clamped" id="rtxt-${r.id}"
        style="display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;
               overflow:hidden;margin-bottom:4px;">
        "${escapeHtml(r.review_text)}"
      </p>

      <!-- Author -->
      <div class="test-author">
        ${avatarHtml}
        <div>
          <div class="test-name">${escapeHtml(r.name)}</div>
          <div class="test-loc">📍 ${escapeHtml(r.loc || 'Salem')} — ${r.date}</div>
        </div>
      </div>`;

    grid.insertBefore(card, grid.firstChild);
  });

  // Close menus on outside click
  document.addEventListener('click', closeAllReviewMenus, { once: false });
}

/* ── HTML ESCAPE ── */
function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
/* ── REVIEW 3-DOT MENU ── */
function toggleReviewMenu(e, menuId) {
  e.stopPropagation();
  const menu = document.getElementById(menuId);
  const isOpen = menu.style.display === 'block';
  closeAllReviewMenus();
  if (!isOpen) menu.style.display = 'block';
}

function closeAllReviewMenus() {
  document.querySelectorAll('[id^="rmenu-"]').forEach(m => m.style.display = 'none');
}

/* ── VIEW FULL REVIEW OVERLAY ── */
function openReviewDetail(id) {
  closeAllReviewMenus();

  // Supabase-ல இருந்து data எடு
  sb.from('reviews').select('*').eq('id', id).single().then(({ data: r }) => {
    if (!r) return;

    const avatarHtml = r.pic
      ? `<img src="${r.pic}" referrerpolicy="no-referrer"
             style="width:48px;height:48px;border-radius:50%;object-fit:cover;border:2px solid #c9a227;">`
      : `<div style="width:48px;height:48px;border-radius:50%;background:#c9a227;
                     color:#fff;display:flex;align-items:center;justify-content:center;
                     font-size:20px;font-weight:700;">
           ${escapeHtml(r.initials || '?')}
         </div>`;

    const existing = document.getElementById('reviewDetailOverlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'reviewDetailOverlay';
    overlay.style.cssText = `position:fixed;inset:0;background:rgba(0,0,0,0.55);
      z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;`;

    overlay.innerHTML = `
      <div style="background:#fff;border-radius:16px;max-width:460px;width:100%;
                  overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.2);">

        <!-- Header -->
        <div style="background:#2a2310;padding:14px 16px;
                    display:flex;align-items:center;justify-content:space-between;">
          <span style="color:#fff;font-size:15px;font-weight:600;">Full Review</span>
          <button onclick="document.getElementById('reviewDetailOverlay').remove();
                           document.body.style.overflow='';"
            style="background:rgba(255,255,255,0.15);border:1px solid rgba(255,255,255,0.3);
                   color:#fff;border-radius:8px;padding:5px 14px;font-size:13px;cursor:pointer;">
            ✕ Close
          </button>
        </div>

        <!-- Body -->
        <div style="padding:20px;">
          <!-- Stars -->
          <div style="font-size:1.4rem;color:#c9a227;margin-bottom:12px;">
            ${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}
          </div>

          <!-- Full review text -->
          <p style="font-size:0.9rem;color:#444;line-height:1.7;
                    margin-bottom:18px;font-style:italic;">
            "${escapeHtml(r.review_text)}"
          </p>

          <!-- Author -->
          <div style="display:flex;align-items:center;gap:12px;
                      border-top:1px solid #f0f0f0;padding-top:14px;">
            ${avatarHtml}
            <div>
              <div style="font-weight:700;font-size:0.9rem;">${escapeHtml(r.name)}</div>
              <div style="font-size:0.75rem;color:#888;">
                📍 ${escapeHtml(r.loc || 'Salem')} — ${r.date}
              </div>
              <div style="font-size:0.72rem;color:#2E7D52;margin-top:2px;">
                ✅ Verified Google Account
              </div>
            </div>
          </div>
        </div>
      </div>`;

    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
    overlay.addEventListener('click', e => {
      if (e.target === overlay) {
        overlay.remove();
        document.body.style.overflow = '';
      }
    });
  });
}
/* ── DELETE REVIEW ── */
function openDeleteOverlay(id) {
  deleteTargetId = id;
  const keyInput = document.getElementById('deleteKeyInput');
  if (keyInput) keyInput.value = '';
  const overlay = document.getElementById('deleteReviewOverlay');
  if (overlay) { overlay.style.display = 'flex'; document.body.style.overflow = 'hidden'; }
}

function closeDeleteOverlay() {
  const overlay = document.getElementById('deleteReviewOverlay');
  if (overlay) overlay.style.display = 'none';
  document.body.style.overflow = '';
  deleteTargetId = null;
}

async function confirmDeleteReview() {
  const inputKey = document.getElementById('deleteKeyInput')?.value.trim();
  if (!inputKey) { showReviewToast('❌ Please enter your secret key!'); return; }

  // Check key from Supabase
  const { data, error } = await sb.from('reviews').select('key').eq('id', deleteTargetId).single();
  if (error || !data) { closeDeleteOverlay(); return; }

  if (inputKey !== data.key) {
    showReviewToast('❌ Wrong secret key!');
    document.getElementById('deleteKeyInput').value = '';
    document.getElementById('deleteKeyInput').focus();
    return;
  }

  await sb.from('reviews').delete().eq('id', deleteTargetId);
  closeDeleteOverlay();
  await renderUserReviews();
  showReviewToast('🗑️ Review deleted.');
}

/* ── TOAST ── */
function showReviewToast(msg) {
  const t = document.getElementById('portalToast');
  if (t) {
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
  }
}

/* ── CTA BANNER ── */
function updateCtaBanner(pageId) {
  const cta = document.getElementById('ctaBanner');
  if (cta) cta.style.display = pageId === 'home' ? 'block' : 'none';
}

/* ═══════════════════════════════════════
   MARKET INSIGHTS
═══════════ ════════════════════════════ */
const areas = [
  {name:'Fairlands',price:5600,growth:7.5,infra:9.2,tag:'Premium Zone'},
  {name:'Hasthampatti',price:5000,growth:7.0,infra:8.8,tag:'High Demand'},
  {name:'Ammapet',price:3300,growth:6.1,infra:7.6,tag:'City Hub'},
  {name:'Gorimedu',price:3000,growth:7.4,infra:7.3,tag:'Rising Fast'},
  {name:'Seelanaickenpatti',price:2900,growth:7.2,infra:7.2,tag:'Mid Range'},
  {name:'Ayothiyapattinam',price:1900,growth:7.1,infra:6.6,tag:'Affordable'},
  {name:'Udayapatti',price:1750,growth:7.3,infra:6.3,tag:'Budget Friendly'},
  {name:'Annathanapatti',price:1600,growth:5.0,infra:5.6,tag:'Entry Level'},
];

function renderInsights(list) {
  const data = list || areas;
  let cards = '', rows = '';
  data.forEach(a => {
    const dots = Math.round(a.infra);
    let d = '';
    for(let i=0;i<10;i++) d += `<div class="dot ${i<dots?'filled':''}"></div>`;
    cards += `<div class="area-card"><div class="area-name">${a.name}</div><div class="area-metrics"><div class="metric"><div class="metric-val">₹${a.price.toLocaleString('en-IN')}</div><div class="metric-label">per sq.ft</div></div><div class="metric"><div class="metric-val" style="color:var(--green)">${a.growth}%</div><div class="metric-label">Growth</div></div><div class="metric"><div class="metric-val">${a.infra}/10</div><div class="metric-label">Infra</div></div></div><div class="growth-bar"><div class="growth-fill" style="width:${a.growth/10*100}%"></div></div><div class="infra-dots">${d}</div><div style="margin-top:8px;display:flex;justify-content:space-between;align-items:center;"><span style="font-size:0.72rem;color:var(--text-muted)">${a.tag}</span><button onclick="showPage('contact')" style="font-size:0.72rem;padding:4px 10px;background:var(--gold);border:none;border-radius:6px;cursor:pointer;font-weight:700;">Enquire →</button></div></div>`;
    rows += `<tr><td><strong>${a.name}</strong></td><td>₹${a.price.toLocaleString('en-IN')}/sq.ft</td><td><span class="growth-badge">▲ ${a.growth}%/yr</span></td><td><span class="infra-score">${a.infra}/10</span></td><td><span style="font-size:0.8rem;color:var(--text-muted)">${a.tag}</span></td></tr>`;
  });
  document.getElementById('area-cards-grid').innerHTML = cards;
  document.getElementById('price-tbody').innerHTML = rows;
}

function filterInsights() {
  const f = document.getElementById('insights-filter').value;
  const s = document.getElementById('insights-search').value.toLowerCase();
  renderInsights(areas.filter(a => {
    const ms = a.name.toLowerCase().includes(s);
    const mf = f==='all'||(f==='high'&&a.growth>=7)||(f==='affordable'&&a.price<3000)||(f==='premium'&&a.price>=3000);
    return ms && mf;
  }));
}

/* ═══════════════════════════════════════
   ENQUIRY SUBMIT → SUPABASE
═══════════════════════════════════════ */
async function submitEnquiry() {
  const name  = document.getElementById('enq-name').value.trim();
  const phone = document.getElementById('enq-phone').value.trim();
  if(!name || !phone) { alert('Please fill in your name and phone number.'); return; }

  const { error } = await sb.from('enquiries').insert([{
    name,
    phone,
    interest: document.getElementById('enq-interest').value,
    budget:   document.getElementById('enq-budget').value
  }]);

  if (error) { console.error(error); alert('Error submitting. Try again.'); return; }

  ['enq-name','enq-phone','enq-email','enq-msg'].forEach(id => document.getElementById(id).value = '');
  const t = document.getElementById('toast');
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 4000);
}

/* ═══════════════════════════════════════
   LAND PORTAL — DATA
═══════════════════════════════════════ */
const demoPhotos = {
  1: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=75','https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=75'],
  2: ['https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&q=75','https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c10?w=600&q=75'],
  3: ['https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=75'],
  4: ['https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=75','https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600&q=75']
};

const defaultListings = [];

let listings = [...defaultListings];
let selectedType = 'residential';
let activeMenu = null;
let pendingAction = null;
let uploadedPhotos = [];

const typeIcon = {residential:'🏘️',commercial:'🏢',farm:'🌾',plot:'📐'};

/* ═══════════════════════════════════════
   RENDER LISTINGS FROM SUPABASE
═══════════════════════════════════════ */
function fmtL(n) { return '₹' + Number(n).toLocaleString('en-IN'); }

async function renderAll() {
  const { data, error } = await sb.from('listings')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) { console.error(error); }

  // Combine: Supabase data first, then demo listings
  const supabaseData = (data || []).map(l => ({...l, isDemo: false}));
  listings = [...supabaseData, ...defaultListings];

  renderListings(applyFilters());
}

function renderListings(data) {
  const grid = document.getElementById('listingsGrid');
  if(!grid) return;
  if(!data.length) {
    grid.innerHTML = `<div class="portal-empty"><span class="pe-icon">🔍</span><p>No listings match your search.<br>Be the first to post in this area!</p></div>`;
    return;
  }
  grid.innerHTML = data.map(l => cardHTML(l)).join('');
}

function cardHTML(l) {
  const soldClass   = l.sold ? ' is-sold' : '';
  const soldRibbon  = l.sold ? `<div class="sold-ribbon">✅ Sold — No Longer Available</div>` : '';
  const soldStamp   = l.sold ? `<div class="sold-stamp">SOLD</div>` : '';
  const featsHtml   = (l.feats||[]).slice(0,3).map(f=>`<span class="listing-spec">${f}</span>`).join('');
  const roleLabel   = l.role==='agent' ? '<span class="owner-role">Agent</span>' : '<span class="owner-role">Direct Owner</span>';
  const footerRight = l.sold ? `<span class="sold-label">Property Sold</span>` : `<a href="tel:${l.phone}" class="listing-call-btn">📞 Call Now</a>`;

 const allPhotos = (l.photos && l.photos.length > 0) ? l.photos : (demoPhotos[l.id] || []);
  const thumbPhoto  = allPhotos.length > 0 ? allPhotos[0] : null;
 const photoCount = allPhotos.length;

const thumbContent = allPhotos.length > 0 ? `
  <img id="cimg-${l.id}" src="${allPhotos[0]}" alt="${l.title}" style="width:100%;height:100%;object-fit:cover;">
  <div style="position:absolute;bottom:8px;left:50%;transform:translateX(-50%);display:flex;gap:5px;" id="cdots-${l.id}">
    ${allPhotos.map((_,i) => `<div style="width:7px;height:7px;border-radius:50%;background:${i===0?'#fff':'rgba(255,255,255,0.4)'};" id="cdot-${l.id}-${i}"></div>`).join('')}
  </div>
  ${allPhotos.length > 1 ? `
  <button onclick="slideCard(event,'${l.id}',-1,${JSON.stringify(allPhotos).replace(/"/g,"'")})" style="position:absolute;top:50%;left:8px;transform:translateY(-50%);background:rgba(0,0,0,0.4);border:none;color:#fff;width:26px;height:26px;border-radius:50%;cursor:pointer;font-size:16px;">‹</button>
  <button onclick="slideCard(event,'${l.id}',1,${JSON.stringify(allPhotos).replace(/"/g,"'")})" style="position:absolute;top:50%;right:36px;transform:translateY(-50%);background:rgba(0,0,0,0.4);border:none;color:#fff;width:26px;height:26px;border-radius:50%;cursor:pointer;font-size:16px;">›</button>` : ''}
  <div style="position:absolute;top:8px;left:8px;background:rgba(0,0,0,0.5);color:#fff;font-size:11px;padding:3px 8px;border-radius:20px;" id="cpcount-${l.id}">1 / ${photoCount}</div>
` : `<span class="listing-thumb-icon">${typeIcon[l.type]||'🏡'}</span>`;
 
  const photoCountBadge = photoCount > 1 ? `<div class="photo-count-badge">📷 ${photoCount}</div>` : '';

  
const menuHtml = `
  <div class="listing-menu-wrap">
    <button class="listing-menu-btn" onclick="toggleMenu(event,'${l.id}')" title="Options">⋮</button>
    <div class="listing-dropdown" id="dd-${l.id}">
      <button class="dd-btn" onclick="openListingDetail('${l.id}')"><span class="dd-icon">👁️</span> View Details</button>
      <div class="dd-divider"></div>
      ${!l.sold ? `<button class="dd-btn" onclick="tryAction('sold','${l.id}')"><span class="dd-icon">✅</span> Mark as Sold</button><div class="dd-divider"></div>` : ''}
      <button class="dd-btn danger" onclick="tryAction('delete','${l.id}')"><span class="dd-icon">🗑️</span> Delete Listing</button>
    </div>
  </div>`;

  const ownerName = l.owner_name || l.ownerName || 'Owner';

  return `
  <div class="listing-card${soldClass}" id="card-${l.id}">
    ${soldRibbon}
    <div class="listing-thumb">
      ${thumbContent}
      <div class="listing-type-badge ${l.type}">${l.type.charAt(0).toUpperCase()+l.type.slice(1)}</div>
      ${photoCountBadge}
      ${menuHtml}
    </div>
    ${soldStamp}
    <div class="listing-body">
      <div class="listing-title-row">
        <h3 class="listing-title">${l.title}</h3>
        <span class="listing-price">${fmtL(l.price)}</span>
      </div>
      <div class="listing-location">${l.loc}${l.addr?' — '+l.addr:''}</div>
      <div class="listing-specs">
        ${l.cents?`<span class="listing-spec">📐 ${l.cents} Cents</span>`:''}
        ${l.sqft?`<span class="listing-spec">${Number(l.sqft).toLocaleString('en-IN')} sqft</span>`:''}
        ${l.pps?`<span class="listing-spec">₹${Number(l.pps).toLocaleString('en-IN')}/sqft</span>`:''}
        ${featsHtml}
      </div>
      <p class="listing-description">${l.description || ''}</p>
      <div class="listing-footer">
        <div class="listing-owner">
          <div class="owner-avatar">${ownerName.charAt(0).toUpperCase()}</div>
          <div class="owner-info">
            <div class="owner-name">${ownerName}</div>
            ${roleLabel}
            <div class="listing-date">${l.date}</div>
          </div>
        </div>
        ${footerRight}
      </div>
    </div>
  </div>`;
}
// Photo slider for cards
const cardSlideIndex = {};
function slideCard(e, id, dir, photos) {
  e.stopPropagation();
  if (!cardSlideIndex[id]) cardSlideIndex[id] = 0;
  cardSlideIndex[id] = (cardSlideIndex[id] + dir + photos.length) % photos.length;
  const idx = cardSlideIndex[id];
  document.getElementById('cimg-' + id).src = photos[idx];
  document.getElementById('cpcount-' + id).textContent = (idx+1) + ' / ' + photos.length;
  const dotsEl = document.getElementById('cdots-' + id);
  if (dotsEl) dotsEl.querySelectorAll('div').forEach((d, i) => {
    d.style.background = i === idx ? '#fff' : 'rgba(255,255,255,0.4)';
  });
}

// View Details full screen
function openListingDetail(id) {
  closeAllMenus();
  const l = listings.find(x => String(x.id) === String(id));
  if (!l) return;
  const allPhotos = (l.photos && l.photos.length > 0) ? l.photos : (demoPhotos[l.id] || []);
  const featsHtml = (l.feats||[]).map(f => `<span style="font-size:12px;background:#fdf8ec;color:#7a5c00;border:1px solid #c9a22755;padding:4px 10px;border-radius:20px;">${f}</span>`).join('');
  const galleryHtml = allPhotos.length > 0
    ? allPhotos.map((p, i) => `<img src="${p}" style="width:100%;height:${i===0?'200px':'120px'};object-fit:cover;${i===0?'grid-column:span 2;':''}" alt="photo ${i+1}">`).join('')
    : `<div style="height:200px;background:#f5f5f5;display:flex;align-items:center;justify-content:center;grid-column:span 2;font-size:40px;">${typeIcon[l.type]||'🏡'}</div>`;
  const ownerName = l.owner_name || l.ownerName || 'Owner';

  const overlay = document.createElement('div');
  overlay.id = 'listingDetailOverlay';
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:9999;overflow-y:auto;padding:20px;display:flex;justify-content:center;align-items:flex-start;';
  overlay.innerHTML = `
    <div style="background:#fff;border-radius:16px;max-width:500px;width:100%;overflow:hidden;margin:auto;">
      <div style="background:#2a2310;padding:14px 16px;display:flex;align-items:center;justify-content:space-between;">
        <span style="color:#fff;font-size:16px;font-weight:600;">Listing Details</span>
        <button onclick="closeListingDetail()" style="background:rgba(255,255,255,0.15);border:1px solid rgba(255,255,255,0.3);color:#fff;border-radius:8px;padding:6px 14px;font-size:13px;cursor:pointer;">← Back</button>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:3px;background:#eee;">${galleryHtml}</div>
      <div style="padding:16px;">
        <div style="font-size:18px;font-weight:700;margin-bottom:2px;">${l.title}</div>
        <div style="font-size:20px;font-weight:700;color:#c9a227;margin-bottom:8px;">${fmtL(l.price)}</div>
        <div style="font-size:13px;color:#888;margin-bottom:14px;">📍 ${l.loc}${l.addr?' — '+l.addr:''}</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px;">
          ${l.cents?`<div style="background:#f8f8f8;border-radius:8px;padding:10px 12px;"><div style="font-size:11px;color:#888;">Area</div><div style="font-size:14px;font-weight:600;">${l.cents} Cents</div></div>`:''}
          ${l.sqft?`<div style="background:#f8f8f8;border-radius:8px;padding:10px 12px;"><div style="font-size:11px;color:#888;">Sqft</div><div style="font-size:14px;font-weight:600;">${Number(l.sqft).toLocaleString('en-IN')} sqft</div></div>`:''}
          ${l.pps?`<div style="background:#f8f8f8;border-radius:8px;padding:10px 12px;"><div style="font-size:11px;color:#888;">Price/sqft</div><div style="font-size:14px;font-weight:600;">₹${Number(l.pps).toLocaleString('en-IN')}</div></div>`:''}
          <div style="background:#f8f8f8;border-radius:8px;padding:10px 12px;"><div style="font-size:11px;color:#888;">Type</div><div style="font-size:14px;font-weight:600;">${l.type}</div></div>
        </div>
        ${l.description?`<p style="font-size:13px;color:#666;line-height:1.6;margin-bottom:14px;">${l.description}</p>`:''}
        <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px;">${featsHtml}</div>
        <div style="border-top:1px solid #eee;padding-top:14px;display:flex;justify-content:space-between;align-items:center;">
          <div style="display:flex;align-items:center;gap:10px;">
            <div style="width:40px;height:40px;border-radius:50%;background:#c9a227;color:#7a5c00;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;">${ownerName.charAt(0).toUpperCase()}</div>
            <div>
              <div style="font-size:14px;font-weight:600;">${ownerName}</div>
              <div style="font-size:11px;color:#888;">${l.role==='agent'?'Agent':'Direct Owner'} · ${l.date}</div>
            </div>
          </div>
          ${!l.sold?`<a href="tel:${l.phone}" style="background:#c9a227;color:#fff;border:none;border-radius:8px;padding:10px 20px;font-size:14px;font-weight:600;text-decoration:none;">📞 Call Now</a>`:'<span style="color:#c00;font-weight:600;">Property Sold</span>'}
        </div>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';
  overlay.addEventListener('click', e => { if(e.target === overlay) closeListingDetail(); });
}

function closeListingDetail() {
  const el = document.getElementById('listingDetailOverlay');
  if (el) el.remove();
  document.body.style.overflow = '';
}
/* ═══════════════════════════════════════
   THREE DOT MENU
═══════════════════════════════════════ */
function toggleMenu(e, id) {
  e.stopPropagation();
  const dd = document.getElementById('dd-'+id);
  const isOpen = dd.classList.contains('open');
  closeAllMenus();
  if(!isOpen) { dd.classList.add('open'); activeMenu = id; }
}
function closeAllMenus() {
  document.querySelectorAll('.listing-dropdown.open').forEach(d => d.classList.remove('open'));
  activeMenu = null;
}
document.addEventListener('click', closeAllMenus);

/* ═══════════════════════════════════════
   KEY-GATED ACTIONS — SUPABASE
═══════════════════════════════════════ */
function tryAction(type, id) {
  closeAllMenus();
  pendingAction = {type, id};
  const msg = type==='delete' ? 'Enter your secret key to <strong>delete</strong> this listing.' : 'Enter your secret key to <strong>mark as Sold</strong>.';
  document.getElementById('keyPromptMsg').innerHTML = msg;
  document.getElementById('keyInput').value = '';
  document.getElementById('keyConfirmBtn').onclick = executeAction;
  document.getElementById('keyPromptOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
  setTimeout(() => document.getElementById('keyInput').focus(), 300);
}
async function executeAction() {
  const entered = document.getElementById('keyInput').value.trim();
  if(!entered) { showPortalToast('⚠️ Please enter your secret key.'); return; }

  const {type, id} = pendingAction;
  const numId = parseInt(id); // ← இது தான் missing ஆ இருந்துச்சு

  const { data, error } = await sb.from('listings').select('key').eq('id', numId).single();
  if(error || !data) { showPortalToast('❌ Listing not found.'); closeKeyPrompt(); return; }

  if(entered !== data.key) {
    showPortalToast('❌ Wrong key. Only the person who posted can manage this listing.');
    document.getElementById('keyInput').value = '';
    document.getElementById('keyInput').focus();
    return;
  }
closeKeyPrompt();

  if(type === 'delete') {
    showMiniConfirm('Delete this listing permanently?', async () => {
      const { error } = await sb.from('listings').delete().eq('id', numId);
      if(error) { showPortalToast('❌ Delete failed: ' + error.message); return; }
      await renderAll();
      showPortalToast('🗑️ Listing deleted successfully.');
    });
  } else if(type === 'sold') {
    showMiniConfirm('Mark this listing as Sold?', async () => {
      const { error } = await sb.from('listings').update({ sold: true }).eq('id', numId);
      if(error) { showPortalToast('❌ Update failed: ' + error.message); return; }
      await renderAll();
      showPortalToast('✅ Listing marked as Sold!');
    });
  }
} // ✅ executeAction closing brace

function closeKeyPrompt() {
  document.getElementById('keyPromptOverlay').classList.remove('active');
  document.body.style.overflow = '';
  pendingAction = null;
}

/* ═══════════════════════════════════════
   MINI CONFIRM
═══════════════════════════════════════ */
let mcCallback = null;
function showMiniConfirm(msg, cb) {
  mcCallback = cb;
  document.getElementById('mcMsg').textContent = msg;
  const mc = document.getElementById('miniConfirm');
  mc.style.display = 'flex';
}
/* ═══════════════════════════════════════
   PORTAL TOAST
═══════════════════════════════════════ */
let portalToastTimer;
function showPortalToast(msg) {
  const t = document.getElementById('portalToast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(portalToastTimer);
  portalToastTimer = setTimeout(() => t.classList.remove('show'), 3500);
}

/* ═══════════════════════════════════════
   FILTER
═══════════════════════════════════════ */
function applyFilters() {
  const q    = (document.getElementById('portalSearch')||{value:''}).value.toLowerCase().trim();
  const type = (document.getElementById('portalTypeFilter')||{value:''}).value;
  const area = (document.getElementById('portalAreaFilter')||{value:''}).value;
  return listings.filter(l =>
    (!q || [l.title,l.loc,l.addr,l.description].join(' ').toLowerCase().includes(q)) &&
    (!type || l.type===type) &&
    (!area || l.loc===area)
  );
}
function filterListings() { renderListings(applyFilters()); }

/* ═══════════════════════════════════════
   PHOTO UPLOAD
═══════════════════════════════════════ */
async function handlePhotoUpload(input) {
  const files = Array.from(input.files);
  const remaining = 5 - uploadedPhotos.length;
  const toProcess = files.slice(0, remaining);

  for (const file of toProcess) {
    if (!file.type.startsWith('image/')) continue;

    // Unique filename
    const fileName = `listings/${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`;

    // Supabase Storage-ல upload
    const { data, error } = await sb.storage
      .from('listing-photos')   // ← உங்கள் bucket name
      .upload(fileName, file, { contentType: file.type });

    if (error) { 
      showPortalToast('❌ Photo upload failed: ' + error.message); 
      continue; 
    }

    // Public URL எடு
    const { data: urlData } = sb.storage
      .from('listing-photos')
      .getPublicUrl(fileName);

    uploadedPhotos.push(urlData.publicUrl); // ← URL மட்டும் store
    renderPhotoPreviews();
  }
  input.value = '';
}

function renderPhotoPreviews() {
  const grid = document.getElementById('photoPreviewGrid');
  const info = document.getElementById('photoCountInfo');
  if(!grid) return;
  let html = '';
  uploadedPhotos.forEach((src, idx) => {
    html += `<div class="photo-preview-item"><img src="${src}" alt="Photo ${idx+1}"><button class="photo-remove-btn" onclick="removePhoto(${idx})" title="Remove">✕</button></div>`;
  });
  if(uploadedPhotos.length < 5) {
    html += `<div class="photo-preview-item add-more" onclick="document.getElementById('photoInput').click()" title="Add more photos">+</div>`;
  }
  grid.innerHTML = html;
  info.textContent = uploadedPhotos.length > 0
    ? `✅ ${uploadedPhotos.length}/5 photo${uploadedPhotos.length>1?'s':''} added — listings with photos get 3× more calls!`
    : '';
  const area = document.getElementById('photoDropArea');
  if(area) area.style.display = uploadedPhotos.length >= 5 ? 'none' : '';
}

function removePhoto(idx) {
  uploadedPhotos.splice(idx, 1);
  renderPhotoPreviews();
}

/* ═══════════════════════════════════════
   POST OVERLAY
═══════════════════════════════════════ */
function openPost() {
  document.getElementById('postOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
  goStep(1);
  uploadedPhotos = [];
  ['pTitle','pCents','pSqft','pAddr','pPrice','pPPS','pDesc','pFeats','pName','pPhone','pKey']
    .forEach(id => { const el=document.getElementById(id); if(el) el.value=''; });
  document.getElementById('pLoc').value = '';
  document.getElementById('pRole').value = 'owner';
  selectedType = 'residential';
  document.querySelectorAll('.type-chip').forEach(c => c.classList.toggle('selected', c.dataset.v==='residential'));
  renderPhotoPreviews();
}
function closePost() {
  document.getElementById('postOverlay').classList.remove('active');
  document.body.style.overflow = '';
}
function goStep(n) {
  [1,2,3].forEach(i => {
    document.getElementById('step'+i).style.display = i===n ? 'block' : 'none';
    document.getElementById('sb'+i).classList.toggle('active', i<=n);
    document.getElementById('sl'+i).classList.toggle('active', i<=n);
  });
}
function pickType(el) {
  document.querySelectorAll('.type-chip').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  selectedType = el.dataset.v;
}
function autoSqft() {
  const c = parseFloat(document.getElementById('pCents').value);
  if(!isNaN(c)) document.getElementById('pSqft').value = Math.round(c*435.6);
}
function autoPPS() {
  const price = parseFloat(document.getElementById('pPrice').value);
  const sqft  = parseFloat(document.getElementById('pSqft').value);
  if(!isNaN(price) && !isNaN(sqft) && sqft>0)
    document.getElementById('pPPS').value = Math.round(price/sqft);
}

/* ═══════════════════════════════════════
   SUBMIT POST → SUPABASE
═══════════════════════════════════════ */
async function submitPost() {
  const title = document.getElementById('pTitle').value.trim();
  const cents = document.getElementById('pCents').value.trim();
  const sqft  = document.getElementById('pSqft').value.trim();
  const loc   = document.getElementById('pLoc').value;
  const addr  = document.getElementById('pAddr').value.trim();
  const price = document.getElementById('pPrice').value.trim();
  const pps   = document.getElementById('pPPS').value.trim();
  const desc  = document.getElementById('pDesc').value.trim();
  const feats = document.getElementById('pFeats').value.trim();
  const name  = document.getElementById('pName').value.trim();
  const phone = document.getElementById('pPhone').value.trim();
  const role  = document.getElementById('pRole').value;
  const key   = document.getElementById('pKey').value.trim();

  if(!title||!cents||!loc||!price||!name||!phone||!key) {
    showPortalToast('⚠️ Please fill all required (*) fields including Secret Key.');
    return;
  }

  const featArr = feats ? feats.split(',').map(f=>f.trim()).filter(Boolean) : [selectedType];

  const { error } = await sb.from('listings').insert([{
    title, cents,
    sqft: sqft || String(Math.round(parseFloat(cents)*435.6)),
    type: selectedType,
    loc, addr,
    price: parseInt(price),
    pps: pps ? parseInt(pps) : 0,
    description: desc || 'Contact owner for more details.',
    feats: featArr,
    owner_name: name,
    phone, role, key,
    date: 'Just now',
    sold: false,
    photos: [...uploadedPhotos]
  }]);

  if(error) {
    console.error(error);
    showPortalToast('❌ Error posting listing. Try again.');
    return;
  }

  closePost();
  await renderAll();
  const photoMsg = uploadedPhotos.length > 0
    ? ` ${uploadedPhotos.length} photo${uploadedPhotos.length>1?'s':''} added.`
    : ' Add photos to get more enquiries!';
  showPortalToast('✅ Your listing is live!' + photoMsg);
  uploadedPhotos = [];
}

/* ═══════════════════════════════════════
   DRAG & DROP
═══════════════════════════════════════ */
(function setupDragDrop() {
  const area = document.getElementById('photoDropArea');
  if(!area) return;
  area.addEventListener('dragover', e => { e.preventDefault(); area.classList.add('drag-over'); });
  area.addEventListener('dragleave', () => area.classList.remove('drag-over'));
  area.addEventListener('drop', e => {
    e.preventDefault();
    area.classList.remove('drag-over');
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
    const remaining = 5 - uploadedPhotos.length;
    files.slice(0, remaining).forEach(file => {
      const reader = new FileReader();
      reader.onload = ev => { uploadedPhotos.push(ev.target.result); renderPhotoPreviews(); };
      reader.readAsDataURL(file);
    });
  });
})();
/* ═══════════════════════════════════════
   INIT
═══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', async () => {

  // Popup window flow: send session to parent, then close
  if (window.opener && !window.opener.closed) {
    sb.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        window.opener.postMessage(
          { type: 'SUPABASE_AUTH_SUCCESS', session },
          window.location.origin
        );
      }
      window.close();
    });
    return;
  }

  // ── ALWAYS sign out on page load — force fresh login every time ──
  await sb.auth.signOut();
  currentUser = null;

  // Auth listener — only for popup message flow
  sb.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_OUT') {
      currentUser = null;
      return;
    }
    // SIGNED_IN is only triggered by popup flow (setSession call)
    if (event === 'SIGNED_IN' && session?.user) {
      const u = session.user;
      currentUser = {
        displayName: u.user_metadata?.full_name || u.email || 'Anonymous',
        email:       u.email,
        photoURL:    u.user_metadata?.avatar_url || null
      };
    }
  });

  // Reviews
  renderUserReviews();

  // Mini confirm buttons
  const mcY = document.getElementById('mcYes');
  if (mcY) mcY.onclick = () => {
    document.getElementById('miniConfirm').style.display = 'none';
    if (mcCallback) { mcCallback(); mcCallback = null; }
  };

  const mcN = document.getElementById('mcNo');
  if (mcN) mcN.onclick = () => {
    document.getElementById('miniConfirm').style.display = 'none';
    mcCallback = null;
  };

  const kpo = document.getElementById('keyPromptOverlay');
  if (kpo) kpo.addEventListener('click', function(e) {
    if (e.target === this) closeKeyPrompt();
  });

  const po = document.getElementById('postOverlay');
  if (po) po.addEventListener('click', function(e) {
    if (e.target === this) closePost();
  });

});
