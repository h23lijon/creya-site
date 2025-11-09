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


  const container = document.querySelector('.steps-container');
  const indicators = document.querySelectorAll('.step-indicators span');
  const steps = document.querySelectorAll('.step');

  function updateIndicators() {
    const scrollLeft = container.scrollLeft;
    const stepWidth = steps[0].offsetWidth + 32; // 32 = gap (2rem)
    const index = Math.round(scrollLeft / stepWidth);

    indicators.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  container.addEventListener('scroll', () => {
    window.requestAnimationFrame(updateIndicators);
  });

  // initial set
  updateIndicators();

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

textarea.addEventListener("input", () => {
  const remaining = 200 - textarea.value.length;
  charCount.textContent = `${remaining} tecken kvar`;
  charCount.style.color = remaining < 20 ? "#b30000" : "#666";
});
// Stäng modal när man klickar utanför innehållet
document.getElementById("formModal").addEventListener("click", function (e) {
  // Kolla om man klickar på själva overlayen (och inte innehållet)
  if (e.target === this) {
    closeFormModal();
  }
});

document.getElementById("thankModal").addEventListener("click", function (e) {
  if (e.target === this) {
    closeThankModal();
  }
});

document.getElementById("openFormButton").addEventListener("click", openFormModal);

document.getElementById("resetForm").addEventListener("click", () => {
  document.getElementById("contactForm").reset();

  // Återställ charCount
  const charCount = document.getElementById("charCount");
  if (charCount) charCount.textContent = "200 tecken kvar";
});

const slides = document.querySelectorAll(".slide");
const slideshow = document.getElementById("slideshow");
let currentSlide = 0;
let paused = false;
let interval;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
}

function nextSlide() {
  if (!paused) {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }
}

function startSlideshow() {
  interval = setInterval(nextSlide, 3000); // 3 sek per slide
}

function togglePause() {
  paused = !paused;
}

slideshow.addEventListener("click", togglePause);

startSlideshow();