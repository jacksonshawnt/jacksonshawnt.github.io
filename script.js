/* Progressive enhancements only. All portfolio content is readable without JavaScript. */
document.documentElement.classList.add('js');
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#primary-nav');
if (toggle && nav) {
  const closeMenu = () => { nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); toggle.textContent = 'Menu'; };
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
    toggle.textContent = open ? 'Close' : 'Menu';
  });
  nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { closeMenu(); toggle.focus(); } });
}
document.querySelectorAll('[data-year]').forEach(element => { element.textContent = new Date().getFullYear(); });
/* Native dialog enhancement. Original image URLs remain usable without JavaScript. */
(() => {
  const links = [...document.querySelectorAll('a[data-view-image]')];
  if (!links.length || typeof HTMLDialogElement === 'undefined' ||
      typeof HTMLDialogElement.prototype.showModal !== 'function') return;

  const viewer = document.createElement('dialog');
  viewer.className = 'sample-viewer';
  viewer.setAttribute('aria-labelledby', 'sample-viewer-title');
  viewer.innerHTML = `<div class="sample-viewer-header">
    <h2 id="sample-viewer-title">Work sample</h2>
    <button class="viewer-close" type="button" autofocus>Close</button>
  </div>
  <div class="sample-viewer-controls">
    <button class="viewer-size" type="button" aria-pressed="false">Show actual size</button>
    <a class="viewer-original" target="_blank" rel="noopener noreferrer">Open original image ↗</a>
  </div>
  <div class="viewer-scroll"><img class="viewer-image" alt=""></div>
  <p class="viewer-caption"></p>
  <p class="viewer-status" role="status" aria-live="polite"></p>`;
  document.body.append(viewer);
  const title = viewer.querySelector('h2');
  const close = viewer.querySelector('.viewer-close');
  const size = viewer.querySelector('.viewer-size');
  const original = viewer.querySelector('.viewer-original');
  const image = viewer.querySelector('img');
  const caption = viewer.querySelector('.viewer-caption');
  const status = viewer.querySelector('.viewer-status');
  const scroll = viewer.querySelector('.viewer-scroll');
  let opener = null;

  const fitImage = () => {
    viewer.classList.remove('is-actual-size');
    size.setAttribute('aria-pressed', 'false');
    size.textContent = 'Show actual size';
    scroll.scrollTop = 0;
    scroll.scrollLeft = 0;
  };
  close.addEventListener('click', () => viewer.close());
  size.addEventListener('click', () => {
    const actual = viewer.classList.toggle('is-actual-size');
    size.setAttribute('aria-pressed', String(actual));
    size.textContent = actual ? 'Fit to screen' : 'Show actual size';
  });
  viewer.addEventListener('click', event => {
    if (event.target !== viewer) return;
    const box = viewer.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right ||
        event.clientY < box.top || event.clientY > box.bottom) viewer.close();
  });
  viewer.addEventListener('close', () => {
    document.body.classList.remove('sample-viewer-open');
    if (opener && opener.isConnected) opener.focus();
  });
  image.addEventListener('load', () => { if (viewer.open) status.textContent = ''; });
  image.addEventListener('error', () => {
    if (viewer.open) status.textContent = 'The image could not be loaded. Try opening the original image using the link above.';
  });

  links.forEach(link => {
    link.addEventListener('click', event => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const figure = link.closest('figure');
      const sourceImage = link.querySelector('img') ||
        [...(figure?.querySelectorAll('img') || [])].find(img => img.src === link.href);
      const description = sourceImage?.alt || 'Work sample';
      const figcaption = figure?.querySelector('figcaption')?.cloneNode(true);
      figcaption?.querySelectorAll('a').forEach(a => a.remove());
      title.textContent = description;
      image.alt = description;
      image.src = link.href;
      original.href = link.href;
      caption.textContent = figcaption?.textContent.trim() || '';
      status.textContent = 'Loading image…';
      fitImage();
      try {
        viewer.showModal();
      } catch {
        return; // Preserve the normal image link if a dialog cannot be opened.
      }
      event.preventDefault();
      opener = link;
      document.body.classList.add('sample-viewer-open');
      close.focus();
      if (image.complete && image.naturalWidth > 0) status.textContent = '';
    });
  });
})();
