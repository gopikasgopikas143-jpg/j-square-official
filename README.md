# J Square Housing — Website Project README

**Live Site:** [www.jsquarehousing.com](https://www.jsquarehousing.com)
**Tagline:** *Building Spaces. Shaping Futures.*
**Location:** Salem, Tamil Nadu, India
**Sector:** Real Estate — Plots, Layouts & Property Advisory Services

---

## 1. Overview

J Square Housing is a real-estate marketing and lead-generation website for a Salem-based (Tamil Nadu) plotted-development company. The site is positioned as **"Salem's Premier Real Estate"** brand, selling DTCP/RERA-approved residential plots and offering an end-to-end suite of property services (valuation, legal verification, investment advisory, documentation, Vastu).

The site is **bilingual** (English / தமிழ் - Tamil), has a **dark, premium real-estate aesthetic**, and is built around three core business goals:

1. **Sell plots** — showcase active projects/layouts with pricing, size, and status.
2. **Generate enquiries** — capture leads via a categorized enquiry form.
3. **Build a land marketplace** — let landowners post land listings directly (a mini classifieds/portal feature layered onto the core brochure site).

---

## 2. Site Architecture / Navigation Map

| Section | Purpose |
|---|---|
| 🏠 Home | Hero banner, trust stats, featured projects carousel |
| 🏗️ Projects | Listing of plot layouts/projects with pricing & specs |
| 🛠️ Services | Six core service offerings (see §5) |
| 🔧 Tools | Calculators & AI-powered property tools (see §6) |
| 📊 Market Insights | Salem district property price/growth data table |
| 🏷️ Post Land | Land-owner self-listing portal (3-step form) |
| 📞 Enquiry | Categorized lead-capture contact form |

A **language toggle** (🌐 தமிழ் / English) sits in the header/top-bar for full bilingual access — important given the target audience is Salem's Tamil-speaking local market plus NRIs.

---

## 3. Homepage Breakdown

### 3.1 Hero Section
- Headline: *"Building Spaces. Shaping Futures."*
- Trust badge: **"🏆 Salem's #1 Trusted Real Estate Brand"**
- Two primary CTAs: **🏗️ View Projects** and **🏷️ Post Your Land**
- Animated/counting trust statistics (Years Experience, Happy Customers, Active Projects, % DTCP Approved)
- A rotating **featured-projects carousel** with 5 highlighted layouts (Fairlands, Seelanaickenpatti, Ammapet, Hasthampatti, Gorimedu)

### 3.2 About Section
Positions the brand around **quality, transparency, and modern layout design**, backed by 4 trust pillars:
- 💡 500+ Happy Customers
- 🌱 15+ Premium Layouts
- 🤝 100% Legal Verified
- 📞 24/7 Customer Support

Plus a value-proposition list (6 points): Prime Growth Locations, Quality Beyond Measure, End-to-End Support, Investment-Focused Guidance, DTCP/RERA Verified Projects, Transparent Documentation.

### 3.3 Trust / USP Grid
A repeating (duplicated in source — likely an auto-scrolling marquee) 10-badge trust strip:
DTCP Approved · RERA Registered · Prime Locations · Clear Title Deeds · Affordable Pricing · Bank Loan Approved · Road & Water Access · 24/7 Support · High ROI Potential · Transparent Process

### 3.4 Featured Projects (Sample Listings)

| Project | Location | Units | Size Range | Status | Starting Price | Highlights |
|---|---|---|---|---|---|---|
| J Square Green Valley | Hasthampatti, Salem | 120 Plots | 600–1200 sq.ft | Ready | ₹29 Lakhs+ | DTCP ✓, Corner Plots, Park Facing |
| J Square Serene Enclave | Seelanaickenpatti, Salem | 85 Plots | 800–2400 sq.ft | Booking Open | ₹18.5 Lakhs+ | DTCP ✓, BT Road Access, Water Supply |
| J Square Urban Heights | Ammapet, Salem | 60 Plots | 1200–2400 sq.ft | 95% Sold Out (5 left) | ₹48 Lakhs+ | DTCP ✓, City Centre, Premium |

### 3.5 Reviews / Testimonials Module
A **fully interactive review system** — not just static testimonials:
- "✦ Write a Review" opens a modal with: Google-account verification badge, 5-star rating input, review text, **district dropdown (all ~38 Tamil Nadu districts)**, and a **Secret Key field** (used in place of login, so users can later edit/delete their own review).
- A companion "Delete Review" modal (secret-key based deletion) — indicates the review system is **self-service and passwordless**, driven by a secret-key token rather than user accounts.

---

## 4. Tools Section — "Professional Tools for END to END guide"

This is the most technically distinctive part of the site — a **Tools hub** intended to keep users engaged on-site rather than immediately calling. Based on the footer's Tools menu, the following tools are exposed:

| Tool | Likely Function |
|---|---|
| **EMI Calculator** | Computes monthly loan installment for plot/home purchase based on loan amount, tenure, interest rate |
| **Unit Converter** | Converts between land measurement units common in Tamil Nadu (cents, sq.ft, acres, ground, etc.) |
| **Stamp Duty Calculator** | Estimates Tamil Nadu government stamp duty & registration charges for a given property value |
| **Construction Cost Estimator** | Rough per-sq.ft construction cost estimation for building on a purchased plot |
| **ROI Calculator** | Projects return-on-investment for a plot over a holding period, using local growth-rate assumptions |
| **Property Valuation Tool** | Self-service estimate of a property's market value (lighter version of the paid certified valuation service) |
| **Vastu Sastram Tool** | Interactive Vastu-compliance check (plot orientation, entrance direction, etc.) |
| **🤖 AI Property Advisor** | AI/chat-style assistant to recommend properties based on user needs/budget |
| **✨ AI Vastu Analyser** | AI-driven Vastu analysis, likely from an uploaded plot/floor layout or direction input |
| **🧠 AI Plot Finder** | AI-based plot recommendation engine — matches buyer criteria (budget, location, size) to available inventory |

**Note:** These three "AI" tools (Advisor, Vastu Analyser, Plot Finder) suggest the site integrates a **conversational/generative AI layer** on top of the standard financial calculators — positioning J Square Housing as a tech-forward regional real-estate brand, unusual for a local Salem developer site.

### 4.1 Market Intelligence Table
Under **"Salem District Property Insights,"** a filterable data table (filters: All Areas / High Growth 7%+ / Affordable / Premium) with columns:
`Area | Base Price per sq.ft | Annual Growth | Infrastructure Rating | Trend`
This is a **dynamic, data-driven table** (populated via backend/API/CMS rather than static HTML, since no rows were rendered in the fetched source — indicating client-side rendering or a loading state).

---

## 5. Services Section — "Six Pillars of Property Excellence"

Framed as a **full real-estate advisory business**, not just a plot seller:

| # | Service | What's Included | Turnaround | Guarantee/Badge |
|---|---|---|---|---|
| 01 | 🧭 Property Consultation | Site visit & location analysis, market pricing guidance, shortlisting & comparison, negotiation support | 1–3 Days | Free First Call |
| 02 | 📊 Property Valuation | Market value assessment, bank-approved reports, stamp duty valuation, investment value analysis | 24–48 hrs | Bank Accepted |
| 03 | ⚖️ Legal Verification | Title deed scrutiny, encumbrance certificate, patta/chitta verification, DTCP/RERA approval check | 3–5 Days | Court Verified |
| 04 | 💹 Investment Advisory | ROI projection reports, growth zone mapping, risk assessment, portfolio diversification | 2–4 Days | Expert Certified |
| 05 | 📋 Documentation | Sale deed drafting, registration assistance, home loan documentation, government liaison | 1–7 Days | 100% Accurate |
| 06 | 🔮 Vastu Services | Plot orientation analysis, main door direction, room placement guidance, post-purchase Vastu report | Same Day | Certified Expert |

### 5.1 Service Process (5 Steps)
`💬 Consultation → 🔍 Expert Review → ✅ Verification → 📄 Final Report → 🎯 Completion`

### 5.2 "Who Needs Our Services" Segments
The site explicitly targets 5 buyer personas: **Property Buyers, Property Sellers, Investors, Bank Loan Seekers, Legal Documentation seekers** — useful for understanding the funnel/segmentation strategy behind the marketing copy.

### 5.3 FAQ Highlights
- Legal verification: 3–5 working days (48-hr fast-track available)
- Valuation reports accepted by **SBI, HDFC, ICICI, Axis Bank** and most co-operative banks
- Primary service area: **Salem, Erode, Namakkal** districts (others on request)
- Vastu consults available for both pre-purchase and existing/built homes
- First consultation always free; fully transparent fee disclosure

---

## 6. Post Land Portal ("Land Listings Portal")

A **peer-to-peer classifieds module** allowing landowners to list land directly — positioned as "no middleman, no hidden fees."

**Filters available to buyers:**
- Type: All / Residential / Commercial / Farm Land / Open Plot
- Area: Fairlands, Hasthampatti, Ammapet, Gorimedu, Seelanaickenpatti, Ayothiyapattinam, Udayapatti, Annathanapatti, Other Salem

**"Post Your Land" — 3-Step Listing Wizard:**

1. **📐 Property Details** — Property type (Residential/Commercial/Farm/Plot), Title, Cents (land unit), auto-calculated Sq.ft, Area/Location dropdown, Full Address, Total Price, auto-calculated Price/sq.ft
2. **📸 Photos & Description** — Photo upload (drag-and-drop, JPG/PNG, max 5 photos — with an incentive note: *"listings with photos get 3× more calls"*), free-text Description, comma-separated Features
3. **👤 Contact Details** — Name, Phone Number, Poster type (Direct Owner / Agent-Broker), and a **Secret Key** (again used for passwordless edit/delete of the listing later)

Listings, like reviews, use the **secret-key model** for self-service management — a lightweight approach that avoids building full user authentication.

---

## 7. Enquiry Form — Category Breakdown

The **Enquiry system is the core lead-capture mechanism** of the site, and it's explicitly categorized (per the footer menu) into **12 distinct enquiry types**, allowing leads to be routed/tagged by intent:

| Category | Icon | Likely Use Case |
|---|---|---|
| Property | 🏘️ | General plot/project purchase interest |
| Site Visit | 📅 | Scheduling a physical visit to a layout |
| Pricing | 💰 | Price list / quote requests |
| Investment | 📈 | Investment-focused buyer enquiries |
| Build | 🏗️ | Construction-related enquiries (post-purchase) |
| Loan | 🏦 | Bank loan / home-loan assistance requests |
| Legal | 📜 | Legal verification / documentation queries |
| NRI | ✈️ | Non-Resident Indian buyer enquiries (remote purchase support) |
| Complaint | ⚠️ | Grievance / issue redressal |
| Feedback | 💬 | General feedback submissions |
| Career | 💼 | Job applications / recruitment |
| General | ✉️ | Catch-all / uncategorized enquiries |

This category structure suggests the backend likely tags each submitted lead with an `enquiry_type` field, enabling the business to **route leads to the right department** (sales vs. legal vs. HR vs. loan-liaison team) and to run **category-specific follow-up/CRM workflows**.

A confirmation message **"✅ Enquiry submitted! We'll contact you soon."** appears on successful submission (client-side toast/snackbar pattern).

---

## 8. Contact & Trust Information

| Channel | Detail |
|---|---|
| 📞 Phone | [+91 93617 56057](tel:+919361756057) |
| 💬 WhatsApp | [wa.me/919361756057](https://wa.me/919361756057) / [wa.me/919876543210](https://wa.me/919876543210) *(two numbers appear in source — footer WhatsApp and a services-section WhatsApp link; worth reconciling to one canonical number)* |
| 📧 Email | info@jsquarehousing.com (mailto target: jsquare.housing.official@gmail.com) |
| 📍 Address | Salem, Tamil Nadu |
| Certifications | DTCP ✓ · RERA Ready · ISO Certified |
| Social | Facebook, Instagram (links present but not populated with handles in source) |
---

## 9. Technical Observations (from page structure)

- **Type:** Single-page application (SPA) style site — one continuous scroll with anchor-based nav (`#Home`, `#Projects`, etc.) and modal overlays for Reviews, Post Land, and Delete confirmations.
- **Rendering:** Several data-driven sections (Market Insights table, trust-stat counters starting at "0+") appear to be **client-side rendered / animated on scroll**, meaning content loads or counts up via JavaScript after initial paint — a headless fetch only captured the pre-render/loading state (e.g., stat counters showing "0+", empty market table body, "Preparing your experience…" loader text).
- **Passwordless self-service pattern:** Both the **Review** system and the **Post Land** listings use a "Secret Key" instead of full user accounts/login — a lightweight way to let anonymous users manage their own submissions.
- **Bilingual i18n:** Full English/Tamil toggle, including a Tamil-first district dropdown — indicates a proper i18n implementation rather than a single hardcoded language.
- **AI integration:** Three named AI tools (Property Advisor, Vastu Analyser, Plot Finder) suggest an LLM or rules-based AI backend is wired into the Tools section.
- **Lead segmentation:** The 12-category Enquiry form implies structured backend lead routing (likely a CRM or database with an `enquiry_type` field).

---

*Compiled from a live analysis of [www.jsquarehousing.com](https://www.jsquarehousing.com) on August 1, 2026.*
