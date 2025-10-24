// Scroll functionality for absolute positioning layout
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav a");

// Mapa de posiciones Y de las secciones (por el posicionamiento absoluto)
const sectionPositions = {
    'inicio': 0,
    'contexto': 1678,    // Aproximadamente donde empieza CONTEXTO
    'diagrama': 3669,    // Aproximadamente donde empieza DIAGRAMA
    'reflexion': 4136    // Aproximadamente donde empieza REFLEXIÓN
};

function updateActiveMenu() {
    let current = "";
    const scrollPosition = window.scrollY + 100;
    
    // Encontrar qué sección está actualmente en vista
    if (scrollPosition >= sectionPositions.reflexion - 200) {
        current = 'reflexion';
    } else if (scrollPosition >= sectionPositions.diagrama - 200) {
        current = 'diagrama';
    } else if (scrollPosition >= sectionPositions.contexto - 200) {
        current = 'contexto';
    }

    console.log(`Scroll: ${scrollPosition}, Current: ${current}`);
    
    // Actualizar clases activas
    navLinks.forEach((link) => {
        link.classList.remove("active");
        const href = link.getAttribute("href");
        if (href === `#${current}`) {
            link.classList.add("active");
        }
    });
}

// Smooth scroll para posicionamiento absoluto
function initSmoothScroll() {
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetPosition = sectionPositions[targetId.substring(1)];
            
            if (targetPosition !== undefined) {
                console.log(`Scrolling to: ${targetId} at position: ${targetPosition}`);
                
                window.scrollTo({
                    top: targetPosition - 150, // Offset para el header
                    behavior: 'smooth'
                });
                
                // Actualizar menú después del scroll
                setTimeout(() => {
                    updateActiveMenu();
                }, 800);
            }
        });
    });
}

// Scroll alternativo más directo (para debugging)
function scrollToSection(sectionId) {
    const position = sectionPositions[sectionId];
    if (position) {
        window.scrollTo({
            top: position - 150,
            behavior: 'smooth'
        });
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
    console.log('Scroll script initialized');
    console.log('Section positions:', sectionPositions);
    
    initSmoothScroll();
    updateActiveMenu();
    
    window.addEventListener('scroll', updateActiveMenu);
    window.addEventListener('resize', updateActiveMenu);
    
    // Debug: exponer función global para testing
    window.debugScrollTo = scrollToSection;
});

// Console helpers para debugging
console.log('✅ Scroll script loaded');
console.log('💡 Use debugScrollTo("contexto") in console to test');