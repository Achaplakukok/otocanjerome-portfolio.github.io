const typingEl = document.getElementById("typing");
const phrases = [
  "BSIT Student",
  "Game Developer",
  "Aspiring Software Engineer",
  "Unity 2D • C# • SQL",
  "Educational Games & UX"
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
  const current = phrases[phraseIndex];
  const nextText = current.substring(0, charIndex);
  typingEl.textContent = nextText;

  if (!isDeleting && charIndex < current.length) {
    charIndex += 1;
    setTimeout(typeLoop, 70);
    return;
  }

  if (isDeleting && charIndex > 0) {
    charIndex -= 1;
    setTimeout(typeLoop, 45);
    return;
  }

  if (!isDeleting) {
    isDeleting = true;
    setTimeout(typeLoop, 1200);
  } else {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    setTimeout(typeLoop, 300);
  }
}

typeLoop();

const revealEls = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.2 }
);

revealEls.forEach((el) => revealObserver.observe(el));

const counters = document.querySelectorAll(".stat-number");
const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.count);
      let current = 0;
      const step = Math.max(1, Math.floor(target / 60));
      const tick = () => {
        current += step;
        if (current >= target) {
          el.textContent = target;
          return;
        }
        el.textContent = current;
        requestAnimationFrame(tick);
      };
      tick();
      observer.unobserve(el);
    });
  },
  { threshold: 0.6 }
);

counters.forEach((el) => counterObserver.observe(el));
