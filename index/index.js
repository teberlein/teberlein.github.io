/**
 * AITCAP — index.js
 * Scripts exclusivos de la Homepage (index.html).
 * Requiere: global.js cargado previamente (GSAP + ScrollTrigger ya registrados).
 *
 * Contiene:
 *   1. Sección Problema — Narrative Scroll con pin (GSAP ScrollTrigger)
 *   2. Badges Carousel — Carrusel 3D con auto-rotate y navegación
 */

document.addEventListener('DOMContentLoaded', () => {

    // ===============================================
    // 1. HOMEPAGE: SECCIÓN PROBLEMA (NARRATIVE SCROLL)
    // Targets: .problem-section, .line-1, .line-2, .line-3, .highlight-criterio
    // Clases dinámicas agregadas: 'problem-line dimmed'
    // ===============================================
    const problemSection = document.querySelector('.problem-section');

    if (problemSection) {
        let tlProblem = gsap.timeline({
            scrollTrigger: {
                trigger: ".problem-section",
                start: "top top",
                end: "+=1500",
                pin: true,          /* Fija la sección mientras dura la animación */
                scrub: 1,           /* Vincula la animación al scroll */
                anticipatePin: 1
            }
        });

        tlProblem
            .to(".line-1", { opacity: 1, y: 0, duration: 1 })
            .to(".line-1", { opacity: 0.3, className: "problem-line dimmed", duration: 1 }, "+=0.5")
            .to(".line-2", { opacity: 1, y: 0, duration: 1 }, "<")
            .to(".line-2", { opacity: 0.3, className: "problem-line dimmed", duration: 1 }, "+=0.5")
            .to(".line-3", { opacity: 1, y: 0, duration: 1 }, "<")
            .to(".highlight-criterio", {
                color: "#501DC8",
                scale: 1.1,
                duration: 0.5
            }, ">");
    }

    // ===============================================
    // 2. HOMEPAGE: 3D BADGES CAROUSEL
    // Targets: .badges-section, .badge-card, .indicator,
    //          .prev-arrow, .next-arrow
    // Clases dinámicas: 'active' en .indicator
    // ===============================================
    const badgesSection = document.querySelector('.badges-section');

    if (badgesSection) {
        const slides     = document.querySelectorAll('.badge-card');
        const indicators = document.querySelectorAll('.indicator');
        const prevBtn    = document.querySelector('.prev-arrow');
        const nextBtn    = document.querySelector('.next-arrow');

        let currentIndex = 0;
        const totalSlides = slides.length;
        let autoRotateTimer;

        function updateCarousel(index) {
            if (index < 0) index = totalSlides - 1;
            if (index >= totalSlides) index = 0;
            currentIndex = index;

            /* Sincronizar indicadores */
            indicators.forEach(ind => ind.classList.remove('active'));
            if (indicators[currentIndex]) indicators[currentIndex].classList.add('active');

            /* Posicionar cada slide según su distancia al actual */
            slides.forEach((slide, i) => {
                const diff = (i - currentIndex + totalSlides) % totalSlides;

                if (i === currentIndex) {
                    /* Slide activo: al centro, visible, sin filtros */
                    gsap.to(slide, {
                        x: "0%", scale: 1, opacity: 1, zIndex: 10,
                        filter: "blur(0px) grayscale(0%)",
                        duration: 0.6, ease: "power2.out", pointerEvents: "all"
                    });
                } else if (diff === 1) {
                    /* Slide siguiente: desplazado a la derecha */
                    gsap.to(slide, {
                        x: "60%", scale: 0.8, opacity: 0.4, zIndex: 1,
                        filter: "blur(2px) grayscale(100%)",
                        duration: 0.6, ease: "power2.out", pointerEvents: "none"
                    });
                } else if (diff === totalSlides - 1) {
                    /* Slide anterior: desplazado a la izquierda */
                    gsap.to(slide, {
                        x: "-60%", scale: 0.8, opacity: 0.4, zIndex: 1,
                        filter: "blur(2px) grayscale(100%)",
                        duration: 0.6, ease: "power2.out", pointerEvents: "none"
                    });
                } else {
                    /* Resto: ocultos al centro, sin interacción */
                    gsap.to(slide, {
                        x: "0%", scale: 0.5, opacity: 0, zIndex: 0,
                        duration: 0.6, pointerEvents: "none"
                    });
                }
            });
        }

        function startAutoRotate() {
            stopAutoRotate();
            autoRotateTimer = setInterval(() => { updateCarousel(currentIndex + 1); }, 5000);
        }

        function stopAutoRotate() { clearInterval(autoRotateTimer); }

        /* Navegación con botones */
        nextBtn.addEventListener('click', () => {
            stopAutoRotate();
            updateCarousel(currentIndex + 1);
            startAutoRotate();
        });

        prevBtn.addEventListener('click', () => {
            stopAutoRotate();
            updateCarousel(currentIndex - 1);
            startAutoRotate();
        });

        /* Navegación con indicadores (dots) */
        indicators.forEach((ind, i) => {
            ind.addEventListener('click', () => {
                stopAutoRotate();
                updateCarousel(i);
                startAutoRotate();
            });
        });

        /* Inicializar */
        updateCarousel(0);
        startAutoRotate();
    }

    // ===============================================
    // 7. GLOBAL: DIFERENCIALES STAGGER ANIMATION (.diff-item)
    // Usado en index.html
    // ===============================================
    const diffItems = document.querySelectorAll('.diff-item');
    if (diffItems.length > 0) {
        gsap.set(".diff-item", { y: 30, opacity: 0 });
        ScrollTrigger.batch(".diff-item", {
            start: "top 70%",
            onEnter: batch => gsap.to(batch, {
                opacity: 1, y: 0, stagger: 0.2, duration: 0.8, ease: "power2.out", overwrite: true
            }),
            onLeave: batch => gsap.set(batch, { opacity: 0, y: -30 }),
            onEnterBack: batch => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.15, overwrite: true })
        });
    }

        // ===============================================
    // 11. GLOBAL: MÉTODO — LÓGICA RESPONSIVE (MATCH MEDIA)
    // Usado en index.html (method-section)
    // ===============================================
    ScrollTrigger.matchMedia({
        "(min-width: 901px)": function() {
            const methodBlocks = document.querySelectorAll('.method-block');
            const navSteps = document.querySelectorAll('.nav-step');

            if (methodBlocks.length > 0) {
                gsap.set(methodBlocks, { opacity: 0.2, y: 0 });

                methodBlocks.forEach((block, i) => {
                    ScrollTrigger.create({
                        trigger: block, start: "top center", end: "bottom center",
                        onToggle: self => {
                            if (self.isActive) {
                                gsap.to(block, { opacity: 1, duration: 0.5 });
                                navSteps.forEach(nav => nav.classList.remove('active'));
                                if (navSteps[i]) navSteps[i].classList.add('active');
                            } else {
                                gsap.to(block, { opacity: 0.2, duration: 0.5 });
                            }
                        }
                    });
                });
            }
        },
        "(max-width: 900px)": function() {
            const methodBlocks = document.querySelectorAll('.method-block');
            if (methodBlocks.length > 0) {
                gsap.set(methodBlocks, { opacity: 0, y: 50 });
                ScrollTrigger.batch(".method-block", {
                    start: "top 80%",
                    onEnter: batch => gsap.to(batch, {
                        opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power2.out", overwrite: true
                    })
                });
            }
        }
    });

});
