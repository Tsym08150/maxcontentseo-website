/* Verhalten Variante B (portiert aus dc-runtime data-dc-script):
   Nav-Dropdowns (Klick + Tastatur), Mobile-Burger, FAQ-Marker,
   Scroll-Reveals, Sichtbarkeitskurve, KI-Chat. prefers-reduced-motion wird respektiert.
   Props gebacken: scoreValue=62, curveAutoplay=true, chatAutoplay=true. */
(function () {
  function init() {
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ---- Navigation ----
    function closeMenus() {
      document.querySelectorAll('[data-menu][data-open="true"]').forEach(function (m) {
        m.removeAttribute('data-open');
        var b = m.querySelector('[data-menu-btn]');
        if (b) b.setAttribute('aria-expanded', 'false');
      });
    }
    document.querySelectorAll('[data-menu-btn]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var wrap = btn.closest('[data-menu]');
        var isOpen = wrap.getAttribute('data-open') === 'true';
        closeMenus();
        if (!isOpen) { wrap.setAttribute('data-open', 'true'); btn.setAttribute('aria-expanded', 'true'); }
        else { btn.blur(); }
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
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenus(); });

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

    var vh = window.innerHeight, below = [];
    els.forEach(function (el) {
      var d = el.getAttribute('data-delay') || '0';
      el.style.transition = 'opacity 0.9s ease ' + d + 'ms, transform 0.9s ease ' + d + 'ms';
      el.style.opacity = '0';
      el.style.transform = 'translateY(26px)';
      if (el.getBoundingClientRect().top < vh * 0.92) { setTimeout(function () { showEl(el); }, 60); }
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
})();
