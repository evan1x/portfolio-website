// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-out',
    once: true,
    mirror: false
});

// Typing Animation
class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        // Current index of word
        const current = this.wordIndex % this.words.length;
        // Get full text of current word
        const fullTxt = this.words[current];

        // Check if deleting
        if (this.isDeleting) {
            // Remove char
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            // Add char
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // Insert txt into element
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        // Initial Type Speed
        let typeSpeed = 100;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        // If word is complete
        if (!this.isDeleting && this.txt === fullTxt) {
            // Make pause at end
            typeSpeed = this.wait;
            // Set delete to true
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            // Move to next word
            this.wordIndex++;
            // Pause before start typing
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Init On DOM Load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    const txtElement = document.querySelector('.typing-text');
    const words = ['Full-Stack Developer', 'UI/UX Designer', 'Problem Solver'];
    const wait = 3000;
    // Init TypeWriter
    new TypeWriter(txtElement, words, wait);

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Parallax effect for hero section
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const parallaxElements = document.querySelectorAll('.hero-content');
                
                parallaxElements.forEach(element => {
                    const speed = 0.5;
                    element.style.transform = `translateY(${scrolled * speed}px)`;
                });
                ticking = false;
            });
            ticking = true;
        }
    });

    // Intersection Observer for section animations
    const sections = document.querySelectorAll('section');
    const options = {
        threshold: 0.2,
        rootMargin: "0px"
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                // Once the animation has played, stop observing
                observer.unobserve(entry.target);
            }
        });
    }, options);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Loading animation
    window.addEventListener('load', () => {
        const loader = document.querySelector('.loading');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    });

    // Add hover effect to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        let isHovering = false;
        
        card.addEventListener('mousemove', (e) => {
            if (!isHovering) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const xPercent = x / rect.width;
                const yPercent = y / rect.height;
                
                const rotateX = (yPercent - 0.5) * 10;
                const rotateY = (xPercent - 0.5) * 10;
                
                card.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
                isHovering = true;
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'none';
            isHovering = false;
        });
    });

    // Timeline animations
    const timelineItems = document.querySelectorAll('.timeline-item');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };

    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Animate the dot after the content appears
                setTimeout(() => {
                    const dot = entry.target.querySelector('.timeline-dot');
                    if (dot) {
                        dot.style.transform = 'translateX(-50%) scale(1)';
                        dot.style.opacity = '1';
                    }
                }, 300);
                
                timelineObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    timelineItems.forEach(item => {
        // Set initial state
        const dot = item.querySelector('.timeline-dot');
        if (dot) {
            dot.style.transform = 'translateX(-50%) scale(0.5)';
            dot.style.opacity = '0';
        }
        timelineObserver.observe(item);
    });

    // Add hover effects for timeline items
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const content = item.querySelector('.timeline-content');
            if (content) {
                content.style.transform = 'scale(1.02)';
                content.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
            }
        });

        item.addEventListener('mouseleave', () => {
            const content = item.querySelector('.timeline-content');
            if (content) {
                content.style.transform = 'scale(1)';
                content.style.boxShadow = 'none';
            }
        });
    });

    // Skills section animations
    function initSkillsAnimations() {
        const skillsSection = document.querySelector('.skills');
        const skillCategories = document.querySelectorAll('.skill-category');

        if (skillsSection && skillCategories.length > 0) {
            const skillsObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Animate each category
                        skillCategories.forEach((category, categoryIndex) => {
                            // Initial fade in of category
                            anime({
                                targets: category,
                                opacity: [0, 1],
                                translateY: [50, 0],
                                duration: 800,
                                delay: categoryIndex * 200,
                                easing: 'easeOutCubic',
                                begin: () => {
                                    category.style.opacity = '0';
                                    category.style.transform = 'translateY(50px)';
                                }
                            });

                            // Animate category header
                            const header = category.querySelector('.category-header');
                            anime({
                                targets: header,
                                opacity: [0, 1],
                                translateX: [-30, 0],
                                duration: 800,
                                delay: (categoryIndex * 200) + 200,
                                easing: 'easeOutCubic'
                            });

                            // Animate category description
                            const description = category.querySelector('.category-description');
                            anime({
                                targets: description,
                                opacity: [0, 1],
                                translateX: [30, 0],
                                duration: 800,
                                delay: (categoryIndex * 200) + 400,
                                easing: 'easeOutCubic'
                            });

                            // Animate skill bars
                            const skillBars = category.querySelectorAll('.skill-bar');
                            skillBars.forEach((bar, index) => {
                                // Animate skill info
                                const skillInfo = bar.querySelector('.skill-info');
                                anime({
                                    targets: skillInfo,
                                    opacity: [0, 1],
                                    translateX: [-20, 0],
                                    duration: 600,
                                    delay: (categoryIndex * 200) + (index * 100) + 600,
                                    easing: 'easeOutCubic'
                                });

                                // Animate skill description
                                const skillDesc = bar.querySelector('.skill-description');
                                anime({
                                    targets: skillDesc,
                                    opacity: [0, 1],
                                    translateX: [20, 0],
                                    duration: 600,
                                    delay: (categoryIndex * 200) + (index * 100) + 700,
                                    easing: 'easeOutCubic'
                                });

                                // Get progress value
                                const progressBar = bar.querySelector('.progress');
                                const progressValue = progressBar.style.width;

                                // Animate progress bar
                                anime({
                                    targets: progressBar,
                                    width: [0, progressValue],
                                    duration: 1500,
                                    delay: (categoryIndex * 200) + (index * 100) + 800,
                                    easing: 'easeOutElastic(1, .5)',
                                    complete: () => {
                                        // Add shine effect after progress bar fills
                                        anime({
                                            targets: progressBar,
                                            background: [
                                                { value: 'linear-gradient(90deg, #2196f3, #64b5f6)', duration: 0 },
                                                { value: 'linear-gradient(90deg, #64b5f6, #2196f3, #64b5f6)', duration: 700 },
                                                { value: 'linear-gradient(90deg, #2196f3, #64b5f6)', duration: 700 }
                                            ],
                                            easing: 'linear',
                                            delay: 200
                                        });
                                    }
                                });
                            });
                        });

                        // Only run animation once
                        skillsObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.2
            });

            // Start observing
            skillsObserver.observe(skillsSection);

            // Add hover animations for skill categories
            skillCategories.forEach(category => {
                category.addEventListener('mouseenter', () => {
                    // Scale up category slightly
                    anime({
                        targets: category,
                        scale: 1.02,
                        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                        duration: 300,
                        easing: 'easeOutCubic'
                    });

                    // Animate icon
                    const icon = category.querySelector('.category-icon');
                    if (icon) {
                        anime({
                            targets: icon,
                            scale: 1.2,
                            rotate: '10deg',
                            duration: 400,
                            easing: 'easeOutElastic(1, .5)'
                        });
                    }

                    // Animate progress bars
                    const progressBars = category.querySelectorAll('.progress');
                    progressBars.forEach(bar => {
                        anime({
                            targets: bar,
                            scale: [1, 1.02],
                            duration: 300,
                            easing: 'easeOutCubic'
                        });
                    });
                });

                category.addEventListener('mouseleave', () => {
                    // Reset category scale
                    anime({
                        targets: category,
                        scale: 1,
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        duration: 300,
                        easing: 'easeOutCubic'
                    });

                    // Reset icon
                    const icon = category.querySelector('.category-icon');
                    if (icon) {
                        anime({
                            targets: icon,
                            scale: 1,
                            rotate: '0deg',
                            duration: 400,
                            easing: 'easeOutElastic(1, .5)'
                        });
                    }

                    // Reset progress bars
                    const progressBars = category.querySelectorAll('.progress');
                    progressBars.forEach(bar => {
                        anime({
                            targets: bar,
                            scale: 1,
                            duration: 300,
                            easing: 'easeOutCubic'
                        });
                    });
                });
            });
        }
    }

    initSkillsAnimations();

    // Contact section animations
    const contactSection = document.querySelector('.contact-container');
    if (contactSection) {
        const contactObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    contactObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });

        // Set initial styles
        contactSection.style.opacity = '0';
        contactSection.style.transform = 'translateY(20px)';
        contactSection.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';

        // Start observing
        contactObserver.observe(contactSection);
    }

    // Contact form submission animation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Animate submit button
            const submitBtn = this.querySelector('.submit-btn');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnIcon = submitBtn.querySelector('.btn-icon');
            
            anime({
                targets: btnText,
                opacity: [1, 0],
                translateX: [0, -10],
                duration: 300,
                easing: 'easeInOutQuad'
            });

            anime({
                targets: btnIcon,
                opacity: [1, 0],
                translateX: [0, 20],
                duration: 300,
                easing: 'easeInOutQuad',
                complete: function() {
                    // Show success message
                    btnText.textContent = 'Message Sent!';
                    btnIcon.textContent = '✓';
                    
                    anime({
                        targets: [btnText, btnIcon],
                        opacity: [0, 1],
                        translateX: 0,
                        duration: 300,
                        easing: 'easeOutQuad'
                    });

                    // Reset form
                    setTimeout(() => {
                        contactForm.reset();
                        
                        setTimeout(() => {
                            btnText.textContent = 'Send Message';
                            btnIcon.textContent = '→';
                            
                            anime({
                                targets: submitBtn,
                                scale: [1.05, 1],
                                duration: 300,
                                easing: 'easeOutQuad'
                            });
                        }, 2000);
                    }, 1000);
                }
            });
        });
    }
});
