import React, { useEffect, useRef } from "react";

const ArrowIcon = () => (
  <svg width="15" height="15" viewBox="0 0 20 20" fill="none">
    <path
      d="M5 15L15 5M15 5H8M15 5v7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const defaultProjects = [
  {
    id: 1,
    title: "Legacy Solar",
    kicker: "Solar Energy · Lead Generation",
    text: "Conversion-focused website backed by paid search and SEO — built to capture high-intent solar leads and turn page visits into qualified consultations.",
    img: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1200&q=80",
    url: "https://legacysolar.in",
    caseSlug: "legacy-solar",
    ctaText: "View Live Site",
  },
  {
    id: 2,
    title: "Star Fitness Studio",
    kicker: "Fitness · Local Growth",
    text: "Mobile-first studio site engineered with local SEO and Meta ads to drive consistent membership sign-ups across the city.",
    img: "https://images.unsplash.com/photo-1550345332-09e3ac987658?w=1200&q=80",
    url: "https://starfitnessstudio.in",
    ctaText: "View Live Site",
  },
  {
    id: 3,
    title: "WafflesHub",
    kicker: "Food & Beverage · D2C",
    text: "Appetising D2C brand experience with an order-driven layout and Meta retargeting in place to keep customers coming back.",
    img: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=1200&q=80",
    url: "https://waffleshub.com/",
    ctaText: "View Live Site",
  },
  {
    id: 4,
    title: "Chess Academy",
    kicker: "Education · AI Platform",
    text: "AI-powered education platform built on Next.js with a student-first funnel — clean acquisition flow, automated nurture, and conversion-led design.",
    img: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=1200&q=80",
    url: "https://chessacademy-next-js-chirag-client.vercel.app/",
    caseSlug: "chess-academy",
    ctaText: "View Live Site",
  },
  {
    id: 5,
    title: "Unbent Martial Fitness",
    kicker: "Martial Arts · Performance Ads",
    text: "Bold, high-energy brand site paired with performance ad campaigns engineered to drive trial sign-ups and walk-ins.",
    img: "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=1200&q=80",
    url: "https://unbentmartialfitness.com",
    ctaText: "View Live Site",
  },
  {
    id: 6,
    title: "The White Closet",
    kicker: "Interior Design · Studio Brand",
    text: "A refined web presence for a boutique interior design studio — portfolio-led storytelling, project galleries, and a soft conversion path.",
    img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80",
    url: "https://the-white-closet.vercel.app/",
    ctaText: "View Live Site",
  },
  {
    id: 7,
    title: "DigitalWithChirag",
    kicker: "Personal Brand · Authority",
    text: "Personal brand experience built to position the founder as a category authority — credibility-led design plus content-led SEO for inbound clients.",
    img: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=1200&q=80",
    url: "https://www.digitalwithchirag.com/",
    ctaText: "View Live Site",
  },
  {
    id: 8,
    title: "Siolim Cafe",
    kicker: "Hospitality · Local SEO",
    text: "Warm, mobile-first hospitality site optimised for Google Maps and 'near-me' search — designed to convert browsers into walk-in customers.",
    img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&q=80",
    url: "https://siolimcafe.vercel.app/",
    ctaText: "View Live Site",
  },
  {
    id: 9,
    title: "SevAction Foundation",
    kicker: "Non-Profit · Donations",
    text: "Mission-driven non-profit website engineered to communicate impact and convert empathy into donations — clear story, clear ask.",
    img: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1200&q=80",
    url: "https://sevactionfoundation.in/",
    ctaText: "View Live Site",
  },
];

