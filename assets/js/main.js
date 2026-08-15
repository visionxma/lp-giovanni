/* LP Giovanni — envia o clique do CTA para o dataLayer (GTM) */
(function () {
  'use strict';

  window.dataLayer = window.dataLayer || [];

  document.querySelectorAll('[data-cta]').forEach(function (link) {
    link.addEventListener('click', function () {
      window.dataLayer.push({
        event: 'cta_telegram_click',
        cta_position: link.getAttribute('data-cta'),
        link_url: link.getAttribute('href')
      });
    });
  });
})();
