// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Animated text effect
    const animatedText = document.querySelector('.animated-text');
    if (animatedText) {
        const words = ['product designer', 'problem solver', 'creative thinker'];
        let wordIndex = 0;
        let isDeleting = false;
        let currentText = '';
        let typingSpeed = 100;

        function typeEffect() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                currentText = currentWord.substring(0, currentText.length - 1);
                typingSpeed = 50;
            } else {
                currentText = currentWord.substring(0, currentText.length + 1);
                typingSpeed = 100;
            }

            animatedText.textContent = currentText;

            if (!isDeleting && currentText === currentWord) {
                typingSpeed = 2000; // Pause at the end of word
                isDeleting = true;
            } else if (isDeleting && currentText === '') {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typingSpeed = 500; // Pause before starting new word
            }

            setTimeout(typeEffect, typingSpeed);
        }

        // Start the animation
        typeEffect();
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Apply animations to elements
    document.querySelectorAll('.project-card, .value-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    // Animate hero symbols
    document.querySelectorAll('.symbol').forEach((symbol, index) => {
        symbol.style.opacity = '0';
        symbol.style.transform = 'translateY(20px)';
        setTimeout(() => {
            symbol.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            symbol.style.opacity = '1';
            symbol.style.transform = 'translateY(0)';
        }, 300 * (index + 1));
    });

    // Fade out scroll indicator on initial scroll
    const scrollIndicator = document.querySelector('.scroll-indicator');
    let hasScrolled = false;
    
    window.addEventListener('scroll', () => {
        if (scrollIndicator && !hasScrolled) {
            scrollIndicator.classList.add('fade-out');
            hasScrolled = true;
            
            // Remove element after fade animation
            setTimeout(() => {
                scrollIndicator.style.display = 'none';
            }, 2000); // Match this with the CSS transition duration
        }
    });
});