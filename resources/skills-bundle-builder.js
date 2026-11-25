// Interactive Claude Code & Agent Stack Bundle Builder (R451)
// Pure client-side generator for AGENTS.md / CLAUDE.md rules and .claude/commands/*.md installer.
(function () {
  var STACK_RULES = {
    'astro-static': {
      label: 'Astro / Static',
      rules: [
        'Run `npm run build` (or static HTML link and schema checks) before every commit so broken routes never reach production.',
        'Prefer static prerendered HTML and lightweight vanilla JS over heavy client hydration bundles.',
        'Keep canonical URLs, Open Graph tags, `sitemap.xml`, and `WebApplication` or `FAQPage` JSON-LD valid on every tool route.'
      ]
    },
    'nextjs-react': {
      label: 'Next.js / React',
      rules: [
        'Run `npm run lint`, `npx tsc --noEmit`, and a production build check before opening a pull request.',
        'Keep secrets and API tokens strictly inside server routes or server actions, never `NEXT_PUBLIC_*` client bundles.',
        'Verify empty, loading, and error states on screen before marking UI work complete.'
      ]
    },
    'python-cli': {
      label: 'Python / CLI',
      rules: [
        'Run `pytest` inside the project virtual environment and test CLI entrypoints with `--help` and a dry-run flag.',
        'Run `/pre-commit-review` before committing parsers, financial math, SQL `LIMIT` + filter queries, or schema changes.',
        'Prefer deterministic scripts over repeated model passes for recurring audits and file scans.'
      ]
    },
    'netlify': {
      label: 'Netlify',
      rules: [
        'Verify required `process.env.*` variables are set on the `production` context via `/wiring`, not only deploy previews.',
        'Check Netlify deploy status and test deep-linked Deploy Preview routes before merging.',
        'Protect form and function endpoints with origin checks, honeypots, and rate limits.'
      ]
    },
    'cloudflare-workers': {
      label: 'Cloudflare Workers',
      rules: [
        'Keep `wrangler.jsonc` / `wrangler.toml` bindings explicit and avoid module-level mutable request state across warm isolates.',
        'Await or `ctx.waitUntil()` every background promise so telemetry and webhook calls are never dropped.',
        'Validate webhook signatures and input schemas at the Worker edge before touching D1, KV, or R2.'
      ]
    },
    'github-actions': {
      label: 'GitHub Actions',
      rules: [
        'Audit scheduled `cron` workflows monthly with `/cron-staleness` to catch 60-day inactivity disables and silent exits.',
        'Assert on output freshness (rows written, artefacts created), not exit code `0` alone.',
        'Cross-check `.github/workflows/*.yml` `secrets.*` references against configured repo secrets using `/wiring`.'
      ]
    },
    'markdown-vault': {
      label: 'Markdown Vault / Notes',
      rules: [
        'Save generated reports and ledgers in the vault root with ISO dates (`Report-YYYY-MM-DD.md`), never nested subfolders.',
        'Treat personal journal files as read-only theme signals; never overwrite or quote private entries.',
        'Use `/notes-to-ideas` for cited retrieval and `/remember` to capture durable decisions with explicit review dates.'
      ]
    }
  };

  var STACK_SKILLS = {
    'astro-static': ['pre-commit-review', 'branch-cleanup', 'wiring', 'log-issue', 'fix-cluster', 'best-of-both', 'decide', 'explain'],
    'nextjs-react': ['pre-commit-review', 'merge-conflict-walkthrough', 'rebase-plan', 'branch-cleanup', 'wiring', 'log-issue', 'fix-cluster', 'best-of-both', 'decide', 'explain'],
    'python-cli': ['pre-commit-review', 'merge-conflict-walkthrough', 'rebase-plan', 'branch-cleanup', 'log-issue', 'fix-cluster', 'cron-staleness', 'decide', 'remember'],
    'netlify': ['wiring', 'log-issue', 'fix-cluster', 'cron-staleness', 'explain'],
    'cloudflare-workers': ['pre-commit-review', 'wiring', 'log-issue', 'fix-cluster', 'cron-staleness'],
    'github-actions': ['branch-cleanup', 'wiring', 'cron-staleness', 'log-issue'],
    'markdown-vault': ['decide', 'explain', 'notes-to-ideas', 'remember']
  };

  var RAW_BASE = 'https://raw.githubusercontent.com/bryancollins99/agent-skills/main/skills/';
  var REPO_URL = 'https://github.com/bryancollins99/agent-skills';

  function init() {
    var root = document.getElementById('skills-bundle-builder');
    if (!root) return;

    var dataEl = document.getElementById('skills-bundle-data');
    var skills = [];
    try {
      skills = JSON.parse(dataEl ? dataEl.textContent : '[]');
    } catch (e) {
      skills = [];
    }
    if (!skills.length) return;

    var skillMap = {};
    for (var i = 0; i < skills.length; i++) {
      skillMap[skills[i].name] = skills[i];
    }

    var chips = Array.prototype.slice.call(root.querySelectorAll('.stack-chip[data-stack]'));
    var checkboxes = Array.prototype.slice.call(root.querySelectorAll('input.skill-checkbox[data-skill]'));
    var tabs = Array.prototype.slice.call(root.querySelectorAll('.bundle-tab[data-tab]'));
    var previewCode = document.getElementById('bundle-preview-code');
    var countEl = document.getElementById('bundle-selected-count');
    var copyBtn = document.getElementById('copy-agents-md');
    var dlShBtn = document.getElementById('download-sh-bundle');
    var dlMdBtn = document.getElementById('download-md-bundle');
    var actionFeedback = document.getElementById('bundle-action-feedback');
    var selectRecBtn = document.getElementById('skills-select-recommended');
    var selectAllBtn = document.getElementById('skills-select-all');
    var clearAllBtn = document.getElementById('skills-clear-all');

    var activeTab = 'agents';

    function getActiveStacks() {
      var list = [];
      for (var j = 0; j < chips.length; j++) {
        if (chips[j].getAttribute('aria-pressed') === 'true') {
          list.push(chips[j].getAttribute('data-stack'));
        }
      }
      return list;
    }

    function getRecommendedSet(stacks) {
      var rec = {};
      for (var j = 0; j < stacks.length; j++) {
        var names = STACK_SKILLS[stacks[j]] || [];
        for (var k = 0; k < names.length; k++) {
          rec[names[k]] = true;
        }
      }
      return rec;
    }

    function getSelectedSkills() {
      var out = [];
      for (var j = 0; j < checkboxes.length; j++) {
        if (checkboxes[j].checked) {
          var name = checkboxes[j].getAttribute('data-skill');
          if (skillMap[name]) out.push(skillMap[name]);
        }
      }
      return out;
    }

    function syncSkillCards(recSet) {
      for (var j = 0; j < checkboxes.length; j++) {
        var cb = checkboxes[j];
        var name = cb.getAttribute('data-skill');
        var card = cb.closest ? cb.closest('.skill-pick-item') : cb.parentNode;
        if (card) {
          if (cb.checked) card.classList.add('is-checked');
          else card.classList.remove('is-checked');
          var pill = card.querySelector('.rec-pill');
          if (pill) {
            pill.hidden = !recSet[name];
          }
        }
      }
    }

    function applyRecommendedSelection() {
      var stacks = getActiveStacks();
      var recSet = getRecommendedSet(stacks);
      for (var j = 0; j < checkboxes.length; j++) {
        var name = checkboxes[j].getAttribute('data-skill');
        checkboxes[j].checked = Boolean(recSet[name]);
      }
      syncSkillCards(recSet);
      renderPreview();
    }

    function buildAgentsMarkdown(stacks, selected) {
      var stackLabels = [];
      var rules = [];
      for (var j = 0; j < stacks.length; j++) {
        var st = STACK_RULES[stacks[j]];
        if (st) {
          stackLabels.push(st.label);
          for (var r = 0; r < st.rules.length; r++) {
            rules.push('- **' + st.label + ':** ' + st.rules[r]);
          }
        }
      }
      if (!stackLabels.length) {
        stackLabels.push('General Repository');
        rules.push('- Run tests, linter, and build verification before committing.');
      }

      var lines = [
        '# AGENTS.md (and CLAUDE.md)',
        '',
        'Stack profile: ' + stackLabels.join(', '),
        'Generated via https://bryancollins.com/skills/',
        '',
        '## Working Rules',
        '',
        '- Branch from `origin/main` before multi-file edits. Never run `git add -A` or `git add .` when untracked artefacts or symlinked `node_modules` exist.',
        '- Cite file paths, command output, or API responses for factual claims. Prefix unverified assumptions with `UNVERIFIED ASSUMPTION:`.',
        '- Never claim a bug is fixed until a reproduction check fails before and passes after.'
      ];

      for (var m = 0; m < rules.length; m++) {
        lines.push(rules[m]);
      }

      lines.push('');
      lines.push('## Installed Slash Commands (`.claude/commands/`)');
      lines.push('');

      if (!selected.length) {
        lines.push('No slash commands selected yet. Tick one or more skills in Step 2 to populate your playbook.');
      } else {
        for (var s = 0; s < selected.length; s++) {
          lines.push('- `/' + selected[s].name + '` (' + selected[s].group + '): ' + selected[s].summary);
        }
      }

      lines.push('');
      lines.push('Source repository (MIT licensed): ' + REPO_URL);
      return lines.join('\n');
    }

    function buildInstallerScript(stacks, selected) {
      var stackLabels = [];
      for (var j = 0; j < stacks.length; j++) {
        if (STACK_RULES[stacks[j]]) stackLabels.push(STACK_RULES[stacks[j]].label);
      }
      var lines = [
        '#!/usr/bin/env bash',
        'set -euo pipefail',
        '',
        '# Claude Code Skill Bundle Installer',
        '# Stack: ' + (stackLabels.length ? stackLabels.join(', ') : 'Custom'),
        '# Generated from https://bryancollins.com/skills/',
        '',
        'TARGET_DIR="${1:-.claude/commands}"',
        'mkdir -p "$TARGET_DIR"',
        ''
      ];

      if (!selected.length) {
        lines.push('echo "Select at least one skill on https://bryancollins.com/skills/ to generate curl commands."');
      } else {
        lines.push('SKILLS=(');
        for (var s = 0; s < selected.length; s++) {
          lines.push('  "' + selected[s].name + '"');
        }
        lines.push(')');
        lines.push('');
        lines.push('for skill in "${SKILLS[@]}"; do');
        lines.push('  echo "Installing /${skill} -> ${TARGET_DIR}/${skill}.md"');
        lines.push('  curl -fsSL "' + RAW_BASE + '${skill}.md" -o "${TARGET_DIR}/${skill}.md"');
        lines.push('done');
        lines.push('');
        lines.push('echo "Installed ' + selected.length + ' Claude Code skill(s) into ${TARGET_DIR}."');
        lines.push('echo "Tip: pass ~/.claude/commands as the first argument to install globally."');
      }
      return lines.join('\n');
    }

    function buildFullMarkdownBundle(stacks, selected) {
      var agentsMd = buildAgentsMarkdown(stacks, selected);
      var shScript = buildInstallerScript(stacks, selected);
      var out = [
        agentsMd,
        '',
        '---',
        '',
        '## Quick Install Script',
        '',
        '```bash',
        shScript,
        '```',
        '',
        '## Skill Reference Links',
        ''
      ];
      for (var s = 0; s < selected.length; s++) {
        out.push('- [/' + selected[s].name + '](https://bryancollins.com/skills/' + selected[s].name + ') (' + RAW_BASE + selected[s].name + '.md)');
      }
      return out.join('\n');
    }

    function renderPreview() {
      var stacks = getActiveStacks();
      var recSet = getRecommendedSet(stacks);
      syncSkillCards(recSet);
      var selected = getSelectedSkills();
      if (countEl) {
        countEl.textContent = selected.length + ' of ' + skills.length + ' selected';
      }
      if (previewCode) {
        previewCode.textContent = activeTab === 'agents'
          ? buildAgentsMarkdown(stacks, selected)
          : buildInstallerScript(stacks, selected);
      }
    }

    function showFeedback(msg) {
      if (!actionFeedback) return;
      actionFeedback.textContent = msg;
      clearTimeout(actionFeedback.__timer);
      actionFeedback.__timer = setTimeout(function () {
        actionFeedback.textContent = '';
      }, 3500);
    }

    function triggerDownload(filename, content, mime) {
      var blob = new Blob([content], { type: mime || 'text/plain;charset=utf-8' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    }

    function copyText(text, doneMsg) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
          showFeedback(doneMsg);
        })['catch'](function () {
          fallbackCopy(text, doneMsg);
        });
      } else {
        fallbackCopy(text, doneMsg);
      }
    }

    function fallbackCopy(text, doneMsg) {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        showFeedback(doneMsg);
      } catch (e) {
        showFeedback('Press Cmd+C / Ctrl+C inside the preview box to copy.');
      }
      document.body.removeChild(ta);
    }

    for (var c = 0; c < chips.length; c++) {
      chips[c].addEventListener('click', function () {
        var pressed = this.getAttribute('aria-pressed') === 'true';
        this.setAttribute('aria-pressed', pressed ? 'false' : 'true');
        applyRecommendedSelection();
      });
    }

    for (var k = 0; k < checkboxes.length; k++) {
      checkboxes[k].addEventListener('change', function () {
        renderPreview();
      });
    }

    for (var t = 0; t < tabs.length; t++) {
      tabs[t].addEventListener('click', function () {
        activeTab = this.getAttribute('data-tab') || 'agents';
        for (var u = 0; u < tabs.length; u++) {
          tabs[u].setAttribute('aria-selected', tabs[u] === this ? 'true' : 'false');
        }
        renderPreview();
      });
    }

    if (selectRecBtn) {
      selectRecBtn.addEventListener('click', function () {
        applyRecommendedSelection();
        showFeedback('Selected skills recommended for your stack.');
      });
    }
    if (selectAllBtn) {
      selectAllBtn.addEventListener('click', function () {
        for (var j = 0; j < checkboxes.length; j++) checkboxes[j].checked = true;
        renderPreview();
        showFeedback('Selected all ' + skills.length + ' skills.');
      });
    }
    if (clearAllBtn) {
      clearAllBtn.addEventListener('click', function () {
        for (var j = 0; j < checkboxes.length; j++) checkboxes[j].checked = false;
        renderPreview();
        showFeedback('Cleared selection.');
      });
    }

    if (copyBtn) {
      copyBtn.addEventListener('click', function () {
        var md = buildAgentsMarkdown(getActiveStacks(), getSelectedSkills());
        copyText(md, 'Copied combined AGENTS.md to clipboard.');
      });
    }
    if (dlShBtn) {
      dlShBtn.addEventListener('click', function () {
        var sh = buildInstallerScript(getActiveStacks(), getSelectedSkills());
        triggerDownload('install-claude-skills.sh', sh, 'text/x-shellscript;charset=utf-8');
        showFeedback('Downloaded install-claude-skills.sh');
      });
    }
    if (dlMdBtn) {
      dlMdBtn.addEventListener('click', function () {
        var md = buildFullMarkdownBundle(getActiveStacks(), getSelectedSkills());
        triggerDownload('claude-stack-bundle.md', md, 'text/markdown;charset=utf-8');
        showFeedback('Downloaded claude-stack-bundle.md');
      });
    }

    var bundleForm = root.querySelector('form.bundle-signup');
    var bundleStatus = document.getElementById('bundle-signup-status');
    if (bundleForm && typeof fetch === 'function') {
      bundleForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var submitBtn = bundleForm.querySelector('button[type="submit"]');
        var origLabel = submitBtn ? submitBtn.innerHTML : '';
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Sending...';
        }
        if (bundleStatus) bundleStatus.textContent = '';

        var body = new URLSearchParams(new FormData(bundleForm)).toString();
        fetch(bundleForm.action, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: body
        }).then(function (res) {
          if (res.ok) {
            if (bundleStatus) {
              bundleStatus.textContent = 'Check your inbox for the Claude Code Starter Pack and weekly operator field notes.';
            }
            bundleForm.reset();
          } else {
            if (bundleStatus) {
              bundleStatus.textContent = 'Could not complete signup right now. Please check your email address and try again.';
            }
          }
        })['catch'](function () {
          bundleForm.submit();
        })['finally'](function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = origLabel;
          }
        });
      });
    }

    applyRecommendedSelection();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
