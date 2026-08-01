// enquiry-forms.js — J Square Housing
// Place this before </body> ONLY on the enquiry page
// Requires: <div id="page-enquiry" class="page"></div> in HTML
// Supabase: Replace SUPABASE_URL and SUPABASE_ANON_KEY below
(function () {
  const root = document.getElementById('page-enquiry');
  if (!root) return;

  /* ══════════════════════════════════════
     SUPABASE CONFIG — replace these values
  ══════════════════════════════════════ */
async function saveToSupabase(table, data) {
  try {
    // Only send columns that exist in your table
    const clean = {
      name           : data.name || null,
      phone          : data.phone || null,
      interest       : data.form_type || null,
      budget         : data.budget || null,
      form_type      : data.form_type || null,
      ref            : data.ref || null,
      email          : data.email || null,
      city           : data.city || null,
      msg            : data.msg || null,
      extras         : data.extras || null,
      contact_method : data.contact_method || null,
      submitted_at   : data.submitted_at || null
    };

    const { error } = await window.sb.from('enquiries').insert([clean]);
    if (error) {
      console.error('Supabase insert error:', error.message);
      return false;
    }
    return true;
  } catch (e) {
    console.error('Supabase error:', e);
    return false;
  }
}

  /* ══════════════════════════════════════
     COMPANY DETAILS — edit here
  ══════════════════════════════════════ */
  const CO = {
    name    : 'J Square Housing',
    tagline : 'Salem\'s Most Trusted Real Estate',
    mobile  : '+91 9361756057',
    whatsapp: '+91 9361756057',
    email   : 'jsquare.housing.official@gmail.com',
    address : 'Ayothiapattinam, Salem -636103, Tamil Nadu',
    hours   : 'Mon – Sat: 9:00 AM – 6:00 PM',
    sunday  : 'Sunday: By Appointment'
  };

  /* ══════════════════════════════════════
     INJECT PAGE HTML
  ══════════════════════════════════════ */
  root.innerHTML = `
  <div id="jq-enq-inner">
<!-- TOAST -->
<div id="jqEnqToast" role="status" aria-live="polite"></div>

<!-- HERO -->
<div class="enq-hero">
  <div class="hero-dots"><span></span><span></span><span></span></div>
  <div class="hero-eyebrow">📍 Salem's Trusted Developer</div>
  <h1>Contact &amp; <span>Enquiry</span></h1>
  <p>Our team responds within 24 hours. Free consultation for first enquiry.</p>
</div>

<!-- THREE-COLUMN LAYOUT -->
<div class="enq-layout">

  <!-- ═══ LEFT PANEL ═══ -->
  <aside class="enq-col-left glass-card">
    <div class="left-header">
      <div class="co-logo">🏡</div>
      <h3>${CO.name}</h3>
      <p>${CO.tagline}</p>
    </div>
    <div class="info-list">
      <div class="info-item">
        <div class="info-icon">📍</div>
        <div class="info-text">
          <div class="info-label">Office Address</div>
          <div class="info-val">${CO.address}</div>
        </div>
      </div>
      <div class="info-item">
        <div class="info-icon">📞</div>
        <div class="info-text">
          <div class="info-label">Call Us</div>
          <div class="info-val"><a href="tel:${CO.mobile}" style="color:inherit;text-decoration:none">${CO.mobile}</a></div>
        </div>
      </div>
      <div class="info-item">
        <div class="info-icon">💬</div>
        <div class="info-text">
          <div class="info-label">WhatsApp</div>
          <div class="info-val"><a href="https://wa.me/${CO.whatsapp}" target="_blank" rel="noopener" style="color:inherit;text-decoration:none">${CO.mobile}</a></div>
        </div>
      </div>
      <div class="info-item">
        <div class="info-icon">✉️</div>
        <div class="info-text">
          <div class="info-label">Email</div>
          <div class="info-val"><a href="mailto:${CO.email}" style="color:inherit;text-decoration:none">${CO.email}</a></div>
        </div>
      </div>
    </div>
    <div class="hours-badge">
      <div class="hb-row"><span class="hb-dot open"></span><span>${CO.hours}</span></div>
      <div class="hb-row"><span class="hb-dot closed"></span><span>${CO.sunday}</span></div>
    </div>
  </aside>

  <!-- ═══ CENTER: FORMS ═══ -->
  <main>
    <!-- Form Type Selector -->
    <div class="form-selector-bar" role="tablist" aria-label="Enquiry type">
      <button class="fsel-btn active" onclick="switchEnqForm('property',this)"   role="tab"><span class="fsel-icon">🏘️</span> Property</button>
      <button class="fsel-btn"        onclick="switchEnqForm('site-visit',this)" role="tab"><span class="fsel-icon">📅</span> Site Visit</button>
      <button class="fsel-btn"        onclick="switchEnqForm('price',this)"      role="tab"><span class="fsel-icon">💰</span> Pricing</button>
      <button class="fsel-btn"        onclick="switchEnqForm('investment',this)" role="tab"><span class="fsel-icon">📈</span> Invest</button>
      <button class="fsel-btn"        onclick="switchEnqForm('construction',this)" role="tab"><span class="fsel-icon">🏗️</span> Build</button>
      <button class="fsel-btn"        onclick="switchEnqForm('loan',this)"       role="tab"><span class="fsel-icon">🏦</span> Loan</button>
      <button class="fsel-btn"        onclick="switchEnqForm('legal',this)"      role="tab"><span class="fsel-icon">📜</span> Legal</button>
      <button class="fsel-btn"        onclick="switchEnqForm('nri',this)"        role="tab"><span class="fsel-icon">✈️</span> NRI</button>
      <button class="fsel-btn"        onclick="switchEnqForm('complaint',this)"  role="tab"><span class="fsel-icon">⚠️</span> Complaint</button>
      <button class="fsel-btn"        onclick="switchEnqForm('feedback',this)"   role="tab"><span class="fsel-icon">💬</span> Feedback</button>
      <button class="fsel-btn"        onclick="switchEnqForm('career',this)"     role="tab"><span class="fsel-icon">💼</span> Career</button>
      <button class="fsel-btn"        onclick="switchEnqForm('general',this)"    role="tab"><span class="fsel-icon">✉️</span> General</button>
    </div>

    <!-- FORM WRAPPER -->
    <div class="jq-form-wrap glass-card">

      <!-- ─── PROPERTY ENQUIRY ─── -->
      <div class="enq-form active" id="enqf-property">
        <div class="form-head"><div class="form-icon">🏘️</div><div><h2>Property Enquiry</h2><p>Tell us what you're looking for and we'll find the perfect plot.</p></div></div>
        <div class="form-body">
          <div class="fg-row">
            <div class="fg"><label for="prop-name">Full Name <span class="req">*</span></label><input type="text" id="prop-name" placeholder="Your full name" autocomplete="name" oninput="liveVal(this)"><span class="ferr">Please enter your name</span></div>
            <div class="fg"><label for="prop-phone">Mobile <span class="req">*</span></label><input type="tel" id="prop-phone" placeholder="+91 9361756057" autocomplete="tel" oninput="liveVal(this)"><span class="ferr">Valid mobile number needed</span></div>
          </div>
          <div class="fg-row">
            <div class="fg"><label for="prop-email">Email <span class="req">*</span></label><input type="email" id="prop-email" placeholder="your@email.com" autocomplete="email" oninput="liveVal(this)"><span class="ferr">Valid email address needed</span></div>
            <div class="fg"><label for="prop-city">City / Location</label><input type="text" id="prop-city" placeholder="Salem"></div>
          </div>
          <div class="fg-row">
            <div class="fg"><label for="prop-type">Property Type</label><select id="prop-type"><option>Residential Plot</option><option>Agricultural Land</option><option>Commercial Plot</option><option>Villa Plot</option></select></div>
            <div class="fg"><label for="prop-size">Plot Size Preference</label><select id="prop-size"><option>Below 600 sq.ft</option><option>600 – 1200 sq.ft</option><option>1200 – 2400 sq.ft</option><option>Above 2400 sq.ft</option></select></div>
          </div>
          <div class="fg-row">
            <div class="fg"><label for="prop-budget">Budget Range</label><select id="prop-budget"><option>Under ₹15 Lakhs</option><option>₹15 – 30 Lakhs</option><option>₹30 – 50 Lakhs</option><option>₹50L – 1 Cr</option><option>Above ₹1 Crore</option></select></div>
            <div class="fg"><label for="prop-loc">Preferred Location</label><select id="prop-loc"><option>Hasthampatti</option><option>Seelanaickenpatti</option><option>Ammapet</option><option>Any Location</option></select></div>
          </div>
          <div class="fg"><label for="prop-msg">Message / Requirements</label><textarea id="prop-msg" rows="3" placeholder="Tell us more about what you're looking for…"></textarea></div>
          <div class="fg contact-method-row"><label>How would you like us to contact you? <span class="req">*</span></label><div class="radio-group" role="radiogroup"><label class="rpill"><input type="radio" name="prop-method" value="phone" checked> 📞 Phone Call</label><label class="rpill"><input type="radio" name="prop-method" value="whatsapp"> 💬 WhatsApp</label><label class="rpill"><input type="radio" name="prop-method" value="email"> 📧 Email</label></div></div>
        </div>
        <div class="form-foot">
          <label class="consent-row"><input type="checkbox" id="prop-consent"><span class="c-box"></span><span>I agree to be contacted by <strong>J Square Housing</strong>. <a href="#" rel="noopener">Privacy Policy</a></span></label>
          <button class="btn-submit" type="button" onclick="submitEnq('property','prop')">✅ Submit Enquiry</button>
        </div>
      </div>

      <!-- ─── SITE VISIT ─── -->
      <div class="enq-form" id="enqf-site-visit">
        <div class="form-head"><div class="form-icon">📅</div><div><h2>Book a Site Visit</h2><p>Schedule a free visit to our project locations at your convenience.</p></div></div>
        <div class="form-body">
          <div class="fg-row">
            <div class="fg"><label for="sv-name">Full Name <span class="req">*</span></label><input type="text" id="sv-name" placeholder="Your full name" autocomplete="name" oninput="liveVal(this)"><span class="ferr">Enter your name</span></div>
            <div class="fg"><label for="sv-phone">Mobile <span class="req">*</span></label><input type="tel" id="sv-phone" placeholder="+91 9361756057" autocomplete="tel" oninput="liveVal(this)"><span class="ferr">Valid mobile needed</span></div>
          </div>
          <div class="fg-row">
            <div class="fg"><label for="sv-email">Email <span class="req">*</span></label><input type="email" id="sv-email" placeholder="your@email.com" autocomplete="email" oninput="liveVal(this)"><span class="ferr">Valid email needed</span></div>
            <div class="fg"><label for="sv-visitors">Number of Visitors</label><select id="sv-visitors"><option>1 Person</option><option>2 People</option><option>3–4 People</option><option>5+ People</option></select></div>
          </div>
          <div class="fg-row">
            <div class="fg"><label for="sv-date">Preferred Visit Date <span class="req">*</span></label><input type="date" id="sv-date"></div>
            <div class="fg"><label for="sv-time">Time Slot</label><select id="sv-time"><option>9:00 AM – 11:00 AM</option><option>11:00 AM – 1:00 PM</option><option>2:00 PM – 4:00 PM</option><option>4:00 PM – 6:00 PM</option></select></div>
          </div>
          <div class="fg-row">
            <div class="fg"><label for="sv-project">Project to Visit</label><select id="sv-project"><option>J Square Green Valley – Hasthampatti</option><option>J Square Serene Enclave – Seelanaickenpatti</option><option>J Square Urban Heights – Ammapet</option><option>Not Sure – Show Me Options</option></select></div>
            <div class="fg"><label for="sv-transport">Transport Needed?</label><select id="sv-transport"><option>No – I'll come myself</option><option>Yes – Please arrange pickup</option></select></div>
          </div>
          <div class="fg"><label for="sv-notes">Special Requests</label><textarea id="sv-notes" rows="2" placeholder="Any special requirements for the visit…"></textarea></div>
          <div class="fg contact-method-row"><label>How would you like us to contact you? <span class="req">*</span></label><div class="radio-group"><label class="rpill"><input type="radio" name="sv-method" value="phone" checked> 📞 Phone Call</label><label class="rpill"><input type="radio" name="sv-method" value="whatsapp"> 💬 WhatsApp</label><label class="rpill"><input type="radio" name="sv-method" value="email"> 📧 Email</label></div></div>
        </div>
        <div class="form-foot">
          <label class="consent-row"><input type="checkbox" id="sv-consent"><span class="c-box"></span><span>I agree to be contacted by <strong>J Square Housing</strong>. <a href="#">Privacy Policy</a></span></label>
          <button class="btn-submit" type="button" onclick="submitEnq('site-visit','sv')">📅 Book Site Visit</button>
        </div>
      </div>

      <!-- ─── PRICE & AVAILABILITY ─── -->
      <div class="enq-form" id="enqf-price">
        <div class="form-head"><div class="form-icon">💰</div><div><h2>Price &amp; Availability</h2><p>Get the latest pricing, offers, and plot availability for our projects.</p></div></div>
        <div class="form-body">
          <div class="fg-row">
            <div class="fg"><label for="pr-name">Full Name <span class="req">*</span></label><input type="text" id="pr-name" placeholder="Your full name" autocomplete="name" oninput="liveVal(this)"><span class="ferr">Enter your name</span></div>
            <div class="fg"><label for="pr-phone">Mobile <span class="req">*</span></label><input type="tel" id="pr-phone" placeholder="+91 9361756057" autocomplete="tel" oninput="liveVal(this)"><span class="ferr">Valid mobile needed</span></div>
          </div>
          <div class="fg-row">
            <div class="fg"><label for="pr-email">Email <span class="req">*</span></label><input type="email" id="pr-email" placeholder="your@email.com" autocomplete="email" oninput="liveVal(this)"><span class="ferr">Valid email needed</span></div>
            <div class="fg"><label for="pr-project">Project Interested In</label><select id="pr-project"><option>J Square Green Valley</option><option>J Square Serene Enclave</option><option>J Square Urban Heights</option><option>All Projects</option></select></div>
          </div>
          <div class="fg-row">
            <div class="fg"><label for="pr-size">Plot Size</label><select id="pr-size"><option>600 – 800 sq.ft</option><option>800 – 1200 sq.ft</option><option>1200 – 2400 sq.ft</option><option>Flexible</option></select></div>
            <div class="fg"><label for="pr-budget">Budget Range</label><select id="pr-budget"><option>Under ₹15 Lakhs</option><option>₹15 – 30 Lakhs</option><option>₹30 – 50 Lakhs</option><option>₹50L – 1 Cr</option><option>Above ₹1 Crore</option></select></div>
          </div>
          <div class="fg"><label>Special Offers Interested In?</label><div class="check-group"><label class="cpill"><input type="checkbox" name="pr-offers" value="earlybird"> 🎯 Early Bird</label><label class="cpill"><input type="checkbox" name="pr-offers" value="corner"> 🔲 Corner Plot</label><label class="cpill"><input type="checkbox" name="pr-offers" value="park"> 🌿 Park Facing</label><label class="cpill"><input type="checkbox" name="pr-offers" value="emi"> 📆 EMI Plan</label></div></div>
          <div class="fg"><label for="pr-msg">Additional Questions</label><textarea id="pr-msg" rows="2" placeholder="Any specific questions about pricing or availability…"></textarea></div>
          <div class="fg contact-method-row"><label>How would you like us to contact you? <span class="req">*</span></label><div class="radio-group"><label class="rpill"><input type="radio" name="pr-method" value="phone" checked> 📞 Phone Call</label><label class="rpill"><input type="radio" name="pr-method" value="whatsapp"> 💬 WhatsApp</label><label class="rpill"><input type="radio" name="pr-method" value="email"> 📧 Email</label></div></div>
        </div>
        <div class="form-foot">
          <label class="consent-row"><input type="checkbox" id="pr-consent"><span class="c-box"></span><span>I agree to be contacted by <strong>J Square Housing</strong>. <a href="#">Privacy Policy</a></span></label>
          <button class="btn-submit" type="button" onclick="submitEnq('price','pr')">💰 Get Price Details</button>
        </div>
      </div>

      <!-- ─── INVESTMENT ─── -->
      <div class="enq-form" id="enqf-investment">
        <div class="form-head"><div class="form-icon">📈</div><div><h2>Investment Enquiry</h2><p>Explore high-growth real estate investment opportunities in Salem.</p></div></div>
        <div class="form-body">
          <div class="fg-row">
            <div class="fg"><label for="inv-name">Full Name <span class="req">*</span></label><input type="text" id="inv-name" placeholder="Your full name" autocomplete="name" oninput="liveVal(this)"><span class="ferr">Enter your name</span></div>
            <div class="fg"><label for="inv-phone">Mobile <span class="req">*</span></label><input type="tel" id="inv-phone" placeholder="+91 9361756057" autocomplete="tel" oninput="liveVal(this)"><span class="ferr">Valid mobile needed</span></div>
          </div>
          <div class="fg-row">
            <div class="fg"><label for="inv-email">Email <span class="req">*</span></label><input type="email" id="inv-email" placeholder="your@email.com" autocomplete="email" oninput="liveVal(this)"><span class="ferr">Valid email needed</span></div>
            <div class="fg"><label for="inv-occ">Occupation</label><input type="text" id="inv-occ" placeholder="e.g. Business Owner, Salaried, NRI"></div>
          </div>
          <div class="fg-row">
            <div class="fg"><label for="inv-amount">Investment Amount</label><select id="inv-amount"><option>₹10 – 25 Lakhs</option><option>₹25 – 50 Lakhs</option><option>₹50L – 1 Crore</option><option>Above ₹1 Crore</option><option>Bulk (Multiple Units)</option></select></div>
            <div class="fg"><label for="inv-horizon">Investment Horizon</label><select id="inv-horizon"><option>Short Term (1–3 years)</option><option>Medium Term (3–5 years)</option><option>Long Term (5+ years)</option></select></div>
          </div>
          <div class="fg"><label>Investment Goal</label><div class="radio-group"><label class="rpill"><input type="radio" name="inv-goal" value="appreciation" checked> 📈 Capital Appreciation</label><label class="rpill"><input type="radio" name="inv-goal" value="rental"> 🏠 Rental Income</label><label class="rpill"><input type="radio" name="inv-goal" value="both"> ✨ Both</label></div></div>
          <div class="fg"><label for="inv-units">Number of Plots</label><select id="inv-units"><option>1 Plot</option><option>2–3 Plots</option><option>4–5 Plots</option><option>Bulk (6+)</option></select></div>
          <div class="fg"><label for="inv-msg">Investment Requirements</label><textarea id="inv-msg" rows="2" placeholder="Tell us your investment goals and we'll create a custom plan…"></textarea></div>
          <div class="fg contact-method-row"><label>How would you like us to contact you? <span class="req">*</span></label><div class="radio-group"><label class="rpill"><input type="radio" name="inv-method" value="phone" checked> 📞 Phone Call</label><label class="rpill"><input type="radio" name="inv-method" value="whatsapp"> 💬 WhatsApp</label><label class="rpill"><input type="radio" name="inv-method" value="email"> 📧 Email</label></div></div>
        </div>
        <div class="form-foot">
          <label class="consent-row"><input type="checkbox" id="inv-consent"><span class="c-box"></span><span>I agree to be contacted by <strong>J Square Housing</strong>. <a href="#">Privacy Policy</a></span></label>
          <button class="btn-submit" type="button" onclick="submitEnq('investment','inv')">📈 Get Investment Plan</button>
        </div>
      </div>

      <!-- ─── CONSTRUCTION ─── -->
      <div class="enq-form" id="enqf-construction">
        <div class="form-head"><div class="form-icon">🏗️</div><div><h2>Construction Enquiry</h2><p>Build your dream home on your plot with our trusted construction partners.</p></div></div>
        <div class="form-body">
          <div class="fg-row">
            <div class="fg"><label for="con-name">Full Name <span class="req">*</span></label><input type="text" id="con-name" placeholder="Your full name" autocomplete="name" oninput="liveVal(this)"><span class="ferr">Enter your name</span></div>
            <div class="fg"><label for="con-phone">Mobile <span class="req">*</span></label><input type="tel" id="con-phone" placeholder="+91 9361756057" autocomplete="tel" oninput="liveVal(this)"><span class="ferr">Valid mobile needed</span></div>
          </div>
          <div class="fg-row">
            <div class="fg"><label for="con-email">Email <span class="req">*</span></label><input type="email" id="con-email" placeholder="your@email.com" autocomplete="email" oninput="liveVal(this)"><span class="ferr">Valid email needed</span></div>
            <div class="fg"><label for="con-addr">Plot Location</label><input type="text" id="con-addr" placeholder="Plot address or project name"></div>
          </div>
          <div class="fg-row">
            <div class="fg"><label for="con-plotsize">Plot Size (sq.ft)</label><input type="text" id="con-plotsize" placeholder="e.g. 1200"></div>
            <div class="fg"><label for="con-floors">Floors Required</label><select id="con-floors"><option>Ground Floor Only</option><option>G + 1 Floor</option><option>G + 2 Floors</option><option>G + 3 Floors</option></select></div>
          </div>
          <div class="fg-row">
            <div class="fg"><label for="con-type">Construction Type</label><select id="con-type"><option>Standard</option><option>Premium</option><option>Luxury</option><option>Eco / Green Build</option></select></div>
            <div class="fg"><label for="con-budget">Budget</label><select id="con-budget"><option>Under ₹20 Lakhs</option><option>₹20 – 40 Lakhs</option><option>₹40 – 70 Lakhs</option><option>Above ₹70 Lakhs</option></select></div>
          </div>
          <div class="fg"><label>Services Needed</label><div class="check-group"><label class="cpill"><input type="checkbox" name="con-svc" value="design"> 🏛️ Architecture</label><label class="cpill"><input type="checkbox" name="con-svc" value="vastu"> 🧭 Vastu</label><label class="cpill"><input type="checkbox" name="con-svc" value="interior"> 🛋️ Interior</label><label class="cpill"><input type="checkbox" name="con-svc" value="3d"> 📐 3D Elevation</label></div></div>
          <div class="fg"><label for="con-msg">Additional Requirements</label><textarea id="con-msg" rows="2" placeholder="Describe your dream home…"></textarea></div>
          <div class="fg contact-method-row"><label>How would you like us to contact you? <span class="req">*</span></label><div class="radio-group"><label class="rpill"><input type="radio" name="con-method" value="phone" checked> 📞 Phone Call</label><label class="rpill"><input type="radio" name="con-method" value="whatsapp"> 💬 WhatsApp</label><label class="rpill"><input type="radio" name="con-method" value="email"> 📧 Email</label></div></div>
        </div>
        <div class="form-foot">
          <label class="consent-row"><input type="checkbox" id="con-consent"><span class="c-box"></span><span>I agree to be contacted by <strong>J Square Housing</strong>. <a href="#">Privacy Policy</a></span></label>
          <button class="btn-submit" type="button" onclick="submitEnq('construction','con')">🏗️ Start Construction Plan</button>
        </div>
      </div>

      <!-- ─── HOME LOAN ─── -->
      <div class="enq-form" id="enqf-loan">
        <div class="form-head"><div class="form-icon">🏦</div><div><h2>Home Loan Assistance</h2><p>Our loan experts help you get the best rates from SBI, HDFC, Axis &amp; more.</p></div></div>
        <div class="form-body">
          <div class="fg-row">
            <div class="fg"><label for="loan-name">Full Name <span class="req">*</span></label><input type="text" id="loan-name" placeholder="Your full name" autocomplete="name" oninput="liveVal(this)"><span class="ferr">Enter your name</span></div>
            <div class="fg"><label for="loan-phone">Mobile <span class="req">*</span></label><input type="tel" id="loan-phone" placeholder="+91 9361756057" autocomplete="tel" oninput="liveVal(this)"><span class="ferr">Valid mobile needed</span></div>
          </div>
          <div class="fg-row">
            <div class="fg"><label for="loan-email">Email <span class="req">*</span></label><input type="email" id="loan-email" placeholder="your@email.com" autocomplete="email" oninput="liveVal(this)"><span class="ferr">Valid email needed</span></div>
            <div class="fg"><label for="loan-emp">Employment Type</label><select id="loan-emp"><option>Salaried – Private</option><option>Salaried – Government</option><option>Self Employed / Business</option><option>NRI</option><option>Pensioner</option></select></div>
          </div>
          <div class="fg-row">
            <div class="fg"><label for="loan-income">Monthly Income (₹)</label><input type="text" id="loan-income" placeholder="e.g. 50,000"></div>
            <div class="fg"><label for="loan-amount">Loan Amount</label><select id="loan-amount"><option>Under ₹10 Lakhs</option><option>₹10 – 20 Lakhs</option><option>₹20 – 40 Lakhs</option><option>₹40 – 60 Lakhs</option><option>Above ₹60 Lakhs</option></select></div>
          </div>
          <div class="fg-row">
            <div class="fg"><label for="loan-tenure">Tenure</label><select id="loan-tenure"><option>5 Years</option><option>10 Years</option><option>15 Years</option><option>20 Years</option><option>25–30 Years</option></select></div>
            <div class="fg"><label for="loan-existing">Existing Loans?</label><select id="loan-existing"><option>None</option><option>Yes – Home Loan</option><option>Yes – Car / Personal Loan</option><option>Multiple Loans</option></select></div>
          </div>
          <div class="fg"><label>Preferred Bank</label><div class="check-group"><label class="cpill"><input type="checkbox" name="loan-bank" value="sbi"> 🏛️ SBI</label><label class="cpill"><input type="checkbox" name="loan-bank" value="hdfc"> 🏦 HDFC</label><label class="cpill"><input type="checkbox" name="loan-bank" value="axis"> 💳 Axis</label><label class="cpill"><input type="checkbox" name="loan-bank" value="icici"> 🔷 ICICI</label><label class="cpill"><input type="checkbox" name="loan-bank" value="any"> Best Rate</label></div></div>
          <div class="fg"><label for="loan-msg">Additional Questions</label><textarea id="loan-msg" rows="2" placeholder="Any questions about eligibility, documents, or rates…"></textarea></div>
          <div class="fg contact-method-row"><label>How would you like us to contact you? <span class="req">*</span></label><div class="radio-group"><label class="rpill"><input type="radio" name="loan-method" value="phone" checked> 📞 Phone Call</label><label class="rpill"><input type="radio" name="loan-method" value="whatsapp"> 💬 WhatsApp</label><label class="rpill"><input type="radio" name="loan-method" value="email"> 📧 Email</label></div></div>
        </div>
        <div class="form-foot">
          <label class="consent-row"><input type="checkbox" id="loan-consent"><span class="c-box"></span><span>I agree to be contacted by <strong>J Square Housing</strong>. <a href="#">Privacy Policy</a></span></label>
          <button class="btn-submit" type="button" onclick="submitEnq('loan','loan')">🏦 Get Loan Assistance</button>
        </div>
      </div>

      <!-- ─── LEGAL ─── -->
      <div class="enq-form" id="enqf-legal">
        <div class="form-head"><div class="form-icon">📜</div><div><h2>Legal &amp; Documentation</h2><p>Title deed checks, encumbrance certificates, DTCP/RERA verification and more.</p></div></div>
        <div class="form-body">
          <div class="fg-row">
            <div class="fg"><label for="leg-name">Full Name <span class="req">*</span></label><input type="text" id="leg-name" placeholder="Your full name" autocomplete="name" oninput="liveVal(this)"><span class="ferr">Enter your name</span></div>
            <div class="fg"><label for="leg-phone">Mobile <span class="req">*</span></label><input type="tel" id="leg-phone" placeholder="+91 9361756057" autocomplete="tel" oninput="liveVal(this)"><span class="ferr">Valid mobile needed</span></div>
          </div>
          <div class="fg-row">
            <div class="fg"><label for="leg-email">Email <span class="req">*</span></label><input type="email" id="leg-email" placeholder="your@email.com" autocomplete="email" oninput="liveVal(this)"><span class="ferr">Valid email needed</span></div>
            <div class="fg"><label for="leg-loc">Property Location / Survey No.</label><input type="text" id="leg-loc" placeholder="e.g. Hasthampatti, Survey No. 42"></div>
          </div>
          <div class="fg"><label>Services Required</label><div class="check-group"><label class="cpill"><input type="checkbox" name="leg-svc" value="title"> 📋 Title Deed</label><label class="cpill"><input type="checkbox" name="leg-svc" value="ec"> 🔍 Encumbrance Cert</label><label class="cpill"><input type="checkbox" name="leg-svc" value="patta"> 🗂️ Patta / Chitta</label><label class="cpill"><input type="checkbox" name="leg-svc" value="dtcp"> ✅ DTCP / RERA</label><label class="cpill"><input type="checkbox" name="leg-svc" value="reg"> 📝 Registration</label><label class="cpill"><input type="checkbox" name="leg-svc" value="deed"> 📄 Sale Deed</label></div></div>
          <div class="fg-row">
            <div class="fg"><label for="leg-ptype">Property Type</label><select id="leg-ptype"><option>Residential Plot</option><option>Agricultural Land</option><option>Commercial Property</option><option>Apartment / Flat</option></select></div>
            <div class="fg"><label for="leg-urgency">Urgency Level</label><select id="leg-urgency"><option>Normal (5–7 days)</option><option>Priority (2–3 days)</option><option>Urgent (Same Day)</option></select></div>
          </div>
          <div class="fg"><label for="leg-msg">Details / Document Description</label><textarea id="leg-msg" rows="2" placeholder="Describe the property and any specific legal concerns…"></textarea></div>
          <div class="fg contact-method-row"><label>How would you like us to contact you? <span class="req">*</span></label><div class="radio-group"><label class="rpill"><input type="radio" name="leg-method" value="phone" checked> 📞 Phone Call</label><label class="rpill"><input type="radio" name="leg-method" value="whatsapp"> 💬 WhatsApp</label><label class="rpill"><input type="radio" name="leg-method" value="email"> 📧 Email</label></div></div>
        </div>
        <div class="form-foot">
          <label class="consent-row"><input type="checkbox" id="leg-consent"><span class="c-box"></span><span>I agree to be contacted by <strong>J Square Housing</strong>. <a href="#">Privacy Policy</a></span></label>
          <button class="btn-submit" type="button" onclick="submitEnq('legal','leg')">📜 Request Legal Service</button>
        </div>
      </div>

      <!-- ─── NRI ─── -->
      <div class="enq-form" id="enqf-nri">
        <div class="form-head"><div class="form-icon">✈️</div><div><h2>NRI Enquiry</h2><p>Dedicated NRI desk — virtual visits, POA assistance, and flexible payment plans.</p></div></div>
        <div class="form-body">
          <div class="fg-row">
            <div class="fg"><label for="nri-name">Full Name <span class="req">*</span></label><input type="text" id="nri-name" placeholder="Your full name" autocomplete="name" oninput="liveVal(this)"><span class="ferr">Enter your name</span></div>
            <div class="fg"><label for="nri-phone">WhatsApp / Mobile <span class="req">*</span></label><input type="tel" id="nri-phone" placeholder="+1 / +44 / +971 etc." autocomplete="tel" oninput="liveVal(this)"><span class="ferr">Valid number needed</span></div>
          </div>
          <div class="fg-row">
            <div class="fg"><label for="nri-email">Email <span class="req">*</span></label><input type="email" id="nri-email" placeholder="your@email.com" autocomplete="email" oninput="liveVal(this)"><span class="ferr">Valid email needed</span></div>
            <div class="fg"><label for="nri-country">Country of Residence</label><select id="nri-country"><option>USA</option><option>UAE / Dubai</option><option>UK</option><option>Canada</option><option>Australia</option><option>Singapore</option><option>Germany</option><option>Other</option></select></div>
          </div>
          <div class="fg-row">
            <div class="fg"><label for="nri-purpose">Purpose</label><select id="nri-purpose"><option>Investment / Resale</option><option>Future Self-Use</option><option>For Family in Salem</option><option>Retirement Home</option></select></div>
            <div class="fg"><label for="nri-budget">Budget (INR)</label><select id="nri-budget"><option>Under ₹30 Lakhs</option><option>₹30 – 60 Lakhs</option><option>₹60L – 1 Crore</option><option>Above ₹1 Crore</option></select></div>
          </div>
          <div class="fg"><label>Services Needed</label><div class="check-group"><label class="cpill"><input type="checkbox" name="nri-svc" value="virtual"> 📹 Virtual Visit</label><label class="cpill"><input type="checkbox" name="nri-svc" value="poa"> 📋 POA</label><label class="cpill"><input type="checkbox" name="nri-svc" value="loan"> 🏦 NRI Loan</label><label class="cpill"><input type="checkbox" name="nri-svc" value="legal"> ⚖️ Legal</label><label class="cpill"><input type="checkbox" name="nri-svc" value="remit"> 💸 Remittance</label></div></div>
          <div class="fg"><label for="nri-calltime">Best Time to Call (IST)</label><select id="nri-calltime"><option>Morning 9AM – 12PM</option><option>Afternoon 12PM – 3PM</option><option>Evening 6PM – 9PM</option><option>Weekend Only</option></select></div>
          <div class="fg"><label for="nri-msg">Message / Requirements</label><textarea id="nri-msg" rows="2" placeholder="Tell us about your investment goals or any questions…"></textarea></div>
          <div class="fg contact-method-row"><label>How would you like us to contact you? <span class="req">*</span></label><div class="radio-group"><label class="rpill"><input type="radio" name="nri-method" value="phone" checked> 📞 Phone Call</label><label class="rpill"><input type="radio" name="nri-method" value="whatsapp"> 💬 WhatsApp</label><label class="rpill"><input type="radio" name="nri-method" value="email"> 📧 Email</label></div></div>
        </div>
        <div class="form-foot">
          <label class="consent-row"><input type="checkbox" id="nri-consent"><span class="c-box"></span><span>I agree to be contacted by <strong>J Square Housing</strong>. <a href="#">Privacy Policy</a></span></label>
          <button class="btn-submit" type="button" onclick="submitEnq('nri','nri')">✈️ Connect NRI Desk</button>
        </div>
      </div>

      <!-- ─── COMPLAINT ─── -->
      <div class="enq-form" id="enqf-complaint">
        <div class="form-head"><div class="form-icon">⚠️</div><div><h2>File a Complaint</h2><p>We take every concern seriously. Your complaint will be resolved within 48 hours.</p></div></div>
        <div class="form-body">
          <div class="fg-row">
            <div class="fg"><label for="cmp-name">Full Name <span class="req">*</span></label><input type="text" id="cmp-name" placeholder="Your full name" autocomplete="name" oninput="liveVal(this)"><span class="ferr">Enter your name</span></div>
            <div class="fg"><label for="cmp-phone">Mobile <span class="req">*</span></label><input type="tel" id="cmp-phone" placeholder="+91 9361756057" autocomplete="tel" oninput="liveVal(this)"><span class="ferr">Valid mobile needed</span></div>
          </div>
          <div class="fg-row">
            <div class="fg"><label for="cmp-email">Email <span class="req">*</span></label><input type="email" id="cmp-email" placeholder="your@email.com" autocomplete="email" oninput="liveVal(this)"><span class="ferr">Valid email needed</span></div>
            <div class="fg"><label for="cmp-id">Customer / Plot ID</label><input type="text" id="cmp-id" placeholder="e.g. JQ-2024-1234"></div>
          </div>
          <div class="fg-row">
            <div class="fg"><label for="cmp-cat">Category</label><select id="cmp-cat"><option>Sales / Staff Behaviour</option><option>Documentation Issue</option><option>Construction / Site Problem</option><option>Payment / Billing Dispute</option><option>Delay in Service</option><option>Legal / Title Issue</option><option>Other</option></select></div>
            <div class="fg"><label for="cmp-priority">Severity</label><select id="cmp-priority"><option>Low – General Concern</option><option>Medium – Needs Attention</option><option>High – Urgent Issue</option><option>Critical – Legal / Financial</option></select></div>
          </div>
          <div class="fg"><label for="cmp-msg">Complaint Details <span class="req">*</span></label><textarea id="cmp-msg" rows="4" placeholder="Describe your issue — what happened, when, and what resolution you expect…"></textarea><span class="ferr">Please describe your complaint</span></div>
          <div class="fg contact-method-row"><label>Preferred Resolution Method <span class="req">*</span></label><div class="radio-group"><label class="rpill"><input type="radio" name="cmp-method" value="callback" checked> 📞 Callback</label><label class="rpill"><input type="radio" name="cmp-method" value="meeting"> 🤝 Meeting</label><label class="rpill"><input type="radio" name="cmp-method" value="email"> 📧 Email Response</label></div></div>
        </div>
        <div class="form-foot">
          <label class="consent-row"><input type="checkbox" id="cmp-consent"><span class="c-box"></span><span>I agree to be contacted by <strong>J Square Housing</strong>. <a href="#">Privacy Policy</a></span></label>
          <button class="btn-submit complaint-btn" type="button" onclick="submitEnq('complaint','cmp')">⚠️ Submit Complaint</button>
        </div>
      </div>

      <!-- ─── FEEDBACK ─── -->
      <div class="enq-form" id="enqf-feedback">
        <div class="form-head"><div class="form-icon">💬</div><div><h2>Share Your Feedback</h2><p>Your experience helps us serve our customers better every day.</p></div></div>
        <div class="form-body">
          <div class="fg-row">
            <div class="fg"><label for="fb-name">Full Name <span class="req">*</span></label><input type="text" id="fb-name" placeholder="Your full name" autocomplete="name" oninput="liveVal(this)"><span class="ferr">Enter your name</span></div>
            <div class="fg"><label for="fb-phone">Mobile <span class="req">*</span></label><input type="tel" id="fb-phone" placeholder="+91 9361756057" autocomplete="tel" oninput="liveVal(this)"><span class="ferr">Valid mobile needed</span></div>
          </div>
          <div class="fg-row">
            <div class="fg"><label for="fb-email">Email <span class="note">(optional)</span></label><input type="email" id="fb-email" placeholder="your@email.com"></div>
            <div class="fg"><label for="fb-service">Service Rating</label><select id="fb-service"><option>Overall Experience</option><option>Sales Team</option><option>Site Visit</option><option>Documentation</option><option>Construction Quality</option><option>After-Sales Support</option></select></div>
          </div>
          <div class="fg"><label>Overall Rating</label><div class="star-rating" id="fbStars" role="radiogroup"><span class="star" onclick="setRating(1)">★</span><span class="star" onclick="setRating(2)">★</span><span class="star" onclick="setRating(3)">★</span><span class="star" onclick="setRating(4)">★</span><span class="star" onclick="setRating(5)">★</span></div></div>
          <div class="fg"><label>What Did We Do Well?</label><div class="check-group"><label class="cpill"><input type="checkbox" name="fb-good" value="transparency"> ✅ Transparency</label><label class="cpill"><input type="checkbox" name="fb-good" value="staff"> 😊 Helpful Staff</label><label class="cpill"><input type="checkbox" name="fb-good" value="location"> 📍 Great Locations</label><label class="cpill"><input type="checkbox" name="fb-good" value="price"> 💰 Fair Pricing</label><label class="cpill"><input type="checkbox" name="fb-good" value="docs"> 📋 Smooth Docs</label></div></div>
          <div class="fg"><label for="fb-msg">Your Feedback</label><textarea id="fb-msg" rows="3" placeholder="Share your experience or suggestions…"></textarea></div>
          <div class="fg contact-method-row"><label>Would you recommend us?</label><div class="radio-group"><label class="rpill"><input type="radio" name="fb-rec" value="yes" checked> 👍 Yes, definitely</label><label class="rpill"><input type="radio" name="fb-rec" value="maybe"> 🤔 Maybe</label><label class="rpill"><input type="radio" name="fb-rec" value="no"> 👎 No</label></div></div>
        </div>
        <div class="form-foot">
          <label class="consent-row"><input type="checkbox" id="fb-consent"><span class="c-box"></span><span>I agree to be contacted by <strong>J Square Housing</strong>. <a href="#">Privacy Policy</a></span></label>
          <button class="btn-submit feedback-btn" type="button" onclick="submitEnq('feedback','fb')">💬 Submit Feedback</button>
        </div>
      </div>

      <!-- ─── CAREER ─── -->
      <div class="enq-form" id="enqf-career">
        <div class="form-head"><div class="form-icon">💼</div><div><h2>Career at J Square</h2><p>Join our growing team and build a rewarding career in Salem's real estate market.</p></div></div>
        <div class="form-body">
          <div class="fg-row">
            <div class="fg"><label for="car-name">Full Name <span class="req">*</span></label><input type="text" id="car-name" placeholder="Your full name" autocomplete="name" oninput="liveVal(this)"><span class="ferr">Enter your name</span></div>
            <div class="fg"><label for="car-phone">Mobile <span class="req">*</span></label><input type="tel" id="car-phone" placeholder="+91 9361756057" autocomplete="tel" oninput="liveVal(this)"><span class="ferr">Valid mobile needed</span></div>
          </div>
          <div class="fg-row">
            <div class="fg"><label for="car-email">Email <span class="req">*</span></label><input type="email" id="car-email" placeholder="your@email.com" autocomplete="email" oninput="liveVal(this)"><span class="ferr">Valid email needed</span></div>
            <div class="fg"><label for="car-city">Current Location</label><input type="text" id="car-city" placeholder="Salem / Namakkal / Erode…"></div>
          </div>
          <div class="fg-row">
            <div class="fg"><label for="car-role">Role Interested In</label><select id="car-role"><option>Sales Executive</option><option>Senior Sales Manager</option><option>Marketing Executive</option><option>Site Supervisor</option><option>Legal / Documentation</option><option>Customer Relations</option><option>Accounts / Finance</option><option>IT / Digital</option><option>Fresher – Any Role</option></select></div>
            <div class="fg"><label for="car-exp">Experience</label><select id="car-exp"><option>Fresher (0 Years)</option><option>1–2 Years</option><option>3–5 Years</option><option>5–10 Years</option><option>10+ Years</option></select></div>
          </div>
          <div class="fg-row">
            <div class="fg"><label for="car-edu">Qualification</label><select id="car-edu"><option>10th / SSLC</option><option>12th / HSC</option><option>Diploma</option><option>UG Degree</option><option>PG / MBA</option></select></div>
            <div class="fg"><label for="car-salary">Expected Salary (₹/month)</label><input type="text" id="car-salary" placeholder="e.g. 25,000"></div>
          </div>
          <div class="fg"><label>Languages Known</label><div class="check-group"><label class="cpill"><input type="checkbox" name="car-lang" value="tamil"> தமிழ் Tamil</label><label class="cpill"><input type="checkbox" name="car-lang" value="english"> 🇬🇧 English</label><label class="cpill"><input type="checkbox" name="car-lang" value="hindi"> हिंदी Hindi</label><label class="cpill"><input type="checkbox" name="car-lang" value="telugu"> Telugu</label></div></div>
          <div class="fg"><label for="car-msg">Why J Square?</label><textarea id="car-msg" rows="2" placeholder="Tell us why you want to join J Square Housing…"></textarea></div>
          <div class="fg contact-method-row"><label>How would you like us to contact you? <span class="req">*</span></label><div class="radio-group"><label class="rpill"><input type="radio" name="car-method" value="phone" checked> 📞 Phone Call</label><label class="rpill"><input type="radio" name="car-method" value="whatsapp"> 💬 WhatsApp</label><label class="rpill"><input type="radio" name="car-method" value="email"> 📧 Email</label></div></div>
        </div>
        <div class="form-foot">
          <label class="consent-row"><input type="checkbox" id="car-consent"><span class="c-box"></span><span>I agree to be contacted by <strong>J Square Housing</strong>. <a href="#">Privacy Policy</a></span></label>
          <button class="btn-submit career-btn" type="button" onclick="submitEnq('career','car')">💼 Apply Now</button>
        </div>
      </div>

      <!-- ─── GENERAL ─── -->
      <div class="enq-form" id="enqf-general">
        <div class="form-head"><div class="form-icon">✉️</div><div><h2>General Enquiry</h2><p>Any other question? We're here to help — just send us a message.</p></div></div>
        <div class="form-body">
          <div class="fg-row">
            <div class="fg"><label for="gen-name">Full Name <span class="req">*</span></label><input type="text" id="gen-name" placeholder="Your full name" autocomplete="name" oninput="liveVal(this)"><span class="ferr">Enter your name</span></div>
            <div class="fg"><label for="gen-phone">Mobile <span class="req">*</span></label><input type="tel" id="gen-phone" placeholder="+91 9361756057" autocomplete="tel" oninput="liveVal(this)"><span class="ferr">Valid mobile needed</span></div>
          </div>
          <div class="fg-row">
            <div class="fg"><label for="gen-email">Email <span class="req">*</span></label><input type="email" id="gen-email" placeholder="your@email.com" autocomplete="email" oninput="liveVal(this)"><span class="ferr">Valid email needed</span></div>
            <div class="fg"><label for="gen-city">City</label><input type="text" id="gen-city" placeholder="Your city"></div>
          </div>
          <div class="fg"><label for="gen-subject">Subject / Topic</label><input type="text" id="gen-subject" placeholder="e.g. Partnership, Media, Research…"></div>
          <div class="fg"><label for="gen-msg">Message <span class="req">*</span></label><textarea id="gen-msg" rows="4" placeholder="Type your message here…"></textarea><span class="ferr">Please enter your message</span></div>
          <div class="fg contact-method-row"><label>How would you like us to contact you? <span class="req">*</span></label><div class="radio-group"><label class="rpill"><input type="radio" name="gen-method" value="phone" checked> 📞 Phone Call</label><label class="rpill"><input type="radio" name="gen-method" value="whatsapp"> 💬 WhatsApp</label><label class="rpill"><input type="radio" name="gen-method" value="email"> 📧 Email</label></div></div>
        </div>
        <div class="form-foot">
          <label class="consent-row"><input type="checkbox" id="gen-consent"><span class="c-box"></span><span>I agree to be contacted by <strong>J Square Housing</strong>. <a href="#">Privacy Policy</a></span></label>
          <button class="btn-submit" type="button" onclick="submitEnq('general','gen')">✉️ Send Message</button>
        </div>
      </div>

      <!-- ─── SUCCESS SCREEN ─── -->
      <div class="enq-form" id="enqf-success">
        <div class="success-screen">
          <div class="success-anim">✅</div>
          <h2>Thank You!</h2>
          <p>Your enquiry has been received. Our team will reach you within 2 hours.</p>
          <div class="success-ref" id="jqEnqRef">Reference: JQ-XXXXXXX</div>
          <div class="success-actions">
            <a href="https://wa.me/${CO.whatsapp}" class="wa-btn" target="_blank" rel="noopener noreferrer">💬 WhatsApp Us</a>
            <button class="new-btn" type="button" onclick="switchEnqForm('property', document.querySelector('.fsel-btn'))">+ New Enquiry</button>
          </div>
        </div>
      </div>

    </div><!-- /.jq-form-wrap -->
  </main>

  <!-- ═══ RIGHT PANEL ═══ -->
  <aside class="enq-col-right glass-card">
    <div class="right-header">
      <div class="rh-icon">📲</div>
      <h3>Reach Us Directly</h3>
      <p>Click any option below to connect instantly</p>
    </div>
    <div class="contact-btns">
      <a href="tel:${CO.mobile}" class="cta-btn btn-call" onclick="addRipple(event)">
        <div class="btn-icon">📞</div>
        <div class="btn-info"><span class="btn-label">Call Now</span><span class="btn-val">${CO.mobile}</span></div>
      </a>
      <a href="https://wa.me/${CO.whatsapp}" target="_blank" rel="noopener" class="cta-btn btn-wa" onclick="addRipple(event)">
        <div class="btn-icon">💬</div>
        <div class="btn-info"><span class="btn-label">WhatsApp</span><span class="btn-val">${CO.mobile}</span></div>
      </a>
      <a href="mailto:${CO.email}" class="cta-btn btn-mail" onclick="addRipple(event)">
        <div class="btn-icon">✉️</div>
        <div class="btn-info"><span class="btn-label">Email Us</span><span class="btn-val">${CO.email}</span></div>
      </a>
    </div>
    <div class="quick-stats">
      <div class="qs-card"><div class="qs-num">500+</div><div class="qs-lbl">Happy Customers</div></div>
      <div class="qs-card"><div class="qs-num">12+</div><div class="qs-lbl">Years in Salem</div></div>
      <div class="qs-card"><div class="qs-num">24hrs</div><div class="qs-lbl">Response within</div></div>
      <div class="qs-card"><div class="qs-num">3</div><div class="qs-lbl">Active Projects</div></div>
    </div>
  </aside>

</div><!-- /.enq-layout -->

<!-- MOBILE STICKY CONTACT BAR -->
<div class="mob-contact-bar">
  <a href="tel:${CO.mobile}" class="mob-cta call">📞 Call</a>
  <a href="https://wa.me/${CO.whatsapp}" target="_blank" rel="noopener" class="mob-cta wa">💬 WhatsApp</a>
  <a href="mailto:${CO.email}" class="mob-cta mail">✉️ Email</a>
</div>
</div>
</div><!-- /#jq-enq-page -->
  `;

  /* Wrap in scope div */
  root.querySelector('style') && root.insertAdjacentHTML('afterbegin', '<div id="jq-enq-page">');
  const inner = root.innerHTML;
  root.innerHTML = `<div id="jq-enq-page">${inner}</div>`;

  /* ══════════════════════════════════════
     SWITCH FORM (tab bar)
  ══════════════════════════════════════ */
  window.switchEnqForm = function (type, el) {
    root.querySelectorAll('.enq-form').forEach(f => f.classList.remove('active'));
    const form = root.getElementById ? root.getElementById('enqf-' + type) : document.getElementById('enqf-' + type);
    if (form) form.classList.add('active');
    root.querySelectorAll('.fsel-btn').forEach(b => b.classList.remove('active'));
    if (el) el.classList.add('active');
    root.querySelector('.jq-form-wrap')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  /* ══════════════════════════════════════
     OPEN FROM OUTSIDE (backward compat)
  ══════════════════════════════════════ */
  window.openEnqForm = function (type) {
    const btn = root.querySelector(`.fsel-btn[onclick*="'${type}'"]`);
    window.switchEnqForm(type, btn);
    window.showPage && window.showPage('enquiry');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* ══════════════════════════════════════
     LIVE VALIDATION
  ══════════════════════════════════════ */
  window.liveVal = function (el) {
    const fg = el.closest('.fg');
    if (!fg) return;
    const v = el.value.trim();
    if (el.type === 'email') {
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      fg.classList.toggle('has-error', !ok && v.length > 0);
      el.classList.toggle('valid', ok);
      el.classList.toggle('invalid', !ok && v.length > 0);
    } else if (el.type === 'tel') {
      const ok = /^[\d\s+\-]{7,15}$/.test(v);
      fg.classList.toggle('has-error', !ok && v.length > 0);
      el.classList.toggle('valid', ok);
      el.classList.toggle('invalid', !ok && v.length > 0);
    } else {
      fg.classList.toggle('has-error', false);
      el.classList.toggle('valid', v.length > 0);
    }
  };

  /* ══════════════════════════════════════
     STAR RATING
  ══════════════════════════════════════ */
  window.setRating = function (val) {
    document.querySelectorAll('#fbStars .star').forEach((s, i) => {
      s.classList.toggle('lit', i < val);
    });
    document.getElementById('fbStars')._rating = val;
  };

  /* ══════════════════════════════════════
     RIPPLE EFFECT
  ══════════════════════════════════════ */
  window.addRipple = function (e) {
    const btn = e.currentTarget;
    const r = document.createElement('span');
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    r.className = 'ripple';
    r.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px`;
    btn.appendChild(r);
    setTimeout(() => r.remove(), 600);
  };
  
  /* ══════════════════════════════════════
     toggle
  ══════════════════════════════════════ */
document.querySelectorAll('.consent-row').forEach(row => {
  row.addEventListener('click', () => {
    const cb = row.querySelector('input[type="checkbox"]');
    cb.checked = !cb.checked;
    row.classList.toggle('checked', cb.checked);
  });
});
  /* ══════════════════════════════════════
     COLLECT FORM DATA
  ══════════════════════════════════════ */
  function collectData(prefix) {
    const g = id => document.getElementById(id);
    const data = { form_type: prefix, submitted_at: new Date().toISOString() };
    const fields = ['name','phone','email','city','type','size','budget','loc','msg',
      'date','time','project','transport','visitors','notes','occ','amount','horizon',
      'units','addr','plotsize','floors','emp','income','tenure','existing',
      'loc','ptype','urgency','country','purpose','calltime','id','cat','priority','subject',
      'role','exp','edu','salary','service'];
    fields.forEach(f => {
      const el = g(`${prefix}-${f}`);
      if (el) data[f] = el.value;
    });
    // radio
    const radio = document.querySelector(`input[name="${prefix}-method"]:checked`)
               || document.querySelector(`input[name="${prefix}-goal"]:checked`)
               || document.querySelector(`input[name="${prefix}-res"]:checked`)
               || document.querySelector(`input[name="${prefix}-rec"]:checked`);
    if (radio) data.contact_method = radio.value;
    // checkboxes
    const checks = document.querySelectorAll(`input[name^="${prefix}-"]:checked[type=checkbox]`);
    const chkVals = Array.from(checks).map(c => c.value);
    if (chkVals.length) data.extras = chkVals.join(',');
    // star rating
    const stars = document.getElementById('fbStars');
    if (stars && stars._rating) data.rating = stars._rating;
    return data;
  }

  /* ══════════════════════════════════════
     SUBMIT
  ══════════════════════════════════════ */
  window.submitEnq = async function (type, prefix) {
   const nameEl  = document.getElementById(prefix + '-name');
const phoneEl = document.getElementById(prefix + '-phone');
const emailEl = document.getElementById(prefix + '-email');
const consentInput = document.getElementById(prefix + '-consent');
const consentRow = consentInput?.closest('.consent-row');
let valid = true;

[nameEl, phoneEl, emailEl].forEach(el => {
  if (el && !el.value.trim()) {
    el.classList.add('invalid');
    el.closest('.fg')?.classList.add('has-error');
    valid = false;
  }
});

// Check consent via both the input AND the .checked class on the row
const consentChecked = consentInput?.checked || consentRow?.classList.contains('checked');
if (consentInput && !consentChecked) {
  showEnqToast('⚠️ Please agree to the privacy policy');
  return;
}
// EmailJS init — once
emailjs.init('0298vPyFJV6ZghAFy');
function collectData(prefix) {
  const g   = id => document.getElementById(id);
  const val = id => { const el = g(id); return el ? el.value : ''; };
 
  const data = {
    form_type    : prefix,
    submitted_at : new Date().toISOString()
  };
 
  // ── Common fields (all forms) ──────────────────────────────
  data.name  = val(`${prefix}-name`);
  data.phone = val(`${prefix}-phone`);
  data.email = val(`${prefix}-email`);
  data.city  = val(`${prefix}-city`);   // blank for forms that don't have it — fine
 
  // ── Per-form specific fields ───────────────────────────────
  switch (prefix) {
 
    case 'prop':
      data.type   = val('prop-type');
      data.size   = val('prop-size');
      data.budget = val('prop-budget');
      data.loc    = val('prop-loc');
      data.msg    = val('prop-msg');
      data.contact_method = _radio('prop-method');
      break;
 
    case 'sv':
      data.date      = val('sv-date');
      data.time      = val('sv-time');
      data.project   = val('sv-project');
      data.visitors  = val('sv-visitors');
      data.transport = val('sv-transport');
      data.notes     = val('sv-notes');
      data.contact_method = _radio('sv-method');
      break;
 
    case 'pr':
      data.project = val('pr-project');
      data.size    = val('pr-size');
      data.budget  = val('pr-budget');
      data.msg     = val('pr-msg');
      data.extras  = _checks('pr-offers');
      data.contact_method = _radio('pr-method');
      break;
 
    case 'inv':
      data.occ     = val('inv-occ');
      data.amount  = val('inv-amount');
      data.horizon = val('inv-horizon');
      data.units   = val('inv-units');
      data.msg     = val('inv-msg');
      // TWO radios — store separately
      data.inv_goal       = _radio('inv-goal');    // Capital Appreciation / Rental / Both
      data.contact_method = _radio('inv-method');  // Phone / WhatsApp / Email
      break;
 
    case 'con':
      data.addr     = val('con-addr');
      data.plotsize = val('con-plotsize');
      data.floors   = val('con-floors');
      data.type     = val('con-type');
      data.budget   = val('con-budget');
      data.msg      = val('con-msg');
      data.extras   = _checks('con-svc');
      data.contact_method = _radio('con-method');
      break;
 
    case 'loan':
      data.emp      = val('loan-emp');
      data.income   = val('loan-income');
      data.amount   = val('loan-amount');
      data.tenure   = val('loan-tenure');
      data.existing = val('loan-existing');
      data.msg      = val('loan-msg');
      data.extras   = _checks('loan-bank');
      data.contact_method = _radio('loan-method');
      break;
 
    case 'leg':
      data.loc     = val('leg-loc');
      data.ptype   = val('leg-ptype');
      data.urgency = val('leg-urgency');
      data.msg     = val('leg-msg');
      data.extras  = _checks('leg-svc');
      data.contact_method = _radio('leg-method');
      break;
 
    case 'nri':
      data.country  = val('nri-country');
      data.purpose  = val('nri-purpose');
      data.budget   = val('nri-budget');
      data.calltime = val('nri-calltime');
      data.msg      = val('nri-msg');
      data.extras   = _checks('nri-svc');
      data.contact_method = _radio('nri-method');
      break;
 
    case 'cmp':
      data.id       = val('cmp-id');
      data.cat      = val('cmp-cat');
      data.priority = val('cmp-priority');
      data.msg      = val('cmp-msg');
      data.contact_method = _radio('cmp-method');
      break;
 
    case 'fb':
      data.service = val('fb-service');
      data.msg     = val('fb-msg');
      data.extras  = _checks('fb-good');
      data.rating  = (document.getElementById('fbStars') || {})._rating || '';
      data.contact_method = _radio('fb-rec');   // Yes / Maybe / No (recommend)
      break;
 
    case 'car':
      data.role   = val('car-role');
      data.exp    = val('car-exp');
      data.edu    = val('car-edu');
      data.salary = val('car-salary');
      data.msg    = val('car-msg');
      data.extras = _checks('car-lang');
      data.contact_method = _radio('car-method');
      break;
 
    case 'gen':
    default:
      data.subject = val('gen-subject');
      data.msg     = val('gen-msg');
      data.contact_method = _radio('gen-method');
      break;
  }
 
  return data;
 
  // ── helpers ─────────────────────────────────────────────────
  function _radio(name) {
    const el = document.querySelector(`input[name="${name}"]:checked`);
    return el ? el.value : '';
  }
  function _checks(name) {
    const els = document.querySelectorAll(`input[name="${name}"]:checked`);
    return Array.from(els).map(e => e.value).join(', ');
  }
}
 
 
/* ─────────────────────────────────────────────────────────────
   2.  sendEnquiryEmail  — sends EVERY field the user filled in
       Uses data.form_type (the prefix: 'prop', 'sv', 'cmp' etc.)
       to know which section to build.
   ───────────────────────────────────────────────────────────── */
async function sendEnquiryEmail(data) {
  try {
    // form_type here is the PREFIX ('prop','sv','cmp'…)
    const ft = data.form_type || 'gen';
 
    // pretty label for email subject / header
    const LABELS = {
      prop : 'Property Enquiry',
      sv   : 'Site Visit Booking',
      pr   : 'Price & Availability',
      inv  : 'Investment Enquiry',
      con  : 'Construction Enquiry',
      loan : 'Home Loan Assistance',
      leg  : 'Legal & Documentation',
      nri  : 'NRI Enquiry',
      cmp  : 'Complaint',
      fb   : 'Feedback',
      car  : 'Career Application',
      gen  : 'General Enquiry'
    };
    const formLabel = LABELS[ft] || ft.toUpperCase();
 
    // ── formatting helpers ──────────────────────────────────
    const W    = 44;
    const line = (label, val) => (val !== undefined && val !== null && val !== '')
                                   ? `${label.padEnd(22)}: ${val}\n`
                                   : '';
    const head = (title) => `\n${'='.repeat(W)}\n  ${title}\n${'='.repeat(W)}\n`;
    const sub  = (title) => `\n${title}\n${'-'.repeat(W)}\n`;
 
    let body = '';
 
    // ── HEADER ─────────────────────────────────────────────
    body += head('J SQUARE HOUSING — NEW ENQUIRY');
    body += line('Reference',   data.ref);
    body += line('Form Type',   formLabel);
    body += line('Submitted',   new Date().toLocaleString('en-IN'));
 
    // ── CONTACT DETAILS (every form) ───────────────────────
    body += sub('CONTACT DETAILS');
    body += line('Name',   data.name);
    body += line('Phone',  data.phone);
    body += line('Email',  data.email);
    body += line('City',   data.city);
 
    // ── FORM-SPECIFIC SECTION ──────────────────────────────
    switch (ft) {
 
      case 'prop':
        body += sub('PROPERTY DETAILS');
        body += line('Property Type',     data.type);
        body += line('Plot Size Pref',    data.size);
        body += line('Budget Range',      data.budget);
        body += line('Preferred Location',data.loc);
        body += line('Message',           data.msg);
        break;
 
      case 'sv':
        body += sub('SITE VISIT DETAILS');
        body += line('Visit Date',        data.date);
        body += line('Time Slot',         data.time);
        body += line('Project to Visit',  data.project);
        body += line('No. of Visitors',   data.visitors);
        body += line('Transport Needed',  data.transport);
        body += line('Special Requests',  data.notes);
        break;
 
      case 'pr':
        body += sub('PRICING ENQUIRY');
        body += line('Project',           data.project);
        body += line('Plot Size',         data.size);
        body += line('Budget Range',      data.budget);
        body += line('Special Offers',    data.extras);
        body += line('Additional Questions', data.msg);
        break;
 
      case 'inv':
        body += sub('INVESTMENT DETAILS');
        body += line('Occupation',        data.occ);
        body += line('Investment Amount', data.amount);
        body += line('Investment Horizon',data.horizon);
        body += line('Investment Goal',   data.inv_goal);   // ← fixed field
        body += line('No. of Plots',      data.units);
        body += line('Requirements',      data.msg);
        break;
 
      case 'con':
        body += sub('CONSTRUCTION DETAILS');
        body += line('Plot Location',     data.addr);
        body += line('Plot Size (sq.ft)', data.plotsize);
        body += line('Floors Required',   data.floors);
        body += line('Construction Type', data.type);
        body += line('Budget',            data.budget);
        body += line('Services Needed',   data.extras);
        body += line('Additional Requirements', data.msg);
        break;
 
      case 'loan':
        body += sub('HOME LOAN DETAILS');
        body += line('Employment Type',   data.emp);
        body += line('Monthly Income',    data.income);
        body += line('Loan Amount',       data.amount);
        body += line('Tenure',            data.tenure);
        body += line('Existing Loans',    data.existing);
        body += line('Preferred Banks',   data.extras);
        body += line('Additional Questions', data.msg);
        break;
 
      case 'leg':
        body += sub('LEGAL & DOCUMENTATION');
        body += line('Property Location', data.loc);
        body += line('Services Required', data.extras);
        body += line('Property Type',     data.ptype);
        body += line('Urgency Level',     data.urgency);
        body += line('Description',       data.msg);
        break;
 
      case 'nri':
        body += sub('NRI DETAILS');
        body += line('Country of Residence', data.country);
        body += line('Purpose',           data.purpose);
        body += line('Budget (INR)',       data.budget);
        body += line('Services Needed',   data.extras);
        body += line('Best Call Time (IST)', data.calltime);
        body += line('Message',           data.msg);
        break;
 
      case 'cmp':
        body += sub('COMPLAINT DETAILS');
        body += line('Customer / Plot ID', data.id);
        body += line('Category',           data.cat);
        body += line('Severity',           data.priority);
        body += line('Complaint Details',  data.msg);
        break;
 
      case 'fb':
        body += sub('FEEDBACK DETAILS');
        body += line('Service Rated',      data.service);
        body += line('Star Rating',        data.rating ? '⭐'.repeat(Number(data.rating)) + ` (${data.rating}/5)` : '');
        body += line('What We Did Well',   data.extras);
        body += line('Feedback',           data.msg);
        body += line('Would Recommend',    data.contact_method);
        break;
 
      case 'car':
        body += sub('CAREER APPLICATION');
        body += line('Current City',       data.city);
        body += line('Role Applied For',   data.role);
        body += line('Experience',         data.exp);
        body += line('Qualification',      data.edu);
        body += line('Expected Salary',    data.salary);
        body += line('Languages Known',    data.extras);
        body += line('Why J Square',       data.msg);
        break;
 
      case 'gen':
      default:
        body += sub('GENERAL ENQUIRY');
        body += line('Subject',            data.subject);
        body += line('Message',            data.msg);
        break;
    }
 
    // ── CONTACT PREFERENCE ─────────────────────────────────
    // feedback stores 'recommend' in contact_method — skip it there
    // investment stores contact_method correctly now — show it
    if (ft !== 'fb') {
      body += sub('CONTACT PREFERENCE');
      body += line('Preferred Contact',  data.contact_method);
    }
 
    // ── FOOTER ─────────────────────────────────────────────
    body += '\n' + '='.repeat(W);
    body += '\nJ Square Housing — Auto Notification';
    body += '\nhttps://www.jsquarehousing.com';
 
    // ── SEND ───────────────────────────────────────────────
    await emailjs.send(
      'service_svqbngh',
      'template_ldjvrj5',
      {
        form_type  : formLabel,
        name       : data.name  || '',
        email_body : body
      }
    );
    console.log('✅ Email sent successfully for', formLabel);
 
  } catch (e) {
    console.error('❌ Email error:', e);
  }
}
 
if (!valid) { showEnqToast('⚠️ Please fill all required fields'); return; }
    const btn = document.querySelector(`#enqf-${type} .btn-submit`);
    if (btn) { btn.classList.add('loading'); btn.textContent = 'Submitting…'; }

    // Collect data
    const formData = collectData(prefix);
    const ref = 'JQ-' + Date.now().toString(36).toUpperCase();
    formData.ref = ref;

   await saveToSupabase('enquiries', formData);
   await sendEnquiryEmail(formData);
   setTimeout(() => {
  if (btn) { btn.classList.remove('loading'); btn.textContent = '✅ Submit Enquiry'; }
  
  document.getElementById('jqEnqRef').textContent = 'Reference: ' + ref;
  document.querySelectorAll('.enq-form').forEach(f => f.classList.remove('active'));
  document.getElementById('enqf-success').classList.add('active');
  showEnqToast('✅ Enquiry submitted successfully!');
  }, 1000);
  };

  /* ══════════════════════════════════════
     TOAST
  ══════════════════════════════════════ */
  function showEnqToast(msg) {
    const t = document.getElementById('jqEnqToast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3500);
  }

  /* ══════════════════════════════════════
     ESC KEY — scroll back to top of page
  ══════════════════════════════════════ */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') window.scrollTo({ top: 0, behavior: 'smooth' });
  });

})();
