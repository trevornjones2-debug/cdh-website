// Quote request form. Sends the form through Web3Forms using the access key in _data/site.yml
// (quote.form_access_key) and shows a confirmation or an error message under the button.
(function () {
  var form = document.getElementById('quote-form');
  if (!form) return;
  var status = document.getElementById('q-status');
  var btn = document.getElementById('q-submit');

  function show(kind, text) {
    status.className = kind === 'ok' ? 'text-sm font-medium text-emerald-700'
      : kind === 'err' ? 'text-sm font-medium text-rose-700'
      : 'text-sm text-slate-500';
    status.textContent = text;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.reportValidity()) return;

    var data = { access_key: form.dataset.accessKey };
    new FormData(form).forEach(function (v, k) { data[k] = v; });

    // Spam trap: real visitors never see or tick this box.
    if (data.botcheck) { form.reset(); show('ok', form.dataset.success); return; }
    delete data.botcheck;

    btn.disabled = true;
    show('', 'Sending...');

    fetch(form.dataset.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data)
    }).then(function (r) {
      return r.json().then(function (res) {
        if (!r.ok || res.success !== true) throw new Error(res.message || 'status ' + r.status);
      });
    }).then(function () {
      form.reset();
      show('ok', form.dataset.success);
    }).catch(function () {
      show('err', form.dataset.error);
    }).finally(function () {
      btn.disabled = false;
    });
  });
})();
