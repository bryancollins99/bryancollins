// Shared inline calculator result capture + summary copy widget (R504)
// Mounts inside #calculator-capture-root[data-calculator="<source>"] and posts to
// /.netlify/functions/subscribe using NEWSLETTER-FORMS.md's exact payload shape.
(function () {
  var CALCULATORS = {
    'email-roi-calculator': {
      heading: 'Save Your Email ROI Model & Get Weekly Operator Notes',
      subcopy: 'Join Bryan Collins\'s newsletter for weekly notes on newsletter economics, Resend lifecycle setups, and AI coding workflows.',
      buttonText: 'Send Weekly Breakdowns',
      summarize: function () {
        var annual = textOf('annualRevenue') || '$0';
        var monthly = textOf('monthlyRevenue') || '$0';
        var perSub = textOf('valuePerSub') || '$0';
        var list = valOf('listSize') || '0';
        return 'Email ROI Snapshot: ' + annual + '/yr (' + monthly + '/mo, ' + perSub + '/subscriber across ' + list + ' subscribers)';
      }
    },
    'freelance-rate-calculator': {
      heading: 'Lock Your Rate Floor & Get Weekly Operator Breakdowns',
      subcopy: 'Get practical teardowns on pricing, positioning, and AI-assisted delivery from Bryan Collins.',
      buttonText: 'Send Weekly Breakdowns',
      summarize: function () {
        var minRate = textOf('hourlyRate') || '$0';
        var recRate = textOf('recommendedRate') || '$0';
        var dayRate = textOf('dailyRate') || '$0';
        var medProj = textOf('mediumProject') || '$0';
        return 'Freelance Rate Snapshot: ' + minRate + '/hr minimum, ' + recRate + '/hr recommended, ' + dayRate + '/day, ' + medProj + ' medium project';
      }
    },
    'position-sizing-calculator': {
      heading: 'Save Your Sizing Rules & Get Operator Field Notes',
      subcopy: 'Receive Bryan Collins\'s notes on systematic Wheel risk management, position caps, and software builds.',
      buttonText: 'Send Weekly Breakdowns',
      summarize: function () {
        var contracts = textOf('maxContracts') || '0';
        var shares = textOf('maxShares') || '0';
        var dollars = textOf('dollarAmount') || '$0';
        var risk = valOf('riskTolerance') || '0';
        return 'Position Sizing Snapshot: Max ' + contracts + ' contract(s) (' + shares + ' shares, ' + dollars + ' exposure at ' + risk + '% risk cap)';
      }
    }
  };

  function textOf(id) {
    var el = document.getElementById(id);
    return el ? String(el.textContent || '').trim() : '';
  }

  function valOf(id) {
    var el = document.getElementById(id);
    return el ? String(el.value || '').trim() : '';
  }

  function copySummary(text, btn) {
    var orig = btn.textContent;
    function done() {
      btn.textContent = 'Copied snapshot';
      setTimeout(function () { btn.textContent = orig; }, 2200);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done)['catch'](function () { fallbackCopy(text, done); });
    } else {
      fallbackCopy(text, done);
    }
  }

  function fallbackCopy(text, done) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta);
    done();
  }

  function mountWidget(root) {
    var source = root.getAttribute('data-calculator') || '';
    var cfg = CALCULATORS[source];
    if (!cfg) return;

    var emailInputId = 'calc-capture-email-' + source;

    root.innerHTML =
      '<div class="calc-capture-card" style="background:#111113;color:#fafafa;border-radius:10px;padding:24px;border:1px solid #2e2e34;box-shadow:0 4px 14px rgba(0,0,0,0.12);">' +
        '<div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:8px 12px;padding-bottom:14px;margin-bottom:16px;border-bottom:1px solid #2a2a30;">' +
          '<span id="calc-snapshot-line-' + source + '" style="font-size:13.5px;color:#e4e4e7;font-weight:600;"></span>' +
          '<button type="button" id="calc-copy-snapshot-' + source + '" style="background:#222227;color:#FFDE59;border:1px solid #3f3f46;border-radius:6px;padding:6px 12px;font-size:13px;font-weight:700;cursor:pointer;">Copy Result Summary</button>' +
        '</div>' +
        '<h3 style="font-size:1.2rem;font-weight:800;color:#ffffff;margin:0 0 6px;">' + cfg.heading + '</h3>' +
        '<p style="font-size:0.95rem;color:#d4d4d8;margin:0 0 16px;line-height:1.5;">' + cfg.subcopy + '</p>' +
        '<form class="bc-subscribe" data-form="' + source + '" data-source="' + source + '" action="/.netlify/functions/subscribe" method="post">' +
          '<input type="hidden" name="lane" value="newsletter">' +
          '<input type="hidden" name="form" value="' + source + '">' +
          '<input type="hidden" name="source" value="' + source + '">' +
          '<input type="hidden" name="elapsed" value="">' +
          '<div style="position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;" aria-hidden="true">' +
            '<label>Leave this empty<input type="text" name="website" tabindex="-1" autocomplete="off"></label>' +
          '</div>' +
          '<div style="display:flex;flex-wrap:wrap;gap:10px;">' +
            '<label for="' + emailInputId + '" class="sr-only" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);">Email address</label>' +
            '<input id="' + emailInputId + '" type="email" name="email" placeholder="you@company.com" autocomplete="email" required style="flex:1 1 210px;min-width:0;padding:12px 14px;border-radius:6px;border:1px solid #3f3f46;background:#1c1c20;color:#ffffff;font-size:15px;">' +
            '<button type="submit" style="background:#FFDE59;color:#111113;font-weight:700;font-size:15px;padding:12px 20px;border:none;border-radius:6px;cursor:pointer;white-space:nowrap;">' + cfg.buttonText + '</button>' +
          '</div>' +
          '<p id="calc-capture-status-' + source + '" role="status" aria-live="polite" style="margin:10px 0 0;font-size:13.5px;font-weight:600;color:#FFDE59;"></p>' +
          '<p style="margin:8px 0 0;font-size:12.5px;color:#a1a1aa;">Unsubscribe any time. Read <a href="/newsletter/archive" style="color:#FFDE59;text-decoration:underline;">past operator issues</a> or explore <a href="/skills/" style="color:#FFDE59;text-decoration:underline;">Claude Code skills</a>.</p>' +
        '</form>' +
      '</div>';

    var snapshotEl = document.getElementById('calc-snapshot-line-' + source);
    var copyBtn = document.getElementById('calc-copy-snapshot-' + source);
    var form = root.querySelector('form.bc-subscribe');
    var statusEl = document.getElementById('calc-capture-status-' + source);

    function refreshSnapshot() {
      if (snapshotEl) snapshotEl.textContent = cfg.summarize();
    }
    refreshSnapshot();

    document.addEventListener('input', refreshSnapshot);
    document.addEventListener('change', refreshSnapshot);
    document.addEventListener('submit', function () {
      setTimeout(refreshSnapshot, 360);
    });

    if (copyBtn) {
      copyBtn.addEventListener('click', function () {
        copySummary(cfg.summarize() + ' | Calculated at https://bryancollins.com/' + source, copyBtn);
      });
    }

    if (form && typeof fetch === 'function') {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var submitBtn = form.querySelector('button[type="submit"]');
        var origText = submitBtn ? submitBtn.textContent : '';
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Subscribing...';
        }
        if (statusEl) statusEl.textContent = '';

        var payload = new URLSearchParams(new FormData(form)).toString();
        fetch(form.action, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: payload
        }).then(function (res) {
          if (res.ok) {
            if (statusEl) {
              statusEl.textContent = 'You are subscribed. Weekly operator breakdowns will land in your inbox.';
            }
            form.reset();
          } else {
            if (statusEl) {
              statusEl.textContent = 'Could not complete signup right now. Please check your email address and try again.';
            }
          }
        })['catch'](function () {
          form.submit();
        })['finally'](function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = origText;
          }
        });
      });
    }
  }

  function initAll() {
    var roots = document.querySelectorAll('#calculator-capture-root[data-calculator], .calculator-capture-root[data-calculator]');
    for (var i = 0; i < roots.length; i++) {
      if (!roots[i].__bcMounted) {
        roots[i].__bcMounted = true;
        mountWidget(roots[i]);
      }
    }
  }

  // Run immediately if DOM is already parsed (defer script), else on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
