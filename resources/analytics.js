/**
 * Plausible Analytics Custom Events
 * This file contains all custom event tracking for landing pages
 */

// Track form submissions
function setupFormTracking() {
    var form = document.getElementById('subscribe-form');
    if (form) {
        form.addEventListener('submit', function() {
            plausible('FormSubmission', {
                props: {
                    page: document.title,
                    form: window.location.pathname
                }
            });
        });
    }
}

// Track outbound link clicks
function setupOutboundLinkTracking() {
    var links = document.querySelectorAll('a[href^="https://"]');
    links.forEach(function(link) {
        if (!link.hostname.includes('bryancollins.com')) {
            link.addEventListener('click', function() {
                plausible('Outbound Link', {
                    props: {
                        destination: link.hostname
                    }
                });
            });
        }
    });
}

// Track thank you page conversions
function trackConversion() {
    if (window.location.pathname.includes('thank-you')) {
        var form = '';
        try { form = new URLSearchParams(window.location.search).get('form') || ''; } catch (e) {}
        plausible('Conversion', {
            props: {
                source: document.referrer,
                form: form
            }
        });
    }
}

// Initialize all tracking
document.addEventListener('DOMContentLoaded', function() {
    setupFormTracking();
    setupOutboundLinkTracking();
    trackConversion();
});
