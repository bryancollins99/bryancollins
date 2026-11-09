// Stamps the time-on-page and signup attribution inputs into every newsletter
// form before it submits, and sends anonymous form-funnel counts (Form Viewed,
// Form Started, Form Submitted) to PostHog without cookies or posthog-js.
// Forms still work without this script: a missing `elapsed` is not checked and
// the server falls back to `bryancollins@<lane>` for `source_surface`.
(function () {
  var loaded = Date.now();
  var POSTHOG_URL = 'https://eu.i.posthog.com/i/v0/e/';
  // Public PostHog EU project token (ships in every site's client snippet).
  var POSTHOG_KEY = 'phc_pBxJ3BtqHYzDS52caeqcRBzEmSd697fSc6BwCfnrLTXR'; // gitleaks:allow
  var SITE = 'bryancollins';
  var HOST = 'bryancollins.com';
  var phId = 'ph-' + Math.random().toString(36).slice(2, 10) + '-' + Date.now().toString(36);

  function isProdHost() {
    var h = (typeof location !== 'undefined' && location.hostname) ? location.hostname : '';
    return h === 'bryancollins.com' || h === 'www.bryancollins.com';
  }

  function isSubscribeForm(f) {
    return Boolean(f && f.matches && f.matches('form.bc-subscribe'));
  }

  function isContactForm(f) {
    return Boolean(f && f.matches && f.matches('form[name="contact"]'));
  }

  function isTrackedForm(f) {
    return isSubscribeForm(f) || isContactForm(f);
  }

  function findSectionId(f) {
    if (f.closest) {
      var s = f.closest('section[id]');
      return s && s.id ? s.id : '';
    }
    var cur = f.parentElement || f.parentNode;
    while (cur) {
      if (cur.tagName && String(cur.tagName).toUpperCase() === 'SECTION' && cur.id) {
        return cur.id;
      }
      cur = cur.parentElement || cur.parentNode;
    }
    return '';
  }

  function deriveFormSlug(f) {
    var explicit = (f.dataset && f.dataset.form) || (f.getAttribute && f.getAttribute('data-form'));
    if (explicit) return String(explicit).toLowerCase();
    if (isContactForm(f)) return 'contact';
    var laneEl = f.querySelector ? f.querySelector('input[name="lane"]') : null;
    var lane = (laneEl && laneEl.value) ? laneEl.value : 'hub';
    var secId = findSectionId(f);
    return String(lane + '-' + (secId || 'inline')).toLowerCase();
  }

  function parseUtms() {
    var out = { utm_source: '', utm_medium: '', utm_campaign: '' };
    var search = (typeof location !== 'undefined' && location.search) ? location.search : '';
    if (!search) return out;
    var q = search.charAt(0) === '?' ? search.slice(1) : search;
    var parts = q.split('&');
    for (var i = 0; i < parts.length; i++) {
      if (!parts[i]) continue;
      var eq = parts[i].indexOf('=');
      var k = eq === -1 ? parts[i] : parts[i].slice(0, eq);
      var v = eq === -1 ? '' : parts[i].slice(eq + 1);
      try {
        k = decodeURIComponent(k.replace(/\+/g, ' '));
        v = decodeURIComponent(v.replace(/\+/g, ' '));
      } catch (e) {}
      if (k === 'utm_source' || k === 'utm_medium' || k === 'utm_campaign') {
        out[k] = v;
      }
    }
    return out;
  }

  function getReferrerHost() {
    var ref = (typeof document !== 'undefined' && document.referrer) ? document.referrer : '';
    if (!ref) return '';
    try {
      return (new URL(ref).hostname || '').toLowerCase();
    } catch (e) {
      return '';
    }
  }

  function getPagePath() {
    var p = (typeof location !== 'undefined' && location.pathname) ? location.pathname : '/';
    return p.slice(0, 120);
  }

  function setHiddenInput(f, name, value) {
    var input = f.querySelector ? f.querySelector('input[name="' + name + '"]') : null;
    if (!input && typeof document !== 'undefined' && document.createElement && f.appendChild) {
      input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      f.appendChild(input);
    }
    if (input) input.value = value;
  }

  function sendPostHog(eventName, f) {
    if (!isProdHost()) return;
    var slug = deriveFormSlug(f);
    var utms = parseUtms();
    var refHost = getReferrerHost();
    var props = {
      $host: HOST,
      site: SITE,
      form_id: SITE + '@' + slug,
      signup_page: getPagePath(),
      utm_source: utms.utm_source,
      utm_medium: utms.utm_medium,
      utm_campaign: utms.utm_campaign,
      signup_referrer: refHost,
      $process_person_profile: false
    };
    var payload = JSON.stringify({
      api_key: POSTHOG_KEY,
      event: eventName,
      distinct_id: phId,
      properties: props
    });
    try {
      if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
        if (navigator.sendBeacon(POSTHOG_URL, payload)) return;
      }
    } catch (e) {}
    try {
      if (typeof fetch === 'function') {
        fetch(POSTHOG_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payload,
          keepalive: true
        })['catch'](function () {});
      }
    } catch (e) {}
  }

  function findAncestorForm(node) {
    if (!node) return null;
    if (node.closest) return node.closest('form.bc-subscribe, form[name="contact"]');
    var cur = node;
    while (cur) {
      if (isTrackedForm(cur)) return cur;
      cur = cur.parentElement || cur.parentNode;
    }
    return null;
  }

  document.addEventListener('focusin', function (e) {
    var f = findAncestorForm(e && e.target);
    if (!f || f.__bcStarted) return;
    f.__bcStarted = true;
    sendPostHog('Form Started', f);
  }, true);

  document.addEventListener('submit', function (e) {
    var f = e && e.target;
    if (!isTrackedForm(f)) return;
    var slug = deriveFormSlug(f);
    var utms = parseUtms();
    var refHost = getReferrerHost();

    if (isSubscribeForm(f)) {
      var el = f.querySelector('input[name="elapsed"]');
      if (el) el.value = String(Date.now() - loaded);
      setHiddenInput(f, 'form', slug);
      setHiddenInput(f, 'signup_utm_source', utms.utm_source);
      setHiddenInput(f, 'signup_utm_medium', utms.utm_medium);
      setHiddenInput(f, 'signup_utm_campaign', utms.utm_campaign);
      setHiddenInput(f, 'signup_referrer', refHost);
      setHiddenInput(f, 'ph_id', phId);
      if (typeof window !== 'undefined' && window.plausible) {
        window.plausible('Newsletter Signup', { props: { page: location.pathname } });
      }
    } else if (isContactForm(f)) {
      setHiddenInput(f, 'form_id', SITE + '@' + slug);
      setHiddenInput(f, 'signup_page', getPagePath());
    }

    sendPostHog('Form Submitted', f);
  }, true);

  function observeForms() {
    if (typeof IntersectionObserver === 'undefined' || !document.querySelectorAll) return;
    var forms = document.querySelectorAll('form.bc-subscribe, form[name="contact"]');
    if (!forms || !forms.length) return;
    var io = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          var f = entry.target;
          if (!f.__bcViewed) {
            f.__bcViewed = true;
            sendPostHog('Form Viewed', f);
          }
          io.unobserve(f);
        }
      }
    }, { threshold: 0.5 });
    for (var j = 0; j < forms.length; j++) {
      if (!forms[j].__bcObserved) {
        forms[j].__bcObserved = true;
        io.observe(forms[j]);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observeForms);
  } else {
    observeForms();
  }
})();
