# Landing Page Builder

## Available Landing Pages

This project includes the following landing pages:

1. **101 AI Prompts**
   - 101-ai-prompts-ap.html - Apollo version
   - 101-ai-prompts-linkedin.html - LinkedIn version
   - 101-ai-prompts-medium.html - Medium version
   - 101-ai-prompts-ln.html - LinkedIn version (alternate)
   - 101-ai-prompts-yt.html - YouTube version

2. **Prompt Writing Blueprint**
   - prompt-writing-blueprint-apollo.html

3. **LinkedIn Hooks**
   - linkedin-hooks.html - General version
   - linkedin-hooks-yt.html - YouTube creators version

4. **Other Landing Pages**
   - ai-writing-course.html
   - ai-writing-workshop.html
   - ai-writing-newsletter.html
   - chatgpt.html
   - saas-founders.html

5. **Thank You Page**
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
- Each landing page must have a lead capture form.
- Forms should integrate with ConvertKit for email list building.
- On successful submission, redirect to a thank-you page or show a confirmation message.
- Track form submissions as events in Plausible.

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
