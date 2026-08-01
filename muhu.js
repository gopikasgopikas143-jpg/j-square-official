/* ═══════════════════════════════
   DATA
═══════════════════════════════ */
const CATS = ['All','Calculator','Buyer Tools','Agent Tools','AI Tools','Vastu & Culture'];

const TOOLS = [
  {id:'emi',icon:'📊',name:'EMI Calculator',cat:'Calculator',tag:'have',desc:'Monthly home loan EMI & schedule'},
  {id:'unit',icon:'📐',name:'Unit Converter',cat:'Calculator',tag:'have',desc:'Cent, Sq.ft, Acre, Ground converter'},
  {id:'stamp',icon:'📜',name:'Registration Fee',cat:'Calculator',tag:'have',desc:'Stamp duty & registration cost estimator'},
  {id:'construction',icon:'🏗️',name:'Construction Cost',cat:'Calculator',tag:'have',desc:'House building cost by quality grade'},
  {id:'roi',icon:'📈',name:'ROI Calculator',cat:'Calculator',tag:'have',desc:'Property investment return calculator'},
  {id:'value',icon:'💰',name:'Property Valuation',cat:'Calculator',tag:'have',desc:'Salem area market value estimator'},
  {id:'vastu',icon:'🧭',name:'Vastu Shastra',cat:'Vastu & Culture',tag:'have',desc:'Plot direction & Vastu score checker'},
  {id:'muhurtham',icon:'📅',name:'Muhurtham Finder',cat:'Vastu & Culture',tag:'have',desc:'Auspicious dates for registration'},
  {id:'leadqualifier',icon:'🎯',name:'Lead Qualifier',cat:'Agent Tools',tag:'have',desc:'Score & qualify potential buyers'},
  {id:'commission',icon:'💼',name:'Commission Calc',cat:'Agent Tools',tag:'have',desc:'Agent commission & co-broking splitter'},
  {id:'loaneligibility',icon:'🏦',name:'Loan Eligibility',cat:'Buyer Tools',tag:'have',desc:'Check home loan eligibility instantly'},
  {id:'rentmanager',icon:'🏘️',name:'Rental Manager',cat:'Calculator',tag:'have',desc:'Tenant & overdue rent tracker'},
  {id:'duediligence',icon:'✅',name:'Due Diligence',cat:'Buyer Tools',tag:'have',desc:'Property verification risk checker'},
  {id:'listingwriter',icon:'✍️',name:'AI Listing Writer',cat:'AI Tools',tag:'ai',desc:'Auto-generate property descriptions'},
  {id:'whatsapp',icon:'💬',name:'WhatsApp Message',cat:'AI Tools',tag:'ai',desc:'Ready-to-send broadcast messages'},
  {id:'socialmedia',icon:'📱',name:'Social Media Caption',cat:'AI Tools',tag:'ai',desc:'Instagram & Facebook post generator'},
  {id:'sitevisit',icon:'📅',name:'Site Visit Scheduler',cat:'Agent Tools',tag:'have',desc:'Book & confirm site visits'},
  {id:'markettrend',icon:'📊',name:'Market Trend',cat:'Calculator',tag:'have',desc:'Buy / Hold / Sell recommendation'},
  {id:'agentperformance',icon:'⭐',name:'Agent Score',cat:'Agent Tools',tag:'have',desc:'Track agent deals & performance'},
  {id:'doccheck',icon:'📋',name:'Doc Checklist',cat:'Buyer Tools',tag:'have',desc:'Required documents tracker'},
];
/* ═══════════════════════════════
   GRID RENDER
═══════════════════════════════ */
let currentCat = 'All';
let activeTool = null;

function renderCats(){
  document.getElementById('catBar').innerHTML = CATS.map(c =>
    `<button class="cat-pill${c===currentCat?' on':''}" onclick="setCat('${c}')">${c}</button>`
  ).join('');
}

function setCat(c){
  currentCat = c;
  renderCats();
  renderGrid();
  document.getElementById('toolContainer').innerHTML = '';
  activeTool = null;
}

function renderGrid(){
  const filtered = currentCat==='All' ? TOOLS : TOOLS.filter(t=>t.cat===currentCat);
  document.getElementById('toolGrid').innerHTML = filtered.map(t => `
    <div class="tcard ${t.tag==='have'?'have':''} ${activeTool===t.id?'active-card':''}" onclick="openTool('${t.id}')" id="card-${t.id}">
      <div class="tc-top">
        <span class="tc-icon">${t.icon}</span>
        <span class="tc-tag ${t.tag==='ai'?'ai':t.tag==='have'?'have':'new'}">${t.tag==='have'?'✓':'AI'}</span>
      </div>
      <div class="tc-name">${t.name}</div>
      <div class="tc-desc">${t.desc}</div>
    </div>
  `).join('');
}
function openTool(id){
  const t = TOOLS.find(x=>x.id===id);
  if(!t) return;
  activeTool = id;

  // null check போடு
  const catBar = document.getElementById('catBar');
  const toolGrid = document.getElementById('toolGrid');
  const toolsHero = document.querySelector('.tools-hero');

  if(catBar) catBar.style.display = 'none';
  if(toolGrid) toolGrid.style.display = 'none';
  if(toolsHero) toolsHero.style.display = 'none';

  const container = document.getElementById('toolContainer');
  if(!container) return;
  container.style.display = 'block';
  container.style.paddingTop = '100px';
  container.style.minHeight = '100vh';
  container.innerHTML = `
    <div class="tool-container fade-in">
      <div class="tc-panel-header">
        <div class="tc-ph-left">
          <span class="tc-ph-icon">${t.icon}</span>
          <div>
            <div class="tc-ph-title">${t.name}</div>
            <div class="tc-ph-sub">${t.cat} · ${t.tag==='ai'?'AI Powered':'Calculator Tool'}</div>
          </div>
        </div>
        <button class="tc-close" onclick="closeTool()">← Back to Tools</button>
      </div>
      <div class="tc-panel-body" id="panelBody"></div>
    </div>`;

  window.scrollTo({top:0, behavior:'smooth'});
  buildPanel(id);
}

function closeTool(){
  activeTool = null;

  const catBar = document.getElementById('catBar');
  const toolGrid = document.getElementById('toolGrid');
  const toolsHero = document.querySelector('.tools-hero');

  if(catBar) catBar.style.display = 'flex';
  if(toolGrid) toolGrid.style.display = 'grid';
  if(toolsHero) toolsHero.style.display = 'block';

  const container = document.getElementById('toolContainer');
  if(container){
    container.innerHTML = '';
    container.style.display = 'none';
    container.style.paddingTop = '';
    container.style.minHeight = '';
  }

  window.scrollTo({top:0, behavior:'smooth'});
  renderCats();
  renderGrid();
}
function upgradeSelects(container) {
  container.querySelectorAll('select').forEach(sel => {
    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    wrapper.style.width = '100%';

    const display = document.createElement('div');
    display.style.setProperty('width', '100%', 'important');
    display.style.setProperty('padding', '12px 40px 12px 16px', 'important');
    display.style.setProperty('border', '1.5px solid #d4c99a', 'important');
    display.style.setProperty('border-radius', '10px', 'important');
    display.style.setProperty('font-family', "'DM Sans',sans-serif", 'important');
    display.style.setProperty('font-size', '0.92rem', 'important');
    display.style.setProperty('background', '#ffffff', 'important');
    display.style.setProperty('color', '#1a1a2e', 'important');
    display.style.setProperty('cursor', 'pointer', 'important');
    display.style.setProperty('box-sizing', 'border-box', 'important');
    display.style.setProperty('position', 'relative', 'important');
    display.style.setProperty('transition', 'border-color 0.25s,box-shadow 0.25s', 'important');

    const arrow = document.createElement('span');
    arrow.innerHTML = '▾';
    arrow.style.setProperty('position', 'absolute', 'important');
    arrow.style.setProperty('right', '14px', 'important');
    arrow.style.setProperty('top', '50%', 'important');
    arrow.style.setProperty('transform', 'translateY(-50%)', 'important');
    arrow.style.setProperty('color', '#c9a84c', 'important');
    arrow.style.setProperty('pointer-events', 'none', 'important');
    arrow.style.setProperty('font-size', '1rem', 'important');

    const dropdown = document.createElement('div');
    dropdown.classList.add('custom-dd');
    dropdown.style.setProperty('display', 'none', 'important');
    dropdown.style.setProperty('position', 'absolute', 'important');
    dropdown.style.setProperty('top', 'calc(100% + 4px)', 'important');
    dropdown.style.setProperty('left', '0', 'important');
    dropdown.style.setProperty('right', '0', 'important');
    dropdown.style.setProperty('background', '#ffffff', 'important');
    dropdown.style.setProperty('color-scheme', 'light', 'important');
    dropdown.style.setProperty('isolation', 'isolate', 'important');
    dropdown.style.setProperty('border', '1.5px solid #c9a84c', 'important');
    dropdown.style.setProperty('border-radius', '10px', 'important');
    dropdown.style.setProperty('z-index', '999999', 'important');
    dropdown.style.setProperty('box-shadow', '0 8px 24px rgba(0,0,0,0.15)', 'important');
    dropdown.style.setProperty('max-height', '220px', 'important');
    dropdown.style.setProperty('overflow-y', 'auto', 'important');

    // Options render
    Array.from(sel.options).forEach((opt, i) => {
      const item = document.createElement('div');
      item.textContent = opt.text;
      const isSelected = i === sel.selectedIndex;

      item.style.setProperty('padding', '11px 16px', 'important');
      item.style.setProperty('cursor', 'pointer', 'important');
      item.style.setProperty('font-size', '0.9rem', 'important');
      item.style.setProperty('font-family', "'DM Sans',sans-serif", 'important');
      item.style.setProperty('background', isSelected ? '#fdf6e3' : '#ffffff', 'important');
      item.style.setProperty('color', isSelected ? '#c9a84c' : '#1a1a2e', 'important');
      item.style.setProperty('color-scheme', 'light', 'important');
      item.style.setProperty('font-weight', isSelected ? '700' : '400', 'important');
      item.style.setProperty('border-left', isSelected ? '3px solid #c9a84c' : '3px solid transparent', 'important');
      item.style.setProperty('transition', 'background 0.15s', 'important');

      item.onmouseenter = () => {
        item.style.setProperty('background', '#fdf6e3', 'important');
        item.style.setProperty('color', '#c9a84c', 'important');
      };
      item.onmouseleave = () => {
        const active = sel.selectedIndex === i;
        item.style.setProperty('background', active ? '#fdf6e3' : '#ffffff', 'important');
        item.style.setProperty('color', active ? '#c9a84c' : '#1a1a2e', 'important');
      };
      item.onclick = () => {
        sel.selectedIndex = i;
        sel.dispatchEvent(new Event('change', { bubbles: true }));
        display.textContent = opt.text;
        dropdown.style.setProperty('display', 'none', 'important');
        // Reset all items, highlight selected
        dropdown.querySelectorAll('div').forEach((d, j) => {
          d.style.setProperty('background', j === i ? '#fdf6e3' : '#ffffff', 'important');
          d.style.setProperty('color', j === i ? '#c9a84c' : '#1a1a2e', 'important');
          d.style.setProperty('font-weight', j === i ? '700' : '400', 'important');
          d.style.setProperty('border-left', j === i ? '3px solid #c9a84c' : '3px solid transparent', 'important');
        });
      };
      dropdown.appendChild(item);
    });

    display.textContent = sel.options[sel.selectedIndex]?.text || '';

    display.onclick = (e) => {
      e.stopPropagation();
      document.querySelectorAll('.custom-dd').forEach(d => {
        if (d !== dropdown) d.style.setProperty('display', 'none', 'important');
      });
      const isOpen = dropdown.style.display === 'none' || dropdown.style.display === '';
      dropdown.style.setProperty('display', isOpen ? 'block' : 'none', 'important');
      display.style.setProperty('border-color', isOpen ? '#c9a84c' : '#d4c99a', 'important');
      display.style.setProperty('box-shadow', isOpen ? '0 0 0 3px rgba(201,168,76,0.12)' : 'none', 'important');
    };

    sel.style.setProperty('display', 'none', 'important');
    wrapper.appendChild(display);
    wrapper.appendChild(arrow);
    wrapper.appendChild(dropdown);
    sel.parentNode.insertBefore(wrapper, sel);
    wrapper.appendChild(sel);
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.custom-dd').forEach(d => {
      d.style.setProperty('display', 'none', 'important');
    });
  });
}
/* ═══════════════════════════════
   PANEL BUILDER
═══════════════════════════════ */
function buildPanel(id){
  const b = document.getElementById('panelBody');
  const panels = {
    emi: buildEMI, unit: buildUnit, stamp: buildStamp,
    construction: buildConstruction, roi: buildROI, value: buildValue,
    vastu: buildVastu, muhurtham: buildMuhurtham,
    leadqualifier: buildLead, commission: buildCommission,
    loaneligibility: buildLoan, rentmanager: buildRent,
    duediligence: buildDueDiligence, listingwriter: buildListing,
    whatsapp: buildWhatsApp, socialmedia: buildSocial,
    sitevisit: buildSiteVisit, markettrend: buildMarket,
    agentperformance: buildAgent, doccheck: buildDocCheck
  };
  if(panels[id]) panels[id](b);
    setTimeout(() => upgradeSelects(b), 50);
}

/* ─── HELPERS ─── */
function fmt(n){
  if(n>=10000000) return '₹'+(n/10000000).toFixed(2)+' Cr';
  if(n>=100000) return '₹'+(n/100000).toFixed(2)+' L';
  return '₹'+Math.round(n).toLocaleString('en-IN');
}
function pct(n){return n.toFixed(2)+'%'}
function row(id,label){return `<div class="result-item"><div class="result-val" id="${id}">—</div><div class="result-label">${label}</div></div>`}
function hrow(id,label){return `<div class="result-item highlight-result"><div class="result-val" id="${id}">—</div><div class="result-label">${label}</div></div>`}
function resultBox(inner){
  return `<div class="result-box" style="display:block"><div class="result-grid">${inner}</div></div>`
}
/* ─── 1. EMI ─── */
/* ─── 1. EMI ─── */
function buildEMI(b){
  b.innerHTML = `
    <p style="color:var(--text3);font-size:13px;margin-bottom:20px">Calculate monthly installments for your home loan</p>
    <div class="form-row">
      <div class="form-group"><label>Loan Amount (₹)</label><input type="number" id="emi-amount" value="2500000"></div>
      <div class="form-group"><label>Interest Rate (%)</label><input type="number" id="emi-rate" value="8.5" step="0.1"></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Loan Term (Months)</label><input type="number" id="emi-months" value="240" placeholder="e.g. 240 = 20 yrs"></div>
      <div class="form-group"><label>Pre Payment (₹)</label><input type="number" id="emi-down" value="500000"></div>
    </div>
    <div class="form-group">
      <label>Months Already Completed (எத்தனை மாதம் ஆச்சு?)</label>
      <input type="number" id="emi-completed" value="0" min="0" placeholder="0">
    </div>
    <button class="calc-btn" onclick="calcEMI()">📊 Calculate EMI →</button>

    ${resultBox(
      hrow('emi-monthly','மாதாந்திர EMI') +
      row('emi-total','மொத்த தொகை') +
      row('emi-interest','மொத்த வட்டி') +
      row('emi-principal','நிகர கடன்') +
      row('emi-remaining','Remaining Balance (now)') +
      row('emi-months-left','இன்னும் எத்தனை மாதம்?')
    )}

    <div style="margin-top:24px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:20px;display:none" id="emi-chart-wrap">
      <div style="font-size:13px;font-weight:600;color:var(--gold);margin-bottom:8px">📉 Loan Balance Over Time</div>
      <div style="display:flex;gap:16px;flex-wrap:wrap;font-size:11px;color:var(--text3);margin-bottom:12px">
        <span style="display:flex;align-items:center;gap:5px"><span style="width:20px;height:2.5px;background:#c9a84c;display:inline-block;border-radius:2px"></span>Remaining Balance</span>
        <span style="display:flex;align-items:center;gap:5px"><span style="width:10px;height:10px;border-radius:50%;background:#4eca80;display:inline-block"></span>You are here</span>
      </div>
      <div style="position:relative;width:100%;height:260px">
        <canvas id="emiChart" role="img" aria-label="EMI amortization chart showing loan balance over months">Loan balance reduces over time with each EMI payment.</canvas>
      </div>
      <div style="margin-top:10px;padding:8px 12px;background:rgba(255,255,255,0.04);border-radius:8px;font-size:11.5px;color:var(--text3)" id="emi-tip">
        💡 Hover over chart to see month-wise principal paid & interest paid breakdown
      </div>
    </div>`;
}

function calcEMI(){
  const A      = +document.getElementById('emi-amount').value    || 0;
  const down   = +document.getElementById('emi-down').value      || 0;
  const P      = Math.max(0, A - down);
  const r      = (+document.getElementById('emi-rate').value     || 0) / 12 / 100;
  const n      = Math.round(+document.getElementById('emi-months').value || 0);
  const done   = Math.round(+document.getElementById('emi-completed').value || 0);

  if(!P || !r || !n) return;

  const emi      = P * r * Math.pow(1+r, n) / (Math.pow(1+r, n) - 1);
  const total    = emi * n;
  const interest = total - P;
  const mLeft    = n - done;

  // Remaining balance after `done` months
  const remBal = done > 0
    ? P * Math.pow(1+r, done) - emi * (Math.pow(1+r, done) - 1) / r
    : P;

  document.getElementById('emi-monthly').textContent   = fmt(emi);
  document.getElementById('emi-total').textContent     = fmt(total);
  document.getElementById('emi-interest').textContent  = fmt(interest);
  document.getElementById('emi-principal').textContent = fmt(P);
  document.getElementById('emi-remaining').textContent = done > 0 ? (remBal > 0 ? fmt(remBal) : '✅ Loan Closed!') : '—';
  document.getElementById('emi-months-left').textContent = mLeft > 0 ? mLeft + ' months' : '✅ Completed';

  document.querySelector('.result-box').style.display = 'block';

  // ── Build amortization data month by month ──
  const labels = [], balData = [], principalPaid = [], interestPaid = [];
  let bal = P, totPrin = 0, totInt = 0;
  for(let m = 0; m <= n; m++){
    if(m === 0){
      labels.push('Start');
      balData.push(Math.round(P));
      principalPaid.push(0);
      interestPaid.push(0);
    } else {
      const intPart  = bal * r;
      const prinPart = emi - intPart;
      bal = Math.max(0, bal - prinPart);
      totPrin += prinPart;
      totInt  += intPart;
      labels.push('M' + m);
      balData.push(Math.round(bal));
      principalPaid.push(Math.round(totPrin));
      interestPaid.push(Math.round(totInt));
    }
  }

  // "You are here" point styling
  const pointRadii = labels.map((_, i) => i === done ? 9 : 0);
  const pointBGs   = labels.map((_, i) => i === done ? '#4eca80' : 'transparent');

  // ── Render chart ──
  const chartWrap = document.getElementById('emi-chart-wrap');
  chartWrap.style.display = 'block';

  if(window._emiChartInst) window._emiChartInst.destroy();
  const ctx = document.getElementById('emiChart').getContext('2d');
  window._emiChartInst = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Remaining Balance',
        data: balData,
        borderColor: '#c9a84c',
        backgroundColor: 'rgba(201,168,76,0.07)',
        borderWidth: 2,
        fill: true,
        tension: 0.3,
        pointRadius: pointRadii,
        pointBackgroundColor: pointBGs,
        pointBorderColor: pointBGs,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#c9a84c'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(15,15,25,0.94)',
          titleColor: '#eee',
          bodyColor: '#bbb',
          borderColor: 'rgba(201,168,76,0.35)',
          borderWidth: 1,
          padding: 10,
          callbacks: {
            title: items => {
              const i = items[0].dataIndex;
              if(i === 0) return 'Start (Month 0)';
              return 'Month ' + i + (i === done && done > 0 ? '  ← You are here' : '');
            },
            label: items => {
              const i = items.dataIndex;
              const yrs = Math.floor(i / 12);
              const mos = i % 12;
              return [
                'Balance remaining: ' + fmt(balData[i]),
                'Total principal paid: ' + fmt(principalPaid[i]),
                'Total interest paid:  ' + fmt(interestPaid[i]),
                'Time elapsed: ' + (yrs > 0 ? yrs + 'yr ' : '') + mos + 'mo'
              ];
            }
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#666',
            font: { size: 10 },
            maxRotation: 0,
            autoSkip: false,
            callback: (val, i) => {
              if(i === 0) return 'Start';
              if(i === done && done > 0) return '📍';
              const step = Math.max(1, Math.floor(n / 10));
              if(i % step === 0) return 'M' + i;
              return '';
            }
          },
          grid: { color: 'rgba(255,255,255,0.04)' }
        },
        y: {
          ticks: {
            color: '#666',
            font: { size: 10 },
            callback: v => {
              if(v >= 10000000) return '₹' + (v/10000000).toFixed(1) + 'Cr';
              if(v >= 100000)   return '₹' + (v/100000).toFixed(0) + 'L';
              if(v >= 1000)     return '₹' + (v/1000).toFixed(0) + 'K';
              return '₹' + v;
            }
          },
          grid: { color: 'rgba(255,255,255,0.04)' }
        }
      }
    }
  });
}
/* ─── 2. UNIT ─── */
const UC_FACTORS = {
  sqft:   1,
  sqm:    10.7639,
  sqyard: 9,
  cent:   435.6,
  acre:   43560,
  ground: 2400,
  gunta:  1089,
  hectare:107639
};

const UC_LABELS = {
  sqft:   'Square Feet',
  sqm:    'Square Meter',
  sqyard: 'Square Yard',
  cent:   'Cent',
  acre:   'Acre',
  ground: 'Ground',
  gunta:  'Gunta',
  hectare:'Hectare'
};
const UC_STATE_GUIDE = [
  { state:'Tamil Nadu', units:'Cent, Ground, Sq.ft', note:'Avg 1 Cent Price: ₹3L–₹15L (varies by city and locality)' },
  { state:'Chennai', units:'Ground, Square Feet, Cent', note:'Avg 1 Cent Price: ₹8L–₹50L depending on area (OMR, Anna Nagar, Velachery)' },
  { state:'Coimbatore', units:'Cent, Acre, Square Feet', note:'Avg 1 Cent Price: ₹3L–₹20L in prime areas like Saravanampatti and Peelamedu' },
  { state:'Madurai', units:'Cent, Ground, Acre', note:'Avg 1 Cent Price: ₹2L–₹10L in areas such as KK Nagar and Mattuthavani' },
  { state:'Tiruchirappalli (Trichy)', units:'Cent, Square Feet, Acre', note:'Avg 1 Cent Price: ₹2.5L–₹12L in Thillai Nagar and KK Nagar' },
  { state:'Salem', units:'Cent, Acre, Hectare', note:'Avg 1 Cent Price: ₹1.5L–₹8L in Hasthampatti and Fairlands' },
  { state:'Erode', units:'Cent, Acre, Gunta', note:'Avg 1 Cent Price: ₹1L–₹6L in urban and suburban localities' },
  { state:'Tiruppur', units:'Cent, Square Feet, Acre', note:'Avg 1 Cent Price: ₹2L–₹9L in Avinashi Road and surrounding areas' },
  { state:'Thanjavur', units:'Acre, Cent, Hectare', note:'Avg 1 Cent Price: ₹1L–₹5L; agricultural regions may be lower' },
  { state:'Vellore', units:'Cent, Ground, Acre', note:'Avg 1 Cent Price: ₹1.5L–₹7L in Katpadi and Sathuvachari' },
  { state:'Tirunelveli', units:'Cent, Acre, Hectare', note:'Avg 1 Cent Price: ₹1L–₹6L in Palayamkottai and nearby areas' },
  { state:'Dindigul', units:'Cent, Acre, Square Feet', note:'Avg 1 Cent Price: ₹1L–₹4L in urban areas' },
  { state:'Karur', units:'Cent, Acre, Ground', note:'Avg 1 Cent Price: ₹1L–₹5L in key residential zones' },
  { state:'Namakkal', units:'Cent, Acre, Hectare', note:'Avg 1 Cent Price: ₹1L–₹4L in town and nearby regions' },
  { state:'Thoothukudi (Tuticorin)', units:'Cent, Square Feet, Acre', note:'Avg 1 Cent Price: ₹1.5L–₹7L in coastal and urban areas' },
  { state:'Kanchipuram', units:'Ground, Cent, Square Feet', note:'Avg 1 Cent Price: ₹3L–₹18L near Chennai growth corridors' },
  { state:'Cuddalore', units:'Cent, Acre, Hectare', note:'Avg 1 Cent Price: ₹1L–₹4L depending on locality' },
  { state:'Nagapattinam', units:'Cent, Acre, Hectare', note:'Avg 1 Cent Price: ₹0.8L–₹3L in residential and agricultural areas' },
  { state:'Dharmapuri', units:'Cent, Acre, Ground', note:'Avg 1 Cent Price: ₹0.8L–₹3.5L in developing areas' },
  { state:'Krishnagiri', units:'Cent, Acre, Hectare', note:'Avg 1 Cent Price: ₹1L–₹6L near Hosur and industrial belts' },
  { state:'Hosur', units:'Cent, Square Feet, Acre', note:'Avg 1 Cent Price: ₹5L–₹25L in fast-growing industrial and residential zones' },
  { state:'Villupuram', units:'Cent, Acre, Hectare', note:'Avg 1 Cent Price: ₹1L–₹4L in town and suburban areas' },
  { state:'Kanyakumari', units:'Cent, Ground, Square Feet', note:'Avg 1 Cent Price: ₹2L–₹12L in Nagercoil and tourist areas' },
  { state:'Sivagangai', units:'Cent, Acre, Hectare', note:'Avg 1 Cent Price: ₹0.8L–₹3L in urban and agricultural zones' },
  { state:'Ramanathapuram', units:'Cent, Acre, Square Feet', note:'Avg 1 Cent Price: ₹0.8L–₹4L depending on locality' }
];
/* ── State vars ── */
let ucFromUnit  = 'cent';
let ucToUnit    = 'sqft';
let ucPrecision = 4;
let ucDarkMode  = false;
let ucChart     = null;
let ucLastConverted = '';
let ucMostUsed  = {};

/* ══════════════════════════════════════════
   BUILD UNIT CONVERTER PANEL
══════════════════════════════════════════ */
function buildUnit(b) {
  b.innerHTML = `
  <!-- HEADER -->
  <div id="uc-wrap" style="font-family:'DM Sans',sans-serif;transition:all 0.3s">

    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:24px">
      <div>
        <div style="font-size:11px;letter-spacing:.08em;color:#c9a84c;text-transform:uppercase;font-weight:600;margin-bottom:4px">Calculator Tool</div>
        <div style="font-size:1.25rem;font-weight:700;color:var(--dark,#1a1a2e)">🏡 Indian Land Unit Converter Pro</div>
      </div>
    </div>

    <!-- POPULAR QUICK ACCESS -->
    <div style="margin-bottom:20px">
      <div style="font-size:11px;font-weight:600;letter-spacing:.06em;color:#888;text-transform:uppercase;margin-bottom:8px">⚡ Quick Select From Unit</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        ${['sqft','cent','acre','ground'].map(u=>`
          <button onclick="ucSetFrom('${u}')" id="uc-quick-${u}" style="
            padding:7px 16px;border-radius:20px;border:1.5px solid #c9a84c;
            background:${u===ucFromUnit?'#c9a84c':'transparent'};
            color:${u===ucFromUnit?'#1a1a2e':'#c9a84c'};
            font-size:12px;cursor:pointer;font-weight:600;
            font-family:'DM Sans',sans-serif;transition:all .2s
          ">${UC_LABELS[u]}</button>
        `).join('')}
      </div>
    </div>

    <!-- CONVERTER SECTION -->
    <div style="background:#fff;border:1.5px solid #e8dfc8;border-radius:14px;padding:20px;margin-bottom:20px;box-shadow:0 2px 12px rgba(0,0,0,0.06)">

      <!-- Value Input -->
      <div style="margin-bottom:16px">
        <label style="font-size:11px;font-weight:600;letter-spacing:.06em;color:#888;text-transform:uppercase;display:block;margin-bottom:6px">Value</label>
        <input type="number" id="uc-value" value="1" min="0"
          oninput="ucConvert()" onkeydown="if(event.key==='-')event.preventDefault()"
          style="width:100%;padding:13px 16px;border:1.5px solid #d4c99a;border-radius:10px;
                 font-size:1.1rem;font-weight:600;color:#1a1a2e;outline:none;
                 font-family:'DM Sans',sans-serif;box-sizing:border-box;transition:border .2s"
          placeholder="Enter value...">
        <div id="uc-val-warn" style="display:none;color:#e05c5c;font-size:12px;margin-top:4px">⚠️ Please enter a valid positive number</div>
      </div>

      <!-- From / Swap / To -->
      <div style="display:grid;grid-template-columns:1fr auto 1fr;gap:10px;align-items:end;margin-bottom:16px">

        <!-- FROM -->
        <div>
          <label style="font-size:11px;font-weight:600;letter-spacing:.06em;color:#888;text-transform:uppercase;display:block;margin-bottom:6px">From Unit</label>
          <div style="position:relative">
            <input type="text" id="uc-from-search" placeholder="Search unit…"
              oninput="ucFilterDropdown('from')" onfocus="ucShowDropdown('from')"
              style="width:100%;padding:11px 16px;border:1.5px solid #d4c99a;border-radius:10px;
                     font-size:0.9rem;color:#1a1a2e;outline:none;font-family:'DM Sans',sans-serif;
                     box-sizing:border-box;cursor:pointer"
              readonly onclick="this.removeAttribute('readonly');ucShowDropdown('from')">
            <div id="uc-from-dd" style="
              display:none;position:absolute;top:calc(100% + 4px);left:0;right:0;
              background:#fff;border:1.5px solid #c9a84c;border-radius:10px;
              z-index:999;box-shadow:0 8px 24px rgba(0,0,0,0.12);max-height:200px;overflow-y:auto
            "></div>
          </div>
        </div>

        <!-- SWAP -->
        <button onclick="ucSwap()" style="
          width:42px;height:42px;border-radius:50%;border:1.5px solid #c9a84c;
          background:#fff8e8;color:#c9a84c;font-size:1.1rem;cursor:pointer;
          display:flex;align-items:center;justify-content:center;
          transition:all .2s;margin-bottom:2px
        " title="Swap Units">⇄</button>

        <!-- TO -->
        <div>
          <label style="font-size:11px;font-weight:600;letter-spacing:.06em;color:#888;text-transform:uppercase;display:block;margin-bottom:6px">To Unit</label>
          <div style="position:relative">
            <input type="text" id="uc-to-search" placeholder="Search unit…"
              oninput="ucFilterDropdown('to')" onfocus="ucShowDropdown('to')"
              style="width:100%;padding:11px 16px;border:1.5px solid #d4c99a;border-radius:10px;
                     font-size:0.9rem;color:#1a1a2e;outline:none;font-family:'DM Sans',sans-serif;
                     box-sizing:border-box;cursor:pointer"
              readonly onclick="this.removeAttribute('readonly');ucShowDropdown('to')">
            <div id="uc-to-dd" style="
              display:none;position:absolute;top:calc(100% + 4px);left:0;right:0;
              background:#fff;border:1.5px solid #c9a84c;border-radius:10px;
              z-index:999;box-shadow:0 8px 24px rgba(0,0,0,0.12);max-height:200px;overflow-y:auto
            "></div>
          </div>
        </div>
      </div>

      <!-- Precision -->
      <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
        <span style="font-size:11px;font-weight:600;letter-spacing:.06em;color:#888;text-transform:uppercase">Decimal Places:</span>
        ${[2,4,6].map(p=>`
          <button onclick="ucSetPrecision(${p})" id="uc-prec-${p}" style="
            padding:5px 14px;border-radius:16px;border:1.5px solid ${p===ucPrecision?'#c9a84c':'#ddd'};
            background:${p===ucPrecision?'#c9a84c':'transparent'};
            color:${p===ucPrecision?'#1a1a2e':'#888'};
            font-size:12px;cursor:pointer;font-weight:600;
            font-family:'DM Sans',sans-serif;transition:all .2s
          ">${p}</button>
        `).join('')}
      </div>
    </div>

    <!-- RESULT SECTION -->
    <div id="uc-result-box" style="
      background:linear-gradient(135deg,#1C1A14 0%,#2a2218 100%);
      border-radius:14px;padding:24px;margin-bottom:20px;
      display:none;transition:all .3s;position:relative
    ">
      <div style="font-size:11px;letter-spacing:.08em;color:#c9a84c;text-transform:uppercase;font-weight:600;margin-bottom:8px">Result</div>
      <div id="uc-result-val" style="font-size:2rem;font-weight:700;color:#fff;margin-bottom:4px;transition:all .2s">—</div>
      <div id="uc-result-label" style="font-size:13px;color:rgba(255,255,255,0.5)"></div>
      <button onclick="ucCopyResult()" style="
        position:absolute;top:16px;right:16px;
        padding:8px 16px;border-radius:20px;
        border:1.5px solid rgba(201,168,76,0.4);
        background:rgba(201,168,76,0.1);color:#c9a84c;
        font-size:12px;cursor:pointer;font-weight:600;
        font-family:'DM Sans',sans-serif;transition:all .2s
      " id="uc-copy-btn">📋 Copy</button>
    </div>

    <!-- CHART SECTION -->
  <div style="background:#fff;border:1.5px solid #e8dfc8;border-radius:14px;padding:20px;margin-bottom:20px;box-shadow:0 2px 12px rgba(0,0,0,0.06)">
     <div style="font-size:13px;font-weight:700;color:#1a1a2e;margin-bottom:16px">📊 Visual Comparison (All Units)</div>
     <div id="ucChartCustom"></div>
  </div>

    <!-- LAND PRICE CALCULATOR section-ல இதை மாத்து -->
<div style="background:#fff;border:1.5px solid #e8dfc8;border-radius:14px;padding:20px;margin-bottom:20px;box-shadow:0 2px 12px rgba(0,0,0,0.06)">
  <div style="font-size:13px;font-weight:700;color:#1a1a2e;margin-bottom:4px">💰 Land Price Calculator</div>
  
  <!-- Converter value show பண்ணு -->
   <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:12px">
  <div>
    <label style="font-size:11px;font-weight:600;letter-spacing:.06em;color:#888;text-transform:uppercase;display:block;margin-bottom:6px">Area Value</label>
    <input type="number" id="uc-area-val" placeholder="e.g. 10"
      oninput="ucCalcPrice()"
      style="width:100%;padding:11px 14px;border:1.5px solid #d4c99a;border-radius:10px;
             font-size:0.9rem;color:#1a1a2e;outline:none;font-family:'DM Sans',sans-serif;box-sizing:border-box">
  </div>
  <div>
    <label style="font-size:11px;font-weight:600;letter-spacing:.06em;color:#888;text-transform:uppercase;display:block;margin-bottom:6px">Area Unit</label>
    <select id="uc-area-unit" onchange="ucCalcPrice()"
      style="width:100%;padding:11px 14px;border:1.5px solid #d4c99a;border-radius:10px;
             font-size:0.9rem;color:#1a1a2e;outline:none;font-family:'DM Sans',sans-serif;background:#fff;box-sizing:border-box">
      ${Object.entries(UC_LABELS).map(([k,v])=>`<option value="${k}">${v}</option>`).join('')}
    </select>
  </div>
  <div>
    <label style="font-size:11px;font-weight:600;letter-spacing:.06em;color:#888;text-transform:uppercase;display:block;margin-bottom:6px">Price per Unit (₹)</label>
    <input type="number" id="uc-price-per" placeholder="e.g. 500000"
      oninput="ucCalcPrice()"
      style="width:100%;padding:11px 14px;border:1.5px solid #d4c99a;border-radius:10px;
             font-size:0.9rem;color:#1a1a2e;outline:none;font-family:'DM Sans',sans-serif;box-sizing:border-box">
  </div>
</div>
    
  
  </div>

  <div id="uc-price-result" style="display:none;background:linear-gradient(135deg,#1C1A14,#2a2218);border-radius:10px;padding:16px">
    <div style="font-size:11px;color:#c9a84c;font-weight:600;text-transform:uppercase;letter-spacing:.06em;margin-bottom:4px">Total Land Value</div>
    <div id="uc-price-val" style="font-size:1.6rem;font-weight:700;color:#fff"></div>
    <div id="uc-price-formula" style="font-size:12px;color:rgba(255,255,255,0.5);margin-top:4px"></div>
  </div>
</div>

    <!-- DASHBOARD -->
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:20px" id="uc-dashboard">
      <div style="background:#fff;border:1.5px solid #e8dfc8;border-radius:12px;padding:16px;text-align:center;box-shadow:0 2px 8px rgba(0,0,0,0.04)">
        <div style="font-size:1.3rem;margin-bottom:4px">📐</div>
        <div style="font-size:11px;color:#888;font-weight:600;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px">Converted Area</div>
        <div id="uc-dash-area" style="font-size:0.9rem;font-weight:700;color:#1a1a2e">—</div>
      </div>
      <div style="background:#fff;border:1.5px solid #e8dfc8;border-radius:12px;padding:16px;text-align:center;box-shadow:0 2px 8px rgba(0,0,0,0.04)">
        <div style="font-size:1.3rem;margin-bottom:4px">💰</div>
        <div style="font-size:11px;color:#888;font-weight:600;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px">Price Estimate</div>
        <div id="uc-dash-price" style="font-size:0.9rem;font-weight:700;color:#1a1a2e">Enter price →</div>
      </div>
      <div style="background:#fff;border:1.5px solid #e8dfc8;border-radius:12px;padding:16px;text-align:center;box-shadow:0 2px 8px rgba(0,0,0,0.04)">
        <div style="font-size:1.3rem;margin-bottom:4px">🏆</div>
        <div style="font-size:11px;color:#888;font-weight:600;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px">Most Used Unit</div>
        <div id="uc-dash-most" style="font-size:0.9rem;font-weight:700;color:#c9a84c">—</div>
      </div>
    </div>

    <!-- STATE GUIDE -->
    <div style="background:#fff;border:1.5px solid #e8dfc8;border-radius:14px;padding:20px;box-shadow:0 2px 12px rgba(0,0,0,0.06)">
      <div style="font-size:13px;font-weight:700;color:#1a1a2e;margin-bottom:16px">🗺️ Tamil Nadu Unit Guide</div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:10px">
        ${UC_STATE_GUIDE.map(s=>`
          <div style="border:1px solid #e8dfc8;border-radius:10px;padding:12px;background:#F5F0E8">
            <div style="font-weight:700;font-size:13px;color:#1a1a2e;margin-bottom:4px">📍 ${s.state}</div>
            <div style="font-size:12px;color:#c9a84c;font-weight:600;margin-bottom:4px">${s.units}</div>
            <div style="font-size:11px;color:#888;line-height:1.5">${s.note}</div>
          </div>
        `).join('')}
      </div>
    </div>

  </div><!-- /uc-wrap -->
  `;

  /* Init dropdowns & convert */
  ucInitDropdown('from');
  ucInitDropdown('to');
  ucConvert();
  ucRenderChart();

  /* Close dropdowns on outside click */
  document.addEventListener('click', ucCloseAllDropdowns);
}

/* ══════════════════════════════════════════
   DROPDOWN LOGIC
══════════════════════════════════════════ */
function ucShowDropdown(side) {
  // முதல்ல எல்லாத்தையும் close பண்ணு
  ['from','to'].forEach(s => {
    if(s !== side) {
      const dd = document.getElementById(`uc-${s}-dd`);
      if(dd) dd.style.display = 'none';
    }
  });
  
  const ddEl = document.getElementById(`uc-${side}-dd`);
  const searchEl = document.getElementById(`uc-${side}-search`);
  if(ddEl) ddEl.style.display = 'block';
  if(searchEl) { 
    searchEl.removeAttribute('readonly'); 
    searchEl.value = '';  // clear பண்ணு — type பண்ண ready
    searchEl.focus();
    ucBuildDropdownItems(side, '');
  }
}

function ucSelectUnit(side, key) {
  if(side==='from') ucFromUnit = key;
  else ucToUnit = key;
  
  // Dropdown உடனே close பண்ணு
  const ddEl = document.getElementById(`uc-${side}-dd`);
  const searchEl = document.getElementById(`uc-${side}-search`);
  if(ddEl) ddEl.style.display = 'none';
  if(searchEl) { 
    searchEl.setAttribute('readonly','');
    searchEl.value = UC_LABELS[key] || '';
  }
  
  ucUpdateQuickBtns();
  ucConvert();
  ucRenderChart();
  
  // track most used
  ucMostUsed[key] = (ucMostUsed[key]||0) + 1;
  ucUpdateDashMost();
}

function ucCloseAllDropdowns(e) {
  ['from','to'].forEach(side => {
    const dd = document.getElementById(`uc-${side}-dd`);
    const inp = document.getElementById(`uc-${side}-search`);
    const wrapper = inp?.closest('div[style*="position:relative"]');
    
    // Click dropdown-க்கு வெளியே போனா மட்டும் close பண்ணு
    if(dd && dd.style.display === 'block') {
      if(!dd.contains(e.target) && e.target !== inp) {
        dd.style.display = 'none';
        if(inp) { 
          inp.setAttribute('readonly','');
          const key = side==='from' ? ucFromUnit : ucToUnit;
          inp.value = UC_LABELS[key] || '';
        }
      }
    }
  });
}

function ucFilterDropdown(side) {
  const searchEl = document.getElementById(`uc-${side}-search`);
  if(!searchEl) return;
  const filter = searchEl.value;
  ucBuildDropdownItems(side, filter);
  const ddEl = document.getElementById(`uc-${side}-dd`);
  if(ddEl) ddEl.style.display = 'block';
}

function ucBuildDropdownItems(side, filter='') {
  const ddEl = document.getElementById(`uc-${side}-dd`);
  if(!ddEl) return;
  const current = side==='from' ? ucFromUnit : ucToUnit;
  const items = Object.entries(UC_LABELS)
    .filter(([k,v]) => 
      filter === '' || 
      v.toLowerCase().includes(filter.toLowerCase()) || 
      k.toLowerCase().includes(filter.toLowerCase())
    );
  
  ddEl.innerHTML = items.length ? items.map(([k,v]) => `
    <div 
      onmousedown="event.preventDefault();ucSelectUnit('${side}','${k}')"
      style="
        padding:11px 16px;cursor:pointer;font-size:0.88rem;
        color:${k===current?'#c9a84c':'#1a1a2e'};
        font-weight:${k===current?'700':'400'};
        background:${k===current?'#fdf6e3':'transparent'};
        border-left:${k===current?'3px solid #c9a84c':'3px solid transparent'};
        transition:background .12s
      " 
      onmouseenter="this.style.background='#fdf6e3'"
      onmouseleave="this.style.background='${k===current?'#fdf6e3':'transparent'}'">
      ${v}
    </div>
  `).join('') : '<div style="padding:10px 16px;color:#888;font-size:13px">No results</div>';
}


/* ══════════════════════════════════════════
   CONVERSION LOGIC
══════════════════════════════════════════ */
function ucConvert() {
  const valEl = document.getElementById('uc-value');
  const warnEl = document.getElementById('uc-val-warn');
  const resultBox = document.getElementById('uc-result-box');
  const resultVal = document.getElementById('uc-result-val');
  const resultLabel = document.getElementById('uc-result-label');
  if(!valEl) return;

  const raw = parseFloat(valEl.value);

  /* Validation */
  if(isNaN(raw) || raw < 0 || valEl.value === '') {
    if(warnEl) warnEl.style.display = 'block';
    if(resultBox) resultBox.style.display = 'none';
    return;
  }
  if(warnEl) warnEl.style.display = 'none';

  const sqft = raw * UC_FACTORS[ucFromUnit];
  const converted = sqft / UC_FACTORS[ucToUnit];
  const result = converted.toFixed(ucPrecision);
  ucLastConverted = result;

  if(resultBox) resultBox.style.display = 'block';
  if(resultVal) {
    resultVal.style.opacity = '0';
    setTimeout(() => {
      resultVal.textContent = Number(result).toLocaleString('en-IN');
      resultVal.style.opacity = '1';
    }, 100);
  }
  if(resultLabel) resultLabel.textContent = `${raw.toLocaleString('en-IN')} ${UC_LABELS[ucFromUnit]} = ${Number(result).toLocaleString('en-IN')} ${UC_LABELS[ucToUnit]}`;

  resultVal.style.transition = 'opacity 0.15s';

  ucRenderChart(raw);
  ucUpdateDashArea(result);
  // ucConvert()-ல கடைசில add பண்ணு
const usingVal = document.getElementById('uc-using-val');
if(usingVal) {
  const val = parseFloat(document.getElementById('uc-value')?.value) || 0;
  usingVal.textContent = `${val} ${UC_LABELS[ucFromUnit]}`;
}
ucCalcPrice();
}

/* ══════════════════════════════════════════
   CHART
══════════════════════════════════════════ */
function ucRenderChart() {
  const chartDiv = document.getElementById('ucChartCustom');
  if (!chartDiv) return;

  const val = parseFloat(document.getElementById('uc-value')?.value) || 1;
  const sqft = val * UC_FACTORS[ucFromUnit];

  const allUnits = ['sqft','cent','acre','ground','sqm','sqyard','gunta','hectare'];

  const entries = allUnits.map(k => ({
    key: k,
    label: UC_LABELS[k],
    value: sqft / UC_FACTORS[k]
  }));

  const logValues = entries.map(e => Math.log10(Math.max(e.value, 0.000001)));
  const minLog = Math.min(...logValues);
  const maxLog = Math.max(...logValues);
  const range = maxLog - minLog || 1;

  chartDiv.innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
      ${entries.map(e => {
        const logV = Math.log10(Math.max(e.value, 0.000001));
        const barPct = Math.max(6, ((logV - minLog) / range) * 100);
        const isFrom = e.key === ucFromUnit;
        const isTo = e.key === ucToUnit;
        const isSelected = isFrom || isTo;

        let displayVal;
        if(e.value >= 1000) displayVal = e.value.toFixed(2);
        else if(e.value >= 1) displayVal = e.value.toFixed(4);
        else if(e.value >= 0.0001) displayVal = e.value.toFixed(6);
        else displayVal = e.value.toExponential(2);

        return `
          <div style="
            background:${isSelected?'rgba(201,168,76,0.1)':'#faf8f3'};
            border:1.5px solid ${isFrom?'#c9a84c':isTo?'#e8b84b':'#e8dfc8'};
            border-radius:10px;padding:10px 12px;
          ">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
              <span style="font-size:11px;font-weight:600;color:${isSelected?'#c9a84c':'#888'}">
                ${isFrom?'🔵 ':isTo?'🟡 ':''}${e.label}
              </span>
              <span style="font-size:12px;font-weight:700;color:${isSelected?'#c9a84c':'#333'}">
                ${displayVal}
              </span>
            </div>
            <div style="height:5px;background:#f0e8d0;border-radius:3px;overflow:hidden;">
              <div style="
                height:100%;width:${barPct}%;
                background:${isFrom
                  ?'linear-gradient(90deg,#c9a84c,#e8c55a)'
                  :isTo
                  ?'linear-gradient(90deg,#e8b84b,#f5d77a)'
                  :'rgba(201,168,76,0.3)'};
                border-radius:3px;
              "></div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}
/* ══════════════════════════════════════════
   LAND PRICE CALC
══════════════════════════════════════════ */
function ucCalcPrice() {
  const areaVal = parseFloat(document.getElementById('uc-area-val')?.value) || 0;
  const areaUnit = document.getElementById('uc-area-unit')?.value || 'cent';
  const pricePerUnit = parseFloat(document.getElementById('uc-price-per')?.value) || 0;

  if (!areaVal || !pricePerUnit) {
    document.getElementById('uc-price-result').style.display = 'none';
    return;
  }

  const total = areaVal * pricePerUnit;

  let totalStr;
  if(total >= 10000000) totalStr = '₹' + (total/10000000).toFixed(2) + ' Cr';
  else if(total >= 100000) totalStr = '₹' + (total/100000).toFixed(2) + ' L';
  else totalStr = '₹' + Math.round(total).toLocaleString('en-IN');

  document.getElementById('uc-price-result').style.display = 'block';
  document.getElementById('uc-price-val').textContent = totalStr;
  document.getElementById('uc-price-formula').textContent =
    `${areaVal} ${UC_LABELS[areaUnit]} × ₹${pricePerUnit.toLocaleString('en-IN')} per ${UC_LABELS[areaUnit]} = ${totalStr}`;

  const dashPrice = document.getElementById('uc-dash-price');
  if(dashPrice) dashPrice.textContent = totalStr;
}
/* ══════════════════════════════════════════
   HELPERS
══════════════════════════════════════════ */
function ucSwap() {
  [ucFromUnit, ucToUnit] = [ucToUnit, ucFromUnit];

  // Search input display update பண்ணு
  const fromSearch = document.getElementById('uc-from-search');
  const toSearch = document.getElementById('uc-to-search');
  if (fromSearch) fromSearch.value = UC_LABELS[ucFromUnit] || '';
  if (toSearch) toSearch.value = UC_LABELS[ucToUnit] || '';

  ucUpdateQuickBtns();
  ucConvert();
  ucRenderChart();
}
function ucSetFrom(key) {
  ucFromUnit = key;

  const fromSearch = document.getElementById('uc-from-search');
  if (fromSearch) fromSearch.value = UC_LABELS[key] || '';

  ucUpdateQuickBtns();
  ucConvert();
  ucRenderChart();
}
function ucSetPrecision(p) {
  ucPrecision = p;
  [2,4,6].forEach(x => {
    const btn = document.getElementById(`uc-prec-${x}`);
    if(btn) {
      btn.style.background = x===p ? '#c9a84c' : 'transparent';
      btn.style.color = x===p ? '#1a1a2e' : '#888';
      btn.style.borderColor = x===p ? '#c9a84c' : '#ddd';
    }
  });
  ucConvert();
}

function ucUpdateQuickBtns() {
  ['sqft','cent','acre','ground'].forEach(u => {
    const btn = document.getElementById(`uc-quick-${u}`);
    if(btn) {
      btn.style.background = u===ucFromUnit ? '#c9a84c' : 'transparent';
      btn.style.color = u===ucFromUnit ? '#1a1a2e' : '#c9a84c';
    }
  });
}

function ucCopyResult() {
  if(!ucLastConverted) return;
  const resultLabel = document.getElementById('uc-result-label');
  const text = resultLabel ? resultLabel.textContent : ucLastConverted;
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById('uc-copy-btn');
    if(btn) {
      const orig = btn.textContent;
      btn.textContent = '✅ Copied!';
      btn.style.background = 'rgba(78,202,128,0.15)';
      btn.style.borderColor = '#4eca80';
      btn.style.color = '#4eca80';
      setTimeout(() => {
        btn.textContent = orig;
        btn.style.background = 'rgba(201,168,76,0.1)';
        btn.style.borderColor = 'rgba(201,168,76,0.4)';
        btn.style.color = '#c9a84c';
      }, 2000);
    }
  });
}

function ucUpdateDashArea(val) {
  const el = document.getElementById('uc-dash-area');
  if(el) el.textContent = `${Number(val).toLocaleString('en-IN')} ${UC_LABELS[ucToUnit]}`;
}

function ucUpdateDashMost() {
  const el = document.getElementById('uc-dash-most');
  if(!el) return;
  const sorted = Object.entries(ucMostUsed).sort((a,b)=>b[1]-a[1]);
  el.textContent = sorted.length ? UC_LABELS[sorted[0][0]] : '—';
}

/* Legacy convertUnits() kept as alias so nothing else breaks */
function convertUnits(){ ucConvert(); }
/* ─── 3. STAMP ─── */
/* ═══════════════════════════════════════════════════════════
   ENHANCED REGISTRATION FEE CALCULATOR
   Drop-in replacement for buildStamp() and calcStamp()
   Preserves existing theme: beige / gold / dark
═══════════════════════════════════════════════════════════ */

/* ── Document type rules ── */
const STAMP_DOC_TYPES = {
  sale:         { label: 'Sale Deed',           stampPct: 0.07,  regPct: 0.01,  transferPct: 0.002 },
  gift:         { label: 'Gift Deed',           stampPct: 0.07,  regPct: 0.01,  transferPct: 0.002 },
  settlement:   { label: 'Settlement Deed',     stampPct: 0.01,  regPct: 0.01,  transferPct: 0.002 },
  partition:    { label: 'Partition Deed',       stampPct: 0.04,  regPct: 0.01,  transferPct: 0.001 },
  release:      { label: 'Release Deed',        stampPct: 0.01,  regPct: 0.005, transferPct: 0.001 },
  mortgage:     { label: 'Mortgage Deed',       stampPct: 0.04,  regPct: 0.005, transferPct: 0     },
  lease:        { label: 'Lease Agreement',     stampPct: 0.01,  regPct: 0.005, transferPct: 0     },
  exchange:     { label: 'Exchange Deed',       stampPct: 0.07,  regPct: 0.01,  transferPct: 0.002 },
  poa:          { label: 'Power of Attorney',   stampPct: 0.001, regPct: 0.002, transferPct: 0     },
  cancellation: { label: 'Cancellation Deed',   stampPct: 0.001, regPct: 0.002, transferPct: 0     },
  trust:        { label: 'Trust Deed',          stampPct: 0.07,  regPct: 0.01,  transferPct: 0.002 },
  rectification:{ label: 'Rectification Deed', stampPct: 0.001, regPct: 0.002, transferPct: 0     },
};

/* ── Buyer type discounts ── */
const STAMP_BUYER_TYPES = {
  general:     { label: 'General',            stampDiscount: 0     },
  woman:       { label: 'Woman Buyer',         stampDiscount: 0.035 },
  joint:       { label: 'Joint Ownership',     stampDiscount: 0     },
  family:      { label: 'Family Settlement',   stampDiscount: 0.02  },
  senior:      { label: 'Senior Citizen',      stampDiscount: 0.01  },
  firsttime:   { label: 'First-Time Buyer',    stampDiscount: 0.01  },
};

/* ── Counter animation helper ── */
function stampAnimateVal(id, targetNum, prefix, suffix) {
  const el = document.getElementById(id);
  if (!el) return;
  const duration = 800;
  const start = performance.now();
  const startVal = 0;
  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const current = startVal + (targetNum - startVal) * ease;
    el.textContent = prefix + stampFmtIN(current) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/* ── Indian number formatter ── */
function stampFmtIN(n) {
  n = Math.round(n);
  if (n >= 10000000) return '₹' + (n / 10000000).toFixed(2) + ' Cr';
  if (n >= 100000)   return '₹' + (n / 100000).toFixed(2) + ' L';
  return '₹' + n.toLocaleString('en-IN');
}

/* ── Copy summary ── */
function stampCopySummary() {
  const el = document.getElementById('stamp-copy-text');
  if (!el) return;
  navigator.clipboard.writeText(el.value).then(() => {
    const btn = document.getElementById('stamp-copy-btn');
    if (btn) {
      btn.textContent = '✅ Copied!';
      btn.style.background = 'rgba(78,202,128,0.15)';
      btn.style.borderColor = '#4eca80';
      btn.style.color = '#4eca80';
      setTimeout(() => {
        btn.textContent = '📋 Copy Summary';
        btn.style.background = 'rgba(201,168,76,0.1)';
        btn.style.borderColor = 'rgba(201,168,76,0.5)';
        btn.style.color = '#c9a84c';
      }, 2000);
    }
  });
}

/* ═══════════════════════
   BUILD PANEL
═══════════════════════ */
function buildStamp(b) {
  b.innerHTML = `
  <p style="color:var(--text3,#888);font-size:13px;margin-bottom:20px">
    Tamil Nadu property registration charges — auto calculated
  </p>

  <!-- INPUT SECTION -->
  <div class="form-row">
    <div class="form-group">
      <label>Property Value (₹)</label>
      <input type="number" id="stamp-value" value="3000000" oninput="calcStamp()">
    </div>
    <div class="form-group">
      <label>Buyer Type</label>
      <select id="stamp-buyer" onchange="calcStamp()">
        ${Object.entries(STAMP_BUYER_TYPES).map(([k,v])=>`<option value="${k}">${v.label}</option>`).join('')}
      </select>
    </div>
  </div>

  <div class="form-group">
    <label>Document Type</label>
    <select id="stamp-doctype" onchange="calcStamp()">
      ${Object.entries(STAMP_DOC_TYPES).map(([k,v])=>`<option value="${k}">${v.label}</option>`).join('')}
    </select>
  </div>

  <!-- MAIN RESULT CARD -->
  <div id="stamp-main-result" style="
    background:linear-gradient(135deg,#1C1A14 0%,#2a2218 100%);
    border-radius:16px;padding:24px;margin:20px 0;display:none;
  ">
    <div style="font-size:11px;letter-spacing:.08em;color:#c9a84c;text-transform:uppercase;font-weight:600;margin-bottom:6px">
      Total Registration Cost
    </div>
    <div id="stamp-total" style="font-size:2rem;font-weight:700;color:#fff;transition:all .3s">—</div>
    <div id="stamp-total-pct" style="font-size:12px;color:rgba(255,255,255,0.4);margin-top:4px"></div>
  </div>

  <!-- BREAKDOWN CARDS -->
  <div id="stamp-cards" style="display:none;display:none">
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:20px" id="stamp-cards-grid">
      <div style="background:#fff;border:1.5px solid #e8dfc8;border-radius:12px;padding:16px;text-align:center;box-shadow:0 2px 8px rgba(0,0,0,0.05)">
        <div style="font-size:10px;color:#888;font-weight:600;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px">Stamp Duty</div>
        <div id="stamp-duty" style="font-size:1rem;font-weight:700;color:#c9a84c">—</div>
        <div id="stamp-duty-pct" style="font-size:10px;color:#aaa;margin-top:3px"></div>
      </div>
      <div style="background:#fff;border:1.5px solid #e8dfc8;border-radius:12px;padding:16px;text-align:center;box-shadow:0 2px 8px rgba(0,0,0,0.05)">
        <div style="font-size:10px;color:#888;font-weight:600;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px">Registration Fee</div>
        <div id="stamp-reg" style="font-size:1rem;font-weight:700;color:#c9a84c">—</div>
        <div id="stamp-reg-pct" style="font-size:10px;color:#aaa;margin-top:3px"></div>
      </div>
      <div style="background:#fff;border:1.5px solid #e8dfc8;border-radius:12px;padding:16px;text-align:center;box-shadow:0 2px 8px rgba(0,0,0,0.05)">
        <div style="font-size:10px;color:#888;font-weight:600;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px">Transfer Tax</div>
        <div id="stamp-transfer" style="font-size:1rem;font-weight:700;color:#c9a84c">—</div>
        <div id="stamp-transfer-pct" style="font-size:10px;color:#aaa;margin-top:3px"></div>
      </div>
    </div>
  </div>

  <!-- BREAKDOWN TABLE -->
  <div id="stamp-table-wrap" style="display:none;background:#fff;border:1.5px solid #e8dfc8;border-radius:14px;overflow:hidden;margin-bottom:20px;box-shadow:0 2px 12px rgba(0,0,0,0.06)">
    <div style="padding:14px 20px;background:#F5F0E8;border-bottom:1px solid #e8dfc8">
      <span style="font-size:13px;font-weight:700;color:#1a1a2e">📋 Detailed Fee Breakdown</span>
    </div>
    <div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse;font-size:13px">
        <thead>
          <tr style="background:#fdf6e3">
            <th style="padding:11px 16px;text-align:left;color:#888;font-weight:600;font-size:11px;text-transform:uppercase;letter-spacing:.05em;border-bottom:1px solid #e8dfc8">Charge Type</th>
            <th style="padding:11px 16px;text-align:center;color:#888;font-weight:600;font-size:11px;text-transform:uppercase;letter-spacing:.05em;border-bottom:1px solid #e8dfc8">Formula</th>
            <th style="padding:11px 16px;text-align:right;color:#888;font-weight:600;font-size:11px;text-transform:uppercase;letter-spacing:.05em;border-bottom:1px solid #e8dfc8">Amount</th>
          </tr>
        </thead>
        <tbody id="stamp-table-body"></tbody>
      </table>
    </div>
  </div>

  <!-- ADDITIONAL COSTS -->
  <div style="background:#fff;border:1.5px solid #e8dfc8;border-radius:14px;padding:20px;margin-bottom:20px;box-shadow:0 2px 12px rgba(0,0,0,0.06)">
    <div style="font-size:13px;font-weight:700;color:#1a1a2e;margin-bottom:16px">💼 Additional Costs (Optional)</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div class="form-group" style="margin:0">
        <label style="font-size:11px">Legal Fees (₹)</label>
        <input type="number" id="stamp-legal" placeholder="e.g. 10000" oninput="calcStamp()" style="margin-top:4px">
      </div>
      <div class="form-group" style="margin:0">
        <label style="font-size:11px">Broker Commission (₹)</label>
        <input type="number" id="stamp-broker" placeholder="e.g. 50000" oninput="calcStamp()" style="margin-top:4px">
      </div>
      <div class="form-group" style="margin:0">
        <label style="font-size:11px">Documentation Charges (₹)</label>
        <input type="number" id="stamp-doc" placeholder="e.g. 5000" oninput="calcStamp()" style="margin-top:4px">
      </div>
      <div class="form-group" style="margin:0">
        <label style="font-size:11px">Miscellaneous (₹)</label>
        <input type="number" id="stamp-misc" placeholder="e.g. 5000" oninput="calcStamp()" style="margin-top:4px">
      </div>
    </div>
  </div>

  <!-- TOTAL BUYING COST CARD -->
  <div id="stamp-buying-card" style="display:none;background:linear-gradient(135deg,#1C1A14 0%,#2a2218 100%);border:1.5px solid rgba(201,168,76,0.3);border-radius:16px;padding:24px;margin-bottom:20px">
    <div style="font-size:11px;letter-spacing:.08em;color:#c9a84c;text-transform:uppercase;font-weight:600;margin-bottom:6px">Total Buying Cost</div>
    <div id="stamp-buying-total" style="font-size:2rem;font-weight:700;color:#fff">—</div>
    <div id="stamp-buying-breakdown" style="font-size:12px;color:rgba(255,255,255,0.4);margin-top:6px;line-height:1.8"></div>
  </div>

  <!-- TN GOVT RATES INFO -->
  <div style="background:#F5F0E8;border:1.5px solid #e8dfc8;border-radius:14px;padding:20px;margin-bottom:20px">
    <div style="font-size:13px;font-weight:700;color:#1a1a2e;margin-bottom:14px">🏛️ Tamil Nadu Government Rates</div>
    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px" id="stamp-rates-grid">
      <!-- filled by calcStamp -->
    </div>
    <div style="margin-top:12px;padding:10px 14px;background:rgba(201,168,76,0.08);border-radius:8px;border-left:3px solid #c9a84c;font-size:12px;color:#888">
      ⚠️ Rates may vary based on document type and buyer category. Verify with Sub-Registrar office.
    </div>
  </div>

  <!-- COPY SUMMARY BUTTON -->
  <button id="stamp-copy-btn" onclick="stampCopySummary()" style="
    width:100%;padding:14px;border-radius:12px;
    border:1.5px solid rgba(201,168,76,0.5);
    background:rgba(201,168,76,0.1);color:#c9a84c;
    font-size:13px;font-weight:600;cursor:pointer;
    font-family:'DM Sans',sans-serif;transition:all .25s;
    margin-bottom:8px;display:none
  ">📋 Copy Summary</button>
  <textarea id="stamp-copy-text" style="display:none" readonly></textarea>
  `;

  /* Auto-calc on load */
  calcStamp();
}

/* ═══════════════════════
   CALCULATE
═══════════════════════ */
function calcStamp() {
  const v       = +document.getElementById('stamp-value')?.value   || 0;
  const buyerKey= document.getElementById('stamp-buyer')?.value    || 'general';
  const docKey  = document.getElementById('stamp-doctype')?.value  || 'sale';
  const legal   = +document.getElementById('stamp-legal')?.value   || 0;
  const broker  = +document.getElementById('stamp-broker')?.value  || 0;
  const docChg  = +document.getElementById('stamp-doc')?.value     || 0;
  const misc    = +document.getElementById('stamp-misc')?.value    || 0;

  if (!v) return;

  const doc    = STAMP_DOC_TYPES[docKey];
  const buyer  = STAMP_BUYER_TYPES[buyerKey];
  const effStampPct = Math.max(0, doc.stampPct - buyer.stampDiscount);

  const duty     = v * effStampPct;
  const reg      = v * doc.regPct;
  const transfer = v * doc.transferPct;
  const totalReg = duty + reg + transfer;
  const addCosts = legal + broker + docChg + misc;
  const totalBuy = v + totalReg + addCosts;

  /* Show sections */
  ['stamp-main-result','stamp-cards','stamp-table-wrap','stamp-buying-card','stamp-copy-btn']
    .forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'block';
    });
  document.getElementById('stamp-cards').style.display = 'block';

  /* Animate main result */
  stampAnimateVal('stamp-total', totalReg, '', '');
  document.getElementById('stamp-total').textContent = stampFmtIN(totalReg);
  document.getElementById('stamp-total-pct').textContent =
    `= ${(totalReg / v * 100).toFixed(2)}% of Property Value`;

  /* Breakdown cards */
  document.getElementById('stamp-duty').textContent      = stampFmtIN(duty);
  document.getElementById('stamp-duty-pct').textContent  = `${(effStampPct*100).toFixed(1)}% of ₹${v.toLocaleString('en-IN')}`;
  document.getElementById('stamp-reg').textContent       = stampFmtIN(reg);
  document.getElementById('stamp-reg-pct').textContent   = `${(doc.regPct*100).toFixed(1)}%`;
  document.getElementById('stamp-transfer').textContent  = stampFmtIN(transfer);
  document.getElementById('stamp-transfer-pct').textContent = `${(doc.transferPct*100).toFixed(1)}%`;

  /* Breakdown table */
  const rows = [
    { type: 'Property Value',         formula: '(Market Value)',                                          amt: v        },
    { type: 'Stamp Duty',             formula: `${(effStampPct*100).toFixed(1)}% × ₹${v.toLocaleString('en-IN')}`, amt: duty     },
    { type: 'Registration Fee',       formula: `${(doc.regPct*100).toFixed(1)}% × ₹${v.toLocaleString('en-IN')}`,  amt: reg      },
    { type: 'Transfer Tax',           formula: `${(doc.transferPct*100).toFixed(1)}% × ₹${v.toLocaleString('en-IN')}`, amt: transfer },
    { type: 'Total Registration Cost',formula: 'Stamp + Reg + Transfer',                                  amt: totalReg, bold: true },
  ];
  document.getElementById('stamp-table-body').innerHTML = rows.map((r, i) => `
    <tr style="border-bottom:1px solid #f0e8d8;background:${i % 2 === 0 ? '#fff' : '#fdfaf4'}">
      <td style="padding:11px 16px;color:${r.bold ? '#1a1a2e' : '#444'};font-weight:${r.bold ? '700' : '400'}">${r.type}</td>
      <td style="padding:11px 16px;text-align:center;color:#888;font-size:12px">${r.formula}</td>
      <td style="padding:11px 16px;text-align:right;font-weight:${r.bold ? '700' : '500'};color:${r.bold ? '#c9a84c' : '#333'}">${stampFmtIN(r.amt)}</td>
    </tr>
  `).join('');

  /* Total Buying Cost */
  document.getElementById('stamp-buying-total').textContent = stampFmtIN(totalBuy);
  let bkStr = `Property: ${stampFmtIN(v)} + Reg: ${stampFmtIN(totalReg)}`;
  if (addCosts > 0) bkStr += ` + Additional: ${stampFmtIN(addCosts)}`;
  document.getElementById('stamp-buying-breakdown').textContent = bkStr;

  /* Rates info grid */
  document.getElementById('stamp-rates-grid').innerHTML = [
    { label: 'Stamp Duty',       val: `${(effStampPct*100).toFixed(1)}%`, note: buyer.stampDiscount > 0 ? `(${(doc.stampPct*100)}% − ${(buyer.stampDiscount*100)}% discount)` : '' },
    { label: 'Registration Fee', val: `${(doc.regPct*100).toFixed(1)}%`,  note: '' },
    { label: 'Transfer Tax',     val: `${(doc.transferPct*100).toFixed(1)}%`, note: '' },
    { label: 'Effective Period', val: 'FY 2025–26',                       note: 'Current financial year' },
  ].map(r => `
    <div style="background:#fff;border:1px solid #e8dfc8;border-radius:10px;padding:12px 14px;display:flex;justify-content:space-between;align-items:center">
      <div>
        <div style="font-size:11px;color:#888;font-weight:600">${r.label}</div>
        ${r.note ? `<div style="font-size:10px;color:#aaa;margin-top:2px">${r.note}</div>` : ''}
      </div>
      <div style="font-size:1rem;font-weight:700;color:#c9a84c">${r.val}</div>
    </div>
  `).join('');

  /* Copy text */
  const docLabel   = STAMP_DOC_TYPES[docKey].label;
  const buyerLabel = STAMP_BUYER_TYPES[buyerKey].label;
  document.getElementById('stamp-copy-text').value =
`=== Registration Cost Summary ===
Property Value       : ${stampFmtIN(v)}
Buyer Type           : ${buyerLabel}
Document Type        : ${docLabel}

Stamp Duty           : ${stampFmtIN(duty)} (${(effStampPct*100).toFixed(1)}%)
Registration Fee     : ${stampFmtIN(reg)} (${(doc.regPct*100).toFixed(1)}%)
Transfer Tax         : ${stampFmtIN(transfer)} (${(doc.transferPct*100).toFixed(1)}%)
Total Reg. Cost      : ${stampFmtIN(totalReg)}

${addCosts > 0 ? `Legal Fees           : ${stampFmtIN(legal)}
Broker Commission    : ${stampFmtIN(broker)}
Documentation        : ${stampFmtIN(docChg)}
Miscellaneous        : ${stampFmtIN(misc)}
` : ''}Total Buying Cost    : ${stampFmtIN(totalBuy)}
================================
Generated by J Square Housing Tools`;
}
/* ─── 4. CONSTRUCTION ─── */
/* ═══════════════════════════════════════════════════════════
   ENHANCED CONSTRUCTION COST CALCULATOR
   Drop-in replacement for buildConstruction() & calcConstruction()
   Preserves existing theme: beige / gold / dark
═══════════════════════════════════════════════════════════ */

/* ── Construction type rates ── */
const CONS_TYPES = {
  basic:    { label: 'Basic Construction',    min: 1800, max: 2300, emoji: '🧱' },
  standard: { label: 'Standard Construction', min: 2300, max: 2800, emoji: '🏠' },
  premium:  { label: 'Premium Construction',  min: 2500, max: 3200, emoji: '🏡' },
  luxury:   { label: 'Luxury Construction',   min: 3500, max: 6000, emoji: '🏰' },
};

/* ── Floor multipliers ── */
const CONS_FLOORS = {
  g:    { label: 'Ground Floor Only', multiplier: 1   },
  g1:   { label: 'G + 1 Floors',      multiplier: 2   },
  g2:   { label: 'G + 2 Floors',      multiplier: 3   },
  g3:   { label: 'G + 3 Floors',      multiplier: 4   },
  g4:   { label: 'G + 4 Floors',      multiplier: 5   },
};

/* ── Material breakdown percentages ── */
const CONS_MATERIALS = [
  { name: 'Cement',     icon: '🪨', pct: 0.16 },
  { name: 'Steel',      icon: '⚙️', pct: 0.14 },
  { name: 'Sand',       icon: '🏖️', pct: 0.08 },
  { name: 'Bricks',     icon: '🧱', pct: 0.10 },
  { name: 'Labour',     icon: '👷', pct: 0.25 },
  { name: 'Electrical', icon: '⚡', pct: 0.08 },
  { name: 'Plumbing',   icon: '🚿', pct: 0.07 },
  { name: 'Tiles',      icon: '🪟', pct: 0.07 },
  { name: 'Painting',   icon: '🎨', pct: 0.05 },
];

/* ── Indian formatter ── */
function consFmt(n) {
  n = Math.round(n);
  if (n >= 10000000) return '₹' + (n / 10000000).toFixed(2) + ' Cr';
  if (n >= 100000)   return '₹' + (n / 100000).toFixed(2) + ' L';
  return '₹' + n.toLocaleString('en-IN');
}

/* ── Animated counter ── */
function consAnimate(id, target) {
  const el = document.getElementById(id);
  if (!el) return;
  const dur = 900, start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / dur, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = consFmt(target * ease);
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = consFmt(target);
  }
  requestAnimationFrame(tick);
}

/* ── Copy estimate ── */
function consCopyEstimate() {
  const el = document.getElementById('cons-copy-text');
  if (!el) return;
  navigator.clipboard.writeText(el.value).then(() => {
    const btn = document.getElementById('cons-copy-btn');
    if (!btn) return;
    btn.textContent = '✅ Copied!';
    btn.style.background = 'rgba(78,202,128,0.15)';
    btn.style.borderColor = '#4eca80';
    btn.style.color = '#4eca80';
    setTimeout(() => {
      btn.textContent = '📋 Copy Estimate';
      btn.style.background = 'rgba(201,168,76,0.1)';
      btn.style.borderColor = 'rgba(201,168,76,0.5)';
      btn.style.color = '#c9a84c';
    }, 2200);
  });
}

/* ═══════════════════════
   BUILD PANEL
═══════════════════════ */
function buildConstruction(b) {
  b.innerHTML = `
  <p style="color:var(--text3,#888);font-size:13px;margin-bottom:20px">
    House construction cost estimator — Salem, Tamil Nadu
  </p>

  <!-- ── INPUT SECTION ── -->
  <div class="form-row">
    <div class="form-group">
      <label>Plot / Floor Area (sq.ft)</label>
      <input type="number" id="cons-area" value="1200" oninput="calcConstruction()">
    </div>
    <div class="form-group">
      <label>Construction Type</label>
      <select id="cons-type" onchange="calcConstruction()">
        ${Object.entries(CONS_TYPES).map(([k,v]) =>
          `<option value="${k}"${k==='standard'?' selected':''}>${v.emoji} ${v.label}</option>`
        ).join('')}
      </select>
    </div>
  </div>

  <div class="form-row">
    <div class="form-group">
      <label>Number of Floors</label>
      <select id="cons-floors" onchange="calcConstruction()">
        ${Object.entries(CONS_FLOORS).map(([k,v]) =>
          `<option value="${k}">${v.label}</option>`
        ).join('')}
      </select>
    </div>
    <div class="form-group">
      <label>Bedrooms</label>
      <select id="cons-beds" onchange="calcConstruction()">
        ${[...Array(8)].map((_,i) => `<option value="${i+1}"${i+1===3?' selected':''}>${i+1} BHK</option>`).join('')}
      </select>
    </div>
  </div>

  <div class="form-row">
    <div class="form-group">
      <label>Bathrooms</label>
      <select id="cons-baths" onchange="calcConstruction()">
        ${[...Array(8)].map((_,i) => `<option value="${i+1}"${i+1===2?' selected':''}>${i+1}</option>`).join('')}
      </select>
    </div>
    <div class="form-group">
      <label>Kitchens</label>
      <select id="cons-kitchens" onchange="calcConstruction()">
        ${[1,2,3].map(n => `<option value="${n}">${n}</option>`).join('')}
      </select>
    </div>
  </div>

  <div class="form-group">
    <label>Balconies</label>
    <select id="cons-balconies" onchange="calcConstruction()" style="max-width:200px">
      ${[0,1,2,3,4,5,6].map(n => `<option value="${n}"${n===1?' selected':''}>${n}</option>`).join('')}
    </select>
  </div>

  <!-- ── MAIN RESULT CARD ── -->
  <div id="cons-main-card" style="
    background:linear-gradient(135deg,#1C1A14 0%,#2a2218 100%);
    border-radius:16px;padding:24px;margin:20px 0;display:none
  ">
    <div style="font-size:11px;letter-spacing:.08em;color:#c9a84c;text-transform:uppercase;font-weight:600;margin-bottom:6px">
      Average Construction Estimate
    </div>
    <div id="cons-total" style="font-size:2rem;font-weight:700;color:#fff">—</div>
    <div id="cons-builtup-note" style="font-size:12px;color:rgba(255,255,255,0.4);margin-top:4px"></div>
  </div>

  <!-- ── SUMMARY CARDS ── -->
  <div id="cons-summary-cards" style="display:none;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:20px">
    ${[
      ['cons-min','Minimum Cost'],
      ['cons-max','Maximum Cost'],
      ['cons-rate','Sq.Ft Rate'],
    ].map(([id, label]) => `
      <div style="background:#fff;border:1.5px solid #e8dfc8;border-radius:12px;padding:16px;text-align:center;box-shadow:0 2px 8px rgba(0,0,0,0.05)">
        <div style="font-size:10px;color:#888;font-weight:600;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px">${label}</div>
        <div id="${id}" style="font-size:0.98rem;font-weight:700;color:#c9a84c">—</div>
      </div>
    `).join('')}
  </div>

  <!-- ── ADDITIONAL COSTS ── -->
  <div style="background:#fff;border:1.5px solid #e8dfc8;border-radius:14px;padding:20px;margin-bottom:20px;box-shadow:0 2px 12px rgba(0,0,0,0.06)">
    <div style="font-size:13px;font-weight:700;color:#1a1a2e;margin-bottom:16px">💼 Additional Project Costs (Optional)</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      ${[
        ['cons-architect',  'Architect Fees (₹)',         '50000'],
        ['cons-approval',   'Plan Approval Charges (₹)',  '25000'],
        ['cons-borewell',   'Borewell Charges (₹)',       '30000'],
        ['cons-compound',   'Compound Wall Cost (₹)',     '80000'],
        ['cons-interior',   'Interior Design Cost (₹)',   ''],
        ['cons-addmisc',    'Miscellaneous (₹)',          '20000'],
      ].map(([id, label, val]) => `
        <div class="form-group" style="margin:0">
          <label style="font-size:11px">${label}</label>
          <input type="number" id="${id}" placeholder="e.g. ${val || '0'}"
            ${val ? `value="${val}"` : ''} oninput="calcConstruction()" style="margin-top:4px">
        </div>
      `).join('')}
    </div>
  </div>

  <!-- ── TOTAL PROJECT COST ── -->
  <div id="cons-project-card" style="display:none;background:linear-gradient(135deg,#1C1A14 0%,#2a2218 100%);border:1.5px solid rgba(201,168,76,0.3);;border:1.5px solid rgba(177, 32, 32, 0.53);border-radius:16px;padding:24px;margin-bottom:20px">
    <div style="font-size:11px;letter-spacing:.08em;color:#c9a84c;text-transform:uppercase;font-weight:600;margin-bottom:6px">Total Project Cost</div>
    <div id="cons-project-total" style="font-size:2rem;font-weight:700;color:#fff">—</div>
    <div id="cons-project-breakdown" style="font-size:12px;color:rgba(255,255,255,0.45);margin-top:6px;line-height:1.9"></div>
  </div>

  <!-- ── COPY BUTTON ── -->
  <button id="cons-copy-btn" onclick="consCopyEstimate()" style="
    width:100%;padding:14px;border-radius:12px;
    border:1.5px solid rgba(201,168,76,0.5);
    background:rgba(141, 111, 29, 0.1);color:#c9a84c;
    font-size:13px;font-weight:600;cursor:pointer;
    font-family:'DM Sans',sans-serif;transition:all .25s;display:none
  ">📋 Copy Estimate</button>
  <textarea id="cons-copy-text" style="display:none" readonly></textarea>
  `;

  calcConstruction();
}

/* ═══════════════════════
   CALCULATE
═══════════════════════ */
function calcConstruction() {
  const area       = +document.getElementById('cons-area')?.value      || 0;
  const typeKey    = document.getElementById('cons-type')?.value       || 'standard';
  const floorsKey  = document.getElementById('cons-floors')?.value     || 'g';
  const beds       = +document.getElementById('cons-beds')?.value      || 3;
  const baths      = +document.getElementById('cons-baths')?.value     || 2;
  const kitchens   = +document.getElementById('cons-kitchens')?.value  || 1;
  const balconies  = +document.getElementById('cons-balconies')?.value || 1;

  const architect  = +document.getElementById('cons-architect')?.value  || 0;
  const approval   = +document.getElementById('cons-approval')?.value   || 0;
  const borewell   = +document.getElementById('cons-borewell')?.value   || 0;
  const compound   = +document.getElementById('cons-compound')?.value   || 0;
  const interior   = +document.getElementById('cons-interior')?.value   || 0;
  const addmisc    = +document.getElementById('cons-addmisc')?.value    || 0;

  if (!area) return;

  const cType  = CONS_TYPES[typeKey];
  const fData  = CONS_FLOORS[floorsKey];
  const builtUp = area * fData.multiplier;
  const minCost = builtUp * cType.min;
  const maxCost = builtUp * cType.max;
  const avgCost = (minCost + maxCost) / 2;
  const midRate = Math.round((cType.min + cType.max) / 2);
  const addTotal = architect + approval + borewell + compound + interior + addmisc;
  const projTotal = avgCost + addTotal;

  /* ── Show sections ── */
  document.getElementById('cons-main-card').style.display    = 'block';
  document.getElementById('cons-project-card').style.display = 'block';
  const sc = document.getElementById('cons-summary-cards');
  sc.style.display = 'grid';

  /* ── Animate main ── */
  consAnimate('cons-total', avgCost);
  document.getElementById('cons-builtup-note').textContent =
    `Built-up: ${builtUp.toLocaleString('en-IN')} sq.ft (${area} × ${fData.multiplier} floor${fData.multiplier > 1 ? 's' : ''})`;

  /* ── Summary cards ── */
  consAnimate('cons-min', minCost);
  consAnimate('cons-max', maxCost);
  document.getElementById('cons-rate').textContent = `₹${cType.min}–₹${cType.max}/sq.ft`;
  /* ── Total Project ── */
  consAnimate('cons-project-total', projTotal);
  const bkLines = [
    `Construction: ${consFmt(avgCost)}`,
    architect ? `Architect: ${consFmt(architect)}`   : '',
    approval  ? `Approval:  ${consFmt(approval)}`    : '',
    borewell  ? `Borewell:  ${consFmt(borewell)}`    : '',
    compound  ? `Compound Wall: ${consFmt(compound)}`: '',
    interior  ? `Interior: ${consFmt(interior)}`     : '',
    addmisc   ? `Misc: ${consFmt(addmisc)}`          : '',
  ].filter(Boolean);
  document.getElementById('cons-project-breakdown').innerHTML = bkLines.join('<br>');

  /* ── Copy text ── */
  document.getElementById('cons-copy-text').value =
`=== Construction Cost Estimate ===
Area (Per Floor)     : ${area.toLocaleString('en-IN')} sq.ft
Construction Type    : ${cType.emoji} ${cType.label}
Number of Floors     : ${fData.label}
Built-Up Area        : ${builtUp.toLocaleString('en-IN')} sq.ft

Room Configuration:
  Bedrooms           : ${beds}
  Bathrooms          : ${baths}
  Kitchens           : ${kitchens}
  Balconies          : ${balconies}

Cost Estimate:
  Minimum            : ${consFmt(minCost)}
  Maximum            : ${consFmt(maxCost)}
  Average Estimate   : ${consFmt(avgCost)}
  Per Sq.Ft Rate     : ₹${cType.min}–₹${cType.max}

Material Breakdown:
${CONS_MATERIALS.map(m => `  ${m.name.padEnd(14)}: ${consFmt(avgCost * m.pct)} (${(m.pct*100).toFixed(0)}%)`).join('\n')}

Additional Costs     : ${consFmt(addTotal)}
Total Project Cost   : ${consFmt(projTotal)}
================================
Generated by J Square Housing Tools`;
}
/* ─── 5. ROI ─── */
/* ═══════════════════════════════════════════════════════════
   ENHANCED ROI CALCULATOR
   Drop-in replacement for buildROI() & calcROI()
   Preserves existing theme: beige / gold / dark
═══════════════════════════════════════════════════════════ */

/* ── Investment types ── */
const ROI_TYPES = {
  plot:       { label: 'Residential Plot',    risk: 'low',      avgAppreciation: 12 },
  apartment:  { label: 'Apartment',           risk: 'low',      avgAppreciation: 9  },
  villa:      { label: 'Villa',               risk: 'moderate', avgAppreciation: 10 },
  commercial: { label: 'Commercial Property', risk: 'moderate', avgAppreciation: 11 },
  agri:       { label: 'Agricultural Land',   risk: 'high',     avgAppreciation: 8  },
  rental:     { label: 'Rental Property',     risk: 'low',      avgAppreciation: 10 },
};

/* ── Performance thresholds ── */
const ROI_PERF = [
  { min: 80,  label: '🚀 Excellent Return',  color: '#4eca80', bg: 'rgba(78,202,128,0.12)'  },
  { min: 40,  label: '✅ Good Return',        color: '#c9a84c', bg: 'rgba(201,168,76,0.12)'  },
  { min: 15,  label: '📊 Average Return',     color: '#e8b84b', bg: 'rgba(232,184,75,0.12)'  },
  { min: 0,   label: '⚠️ Low Return',         color: '#e07b3a', bg: 'rgba(224,123,58,0.12)'  },
  { min: -Infinity, label: '🔴 Negative Return', color: '#e74c3c', bg: 'rgba(231,76,60,0.12)' },
];

/* ── Risk config ── */
const ROI_RISK = {
  low:      { label: '🟢 Low Risk',      color: '#4eca80' },
  moderate: { label: '🟡 Moderate Risk', color: '#c9a84c' },
  high:     { label: '🔴 High Risk',     color: '#e74c3c' },
};

/* ── Recommendation config ── */
function roiGetRecommendation(annualROI, risk) {
  if (annualROI >= 15 && risk === 'low')      return { label: '💎 Strong Buy',       color: '#4eca80' };
  if (annualROI >= 12)                        return { label: '📈 High Potential',    color: '#c9a84c' };
  if (annualROI >= 8)                         return { label: '🤝 Hold',              color: '#e8b84b' };
  if (annualROI >= 0)                         return { label: '🔍 Reconsider',        color: '#e07b3a' };
  return                                             { label: '🚫 Avoid / Exit',      color: '#e74c3c' };
}

/* ── Indian formatter ── */
function roiFmt(n) {
  const abs = Math.abs(Math.round(n));
  let str;
  if (abs >= 10000000) str = '₹' + (abs / 10000000).toFixed(2) + ' Cr';
  else if (abs >= 100000) str = '₹' + (abs / 100000).toFixed(2) + ' L';
  else str = '₹' + abs.toLocaleString('en-IN');
  return n < 0 ? '-' + str : str;
}

/* ── Animated counter ── */
function roiAnimate(id, target, suffix = '') {
  const el = document.getElementById(id);
  if (!el) return;
  const dur = 900, start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / dur, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    const cur = target * ease;
    el.textContent = (suffix === '%')
      ? (cur >= 0 ? '+' : '') + cur.toFixed(2) + '%'
      : roiFmt(cur);
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = (suffix === '%')
      ? (target >= 0 ? '+' : '') + target.toFixed(2) + '%'
      : roiFmt(target);
  }
  requestAnimationFrame(tick);
}

/* ── Copy summary ── */
function roiCopySummary() {
  const el = document.getElementById('roi-copy-text');
  if (!el) return;
  navigator.clipboard.writeText(el.value).then(() => {
    const btn = document.getElementById('roi-copy-btn');
    if (!btn) return;
    btn.textContent = '✅ Copied!';
    btn.style.background = 'rgba(78,202,128,0.15)';
    btn.style.borderColor = '#4eca80';
    btn.style.color = '#4eca80';
    setTimeout(() => {
      btn.textContent = '📋 Copy ROI Summary';
      btn.style.background = 'rgba(201,168,76,0.1)';
      btn.style.borderColor = 'rgba(201,168,76,0.5)';
      btn.style.color = '#c9a84c';
    }, 2200);
  });
}

/* ── Print report ── */
function roiPrintReport() {
  const txt = document.getElementById('roi-copy-text')?.value || '';
  const win = window.open('', '_blank');
  win.document.write(`<pre style="font-family:monospace;font-size:14px;padding:32px">${txt}</pre>`);
  win.document.close();
  win.print();
}

/* ── Scenario selector ── */
let roiScenario = 'expected';
function roiSetScenario(s, btn) {
  roiScenario = s;
  document.querySelectorAll('.roi-scenario-btn').forEach(b => {
    b.style.background = 'transparent';
    b.style.color = '#c9a84c';
  });
  btn.style.background = '#c9a84c';
  btn.style.color = '#1a1a2e';
  calcROI();
}

/* ── Scenario multipliers ── */
const ROI_SCENARIOS = {
  conservative: { sellMult: 0.9,  rentalMult: 0.85, label: 'Conservative' },
  expected:     { sellMult: 1.0,  rentalMult: 1.0,  label: 'Expected'     },
  optimistic:   { sellMult: 1.12, rentalMult: 1.2,  label: 'Optimistic'   },
};

/* ═══════════════════════
   BUILD PANEL
═══════════════════════ */
function buildROI(b) {
  b.innerHTML = `
  <p style="color:var(--text3,#888);font-size:13px;margin-bottom:20px">
    Property investment return analysis — auto calculated
  </p>

  <!-- ── SCENARIO SELECTOR ── -->
  <div style="margin-bottom:20px">
    <div style="font-size:11px;font-weight:600;letter-spacing:.06em;color:#888;text-transform:uppercase;margin-bottom:8px">📊 Scenario</div>
    <div style="display:flex;gap:8px;flex-wrap:wrap">
      ${Object.entries(ROI_SCENARIOS).map(([k,v]) => `
        <button class="roi-scenario-btn" onclick="roiSetScenario('${k}',this)" style="
          padding:7px 18px;border-radius:20px;border:1.5px solid #c9a84c;
          background:${k==='expected'?'#c9a84c':'transparent'};
          color:${k==='expected'?'#1a1a2e':'#c9a84c'};
          font-size:12px;font-weight:600;cursor:pointer;
          font-family:'DM Sans',sans-serif;transition:all .2s
        ">${v.label}</button>
      `).join('')}
    </div>
  </div>

  <!-- ── PRIMARY INPUTS ── -->
  <div class="form-row">
    <div class="form-group">
      <label>Purchase Price (₹)</label>
      <input type="number" id="roi-purchase" value="2500000" oninput="calcROI()">
    </div>
    <div class="form-group">
      <label>Selling Price (₹)</label>
      <input type="number" id="roi-sell" value="3500000" oninput="calcROI()">
    </div>
  </div>
  <div class="form-row">
    <div class="form-group">
      <label>Duration (Years)</label>
      <input type="number" id="roi-years" value="5" oninput="calcROI()">
    </div>
    <div class="form-group">
      <label>Investment Type</label>
      <select id="roi-type" onchange="calcROI()">
        ${Object.entries(ROI_TYPES).map(([k,v]) =>
          `<option value="${k}">${v.label}</option>`
        ).join('')}
      </select>
    </div>
  </div>

  <!-- ── ADDITIONAL INPUTS ── -->
  <div style="background:#fff;border:1.5px solid #e8dfc8;border-radius:14px;padding:20px;margin-bottom:20px;box-shadow:0 2px 12px rgba(0,0,0,0.06)">
    <div style="font-size:13px;font-weight:700;color:#1a1a2e;margin-bottom:16px">💼 Additional Returns & Costs</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      ${[
        ['roi-rental',      'Rental Income Earned (₹)',  '240000'],
        ['roi-renovation',  'Renovation Cost (₹)',       '150000'],
        ['roi-maintenance', 'Maintenance Cost (₹)',      '50000'],
        ['roi-proptax',     'Property Tax Paid (₹)',     '30000'],
        ['roi-loanint',     'Loan Interest Paid (₹)',    '0'],
        ['roi-costs',       'Other Additional Costs (₹)','50000'],
      ].map(([id,label,val]) => `
        <div class="form-group" style="margin:0">
          <label style="font-size:11px">${label}</label>
          <input type="number" id="${id}" value="${val}" oninput="calcROI()" style="margin-top:4px">
        </div>
      `).join('')}
    </div>
  </div>

  <!-- ── MAIN ROI RESULT CARD ── -->
  <div id="roi-main-card" style="
    background:linear-gradient(135deg,#1C1A14 0%,#2a2218 100%);
    border-radius:16px;padding:24px;margin:0 0 20px;display:none
  ">
    <div style="font-size:11px;letter-spacing:.08em;color:#c9a84c;text-transform:uppercase;font-weight:600;margin-bottom:6px">Total ROI</div>
    <div id="roi-total-pct" style="font-size:2.2rem;font-weight:700;color:#fff">—</div>
    <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:12px">
      <span id="roi-perf-badge" style="padding:5px 14px;border-radius:20px;font-size:12px;font-weight:700"></span>
      <span id="roi-risk-badge" style="padding:5px 14px;border-radius:20px;font-size:12px;font-weight:700;background:rgba(255,255,255,0.08);color:#bbb"></span>
      <span id="roi-rec-badge"  style="padding:5px 14px;border-radius:20px;font-size:12px;font-weight:700;background:rgba(255,255,255,0.08);color:#bbb"></span>
    </div>
  </div>

  <!-- ── SUMMARY CARDS ── -->
  <div id="roi-summary-grid" style="display:none;grid-template-columns:repeat(2,1fr);gap:12px;margin-bottom:20px">
    ${[
      ['roi-annual-pct', 'Annual ROI %'],
      ['roi-net-profit', 'Net Profit'],
      ['roi-capital',    'Capital Gain'],
      ['roi-total-invest','Total Investment'],
    ].map(([id, label]) => `
      <div style="background:#fff;border:1.5px solid #e8dfc8;border-radius:12px;padding:16px;text-align:center;box-shadow:0 2px 8px rgba(0,0,0,0.05)">
        <div style="font-size:10px;color:#888;font-weight:600;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px">${label}</div>
        <div id="${id}" style="font-size:1rem;font-weight:700;color:#c9a84c">—</div>
      </div>
    `).join('')}
  </div>

  <!-- ── BREAKDOWN TABLE ── -->
  <div id="roi-table-wrap" style="display:none;background:#fff;border:1.5px solid #e8dfc8;border-radius:14px;overflow:hidden;margin-bottom:20px;box-shadow:0 2px 12px rgba(0,0,0,0.06)">
    <div style="padding:14px 20px;background:#F5F0E8;border-bottom:1px solid #e8dfc8">
      <span style="font-size:13px;font-weight:700;color:#1a1a2e">📋 Detailed ROI Breakdown</span>
    </div>
    <div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse;font-size:13px">
        <thead>
          <tr style="background:#fdf6e3">
            <th style="padding:11px 16px;text-align:left;color:#888;font-weight:600;font-size:11px;text-transform:uppercase;letter-spacing:.05em;border-bottom:1px solid #e8dfc8">Item</th>
            <th style="padding:11px 16px;text-align:center;color:#888;font-weight:600;font-size:11px;text-transform:uppercase;letter-spacing:.05em;border-bottom:1px solid #e8dfc8">Formula</th>
            <th style="padding:11px 16px;text-align:right;color:#888;font-weight:600;font-size:11px;text-transform:uppercase;letter-spacing:.05em;border-bottom:1px solid #e8dfc8">Amount</th>
          </tr>
        </thead>
        <tbody id="roi-table-body"></tbody>
      </table>
    </div>
  </div>

  <!-- ── VISUAL CHART ── -->
  <div id="roi-chart-wrap" style="display:none;background:#fff;border:1.5px solid #e8dfc8;border-radius:14px;padding:20px;margin-bottom:20px;box-shadow:0 2px 12px rgba(0,0,0,0.06)">
    <div style="font-size:13px;font-weight:700;color:#1a1a2e;margin-bottom:16px">📊 Investment vs Return</div>
    <div id="roi-chart-bars"></div>
  </div>

  <!-- ── FUTURE VALUE PROJECTION ── -->
  <div id="roi-future-wrap" style="display:none;background:#fff;border:1.5px solid #e8dfc8;border-radius:14px;padding:20px;margin-bottom:20px;box-shadow:0 2px 12px rgba(0,0,0,0.06)">
    <div style="font-size:13px;font-weight:700;color:#1a1a2e;margin-bottom:16px">🔮 Future Value Projection</div>
    <div id="roi-future-grid" style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px"></div>
    <div style="margin-top:12px;font-size:11px;color:#aaa">* Based on investment type average appreciation rate</div>
  </div>

  <!-- ── EXPORT ACTIONS ── -->
  <div id="roi-export-wrap" style="display:none;display:none;gap:10px;margin-bottom:8px;flex-wrap:wrap">
    <button id="roi-copy-btn" onclick="roiCopySummary()" style="
      flex:1;min-width:140px;padding:13px;border-radius:12px;
      border:1.5px solid rgba(201,168,76,0.5);
      background:rgba(201,168,76,0.1);color:#c9a84c;
      font-size:13px;font-weight:600;cursor:pointer;
      font-family:'DM Sans',sans-serif;transition:all .25s
    ">📋 Copy ROI Summary</button>
    <button onclick="roiPrintReport()" style="
      flex:1;min-width:140px;padding:13px;border-radius:12px;
      border:1.5px solid rgba(255,255,255,0.1);
      background:rgba(255,255,255,0.04);color:var(--text2,#888);
      font-size:13px;font-weight:600;cursor:pointer;
      font-family:'DM Sans',sans-serif;transition:all .25s
    ">🖨️ Print Report</button>
  </div>
  <textarea id="roi-copy-text" style="display:none" readonly></textarea>
  `;

  calcROI();
}

/* ═══════════════════════
   CALCULATE
═══════════════════════ */
function calcROI() {
  const buy       = +document.getElementById('roi-purchase')?.value    || 0;
  const sellRaw   = +document.getElementById('roi-sell')?.value        || 0;
  const yrs       = +document.getElementById('roi-years')?.value       || 1;
  const typeKey   = document.getElementById('roi-type')?.value         || 'plot';
  const rentalRaw = +document.getElementById('roi-rental')?.value      || 0;
  const renovation= +document.getElementById('roi-renovation')?.value  || 0;
  const maintenance=+document.getElementById('roi-maintenance')?.value || 0;
  const propTax   = +document.getElementById('roi-proptax')?.value     || 0;
  const loanInt   = +document.getElementById('roi-loanint')?.value     || 0;
  const otherCost = +document.getElementById('roi-costs')?.value       || 0;

  if (!buy || !sellRaw) return;

  const sc      = ROI_SCENARIOS[roiScenario];
  const sell    = sellRaw * sc.sellMult;
  const rental  = rentalRaw * sc.rentalMult;
  const iType   = ROI_TYPES[typeKey];

  const addCosts   = renovation + maintenance + propTax + loanInt + otherCost;
  const totalInvest= buy + addCosts;
  const capitalGain= sell - buy;
  const netProfit  = (sell + rental) - totalInvest;
  const totalROI   = (netProfit / buy) * 100;
  const annualROI  = totalROI / yrs;

  /* Performance */
  const perf = ROI_PERF.find(p => totalROI >= p.min) || ROI_PERF[ROI_PERF.length - 1];
  const risk = ROI_RISK[iType.risk];
  const rec  = roiGetRecommendation(annualROI, iType.risk);

  /* ── Show sections ── */
  document.getElementById('roi-main-card').style.display     = 'block';
  document.getElementById('roi-table-wrap').style.display    = 'block';
  document.getElementById('roi-chart-wrap').style.display    = 'block';
  document.getElementById('roi-future-wrap').style.display   = 'block';
  const sg = document.getElementById('roi-summary-grid');
  sg.style.display = 'grid';
  const ew = document.getElementById('roi-export-wrap');
  ew.style.display = 'flex';

  /* ── Main card ── */
  const profitColor = netProfit >= 0 ? '#4eca80' : '#e74c3c';
  document.getElementById('roi-total-pct').textContent =
    (totalROI >= 0 ? '+' : '') + totalROI.toFixed(2) + '%';
  document.getElementById('roi-total-pct').style.color = profitColor;

  const perfBadge = document.getElementById('roi-perf-badge');
  perfBadge.textContent   = perf.label;
  perfBadge.style.background = perf.bg;
  perfBadge.style.color      = perf.color;

  const riskBadge = document.getElementById('roi-risk-badge');
  riskBadge.textContent   = risk.label;
  riskBadge.style.color   = risk.color;

  const recBadge = document.getElementById('roi-rec-badge');
  recBadge.textContent  = rec.label;
  recBadge.style.color  = rec.color;

  /* ── Summary cards ── */
  document.getElementById('roi-annual-pct').textContent =
    (annualROI >= 0 ? '+' : '') + annualROI.toFixed(2) + '%';
  document.getElementById('roi-annual-pct').style.color = annualROI >= 0 ? '#c9a84c' : '#e74c3c';

  roiAnimate('roi-net-profit',   netProfit);
  document.getElementById('roi-net-profit').style.color = netProfit >= 0 ? '#4eca80' : '#e74c3c';

  roiAnimate('roi-capital', capitalGain);
  document.getElementById('roi-capital').style.color = capitalGain >= 0 ? '#c9a84c' : '#e74c3c';

  document.getElementById('roi-total-invest').textContent = roiFmt(totalInvest);

  /* ── Breakdown table ── */
  const tableRows = [
    { item: 'Purchase Price',    formula: '(Invested)',                  amt: buy,        bold: false },
    { item: 'Selling Price',     formula: `(${sc.label} scenario)`,     amt: sell,       bold: false },
    { item: 'Capital Gain',      formula: 'Sell − Buy',                  amt: capitalGain,bold: false },
    { item: 'Rental Income',     formula: `${sc.label} scenario`,        amt: rental,     bold: false },
    { item: 'Additional Costs',  formula: 'Reno+Maint+Tax+Interest+Other', amt: -addCosts, bold: false },
    { item: 'Net Profit',        formula: '(Sell+Rental) − Total Invest', amt: netProfit,  bold: true  },
    { item: 'Total ROI',         formula: '(Net Profit / Buy) × 100',    amt: null,  pctVal: totalROI,  bold: true  },
    { item: 'Annual ROI',        formula: 'Total ROI / ' + yrs + ' yrs', amt: null,  pctVal: annualROI, bold: false },
  ];
  document.getElementById('roi-table-body').innerHTML = tableRows.map((r, i) => {
    const isNeg = (r.amt !== null ? r.amt : r.pctVal) < 0;
    const color = isNeg ? '#e74c3c' : r.bold ? '#c9a84c' : '#333';
    const valStr = r.pctVal !== undefined
      ? (r.pctVal >= 0 ? '+' : '') + r.pctVal.toFixed(2) + '%'
      : roiFmt(r.amt);
    return `
      <tr style="border-bottom:1px solid #f0e8d8;background:${r.bold?'#fdf6e3':i%2===0?'#fff':'#fdfaf4'}">
        <td style="padding:11px 16px;color:${r.bold?'#1a1a2e':'#444'};font-weight:${r.bold?'700':'400'}">${r.item}</td>
        <td style="padding:11px 16px;text-align:center;color:#888;font-size:12px">${r.formula}</td>
        <td style="padding:11px 16px;text-align:right;font-weight:${r.bold?'700':'500'};color:${color}">${valStr}</td>
      </tr>
    `;
  }).join('');

  /* ── Visual chart ── */
  const chartItems = [
    { label: 'Total Investment', val: totalInvest, color: '#c9a84c'  },
    { label: 'Total Return',     val: sell + rental, color: netProfit >= 0 ? '#4eca80' : '#e74c3c' },
    { label: 'Net Profit',       val: Math.abs(netProfit), color: netProfit >= 0 ? '#4eca80' : '#e74c3c' },
  ];
  const maxVal = Math.max(...chartItems.map(c => c.val), 1);
  document.getElementById('roi-chart-bars').innerHTML = chartItems.map(c => `
    <div style="margin-bottom:14px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px">
        <span style="font-size:12px;font-weight:600;color:#444">${c.label}</span>
        <span style="font-size:12px;font-weight:700;color:${c.color}">${roiFmt(c.val)}</span>
      </div>
      <div style="height:10px;background:#f0e8d0;border-radius:5px;overflow:hidden">
        <div style="height:100%;width:${Math.min((c.val/maxVal)*100,100)}%;background:${c.color};border-radius:5px;transition:width .7s ease"></div>
      </div>
    </div>
  `).join('');

  /* ── Future projections ── */
  const appRate = iType.avgAppreciation / 100;
  document.getElementById('roi-future-grid').innerHTML = [1, 3, 5, 10].map(yr => {
    const futureVal = sell * Math.pow(1 + appRate, yr);
    const futureProfit = futureVal - buy;
    return `
      <div style="background:#faf8f3;border:1px solid #e8dfc8;border-radius:10px;padding:14px;text-align:center">
        <div style="font-size:11px;color:#888;font-weight:600;text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px">${yr} Year${yr>1?'s':''}</div>
        <div style="font-size:1rem;font-weight:700;color:#c9a84c">${roiFmt(futureVal)}</div>
        <div style="font-size:11px;color:${futureProfit>=0?'#4eca80':'#e74c3c'};margin-top:4px;font-weight:600">
          ${futureProfit >= 0 ? '+' : ''}${roiFmt(futureProfit)}
        </div>
      </div>
    `;
  }).join('');

  /* ── Copy text ── */
  document.getElementById('roi-copy-text').value =
`=== ROI Investment Analysis ===
Scenario             : ${sc.label}
Investment Type      : ${iType.label}
Risk Level           : ${risk.label}
Recommendation       : ${rec.label}

Purchase Price       : ${roiFmt(buy)}
Selling Price        : ${roiFmt(sell)}
Duration             : ${yrs} Year${yrs>1?'s':''}

Rental Income        : ${roiFmt(rental)}
Renovation Cost      : ${roiFmt(renovation)}
Maintenance Cost     : ${roiFmt(maintenance)}
Property Tax         : ${roiFmt(propTax)}
Loan Interest        : ${roiFmt(loanInt)}
Other Costs          : ${roiFmt(otherCost)}

Capital Gain         : ${roiFmt(capitalGain)}
Net Profit           : ${roiFmt(netProfit)}
Total ROI            : ${totalROI.toFixed(2)}%
Annual ROI           : ${annualROI.toFixed(2)}%
Performance          : ${perf.label}

Future Projections (${iType.avgAppreciation}% avg appreciation):
${[1,3,5,10].map(yr => `  ${yr} Year${yr>1?'s':''}: ${roiFmt(sell * Math.pow(1+appRate,yr))}`).join('\n')}
================================
Generated by J Square Housing Tools`;
}
/* ─── 6. VALUATION ─── */
/* ═══════════════════════════════════════════════════════════
   PROPERTY VALUATION CALCULATOR v2
   - 32 Tamil Nadu Districts
   - Full Approval options
   - Full Corner Plot options
   - Detailed Breakdown Table
   - Future Appreciation Projection
   - Government Guideline Comparison
   All other features removed as requested
═══════════════════════════════════════════════════════════ */

/* ── 32 Tamil Nadu Districts ── */
const areaRates = {
  /* Salem District Areas */
  'Salem - Fairlands':              { rate: 3200, growth: 9,  guideline: 2400 },
  'Salem - Hasthampatti':           { rate: 2100, growth: 11, guideline: 1600 },
  'Salem - Seelanaickenpatti':      { rate: 1800, growth: 8,  guideline: 1350 },
  'Salem - Gorimedu':               { rate: 2600, growth: 7,  guideline: 2000 },
  'Salem - Ammapet':                { rate: 1500, growth: 12, guideline: 1100 },

  /* 32 Districts */
  'Chennai':                        { rate: 12000, growth: 7,  guideline: 9500  },
  'Coimbatore':                     { rate: 4500,  growth: 9,  guideline: 3500  },
  'Madurai':                        { rate: 3200,  growth: 8,  guideline: 2500  },
  'Tiruchirappalli':                { rate: 2800,  growth: 8,  guideline: 2200  },
  'Salem':                          { rate: 2500,  growth: 10, guideline: 1900  },
  'Tirunelveli':                    { rate: 2200,  growth: 7,  guideline: 1700  },
  'Erode':                          { rate: 2000,  growth: 9,  guideline: 1500  },
  'Tiruppur':                       { rate: 2400,  growth: 9,  guideline: 1800  },
  'Vellore':                        { rate: 2100,  growth: 8,  guideline: 1600  },
  'Thoothukudi':                    { rate: 2000,  growth: 7,  guideline: 1500  },
  'Thanjavur':                      { rate: 1800,  growth: 7,  guideline: 1400  },
  'Kanchipuram':                    { rate: 5500,  growth: 10, guideline: 4200  },
  'Chengalpattu':                   { rate: 4800,  growth: 11, guideline: 3600  },
  'Tiruvallur':                     { rate: 4200,  growth: 10, guideline: 3200  },
  'Villupuram':                     { rate: 1400,  growth: 7,  guideline: 1100  },
  'Cuddalore':                      { rate: 1500,  growth: 7,  guideline: 1150  },
  'Nagapattinam':                   { rate: 1300,  growth: 6,  guideline: 1000  },
  'Thanjavur - Kumbakonam':         { rate: 2200,  growth: 7,  guideline: 1700  },
  'Pudukkottai':                    { rate: 1400,  growth: 7,  guideline: 1050  },
  'Sivagangai':                     { rate: 1300,  growth: 6,  guideline: 1000  },
  'Ramanathapuram':                 { rate: 1200,  growth: 6,  guideline:  950  },
  'Virudhunagar':                   { rate: 1600,  growth: 7,  guideline: 1250  },
  'Dindigul':                       { rate: 1700,  growth: 8,  guideline: 1300  },
  'Karur':                          { rate: 1600,  growth: 8,  guideline: 1200  },
  'Namakkal':                       { rate: 1500,  growth: 8,  guideline: 1150  },
  'Dharmapuri':                     { rate: 1200,  growth: 7,  guideline:  950  },
  'Krishnagiri':                    { rate: 1800,  growth: 10, guideline: 1400  },
  'Hosur':                          { rate: 5000,  growth: 14, guideline: 3800  },
  'Tiruvannamalai':                 { rate: 1600,  growth: 8,  guideline: 1200  },
  'Kanyakumari':                    { rate: 2500,  growth: 7,  guideline: 1900  },
  'Tenkasi':                        { rate: 1200,  growth: 6,  guideline:  950  },
  'Kallakurichi':                   { rate: 1300,  growth: 7,  guideline: 1000  },
  'Ranipet':                        { rate: 1700,  growth: 8,  guideline: 1300  },
  'Tirupattur':                     { rate: 1500,  growth: 8,  guideline: 1150  },
  'Mayiladuthurai':                 { rate: 1400,  growth: 6,  guideline: 1050  },
  'Perambalur':                     { rate: 1200,  growth: 6,  guideline:  950  },
  'Ariyalur':                       { rate: 1100,  growth: 6,  guideline:  850  },
};

/* ── Property Types ── */
const valPropTypes = {
  residential: { label: 'Residential Plot',  multiplier: 1.00 },
  apartment:   { label: 'Apartment',         multiplier: 0.90 },
  villa:       { label: 'Villa',             multiplier: 1.15 },
  commercial:  { label: 'Commercial Land',   multiplier: 1.30 },
  agri:        { label: 'Agricultural Land', multiplier: 0.55 },
};

/* ── Approval Options ── */
const valApprovals = {
  none:       { label: 'No Approval',               premium: 0.00  },
  dtcp:       { label: 'DTCP Approved',              premium: 0.08  },
  cmda:       { label: 'CMDA Approved',              premium: 0.10  },
  rera:       { label: 'RERA Registered',            premium: 0.07  },
  panchayat:  { label: 'Panchayat Approved',         premium: 0.03  },
  highway:    { label: 'Highway / NH Approved',      premium: 0.06  },
  industrial: { label: 'SIDCO / Industrial Approved',premium: 0.12  },
};

/* ── Corner Plot Options ── */
const valCornerTypes = {
  none:         { label: 'Not a Corner Plot',             premium: 0.00 },
  single:       { label: 'Single Corner (1 Road)',        premium: 0.08 },
  double:       { label: 'Double Corner (2 Roads)',       premium: 0.15 },
  triple:       { label: 'Triple Corner (3 Roads)',       premium: 0.22 },
  east_facing:  { label: 'East Facing',                   premium: 0.05 },
  north_facing: { label: 'North Facing',                  premium: 0.04 },
};

/* ── Indian formatter ── */
function valFmt(n) {
  n = Math.round(n);
  if (n >= 10000000) return '₹' + (n / 10000000).toFixed(2) + ' Cr';
  if (n >= 100000)   return '₹' + (n / 100000).toFixed(2) + ' L';
  return '₹' + n.toLocaleString('en-IN');
}

/* ── Animated counter ── */
function valAnimate(id, target) {
  const el = document.getElementById(id);
  if (!el) return;
  const dur = 900, start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / dur, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = valFmt(target * ease);
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = valFmt(target);
  }
  requestAnimationFrame(tick);
}

/* ── Copy summary ── */
function valCopySummary() {
  const el = document.getElementById('val-copy-text');
  if (!el) return;
  navigator.clipboard.writeText(el.value).then(() => {
    const btn = document.getElementById('val-copy-btn');
    if (!btn) return;
    btn.textContent = '✅ Copied!';
    btn.style.background = 'rgba(78,202,128,0.15)';
    btn.style.borderColor = '#4eca80';
    btn.style.color = '#4eca80';
    setTimeout(() => {
      btn.textContent = '📋 Copy Summary';
      btn.style.background = 'rgba(201,168,76,0.1)';
      btn.style.borderColor = 'rgba(201,168,76,0.5)';
      btn.style.color = '#c9a84c';
    }, 2200);
  });
}

/* ── Print report ── */
function valPrintReport() {
  const txt = document.getElementById('val-copy-text')?.value || '';
  const win = window.open('', '_blank');
  win.document.write(`
    <html><head><title>Property Valuation Report</title>
    <style>
      body { font-family: 'DM Sans', sans-serif; padding: 40px; color: #1a1a2e; background: #fdf8f0; }
      pre  { font-size: 14px; line-height: 1.9; white-space: pre-wrap; }
      h2   { color: #c9a84c; font-size: 1.4rem; margin-bottom: 20px; border-bottom: 2px solid #c9a84c; padding-bottom: 10px; }
    </style></head>
    <body>
      <h2>🏠 J Square Housing — Property Valuation Report</h2>
      <pre>${txt}</pre>
    </body></html>`);
  win.document.close();
  win.print();
}

/* ════════════════════════
   BUILD PANEL
════════════════════════ */
function buildValue(b) {
  b.innerHTML = `
  <p style="color:var(--text3);font-size:13px;margin-bottom:20px">
    Tamil Nadu professional property appraisal — all 32 districts
  </p>

  <!-- ── INPUTS ROW 1 ── -->
  <div class="form-row">
    <div class="form-group">
      <label>Location / District</label>
      <select id="val-location" onchange="calcValue()" style="width:100%">
        <optgroup label="── Salem Areas ──">
          <option value="Salem - Fairlands">Salem — Fairlands</option>
          <option value="Salem - Hasthampatti">Salem — Hasthampatti</option>
          <option value="Salem - Seelanaickenpatti">Salem — Seelanaickenpatti</option>
          <option value="Salem - Gorimedu">Salem — Gorimedu</option>
          <option value="Salem - Ammapet">Salem — Ammapet</option>
        </optgroup>
        <optgroup label="── Tamil Nadu Districts ──">
          <option value="Chennai">Chennai</option>
          <option value="Coimbatore">Coimbatore</option>
          <option value="Madurai">Madurai</option>
          <option value="Tiruchirappalli">Tiruchirappalli (Trichy)</option>
          <option value="Salem">Salem (City)</option>
          <option value="Tirunelveli">Tirunelveli</option>
          <option value="Erode">Erode</option>
          <option value="Tiruppur">Tiruppur</option>
          <option value="Vellore">Vellore</option>
          <option value="Thoothukudi">Thoothukudi (Tuticorin)</option>
          <option value="Thanjavur">Thanjavur</option>
          <option value="Kanchipuram">Kanchipuram</option>
          <option value="Chengalpattu">Chengalpattu</option>
          <option value="Tiruvallur">Tiruvallur</option>
          <option value="Villupuram">Villupuram</option>
          <option value="Cuddalore">Cuddalore</option>
          <option value="Nagapattinam">Nagapattinam</option>
          <option value="Thanjavur - Kumbakonam">Thanjavur — Kumbakonam</option>
          <option value="Pudukkottai">Pudukkottai</option>
          <option value="Sivagangai">Sivagangai</option>
          <option value="Ramanathapuram">Ramanathapuram</option>
          <option value="Virudhunagar">Virudhunagar</option>
          <option value="Dindigul">Dindigul</option>
          <option value="Karur">Karur</option>
          <option value="Namakkal">Namakkal</option>
          <option value="Dharmapuri">Dharmapuri</option>
          <option value="Krishnagiri">Krishnagiri</option>
          <option value="Hosur">Hosur</option>
          <option value="Tiruvannamalai">Tiruvannamalai</option>
          <option value="Kanyakumari">Kanyakumari</option>
          <option value="Tenkasi">Tenkasi</option>
          <option value="Kallakurichi">Kallakurichi</option>
          <option value="Ranipet">Ranipet</option>
          <option value="Tirupattur">Tirupattur</option>
          <option value="Mayiladuthurai">Mayiladuthurai</option>
          <option value="Perambalur">Perambalur</option>
          <option value="Ariyalur">Ariyalur</option>
        </optgroup>
      </select>
    </div>
    <div class="form-group">
      <label>Property Type</label>
      <select id="val-proptype" onchange="calcValue()">
        ${Object.entries(valPropTypes).map(([k,v]) =>
          `<option value="${k}">${v.label}</option>`
        ).join('')}
      </select>
    </div>
  </div>

  <!-- ── INPUTS ROW 2 ── -->
  <div class="form-row">
    <div class="form-group">
      <label>Area (Sq.Ft)</label>
      <input type="number" id="val-area" value="1200" oninput="calcValue()">
    </div>
    <div class="form-group">
      <label>Corner / Facing Type</label>
      <select id="val-corner" onchange="calcValue()">
        ${Object.entries(valCornerTypes).map(([k,v]) =>
          `<option value="${k}">${v.label}${v.premium > 0 ? ' (+' + (v.premium*100) + '%)' : ''}</option>`
        ).join('')}
      </select>
    </div>
  </div>

  <!-- ── INPUTS ROW 3 ── -->
  <div class="form-group">
    <label>Approval Type</label>
    <select id="val-approval" onchange="calcValue()">
      ${Object.entries(valApprovals).map(([k,v]) =>
        `<option value="${k}">${v.label}${v.premium > 0 ? ' (+' + (v.premium*100) + '%)' : ''}</option>`
      ).join('')}
    </select>
  </div>

  <!-- ── MAIN RESULT CARD ── -->
  <div id="val-main-card" style="
    background:linear-gradient(135deg,#1C1A14 0%,#2a2218 100%);
    border-radius:16px;padding:24px;margin:20px 0;display:none
  ">
    <div style="font-size:11px;letter-spacing:.08em;color:#c9a84c;text-transform:uppercase;font-weight:600;margin-bottom:6px">Final Market Value</div>
    <div id="val-total" style="font-size:2.2rem;font-weight:700;color:#fff">—</div>
    <div id="val-total-sub" style="font-size:12px;color:rgba(255,255,255,0.4);margin-top:4px"></div>
  </div>

  <!-- ── SUMMARY CARDS ── -->
  <div id="val-summary-cards" style="display:none;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:20px">
    <div style="background:#fff;border:1.5px solid #e8dfc8;border-radius:12px;padding:16px;text-align:center;box-shadow:0 2px 8px rgba(0,0,0,0.05)">
      <div style="font-size:10px;color:#888;font-weight:600;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px">Rate / Sq.Ft</div>
      <div id="val-rate" style="font-size:1rem;font-weight:700;color:#c9a84c">—</div>
    </div>
    <div style="background:#fff;border:1.5px solid #e8dfc8;border-radius:12px;padding:16px;text-align:center;box-shadow:0 2px 8px rgba(0,0,0,0.05)">
      <div style="font-size:10px;color:#888;font-weight:600;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px">Range (Low)</div>
      <div id="val-low" style="font-size:1rem;font-weight:700;color:#c9a84c">—</div>
    </div>
    <div style="background:#fff;border:1.5px solid #e8dfc8;border-radius:12px;padding:16px;text-align:center;box-shadow:0 2px 8px rgba(0,0,0,0.05)">
      <div style="font-size:10px;color:#888;font-weight:600;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px">Range (High)</div>
      <div id="val-high" style="font-size:1rem;font-weight:700;color:#c9a84c">—</div>
    </div>
  </div>

  <!-- ── DETAILED BREAKDOWN TABLE ── -->
  <div id="val-table-wrap" style="display:none;background:#fff;border:1.5px solid #e8dfc8;border-radius:14px;overflow:hidden;margin-bottom:20px;box-shadow:0 2px 12px rgba(0,0,0,0.06)">
    <div style="padding:14px 20px;background:#F5F0E8;border-bottom:1px solid #e8dfc8">
      <span style="font-size:13px;font-weight:700;color:#1a1a2e">📋 Detailed Valuation Breakdown</span>
    </div>
    <div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse;font-size:13px">
        <thead>
          <tr style="background:#fdf6e3">
            <th style="padding:11px 16px;text-align:left;color:#888;font-weight:600;font-size:11px;text-transform:uppercase;letter-spacing:.05em;border-bottom:1px solid #e8dfc8">Component</th>
            <th style="padding:11px 16px;text-align:center;color:#888;font-weight:600;font-size:11px;text-transform:uppercase;letter-spacing:.05em;border-bottom:1px solid #e8dfc8">Formula</th>
            <th style="padding:11px 16px;text-align:right;color:#888;font-weight:600;font-size:11px;text-transform:uppercase;letter-spacing:.05em;border-bottom:1px solid #e8dfc8">Amount</th>
          </tr>
        </thead>
        <tbody id="val-table-body"></tbody>
      </table>
    </div>
  </div>

  <!-- ── FUTURE APPRECIATION ── -->
  <div id="val-future-wrap" style="display:none;background:#fff;border:1.5px solid #e8dfc8;border-radius:14px;padding:20px;margin-bottom:20px;box-shadow:0 2px 12px rgba(0,0,0,0.06)">
    <div style="font-size:13px;font-weight:700;color:#1a1a2e;margin-bottom:4px">🔮 Future Appreciation Projection</div>
    <div id="val-growth-note" style="font-size:11px;color:#aaa;margin-bottom:16px"></div>
    <div id="val-future-grid" style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px"></div>
  </div>

  <!-- ── GOVERNMENT GUIDELINE COMPARISON ── -->
  <div id="val-guide-wrap" style="display:none;background:#fff;border:1.5px solid #e8dfc8;border-radius:14px;padding:20px;margin-bottom:20px;box-shadow:0 2px 12px rgba(0,0,0,0.06)">
    <div style="font-size:13px;font-weight:700;color:#1a1a2e;margin-bottom:16px">🏛️ Government Guideline Value Comparison</div>
    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px">
      <div style="background:#F5F0E8;border-radius:10px;padding:14px;text-align:center">
        <div style="font-size:10px;color:#888;font-weight:600;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px">Guideline Value</div>
        <div id="val-guide-val" style="font-size:1rem;font-weight:700;color:#1a1a2e">—</div>
        <div style="font-size:10px;color:#aaa;margin-top:3px">Govt. registered rate</div>
      </div>
      <div style="background:#F5F0E8;border-radius:10px;padding:14px;text-align:center">
        <div style="font-size:10px;color:#888;font-weight:600;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px">Market Value</div>
        <div id="val-guide-mkt" style="font-size:1rem;font-weight:700;color:#c9a84c">—</div>
        <div style="font-size:10px;color:#aaa;margin-top:3px">Current estimate</div>
      </div>
      <div style="background:#F5F0E8;border-radius:10px;padding:14px;text-align:center">
        <div style="font-size:10px;color:#888;font-weight:600;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px">Difference</div>
        <div id="val-guide-diff" style="font-size:1rem;font-weight:700;color:#4eca80">—</div>
        <div style="font-size:10px;color:#aaa;margin-top:3px">Above guideline</div>
      </div>
      <div style="background:#F5F0E8;border-radius:10px;padding:14px;text-align:center">
        <div style="font-size:10px;color:#888;font-weight:600;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px">% Above Guideline</div>
        <div id="val-guide-pct" style="font-size:1rem;font-weight:700;color:#4eca80">—</div>
        <div style="font-size:10px;color:#aaa;margin-top:3px">Market premium</div>
      </div>
    </div>

    <!-- Guideline visual bar -->
    <div style="margin-top:16px">
      <div style="display:flex;justify-content:space-between;font-size:11px;color:#888;margin-bottom:6px">
        <span>Guideline Value</span>
        <span>Market Value</span>
      </div>
      <div style="height:8px;background:#f0e8d0;border-radius:4px;overflow:hidden;position:relative">
        <div id="val-guide-bar-g" style="height:100%;background:#818cf8;border-radius:4px;position:absolute;left:0;transition:width .7s ease"></div>
        <div id="val-guide-bar-m" style="height:100%;background:#c9a84c;border-radius:4px;position:absolute;left:0;transition:width .7s ease;opacity:0.7"></div>
      </div>
      <div id="val-guide-bar-note" style="font-size:11px;color:#888;margin-top:6px;text-align:center"></div>
    </div>
  </div>

  <!-- ── EXPORT ACTIONS ── -->
  <div id="val-export-wrap" style="display:none;gap:10px;flex-wrap:wrap;margin-bottom:8px">
    <button id="val-copy-btn" onclick="valCopySummary()" style="
      flex:1;min-width:140px;padding:13px;border-radius:12px;
      border:1.5px solid rgba(201,168,76,0.5);
      background:rgba(201,168,76,0.1);color:#c9a84c;
      font-size:13px;font-weight:600;cursor:pointer;
      font-family:'DM Sans',sans-serif;transition:all .25s
    ">📋 Copy Summary</button>
    <button onclick="valPrintReport()" style="
      flex:1;min-width:140px;padding:13px;border-radius:12px;
      border:1.5px solid rgba(255,255,255,0.1);
      background:rgba(255,255,255,0.04);color:#888;
      font-size:13px;font-weight:600;cursor:pointer;
      font-family:'DM Sans',sans-serif;transition:all .25s
    ">🖨️ Print Report</button>
  </div>
  <textarea id="val-copy-text" style="display:none" readonly></textarea>
  `;

  calcValue();
}

/* ════════════════════════
   CALCULATE
════════════════════════ */
function calcValue() {
  const loc        = document.getElementById('val-location')?.value   || 'Salem - Fairlands';
  const propKey    = document.getElementById('val-proptype')?.value   || 'residential';
  const area       = +document.getElementById('val-area')?.value      || 0;
  const cornerKey  = document.getElementById('val-corner')?.value     || 'none';
  const approvalKey= document.getElementById('val-approval')?.value   || 'none';

  if (!area) return;

  const locData      = areaRates[loc];
  const propData     = valPropTypes[propKey];
  const cornerData   = valCornerTypes[cornerKey];
  const approvalData = valApprovals[approvalKey];

  const baseRate          = locData.rate;
  const growth            = locData.growth;
  const baseValue         = area * baseRate;
  const cornerPremium     = baseValue * cornerData.premium;
  const approvalPremium   = baseValue * approvalData.premium;
  const propAdjustment    = baseValue * (propData.multiplier - 1);
  const finalValue        = baseValue + cornerPremium + approvalPremium + propAdjustment;
  const finalRate         = Math.round(finalValue / area);
  const rangeLow          = finalValue * 0.92;
  const rangeHigh         = finalValue * 1.08;
  const guideVal          = area * locData.guideline;
  const guideDiff         = finalValue - guideVal;
  const guidePct          = ((guideDiff / guideVal) * 100).toFixed(1);
  const appRate           = growth / 100;

  /* ── Show all sections ── */
  ['val-main-card','val-table-wrap','val-future-wrap','val-guide-wrap','val-export-wrap']
    .forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = id === 'val-export-wrap' ? 'flex' : 'block';
    });
  document.getElementById('val-summary-cards').style.display = 'grid';

  /* ── Main card ── */
  valAnimate('val-total', finalValue);
  document.getElementById('val-total-sub').textContent =
    `₹${finalRate.toLocaleString('en-IN')} per sq.ft · ${area.toLocaleString('en-IN')} sq.ft · ${loc}`;

  /* ── Summary cards ── */
  document.getElementById('val-rate').textContent = `₹${finalRate.toLocaleString('en-IN')}/sq.ft`;
  valAnimate('val-low',  rangeLow);
  valAnimate('val-high', rangeHigh);

  /* ── Breakdown table ── */
  const tableRows = [
    {
      comp: 'Base Rate Per Sq.Ft',
      formula: `${loc} market rate`,
      amt: `₹${baseRate.toLocaleString('en-IN')}/sq.ft`,
      bold: false
    },
    {
      comp: 'Area',
      formula: 'Input area',
      amt: `${area.toLocaleString('en-IN')} sq.ft`,
      bold: false
    },
    {
      comp: 'Base Property Value',
      formula: `₹${baseRate.toLocaleString('en-IN')} × ${area.toLocaleString('en-IN')}`,
      amt: valFmt(baseValue),
      bold: false
    },
    {
      comp: `Corner / Facing (${cornerData.label})`,
      formula: cornerData.premium > 0 ? `${(cornerData.premium*100)}% of base` : 'Not applied',
      amt: cornerData.premium > 0 ? valFmt(cornerPremium) : '—',
      bold: false
    },
    {
      comp: `Approval (${approvalData.label})`,
      formula: approvalData.premium > 0 ? `${(approvalData.premium*100)}% of base` : 'Not applied',
      amt: approvalData.premium > 0 ? valFmt(approvalPremium) : '—',
      bold: false
    },
    {
      comp: `Property Type (${propData.label})`,
      formula: `Multiplier ×${propData.multiplier}`,
      amt: propAdjustment !== 0 ? (propAdjustment > 0 ? '+' : '') + valFmt(propAdjustment) : '—',
      bold: false
    },
    {
      comp: 'Final Rate Per Sq.Ft',
      formula: 'Final Value ÷ Area',
      amt: `₹${finalRate.toLocaleString('en-IN')}/sq.ft`,
      bold: false
    },
    {
      comp: 'Final Market Value',
      formula: 'Base + All Premiums + Type Adj.',
      amt: valFmt(finalValue),
      bold: true
    },
  ];

  document.getElementById('val-table-body').innerHTML = tableRows.map((r, i) => `
    <tr style="border-bottom:1px solid #f0e8d8;background:${r.bold ? '#fdf6e3' : i % 2 === 0 ? '#fff' : '#fdfaf4'}">
      <td style="padding:11px 16px;color:${r.bold ? '#1a1a2e' : '#444'};font-weight:${r.bold ? '700' : '400'}">${r.comp}</td>
      <td style="padding:11px 16px;text-align:center;color:#888;font-size:12px">${r.formula}</td>
      <td style="padding:11px 16px;text-align:right;font-weight:${r.bold ? '700' : '500'};color:${r.bold ? '#c9a84c' : '#333'}">${r.amt}</td>
    </tr>
  `).join('');

  /* ── Future projection ── */
  document.getElementById('val-growth-note').textContent =
    `Based on ${loc} average annual growth rate of ${growth}%`;

  document.getElementById('val-future-grid').innerHTML = [1, 3, 5, 10].map(yr => {
    const futureVal  = finalValue * Math.pow(1 + appRate, yr);
    const gain       = futureVal - finalValue;
    const gainPct    = ((gain / finalValue) * 100).toFixed(1);
    return `
      <div style="background:#faf8f3;border:1px solid #e8dfc8;border-radius:10px;padding:14px;text-align:center">
        <div style="font-size:11px;color:#888;font-weight:600;text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px">${yr} Year${yr > 1 ? 's' : ''}</div>
        <div style="font-size:0.98rem;font-weight:700;color:#c9a84c">${valFmt(futureVal)}</div>
        <div style="font-size:11px;color:#4eca80;margin-top:4px;font-weight:600">+${valFmt(gain)}</div>
        <div style="font-size:10px;color:#aaa;margin-top:2px">+${gainPct}% total</div>
      </div>
    `;
  }).join('');

  /* ── Guideline comparison ── */
  document.getElementById('val-guide-val').textContent  = valFmt(guideVal);
  document.getElementById('val-guide-mkt').textContent  = valFmt(finalValue);
  document.getElementById('val-guide-diff').textContent = valFmt(guideDiff);
  document.getElementById('val-guide-pct').textContent  = `+${guidePct}%`;

  const maxBar = Math.max(guideVal, finalValue);
  const gPct   = Math.round((guideVal   / maxBar) * 100);
  const mPct   = Math.round((finalValue / maxBar) * 100);
  const gBar   = document.getElementById('val-guide-bar-g');
  const mBar   = document.getElementById('val-guide-bar-m');
  if (gBar) gBar.style.width = gPct + '%';
  if (mBar) mBar.style.width = mPct + '%';
  const noteEl = document.getElementById('val-guide-bar-note');
  if (noteEl) noteEl.textContent =
    `Market value is ${guidePct}% above government guideline value`;

  /* ── Copy text ── */
  document.getElementById('val-copy-text').value =
`=== Property Valuation Report ===
Location             : ${loc}
Property Type        : ${propData.label}
Area                 : ${area.toLocaleString('en-IN')} sq.ft
Corner / Facing      : ${cornerData.label}
Approval             : ${approvalData.label}

Valuation Breakdown:
  Base Value         : ${valFmt(baseValue)}
  Corner Premium     : ${cornerData.premium > 0 ? valFmt(cornerPremium) : 'Not applied'}
  Approval Premium   : ${approvalData.premium > 0 ? valFmt(approvalPremium) : 'Not applied'}
  Type Adjustment    : ${valFmt(propAdjustment)}

Final Market Value   : ${valFmt(finalValue)}
Rate Per Sq.Ft       : ₹${finalRate.toLocaleString('en-IN')}
Estimated Range      : ${valFmt(rangeLow)} – ${valFmt(rangeHigh)}

Future Projections   (${growth}% / yr):
  1 Year             : ${valFmt(finalValue * Math.pow(1 + appRate, 1))}
  3 Years            : ${valFmt(finalValue * Math.pow(1 + appRate, 3))}
  5 Years            : ${valFmt(finalValue * Math.pow(1 + appRate, 5))}
  10 Years           : ${valFmt(finalValue * Math.pow(1 + appRate, 10))}

Guideline Value      : ${valFmt(guideVal)}
Market Value         : ${valFmt(finalValue)}
Difference           : ${valFmt(guideDiff)}
Market Premium       : +${guidePct}% above guideline
================================
Generated by J Square Housing Tools`;
}

/* ─── 7. VASTU ─── */
/* ═══════════════════════════════════════════════════════════
   🧭 VASTU SHASTRA TOOL — ENHANCED v3
   ✅ All 8 directions in every room select
   ✅ Real verified Vastu shastra data
   ✅ Smooth animations throughout
   ✅ Light theme (#f5f0e8) compatible
   ✅ Drop-in: buildVastu(b) + calcVastu()
═══════════════════════════════════════════════════════════ */

/* ════════════════════════════════════════════
   DATA — Verified Vastu Shastra Knowledge
════════════════════════════════════════════ */

const vastuDirs = [
  {
    dir:'N', icon:'⬆️', name:'North', tamil:'வடக்கு',
    score:88, element:'Water / நீர்', lord:'குபேரன் (Kubera)', color:'#2e7d52', rating:'A',
    dosh: 'குறைவு', energy: 'Positive',
    pros:[
      'குபேரன் அதிபதி — செல்வம் & வளம் தொடர்ந்து வரும்',
      'நீர் தத்துவம் — வணிக வெற்றி & பண வரவு சிறப்பாகும்',
      'Career & தொழில் வாய்ப்புகள் அதிகரிக்கும்',
      'வடக்கு வாயில் — அதிர்ஷ்டம் & புதிய வாய்ப்புகள் தரும்',
      'நீர் தொட்டி, Borewell வைக்க மிகவும் ஏற்றது'
    ],
    cons:[
      'வடக்கு பகுதியில் மேட்டு நிலம் (elevated ground) வேண்டாம்',
      'Heavy construction — வடக்கு side-ல் தவிர்க்கவும்',
      'வடக்கு சுவர் மற்ற சுவர்களை விட உயரமாக கட்டக்கூடாது'
    ],
    rooms:{ mainDoor:'✅ சிறந்தது', kitchen:'❌ தவிர்க்கவும்', master:'✅ நல்லது', pooja:'✅ நல்லது', toilet:'⚠️ கவனம்', study:'✅ நல்லது', staircase:'❌ தவிர்க்கவும்', water:'✅✅ Best' },
    remedy:'வடக்கு திசையில் தண்ணீர் தொட்டி அல்லது Fountain வைக்கவும். குபேர யந்திரம் வடக்கு நோக்கி வைக்கவும். வீட்டின் வடக்கு பகுதியை எப்போதும் திறந்தும் சுத்தமாகவும் வைக்கவும்.'
  },
  {
    dir:'NE', icon:'↗️', name:'North East', tamil:'வடகிழக்கு — ஈசான்யம்',
    score:96, element:'Space / ஆகாயம்', lord:'ஈசான் — Lord Shiva', color:'#b8860b', rating:'A+',
    dosh: 'இல்லை', energy: 'Divine',
    pros:[
      'மிக மிக சிறந்த திசை — ஈசான்யம் என்று அழைக்கப்படும்',
      'Lord Shiva அதிபதி — ஆன்மீக சக்தி & தெய்வ அருள் கிடைக்கும்',
      'குடும்ப ஆரோக்கியம், ஒற்றுமை & மகிழ்ச்சி நிலைக்கும்',
      'Mental clarity, நல்ல முடிவுகள் எடுக்கும் திறன் வளரும்',
      'பூஜை அறை — இறைவன் அருள் நேரடியாக கிடைக்கும்',
      'சூரிய கிரணங்கள் அதிகாலையில் நேரடியாக படும் — சுப அலைகள்'
    ],
    cons:[
      'இந்த மூலையில் கழிப்பறை வைத்தால் கடுமையான நஷ்டம்',
      'Septic tank, Heavy storage — கண்டிப்பாக வேண்டாம்',
      'Cut corner (வெட்டப்பட்ட மூலை) — மிகவும் சரியில்லை',
      'இங்கு தடுக்கும் கட்டிடம் — வெளிச்சம் & காற்று தடைபடக்கூடாது'
    ],
    rooms:{ mainDoor:'✅✅ Best', kitchen:'❌❌ கூடாதே', master:'⚠️ தவிர்க்கவும்', pooja:'✅✅ Best', toilet:'❌❌ கண்டிப்பாக வேண்டாம்', study:'✅ நல்லது', staircase:'❌ வேண்டாம்', water:'✅✅ Best' },
    remedy:'ஈசான்ய மூலையில் பூஜை அறை அமைக்கவும். தூய்மையாகவும் திறந்தும் வைக்கவும். Tulsi செடி வைக்கலாம். தண்ணீர் தொட்டி வைக்கலாம். யாரும் தூங்காத open space விடுவது சிறந்தது.'
  },
  {
    dir:'E', icon:'🌅', name:'East', tamil:'கிழக்கு',
    score:92, element:'Fire / சூரியன்', lord:'இந்திரன் (Indra)', color:'#b8860b', rating:'A+',
    dosh: 'குறைவு', energy: 'Energetic',
    pros:[
      'இந்திரன் அதிபதி — அதிகாரம், புகழ் & அங்கீகாரம் கிடைக்கும்',
      'சூரிய ஆற்றல் நேரடியாக கிடைக்கும் — ஆரோக்கியம் சிறக்கும்',
      'கிழக்கு வாயில் — Health, Immunity & Vitality அதிகரிக்கும்',
      'தலைவர் குணம், சமூக அந்தஸ்து உயரும்',
      'குழந்தைகளின் படிப்பு & வளர்ச்சிக்கு மிகவும் நல்லது'
    ],
    cons:[
      'கிழக்கு பக்கம் உயரமான சுவர் கட்டக்கூடாது',
      'பெரிய மரங்கள் கிழக்கில் நடவேண்டாம் — சூரிய ஒளி தடைபடும்',
      'Septic tank கிழக்கில் வேண்டாம்'
    ],
    rooms:{ mainDoor:'✅✅ Best', kitchen:'⚠️ சாதாரணம்', master:'✅ நல்லது', pooja:'✅ நல்லது', toilet:'❌ வேண்டாம்', study:'✅ நல்லது', staircase:'❌ தவிர்க்கவும்', water:'✅ நல்லது' },
    remedy:'கிழக்கு பக்கம் எப்போதும் திறந்த வெளியாக வைக்கவும். Open veranda அல்லது Garden வைக்கலாம். காலையில் கிழக்கு நோக்கி சூரிய வணக்கம் செய்யுங்கள்.'
  },
  {
    dir:'SE', icon:'↘️', name:'South East', tamil:'தென்கிழக்கு — அக்னி மூலை',
    score:65, element:'Fire / அக்னி', lord:'அக்னி (Fire God)', color:'#e67e22', rating:'C+',
    dosh: 'மத்திமம்', energy: 'Fiery',
    pros:[
      'அக்னி மூலை — சமையலறைக்கு மட்டும் மிகவும் சிறந்தது',
      'சமையல் சக்தி, குடும்ப ஆரோக்கியம் நல்லதாகும்',
      'தொழில் திறன், உற்சாகம் & Action energy கிடைக்கும்'
    ],
    cons:[
      'இங்கு Master bedroom வைத்தால் — நிதி நஷ்டம், உறவு பிரச்னை',
      'பெண்களுக்கு உடல் நல பிரச்னை வரலாம்',
      'வாயில் இங்கு வைத்தால் — செலவு அதிகரிக்கும்',
      'Toilet இங்கு வைத்தால் — தீவிர நஷ்டம்'
    ],
    rooms:{ mainDoor:'⚠️ தவிர்க்கவும்', kitchen:'✅✅ Best', master:'❌❌ கூடாதே', pooja:'⚠️ கவனம்', toilet:'❌ தவிர்க்கவும்', study:'⚠️ சாதாரணம்', staircase:'✅ நல்லது', water:'❌ வேண்டாம்' },
    remedy:'SE மூலையில் சமையலறை மட்டும் வைக்கவும். வேறு எந்த அறையும் வேண்டாம். Red color lamp அல்லது Agni Yantra வைக்கலாம். சமையல் நிலை (Stove) கிழக்கு நோக்கி வைக்கவும்.'
  },
  {
    dir:'S', icon:'⬇️', name:'South', tamil:'தெற்கு',
    score:50, element:'Earth / பூமி', lord:'யமன் (Yama)', color:'#e74c3c', rating:'C',
    dosh: 'அதிகம்', energy: 'Heavy',
    pros:[
      'Master bedroom-க்கு நல்லது — நிலையான தூக்கம்',
      'Heavy storage, Parking — நல்லது',
      'தெற்கு சுவர் உயரமாக இருந்தால் — பாதுகாப்பு தரும்'
    ],
    cons:[
      'யமன் அதிபதி — வாயில் இங்கு வைத்தால் தீவிர நஷ்டம்',
      'செல்வம் வெளியேறும், கடன் சேரும்',
      'குடும்ப ஒற்றுமை குறையும்',
      'தெற்கு சரிவு நிலம் — மிகவும் சரியில்லை'
    ],
    rooms:{ mainDoor:'❌❌ கண்டிப்பாக வேண்டாம்', kitchen:'⚠️ தவிர்க்கவும்', master:'✅ நல்லது', pooja:'❌ கூடாது', toilet:'✅ நல்லது', study:'⚠️ சாதாரணம்', staircase:'✅ நல்லது', water:'❌ வேண்டாம்' },
    remedy:'தெற்கு சுவர் மிகவும் உயரமாக கட்டவும். Heavy furniture தெற்கு side-ல் வைக்கவும். Yama Yantra வழிபாடு செய்யவும். தெற்கில் Vastu Pyramid வைக்கலாம்.'
  },
  {
    dir:'SW', icon:'↙️', name:'South West', tamil:'தென்மேற்கு — நைருதி',
    score:42, element:'Earth / பூமி', lord:'நிருதி (Nirriti)', color:'#c0392b', rating:'D',
    dosh: 'தீவிரம்', energy: 'Destructive',
    pros:[
      'Master bedroom மட்டும் — நிலையான தூக்கம், குடும்ப stability',
      'Heavy storage, Underground tank — நல்லது'
    ],
    cons:[
      'நிருதி அதிபதி — மிக கவலை தரும் திசை',
      'வாயில் — கடுமையான நஷ்டம், கடன், நோய்',
      'Open space இங்கு வைத்தால் — செல்வம் வெளியேறும்',
      'Cut corner (வெட்டப்பட்ட மூலை) — குடும்பம் சிதறும்',
      'தீ விபத்து, திருட்டு, விபத்து வரலாம்'
    ],
    rooms:{ mainDoor:'❌❌ கண்டிப்பாக வேண்டாம்', kitchen:'❌ கூடாது', master:'✅ மட்டும் நல்லது', pooja:'❌❌ கண்டிப்பாக வேண்டாம்', toilet:'⚠️ கவனம்', study:'❌ வேண்டாம்', staircase:'✅ நல்லது', water:'❌❌ கூடாதே' },
    remedy:'SW மூலையில் Heavy materials, Granite rocks வைக்கவும். Vastu Pyramid & Nirriti Yantra வைக்கவும். Pitru Tarpan (பித்ரு வழிபாடு) தவறாமல் செய்யவும். இந்த திசையில் Construction உயரமாக இருக்கட்டும்.'
  },
  {
    dir:'W', icon:'🌇', name:'West', tamil:'மேற்கு',
    score:72, element:'Water / நீர்', lord:'வருணன் (Varuna)', color:'#6c5ce7', rating:'B',
    dosh: 'குறைவு', energy: 'Stable',
    pros:[
      'வருணன் அதிபதி — நல்ல வருமானம் & சேமிப்பு',
      'குழந்தைகள் அறை, Study room-க்கு சிறந்தது',
      'படிப்பு, கல்வி, Skills development-க்கு உகந்தது',
      'மாலை சூரிய வெளிச்சம் — Vitamin D நல்லது'
    ],
    cons:[
      'வாயில் மேற்கில் வைத்தால் — நல்லதில்லை',
      'Master bedroom சரியில்லை — ஆழமான தூக்கம் கிடைக்காது',
      'மேற்கு சரிவு — நடுத்தர நிலை'
    ],
    rooms:{ mainDoor:'⚠️ சாதாரணம்', kitchen:'⚠️ கவனம்', master:'⚠️ சாதாரணம்', pooja:'⚠️ கவனம்', toilet:'✅ நல்லது', study:'✅✅ Best', staircase:'✅ நல்லது', water:'⚠️ சாதாரணம்' },
    remedy:'மேற்கு பக்கம் Study room அல்லது Children bedroom அமைக்கவும். Varuna Yantra வைக்கவும். Blue அல்லது White color சுவர் நல்லது. மேற்கு Garden சிறப்பாக இருக்கும்.'
  },
  {
    dir:'NW', icon:'↖️', name:'North West', tamil:'வடமேற்கு — வாயு மூலை',
    score:78, element:'Air / வாயு', lord:'வாயு (Wind God)', color:'#2e7d52', rating:'B+',
    dosh: 'சிறியது', energy: 'Mobile',
    pros:[
      'வாயு அதிபதி — பயண வாய்ப்பு & நெட்வொர்க்கிங் சிறக்கும்',
      'Guest room, Garage-க்கு சிறந்தது',
      'வணிக connections, நல்ல தொடர்புகள் கிடைக்கும்',
      'Toilet, Bathroom-க்கு ஏற்றது'
    ],
    cons:[
      'நிரந்தர Master bedroom — சரியில்லை (அமைதியின்மை)',
      'பெண்களுக்கு மன அமைதி குறையலாம்',
      'வாயு சக்தி — ஸ்திரமற்ற மனநிலை வரலாம்'
    ],
    rooms:{ mainDoor:'✅ நல்லது', kitchen:'⚠️ கவனம்', master:'⚠️ சாதாரணம்', pooja:'⚠️ கவனம்', toilet:'✅✅ Best', study:'⚠️ சாதாரணம்', staircase:'✅ நல்லது', water:'⚠️ கவனம்' },
    remedy:'வடமேற்கு திசையில் Garage, Guest room அல்லது Store room அமைக்கவும். Vayu Yantra வைக்கவும். White அல்லது Light grey color சுவர் நல்லது. Cow dung (சாணம்) floor — ஆன்மீக சக்தி தரும்.'
  },
];

/* ── Room Placement — Complete Vastu Rules ── */
const vastuRooms = {
  mainDoor:  {
    label:'Main Door / வாயில்',
    best:['N','NE','E','NW'],
    neutral:['W'],
    avoid:['S','SW','SE'],
    tip:'வடக்கு, வடகிழக்கு, கிழக்கு — மிக சிறந்த வாயில் திசைகள்'
  },
  kitchen:   {
    label:'Kitchen / சமையலறை',
    best:['SE','S'],
    neutral:['E','W'],
    avoid:['NE','N','SW','NW'],
    tip:'தென்கிழக்கு (அக்னி மூலை) — சமையலறைக்கு மட்டும் Best'
  },
  master:    {
    label:'Master Bedroom',
    best:['SW','S','W'],
    neutral:['NW','N'],
    avoid:['NE','E','SE'],
    tip:'தென்மேற்கு — Master bedroom-க்கு ஒரே ஒரு சிறந்த திசை'
  },
  pooja:     {
    label:'Pooja Room / பூஜை',
    best:['NE','N','E'],
    neutral:['W'],
    avoid:['S','SW','SE','NW'],
    tip:'வடகிழக்கு ஈசான்யம் — பூஜை அறைக்கு தெய்வீக திசை'
  },
  toilet:    {
    label:'Toilet / கழிப்பறை',
    best:['NW','W','S'],
    neutral:['SW'],
    avoid:['NE','N','E'],
    tip:'வடமேற்கு — கழிப்பறைக்கு சிறந்த திசை'
  },
  study:     {
    label:'Study / படிப்பு அறை',
    best:['W','N','NE','E'],
    neutral:['NW'],
    avoid:['S','SW','SE'],
    tip:'மேற்கு, வடக்கு, வடகிழக்கு — படிப்புக்கு ஏற்ற திசைகள்'
  },
  staircase: {
    label:'Staircase / படிக்கட்டு',
    best:['S','W','SW'],
    neutral:['SE','NW'],
    avoid:['NE','N','E'],
    tip:'தெற்கு அல்லது மேற்கு — படிக்கட்டுக்கு சரியான இடம்'
  },
  water:     {
    label:'Water Tank / தண்ணீர்',
    best:['NE','N','E'],
    neutral:['NW','W'],
    avoid:['SW','SE','S'],
    tip:'வடகிழக்கு — தண்ணீர் தொட்டிக்கு மிகவும் சிறந்தது'
  },
};

/* ── Shape Data ── */
const vastuShapes = {
  square:    { label:'Square / சதுரம்',        score:98, note:'மிக மிக சிறந்த வடிவம். Brahma veedhi — எல்லா திசையும் சமம். எல்லா வளமும் கிடைக்கும். அனைத்து Vastu norms சரியாக apply ஆகும்.' },
  rectangle: { label:'Rectangle / செவ்வகம்',  score:88, note:'நல்ல வடிவம். நீளம் > அகலம் (ratio 1:1.5 சிறந்தது, 1:2 அதிகம் வேண்டாம்). கிழக்கு-மேற்கு நீளமாக இருந்தால் — prosperity, வடக்கு-தெற்கு நீளமாக இருந்தால் — moderate.' },
  north_ext: { label:'North Extended / வடக்கு நீட்சி', score:86, note:'வடக்கு திசையில் extended plot. குபேரன் அருள் — செல்வம், வணிக வெற்றி, நீர் வளம் அதிகரிக்கும். மிகவும் நல்ல வடிவம்.' },
  east_ext:  { label:'East Extended / கிழக்கு நீட்சி',  score:83, note:'கிழக்கு திசையில் extended plot. இந்திரன் அருள் — ஆரோக்கியம், புகழ், சமூக உயர்வு கிடைக்கும். நல்ல வடிவம்.' },
  northeast: { label:'NE Extended / ஈசான்ய நீட்சி',    score:94, note:'வடகிழக்கு நீட்சி — மிகவும் சிறந்தது! ஈசான்யம் extended ஆனால் தெய்வீக ஆசி. ஆன்மீகம், செல்வம், ஆரோக்கியம் எல்லாம் சிறக்கும்.' },
  corner:    { label:'Corner Plot / கோண மனை',          score:78, note:'இரண்டு சாலை intersection. Dual energy. கவனமாக plan செய்தால் நல்லது. SE அல்லது SW corner-ல் இருந்தால் — remedies தேவை. NE, N, E corner-ல் இருந்தால் — நல்லது.' },
  irregular: { label:'Irregular / ஒழுங்கற்ற',          score:42, note:'ஒழுங்கற்ற வடிவம் — கடுமையான Vastu dosha. குடும்ப ஒற்றுமை பாதிக்கும், நிதி பிரச்னை வரலாம். கட்டாயம் Vastu expert ஆலோசனை தேவை. Remedies mandatory.' },
  triangular:{ label:'Triangle / முக்கோணம்',           score:25, note:'மிகவும் சரியில்லை. அக்னி வடிவம் — தீ விபத்து, சண்டை, பிரிவு வரலாம். நீதி வழக்குகள் சேரலாம். Vastu சாஸ்திரம் இந்த வடிவத்தை கண்டிப்பாக தவிர்க்க சொல்கிறது.' },
  gaumukhi:  { label:'Gaumukhi / பின்பக்கம் அகலம்',    score:72, note:'முன்பக்கம் குறுகி, பின்பக்கம் அகலமான plot. Residential-க்கு நல்லது. வீட்டில் வசிப்பவர்களுக்கு நல்ல பலன். Commercial-க்கு அவ்வளவு நல்லதில்லை.' },
  simhamukhi:{ label:'Simhamukhi / முன்பக்கம் அகலம்',  score:68, note:'முன்பக்கம் அகலமாகவும், பின்பக்கம் குறுகியும் உள்ள plot. Commercial-க்கு நல்லது, Residential-க்கு சரியில்லை. Vastu remedies recommend.' },
};

/* ── Slope Data ── */
const vastuSlopes = {
  ne_low:  { label:'NE Low — ஈசான்யம் தாழ்வு', score:98, note:'மிக மிக சிறந்த slope. வடகிழக்கு மூலை மிகவும் தாழ்வாக இருக்கும். நீர் ஈசான்யத்தில் தேங்கும் — தெய்வீக ஆசி, செல்வம், ஆரோக்கியம்.' },
  n_low:   { label:'North Low — வடக்கு தாழ்வு',  score:88, note:'நல்ல slope. வடக்கு side தாழ்வு. குபேர ஆசி — வணிக வெற்றி, பண வரவு. நீர் வடக்கில் தேங்கும்.' },
  e_low:   { label:'East Low — கிழக்கு தாழ்வு',  score:85, note:'நல்ல slope. கிழக்கு side தாழ்வு. சூரிய ஆற்றல் முழுவதும் கிடைக்கும். ஆரோக்கியம், புகழ் சிறக்கும்.' },
  flat:    { label:'Flat — சமதளம்',              score:72, note:'Neutral slope. சமதளம் — நல்லதும் இல்லை, கெட்டதும் இல்லை. நீர் drainage சரியாக NE நோக்கி போகும்படி arrange செய்யவும்.' },
  nw_low:  { label:'NW Low — வடமேற்கு தாழ்வு',  score:62, note:'சாதாரண slope. வாயு சக்தி அதிகமாகும். Travel, Movement அதிகரிக்கும். ஆனால் ஸ்திரமற்ற மனநிலை வரலாம். Remedies பயனுள்ளது.' },
  w_low:   { label:'West Low — மேற்கு தாழ்வு',   score:55, note:'சாதாரணத்திற்கும் கீழே. கவனம் தேவை. வருணன் சக்தி imbalance ஆகலாம். Vastu correction recommend.' },
  se_low:  { label:'SE Low — தென்கிழக்கு தாழ்வு',score:38, note:'சரியில்லை. அக்னி அதிகமாகும் — தீ விபத்து, சண்டை வரலாம். Remedies mandatory. SE area-ல் Heavy construction தேவை.' },
  s_low:   { label:'South Low — தெற்கு தாழ்வு',  score:35, note:'மிகவும் சரியில்லை. யமன் சக்தி imbalance — நோய், மரணம், தொழில் நஷ்டம் வரலாம். Immediate Vastu remedies mandatory.' },
  sw_low:  { label:'SW Low — தென்மேற்கு தாழ்வு', score:22, note:'மிக மிக கெட்டது. நிருதி dosha தீவிரம். SW எப்போதும் மிக உயர்வாக இருக்கவேண்டும். Immediate expert consultation அவசியம்.' },
};

/* ─── CSS variables ─── */
const _VS_CSS = `
<style id="vastu-styles">
:root{
  --v-gold:#b8860b;--v-gold-lt:#fdf3d0;--v-gold-border:rgba(184,134,11,.25);
  --v-green:#2e7d52;--v-red:#c0392b;--v-card:#fff;
  --v-border:#e2d9c0;--v-bg:#faf8f3;--v-text:#1a1a1a;--v-muted:#777;
}
.vcard{background:var(--v-card);border:1.5px solid var(--v-border);border-radius:14px;padding:20px;margin-bottom:14px;box-shadow:0 2px 10px rgba(0,0,0,.05)}
.vstep-lbl{font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--v-gold);margin-bottom:2px}
.vstep-ttl{font-size:15px;font-weight:800;color:var(--v-text);margin-bottom:2px}
.vstep-sub{font-size:11px;color:var(--v-muted);margin-bottom:16px}
.vrow2{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px}
.vfg{display:flex;flex-direction:column;gap:4px}
.vlabel{font-size:10px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:#555}
.vinput{width:100%;padding:9px 12px;border:1.5px solid var(--v-border);border-radius:10px;font-size:12px;color:var(--v-text);background:var(--v-bg);font-family:inherit;outline:none;cursor:pointer;transition:border-color .2s,box-shadow .2s,background .2s}
.vinput:hover{border-color:rgba(184,134,11,.5);background:#fdf9f0}
.vinput:focus{border-color:var(--v-gold);box-shadow:0 0 0 3px rgba(184,134,11,.12);background:#fff}
/* compass buttons */
.vdir-btn{padding:10px 4px;text-align:center;border-radius:10px;cursor:pointer;transition:all .25s cubic-bezier(.34,1.56,.64,1);border:1.5px solid var(--v-border);background:var(--v-bg);user-select:none}
.vdir-btn:hover{border-color:rgba(184,134,11,.5);background:#fdf6e3;transform:scale(1.06)}
.vdir-btn.vdir-active{border:2px solid var(--v-gold);background:var(--v-gold-lt);box-shadow:0 0 0 4px rgba(184,134,11,.15);transform:scale(1.1);animation:vpulse 1.2s ease 1}
.vdir-btn .vdir-code{font-size:11px;font-weight:800;color:#555;margin-top:3px;transition:color .2s}
.vdir-btn.vdir-active .vdir-code{color:#7a5500}
/* pill */
.vdir-pill{display:inline-flex;align-items:center;gap:8px;background:var(--v-gold-lt);border:1.5px solid var(--v-gold);border-radius:24px;padding:7px 18px;transition:all .3s ease}
/* main CTA */
.vgenbtn{width:100%;padding:15px;border-radius:14px;border:none;background:linear-gradient(135deg,#a07010,#c9960f,#e8b840);color:#fff;font-size:14px;font-weight:800;cursor:pointer;font-family:inherit;letter-spacing:.02em;position:relative;overflow:hidden;transition:transform .18s,box-shadow .18s;margin-bottom:18px;box-shadow:0 6px 20px rgba(184,134,11,.28)}
.vgenbtn:hover{transform:translateY(-2px);box-shadow:0 10px 30px rgba(184,134,11,.38)}
.vgenbtn:active{transform:translateY(1px)}
.vgenbtn-shine{position:absolute;top:0;left:-80%;width:50%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent);animation:vshine 2.5s infinite}
/* export btns */
.vebtn{flex:1;padding:12px;border-radius:12px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;transition:all .2s;border:1.5px solid var(--v-border);background:var(--v-bg);color:#555}
.vebtn.vgold{border-color:var(--v-gold-border);background:rgba(184,134,11,.07);color:#8a6008}
.vebtn:hover{transform:translateY(-2px);box-shadow:0 4px 14px rgba(0,0,0,.08)}
/* room select status dot */
.vroom-wrap{display:flex;flex-direction:column;gap:4px}
.vroom-bar{height:3px;background:#f0ebe0;border-radius:2px;overflow:hidden;margin-top:2px}
.vroom-fill{height:100%;border-radius:2px;transition:width .5s cubic-bezier(.4,0,.2,1),background .3s ease;width:0%}
/* score panel */
.vscore-panel{background:linear-gradient(145deg,#15110a,#1e1608);border-radius:18px;padding:26px;margin-bottom:14px}
.vscore-num{font-size:54px;font-weight:900;line-height:1;transition:color .5s ease}
/* mini stat cards */
.vmini{background:#fff;border:1.5px solid var(--v-border);border-radius:12px;padding:12px;text-align:center}
.vmini-val{font-size:24px;font-weight:800;line-height:1}
.vmini-bar{height:3px;background:#f0ebe0;border-radius:2px;margin-top:8px;overflow:hidden}
.vmini-fill{height:100%;border-radius:2px;transition:width .9s cubic-bezier(.4,0,.2,1)}
/* direction grid highlight */
.vdm{text-align:center;padding:10px 6px;border-radius:10px;background:var(--v-bg);border:1.5px solid var(--v-border);transition:all .3s cubic-bezier(.34,1.56,.64,1)}
.vdm.vdm-hl{border-color:var(--v-gold);background:var(--v-gold-lt);transform:scale(1.07);box-shadow:0 0 0 3px rgba(184,134,11,.15)}
/* table rows */
.vrt tr{transition:background .15s}.vrt tr:hover td{background:#fdf9f0}
/* fade-in for results */
.vfadein{animation:vfadein .5s ease both}
@keyframes vpulse{0%{box-shadow:0 0 0 0 rgba(184,134,11,.4)}70%{box-shadow:0 0 0 10px rgba(184,134,11,0)}100%{box-shadow:0 0 0 0 rgba(184,134,11,0)}}
@keyframes vshine{0%{left:-80%}100%{left:150%}}
@keyframes vfadein{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
@keyframes vscorein{from{opacity:0;transform:scale(.7)}to{opacity:1;transform:scale(1)}}
@media(max-width:520px){.vrow2{grid-template-columns:1fr}.vrow2.v3{grid-template-columns:repeat(3,1fr)}}
</style>`;

let vastuSelDir = 'E';
let vastuCopyText = '';

/* ── utils ── */
const _vg = id => document.getElementById(id);
const _vset = (id, val) => { const e=_vg(id); if(e) e.textContent=val; };
const _vhtml = (id, val) => { const e=_vg(id); if(e) e.innerHTML=val; };
const _vbar = (id, pct, delay=50) => {
  const e=_vg(id); if(!e) return;
  e.style.width='0%';
  setTimeout(()=>{ e.style.width=pct+'%'; }, delay);
};

function vastuCopy() {
  if (!vastuCopyText) return;
  navigator.clipboard.writeText(vastuCopyText).then(() => {
    const b=_vg('vastu-copy-btn'); if(!b) return;
    b.textContent='✅ Copied!'; b.style.color='#2e7d52';
    setTimeout(()=>{ b.textContent='📋 Copy Report'; b.style.color='#8a6008'; }, 2200);
  });
}

function vastuPrint() {
  if (!vastuCopyText) return;
  const w = window.open('','_blank');
  w.document.write(`<html><head><title>Vastu Report</title>
    <style>body{font-family:system-ui,sans-serif;padding:40px;color:#111}
    pre{font-size:13px;line-height:1.9;white-space:pre-wrap}
    h2{color:#b8860b;border-bottom:2px solid #b8860b;padding-bottom:8px;margin-bottom:18px}
    </style></head><body>
    <h2>🧭 J Square Housing — Vastu Shastra Report</h2>
    <pre>${vastuCopyText}</pre></body></html>`);
  w.document.close(); w.print();
}

function vastuSelectDir(d) {
  vastuSelDir = d;
  vastuDirs.forEach(dir => {
    const el = _vg('vdir-' + dir.dir); if (!el) return;
    if (dir.dir === d) { el.classList.add('vdir-active'); }
    else { el.classList.remove('vdir-active'); }
  });
  /* update pill */
  const found = vastuDirs.find(x => x.dir === d);
  _vset('vastu-pill-code', found.dir);
  _vset('vastu-pill-txt',  found.name + ' (' + found.tamil + ') — Score ' + found.score + ' · ' + found.rating);
  calcVastu();
}

/* ════════════════════════════════════════
   BUILD PANEL
════════════════════════════════════════ */
function buildVastu(b) {

  /* compass 3×3 */
  const grid = [
    [['NW','↖️'],['N','⬆️'],['NE','↗️']],
    [['W','🌇'], [null,'🧭'], ['E','🌅']],
    [['SW','↙️'],['S','⬇️'],['SE','↘️']],
  ];

  const compassHTML = grid.map(row => row.map(([d, icon]) => {
    if (!d) return `<div style="display:flex;align-items:center;justify-content:center;font-size:1.8rem;opacity:.2">${icon}</div>`;
    const found = vastuDirs.find(x => x.dir === d);
    const active = d === vastuSelDir;
    return `<div id="vdir-${d}" class="vdir-btn ${active ? 'vdir-active' : ''}" onclick="vastuSelectDir('${d}')">
      <div style="font-size:1.25rem">${icon}</div>
      <div class="vdir-code">${d}</div>
      <div style="font-size:9px;color:${found.color};font-weight:700;margin-top:1px">${found.score}</div>
    </div>`;
  }).join('')).join('');

  /* direction options for room selects — ALL 8 */
  const dirOpts = vastuDirs.map(d =>
    `<option value="${d.dir}">${d.icon} ${d.dir} — ${d.name} (${d.tamil.split('—')[0].trim()})</option>`
  ).join('');

  const roomHTML = Object.entries(vastuRooms).map(([key, room]) => `
    <div class="vroom-wrap">
      <label class="vlabel">${room.label}</label>
      <select id="vastu-room-${key}" class="vinput" onchange="vastuUpdateRoom('${key}'); calcVastu();">
        <option value="none">— தெரியவில்லை —</option>
        ${dirOpts}
      </select>
      <div class="vroom-bar"><div class="vroom-fill" id="vrb-${key}"></div></div>
    </div>`).join('');

  const shapeOpts = Object.entries(vastuShapes).map(([k,v]) => `<option value="${k}">${v.label}</option>`).join('');
  const slopeOpts = Object.entries(vastuSlopes).map(([k,v]) => `<option value="${k}">${v.label}</option>`).join('');

  const dirGridHTML = vastuDirs.map(d => `
    <div id="vdm-${d.dir}" class="vdm">
      <div style="font-size:1rem">${d.icon}</div>
      <div style="font-size:10px;font-weight:800;color:#1a1a1a;margin:2px 0">${d.dir}</div>
      <div style="font-size:14px;font-weight:800;color:${d.color}">${d.score}</div>
      <div style="font-size:8px;color:#bbb;margin-top:1px">${d.rating}</div>
    </div>`).join('');

  const foundInit = vastuDirs.find(x => x.dir === vastuSelDir);

  b.innerHTML = _VS_CSS + `
  <!-- STEP 1 -->
  <div class="vcard">
    <div class="vstep-lbl">Step 1 of 3</div>
    <div class="vstep-ttl">Plot Facing Direction</div>
    <div class="vstep-sub">எந்த திசை? — Tap to select your plot's facing direction</div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;max-width:290px;margin:0 auto 14px">
      ${compassHTML}
    </div>
    <div style="display:flex;justify-content:center">
      <div class="vdir-pill" id="vastu-dir-pill">
        <span id="vastu-pill-code" style="font-size:16px;font-weight:800;color:#7a5500">${foundInit.dir}</span>
        <span id="vastu-pill-txt" style="font-size:11px;font-weight:600;color:#8a6008">${foundInit.name} (${foundInit.tamil}) — Score ${foundInit.score} · ${foundInit.rating}</span>
      </div>
    </div>
  </div>

  <!-- STEP 2 -->
  <div class="vcard">
    <div class="vstep-lbl">Step 2 of 3</div>
    <div class="vstep-ttl">Plot Details</div>
    <div class="vstep-sub">பிளாட் விவரங்கள் — score live update ஆகும்</div>
    <div class="vrow2">
      <div class="vfg"><label class="vlabel">Plot Size (Sq.Ft)</label>
        <input type="number" id="vastu-size" value="2400" min="100" class="vinput" oninput="calcVastu()"></div>
      <div class="vfg"><label class="vlabel">Property Type</label>
        <select id="vastu-proptype" class="vinput" onchange="calcVastu()">
          <option value="residential">Residential / வீட்டு மனை</option>
          <option value="villa">Villa / தனி வீடு</option>
          <option value="apartment">Apartment / பிளாட்</option>
          <option value="commercial">Commercial / வணிக</option>
          <option value="farm">Farm Land / விவசாயம்</option>
        </select></div>
    </div>
    <div class="vrow2">
      <div class="vfg"><label class="vlabel">Plot Shape / வடிவம்</label>
        <select id="vastu-shape" class="vinput" onchange="calcVastu()">${shapeOpts}</select></div>
      <div class="vfg"><label class="vlabel">Plot Slope / சரிவு</label>
        <select id="vastu-slope" class="vinput" onchange="calcVastu()">${slopeOpts}</select></div>
    </div>
  </div>

  <!-- STEP 3 -->
  <div class="vcard">
    <div class="vstep-lbl">Step 3 of 3</div>
    <div class="vstep-ttl">Room Placement</div>
    <div class="vstep-sub">அறைகள் எந்த திசையில் உள்ளன? — 8 directions available (optional)</div>
    <div class="vrow2">
      ${roomHTML}
    </div>
  </div>

  <button class="vgenbtn" onclick="calcVastu()">
    <div class="vgenbtn-shine"></div>
    🧭 Generate Full Vastu Report — விரிவான அறிக்கை →
  </button>

  <!-- ══ RESULTS ══ -->
  <div id="vastu-result" style="display:none">

    <!-- Mini stats -->
    <div class="vrow2 v3" style="grid-template-columns:repeat(3,1fr);margin-bottom:14px">
      <div class="vmini">
        <div class="vmini-val" id="vls-dir" style="color:#b8860b">—</div>
        <div style="font-size:9px;color:#aaa;text-transform:uppercase;letter-spacing:.05em;margin-top:2px">Direction</div>
        <div class="vmini-bar"><div class="vmini-fill" id="vlb-dir" style="background:#b8860b"></div></div>
      </div>
      <div class="vmini">
        <div class="vmini-val" id="vls-shape" style="color:#6c5ce7">—</div>
        <div style="font-size:9px;color:#aaa;text-transform:uppercase;letter-spacing:.05em;margin-top:2px">Shape</div>
        <div class="vmini-bar"><div class="vmini-fill" id="vlb-shape" style="background:#6c5ce7"></div></div>
      </div>
      <div class="vmini">
        <div class="vmini-val" id="vls-slope" style="color:#2e7d52">—</div>
        <div style="font-size:9px;color:#aaa;text-transform:uppercase;letter-spacing:.05em;margin-top:2px">Slope</div>
        <div class="vmini-bar"><div class="vmini-fill" id="vlb-slope" style="background:#2e7d52"></div></div>
      </div>
    </div>

    <!-- Score panel -->
    <div class="vscore-panel vfadein">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:14px">
        <div>
          <div style="font-size:9px;letter-spacing:.1em;color:rgba(212,168,83,.6);text-transform:uppercase;font-weight:700;margin-bottom:6px">Overall Vastu Score</div>
          <div id="vastu-score-big" class="vscore-num" style="color:#d4a853;animation:vscorein .5s ease both">—</div>
          <div id="vastu-grade-label" style="font-size:13px;font-weight:700;color:#d4a853;margin-top:6px"></div>
        </div>
        <div style="text-align:right">
          <div id="vastu-dir-name" style="font-size:14px;font-weight:700;color:#fff;margin-bottom:4px"></div>
          <div id="vastu-dir-element" style="font-size:11px;color:rgba(255,255,255,.4)"></div>
          <div id="vastu-dir-lord" style="font-size:11px;color:#d4a853;margin-top:2px"></div>
          <div id="vastu-dir-energy" style="font-size:10px;color:rgba(255,255,255,.3);margin-top:2px"></div>
        </div>
      </div>
      <div style="height:8px;background:rgba(255,255,255,.1);border-radius:4px;overflow:hidden;margin-top:16px">
        <div id="vastu-score-bar" style="height:100%;border-radius:4px;transition:width 1.3s cubic-bezier(.4,0,.2,1);background:linear-gradient(90deg,#b8860b,#4eca80);width:0%"></div>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:14px">
        <span id="vastu-rating-badge" style="padding:3px 12px;border-radius:12px;font-size:11px;font-weight:700;background:rgba(184,134,11,.18);color:#d4a853;border:1px solid rgba(184,134,11,.3)"></span>
        <span id="vastu-shape-badge" style="padding:3px 12px;border-radius:12px;font-size:11px;font-weight:700;background:rgba(108,92,231,.15);color:#9b6df5;border:1px solid rgba(108,92,231,.3)"></span>
        <span id="vastu-slope-badge" style="padding:3px 12px;border-radius:12px;font-size:11px;font-weight:700;background:rgba(46,125,82,.12);color:#2e7d52;border:1px solid rgba(46,125,82,.25)"></span>
        <span id="vastu-rooms-badge" style="padding:3px 12px;border-radius:12px;font-size:11px;font-weight:700;background:rgba(52,152,219,.12);color:#2980b9;border:1px solid rgba(52,152,219,.25)"></span>
      </div>
    </div>

    <!-- Pros & Cons -->
    <div class="vrow2 vfadein" style="animation-delay:.05s">
      <div class="vcard" style="margin-bottom:0">
        <div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.08em;color:#2e7d52;margin-bottom:10px">✅ நன்மைகள் — Benefits</div>
        <div id="vastu-pros" style="font-size:12px;color:#444;line-height:1.9"></div>
      </div>
      <div class="vcard" style="margin-bottom:0">
        <div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.08em;color:#c0392b;margin-bottom:10px">⚠️ தீமைகள் — Cautions</div>
        <div id="vastu-cons" style="font-size:12px;color:#444;line-height:1.9"></div>
      </div>
    </div>

    <!-- Room table -->
    <div class="vcard vfadein" style="padding:0;overflow:hidden;animation-delay:.1s;margin-top:14px">
      <div style="padding:12px 18px;background:#f7f2e8;border-bottom:1px solid #e2d9c0;font-size:12px;font-weight:700;color:#1a1a1a">🏠 Room Placement Analysis — அறை வாஸ்து</div>
      <div style="overflow-x:auto">
        <table class="vrt" style="width:100%;border-collapse:collapse;font-size:12px">
          <thead>
            <tr style="background:#faf8f2">
              <th style="padding:8px 14px;text-align:left;color:#aaa;font-size:10px;font-weight:700;text-transform:uppercase;border-bottom:1px solid #eee8d8">அறை</th>
              <th style="padding:8px 14px;text-align:center;color:#aaa;font-size:10px;font-weight:700;text-transform:uppercase;border-bottom:1px solid #eee8d8">திசை</th>
              <th style="padding:8px 14px;text-align:center;color:#aaa;font-size:10px;font-weight:700;text-transform:uppercase;border-bottom:1px solid #eee8d8">வாஸ்து</th>
              <th style="padding:8px 14px;text-align:right;color:#aaa;font-size:10px;font-weight:700;text-transform:uppercase;border-bottom:1px solid #eee8d8">சிறந்த திசை</th>
            </tr>
          </thead>
          <tbody id="vastu-room-table"></tbody>
        </table>
      </div>
    </div>

    <!-- All 8 directions grid -->
    <div class="vcard vfadein" style="padding:0;overflow:hidden;animation-delay:.15s">
      <div style="padding:12px 18px;background:#f7f2e8;border-bottom:1px solid #e2d9c0;font-size:12px;font-weight:700;color:#1a1a1a">📊 எல்லா 8 திசை மதிப்பெண்கள்</div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;padding:14px">
        ${dirGridHTML}
      </div>
    </div>

    <!-- Remedy -->
    <div style="background:#fffbf2;border:1.5px solid rgba(184,134,11,.3);border-radius:14px;padding:20px;margin-bottom:14px" class="vfadein" style="animation-delay:.2s">
      <div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.1em;color:#b8860b;margin-bottom:10px">💊 Vastu Remedy — தீர்வு</div>
      <div id="vastu-remedy" style="font-size:13px;color:#555;line-height:1.9"></div>
    </div>

    <!-- Shape & Slope -->
    <div class="vrow2 vfadein" style="animation-delay:.25s">
      <div class="vcard" style="margin-bottom:0">
        <div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.06em;color:#1a1a1a;margin-bottom:8px">📐 Plot Shape</div>
        <div id="vastu-shape-note" style="font-size:12px;color:#555;line-height:1.8;white-space:pre-line"></div>
      </div>
      <div class="vcard" style="margin-bottom:0">
        <div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.06em;color:#1a1a1a;margin-bottom:8px">📉 Plot Slope</div>
        <div id="vastu-slope-note" style="font-size:12px;color:#555;line-height:1.8;white-space:pre-line"></div>
      </div>
    </div>

    <!-- Export -->
    <div style="display:flex;gap:10px;margin-top:4px">
      <button id="vastu-copy-btn" class="vebtn vgold" onclick="vastuCopy()">📋 Copy Report</button>
      <button class="vebtn" onclick="vastuPrint()">🖨️ Print Report</button>
    </div>

  </div><!-- /vastu-result -->
  `;

  calcVastu();
}

/* ── Room bar live update ── */
function vastuUpdateRoom(key) {
  const room = vastuRooms[key];
  const sv   = _vg('vastu-room-' + key)?.value;
  const fill = _vg('vrb-' + key);
  if (!fill || !sv || sv === 'none') { if(fill) fill.style.width='0%'; return; }
  const isBest    = room.best.includes(sv);
  const isNeutral = room.neutral.includes(sv);
  const isAvoid   = room.avoid.includes(sv);
  fill.style.background = isBest ? '#2e7d52' : isAvoid ? '#c0392b' : '#e67e22';
  fill.style.width = isBest ? '100%' : isAvoid ? '18%' : '60%';
}

/* ════════════════════════════════════════
   CALCULATE
════════════════════════════════════════ */
function calcVastu() {
  const dirData   = vastuDirs.find(x => x.dir === vastuSelDir); if (!dirData) return;
  const shapeKey  = _vg('vastu-shape')?.value  || 'square';
  const slopeKey  = _vg('vastu-slope')?.value  || 'flat';
  const shapeData = vastuShapes[shapeKey];
  const slopeData = vastuSlopes[slopeKey];

  /* room score */
  let roomTotal=0, roomCount=0;
  Object.entries(vastuRooms).forEach(([key,room]) => {
    const sv = _vg('vastu-room-'+key)?.value;
    if (!sv || sv==='none') return;
    roomCount++;
    if (room.best.includes(sv))    roomTotal += 100;
    else if (room.avoid.includes(sv)) roomTotal += 20;
    else roomTotal += 62;
  });
  const roomScore  = roomCount > 0 ? roomTotal / roomCount : 75;
  const finalScore = Math.round(dirData.score*.40 + shapeData.score*.20 + slopeData.score*.20 + roomScore*.20);

  /* update pill */
  _vset('vastu-pill-code', dirData.dir);
  _vset('vastu-pill-txt', dirData.name+' ('+dirData.tamil.split('—')[0].trim()+') — Score '+dirData.score+' · '+dirData.rating);

  /* show result */
  const resultEl = _vg('vastu-result');
  if (!resultEl) return;
  resultEl.style.display = 'block';

  /* mini stats */
  _vset('vls-dir',   dirData.score);   _vbar('vlb-dir',   dirData.score,   80);
  _vset('vls-shape', shapeData.score); _vbar('vlb-shape', shapeData.score, 130);
  _vset('vls-slope', slopeData.score); _vbar('vlb-slope', slopeData.score, 180);

  /* score */
  const scoreColor = finalScore>=80?'#4eca80':finalScore>=60?'#d4a853':finalScore>=40?'#e67e22':'#c0392b';
  const grade = finalScore>=90?'A+ — மிக சிறந்தது 🏆':
                finalScore>=80?'A  — சிறந்தது ✅':
                finalScore>=70?'B+ — நல்லது 👍':
                finalScore>=60?'B  — சாதாரணம் ⚠️':
                finalScore>=50?'C  — Remedies தேவை 🔧':'D  — தவிர்க்கவும் ❌';

  const scoreEl = _vg('vastu-score-big');
  if (scoreEl) { scoreEl.textContent=finalScore+'/100'; scoreEl.style.color=scoreColor; scoreEl.style.animation='none'; void scoreEl.offsetWidth; scoreEl.style.animation='vscorein .5s ease both'; }
  _vset('vastu-grade-label', grade);
  _vset('vastu-dir-name',    dirData.icon+' '+dirData.name+' — '+dirData.tamil);
  _vset('vastu-dir-element', 'Element: '+dirData.element);
  _vset('vastu-dir-lord',    'அதிபதி: '+dirData.lord);
  _vset('vastu-dir-energy',  'Energy: '+dirData.energy+' · Dosha: '+dirData.dosh);
  setTimeout(()=>{ const b=_vg('vastu-score-bar'); if(b) b.style.width=finalScore+'%'; }, 120);

  /* badges */
  _vset('vastu-rating-badge', 'Rating: '+dirData.rating);
  _vset('vastu-shape-badge',  'Shape: '+shapeData.score+'/100');
  _vset('vastu-slope-badge',  'Slope: '+slopeData.score+'/100');
  _vset('vastu-rooms-badge',  'Rooms: '+roomCount+' checked');

  /* pros cons */
  _vhtml('vastu-pros', dirData.pros.map(p=>'<div style="margin-bottom:5px">✅ '+p+'</div>').join(''));
  _vhtml('vastu-cons', dirData.cons.map(c=>'<div style="margin-bottom:5px">⚠️ '+c+'</div>').join(''));

  /* remedy & notes */
  _vset('vastu-remedy',     dirData.remedy);
  _vset('vastu-shape-note', shapeData.label+' — '+shapeData.score+'/100\n'+shapeData.note);
  _vset('vastu-slope-note', slopeData.label+' — '+slopeData.score+'/100\n'+slopeData.note);

  /* room table */
  let rows='';
  Object.entries(vastuRooms).forEach(([key,room]) => {
    const sv = _vg('vastu-room-'+key)?.value;
    if (!sv||sv==='none') return;
    const isBest    = room.best.includes(sv);
    const isNeutral = room.neutral.includes(sv);
    const isAvoid   = room.avoid.includes(sv);
    const col = isBest?'#2e7d52':isAvoid?'#c0392b':'#e67e22';
    const bg  = isBest?'rgba(46,125,82,.1)':isAvoid?'rgba(192,57,43,.1)':'rgba(230,126,34,.1)';
    const txt = isBest?'✅ சிறந்தது':isAvoid?'❌ சரியில்லை':'⚠️ சாதாரணம்';
    rows += `<tr style="border-bottom:1px solid #f5f0e4">
      <td style="padding:10px 14px;color:#444;font-size:12px">${room.label}</td>
      <td style="padding:10px 14px;text-align:center;font-weight:700;color:#1a1a1a;font-size:12px">${sv}</td>
      <td style="padding:10px 14px;text-align:center">
        <span style="padding:3px 10px;border-radius:10px;font-size:11px;font-weight:700;background:${bg};color:${col};border:1px solid ${col}40">${txt}</span>
      </td>
      <td style="padding:10px 14px;text-align:right;color:#aaa;font-size:11px">${room.best.join(', ')}</td>
    </tr>`;
  });
  _vhtml('vastu-room-table', rows ||
    `<tr><td colspan="4" style="padding:16px;text-align:center;color:#aaa;font-size:12px">Room directions தேர்ந்தெடுக்கவில்லை</td></tr>`);

  /* highlight direction grid */
  vastuDirs.forEach(d => {
    const el = _vg('vdm-'+d.dir); if (!el) return;
    if (d.dir===vastuSelDir) el.classList.add('vdm-hl');
    else el.classList.remove('vdm-hl');
  });

  /* copy text */
  vastuCopyText =
`=== Vastu Shastra Report — J Square Housing ===
Plot Direction  : ${dirData.dir} — ${dirData.name} (${dirData.tamil})
Element         : ${dirData.element}
திசை அதிபதி    : ${dirData.lord}
Energy Type     : ${dirData.energy}
Vastu Dosha     : ${dirData.dosh}
Direction Score : ${dirData.score}/100 (Rating: ${dirData.rating})
Shape           : ${shapeData.label} (${shapeData.score}/100)
Slope           : ${slopeData.label} (${slopeData.score}/100)
Rooms Checked   : ${roomCount}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Overall Score   : ${finalScore}/100
Grade           : ${grade}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

நன்மைகள் (Benefits):
${dirData.pros.map(p=>'  ✅ '+p).join('\n')}

தீமைகள் (Cautions):
${dirData.cons.map(c=>'  ⚠️ '+c).join('\n')}

Vastu Remedy:
  ${dirData.remedy}

Plot Shape Note:
  ${shapeData.note}

Plot Slope Note:
  ${slopeData.note}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Generated by J Square Housing Vastu Tool`;
}
/* ─── 8. MUHURTHAM ─── */
const tamilMonths=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const nakshatras=['Ashwini','Rohini','Mrigasira','Punarvasu','Pushya','Uttara Phalguni','Hasta','Chitra','Swati','Vishaka','Anuradha','Uttarashada','Shravana','Dhanishtha','Uttara Bhadrapada','Revati'];
const auspiciousWeekdays=[0,3,4]; // Sun, Thu, Fri
const avoidDays=[2,6]; // Tue, Sat
let mhMonth=new Date().getMonth();
let mhFilter='all';

function buildMuhurtham(b){
  const now=new Date();
  b.innerHTML=`
    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:20px;flex-wrap:wrap;gap:12px">
      <div>
        <div style="font-family:'Syne',sans-serif;font-size:1.1rem;font-weight:700">Smart Property Scheduler 2026</div>
        <div style="font-size:12px;color:var(--text3);margin-top:4px">Strategic timing for Tamil Nadu real estate</div>
      </div>
     <div class="mh-clock" style="background:#fff8e8;border:1.5px solid #e8dfc8;border-radius:10px;padding:10px 16px;text-align:right">
       <div class="mh-time" id="mh-time" style="color:#c9a84c;font-size:1.3rem;font-weight:700;font-family:monospace">00:00:00</div>
       <div class="mh-date-str" id="mh-today" style="color:#888;font-size:11px;margin-top:3px">—</div>
     </div>
    </div>
    <div class="mh-stats">
      <div class="mh-stat"><div class="mh-stat-label">Best for Registration</div><div class="mh-stat-val" id="mh-cnt-land">— Days</div></div>
      <div class="mh-stat"><div class="mh-stat-label">Muhurtham Windows</div><div class="mh-stat-val" id="mh-cnt-muhu">— Days</div></div>
      <div class="mh-stat"><div class="mh-stat-label">Market Strategy</div><div class="mh-stat-val gold">Hold / Buy</div></div>
    </div>
    <div class="mh-months" id="mh-month-strip"></div>
    <div class="mh-pills">
      <button class="mh-pill on" onclick="mhSetFilter('all',this)">அனைத்து நாட்கள்</button>
      <button class="mh-pill" onclick="mhSetFilter('muhurtham',this)">✨ நல்ல நாட்கள்</button>
      <button class="mh-pill" onclick="mhSetFilter('land',this)">🏢 பதிவு நாள்</button>
    </div>
    <div class="mh-detail" id="mh-detail" style="display:none">
      <button class="mh-detail-close" onclick="document.getElementById('mh-detail').style.display='none'">✕</button>
      <div class="mh-detail-date" id="mh-dp-date"></div>
      <div class="mh-detail-star" id="mh-dp-star"></div>
      <div class="mh-detail-metrics" id="mh-dp-metrics"></div>
      <div class="mh-detail-note" id="mh-dp-note"></div>
    </div>
    <div class="mh-day-grid" id="mh-day-list"></div>`;
  mhRenderMonths();
  mhRenderDays();
  mhClock();
  setInterval(mhClock,1000);
}
function mhClock(){
  const el=document.getElementById('mh-time');
  const td=document.getElementById('mh-today');
  if(!el) return;
  const n=new Date();
  el.textContent=n.toLocaleTimeString('en-IN');
  if(td) td.textContent=n.toLocaleDateString('en-IN',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
}
function mhRenderMonths(){
  const strip=document.getElementById('mh-month-strip');
  if(!strip) return;
  strip.innerHTML = tamilMonths.map((m,i) =>
  `<button class="mh-month-btn${i===mhMonth?' on':''}" onclick="mhSetMonth(${i})" style="
    padding:7px 14px;border-radius:8px;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:12px;font-weight:600;border:1.5px solid ${i===mhMonth?'#c9a84c':'#e8dfc8'};background:${i===mhMonth?'#c9a84c':'#fff'};color:${i===mhMonth?'#1a1a2e':'#888'};transition:all .2s;white-space:nowrap
  ">${m} 2026</button>`
).join('');
}
function mhSetMonth(m){mhMonth=m;mhRenderMonths();mhRenderDays();}
function mhSetFilter(f,btn){
  mhFilter=f;
  document.querySelectorAll('.mh-pill').forEach(p=>p.classList.remove('on'));
  btn.classList.add('on');
  mhRenderDays();
}
function mhRenderDays(){
  const days=getDaysInMonth(2026,mhMonth);
  const dayNames=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  let muhuCnt=0,landCnt=0;
  const allDays=days.map(d=>{
    const wd=d.getDay();
    const dayNum=d.getDate();
    const nak=nakshatras[(dayNum+mhMonth*3)%nakshatras.length];
    const isMuhu=auspiciousWeekdays.includes(wd)&&dayNum%7!==0&&dayNum!==13;
    const isLand=isMuhu&&(wd===4||wd===0)&&dayNum>5&&dayNum<27;
    const isAvoid=avoidDays.includes(wd)||(dayNum===14)||(dayNum===29);
    if(isMuhu) muhuCnt++;
    if(isLand) landCnt++;
    return{d,wd,dayNum,nak,isMuhu,isLand,isAvoid};
  });
  const el=document.getElementById('mh-cnt-land');
  const em=document.getElementById('mh-cnt-muhu');
  if(el) el.textContent=landCnt+' Days';
  if(em) em.textContent=muhuCnt+' Days';
  const filtered=mhFilter==='muhurtham'?allDays.filter(x=>x.isMuhu):
                 mhFilter==='land'?allDays.filter(x=>x.isLand):allDays;
  const grid=document.getElementById('mh-day-list');
  if(!grid) return;
  grid.innerHTML=filtered.map(({d,wd,dayNum,nak,isMuhu,isLand,isAvoid})=>`
    <div class="mh-day ${isLand?'land':isMuhu?'muhurtham':''}" onclick="mhShowDetail(${dayNum},'${dayNames[wd]}','${nak}',${isMuhu},${isLand},${isAvoid})">
      <div class="mh-day-badge ${isLand?'green':isMuhu?'gold':''}"></div>
      <div class="mh-day-num">${dayNum}</div>
      <div class="mh-day-name">${dayNames[wd]}</div>
      <div class="mh-day-star">${isAvoid?'⚠️ தவிர்க்கவும்':isLand?'🏢 பதிவு':isMuhu?'✨ நல்லது':'—'}</div>
    </div>`).join('');
}
function getDaysInMonth(y,m){
  const days=[];const d=new Date(y,m,1);
  while(d.getMonth()===m){days.push(new Date(d));d.setDate(d.getDate()+1);}
  return days;
}
function mhShowDetail(day,name,nak,muhu,land,avoid){
  const det=document.getElementById('mh-detail');
  if(!det) return;
  det.style.display='block';
  document.getElementById('mh-dp-date').textContent=`${day} ${tamilMonths[mhMonth]} 2026 — ${name}`;
  document.getElementById('mh-dp-star').textContent=`Nakshatra: ${nak}`;
  document.getElementById('mh-dp-metrics').innerHTML=
    `<span class="mh-detail-metric">${land?'🏢 Registration Day':muhu?'✨ Auspicious':'Regular Day'}</span>`+
    `<span class="mh-detail-metric">${avoid?'⚠️ Avoid':'✅ Suitable'}</span>`;
  document.getElementById('mh-dp-note').textContent=avoid?
    'This day is not recommended for registration or purchase agreements.':
    land?'Excellent day for property registration, agreement signing, and site visits.':
    muhu?'Good day for property discussions, site visits, and loan applications.':
    'Neutral day. No special auspicious or inauspicious quality.';
  det.scrollIntoView({behavior:'smooth',block:'nearest'});
}
/* ─── 9. LEAD QUALIFIER ─── */
/* ─── LEAD QUALIFIER — Real Estate CRM Intelligence Engine v3.0 ─── */
/* Replace EVERYTHING between the old buildLead comment and end of   */
/* calcLeadScore function with this single clean file.               */

/* ══════════════════════════════════════════════════════════════════
   SCORING CONFIG
   ══════════════════════════════════════════════════════════════════ */
const LEAD_SCORING_CONFIG = {
  budget: {
    label: "Budget Range", weight: 20,
    options: [
      { label: "Below ₹20 Lakhs",        value: "below_20",   score: 5  },
      { label: "₹20L – ₹50L",            value: "20_50",      score: 12 },
      { label: "₹50L – ₹1 Cr",           value: "50_1cr",     score: 18 },
      { label: "₹1 Cr – ₹2 Cr",          value: "1_2cr",      score: 20 },
      { label: "Above ₹2 Cr",            value: "above_2cr",  score: 20 },
    ]
  },
  timeline: {
    label: "Purchase Timeline", weight: 25,
    options: [
      { label: "Immediate (This Month)", value: "immediate",  score: 25 },
      { label: "Within 1 Month",         value: "1month",     score: 20 },
      { label: "1 – 3 Months",           value: "1_3months",  score: 15 },
      { label: "3 – 6 Months",           value: "3_6months",  score: 8  },
      { label: "Just Exploring",         value: "exploring",  score: -10},
    ]
  },
  visit: {
    label: "Site Visit Status", weight: 20,
    options: [
      { label: "Visit Completed",        value: "completed",  score: 25 },
      { label: "Revisit Needed",         value: "revisit",    score: 18 },
      { label: "Scheduled",              value: "scheduled",  score: 12 },
      { label: "Not Scheduled Yet",      value: "none",       score: 0  },
    ]
  },
  loan: {
    label: "Loan / Finance Status", weight: 15,
    options: [
      { label: "Pre-Approved",           value: "approved",   score: 15 },
      { label: "In Process",             value: "process",    score: 8  },
      { label: "Not Started",            value: "not_started",score: 2  },
      { label: "Rejected",               value: "rejected",   score: -5 },
    ]
  },
  downpayment: {
    label: "Down Payment Readiness", weight: 10,
    options: [
      { label: "Ready",                  value: "ready",      score: 10 },
      { label: "Partial",                value: "partial",    score: 5  },
      { label: "Need Arrangement",       value: "need",       score: 0  },
      { label: "Unknown",                value: "unknown",    score: -2 },
    ]
  },
  decision: {
    label: "Decision Maker", weight: 8,
    options: [
      { label: "Self",                   value: "self",       score: 8  },
      { label: "Spouse / Partner",       value: "spouse",     score: 5  },
      { label: "Family Decision",        value: "family",     score: -5 },
      { label: "Investor Group",         value: "investor",   score: 6  },
      { label: "Corporate",              value: "corporate",  score: 7  },
    ]
  },
  propertyType: {
    label: "Property Type Interest", weight: 5,
    options: [
      { label: "Apartment",              value: "apartment",  score: 5  },
      { label: "Villa",                  value: "villa",      score: 5  },
      { label: "Plot",                   value: "plot",       score: 4  },
      { label: "Commercial",             value: "commercial", score: 4  },
      { label: "Farm Land",              value: "farmland",   score: 3  },
      { label: "Rental Investment",      value: "rental",     score: 3  },
    ]
  },
  source: {
    label: "Lead Source", weight: 5,
    options: [
      { label: "Referral",               value: "referral",   score: 5  },
      { label: "Walk-in",                value: "walkin",     score: 5  },
      { label: "WhatsApp",               value: "whatsapp",   score: 4  },
      { label: "Google Ads",             value: "google",     score: 3  },
      { label: "Facebook / Instagram",   value: "social",     score: 3  },
      { label: "Cold Call",              value: "cold",       score: 1  },
    ]
  },
  intent: {
    label: "Customer Intent Level", weight: 10,
    options: [
      { label: "High — Ready to Buy",    value: "high",       score: 10 },
      { label: "Medium — Evaluating",    value: "medium",     score: 5  },
      { label: "Low — Window Shopping",  value: "low",        score: -3 },
      { label: "Unknown",                value: "unknown",    score: 0  },
    ]
  },
  objection: {
    label: "Primary Objection", weight: 8,
    options: [
      { label: "None",                   value: "none",       score: 8  },
      { label: "Price Too High",         value: "price",      score: -5 },
      { label: "Location Issue",         value: "location",   score: -3 },
      { label: "Loan / Finance",         value: "loan",       score: -4 },
      { label: "Waiting for Family",     value: "family",     score: -5 },
      { label: "Comparing with Others",  value: "competition",score: -3 },
      { label: "Timing / Market Wait",   value: "timing",     score: -2 },
    ]
  },
};

/* ══════════════════════════════════════════════════════════════════
   AI SUMMARY DATA — timeline × intent combinations
   ══════════════════════════════════════════════════════════════════ */
const AI_SUMMARY_DATA = {
  HOT: {
    immediate_high:    "This is your #1 priority lead today. Buyer is ready, timeline is NOW, and intent is confirmed. Every minute of delay risks losing this deal. Assign your best closer immediately.",
    immediate_medium:  "Strong lead with immediate timeline but intent needs one final push. A compelling site visit or revised payment plan will convert this lead this week.",
    immediate_low:     "Buyer claims urgency but intent signals are mixed. Have a direct, transparent conversation to uncover the real objection holding them back.",
    immediate_unknown: "Immediate timeline is a powerful buying signal. Intent is unclear — open with: 'What's your top priority for this property?' to unlock their real motivation.",
    "1month_high":     "High-intent buyer on a 1-month timeline — closing-ready lead. Prepare comparison sheet, finalize payment options, and lock in next site visit within 48 hours.",
    "1month_medium":   "One month is enough to close if you move decisively. Share 2–3 curated options with EMI breakdown. Use limited-inventory messaging to create urgency.",
    "1month_low":      "One month timeline with low intent is a risky mix. Re-qualify the actual buying motivation before investing heavy follow-up time here.",
    "1month_unknown":  "Timeline is close but intent is unknown. On your next call, ask about their family's current housing situation — it reveals hidden urgency.",
    "1_3months_high":  "High intent, medium timeline — a warm-HOT lead. Weekly touchpoints and property matching will ensure you're top-of-mind when they decide.",
    "1_3months_medium":"Good lead with room to nurture. Send weekly curated listings and invite to upcoming open-house events to build engagement.",
    default:           "Strong buying signals detected. Immediate follow-up recommended. Prepare tailored property options and financing overview.",
  },
  WARM: {
    "1_3months_high":  "High-intent buyer on a 3-month horizon. Build trust and demonstrate expertise. Become their go-to advisor before competitors get in.",
    "1_3months_medium":"Average intent, medium timeline. Consistency wins — bi-weekly follow-ups with fresh property options will keep this lead warm until decision time.",
    "3_6months_high":  "Longer timeline but high intent makes this worth sustained investment. Monthly market reports will position you as the expert they trust when ready.",
    "3_6months_medium":"6-month timeline, medium intent. Add to email nurture. One personal call per month to check if timeline has shortened.",
    "3_6months_low":   "Longer timeline and low intent — be efficient. Monthly WhatsApp touch is sufficient. Re-qualify when timeline shortens.",
    exploring_high:    "Exploring but showing genuine interest. These leads convert faster than they admit. Invite to a no-pressure site visit to accelerate their timeline.",
    exploring_medium:  "Actively exploring but no decision yet. Monthly market insights and occasional new listings will keep you in their consideration.",
    default:           "Medium-potential lead. Bi-weekly touchpoints and value-add content recommended. Re-qualify in 30 days.",
  },
  COLD: {
    exploring_low:     "Early-stage, low-intent lead. Minimal resources needed. Add to quarterly newsletter and revisit when their life situation changes.",
    exploring_unknown: "Window shopper with no clear timeline or intent. Drip campaign only. Flag for re-qualification in 60 days.",
    "3_6months_low":   "Low intent, distant timeline. Long-term nurture only. One WhatsApp per month maximum. Focus energy on hotter leads.",
    default:           "Low-potential lead at this stage. Add to nurture track. Re-qualify in 30–45 days. Your energy is better spent on hotter leads.",
  }
};

/* ══════════════════════════════════════════════════════════════════
   FOLLOW-UP DATA — visit × timeline × loan combinations
   ══════════════════════════════════════════════════════════════════ */
const FOLLOWUP_DATA = {
  completed_immediate_approved:    ["📞 Call RIGHT NOW — all signals are green. This deal can close today.", "📋 Have booking form, token receipt, and agreement ready before you dial.", "💎 Offer the best available unit — don't let minor price talk slow you.", "🤝 Loop in your sales manager for co-closing support.", "⚡ WhatsApp confirmation within 30 minutes of call."],
  completed_immediate_process:     ["📞 Call today — offer to connect with your empanelled bank partner.", "🏦 Have a bank RM ready for a 3-way introduction call.", "📊 Prepare EMI calculator showing post-approval monthly outflow.", "💰 Offer to hold the unit 7 days pending loan approval.", "📅 Set a hard deadline: 'We can hold this unit until [date].'"],
  completed_immediate_rejected:    ["🏦 Introduce 2–3 NBFCs with flexible credit criteria immediately.", "💡 Discuss co-applicant options (spouse/parent) to improve eligibility.", "💰 Explore developer-backed financing or construction-linked payment plans.", "📊 Offer revised payment structure with higher down payment.", "📞 Be empathetic — a loan rejection must not kill a hot buyer."],
  completed_immediate_not_started: ["🏦 Begin loan pre-qualification TODAY — offer to assist.", "📋 Share document checklist: salary slip, bank statement, Aadhaar, PAN.", "⏰ Pre-approval takes only 5–7 days — start now.", "💡 Connect them to your bank partner today itself.", "🤝 Offer to escort them through the entire loan process personally."],
  completed_1month_approved:       ["📞 Schedule a closing meeting this week.", "📄 Send detailed cost sheet and payment schedule today.", "🏠 Offer exclusive first-look at newly available units.", "💬 Ask directly: 'Is there anything stopping you from booking this week?'", "🎯 Gentle urgency: 'Two other clients are looking at this unit.'"],
  completed_scheduled_process:     ["🗓️ Confirm revisit date within 48 hours.", "📱 Send property video walkthrough on WhatsApp before the visit.", "🏦 Pre-arrange loan consultation for the same day as site visit.", "📋 Prepare answers to top 3 concerns from the last visit.", "✅ Follow up within 2 hours of the site visit."],
  none_immediate_approved:         ["📅 Schedule site visit for TODAY — don't let this lead go cold.", "📱 Send property video and virtual tour immediately.", "🚗 Offer to arrange pickup and drop for the site visit.", "⚡ Every day without a visit risks losing this lead.", "📞 Call within the hour to lock in a visit time."],
  scheduled_immediate_approved:    ["✅ Confirm tomorrow's visit with a reminder call today.", "📋 Prepare personalised property comparison for their budget.", "🎯 Show only 2–3 options at the visit — too many choices cause paralysis.", "💬 Ask closing questions during the visit: 'Which feels like home?'", "📝 Have booking paperwork available at the site."],
  completed_1_3months_process:     ["📞 Bi-weekly calls — ask for loan status updates each time.", "🏦 Offer to co-ordinate with their bank on their behalf.", "🏠 Share 2 fresh matching properties every 2 weeks.", "📊 Send market trend email showing appreciation in their preferred area.", "🗓️ Set 30-day calendar reminder to re-assess timeline."],
  none_3_6months_not_started:      ["📱 Monthly WhatsApp check-in — friendly, zero pressure.", "📧 Add to monthly newsletter with market updates.", "🎯 Share a 'Why Now is a Good Time to Buy' article.", "📊 Send quarterly market report to maintain mindshare.", "🔔 Set reminder to re-qualify in 45 days."],
  none_exploring_not_started:      ["📧 Add to long-term drip campaign — monthly touchpoint only.", "📱 One helpful article per month — no sales pressure.", "🎯 Invite to a free home-buying webinar when available.", "📊 Set 60-day re-qualification flag in CRM.", "🔔 Watch for life event triggers (marriage, baby, job change) that accelerate decisions."],
  HOT_default:  ["📞 Follow up within 4 hours — hot leads cool fast.", "📋 Personalised property shortlist for their exact budget and preference.", "🏦 Proactive loan assistance as a value-add service.", "🏠 Arrange site visit within 48 hours if not yet done.", "💬 Ask directly: 'What would make you comfortable to decide this week?'"],
  WARM_default: ["📞 Follow up within 48 hours with fresh property options.", "📊 Share market trend data showing price stability in their area.", "🏠 Invite to next available site visit or open house.", "🏦 Offer free loan eligibility check — low-friction value add.", "🗓️ Set weekly follow-up reminder for next 4 weeks."],
  COLD_default: ["📧 Add to monthly email nurture sequence.", "📱 WhatsApp touch once every 3–4 weeks — non-salesy content only.", "🎯 Tag for seasonal campaign (Diwali, New Year, financial year-end).", "📊 Monitor for re-engagement signals (email opens, website visits).", "🔔 Set 30-day CRM reminder for re-qualification call."],
};

/* ══════════════════════════════════════════════════════════════════
   OBJECTION DATA — objection × budget/loan/decision sub-keys
   ══════════════════════════════════════════════════════════════════ */
const OBJECTION_DATA = {
  price: {
    below_20:   { strategy: "Match to micro-market affordable options.",     tactics: ["Show emerging locality projects where ₹20L budget fits.", "Highlight PMAY subsidy — can reduce cost by ₹2.67L.", "Discuss studio/compact apartments with good resale potential.", "Share 5-year appreciation data for affordable segments.", "Explore co-ownership if single budget is insufficient."] },
    "20_50":    { strategy: "Reframe value versus cost.",                    tactics: ["Break price into EMI — often ₹18,000–25,000/month, less than rent.", "Compare rent cost vs owning the same property.", "Highlight builder RERA compliance and track record.", "Offer payment flexibility: 10:90 or construction-linked plan.", "Compare per sq.ft. rate with nearby competition."] },
    "50_1cr":   { strategy: "Justify premium with hard data.",               tactics: ["Share micro-market price appreciation report (3–5 years).", "Highlight specific USPs: location, amenities, builder brand.", "Negotiate small reduction or free add-ons (parking, kitchen).", "Present EMI as % of their likely income — usually under 30%.", "Arrange comparison visit to lower-priced competitor to show quality gap."] },
    "1_2cr":    { strategy: "Position as investment and lifestyle.",          tactics: ["Calculate rental ROI — show 3–4% yield on current price.", "Highlight capital appreciation in premium areas (7–12% pa).", "Discuss 'cost of waiting' — price rises every 6 months.", "Offer staged payment plan to reduce upfront pressure.", "Connect to HNI bank RM for exclusive loan terms."] },
    above_2cr:  { strategy: "Luxury positioning and exclusivity.",           tactics: ["Focus on exclusivity, status, and limited availability.", "Benchmark price per sq.ft. against comparable luxury projects.", "Arrange exclusive private viewing with senior management.", "Offer to negotiate directly with builder's MD for special pricing.", "Discuss real estate as inflation hedge and portfolio diversifier."] },
    default:    { strategy: "Address price concern with data and empathy.",  tactics: ["Acknowledge: 'I completely understand — this is a significant investment.'", "Reframe: 'What's your comfortable monthly outflow? Let's work backwards.'", "Offer alternative properties at a lower price point.", "Explore flexible payment structures.", "Share market data justifying current pricing."] }
  },
  location: {
    default: { strategy: "Overcome location hesitation with vision and data.", tactics: ["Share upcoming infrastructure: metro, highway, IT parks within 5km.", "Present 'then vs now' appreciation story of similar locations.", "Arrange neighbourhood walk with a local resident.", "Show Google Maps 3D connectivity from property to workplace.", "Share school/hospital/mall proximity data visually.", "Address specific concern — commute, safety, amenities — one by one.", "Offer to introduce them to an existing resident for an unbiased view."] }
  },
  loan: {
    approved:    { strategy: "Loan solved — pivot to deal closure now.",     tactics: ["Congratulate and immediately move to booking conversation.", "Ask: 'Since financing is sorted, what's stopping us from booking this week?'", "Offer to personally escort them through the booking process.", "Prepare all documentation for quick execution."] },
    process:     { strategy: "Support and accelerate the loan process.",     tactics: ["Connect to empanelled bank's priority desk.", "Share loan checklist to prevent documentation delays.", "Suggest applying to 2 banks simultaneously for backup.", "Assure you'll hold the unit until approval (7–14 days).", "Arrange 3-way call with bank RM this week."] },
    not_started: { strategy: "Initiate loan journey immediately.",           tactics: ["Begin pre-qualification today — don't wait.", "Share document checklist: salary slip, bank statement, Aadhaar, PAN.", "Offer bank executive home visit for documentation.", "Educate on pre-approval benefits: faster processing, negotiating power.", "Connect to NBFC if bank criteria is too strict."] },
    rejected:    { strategy: "Rescue the deal despite loan rejection.",      tactics: ["Explore NBFCs: Bajaj Finance, HDFC, Muthoot — more flexible.", "Discuss co-applicant with higher income (spouse, parent, sibling).", "Explore balance transfer after 12 months of good credit history.", "Discuss developer-backed plans that reduce loan dependency.", "Guide on credit score improvement — 6-month plan to reapply."] },
    default:     { strategy: "Resolve finance concern proactively.",         tactics: ["Offer free loan eligibility assessment as value-add.", "Connect to bank partner within 24 hours.", "Share EMI calculator for multiple loan amounts.", "Discuss flexible payment plans to reduce loan requirement."] }
  },
  family: {
    self:       { strategy: "Solo decision — no family barrier to clear.",   tactics: ["Focus on closing: 'What would make you say yes today?'", "Remove all information gaps: cost sheet, legal docs, project timeline.", "Offer a revisit to seal final confidence."] },
    spouse:     { strategy: "Include spouse actively in every step.",        tactics: ["Schedule joint site visit — both partners present is crucial.", "Send couple-focused brochure: lifestyle, schools, community.", "Offer WhatsApp video tour they can watch together at home.", "Address both practical (investment) and emotional (dream home) aspects.", "Invite both for a low-pressure coffee meeting with your team."] },
    family:     { strategy: "Navigate multi-stakeholder family decision.",   tactics: ["Request meeting with key influencer (parent/in-law).", "Prepare presentation: builder record, legal clearance, delivery history.", "Provide family-oriented brochure: schools, temples, parks, safety.", "Arrange family site visit on a weekend.", "Share testimonials from families already living in the project.", "Offer a WhatsApp group to address family's specific concerns."] },
    investor:   { strategy: "Focus on ROI and portfolio logic exclusively.", tactics: ["Prepare investor-grade ROI sheet: rental yield, appreciation, tax benefits.", "Show comparable market deals — position this as best-in-class.", "Discuss group booking discounts if multiple units interest them.", "Highlight RERA and legal security for investor confidence.", "Arrange call with existing investor buyers as references."] },
    corporate:  { strategy: "Professional process for corporate buyers.",    tactics: ["Provide formal proposal document for internal approval.", "Offer bulk/corporate booking discounts.", "Facilitate legal review with builder's legal team.", "Provide GST invoice and full tax documentation.", "Assign dedicated RM for post-booking support."] },
    default:    { strategy: "Support the family decision-making process.",   tactics: ["Patience is key — acknowledge family involvement positively.", "Arrange group site visit at earliest convenience.", "Provide comprehensive brochure for family review.", "Offer to answer family concerns via video call."] }
  },
  competition: {
    default: { strategy: "Win the comparison professionally with facts.",     tactics: ["Prepare feature-comparison sheet with 3 competing projects.", "Focus on 5 differentiators: reputation, delivery record, amenities, location, per sq.ft.", "Share Google reviews and ratings comparison.", "Highlight RERA registration — not all competitors comply.", "Arrange same-day visit to both properties — let them compare firsthand.", "Share customer testimonials and handover photos from completed phases.", "Discuss post-sales service, maintenance quality, and resident community."] }
  },
  timing: {
    default: { strategy: "Address market-timing concern with hard data.",     tactics: ["Share 3-year appreciation chart for the specific micro-market.", "Calculate 'cost of waiting': 8% rise in 6 months = ₹X lakhs extra.", "Highlight pre-launch pricing — this window closes when project launches fully.", "Discuss rental savings: every month of waiting is ₹X thrown away.", "Share inventory status: 'Only 8 units left at this price — next phase is higher.'", "Anchor: 'Buyers who waited 2 years ago paid 30% more for the same project.'"] }
  },
  none: {
    default: { strategy: "Zero objections — pure closing opportunity.",       tactics: ["Move immediately to booking conversation — no hesitation.", "Ask directly: 'Shall we look at the booking formalities?'", "Walk through booking process step-by-step — make it feel effortless.", "Offer to assist with all paperwork personally.", "Celebrate their decision as a positive life milestone."] }
  }
};

/* ══════════════════════════════════════════════════════════════════
   CALL SCRIPT DATA — grade × source combinations
   ══════════════════════════════════════════════════════════════════ */
const CALL_SCRIPT_DATA = {
  HOT: {
    referral: { opener: "Hi [Name], [Referrer's name] asked me to call you personally — they said you're looking for a property and I think we have exactly what you need.", followup: "Since [Referrer] trusted us, I want to make sure you get the best deal we can offer. When can we meet this week?", closing: "Can I schedule a priority visit for you tomorrow morning or evening — whatever suits you?" },
    walkin:   { opener: "Hi [Name], wonderful meeting you at our office today! I've prepared a personalised property summary based on your exact requirements.", followup: "You mentioned [timeline/budget] — I've identified 3 perfect-match properties. Shall I send them on WhatsApp right now?", closing: "Can we lock in a site visit this weekend? I'll personally escort you through the project." },
    whatsapp: { opener: "Hi [Name], thank you for reaching out on WhatsApp! I noticed your interest in [property type] — I have exclusive options not yet on our website.", followup: "Based on your budget of [range], I have something that will genuinely surprise you with its value.", closing: "Can I send you a 2-minute property video right now? You'll see why I'm excited about this one." },
    google:   { opener: "Hi [Name], I saw you were searching for properties in [area] — I'm calling to give you the most accurate, up-to-date information directly.", followup: "Many online listings are outdated. I want to share what's actually available right now at the right price.", closing: "What time works for a 15-minute call today where I walk you through your best options?" },
    social:   { opener: "Hi [Name], you expressed interest in our [project] on [Facebook/Instagram] — I wanted to personally reach out before someone else does.", followup: "Response has been overwhelming and inventory is moving fast. I'd hate for you to miss out.", closing: "Can I schedule a priority visit this week? I'll block the best unit at current pricing until then." },
    cold:     { opener: "Hi [Name], I'm [Your Name] from [Company]. I work exclusively in [area/type] properties and may have something matching your requirements.", followup: "I don't want to take much of your time — just 2 minutes to understand what you're looking for?", closing: "If it's a fit, we can arrange a no-obligation visit at your convenience." },
    default:  { opener: "Hi [Name], I wanted to personally reach out about a property opportunity that matches your requirements perfectly.", followup: "I've shortlisted 2–3 options I'd love to walk you through based on what I know about your brief.", closing: "When's a good time for a quick 10-minute call or site visit this week?" }
  },
  WARM: {
    referral: { opener: "Hi [Name], [Referrer] mentioned you're keeping an eye on the market — I wanted to make sure you have the right information when the time comes.", followup: "No pressure at all — just making sure you're seeing the best options as they come up.", closing: "Can I add you to my priority list? I'll reach out personally when something perfect for you comes up." },
    whatsapp: { opener: "Hi [Name], hope you're well! Wanted to share a couple of new options that just came up — thought of you specifically.", followup: "These properties fit your [budget/area] preference and pricing is still at pre-launch rates.", closing: "Would a weekend site visit work? No commitment — just a look." },
    social:   { opener: "Hi [Name], you interacted with our [project] post — just wanted to follow up with some options that match your requirements.", followup: "I have 2–3 properties that fit your brief exactly. Happy to send details on WhatsApp.", closing: "Would a Saturday or Sunday visit work for you? No pressure, just an informed look." },
    default:  { opener: "Hi [Name], just checking in — how's your property search going?", followup: "I have a couple of new options I think you'll find interesting based on what we discussed.", closing: "Can we catch up for 15 minutes this week? I'd love to show you what's new." }
  },
  COLD: {
    referral: { opener: "Hi [Name], [Referrer] mentioned you might be thinking about property at some point — just wanted to introduce myself with zero pressure.", followup: "I'll just keep you in the loop with relevant updates when they come up.", closing: "Is WhatsApp okay for occasional market news? Completely non-salesy, just useful information." },
    default:  { opener: "Hi [Name], this is [Name] from [Company] — we've spoken before. Just a friendly check-in!", followup: "I know you weren't in a rush, but I wanted to make sure you have current market information when you are.", closing: "I'll keep you posted with relevant updates. Is WhatsApp okay for occasional market news?" }
  }
};

/* ══════════════════════════════════════════════════════════════════
   SCORING ENGINE
   ══════════════════════════════════════════════════════════════════ */
function runLeadScoringEngine() {
  const breakdown = [];
  const selectedValues = {};
  let rawScore = 0;
  let maxPossible = 0;

  for (const [fieldKey, config] of Object.entries(LEAD_SCORING_CONFIG)) {
    const el = document.getElementById(`lq-${fieldKey}`);
    if (!el) continue;
    const selectedValue = el.value;
    selectedValues[fieldKey] = selectedValue;
    const option = config.options.find(o => o.value === selectedValue);
    if (!option) continue;
    rawScore    += option.score;
    maxPossible += config.options.reduce((a, b) => a.score > b.score ? a : b).score;
    breakdown.push({ field: config.label, choice: option.label, points: option.score });
  }

  const normalized           = Math.min(100, Math.max(0, Math.round((rawScore / maxPossible) * 100)));
  const grade                = normalized >= 70 ? 'HOT' : normalized >= 45 ? 'WARM' : 'COLD';
  const conversionProbability = grade === 'HOT'  ? Math.min(95, normalized + 10)
                              : grade === 'WARM' ? Math.round(normalized * 0.75)
                              :                   Math.round(normalized * 0.4);
  const confidence           = breakdown.length >= 8 ? 'High' : breakdown.length >= 5 ? 'Medium' : 'Low';

  return { normalized, grade, conversionProbability, confidence, breakdown, selectedValues };
}

/* ══════════════════════════════════════════════════════════════════
   CONTEXT RESOLVERS
   ══════════════════════════════════════════════════════════════════ */
function resolveAiSummary(grade, sv) {
  const bank = AI_SUMMARY_DATA[grade] || AI_SUMMARY_DATA.COLD;
  return bank[`${sv.timeline}_${sv.intent}`] || bank[sv.timeline] || bank.default;
}

function resolveFollowUps(grade, sv) {
  return FOLLOWUP_DATA[`${sv.visit}_${sv.timeline}_${sv.loan}`]
      || FOLLOWUP_DATA[`${sv.visit}_${sv.timeline}`]
      || FOLLOWUP_DATA[`${grade}_default`]
      || ["📞 Follow up within 48 hours.", "📋 Prepare personalised property options.", "🏠 Arrange site visit at earliest."];
}

function resolveObjectionHandling(objection, sv) {
  const bank  = OBJECTION_DATA[objection] || OBJECTION_DATA.none;
  const entry = bank[sv.budget] || bank[sv.loan] || bank[sv.decision] || bank.default || bank[Object.keys(bank)[0]];
  return entry;
}

function resolveCallScript(grade, sv) {
  const bank = CALL_SCRIPT_DATA[grade] || CALL_SCRIPT_DATA.WARM;
  return bank[sv.source] || bank.default;
}

/* ══════════════════════════════════════════════════════════════════
   RENDER HELPERS
   ══════════════════════════════════════════════════════════════════ */
function buildSelectHTML(fieldKey, config) {
  const opts = config.options.map((o, i) =>
    `<option value="${o.value}"${i === 0 ? ' selected' : ''}>${o.label}</option>`
  ).join('');
  return `<div class="form-group"><label>${config.label}</label>
    <select id="lq-${fieldKey}" onchange="calcLeadScore()">${opts}</select></div>`;
}

function scoreBarHTML(score, grade) {
  const color = grade === 'HOT' ? '#ff4d4d' : grade === 'WARM' ? '#f5a623' : '#4da6ff';
  return `<div style="margin:18px 0 10px">
    <div style="display:flex;justify-content:space-between;margin-bottom:6px">
      <span style="font-size:12px;color:var(--text3)">Lead Score</span>
      <span style="font-size:12px;font-weight:700;color:${color}">${score}/100</span>
    </div>
    <div style="background:rgba(255,255,255,0.08);border-radius:99px;height:8px;overflow:hidden">
      <div style="height:100%;width:${score}%;background:${color};border-radius:99px;transition:width 0.8s cubic-bezier(.4,0,.2,1)"></div>
    </div></div>`;
}

function breakdownHTML(breakdown) {
  const rows = breakdown.map(b => {
    const sign = b.points >= 0 ? '+' : '';
    const col  = b.points > 0 ? '#4ade80' : b.points < 0 ? '#f87171' : '#94a3b8';
    return `<div style="display:flex;justify-content:space-between;align-items:center;padding:5px 0;border-bottom:1px solid rgba(255,255,255,0.05);font-size:12px">
      <span style="color:var(--text2)">${b.field}</span>
      <span style="color:var(--text3);font-size:11px;max-width:130px;text-align:right">${b.choice}</span>
      <span style="color:${col};font-weight:700;min-width:34px;text-align:right">${sign}${b.points}</span></div>`;
  }).join('');
  return `<div style="margin-top:16px">
    <div style="font-size:11px;color:var(--text3);font-weight:600;letter-spacing:.08em;margin-bottom:8px;text-transform:uppercase">Score Breakdown</div>
    ${rows}</div>`;
}

function sec(icon, label) {
  return `<div style="font-size:11px;color:var(--text3);font-weight:600;letter-spacing:.08em;margin:18px 0 8px;text-transform:uppercase">${icon} ${label}</div>`;
}
function card(html) {
  return `<div style="background:rgba(255,255,255,0.04);border-radius:10px;padding:12px 14px;font-size:12px;color:var(--text2);line-height:1.75">${html}</div>`;
}

function aiSuggestionHTML(grade, sv) {
  const summary   = resolveAiSummary(grade, sv);
  const followUps = resolveFollowUps(grade, sv);
  const objEntry  = resolveObjectionHandling(sv.objection, sv);
  const script    = resolveCallScript(grade, sv);

  const followHTML  = followUps.map(f =>
    `<div style="padding:4px 0;border-bottom:1px solid rgba(255,255,255,0.05)">${f}</div>`).join('');
  const tacticHTML  = (objEntry.tactics || []).map(t =>
    `<div style="padding:4px 0;border-bottom:1px solid rgba(255,255,255,0.05)">${t}</div>`).join('');
  const scriptHTML  = `
    <div style="margin-bottom:6px;font-size:11px;color:var(--text3)">OPENER</div>
    <div style="margin-bottom:10px;font-style:italic">"${script.opener}"</div>
    <div style="margin-bottom:6px;font-size:11px;color:var(--text3)">FOLLOW-UP</div>
    <div style="margin-bottom:10px;font-style:italic">"${script.followup}"</div>
    <div style="margin-bottom:6px;font-size:11px;color:var(--text3)">CLOSING LINE</div>
    <div style="font-style:italic">"${script.closing}"</div>`;

  return `
    ${sec('🤖','AI Lead Summary')}   ${card(summary)}
    ${sec('💡','AI Follow-up Actions')}  ${card(followHTML)}
    ${sec('🛡️','Objection Handling')} ${card(`<div style="margin-bottom:8px;font-weight:600;color:var(--text1)">${objEntry.strategy||''}</div>${tacticHTML}`)}
    ${sec('📞','Suggested Call Script')} ${card(scriptHTML)}`;
}

/* ══════════════════════════════════════════════════════════════════
   buildLead — main entry point (same function name as before)
   ══════════════════════════════════════════════════════════════════ */
function buildLead(b) {
  const allFields = Object.entries(LEAD_SCORING_CONFIG);
  let fieldsHTML = '';
  for (let i = 0; i < allFields.length; i += 2) {
    fieldsHTML += `<div class="form-row">
      ${buildSelectHTML(allFields[i][0], allFields[i][1])}
      ${allFields[i+1] ? buildSelectHTML(allFields[i+1][0], allFields[i+1][1]) : ''}
    </div>`;
  }

  b.innerHTML = `
    <p style="color:var(--text3);font-size:13px;margin-bottom:20px">
      Fill all fields for maximum AI accuracy — every combination generates a unique action plan.
    </p>
    ${fieldsHTML}
    <button class="calc-btn" onclick="calcLeadScore()">🎯 Qualify This Lead →</button>
    <div id="lq-result-panel" style="display:none;margin-top:24px">
      <div style="display:flex;align-items:center;gap:14px;margin-bottom:4px">
        <div id="lq-grade-badge" style="font-size:2rem;font-weight:900;letter-spacing:-1px"></div>
        <div>
          <div id="lq-conversion" style="font-size:12px;color:var(--text3)"></div>
          <div id="lq-confidence" style="font-size:12px;color:var(--text3)"></div>
        </div>
      </div>
      <div id="lq-score-bar"></div>
      <div id="lq-breakdown"></div>
      <div id="lq-ai"></div>
    </div>`;

  calcLeadScore();
}

/* ══════════════════════════════════════════════════════════════════
   calcLeadScore — called on every field change + on load
   ══════════════════════════════════════════════════════════════════ */
function calcLeadScore() {
  const { normalized, grade, conversionProbability, confidence, breakdown, selectedValues } = runLeadScoringEngine();

  const gradeEmoji = grade === 'HOT' ? '🔥 HOT' : grade === 'WARM' ? '🌡️ WARM' : '❄️ COLD';
  const gradeColor = grade === 'HOT' ? '#ff4d4d' : grade === 'WARM' ? '#f5a623' : '#4da6ff';

  const panel = document.getElementById('lq-result-panel');
  if (!panel) return;
  panel.style.display = 'block';

  const b = document.getElementById('lq-grade-badge');
  if (b) { b.textContent = gradeEmoji; b.style.color = gradeColor; }

  const cv = document.getElementById('lq-conversion');
  if (cv) cv.textContent = `Conversion Probability: ${conversionProbability}%`;

  const cf = document.getElementById('lq-confidence');
  if (cf) cf.textContent = `Data Confidence: ${confidence} (${breakdown.length}/${Object.keys(LEAD_SCORING_CONFIG).length} fields)`;

  const sb = document.getElementById('lq-score-bar');
  if (sb) sb.innerHTML = scoreBarHTML(normalized, grade);

  const bd = document.getElementById('lq-breakdown');
  if (bd) bd.innerHTML = breakdownHTML(breakdown);

  const ai = document.getElementById('lq-ai');
  if (ai) ai.innerHTML = aiSuggestionHTML(grade, selectedValues);
}
/* ─── 10. COMMISSION ─── */
function buildCommission(b) {
  b.innerHTML = `
  <style>
    .cm-section{background:#fff;border:1.5px solid #e8dfc8;border-radius:14px;padding:20px;margin-bottom:14px;box-shadow:0 2px 12px rgba(0,0,0,0.05)}
    .cm-title{font-size:11px;font-weight:700;color:#c9a84c;text-transform:uppercase;letter-spacing:.08em;margin-bottom:14px}
    .cm-g2{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px}
    .cm-g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:12px}
    .cm-lbl{font-size:11px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:.06em;display:block;margin-bottom:5px}
    .cm-inp{width:100%;padding:10px 13px;border:1.5px solid #d4c99a;border-radius:9px;font-size:13px;color:#1a1a2e;outline:none;font-family:'DM Sans',sans-serif;box-sizing:border-box;background:#fff;transition:border .2s}
    .cm-inp:focus{border-color:#c9a84c}
    .cm-dash{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:10px;margin-bottom:14px}
    .cm-card{background:#faf8f3;border:1.5px solid #e8dfc8;border-radius:12px;padding:14px;text-align:center}
    .cm-card-lbl{font-size:10px;color:#888;font-weight:600;text-transform:uppercase;letter-spacing:.06em;margin-bottom:5px}
    .cm-card-val{font-size:15px;font-weight:700;color:#1a1a2e}
    .cm-card.highlight{background:linear-gradient(135deg,#1a1a2e,#2a2218);border-color:#c9a84c}
    .cm-card.highlight .cm-card-lbl{color:#c9a84c88}
    .cm-card.highlight .cm-card-val{color:#c9a84c;font-size:18px}
    .cm-badge{display:inline-flex;align-items:center;gap:4px;padding:4px 10px;border-radius:20px;font-size:11px;font-weight:700}
    .cm-badge.green{background:#e8f8ee;color:#2d7a45;border:1px solid #b0e0c0}
    .cm-badge.gold{background:#fff8e8;color:#c9a84c;border:1px solid #e8dfc8}
    .cm-badge.red{background:#fff0f0;color:#e03030;border:1px solid #f5c0c0}
    .cm-badge.blue{background:#f0f4ff;color:#5577cc;border:1px solid #c0d0f0}
    .cm-btn{padding:12px 20px;border-radius:10px;font-size:13px;font-weight:700;cursor:pointer;font-family:'DM Sans',sans-serif;border:none;transition:all .2s}
    .cm-btn-gold{background:linear-gradient(135deg,#c9a84c,#e8c55a);color:#1a1a2e}
    .cm-btn-gold:hover{transform:translateY(-1px);box-shadow:0 6px 20px rgba(201,168,76,0.35)}
    .cm-btn-dark{background:#1a1a2e;color:#c9a84c;border:1.5px solid #c9a84c}
    .cm-btn-outline{background:transparent;color:#888;border:1.5px solid #ddd;font-weight:700;cursor:pointer}
    .cm-btn-outline:hover{border-color:#c9a84c;color:#c9a84c}
    .cm-prog-wrap{height:8px;background:#f0ece0;border-radius:4px;overflow:hidden;margin:6px 0}
    .cm-prog-fill{height:100%;border-radius:4px;transition:width .5s ease;background:linear-gradient(90deg,#c9a84c,#e8c55a)}
    @media(max-width:600px){.cm-g2,.cm-g3{grid-template-columns:1fr}}
  </style>

  <!-- SECTION 1: DEAL DETAILS -->
  <div class="cm-section">
    <div class="cm-title">🏠 Deal Details</div>
    <div class="cm-g2">
      <div>
        <label class="cm-lbl">Client Name</label>
        <input class="cm-inp" id="cm-client" placeholder="e.g. Rajan Kumar" oninput="cmAutoSave()">
      </div>
      <div>
        <label class="cm-lbl">Property Name</label>
        <input class="cm-inp" id="cm-propname" placeholder="e.g. J Square Green Valley" oninput="cmAutoSave()">
      </div>
    </div>
    <div class="cm-g3">
      <div>
        <label class="cm-lbl">Transaction Type</label>
        <select class="cm-inp" id="cm-txtype" onchange="cmAutoSave();calcCommission()">
          <option>Plot Sale</option><option>Villa Sale</option><option>Apartment Sale</option>
          <option>Commercial Sale</option><option>Rental Deal</option><option>Resale Deal</option>
        </select>
      </div>
      <div>
        <label class="cm-lbl">Deal / Property Value (₹)</label>
        <input class="cm-inp" type="number" id="cm-val" value="8000000" oninput="cmAutoSave();calcCommission()">
      </div>
      <div>
        <label class="cm-lbl">Property Area (sq.ft)</label>
        <input class="cm-inp" type="number" id="cm-area" placeholder="e.g. 1200" oninput="cmAutoSave();calcCommission()">
      </div>
    </div>
    <div class="cm-g2">
      <div>
        <label class="cm-lbl">Deal Closing Date</label>
        <input class="cm-inp" type="date" id="cm-closedate" onchange="cmAutoSave()">
      </div>
      <div>
        <label class="cm-lbl">Expected Payment Date</label>
        <input class="cm-inp" type="date" id="cm-paydate" onchange="cmAutoSave();calcCommission()">
      </div>
    </div>
  </div>

  <!-- SECTION 2: COMMISSION SETUP -->
  <div class="cm-section">
    <div class="cm-title">💼 Commission Setup</div>
    <div class="cm-g3">
      <div>
        <label class="cm-lbl">Commission Structure</label>
        <select class="cm-inp" id="cm-structure" onchange="cmToggleStructure();cmAutoSave();calcCommission()">
          <option value="pct">Percentage Based</option>
          <option value="fixed">Fixed Amount</option>
          <option value="hybrid">Hybrid (Fixed + %)</option>
        </select>
      </div>
      <div>
        <label class="cm-lbl">Commission Rate (%)</label>
        <select class="cm-inp" id="cm-rate" onchange="cmAutoSave();calcCommission()">
          <option value="0.5">0.5%</option><option value="1" selected>1%</option>
          <option value="1.5">1.5%</option><option value="2">2%</option>
          <option value="2.5">2.5%</option><option value="3">3%</option>
        </select>
      </div>
      <div id="cm-fixed-wrap">
        <label class="cm-lbl">Fixed Amount (₹)</label>
        <input class="cm-inp" type="number" id="cm-fixed" placeholder="e.g. 50000" oninput="cmAutoSave();calcCommission()">
      </div>
    </div>
    <div class="cm-g3">
      <div>
        <label class="cm-lbl">Commission Side</label>
        <select class="cm-inp" id="cm-side" onchange="cmAutoSave();calcCommission()">
          <option>Seller Side</option><option>Buyer Side</option><option>Both Sides</option>
        </select>
      </div>
      <div>
        <label class="cm-lbl">Agent Role</label>
        <select class="cm-inp" id="cm-role" onchange="cmAutoSave();calcCommission()">
          <option>Lead Agent</option><option>Co-Agent</option>
          <option>Team Member</option><option>Sales Manager</option>
        </select>
      </div>
      <div>
        <label class="cm-lbl">Team Split</label>
        <select class="cm-inp" id="cm-split" onchange="cmAutoSave();calcCommission()">
          <option value="100">100% (Solo)</option><option value="75">75%</option>
          <option value="50">50-50</option><option value="33.33">33.33%</option>
          <option value="25">25%</option>
        </select>
      </div>
    </div>
    <div class="cm-g3">
      <div>
        <label class="cm-lbl">Co-Broking Share (%)</label>
        <select class="cm-inp" id="cm-cobrk" onchange="cmAutoSave();calcCommission()">
          <option value="100">100% (No Co-Broking)</option>
          <option value="75">75%</option><option value="60">60%</option>
          <option value="50">50%</option><option value="40">40%</option>
        </select>
      </div>
      <div>
        <label class="cm-lbl">TDS Rate</label>
        <select class="cm-inp" id="cm-tds" onchange="cmAutoSave();calcCommission()">
          <option value="0">No TDS</option><option value="0.02">2%</option>
          <option value="0.05" selected>5%</option><option value="0.1">10%</option>
        </select>
      </div>
      <div>
        <label class="cm-lbl">GST (18%)</label>
        <select class="cm-inp" id="cm-gst" onchange="cmAutoSave();calcCommission()">
          <option value="0">No GST</option><option value="0.18">Add GST 18%</option>
        </select>
      </div>
    </div>
    <div class="cm-g2">
      <div>
        <label class="cm-lbl">Fixed Bonus (₹)</label>
        <input class="cm-inp" type="number" id="cm-bonus" placeholder="e.g. 10000" oninput="cmAutoSave();calcCommission()">
      </div>
      <div>
        <label class="cm-lbl">Referral Commission (₹)</label>
        <input class="cm-inp" type="number" id="cm-referral" placeholder="e.g. 5000" oninput="cmAutoSave();calcCommission()">
      </div>
    </div>
  </div>

  <!-- SECTION 3: EXPENSES -->
  <div class="cm-section">
    <div class="cm-title">📉 Expense Deductions</div>
    <div class="cm-g2">
      <div>
        <label class="cm-lbl">Marketing Expense (₹)</label>
        <input class="cm-inp" type="number" id="cm-mktexp" placeholder="e.g. 5000" oninput="cmAutoSave();calcCommission()">
      </div>
      <div>
        <label class="cm-lbl">Travel Expense (₹)</label>
        <input class="cm-inp" type="number" id="cm-trvexp" placeholder="e.g. 2000" oninput="cmAutoSave();calcCommission()">
      </div>
    </div>
    <div class="cm-g2">
      <div>
        <label class="cm-lbl">Documentation Expense (₹)</label>
        <input class="cm-inp" type="number" id="cm-docexp" placeholder="e.g. 3000" oninput="cmAutoSave();calcCommission()">
      </div>
      <div>
        <label class="cm-lbl">Monthly Target (₹)</label>
        <input class="cm-inp" type="number" id="cm-target" placeholder="e.g. 500000" oninput="cmAutoSave();calcCommission()">
      </div>
    </div>
  </div>

  <!-- SECTION 4: PAYMENT TRACKING -->
  <div class="cm-section">
    <div class="cm-title">💳 Payment Tracking</div>
    <div class="cm-g3">
      <div>
        <label class="cm-lbl">Payment Status</label>
        <select class="cm-inp" id="cm-paystatus" onchange="cmAutoSave();calcCommission()">
          <option>Pending</option><option>Partially Received</option>
          <option>Received</option><option>Overdue</option>
        </select>
      </div>
      <div>
        <label class="cm-lbl">Advance Received (₹)</label>
        <input class="cm-inp" type="number" id="cm-advance" placeholder="e.g. 25000" oninput="cmAutoSave();calcCommission()">
      </div>
      <div>
        <label class="cm-lbl">Balance Due</label>
        <input class="cm-inp" id="cm-balance" readonly style="background:#faf8f3;color:#c9a84c;font-weight:700">
      </div>
    </div>
  </div>

  <!-- SUMMARY DASHBOARD -->
  <div class="cm-section" id="cm-dashboard">
    <div class="cm-title">📊 Commission Dashboard</div>
    <div class="cm-dash">
      <div class="cm-card highlight">
        <div class="cm-card-lbl">Net Payout</div>
        <div class="cm-card-val" id="cm-d-net">—</div>
      </div>
      <div class="cm-card">
        <div class="cm-card-lbl">Gross Commission</div>
        <div class="cm-card-val" id="cm-d-gross">—</div>
      </div>
      <div class="cm-card">
        <div class="cm-card-lbl">Your Share</div>
        <div class="cm-card-val" id="cm-d-share">—</div>
      </div>
      <div class="cm-card">
        <div class="cm-card-lbl">TDS Deduction</div>
        <div class="cm-card-val" id="cm-d-tds" style="color:#e03030">—</div>
      </div>
      <div class="cm-card">
        <div class="cm-card-lbl">Total Expenses</div>
        <div class="cm-card-val" id="cm-d-exp" style="color:#e03030">—</div>
      </div>
      <div class="cm-card">
        <div class="cm-card-lbl">Incentive Bonus</div>
        <div class="cm-card-val" id="cm-d-bonus" style="color:#2d7a45">—</div>
      </div>
      <div class="cm-card">
        <div class="cm-card-lbl">Effective Comm %</div>
        <div class="cm-card-val" id="cm-d-effpct" style="color:#c9a84c">—</div>
      </div>
      <div class="cm-card">
        <div class="cm-card-lbl">Comm/sq.ft</div>
        <div class="cm-card-val" id="cm-d-sqft">—</div>
      </div>
    </div>

    <!-- Performance -->
    <div style="background:#faf8f3;border-radius:10px;padding:14px;margin-bottom:12px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
        <div style="font-size:12px;font-weight:700;color:#1a1a2e">Performance Analytics</div>
        <div id="cm-perf-badge"></div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div>
          <div style="font-size:11px;color:#888;margin-bottom:4px">Net Margin</div>
          <div class="cm-prog-wrap"><div id="cm-margin-fill" class="cm-prog-fill" style="width:0%"></div></div>
          <div id="cm-margin-pct" style="font-size:13px;font-weight:700;color:#c9a84c">0%</div>
        </div>
        <div>
          <div style="font-size:11px;color:#888;margin-bottom:4px">Target Progress</div>
          <div class="cm-prog-wrap"><div id="cm-target-fill" class="cm-prog-fill" style="width:0%;background:linear-gradient(90deg,#2d7a45,#4eca80)"></div></div>
          <div id="cm-target-pct" style="font-size:13px;font-weight:700;color:#2d7a45">0%</div>
        </div>
      </div>
    </div>

    <!-- Risk + Projections -->
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px">
      <div class="cm-card">
        <div class="cm-card-lbl">Payment Risk</div>
        <div id="cm-risk" class="cm-card-val">—</div>
      </div>
      <div class="cm-card">
        <div class="cm-card-lbl">ROI on Ads</div>
        <div id="cm-roi" class="cm-card-val" style="color:#c9a84c">—</div>
      </div>
      <div class="cm-card">
        <div class="cm-card-lbl">Monthly Projection</div>
        <div id="cm-monthly-proj" class="cm-card-val">—</div>
      </div>
      <div class="cm-card">
        <div class="cm-card-lbl">Annual Projection</div>
        <div id="cm-annual-proj" class="cm-card-val">—</div>
      </div>
    </div>
  </div>

  <!-- ACTION BUTTONS -->
  <div style="display:flex;gap:10px;flex-wrap:wrap">
    <button class="cm-btn cm-btn-gold" onclick="calcCommission()" style="flex:2;min-width:160px">
      💼 Calculate Commission
    </button>
    <button class="cm-btn cm-btn-dark" onclick="cmCopySummary()" style="flex:1;min-width:120px">
      📋 Copy Summary
    </button>
    <button class="cm-btn" onclick="window.print()" style="flex:1;min-width:100px;background:#f0f4ff;color:#5577cc;border:1.5px solid #c0d0f0;font-weight:700;cursor:pointer">
      🖨️ Print
    </button>
    <button class="cm-btn cm-btn-outline" onclick="cmResetForm()" style="flex:1;min-width:80px">
      🔄 Reset
    </button>
  </div>
  `;

  cmLoadSaved();
  calcCommission();
}

/* ── TOGGLE STRUCTURE ── */
function cmToggleStructure() {
  const s = document.getElementById('cm-structure')?.value;
  const fw = document.getElementById('cm-fixed-wrap');
  const rw = document.getElementById('cm-rate')?.closest('div');
  if(!fw) return;
  fw.style.display = (s === 'pct') ? 'none' : 'block';
  if(s === 'pct') document.getElementById('cm-fixed').value = '';
}

/* ── MAIN CALC ── */
function calcCommission() {
  const val       = +document.getElementById('cm-val')?.value || 0;
  const rate      = +document.getElementById('cm-rate')?.value || 0;
  const fixedAmt  = +document.getElementById('cm-fixed')?.value || 0;
  const structure = document.getElementById('cm-structure')?.value || 'pct';
  const side      = document.getElementById('cm-side')?.value || 'Seller Side';
  const cobrkPct  = +document.getElementById('cm-cobrk')?.value || 100;
  const splitPct  = +document.getElementById('cm-split')?.value || 100;
  const tdsRate   = +document.getElementById('cm-tds')?.value || 0;
  const gstRate   = +document.getElementById('cm-gst')?.value || 0;
  const bonusIn   = +document.getElementById('cm-bonus')?.value || 0;
  const referral  = +document.getElementById('cm-referral')?.value || 0;
  const mktExp    = +document.getElementById('cm-mktexp')?.value || 0;
  const trvExp    = +document.getElementById('cm-trvexp')?.value || 0;
  const docExp    = +document.getElementById('cm-docexp')?.value || 0;
  const target    = +document.getElementById('cm-target')?.value || 0;
  const advance   = +document.getElementById('cm-advance')?.value || 0;
  const payStatus = document.getElementById('cm-paystatus')?.value || 'Pending';
  const payDate   = document.getElementById('cm-paydate')?.value || '';
  const area      = +document.getElementById('cm-area')?.value || 0;

  // Gross commission
  let gross = 0;
  if(structure === 'pct') gross = val * rate / 100;
  else if(structure === 'fixed') gross = fixedAmt;
  else gross = (val * rate / 100) + fixedAmt;

  // Both sides = double
  if(side === 'Both Sides') gross *= 2;

  // GST on gross
  const gstAmt = gross * gstRate;
  const grossWithGST = gross + gstAmt;

  // Co-broking + team split
  const share = grossWithGST * (cobrkPct / 100) * (splitPct / 100);

  // Incentive slab
  let slabBonus = 0;
  if(val >= 20000000) slabBonus = 50000;
  else if(val >= 10000000) slabBonus = 15000;
  else if(val >= 5000000) slabBonus = 5000;
  const totalBonus = bonusIn + slabBonus;

  // TDS
  const tdsAmt = share * tdsRate;

  // Expenses
  const totalExp = mktExp + trvExp + docExp + referral;

  // Net
  const net = share + totalBonus - tdsAmt - totalExp;

  // Balance
  const balance = Math.max(0, net - advance);

  // Effective %
  const effPct = val > 0 ? ((net / val) * 100).toFixed(3) : '0';

  // Margin %
  const marginPct = share > 0 ? Math.round((net / share) * 100) : 0;

  // ROI on ads
  const roiAds = mktExp > 0 ? ((net / mktExp) * 100).toFixed(1) + 'x' : '—';

  // Commission per sqft
  const commSqft = area > 0 ? '₹' + Math.round(net / area).toLocaleString('en-IN') : '—';

  // Projections (assume 2 deals/month)
  const monthlyProj = net * 2;
  const annualProj = net * 20;

  // Performance rating
  let perfLabel, perfClass;
  if(marginPct >= 90) { perfLabel = '⭐ Excellent'; perfClass = 'green'; }
  else if(marginPct >= 75) { perfLabel = '✅ Good'; perfClass = 'gold'; }
  else if(marginPct >= 50) { perfLabel = '📊 Average'; perfClass = 'blue'; }
  else { perfLabel = '⚠️ Low Margin'; perfClass = 'red'; }

  // Payment risk
  let riskLabel, riskClass;
  const today = new Date();
  const payD = payDate ? new Date(payDate) : null;
  if(payStatus === 'Received') { riskLabel = '✅ Secure'; riskClass = 'green'; }
  else if(payStatus === 'Partially Received') { riskLabel = '⚠️ Follow-Up'; riskClass = 'gold'; }
  else if(payStatus === 'Overdue' || (payD && payD < today)) { riskLabel = '🔴 High Risk'; riskClass = 'red'; }
  else { riskLabel = '⏳ Pending'; riskClass = 'blue'; }

  // Target progress
  const targetPct = target > 0 ? Math.min(100, Math.round((net / target) * 100)) : 0;

  // Format helper
  const f = n => {
    if(n >= 10000000) return '₹' + (n/10000000).toFixed(2) + ' Cr';
    if(n >= 100000) return '₹' + (n/100000).toFixed(2) + ' L';
    return '₹' + Math.round(n).toLocaleString('en-IN');
  };

  // Update UI
  const set = (id, val) => { const el = document.getElementById(id); if(el) el.textContent = val; };

  set('cm-d-net', f(net));
  set('cm-d-gross', f(grossWithGST));
  set('cm-d-share', f(share));
  set('cm-d-tds', f(tdsAmt));
  set('cm-d-exp', f(totalExp));
  set('cm-d-bonus', f(totalBonus));
  set('cm-d-effpct', effPct + '%');
  set('cm-d-sqft', commSqft);
  set('cm-risk', riskLabel);
  set('cm-roi', roiAds);
  set('cm-monthly-proj', f(monthlyProj));
  set('cm-annual-proj', f(annualProj));
  set('cm-margin-pct', marginPct + '%');
  set('cm-target-pct', targetPct + '%');
  set('cm-balance', f(balance));

  const mf = document.getElementById('cm-margin-fill');
  const tf = document.getElementById('cm-target-fill');
  if(mf) mf.style.width = marginPct + '%';
  if(tf) tf.style.width = targetPct + '%';

  const pb = document.getElementById('cm-perf-badge');
  if(pb) pb.innerHTML = `<span class="cm-badge ${perfClass}">${perfLabel}</span>`;

  // Risk badge color
  const riskEl = document.getElementById('cm-risk');
  if(riskEl) {
    riskEl.className = 'cm-card-val';
    const colors = {green:'#2d7a45', gold:'#c9a84c', red:'#e03030', blue:'#5577cc'};
    riskEl.style.color = colors[riskClass] || '#1a1a2e';
  }

  // Slab bonus toast
  if(slabBonus > 0 && !document.getElementById('cm-slab-note')) {
    const note = document.createElement('div');
    note.id = 'cm-slab-note';
    note.style.cssText = 'background:#e8f8ee;border:1px solid #b0e0c0;border-radius:8px;padding:10px 14px;font-size:12px;color:#2d7a45;font-weight:600;margin-top:10px';
    note.textContent = `🎉 Incentive Slab Bonus: +₹${slabBonus.toLocaleString('en-IN')} (Deal above ₹${val>=20000000?'2Cr':val>=10000000?'1Cr':'50L'})`;
    document.getElementById('cm-dashboard')?.appendChild(note);
  } else if(slabBonus === 0) {
    document.getElementById('cm-slab-note')?.remove();
  }
}

/* ── AUTO SAVE ── */
function cmAutoSave() {
  const ids = ['cm-client','cm-propname','cm-txtype','cm-val','cm-area','cm-closedate',
    'cm-paydate','cm-structure','cm-rate','cm-fixed','cm-side','cm-role','cm-split',
    'cm-cobrk','cm-tds','cm-gst','cm-bonus','cm-referral','cm-mktexp','cm-trvexp',
    'cm-docexp','cm-target','cm-paystatus','cm-advance'];
  const data = {};
  ids.forEach(id => { const el = document.getElementById(id); if(el) data[id] = el.value; });
  try { localStorage.setItem('cm_form_data', JSON.stringify(data)); } catch(e) {}
  calcCommission();
}

function cmLoadSaved() {
  try {
    const saved = localStorage.getItem('cm_form_data');
    if(!saved) return;
    const data = JSON.parse(saved);
    Object.entries(data).forEach(([id, val]) => {
      const el = document.getElementById(id);
      if(el) el.value = val;
    });
  } catch(e) {}
}

/* ── COPY SUMMARY ── */
function cmCopySummary() {
  const get = id => document.getElementById(id)?.textContent || '—';
  const summary = `=== COMMISSION SUMMARY ===
Client: ${document.getElementById('cm-client')?.value || '—'}
Property: ${document.getElementById('cm-propname')?.value || '—'}
Deal Value: ${document.getElementById('cm-val')?.value ? '₹'+Number(document.getElementById('cm-val').value).toLocaleString('en-IN') : '—'}

Gross Commission: ${get('cm-d-gross')}
Your Share: ${get('cm-d-share')}
TDS Deduction: ${get('cm-d-tds')}
Total Expenses: ${get('cm-d-exp')}
Incentive Bonus: ${get('cm-d-bonus')}
NET PAYOUT: ${get('cm-d-net')}

Effective Commission: ${get('cm-d-effpct')}
Payment Status: ${document.getElementById('cm-paystatus')?.value || '—'}
Payment Risk: ${get('cm-risk')}`;

  navigator.clipboard.writeText(summary).then(() => alert('✅ Summary copied!'));
}

/* ── RESET ── */
function cmResetForm() {
  if(!confirm('Reset all commission data?')) return;
  try { localStorage.removeItem('cm_form_data'); } catch(e) {}
  buildCommission(document.getElementById('panelBody'));
}
/* ─── 11. LOAN ELIGIBILITY ─── */
/* ═══════════════════════════════════════════════════════════
   🏦 LOAN ELIGIBILITY CALCULATOR — ENHANCED VERSION
   Replace buildLoan() and calcEligibility() with this block
═══════════════════════════════════════════════════════════ */

/* ── Employment Type ── */
const loanEmpTypes = {
  salaried:    { label: 'Salaried',                     multiplier: 1.00, maxLTV: 0.85 },
  selfemployed:{ label: 'Self Employed',                multiplier: 0.90, maxLTV: 0.80 },
  business:    { label: 'Business Owner',               multiplier: 0.92, maxLTV: 0.80 },
  professional:{ label: 'Professional (Doctor/CA/Lawyer)',multiplier: 1.05, maxLTV: 0.85 },
  government:  { label: 'Government Employee',          multiplier: 1.10, maxLTV: 0.90 },
  retired:     { label: 'Retired',                      multiplier: 0.80, maxLTV: 0.75 },
};

/* ── Credit Score ── */
const loanCreditScores = {
  excellent: { label: 'Excellent (750+)',      rateAdj: -0.25, confidence: '🟢 High Approval Chance',   color: '#4eca80' },
  good:      { label: 'Good (700–749)',        rateAdj:  0.00, confidence: '🟢 Good Approval Chance',   color: '#4eca80' },
  average:   { label: 'Average (650–699)',     rateAdj:  0.50, confidence: '🟡 Moderate Approval',       color: '#e8b84b' },
  below:     { label: 'Below Average (600–649)',rateAdj: 1.00, confidence: '🟠 Low Approval Chance',     color: '#e07b3a' },
  poor:      { label: 'Poor (Below 600)',      rateAdj:  2.00, confidence: '🔴 Very Difficult',          color: '#e74c3c' },
};

/* ── Banks ── */
const loanBanks = [
  { name: 'SBI',               baseRate: 8.50, processingPct: 0.0035, emoji: '🏛️' },
  { name: 'HDFC Bank',         baseRate: 8.75, processingPct: 0.0050, emoji: '🏦' },
  { name: 'ICICI Bank',        baseRate: 8.85, processingPct: 0.0050, emoji: '🏦' },
  { name: 'Axis Bank',         baseRate: 8.90, processingPct: 0.0100, emoji: '🏦' },
  { name: 'LIC Housing Finance',baseRate: 8.65, processingPct: 0.0025, emoji: '🏠' },
];

/* ── Documents ── */
const loanDocs = {
  salaried: [
    'Salary Slips (Last 3 months)', 'Form 16 (Last 2 years)', 'Bank Statements (6 months)',
    'Employment Certificate', 'Aadhaar Card', 'PAN Card', 'Passport size photos (2)',
    'Property Documents', 'IT Returns (2 years)'
  ],
  selfemployed: [
    'IT Returns (Last 3 years)', 'Business P&L Statement', 'Balance Sheet (3 years)',
    'Bank Statements (12 months)', 'Business License / GST Certificate',
    'Aadhaar Card', 'PAN Card', 'Property Documents', 'CA Certified Financials'
  ],
  business: [
    'Business Registration Certificate', 'IT Returns (3 years)', 'GST Returns (12 months)',
    'Bank Statements (12 months)', 'Partnership Deed / MOA / AOA',
    'Aadhaar Card', 'PAN Card', 'Property Documents', 'Business Continuity Proof'
  ],
  professional: [
    'Professional Degree Certificate', 'Practice License / Registration',
    'IT Returns (Last 3 years)', 'Bank Statements (6 months)',
    'Aadhaar Card', 'PAN Card', 'Property Documents', 'CA Certified Income Proof'
  ],
  government: [
    'Salary Certificate from Department', 'Service Book Copy', 'Form 16',
    'Bank Statements (6 months)', 'NOC from Employer',
    'Aadhaar Card', 'PAN Card', 'Property Documents'
  ],
  retired: [
    'Pension Slip / PPO', 'Bank Statements (12 months)', 'IT Returns (2 years)',
    'Aadhaar Card', 'PAN Card', 'Property Documents',
    'Life Certificate', 'Family Pension Details (if applicable)'
  ],
};

/* ── Formatters ── */
function loanFmt(n) {
  n = Math.round(n);
  if (n >= 10000000) return '₹' + (n / 10000000).toFixed(2) + ' Cr';
  if (n >= 100000)   return '₹' + (n / 100000).toFixed(2) + ' L';
  return '₹' + n.toLocaleString('en-IN');
}

function loanEMI(P, annualRate, months) {
  if (!P || !annualRate || !months) return 0;
  const r = annualRate / 12 / 100;
  return P * r * Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1);
}

function loanMaxAmt(emi, annualRate, months) {
  if (!emi || !annualRate || !months) return 0;
  const r = annualRate / 12 / 100;
  return emi * (Math.pow(1 + r, months) - 1) / (r * Math.pow(1 + r, months));
}

/* ── Animated counter ── */
function loanAnimate(id, target) {
  const el = document.getElementById(id);
  if (!el) return;
  const dur = 900, t0 = performance.now();
  (function tick(now) {
    const p = Math.min((now - t0) / dur, 1);
    const v = target * (1 - Math.pow(1 - p, 3));
    el.textContent = loanFmt(v);
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = loanFmt(target);
  })(t0);
}

/* ── Copy ── */
function loanCopy() {
  const el = document.getElementById('loan-copy-text');
  if (!el) return;
  navigator.clipboard.writeText(el.value).then(() => {
    const btn = document.getElementById('loan-copy-btn');
    if (!btn) return;
    btn.textContent = '✅ Copied!';
    btn.style.color = '#4eca80';
    setTimeout(() => { btn.textContent = '📋 Copy Report'; btn.style.color = '#c9a84c'; }, 2200);
  });
}

/* ── Print ── */
function loanPrint() {
  const txt = document.getElementById('loan-copy-text')?.value || '';
  const win = window.open('', '_blank');
  win.document.write(`<html><head><title>Loan Eligibility Report</title>
  <style>body{font-family:'DM Sans',sans-serif;padding:40px;color:#1a1a2e;background:#fdf8f0;}
  pre{font-size:14px;line-height:1.9;white-space:pre-wrap;}
  h2{color:#c9a84c;border-bottom:2px solid #c9a84c;padding-bottom:10px;margin-bottom:20px;}
  </style></head><body>
  <h2>🏦 J Square Housing — Loan Eligibility Report</h2>
  <pre>${txt}</pre></body></html>`);
  win.document.close(); win.print();
}

/* ════════════════════════
   BUILD PANEL
════════════════════════ */
function buildLoan(b) {
  b.innerHTML = `
  <p style="color:var(--text3);font-size:13px;margin-bottom:20px">
    Professional home loan qualification — instant eligibility analysis
  </p>

  <!-- ── INPUTS ROW 1 ── -->
  <div class="form-row">
    <div class="form-group">
      <label>மாத வருமானம் / Monthly Income (₹)</label>
      <input type="number" id="el-income" value="75000" oninput="calcEligibility()">
    </div>
    <div class="form-group">
      <label>Co-Applicant Income (₹) <span style="color:#aaa;font-size:10px">Optional</span></label>
      <input type="number" id="el-coapplicant" value="0" placeholder="Spouse / Family income" oninput="calcEligibility()">
    </div>
  </div>

  <!-- ── INPUTS ROW 2 ── -->
  <div class="form-row">
    <div class="form-group">
      <label>Existing EMI (₹)</label>
      <input type="number" id="el-existing" value="10000" oninput="calcEligibility()">
    </div>
    <div class="form-group">
      <label>வட்டி விகிதம் / Interest Rate (%)</label>
      <input type="number" id="el-rate" value="8.5" step="0.1" oninput="calcEligibility()">
    </div>
  </div>

  <!-- ── INPUTS ROW 3 ── -->
  <div class="form-row">
    <div class="form-group">
      <label>Loan Tenure</label>
      <select id="el-tenure" onchange="calcEligibility()">
        <option value="10">10 Years</option>
        <option value="15">15 Years</option>
        <option value="20" selected>20 Years</option>
        <option value="25">25 Years</option>
        <option value="30">30 Years</option>
      </select>
    </div>
    <div class="form-group">
      <label>Employment Type</label>
      <select id="el-emptype" onchange="calcEligibility()">
        ${Object.entries(loanEmpTypes).map(([k,v])=>`<option value="${k}">${v.label}</option>`).join('')}
      </select>
    </div>
  </div>

  <!-- ── INPUTS ROW 4 ── -->
  <div class="form-row">
    <div class="form-group">
      <label>Credit Score</label>
      <select id="el-credit" onchange="calcEligibility()">
        ${Object.entries(loanCreditScores).map(([k,v])=>`<option value="${k}">${v.label}</option>`).join('')}
      </select>
    </div>
    <div class="form-group">
      <label>Down Payment (₹) <span style="color:#aaa;font-size:10px">Optional</span></label>
      <input type="number" id="el-downpayment" value="500000" placeholder="Own contribution" oninput="calcEligibility()">
    </div>
  </div>

  <!-- ── MAIN RESULT CARD ── -->
  <div id="loan-main-card" style="
    background:linear-gradient(135deg,#1C1A14 0%,#2a2218 100%);
    border-radius:16px;padding:24px;margin:20px 0;display:none
  ">
    <div style="font-size:11px;letter-spacing:.08em;color:#c9a84c;text-transform:uppercase;font-weight:600;margin-bottom:6px">அதிகபட்ச கடன் தொகை</div>
    <div id="el-maxloan" style="font-size:2.2rem;font-weight:700;color:#fff">—</div>
    <div id="loan-credit-badge" style="display:inline-block;margin-top:12px;padding:5px 14px;border-radius:20px;font-size:12px;font-weight:700"></div>
    <div id="loan-approval-badge" style="display:inline-block;margin-top:12px;margin-left:8px;padding:5px 14px;border-radius:20px;font-size:12px;font-weight:700;background:rgba(255,255,255,0.08);color:#bbb"></div>
  </div>

  <!-- ── SUMMARY CARDS ── -->
  <div id="loan-summary-cards" style="display:none;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:20px">
    ${[
      ['el-maxemi','அதிகபட்ச EMI திறன்'],
      ['el-maxprop','Property Value'],
      ['el-status','தகுதி நிலை'],
    ].map(([id,label])=>`
      <div style="background:#fff;border:1.5px solid #e8dfc8;border-radius:12px;padding:16px;text-align:center;box-shadow:0 2px 8px rgba(0,0,0,0.05)">
        <div style="font-size:10px;color:#888;font-weight:600;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px">${label}</div>
        <div id="${id}" style="font-size:0.98rem;font-weight:700;color:#c9a84c">—</div>
      </div>
    `).join('')}
  </div>

  <!-- ── LTV + PROCESSING FEE ── -->
  <div id="loan-ltv-wrap" style="display:none;display:none;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px">
    <div style="background:#fff;border:1.5px solid #e8dfc8;border-radius:12px;padding:16px;box-shadow:0 2px 8px rgba(0,0,0,0.05)">
      <div style="font-size:12px;font-weight:700;color:#1a1a2e;margin-bottom:10px">📊 LTV Ratio</div>
      <div id="loan-ltv-val" style="font-size:1.4rem;font-weight:700;color:#c9a84c;margin-bottom:4px">—</div>
      <div style="height:6px;background:#f0e8d0;border-radius:3px;overflow:hidden;margin-bottom:6px">
        <div id="loan-ltv-bar" style="height:100%;background:#c9a84c;border-radius:3px;transition:width .7s ease"></div>
      </div>
      <div id="loan-ltv-note" style="font-size:11px;color:#888"></div>
    </div>
    <div style="background:#fff;border:1.5px solid #e8dfc8;border-radius:12px;padding:16px;box-shadow:0 2px 8px rgba(0,0,0,0.05)">
      <div style="font-size:12px;font-weight:700;color:#1a1a2e;margin-bottom:10px">💳 Processing Fee Est.</div>
      <div id="loan-proc-fee" style="font-size:1.1rem;font-weight:700;color:#c9a84c;margin-bottom:4px">—</div>
      <div id="loan-proc-note" style="font-size:11px;color:#888">0.25% – 1% of loan amount</div>
    </div>
  </div>

  <!-- ── AFFORDABILITY BADGE ── -->
  <div id="loan-afford-wrap" style="display:none;border-radius:12px;padding:16px;margin-bottom:20px;text-align:center">
    <div style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px">Affordability Assessment</div>
    <div id="loan-afford-label" style="font-size:1.1rem;font-weight:700"></div>
    <div id="loan-afford-note" style="font-size:12px;color:#888;margin-top:4px"></div>
  </div>
  <!-- ── BANK COMPARISON ── -->
  <div id="loan-bank-wrap" style="display:none;background:#fff;border:1.5px solid #e8dfc8;border-radius:14px;overflow:hidden;margin-bottom:20px;box-shadow:0 2px 12px rgba(0,0,0,0.06)">
    <div style="padding:14px 20px;background:#F5F0E8;border-bottom:1px solid #e8dfc8">
      <span style="font-size:13px;font-weight:700;color:#1a1a2e">🏦 Bank Comparison</span>
    </div>
    <div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse;font-size:12px">
        <thead>
          <tr style="background:#fdf6e3">
            <th style="padding:10px 12px;text-align:left;color:#888;font-weight:600;font-size:11px;text-transform:uppercase;border-bottom:1px solid #e8dfc8">Bank</th>
            <th style="padding:10px 12px;text-align:center;color:#888;font-weight:600;font-size:11px;text-transform:uppercase;border-bottom:1px solid #e8dfc8">Rate</th>
            <th style="padding:10px 12px;text-align:center;color:#888;font-weight:600;font-size:11px;text-transform:uppercase;border-bottom:1px solid #e8dfc8">Eligible Loan</th>
            <th style="padding:10px 12px;text-align:center;color:#888;font-weight:600;font-size:11px;text-transform:uppercase;border-bottom:1px solid #e8dfc8">EMI / Month</th>
            <th style="padding:10px 12px;text-align:right;color:#888;font-weight:600;font-size:11px;text-transform:uppercase;border-bottom:1px solid #e8dfc8">Processing Fee</th>
          </tr>
        </thead>
        <tbody id="loan-bank-body"></tbody>
      </table>
    </div>
    <div style="padding:10px 16px;font-size:10px;color:#aaa;background:#fdfaf4">* Rates are indicative. Check with bank for exact offers.</div>
  </div>

  <!-- ── TENURE COMPARISON ── -->
  <div id="loan-tenure-wrap" style="display:none;background:#fff;border:1.5px solid #e8dfc8;border-radius:14px;padding:20px;margin-bottom:20px;box-shadow:0 2px 12px rgba(0,0,0,0.06)">
    <div style="font-size:13px;font-weight:700;color:#1a1a2e;margin-bottom:16px">📅 Tenure Comparison</div>
    <div id="loan-tenure-grid" style="display:grid;grid-template-columns:repeat(5,1fr);gap:8px"></div>
  </div>

  <!-- ── INTEREST SENSITIVITY ── -->
  <div id="loan-sensitivity-wrap" style="display:none;background:#fff;border:1.5px solid #e8dfc8;border-radius:14px;padding:20px;margin-bottom:20px;box-shadow:0 2px 12px rgba(0,0,0,0.06)">
    <div style="font-size:13px;font-weight:700;color:#1a1a2e;margin-bottom:16px">📉 Interest Rate Sensitivity</div>
    <div id="loan-sensitivity-grid" style="display:grid;grid-template-columns:repeat(5,1fr);gap:8px"></div>
  </div>

  <!-- ── REQUIRED DOCUMENTS ── -->
  <div id="loan-docs-wrap" style="display:none;background:#fff;border:1.5px solid #e8dfc8;border-radius:14px;padding:20px;margin-bottom:20px;box-shadow:0 2px 12px rgba(0,0,0,0.06)">
    <div style="font-size:13px;font-weight:700;color:#1a1a2e;margin-bottom:16px">📁 Required Documents</div>
    <div id="loan-docs-list"></div>
  </div>

  <!-- ── EXPORT ── -->
  <div id="loan-export-wrap" style="display:none;gap:10px;flex-wrap:wrap;margin-bottom:8px">
    <button id="loan-copy-btn" onclick="loanCopy()" style="
      flex:1;min-width:140px;padding:13px;border-radius:12px;
      border:1.5px solid rgba(201,168,76,0.5);
      background:rgba(201,168,76,0.1);color:#c9a84c;
      font-size:13px;font-weight:600;cursor:pointer;
      font-family:'DM Sans',sans-serif;transition:all .25s
    ">📋 Copy Report</button>
    <button onclick="loanPrint()" style="
      flex:1;min-width:140px;padding:13px;border-radius:12px;
      border:1.5px solid rgba(255,255,255,0.1);
      background:rgba(255,255,255,0.04);color:#888;
      font-size:13px;font-weight:600;cursor:pointer;
      font-family:'DM Sans',sans-serif;transition:all .25s
    ">🖨️ Print Report</button>
  </div>
  <textarea id="loan-copy-text" style="display:none" readonly></textarea>
  `;

  calcEligibility();
}

/* ════════════════════════
   CALCULATE
════════════════════════ */
function calcEligibility() {
  const income      = +document.getElementById('el-income')?.value       || 0;
  const coIncome    = +document.getElementById('el-coapplicant')?.value  || 0;
  const existing    = +document.getElementById('el-existing')?.value     || 0;
  const baseRate    = +document.getElementById('el-rate')?.value         || 8.5;
  const tenureYrs   = +document.getElementById('el-tenure')?.value       || 20;
  const empKey      = document.getElementById('el-emptype')?.value       || 'salaried';
  const creditKey   = document.getElementById('el-credit')?.value        || 'good';
  const downPayment = +document.getElementById('el-downpayment')?.value  || 0;

  if (!income) return;

  const empData    = loanEmpTypes[empKey];
  const creditData = loanCreditScores[creditKey];
  const adjRate    = baseRate + creditData.rateAdj;
  const months     = tenureYrs * 12;

  const totalIncome   = (income + coIncome) * empData.multiplier;
  const maxEMI        = totalIncome * 0.50 - existing;
  const maxLoan       = Math.max(0, loanMaxAmt(maxEMI, adjRate, months));
  const propValue     = maxLoan + downPayment;
  const ltvRatio      = propValue > 0 ? (maxLoan / propValue) * 100 : 0;
  const processingFee = maxLoan * 0.005;

  const status =
    maxLoan > 5000000  ? '✅ தகுதியான' :
    maxLoan > 2000000  ? '⚠️ Marginal'  : '❌ Not Eligible';

  /* Pre-approval grade */
  const preApproval =
    maxLoan > 7500000  ? { label: '🏆 Excellent Eligibility', bg: 'rgba(78,202,128,0.15)',  color: '#4eca80'  } :
    maxLoan > 4000000  ? { label: '✅ Good Eligibility',       bg: 'rgba(201,168,76,0.15)',  color: '#c9a84c'  } :
    maxLoan > 2000000  ? { label: '⚠️ Moderate Eligibility',   bg: 'rgba(232,184,75,0.15)', color: '#e8b84b'  } :
                         { label: '🔴 Low Eligibility',        bg: 'rgba(231,76,60,0.15)',  color: '#e74c3c'  };

  /* Affordability */
  const debtRatio = (existing + Math.max(0, maxEMI)) / totalIncome;
  const afford =
    debtRatio < 0.35 ? { label: '🟢 Safe Budget',   bg: 'rgba(78,202,128,0.1)',  color: '#4eca80', note: 'EMI பாரம் கட்டுக்குள் உள்ளது. நல்ல முடிவு.' } :
    debtRatio < 0.50 ? { label: '🟡 Stretch Budget', bg: 'rgba(232,184,75,0.1)', color: '#e8b84b', note: 'கொஞ்சம் அழுத்தம் இருக்கும். கவனமாக திட்டமிடவும்.' } :
                       { label: '🔴 High Risk',      bg: 'rgba(231,76,60,0.1)',  color: '#e74c3c', note: 'EMI பாரம் அதிகம். முதலில் existing loan குறைக்கவும்.' };

  /* ── Show sections ── */
  document.getElementById('loan-main-card').style.display   = 'block';
  document.getElementById('loan-bank-wrap').style.display   = 'block';
  document.getElementById('loan-tenure-wrap').style.display = 'block';
  document.getElementById('loan-sensitivity-wrap').style.display = 'block';
  document.getElementById('loan-docs-wrap').style.display   = 'block';

  const sc = document.getElementById('loan-summary-cards');
  sc.style.display = 'grid';

  const ltv = document.getElementById('loan-ltv-wrap');
  ltv.style.display = 'grid';

  const aw = document.getElementById('loan-afford-wrap');
  aw.style.display = 'block';

  const ew = document.getElementById('loan-export-wrap');
  ew.style.display = 'flex';

  /* ── Main card ── */
  loanAnimate('el-maxloan', maxLoan);

  const cb = document.getElementById('loan-credit-badge');
  cb.textContent        = creditData.confidence;
  cb.style.background   = creditData.color + '22';
  cb.style.color        = creditData.color;
  cb.style.border       = `1px solid ${creditData.color}44`;

  const ab = document.getElementById('loan-approval-badge');
  ab.textContent        = preApproval.label;
  ab.style.background   = preApproval.bg;
  ab.style.color        = preApproval.color;

  /* ── Summary cards ── */
  document.getElementById('el-maxemi').textContent  = loanFmt(Math.max(0, maxEMI));
  document.getElementById('el-maxprop').textContent = loanFmt(propValue);
  document.getElementById('el-status').textContent  = status;

  /* ── LTV ── */
  document.getElementById('loan-ltv-val').textContent  = ltvRatio.toFixed(1) + '%';
  document.getElementById('loan-ltv-bar').style.width  = Math.min(ltvRatio, 100) + '%';
 document.getElementById('loan-ltv-note').textContent =
  ltvRatio <= 75 ? '✅ Good LTV — Easy approval' :
  ltvRatio <= 85 ? '⚠️ Moderate LTV — Manageable' : 
  ltvRatio <= 90 ? '🟠 High LTV — Increase down payment' :
                   '🔴 Very High LTV — Bank may reject';
  /* Processing fee */
  document.getElementById('loan-proc-fee').textContent = loanFmt(processingFee);

  /* ── Affordability ── */
  aw.style.background = afford.bg;
  aw.style.border     = `1.5px solid ${afford.color}44`;
  document.getElementById('loan-afford-label').textContent = afford.label;
  document.getElementById('loan-afford-label').style.color = afford.color;
  document.getElementById('loan-afford-note').textContent  = afford.note;

  /* ── Bank Comparison ── */
  document.getElementById('loan-bank-body').innerHTML = loanBanks.map((bank, i) => {
    const bankLoan = loanMaxAmt(Math.max(0, maxEMI), bank.baseRate + creditData.rateAdj, months);
    const bankEMI  = loanEMI(bankLoan, bank.baseRate + creditData.rateAdj, months);
    const procFee  = bankLoan * bank.processingPct;
    const isFirst  = i === 0;
    return `
      <tr style="border-bottom:1px solid #f0e8d8;background:${isFirst?'#fdf6e3':'#fff'}">
        <td style="padding:10px 12px;font-weight:${isFirst?'700':'400'};color:${isFirst?'#c9a84c':'#444'};font-size:12px">${bank.emoji} ${bank.name}${isFirst?' ⭐':''}</td>
        <td style="padding:10px 12px;text-align:center;color:#888;font-size:12px">${(bank.baseRate + creditData.rateAdj).toFixed(2)}%</td>
        <td style="padding:10px 12px;text-align:center;font-weight:600;color:#333;font-size:12px">${loanFmt(bankLoan)}</td>
        <td style="padding:10px 12px;text-align:center;color:#444;font-size:12px">${loanFmt(bankEMI)}/mo</td>
        <td style="padding:10px 12px;text-align:right;color:#888;font-size:12px">${loanFmt(procFee)}</td>
      </tr>`;
  }).join('');

  /* ── Tenure Comparison ── */
  document.getElementById('loan-tenure-grid').innerHTML = [10, 15, 20, 25, 30].map(yr => {
    const tLoan = loanMaxAmt(Math.max(0, maxEMI), adjRate, yr * 12);
    const isActive = yr === tenureYrs;
    return `
      <div style="text-align:center;padding:12px 8px;border-radius:10px;
        background:${isActive?'rgba(201,168,76,0.15)':'#faf8f3'};
        border:1.5px solid ${isActive?'#c9a84c':'#e8dfc8'}">
        <div style="font-size:11px;font-weight:700;color:${isActive?'#c9a84c':'#888'};margin-bottom:4px">${yr} Yrs</div>
        <div style="font-size:0.85rem;font-weight:700;color:${isActive?'#c9a84c':'#333'}">${loanFmt(tLoan)}</div>
      </div>`;
  }).join('');

  /* ── Interest Sensitivity ── */
  document.getElementById('loan-sensitivity-grid').innerHTML = [-2, -1, 0, 1, 2].map(adj => {
    const sRate = Math.max(0.1, adjRate + adj);
    const sLoan = loanMaxAmt(Math.max(0, maxEMI), sRate, months);
    const isBase = adj === 0;
    const color  = adj < 0 ? '#4eca80' : adj > 0 ? '#e74c3c' : '#c9a84c';
    return `
      <div style="text-align:center;padding:12px 8px;border-radius:10px;
        background:${isBase?'rgba(201,168,76,0.12)':'#faf8f3'};
        border:1.5px solid ${isBase?'#c9a84c':'#e8dfc8'}">
        <div style="font-size:11px;font-weight:700;color:${color};margin-bottom:4px">
          ${adj === 0 ? 'Current' : (adj > 0 ? '+' : '') + adj + '%'}
        </div>
        <div style="font-size:11px;color:#888;margin-bottom:3px">${sRate.toFixed(2)}%</div>
        <div style="font-size:0.82rem;font-weight:700;color:${color}">${loanFmt(sLoan)}</div>
      </div>`;
  }).join('');
/* ── Documents ── */
  const docsWrap = document.getElementById('loan-docs-wrap');
  const listEl   = document.getElementById('loan-docs-list');
  if (docsWrap && listEl) {
    docsWrap.style.display = 'block';
    const docs    = loanDocs[empKey] || loanDocs['salaried'];
    const total   = docs.length;
    const savedKey = `loan-docs-${empKey}`;
    let checked = [];
    try { checked = JSON.parse(localStorage.getItem(savedKey) || '[]'); } catch(e) {}
    const cnt = checked.length;
    const pct = total ? Math.round(cnt / total * 100) : 0;

    listEl.innerHTML = `
      <div style="font-size:12px;color:#888;margin-bottom:12px">
        ${loanEmpTypes[empKey].label} — Required Documents
      </div>
      <div style="margin-bottom:14px">
        <div style="display:flex;justify-content:space-between;font-size:12px;color:#888;margin-bottom:6px">
          <span>${cnt} / ${total} collected</span>
          <span>${pct}%</span>
        </div>
        <div style="height:6px;background:#f0e8d0;border-radius:3px;overflow:hidden">
          <div style="height:100%;background:#c9a84c;border-radius:3px;width:${pct}%;transition:width .4s ease"></div>
        </div>
      </div>
      ${docs.map((doc, i) => {
        const isChecked = checked.includes(i);
        return `
          <div onclick="loanDocToggle('${empKey}', ${i})" style="
            display:flex;align-items:center;gap:12px;
            padding:11px 0;border-bottom:1px solid #f0e8d0;cursor:pointer">
            <div style="
              width:22px;height:22px;border-radius:6px;flex-shrink:0;
              border:2px solid ${isChecked ? '#c9a84c' : '#d0c9b8'};
              background:${isChecked ? '#c9a84c' : 'transparent'};
              display:flex;align-items:center;justify-content:center;transition:all .2s">
              ${isChecked ? '<span style="color:#fff;font-size:13px;font-weight:700">✓</span>' : ''}
            </div>
            <span style="font-size:13px;
              color:${isChecked ? '#aaa' : '#1a1a2e'};
              text-decoration:${isChecked ? 'line-through' : 'none'}">
              ${doc}
            </span>
          </div>`;
      }).join('')}
      <div style="margin-top:14px;display:flex;gap:8px">
        <button onclick="loanDocsClear('${empKey}')" style="
          padding:8px 16px;border-radius:8px;border:1.5px solid #e0d8c8;
          background:transparent;color:#888;font-size:12px;cursor:pointer;
          font-family:'DM Sans',sans-serif">🔄 Reset</button>
        <button onclick="loanDocsAll('${empKey}', ${total})" style="
          padding:8px 16px;border-radius:8px;
          border:1.5px solid rgba(201,168,76,0.4);
          background:rgba(201,168,76,0.1);color:#c9a84c;
          font-size:12px;cursor:pointer;font-family:'DM Sans',sans-serif">✅ Select All</button>
      </div>`;
  }
  /* ── Copy Text ── */
  document.getElementById('loan-copy-text').value =
`=== Loan Eligibility Report ===
Employment Type      : ${empData.label}
Credit Score         : ${loanCreditScores[creditKey].label}
Approval Confidence  : ${creditData.confidence}

Primary Income       : ${loanFmt(income)}
Co-Applicant Income  : ${loanFmt(coIncome)}
Total Income         : ${loanFmt(totalIncome)}
Existing EMI         : ${loanFmt(existing)}
Eligible EMI         : ${loanFmt(Math.max(0, maxEMI))}

Interest Rate        : ${adjRate.toFixed(2)}% (Base ${baseRate}% + Credit ${creditData.rateAdj}%)
Loan Tenure          : ${tenureYrs} Years
Maximum Loan         : ${loanFmt(maxLoan)}
Down Payment         : ${loanFmt(downPayment)}
Property Value       : ${loanFmt(propValue)}

LTV Ratio            : ${ltvRatio.toFixed(1)}%
Processing Fee       : ${loanFmt(processingFee)}
Pre-Approval         : ${preApproval.label}
Affordability        : ${afford.label}

Tenure Comparison:
${[10,15,20,25,30].map(yr=>`  ${yr} Years : ${loanFmt(loanMaxAmt(Math.max(0,maxEMI),adjRate,yr*12))}`).join('\n')}

Bank Comparison:
${loanBanks.map(bank=>{
  const bl=loanMaxAmt(Math.max(0,maxEMI),bank.baseRate+creditData.rateAdj,months);
  return `  ${bank.name.padEnd(20)}: ${loanFmt(bl)} @ ${(bank.baseRate+creditData.rateAdj).toFixed(2)}%`;
}).join('\n')}
================================
Generated by J Square Housing Tools`;
}
function loanDocToggle(empKey, idx) {
  const savedKey = `loan-docs-${empKey}`;
  let checked = [];
  try { checked = JSON.parse(localStorage.getItem(savedKey) || '[]'); } catch(e) {}
  if (checked.includes(idx)) {
    checked = checked.filter(i => i !== idx);
  } else {
    checked.push(idx);
  }
  localStorage.setItem(savedKey, JSON.stringify(checked));
  calcEligibility();
}

function loanDocsClear(empKey) {
  localStorage.removeItem(`loan-docs-${empKey}`);
  calcEligibility();
}

function loanDocsAll(empKey, total) {
  localStorage.setItem(`loan-docs-${empKey}`, JSON.stringify(
    Array.from({ length: total }, (_, i) => i)
  ));
  calcEligibility();
}
/* ─── 12. RENTAL MANAGER ─── */

/* ══════════════════════════════════════════════════════════════════
   CONFIG — penalty modes, tenant statuses, reminder templates
   ══════════════════════════════════════════════════════════════════ */
const RENT_CONFIG = {
  penaltyModes: [
    { label: "Fixed Fee per Month",    value: "fixed"      },
    { label: "Daily Fee (per day late)",value: "daily"     },
    { label: "% of Monthly Rent",      value: "percentage" },
    { label: "No Late Fee",            value: "none"       },
  ],
  tenantStatus: [
    { label: "Active",           value: "active",   color: "#4ade80" },
    { label: "Pending",          value: "pending",  color: "#f5a623" },
    { label: "Renewal Pending",  value: "renewal",  color: "#60a5fa" },
    { label: "Notice Period",    value: "notice",   color: "#fb923c" },
    { label: "Moved Out",        value: "moved",    color: "#94a3b8" },
    { label: "Blacklisted",      value: "black",    color: "#f87171" },
  ],
  leaseTypes: [
    { label: "Monthly",     value: "monthly"    },
    { label: "Long Term",   value: "longterm"   },
    { label: "Short Term",  value: "shortterm"  },
    { label: "Commercial",  value: "commercial" },
    { label: "PG / Hostel", value: "pg"         },
  ],
  propertyTypes: [
    { label: "Apartment",         value: "apartment"  },
    { label: "Independent House", value: "house"      },
    { label: "Villa",             value: "villa"      },
    { label: "Commercial",        value: "commercial" },
    { label: "PG / Hostel",       value: "pg"         },
    { label: "Land / Plot",       value: "land"       },
  ],
  paymentMethods: [
    { label: "Cash",         value: "cash"   },
    { label: "Bank Transfer",value: "bank"   },
    { label: "UPI / GPay",   value: "upi"    },
    { label: "Cheque",       value: "cheque" },
  ],
  reminderTones: [
    { label: "Friendly",     value: "friendly"     },
    { label: "Professional", value: "professional" },
    { label: "Urgent",       value: "urgent"       },
    { label: "Legal Notice", value: "legal"        },
  ],
};

/* ══════════════════════════════════════════════════════════════════
   REMINDER TEMPLATES — tone × overdue combination
   ══════════════════════════════════════════════════════════════════ */
const REMINDER_TEMPLATES = {
  friendly: {
    paid:    (n,c)=>`Hi ${n}! 😊\n\nThank you for paying your rent on time. We really appreciate it!\n\nWishing you a wonderful month ahead.\n\n— ${c}`,
    low:     (n,mo,amt,tot,c)=>`Hi ${n}! 👋\n\nHope you're doing well! Just a gentle reminder that rent for ${mo} month${mo>1?'s':''} is pending.\n\n💰 Rent Due: ₹${fmt(amt)}\n⚠️ Late Fee: ₹${fmt(tot-amt)}\n📊 Total: ₹${fmt(tot)}\n\nWhenever you get a chance, please do settle this. Let me know if you need anything!\n\n— ${c}`,
    high:    (n,mo,amt,tot,c)=>`Hi ${n},\n\nI wanted to check in regarding the pending rent for ${mo} months.\n\n💰 Rent Due: ₹${fmt(amt)}\n⚠️ Late Fee: ₹${fmt(tot-amt)}\n📊 Total Outstanding: ₹${fmt(tot)}\n\nCould you please share a timeline for the payment? Happy to work something out.\n\n— ${c}`,
  },
  professional: {
    paid:    (n,c)=>`Dear ${n},\n\nThis is to acknowledge receipt of your rental payment for the current month. Your account is up to date.\n\nThank you for your continued cooperation.\n\nRegards,\n${c}`,
    low:     (n,mo,amt,tot,c)=>`Dear ${n},\n\nThis is a polite reminder that your rent payment for ${mo} month${mo>1?'s':''} remains outstanding.\n\nOutstanding Rent: ₹${fmt(amt)}\nApplicable Late Fee: ₹${fmt(tot-amt)}\nTotal Payable: ₹${fmt(tot)}\n\nKindly arrange payment at the earliest convenience to avoid further charges.\n\nRegards,\n${c}`,
    high:    (n,mo,amt,tot,c)=>`Dear ${n},\n\nDespite previous reminders, your rent for ${mo} months remains unpaid.\n\nTotal Outstanding: ₹${fmt(tot)}\n\nWe request immediate payment within 7 days to avoid escalation. Please contact us to discuss a resolution.\n\nRegards,\n${c}`,
  },
  urgent: {
    paid:    (n,c)=>`✅ ${n} — Rent received. Account cleared. Thank you.\n\n— ${c}`,
    low:     (n,mo,amt,tot,c)=>`⚠️ RENT REMINDER — ${n}\n\n${mo} month${mo>1?'s':''} overdue.\n\n🔴 Total Due: ₹${fmt(tot)}\n\nPlease pay IMMEDIATELY to avoid penalty escalation.\n\n— ${c}`,
    high:    (n,mo,amt,tot,c)=>`🚨 FINAL REMINDER — ${n}\n\n${mo} MONTHS OVERDUE\n\n💸 Total Payable: ₹${fmt(tot)}\n\nImmediate payment required. Further delay may result in legal action.\n\nContact us NOW: [Your Number]\n\n— ${c}`,
  },
  legal: {
    paid:    (n,c)=>`Dear ${n},\n\nPayment acknowledged. No further action required.\n\n${c}`,
    low:     (n,mo,amt,tot,c)=>`LEGAL NOTICE\n\nTo: ${n}\n\nYou are hereby notified that rental dues for ${mo} month${mo>1?'s':''} amounting to ₹${fmt(tot)} remain unpaid.\n\nYou are required to clear all outstanding dues within 15 days of this notice failing which appropriate legal proceedings may be initiated under applicable tenancy laws.\n\n${c}`,
    high:    (n,mo,amt,tot,c)=>`LEGAL NOTICE — FINAL DEMAND\n\nTo: ${n}\n\nTake notice that you have defaulted on rental payments for ${mo} consecutive months. Total outstanding: ₹${fmt(tot)}.\n\nUnless full payment is received within 7 days, we shall proceed with eviction proceedings and recovery action under applicable law without further notice.\n\n${c}`,
  },
};

/* ══════════════════════════════════════════════════════════════════
   RISK SCORING ENGINE
   ══════════════════════════════════════════════════════════════════ */
function calcTenantRiskScore(overdue, leaseMonths, depositMonths, lateHistory) {
  let score = 100;
  // Overdue penalty
  if (overdue === 0) score += 10;
  else if (overdue === 1) score -= 15;
  else if (overdue === 2) score -= 30;
  else score -= (30 + (overdue - 2) * 12);
  // Lease stability bonus
  if (leaseMonths >= 24) score += 10;
  else if (leaseMonths >= 12) score += 5;
  // Deposit strength bonus
  if (depositMonths >= 3) score += 8;
  else if (depositMonths >= 2) score += 4;
  // Late history
  score -= lateHistory * 5;
  score = Math.min(100, Math.max(0, score));
  const grade = score >= 75 ? { label: "Low Risk ✅",    color: "#4ade80" }
              : score >= 50 ? { label: "Medium Risk ⚠️", color: "#f5a623" }
                            : { label: "High Risk 🔴",   color: "#f87171" };
  return { score, grade };
}

/* ══════════════════════════════════════════════════════════════════
   PENALTY CALCULATOR
   ══════════════════════════════════════════════════════════════════ */
function calcPenalty(mode, rent, overdue, fixedFee, pct, daysLate) {
  switch (mode) {
    case 'fixed':      return fixedFee * overdue;
    case 'daily':      return fixedFee * daysLate;
    case 'percentage': return Math.round((pct / 100) * rent * overdue);
    case 'none':       return 0;
    default:           return 0;
  }
}

/* ══════════════════════════════════════════════════════════════════
   FORMAT HELPER
   ══════════════════════════════════════════════════════════════════ */
function fmt(n) {
  return '₹' + Number(n).toLocaleString('en-IN');
}

/* ══════════════════════════════════════════════════════════════════
   PAYMENT TIMELINE RENDERER
   ══════════════════════════════════════════════════════════════════ */
function buildPaymentTimeline(overdue, leaseMonths) {
  const total = Math.min(leaseMonths || 12, 24);
  const paid  = Math.max(0, total - overdue);
  let html = '<div style="display:flex;flex-wrap:wrap;gap:5px;margin-top:6px">';
  for (let i = 0; i < total; i++) {
    const isPaid = i < paid;
    const isOverdue = i >= paid;
    const bg  = isPaid ? '#4ade80' : '#f87171';
    const tip = isPaid ? `Month ${i+1}: Paid` : `Month ${i+1}: Overdue`;
    html += `<div title="${tip}" style="width:22px;height:22px;border-radius:4px;background:${bg};opacity:${isPaid?1:0.85};cursor:default;font-size:9px;display:flex;align-items:center;justify-content:center;color:#000;font-weight:700">${isPaid?'✓':'!'}</div>`;
  }
  html += '</div>';
  return html;
}

/* ══════════════════════════════════════════════════════════════════
   EXPENSE / PROFIT CALCULATOR
   ══════════════════════════════════════════════════════════════════ */
function calcNetProfit(rent, overdue, maintenance, electricity, tax, brokerFee, other) {
  const monthlyRent    = rent;
  const collectedRent  = rent * Math.max(0, 1 - (overdue > 0 ? 1 : 0));
  const totalExpenses  = maintenance + electricity + tax + brokerFee + other;
  const netProfit      = collectedRent - totalExpenses;
  const yieldPct       = rent > 0 ? ((netProfit / (rent * 12)) * 100).toFixed(1) : 0;
  return { collectedRent, totalExpenses, netProfit, yieldPct };
}

/* ══════════════════════════════════════════════════════════════════
   SECTION + CARD HELPERS
   ══════════════════════════════════════════════════════════════════ */
function rsec(icon, label) {
  return `<div style="font-size:11px;color:var(--text3);font-weight:600;letter-spacing:.08em;margin:20px 0 8px;text-transform:uppercase;border-top:1px solid rgba(255,255,255,0.06);padding-top:14px">${icon} ${label}</div>`;
}
function rcard(html) {
  return `<div style="background:rgba(255,255,255,0.04);border-radius:10px;padding:12px 14px;font-size:12px;color:var(--text2);line-height:1.8">${html}</div>`;
}
function rrow(label, val, color) {
  return `<div style="display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid rgba(255,255,255,0.05)">
    <span style="color:var(--text3)">${label}</span>
    <span style="font-weight:700;color:${color||'var(--text1)'}">${val}</span></div>`;
}

/* ══════════════════════════════════════════════════════════════════
   BUILD RENT — main entry point (same function name as before)
   ══════════════════════════════════════════════════════════════════ */
function buildRent(b) {
  b.innerHTML = `
    <p style="color:var(--text3);font-size:13px;margin-bottom:20px">
      Complete tenant + lease + expense details for full financial report, risk score, and smart reminders.
    </p>

    <!-- TENANT INFO -->
    <div style="font-size:11px;color:var(--text3);font-weight:600;letter-spacing:.08em;margin-bottom:8px;text-transform:uppercase">🏠 Tenant & Property</div>
    <div class="form-row">
      <div class="form-group"><label>Tenant Name</label><input type="text" id="rt-name" value="Senthil Kumar" oninput="calcRentTrack()"></div>
      <div class="form-group"><label>Monthly Rent (₹)</label><input type="number" id="rt-rent" value="18000" oninput="calcRentTrack()"></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Tenant Status</label>
        <select id="rt-status" onchange="calcRentTrack()">
          ${RENT_CONFIG.tenantStatus.map((s,i)=>`<option value="${s.value}"${i===0?' selected':''}>${s.label}</option>`).join('')}
        </select>
      </div>
      <div class="form-group"><label>Property Type</label>
        <select id="rt-proptype" onchange="calcRentTrack()">
          ${RENT_CONFIG.propertyTypes.map((s,i)=>`<option value="${s.value}"${i===0?' selected':''}>${s.label}</option>`).join('')}
        </select>
      </div>
    </div>

    <!-- LEASE INFO -->
    <div style="font-size:11px;color:var(--text3);font-weight:600;letter-spacing:.08em;margin:16px 0 8px;text-transform:uppercase">📋 Lease Details</div>
    <div class="form-row">
      <div class="form-group"><label>Lease Type</label>
        <select id="rt-leasetype" onchange="calcRentTrack()">
          ${RENT_CONFIG.leaseTypes.map((s,i)=>`<option value="${s.value}"${i===0?' selected':''}>${s.label}</option>`).join('')}
        </select>
      </div>
      <div class="form-group"><label>Lease Duration (Months)</label>
        <input type="number" id="rt-leasemonths" value="12" min="1" oninput="calcRentTrack()">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Due Date (Day of Month)</label>
        <input type="number" id="rt-dueday" value="5" min="1" max="31">
      </div>
      <div class="form-group"><label>Notice Period (Days)</label>
        <input type="number" id="rt-notice" value="30" min="0">
      </div>
    </div>

    <!-- PAYMENT INFO -->
    <div style="font-size:11px;color:var(--text3);font-weight:600;letter-spacing:.08em;margin:16px 0 8px;text-transform:uppercase">💰 Payment Details</div>
    <div class="form-row">
      <div class="form-group"><label>Overdue Months</label>
        <input type="number" id="rt-overdue" value="2" min="0" max="36" oninput="calcRentTrack()">
      </div>
      <div class="form-group"><label>Security Deposit (₹)</label>
        <input type="number" id="rt-deposit" value="54000" oninput="calcRentTrack()">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Penalty Mode</label>
        <select id="rt-penaltymode" onchange="calcRentTrack()">
          ${RENT_CONFIG.penaltyModes.map((s,i)=>`<option value="${s.value}"${i===0?' selected':''}>${s.label}</option>`).join('')}
        </select>
      </div>
      <div class="form-group"><label>Late Fee / Month (₹) or %</label>
        <input type="number" id="rt-latefee" value="500" oninput="calcRentTrack()">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Times Paid Late (History)</label>
        <input type="number" id="rt-latehistory" value="1" min="0" oninput="calcRentTrack()">
      </div>
      <div class="form-group"><label>Payment Method</label>
        <select id="rt-paymethod" onchange="calcRentTrack()">
          ${RENT_CONFIG.paymentMethods.map((s,i)=>`<option value="${s.value}"${i===0?' selected':''}>${s.label}</option>`).join('')}
        </select>
      </div>
    </div>

    <!-- EXPENSE TRACKING -->
    <div style="font-size:11px;color:var(--text3);font-weight:600;letter-spacing:.08em;margin:16px 0 8px;text-transform:uppercase">🔧 Monthly Expenses (₹)</div>
    <div class="form-row">
      <div class="form-group"><label>Maintenance / Repair</label>
        <input type="number" id="rt-maint" value="500" oninput="calcRentTrack()">
      </div>
      <div class="form-group"><label>Electricity / Water</label>
        <input type="number" id="rt-elec" value="300" oninput="calcRentTrack()">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Property Tax (monthly)</label>
        <input type="number" id="rt-tax" value="200" oninput="calcRentTrack()">
      </div>
      <div class="form-group"><label>Broker / Other Fee</label>
        <input type="number" id="rt-broker" value="0" oninput="calcRentTrack()">
      </div>
    </div>

    <!-- REMINDER SETTINGS -->
    <div style="font-size:11px;color:var(--text3);font-weight:600;letter-spacing:.08em;margin:16px 0 8px;text-transform:uppercase">📱 Reminder Settings</div>
    <div class="form-row">
      <div class="form-group"><label>Reminder Tone</label>
        <select id="rt-tone" onchange="calcRentTrack()">
          ${RENT_CONFIG.reminderTones.map((s,i)=>`<option value="${s.value}"${i===0?' selected':''}>${s.label}</option>`).join('')}
        </select>
      </div>
      <div class="form-group"><label>Company / Owner Name</label>
        <input type="text" id="rt-company" value="J Square Housing" oninput="calcRentTrack()">
      </div>
    </div>

    <button class="calc-btn" onclick="calcRentTrack()">🏘️ Generate Full Report →</button>

    <!-- RESULTS PANEL -->
    <div id="rt-result-panel" style="display:none;margin-top:24px">

      <!-- STATUS ROW -->
      <div id="rt-status-banner" style="padding:10px 14px;border-radius:10px;font-size:13px;font-weight:700;margin-bottom:4px"></div>

      <!-- FINANCIAL SUMMARY -->
      <div id="rt-finance-section"></div>

      <!-- RISK SCORE -->
      <div id="rt-risk-section"></div>

      <!-- PAYMENT TIMELINE -->
      <div id="rt-timeline-section"></div>

      <!-- DEPOSIT ANALYSIS -->
      <div id="rt-deposit-section"></div>

      <!-- EXPENSE & PROFIT -->
      <div id="rt-expense-section"></div>

      <!-- REMINDER MESSAGE -->
      <div id="rt-reminder-section"></div>

    </div>`;

  calcRentTrack();
}

/* ══════════════════════════════════════════════════════════════════
   calcRentTrack — called on every input change + on load
   ══════════════════════════════════════════════════════════════════ */
function calcRentTrack() {
  // ── Read inputs ──
  const name        = (document.getElementById('rt-name')?.value        || 'Tenant').trim();
  const rent        = +(document.getElementById('rt-rent')?.value       || 0);
  const overdue     = +(document.getElementById('rt-overdue')?.value    || 0);
  const deposit     = +(document.getElementById('rt-deposit')?.value    || 0);
  const latefee     = +(document.getElementById('rt-latefee')?.value    || 0);
  const latehistory = +(document.getElementById('rt-latehistory')?.value|| 0);
  const leasemonths = +(document.getElementById('rt-leasemonths')?.value|| 12);
  const penaltymode = document.getElementById('rt-penaltymode')?.value  || 'fixed';
  const tone        = document.getElementById('rt-tone')?.value         || 'professional';
  const company     = (document.getElementById('rt-company')?.value     || 'Management').trim();
  const maint       = +(document.getElementById('rt-maint')?.value      || 0);
  const elec        = +(document.getElementById('rt-elec')?.value       || 0);
  const tax         = +(document.getElementById('rt-tax')?.value        || 0);
  const broker      = +(document.getElementById('rt-broker')?.value     || 0);

  const panel = document.getElementById('rt-result-panel');
  if (!panel) return;
  panel.style.display = 'block';

  // ── Calculations ──
  const overdueAmt    = rent * overdue;
  const penalty       = calcPenalty(penaltymode, rent, overdue, latefee, latefee, overdue * 30);
  const totalDue      = overdueAmt + penalty;
  const depositMonths = rent > 0 ? Math.round((deposit / rent) * 10) / 10 : 0;
  const depositCovers = deposit >= totalDue;
  const { score: riskScore, grade: riskGrade } = calcTenantRiskScore(overdue, leasemonths, depositMonths, latehistory);
  const { collectedRent, totalExpenses, netProfit, yieldPct } = calcNetProfit(rent, overdue, maint, elec, tax, broker, 0);

  // ── Status banner ──
  const banner = document.getElementById('rt-status-banner');
  if (banner) {
    const [bg, txt, msg] =
      overdue === 0 ? ['rgba(74,222,128,0.12)', '#4ade80', `✅ ${name} — Rent is current. No dues outstanding.`]
    : overdue <= 2  ? ['rgba(245,166,35,0.12)',  '#f5a623', `⚠️ ${name} — ${overdue} month${overdue>1?'s':''} overdue. Follow-up recommended.`]
                    : ['rgba(248,113,113,0.12)', '#f87171', `🔴 ${name} — ${overdue} months overdue. Immediate action required.`];
    banner.style.background = bg;
    banner.style.color      = txt;
    banner.textContent      = msg;
  }

  // ── Financial Summary ──
  const fin = document.getElementById('rt-finance-section');
  if (fin) fin.innerHTML = rsec('💰','Financial Summary') + rcard(
    rrow('Monthly Rent',           fmt(rent))                                   +
    rrow('Overdue Months',         overdue + ' month' + (overdue!==1?'s':''))   +
    rrow('Overdue Rent Amount',    fmt(overdueAmt),  overdue>0?'#f87171':'#4ade80') +
    rrow('Penalty / Late Fee',     fmt(penalty),     penalty>0?'#fb923c':'#94a3b8') +
    rrow('Total Amount Due',       fmt(totalDue),    totalDue>0?'#f87171':'#4ade80') +
    rrow('Payment Status',         overdue===0?'✅ Fully Paid':'❌ Outstanding', overdue===0?'#4ade80':'#f87171')
  );

  // ── Risk Score ──
  const risk = document.getElementById('rt-risk-section');
  if (risk) {
    const barW = riskScore;
    risk.innerHTML = rsec('🎯','Tenant Risk Score') + rcard(
      `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
        <span style="font-size:1.4rem;font-weight:900;color:${riskGrade.color}">${riskScore}/100</span>
        <span style="font-weight:700;color:${riskGrade.color}">${riskGrade.label}</span>
       </div>
       <div style="background:rgba(255,255,255,0.08);border-radius:99px;height:8px;overflow:hidden">
         <div style="height:100%;width:${barW}%;background:${riskGrade.color};border-radius:99px;transition:width 0.8s ease"></div>
       </div>
       <div style="margin-top:10px;font-size:11px;color:var(--text3)">
         Factors: Overdue months · Lease stability · Deposit strength · Late payment history
       </div>`
    );
  }

  // ── Payment Timeline ──
  const tl = document.getElementById('rt-timeline-section');
  if (tl) tl.innerHTML = rsec('📅','Payment Timeline') + rcard(
    `<div style="font-size:11px;color:var(--text3);margin-bottom:6px">
       Paid: ${Math.max(0,leasemonths-overdue)} months &nbsp;|&nbsp; Overdue: ${Math.min(overdue,leasemonths)} months
     </div>` +
    buildPaymentTimeline(overdue, leasemonths)
  );

  // ── Deposit Analysis ──
  const dep = document.getElementById('rt-deposit-section');
  if (dep) dep.innerHTML = rsec('🔒','Security Deposit Analysis') + rcard(
    rrow('Security Deposit Held',      fmt(deposit))                                    +
    rrow('Deposit Covers (months)',     depositMonths + ' months')                       +
    rrow('Covers Current Outstanding', depositCovers ? '✅ Yes' : '⚠️ Partial / No', depositCovers?'#4ade80':'#f87171') +
    rrow('Deposit After Adjustment',   fmt(Math.max(0, deposit - totalDue)), deposit-totalDue>=0?'#4ade80':'#f87171')
  );

  // ── Expense & Profit ──
  const exp = document.getElementById('rt-expense-section');
  if (exp) exp.innerHTML = rsec('📊','Monthly Expense & Profit') + rcard(
    rrow('Rent Collected',     fmt(overdue===0 ? rent : 0),  overdue===0?'#4ade80':'#f87171') +
    rrow('Maintenance',        fmt(maint),  '#fb923c')   +
    rrow('Electricity / Water',fmt(elec),   '#fb923c')   +
    rrow('Property Tax',       fmt(tax),    '#fb923c')   +
    rrow('Broker / Other',     fmt(broker), '#fb923c')   +
    rrow('Total Expenses',     fmt(totalExpenses), '#f87171') +
    rrow('Net Profit (Month)',  fmt(Math.max(0,overdue===0?rent-totalExpenses:0-totalExpenses)), netProfit>0?'#4ade80':'#f87171') +
    `<div style="margin-top:8px;font-size:11px;color:var(--text3)">Net Yield (annualised): <strong style="color:var(--text1)">${yieldPct}%</strong></div>`
  );

  // ── Reminder Message ──
  const tonePack   = REMINDER_TEMPLATES[tone] || REMINDER_TEMPLATES.professional;
  const templateFn = overdue === 0 ? tonePack.paid
                   : overdue <= 2  ? tonePack.low
                                   : tonePack.high;
  const msg = typeof templateFn === 'function'
    ? templateFn(name, overdue, overdueAmt, totalDue, company)
    : `Reminder for ${name}: ₹${fmt(totalDue)} outstanding.`;

  const rem = document.getElementById('rt-reminder-section');
  if (rem) rem.innerHTML = rsec('📱','Smart Reminder Message') + rcard(
    `<div style="white-space:pre-line;margin-bottom:12px;line-height:1.8">${msg}</div>
     <button class="copy-btn green" onclick="navigator.clipboard.writeText(document.getElementById('rt-msg-hidden').textContent)">📋 Copy WhatsApp Message</button>
     <div id="rt-msg-hidden" style="display:none">${msg}</div>`
  );
}
/* ─── 13. DUE DILIGENCE ─── */
/* ═══════════════════════════════════════════════════════════
   🏠 DUE DILIGENCE CALCULATOR — ENHANCED VERSION
   Features: Risk Score, Health Score, Breakdown Table,
   Missing Docs, Recommended Actions, Legal Recommendation,
   Copy & Print Export, Animated Counters, Auto Recalc
   (No PDF Download — Feature 11 excluded)
═══════════════════════════════════════════════════════════ */

/* ── Property Types ── */
const ddPropertyTypes = {
  residential_plot: 'Residential Plot',
  apartment:        'Apartment',
  villa:            'Villa',
  commercial:       'Commercial Property',
  agricultural:     'Agricultural Land',
};

/* ── Core Questions ── */
const ddCoreQuestions = [
  { id: 'ec',        label: 'Encumbrance Certificate (EC) Clear?',       weight: 15, risk: 'High'   },
  { id: 'patta',     label: 'Patta in Seller Name?',                      weight: 15, risk: 'High'   },
  { id: 'sale_deed', label: 'Original Sale Deed Available?',              weight: 12, risk: 'High'   },
  { id: 'tax',       label: 'Property Tax Receipts Up-to-date?',          weight: 8,  risk: 'Medium' },
  { id: 'legal',     label: 'Legal Opinion Obtained?',                    weight: 10, risk: 'High'   },
  { id: 'layout',    label: 'Approved Layout / Plan Available?',          weight: 10, risk: 'Medium' },
  { id: 'boundary',  label: 'Boundary & Survey Verified?',                weight: 8,  risk: 'Medium' },
  { id: 'dispute',   label: 'No Ongoing Court Disputes?',                 weight: 12, risk: 'High'   },
  { id: 'loan_clear',label: 'No Existing Loan / Mortgage on Property?',   weight: 10, risk: 'High'   },
];

/* ── Additional Questions ── */
const ddAdditionalQuestions = [
  { id: 'parent_docs',   label: 'Parent Documents Available?',            weight: 8,  risk: 'Medium' },
  { id: 'fmb',           label: 'FMB / Survey Sketch Available?',         weight: 6,  risk: 'Low'    },
  { id: 'electricity',   label: 'Electricity Connection Available?',      weight: 4,  risk: 'Low'    },
  { id: 'water',         label: 'Water Connection Available?',             weight: 4,  risk: 'Low'    },
  { id: 'bank_eligible', label: 'Bank Loan Eligible?',                    weight: 6,  risk: 'Medium' },
  { id: 'road_width',    label: 'Access Road Width Adequate?',             weight: 5,  risk: 'Medium' },
  { id: 'govt_acquire',  label: 'No Nearby Government Acquisition Risk?', weight: 8,  risk: 'High'   },
  { id: 'seller_verify', label: 'Seller Identity Verified?',              weight: 7,  risk: 'High'   },
  { id: 'chitta',        label: 'Chitta Available?',                      weight: 6,  risk: 'Medium' },
  { id: 'aadhaar_pan',   label: 'Aadhaar / PAN of Seller Collected?',     weight: 5,  risk: 'Medium' },
];

/* ── Missing Documents List ── */
const ddMissingDocsList = [
  'Patta', 'Chitta', 'EC (Encumbrance Certificate)',
  'Sale Deed', 'Approved Layout Copy', 'FMB Sketch',
  'Tax Receipts', 'Parent Documents', 'Identity Proof',
  'Aadhaar / PAN',
];

/* ── Required Documents per Property Type ── */
const ddRequiredDocs = {
  residential_plot: ['Patta', 'Chitta', 'EC', 'Sale Deed', 'FMB Sketch', 'Tax Receipts', 'Approved Layout Copy'],
  apartment:        ['Sale Deed', 'EC', 'Approved Plan', 'Completion Certificate', 'Tax Receipts', 'Society NOC'],
  villa:            ['Patta', 'EC', 'Sale Deed', 'Approved Plan', 'FMB Sketch', 'Tax Receipts', 'Building Permit'],
  commercial:       ['EC', 'Sale Deed', 'Approved Plan', 'Trade License', 'Tax Receipts', 'Fire NOC'],
  agricultural:     ['Patta', 'Chitta', 'EC', 'Sale Deed', 'FMB Sketch', 'Conversion Order', 'Tax Receipts'],
};

/* ── Recommended Actions by Failed Check ── */
const ddActions = {
  ec:           '⚠️ Obtain EC for last 30 years from Sub-Registrar Office.',
  patta:        '📋 Verify Patta transfer — visit local Revenue Office.',
  sale_deed:    '📄 Request original Sale Deed from seller immediately.',
  tax:          '🧾 Collect latest Property Tax receipts from seller.',
  legal:        '👨‍⚖️ Engage a qualified property lawyer for legal opinion.',
  layout:       '🏛️ Get Approved Layout copy from Local Body / CMDA / DTCP.',
  boundary:     '📐 Conduct physical survey with a licensed surveyor.',
  dispute:      '⚖️ Verify court records — check eCourts.nic.in.',
  loan_clear:   '🏦 Obtain NOC from bank if existing mortgage exists.',
  parent_docs:  '📁 Request parent documents (previous sale deeds) from seller.',
  fmb:          '🗺️ Obtain FMB / Survey Sketch from Survey Department.',
  electricity:  '💡 Check EB meter status with TNEB / local board.',
  water:        '🚿 Verify water connection from local municipality.',
  bank_eligible:'🏦 Pre-check loan eligibility with a bank before purchase.',
  road_width:   '🛣️ Verify access road width meets minimum 12ft standard.',
  govt_acquire: '🏛️ Check with local Revenue / NHAI for acquisition notices.',
  seller_verify:'🪪 Collect Aadhaar + PAN + Passport photo from seller.',
  chitta:       '📋 Obtain Chitta from Revenue Department or e-Sevai portal.',
  aadhaar_pan:  '🪪 Collect Aadhaar & PAN copies from seller for records.',
};

/* ── State ── */
let ddSelectedMissing = [];
let ddAnswers = {};

/* ── Formatters ── */
function ddAnimate(id, target, suffix = '') {
  const el = document.getElementById(id);
  if (!el) return;
  const dur = 800, t0 = performance.now();
  (function tick(now) {
    const p = Math.min((now - t0) / dur, 1);
    const v = Math.round(target * (1 - Math.pow(1 - p, 3)));
    el.textContent = v + suffix;
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = target + suffix;
  })(t0);
}

/* ── Copy ── */
function ddCopy() {
  const txt = document.getElementById('dd-copy-text')?.value || '';
  navigator.clipboard.writeText(txt).then(() => {
    const btn = document.getElementById('dd-copy-btn');
    if (!btn) return;
    btn.textContent = '✅ Copied!';
    btn.style.color = '#4eca80';
    setTimeout(() => { btn.textContent = '📋 Copy Summary'; btn.style.color = '#c9a84c'; }, 2200);
  });
}

/* ── Print ── */
function ddPrint() {
  const txt = document.getElementById('dd-copy-text')?.value || '';
  const win = window.open('', '_blank');
  win.document.write(`<html><head><title>Due Diligence Report</title>
  <style>body{font-family:'DM Sans',sans-serif;padding:40px;color:#1a1a2e;background:#fdf8f0;}
  pre{font-size:14px;line-height:1.9;white-space:pre-wrap;}
  h2{color:#c9a84c;border-bottom:2px solid #c9a84c;padding-bottom:10px;margin-bottom:20px;}
  </style></head><body>
  <h2>🏠 J Square Housing — Due Diligence Report</h2>
  <pre>${txt}</pre></body></html>`);
  win.document.close(); win.print();
}

/* ── Missing Docs Toggle ── */
function ddToggleMissing(doc) {
  if (ddSelectedMissing.includes(doc)) {
    ddSelectedMissing = ddSelectedMissing.filter(d => d !== doc);
  } else {
    ddSelectedMissing.push(doc);
  }
  ddCalc();
}

/* ════════════════════════
   BUILD PANEL
════════════════════════ */
function buildDueDiligence(b) {
  const allQ = [...ddCoreQuestions, ...ddAdditionalQuestions];

  b.innerHTML = `
  <p style="color:var(--text3);font-size:13px;margin-bottom:20px">
    Professional property legal verification — instant risk analysis
  </p>

  <!-- ── Property Type ── -->
  <div class="form-row">
    <div class="form-group" style="grid-column:1/-1">
      <label>Property Type</label>
      <select id="dd-proptype" onchange="ddCalc()">
        ${Object.entries(ddPropertyTypes).map(([k,v])=>`<option value="${k}">${v}</option>`).join('')}
      </select>
    </div>
  </div>

  <!-- ── Verification Progress ── -->
  <div style="margin-bottom:20px">
    <div style="display:flex;justify-content:space-between;font-size:12px;color:#888;margin-bottom:6px">
      <span style="font-weight:600;color:#1a1a2e">✅ Verification Progress</span>
      <span id="dd-prog-label">0 / ${allQ.length} answered</span>
    </div>
    <div style="height:7px;background:#f0e8d0;border-radius:4px;overflow:hidden">
      <div id="dd-prog-bar" style="height:100%;background:linear-gradient(90deg,#c9a84c,#e8b84b);border-radius:4px;width:0%;transition:width .5s ease"></div>
    </div>
    <div style="text-align:right;font-size:11px;color:#c9a84c;margin-top:4px;font-weight:600" id="dd-prog-pct">0%</div>
  </div>

  <!-- ── Core Questions ── -->
  <div style="background:#fff;border:1.5px solid #e8dfc8;border-radius:14px;overflow:hidden;margin-bottom:16px;box-shadow:0 2px 8px rgba(0,0,0,0.05)">
    <div style="padding:13px 18px;background:#F5F0E8;border-bottom:1px solid #e8dfc8">
      <span style="font-size:13px;font-weight:700;color:#1a1a2e">📋 Core Due Diligence Checks</span>
    </div>
    <div style="padding:8px 0">
      ${ddCoreQuestions.map(q => ddQuestionRow(q)).join('')}
    </div>
  </div>

  <!-- ── Additional Questions ── -->
  <div style="background:#fff;border:1.5px solid #e8dfc8;border-radius:14px;overflow:hidden;margin-bottom:16px;box-shadow:0 2px 8px rgba(0,0,0,0.05)">
    <div style="padding:13px 18px;background:#F5F0E8;border-bottom:1px solid #e8dfc8">
      <span style="font-size:13px;font-weight:700;color:#1a1a2e">🔍 Additional Verification Checks</span>
    </div>
    <div style="padding:8px 0">
      ${ddAdditionalQuestions.map(q => ddQuestionRow(q)).join('')}
    </div>
  </div>

  <!-- ── Missing Documents ── -->
  <div style="background:#fff;border:1.5px solid #e8dfc8;border-radius:14px;padding:18px;margin-bottom:20px;box-shadow:0 2px 8px rgba(0,0,0,0.05)">
    <div style="font-size:13px;font-weight:700;color:#1a1a2e;margin-bottom:12px">📂 Missing Documents</div>
    <div style="display:flex;flex-wrap:wrap;gap:8px" id="dd-missing-chips">
      ${ddMissingDocsList.map(doc => `
        <div onclick="ddToggleMissing('${doc}')" id="dd-chip-${doc.replace(/[^a-z0-9]/gi,'_')}"
          style="padding:6px 14px;border-radius:20px;font-size:12px;font-weight:600;cursor:pointer;
            border:1.5px solid #e0d8c8;background:#faf8f3;color:#888;transition:all .2s">
          ${doc}
        </div>
      `).join('')}
    </div>
    <div id="dd-missing-list" style="margin-top:12px"></div>
  </div>

  <!-- ── MAIN RESULT CARD ── -->
  <div id="dd-main-card" style="
    background:linear-gradient(135deg,#1C1A14 0%,#2a2218 100%);
    border-radius:16px;padding:24px;margin:20px 0;display:none
  ">
    <div style="font-size:11px;letter-spacing:.08em;color:#c9a84c;text-transform:uppercase;font-weight:600;margin-bottom:6px">Risk Score</div>
    <div id="dd-risk-score-display" style="font-size:2.5rem;font-weight:700;color:#fff">—</div>
    <div id="dd-risk-badge" style="display:inline-block;margin-top:12px;padding:6px 16px;border-radius:20px;font-size:13px;font-weight:700"></div>
    <div id="dd-legal-badge" style="display:inline-block;margin-top:12px;margin-left:8px;padding:6px 16px;border-radius:20px;font-size:12px;font-weight:700;background:rgba(255,255,255,0.08);color:#bbb"></div>
  </div>

  <!-- ── SUMMARY CARDS ── -->
  <div id="dd-summary-cards" style="display:none;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:20px">
    ${[
      ['dd-passed','✅ Passed Checks'],
      ['dd-failed','❌ Failed Checks'],
      ['dd-health','🏠 Property Health'],
    ].map(([id,label])=>`
      <div style="background:#fff;border:1.5px solid #e8dfc8;border-radius:12px;padding:16px;text-align:center;box-shadow:0 2px 8px rgba(0,0,0,0.05)">
        <div style="font-size:10px;color:#888;font-weight:600;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px">${label}</div>
        <div id="${id}" style="font-size:1.1rem;font-weight:700;color:#c9a84c">—</div>
      </div>
    `).join('')}
  </div>

  <!-- ── GOVT APPROVAL STATUS ── -->
  <div id="dd-govt-wrap" style="display:none;background:#fff;border:1.5px solid #e8dfc8;border-radius:12px;padding:16px;margin-bottom:16px;box-shadow:0 2px 8px rgba(0,0,0,0.05)">
    <div style="font-size:12px;font-weight:700;color:#1a1a2e;margin-bottom:10px">🏛️ Government Approval Status</div>
    <div id="dd-govt-status" style="font-size:1rem;font-weight:700"></div>
    <div id="dd-govt-note" style="font-size:11px;color:#888;margin-top:4px"></div>
  </div>

  <!-- ── RISK BREAKDOWN TABLE ── -->
  <div id="dd-breakdown-wrap" style="display:none;background:#fff;border:1.5px solid #e8dfc8;border-radius:14px;overflow:hidden;margin-bottom:20px;box-shadow:0 2px 12px rgba(0,0,0,0.06)">
    <div style="padding:13px 18px;background:#F5F0E8;border-bottom:1px solid #e8dfc8">
      <span style="font-size:13px;font-weight:700;color:#1a1a2e">📊 Detailed Risk Breakdown</span>
    </div>
    <div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse;font-size:12px">
        <thead>
          <tr style="background:#fdf6e3">
            <th style="padding:10px 14px;text-align:left;color:#888;font-weight:600;font-size:11px;text-transform:uppercase;border-bottom:1px solid #e8dfc8">Check Item</th>
            <th style="padding:10px 14px;text-align:center;color:#888;font-weight:600;font-size:11px;text-transform:uppercase;border-bottom:1px solid #e8dfc8">Status</th>
            <th style="padding:10px 14px;text-align:center;color:#888;font-weight:600;font-size:11px;text-transform:uppercase;border-bottom:1px solid #e8dfc8">Risk Impact</th>
            <th style="padding:10px 14px;text-align:right;color:#888;font-weight:600;font-size:11px;text-transform:uppercase;border-bottom:1px solid #e8dfc8">Score</th>
          </tr>
        </thead>
        <tbody id="dd-breakdown-body"></tbody>
      </table>
    </div>
  </div>

  <!-- ── REQUIRED DOCUMENTS CHECKLIST ── -->
  <div id="dd-reqdocs-wrap" style="display:none;background:#fff;border:1.5px solid #e8dfc8;border-radius:14px;padding:18px;margin-bottom:20px;box-shadow:0 2px 12px rgba(0,0,0,0.06)">
    <div style="font-size:13px;font-weight:700;color:#1a1a2e;margin-bottom:14px">📁 Required Documents Checklist</div>
    <div id="dd-reqdocs-list"></div>
  </div>

  <!-- ── RECOMMENDED ACTIONS ── -->
  <div id="dd-actions-wrap" style="display:none;background:#fff;border:1.5px solid #e8dfc8;border-radius:14px;padding:18px;margin-bottom:20px;box-shadow:0 2px 12px rgba(0,0,0,0.06)">
    <div style="font-size:13px;font-weight:700;color:#1a1a2e;margin-bottom:14px">🎯 Recommended Actions</div>
    <div id="dd-actions-list"></div>
  </div>

  <!-- ── LEGAL RECOMMENDATION ── -->
  <div id="dd-legal-wrap" style="display:none;border-radius:12px;padding:18px;margin-bottom:20px;text-align:center">
    <div style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px">Legal Verification Recommendation</div>
    <div id="dd-legal-label" style="font-size:1.2rem;font-weight:700"></div>
    <div id="dd-legal-note" style="font-size:12px;color:#888;margin-top:6px"></div>
  </div>

  <!-- ── EXPORT ── -->
  <div id="dd-export-wrap" style="display:none;gap:10px;flex-wrap:wrap;margin-bottom:8px">
    <button id="dd-copy-btn" onclick="ddCopy()" style="
      flex:1;min-width:140px;padding:13px;border-radius:12px;
      border:1.5px solid rgba(201,168,76,0.5);
      background:rgba(201,168,76,0.1);color:#c9a84c;
      font-size:13px;font-weight:600;cursor:pointer;
      font-family:'DM Sans',sans-serif;transition:all .25s
    ">📋 Copy Summary</button>
    <button onclick="ddPrint()" style="
      flex:1;min-width:140px;padding:13px;border-radius:12px;
      border:1.5px solid rgba(255,255,255,0.1);
      background:rgba(255,255,255,0.04);color:#888;
      font-size:13px;font-weight:600;cursor:pointer;
      font-family:'DM Sans',sans-serif;transition:all .25s
    ">🖨️ Print Report</button>
  </div>
  <textarea id="dd-copy-text" style="display:none" readonly></textarea>
  `;

  ddCalc();
}

/* ── Question Row HTML ── */
function ddQuestionRow(q) {
  return `
    <div style="display:flex;align-items:center;justify-content:space-between;
      padding:11px 18px;border-bottom:1px solid #f5f0e8">
      <div>
        <span style="font-size:13px;color:#1a1a2e">${q.label}</span>
        <span style="margin-left:8px;font-size:10px;padding:2px 8px;border-radius:10px;font-weight:600;
          background:${q.risk==='High'?'rgba(231,76,60,0.1)':q.risk==='Medium'?'rgba(232,184,75,0.1)':'rgba(78,202,128,0.1)'};
          color:${q.risk==='High'?'#e74c3c':q.risk==='Medium'?'#e8b84b':'#4eca80'}">
          ${q.risk} Risk
        </span>
      </div>
      <div style="display:flex;gap:6px">
        <button onclick="ddSetAnswer('${q.id}','yes')" id="dd-yes-${q.id}" style="
          padding:5px 14px;border-radius:8px;font-size:12px;font-weight:600;cursor:pointer;
          border:1.5px solid #d0d0d0;background:#fff;color:#888;
          font-family:'DM Sans',sans-serif;transition:all .2s">Yes</button>
        <button onclick="ddSetAnswer('${q.id}','no')" id="dd-no-${q.id}" style="
          padding:5px 14px;border-radius:8px;font-size:12px;font-weight:600;cursor:pointer;
          border:1.5px solid #d0d0d0;background:#fff;color:#888;
          font-family:'DM Sans',sans-serif;transition:all .2s">No</button>
      </div>
    </div>`;
}

/* ── Set Answer ── */
function ddSetAnswer(id, val) {
  ddAnswers[id] = val;

  const allQ = [...ddCoreQuestions, ...ddAdditionalQuestions];
  allQ.forEach(q => {
    const yBtn = document.getElementById(`dd-yes-${q.id}`);
    const nBtn = document.getElementById(`dd-no-${q.id}`);
    if (!yBtn || !nBtn) return;
    if (q.id !== id) return;
    if (val === 'yes') {
      yBtn.style.background = '#4eca80'; yBtn.style.color = '#fff'; yBtn.style.borderColor = '#4eca80';
      nBtn.style.background = '#fff';    nBtn.style.color = '#888'; nBtn.style.borderColor = '#d0d0d0';
    } else {
      nBtn.style.background = '#e74c3c'; nBtn.style.color = '#fff'; nBtn.style.borderColor = '#e74c3c';
      yBtn.style.background = '#fff';    yBtn.style.color = '#888'; yBtn.style.borderColor = '#d0d0d0';
    }
  });

  ddCalc();
}

/* ════════════════════════
   CALCULATE
════════════════════════ */
function ddCalc() {
  const allQ      = [...ddCoreQuestions, ...ddAdditionalQuestions];
  const propType  = document.getElementById('dd-proptype')?.value || 'residential_plot';
  const answered  = allQ.filter(q => ddAnswers[q.id]);
  const passed    = allQ.filter(q => ddAnswers[q.id] === 'yes');
  const failed    = allQ.filter(q => ddAnswers[q.id] === 'no');
  const total     = allQ.length;
  const progPct   = Math.round(answered.length / total * 100);
  const healthPct = answered.length > 0 ? Math.round(passed.length / answered.length * 100) : 0;

  /* Risk Score: sum of weights of FAILED items */
  const maxRisk   = allQ.reduce((s, q) => s + q.weight, 0);
  const failScore = failed.reduce((s, q) => s + q.weight, 0);
  const riskScore = answered.length > 0 ? Math.round((failScore / maxRisk) * 100) : 0;

  /* Progress bar */
  const pb = document.getElementById('dd-prog-bar');
  const pl = document.getElementById('dd-prog-label');
  const pp = document.getElementById('dd-prog-pct');
  if (pb) pb.style.width = progPct + '%';
  if (pl) pl.textContent = `${answered.length} / ${total} answered`;
  if (pp) pp.textContent = progPct + '%';

  /* Update missing chips */
  ddMissingDocsList.forEach(doc => {
    const el = document.getElementById(`dd-chip-${doc.replace(/[^a-z0-9]/gi,'_')}`);
    if (!el) return;
    if (ddSelectedMissing.includes(doc)) {
      el.style.background = 'rgba(231,76,60,0.1)';
      el.style.color      = '#e74c3c';
      el.style.borderColor= '#e74c3c';
    } else {
      el.style.background = '#faf8f3';
      el.style.color      = '#888';
      el.style.borderColor= '#e0d8c8';
    }
  });

  /* Missing docs list */
  const ml = document.getElementById('dd-missing-list');
  if (ml) {
    ml.innerHTML = ddSelectedMissing.length > 0
      ? `<div style="font-size:12px;color:#e74c3c;font-weight:600;margin-bottom:6px">⚠️ ${ddSelectedMissing.length} document(s) missing:</div>` +
        ddSelectedMissing.map(d=>`<div style="font-size:12px;color:#888;padding:3px 0">• ${d}</div>`).join('')
      : '';
  }

  if (answered.length === 0) return;

  /* Risk Level */
  const riskLevel =
    riskScore <= 15 ? { label: '🟢 Low Risk',       color: '#4eca80', bg: 'rgba(78,202,128,0.15)'  } :
    riskScore <= 35 ? { label: '🟡 Moderate Risk',  color: '#e8b84b', bg: 'rgba(232,184,75,0.15)'  } :
    riskScore <= 55 ? { label: '🟠 High Risk',       color: '#e07b3a', bg: 'rgba(224,123,58,0.15)'  } :
                      { label: '🔴 Very High Risk',  color: '#e74c3c', bg: 'rgba(231,76,60,0.15)'   };

  /* Legal Recommendation */
  const legal =
    riskScore <= 15 ? { label: '✅ Safe to Proceed',                color: '#4eca80', bg: 'rgba(78,202,128,0.08)',  note: 'All major checks cleared. You may proceed with purchase.' } :
    riskScore <= 35 ? { label: '⚠️ Proceed with Caution',           color: '#e8b84b', bg: 'rgba(232,184,75,0.08)',  note: 'Some checks pending. Resolve before final agreement.' } :
    riskScore <= 55 ? { label: '👨‍⚖️ Legal Verification Recommended', color: '#e07b3a', bg: 'rgba(224,123,58,0.08)',  note: 'Engage a property lawyer before any payment.' } :
                      { label: '🚫 Avoid Purchase',                 color: '#e74c3c', bg: 'rgba(231,76,60,0.08)',   note: 'Multiple critical issues. Do not proceed without full clearance.' };

  /* Govt Approval */
  const govtApproved = ddAnswers['layout'] === 'yes';
  const govtVerified = ddAnswers['ec'] === 'yes' && ddAnswers['patta'] === 'yes';
  const govtStatus =
    govtApproved && govtVerified ? { label: '✅ Approved',            color: '#4eca80', note: 'Layout approved & key documents verified.' } :
    govtApproved || govtVerified ? { label: '🟡 Partially Verified',  color: '#e8b84b', note: 'Some government approvals pending.' } :
                                   { label: '🔴 Unapproved',          color: '#e74c3c', note: 'No government approvals confirmed. High risk.' };

  /* ── Show sections ── */
  document.getElementById('dd-main-card').style.display     = 'block';
  document.getElementById('dd-summary-cards').style.display = 'grid';
  document.getElementById('dd-govt-wrap').style.display     = 'block';
  document.getElementById('dd-breakdown-wrap').style.display= 'block';
  document.getElementById('dd-reqdocs-wrap').style.display  = 'block';
  document.getElementById('dd-actions-wrap').style.display  = 'block';
  document.getElementById('dd-legal-wrap').style.display    = 'block';
  document.getElementById('dd-export-wrap').style.display   = 'flex';

  /* ── Main Card ── */
  ddAnimate('dd-risk-score-display', riskScore, '/100');
  const rb = document.getElementById('dd-risk-badge');
  rb.textContent      = riskLevel.label;
  rb.style.background = riskLevel.bg;
  rb.style.color      = riskLevel.color;
  rb.style.border     = `1px solid ${riskLevel.color}44`;

  const lb = document.getElementById('dd-legal-badge');
  lb.textContent = legal.label;
  lb.style.color = legal.color;

  /* ── Summary Cards ── */
  ddAnimate('dd-passed', passed.length);
  ddAnimate('dd-failed', failed.length);
  document.getElementById('dd-health').textContent = healthPct + '%';
  document.getElementById('dd-health').style.color =
    healthPct >= 80 ? '#4eca80' : healthPct >= 50 ? '#e8b84b' : '#e74c3c';

  /* ── Govt Status ── */
  document.getElementById('dd-govt-status').textContent = govtStatus.label;
  document.getElementById('dd-govt-status').style.color = govtStatus.color;
  document.getElementById('dd-govt-note').textContent   = govtStatus.note;

  /* ── Breakdown Table ── */
  const answeredQ = allQ.filter(q => ddAnswers[q.id]);
  document.getElementById('dd-breakdown-body').innerHTML = answeredQ.map((q, i) => {
    const isPass  = ddAnswers[q.id] === 'yes';
    const color   = isPass ? '#4eca80' : '#e74c3c';
    const impact  = isPass ? '—' : `+${q.weight} pts`;
    return `
      <tr style="border-bottom:1px solid #f0e8d8;background:${i%2===0?'#fff':'#fdfaf4'}">
        <td style="padding:10px 14px;color:#444;font-size:12px">${q.label}</td>
        <td style="padding:10px 14px;text-align:center;font-weight:700;font-size:12px;color:${color}">
          ${isPass ? '✅ Pass' : '❌ Fail'}
        </td>
        <td style="padding:10px 14px;text-align:center;font-size:12px;color:${isPass?'#aaa':'#e74c3c'};font-weight:${isPass?'400':'600'}">${impact}</td>
        <td style="padding:10px 14px;text-align:right;font-size:12px;color:#888">${q.weight}</td>
      </tr>`;
  }).join('');

  /* ── Required Documents Checklist ── */
  const reqDocs = ddRequiredDocs[propType] || [];
  document.getElementById('dd-reqdocs-list').innerHTML = reqDocs.map(doc => {
    const isMissing = ddSelectedMissing.some(m => m.toLowerCase().includes(doc.toLowerCase()) || doc.toLowerCase().includes(m.toLowerCase()));
    return `
      <div style="display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid #f5f0e8">
        <span style="font-size:14px">${isMissing ? '❌' : '✅'}</span>
        <span style="font-size:13px;color:${isMissing?'#e74c3c':'#444'};
          text-decoration:${isMissing?'line-through':'none'}">${doc}</span>
        ${isMissing ? '<span style="margin-left:auto;font-size:10px;font-weight:700;color:#e74c3c;background:rgba(231,76,60,0.1);padding:2px 8px;border-radius:10px">MISSING</span>' : ''}
      </div>`;
  }).join('') || '<div style="font-size:13px;color:#aaa">Select property type to see required documents.</div>';

  /* ── Recommended Actions ── */
  const actionItems = failed.map(q => ddActions[q.id]).filter(Boolean);
  const missingActions = ddSelectedMissing.map(d => `📄 Collect missing document: <strong>${d}</strong>`);
  const allActions = [...actionItems, ...missingActions];
  document.getElementById('dd-actions-list').innerHTML = allActions.length > 0
    ? allActions.map(a=>`
        <div style="display:flex;align-items:flex-start;gap:10px;padding:9px 0;border-bottom:1px solid #f5f0e8;font-size:13px;color:#444">
          ${a}
        </div>`).join('')
    : '<div style="font-size:13px;color:#4eca80;font-weight:600">✅ No immediate actions required. All checks passed!</div>';

  /* ── Legal Recommendation ── */
  const lw = document.getElementById('dd-legal-wrap');
  lw.style.background = legal.bg;
  lw.style.border     = `1.5px solid ${legal.color}44`;
  document.getElementById('dd-legal-label').textContent = legal.label;
  document.getElementById('dd-legal-label').style.color = legal.color;
  document.getElementById('dd-legal-note').textContent  = legal.note;

  /* ── Copy Text ── */
  document.getElementById('dd-copy-text').value =
`=== Due Diligence Report ===
Property Type        : ${ddPropertyTypes[propType]}
Risk Score           : ${riskScore}/100
Risk Level           : ${riskLevel.label}
Property Health      : ${healthPct}%
Verification Progress: ${progPct}%

Passed Checks        : ${passed.length}
Failed Checks        : ${failed.length}
Answered             : ${answered.length} / ${total}

Government Status    : ${govtStatus.label}
Legal Recommendation : ${legal.label}

Failed Items:
${failed.map(q=>`  ❌ ${q.label} (Weight: ${q.weight})`).join('\n') || '  None'}

Missing Documents:
${ddSelectedMissing.map(d=>`  • ${d}`).join('\n') || '  None selected'}

Recommended Actions:
${allActions.map(a=>`  → ${a.replace(/<[^>]+>/g,'')}`).join('\n') || '  No actions required'}

================================
Generated by J Square Housing Tools`;
}
/* ─── 14. LISTING WRITER (AI) ─── */
function buildListing(b){
  b.innerHTML=`
    <p style="color:var(--text3);font-size:13px;margin-bottom:20px">Fill details — AI generates professional listing in Tamil/English</p>
    <div class="form-row">
      <div class="form-group"><label>Property Type</label>
        <select id="lw-type">
          <option>2 BHK Apartment</option><option>3 BHK Apartment</option><option>4 BHK Villa</option>
          <option>Residential Plot</option><option>Commercial Plot</option><option>Farm Land</option>
        </select>
      </div>
      <div class="form-group"><label>Area (sq.ft)</label><input type="number" id="lw-sqft" value="1200"></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Location</label><input type="text" id="lw-location" value="Hasthampatti, Salem"></div>
      <div class="form-group"><label>Price (₹)</label><input type="number" id="lw-price" value="6500000"></div>
    </div>
    <div class="form-group"><label>Key Features (comma separated)</label>
      <input type="text" id="lw-features" value="DTCP Approved, Corner Plot, 40ft Road, East Facing">
    </div>
    <div class="form-row">
      <div class="form-group"><label>Language</label>
        <select id="lw-lang"><option>English</option><option>Tamil</option><option>Both</option></select>
      </div>
      <div class="form-group"><label>Tone</label>
        <select id="lw-tone"><option>Professional</option><option>Urgent / Hot deal</option><option>Premium / Luxury</option></select>
      </div>
    </div>
    <button class="calc-btn" onclick="genListing()">✍️ Generate Listing →</button>
    <div id="lw-result" style="display:none">
      <div class="ai-output" id="lw-output"></div>
      <button class="copy-btn gold" onclick="navigator.clipboard.writeText(document.getElementById('lw-output').textContent)" style="margin-top:12px">📋 Copy to Clipboard</button>
    </div>`;
}
async function genListing(){
  const type=document.getElementById('lw-type').value;
  const sqft=document.getElementById('lw-sqft').value;
  const loc=document.getElementById('lw-location').value;
  const price=document.getElementById('lw-price').value;
  const features=document.getElementById('lw-features').value;
  const lang=document.getElementById('lw-lang').value;
  const tone=document.getElementById('lw-tone').value;
  const out=document.getElementById('lw-output');
  const res=document.getElementById('lw-result');
  res.style.display='block';
  out.innerHTML='<div class="ai-loading"><span></span><span></span><span></span> Generating listing...</div>';
  try{
    const GROQ_KEY='Enter qrok key'; 
    const prompt=`You are a real estate listing writer for Salem, Tamil Nadu. Write a ${tone} property listing.
Property: ${type}, ${sqft} sq.ft, ${loc}
Price: ₹${parseInt(price).toLocaleString('en-IN')}
Features: ${features}
Language: ${lang}
Write a compelling listing description with emojis. Keep it under 200 words. Include key highlights, location benefits, and a call to action.`;
    const resp=await fetch('https://api.groq.com/openai/v1/chat/completions',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Authorization':'Bearer '+GROQ_KEY
      },
      body:JSON.stringify({
        model:'llama-3.3-70b-versatile',
        messages:[{role:'user',content:prompt}],
        max_tokens:1000
      })
    });
    const data=await resp.json();
    if(data.error){
      out.textContent='API Error: '+data.error.message;
      return;
    }
    out.textContent=data.choices[0].message.content;
  }catch(e){out.textContent='Error: '+e.message;}
}
/* ─── 15. WHATSAPP GENERATOR (AI) ─── */
function buildWhatsApp(b){
  b.innerHTML=`
    <p style="color:var(--text3);font-size:13px;margin-bottom:20px">Enter property details — WhatsApp broadcast message ready</p>
    <div class="form-row">
      <div class="form-group"><label>Message Purpose</label>
        <select id="wa-purpose">
          <option>New Property Launch 🏗️</option><option>Price Drop Alert 🔥</option>
          <option>Site Visit Invitation 📍</option><option>Festive Special Offer 🎉</option>
          <option>Last Few Plots Remaining ⚡</option>
        </select>
      </div>
      <div class="form-group"><label>Language</label>
        <select id="wa-lang"><option>Tamil</option><option>English</option></select>
      </div>
    </div>
    <div class="form-group"><label>Property Description</label>
      <input type="text" id="wa-property" value="3 BHK Villa Plots, Hasthampatti, Salem — ₹45L onwards">
    </div>
    <div class="form-row">
      <div class="form-group"><label>Contact Number</label><input type="text" id="wa-phone" value="+91 98765 43210"></div>
      <div class="form-group"><label>Deadline / Offer ends</label><input type="text" id="wa-deadline" placeholder="This Sunday, Dec 31"></div>
    </div>
    <button class="calc-btn" onclick="genWhatsApp()">💬 Message Generate →</button>
    <div id="wa-result" style="display:none">
      <div class="ai-output" id="wa-output" style="background:rgba(37,211,102,0.06);border-color:rgba(37,211,102,0.2)"></div>
      <button class="copy-btn green" onclick="navigator.clipboard.writeText(document.getElementById('wa-output').textContent)" style="margin-top:12px">📋 Copy WhatsApp Message</button>
    </div>`;
}
async function genWhatsApp(){
  const purpose=document.getElementById('wa-purpose').value;
  const lang=document.getElementById('wa-lang').value;
  const prop=document.getElementById('wa-property').value;
  const phone=document.getElementById('wa-phone').value;
  const deadline=document.getElementById('wa-deadline').value;
  const out=document.getElementById('wa-output');
  const res=document.getElementById('wa-result');
  res.style.display='block';
  out.innerHTML='<div class="ai-loading"><span></span><span></span><span></span> Generating WhatsApp message...</div>';
  try{
    const GROQ_KEY='';
    const prompt=`Write a WhatsApp broadcast message for a real estate agent in Salem, Tamil Nadu.
Purpose: ${purpose}
Property: ${prop}
Language: ${lang}
Contact: ${phone}
${deadline?'Deadline: '+deadline:''}
Write an engaging WhatsApp message with relevant emojis. Keep it concise and effective (under 150 words). Include CTA at the end.`;
    const resp=await fetch('https://api.groq.com/openai/v1/chat/completions',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Authorization':'Bearer '+GROQ_KEY
      },
      body:JSON.stringify({
        model:'llama-3.3-70b-versatile',
        messages:[{role:'user',content:prompt}],
        max_tokens:800
      })
    });
    const data=await resp.json();
    if(data.error){out.textContent='API Error: '+data.error.message;return;}
    out.textContent=data.choices[0].message.content;
  }catch(e){out.textContent='Error: '+e.message;}
}

/* ─── 16. SOCIAL MEDIA (AI) ─── */
function buildSocial(b){
  b.innerHTML=`
    <p style="color:var(--text3);font-size:13px;margin-bottom:20px">Instagram / Facebook captions with hashtags</p>
    <div class="form-row">
      <div class="form-group"><label>Platform</label>
        <select id="sm-platform"><option>Instagram</option><option>Facebook</option><option>LinkedIn</option></select>
      </div>
      <div class="form-group"><label>Tone</label>
        <select id="sm-tone">
          <option>Exciting & Urgent 🔥</option><option>Professional 💼</option>
          <option>Friendly & Casual 😊</option><option>Premium / Luxury ✨</option>
        </select>
      </div>
    </div>
    <div class="form-group"><label>Property Details</label>
      <textarea id="sm-details" placeholder="2BHK flat, Salem, ₹45L, DTCP approved...">2BHK ready-to-move flat, Hasthampatti Salem, ₹48L, DTCP approved, corner plot</textarea>
    </div>
    <button class="calc-btn" onclick="genSocialMedia()">📱 Caption Generate →</button>
    <div id="sm-result" style="display:none">
      <div class="ai-output" id="sm-output"></div>
      <button class="copy-btn purple" onclick="navigator.clipboard.writeText(document.getElementById('sm-output').textContent)" style="margin-top:12px">📋 Copy Caption</button>
    </div>`;
}
async function genSocialMedia(){
  const platform=document.getElementById('sm-platform').value;
  const tone=document.getElementById('sm-tone').value;
  const details=document.getElementById('sm-details').value;
  const out=document.getElementById('sm-output');
  const res=document.getElementById('sm-result');
  res.style.display='block';
  out.innerHTML='<div class="ai-loading"><span></span><span></span><span></span> Crafting caption...</div>';
  try{
    const GROQ_KEY='';
    const prompt=`Write a ${tone} ${platform} caption for a Salem, Tamil Nadu real estate property.
Property: ${details}
Include relevant emojis, a hook first line, property highlights, and 15-20 hashtags including #SalemRealEstate #SalemProperty #TamilNaduProperty. Keep caption under 180 words.`;
    const resp=await fetch('https://api.groq.com/openai/v1/chat/completions',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Authorization':'Bearer '+GROQ_KEY
      },
      body:JSON.stringify({
        model:'llama-3.3-70b-versatile',
        messages:[{role:'user',content:prompt}],
        max_tokens:800
      })
    });
    const data=await resp.json();
    if(data.error){out.textContent='API Error: '+data.error.message;return;}
    out.textContent=data.choices[0].message.content;
  }catch(e){out.textContent='Error: '+e.message;}
}
/* ─── 17. SITE VISIT ─── */
function buildSiteVisit(b) {
  const today = new Date().toISOString().split('T')[0];

  b.innerHTML = `
  <style>
    .sv-section{background:#fff;border:1.5px solid #e8dfc8;border-radius:14px;padding:20px;margin-bottom:16px;box-shadow:0 2px 12px rgba(0,0,0,0.05)}
    .sv-section-title{font-size:12px;font-weight:700;color:#c9a84c;text-transform:uppercase;letter-spacing:.08em;margin-bottom:14px;display:flex;align-items:center;gap:6px}
    .sv-grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
    .sv-grid3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px}
    .sv-label{font-size:11px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:.06em;display:block;margin-bottom:5px}
    .sv-input{width:100%;padding:10px 13px;border:1.5px solid #d4c99a;border-radius:9px;font-size:13px;color:#1a1a2e;outline:none;font-family:'DM Sans',sans-serif;box-sizing:border-box;background:#fff;transition:border .2s}
    .sv-input:focus{border-color:#c9a84c}
    .sv-badge{display:inline-flex;align-items:center;gap:5px;padding:4px 12px;border-radius:20px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em}
    .sv-badge.hot{background:#fff0f0;color:#e03030;border:1px solid #f5c0c0}
    .sv-badge.warm{background:#fff8e8;color:#c9a84c;border:1px solid #e8dfc8}
    .sv-badge.cold{background:#f0f4ff;color:#5577cc;border:1px solid #c0d0f0}
    .sv-prob-bar{height:8px;background:#f0ece0;border-radius:4px;overflow:hidden;margin:8px 0}
    .sv-prob-fill{height:100%;border-radius:4px;transition:width .5s ease}
    .sv-dash-card{background:#fff;border:1.5px solid #e8dfc8;border-radius:12px;padding:14px;text-align:center}
    .sv-dash-label{font-size:10px;color:#888;font-weight:600;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px}
    .sv-dash-val{font-size:13px;font-weight:700;color:#1a1a2e}
    .sv-btn{padding:12px 20px;border-radius:10px;font-size:13px;font-weight:700;cursor:pointer;font-family:'DM Sans',sans-serif;border:none;transition:all .2s}
    .sv-btn-gold{background:linear-gradient(135deg,#c9a84c,#e8c55a);color:#1a1a2e}
    .sv-btn-gold:hover{transform:translateY(-1px);box-shadow:0 6px 20px rgba(201,168,76,0.35)}
    .sv-btn-dark{background:#1a1a2e;color:#c9a84c;border:1.5px solid #c9a84c}
    .sv-btn-dark:hover{background:#2a2a3e}
    .sv-btn-outline{background:transparent;color:#888;border:1.5px solid #ddd}
    .sv-btn-outline:hover{border-color:#c9a84c;color:#c9a84c}
    .sv-output{white-space:pre-wrap;font-size:13px;line-height:1.8;background:#1a1a2e;color:#e8dfc8;border-radius:10px;padding:16px;margin-top:12px;font-family:'DM Sans',sans-serif}
    @media(max-width:600px){.sv-grid2,.sv-grid3{grid-template-columns:1fr}}
  </style>

  <!-- SECTION 1: CUSTOMER INFO -->
  <div class="sv-section">
    <div class="sv-section-title">👤 Customer Information</div>
    <div class="sv-grid2" style="margin-bottom:12px">
      <div>
        <label class="sv-label">Customer Name *</label>
        <input class="sv-input" id="sv-cname" placeholder="e.g. Karthik M" oninput="svAutoSave();svCalcScore()">
      </div>
      <div>
        <label class="sv-label">Phone Number *</label>
        <input class="sv-input" id="sv-phone" placeholder="+91 98765 43210" oninput="svAutoSave()">
      </div>
    </div>
    <div class="sv-grid3">
      <div>
        <label class="sv-label">Lead Source</label>
        <select class="sv-input" id="sv-source" onchange="svAutoSave()">
          <option>Website</option><option>MagicBricks</option><option>99acres</option>
          <option>Housing.com</option><option>Facebook</option><option>Google Ads</option>
          <option>Referral</option><option>Walk-in</option>
        </select>
      </div>
      <div>
        <label class="sv-label">Lead Priority</label>
        <select class="sv-input" id="sv-priority" onchange="svAutoSave();svCalcScore()">
          <option value="hot">🔥 Hot</option>
          <option value="warm" selected>🌡️ Warm</option>
          <option value="cold">❄️ Cold</option>
        </select>
      </div>
      <div>
        <label class="sv-label">Budget Range</label>
        <input class="sv-input" id="sv-budget" placeholder="e.g. 50L - 1Cr" oninput="svAutoSave();svCalcScore()">
      </div>
    </div>
  </div>

  <!-- SECTION 2: VISIT DETAILS -->
  <div class="sv-section">
    <div class="sv-section-title">📅 Visit Details</div>
    <div class="sv-grid2" style="margin-bottom:12px">
      <div>
        <label class="sv-label">Property Name / Location *</label>
        <input class="sv-input" id="sv-property" placeholder="J Square Green Valley, Hasthampatti" oninput="svAutoSave()">
      </div>
      <div>
        <label class="sv-label">Property Type</label>
        <select class="sv-input" id="sv-proptype" onchange="svAutoSave()">
          <option>Plot</option><option>Villa</option><option>Apartment</option>
          <option>Commercial</option><option>Agricultural Land</option>
        </select>
      </div>
    </div>
    <div class="sv-grid3" style="margin-bottom:12px">
      <div>
        <label class="sv-label">Visit Date *</label>
        <input class="sv-input" type="date" id="sv-date" value="${today}" onchange="svAutoSave()">
      </div>
      <div>
        <label class="sv-label">Time Slot</label>
        <select class="sv-input" id="sv-time" onchange="svAutoSave()">
          <option>9:00 AM</option><option>10:00 AM</option><option>11:00 AM</option>
          <option>12:00 PM</option><option>2:00 PM</option>
          <option selected>3:00 PM</option><option>4:00 PM</option><option>5:00 PM</option>
        </select>
      </div>
      <div>
        <label class="sv-label">Visit Purpose</label>
        <select class="sv-input" id="sv-purpose" onchange="svAutoSave()">
          <option>First Visit</option><option>Second Visit</option>
          <option>Final Negotiation</option><option>Token Advance</option>
          <option>Document Discussion</option><option>Loan Consultation</option>
        </select>
      </div>
    </div>
    <div class="sv-grid3">
      <div>
        <label class="sv-label">No. of Visitors</label>
        <input class="sv-input" type="number" id="sv-visitors" value="2" min="1" oninput="svAutoSave()">
      </div>
      <div>
        <label class="sv-label">Transportation</label>
        <select class="sv-input" id="sv-transport" onchange="svAutoSave()">
          <option>Self-arranged</option><option>Pickup Needed</option><option>Cab Required</option>
        </select>
      </div>
      <div>
        <label class="sv-label">Visit Status</label>
        <select class="sv-input" id="sv-status" onchange="svAutoSave()">
          <option>Scheduled</option><option>Confirmed</option><option>Rescheduled</option>
          <option>Completed</option><option>Cancelled</option><option>No Show</option>
        </select>
      </div>
    </div>
  </div>

  <!-- SECTION 3: AGENT & FOLLOW-UP -->
  <div class="sv-section">
    <div class="sv-section-title">🧑‍💼 Agent & Follow-Up</div>
    <div class="sv-grid2" style="margin-bottom:12px">
      <div>
        <label class="sv-label">Agent Name *</label>
        <input class="sv-input" id="sv-agent" value="Rajesh (Sales Manager)" oninput="svAutoSave()">
      </div>
      <div>
        <label class="sv-label">Follow-Up Date</label>
        <input class="sv-input" type="date" id="sv-followup" onchange="svAutoSave()">
      </div>
    </div>
    <div class="sv-grid3">
      <div>
        <label class="sv-label">Decision Timeline</label>
        <select class="sv-input" id="sv-timeline" onchange="svAutoSave();svCalcScore()">
          <option>Immediate</option><option>Within 1 Week</option>
          <option>Within 1 Month</option><option>Just Exploring</option>
        </select>
      </div>
      <div>
        <label class="sv-label">Loan Requirement</label>
        <select class="sv-input" id="sv-loan" onchange="svAutoSave();svCalcScore()">
          <option>Yes</option><option>No</option><option>Unsure</option>
        </select>
      </div>
      <div>
        <label class="sv-label">Communication Mode</label>
        <select class="sv-input" id="sv-commmode" onchange="svAutoSave()">
          <option>WhatsApp</option><option>Call</option><option>SMS</option><option>Email</option>
        </select>
      </div>
    </div>
  </div>

  <!-- SECTION 4: OUTCOME & NOTES -->
  <div class="sv-section">
    <div class="sv-section-title">📋 Outcome & Notes</div>
    <div class="sv-grid2" style="margin-bottom:12px">
      <div>
        <label class="sv-label">Visit Outcome</label>
        <select class="sv-input" id="sv-outcome" onchange="svAutoSave();svCalcScore()">
          <option>Interested</option><option>Negotiation</option><option>Follow-up Needed</option>
          <option>Not Interested</option><option>Booked</option>
        </select>
      </div>
      <div>
        <label class="sv-label">Google Maps Link</label>
        <input class="sv-input" id="sv-maps" placeholder="https://maps.google.com/..." oninput="svAutoSave()">
      </div>
    </div>
    <div>
      <label class="sv-label">Notes / Special Instructions</label>
      <textarea class="sv-input" id="sv-notes" rows="3" placeholder="Customer preferences, special requirements..." oninput="svAutoSave()" style="resize:vertical"></textarea>
    </div>
  </div>

  <!-- SECTION 5: MESSAGE SETTINGS -->
  <div class="sv-section">
    <div class="sv-section-title">💬 Message Settings</div>
    <div class="sv-grid2">
      <div>
        <label class="sv-label">Language</label>
        <select class="sv-input" id="sv-lang" onchange="svAutoSave()">
          <option>Tamil</option><option>English</option>
        </select>
      </div>
      <div>
        <label class="sv-label">Contact Number (Agent)</label>
        <input class="sv-input" id="sv-agentphone" placeholder="+91 98765 43210" oninput="svAutoSave()">
      </div>
    </div>
  </div>

  <!-- SALES PROBABILITY DASHBOARD -->
  <div class="sv-section" id="sv-score-section">
    <div class="sv-section-title">📊 Sales Intelligence</div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px;margin-bottom:16px">
      <div class="sv-dash-card">
        <div class="sv-dash-label">Priority</div>
        <div id="sv-dash-priority" class="sv-dash-val">—</div>
      </div>
      <div class="sv-dash-card">
        <div class="sv-dash-label">Probability</div>
        <div id="sv-dash-prob" class="sv-dash-val" style="color:#c9a84c">—</div>
      </div>
      <div class="sv-dash-card">
        <div class="sv-dash-label">Status</div>
        <div id="sv-dash-status" class="sv-dash-val">—</div>
      </div>
      <div class="sv-dash-card">
        <div class="sv-dash-label">Follow-Up</div>
        <div id="sv-dash-followup" class="sv-dash-val">—</div>
      </div>
    </div>
    <div style="background:#faf8f3;border-radius:10px;padding:14px">
      <div style="font-size:11px;color:#888;font-weight:600;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px">Conversion Probability</div>
      <div class="sv-prob-bar"><div id="sv-prob-fill" class="sv-prob-fill" style="width:0%;background:linear-gradient(90deg,#c9a84c,#e8c55a)"></div></div>
      <div style="display:flex;justify-content:space-between;align-items:center">
        <span id="sv-prob-pct" style="font-size:1.4rem;font-weight:700;color:#c9a84c">0%</span>
        <span id="sv-next-action" style="font-size:12px;color:#666;text-align:right;max-width:60%">—</span>
      </div>
    </div>
  </div>

  <!-- ACTION BUTTONS -->
  <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:16px">
    <button class="sv-btn sv-btn-gold" onclick="genSiteVisit()" style="flex:2;min-width:160px">
      📅 Generate Confirmation
    </button>
    <button class="sv-btn sv-btn-dark" onclick="svCopySummary()" style="flex:1;min-width:120px">
      📋 Copy Summary
    </button>
    <button class="sv-btn" onclick="window.print()" style="flex:1;min-width:120px;background:#f0f4ff;color:#5577cc;border:1.5px solid #c0d0f0;font-weight:700;cursor:pointer">
      🖨️ Print Sheet
    </button>
    <button class="sv-btn sv-btn-outline" onclick="svResetForm()" style="flex:1;min-width:100px">
      🔄 Reset
    </button>
  </div>

  <!-- OUTPUT -->
  <div id="sv-result" style="display:none">
    <div class="sv-output" id="sv-output"></div>
    <button class="sv-btn sv-btn-gold" onclick="navigator.clipboard.writeText(document.getElementById('sv-output').textContent)" style="width:100%;margin-top:10px">
      📋 Copy WhatsApp Message
    </button>
  </div>
  `;

  // Load saved data
  svLoadSaved();
  svCalcScore();
}

/* ── SCORE CALCULATOR ── */
function svCalcScore() {
  const priority = document.getElementById('sv-priority')?.value || 'warm';
  const timeline = document.getElementById('sv-timeline')?.value || 'Within 1 Month';
  const budget = document.getElementById('sv-budget')?.value || '';
  const loan = document.getElementById('sv-loan')?.value || 'Unsure';
  const outcome = document.getElementById('sv-outcome')?.value || 'Interested';

  let score = 0;

  // Priority
  if(priority === 'hot') score += 40;
  else if(priority === 'warm') score += 20;
  else score += 5;

  // Timeline
  if(timeline === 'Immediate') score += 25;
  else if(timeline === 'Within 1 Week') score += 15;
  else if(timeline === 'Within 1 Month') score += 8;
  else score += 2;

  // Budget entered
  if(budget.trim()) score += 15;

  // Loan
  if(loan === 'Yes') score += 10;
  else if(loan === 'No') score += 5;

  // Outcome
  if(outcome === 'Booked') score += 10;
  else if(outcome === 'Negotiation') score += 7;
  else if(outcome === 'Interested') score += 5;
  else if(outcome === 'Not Interested') score -= 10;

  score = Math.min(95, Math.max(5, score));

  // Labels
  let label, action, color;
  if(score >= 70) {
    label = '🔥 High Closing Probability';
    action = 'Prepare booking documents immediately';
    color = '#e03030';
  } else if(score >= 40) {
    label = '🌡️ Moderate Interest';
    action = 'Schedule follow-up within 3 days';
    color = '#c9a84c';
  } else {
    label = '❄️ Low Interest';
    action = 'Add to nurture campaign';
    color = '#5577cc';
  }

  // Update UI
  const probFill = document.getElementById('sv-prob-fill');
  const probPct = document.getElementById('sv-prob-pct');
  const nextAction = document.getElementById('sv-next-action');
  const dashPriority = document.getElementById('sv-dash-priority');
  const dashProb = document.getElementById('sv-dash-prob');
  const dashStatus = document.getElementById('sv-dash-status');
  const dashFollowup = document.getElementById('sv-dash-followup');

  if(probFill) { probFill.style.width = score + '%'; probFill.style.background = `linear-gradient(90deg,${color},${color}88)`; }
  if(probPct) { probPct.textContent = score + '%'; probPct.style.color = color; }
  if(nextAction) nextAction.textContent = '💡 ' + action;
  if(dashPriority) dashPriority.textContent = priority === 'hot' ? '🔥 Hot' : priority === 'warm' ? '🌡️ Warm' : '❄️ Cold';
  if(dashProb) { dashProb.textContent = label; dashProb.style.color = color; }
  if(dashStatus) dashStatus.textContent = document.getElementById('sv-status')?.value || '—';
  if(dashFollowup) {
    const fu = document.getElementById('sv-followup')?.value;
    dashFollowup.textContent = fu ? new Date(fu).toLocaleDateString('en-IN', {day:'numeric',month:'short'}) : 'Not Set';
  }
}

/* ── MESSAGE GENERATOR ── */
function genSiteVisit() {
  const name = document.getElementById('sv-cname')?.value || '';
  const phone = document.getElementById('sv-phone')?.value || '';
  const prop = document.getElementById('sv-property')?.value || '';
  const date = document.getElementById('sv-date')?.value || '';
  const time = document.getElementById('sv-time')?.value || '';
  const agent = document.getElementById('sv-agent')?.value || '';
  const agentPhone = document.getElementById('sv-agentphone')?.value || '';
  const lang = document.getElementById('sv-lang')?.value || 'Tamil';
  const maps = document.getElementById('sv-maps')?.value || '';
  const purpose = document.getElementById('sv-purpose')?.value || '';
  const visitors = document.getElementById('sv-visitors')?.value || '1';

  if(!name || !prop || !date) {
    alert('Customer Name, Property, and Date are required!');
    return;
  }

  const d = new Date(date);
  const dStr = d.toLocaleDateString('en-IN', {weekday:'long', year:'numeric', month:'long', day:'numeric'});

  let msg;
  if(lang === 'Tamil') {
    msg = `வணக்கம் ${name} அவர்களே! 🙏\n\nஉங்கள் Site Visit Confirm ஆகிவிட்டது! ✅\n\n` +
          `📍 Property: ${prop}\n` +
          `🎯 Visit Purpose: ${purpose}\n` +
          `📅 தேதி: ${dStr}\n` +
          `⏰ நேரம்: ${time}\n` +
          `👥 Visitors: ${visitors} பேர்\n` +
          `👤 Agent: ${agent}\n` +
          (agentPhone ? `📞 Agent Contact: ${agentPhone}\n` : '') +
          (maps ? `🗺️ Location: ${maps}\n` : '') +
          `\nசரியான நேரத்தில் வரவும். ஐயங்கள் இருந்தால் அழைக்கவும்! 😊\n\n- J Square Housing`;
  } else {
    msg = `Hello ${name}! 👋\n\nYour Site Visit is Confirmed! ✅\n\n` +
          `📍 Property: ${prop}\n` +
          `🎯 Purpose: ${purpose}\n` +
          `📅 Date: ${dStr}\n` +
          `⏰ Time: ${time}\n` +
          `👥 Visitors: ${visitors}\n` +
          `👤 Agent: ${agent}\n` +
          (agentPhone ? `📞 Agent Contact: ${agentPhone}\n` : '') +
          (maps ? `🗺️ Location: ${maps}\n` : '') +
          `\nPlease be on time. Feel free to call for any queries! 😊\n\n- J Square Housing`;
  }

  document.getElementById('sv-result').style.display = 'block';
  document.getElementById('sv-output').textContent = msg;
  document.getElementById('sv-result').scrollIntoView({behavior:'smooth', block:'nearest'});
}

/* ── AUTO SAVE ── */
function svAutoSave() {
  const fields = ['sv-cname','sv-phone','sv-property','sv-date','sv-time','sv-agent',
    'sv-agentphone','sv-lang','sv-source','sv-priority','sv-budget','sv-proptype',
    'sv-purpose','sv-visitors','sv-transport','sv-status','sv-followup','sv-timeline',
    'sv-loan','sv-commmode','sv-outcome','sv-maps','sv-notes'];
  const data = {};
  fields.forEach(id => {
    const el = document.getElementById(id);
    if(el) data[id] = el.value;
  });
  try { localStorage.setItem('sv_form_data', JSON.stringify(data)); } catch(e) {}
  svCalcScore();
}

function svLoadSaved() {
  try {
    const saved = localStorage.getItem('sv_form_data');
    if(!saved) return;
    const data = JSON.parse(saved);
    Object.entries(data).forEach(([id, val]) => {
      const el = document.getElementById(id);
      if(el) el.value = val;
    });
  } catch(e) {}
}

/* ── COPY SUMMARY ── */
function svCopySummary() {
  const fields = {
    'Customer': document.getElementById('sv-cname')?.value,
    'Phone': document.getElementById('sv-phone')?.value,
    'Property': document.getElementById('sv-property')?.value,
    'Date': document.getElementById('sv-date')?.value,
    'Time': document.getElementById('sv-time')?.value,
    'Purpose': document.getElementById('sv-purpose')?.value,
    'Agent': document.getElementById('sv-agent')?.value,
    'Priority': document.getElementById('sv-priority')?.value,
    'Status': document.getElementById('sv-status')?.value,
    'Follow-Up': document.getElementById('sv-followup')?.value,
    'Budget': document.getElementById('sv-budget')?.value,
    'Notes': document.getElementById('sv-notes')?.value,
  };
  const summary = Object.entries(fields)
    .filter(([,v]) => v)
    .map(([k,v]) => `${k}: ${v}`)
    .join('\n');
  navigator.clipboard.writeText(summary).then(() => {
    alert('✅ Summary copied to clipboard!');
  });
}

/* ── RESET ── */
function svResetForm() {
  if(!confirm('Reset all fields? This cannot be undone.')) return;
  try { localStorage.removeItem('sv_form_data'); } catch(e) {}
  buildSiteVisit(document.getElementById('panelBody'));
}
/* ─── 18. MARKET TREND ─── */
/* ═══════════════════════════════════════════════════════════
   ENHANCED MARKET TREND CALCULATOR — 38 TN DISTRICTS
   Drop-in replacement for buildMarket() & calcMarketTrend()
   Preserves existing theme: beige / gold / dark
═══════════════════════════════════════════════════════════ */

const MT_DISTRICTS = {
  chennai:       { label:'Chennai',        tier:'Metro',   guidelineValue:8200,  marketValue:12500, growth1Y:11, growth3Y:36, growth5Y:74, rentalYield:4.3, infraScore:9.5, marketHeat:'Hot',      demandSupply:'High Demand', absorptionRate:82, inventoryMonths:3,  loanEase:'High',     legalRisk:'Low',    liquidityScore:95, investorInterest:'Very Strong', holdingPeriod:'3–5 Yrs',  forecast:{c:22,e:42,o:65}, catalysts:['Metro Phase 2 expansion','Port modernisation','IT corridor growth'],       reasons:['Highest liquidity score in Tamil Nadu (95/100)','IT/ITES demand sustains 4.3% rental yield','Metro expansion drives suburban corridor appreciation','Premium over guideline (52%) reflects deep investor confidence','Strong absorption rate of 82% limits inventory overhang'] },
  coimbatore:    { label:'Coimbatore',     tier:'Tier 1',  guidelineValue:3200,  marketValue:4600,  growth1Y:10, growth3Y:30, growth5Y:58, rentalYield:4.1, infraScore:9.0, marketHeat:'Hot',      demandSupply:'High Demand', absorptionRate:78, inventoryMonths:4,  loanEase:'High',     legalRisk:'Low',    liquidityScore:88, investorInterest:'Very Strong', holdingPeriod:'4–6 Yrs',  forecast:{c:20,e:38,o:58}, catalysts:['Airport expansion','Aerospace SEZ','Textile export growth'],              reasons:['South India industrial hub with 10% YoY appreciation','Strong SME ecosystem sustains rental demand','Airport expansion improving NRI investor interest','Low legal risk and high loan approval ease','Saravanampatti & Peelamedu corridors outperforming'] },
  salem:         { label:'Salem',          tier:'Tier 2',  guidelineValue:2450,  marketValue:3200,  growth1Y:8,  growth3Y:24, growth5Y:48, rentalYield:3.8, infraScore:8.5, marketHeat:'Hot',      demandSupply:'High Demand', absorptionRate:72, inventoryMonths:5,  loanEase:'High',     legalRisk:'Low',    liquidityScore:86, investorInterest:'Strong',      holdingPeriod:'5–7 Yrs',  forecast:{c:18,e:32,o:48}, catalysts:['Highway expansion','Industrial corridor','Hospital development'],          reasons:['Fast-growing Tier 2 city with 8% annual price growth','DTCP-approved layouts show consistent appreciation','New highway connectivity boosting peripheral areas','Rental demand rising from textile & manufacturing workforce','Infrastructure score 8.5/10 signals strong development pipeline'] },
  madurai:       { label:'Madurai',        tier:'Tier 2',  guidelineValue:2100,  marketValue:2900,  growth1Y:7,  growth3Y:20, growth5Y:40, rentalYield:3.5, infraScore:7.2, marketHeat:'Moderate', demandSupply:'Balanced',    absorptionRate:60, inventoryMonths:7,  loanEase:'Medium',   legalRisk:'Low',    liquidityScore:72, investorInterest:'Moderate',    holdingPeriod:'6–8 Yrs',  forecast:{c:14,e:25,o:38}, catalysts:['Tourism development','Healthcare expansion','Ring road project'],          reasons:['Stable religious tourism hub with steady 7% annual growth','Healthcare sector expansion driving rental demand','Moderate infrastructure score — mid-term growth potential','Good long-term entry for conservative investors','KK Nagar and Mattuthavani zones show consistent value'] },
  trichy:        { label:'Tiruchirappalli',tier:'Tier 2',  guidelineValue:2300,  marketValue:3100,  growth1Y:8,  growth3Y:23, growth5Y:44, rentalYield:3.7, infraScore:7.8, marketHeat:'Moderate', demandSupply:'Balanced',    absorptionRate:62, inventoryMonths:7,  loanEase:'Medium',   legalRisk:'Low',    liquidityScore:74, investorInterest:'Moderate',    holdingPeriod:'5–7 Yrs',  forecast:{c:15,e:27,o:42}, catalysts:['Airport expansion','BHEL growth','Educational hub'],                       reasons:['BHEL township and educational institutions drive stable demand','Airport expansion boosting real estate confidence','Moderate market heat — good entry point currently','Thillai Nagar remains premium residential zone','7.8 infrastructure score reflects improving civic facilities'] },
  erode:         { label:'Erode',          tier:'Tier 2',  guidelineValue:1800,  marketValue:2400,  growth1Y:6,  growth3Y:18, growth5Y:36, rentalYield:3.2, infraScore:6.8, marketHeat:'Moderate', demandSupply:'Balanced',    absorptionRate:55, inventoryMonths:8,  loanEase:'Medium',   legalRisk:'Low',    liquidityScore:66, investorInterest:'Moderate',    holdingPeriod:'6–9 Yrs',  forecast:{c:12,e:22,o:34}, catalysts:['NH 544 connectivity','Textile expansion','SIDCO industrial park'],         reasons:['Stable 6% annual appreciation — low volatility market','Textile and turmeric trade sustaining economic base','Good long-term entry for conservative investors','NH 544 improvement boosting peripheral area growth','Moderate demand-supply balance limits speculative risk'] },
  tiruppur:      { label:'Tiruppur',       tier:'Tier 2',  guidelineValue:2600,  marketValue:3500,  growth1Y:9,  growth3Y:26, growth5Y:50, rentalYield:4.0, infraScore:7.8, marketHeat:'Hot',      demandSupply:'High Demand', absorptionRate:70, inventoryMonths:5,  loanEase:'High',     legalRisk:'Low',    liquidityScore:80, investorInterest:'Strong',      holdingPeriod:'4–6 Yrs',  forecast:{c:18,e:33,o:50}, catalysts:['Knitwear export growth','New industrial zones','Road widening'],           reasons:['India knitwear export capital with strong economic base','Avinashi Road corridor showing 8–10% consistent growth','Industrial growth sustaining rental demand from workforce','Market heat Hot — ideal BUY window currently open','Infrastructure score 7.8 reflects improving civic facilities'] },
  vellore:       { label:'Vellore',        tier:'Tier 2',  guidelineValue:1900,  marketValue:2600,  growth1Y:7,  growth3Y:20, growth5Y:38, rentalYield:3.6, infraScore:7.5, marketHeat:'Moderate', demandSupply:'Balanced',    absorptionRate:60, inventoryMonths:7,  loanEase:'Medium',   legalRisk:'Low',    liquidityScore:70, investorInterest:'Moderate',    holdingPeriod:'5–8 Yrs',  forecast:{c:13,e:24,o:36}, catalysts:['CMC hospital expansion','Leather industry','Chennai highway proximity'],    reasons:['CMC hospital drives steady medical tourism rental demand','Leather industry export growth sustaining local economy','Proximity to Chennai ensuring consistent capital appreciation','Katpadi junction area shows strongest price momentum','Legal risk low with well-documented land records'] },
  thanjavur:     { label:'Thanjavur',      tier:'Tier 3',  guidelineValue:1500,  marketValue:2000,  growth1Y:5,  growth3Y:15, growth5Y:30, rentalYield:3.0, infraScore:6.2, marketHeat:'Slow',     demandSupply:'Balanced',    absorptionRate:45, inventoryMonths:10, loanEase:'Medium',   legalRisk:'Low',    liquidityScore:55, investorInterest:'Low',         holdingPeriod:'8–10 Yrs', forecast:{c:10,e:18,o:28}, catalysts:['Heritage tourism','Agricultural mechanisation','Cauvery water project'],    reasons:['Heritage tourism drives niche short-term rental market','Cauvery water project expected to boost agricultural land value','Conservative market with stable 5% annual appreciation','Best suited for very long-term patient investors','Low investor interest means less competition for good plots'] },
  kanchipuram:   { label:'Kanchipuram',    tier:'Tier 2',  guidelineValue:3000,  marketValue:4200,  growth1Y:10, growth3Y:30, growth5Y:58, rentalYield:4.0, infraScore:8.8, marketHeat:'Hot',      demandSupply:'High Demand', absorptionRate:76, inventoryMonths:4,  loanEase:'High',     legalRisk:'Low',    liquidityScore:84, investorInterest:'Strong',      holdingPeriod:'4–6 Yrs',  forecast:{c:20,e:36,o:55}, catalysts:['Chennai growth corridor','Industrial belt','Metro extension plan'],          reasons:['Chennai growth corridor driving 10% YoY appreciation','Oragadam industrial belt boosting surrounding land values','Metro extension plans generating strong investor interest','High absorption rate 76% signals healthy demand-supply balance','Silk city heritage improving tourism real estate segment'] },
  namakkal:      { label:'Namakkal',       tier:'Tier 3',  guidelineValue:1400,  marketValue:1900,  growth1Y:5,  growth3Y:15, growth5Y:28, rentalYield:3.0, infraScore:6.0, marketHeat:'Slow',     demandSupply:'Balanced',    absorptionRate:42, inventoryMonths:11, loanEase:'Low',      legalRisk:'Low',    liquidityScore:50, investorInterest:'Low',         holdingPeriod:'8–10 Yrs', forecast:{c:8,e:15,o:24},  catalysts:['Poultry industry','Transport hub status','Salem highway upgrade'],          reasons:['Major transport hub with poultry and lorry industry base','Stable but slow market — suitable for very patient investors','Low liquidity score (50/100) — exit may take time','Salem highway upgrade improving connectivity value','Best entry strategy: agricultural/outskirt land accumulation'] },
  dharmapuri:    { label:'Dharmapuri',     tier:'Tier 3',  guidelineValue:1200,  marketValue:1600,  growth1Y:5,  growth3Y:14, growth5Y:26, rentalYield:2.8, infraScore:5.8, marketHeat:'Slow',     demandSupply:'Balanced',    absorptionRate:38, inventoryMonths:12, loanEase:'Low',      legalRisk:'Medium', liquidityScore:44, investorInterest:'Low',         holdingPeriod:'8–12 Yrs', forecast:{c:7,e:13,o:22},  catalysts:['Krishnagiri spillover','Highway connectivity','Mango belt tourism'],         reasons:['Developing district with emerging industrial activity','Krishnagiri spillover expected to elevate northern areas','Medium legal risk — document verification strongly advised','Low absorption rate (38%) — buyer market with negotiation power','Long-term hold strategy for patient land investors'] },
  krishnagiri:   { label:'Krishnagiri',    tier:'Tier 2',  guidelineValue:2200,  marketValue:3000,  growth1Y:9,  growth3Y:27, growth5Y:52, rentalYield:3.8, infraScore:8.2, marketHeat:'Hot',      demandSupply:'High Demand', absorptionRate:74, inventoryMonths:5,  loanEase:'High',     legalRisk:'Low',    liquidityScore:82, investorInterest:'Strong',      holdingPeriod:'4–6 Yrs',  forecast:{c:18,e:34,o:52}, catalysts:['Hosur industrial proximity','Bangalore highway','EV corridor'],              reasons:['Hosur industrial belt spillover driving fast appreciation','Bangalore highway making this a prime investment corridor','EV manufacturing boom elevating surrounding land values','High investor interest with strong 9% annual price growth','Infrastructure score 8.2 reflects excellent development activity'] },
  hosur:         { label:'Hosur',          tier:'Tier 1',  guidelineValue:3800,  marketValue:6500,  growth1Y:20, growth3Y:58, growth5Y:100,rentalYield:5.0, infraScore:9.5, marketHeat:'Hot',      demandSupply:'High Demand', absorptionRate:88, inventoryMonths:2,  loanEase:'High',     legalRisk:'Low',    liquidityScore:96, investorInterest:'Very Strong', holdingPeriod:'3–5 Yrs',  forecast:{c:30,e:55,o:85}, catalysts:['EV manufacturing hub','Bangalore proximity','Electronics SEZ'],             reasons:['TN fastest-growing industrial city with 20% annual growth','EV and electronics boom driving massive workforce influx','Highest absorption rate (88%) and lowest inventory (2 months)','Proximity to Bangalore ensures sustained demand premium','Infrastructure score 9.5/10 — best in non-metro category'] },
  cuddalore:     { label:'Cuddalore',      tier:'Tier 3',  guidelineValue:1400,  marketValue:1900,  growth1Y:5,  growth3Y:14, growth5Y:26, rentalYield:3.0, infraScore:6.0, marketHeat:'Slow',     demandSupply:'Balanced',    absorptionRate:40, inventoryMonths:12, loanEase:'Low',      legalRisk:'Medium', liquidityScore:46, investorInterest:'Low',         holdingPeriod:'8–10 Yrs', forecast:{c:8,e:14,o:22},  catalysts:['SIPCOT industrial zone','Neyveli lignite expansion','Coastal highway'],       reasons:['SIPCOT industrial zone offering long-term growth potential','Coastal proximity creates niche vacation rental opportunity','Medium legal risk — verify EC and Patta documents carefully','Slow market heat — good for patient value investors','Neyveli expansion may trigger future price catalyst'] },
  dindigul:      { label:'Dindigul',       tier:'Tier 3',  guidelineValue:1500,  marketValue:2000,  growth1Y:6,  growth3Y:16, growth5Y:30, rentalYield:3.1, infraScore:6.2, marketHeat:'Slow',     demandSupply:'Balanced',    absorptionRate:44, inventoryMonths:10, loanEase:'Low',      legalRisk:'Low',    liquidityScore:52, investorInterest:'Low',         holdingPeriod:'7–10 Yrs', forecast:{c:9,e:17,o:26},  catalysts:['Kodaikanal tourism spillover','Biryani tourism','NH 44 connectivity'],        reasons:['Kodaikanal tourism creating demand for hill-adjacent properties','NH 44 connectivity improving market accessibility','Low legal risk — clean documentation environment','Slow market — ideal for value buyers with 7+ year horizon','Lock industry heritage adding unique local economic stability'] },
  karur:         { label:'Karur',          tier:'Tier 3',  guidelineValue:1600,  marketValue:2100,  growth1Y:6,  growth3Y:17, growth5Y:32, rentalYield:3.2, infraScore:6.4, marketHeat:'Slow',     demandSupply:'Balanced',    absorptionRate:46, inventoryMonths:10, loanEase:'Medium',   legalRisk:'Low',    liquidityScore:55, investorInterest:'Low',         holdingPeriod:'7–9 Yrs',  forecast:{c:10,e:18,o:28}, catalysts:['Textile export town','Bus body manufacturing','Kaveri river belt'],           reasons:['Bus body and textile manufacturing driving local employment','Kaveri river belt plots showing niche appreciation','Low legal risk with good documentation history','Moderate absorption rate (46%) offers balanced entry','Best for buy-and-hold residential plot investors'] },
  nagapattinam:  { label:'Nagapattinam',   tier:'Tier 3',  guidelineValue:1200,  marketValue:1600,  growth1Y:4,  growth3Y:12, growth5Y:22, rentalYield:2.8, infraScore:5.5, marketHeat:'Slow',     demandSupply:'Balanced',    absorptionRate:35, inventoryMonths:14, loanEase:'Low',      legalRisk:'Medium', liquidityScore:40, investorInterest:'Low',         holdingPeriod:'9–12 Yrs', forecast:{c:6,e:12,o:20},  catalysts:['Coastal highway','Fisheries expansion','Cyclone resilience infrastructure'],   reasons:['Coastal district with emerging fisheries and tourism potential','Cyclone resilience infrastructure improving long-term safety','Medium legal risk — coastal land title complexities','Low absorption rate (35%) and high inventory — buyer market','Very long horizon investors only — patience required'] },
  ramanathapuram:{ label:'Ramanathapuram', tier:'Tier 3',  guidelineValue:1100,  marketValue:1500,  growth1Y:4,  growth3Y:11, growth5Y:20, rentalYield:2.7, infraScore:5.2, marketHeat:'Slow',     demandSupply:'Balanced',    absorptionRate:32, inventoryMonths:15, loanEase:'Low',      legalRisk:'Medium', liquidityScore:36, investorInterest:'Low',         holdingPeriod:'10–12 Yrs',forecast:{c:5,e:10,o:18},  catalysts:['Pamban bridge revival','Wind energy expansion','Rameswaram tourism'],          reasons:['Pamban bridge revival creating niche tourism real estate interest','Wind energy sector expanding bringing workforce housing demand','Medium legal risk — coastal patta documents need verification','Very slow market — only for very long-term agricultural investors','Rameswaram pilgrimage sustaining small hotel/hostel rental segment'] },
  sivagangai:    { label:'Sivagangai',     tier:'Tier 3',  guidelineValue:1100,  marketValue:1500,  growth1Y:4,  growth3Y:11, growth5Y:20, rentalYield:2.8, infraScore:5.0, marketHeat:'Slow',     demandSupply:'Balanced',    absorptionRate:33, inventoryMonths:14, loanEase:'Low',      legalRisk:'Low',    liquidityScore:38, investorInterest:'Low',         holdingPeriod:'9–12 Yrs', forecast:{c:5,e:10,o:18},  catalysts:['Madurai spillover','Agricultural modernisation','Healthcare expansion'],        reasons:['Madurai proximity creating slow but steady growth spillover','Agricultural land with improving irrigation infrastructure','Low legal risk with clean patta records in most zones','Very long horizon — suited only for patient land accumulation','Healthcare expansion adding minor employment base'] },
  theni:         { label:'Theni',          tier:'Tier 3',  guidelineValue:1300,  marketValue:1750,  growth1Y:5,  growth3Y:14, growth5Y:26, rentalYield:3.0, infraScore:6.0, marketHeat:'Slow',     demandSupply:'Balanced',    absorptionRate:42, inventoryMonths:11, loanEase:'Low',      legalRisk:'Low',    liquidityScore:48, investorInterest:'Low',         holdingPeriod:'8–10 Yrs', forecast:{c:8,e:15,o:24},  catalysts:['Megamalai eco-tourism','Periyar spillover','Grapes/banana agricultural belt'], reasons:['Eco-tourism and hill station proximity creating niche rental demand','Agricultural prosperity keeping local economy stable','Low legal risk with good revenue records','Long-term land appreciation expected near eco-tourism zones','Spillover from Kerala border economy providing price support'] },
  thoothukudi:   { label:'Thoothukudi',    tier:'Tier 2',  guidelineValue:1900,  marketValue:2600,  growth1Y:7,  growth3Y:20, growth5Y:38, rentalYield:3.5, infraScore:7.0, marketHeat:'Moderate', demandSupply:'Balanced',    absorptionRate:58, inventoryMonths:8,  loanEase:'Medium',   legalRisk:'Low',    liquidityScore:65, investorInterest:'Moderate',    holdingPeriod:'5–8 Yrs',  forecast:{c:13,e:23,o:36}, catalysts:['Port expansion','Sterlite aftermath recovery','Thermal power zone'],           reasons:['Major port city with strategic industrial importance','Port expansion driving steady commercial real estate demand','Post-industrial uncertainty resolving — recovery phase underway','Low legal risk with clear industrial and residential zones','Moderate rental yield of 3.5% suitable for residential investors'] },
  tenkasi:       { label:'Tenkasi',        tier:'Tier 3',  guidelineValue:1200,  marketValue:1600,  growth1Y:5,  growth3Y:13, growth5Y:24, rentalYield:2.9, infraScore:5.8, marketHeat:'Slow',     demandSupply:'Balanced',    absorptionRate:38, inventoryMonths:13, loanEase:'Low',      legalRisk:'Low',    liquidityScore:42, investorInterest:'Low',         holdingPeriod:'9–11 Yrs', forecast:{c:7,e:13,o:22},  catalysts:['Courtallam tourism','Kerala border trade','Western Ghats eco-zone'],           reasons:['Courtallam waterfall tourism creating short-term rental opportunity','Kerala border trade sustaining commercial activity','Low legal risk — patta documentation generally clean','Very slow market — only patient investors should enter','Western Ghats eco-zone creating niche plotted development demand'] },
  tirunelveli:   { label:'Tirunelveli',    tier:'Tier 2',  guidelineValue:1900,  marketValue:2600,  growth1Y:7,  growth3Y:20, growth5Y:38, rentalYield:3.4, infraScore:7.2, marketHeat:'Moderate', demandSupply:'Balanced',    absorptionRate:58, inventoryMonths:8,  loanEase:'Medium',   legalRisk:'Low',    liquidityScore:66, investorInterest:'Moderate',    holdingPeriod:'5–7 Yrs',  forecast:{c:13,e:23,o:36}, catalysts:['Wind energy expansion','BHEL proximity','Medical college growth'],            reasons:['Wind energy sector bringing workforce housing demand','Palayamkottai educational zone sustaining consistent rental market','BHEL and defence PSU proximity supporting price floor','Legal risk low with good land record availability','Moderate market heat — balanced entry opportunity'] },
  virudhunagar:  { label:'Virudhunagar',   tier:'Tier 3',  guidelineValue:1400,  marketValue:1900,  growth1Y:5,  growth3Y:14, growth5Y:26, rentalYield:3.0, infraScore:6.0, marketHeat:'Slow',     demandSupply:'Balanced',    absorptionRate:40, inventoryMonths:12, loanEase:'Low',      legalRisk:'Low',    liquidityScore:48, investorInterest:'Low',         holdingPeriod:'7–10 Yrs', forecast:{c:8,e:15,o:24},  catalysts:['Sivakasi fireworks industry','Printing industry','NH connectivity'],            reasons:['Sivakasi fireworks industry providing stable economic base','Printing and packaging industry supporting commercial demand','Low legal risk — clean patta and encumbrance records','Slow market heat — value entry available for patient buyers','NH connectivity upgrade expected to trigger appreciation near highways'] },
  villupuram:    { label:'Villupuram',     tier:'Tier 3',  guidelineValue:1400,  marketValue:1900,  growth1Y:5,  growth3Y:14, growth5Y:26, rentalYield:3.0, infraScore:6.2, marketHeat:'Slow',     demandSupply:'Balanced',    absorptionRate:40, inventoryMonths:12, loanEase:'Low',      legalRisk:'Medium', liquidityScore:45, investorInterest:'Low',         holdingPeriod:'8–10 Yrs', forecast:{c:8,e:15,o:24},  catalysts:['Puducherry spillover','Coastal highway','Agricultural growth'],                  reasons:['Puducherry proximity creating mild spillover appreciation','Coastal highway development improving land values near corridor','Medium legal risk — verify EC for 30+ years before purchase','Slow absorption rate — negotiation advantage for buyers','Long-term agricultural land bank strategy recommended'] },
  kallakurichi:  { label:'Kallakurichi',   tier:'Tier 3',  guidelineValue:1300,  marketValue:1750,  growth1Y:5,  growth3Y:13, growth5Y:24, rentalYield:2.9, infraScore:5.8, marketHeat:'Slow',     demandSupply:'Balanced',    absorptionRate:37, inventoryMonths:13, loanEase:'Low',      legalRisk:'Medium', liquidityScore:42, investorInterest:'Low',         holdingPeriod:'9–11 Yrs', forecast:{c:7,e:13,o:21},  catalysts:['New district development','Salem highway','Agricultural growth'],               reasons:['Newly formed district — administrative investment underway','Salem highway connectivity improving market access','Medium legal risk — new district land records still being digitised','Low liquidity — best for long-term agricultural land accumulation','Patient investors can benefit from development-led appreciation'] },
  ariyalur:      { label:'Ariyalur',       tier:'Tier 3',  guidelineValue:1100,  marketValue:1450,  growth1Y:4,  growth3Y:11, growth5Y:20, rentalYield:2.7, infraScore:5.2, marketHeat:'Slow',     demandSupply:'Balanced',    absorptionRate:32, inventoryMonths:15, loanEase:'Low',      legalRisk:'Medium', liquidityScore:36, investorInterest:'Low',         holdingPeriod:'10–13 Yrs',forecast:{c:5,e:10,o:18},  catalysts:['Cement industry','NH 81 improvement','Limestone reserves'],                     reasons:['Cement and limestone industry providing stable economic base','NH 81 upgrade expected to trigger corridor appreciation','Medium legal risk — older land records need careful verification','Very slow market — absolute lowest price entry in Tamil Nadu','Only for extremely patient land bank investors'] },
  perambalur:    { label:'Perambalur',     tier:'Tier 3',  guidelineValue:1200,  marketValue:1600,  growth1Y:4,  growth3Y:12, growth5Y:22, rentalYield:2.8, infraScore:5.5, marketHeat:'Slow',     demandSupply:'Balanced',    absorptionRate:34, inventoryMonths:14, loanEase:'Low',      legalRisk:'Low',    liquidityScore:40, investorInterest:'Low',         holdingPeriod:'9–12 Yrs', forecast:{c:6,e:11,o:19},  catalysts:['Trichy spillover','Agricultural zone','SIPCOT interest'],                       reasons:['Trichy spillover slowly elevating northern perambalur areas','Agricultural prosperity keeping land prices stable','Low legal risk with clean patta documentation','Very low absorption rate — buyers market with room to negotiate','SIPCOT industrial interest could be future price catalyst'] },
  pudukkottai:   { label:'Pudukkottai',    tier:'Tier 3',  guidelineValue:1300,  marketValue:1750,  growth1Y:5,  growth3Y:13, growth5Y:24, rentalYield:2.9, infraScore:5.8, marketHeat:'Slow',     demandSupply:'Balanced',    absorptionRate:38, inventoryMonths:13, loanEase:'Low',      legalRisk:'Low',    liquidityScore:44, investorInterest:'Low',         holdingPeriod:'8–11 Yrs', forecast:{c:7,e:13,o:22},  catalysts:['Trichy proximity','Granite quarrying','Agricultural belt'],                      reasons:['Granite quarrying industry providing unique economic niche','Trichy proximity creating gradual real estate spillover','Low legal risk — clean land records in most taluks','Agricultural land with water access showing best appreciation','Long horizon investors benefit from low entry price'] },
  mayiladuthurai: { label:'Mayiladuthurai',tier:'Tier 3',  guidelineValue:1300,  marketValue:1750,  growth1Y:5,  growth3Y:14, growth5Y:26, rentalYield:3.0, infraScore:5.8, marketHeat:'Slow',     demandSupply:'Balanced',    absorptionRate:39, inventoryMonths:13, loanEase:'Low',      legalRisk:'Low',    liquidityScore:45, investorInterest:'Low',         holdingPeriod:'8–10 Yrs', forecast:{c:8,e:14,o:23},  catalysts:['New district status','Kaveri delta agriculture','Temple tourism'],              reasons:['Newly elevated district status bringing administrative investment','Kaveri delta agricultural prosperity supporting rural land values','Temple tourism creating small commercial real estate demand','Low legal risk with strong Patta tradition in delta region','Patient investors benefit from very low entry valuations'] },
  nilgiris:      { label:'Nilgiris',       tier:'Tier 2',  guidelineValue:2800,  marketValue:4200,  growth1Y:9,  growth3Y:27, growth5Y:52, rentalYield:4.5, infraScore:7.5, marketHeat:'Hot',      demandSupply:'High Demand', absorptionRate:70, inventoryMonths:5,  loanEase:'Medium',   legalRisk:'Medium', liquidityScore:76, investorInterest:'Strong',      holdingPeriod:'4–7 Yrs',  forecast:{c:18,e:33,o:52}, catalysts:['Ooty tourism','Tea estate modernisation','Work-from-mountain trend'],          reasons:['Work-from-mountain trend dramatically boosting hill station demand','Ooty and Coonoor tourism sustaining premium rental yields of 4.5%','Tea estate conversion creating unique investment opportunities','Medium legal risk — tribal land restrictions need careful navigation','Hot market with strong investor interest from urban buyers'] },
  ranipet:       { label:'Ranipet',        tier:'Tier 2',  guidelineValue:2000,  marketValue:2800,  growth1Y:8,  growth3Y:24, growth5Y:46, rentalYield:3.6, infraScore:8.0, marketHeat:'Hot',      demandSupply:'High Demand', absorptionRate:70, inventoryMonths:5,  loanEase:'High',     legalRisk:'Low',    liquidityScore:78, investorInterest:'Strong',      holdingPeriod:'4–6 Yrs',  forecast:{c:17,e:31,o:48}, catalysts:['Chennai spillover','Leather industry SIPCOT','NH 48 corridor'],               reasons:['Chennai spillover driving 8% annual price appreciation','Leather industry SIPCOT creating strong industrial real estate demand','NH 48 corridor land showing fastest appreciation in district','High loan approval ease — ideal for first-time investors','Low legal risk with clear industrial and residential zone delineation'] },
  tirupathur:    { label:'Tirupathur',     tier:'Tier 3',  guidelineValue:1600,  marketValue:2100,  growth1Y:6,  growth3Y:17, growth5Y:32, rentalYield:3.1, infraScore:6.5, marketHeat:'Slow',     demandSupply:'Balanced',    absorptionRate:46, inventoryMonths:10, loanEase:'Low',      legalRisk:'Low',    liquidityScore:52, investorInterest:'Low',         holdingPeriod:'7–9 Yrs',  forecast:{c:9,e:17,o:27},  catalysts:['New district development','Krishnagiri proximity','Silk industry revival'],     reasons:['Newly formed district attracting administrative infrastructure investment','Krishnagiri proximity expected to create spillover appreciation','Silk industry revival creating niche artisan housing demand','Low legal risk with clean land documentation history','Conservative long-term hold recommended for steady returns'] },
  chengalpattu:  { label:'Chengalpattu',   tier:'Tier 1',  guidelineValue:3500,  marketValue:5200,  growth1Y:13, growth3Y:40, growth5Y:78, rentalYield:4.4, infraScore:9.2, marketHeat:'Hot',      demandSupply:'High Demand', absorptionRate:84, inventoryMonths:3,  loanEase:'High',     legalRisk:'Low',    liquidityScore:91, investorInterest:'Very Strong', holdingPeriod:'3–5 Yrs',  forecast:{c:25,e:46,o:70}, catalysts:['Chennai ORR','GST Road IT corridor','Mahindra World City'],                    reasons:['Chennai ORR and GST corridor driving 13% annual appreciation','Mahindra World City creating massive tech employment demand','Second-highest liquidity score in TN (91/100)','IT/ITES workforce sustaining 4.4% rental yield','Absorption rate 84% signals strongest demand in suburban TN'] },
  kanniyakumari: { label:'Kanniyakumari',  tier:'Tier 2',  guidelineValue:2200,  marketValue:3100,  growth1Y:8,  growth3Y:23, growth5Y:44, rentalYield:4.2, infraScore:7.5, marketHeat:'Moderate', demandSupply:'High Demand', absorptionRate:65, inventoryMonths:6,  loanEase:'Medium',   legalRisk:'Medium', liquidityScore:72, investorInterest:'Moderate',    holdingPeriod:'5–7 Yrs',  forecast:{c:15,e:28,o:44}, catalysts:['Tourism boom','Vivekananda Rock tourism','Wind energy expansion'],           reasons:['Southernmost tip tourism driving premium holiday rental yields of 4.2%','Wind energy expansion bringing workforce housing demand','Nagercoil urban centre showing consistent residential appreciation','Medium legal risk — coastal land restrictions apply in some zones','Strong NRI interest from diaspora investing in homeland properties'] },
  tiruvallur:    { label:'Tiruvallur',     tier:'Tier 1',  guidelineValue:3200,  marketValue:4800,  growth1Y:12, growth3Y:38, growth5Y:72, rentalYield:4.2, infraScore:9.0, marketHeat:'Hot',      demandSupply:'High Demand', absorptionRate:80, inventoryMonths:3,  loanEase:'High',     legalRisk:'Low',    liquidityScore:89, investorInterest:'Very Strong', holdingPeriod:'3–5 Yrs',  forecast:{c:23,e:44,o:66}, catalysts:['Chennai airport proximity','SIPCOT industrial cluster','NH 48 expansion'],    reasons:['Chennai airport proximity making this TN\'s fastest-appreciating suburban zone','SIPCOT industrial cluster supporting massive workforce housing demand','12% annual growth driven by IT and industrial corridor expansion','High liquidity score (89/100) ensures easy exit when needed','NH 48 expansion creating new land value hotspots along corridor'] },
  tiruvarur:     { label:'Tiruvarur',      tier:'Tier 3',  guidelineValue:1200,  marketValue:1600,  growth1Y:4,  growth3Y:12, growth5Y:22, rentalYield:2.8, infraScore:5.5, marketHeat:'Slow',     demandSupply:'Balanced',    absorptionRate:35, inventoryMonths:14, loanEase:'Low',      legalRisk:'Low',    liquidityScore:40, investorInterest:'Low',         holdingPeriod:'9–12 Yrs', forecast:{c:6,e:11,o:19},  catalysts:['Delta agriculture','Temple circuit tourism','Cauvery water access'],            reasons:['Cauvery delta agriculture keeping rural land economy stable','Temple circuit tourism creating minor commercial rental demand','Low legal risk — strong land record tradition in delta region','Very slow market — absolute patience required from investors','Best strategy: agricultural land near water bodies for long-term hold'] },
};

/* ── Helpers ── */
function mtFmt(n) {
  n = Math.round(n);
  if (n >= 10000000) return '₹' + (n/10000000).toFixed(2) + ' Cr';
  if (n >= 100000)   return '₹' + (n/100000).toFixed(2) + ' L';
  return '₹' + n.toLocaleString('en-IN');
}

function mtScore(d, goal) {
  let s = 0;
  s += Math.min(d.growth5Y / 100 * 18, 18);
  s += Math.min(d.growth1Y / 20 * 10, 10);
  s += Math.min(d.rentalYield / 6 * 12, 12);
  s += (d.infraScore / 10) * 16;
  s += d.marketHeat === 'Hot' ? 12 : d.marketHeat === 'Moderate' ? 7 : 3;
  s += d.demandSupply === 'High Demand' ? 10 : d.demandSupply === 'Balanced' ? 6 : 2;
  s += (d.liquidityScore / 100) * 10;
  s += d.legalRisk === 'Low' ? 8 : d.legalRisk === 'Medium' ? 4 : 1;
  s += d.loanEase === 'High' ? 6 : d.loanEase === 'Medium' ? 3 : 1;
  if (goal === 'invest') s += 8; else if (goal === 'live') s += 5; else s += 2;
  return Math.min(Math.round(s), 100);
}

function mtRisk(d) {
  let r = 0;
  if (d.legalRisk === 'Low') r += 0; else if (d.legalRisk === 'Medium') r += 2; else r += 4;
  if (d.inventoryMonths <= 5) r += 0; else if (d.inventoryMonths <= 10) r += 1; else r += 3;
  if (d.demandSupply === 'High Demand') r += 0; else if (d.demandSupply === 'Balanced') r += 1; else r += 3;
  if (r <= 1) return { label: '🟢 Low Risk',      color: '#4eca80' };
  if (r <= 4) return { label: '🟡 Moderate Risk', color: '#c9a84c' };
  return             { label: '🔴 High Risk',     color: '#e74c3c' };
}

function mtRec(score) {
  if (score >= 80) return { label: '🟢 BUY NOW',      color: '#4eca80', bg: 'rgba(78,202,128,0.12)'  };
  if (score >= 60) return { label: '🟡 HOLD & WATCH', color: '#c9a84c', bg: 'rgba(201,168,76,0.12)'  };
  return                  { label: '🔴 WAIT / SELL',  color: '#e74c3c', bg: 'rgba(231,76,60,0.12)'   };
}

function mtStrategy(score, d) {
  if (d.rentalYield >= 4.0 && score >= 70) return '🏘️ Rental Income Focus';
  if (score >= 80 && d.growth5Y >= 50)     return '📈 Capital Appreciation';
  if (score >= 70)                          return '💎 Long-Term Investment';
  if (score >= 60)                          return '⏱️ Short-Term Hold';
  return                                           '🚫 Avoid Entry';
}

function mtHeatC(h) { return h === 'Hot' ? '#4eca80' : h === 'Moderate' ? '#c9a84c' : '#e07b3a'; }
function mtDsC(ds)  { return ds === 'High Demand' ? '#4eca80' : ds === 'Balanced' ? '#c9a84c' : '#e74c3c'; }

function mtCopyMarket() {
  const el = document.getElementById('mt-copy-text');
  if (!el) return;
  navigator.clipboard.writeText(el.value).then(() => {
    const btn = document.getElementById('mt-copy-btn');
    if (!btn) return;
    btn.textContent = '✅ Copied!';
    btn.style.background = 'rgba(78,202,128,0.15)';
    btn.style.borderColor = '#4eca80';
    btn.style.color = '#4eca80';
    setTimeout(() => {
      btn.textContent = '📋 Copy Analysis';
      btn.style.background = 'rgba(201,168,76,0.1)';
      btn.style.borderColor = 'rgba(201,168,76,0.5)';
      btn.style.color = '#c9a84c';
    }, 2200);
  });
}

/* ═══════════════════════
   BUILD PANEL
═══════════════════════ */
function buildMarket(b) {
  b.innerHTML = `
  <p style="color:var(--text3,#888);font-size:13px;margin-bottom:20px">
    38-District Tamil Nadu real estate intelligence — data-driven Buy / Hold / Sell
  </p>

  <!-- INPUTS -->
  <div class="form-row">
    <div class="form-group">
      <label>District</label>
      <select id="mt-location" onchange="calcMarketTrend()">
        ${Object.entries(MT_DISTRICTS).map(([k,v])=>
          `<option value="${k}">${v.label} (${v.tier})</option>`
        ).join('')}
      </select>
    </div>
    <div class="form-group">
      <label>Investment Goal</label>
      <select id="mt-goal" onchange="calcMarketTrend()">
        <option value="invest">Investment / ROI</option>
        <option value="live">Own Use / Living</option>
        <option value="sell">Sell Existing Property</option>
      </select>
    </div>
  </div>
  <div class="form-row">
    <div class="form-group">
      <label>Property Area (sq.ft)</label>
      <input type="number" id="mt-sqft" value="1200" oninput="calcMarketTrend()">
    </div>
    <div class="form-group">
      <label>Investment Budget (₹)</label>
      <input type="number" id="mt-budget" value="5000000" oninput="calcMarketTrend()">
    </div>
  </div>

  <!-- MAIN CARD -->
  <div id="mt-main-card" style="background:linear-gradient(135deg,#1C1A14,#2a2218);border-radius:16px;padding:24px;margin:20px 0;display:none">
    <div style="font-size:11px;letter-spacing:.08em;color:#c9a84c;text-transform:uppercase;font-weight:600;margin-bottom:6px">Recommendation</div>
    <div id="mt-rec-val" style="font-size:2rem;font-weight:700;color:#fff;margin-bottom:12px">—</div>
    <div style="display:flex;gap:8px;flex-wrap:wrap">
      <span id="mt-score-b" style="padding:5px 14px;border-radius:20px;font-size:12px;font-weight:700;background:rgba(201,168,76,0.15);color:#c9a84c"></span>
      <span id="mt-risk-b"  style="padding:5px 14px;border-radius:20px;font-size:12px;font-weight:700;background:rgba(255,255,255,0.06);color:#bbb"></span>
      <span id="mt-heat-b"  style="padding:5px 14px;border-radius:20px;font-size:12px;font-weight:700;background:rgba(255,255,255,0.06);color:#bbb"></span>
      <span id="mt-ds-b"    style="padding:5px 14px;border-radius:20px;font-size:12px;font-weight:700;background:rgba(255,255,255,0.06);color:#bbb"></span>
      <span id="mt-strat-b" style="padding:5px 14px;border-radius:20px;font-size:12px;font-weight:700;background:rgba(255,255,255,0.06);color:#e8c55a"></span>
    </div>
  </div>

  <!-- SUMMARY CARDS -->
  <div id="mt-sum-grid" style="display:none;grid-template-columns:repeat(2,1fr);gap:12px;margin-bottom:20px">
    ${[['mt-mkt-rate','Market Rate (₹/sq.ft)'],['mt-gl-rate','Guideline Value (₹/sq.ft)'],
       ['mt-premium','Premium over Guideline'],['mt-rental','Rental Yield %'],
       ['mt-infra','Infrastructure Score'],['mt-hold','Best Holding Period']
    ].map(([id,lbl])=>`
      <div style="background:#fff;border:1.5px solid #e8dfc8;border-radius:12px;padding:16px;text-align:center;box-shadow:0 2px 8px rgba(0,0,0,0.05)">
        <div style="font-size:10px;color:#888;font-weight:600;text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px">${lbl}</div>
        <div id="${id}" style="font-size:1rem;font-weight:700;color:#c9a84c">—</div>
      </div>`).join('')}
  </div>

  <!-- PROFESSIONAL METRICS -->
  <div id="mt-pro-wrap" style="display:none;background:#fff;border:1.5px solid #e8dfc8;border-radius:14px;padding:20px;margin-bottom:20px;box-shadow:0 2px 12px rgba(0,0,0,0.06)">
    <div style="font-size:13px;font-weight:700;color:#1a1a2e;margin-bottom:14px">🏛️ Professional Metrics</div>
    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px" id="mt-pro-grid"></div>
  </div>

  <!-- HISTORICAL GROWTH -->
  <div id="mt-growth-wrap" style="display:none;background:#fff;border:1.5px solid #e8dfc8;border-radius:14px;padding:20px;margin-bottom:20px;box-shadow:0 2px 12px rgba(0,0,0,0.06)">
    <div style="font-size:13px;font-weight:700;color:#1a1a2e;margin-bottom:14px">📈 Historical Price Growth</div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px" id="mt-growth-grid"></div>
  </div>

  <!-- PRICE ESTIMATE -->
  <div id="mt-price-wrap" style="display:none;background:#fff;border:1.5px solid #e8dfc8;border-radius:14px;padding:20px;margin-bottom:20px;box-shadow:0 2px 12px rgba(0,0,0,0.06)">
    <div style="font-size:13px;font-weight:700;color:#1a1a2e;margin-bottom:14px">💰 Property Value Estimate</div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px" id="mt-price-grid"></div>
  </div>

  <!-- FORECAST -->
  <div id="mt-fc-wrap" style="display:none;background:#fff;border:1.5px solid #e8dfc8;border-radius:14px;padding:20px;margin-bottom:20px;box-shadow:0 2px 12px rgba(0,0,0,0.06)">
    <div style="font-size:13px;font-weight:700;color:#1a1a2e;margin-bottom:14px">🔮 5-Year Price Forecast</div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px" id="mt-fc-grid"></div>
    <div style="margin-top:10px;font-size:11px;color:#aaa">* Forecast based on historical trend and infrastructure development pipeline</div>
  </div>

  <!-- CATALYSTS -->
  <div id="mt-cat-wrap" style="display:none;background:#fff;border:1.5px solid #e8dfc8;border-radius:14px;padding:20px;margin-bottom:20px;box-shadow:0 2px 12px rgba(0,0,0,0.06)">
    <div style="font-size:13px;font-weight:700;color:#1a1a2e;margin-bottom:14px">⚡ Future Growth Catalysts</div>
    <div id="mt-cat-grid" style="display:flex;gap:10px;flex-wrap:wrap"></div>
  </div>

  <!-- REASON SUMMARY -->
  <div id="mt-reason-wrap" style="display:none;background:#F5F0E8;border:1.5px solid #e8dfc8;border-radius:14px;padding:20px;margin-bottom:20px">
    <div style="font-size:13px;font-weight:700;color:#1a1a2e;margin-bottom:14px">🧠 Investment Analysis</div>
    <div id="mt-reasons"></div>
  </div>

  <!-- COPY -->
  <button id="mt-copy-btn" onclick="mtCopyMarket()" style="display:none;width:100%;padding:14px;border-radius:12px;border:1.5px solid rgba(201,168,76,0.5);background:rgba(201,168,76,0.1);color:#c9a84c;font-size:13px;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .25s">📋 Copy Analysis</button>
  <textarea id="mt-copy-text" style="display:none" readonly></textarea>
  `;
  calcMarketTrend();
}

/* ═══════════════════════
   CALCULATE
═══════════════════════ */
function calcMarketTrend() {
  const locKey = document.getElementById('mt-location')?.value || 'salem';
  const goal   = document.getElementById('mt-goal')?.value    || 'invest';
  const sqft   = +document.getElementById('mt-sqft')?.value   || 1200;
  const budget = +document.getElementById('mt-budget')?.value || 5000000;
  const d = MT_DISTRICTS[locKey];
  if (!d) return;

  const score   = mtScore(d, goal);
  const risk    = mtRisk(d);
  const rec     = mtRec(score);
  const strat   = mtStrategy(score, d);
  const premium = ((d.marketValue - d.guidelineValue) / d.guidelineValue * 100).toFixed(1);
  const budgetSqft = Math.round(budget / d.marketValue);
  const fc5c = d.marketValue * (1 + d.forecast.c/100);
  const fc5e = d.marketValue * (1 + d.forecast.e/100);
  const fc5o = d.marketValue * (1 + d.forecast.o/100);

  /* Show sections */
  ['mt-main-card','mt-pro-wrap','mt-growth-wrap','mt-price-wrap',
   'mt-fc-wrap','mt-cat-wrap','mt-reason-wrap','mt-copy-btn'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'block';
  });
  document.getElementById('mt-sum-grid').style.display = 'grid';

  /* Main card */
  document.getElementById('mt-rec-val').textContent  = rec.label;
  document.getElementById('mt-rec-val').style.color  = rec.color;
  document.getElementById('mt-score-b').textContent  = `Score: ${score}/100`;
  document.getElementById('mt-risk-b').textContent   = risk.label;
  document.getElementById('mt-risk-b').style.color   = risk.color;
  document.getElementById('mt-heat-b').textContent   = `🌡️ ${d.marketHeat} Market`;
  document.getElementById('mt-heat-b').style.color   = mtHeatC(d.marketHeat);
  document.getElementById('mt-ds-b').textContent     = d.demandSupply;
  document.getElementById('mt-ds-b').style.color     = mtDsC(d.demandSupply);
  document.getElementById('mt-strat-b').textContent  = strat;

  /* Summary cards */
  document.getElementById('mt-mkt-rate').textContent = `₹${d.marketValue.toLocaleString('en-IN')}`;
  document.getElementById('mt-gl-rate').textContent  = `₹${d.guidelineValue.toLocaleString('en-IN')}`;
  document.getElementById('mt-premium').textContent  = `+${premium}%`;
  document.getElementById('mt-premium').style.color  = +premium > 30 ? '#4eca80' : '#c9a84c';
  document.getElementById('mt-rental').textContent   = d.rentalYield + '%';
  document.getElementById('mt-infra').textContent    = d.infraScore + '/10';
  document.getElementById('mt-hold').textContent     = d.holdingPeriod;

  /* Professional metrics */
  document.getElementById('mt-pro-grid').innerHTML = [
    { label:'Liquidity Score',       val:`${d.liquidityScore}/100`, color: d.liquidityScore>=75?'#4eca80':'#c9a84c' },
    { label:'Absorption Rate',       val:`${d.absorptionRate}%`,    color: d.absorptionRate>=65?'#4eca80':'#c9a84c' },
    { label:'Inventory Overhang',    val:`${d.inventoryMonths} Months`, color: d.inventoryMonths<=6?'#4eca80':'#e07b3a' },
    { label:'Loan Approval Ease',    val:d.loanEase,                color: d.loanEase==='High'?'#4eca80':d.loanEase==='Medium'?'#c9a84c':'#e74c3c' },
    { label:'Legal Risk',            val:d.legalRisk,               color: d.legalRisk==='Low'?'#4eca80':d.legalRisk==='Medium'?'#c9a84c':'#e74c3c' },
    { label:'Investor Interest',     val:d.investorInterest,        color: d.investorInterest.includes('Strong')?'#4eca80':'#c9a84c' },
    { label:'Price-to-GL Ratio',     val:((d.marketValue/d.guidelineValue)).toFixed(2)+'x', color:'#c9a84c' },
    { label:'Exit Difficulty',       val:d.liquidityScore>=75?'Easy':d.liquidityScore>=55?'Moderate':'Difficult', color:d.liquidityScore>=75?'#4eca80':d.liquidityScore>=55?'#c9a84c':'#e74c3c' },
  ].map(m=>`
    <div style="background:#faf8f3;border:1px solid #e8dfc8;border-radius:10px;padding:12px 14px;display:flex;justify-content:space-between;align-items:center">
      <div style="font-size:11px;color:#888;font-weight:600">${m.label}</div>
      <div style="font-size:13px;font-weight:700;color:${m.color}">${m.val}</div>
    </div>
  `).join('');

  /* Growth */
  document.getElementById('mt-growth-grid').innerHTML = [
    {label:'1-Year Growth',val:d.growth1Y},{label:'3-Year Growth',val:d.growth3Y},{label:'5-Year Growth',val:d.growth5Y}
  ].map(g=>`
    <div style="background:#faf8f3;border:1px solid #e8dfc8;border-radius:10px;padding:14px;text-align:center">
      <div style="font-size:10px;color:#888;font-weight:600;text-transform:uppercase;margin-bottom:6px">${g.label}</div>
      <div style="font-size:1.2rem;font-weight:700;color:#4eca80">+${g.val}%</div>
      <div style="height:5px;background:#f0e8d0;border-radius:3px;margin-top:8px;overflow:hidden">
        <div style="height:100%;width:${Math.min(g.val,100)}%;background:linear-gradient(90deg,#c9a84c,#4eca80);border-radius:3px"></div>
      </div>
    </div>`).join('');

  /* Price estimate */
  document.getElementById('mt-price-grid').innerHTML = [
    {label:`Market Value (${sqft} sq.ft)`, val:mtFmt(d.marketValue*sqft), sub:`₹${d.marketValue}/sq.ft`, color:'#c9a84c'},
    {label:`Guideline Value (${sqft} sq.ft)`, val:mtFmt(d.guidelineValue*sqft), sub:`₹${d.guidelineValue}/sq.ft`, color:'#888'},
    {label:`Budget Coverage`, val:`${budgetSqft.toLocaleString('en-IN')} sq.ft`, sub:`at ₹${(budget/100000).toFixed(0)}L budget`, color:'#4eca80'},
  ].map(c=>`
    <div style="background:#faf8f3;border:1px solid #e8dfc8;border-radius:10px;padding:14px;text-align:center">
      <div style="font-size:10px;color:#888;font-weight:600;text-transform:uppercase;margin-bottom:6px">${c.label}</div>
      <div style="font-size:1rem;font-weight:700;color:${c.color}">${c.val}</div>
      <div style="font-size:10px;color:#aaa;margin-top:3px">${c.sub}</div>
    </div>`).join('');

  /* Forecast */
  document.getElementById('mt-fc-grid').innerHTML = [
    {label:'Conservative',pct:d.forecast.c,val:fc5c,color:'#e8b84b'},
    {label:'Expected',    pct:d.forecast.e,val:fc5e,color:'#c9a84c'},
    {label:'Optimistic',  pct:d.forecast.o,val:fc5o,color:'#4eca80'},
  ].map(f=>`
    <div style="background:#faf8f3;border:1px solid #e8dfc8;border-radius:10px;padding:14px;text-align:center">
      <div style="font-size:10px;color:#888;font-weight:600;text-transform:uppercase;margin-bottom:6px">${f.label}</div>
      <div style="font-size:1.1rem;font-weight:700;color:${f.color}">+${f.pct}%</div>
      <div style="font-size:11px;color:#555;margin-top:4px;font-weight:600">₹${Math.round(f.val).toLocaleString('en-IN')}/sq.ft</div>
    </div>`).join('');

  /* Catalysts */
  document.getElementById('mt-cat-grid').innerHTML = d.catalysts.map(c=>`
    <div style="padding:8px 16px;background:#fff;border:1px solid #e8dfc8;border-radius:20px;font-size:12px;font-weight:600;color:#c9a84c;display:flex;align-items:center;gap:6px">
      ⚡ ${c}
    </div>`).join('');

  /* Reasons */
  document.getElementById('mt-reasons').innerHTML = d.reasons.map(r=>`
    <div style="display:flex;gap:10px;align-items:flex-start;margin-bottom:10px;padding:10px 14px;background:#fff;border-radius:8px;border-left:3px solid #c9a84c">
      <span style="color:#c9a84c;font-weight:700;flex-shrink:0">→</span>
      <span style="font-size:12.5px;color:#444;line-height:1.6">${r}</span>
    </div>`).join('');

  /* Copy text */
  document.getElementById('mt-copy-text').value =
`=== TN Real Estate Intelligence Report ===
District             : ${d.label} (${d.tier})
Goal                 : ${goal === 'invest' ? 'Investment/ROI' : goal === 'live' ? 'Own Use' : 'Sell'}

RECOMMENDATION       : ${rec.label}
Investment Score     : ${score}/100
Risk Level           : ${risk.label}
Strategy             : ${strat}

Market Rate          : ₹${d.marketValue}/sq.ft
Guideline Value      : ₹${d.guidelineValue}/sq.ft
Premium over GL      : +${premium}%
Price-to-GL Ratio    : ${(d.marketValue/d.guidelineValue).toFixed(2)}x

Historical Growth:
  1-Year             : +${d.growth1Y}%
  3-Year             : +${d.growth3Y}%
  5-Year             : +${d.growth5Y}%

Rental Yield         : ${d.rentalYield}%
Infrastructure Score : ${d.infraScore}/10
Market Heat          : ${d.marketHeat}
Demand-Supply        : ${d.demandSupply}

Professional Metrics:
  Liquidity Score    : ${d.liquidityScore}/100
  Absorption Rate    : ${d.absorptionRate}%
  Inventory Months   : ${d.inventoryMonths}
  Loan Ease          : ${d.loanEase}
  Legal Risk         : ${d.legalRisk}
  Investor Interest  : ${d.investorInterest}

Best Holding Period  : ${d.holdingPeriod}

5-Year Forecast:
  Conservative       : +${d.forecast.c}% → ₹${Math.round(fc5c)}/sq.ft
  Expected           : +${d.forecast.e}% → ₹${Math.round(fc5e)}/sq.ft
  Optimistic         : +${d.forecast.o}% → ₹${Math.round(fc5o)}/sq.ft

Growth Catalysts: ${d.catalysts.join(', ')}

Analysis:
${d.reasons.map(r=>'  • '+r).join('\n')}
==========================================
Generated by J Square Housing Tools`;
}
/* ─── 19. AGENT PERFORMANCE ─── */
/* ============================================================
   AGENT PERFORMANCE MODULE — HEATMAP WITH 12-MONTH INPUTS
   ============================================================ */

(function () {

  if (!document.getElementById('ap-theme-styles')) {
    const style = document.createElement('style');
    style.id = 'ap-theme-styles';
    style.textContent = `
      .ap-wrap { font-family: inherit; color: inherit; max-width: 100%; }
      .ap-subtitle { font-size: 13px; color: #666; margin-bottom: 20px; }

      .ap-form-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
        margin-bottom: 20px;
      }
      @media(max-width:540px){ .ap-form-grid { grid-template-columns: 1fr; } }

      .ap-field label {
        display: block;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: .08em;
        text-transform: uppercase;
        color: #888;
        margin-bottom: 6px;
      }
      .ap-field input, .ap-field select {
        width: 100%;
        background: transparent;
        border: none;
        border-bottom: 1.5px solid #ccc;
        padding: 8px 2px;
        font-family: inherit;
        font-size: 15px;
        color: inherit;
        outline: none;
        box-sizing: border-box;
        transition: border-color .2s;
      }
      .ap-field input:focus { border-bottom-color: #b8941a; }

      /* ── 12-month horizontal input strip ── */
      .ap-hm-input-section {
        margin-bottom: 20px;
      }
      .ap-hm-input-label {
        font-size: 11px;
        font-weight: 700;
        letter-spacing: .09em;
        text-transform: uppercase;
        color: #aaa;
        margin-bottom: 4px;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .ap-hm-input-label::after {
        content:'';
        flex:1;
        height:1px;
        background:#e5ddd0;
      }
      .ap-hm-input-hint {
        font-size: 11px;
        color: #bbb;
        margin-bottom: 12px;
        font-style: italic;
      }
      .ap-hm-input-scroll {
        overflow-x: auto;
        padding-bottom: 8px;
        -webkit-overflow-scrolling: touch;
      }
      .ap-hm-input-scroll::-webkit-scrollbar { height: 4px; }
      .ap-hm-input-scroll::-webkit-scrollbar-track { background: #f0ece4; border-radius: 4px; }
      .ap-hm-input-scroll::-webkit-scrollbar-thumb { background: #ccc; border-radius: 4px; }
      .ap-hm-input-row {
        display: flex;
        gap: 8px;
        min-width: 600px;
      }
      .ap-hm-month-col {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
        flex: 1;
        min-width: 44px;
      }
      .ap-hm-month-col label {
        font-size: 10px;
        font-weight: 700;
        letter-spacing: .05em;
        text-transform: uppercase;
        color: #aaa;
      }
      .ap-hm-month-col label.current-month-lbl {
        color: #b8941a;
      }
      .ap-hm-month-input {
        width: 100%;
        text-align: center;
        background: #f8f5ee;
        border: 1px solid #e0d8c8 !important;
        border-radius: 4px !important;
        padding: 7px 2px !important;
        font-family: inherit;
        font-size: 14px !important;
        font-weight: 700;
        color: #1a1a1a;
        outline: none;
        box-sizing: border-box;
        transition: border-color .2s, background .2s;
      }
      .ap-hm-month-input:focus {
        border-color: #b8941a !important;
        background: #fff;
      }
      .ap-hm-month-input.current-month-inp {
        border-color: #d4af37 !important;
        background: #fffaed;
      }

      /* ── Calc button ── */
      .ap-calc-btn {
        background: #1a1a1a;
        color: #fff;
        border: none;
        padding: 12px 24px;
        font-family: inherit;
        font-size: 13.5px;
        font-weight: 600;
        letter-spacing: .04em;
        cursor: pointer;
        border-radius: 4px;
        margin-bottom: 28px;
        position: relative;
        overflow: hidden;
        transition: background .2s, transform .15s, box-shadow .2s;
      }
      .ap-calc-btn:hover {
        background: #2d2d2d;
        transform: translateY(-1px);
        box-shadow: 0 4px 16px rgba(0,0,0,.18);
      }
      .ap-calc-btn:active { transform: translateY(0); }
      .ap-calc-btn::after {
        content:'';
        position:absolute; inset:0;
        background: linear-gradient(90deg,transparent,rgba(212,175,55,.25),transparent);
        transform: translateX(-100%);
        transition: transform .5s ease;
      }
      .ap-calc-btn:hover::after { transform: translateX(100%); }

      /* ── Results reveal ── */
      .ap-results {
        opacity: 0;
        transform: translateY(10px);
        transition: opacity .5s ease, transform .5s ease;
        pointer-events: none;
      }
      .ap-results.ap-visible {
        opacity: 1;
        transform: translateY(0);
        pointer-events: auto;
      }

      /* ── Grade Hero ── */
      .ap-grade-hero {
        background: #1a1a1a;
        color: #fff;
        border-radius: 6px;
        padding: 24px 22px;
        margin-bottom: 16px;
        position: relative;
        overflow: hidden;
        border-left: 3px solid #555;
      }
      .ap-grade-hero::before {
        content:'';
        position:absolute; inset:0;
        background: linear-gradient(110deg, transparent 0%, rgba(255,255,255,.03) 40%, rgba(255,255,255,.07) 50%, transparent 60%);
        background-size: 200% 100%;
        animation: ap-hero-shimmer 3.5s ease-in-out infinite;
        pointer-events:none;
      }
      @keyframes ap-hero-shimmer {
        0%   { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
      .ap-hero-top {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        position: relative;
        z-index:1;
      }
      .ap-hero-label { font-size:11px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:rgba(255,255,255,.4); margin-bottom:6px; }
      .ap-hero-grade { font-size:24px; font-weight:800; color:#fff; line-height:1.2; }
      .ap-hero-emoji { font-size:38px; line-height:1; display:inline-block; }
      .ap-hero-ai-msg { font-size:12px; color:rgba(255,255,255,.45); font-style:italic; margin-top:6px; position:relative; z-index:1; }

      .ap-hero-emoji.glow-hot    { animation: ap-emoji-glow-hot  1.8s ease-in-out infinite; }
      .ap-hero-emoji.glow-elite  { animation: ap-emoji-glow-elite 2s  ease-in-out infinite; }
      .ap-hero-emoji.glow-warm   { animation: ap-emoji-glow-warm 2.5s ease-in-out infinite; }
      .ap-hero-emoji.glow-cold   { animation: ap-emoji-glow-cold  3s  ease-in-out infinite; }
      @keyframes ap-emoji-glow-hot   { 0%,100%{filter:drop-shadow(0 0 4px rgba(255,100,0,.6));transform:scale(1)} 50%{filter:drop-shadow(0 0 14px rgba(255,60,0,.9)) drop-shadow(0 0 28px rgba(255,140,0,.4));transform:scale(1.1)} }
      @keyframes ap-emoji-glow-elite { 0%,100%{filter:drop-shadow(0 0 5px rgba(212,175,55,.7));transform:scale(1) rotate(-3deg)} 50%{filter:drop-shadow(0 0 18px rgba(255,215,0,1)) drop-shadow(0 0 35px rgba(212,175,55,.5));transform:scale(1.14) rotate(3deg)} }
      @keyframes ap-emoji-glow-warm  { 0%,100%{filter:drop-shadow(0 0 3px rgba(255,170,0,.5));transform:scale(1)} 50%{filter:drop-shadow(0 0 10px rgba(255,200,50,.8));transform:scale(1.07)} }
      @keyframes ap-emoji-glow-cold  { 0%,100%{filter:drop-shadow(0 0 3px rgba(100,180,255,.4));transform:scale(1)} 50%{filter:drop-shadow(0 0 10px rgba(120,200,255,.7));transform:scale(1.05)} }

      .ap-grade-hero.tier-hot   { border-left-color:#ff4500; animation:ap-border-pulse-hot  2s  ease-in-out infinite; }
      .ap-grade-hero.tier-elite { border-left-color:#d4af37; animation:ap-border-pulse-elite 2.2s ease-in-out infinite; }
      .ap-grade-hero.tier-warm  { border-left-color:#e8a020; }
      .ap-grade-hero.tier-cold  { border-left-color:#7ab0cc; }
      @keyframes ap-border-pulse-hot   { 0%,100%{border-left-color:#ff4500;box-shadow:inset 2px 0 12px rgba(255,69,0,.08)} 50%{border-left-color:#ff8c00;box-shadow:inset 2px 0 22px rgba(255,140,0,.18)} }
      @keyframes ap-border-pulse-elite { 0%,100%{border-left-color:#d4af37;box-shadow:inset 2px 0 14px rgba(212,175,55,.1)} 50%{border-left-color:#ffd700;box-shadow:inset 2px 0 28px rgba(255,215,0,.22)} }

      /* ── Stats row ── */
      .ap-stats-row { display:grid; grid-template-columns:repeat(4,1fr); gap:10px; margin-bottom:16px; }
      @media(max-width:540px){ .ap-stats-row { grid-template-columns:repeat(2,1fr); } }
      .ap-mini-card { background:#f8f5ee; border:1px solid #e0d8c8; border-radius:6px; padding:12px 14px; position:relative; overflow:hidden; transition:transform .2s,box-shadow .2s,border-color .2s; }
      .ap-mini-card:hover { transform:translateY(-2px); box-shadow:0 4px 14px rgba(0,0,0,.07); border-color:#c8b890; }
      .ap-mini-card::before { content:''; position:absolute; top:0;left:0;right:0; height:2px; background:var(--ap-mc-accent,#d4af37); transform:scaleX(0); transition:transform .4s ease; transform-origin:left; }
      .ap-mini-card.ap-mc-ready::before { transform:scaleX(1); }
      .ap-mc-label { font-size:10px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; color:#999; margin-bottom:5px; }
      .ap-mc-value { font-size:20px; font-weight:800; color:#1a1a1a; line-height:1; }

      /* ── Temperature bar ── */
      .ap-temp-wrap { background:#f8f5ee; border:1px solid #e0d8c8; border-radius:6px; padding:14px 16px; margin-bottom:14px; }
      .ap-temp-title { font-size:10px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; color:#999; margin-bottom:10px; }
      .ap-temp-track { height:6px; background:#e5ddd0; border-radius:6px; margin-bottom:8px; overflow:visible; position:relative; }
      .ap-temp-fill { height:100%; border-radius:6px; width:0%; transition:width 1.1s cubic-bezier(.16,1,.3,1); background:var(--ap-tf-grad,linear-gradient(90deg,#7ab0cc,#d4af37)); position:relative; }
      .ap-temp-fill::after { content:''; position:absolute; right:-4px;top:50%; transform:translateY(-50%); width:10px;height:10px; border-radius:50%; background:var(--ap-tf-dot,#d4af37); box-shadow:0 0 6px var(--ap-tf-dot,#d4af37),0 0 14px var(--ap-tf-dot,#d4af37); animation:ap-dot-pulse 1.4s ease-in-out infinite; }
      @keyframes ap-dot-pulse { 0%,100%{transform:translateY(-50%) scale(1);opacity:.9} 50%{transform:translateY(-50%) scale(1.4);opacity:1} }
      .ap-temp-stops { display:flex; justify-content:space-between; font-size:11px; color:#bbb; }
      .ap-temp-stops span.ap-ts-active { color:#1a1a1a; font-weight:700; }

      /* ════════════════════════════════════════
         HEATMAP RESULT SECTION
      ════════════════════════════════════════ */
      .ap-hm-section { background:#f8f5ee; border:1px solid #e0d8c8; border-radius:6px; padding:18px 18px 14px; margin-bottom:14px; }
      .ap-hm-title { font-size:13px; font-weight:700; letter-spacing:.04em; color:#1a1a1a; margin:0 0 3px; display:flex; align-items:center; gap:6px; }
      .ap-hm-subtitle { font-size:11px; color:#999; margin:0 0 16px; }

      .ap-hm-insights { display:grid; grid-template-columns:repeat(4,1fr); gap:8px; margin-bottom:16px; }
      @media(max-width:540px){ .ap-hm-insights { grid-template-columns:repeat(2,1fr); } }
      .ap-hm-ic { background:#fff; border:1px solid #e0d8c8; border-radius:5px; padding:10px 12px; transition:transform .18s,box-shadow .18s; }
      .ap-hm-ic:hover { transform:translateY(-1px); box-shadow:0 3px 10px rgba(0,0,0,.06); }
      .ap-hm-ic-icon { font-size:14px; margin-bottom:4px; }
      .ap-hm-ic-label { font-size:10px; font-weight:700; letter-spacing:.07em; text-transform:uppercase; color:#bbb; margin-bottom:3px; }
      .ap-hm-ic-value { font-size:17px; font-weight:800; color:#1a1a1a; line-height:1.1; }
      .ap-hm-ic-sub { font-size:10px; color:#aaa; margin-top:2px; }

      /* Heatmap grid */
      .ap-hm-grid { display:grid; grid-template-columns:repeat(6,1fr); gap:7px; margin-bottom:12px; }
      @media(max-width:500px){ .ap-hm-grid { grid-template-columns:repeat(4,1fr); } }
      @media(max-width:340px){ .ap-hm-grid { grid-template-columns:repeat(3,1fr); } }

      .ap-hm-tile { border-radius:5px; padding:10px 6px 8px; display:flex; flex-direction:column; align-items:center; gap:3px; border:1px solid transparent; transition:transform .18s ease,box-shadow .18s ease; position:relative; cursor:default; }
      .ap-hm-tile:hover { transform:translateY(-2px); box-shadow:0 4px 12px rgba(0,0,0,.1); }
      .ap-hm-tile-init  { font-size:11px; font-weight:700; letter-spacing:.04em; }
      .ap-hm-tile-month { font-size:9px; font-weight:700; letter-spacing:.06em; text-transform:uppercase; }
      .ap-hm-tile-count { font-size:15px; font-weight:800; margin-top:1px; line-height:1; }
      .ap-hm-tile-lbl   { font-size:9px; letter-spacing:.03em; text-transform:uppercase; }
      .ap-hm-crown { position:absolute; top:4px; right:5px; font-size:9px; line-height:1; }

      .ap-hm-tile.t-empty { background:#ede9e1; border-color:#ddd8cc; }
      .ap-hm-tile.t-empty .ap-hm-tile-init,
      .ap-hm-tile.t-empty .ap-hm-tile-month,
      .ap-hm-tile.t-empty .ap-hm-tile-count,
      .ap-hm-tile.t-empty .ap-hm-tile-lbl { color:#c0bab0; }

      .ap-hm-tile.t-zero { background:#ede9e1; border-color:#ddd8cc; }
      .ap-hm-tile.t-zero .ap-hm-tile-init,
      .ap-hm-tile.t-zero .ap-hm-tile-month,
      .ap-hm-tile.t-zero .ap-hm-tile-count,
      .ap-hm-tile.t-zero .ap-hm-tile-lbl { color:#c0bab0; }

      .ap-hm-tile.t-low { background:#fcebeb; border-color:#f09595; }
      .ap-hm-tile.t-low .ap-hm-tile-init,
      .ap-hm-tile.t-low .ap-hm-tile-month,
      .ap-hm-tile.t-low .ap-hm-tile-count { color:#791f1f; }
      .ap-hm-tile.t-low .ap-hm-tile-lbl   { color:#a32d2d; }

      .ap-hm-tile.t-mid { background:#faeeda; border-color:#ef9f27; }
      .ap-hm-tile.t-mid .ap-hm-tile-init,
      .ap-hm-tile.t-mid .ap-hm-tile-month,
      .ap-hm-tile.t-mid .ap-hm-tile-count { color:#412402; }
      .ap-hm-tile.t-mid .ap-hm-tile-lbl   { color:#633806; }

      .ap-hm-tile.t-high { background:#eaf3de; border-color:#639922; }
      .ap-hm-tile.t-high .ap-hm-tile-init,
      .ap-hm-tile.t-high .ap-hm-tile-month,
      .ap-hm-tile.t-high .ap-hm-tile-count { color:#173404; }
      .ap-hm-tile.t-high .ap-hm-tile-lbl   { color:#27500a; }

      .ap-hm-tile.t-best { background:#c0dd97; border-color:#3b6d11; border-width:1.5px; animation:ap-best-pulse 2.4s ease-in-out infinite; }
      .ap-hm-tile.t-best .ap-hm-tile-init,
      .ap-hm-tile.t-best .ap-hm-tile-month,
      .ap-hm-tile.t-best .ap-hm-tile-count { color:#173404; }
      .ap-hm-tile.t-best .ap-hm-tile-lbl   { color:#27500a; }
      @keyframes ap-best-pulse {
        0%,100% { border-color:#3b6d11; box-shadow:none; }
        50%     { border-color:#639922; box-shadow:0 0 0 3px rgba(99,153,34,.18); }
      }

      .ap-hm-legend { display:flex; align-items:center; gap:14px; flex-wrap:wrap; }
      .ap-hm-legend-item { display:flex; align-items:center; gap:5px; font-size:10px; color:#aaa; font-weight:600; letter-spacing:.02em; }
      .ap-hm-legend-dot  { width:9px; height:9px; border-radius:2px; flex-shrink:0; }

      /* ── Follow-up alert ── */
      .ap-alert-wrap { border-radius:6px; padding:13px 16px; margin-bottom:14px; display:flex; align-items:center; gap:12px; border:1.5px solid transparent; }
      .ap-alert-wrap.ap-alert-warn { background:rgba(255,87,34,.06); border-color:rgba(255,87,34,.25); animation:ap-alert-pulse 2.5s ease-in-out infinite; }
      .ap-alert-wrap.ap-alert-ok   { background:rgba(34,180,110,.06); border-color:rgba(34,180,110,.2); }
      @keyframes ap-alert-pulse { 0%,100%{border-color:rgba(255,87,34,.2)} 50%{border-color:rgba(255,87,34,.5);box-shadow:0 0 12px rgba(255,87,34,.08)} }
      .ap-alert-icon { font-size:20px; flex-shrink:0; display:inline-block; }
      .ap-alert-warn .ap-alert-icon { animation:ap-icon-shake 3s ease-in-out infinite; }
      @keyframes ap-icon-shake { 0%,85%,100%{transform:rotate(0deg)} 88%{transform:rotate(-10deg)} 92%{transform:rotate(10deg)} 96%{transform:rotate(-6deg)} }
      .ap-alert-text  { flex:1; }
      .ap-alert-title { font-size:13px; font-weight:700; color:#1a1a1a; margin-bottom:1px; }
      .ap-alert-sub   { font-size:11.5px; color:#888; }
      .ap-alert-badge { font-size:11px; font-weight:700; padding:3px 9px; border-radius:20px; white-space:nowrap; }
      .ap-alert-warn .ap-alert-badge { background:rgba(255,87,34,.12); color:#e84a1a; }
      .ap-alert-ok   .ap-alert-badge { background:rgba(34,180,110,.12); color:#1a9a60; }

      /* ── Mini funnel ── */
      .ap-funnel-wrap  { background:#f8f5ee; border:1px solid #e0d8c8; border-radius:6px; padding:14px 16px; margin-bottom:14px; }
      .ap-funnel-title { font-size:10px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; color:#999; margin-bottom:12px; }
      .ap-funnel-step  { display:flex; align-items:center; gap:10px; margin-bottom:8px; }
      .ap-funnel-step:last-child { margin-bottom:0; }
      .ap-funnel-bar-bg   { flex:1; height:7px; background:#e5ddd0; border-radius:4px; overflow:hidden; }
      .ap-funnel-bar-fill { height:100%; border-radius:4px; width:0%; transition:width 1.1s cubic-bezier(.16,1,.3,1); background:var(--ap-fb-color,#d4af37); }
      .ap-funnel-step-label { font-size:11px; font-weight:600; color:#888; min-width:72px; }
      .ap-funnel-step-pct   { font-size:11px; font-weight:800; color:#1a1a1a; min-width:36px; text-align:right; }
      .ap-funnel-drop       { font-size:10px; color:#e84a1a; font-weight:700; min-width:28px; text-align:right; }

      /* ── Sparkle ── */
      .ap-sparkle { position:absolute; pointer-events:none; z-index:10; font-size:16px; animation:ap-sparkle-burst var(--ap-sp-dur,1.2s) ease-out forwards; top:var(--ap-sp-y,30%); left:var(--ap-sp-x,50%); opacity:0; }
      @keyframes ap-sparkle-burst { 0%{opacity:1;transform:translate(0,0) scale(1)} 60%{opacity:.8} 100%{opacity:0;transform:translate(var(--ap-sp-tx,0px),var(--ap-sp-ty,-40px)) scale(.3)} }
      @keyframes ap-score-pop { 0%{opacity:0;transform:scale(.9) translateY(5px)} 60%{transform:scale(1.05) translateY(-2px)} 100%{opacity:1;transform:scale(1) translateY(0)} }
      .ap-score-pop { animation:ap-score-pop .55s cubic-bezier(.16,1,.3,1) forwards; }
    `;
    document.head.appendChild(style);
  }

  /* ── Helpers ── */
  function fmt(v) {
    if(v>=1e7) return '₹'+(v/1e7).toFixed(2)+' Cr';
    if(v>=1e5) return '₹'+(v/1e5).toFixed(2)+' L';
    return '₹'+v.toLocaleString('en-IN');
  }
  function countUp(el, to, suffix, dur) {
    const start=performance.now(), isF=String(to).includes('.');
    (function tick(now){
      const p=Math.min((now-start)/dur,1), e=1-Math.pow(1-p,3);
      el.textContent=(isF?(e*to).toFixed(1):Math.round(e*to))+(suffix||'');
      if(p<1) requestAnimationFrame(tick);
    })(start);
  }
  function spawnSparkles(container) {
    const sparks=['✦','✧','★','·','◆'];
    for(let i=0;i<8;i++){
      const s=document.createElement('span');
      s.className='ap-sparkle';
      s.textContent=sparks[i%sparks.length];
      s.style.setProperty('--ap-sp-x',(20+Math.random()*60)+'%');
      s.style.setProperty('--ap-sp-y',(10+Math.random()*50)+'%');
      s.style.setProperty('--ap-sp-tx',((Math.random()-.5)*80)+'px');
      s.style.setProperty('--ap-sp-ty',(-20-Math.random()*60)+'px');
      s.style.setProperty('--ap-sp-dur',(.8+Math.random()*.8)+'s');
      s.style.color=['#d4af37','#ffd700','#fff','#ffaa00'][i%4];
      s.style.animationDelay=(i*.08)+'s';
      container.appendChild(s);
      setTimeout(()=>s.remove(),2000);
    }
  }

  /* ── Tier config ── */
  function getTier(score) {
    if(score>=15) return { t:'ELITE', emoji:'🚀', emojiClass:'glow-elite', heroClass:'tier-elite', ai:'"High priority opportunity detected."', tempGrad:'linear-gradient(90deg,#7ab0cc,#e8a020,#d4af37,#ffd700)', tempDot:'#ffd700', tempActive:3, sparks:true };
    if(score>=8)  return { t:'HOT',   emoji:'🔥', emojiClass:'glow-hot',   heroClass:'tier-hot',   ai:'"Strong conversion probability."',     tempGrad:'linear-gradient(90deg,#7ab0cc,#e8a020,#ff6a00)',         tempDot:'#ff4500', tempActive:2, sparks:false };
    if(score>=4)  return { t:'WARM',  emoji:'☀️', emojiClass:'glow-warm',  heroClass:'tier-warm',  ai:'"Promising engagement."',               tempGrad:'linear-gradient(90deg,#7ab0cc,#e8a020)',                 tempDot:'#e8a020', tempActive:1, sparks:false };
    return        { t:'COLD',  emoji:'🧊', emojiClass:'glow-cold',  heroClass:'tier-cold',  ai:'"Weak buying signal."',                  tempGrad:'linear-gradient(90deg,#7ab0cc,#7ab0cc)',                 tempDot:'#7ab0cc', tempActive:0, sparks:false };
  }

  /* ── Follow-up health ── */
  function followUpAlert(visitRate, closeRate) {
    const leakage = visitRate - closeRate;
    if(leakage>60||closeRate<10) return {warn:true, msg:'High Visit-to-Close Leakage', sub:`${leakage.toFixed(0)}% of visits not converting — follow-ups needed`, badge:'Action Required'};
    if(leakage>35)               return {warn:true, msg:'Moderate Follow-Up Gap',      sub:`${leakage.toFixed(0)}% drop between visits & closures`,                badge:'Monitor'};
    return                              {warn:false, msg:'Follow-Up Health: Good',      sub:'Conversion pipeline is healthy',                                        badge:'On Track'};
  }

  const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  /* ════════════════════════════════════════
     buildAgent — main entry
  ════════════════════════════════════════ */
  window.buildAgent = function(b) {
    const curMonthIdx = new Date().getMonth(); // 0-based

    // Build 12 month input columns
    const monthCols = MONTH_NAMES.map((mn, i) => {
      const isCur = (i === curMonthIdx);
      return `
        <div class="ap-hm-month-col">
          <label class="${isCur ? 'current-month-lbl' : ''}">${mn}${isCur ? ' ★' : ''}</label>
          <input
            class="ap-hm-month-input${isCur ? ' current-month-inp' : ''}"
            type="number"
            id="ap-hm-inp-${i}"
            min="0"
            placeholder="—"
            title="${mn} — deals closed"
          >
        </div>
      `;
    }).join('');

    b.innerHTML = `
      <div class="ap-wrap">
        <p class="ap-subtitle">Enter leads, visits, closures — performance grade & insights</p>

        <div class="ap-form-grid">
          <div class="ap-field">
            <label>Agent பெயர்</label>
            <input type="text" id="ap-name" value="Murugan R">
          </div>
          <div class="ap-field">
            <label>Month / Period</label>
            <input type="text" id="ap-period" value="May 2026">
          </div>
          <div class="ap-field">
            <label>Total Leads</label>
            <input type="number" id="ap-leads" value="50" min="1">
          </div>
          <div class="ap-field">
            <label>Site Visits Done</label>
            <input type="number" id="ap-visits" value="20" min="0">
          </div>
          <div class="ap-field">
            <label>Deals Closed (This Month)</label>
            <input type="number" id="ap-deals" value="5" min="0">
          </div>
          <div class="ap-field">
            <label>Avg Deal Value (₹ Lakhs)</label>
            <input type="number" id="ap-dealval" value="60" min="0">
          </div>
          <div class="ap-field">
            <label>Monthly Target (Deals)</label>
            <input type="number" id="ap-target" value="4" min="1">
          </div>
        </div>

        <!-- 12-month horizontal input strip -->
        <div class="ap-hm-input-section">
          <div class="ap-hm-input-label">🔥 Deal Closures — All 12 Months</div>
          <p class="ap-hm-input-hint">ஒவ்வொரு month-லயும் எத்தனை deals close பண்ணீங்க? Enter பண்ணுங்க ↓</p>
          <div class="ap-hm-input-scroll">
            <div class="ap-hm-input-row">
              ${monthCols}
            </div>
          </div>
        </div>

        <button class="ap-calc-btn" id="ap-run-btn">⭐ Performance Calculate →</button>

        <div class="ap-results" id="ap-results-box">

          <!-- Grade Hero -->
          <div class="ap-grade-hero" id="ap-grade-hero">
            <div class="ap-hero-top">
              <div>
                <div class="ap-hero-label">Performance Grade</div>
                <div class="ap-hero-grade" id="ap-grade-text">—</div>
                <div class="ap-hero-ai-msg" id="ap-ai-msg"></div>
              </div>
              <span class="ap-hero-emoji" id="ap-hero-emoji">—</span>
            </div>
          </div>

          <!-- Stats -->
          <div class="ap-stats-row">
            <div class="ap-mini-card" style="--ap-mc-accent:#d4af37" id="ap-mc-0">
              <div class="ap-mc-label">Visit Rate</div>
              <div class="ap-mc-value" id="ap-stat-vr">—</div>
            </div>
            <div class="ap-mini-card" style="--ap-mc-accent:#e8a020" id="ap-mc-1">
              <div class="ap-mc-label">Closure Rate</div>
              <div class="ap-mc-value" id="ap-stat-cr">—</div>
            </div>
            <div class="ap-mini-card" style="--ap-mc-accent:#22a06b" id="ap-mc-2">
              <div class="ap-mc-label">Est. Revenue</div>
              <div class="ap-mc-value" id="ap-stat-rev">—</div>
            </div>
            <div class="ap-mini-card" style="--ap-mc-accent:#1a1a1a" id="ap-mc-3">
              <div class="ap-mc-label">Score Index</div>
              <div class="ap-mc-value" id="ap-stat-si">—</div>
            </div>
          </div>

          <!-- Temp bar -->
          <div class="ap-temp-wrap">
            <div class="ap-temp-title">Lead Temperature</div>
            <div class="ap-temp-track">
              <div class="ap-temp-fill" id="ap-temp-fill" style="width:0%"></div>
            </div>
            <div class="ap-temp-stops">
              <span id="ap-ts-0">🧊 Cold</span>
              <span id="ap-ts-1">☀️ Warm</span>
              <span id="ap-ts-2">🔥 Hot</span>
              <span id="ap-ts-3">🚀 Elite</span>
            </div>
          </div>

          <!-- Heatmap result -->
          <div class="ap-hm-section">
            <div class="ap-hm-title">🔥 Deal Closure Heatmap — Last 12 Months</div>
            <div class="ap-hm-subtitle">Track monthly deal closure consistency and identify peak-performing months.</div>
            <div class="ap-hm-insights" id="ap-hm-insights"></div>
            <div class="ap-hm-grid"     id="ap-hm-grid"></div>
            <div class="ap-hm-legend">
              <span class="ap-hm-legend-item"><span class="ap-hm-legend-dot" style="background:#ddd8cc;"></span>No data</span>
              <span class="ap-hm-legend-item"><span class="ap-hm-legend-dot" style="background:#ddd8cc;border:1px solid #aaa;"></span>0 deals</span>
              <span class="ap-hm-legend-item"><span class="ap-hm-legend-dot" style="background:#f09595;"></span>1–4</span>
              <span class="ap-hm-legend-item"><span class="ap-hm-legend-dot" style="background:#ef9f27;"></span>5–11</span>
              <span class="ap-hm-legend-item"><span class="ap-hm-legend-dot" style="background:#97c459;"></span>12+</span>
              <span class="ap-hm-legend-item"><span class="ap-hm-legend-dot" style="background:#c0dd97;border:1px solid #3b6d11;"></span>Best</span>
            </div>
          </div>

          <!-- Follow-up alert -->
          <div class="ap-alert-wrap" id="ap-alert-wrap">
            <span class="ap-alert-icon" id="ap-alert-icon"></span>
            <div class="ap-alert-text">
              <div class="ap-alert-title" id="ap-alert-title"></div>
              <div class="ap-alert-sub"   id="ap-alert-sub"></div>
            </div>
            <span class="ap-alert-badge" id="ap-alert-badge"></span>
          </div>

          <!-- Mini funnel -->
          <div class="ap-funnel-wrap">
            <div class="ap-funnel-title">Sales Funnel Breakdown</div>
            <div id="ap-funnel-steps"></div>
          </div>

        </div>
      </div>
    `;

    document.getElementById('ap-run-btn').addEventListener('click', calcAgentPerf);

    // Live re-calc on any input change after first calculate
    const liveIds = ['ap-leads','ap-visits','ap-deals','ap-dealval','ap-target'];
    liveIds.forEach(id => {
      const el = document.getElementById(id);
      if(el) el.addEventListener('input', () => {
        if(document.getElementById('ap-results-box').classList.contains('ap-visible')) _applyCalc(false);
      });
    });
    for(let i=0; i<12; i++){
      const el = document.getElementById('ap-hm-inp-'+i);
      if(el) el.addEventListener('input', () => {
        if(document.getElementById('ap-results-box').classList.contains('ap-visible')) _applyCalc(false);
      });
    }
  };

  window.calcAgentPerf = function(){ _applyCalc(true); };

  function _applyCalc(animate) {
    const leads   = Math.max(+document.getElementById('ap-leads')?.value||1, 1);
    const visits  = +document.getElementById('ap-visits')?.value||0;
    const deals   = +document.getElementById('ap-deals')?.value||0;
    const dealval = +document.getElementById('ap-dealval')?.value||0;
    const target  = Math.max(+document.getElementById('ap-target')?.value||4, 1);

    const visitRate  = (visits/leads)*100;
    const closeRate  = visits>0 ? (deals/visits)*100 : 0;
    const revenue    = deals*dealval*100000*0.01;
    const scoreIndex = (deals/leads)*100;
    const cfg        = getTier(scoreIndex);

    /* ── Grade hero ── */
    const hero    = document.getElementById('ap-grade-hero');
    const gradeEl = document.getElementById('ap-grade-text');
    const emojiEl = document.getElementById('ap-hero-emoji');
    const aiEl    = document.getElementById('ap-ai-msg');
    if(!hero) return;

    const gradeMap = { ELITE:'⭐⭐⭐ Star Performer', HOT:'⭐⭐ Top Performer', WARM:'⭐ Good Performer', COLD:'📈 Needs Growth' };
    hero.className      = `ap-grade-hero ${cfg.heroClass}`;
    gradeEl.textContent = gradeMap[cfg.t];
    aiEl.textContent    = cfg.ai;
    emojiEl.textContent = cfg.emoji;
    emojiEl.className   = `ap-hero-emoji ${cfg.emojiClass}`;
    if(animate){ gradeEl.classList.remove('ap-score-pop'); void gradeEl.offsetWidth; gradeEl.classList.add('ap-score-pop'); }
    if(animate && cfg.sparks) spawnSparkles(hero);

    /* ── Stats ── */
    const vrEl=document.getElementById('ap-stat-vr'), crEl=document.getElementById('ap-stat-cr');
    const revEl=document.getElementById('ap-stat-rev'), siEl=document.getElementById('ap-stat-si');
    if(animate){
      vrEl.textContent='0%'; crEl.textContent='0%'; siEl.textContent='0%'; revEl.textContent='₹0';
      setTimeout(()=>{ countUp(vrEl,visitRate,'%',900); countUp(crEl,closeRate,'%',900); countUp(siEl,scoreIndex,'%',900); revEl.textContent=fmt(revenue); },300);
    } else {
      vrEl.textContent=visitRate.toFixed(1)+'%'; crEl.textContent=closeRate.toFixed(1)+'%';
      siEl.textContent=scoreIndex.toFixed(1)+'%'; revEl.textContent=fmt(revenue);
    }
    ['#d4af37','#e8a020','#22a06b','#1a1a1a'].forEach((c,i)=>{
      const mc=document.getElementById('ap-mc-'+i);
      if(mc){ mc.style.setProperty('--ap-mc-accent',c); mc.classList.remove('ap-mc-ready'); if(animate) setTimeout(()=>mc.classList.add('ap-mc-ready'),200+i*80); else mc.classList.add('ap-mc-ready'); }
    });

    /* ── Temp bar ── */
    const tempFill=document.getElementById('ap-temp-fill');
    const tempPct=Math.min((scoreIndex/20)*100,100);
    tempFill.style.setProperty('--ap-tf-grad',cfg.tempGrad);
    tempFill.style.setProperty('--ap-tf-dot',cfg.tempDot);
    tempFill.style.width='0%';
    setTimeout(()=>{ tempFill.style.width=tempPct+'%'; },animate?80:0);
    [0,1,2,3].forEach(i=>{ const el=document.getElementById('ap-ts-'+i); if(el) el.className=i===cfg.tempActive?'ap-ts-active':''; });

    /* ════════════════════════════════════════
       DEAL CLOSURE HEATMAP — reads from inputs
    ════════════════════════════════════════ */
    (function buildHeatmap() {
      const curMonthIdx = new Date().getMonth();

      // Read all 12 month inputs
      const HM_DATA = MONTH_NAMES.map((mn, i) => {
        const inp = document.getElementById('ap-hm-inp-'+i);
        const raw = inp ? inp.value.trim() : '';
        let d = null;
        if(raw !== '') d = Math.max(0, parseInt(raw)||0);
        // Current month: if input empty, fall back to main deals field
        if(i === curMonthIdx && raw === '') d = deals;
        return { m: mn, d: d, idx: i };
      });

      // Only consider months with actual data for best/avg/streak
      const enteredData = HM_DATA.filter(x => x.d !== null);
      const maxD = enteredData.length > 0 ? Math.max(...enteredData.map(x=>x.d)) : 0;
      const bestIdx = maxD > 0 ? HM_DATA.findIndex(x => x.d === maxD) : -1;
      const totalD  = enteredData.reduce((s,x)=>s+x.d, 0);
      const avgD    = enteredData.length > 0 ? (totalD/enteredData.length).toFixed(1) : '—';

      // Lowest entered month
      const lowestEntry = enteredData.length > 0
        ? enteredData.reduce((a,b)=>a.d<=b.d?a:b)
        : null;

      // Active streak from most recent entered month going back
      let activeStreak = 0;
      for(let i=11; i>=0; i--){
        if(HM_DATA[i].d !== null && HM_DATA[i].d > 0) activeStreak++;
        else if(HM_DATA[i].d !== null) break; // entered but 0 = breaks streak
        // null = skipped (no data entered, don't break)
      }

      function getHmTier(item) {
        if(item.d === null) return 't-empty';
        if(item.d === 0)    return 't-zero';
        if(item.idx === bestIdx && maxD > 0) return 't-best';
        if(item.d >= 12)    return 't-high';
        if(item.d >= 5)     return 't-mid';
        return 't-low';
      }

      /* Insight cards */
      const insights = [
        {
          icon:'🏆', label:'Best Month',
          value: bestIdx >= 0 ? HM_DATA[bestIdx].m : '—',
          sub:   bestIdx >= 0 ? HM_DATA[bestIdx].d+' deals' : 'No data yet'
        },
        {
          icon:'📈', label:'Monthly Avg',
          value: avgD,
          sub: enteredData.length > 0 ? 'deals / month' : 'No data yet'
        },
        {
          icon:'🔥', label:'Active Streak',
          value: activeStreak > 0 ? activeStreak+' mo' : '—',
          sub: activeStreak > 0 ? 'consecutive months' : 'Enter data above'
        },
        {
          icon:'⚠️', label:'Lowest Month',
          value: lowestEntry ? lowestEntry.m : '—',
          sub:   lowestEntry ? lowestEntry.d+' deals' : 'No data yet'
        }
      ];

      const insEl = document.getElementById('ap-hm-insights');
      if(!insEl) return;
      insEl.innerHTML = '';
      insights.forEach(ins => {
        const c = document.createElement('div');
        c.className = 'ap-hm-ic';
        c.innerHTML = `
          <div class="ap-hm-ic-icon">${ins.icon}</div>
          <div class="ap-hm-ic-label">${ins.label}</div>
          <div class="ap-hm-ic-value">${ins.value}</div>
          <div class="ap-hm-ic-sub">${ins.sub}</div>
        `;
        insEl.appendChild(c);
      });

      /* Heatmap tiles */
      const gridEl = document.getElementById('ap-hm-grid');
      if(!gridEl) return;
      gridEl.innerHTML = '';

      HM_DATA.forEach((item, i) => {
        const tier   = getHmTier(item);
        const isBest = (i === bestIdx && maxD > 0);
        const isCur  = (i === curMonthIdx);

        const tile = document.createElement('div');
        tile.className = 'ap-hm-tile ' + tier;
        if(isCur) tile.style.outline = '1.5px solid #d4af37';

        if(animate){
          tile.style.opacity   = '0';
          tile.style.transform = 'translateY(8px)';
        }

        const displayCount = item.d === null ? '—' : (animate && item.d > 0 ? '0' : (item.d === 0 ? '0' : item.d));
        const displayLbl   = item.d === null ? 'No data' : (item.d === 0 ? 'No closures' : 'deals');

        tile.innerHTML = `
          ${isBest ? '<span class="ap-hm-crown">👑</span>' : ''}
          <span class="ap-hm-tile-init">${item.m[0]}</span>
          <span class="ap-hm-tile-month">${item.m}</span>
          <span class="ap-hm-tile-count" data-target="${item.d !== null ? item.d : ''}">${displayCount}</span>
          <span class="ap-hm-tile-lbl">${displayLbl}</span>
        `;

        gridEl.appendChild(tile);

        if(animate){
          setTimeout(() => {
            tile.style.transition = 'opacity .3s ease, transform .3s ease';
            tile.style.opacity    = '1';
            tile.style.transform  = 'translateY(0)';

            if(item.d !== null && item.d > 0){
              const ce  = tile.querySelector('[data-target]');
              const tgt = item.d;
              const dur = 650;
              const st  = performance.now();
              (function tick(now){
                const p = Math.min((now-st)/dur, 1);
                const e = 1 - Math.pow(1-p, 3);
                ce.textContent = Math.round(e * tgt);
                if(p < 1) requestAnimationFrame(tick);
              })(st);
            }
          }, 200 + i * 50);
        }
      });
    })();

    /* ── Follow-up alert ── */
    const fa=followUpAlert(visitRate,closeRate);
    const aw=document.getElementById('ap-alert-wrap');
    aw.className='ap-alert-wrap '+(fa.warn?'ap-alert-warn':'ap-alert-ok');
    document.getElementById('ap-alert-icon').textContent  = fa.warn?'⚠️':'✅';
    document.getElementById('ap-alert-title').textContent = fa.msg;
    document.getElementById('ap-alert-sub').textContent   = fa.sub;
    document.getElementById('ap-alert-badge').textContent = fa.badge;

    /* ── Funnel ── */
    const fSteps=[
      {label:'Leads',    pct:100,                          color:'#d4af37'},
      {label:'Visits',   pct:leads>0?(visits/leads*100):0, color:'#e8a020'},
      {label:'Closures', pct:leads>0?(deals/leads*100):0,  color:'#22a06b'},
    ];
    document.getElementById('ap-funnel-steps').innerHTML = fSteps.map((s,i)=>{
      const drop=i>0?(fSteps[i-1].pct-s.pct).toFixed(0):null;
      return `<div class="ap-funnel-step" data-pct="${s.pct.toFixed(1)}" style="--ap-fb-color:${s.color}">
        <span class="ap-funnel-step-label">${s.label}</span>
        <div class="ap-funnel-bar-bg"><div class="ap-funnel-bar-fill" style="width:0%"></div></div>
        <span class="ap-funnel-step-pct">${s.pct.toFixed(0)}%</span>
        ${drop!==null&&drop>0?`<span class="ap-funnel-drop">▼${drop}%</span>`:'<span class="ap-funnel-drop"></span>'}
      </div>`;
    }).join('');
    setTimeout(()=>{
      document.querySelectorAll('.ap-funnel-bar-fill').forEach((bar,i)=>{
        const pct=parseFloat(bar.closest('.ap-funnel-step').dataset.pct)||0;
        setTimeout(()=>{ bar.style.width=pct+'%'; },i*120);
      });
    },animate?400:0);

    /* ── Reveal ── */
    const rb=document.getElementById('ap-results-box');
    if(animate&&!rb.classList.contains('ap-visible')) rb.classList.add('ap-visible');
    else if(!animate){ rb.style.opacity='1'; rb.style.transform='none'; rb.style.pointerEvents='auto'; }
  }

})();
/* ─── 20. DOC CHECKLIST 20 ─── */
/* ═══════════════════════════════════════════════════════════
   📋 DOC CHECKLIST — TWO TAB SYSTEM
   Tab 1: Custom Checklist Creator (add own items + priority)
   Tab 2: Transaction Type Checklist (existing enhanced)
   No badges (Readiness/Fraud/Loan removed)
═══════════════════════════════════════════════════════════ */

/* ── Transaction Types ── */
const dcTransactionTypes = {
  new_plot:        'New Plot Purchase',
  resale_plot:     'Resale Plot',
  new_apartment:   'New Apartment',
  resale_apartment:'Resale Apartment / House',
  villa:           'Villa Purchase',
  agricultural:    'Agricultural Land',
  commercial:      'Commercial Property',
  joint_property:  'Joint Property Purchase',
  inherited:       'Inherited Property',
  bank_auction:    'Bank Auction Property',
  poa_sale:        'Power of Attorney Sale',
  gift_settlement: 'Gift Settlement Property',
};

/* ── Document Database ── */
const dcDocDB = [
  { id:'sale_deed',      label:'Sale Deed / Title Deed',           cat:'ownership', pri:'mandatory',   weight:20, note:'Primary ownership document. Verify chain of title for last 30 years.', where:'Sub-Registrar Office' },
  { id:'parent_docs',   label:'Parent Documents (Previous Deeds)', cat:'ownership', pri:'mandatory',   weight:12, note:'All previous sale deeds establishing ownership history.', where:'Seller / Sub-Registrar' },
  { id:'ec',            label:'Encumbrance Certificate (EC)',       cat:'ownership', pri:'mandatory',   weight:15, note:'Verify for last 30 years. Shows all mortgages and encumbrances.', where:'Sub-Registrar / Online' },
  { id:'possession',    label:'Possession Certificate',            cat:'ownership', pri:'recommended', weight:8,  note:'Confirms physical possession transfer.', where:'Builder / Revenue Dept' },
  { id:'gift_deed',     label:'Gift / Settlement Deed',            cat:'ownership', pri:'conditional', weight:8,  note:'Required only if property was gifted or settled.', where:'Sub-Registrar Office' },
  { id:'patta',         label:'Patta (Revenue Record)',            cat:'revenue',   pri:'mandatory',   weight:15, note:'Confirms legal ownership. Must be in seller\'s name.', where:'Taluk Office / e-Sevai' },
  { id:'chitta',        label:'Chitta (Land Classification)',      cat:'revenue',   pri:'mandatory',   weight:10, note:'Shows land classification — residential, agricultural etc.', where:'Taluk Office / e-Sevai' },
  { id:'fmb',           label:'FMB / Survey Sketch',              cat:'revenue',   pri:'recommended', weight:7,  note:'Confirms plot dimensions and boundaries.', where:'Survey Department' },
  { id:'tax_receipts',  label:'Property Tax Receipts (Latest)',    cat:'revenue',   pri:'mandatory',   weight:8,  note:'Verify taxes paid up-to-date. Unpaid taxes transfer to buyer.', where:'Local Municipality' },
  { id:'adangal',       label:'Adangal / Pahani',                 cat:'revenue',   pri:'recommended', weight:6,  note:'Village revenue record showing ownership history.', where:'Revenue Office / Online' },
  { id:'layout_approval',label:'Approved Layout / DTCP Approval', cat:'approval',  pri:'mandatory',   weight:12, note:'Confirm layout is approved. Check approval number validity.', where:'DTCP Office / Local Body' },
  { id:'building_plan', label:'Approved Building Plan',           cat:'approval',  pri:'conditional', weight:8,  note:'For constructed properties. Verify plan matches actual construction.', where:'Local Body / Panchayat' },
  { id:'completion_cert',label:'Completion Certificate',          cat:'approval',  pri:'conditional', weight:7,  note:'Issued after construction. Mandatory for apartments and villas.', where:'Local Body / CMDA' },
  { id:'rera',          label:'RERA Registration',                cat:'approval',  pri:'conditional', weight:6,  note:'Mandatory for new apartments. Verify at rera.tn.gov.in', where:'RERA Portal Online' },
  { id:'noc_bank',      label:'NOC from Bank (if mortgage exists)',cat:'approval',  pri:'conditional', weight:10, note:'If property has existing loan, obtain NOC from bank.', where:'Seller\'s Bank' },
  { id:'eb_meter',      label:'EB Meter / Electricity Connection', cat:'utility',   pri:'recommended', weight:4,  note:'Verify EB connection in seller\'s name.', where:'TNEB Office' },
  { id:'water_conn',    label:'Water Connection Details',          cat:'utility',   pri:'recommended', weight:4,  note:'Check municipality water connection and pending dues.', where:'Municipality' },
  { id:'street_access', label:'Access Road / Street Width Proof',  cat:'utility',   pri:'recommended', weight:5,  note:'Confirm road access is at least 12ft wide.', where:'Panchayat / Municipality' },
  { id:'aadhaar_pan',   label:'Seller Aadhaar & PAN Card',        cat:'seller',    pri:'mandatory',   weight:8,  note:'Collect copies. Verify name matches all documents.', where:'Seller' },
  { id:'name_check',    label:'Name Consistency Across Documents', cat:'seller',    pri:'mandatory',   weight:8,  note:'All documents must show same name.', where:'Verify Yourself' },
  { id:'legal_heir',    label:'Legal Heir Certificate (if needed)',cat:'seller',    pri:'conditional', weight:8,  note:'Required if seller inherited the property.', where:'Taluk Office' },
  { id:'poa_doc',       label:'Power of Attorney Document',       cat:'seller',    pri:'conditional', weight:10, note:'If sold through POA, verify it is registered and valid.', where:'Sub-Registrar / Seller' },
  { id:'legal_opinion', label:'Legal Opinion from Advocate',      cat:'legal',     pri:'recommended', weight:10, note:'Engage a property lawyer. Cost: ₹3,000–10,000.', where:'Property Lawyer' },
  { id:'court_check',   label:'Court Case Verification',          cat:'legal',     pri:'recommended', weight:8,  note:'Check eCourts.nic.in for pending litigation.', where:'eCourts.nic.in' },
  { id:'affidavit',     label:'Affidavit (if name discrepancy)',  cat:'legal',     pri:'conditional', weight:5,  note:'Required if any name variation exists across documents.', where:'Notary / Court' },
];

const dcTransactionDocs = {
  new_plot:        ['sale_deed','layout_approval','patta','chitta','fmb','tax_receipts','aadhaar_pan','name_check','legal_opinion','court_check','eb_meter','water_conn','street_access'],
  resale_plot:     ['sale_deed','parent_docs','ec','patta','chitta','fmb','tax_receipts','aadhaar_pan','name_check','legal_opinion','court_check','noc_bank','street_access'],
  new_apartment:   ['sale_deed','rera','building_plan','completion_cert','layout_approval','tax_receipts','aadhaar_pan','name_check','legal_opinion','eb_meter','water_conn','possession'],
  resale_apartment:['sale_deed','parent_docs','ec','building_plan','completion_cert','tax_receipts','aadhaar_pan','name_check','legal_opinion','court_check','noc_bank','eb_meter','possession'],
  villa:           ['sale_deed','parent_docs','ec','patta','layout_approval','building_plan','completion_cert','tax_receipts','aadhaar_pan','name_check','legal_opinion','court_check','eb_meter','water_conn'],
  agricultural:    ['sale_deed','parent_docs','ec','patta','chitta','fmb','adangal','tax_receipts','aadhaar_pan','name_check','legal_opinion','court_check'],
  commercial:      ['sale_deed','parent_docs','ec','layout_approval','building_plan','completion_cert','tax_receipts','aadhaar_pan','name_check','legal_opinion','court_check','noc_bank','eb_meter'],
  joint_property:  ['sale_deed','parent_docs','ec','patta','tax_receipts','aadhaar_pan','name_check','legal_heir','legal_opinion','court_check','affidavit'],
  inherited:       ['sale_deed','parent_docs','ec','patta','legal_heir','tax_receipts','aadhaar_pan','name_check','affidavit','legal_opinion','court_check'],
  bank_auction:    ['sale_deed','ec','noc_bank','layout_approval','tax_receipts','aadhaar_pan','legal_opinion','court_check','possession'],
  poa_sale:        ['sale_deed','parent_docs','ec','poa_doc','aadhaar_pan','name_check','legal_opinion','court_check','tax_receipts','patta'],
  gift_settlement: ['gift_deed','sale_deed','parent_docs','ec','patta','tax_receipts','aadhaar_pan','name_check','legal_opinion','affidavit','court_check'],
};

/* ── Priority config ── */
const dcPriConfig = {
  important: { label:'🔴 Important', color:'#e74c3c', bg:'rgba(231,76,60,0.12)',  border:'rgba(231,76,60,0.3)'  },
  medium:    { label:'🟡 Medium',    color:'#e8b84b', bg:'rgba(232,184,75,0.12)', border:'rgba(232,184,75,0.3)' },
  poor:      { label:'🔵 Low',       color:'#888',    bg:'rgba(136,136,136,0.1)', border:'rgba(136,136,136,0.2)'},
};

/* ── State ── */
let dcTab        = 'custom';   // 'custom' | 'transaction'
let dcTxType     = 'new_plot';
let dcTxChecked  = {};
let dcCustomItems = [];        // [{id, label, pri, done}]
let dcCustomId   = 0;

/* ── LocalStorage ── */
function dcSaveTx()     { try { localStorage.setItem(`dctx_${dcTxType}`, JSON.stringify(dcTxChecked)); } catch(e){} }
function dcLoadTx()     { try { dcTxChecked = JSON.parse(localStorage.getItem(`dctx_${dcTxType}`) || '{}'); } catch(e){ dcTxChecked={}; } }
function dcSaveCustom() { try { localStorage.setItem('dc_custom', JSON.stringify(dcCustomItems)); } catch(e){} }
function dcLoadCustom() { try { dcCustomItems = JSON.parse(localStorage.getItem('dc_custom') || '[]'); dcCustomId = dcCustomItems.length ? Math.max(...dcCustomItems.map(x=>x.id))+1 : 0; } catch(e){ dcCustomItems=[]; } }

/* ── Animate ── */
function dcAnim(id, target, suffix='') {
  const el = document.getElementById(id);
  if (!el) return;
  const dur=600, t0=performance.now();
  (function tick(now){
    const p = Math.min((now-t0)/dur,1);
    el.textContent = Math.round(target*(1-Math.pow(1-p,3))) + suffix;
    if (p<1) requestAnimationFrame(tick);
    else el.textContent = target + suffix;
  })(t0);
}

/* ════════════════════════
   BUILD PANEL
════════════════════════ */
function buildDocCheck(b) {
  dcLoadCustom();
  dcLoadTx();

  b.innerHTML = `
  <p style="color:var(--text3);font-size:13px;margin-bottom:16px">
    Professional document verification — custom checklist & transaction tracker
  </p>

  <!-- ── TAB SWITCHER ── -->
  <div style="display:flex;gap:0;margin-bottom:20px;background:#f5f0e8;border-radius:12px;padding:4px">
    <button id="dc-tab-custom" onclick="dcSwitchTab('custom')" style="
      flex:1;padding:10px;border-radius:9px;border:none;cursor:pointer;
      font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;transition:all .25s;
      background:#fff;color:#c9a84c;box-shadow:0 2px 6px rgba(0,0,0,0.08)">
      ✏️ My Checklist
    </button>
    <button id="dc-tab-tx" onclick="dcSwitchTab('transaction')" style="
      flex:1;padding:10px;border-radius:9px;border:none;cursor:pointer;
      font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;transition:all .25s;
      background:transparent;color:#888">
      📋 Transaction Docs
    </button>
  </div>

  <!-- ══ TAB 1: CUSTOM CHECKLIST ══ -->
  <div id="dc-panel-custom">

    <!-- Add Item Row -->
    <div style="display:flex;gap:8px;margin-bottom:16px;align-items:center">
      <input type="text" id="dc-new-label" placeholder="Document name..." maxlength="80"
        onkeydown="if(event.key==='Enter')dcAddItem()"
        style="flex:1;padding:11px 14px;border-radius:10px;border:1.5px solid #e0d8c8;
        background:#fff;font-family:'DM Sans',sans-serif;font-size:13px;color:#1a1a2e;outline:none">
      <select id="dc-new-pri" style="padding:11px 10px;border-radius:10px;border:1.5px solid #e0d8c8;
        background:#fff;font-family:'DM Sans',sans-serif;font-size:12px;color:#444;outline:none">
        <option value="important">🔴 Important</option>
        <option value="medium" selected>🟡 Medium</option>
        <option value="poor">🔵 Low</option>
      </select>
      <button onclick="dcAddItem()" style="
        padding:11px 18px;border-radius:10px;background:#c9a84c;color:#fff;
        border:none;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:700;
        cursor:pointer;white-space:nowrap">+ Add</button>
    </div>

    <!-- Stats Row -->
    <div id="dc-custom-stats" style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:16px">
      ${[['dc-cs-total','Total','#c9a84c'],['dc-cs-done','Completed','#4eca80'],['dc-cs-pending','Pending','#e8b84b'],['dc-cs-pct','Progress','#fff']].map(([id,l,c])=>`
        <div style="background:linear-gradient(135deg,#1C1A14,#2a2218);border-radius:12px;padding:14px;text-align:center">
          <div style="font-size:9px;color:#666;text-transform:uppercase;letter-spacing:.06em;margin-bottom:4px">${l}</div>
          <div id="${id}" style="font-size:1.3rem;font-weight:700;color:${c}">0</div>
        </div>`).join('')}
    </div>

    <!-- Priority Summary -->
    <div id="dc-pri-summary" style="display:flex;gap:8px;margin-bottom:14px;flex-wrap:wrap"></div>

    <!-- Checklist Items -->
    <div id="dc-custom-list" style="margin-bottom:16px"></div>

    <!-- Summary Card (shown after any completion) -->
    <div id="dc-custom-summary-card" style="display:none;border-radius:12px;padding:16px;margin-bottom:16px;text-align:center">
      <div style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px">Checklist Status</div>
      <div id="dc-custom-summary-text" style="font-size:1rem;font-weight:700"></div>
    </div>

    <!-- Actions -->
    <div style="display:flex;gap:8px;flex-wrap:wrap">
      <button onclick="dcCustomMarkAll()" style="
        flex:1;min-width:100px;padding:11px;border-radius:10px;
        border:1.5px solid rgba(78,202,128,0.4);background:rgba(78,202,128,0.08);
        color:#4eca80;font-size:12px;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif">
        ✅ Complete All</button>
      <button onclick="dcCustomReset()" style="
        flex:1;min-width:100px;padding:11px;border-radius:10px;
        border:1.5px solid #e0d8c8;background:transparent;
        color:#888;font-size:12px;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif">
        🔄 Reset</button>
      <button onclick="dcCustomClearAll()" style="
        flex:1;min-width:100px;padding:11px;border-radius:10px;
        border:1.5px solid rgba(231,76,60,0.3);background:rgba(231,76,60,0.06);
        color:#e74c3c;font-size:12px;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif">
        🗑️ Clear All</button>
      <button id="dc-custom-copy-btn" onclick="dcCustomCopy()" style="
        flex:1;min-width:100px;padding:11px;border-radius:10px;
        border:1.5px solid rgba(201,168,76,0.5);background:rgba(201,168,76,0.1);
        color:#c9a84c;font-size:12px;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif">
        📋 Copy</button>
    </div>
    <textarea id="dc-custom-copy-text" style="display:none" readonly></textarea>
  </div>

  <!-- ══ TAB 2: TRANSACTION DOCS ══ -->
  <div id="dc-panel-tx" style="display:none">

    <!-- Transaction Type -->
    <div class="form-group" style="margin-bottom:16px">
      <label>Transaction Type</label>
      <select id="dc-txtype" onchange="dcChangeTx()">
        ${Object.entries(dcTransactionTypes).map(([k,v])=>`<option value="${k}" ${k===dcTxType?'selected':''}>${v}</option>`).join('')}
      </select>
    </div>

    <!-- Progress Bar -->
    <div style="margin-bottom:16px">
      <div style="display:flex;justify-content:space-between;font-size:12px;color:#888;margin-bottom:6px">
        <span style="font-weight:600;color:#1a1a2e">Verification Progress</span>
        <span id="dc-tx-prog-label">0 / 0</span>
      </div>
      <div style="height:7px;background:#f0e8d0;border-radius:4px;overflow:hidden">
        <div id="dc-tx-prog-bar" style="height:100%;background:linear-gradient(90deg,#c9a84c,#4eca80);border-radius:4px;width:0%;transition:width .5s ease"></div>
      </div>
      <div style="display:flex;justify-content:space-between;margin-top:8px">
        <span id="dc-tx-score" style="font-size:12px;font-weight:700;color:#c9a84c">Score: 0/100</span>
        <span id="dc-tx-pct" style="font-size:12px;color:#888">0%</span>
      </div>
    </div>

    <!-- Stats -->
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:16px">
      ${[['dc-tx-done','✅ Done','#4eca80'],['dc-tx-pending','⏳ Pending','#e8b84b'],['dc-tx-status','📊 Status','#c9a84c']].map(([id,l,c])=>`
        <div style="background:#fff;border:1.5px solid #e8dfc8;border-radius:12px;padding:14px;text-align:center;box-shadow:0 2px 6px rgba(0,0,0,0.04)">
          <div style="font-size:10px;color:#888;font-weight:600;text-transform:uppercase;margin-bottom:5px">${l}</div>
          <div id="${id}" style="font-size:1rem;font-weight:700;color:${c}">—</div>
        </div>`).join('')}
    </div>

    <!-- Critical Alert -->
    <div id="dc-tx-alert" style="display:none;background:rgba(231,76,60,0.08);border:1.5px solid rgba(231,76,60,0.3);border-radius:12px;padding:14px;margin-bottom:14px">
      <div style="font-size:12px;font-weight:700;color:#e74c3c;margin-bottom:6px">⚠️ Critical Documents Missing</div>
      <div id="dc-tx-alert-list" style="font-size:12px;color:#e07b3a;line-height:1.8"></div>
    </div>

    <!-- Checklist -->
    <div id="dc-tx-list" style="background:#fff;border:1.5px solid #e8dfc8;border-radius:14px;overflow:hidden;margin-bottom:16px;box-shadow:0 2px 8px rgba(0,0,0,0.05)"></div>

    <!-- Actions -->
    <div style="display:flex;gap:8px;flex-wrap:wrap">
      <button onclick="dcTxMarkAll()" style="
        flex:1;min-width:100px;padding:11px;border-radius:10px;
        border:1.5px solid rgba(78,202,128,0.4);background:rgba(78,202,128,0.08);
        color:#4eca80;font-size:12px;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif">
        ✅ Mark All</button>
      <button onclick="dcTxReset()" style="
        flex:1;min-width:100px;padding:11px;border-radius:10px;
        border:1.5px solid #e0d8c8;background:transparent;
        color:#888;font-size:12px;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif">
        🔄 Reset</button>
      <button id="dc-tx-copy-btn" onclick="dcTxCopy()" style="
        flex:1;min-width:100px;padding:11px;border-radius:10px;
        border:1.5px solid rgba(201,168,76,0.5);background:rgba(201,168,76,0.1);
        color:#c9a84c;font-size:12px;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif">
        📋 Copy</button>
      <button onclick="dcTxPrint()" style="
        flex:1;min-width:100px;padding:11px;border-radius:10px;
        border:1.5px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.04);
        color:#888;font-size:12px;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif">
        🖨️ Print</button>
    </div>
    <textarea id="dc-tx-copy-text" style="display:none" readonly></textarea>
  </div>
  `;

  dcRenderCustom();
  dcRenderTx();
}

/* ════════════════════════
   TAB SWITCH
════════════════════════ */
function dcSwitchTab(tab) {
  dcTab = tab;
  document.getElementById('dc-panel-custom').style.display  = tab==='custom' ? 'block' : 'none';
  document.getElementById('dc-panel-tx').style.display      = tab==='transaction' ? 'block' : 'none';

  const btnC = document.getElementById('dc-tab-custom');
  const btnT = document.getElementById('dc-tab-tx');
  if (btnC) {
    btnC.style.background  = tab==='custom' ? '#fff' : 'transparent';
    btnC.style.color       = tab==='custom' ? '#c9a84c' : '#888';
    btnC.style.boxShadow   = tab==='custom' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none';
  }
  if (btnT) {
    btnT.style.background  = tab==='transaction' ? '#fff' : 'transparent';
    btnT.style.color       = tab==='transaction' ? '#c9a84c' : '#888';
    btnT.style.boxShadow   = tab==='transaction' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none';
  }
}

/* ════════════════════════
   TAB 1: CUSTOM CHECKLIST
════════════════════════ */
function dcAddItem() {
  const inp = document.getElementById('dc-new-label');
  const pri = document.getElementById('dc-new-pri');
  const label = (inp?.value || '').trim();
  if (!label) return;
  dcCustomItems.push({ id: dcCustomId++, label, pri: pri?.value || 'medium', done: false });
  inp.value = '';
  dcSaveCustom();
  dcRenderCustom();
}

function dcToggleCustomItem(id) {
  const item = dcCustomItems.find(x => x.id === id);
  if (item) { item.done = !item.done; dcSaveCustom(); dcRenderCustom(); }
}

function dcDeleteCustomItem(id) {
  dcCustomItems = dcCustomItems.filter(x => x.id !== id);
  dcSaveCustom(); dcRenderCustom();
}

function dcCustomMarkAll()  { dcCustomItems.forEach(x => x.done = true);  dcSaveCustom(); dcRenderCustom(); }
function dcCustomReset()    { dcCustomItems.forEach(x => x.done = false); dcSaveCustom(); dcRenderCustom(); }
function dcCustomClearAll() { dcCustomItems = []; dcSaveCustom(); dcRenderCustom(); }

function dcRenderCustom() {
  const total   = dcCustomItems.length;
  const done    = dcCustomItems.filter(x => x.done).length;
  const pending = total - done;
  const pct     = total > 0 ? Math.round(done / total * 100) : 0;

  dcAnim('dc-cs-total',   total);
  dcAnim('dc-cs-done',    done);
  dcAnim('dc-cs-pending', pending);
  dcAnim('dc-cs-pct',     pct, '%');

  /* Priority summary pills */
  const priSum = document.getElementById('dc-pri-summary');
  if (priSum) {
    const counts = { important:0, medium:0, poor:0 };
    dcCustomItems.filter(x => !x.done).forEach(x => counts[x.pri]++);
    priSum.innerHTML = Object.entries(counts).map(([k,v]) => v > 0 ? `
      <div style="padding:4px 12px;border-radius:20px;font-size:11px;font-weight:700;
        background:${dcPriConfig[k].bg};color:${dcPriConfig[k].color};
        border:1px solid ${dcPriConfig[k].border}">
        ${dcPriConfig[k].label}: ${v} pending
      </div>` : '').join('');
  }

  /* Items list — Important first, then Medium, then Low */
  const listEl = document.getElementById('dc-custom-list');
  if (listEl) {
    if (dcCustomItems.length === 0) {
      listEl.innerHTML = `<div style="text-align:center;padding:24px;color:#aaa;font-size:13px">
        No items yet — type a document name above and click Add ✨</div>`;
    } else {
      const sorted = [...dcCustomItems].sort((a,b) => {
        const order = {important:0, medium:1, poor:2};
        if (a.done !== b.done) return a.done ? 1 : -1;
        return order[a.pri] - order[b.pri];
      });
      listEl.innerHTML = `<div style="background:#fff;border:1.5px solid #e8dfc8;border-radius:14px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.05)">` +
        sorted.map((item, i) => {
          const pc = dcPriConfig[item.pri];
          return `
          <div style="display:flex;align-items:center;gap:12px;padding:12px 16px;
            border-bottom:${i < sorted.length-1 ? '1px solid #f5f0e8' : 'none'};
            background:${item.done ? 'rgba(78,202,128,0.04)' : '#fff'}">
            <!-- Checkbox -->
            <div onclick="dcToggleCustomItem(${item.id})" style="
              width:22px;height:22px;border-radius:6px;flex-shrink:0;cursor:pointer;
              border:2px solid ${item.done ? '#4eca80' : pc.color};
              background:${item.done ? '#4eca80' : 'transparent'};
              display:flex;align-items:center;justify-content:center;transition:all .2s">
              ${item.done ? '<span style="color:#fff;font-size:13px;font-weight:700">✓</span>' : ''}
            </div>
            <!-- Label -->
            <div onclick="dcToggleCustomItem(${item.id})" style="flex:1;cursor:pointer">
              <span style="font-size:13px;color:${item.done?'#aaa':'#1a1a2e'};
                text-decoration:${item.done?'line-through':'none'};transition:all .2s">${item.label}</span>
            </div>
            <!-- Priority Badge -->
            <span style="font-size:10px;padding:3px 9px;border-radius:10px;font-weight:700;flex-shrink:0;
              background:${pc.bg};color:${pc.color};border:1px solid ${pc.border}">
              ${pc.label}
            </span>
            <!-- Delete -->
            <button onclick="dcDeleteCustomItem(${item.id})" style="
              width:24px;height:24px;border-radius:6px;border:1px solid #f0e8d8;
              background:transparent;color:#ccc;font-size:14px;cursor:pointer;
              display:flex;align-items:center;justify-content:center;flex-shrink:0;
              font-family:'DM Sans',sans-serif;transition:all .2s"
              onmouseover="this.style.color='#e74c3c';this.style.borderColor='rgba(231,76,60,0.3)'"
              onmouseout="this.style.color='#ccc';this.style.borderColor='#f0e8d8'">×</button>
          </div>`;
        }).join('') + '</div>';
    }
  }

  /* Summary card */
  const sc   = document.getElementById('dc-custom-summary-card');
  const st   = document.getElementById('dc-custom-summary-text');
  const hasItems = dcCustomItems.length > 0;
  if (sc && st) {
    if (hasItems) {
      sc.style.display = 'block';
      const importantPending = dcCustomItems.filter(x => !x.done && x.pri === 'important').length;
      if (pct === 100) {
        sc.style.background = 'rgba(78,202,128,0.08)';
        sc.style.border     = '1.5px solid rgba(78,202,128,0.3)';
        st.textContent      = '✅ All items complete — Ready to proceed!';
        st.style.color      = '#4eca80';
      } else if (importantPending > 0) {
        sc.style.background = 'rgba(231,76,60,0.06)';
        sc.style.border     = '1.5px solid rgba(231,76,60,0.2)';
        st.textContent      = `🔴 ${importantPending} Important item${importantPending>1?'s':''} still pending — ${pct}% done`;
        st.style.color      = '#e74c3c';
      } else if (pct >= 70) {
        sc.style.background = 'rgba(201,168,76,0.08)';
        sc.style.border     = '1.5px solid rgba(201,168,76,0.3)';
        st.textContent      = `⚠️ ${pending} item${pending>1?'s':''} pending — ${pct}% complete`;
        st.style.color      = '#c9a84c';
      } else {
        sc.style.background = 'rgba(232,184,75,0.08)';
        sc.style.border     = '1.5px solid rgba(232,184,75,0.2)';
        st.textContent      = `📋 ${done}/${total} done (${pct}%) — Keep going!`;
        st.style.color      = '#e8b84b';
      }
    } else {
      sc.style.display = 'none';
    }
  }

  /* Copy text */
  const copyEl = document.getElementById('dc-custom-copy-text');
  if (copyEl) {
    const importantItems = dcCustomItems.filter(x => x.pri === 'important');
    const mediumItems    = dcCustomItems.filter(x => x.pri === 'medium');
    const lowItems       = dcCustomItems.filter(x => x.pri === 'poor');
    copyEl.value =
`=== My Document Checklist ===
Total     : ${total}
Completed : ${done}
Pending   : ${pending}
Progress  : ${pct}%

🔴 Important (${importantItems.filter(x=>!x.done).length} pending):
${importantItems.map(x=>`  ${x.done?'✅':'❌'} ${x.label}`).join('\n') || '  None'}

🟡 Medium (${mediumItems.filter(x=>!x.done).length} pending):
${mediumItems.map(x=>`  ${x.done?'✅':'❌'} ${x.label}`).join('\n') || '  None'}

🔵 Low (${lowItems.filter(x=>!x.done).length} pending):
${lowItems.map(x=>`  ${x.done?'✅':'❌'} ${x.label}`).join('\n') || '  None'}

================================
Generated by J Square Housing Tools`;
  }
}

function dcCustomCopy() {
  const txt = document.getElementById('dc-custom-copy-text')?.value || '';
  navigator.clipboard.writeText(txt).then(() => {
    const btn = document.getElementById('dc-custom-copy-btn');
    if (!btn) return;
    btn.textContent = '✅ Copied!';
    btn.style.color = '#4eca80';
    setTimeout(() => { btn.textContent = '📋 Copy'; btn.style.color = '#c9a84c'; }, 2200);
  });
}

/* ════════════════════════
   TAB 2: TRANSACTION DOCS
════════════════════════ */
function dcChangeTx() {
  dcTxType = document.getElementById('dc-txtype')?.value || 'new_plot';
  dcLoadTx();
  dcRenderTx();
}

function dcTxMarkAll() {
  const ids = dcTransactionDocs[dcTxType] || [];
  ids.forEach(id => dcTxChecked[id] = true);
  dcSaveTx(); dcRenderTx();
}

function dcTxReset() {
  dcTxChecked = {};
  dcSaveTx(); dcRenderTx();
}

function dcToggleTxDoc(id) {
  dcTxChecked[id] = !dcTxChecked[id];
  dcSaveTx(); dcRenderTx();
}

function dcTxGetDocs() {
  return (dcTransactionDocs[dcTxType] || []).map(id => dcDocDB.find(d => d.id === id)).filter(Boolean);
}

function dcRenderTx() {
  const docs    = dcTxGetDocs();
  const total   = docs.length;
  const done    = docs.filter(d => dcTxChecked[d.id]).length;
  const pending = total - done;
  const pct     = total > 0 ? Math.round(done / total * 100) : 0;

  /* Weighted score */
  const maxW  = docs.reduce((s,d) => s + d.weight, 0);
  const doneW = docs.filter(d => dcTxChecked[d.id]).reduce((s,d) => s + d.weight, 0);
  const score = maxW > 0 ? Math.round((doneW / maxW) * 100) : 0;

  /* Progress */
  const pb = document.getElementById('dc-tx-prog-bar');
  const pl = document.getElementById('dc-tx-prog-label');
  const pp = document.getElementById('dc-tx-pct');
  const ps = document.getElementById('dc-tx-score');
  if (pb) pb.style.width = pct + '%';
  if (pl) pl.textContent = `${done} / ${total}`;
  if (pp) pp.textContent = pct + '%';
  if (ps) { ps.textContent = `Score: ${score}/100`; ps.style.color = score>=75?'#4eca80':score>=50?'#e8b84b':'#e74c3c'; }

  dcAnim('dc-tx-done', done);
  dcAnim('dc-tx-pending', pending);

  /* Status */
  const statusEl = document.getElementById('dc-tx-status');
  const status =
    score >= 90 ? { t:'✅ Ready',         c:'#4eca80' } :
    score >= 75 ? { t:'🟡 Minor Pending', c:'#e8b84b' } :
    score >= 50 ? { t:'🟠 Review Needed', c:'#e07b3a' } :
                  { t:'🔴 High Risk',     c:'#e74c3c' };
  if (statusEl) { statusEl.textContent = status.t; statusEl.style.color = status.c; }

  /* Critical missing alert */
  const critKeys = ['sale_deed','ec','patta','layout_approval'];
  const critMissing = docs.filter(d => critKeys.includes(d.id) && !dcTxChecked[d.id]);
  const alertWrap = document.getElementById('dc-tx-alert');
  const alertList = document.getElementById('dc-tx-alert-list');
  if (alertWrap && alertList) {
    if (critMissing.length > 0) {
      alertWrap.style.display = 'block';
      alertList.innerHTML = critMissing.map(d => `• ${d.label} missing!`).join('<br>');
    } else {
      alertWrap.style.display = 'none';
    }
  }

  /* Checklist */
  const listEl = document.getElementById('dc-tx-list');
  if (listEl) {
    const priOrder = { mandatory:0, recommended:1, conditional:2, optional:3 };
    const priColors = { mandatory:'#e74c3c', recommended:'#c9a84c', conditional:'#5b8dee', optional:'#888' };
    const priLabels = { mandatory:'Mandatory', recommended:'Recommended', conditional:'Conditional', optional:'Optional' };
    const priBg     = { mandatory:'rgba(231,76,60,0.1)', recommended:'rgba(201,168,76,0.1)', conditional:'rgba(91,141,238,0.1)', optional:'rgba(136,136,136,0.1)' };

    const sorted = [...docs].sort((a,b) => priOrder[a.pri] - priOrder[b.pri]);
    listEl.innerHTML = sorted.map((doc, i) => {
      const isDone = !!dcTxChecked[doc.id];
      const pc = priColors[doc.pri];
      return `
        <div style="border-bottom:${i<sorted.length-1?'1px solid #f5f0e8':'none'};
          background:${isDone?'rgba(78,202,128,0.04)':'#fff'}">
          <div style="display:flex;align-items:center;gap:12px;padding:12px 16px;cursor:pointer"
            onclick="dcToggleTxDoc('${doc.id}')">
            <div style="
              width:22px;height:22px;border-radius:6px;flex-shrink:0;
              border:2px solid ${isDone?'#4eca80':pc};
              background:${isDone?'#4eca80':'transparent'};
              display:flex;align-items:center;justify-content:center;transition:all .2s">
              ${isDone?'<span style="color:#fff;font-size:13px;font-weight:700">✓</span>':''}
            </div>
            <div style="flex:1">
              <span style="font-size:13px;font-weight:${doc.pri==='mandatory'?'600':'400'};
                color:${isDone?'#aaa':'#1a1a2e'};
                text-decoration:${isDone?'line-through':'none'}">${doc.label}</span>
            </div>
            <span style="font-size:10px;padding:3px 9px;border-radius:10px;font-weight:700;flex-shrink:0;
              background:${priBg[doc.pri]};color:${pc}">
              ${priLabels[doc.pri]}
            </span>
            <button onclick="event.stopPropagation();dcTxToggleNote('${doc.id}')" style="
              padding:3px 9px;border-radius:6px;font-size:11px;cursor:pointer;
              border:1px solid #e0d8c8;background:transparent;color:#aaa;
              font-family:'DM Sans',sans-serif">ℹ️</button>
          </div>
          <div id="dcn-${doc.id}" style="display:none;padding:0 16px 12px 50px">
            <div style="background:#fdf8f0;border-radius:8px;padding:10px 12px;font-size:12px;color:#666;line-height:1.7;border-left:3px solid #c9a84c">
              ${doc.note}<br>
              <span style="color:#c9a84c;font-size:11px">📍 ${doc.where}</span>
            </div>
          </div>
        </div>`;
    }).join('');
  }

  /* Copy text */
  const copyEl = document.getElementById('dc-tx-copy-text');
  if (copyEl) {
    const missing = docs.filter(d => !dcTxChecked[d.id]).map(d => d.label);
    copyEl.value =
`=== Transaction Document Checklist ===
Transaction : ${dcTransactionTypes[dcTxType]}
Completed   : ${done} / ${total}
Progress    : ${pct}%
Score       : ${score}/100
Status      : ${status.t}

Pending Documents:
${missing.length > 0 ? missing.map(n=>`  • ${n}`).join('\n') : '  None — All collected!'}

================================
Generated by J Square Housing Tools`;
  }
}

function dcTxToggleNote(id) {
  const el = document.getElementById(`dcn-${id}`);
  if (el) el.style.display = el.style.display === 'none' ? 'block' : 'none';
}

function dcTxCopy() {
  const txt = document.getElementById('dc-tx-copy-text')?.value || '';
  navigator.clipboard.writeText(txt).then(() => {
    const btn = document.getElementById('dc-tx-copy-btn');
    if (!btn) return;
    btn.textContent = '✅ Copied!';
    btn.style.color = '#4eca80';
    setTimeout(() => { btn.textContent = '📋 Copy'; btn.style.color = '#c9a84c'; }, 2200);
  });
}

function dcTxPrint() {
  const txt = document.getElementById('dc-tx-copy-text')?.value || '';
  const win = window.open('', '_blank');
  win.document.write(`<html><head><title>Doc Checklist</title>
  <style>body{font-family:'DM Sans',sans-serif;padding:40px;color:#1a1a2e;background:#fdf8f0;}
  pre{font-size:14px;line-height:1.9;white-space:pre-wrap;}
  h2{color:#c9a84c;border-bottom:2px solid #c9a84c;padding-bottom:10px;}</style></head><body>
  <h2>📋 J Square Housing — Document Checklist</h2><pre>${txt}</pre></body></html>`);
  win.document.close(); win.print();
}
 renderCats();
renderGrid();
