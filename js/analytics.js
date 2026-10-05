// ============================================================
// Google Analytics 4 (GA4) Takip Kodu
// ============================================================
// ÖNEMLİ: Aşağıdaki "G-XXXXXXXXXX" kısmını Google Analytics
// hesabınızdan aldığınız kendi Measurement ID'niz ile değiştirin.
// Örnek: G-1A2B3C4D5E
// ============================================================

(function() {
    var GA_ID = 'G-XXXXXXXXXX'; // <-- BURAYI KENDİ ID'NİZLE DEĞİŞTİRİN

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
});