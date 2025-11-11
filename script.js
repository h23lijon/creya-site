document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.navbar ul');
  
    toggle.addEventListener('click', function () {
      nav.classList.toggle('active');
    });
  });

(function () {
  const OVERLAY_ID = 'introOverlay';
  const VIDEO_ID = 'introVideo';
  const SKIP_ID = 'skipBtn';
  const FLAG = 'introPlayedThisSession';

  const overlay = document.getElementById(OVERLAY_ID);
  const video = document.getElementById(VIDEO_ID);
  const skip = document.getElementById(SKIP_ID);

  if (!overlay || !video) return;

  const alreadyPlayed = sessionStorage.getItem(FLAG) === '1';

  function hideOverlay() {
    overlay.classList.add('is-hidden');
    overlay.setAttribute('aria-hidden', 'true');
  }

  function markPlayed() {
    try { sessionStorage.setItem(FLAG, '1'); } catch (_) {}
  }

  if (!alreadyPlayed) {
    // Första gången i sessionen – spela upp videon
    video.muted = true;
    video.play().catch(() => {});
    markPlayed();
  } else {
    // Redan spelad – dölj overlay direkt
    hideOverlay();
  }

  video.addEventListener('ended', hideOverlay);

  if (skip) skip.addEventListener('click', hideOverlay);

  // Klick på overlay för att stänga
  overlay.addEventListener('click', (e) => {
    if (e.target !== skip) hideOverlay();
  });

  // Stäng om man klickar/fokuserar i ett formulärfält
  function shouldDismissOn(el) {
    if (!el) return false;
    if (el.matches('input, textarea, select')) return true;
    if (el.isContentEditable) return true;
    return false;
  }

  document.addEventListener('focusin', (e) => {
    if (shouldDismissOn(e.target)) hideOverlay();
  });

  document.addEventListener('click', (e) => {
    if (shouldDismissOn(e.target)) hideOverlay();
  });

})();

  

  //navbaren vid scroll//
  const hero = document.querySelector('.hero-section-ill') || document.querySelector('.hero-section');
const header = document.querySelector('.site-header');
const logo = document.querySelector('.header-logo');

// Scroll: lägger till 'scrolled' klass och byter logga
window.addEventListener('scroll', () => {
  const heroBottom = hero.getBoundingClientRect().bottom;

  if (heroBottom <= 0) {
    header.classList.add('scrolled');
    header.classList.remove('hover-scrolled'); // ta bort ev. hoverklass
    if (logo) logo.src = 'img/creya6.svg';
  } else {
    header.classList.remove('scrolled');
    if (logo) logo.src = 'img/cre.svg';
  }
});

// Hover: lägg till 'hover-scrolled' och byt logga till blå
header.addEventListener('mouseenter', () => {
  if (!header.classList.contains('scrolled')) {
    header.classList.add('hover-scrolled');
    if (logo) logo.src = 'img/creya6.svg';
  }
});

// Tar bort hoverklass och byt tillbaka till vit logga om i hero
header.addEventListener('mouseleave', () => {
  header.classList.remove('hover-scrolled');
  const heroBottom = hero.getBoundingClientRect().bottom;
  if (heroBottom > 0 && logo) {
    logo.src = 'img/cre.svg';
  }
});

  // Öppna/stäng formulär-modal
function openFormModal() {
  document.getElementById("formModal").style.display = "flex";
}

function closeFormModal() {
  document.getElementById("formModal").style.display = "none";
}

// Hantera formulär-sändning
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  closeFormModal();
  document.getElementById("thankModal").style.display = "flex";
});

function closeThankModal() {
  document.getElementById("thankModal").style.display = "none";
}

const textarea = document.getElementById("meddelande");
const charCount = document.getElementById("charCount");

if (textarea && charCount) {
  textarea.addEventListener("input", () => {
    const remaining = 200 - textarea.value.length;
    charCount.textContent = `${remaining} tecken kvar`;
    charCount.style.color = remaining < 20 ? "#b30000" : "#666";
  });
}

// Stäng modal när man klickar utanför innehållet
const formModal = document.getElementById("formModal");
const thankModal = document.getElementById("thankModal");

if (formModal) {
  formModal.addEventListener("click", function (e) {
    if (e.target === this) {
      closeFormModal();
    }
  });
}

if (thankModal) {
  thankModal.addEventListener("click", function (e) {
    if (e.target === this) {
      closeThankModal();
    }
  });
}

const openFormButton = document.getElementById("openFormButton");
if (openFormButton) {
  openFormButton.addEventListener("click", openFormModal);
}

const resetForm = document.getElementById("resetForm");
if (resetForm) {
  resetForm.addEventListener("click", () => {
    document.getElementById("contactForm").reset();
    const charCount = document.getElementById("charCount");
    if (charCount) charCount.textContent = "200 tecken kvar";
  });
}

