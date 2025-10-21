// Salve este arquivo como js/tracking.js

document.addEventListener('DOMContentLoaded', () => {
    
    // Função para disparar eventos para GA4 e Meta Pixel
    function trackEvent(eventName, eventLabel) {
        // Rastreamento GA4
        if (typeof gtag === 'function') {
            gtag('event', eventName, {
                'event_label': eventLabel,
                'method': 'Click'
            });
            console.log(`[GA4 Tracked] Evento: ${eventName}, Label: ${eventLabel}`);
        }

        // Rastreamento Meta Pixel
        if (typeof fbq === 'function') {
            // Usa 'Lead' como evento padrão para CTAs importantes
            fbq('track', 'Lead', {
                content_name: eventLabel,
                content_category: eventName
            });
            console.log(`[Meta Tracked] Evento: Lead, Content: ${eventLabel}`);
        }
    }

    // 1. Rastreamento do CTA Fixo (WhatsApp)
    const ctaFixo = document.getElementById('cta-fixo-agendar');
    if (ctaFixo) {
        ctaFixo.addEventListener('click', () => {
            trackEvent('whatsapp_click', 'CTA_Fixo_WhatsApp');
        });
    }

    // 2. Rastreamento de CTAs Principais
    const ctas = document.querySelectorAll('.cta-principal-btn');
    ctas.forEach(cta => {
        // Evita duplicar o rastreamento em botões que já têm a função handleFormSubmission (contato.html)
        if (!cta.closest('form')) { 
            cta.addEventListener('click', () => {
                const label = cta.textContent.trim().substring(0, 30); // Usa o texto do botão como label
                trackEvent('cta_click', `CTA_Principal_${label}`);
            });
        }
    });
    
    // 3. Rastreamento dos Links do Footer (para Politica/Termos)
    const legalLinks = document.querySelectorAll('.footer-legal a');
    legalLinks.forEach(link => {
        link.addEventListener('click', () => {
            const label = link.textContent.trim().replace(/\s/g, '_');
            trackEvent('nav_click', `Footer_${label}`);
        });
    });
});
