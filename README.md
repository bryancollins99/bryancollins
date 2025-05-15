# Landing Page Builder

## Available Landing Pages

This project includes the following landing pages:

1. **101 AI Prompts**
   - 101-ai-prompts-apollo.html - Apollo version
   - 101-ai-prompts-linkedin.html - LinkedIn version
   - 101-ai-prompts-medium.html - Medium version
   - 101-ai-prompts-ln.html - LinkedIn version (alternate)
   - 101-ai-prompts-yt.html - YouTube version

2. **Prompt Writing Blueprint**
   - prompt-writing-blueprint-apollo.html

3. **LinkedIn Hooks**
   - linkedin-hooks.html - General version
   - linkedin-hooks-yt.html - YouTube creators version

4. **Workshop Pages**
   - content-multiplication-workshop.html - Content Multiplication Workshop
   - ai-writing-workshop.html - AI Writing Workshop

5. **Other Landing Pages**
   - ai-writing-course.html
   - ai-writing-newsletter.html
   - chatgpt.html
   - saas-founders.html

6. **Thank You Page**
   - thank-you.html

## Navigation System

This project includes a hidden navigation system that allows you to easily move between landing pages during development and management. The navigation is only visible when you add the `?admin=true` parameter to any URL.

For example:
- Normal view: `https://pages.bryancollins.com/101-ai-prompts-ap/`
- Admin view with navigation: `https://pages.bryancollins.com/101-ai-prompts-ap/?admin=true`

The admin navigation bar appears at the top of the page and provides links to all landing pages in the system.

Additionally, the home page (`/index.html`) with the admin parameter (`/index.html?admin=true`) provides a dashboard view with links to all pages in both normal and admin views.

## Developer Requirements Document

## 1. Project Overview
Build a set of ~10 custom landing pages for lead generation, replacing existing Leadpages pages.  
Deploy the site using GitHub and Netlify.  
Integrate Plausible Analytics for tracking.  
Primary goal: maximize direct response email list growth via organic social traffic.

## 2. Technical Stack
- **Frontend:** Static HTML/CSS/JS or Static Site Generator (e.g., Next.js, Astro, Eleventy, Hugo)
- **Hosting:** Netlify (connected to GitHub repo)
- **Analytics:** Plausible Analytics
- **Forms:** Integrate with ConvertKit for email capture

## 3. Project Structure
- **Single repository** containing all landing pages.
- Each landing page is a separate HTML file or route.
- Shared assets (CSS, JS, images) are reused across pages.
- Example structure:
    ```
    /public
      /index.html
      /page1.html
      /page2.html
      ...
      /page10.html
      /_redirects
      /assets/
    ```

## 4. Deployment
- **GitHub:** All code is version-controlled in a private or public repository.
- **Netlify:** Deploy the site via GitHub integration.
    - Automatic deploys on push to main branch.
    - Free SSL, CDN, and custom domain support.
- **Redirects:** Use a `_redirects` file to map old Leadpages URLs to new custom URLs.

## 5. Analytics
- **Plausible Analytics** is implemented on all pages using a centralized approach:
    - The main Plausible script is included in the `<head>` of each page:
      ```html
      <script defer data-domain="join.bryancollins.com" src="https://plausible.io/js/script.js"></script>
      <script defer src="resources/analytics.js"></script>
      ```
    - A centralized `analytics.js` file in the resources directory handles all custom event tracking:
      - Form submissions tracking
      - Outbound link tracking
      - Conversion tracking on the thank you page
    - Custom events are automatically tracked without additional code on each page
    - All events include relevant properties for detailed analytics

## 6. SEO & Performance
- Each page must have unique meta tags (title, description, Open Graph, Twitter cards).
- Optimize for fast load times (minimize CSS/JS, compress images).
- Mobile responsive design required.
- Sitemap and robots.txt should be included.

## 7. Forms & Integrations

### ConvertKit Form Implementation

This project uses ConvertKit forms for email capture on all landing pages. There are two implementation approaches:

#### JavaScript Embed Approach (Recommended)

```html
<script async data-uid="UNIQUE_FORM_ID" src="https://become-a-writer-today.kit.com/UNIQUE_FORM_ID/index.js"></script>
```

- Each form has a unique ID that must be configured in ConvertKit as a modal form
- The domain must be `become-a-writer-today.kit.com`
- The URL format must follow the pattern: `/{form-id}/index.js`
- Place the script tag exactly where you want the form to appear in the HTML

