/**
 * Plausible Analytics Custom Events
 * This file contains all custom event tracking for landing pages
 */

// Track form submissions (both regular forms and ConvertKit JavaScript forms)
function setupFormTracking() {
    // Track regular HTML forms
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
    
    // Track ConvertKit JavaScript forms
    setupConvertKitFormTracking();
}

// Track ConvertKit JavaScript forms
function setupConvertKitFormTracking() {
    // Wait for ConvertKit to load their form
    var checkExist = setInterval(function() {
        // Look for any form with a ConvertKit class
        var ckForms = document.querySelectorAll('form[data-sv-form]');
        if (ckForms.length) {
            clearInterval(checkExist);
            
            // Add event listeners to all ConvertKit forms
            ckForms.forEach(function(ckForm) {
                ckForm.addEventListener('submit', function(e) {
                    // Track the form submission event
                    plausible('FormSubmission', {
                        props: {
                            page: document.title,
                            form: 'ConvertKit-' + ckForm.getAttribute('data-sv-form'),
                            type: 'javascript-embed'
                        }
                    });
                    
                    // Store a flag in localStorage to detect successful submission
                    localStorage.setItem('ck_form_submitted', 'true');
                    
                    // We'll handle the redirect in another function
                });
            });
            
            // Add a global event listener for ConvertKit's success event
            window.addEventListener('message', function(event) {
                try {
                    var data = JSON.parse(event.data);
                    if (data && data.type === 'formSubmissionSuccess') {
                        // Track successful submission
                        plausible('FormSubmissionSuccess', {
                            props: {
                                page: document.title,
                                formId: data.formId || 'unknown'
                            }
                        });
                        
                        // Redirect to thank you page after a short delay
                        setTimeout(function() {
                            window.location.href = '/thank-you.html';
                        }, 500);
                    }
                } catch (e) {
                    // Not a JSON message or other error, ignore
                }
            });
        }
    }, 100); // check every 100ms
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
        plausible('Conversion', {
            props: {
                source: document.referrer
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
