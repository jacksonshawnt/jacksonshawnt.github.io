/* Small, one-time reveals; content is visible without JS or observer support. */
(() => {
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)');
  if (reduced?.matches || typeof IntersectionObserver === 'undefined') return;
  const elements = [...document.querySelectorAll('.reveal')];
  if (!elements.length) return;
  let observer;
  const showAll = () => {
    elements.forEach(el => { el.classList.remove('is-pending'); el.classList.add('is-visible'); });
    document.documentElement.classList.remove('motion-ready');
    observer?.disconnect();
  };
  try {
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('is-pending');
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {threshold: 0, rootMargin: '0px 0px 30px 0px'});
    // Never hide an element already visible at startup or targeted by a deep link.
    elements.forEach(el => {
      const box = el.getBoundingClientRect();
      if (box.top >= window.innerHeight && box.height > 0) {
        el.classList.add('is-pending');
        observer.observe(el);
      }
    });
    document.documentElement.classList.add('motion-ready');
    reduced?.addEventListener?.('change', event => { if(event.matches) showAll(); });
    const revealTarget = () => {
      let target;
      try { target = document.getElementById(decodeURIComponent(location.hash.slice(1))); } catch { return; }
      if (!target) return;
      elements.forEach(el => {
        if (el === target || el.contains(target)) {
          el.classList.remove('is-pending'); el.classList.add('is-visible'); observer.unobserve(el);
        }
      });
    };
    window.addEventListener('hashchange', revealTarget);
    revealTarget();
    // Find-in-page, tab navigation and printing should expose all content immediately.
    document.addEventListener('keydown', event => { if (event.key === 'Tab' || ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'f')) showAll(); });
    window.addEventListener('beforeprint', showAll);
  } catch { showAll(); }
})();
