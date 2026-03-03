/**
 * AITCAP — corporate.js
 * Scripts exclusivos de la página Corporate (corporate.html).
 * Requiere: global.js cargado previamente (GSAP + ScrollTrigger ya registrados).
 *
 * NOTA: Los siguientes bloques ya están cubiertos en global.js y NO se repiten:
 *   - Menú móvil (menuToggle, mobileMenu)
 *   - [data-scroll] reveal genérico
 *   - Hero reveal (.reveal)
 *   - Hero parallax (#corpHeroBg)
 *   - Premium UX observer (.ux-text, .ux-visual)
 *   - Parallax fluido (.ux-parallax)
 *   - Stagger .diff-item (global)
 *
 * Contiene EXCLUSIVAMENTE (guardado por el guard `.corp-hero`):
 *   1. Dynamic Underline — ScrollTrigger añade .is-visible
 *   2. Reveal Horizontal — .reveal-horizontal con delay-1/2/3/4
 *   3. SVG Blueprint Draw — animación de trazado de paths SVG (.tech-svg)
 *   4. Reveal Up — .reveal-up con delay-1/2/3/4
 */

document.addEventListener('DOMContentLoaded', () => {

    // Guard: solo ejecuta si estamos en la página Corporate
    if (!document.querySelector('.corp-hero')) return;

    // ScrollTrigger.refresh() al cargar para que las alturas
    // de las secciones full-screen estén bien calculadas
    window.addEventListener('load', () => { ScrollTrigger.refresh(); });

    // ===============================================
    // 1. DYNAMIC UNDERLINE
    // Targets: .dynamic-underline
    // Clase dinámica: 'is-visible' (activa la transición CSS)
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
    // 2. REVEAL HORIZONTAL
    // Targets: .reveal-horizontal (con modificadores .delay-1/2/3/4)
    // Estado inicial definido en CSS: opacity:0, translateX(-30px)
    // ===============================================
    const horizontalReveals = gsap.utils.toArray('.reveal-horizontal');
    horizontalReveals.forEach(element => {
        let delay = 0;
        if (element.classList.contains('delay-1')) delay = 0.1;
        if (element.classList.contains('delay-2')) delay = 0.2;
        if (element.classList.contains('delay-3')) delay = 0.3;
        if (element.classList.contains('delay-4')) delay = 0.4;

        gsap.to(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            x: 0,
            opacity: 1,
            duration: 0.4,
            delay: delay,
            ease: 'power2.out'
        });
    });

    // ===============================================
    // 3. SVG BLUEPRINT DRAW
    // Targets: .tech-svg → path, line, polyline, polygon, circle
    // Efecto: aparición + trazado de paths con strokeDashoffset
    // ===============================================
    const techSvgs = document.querySelectorAll('.tech-svg');
    techSvgs.forEach(svg => {

        /* El SVG completo aparece desde abajo */
        gsap.fromTo(svg,
            { y: 30, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: svg,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power2.out'
            }
        );

        /* Cada shape individual se traza */
        const shapes = svg.querySelectorAll('path, line, polyline, polygon, circle');
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
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            strokeDashoffset: 0,
            fillOpacity: 1,
            duration: 2,
            stagger: 0.15,
            ease: 'power2.out'
        });
    });

    // ===============================================
    // 4. REVEAL UP
    // Targets: .reveal-up (con modificadores .delay-1/2/3/4)
    // Estado inicial definido en CSS: opacity:0, translateY(40px)
    // ===============================================
    const upReveals = gsap.utils.toArray('.reveal-up');
    upReveals.forEach(element => {
        let delay = 0;
        if (element.classList.contains('delay-1')) delay = 0.1;
        if (element.classList.contains('delay-2')) delay = 0.2;
        if (element.classList.contains('delay-3')) delay = 0.3;
        if (element.classList.contains('delay-4')) delay = 0.4;

        gsap.to(element, {
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
        });
    });

});