class MzaCarouselEngine {
  constructor(root, opts = {}) {
    this.root = root;
    this.viewport = root.querySelector(".mzaCarousel-viewport");
    this.track = root.querySelector(".mzaCarousel-track");
    this.slides = Array.from(root.querySelectorAll(".mzaCarousel-slide"));
    this.prevBtn = root.querySelector(".mzaCarousel-prev");
    this.nextBtn = root.querySelector(".mzaCarousel-next");
    this.pagination = root.querySelector(".mzaCarousel-pagination");
    this.progressBar = root.querySelector(".mzaCarousel-progressBar");
    this.isFF = typeof window !== "undefined" && typeof window.InstallTrigger !== "undefined";
    this.n = this.slides.length;
    this.cleanupFns = [];
    this.state = {
      index: 0,
      pos: 0,
      width: 0,
      height: 0,
      gap: 28,
      dragging: false,
      pointerId: null,
      x0: 0,
      v: 0,
      t0: 0,
      animating: false,
      hovering: false,
      startTime: 0,
      pausedAt: 0,
      rafId: 0,
    };
    this.opts = Object.assign(
      {
        gap: 28,
        peek: 0.15,
        rotateY: 34,
        zDepth: 150,
        scaleDrop: 0.09,
        blurMax: 2.0,
        activeLeftBias: 0.12,
        interval: 4500,
        transitionMs: 900,
        keyboard: true,
        breakpoints: [
          {
            mq: "(max-width: 1200px)",
            gap: 24,
            peek: 0.12,
            rotateY: 28,
            zDepth: 120,
            scaleDrop: 0.08,
            activeLeftBias: 0.1,
          },
          {
            mq: "(max-width: 1000px)",
            gap: 18,
            peek: 0.09,
            rotateY: 22,
            zDepth: 90,
            scaleDrop: 0.07,
            activeLeftBias: 0.09,
          },
          {
            mq: "(max-width: 768px)",
            gap: 14,
            peek: 0.06,
            rotateY: 16,
            zDepth: 70,
            scaleDrop: 0.06,
            activeLeftBias: 0.08,
          },
          {
            mq: "(max-width: 560px)",
            gap: 12,
            peek: 0.05,
            rotateY: 12,
            zDepth: 60,
            scaleDrop: 0.05,
            activeLeftBias: 0.07,
          },
        ],
      },
      opts
    );
    if (this.isFF) {
      this.opts.rotateY = 10;
      this.opts.zDepth = 0;
      this.opts.blurMax = 0;
    }
    this._init();
  }

  _init() {
    this._setupDots();
    this._bind();
    this._preloadImages();
    this._measure();
    this.goTo(0, false);
    this._startCycle();
    this._loop();
  }

  _preloadImages() {
    this.slides.forEach((sl) => {
      const card = sl.querySelector(".mzaCard");
      if (!card) return;
      const bg = getComputedStyle(card).getPropertyValue("--mzaCard-bg");
      const m = /url\((?:'|")?([^'")]+)(?:'|")?\)/.exec(bg);
      if (m && m[1]) {
        const img = new Image();
        img.src = m[1];
      }
    });
  }

  _setupDots() {
    if (!this.pagination) return;
    this.pagination.innerHTML = "";
    this.dots = this.slides.map((_, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "mzaCarousel-dot";
      b.setAttribute("role", "tab");
      b.setAttribute("aria-label", `Go to slide ${i + 1}`);
      const handler = () => this.goTo(i);
      b.addEventListener("click", handler);
      this.pagination.appendChild(b);
      return b;
    });
  }

