// Stamps the time-on-page into every newsletter form before it submits, for the
// minimum-time bot guard in netlify/functions/subscribe.mjs. Forms still work
// without this script: a missing `elapsed` is simply not checked.
(function () {
  var loaded = Date.now();
  document.addEventListener('submit', function (e) {
    var f = e.target;
    if (!f || !f.matches || !f.matches('form.bc-subscribe')) return;
    var el = f.querySelector('input[name="elapsed"]');
    if (el) el.value = String(Date.now() - loaded);
    if (window.plausible) window.plausible('Newsletter Signup', { props: { page: location.pathname } });
  }, true);
})();
