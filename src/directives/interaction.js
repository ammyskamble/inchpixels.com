/**
 * Hydrates component on first user interaction (pointerdown, touchstart, keydown, focusin, click)
 * or intentional scroll, completely removing hydration scripts from initial load critical path.
 * @type {import('astro').ClientDirective}
 */
export default (load, opts, el) => {
  let hydrated = false;

  const hydrate = async () => {
    if (hydrated) return;
    hydrated = true;
    cleanup();
    try {
      const init = await load();
      await init();
    } catch (err) {
      console.error('[client:interaction] Hydration failed:', err);
    }
  };

  const events = ['pointerdown', 'touchstart', 'keydown', 'focusin', 'click'];

  const cleanup = () => {
    events.forEach((evt) => el.removeEventListener(evt, hydrate));
    window.removeEventListener('scroll', onScroll);
  };

  const onScroll = () => {
    if (window.scrollY > 150) {
      hydrate();
    }
  };

  events.forEach((evt) => el.addEventListener(evt, hydrate, { once: true, passive: true }));
  window.addEventListener('scroll', onScroll, { once: true, passive: true });
};
