# Deployment Rulebook

This document outlines the process and rules for deploying updates to the Landing Page Builder project.

## Deployment Process

### 1. Pre-Deployment Checklist

Before pushing any changes to the main branch or deploying to Netlify, ensure:

- [ ] All HTML files include the correct Plausible Analytics scripts:
  ```html
  <script defer data-domain="join.bryancollins.com" src="https://plausible.io/js/script.js"></script>
  <script defer src="resources/analytics.js"></script>
  ```
- [ ] All forms point to the correct ConvertKit endpoint
- [ ] All pages are mobile responsive (test on multiple device sizes)
- [ ] Meta tags and Open Graph data are properly set for each page
- [ ] No broken links or images exist across the site
- [ ] All JavaScript functions work as expected

### 2. Git Workflow

Follow this Git workflow for all changes:

1. Create a feature branch for your changes:
   ```
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and test locally

3. Commit your changes with descriptive messages:
   ```
   git add .
   git commit -m "Add descriptive message about changes"
   ```

4. Push your branch to GitHub:
   ```
   git push origin feature/your-feature-name
   ```

5. Create a Pull Request on GitHub to merge into the main branch

6. After review, merge the PR into main

7. Netlify will automatically deploy the changes from the main branch

### 3. Adding New Landing Pages

When adding a new landing page:

1. Use an existing landing page as a template
2. Update all meta tags and Open Graph data
3. Ensure the Plausible Analytics scripts are included
4. Add the form with the correct ConvertKit endpoint
5. Test the page thoroughly before deployment
6. Update the admin navigation to include the new page
7. Add the page to the README.md list of available pages

### 4. Updating Analytics

The centralized analytics system uses `resources/analytics.js` to track events. If you need to add or modify tracking:

1. Edit the `analytics.js` file to add new tracking functions
2. Test the changes locally to ensure events are firing correctly
3. Verify in the Plausible dashboard that events are being recorded

### 5. Netlify Configuration

The site is deployed on Netlify with the following settings:

- **Build Command:** None (static site)
- **Publish Directory:** `.` (root directory)
- **Branch:** main
- **Custom Domain:** join.bryancollins.com
- **HTTPS:** Enabled with automatic SSL certificate

### 6. Troubleshooting Deployment Issues

If deployment fails:

1. Check the Netlify build logs for errors
2. Verify that all files are properly formatted and have no syntax errors
3. Ensure all required files are included in the repository
4. Check that all paths to resources are correct

## Maintenance Guidelines

### Regular Maintenance Tasks

1. **Monthly:**
   - Check all forms are working correctly
   - Verify analytics is tracking properly
   - Update any outdated content

2. **Quarterly:**
   - Review site performance in Netlify analytics
   - Update dependencies if needed
   - Test all pages on new browser versions

### Emergency Fixes

For urgent issues:

1. Create a hotfix branch from main:
   ```
   git checkout -b hotfix/issue-description
   ```

2. Make the necessary changes

3. Test thoroughly

4. Push and create a PR for immediate review and deployment

## Contact Information

For questions about deployment or issues, contact:

- Bryan Collins (Project Owner)
