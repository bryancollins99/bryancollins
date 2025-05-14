 Developer Requirements Document

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
- **Plausible Analytics** script must be included on all pages.
    - Use a single Plausible project for the domain.
    - Track pageviews and custom events (e.g., form submissions).
    - Example script to include in `<head>`:
      ```html
      <script async defer data-domain="yourdomain.com" src="https://plausible.io/js/plausible.js"></script>
      ```

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
