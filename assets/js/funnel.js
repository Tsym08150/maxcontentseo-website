/* Anonyme, cookiefreie Funnel-Zaehlung (nur Ereignis-Zaehler pro Tag, kein Personenbezug).
   Kein Cookie, kein Storage, keine IP-/UA-/Referrer-Speicherung. Details: /datenschutz.html */
(function () {
  var EP = 'https://maxcontentseo-events.pages.dev/e';

  function send(ev) {
    try {
      var url = EP + '?ev=' + encodeURIComponent(ev);
      if (navigator.sendBeacon && navigator.sendBeacon(url)) return;
      fetch(url, { method: 'POST', keepalive: true, mode: 'no-cors' })['catch'](function () {});
    } catch (e) { /* Zaehler darf die Seite nie beeintraechtigen */ }
  }

  try {
    document.addEventListener('click', function (e) {
      var el = e.target && e.target.closest ? e.target.closest('[data-ev]') : null;
      if (el && el.getAttribute('data-ev')) send(el.getAttribute('data-ev'));
    }, true);

    var form = document.querySelector('form[data-kontakt-form]');
    if (form) {
      var started = false;
      form.addEventListener('focusin', function () {
        if (started) return;
        started = true; /* einmal pro Seitenaufruf, nur JS-Flag, kein Storage */
        send('formular_start');
      });
      form.addEventListener('submit', function () { send('formular_absenden'); });
    }
  } catch (e) { /* niemals die Seite stoeren */ }
})();
