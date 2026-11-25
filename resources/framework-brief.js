// Shared Markdown Strategy Brief exporter + cross-links for MBA Framework Calculators (R502)
// Extracts live typed inputs and optional AI insights into paste-ready Markdown for Claude or Notion.
(function () {
  var CONFIGS = {
    'ansoff': {
      title: 'Ansoff Matrix Growth Strategy Brief',
      url: 'https://bryancollins.com/ansoff-matrix',
      contextFields: [
        { label: 'Current Product / Offer', id: 'current-product' },
        { label: 'Current Primary Audience', id: 'current-audience' }
      ],
      sections: [
        { heading: 'Market Penetration (Existing Product + Existing Market)', id: 'penetration', enhancedId: 'enhanced-penetration' },
        { heading: 'Market Development (Existing Product + New Market)', id: 'development', enhancedId: 'enhanced-development' },
        { heading: 'Product Development (New Product + Existing Market)', id: 'product', enhancedId: 'enhanced-product-dev' },
        { heading: 'Diversification (New Product + New Market)', id: 'diversification', enhancedId: 'enhanced-diversification' }
      ],
      agentPrompt: 'Rank these four growth options by expected 90-day impact vs execution risk, and identify the single lowest-risk bet to test first.'
    },
    'porters-five-forces': {
      title: "Porter's Five Forces Competitive Strategy Brief",
      url: 'https://bryancollins.com/porters-five-forces',
      sections: [
        { heading: '1. Threat of New Entrants', id: 'entrants-analysis', ratingId: 'entrants-rating' },
        { heading: '2. Bargaining Power of Buyers', id: 'buyers-analysis', ratingId: 'buyers-rating' },
        { heading: '3. Threat of Substitutes', id: 'substitutes-analysis', ratingId: 'substitutes-rating' },
        { heading: '4. Bargaining Power of Suppliers & Platforms', id: 'suppliers-analysis', ratingId: 'suppliers-rating' },
        { heading: '5. Competitive Rivalry', id: 'rivalry-analysis', ratingId: 'rivalry-rating' }
      ],
      agentPrompt: 'Identify which force poses the sharpest threat to margins right now and propose two concrete moat-building actions.'
    },
    'pestel': {
      title: 'PESTEL Macro-Environment Strategy Brief',
      url: 'https://bryancollins.com/pestel-analysis',
      sections: [
        { heading: 'Political Factors', id: 'political' },
        { heading: 'Economic Factors', id: 'economic' },
        { heading: 'Social Factors', id: 'social' },
        { heading: 'Technological Factors', id: 'technological' },
        { heading: 'Environmental Factors', id: 'environmental' },
        { heading: 'Legal & Regulatory Factors', id: 'legal' }
      ],
      agentPrompt: 'Separate these external factors into near-term tailwinds to exploit and compliance or platform risks that need a contingency plan.'
    },
    'swot': {
      title: 'SWOT Strategic Matrix Brief',
      url: 'https://bryancollins.com/swot-analysis',
      sections: [
        { heading: 'Strengths (Internal Advantages)', id: 'strengths', enhancedId: 'enhanced-strengths' },
        { heading: 'Weaknesses (Internal Constraints)', id: 'weaknesses', enhancedId: 'enhanced-weaknesses' },
        { heading: 'Opportunities (External Tailwinds)', id: 'opportunities', enhancedId: 'enhanced-opportunities' },
        { heading: 'Threats (External Risks)', id: 'threats', enhancedId: 'enhanced-threats' }
      ],
      agentPrompt: 'Pair my top Strengths with the highest-leverage Opportunities (SO plays) and flag any Weakness + Threat combinations that could stall growth.'
    },
    'value-chain': {
      title: 'Value Chain Margin & Operations Brief',
      url: 'https://bryancollins.com/value-chain',
      sections: [
        { heading: 'Primary: Inbound Logistics & Research', id: 'inbound' },
        { heading: 'Primary: Operations & Creation', id: 'operations' },
        { heading: 'Primary: Outbound Distribution', id: 'outbound' },
        { heading: 'Primary: Marketing & Sales', id: 'marketing' },
        { heading: 'Primary: Service & Retention', id: 'service' },
        { heading: 'Support: Infrastructure & Systems', id: 'infrastructure' },
        { heading: 'Support: Human Resources & Team', id: 'hr' },
        { heading: 'Support: Technology Stack', id: 'technology' },
        { heading: 'Support: Procurement & Vendors', id: 'procurement' }
      ],
      agentPrompt: 'Pinpoint the main bottleneck in my primary value flow, which step creates real differentiation, and what should be automated or delegated first.'
    },
    'mckinsey-7s': {
      title: 'McKinsey 7S Organizational Alignment Brief',
      url: 'https://bryancollins.com/mckinsey-7s',
      sections: [
        { heading: 'Shared Values (Core)', id: 'shared-values' },
        { heading: 'Strategy', id: 'strategy' },
        { heading: 'Structure', id: 'structure' },
        { heading: 'Systems', id: 'systems' },
        { heading: 'Style', id: 'style' },
        { heading: 'Staff', id: 'staff' },
        { heading: 'Skills', id: 'skills' }
      ],
      agentPrompt: 'Audit these 7 elements for contradictions (for example, a strategy that current systems or skills cannot support) and recommend the first alignment fix.'
    }
  };

  function detectKey() {
    var script = document.querySelector('script[src*="framework-brief.js"][data-framework]');
    if (script) {
      var attr = script.getAttribute('data-framework');
      if (attr && CONFIGS[attr]) return attr;
    }
    var p = (typeof location !== 'undefined' && location.pathname) ? location.pathname.toLowerCase() : '';
    if (p.indexOf('ansoff') !== -1) return 'ansoff';
    if (p.indexOf('porters-five-forces') !== -1) return 'porters-five-forces';
    if (p.indexOf('pestel') !== -1) return 'pestel';
    if (p.indexOf('swot') !== -1) return 'swot';
    if (p.indexOf('value-chain') !== -1) return 'value-chain';
    if (p.indexOf('mckinsey-7s') !== -1) return 'mckinsey-7s';
    return null;
  }

  function valOf(id) {
    var el = document.getElementById(id);
    if (!el) return '';
    return String(el.value || '').trim();
  }

  function enhancedItemsOf(id) {
    if (!id) return [];
    var el = document.getElementById(id);
    if (!el || el.style.display === 'none') return [];
    var lis = el.querySelectorAll('li');
    var out = [];
    for (var i = 0; i < lis.length; i++) {
      var t = String(lis[i].textContent || '').trim();
      if (t) out.push(t);
    }
    return out;
  }

  function buildBriefMarkdown(cfg) {
    var today = new Date().toISOString().split('T')[0];
    var lines = [
      '# ' + cfg.title,
      '',
      'Date: ' + today,
      'Source tool: ' + cfg.url,
      ''
    ];

    if (cfg.contextFields && cfg.contextFields.length) {
      lines.push('## Baseline Context');
      lines.push('');
      for (var c = 0; c < cfg.contextFields.length; c++) {
        var cf = cfg.contextFields[c];
        lines.push('- **' + cf.label + ':** ' + (valOf(cf.id) || 'Not specified yet'));
      }
      lines.push('');
    }

    for (var i = 0; i < cfg.sections.length; i++) {
      var sec = cfg.sections[i];
      var header = '## ' + sec.heading;
      if (sec.ratingId) {
        var rating = valOf(sec.ratingId);
        header += ' [' + (rating ? rating.toUpperCase() : 'UNRATED') + ']';
      }
      lines.push(header);
      lines.push('');
      lines.push(valOf(sec.id) || '_Not filled in yet._');
      var aiItems = enhancedItemsOf(sec.enhancedId);
      if (aiItems.length) {
        lines.push('');
        lines.push('### AI Recommendations');
        for (var a = 0; a < aiItems.length; a++) {
          lines.push('- ' + aiItems[a]);
        }
      }
      lines.push('');
    }

    lines.push('---');
    lines.push('');
    lines.push('## Next-Step Agent Review Prompt');
    lines.push('');
    lines.push(cfg.agentPrompt + ' Pair with `/decide` or `/explain` from https://bryancollins.com/skills/.');
    return lines.join('\n');
  }

  function copyToClipboard(text, onDone) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(onDone)['catch'](function () {
        fallbackCopy(text, onDone);
      });
    } else {
      fallbackCopy(text, onDone);
    }
  }

  function fallbackCopy(text, onDone) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta);
    onDone();
  }

  function flashToast(msg) {
    var note = document.createElement('div');
    note.setAttribute('role', 'status');
    note.setAttribute('aria-live', 'polite');
    note.style.cssText = 'position:fixed;bottom:20px;right:20px;background:#111827;color:#FFDE59;border:1px solid #FFDE59;padding:12px 18px;border-radius:10px;font-weight:700;font-size:14px;z-index:10000;box-shadow:0 8px 24px rgba(0,0,0,0.3);';
    note.textContent = msg;
    document.body.appendChild(note);
    setTimeout(function () {
      if (note.parentNode) note.parentNode.removeChild(note);
    }, 3000);
  }

  function makeCopyButton(cfg, extraStyle) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn-secondary framework-copy-brief-btn';
    btn.setAttribute('data-action', 'copy-markdown-brief');
    if (extraStyle) btn.style.cssText = extraStyle;
    var defaultHtml = '<i class="fas fa-copy mr-2"></i>Copy Markdown Strategy Brief';
    btn.innerHTML = defaultHtml;
    btn.addEventListener('click', function () {
      var md = buildBriefMarkdown(cfg);
      copyToClipboard(md, function () {
        btn.innerHTML = '<i class="fas fa-check mr-2"></i>Copied Markdown Brief';
        flashToast('Copied Markdown Strategy Brief for Claude or Notion.');
        if (typeof window !== 'undefined' && window.plausible) {
          window.plausible('Markdown Brief Copied', { props: { framework: cfg.title } });
        }
        setTimeout(function () {
          btn.innerHTML = defaultHtml;
        }, 2500);
      });
    });
    return btn;
  }

  function init() {
    var key = detectKey();
    if (!key) return;
    var cfg = CONFIGS[key];

    // 1. Mount beside the existing Download as PDF action control on the review step
    var pdfBtn = document.querySelector('button[onclick*="downloadPDF"]');
    if (pdfBtn && pdfBtn.parentNode) {
      var row = pdfBtn.parentNode;
      row.style.flexWrap = 'wrap';
      row.style.gap = '12px';

      var rightGroup = document.createElement('div');
      rightGroup.style.cssText = 'display:flex;flex-wrap:wrap;gap:12px;align-items:center;';
      row.insertBefore(rightGroup, pdfBtn);
      rightGroup.appendChild(makeCopyButton(cfg));
      rightGroup.appendChild(pdfBtn);

      var crossBar = document.createElement('div');
      crossBar.className = 'framework-brief-links';
      crossBar.style.cssText = 'margin-top:16px;padding:14px 16px;border-radius:10px;border:1px solid rgba(149,111,166,0.35);background:rgba(149,111,166,0.08);font-size:14px;line-height:1.55;';
      crossBar.innerHTML = '<strong>Use with AI coding &amp; strategy agents:</strong> Copy your Markdown brief into Claude or Notion, compare more models in <a href="/mba-frameworks" style="text-decoration:underline;font-weight:700;">MBA Strategy Frameworks</a>, or lock open decisions with <code>/decide</code> from <a href="/skills/" style="text-decoration:underline;font-weight:700;">Claude Code Agent Skills</a>.';
      if (row.parentNode) {
        row.parentNode.appendChild(crossBar);
      }
    }

    // 2. Also hydrate any explicit #framework-brief-mount placeholder if present
    var mount = document.getElementById('framework-brief-mount');
    if (mount) {
      mount.innerHTML = '';
      mount.appendChild(makeCopyButton(cfg));
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
