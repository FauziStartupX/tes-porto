// Animation control and management
document.addEventListener('DOMContentLoaded', function () {
    initScrollAnimations();
    initHoverAnimations();
    initLoadingAnimations();
    initInteractiveElements();
});

// Scroll-based animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');

                // Add stagger effect for grouped elements
                if (entry.target.parentElement.classList.contains('stagger-container')) {
                    const siblings = Array.from(entry.target.parentElement.children);
                    const index = siblings.indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        animationObserver.observe(element);
    });

    // Add animation classes to specific elements
    addAnimationClasses();
}

function addAnimationClasses() {
    // Hero section animations
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroDescription = document.querySelector('.hero-description');
    const heroButtons = document.querySelector('.hero-buttons');
    const heroVisual = document.querySelector('.hero-visual');

    if (heroTitle) heroTitle.classList.add('animate-on-scroll', 'fade-in-up');
    if (heroSubtitle) {
        heroSubtitle.classList.add('animate-on-scroll', 'fade-in-up');
        heroSubtitle.style.animationDelay = '0.2s';
    }
    if (heroDescription) {
        heroDescription.classList.add('animate-on-scroll', 'fade-in-up');
        heroDescription.style.animationDelay = '0.4s';
    }
    if (heroButtons) {
        heroButtons.classList.add('animate-on-scroll', 'fade-in-up');
        heroButtons.style.animationDelay = '0.6s';
    }
    if (heroVisual) {
        heroVisual.classList.add('animate-on-scroll', 'fade-in-right');
        heroVisual.style.animationDelay = '0.8s';
    }

    // Stats animations
    document.querySelectorAll('.stat-item').forEach((stat, index) => {
        stat.classList.add('animate-on-scroll', 'scale-up');
        stat.style.animationDelay = `${index * 0.2}s`;
    });

    // Skills animations
    document.querySelectorAll('.skill-category').forEach((category, index) => {
        category.classList.add('animate-on-scroll', 'slide-up');
        category.style.animationDelay = `${index * 0.15}s`;
    });

    // Project cards animations
    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.classList.add('animate-on-scroll', 'fade-in-up');
        card.style.animationDelay = `${index * 0.2}s`;
    });

    // Contact section animations
    const contactInfo = document.querySelector('.contact-info');
    const contactForm = document.querySelector('.contact-form');

    if (contactInfo) {
        contactInfo.classList.add('animate-on-scroll', 'slide-left');
    }
    if (contactForm) {
        contactForm.classList.add('animate-on-scroll', 'slide-right');
        contactForm.style.animationDelay = '0.3s';
    }
}

// Hover animations
function initHoverAnimations() {
    // Project cards hover effect
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-15px) rotateX(5deg)';
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.4)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) rotateX(0)';
            this.style.boxShadow = '';
        });
    });

    // Skill tags hover effect
    document.querySelectorAll('.skill-tag').forEach(tag => {
        tag.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = '0 5px 15px rgba(0, 217, 255, 0.3)';
        });

        tag.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });

    // Button hover animations
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function () {
            if (this.classList.contains('glow-btn')) {
                this.style.boxShadow = '0 0 40px rgba(0, 217, 255, 0.6)';
                this.style.transform = 'translateY(-3px) scale(1.02)';
            }
        });

        btn.addEventListener('mouseleave', function () {
            if (this.classList.contains('glow-btn')) {
                this.style.boxShadow = '0 0 20px rgba(0, 217, 255, 0.3)';
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });

    // Social links hover animation
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px) rotate(5deg) scale(1.1)';
            this.style.boxShadow = '0 10px 20px rgba(0, 217, 255, 0.3)';
        });

        link.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) rotate(0) scale(1)';
            this.style.boxShadow = '';
        });
    });
}

// Loading animations
function initLoadingAnimations() {
    // Page load animation
    window.addEventListener('load', function () {
        document.body.classList.add('page-loaded');

        // Animate elements in sequence
        setTimeout(() => {
            document.querySelector('.top-navbar')?.classList.add('slide-down');
        }, 100);

        setTimeout(() => {
            document.querySelector('.hero-section')?.classList.add('fade-in');
        }, 300);
    });

    // Preloader (if needed)
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', function () {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        });
    }
}

