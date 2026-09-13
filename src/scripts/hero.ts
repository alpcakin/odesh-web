const STAGE_WIDTH = 560;

/** Scales the fixed-size phone stage down to fit its column width. */
export function initHeroStage(): void {
  const stage = document.querySelector<HTMLElement>('[data-hero-stage]');
  if (!stage) return;

  let current = '';
  const apply = (width: number) => {
    const scale = Math.min(1, width / STAGE_WIDTH).toFixed(4);
    if (scale === current) return;
    current = scale;
    requestAnimationFrame(() => stage.style.setProperty('--phone-scale', scale));
  };

  apply(stage.clientWidth);
  new ResizeObserver((entries) => {
    for (const entry of entries) apply(entry.contentRect.width);
  }).observe(stage);
}

export function initHeroCarousel(): void {
  const root = document.querySelector<HTMLElement>('[data-hero-carousel]');
  if (!root) return;

  const slides = Array.from(root.querySelectorAll<HTMLElement>('[data-slide]'));
  const dots = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-dot]'));
  const interval = Number(root.dataset.interval) || 4200;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let current = 0;
  let timer: number | undefined;
  let visible = true;
  let hovered = false;

  const render = () => {
    slides.forEach((slide, i) => {
      slide.classList.toggle('is-active', i === current);
      slide.classList.toggle('is-prev', i < current);
      slide.classList.toggle('is-next', i > current);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === current);
      dot.setAttribute('aria-selected', String(i === current));
    });
  };

  const goTo = (index: number) => {
    current = (index + slides.length) % slides.length;
    render();
  };

  const stop = () => {
    if (timer !== undefined) window.clearInterval(timer);
    timer = undefined;
  };

  const start = () => {
    stop();
    if (reducedMotion || !visible || hovered) return;
    timer = window.setInterval(() => goTo(current + 1), interval);
  };

  dots.forEach((dot, i) =>
    dot.addEventListener('click', () => {
      goTo(i);
      start();
    }),
  );

  root.addEventListener('mouseenter', () => {
    hovered = true;
    stop();
  });
  root.addEventListener('mouseleave', () => {
    hovered = false;
    start();
  });

  new IntersectionObserver(
    (entries) => {
      visible = entries.some((e) => e.isIntersecting);
      start();
    },
    { threshold: 0.2 },
  ).observe(root);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else start();
  });

  render();
  start();
}
