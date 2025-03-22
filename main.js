document.addEventListener('DOMContentLoaded', function() {
    // Check if intro has been shown before in this session
    const hasSeenIntro = localStorage.getItem('hasSeenIntro');
    
    // Get all sections except intro
    const mainSections = document.querySelectorAll('section:not(#intro-section), nav');
    
    // Get intro section
    const introSection = document.getElementById('intro-section');
    
    // If user has already seen the intro, skip it
    if (hasSeenIntro === 'true' || !introSection) {
        // Show main sections immediately
        mainSections.forEach(section => {
            section.style.opacity = '1';
            section.style.visibility = 'visible';
        });
        
        // Hide intro section
        if (introSection) {
            introSection.style.opacity = '0';
            introSection.style.visibility = 'hidden';
        }
        
        // Initialize AOS
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    } else {
        // First visit - show the intro
        
        // Initially hide all sections
        mainSections.forEach(section => {
            section.style.opacity = '0';
            section.style.visibility = 'hidden';
        });
    
        // Show intro section
        introSection.style.opacity = '1';
        introSection.style.visibility = 'visible';
    
        // Create and append particles
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
                    // Set localStorage to indicate intro has been shown
                    localStorage.setItem('hasSeenIntro', 'true');
                    
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
    }

    // Handle navigation clicks
    const navLinks = document.querySelectorAll('.nav-links a');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    const navOverlay = document.querySelector('.nav-overlay');
    const body = document.body;

    function toggleMobileMenu(show) {
        navLinksContainer.classList.toggle('active', show);
        navToggle.classList.toggle('active', show);
        navOverlay.classList.toggle('active', show);
        body.style.overflow = show ? 'hidden' : '';
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Only prevent default for hash links (internal page navigation)
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    toggleMobileMenu(false);
                    setTimeout(() => {
                        targetSection.scrollIntoView({ behavior: 'smooth' });
                    }, 300); // Wait for menu animation to complete
                }
            } else {
                // For external links like blog.html, just close the mobile menu
                toggleMobileMenu(false);
                // Don't prevent default behavior for external links
                // The browser will naturally navigate to the href
            }
        });
    });

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            const isActive = navLinksContainer.classList.contains('active');
            toggleMobileMenu(!isActive);
        });
    }

    // Close menu when clicking overlay
    if (navOverlay) {
        navOverlay.addEventListener('click', () => {
            toggleMobileMenu(false);
        });
    }

    // Close menu on window resize (if wider than mobile breakpoint)
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            toggleMobileMenu(false);
        }
    });

    // Handle escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinksContainer.classList.contains('active')) {
            toggleMobileMenu(false);
        }
    });

    // Hide/show nav on scroll
    let lastScrollTop = 0;
    let scrollTimeout;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const nav = document.querySelector('nav');
        
        // Clear the timeout if it exists
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down & past intro
            nav.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            nav.style.transform = 'translateY(0)';
            nav.classList.add('scrolled');
        }
        
        lastScrollTop = scrollTop;
        
        // Set a timeout to remove the scrolled class
        scrollTimeout = setTimeout(() => {
            if (scrollTop < 100) {
                nav.classList.remove('scrolled');
            }
        }, 150);
    });
});