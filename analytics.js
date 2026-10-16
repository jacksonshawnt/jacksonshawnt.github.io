/* Portfolio interaction tracking for GA4. The Google tag in each page's head
   owns page views and enhanced measurement. This file records intent only. */
(() => {
  'use strict';
  if (window.__portfolioAnalyticsBound) return;
  window.__portfolioAnalyticsBound = true;

  const measurementId = 'G-2E8MTGZ11D';
  const resumePath = '/assets/shawn-jackson-resume.pdf';

  function placement(link) {
    if (link.closest('.site-header')) return 'header';
    if (link.closest('#banner, .case-hero')) return 'hero';
    if (link.closest('.contact-section')) return 'contact';
    if (link.closest('.case-next')) return 'next_project';
    if (link.closest('.site-footer')) return 'footer';
    return 'content';
  }

  function track(event) {
    if (event.type === 'auxclick' ? event.button !== 1 : event.button > 0) return;
    const target = event.target instanceof Element ? event.target : event.target?.parentElement;
    const link = target?.closest('a[href]');
    if (!link || typeof window.gtag !== 'function') return;

    let url;
    try {
      url = new URL(link.getAttribute('href'), document.baseURI);
    } catch {
      return;
    }

    let name;
    const params = {
      send_to: measurementId,
      page_path: window.location.pathname,
      link_position: placement(link)
    };

    if (url.protocol === 'mailto:') {
      name = 'contact_click';
      params.contact_method = 'email';
    } else if (url.protocol === 'https:' &&
               /(^|\.)linkedin\.com$/i.test(url.hostname)) {
      name = 'contact_click';
      params.contact_method = 'linkedin';
    } else if (url.origin === window.location.origin && url.pathname === resumePath) {
      name = 'resume_click';
    } else if (url.origin === window.location.origin &&
               /^\/case-studies\/[^/]+\.html$/.test(url.pathname) &&
               url.pathname !== window.location.pathname) {
      name = 'case_study_click';
      params.case_study = url.pathname.split('/').pop().replace(/\.html$/, '');
    } else if (link.hasAttribute('data-view-image') &&
               url.origin === window.location.origin) {
      name = 'work_sample_open';
      params.sample_name = url.pathname.split('/').pop();
    } else {
      return;
    }

    // Do not forward email addresses, query strings, link text, or form data.
    // Tracking must never delay or prevent a visitor's navigation.
    try {
      window.gtag('event', name, params);
    } catch {
      // Navigation and the image viewer remain usable if measurement fails.
    }
  }

  document.addEventListener('click', track, true);
  document.addEventListener('auxclick', track, true);
})();
