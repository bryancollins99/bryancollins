# Product Requirements Document: bryancollins.com

**Last Updated:** November 19, 2024  
**Status:** Planning Phase

---

## Table of Contents

1. [Website Rebuild (Phase 1)](#website-rebuild-phase-1)
2. [Interactive MBA Framework Tools (Phase 2)](#interactive-mba-framework-tools-phase-2)

---

# Website Rebuild (Phase 1)

## Goal

Rebuild bryancollins.com for conversions and discovery: high-converting landing, tools hub, product pages, books, vibe projects, MBA hub.

Newsletter lives at `/join` (ConvertKit).

## KPIs

- **Email signup CVR:** desktop > 5%, mobile > 3%
- **Core Web Vitals:** LCP < 2.5s, CLS < 0.1, INP < 200ms
- **TTFB:** < 200ms (edge)
- **Lighthouse:** > 90 (Performance/SEO/Best Practices)

## In Scope (Phase 1)

**Pages:** `/`, `/join`, `/tools`, `/products`, `/products/emailmastery`, `/products/zettelkasten`, `/books`, `/vibe`, `/mba`, `/privacy`

**Redirects:** legacy newsletter URL → 301 to `/join`

**SEO:** per-route metadata, canonical, OG, sitemap/robots, JSON-LD (WebSite, Organization, Product, Book)

**Analytics:** GA4 or Plausible; outbound click tracking

## Out of Scope (Phase 1)

- Auth/payments
- Hosting interactive tools
- Full CMS migration
- Internationalization (i18n)

## Information Architecture & URLs

### Homepage (`/`)

**Primary Goal:** Lead generation (newsletter signups)

**Structure:**
1. **Navigation Bar (sticky)**
   - Logo/Name (left)
   - Nav items (right): Newsletter | Tools | Products | Books | MBA Frameworks
   - Mobile: Hamburger menu

2. **Hero Section (minimal, above fold)**
   - Headline: Value proposition (what you provide - frameworks, tools, knowledge)
   - Subheadline: Who it's for (creators, entrepreneurs)
   - Primary CTA: "Join My Newsletter" button (large, purple/gold)
   - Secondary links: Quick access to Tools, Books, MBA Frameworks
   - Optional: Small photo/avatar

3. **Brief Value Section (condensed)**
   - 3-4 cards with icons:
     - Free MBA Frameworks
     - AI Prompts & Tools
     - Books on Creativity
     - Products & Resources
   - Each card links to respective hub page

4. **Bottom CTA Section**
   - Repeat newsletter signup
   - Social proof (15,000+ readers)
   - Clear value statement

5. **Footer**
   - Links: Privacy, About, Contact
   - Social links
   - Copyright

6. **Exit-Intent Popup**
   - Triggers when user tries to leave
   - Newsletter signup form
   - Compelling reason to stay/subscribe

**CTA Placement:**
- Hero: Main newsletter CTA (large button)
- Bottom: Repeat newsletter CTA
- Exit-intent: Popup with newsletter form

---

### Other Pages

- **`/join`:** ConvertKit signup (dedicated landing page)
- **`/tools`:** card grid → external/internal tools
- **`/products`:** card grid → product pages
  - `/products/emailmastery` (from repo content)
  - `/products/zettelkasten` (from repo content)
- **`/books`:** grid with covers, blurbs, retailer links; optional `/books/[slug]` later
- **`/vibe`:** coding projects showcase (repo/demo links)
- **`/mba`:** frameworks/tools hub with "coming soon" status and waitlist links
- **`/mba-frameworks`:** directory of 8 interactive MBA tools (Phase 2)

## Content Sources

- **ConvertKit embed** on `/join`
- **Products:** extract sections from repos and adapt:
  - Email Mastery: https://github.com/bryancollins99/emailmastery
  - Zettelkasten: https://github.com/bryancollins99/zettelkasten
- **Books:** `data/books.json` (title, subtitle, cover, description, ISBN, tags, retailer links)
- **Vibe:** `data/projects.json` (title, desc, tags, repo URL, demo URL, thumbnail)
- **MBA:** `data/mba.json` (name, type, status, summary, link/waitlist)
- **Phase 2:** GitHub API sync (for `/vibe`), submodules/MDX sync (for products)

## Stack & Hosting

- **Framework:** Next.js 15 (App Router + RSC)
- **UI:** Tailwind CSS + shadcn/ui
- **Hosting:** Vercel (Edge + ISR)
- **Images:** next/image (prefer `/public` or stable CDN)
- **SEO tooling:** next-sitemap, @vercel/og for dynamic OGs
- **Theme note:** avoid AstroPaper; stay single-stack with Next.js to support future tools

## Components

**Core:**
- Hero
- LeadCapture
- Section
- CTASection
- FAQAccordion

**Cards:**
- ProductCard
- BookCard
- ToolCard
- ProjectCard
- FrameworkCard

**Utilities:**
- OutboundLink (adds analytics + optional UTM)

## Performance, Accessibility, Privacy

- **Budgets:** as above
- **Minimal JS** on marketing pages
- **WCAG 2.1 AA:** keyboard/focus, color contrast
- **Privacy:** `/privacy` page; minimize PII (ConvertKit handles subs)

## Risks & Mitigations

- **Content drift vs repos** → Phase 2 sync (submodules/MDX), content ownership
- **External asset instability** → prefer local `/public` or CDN
- **GitHub API rate limits** → ISR + server cache, authenticated requests
- **Many outbound links** → standardized UTM + analytics filters

## Milestones

- **M1:** Scaffold; `/`, `/join`, `/tools`; analytics baseline
- **M2:** `/products`; `/products/emailmastery`; `/products/zettelkasten`
- **M2.5:** `/books` with Book schema and retailer links
- **M3:** `/vibe`; sitemap/robots; OG images
- **M4:** `/mba` hub; finalize 301s to `/join`
- **M5 (Phase 2):** GitHub API sync (`/vibe`), product submodules/MDX sync, optional `/books/[slug]`

## Acceptance Criteria

- **`/`:** clear value prop + CTA; sections link to key hubs
- **`/join`:** ConvertKit form renders and submits
- **`/tools`:** ≥3 cards; outbound click tracking
- **`/products/emailmastery` & `/products/zettelkasten`:** hero, benefits, FAQ, CTAs; canonical + OG valid
- **`/books`:** ≥3 books with cover, blurb, ≥2 retailer links; valid Book JSON-LD
- **`/vibe`:** ≥6 projects with repo/demo links
- **`/mba`:** ≥4 frameworks/tools marked "coming soon" with optional waitlist
- **Sitemap/robots** live; 301s to `/join` verified; Lighthouse > 90 (Perf/SEO/BP)

## Implementation Notes

- **Data files:** `data/books.json`, `data/projects.json`, `data/mba.json`, optional `data/products/.json`
- **Reusable** card/grid patterns; shared tokens for typography/spacing
- **JSON-LD** validated via snapshots/tests; start with system fonts

## Admin Access & SEO

### Admin Dashboard Requirements

**URL:** `/admin/*`

**Access Control:**
- HTTP Basic Auth via Netlify (username/password)
- Single admin user (Bryan only)

**SEO Configuration:**
- **NOT indexable** - must be blocked from search engines
- Excluded from sitemap.xml
- robots.txt blocks `/admin/` path
- Meta robots tag: `noindex, nofollow` on all admin pages
- X-Robots-Tag header via Netlify

**Implementation:**

`netlify.toml`:
```toml
# Password protect admin
[[redirects]]
  from = "/admin/*"
  to = "/admin/:splat"
  status = 200
  force = true

# Prevent indexing of admin
[[headers]]
  for = "/admin/*"
  [headers.values]
    X-Robots-Tag = "noindex, nofollow"
    Basic-Auth = "admin:SECURE_PASSWORD_HERE"
```

`robots.txt`:
```txt
User-agent: *
Allow: /

# Block admin from search engines
Disallow: /admin/
Disallow: /dashboard/

Sitemap: https://join.bryancollins.com/sitemap.xml
```

Admin page `<head>`:
```html
<meta name="robots" content="noindex, nofollow">
```

**Public Pages (Indexable):**
- All pages EXCEPT `/admin/*`
- Include in sitemap.xml
- Normal SEO meta tags (title, description, OG)
- Allow crawling in robots.txt

## Open Questions

1. GA4 or Plausible?
2. ConvertKit form ID and success flow (inline vs redirect)?
3. Launch list for tools/products + canonical URLs + UTMs?
4. Books list (covers, retailer links), need detail pages now?
5. Any legacy URLs to preserve besides newsletter → `/join`?
6. What password/credentials for admin Basic Auth?

## References

- ai-dev-tasks guidelines: https://github.com/snarktank/ai-dev-tasks
- Email Mastery repo: https://github.com/bryancollins99/emailmastery
- Zettelkasten repo: https://github.com/bryancollins99/zettelkasten

---

# Interactive MBA Framework Tools (Phase 2)

## Project Overview

**Goal:** Create interactive, engaging web-based tools for 8 MBA strategy frameworks, adapted for content creators and online businesses.

**Target Audience:** YouTube creators, newsletter writers, content entrepreneurs, digital marketers, and online business owners who want to apply MBA frameworks without corporate jargon.

**Value Proposition:** Free, easy-to-use strategic planning tools that provide immediate value with visual results and downloadable PDFs.

**Important:** These tools are separate from the main `/mba` page, which remains a landing page for email capture. The tools will live at `/mba-frameworks` (hub) and individual URLs like `/ansoff-matrix`, `/swot-analysis`, etc.

## Pages & URLs

### Hub Page
- **URL:** `/mba-frameworks`
- **Purpose:** Central directory linking to all 8 framework tools
- **Note:** Keep existing `/mba` page unchanged (it's a separate landing page for email capture)

### Framework Tool Pages
1. `/ansoff-matrix` - Growth strategy options (Market Penetration, Development, Product Dev, Diversification)
2. `/swot-analysis` - Strengths, Weaknesses, Opportunities, Threats analysis
3. `/value-chain` - Value creation activities analysis
4. `/porters-five-forces` - Competitive environment assessment
5. `/business-model-canvas` - 9-box business model design
6. `/pestel-analysis` - External macro-environment factors (Political, Economic, Social, Tech, Environmental, Legal)
7. `/bcg-matrix` - Product/content portfolio analysis (Stars, Cash Cows, Question Marks, Dogs)
8. `/mckinsey-7s` - Organizational alignment framework (Strategy, Structure, Systems, Shared Values, Style, Staff, Skills)

## Key Features

### 1. Explanation Section
**Requirements:**
- 2-3 paragraph explanation of the framework
- Why it matters for content creators/online businesses
- Real-world creator examples
- Hero section with framework icon/illustration

### 2. Interactive Wizard
**Requirements:**
- Multi-step guided form (3-9 steps depending on framework)
- Progress indicator showing current step (e.g., "Step 3 of 7")
- "Next" and "Previous" navigation buttons
- Tooltips explaining each section (question mark icons with hover/click)
- "See Example" expandable sections with filled-in scenarios
- Required field validation before proceeding
- LocalStorage to save progress (users don't lose work on refresh)
- Final review step showing all inputs before results

**UI Elements:**
- Floating labels on inputs
- Smooth transitions between steps (fade/slide animations)
- Focus states with color transitions
- Subtle shadows and hover effects
- Mobile-responsive (steps stack vertically on small screens)

### 3. Visual Results Display
**Requirements:**
- Clean, professional visualization of completed framework
- Framework-specific layouts:
  - **ANSOFF:** 2x2 matrix with color-coded quadrants
  - **SWOT:** 2x2 matrix (Strengths=green, Weaknesses=red, Opportunities=blue, Threats=orange)
  - **Value Chain:** Horizontal flow diagram with primary/support activities
  - **Porter's:** Pentagon/star with 5 forces and rating visualization
  - **BMC:** 9-box canvas grid, color-coded sections
  - **PESTEL:** 6-section radial or clean list with icons
  - **BCG:** 2x2 matrix with bubble chart option for plotting products
  - **McKinsey 7S:** Circular/web diagram with interconnected elements
- CSS-based graphics (no heavy chart libraries)
- Responsive design (stacks/adapts on mobile)
- Generous white space and clear typography

### 4. PDF Download
**Requirements:**
- "Download as PDF" button with icon
- Use jsPDF library for generation
- PDF contents:
  - Framework name and date generated
  - User's inputs organized by section
  - Clean text-based layout
  - Bryan Collins branding footer
- One-click download (no email required at this phase)

### 5. Cross-linking
**Requirements:**
- "Explore More Frameworks" section at bottom of each tool page
- Show 3 related framework cards with:
  - Framework icon
  - Name
  - 1-sentence description
  - "Use This Tool" link
- Link back to `/mba-frameworks` hub
- Suggested relationships:
  - ANSOFF → SWOT, BCG Matrix, Business Model Canvas
  - Porter's → PESTEL, Value Chain, McKinsey 7S
  - SWOT → ANSOFF, PESTEL, Porter's
  - etc.

## Design Specifications

### Color Palette
- **Purple:** #956FA6 (primary brand color)
- **Gold/Yellow:** #F3C972 (accents, CTAs)
- **Light Gray:** #EDEDEE (backgrounds)
- **Blue-Gray:** #A6B6CF (secondary elements)
- **Dark Gray/Black:** #1B1B1D (text)

### Typography
- **Font Family:** 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif
- **Hierarchy:** Clear H1, H2, body text distinction
- **Line Height:** 1.6 for readability

### UI Style
- Clean, professional layouts (not flashy)
- Engaging but not gamified
- Smooth animations and transitions
- Consistent spacing and padding
- Mobile-first responsive design

### Icons
- Font Awesome for UI icons
- Custom or simple SVG icons for framework sections

## Technical Stack

### Frontend
- **HTML5:** Semantic markup
- **Tailwind CSS:** Utility-first styling
- **Vanilla JavaScript:** For wizard logic, validation, localStorage
- **jsPDF Library:** For PDF generation
- **Font Awesome:** Icon library

### Analytics
- **Plausible Analytics:** Privacy-friendly tracking on all pages

### Hosting
- **Netlify:** Auto-deploy from Git (existing setup for landing pages)
- **Note:** These are static HTML pages, not Next.js (separate from main site rebuild)

## Content Guidelines

### Examples Must Be:
- Specific to content creators (YouTubers, newsletter writers, podcasters)
- Avoid corporate jargon
- Practical and actionable
- Realistic scenarios

### Tooltips Should:
- Be concise (1-2 sentences max)
- Include concrete examples
- Use plain language

### Framework Explanations:
- Written at 8th-grade reading level
- Focus on "why it matters" not academic theory
- Include 1-2 real creator examples

## User Flow

1. **Discovery:** User arrives at `/mba-frameworks` hub (or directly to a tool via link/search)
2. **Learn:** Read brief framework explanation with examples
3. **Engage:** Start wizard, progress through steps with tooltips/examples
4. **Create:** Fill in framework inputs (saved to localStorage)
5. **Review:** See completed framework visualized cleanly
6. **Download:** Get PDF for offline reference
7. **Explore:** Click to try related frameworks

## Success Metrics

### Phase 1 (Launch)
- Pages created and deployed
- Tools functional with all core features
- Mobile-responsive and accessible
- PDF downloads working

### Phase 2 (Growth - Future)
- Track tool completion rates
- Monitor PDF downloads
- See which frameworks are most popular
- Add email capture option for sending completed frameworks
- Add save/share functionality

## Out of Scope (For Now)

- User accounts / login
- Email capture on tool pages (email capture stays on `/mba` page only)
- Sharing completed frameworks via URL
- Collaboration features
- AI-powered suggestions
- Video tutorials
- Advanced charting libraries

## Development Priority

### Phase 1: Foundation
1. Create `/mba-frameworks.html` hub page (simple directory)
2. Create `/ansoff-matrix.html` (proof of concept with full features)
3. Create `/swot-analysis.html` (similar structure, validate approach)

### Phase 2: Core Frameworks
4. `/value-chain.html`
5. `/porters-five-forces.html`
6. `/business-model-canvas.html`
7. `/pestel-analysis.html`

### Phase 3: Advanced Frameworks
8. `/bcg-matrix.html`
9. `/mckinsey-7s.html`

### Phase 4: Polish
10. Add cross-links between all pages
11. Final QA and responsive testing
12. Analytics implementation check

## File Structure

```
/
├── mba.html (existing - DO NOT MODIFY - landing page for email capture)
├── mba-frameworks.html (new hub)
├── ansoff-matrix.html (new tool)
├── swot-analysis.html (new tool)
├── value-chain.html (new tool)
├── porters-five-forces.html (new tool)
├── business-model-canvas.html (new tool)
├── pestel-analysis.html (new tool)
├── bcg-matrix.html (new tool)
├── mckinsey-7s.html (new tool)
└── resources/
    ├── analytics.js (existing)
    └── (framework icons/images as needed)
```

## Notes & Constraints

- **Keep it simple:** Clean layouts over complex interactions
- **No backend needed:** Everything client-side (localStorage for save, jsPDF for download)
- **Mobile-critical:** Many users will access on phones
- **Fast load times:** Keep pages lightweight, minimal dependencies
- **Accessible:** Proper HTML semantics, keyboard navigation support
- **Creator-focused:** All content, examples, and language tailored to content businesses
- **Existing `/mba` page:** Must remain unchanged as it's a working landing page
- **Separate from main site:** These are standalone HTML pages, not part of Next.js rebuild

## Open Questions

1. Should framework icons be custom-designed or use Font Awesome/simple shapes?
2. Should there be a "Start Over" button to clear localStorage and restart wizard?
3. Should PDFs include visual diagrams or just text-based results?
4. Should there be an option to print directly (beyond PDF download)?
5. How should `/mba-frameworks` hub link to/from the main `/mba` landing page?

---

## Implementation Roadmap

### Immediate (Current)
- Complete landing pages on join.bryancollins.com (Netlify)
- Keep existing `/mba` as email capture landing page
- Build MBA framework tools as separate static pages

### Phase 1 (Main Site Rebuild)
- Rebuild bryancollins.com on Next.js 15 + Vercel
- Implement pages: `/`, `/join`, `/tools`, `/products`, `/books`, `/vibe`, `/mba`
- Set up analytics, SEO, sitemap

### Phase 2 (MBA Tools)
- Build 8 interactive framework tools
- Deploy on Netlify alongside existing landing pages
- Cross-link between main site and tools

### Phase 3 (Integration & Growth)
- GitHub API sync for `/vibe`
- Product content sync (submodules/MDX)
- Email capture on framework tools (optional)
- Analytics and optimization
