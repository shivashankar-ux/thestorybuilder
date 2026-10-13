/* ==========================================================================
   Video shoot + edit landing page: behaviour
   Edit CONFIG below. Everything else works as-is.
   ========================================================================== */
(() => {
  'use strict';

  const CONFIG = {
    brand: 'Studio Name',
    whatsapp: '919999999999',          // country code + number, digits only (no + or spaces)
    phone: '+91 99999 99999',
    email: 'hello@yourstudio.com',
    metaPixelId: '',                   // e.g. '123456789012345'. Leave empty to disable the pixel.
    formEndpoint: '',                  // POST JSON here (Formspree, Apps Script, n8n, your API). Empty = WhatsApp fallback.
    thankYouUrl: '',                   // optional: redirect here after a successful submit
    waMessage: "Hi, I'd like a quote for a video shoot and edit."
  };

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const clamp = (n, a, b) => Math.min(b, Math.max(a, n));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Tracking (Meta Pixel + dataLayer) ---------- */
  const dl = (window.dataLayer = window.dataLayer || []);
  const STANDARD = ['PageView', 'ViewContent', 'Lead', 'Contact'];

  function initPixel(id) {
    if (!id) return;
    /* eslint-disable */
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    /* eslint-enable */
    window.fbq('init', id);
    window.fbq('track', 'PageView');
  }

  function track(name, params = {}, eventID) {
    dl.push(Object.assign({ event: name }, params));
    if (!window.fbq) return;
    if (STANDARD.indexOf(name) > -1) {
      eventID ? window.fbq('track', name, params, { eventID }) : window.fbq('track', name, params);
    } else {
      window.fbq('trackCustom', name, params);
    }
  }

  initPixel(CONFIG.metaPixelId);

  /* ---------- Config -> DOM ---------- */
  $$('[data-phone]').forEach(el => { el.textContent = CONFIG.phone; el.href = 'tel:' + CONFIG.phone.replace(/[^\d+]/g, ''); });
  $$('[data-email]').forEach(el => { el.textContent = CONFIG.email; el.href = 'mailto:' + CONFIG.email; });
  $$('.brand, [data-brand]').forEach(el => { if (el.classList.contains('brand')) el.textContent = CONFIG.brand; });
  const yr = $('#year'); if (yr) yr.textContent = new Date().getFullYear();

  const waUrl = (msg) => 'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(msg || CONFIG.waMessage);
  $$('[data-whatsapp]').forEach(a => {
    a.href = waUrl();
    a.target = '_blank';
    a.rel = 'noopener';
  });

  /* Contact events: WhatsApp, phone, email */
  document.addEventListener('click', (e) => {
    const wa = e.target.closest('[data-whatsapp]');
    if (wa) return track('Contact', { method: 'whatsapp', placement: wa.dataset.whatsapp });
    const c = e.target.closest('[data-contact]');
    if (c) return track('Contact', { method: c.dataset.contact });
    const cta = e.target.closest('[data-cta]');
    if (cta) track('CTAClick', { placement: cta.dataset.cta });
  });

  /* ---------- Attribution (UTM, fbclid, fbp/fbc) ---------- */
  const KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid'];
  let attr = {};
  try { attr = JSON.parse(sessionStorage.getItem('attr') || '{}'); } catch (_) {}
  const qs = new URLSearchParams(location.search);
  KEYS.forEach(k => { if (qs.get(k) && !attr[k]) attr[k] = qs.get(k); });
  try { sessionStorage.setItem('attr', JSON.stringify(attr)); } catch (_) {}

  const cookie = (n) => (document.cookie.match('(?:^|; )' + n + '=([^;]*)') || [])[1] || '';

  /* ---------- Hero: timecode ---------- */
  const tcEl = $('#timecode');
  if (tcEl) {
    if (reduceMotion) {
      tcEl.textContent = '01:00:12:08';
    } else {
      const fps = 24, t0 = performance.now(); let last = -1;
      const pad = (n) => String(n).padStart(2, '0');
      const tick = (now) => {
        const f = Math.floor((now - t0) / 1000 * fps);
        if (f !== last) {
          last = f;
          const s = Math.floor(f / fps);
          tcEl.textContent = pad(1 + Math.floor(s / 3600)) + ':' + pad(Math.floor(s / 60) % 60) + ':' + pad(s % 60) + ':' + pad(f % fps);
        }
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }
  }

  /* ---------- Hero: showreel ---------- */
  const screen = $('#screen'), reel = $('.reel'), playBtn = $('#playReel');
  if (reel && playBtn) {
    if (reel.dataset.poster) reel.poster = reel.dataset.poster;
    playBtn.addEventListener('click', () => {
      const src = reel.dataset.src;
      if (!src) {
        if (!$('.play-msg', screen)) {
          const m = document.createElement('div');
          m.className = 'play-msg';
          m.textContent = 'Showreel placeholder. Add your video in index.html (data-src).';
          screen.appendChild(m);
          setTimeout(() => m.remove(), 3500);
        }
        return;
      }
      if (!reel.src) reel.src = src;
      reel.muted = false;
      reel.loop = false;
      reel.play().then(() => {
        screen.classList.add('is-playing');
        reel.controls = true;
        track('VideoPlay', { placement: 'hero_showreel' });
      }).catch(() => { reel.muted = true; reel.play(); screen.classList.add('is-playing'); });
    });
  }

  /* ---------- Work: video dialog ---------- */
  const dlg = $('#player'), stage = $('#playerStage');
  function closePlayer() { if (dlg.open) dlg.close(); }
  if (dlg && stage) {
    $$('.tile').forEach(tile => tile.addEventListener('click', () => {
      const title = $('.tile-meta strong', tile).textContent;
      stage.innerHTML = '';
      if (tile.dataset.video) {
        const v = document.createElement('video');
        v.src = tile.dataset.video; v.controls = true; v.autoplay = true; v.playsInline = true;
        stage.appendChild(v);
      } else if (tile.dataset.embed) {
        const f = document.createElement('iframe');
        f.src = tile.dataset.embed + (tile.dataset.embed.includes('?') ? '&' : '?') + 'autoplay=1';
        f.allow = 'autoplay; fullscreen; picture-in-picture'; f.title = title;
        stage.appendChild(f);
      } else {
        stage.innerHTML = '<p>Video placeholder.<br><span style="opacity:.7">Add data-video="your.mp4" or data-embed="YouTube embed URL" to this tile.</span></p>';
      }
      dlg.showModal();
      track('VideoPlay', { placement: 'work_tile', title });
    }));
    $('#playerClose').addEventListener('click', closePlayer);
    dlg.addEventListener('click', (e) => { if (e.target === dlg) closePlayer(); });
    dlg.addEventListener('close', () => { stage.innerHTML = ''; });
  }

  /* ---------- Process timeline: playhead ---------- */
  const tl = $('#timeline');
  if (tl) {
    const wave = $('#wave');
    if (wave) {
      for (let i = 0; i < 110; i++) {
        const b = document.createElement('i');
        const h = 18 + Math.abs(Math.sin(i * 0.55) * 52 + Math.sin(i * 1.7) * 26);
        b.style.height = Math.min(92, h) + '%';
        wave.appendChild(b);
      }
    }
    const clips = $$('.clip', tl), steps = $$('.step', tl);
    const paint = (p) => {
      tl.style.setProperty('--p', p.toFixed(4));
      clips.forEach((c, i) => c.classList.toggle('is-passed', p >= i / 5 - 0.001));
      steps.forEach((s, i) => s.classList.toggle('is-passed', p >= i / 5 - 0.001));
    };
    const mobile = window.matchMedia('(max-width: 760px)');
    let queued = false;
    const update = () => {
      queued = false;
      if (reduceMotion || mobile.matches) return paint(1);
      const r = tl.getBoundingClientRect(), vh = window.innerHeight;
      paint(clamp((vh * 0.9 - r.top) / (r.height + vh * 0.3), 0, 1));
    };
    const req = () => { if (!queued) { queued = true; requestAnimationFrame(update); } };
    window.addEventListener('scroll', req, { passive: true });
    window.addEventListener('resize', req);
    update();
  }

  /* ---------- Raw vs finished slider ---------- */
  const cmp = $('#cmp'), range = $('#cmpRange');
  if (cmp && range) {
    let used = false;
    range.addEventListener('input', () => {
      cmp.style.setProperty('--pos', range.value + '%');
      if (!used) { used = true; track('CompareUsed'); }
    });
  }

  /* ---------- Sticky mobile bar ---------- */
  const bar = $('#stickyBar'), quote = $('#quote');
  if (bar && quote) {
    let nearForm = false;
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([e]) => { nearForm = e.isIntersecting; sync(); }, { threshold: 0.1 }).observe(quote);
    }
    const sync = () => bar.classList.toggle('show', window.scrollY > 600 && !nearForm);
    window.addEventListener('scroll', sync, { passive: true });
    sync();
  }

  /* ---------- Section + scroll events ---------- */
  const pkg = $('#package');
  if (pkg && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { track('ViewContent', { content_name: 'Shoot + edit package' }); io.disconnect(); }
    }, { threshold: 0.35 });
    io.observe(pkg);
  }
  const depth = { 50: false, 90: false };
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const pct = (window.scrollY + window.innerHeight) / h.scrollHeight * 100;
    [50, 90].forEach(d => { if (!depth[d] && pct >= d) { depth[d] = true; track('ScrollDepth', { percent: d }); } });
  }, { passive: true });

  /* ---------- Package buttons -> form ---------- */
  const form = $('#quoteForm');
  const pkgInput = $('#f-package'), pkgTag = $('#pkgTag'), pkgName = $('#pkgName');
  const setPackage = (name) => {
    pkgInput.value = name || '';
    pkgName.textContent = name || '';
    pkgTag.classList.toggle('on', !!name);
  };
  $$('[data-package]').forEach(a => a.addEventListener('click', () => {
    setPackage(a.dataset.package);
    track('PackageSelect', { package: a.dataset.package });
  }));
  $('#pkgClear').addEventListener('click', () => setPackage(''));

  /* ---------- Form ---------- */
  let started = false;
  form.addEventListener('focusin', () => { if (!started) { started = true; track('FormStart'); } });

  const errBox = $('#formErr'), btn = $('#submitBtn'), card = $('#formCard');
  const showErr = (msg) => { errBox.textContent = msg; errBox.hidden = false; };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errBox.hidden = true;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const data = Object.fromEntries(new FormData(form).entries());
    if (data.website) return; // honeypot

    KEYS.forEach(k => { if (attr[k]) data[k] = attr[k]; });
    const eventID = 'lead_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
    const fbclid = attr.fbclid;
    const payload = Object.assign({}, data, {
      brand: CONFIG.brand,
      event_id: eventID,
      page_url: location.href,
      fbp: cookie('_fbp'),
      fbc: cookie('_fbc') || (fbclid ? 'fb.1.' + Date.now() + '.' + fbclid : ''),
      submitted_at: new Date().toISOString()
    });
    delete payload.website;

    btn.disabled = true;
    const label = btn.textContent;
    btn.textContent = 'Sending...';

    const summary =
      "Hi, I'd like a quote.\n" +
      'Name: ' + data.name + '\n' +
      'Business: ' + data.business + '\n' +
      'Need: ' + data.service + (data.package ? ' (' + data.package + ')' : '') + '\n' +
      'Making: ' + data.video_type + '\n' +
      'Budget: ' + data.budget +
      (data.details ? '\nDetails: ' + data.details : '');

    if (!CONFIG.formEndpoint) {
      // No backend connected: open WhatsApp with the brief prefilled.
      track('Lead', { content_name: data.service, package: data.package || '' }, eventID);
      window.open(waUrl(summary), '_blank', 'noopener');
      card.classList.add('is-done');
      btn.disabled = false; btn.textContent = label;
      return;
    }

    try {
      const res = await fetch(CONFIG.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      track('Lead', { content_name: data.service, package: data.package || '' }, eventID);
      if (CONFIG.thankYouUrl) { location.href = CONFIG.thankYouUrl; return; }
      card.classList.add('is-done');
      card.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
    } catch (err) {
      showErr('We could not send that. Please try again, or message us on WhatsApp and we will pick it up there.');
      btn.disabled = false; btn.textContent = label;
    }
  });
})();