  _bind() {
    const addEv = (target, type, handler) => {
      if (!target) return;
      target.addEventListener(type, handler);
      this.cleanupFns.push(() => target.removeEventListener(type, handler));
    };

    if (this.prevBtn) addEv(this.prevBtn, "click", () => this.prev());
    if (this.nextBtn) addEv(this.nextBtn, "click", () => this.next());

    if (this.opts.keyboard) {
      addEv(this.root, "keydown", (e) => {
        if (e.key === "ArrowLeft") this.prev();
        if (e.key === "ArrowRight") this.next();
      });
    }

    const pe = this.viewport;
    if (pe) {
      addEv(pe, "pointerdown", (e) => this._onDragStart(e));
      addEv(pe, "pointermove", (e) => this._onDragMove(e));
      addEv(pe, "pointerup", (e) => this._onDragEnd(e));
      addEv(pe, "pointercancel", (e) => this._onDragEnd(e));
      addEv(pe, "pointermove", (e) => this._onTilt(e));
    }

    addEv(this.root, "mouseenter", () => {
      this.state.hovering = true;
      this.state.pausedAt = performance.now();
    });

    addEv(this.root, "mouseleave", () => {
      if (this.state.pausedAt) {
        this.state.startTime += performance.now() - this.state.pausedAt;
        this.state.pausedAt = 0;
      }
      this.state.hovering = false;
    });

    if (typeof ResizeObserver !== "undefined" && this.viewport) {
      this.ro = new ResizeObserver(() => this._measure());
      this.ro.observe(this.viewport);
    }

    this.opts.breakpoints.forEach((bp) => {
      if (typeof window === "undefined" || !window.matchMedia) return;
      const m = window.matchMedia(bp.mq);
      const apply = () => {
        Object.keys(bp).forEach((k) => {
          if (k !== "mq") this.opts[k] = bp[k];
        });
        this._measure();
        this._render();
      };
      if (m.addEventListener) {
        m.addEventListener("change", apply);
        this.cleanupFns.push(() => m.removeEventListener("change", apply));
      } else if (m.addListener) {
        m.addListener(apply);
        this.cleanupFns.push(() => m.removeListener(apply));
      }
      if (m.matches) apply();
    });

    const onOrient = () => setTimeout(() => this._measure(), 250);
    addEv(window, "orientationchange", onOrient);
  }

  _measure() {
    if (!this.viewport || !this.root) return;
    const viewRect = this.viewport.getBoundingClientRect();
    const rootRect = this.root.getBoundingClientRect();
    const pagRect = this.pagination
      ? this.pagination.getBoundingClientRect()
      : { height: 0, bottom: rootRect.bottom };
    const bottomGap = Math.max(12, Math.round(rootRect.bottom - pagRect.bottom));
    const pagSpace = (pagRect.height || 40) + bottomGap;
    const availH = viewRect.height - pagSpace;
    const cardH = Math.max(320, Math.min(640, Math.round(availH)));
    this.state.width = viewRect.width;
    this.state.height = viewRect.height;
    this.state.gap = this.opts.gap;
    this.slideW = Math.min(880, this.state.width * (1 - this.opts.peek * 2));
    this.root.style.setProperty("--mzaPagH", `${pagSpace}px`);
    this.root.style.setProperty("--mzaCardH", `${cardH}px`);
  }

  _onTilt(e) {
    if (!this.viewport) return;
    const r = this.viewport.getBoundingClientRect();
    const mx = (e.clientX - r.left) / r.width - 0.5;
    const my = (e.clientY - r.top) / r.height - 0.5;
    this.root.style.setProperty("--mzaTiltX", (my * -6).toFixed(3));
    this.root.style.setProperty("--mzaTiltY", (mx * 6).toFixed(3));
  }

  _onDragStart(e) {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    this.state.dragging = true;
    this.state.pointerId = e.pointerId;
    if (this.viewport && typeof this.viewport.setPointerCapture === "function") {
      try {
        this.viewport.setPointerCapture(e.pointerId);
      } catch (err) {}
    }
    this.state.x0 = e.clientX;
    this.state.t0 = performance.now();
    this.state.v = 0;
    this.state.pausedAt = performance.now();
  }

  _onDragMove(e) {
    if (!this.state.dragging || e.pointerId !== this.state.pointerId) return;
    const dx = e.clientX - this.state.x0;
    const dt = Math.max(16, performance.now() - this.state.t0);
    this.state.v = dx / dt;
    const slideSpan = this.slideW + this.state.gap;
    this.state.pos = this._mod(this.state.index - dx / slideSpan, this.n);
    this._render();
  }

