/**
 * AITCAP — next.js
 * Scripts exclusivos de la página AITCAP NEXT (next.html).
 * Requiere: global.js cargado previamente (GSAP + ScrollTrigger ya registrados).
 *
 * Contiene:
 *   1. Animación de Propuestas Verticales
 *      Targets: .proposal-item → .proposal-content, .proposal-visual
 *      Dispara ScrollTrigger.refresh() en window load para garantizar
 *      que las alturas 100vh de .proposal-item estén calculadas.
 */

document.addEventListener('DOMContentLoaded', () => {

    // ===============================================
    // 1. NEXT: ANIMACIONES DE PROPUESTAS (RESPONSIVE)
    // Targets: .proposal-item, .proposal-content, .proposal-visual
    // ===============================================
    const nextProposals = document.querySelectorAll('.proposal-item');

    if (nextProposals.length > 0) {
        /* Esperamos a window load para que las alturas 100vh
           de .proposal-item estén correctamente calculadas
           antes de que ScrollTrigger tome las medidas. */
        window.addEventListener('load', () => {
            ScrollTrigger.refresh();

            nextProposals.forEach((section) => {
                const content = section.querySelector('.proposal-content');
                const visual  = section.querySelector('.proposal-visual');

                if (!content || !visual) return;

                let tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 70%',
                        end: 'bottom 70%',
                        toggleActions: 'play none none reverse',
                    }
                });

                /* Texto entra desde abajo */
                tl.from(content, {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    ease: 'power2.out'
                })
                /* Visual entra con rebote elástico, solapando el texto */
                .from(visual, {
                    scale: 0.8,
                    opacity: 0,
                    duration: 1.2,
                    ease: 'elastic.out(1, 0.7)'
                }, '-=0.8');
            });
        });
    }

});
