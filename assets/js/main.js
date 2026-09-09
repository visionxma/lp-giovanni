/* LP Giovanni — envia o clique do CTA para o dataLayer (GTM) */
(function () {
  'use strict';

  window.dataLayer = window.dataLayer || [];

  document.querySelectorAll('[data-cta]').forEach(function (link) {
    link.addEventListener('click', function () {
      var destino = link.getAttribute('data-destino') || '';
      var url = link.getAttribute('href') || '';

      var payload = {
        cta_position: link.getAttribute('data-cta'),
        cta_destino: destino,
        link_url: url
      };

      // evento único, com o destino como parâmetro
      window.dataLayer.push(Object.assign({ event: 'cta_click' }, payload));

      // eventos por canal, para gatilhos mais simples no GTM
      // (cta_telegram_click já era usado antes das rotas existirem)
      var evento = /whatsapp/i.test(url) ? 'cta_whatsapp_click' : 'cta_telegram_click';
      window.dataLayer.push(Object.assign({ event: evento }, payload));
    });
  });
})();
