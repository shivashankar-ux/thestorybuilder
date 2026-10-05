// StoryBuilder Reels Landing Page Interactions

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navbar scroll effect
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  // 2. Mobile menu toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
    navLinks.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => navLinks.classList.remove('open'))
    );
  }

  // 3. Pricing tabs
  const tabs = document.querySelectorAll('.tab');
  const plans = document.querySelectorAll('.plan');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.dataset.tab;
      plans.forEach(p => {
        const match = p.dataset.cat === cat;
        p.classList.toggle('hidden', !match);
        if (match) {
          p.style.opacity = '0';
          p.style.transform = 'translateY(14px)';
          setTimeout(() => {
            p.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            p.style.opacity = '1';
            p.style.transform = 'none';
          }, 30);
        }
      });
    });
  });

  // 4. FAQ accordion
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  // 5. Lightbox 9:16 Video Player Modal
  const reelCards = document.querySelectorAll('.story-card');
  const reelModal = document.getElementById('reelModal');
  const modalIframe = document.getElementById('modalIframe');
  const modalClose = document.getElementById('modalClose');
  const modalBackdrop = document.getElementById('modalBackdrop');

  const openReelModal = (videoId) => {
    if (!videoId || !reelModal || !modalIframe) return;
    modalIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
    reelModal.classList.add('active');
  };

  const closeReelModal = () => {
    if (!reelModal || !modalIframe) return;
    reelModal.classList.remove('active');
    setTimeout(() => { modalIframe.src = ''; }, 300);
  };

  reelCards.forEach(card => {
    card.addEventListener('click', () => {
      const videoId = card.dataset.video;
      if (videoId) openReelModal(videoId);
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeReelModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeReelModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && reelModal && reelModal.classList.contains('active')) {
      closeReelModal();
    }
  });

  // 6. Scroll reveal animations
  const revealEls = document.querySelectorAll(
    '.feature-block, .feature-mini, .plan, .testi, .why-item, .stat, .faq-item, .hero-points .point'
  );
  revealEls.forEach(el => el.classList.add('reveal'));
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), (i % 4) * 80);
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  // 7. Counter animation for stats
  const stats = document.querySelectorAll('.stat strong');
  if ('IntersectionObserver' in window) {
    const statObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const raw = el.textContent.trim();
        const isFloat = raw.includes('.');
        const target = parseFloat(raw.replace(/[^0-9.]/g, ''));
        const suffix = raw.replace(/[0-9.,]/g, '');
        let start = null;
        const dur = 1400;
        const step = ts => {
          if (!start) start = ts;
          const p = Math.min((ts - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          const val = target * eased;
          el.textContent = (isFloat ? val.toFixed(1) : Math.round(val).toLocaleString('en-IN')) + suffix;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        statObserver.unobserve(el);
      });
    }, { threshold: 0.5 });
    stats.forEach(s => statObserver.observe(s));
  }

  // 8. Booking form submission & WhatsApp redirection
  const bookForm = document.getElementById('bookForm');
  if (bookForm) {
    bookForm.addEventListener('submit', e => {
      e.preventDefault();
      const submitBtn = document.getElementById('submitBtn');
      const formMsg = document.getElementById('formMsg');
      
      const name = document.getElementById('formName')?.value || '';
      const code = document.getElementById('formCountryCode')?.value || '+91';
      const phone = document.getElementById('formPhone')?.value || '';
      const brand = document.getElementById('formBrand')?.value || '';
      const pkg = document.getElementById('formPackage')?.value || '';
      const city = document.getElementById('formCity')?.value || '';
      const date = document.getElementById('formDate')?.value || '';
      const notes = document.getElementById('formNotes')?.value || '';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting Booking...';
      }

      // Format WhatsApp message
      const text = `Hi StoryBuilder team! I want to book a Reels Shoot Session:\n\n👤 Name: ${name}\n📞 Phone: ${code} ${phone}\n🏢 Brand: ${brand}\n📦 Package: ${pkg}\n📍 City: ${city}\n📅 Date: ${date}\n📝 Goals: ${notes}`;
      const waUrl = `https://wa.me/919989679185?text=${encodeURIComponent(text)}`;

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.textContent = 'Enquiry Sent Successfully ✓';
          submitBtn.style.background = '#10b981';
        }
        if (formMsg) {
          formMsg.style.display = 'block';
          formMsg.style.color = '#34d399';
          formMsg.innerHTML = `🎉 Thank you <strong>${name}</strong>! Redirecting you to WhatsApp to confirm your shoot details...`;
        }

        setTimeout(() => {
          window.open(waUrl, '_blank');
          bookForm.reset();
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Booking Enquiry →';
            submitBtn.style.background = '';
          }
        }, 1500);
      }, 600);
    });
  }
});
