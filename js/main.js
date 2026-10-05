document.addEventListener('DOMContentLoaded', () => {

    // ==== 1. MOBİL MENÜ ====
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const spans = menuToggle.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    const spans = menuToggle.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            });
        });
    }

    // ==== 2. SSS AKORDİYON ====
    document.querySelectorAll('.faq-question').forEach(q => {
        q.addEventListener('click', () => {
            const item = q.parentElement;
            document.querySelectorAll('.faq-item').forEach(i => {
                if (i !== item) i.classList.remove('active');
            });
            item.classList.toggle('active');
        });
    });

    // ==== 3. NAVBAR SCROLL ====
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                navbar.style.boxShadow = '0 5px 25px rgba(0,0,0,0.08)';
                navbar.style.padding = '5px 0';
            } else {
                navbar.style.boxShadow = '0 2px 15px rgba(0,0,0,0.04)';
                navbar.style.padding = '8px 0';
            }
        });
    }

    // ==== 4. 3D SCROLL REVEAL (hafif ve performanslı) ====
    const revealTargets = document.querySelectorAll(
        '.section-title, .section-subtitle, .service-card, .pricing-card, .about-image-wrap, .about-text, .class-card, .blog-card, .gallery-grid img, .gallery-grid video, .contact-info, .contact-form-wrapper, .blog-article, .info-item, .faq-item'
    );

    revealTargets.forEach(el => el.classList.add('reveal'));

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    setTimeout(() => entry.target.classList.add('visible'), i * 60);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

        revealTargets.forEach(el => observer.observe(el));
    } else {
        revealTargets.forEach(el => el.classList.add('visible'));
    }

    // ==== 5. LIGHTBOX ====
    document.querySelectorAll('.gallery-grid img').forEach(img => {
        img.addEventListener('click', () => {
            const overlay = document.createElement('div');
            overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.92);z-index:9999;display:flex;align-items:center;justify-content:center;cursor:zoom-out;padding:20px;';
            const bigImg = document.createElement('img');
            bigImg.src = img.src;
            bigImg.style.cssText = 'max-width:95%;max-height:95%;border-radius:12px;box-shadow:0 0 60px rgba(0,0,0,0.6);';
            overlay.appendChild(bigImg);
            document.body.appendChild(overlay);
            overlay.addEventListener('click', () => document.body.removeChild(overlay));
        });
    });

    // ==== 6. 3D TILT EFEKTİ (Sadece masaüstünde) ====
    if (window.innerWidth > 992) {
        document.querySelectorAll('.service-card, .blog-card, .pricing-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const cx = rect.width / 2;
                const cy = rect.height / 2;
                const rotX = ((y - cy) / cy) * -4;
                const rotY = ((x - cx) / cx) * 4;
                card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-8px)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    // ==== 7. SAYFA İÇİ YUMUŞAK KAYDIRMA ====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
        // ==== 8. ÖZEL FİYAT MODAL (Sadece ?special=1 ile gelindiğinde açılır) ====
    const urlParams = new URLSearchParams(window.location.search);
    const specialModal = document.getElementById('specialModal');

    if (specialModal && urlParams.get('special') === '1') {
        // Modal'ı göster
        setTimeout(() => {
            specialModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }, 500);

        // Kapatma işlemleri
        const closeModal = () => {
            specialModal.classList.remove('active');
            document.body.style.overflow = '';
            // URL'den ?special=1 kaldır
            if (window.history.replaceState) {
                window.history.replaceState({}, document.title, window.location.pathname);
            }
        };

        document.getElementById('specialModalClose').addEventListener('click', closeModal);
        document.getElementById('specialModalOverlay').addEventListener('click', closeModal);

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && specialModal.classList.contains('active')) {
                closeModal();
            }
        });

        // Telefon linkine tıklanırsa modalı kapat
        document.querySelector('.special-modal-call').addEventListener('click', () => {
            setTimeout(closeModal, 300);
        });
    }
});