  _onDragEnd(e) {
    if (!this.state.dragging || (e && e.pointerId !== this.state.pointerId)) return;
    this.state.dragging = false;
    if (
      this.viewport &&
      this.state.pointerId != null &&
      typeof this.viewport.releasePointerCapture === "function"
    ) {
      try {
        this.viewport.releasePointerCapture(this.state.pointerId);
      } catch (err) {}
    }
    this.state.pointerId = null;
    if (this.state.pausedAt) {
      this.state.startTime += performance.now() - this.state.pausedAt;
      this.state.pausedAt = 0;
    }
    const v = this.state.v;
    const threshold = 0.18;
    let target = Math.round(
      this.state.pos - Math.sign(v) * (Math.abs(v) > threshold ? 0.5 : 0)
    );
    this.goTo(this._mod(target, this.n));
  }

  _startCycle() {
    this.state.startTime = performance.now();
    this._renderProgress(0);
  }

  _loop() {
    const step = (t) => {
      if (!this.destroyed && !this.state.dragging && !this.state.hovering && !this.state.animating) {
        const elapsed = t - this.state.startTime;
        const p = Math.min(1, elapsed / this.opts.interval);
        this._renderProgress(p);
        if (elapsed >= this.opts.interval) this.next();
      }
      if (!this.destroyed) {
        this.state.rafId = requestAnimationFrame(step);
      }
    };
    this.state.rafId = requestAnimationFrame(step);
  }

  _renderProgress(p) {
    if (this.progressBar) {
      this.progressBar.style.transform = `scaleX(${p})`;
    }
  }

  prev() {
    this.goTo(this._mod(this.state.index - 1, this.n));
  }

  next() {
    this.goTo(this._mod(this.state.index + 1, this.n));
  }

  goTo(i, animate = true) {
    const start = this.state.pos || this.state.index;
    const end = this._nearest(start, i);
    const dur = animate ? this.opts.transitionMs : 0;
    const t0 = performance.now();
    const ease = (x) => 1 - Math.pow(1 - x, 4);
    this.state.animating = true;
    const step = (now) => {
      if (this.destroyed) return;
      const t = Math.min(1, (now - t0) / dur);
      const p = dur ? ease(t) : 1;
      this.state.pos = start + (end - start) * p;
      this._render();
      if (t < 1) requestAnimationFrame(step);
      else this._afterSnap(i);
    };
    requestAnimationFrame(step);
  }

  _afterSnap(i) {
    this.state.index = this._mod(Math.round(this.state.pos), this.n);
    this.state.pos = this.state.index;
    this.state.animating = false;
    this._render(true);
    this._startCycle();
  }

  _nearest(from, target) {
    let d = target - Math.round(from);
    if (d > this.n / 2) d -= this.n;
    if (d < -this.n / 2) d += this.n;
    return Math.round(from) + d;
  }

  _mod(i, n) {
    return ((i % n) + n) % n;
  }