#### Current Form IDs

- LinkedIn: `73ff0be26f`
- Medium: `ebb3352c56`
- Apollo: `9f849f222b`
- LN (LinkedIn alternate): `40609e45cc`
- YouTube: `426c2157ed`
- AI Writing Newsletter: `4914fa2338`

#### Troubleshooting Forms

If a form doesn't display correctly:

1. Verify the form ID is correct and active in ConvertKit
2. Ensure the form is published in ConvertKit (Grow tab > Landing Pages & Forms > Your form > Publish)
3. Check that the domain is `become-a-writer-today.kit.com`
4. Verify the URL format follows `/{form-id}/index.js`
5. Ensure there's only one ConvertKit script on the page
6. Check browser console for errors

- On successful submission, forms redirect to a thank-you page or show a confirmation message.
- Form submissions are tracked as events in Plausible.

## 8. Version Control & Collaboration
- All work must be committed to GitHub with clear commit messages.
- Use branches for new features or pages; merge via pull requests.
- Document setup and deployment steps in a `README.md`.

## 9. Extensibility
- The system should make it easy to add new landing pages in the future.
- Shared components (headers, footers, forms) should be reusable.

## 10. Optional Enhancements
- A/B testing setup for landing pages.
- Personalization based on UTM parameters.
- Referral or viral sharing mechanics.

## 11. Deliverables
- GitHub repository with all code and assets.
- Netlify deployment (live on custom domain).
- Working Plausible Analytics integration.
- Documentation (`README.md`) covering:
    - Project setup
    - How to add/edit landing pages
    - How to update redirects
    - How to update analytics/events

## Domain Configuration

This project uses two primary domains:

1. **join.bryancollins.com** - Primary domain for all landing pages
2. **pages.bryancollins.com** - Legacy domain that redirects to join.bryancollins.com

### Domain Setup

- Both domains are configured in Netlify's domain settings
- Both domains have SSL certificates provisioned through Netlify
- The `_redirects` file contains rules to handle redirects between domains

### Redirect System

The redirect system handles several scenarios:

1. **Clean URLs**: Removes file extensions (e.g., `/page` instead of `/page.html`)
2. **Legacy Domain Redirects**: Redirects from pages.bryancollins.com to join.bryancollins.com
3. **Trailing Slashes**: Properly handles URLs with or without trailing slashes
4. **LeadPages Redirects**: Redirects from old LeadPages URLs to new Netlify URLs

## Reversion Instructions

If you need to revert from Netlify back to LeadPages, follow these steps:

### 1. Update DNS Records in Cloudflare

1. Log in to your Cloudflare account
2. Navigate to the DNS settings for bryancollins.com
3. Find the CNAME record for `pages.bryancollins.com`
4. Change the target from `mylandingpagegenerator.netlify.app` back to `custom-proxy.leadpages.net`
5. Save the changes

### 2. Update Redirects (Optional)

If you want to temporarily keep both systems running in parallel:

1. Edit the `_redirects` file in this repository
2. Comment out the current redirects (add # at the beginning of each line)
3. Uncomment the "REVERSIBLE SECTION" (remove # from those lines)
4. Commit and push the changes

```
# Comment out these lines
# https://pages.bryancollins.com/prompt-writing-blueprint-apollo/* https://join.bryancollins.com/prompt-writing-blueprint-apollo/ 301!

# Uncomment these lines
https://join.bryancollins.com/prompt-writing-blueprint-apollo/* https://pages.bryancollins.com/prompt-writing-blueprint-apollo/ 301!
```

### 3. Verify LeadPages Configuration

1. Log in to your LeadPages account
2. Ensure all your pages are still active and published
3. Check that your custom domain settings in LeadPages still show `pages.bryancollins.com`
4. Test a few URLs to make sure they're resolving correctly

### 4. Update Any Links

If you've updated any external links to point to join.bryancollins.com:

1. Identify all places where you've shared the new URLs (emails, social media, etc.)
2. Update these links to point back to the original LeadPages URLs

### 5. Monitor Analytics

1. Check both Plausible and LeadPages analytics during the transition
2. Ensure no traffic is being lost during the reversion

The DNS change typically takes 15 minutes to 48 hours to fully propagate worldwide. During this time, some users might see the Netlify site while others see the LeadPages site.
