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

  /* ---------- Spotlight border on cards ---------- */
  document.querySelectorAll('.skill-card, .value, .step, .tl-card, .project, .code-tab').forEach(function (card) {
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

  /* ---------- Syntax highlighting ---------- */
  var KEYWORDS = {
    java: 'public private protected final class return new this static void if else throw throws try catch import package extends implements',
    js: 'const let var function return export default import from async await new if else throw try catch typeof of in true false null',
    sql: 'SELECT FROM JOIN LEFT INNER ON WHERE AND OR GROUP BY HAVING ORDER AS COUNT SUM MIN MAX CURRENT_DATE LIMIT DESC ASC'
  };
  function esc(t) { return t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function highlight(src, lang) {
    var kw = {};
    (KEYWORDS[lang === 'java' || lang === 'sql' ? lang : 'js']).split(' ').forEach(function (k) { kw[k] = 1; });
    var re = lang === 'sql'
      ? /(--[^\n]*)|('[^'\n]*')|()(\b\d+(?:\.\d+)?\b)|(\b[A-Za-z_]\w*\b)/g
      : /(\/\/[^\n]*)|('[^'\n]*'|"[^"\n]*"|`[^`]*`)|(@[A-Za-z]\w*)|(\b\d+(?:\.\d+)?\b)|(\b[A-Za-z_$][\w$]*\b)/g;
    var out = '', last = 0, m;
    while ((m = re.exec(src))) {
      out += esc(src.slice(last, m.index));
      var cls = '';
      if (m[1]) cls = 'c';
      else if (m[2]) cls = 's';
      else if (m[3]) cls = 'a';
      else if (m[4]) cls = 'n';
      else if (m[5]) {
        var w = m[5];
        if (kw[w]) cls = 'k';
        else if (src.charAt(re.lastIndex) === '(') cls = 'f';
        else if (lang !== 'sql' && /^[A-Z]/.test(w)) cls = 't';
      }
      out += cls ? '<span class="tk-' + cls + '">' + esc(m[0]) + '</span>' : esc(m[0]);
      last = re.lastIndex;
    }
    return out + esc(src.slice(last));
  }
  function fillGutter(el, lines) {
    var html = '';
    for (var i = 1; i <= lines; i++) html += '<li>' + i + '</li>';
    el.innerHTML = html;
  }

  /* ---------- Hero editor: live typing ---------- */
  var heroCode = document.getElementById('heroCode');
  var HERO_SRC = [
    'const engineer = {',
    "  name: 'Ahtisham Qasim',",
    "  role: 'Full-Stack Software Engineer',",
    "  backend: ['Java', 'Spring', 'Node.js'],",
    "  frontend: ['React', 'Redux', 'MUI'],",
    "  data: ['PostgreSQL', 'Oracle'],",
    "  ships: 'secure, tested, production-ready',",
    '};',
    '',
    'await deploy(engineer); // shipped'
  ].join('\n');
  fillGutter(document.querySelector('.editor .gutter'), 10);
  if (reduceMotion) {
    heroCode.innerHTML = highlight(HERO_SRC, 'js');
  } else {
    var hi = 0;
    (function typeCode() {
      hi++;
      heroCode.innerHTML = highlight(HERO_SRC.slice(0, hi), 'js');
      if (hi < HERO_SRC.length) {
        setTimeout(typeCode, HERO_SRC.charAt(hi - 1) === '\n' ? 180 : 24 + Math.random() * 30);
      } else {
        setTimeout(function () { hi = 0; typeCode(); }, 7000);
      }
    })();
  }

  /* ---------- Hero terminal ---------- */
  var term = document.getElementById('term');
  var TERM_LINES = [
    ['t-p', '$ npm test'],
    ['t-ok', '✓ 48 API tests passed'],
    ['t-ok', '✓ e2e: checkout journey (22 checks)'],
    ['t-p', '$ git push origin main'],
    ['t-hi', '→ pipeline: build · lint · test'],
    ['t-ok', '✓ deployed to production in 41s']
  ];
  function termLine(l) {
    var d = document.createElement('div');
    d.className = l[0];
    d.textContent = l[1];
    term.appendChild(d);
    while (term.children.length > 5) term.removeChild(term.firstChild);
  }
  if (reduceMotion) {
    TERM_LINES.slice(1).forEach(termLine);
  } else {
    var ti = 0;
    (function nextLine() {
      termLine(TERM_LINES[ti]);
      ti = (ti + 1) % TERM_LINES.length;
      setTimeout(nextLine, ti === 0 ? 3200 : 1100);
    })();
  }

  /* ---------- Code showcase ---------- */
  var codeView = document.getElementById('codeView');
  var codeGutter = document.getElementById('codeGutter');
  var LANG_OF = { java: 'java', node: 'js', react: 'js', sql: 'sql' };
  function showSample(key) {
    var tpl = document.getElementById('sample-' + key);
    var src = tpl.content.textContent;
    codeView.innerHTML = highlight(src, LANG_OF[key]);
    fillGutter(codeGutter, src.split('\n').length);
    document.getElementById('codeFile').textContent = tpl.dataset.file;
    document.getElementById('codeLang').textContent = tpl.dataset.lang;
    codeView.parentElement.classList.remove('code-fade');
    void codeView.offsetWidth;
    codeView.parentElement.classList.add('code-fade');
  }
  var codeTabs = document.querySelectorAll('.code-tab');
  codeTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      codeTabs.forEach(function (t) {
        t.classList.toggle('is-active', t === tab);
        t.setAttribute('aria-selected', String(t === tab));
      });
      showSample(tab.dataset.sample);
    });
  });
  showSample('java');

  /* ---------- Neural network background ---------- */
  (function neural() {
    var cv = document.getElementById('neural');
    var ctx = cv.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W, H, nodes = [], mouse = { x: -9999, y: -9999 }, colA, colB;

    function rgb(v) {
      v = getComputedStyle(root).getPropertyValue(v).trim().replace('#', '');
      return [parseInt(v.slice(0, 2), 16), parseInt(v.slice(2, 4), 16), parseInt(v.slice(4, 6), 16)].join(',');
    }
    function readColors() { colA = rgb('--a1'); colB = rgb('--a2'); }
    function resize() {
      W = window.innerWidth; H = window.innerHeight;
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var count = Math.max(28, Math.min(90, Math.round(W * H / 17000)));
      nodes = [];
      for (var i = 0; i < count; i++) {
        nodes.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35, r: Math.random() * 1.6 + .8 });
      }
    }
    function frame() {
      ctx.clearRect(0, 0, W, H);
      var LINK = 140, i, j, a, b, dx, dy, d;
      for (i = 0; i < nodes.length; i++) {
        a = nodes[i];
        a.x += a.vx; a.y += a.vy;
        if (a.x < 0 || a.x > W) a.vx *= -1;
        if (a.y < 0 || a.y > H) a.vy *= -1;
        for (j = i + 1; j < nodes.length; j++) {
          b = nodes[j]; dx = a.x - b.x; dy = a.y - b.y; d = dx * dx + dy * dy;
          if (d < LINK * LINK) {
            ctx.strokeStyle = 'rgba(' + colA + ',' + (0.22 * (1 - Math.sqrt(d) / LINK)) + ')';
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        dx = a.x - mouse.x; dy = a.y - mouse.y; d = Math.sqrt(dx * dx + dy * dy);
        if (d < 190) {
          ctx.strokeStyle = 'rgba(' + colB + ',' + (0.55 * (1 - d / 190)) + ')';
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
        ctx.fillStyle = 'rgba(' + (i % 3 ? colA : colB) + ',.85)';
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2); ctx.fill();
      }
    }
    var running = false;
    function loop() {
      if (!running) return;
      frame();
      requestAnimationFrame(loop);
    }
    function start() { if (!running && !reduceMotion && !document.hidden) { running = true; loop(); } }

    readColors(); resize();
    if (reduceMotion) frame(); else start();
    window.addEventListener('resize', function () { resize(); if (reduceMotion) frame(); });
    window.addEventListener('pointermove', function (e) { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
    document.addEventListener('visibilitychange', function () { if (document.hidden) running = false; else start(); });
    new MutationObserver(function () { readColors(); if (reduceMotion) frame(); })
      .observe(root, { attributes: true, attributeFilter: ['data-theme'] });
  })();

  /* ---------- Contact form → /api/contact ---------- */
  var form = document.getElementById('contactForm');
  var note = document.getElementById('formNote');
  var sendBtn = document.getElementById('sendBtn');
  var sendLabel = sendBtn.querySelector('.btn-label');
  var NOTE_DEFAULT = note.textContent;

  function mailtoFallback(d) {
    var body = d.message + '\n\n— ' + d.name + ' (' + d.email + ')';
    window.location.href = 'mailto:ahtisham.softengineer@gmail.com?subject=' +
      encodeURIComponent(d.subject + ' — from ' + d.name) + '&body=' + encodeURIComponent(body);
    note.textContent = 'Your email app should open now with the message ready to send.';
  }

  function showDone(d) {
    var done = document.createElement('div');
    done.className = 'form-done';
    done.innerHTML =
      '<div class="done-ico"><svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5L20 7"/></svg></div>' +
      '<h3>Message sent!</h3><p class="done-text"></p>' +
      '<button type="button" class="btn btn-ghost btn-sm">Send another message</button>';
    done.querySelector('.done-text').textContent =
      'Thanks, ' + d.name + '. A confirmation is on its way to ' + d.email + '. I usually reply within a day.';
    done.querySelector('button').addEventListener('click', function () {
      form.removeChild(done);
      form.classList.remove('is-done');
      note.textContent = NOTE_DEFAULT;
    });
    form.reset();
    form.classList.add('is-done');
    form.appendChild(done);
    toast('Message sent successfully');
  }

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

    var data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      subject: form.subject.value,
      message: form.message.value.trim(),
      company: form.company.value
    };
    if (location.protocol === 'file:') { mailtoFallback(data); return; }

    note.classList.remove('err');
    sendBtn.classList.add('loading');
    sendLabel.textContent = 'Sending…';
    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(function (r) {
        return r.json().catch(function () { return {}; }).then(function (body) { return { status: r.status, ok: r.ok, body: body }; });
      })
      .then(function (res) {
        if (res.ok) showDone(data);
        // Hosted somewhere without the API (e.g. GitHub Pages): fall back to the mail app.
        else if (res.status === 404 || res.status === 405) mailtoFallback(data);
        else {
          note.classList.add('err');
          note.textContent = (res.body && res.body.error) || 'Could not send right now. Please email ahtisham.softengineer@gmail.com.';
        }
      })
      .catch(function () {
        note.classList.add('err');
        note.textContent = 'Network problem. Please try again or email ahtisham.softengineer@gmail.com.';
      })
      .then(function () {
        sendBtn.classList.remove('loading');
        sendLabel.textContent = 'Send message';
      });
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
