// Salve este arquivo como js/scroll-animations.js

document.addEventListener('DOMContentLoaded', () => {
    if (typeof ScrollReveal !== 'undefined') {
        const sr = ScrollReveal({
            distance: '20px',
            duration: 800,
            easing: 'cubic-bezier(.17,.67,.83,.67)',
            mobile: false, // Desativa em mobile para melhor performance
            reset: false,  // Não repete
        });

        // Revela elementos com o atributo data-scroll-reveal
        sr.reveal('[data-scroll-reveal]', { interval: 60 });
        
        // Revela elementos da esquerda
        sr.reveal('[data-scroll-reveal-origin="left"]', { 
            origin: 'left',
            distance: '50px'
        });

        // Revela elementos da direita
        sr.reveal('[data-scroll-reveal-origin="right"]', { 
            origin: 'right',
            distance: '50px'
        });

    } else {
        console.warn("ScrollReveal não foi carregado. As animações de scroll estão desativadas.");
    }
});