  _render(markActive = false) {
    const span = this.slideW + this.state.gap;
    const tiltX = parseFloat(this.root.style.getPropertyValue("--mzaTiltX") || 0);
    const tiltY = parseFloat(this.root.style.getPropertyValue("--mzaTiltY") || 0);

    for (let i = 0; i < this.n; i++) {
      let d = i - this.state.pos;
      if (d > this.n / 2) d -= this.n;
      if (d < -this.n / 2) d += this.n;
      const weight = Math.max(0, 1 - Math.abs(d) * 2);
      const biasActive = -this.slideW * this.opts.activeLeftBias * weight;
      const tx = d * span + biasActive;
      const depth = -Math.abs(d) * this.opts.zDepth;
      const rot = -d * this.opts.rotateY;
      const scale = 1 - Math.min(Math.abs(d) * this.opts.scaleDrop, 0.42);
      const blur = Math.min(Math.abs(d) * this.opts.blurMax, this.opts.blurMax);
      const z = Math.round(1000 - Math.abs(d) * 10);
      const s = this.slides[i];
      if (!s) continue;

      if (this.isFF) {
        s.style.transform = `translate(${tx}px,-50%) scale(${scale})`;
        s.style.filter = "none";
      } else {
        s.style.transform = `translate3d(${tx}px,-50%,${depth}px) rotateY(${rot}deg) scale(${scale})`;
        s.style.filter = `blur(${blur}px)`;
      }
      s.style.zIndex = z;
      if (markActive) {
        s.dataset.state = Math.round(this.state.index) === i ? "active" : "rest";
      }
      const card = s.querySelector(".mzaCard");
      if (card) {
        const parBase = Math.max(-1, Math.min(1, -d));
        const parX = parBase * 48 + tiltY * 2.0;
        const parY = tiltX * -1.5;
        const bgX = parBase * -64 + tiltY * -2.4;
        card.style.setProperty("--mzaParX", `${parX.toFixed(2)}px`);
        card.style.setProperty("--mzaParY", `${parY.toFixed(2)}px`);
        card.style.setProperty("--mzaParBgX", `${bgX.toFixed(2)}px`);
        card.style.setProperty("--mzaParBgY", `${(parY * 0.35).toFixed(2)}px`);
      }
    }

    const active = this._mod(Math.round(this.state.pos), this.n);
    if (this.dots) {
      this.dots.forEach((dot, idx) =>
        dot.setAttribute("aria-selected", idx === active ? "true" : "false")
      );
    }
  }

  destroy() {
    this.destroyed = true;
    if (this.state.rafId) cancelAnimationFrame(this.state.rafId);
    if (this.ro) this.ro.disconnect();
    this.cleanupFns.forEach((fn) => fn());
  }
}

export default function MzaCarousel({ projects = defaultProjects, navigate }) {
  const rootRef = useRef(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const engine = new MzaCarouselEngine(rootRef.current, {
      transitionMs: 900,
    });
    return () => {
      engine.destroy();
    };
  }, [projects]);

  return (
    <div
      className="mzaCarousel"
      ref={rootRef}
      id="mzaCarousel"
      aria-roledescription="carousel"
      aria-label="Featured cards"
    >
      <div className="mzaCarousel-viewport" tabIndex={0}>
        <div className="mzaCarousel-track">
          {projects.map((item, idx) => (
            <article
              key={item.id || idx}
              className="mzaCarousel-slide"
              role="group"
              aria-roledescription="slide"
              aria-label={`${idx + 1} of ${projects.length}`}
            >
              <div
                className="mzaCard"
                style={{ "--mzaCard-bg": `url('${item.img}')` }}
              >
                <header className="mzaCard-head mzaPar-1">
                  <h2 className="mzaCard-title">{item.title}</h2>
                  <p className="mzaCard-kicker">{item.kicker}</p>
                </header>
                <p className="mzaCard-text mzaPar-2">{item.text}</p>
                <footer className="mzaCard-actions mzaPar-3">
                  {item.caseSlug && navigate && (
                    <button
                      type="button"
                      className="mzaBtn mzaBtn-secondary"
                      onClick={() => navigate({ page: "case", caseSlug: item.caseSlug })}
                    >
                      Read Case Study
                    </button>
                  )}
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mzaBtn"
                  >
                    {item.ctaText || "View Live Site"} <ArrowIcon />
                  </a>
                </footer>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mzaCarousel-controls" aria-label="Controls">
        <button
          className="mzaCarousel-prev"
          aria-label="Previous slide"
          type="button"
        >
          ‹
        </button>
        <button
          className="mzaCarousel-next"
          aria-label="Next slide"
          type="button"
        >
          ›
        </button>
      </div>

      <div
        className="mzaCarousel-pagination"
        role="tablist"
        aria-label="Slide navigation"
      />
      <div className="mzaCarousel-progress" aria-hidden="true">
        <span className="mzaCarousel-progressBar" />
      </div>
    </div>
  );
}