// Interactive elements
function initInteractiveElements() {
    // Code block animation
    const codeLines = document.querySelectorAll('.code-line');
    codeLines.forEach((line, index) => {
        line.style.opacity = '0';
        line.style.transform = 'translateX(-20px)';
        line.style.transition = 'all 0.5s ease';
        line.style.animationDelay = `${index * 0.2}s`;

        setTimeout(() => {
            line.style.opacity = '1';
            line.style.transform = 'translateX(0)';
        }, 1000 + (index * 200));
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;
        const heroVisual = document.querySelector('.hero-visual');
        const particles = document.querySelectorAll('.particle');

        if (heroVisual) {
            heroVisual.style.transform = `translateY(${scrolled * 0.1}px)`;
        }

        particles.forEach((particle, index) => {
            const speed = 0.05 + (index * 0.02);
            particle.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Mouse move parallax for hero section
    document.addEventListener('mousemove', function (e) {
        const heroSection = document.querySelector('.hero-section');
        if (!heroSection) return;

        const rect = heroSection.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        const moveX = (x - 0.5) * 20;
        const moveY = (y - 0.5) * 20;

        const codeBlock = document.querySelector('.code-block');
        if (codeBlock) {
            codeBlock.style.transform = `translate(${moveX}px, ${moveY}px) rotateX(${moveY * 0.1}deg) rotateY(${moveX * 0.1}deg)`;
        }
    });

    // Text reveal animation
    initTextRevealAnimation();

    // Floating animation for particles
    animateFloatingElements();
}

function initTextRevealAnimation() {
    const textElements = document.querySelectorAll('.text-reveal');

    textElements.forEach(element => {
        const text = element.textContent;
        element.innerHTML = '';

        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            span.style.transition = `all 0.5s ease ${index * 0.05}s`;
            element.appendChild(span);
        });

        // Trigger animation when element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const spans = entry.target.querySelectorAll('span');
                    spans.forEach(span => {
                        span.style.opacity = '1';
                        span.style.transform = 'translateY(0)';
                    });
                }
            });
        });

        observer.observe(element);
    });
}

function animateFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-element');

    floatingElements.forEach((element, index) => {
        const duration = 3 + Math.random() * 2;
        const delay = Math.random() * 2;
        const amplitude = 10 + Math.random() * 10;

        element.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
        element.style.setProperty('--float-amplitude', `${amplitude}px`);
    });
}

// Performance optimization
function optimizeAnimations() {
    // Reduce animations on low-end devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        document.documentElement.style.setProperty('--animation-duration', '0.1s');
    }

    // Pause animations when tab is not visible
    document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
            document.body.classList.add('animations-paused');
        } else {
            document.body.classList.remove('animations-paused');
        }
    });
}

// Initialize optimization
optimizeAnimations();

// Add animation utility styles
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    .page-loaded {
        animation: pageLoad 1s ease-out;
    }
    
    @keyframes pageLoad {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .animations-paused * {
        animation-play-state: paused !important;
        transition: none !important;
    }
    
    .floating-element {
        animation: float var(--animation-duration, 3s) ease-in-out infinite;
    }
    
    @keyframes float {
        0%, 100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(var(--float-amplitude, -10px));
        }
    }
    
    /* Enhanced entrance animations */
    .fade-in {
        animation: fadeIn 1s ease-out;
    }
    
    .slide-down {
        animation: slideDown 0.8s ease-out;
    }
    
    .bounce-in {
        animation: bounceIn 1s ease-out;
    }
    
    @keyframes bounceIn {
        0% {
            opacity: 0;
            transform: scale(0.3);
        }
        50% {
            opacity: 1;
            transform: scale(1.05);
        }
        70% {
            transform: scale(0.9);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    /* Stagger animations */
    .stagger-container .animate-on-scroll {
        animation-delay: var(--stagger-delay, 0s);
    }
    
    /* Responsive animation adjustments */
    @media (max-width: 768px) {
        .animate-on-scroll {
            animation-duration: 0.6s;
        }
    }
    
    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
`;

document.head.appendChild(animationStyles);