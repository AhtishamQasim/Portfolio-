(function () {
  'use strict';

  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- Toast ---------- */
  var toastEl = document.getElementById('toast');
  var toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, 2400);
  }

  /* ---------- Theme ---------- */
  document.getElementById('themeToggle').addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    document.querySelector('meta[name="theme-color"]').setAttribute('content', next === 'light' ? '#f6f7fb' : '#07090f');
    try { localStorage.setItem('aq-theme', next); } catch (e) {}
  });

  /* ---------- Mobile menu ---------- */
  var burger = document.getElementById('burger');
  var navLinks = document.getElementById('navLinks');
  function setMenu(open) {
    navLinks.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  burger.addEventListener('click', function () { setMenu(!navLinks.classList.contains('open')); });
  navLinks.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  window.addEventListener('resize', function () { if (window.innerWidth > 900) setMenu(false); });

  /* ---------- Scroll: nav state, progress bar ---------- */
  var nav = document.getElementById('nav');
  var bar = document.querySelector('.progress span');
  var ticking = false;
  function onScroll() {
    var y = window.scrollY;
    nav.classList.toggle('scrolled', y > 12);
    var max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  /* ---------- Active nav link ---------- */
  var linkMap = {};
  navLinks.querySelectorAll('a[href^="#"]').forEach(function (a) { linkMap[a.getAttribute('href').slice(1)] = a; });
  var sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      Object.keys(linkMap).forEach(function (id) { linkMap[id].classList.toggle('active', id === entry.target.id); });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('main section[id]').forEach(function (s) { sectionObserver.observe(s); });

  /* ---------- Reveal on scroll ---------- */
  document.querySelectorAll('.values, .skills-grid, .projects-grid, .process, .timeline').forEach(function (group) {
    Array.prototype.forEach.call(group.querySelectorAll('.reveal'), function (el, i) {
      el.style.setProperty('--d', (i % 3) * 0.08 + 's');
    });
  });

  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      entry.target.querySelectorAll('.bar').forEach(function (b) { b.classList.add('in'); });
      if (entry.target.classList.contains('stats')) runCounters(entry.target);
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(function (el) { revealObserver.observe(el); });

  /* ---------- Counters ---------- */
  function runCounters(scope) {
    scope.querySelectorAll('[data-count]').forEach(function (el) {
      var target = parseFloat(el.dataset.count);
      var decimals = parseInt(el.dataset.decimals || '0', 10);
      var suffix = el.dataset.suffix || '';
      if (reduceMotion) { el.textContent = target.toFixed(decimals) + suffix; return; }
      var start = performance.now();
      var dur = 1600;
      (function frame(now) {
        var t = Math.min((now - start) / dur, 1);
        var eased = 1 - Math.pow(1 - t, 3);
        el.textContent = (target * eased).toFixed(decimals) + (t === 1 ? suffix : '');
        if (t < 1) requestAnimationFrame(frame);
      })(start);
    });
  }

  /* ---------- Typed roles ---------- */
  var typedEl = document.getElementById('typed');
  var roles = [
    'production web platforms',
    'secure REST APIs in Java & Node.js',
    'React dashboards people enjoy',
    'billing & e-commerce systems',
    'software that is tested end to end'
  ];
  if (!reduceMotion) {
    var ri = 0, ci = roles[0].length, deleting = true;
    (function tick() {
      var word = roles[ri];
      ci += deleting ? -1 : 1;
      typedEl.textContent = word.slice(0, ci);
      var delay = deleting ? 32 : 62;
      if (!deleting && ci === word.length) { deleting = true; delay = 2200; }
      else if (deleting && ci === 0) { deleting = false; ri = (ri + 1) % roles.length; delay = 380; }
      setTimeout(tick, delay);
    })();
  }

  /* ---------- Skill filter ---------- */
  var tabs = document.querySelectorAll('.skill-tabs .tab');
  var cards = document.querySelectorAll('.skill-card');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var f = tab.dataset.filter;
      tabs.forEach(function (t) {
        var on = t === tab;
        t.classList.toggle('is-active', on);
        t.setAttribute('aria-selected', String(on));
      });
      cards.forEach(function (c) {
        c.classList.toggle('dim', f !== 'all' && c.dataset.cat.split(' ').indexOf(f) === -1);
      });
    });
  });

  /* ---------- Spotlight border on skill cards ---------- */
  cards.forEach(function (card) {
    card.addEventListener('pointermove', function (e) {
      var r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });

  /* ---------- Cursor glow ---------- */
  var glow = document.querySelector('.cursor-glow');
  if (window.matchMedia('(hover: hover)').matches && !reduceMotion) {
    window.addEventListener('pointermove', function (e) {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    }, { passive: true });
  }

  /* ---------- Copy to clipboard ---------- */
  document.querySelectorAll('button.copy[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.dataset.copy;
      var done = function () { toast('Email address copied'); };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(done, function () { toast(text); });
      } else {
        var ta = document.createElement('textarea');
        ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'absolute'; ta.style.left = '-9999px';
        document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); done(); } catch (e) { toast(text); }
        document.body.removeChild(ta);
      }
    });
  });

  /* ---------- Contact form → mail client ---------- */
  var form = document.getElementById('contactForm');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var ok = true;
    ['cf-name', 'cf-email', 'cf-msg'].forEach(function (id) {
      var input = document.getElementById(id);
      var valid = input.checkValidity() && input.value.trim() !== '';
      input.parentElement.classList.toggle('invalid', !valid);
      if (!valid && ok) { input.focus(); ok = false; }
    });
    if (!ok) { toast('Please fill in the highlighted fields'); return; }

    var name = form.name.value.trim();
    var body = form.message.value.trim() + '\n\n— ' + name + ' (' + form.email.value.trim() + ')';
    var subject = form.subject.value + ' — from ' + name;
    window.location.href = 'mailto:ahtisham.softengineer@gmail.com?subject=' +
      encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    document.getElementById('formNote').textContent = 'Your email app should open now. Thanks for reaching out!';
  });
  form.querySelectorAll('input, textarea').forEach(function (el) {
    el.addEventListener('input', function () { el.parentElement.classList.remove('invalid'); });
  });

  /* ---------- Résumé link fallback ---------- */
  document.querySelectorAll('a[href$="Resume.pdf"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      if (location.protocol === 'file:') return;
      e.preventDefault();
      fetch(a.href, { method: 'HEAD' }).then(function (r) {
        if (r.ok) { window.open(a.href, '_blank', 'noopener'); }
        else { toast('Résumé available on request — email me'); }
      }).catch(function () { window.open(a.href, '_blank', 'noopener'); });
    });
  });
})();
