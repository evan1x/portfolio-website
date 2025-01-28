document.addEventListener('DOMContentLoaded', function() {
    // Get all sections except intro
    const mainSections = document.querySelectorAll('section:not(#intro-section), nav');
    
    // Initially hide all sections
    mainSections.forEach(section => {
        section.style.opacity = '0';
        section.style.visibility = 'hidden';
    });

    // Show intro section
    const introSection = document.getElementById('intro-section');
    if (introSection) {
        introSection.style.opacity = '1';
        introSection.style.visibility = 'visible';
    }

    // Create and append particles
    if (introSection) {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'intro-particles';
        introSection.appendChild(particlesContainer);

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'intro-particle';
            particle.style.width = Math.random() * 4 + 'px';
            particle.style.height = particle.style.width;
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 2 + 's';
            particlesContainer.appendChild(particle);
        }
    }

    // Intro animation sequence
    const timeline = anime.timeline({
        easing: 'easeOutExpo'
    });

    timeline
        .add({
            targets: '#intro-title',
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 1000,
            delay: 300
        })
        .add({
            targets: '#intro-text',
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 800
        }, '-=500')
        .add({
            targets: '.intro-particle',
            opacity: [0, 0.5],
            scale: [0, 1],
            delay: anime.stagger(10),
            duration: 800
        }, '-=800')
        .add({
            duration: 800,
            complete: function() {
                // Fade out intro section
                anime({
                    targets: '#intro-section',
                    opacity: 0,
                    duration: 800,
                    easing: 'easeInOutQuad',
                    complete: function() {
                        // Hide intro section
                        introSection.style.visibility = 'hidden';
                        
                        // Show main sections
                        mainSections.forEach(section => {
                            section.style.visibility = 'visible';
                            anime({
                                targets: section,
                                opacity: [0, 1],
                                duration: 800,
                                easing: 'easeOutQuad'
                            });
                        });

                        // Initialize AOS
                        AOS.init({
                            duration: 1000,
                            once: true,
                            offset: 100
                        });
                    }
                });
            }
        });

    // Handle navigation clicks
    const navLinks = document.querySelectorAll('.nav-links a');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinksContainer = document.querySelector('.nav-links');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }

            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navLinksContainer.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Hide/show nav on scroll
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const nav = document.querySelector('nav');
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down & past intro
            nav.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            nav.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
});