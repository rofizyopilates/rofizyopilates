// ============================================================
// Google Analytics 4 (GA4) Takip Kodu - RO Fizyopilates
// Measurement ID: G-5STPFWZTLG
// ============================================================

(function() {
    var GA_ID = 'G-5STPFWZTLG';

    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', GA_ID);
})();

// WhatsApp butonuna tıklanma olayını izleme
document.addEventListener('DOMContentLoaded', function() {
    var whatsappBtn = document.querySelector('.whatsapp-float');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function() {
            if (typeof gtag === 'function') {
                gtag('event', 'whatsapp_click', {
                    'event_category': 'engagement',
                    'event_label': 'WhatsApp Randevu Butonu'
                });
            }
        });
    }

    // Telefon butonuna tıklanma olayını izleme
    document.querySelectorAll('a[href^="tel:"]').forEach(function(telBtn) {
        telBtn.addEventListener('click', function() {
            if (typeof gtag === 'function') {
                gtag('event', 'phone_click', {
                    'event_category': 'engagement',
                    'event_label': 'Telefon Arama'
                });
            }
        });
    });

    // Instagram linkine tıklanma olayını izleme
    document.querySelectorAll('a[href*="instagram.com"]').forEach(function(igBtn) {
        igBtn.addEventListener('click', function() {
            if (typeof gtag === 'function') {
                gtag('event', 'instagram_click', {
                    'event_category': 'engagement',
                    'event_label': 'Instagram Profili'
                });
            }
        });
    });

    // Özel fiyat butonuna tıklanma olayını izleme
    document.querySelectorAll('.special-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            if (typeof gtag === 'function') {
                gtag('event', 'special_price_click', {
                    'event_category': 'engagement',
                    'event_label': 'Özel Fiyat Butonu'
                });
            }
        });
    });
});