// === Mini-slider för portfolio-cards ===
(function initPortfolioSliders() {
  const sliders = document.querySelectorAll('.portfolio-slider');
  if (!sliders.length) return;

  sliders.forEach((slider) => {
    const slides = Array.from(slider.querySelectorAll('.portfolio-slide'));
    if (slides.length <= 1) return;

    const prevBtn = slider.querySelector('.portfolio-slider-btn.prev');
    const nextBtn = slider.querySelector('.portfolio-slider-btn.next');
    const dotsWrap = slider.querySelector('.portfolio-slider-dots');

    let index = slides.findIndex(s => s.classList.contains('active'));
    if (index === -1) index = 0;

    // Bygg dots
    const dots = slides.map((_, i) => {
      const b = document.createElement('button');
      if (i === index) b.classList.add('is-active');
      b.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(b);
      return b;
    });

    function goTo(i) {
      slides[index].classList.remove('active');
      dots[index].classList.remove('is-active');
      index = (i + slides.length) % slides.length;
      slides[index].classList.add('active');
      dots[index].classList.add('is-active');
    }

    function next() { goTo(index + 1); }
    function prev() { goTo(index - 1); }

    if (nextBtn) nextBtn.addEventListener('click', next);
    if (prevBtn) prevBtn.addEventListener('click', prev);

    // Auto-play (kan styras via data-attribut)
    let timer = null;
    const autoplay = slider.dataset.autoplay === 'true';
    const interval = Number(slider.dataset.interval || 4000);

    function start() {
      if (!autoplay) return;
      stop();
      timer = setInterval(next, interval);
    }
    function stop() { if (timer) clearInterval(timer); }

    slider.addEventListener('mouseenter', stop);
    slider.addEventListener('mouseleave', start);
    slider.addEventListener('touchstart', stop, { passive: true });
    slider.addEventListener('touchend', start);

    start();
  });
})();

(function initLightbox() {
  const overlay = document.querySelector('.lightbox-overlay');
  const slides = document.querySelectorAll('.lightbox-slide, .portfolio-slide img');
  
  if (!overlay || !slides.length) return;

  const overlayImg = overlay.querySelector('img');
  const closeBtn = overlay.querySelector('.lightbox-close');

  function openLightbox(src, alt) {
    overlayImg.src = src;
    overlayImg.alt = alt || 'Förstorad bild';
    overlay.classList.add('active');
  }

  function closeLightbox() {
    overlay.classList.remove('active');
    setTimeout(() => (overlayImg.src = ''), 300);
  }

  slides.forEach(slide => {
    slide.addEventListener('click', () => openLightbox(slide.src, slide.alt));
    slide.style.cursor = 'zoom-in';
  });

  overlay.addEventListener('click', e => {
    if (e.target === overlay || e.target === closeBtn) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
  });
})();

// === Lightbox för portfolio cards med flera bilder ===
(() => {
  const cards = document.querySelectorAll('.card');
  const lb = document.getElementById('lightbox');
  const imgEl = lb.querySelector('.lb-img');
  const btnPrev = lb.querySelector('.prev');
  const btnNext = lb.querySelector('.next');
  const btnClose = lb.querySelector('.lb-close');

  let gallery = [];    // aktuella bildvägar
  let index = 0;       // nuvarande position

  function openLB(imgs, start = 0){
    gallery = imgs;
    index = start;
    updateImg();
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLB(){
    lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    gallery = [];
    index = 0;
  }

  function updateImg(){
    imgEl.src = gallery[index];
    imgEl.alt = '';
  }

  function next(){ index = (index + 1) % gallery.length; updateImg(); }
  function prev(){ index = (index - 1 + gallery.length) % gallery.length; updateImg(); }

  cards.forEach(card => {
    const btn = card.querySelector('.card-link');
    const imgs = card.dataset.images
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    btn.addEventListener('click', () => openLB(imgs, 0));
    // även klick direkt på bilden
    card.querySelector('img').addEventListener('click', () => openLB(imgs, 0));
  });

  btnClose.addEventListener('click', closeLB);
  btnNext.addEventListener('click', next);
  btnPrev.addEventListener('click', prev);

  // stäng vid klick utanför bilden
  lb.addEventListener('click', (e) => {
    if (e.target === lb) closeLB();
  });

  // tangentbord
  document.addEventListener('keydown', (e) => {
    if (lb.getAttribute('aria-hidden') === 'true') return;
    if (e.key === 'Escape') closeLB();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });

  // enkel swipe på touch
  let startX = null;
  imgEl.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, {passive:true});
  imgEl.addEventListener('touchend', (e) => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
    startX = null;
  }, {passive:true});
})();

