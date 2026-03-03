/**
 * AITCAP — tech.js
 * Scripts exclusivos de la página Tech & Global (tech.html).
 * Requiere: global.js cargado previamente (GSAP + ScrollTrigger ya registrados).
 *
 * NOTA: Los siguientes bloques ya están cubiertos en global.js y NO se repiten:
 *   - Menú móvil (menuToggle, mobileMenu)
 *   - [data-scroll] reveal genérico
 *   - Hero reveal (.reveal)
 *   - Hero parallax (#techHeroBg)
 *   - Premium UX observer (.ux-text, .ux-visual)
 *   - Parallax fluido (.ux-parallax)
 *   - Método responsive logic (ScrollTrigger.matchMedia)
 *
 * Contiene EXCLUSIVAMENTE (guardado por el guard `.tech-hero`):
 *   1. Reveal Up — .reveal-up con delay-1/2/3/4 (fromTo, diferente a corp)
 *   2. Dynamic Underline — agrega .is-visible a .dynamic-underline
 *   3. SVG Abstract Draw — animación de trazado de paths (.tech-abstract-svg)
 *
 * DIFERENCIA con corporate.js:
 *   - .reveal-up usa gsap.fromTo (estado inicial explícito)
 *     vs corporate.js que usa gsap.to (estado inicial en CSS)
 *   - .tech-abstract-svg entra con scale:0.9 (vs y:30 de .tech-svg corp)
 *   - SVG draw incluye <rect> como shape adicional
 *   - stagger de paths: 0.1 (vs 0.15 en corp)
 *   - .dynamic-underline activado desde el bloque tech (no el de corp)
 */

document.addEventListener('DOMContentLoaded', () => {

    // Guard: solo ejecuta si estamos en la página Tech & Global
    if (!document.querySelector('.tech-hero')) return;

    // ScrollTrigger.refresh() al cargar para que las alturas
    // de los .tech-proposal-item (100vh) estén bien calculadas
    window.addEventListener('load', () => { ScrollTrigger.refresh(); });

    // ===============================================
    // 1. REVEAL UP
    // Targets: .reveal-up (con modificadores .delay-1/2/3/4)
    // Usa fromTo con estado inicial explícito { y:40, opacity:0 }
    // ===============================================
    const techReveals = gsap.utils.toArray('.reveal-up');
    techReveals.forEach(element => {
        let delay = 0;
        if (element.classList.contains('delay-1')) delay = 0.1;
        if (element.classList.contains('delay-2')) delay = 0.2;
        if (element.classList.contains('delay-3')) delay = 0.3;
        if (element.classList.contains('delay-4')) delay = 0.4;

        gsap.fromTo(element,
            { y: 40, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: element,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                y: 0,
                opacity: 1,
                duration: 0.6,
                delay: delay,
                ease: 'power2.out'
            }
        );
    });

    // ===============================================
    // 2. DYNAMIC UNDERLINE
    // Targets: .dynamic-underline
    // Clase dinámica: 'is-visible' (activa la transición CSS)
    // Se ejecuta aquí porque el guard de corporate.js no corre en tech
    // ===============================================
    const underlines = document.querySelectorAll('.dynamic-underline');
    underlines.forEach(title => {
        ScrollTrigger.create({
            trigger: title,
            start: 'top 85%',
            onEnter: () => title.classList.add('is-visible'),
            once: true
        });
    });

    // ===============================================
    // 3. SVG ABSTRACT DRAW
    // Targets: .tech-abstract-svg → path, line, polyline, polygon, circle, rect
    // Diferencia con corp: entrada con scale (no y), incluye <rect>, stagger 0.1
    // ===============================================
    const techSvgs = document.querySelectorAll('.tech-abstract-svg');
    techSvgs.forEach(svg => {

        /* El SVG completo aparece desde escala reducida */
        gsap.fromTo(svg,
            { scale: 0.9, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: svg,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                scale: 1,
                opacity: 1,
                duration: 1,
                ease: 'power2.out'
            }
        );

        /* Cada shape se traza individualmente */
        const shapes = svg.querySelectorAll('path, line, polyline, polygon, circle, rect');
        shapes.forEach(shape => {
            const length = shape.getTotalLength ? shape.getTotalLength() : 0;
            if (length > 0) {
                gsap.set(shape, {
                    strokeDasharray: length,
                    strokeDashoffset: length,
                    fillOpacity: shape.getAttribute('fill') === 'none' ? 1 : 0
                });
            }
        });

        gsap.to(shapes, {
            scrollTrigger: {
                trigger: svg,
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            },
            strokeDashoffset: 0,
            fillOpacity: 1,
            duration: 2,
            stagger: 0.1,     // Más rápido que corporate (0.15)
            ease: 'power2.out'
        });
    });

});
