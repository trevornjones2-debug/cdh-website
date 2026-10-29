// Quote request form. Sends the form to the address in _data/site.yml (quote.form_endpoint)
// through FormSubmit and shows a confirmation or an error message under the button.
(function () {
  var form = document.getElementById('quote-form');
  if (!form) return;
  var status = document.getElementById('q-status');
  var btn = document.getElementById('q-submit');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.reportValidity()) return;
    btn.disabled = true;
    status.className = 'text-sm text-slate-500';
    status.textContent = 'Sending...';

    var data = {};
    new FormData(form).forEach(function (v, k) { data[k] = v; });
    data._replyto = data.email;

    fetch(form.dataset.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data)
    }).then(function (r) {
      if (!r.ok) throw new Error('status ' + r.status);
      return r.json();
    }).then(function (res) {
      if (String(res.success) !== 'true') throw new Error(res.message || 'not sent');
      form.reset();
      status.className = 'text-sm font-medium text-emerald-700';
      status.textContent = form.dataset.success;
    }).catch(function () {
      status.className = 'text-sm font-medium text-rose-700';
      status.textContent = form.dataset.error;
    }).finally(function () {
      btn.disabled = false;
    });
  });
})();
