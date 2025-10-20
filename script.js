// Script para funcionalidades do site

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll para links internos
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animação de entrada para elementos ao rolar
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    const elementsToAnimate = document.querySelectorAll('.benefit-card, .step, .testimonial-card');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
    
    // Adicionar classe de animação após um pequeno delay para garantir que o CSS seja aplicado
    setTimeout(() => {
        document.querySelectorAll('.benefit-card, .step, .testimonial-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        // Adicionar classe CSS para animação
        const style = document.createElement('style');
        style.textContent = `
            .benefit-card.animate-in,
            .step.animate-in,
            .testimonial-card.animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    }, 100);
    
    // Contador de tempo para criar urgência
    function updateCountdown() {
        const now = new Date();
        const target = new Date();
        target.setHours(23, 59, 59, 999); // Fim do dia
        
        const diff = target - now;
        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        // Atualizar elementos de urgência se existirem
        const urgencyElements = document.querySelectorAll('.urgency, .urgency-final');
        urgencyElements.forEach(el => {
            const originalText = el.getAttribute('data-original') || el.textContent;
            el.setAttribute('data-original', originalText);
            
            if (hours > 0) {
                el.textContent = `Oferta especial válida por mais ${hours}h ${minutes}m ${seconds}s!`;
            } else {
                el.textContent = originalText;
            }
        });
    }
    
    // Iniciar contador se houver elementos de urgência
    if (document.querySelector('.urgency, .urgency-final')) {
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
    
    // Efeito de digitação no título hero (opcional)
    const heroTitle = document.querySelector('.hero-title .highlight');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Iniciar efeito de digitação após um pequeno delay
        setTimeout(typeWriter, 500);
    }
});

// FAQ Functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', function() {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    otherAnswer.style.maxHeight = '0';
                    otherAnswer.style.opacity = '0';
                    otherAnswer.style.paddingTop = '0';
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.opacity = '1';
                answer.style.paddingTop = '0';
            } else {
                answer.style.maxHeight = '0';
                answer.style.opacity = '0';
                answer.style.paddingTop = '0';
            }
        });
    });
    
    // Add animation for FAQ items on scroll
    const faqObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe FAQ items for animation
    document.querySelectorAll('.faq-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        faqObserver.observe(item);
    });
});