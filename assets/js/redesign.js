/* Verhalten Variante B (portiert aus dc-runtime data-dc-script):
   Nav-Dropdowns (Klick + Tastatur), Mobile-Burger, FAQ-Marker,
   Scroll-Reveals, Sichtbarkeitskurve, KI-Chat. prefers-reduced-motion wird respektiert.
   Props gebacken: scoreValue=62, curveAutoplay=true, chatAutoplay=true. */
(function () {
  function init() {
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ---- Navigation ----
    // Astra R2 Befund 2 (2026-10-20): aria-expanded folgt der tatsaechlichen Sichtbarkeit,
    // auch beim reinen Hover (CSS :hover). data-closed="true" uebersteuert :hover und :focus-within.
    function menuShown(m) {
      return m.getAttribute('data-closed') !== 'true' &&
        (m.getAttribute('data-open') === 'true' || m._hover === true || m.contains(document.activeElement));
    }
    function syncMenu(m) {
      var b = m.querySelector('[data-menu-btn]');
      if (b) b.setAttribute('aria-expanded', menuShown(m) ? 'true' : 'false');
    }
    function closeMenus(except) {
      document.querySelectorAll('[data-menu]').forEach(function (m) {
        if (m === except) return;
        m.removeAttribute('data-open');
        syncMenu(m);
      });
    }
    document.querySelectorAll('[data-menu-btn]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var wrap = btn.closest('[data-menu]');
        var isOpen = wrap.getAttribute('data-open') === 'true';
        closeMenus(wrap);
        if (!isOpen) {
          wrap.removeAttribute('data-closed');
          wrap.setAttribute('data-open', 'true');
        } else {
          // Zweiter Klick schliesst sichtbar, auch wenn die Maus noch darueber steht; der Fokus bleibt auf dem Knopf.
          wrap.removeAttribute('data-open');
          wrap.setAttribute('data-closed', 'true');
        }
        syncMenu(wrap);
      });
    });
    var burger = document.querySelector('[data-burger]');
    if (burger) burger.addEventListener('click', function () {
      var nav = burger.closest('nav');
      var open = nav.getAttribute('data-mobile-open') === 'true';
      nav.setAttribute('data-mobile-open', open ? 'false' : 'true');
      burger.setAttribute('aria-expanded', String(!open));
    });
    document.addEventListener('click', function (e) {
      if (!e.target.closest('[data-menu]')) closeMenus();
      var link = e.target.closest('[data-menu-panel] a, [data-mobile-panel] a');
      if (link) {
        closeMenus();
        var nav = document.querySelector('nav[data-mobile-open]');
        if (nav) {
          nav.setAttribute('data-mobile-open', 'false');
          var bb = nav.querySelector('[data-burger]');
          if (bb) bb.setAttribute('aria-expanded', 'false');
        }
        if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
      }
    });
    // Astra R1 Befund 2 (2026-10-20): :hover/:focus-within hielten das Desktop-Untermenue nach Escape offen.
    // data-closed="true" uebersteuert beide CSS-Regeln, bis Maus und Fokus das Menue verlassen haben.
    // aria-expanded folgt der tatsaechlichen Sichtbarkeit (Hover, Fokus im Menue oder Klickoeffnung).
    document.querySelectorAll('[data-menu]').forEach(function (m) {
      m._hover = m.matches(':hover');
      syncMenu(m);
      m.addEventListener('mouseenter', function () { m._hover = true; syncMenu(m); });
      m.addEventListener('mouseleave', function () {
        m._hover = false;
        if (!m.contains(document.activeElement)) m.removeAttribute('data-closed');
        syncMenu(m);
      });
      m.addEventListener('focusin', function () { syncMenu(m); });
      m.addEventListener('focusout', function (e) {
        if (e.relatedTarget && m.contains(e.relatedTarget)) return;
        if (!m._hover) m.removeAttribute('data-closed');
        m.removeAttribute('data-open');
        setTimeout(function () { syncMenu(m); }, 0);
      });
    });
    // K-1 (Vollaudit 2026-10): Escape schliesst auch das mobile Menue und gibt den Fokus an den Menue-Knopf zurueck.
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      var active = document.activeElement;
      document.querySelectorAll('[data-menu]').forEach(function (m) {
        var inside = m.contains(active);
        if (!(inside || m._hover === true || m.getAttribute('data-open') === 'true')) return;
        m.setAttribute('data-closed', 'true');
        m.removeAttribute('data-open');
        syncMenu(m);
        var b = m.querySelector('[data-menu-btn]');
        if (b && inside && active !== b) b.focus();
      });
      closeMenus();
      var mnav = document.querySelector('nav[data-mobile-open="true"]');
      if (mnav) {
        mnav.setAttribute('data-mobile-open', 'false');
        var mb = mnav.querySelector('[data-burger]');
        if (mb) { mb.setAttribute('aria-expanded', 'false'); mb.focus(); }
      }
    });

    // ---- FAQ +/- Marker ----
    document.querySelectorAll('details').forEach(function (d) {
      var marker = d.querySelector('[data-marker]');
      if (!marker) return;
      d.addEventListener('toggle', function () { marker.textContent = d.open ? '−' : '+'; });
    });

    // ---- Reveals / Kurve / Chat ----
    var els = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
    function showEl(el) { el.style.opacity = '1'; el.style.transform = 'none'; }

    var curve = document.querySelector('[data-curve]');
    var fill = document.querySelector('[data-curve-fill]');
    var dot = document.querySelector('[data-curve-dot]');
    var curveLen = 0, curvePlayed = false;
    if (curve) { curveLen = curve.getTotalLength(); curve.style.strokeDasharray = String(curveLen); }
    function playCurve() {
      if (!curve || curvePlayed) return;
      curvePlayed = true;
      setTimeout(function () {
        curve.style.strokeDashoffset = '0';
        if (fill) fill.style.opacity = '1';
        if (dot) dot.style.opacity = '1';
      }, 50);
    }

    var chat = document.querySelector('[data-chat]');
    var chatMsgs = chat ? Array.prototype.slice.call(chat.querySelectorAll('[data-msg]')) : [];
    var chatPlayed = false;
    function playChat() {
      if (chatPlayed) return;
      chatPlayed = true;
      chatMsgs.forEach(function (m, i) {
        setTimeout(function () { m.style.opacity = '1'; m.style.transform = 'none'; }, 500 + i * 900);
      });
    }

    if (reduced) {
      els.forEach(showEl);
      if (curve) { curve.style.strokeDashoffset = '0'; if (fill) fill.style.opacity = '1'; if (dot) dot.style.opacity = '1'; }
      chatMsgs.forEach(function (m) { m.style.opacity = '1'; m.style.transform = 'none'; });
      return;
    }

    if (curve) {
      curve.style.strokeDashoffset = String(curveLen);
      curve.style.transition = 'stroke-dashoffset 2.2s cubic-bezier(0.4, 0, 0.2, 1) 0.2s';
      if (fill) fill.style.transition = 'opacity 1s ease 1.6s';
      if (dot) dot.style.transition = 'opacity 0.4s ease 2.2s';
    }
    chatMsgs.forEach(function (m) {
      m.style.opacity = '0';
      m.style.transform = 'translateY(8px)';
      m.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Ladezeit 2026-10: alle Positionen ZUERST lesen, dann Stile schreiben. Vorher wechselten
    // Lesen (getBoundingClientRect) und Schreiben (transform) je Element ab, und jedes Element
    // erzwang ein eigenes Layout (Lighthouse „forced reflow"). +26 entspricht dem translateY,
    // das die alte Reihenfolge beim Lesen schon enthielt; Entscheidung je Element unveraendert.
    // innerHeight nur lesen, wenn es Reveal-Elemente gibt: das Lesen erzwingt sonst auf Seiten
    // ohne Reveals (alle ausser der Startseite) ein vorgezogenes Layout im Skript.
    var vh = els.length ? window.innerHeight : 0, below = [];
    var tops = els.map(function (el) { return el.getBoundingClientRect().top + 26; });
    els.forEach(function (el, i) {
      var d = el.getAttribute('data-delay') || '0';
      el.style.transition = 'opacity 0.9s ease ' + d + 'ms, transform 0.9s ease ' + d + 'ms';
      el.style.opacity = '0';
      el.style.transform = 'translateY(26px)';
      if (tops[i] < vh * 0.92) { setTimeout(function () { showEl(el); }, 60); }
      else below.push(el);
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { showEl(en.target); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
    below.forEach(function (el) { io.observe(el); });

    if (curve) {
      var io2 = new IntersectionObserver(function (entries) {
        if (entries.some(function (e) { return e.isIntersecting; })) { io2.disconnect(); playCurve(); }
      }, { threshold: 0.4 });
      io2.observe(curve.closest('div') || curve);
    }
    if (chat) {
      var io3 = new IntersectionObserver(function (entries) {
        if (entries.some(function (e) { return e.isIntersecting; })) { io3.disconnect(); playChat(); }
      }, { threshold: 0.4 });
      io3.observe(chat);
    }

    // Permanenter Fallback (flaky IO / Anker-Sprünge)
    var pending = new Set(els);
    function inView(el) { var r = el.getBoundingClientRect(); return r.top < window.innerHeight && r.bottom > 0; }
    var curveBox = curve ? (curve.closest('div') || curve) : null;
    var fb = setInterval(function () {
      pending.forEach(function (el) {
        if (el.style.opacity === '1') { pending.delete(el); return; }
        if (el.getBoundingClientRect().top < window.innerHeight) { showEl(el); pending.delete(el); }
      });
      if (curveBox && !curvePlayed && inView(curveBox)) playCurve();
      if (chat && !chatPlayed && inView(chat)) playChat();
      if (pending.size === 0 && (curvePlayed || !curve) && (chatPlayed || !chat)) clearInterval(fb);
    }, 300);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  // Kontaktformular: AJAX-Versand mit Weiterleitung auf /danke.html.
  // Formspree leitet ohne bezahlten Plan nicht per _next weiter (landet sonst auf
  // formspree.io/thanks); ohne JS bleibt der native POST als Fallback erhalten.
  function initForm() {
    var form = document.querySelector('form[data-kontakt-form]');
    // Formulare mit eigenem Versandskript (z. B. /beratung-bafa/) nicht doppelt absenden.
    if (!form || !window.fetch || form.hasAttribute('data-eigener-versand')) return;
    function onSubmit(e) {
      e.preventDefault();
      var btn = form.querySelector('button');
      var label = btn ? btn.textContent : '';
      if (btn) { btn.disabled = true; btn.textContent = 'Wird gesendet …'; }
      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      }).then(function (res) {
        if (res.ok) { window.location.href = '/danke.html'; return; }
        throw new Error('HTTP ' + res.status);
      }).catch(function () {
        // Fallback: nativer POST (Formspree-eigene Bestätigungsseite)
        if (btn) { btn.disabled = false; btn.textContent = label; }
        form.removeEventListener('submit', onSubmit);
        form.submit();
      });
    }
    form.addEventListener('submit', onSubmit);
    window.__mcsFormHandler = true;
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initForm);
  else initForm();
})();
