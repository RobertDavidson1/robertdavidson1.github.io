// One-image scroll: we map section scroll progress (0..1) to a translateY (0..panMax px).
const section = document.getElementById('scroll-scene');
const img = document.getElementById('tall');

let panMax = 0; // in pixels; computed from rendered image height - viewport height

function computePanMax() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  // Rendered height of the image when width = 100vw
  const renderedH = (img.naturalHeight / img.naturalWidth) * vw;
  panMax = Math.max(0, renderedH - vh);
}

function onScroll() {
  const vh = window.innerHeight;
  const rect = section.getBoundingClientRect();
  const total = rect.height - vh; // scrollable distance while pinned
  if (total <= 0) return;

  const freezeStart = parseFloat(section.dataset.freezeStart || '0.2');
  const freezeEnd   = parseFloat(section.dataset.freezeEnd   || '0.8');

  // progress through section (0..1)
  const p = Math.min(1, Math.max(0, (0 - rect.top) / total));

  // piecewise: hold, then move, then hold
  let t; // 0..1 movement factor
  if (p < freezeStart) {
    t = 0;
  } else if (p > freezeEnd) {
    t = 1;
  } else {
    t = (p - freezeStart) / (freezeEnd - freezeStart);
  }

  const translatePx = -t * panMax; // negative to pan upward
  img.style.transform = `translateY(${translatePx}px)`;
}

function init() {
  // Wait for image metrics, then compute pan and bind events
  const ready = () => { computePanMax(); onScroll(); };
  if (img.complete && img.naturalWidth) ready();
  else img.addEventListener('load', ready, { once: true });

  window.addEventListener('resize', () => { computePanMax(); onScroll(); });
  window.addEventListener('scroll', onScroll, { passive: true });
}

init();