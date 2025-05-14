# ConvertKit Integration Guide

This document outlines how to implement ConvertKit forms across all landing pages in this project.

## Recommended Implementation: JavaScript Embed

The simplest and most reliable way to implement ConvertKit forms is using their JavaScript embed approach:

```html
<script async data-uid="FORM_UID" src="https://become-a-writer-today.kit.com/FORM_UID/index.js"></script>
```

This approach has several advantages:
- Automatically styled to match ConvertKit's design
- Handles all form submission logic
- Manages redirects to thank you pages
- Updates automatically if you change settings in ConvertKit
- Simplifies implementation across all landing pages

## Form UIDs for Each Landing Page

| Landing Page | Form UID |
|--------------|----------|
| 101 AI Prompts (Medium) | ebb3352c56 |
| 101 AI Prompts (LinkedIn) | a691970cbd |
| 101 AI Prompts (Apollo) | 4320c0576d |
| 101 AI Prompts (YouTube) | 426c2157ed |
| LinkedIn Hooks | [Get from ConvertKit] |
| SaaS Founders | [Get from ConvertKit] |

## How to Get Your Form UID

1. Log in to your ConvertKit account
2. Go to the form you want to embed
3. Click on "Embed" or "Share"
4. Select "JavaScript" as the embed type
5. Copy the entire script tag, which will look like:
   ```html
   <script async data-uid="ebb3352c56" src="https://become-a-writer-today.kit.com/ebb3352c56/index.js"></script>
   ```
6. The `data-uid` attribute value is your Form UID

## Configuring Your ConvertKit Form Settings

### Setting Up the Thank You Page Redirect

1. Log in to your ConvertKit account
2. Go to the form you want to configure
3. Click on "Settings"
4. Under "What should happen after someone subscribes?", select "Redirect to a custom page"
5. Enter `https://join.bryancollins.com/thank-you.html` as the redirect URL
6. Save your changes

### Adding Tags for Tracking

1. In ConvertKit, go to the form settings
2. Click on "Settings" > "General"
3. Under "Tags", add a specific tag for each landing page (e.g., "medium-prompts")
4. This helps you track which landing page generated each subscriber

## Analytics Integration

The form submission events are automatically tracked by the `analytics.js` script. When a visitor reaches your thank you page, the following event is fired:

```javascript
plausible('Conversion', {
    props: {
        source: document.referrer
    }
});
```

## Testing Forms

To test your ConvertKit forms:

1. View your landing page and fill out the form with a test email address
2. Check that you are redirected to the thank you page
3. Verify in ConvertKit that the subscriber was added with the correct tag
4. Check Plausible Analytics to confirm the conversion event was recorded

## Troubleshooting

- If the form doesn't appear, check that the UID in the script tag is correct
- If the redirect isn't working, verify the redirect URL in the ConvertKit form settings
- If the form styling doesn't match your site, you can customize it in ConvertKit's form designer
- If analytics events aren't firing, ensure the analytics.js script is loaded on your thank you page
