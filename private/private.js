/**
 * AITCAP — private.js
 * Scripts exclusivos de Private & Institutional (private.html).
 * Requiere: global.js cargado previamente (GSAP + ScrollTrigger ya registrados).
 *
 * NOTA: Los siguientes bloques ya están cubiertos en global.js y NO se repiten:
 *   - Menú móvil (menuToggle, mobileMenu)
 *   - [data-scroll] reveal genérico
 *   - Hero reveal (.reveal)
 *   - Hero parallax (#privateHeroBg)
 *   - Private scroll reveal base (.private-section, [data-private-scroll], [data-private-visual])
 *   - Premium UX observer (.ux-text, .ux-visual)
 *   - Parallax fluido (.ux-parallax con fix tech-line)
 *
 * Contiene EXCLUSIVAMENTE:
 *   1. Animación: Círculos de estrategia (.visual-target .circle) — scrub GSAP
 *   2. Animación: Líneas de grid fiscal (.visual-grid .grid-line) — ScrollTrigger
 *   3. Animación: Tech line + tech dots (.visual-tech) — timeline GSAP
 *   4. Animación: Barras de crecimiento (.visual-growth .growth-bar) — clipPath GSAP
 */

document.addEventListener('DOMContentLoaded', () => {

    // ===============================================
    // 1. CÍRCULOS — Sección Estrategia (section-2)
    // Targets: .visual-target .circle
    // Efecto: aparecen con fondo y glow violeta al hacer scroll
    // ===============================================
    gsap.fromTo('.visual-target .circle',
        {
            opacity: 0,
            backgroundColor: 'transparent',
            boxShadow: 'inset 0 0 0px rgba(80, 29, 200, 0)'
        },
        {
            opacity: 1,
            backgroundColor: 'rgba(80, 29, 200, 0.1)',
            boxShadow: 'inset 0 0 40px rgba(80, 29, 200, 0.3)',
            stagger: 0.3,
            scrollTrigger: {
                trigger: '.section-2',
                start: 'top 75%',
                end: 'center 40%',
                scrub: 1
            }
        }
    );

    // ===============================================
    // 2. LÍNEAS DE GRID — Sección Fiscal (section-3)
    // Targets: .visual-grid .grid-line
    // Efecto: se expanden de 0% a 80% de ancho al entrar
    // ===============================================
    gsap.fromTo('.visual-grid .grid-line',
        { width: '0%', opacity: 0 },
        {
            width: '80%',
            opacity: 1,
            duration: 1,
            stagger: 0.25,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.section-3',
                start: 'top 65%',
                toggleActions: 'play none none reverse'
            }
        }
    );

    // ===============================================
    // 3. TECNOLOGÍA INSTITUCIONAL — section-4
    // Targets: .visual-tech .tech-line, .visual-tech .tech-dot
    // Efecto: línea dibujada con clipPath + puntos con glow
    // ===============================================
    const tlTech = gsap.timeline({
        scrollTrigger: {
            trigger: '.section-4',
            start: 'top 65%',
            toggleActions: 'play none none reverse'
        }
    });

    /* Línea se "dibuja" de esquina a esquina */
    tlTech.fromTo('.visual-tech .tech-line',
        { clipPath: 'polygon(0 0, 0 0, 0 0, 0 0)' },
        {
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            duration: 1,
            ease: 'power2.inOut'
        }
    )
    /* Puntos aparecen con glow encadenados */
    .fromTo('.visual-tech .tech-dot',
        { opacity: 0, boxShadow: '0 0 0px var(--primary)' },
        {
            opacity: 1,
            boxShadow: '0 0 15px var(--primary)',
            duration: 0.5,
            stagger: 0.2,
            ease: 'power1.out'
        },
        '-=0.3'
    );

    // ===============================================
    // 4. BARRAS DE CRECIMIENTO — Sección Corporativa
    // Targets: .visual-growth .growth-bar
    // Efecto: crecen de abajo hacia arriba con clipPath
    // ===============================================
    gsap.fromTo('.visual-growth .growth-bar',
        { clipPath: 'inset(100% 0 0 0)' },
        {
            clipPath: 'inset(0% 0 0 0)',
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.private-corporate',
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            }
        }
    );

});
