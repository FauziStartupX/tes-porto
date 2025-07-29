// Navigation functionality
document.addEventListener('DOMContentLoaded', function () {
    initNavigation();
    initActiveSection();
});

function initNavigation() {
    const menuBtn = document.getElementById('menuBtn');
    const closeSidebar = document.getElementById('closeSidebar');
    const sidebar = document.getElementById('sidebar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Menu button click
    menuBtn.addEventListener('click', function () {
        sidebar.classList.add('active');
        menuBtn.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Add backdrop
        const backdrop = document.createElement('div');
        backdrop.className = 'sidebar-backdrop';
        backdrop.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 1000;
            animation: fadeIn 0.3s ease;
        `;

        backdrop.addEventListener('click', closeSidebarFunction);
        document.body.appendChild(backdrop);
    });

    // Close sidebar button
    closeSidebar.addEventListener('click', closeSidebarFunction);

    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));

            // Add active class to clicked link
            this.classList.add('active');

            // Close sidebar on mobile
            if (window.innerWidth <= 768) {
                closeSidebarFunction();
            }
        });
    });

    // Close sidebar function
    function closeSidebarFunction() {
        sidebar.classList.remove('active');
        menuBtn.classList.remove('active');
        document.body.style.overflow = '';

        // Remove backdrop
        const backdrop = document.querySelector('.sidebar-backdrop');
        if (backdrop) {
            backdrop.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => backdrop.remove(), 300);
        }
    }

    // Close sidebar on escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            closeSidebarFunction();
        }
    });

    // Handle window resize
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768 && sidebar.classList.contains('active')) {
            closeSidebarFunction();
        }
    });
}

function initActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                updateActiveNavigation(sectionId);
            }
        });
    }, observerOptions);

    // Observe all sections
    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    function updateActiveNavigation(sectionId) {
        // Remove active class from all nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to current section link
        const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');

            // Add ripple effect
            addRippleEffect(activeLink);
        }

        // Update browser URL without triggering scroll
        if (history.replaceState) {
            history.replaceState(null, null, `#${sectionId}`);
        }
    }

    function addRippleEffect(element) {
        const ripple = document.createElement('span');
        ripple.className = 'nav-ripple';
        ripple.style.cssText = `
            position: absolute;
            left: 0;
            top: 50%;
            width: 4px;
            height: 0;
            background: var(--primary-color);
            border-radius: 2px;
            transform: translateY(-50%);
            animation: rippleExpand 0.6s ease;
        `;

        element.style.position = 'relative';
        element.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    }
}

// Add navigation styles
const navStyles = document.createElement('style');
navStyles.textContent = `
    @keyframes rippleExpand {
        0% {
            height: 0;
            opacity: 1;
        }
        50% {
            height: 100%;
            opacity: 0.8;
        }
        100% {
            height: 100%;
            opacity: 0;
        }
    }
    
    .sidebar-backdrop {
        backdrop-filter: blur(2px);
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    /* Enhanced navigation styles */
    .nav-link {
        border-radius: 8px;
        margin: 2px 0;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .nav-link:hover {
        background: rgba(0, 217, 255, 0.08);
        transform: translateX(8px);
    }
    
    .nav-link.active {
        background: rgba(0, 217, 255, 0.15);
        color: var(--primary-color);
        font-weight: 600;
    }
    
    .nav-link.active::before {
        transform: scaleY(1);
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        width: 4px;
    }
    
    /* Menu button animation */
    .menu-btn {
        transition: transform 0.3s ease;
    }
    
    .menu-btn:hover {
        transform: scale(1.1);
    }
    
    .menu-btn:active {
        transform: scale(0.95);
    }
    
    /* Sidebar animations */
    .sidebar {
        box-shadow: 2px 0 20px rgba(0, 0, 0, 0.3);
    }
    
    .sidebar.active {
        box-shadow: 2px 0 30px rgba(0, 0, 0, 0.5);
    }
    
    /* Mobile optimizations */
    @media (max-width: 768px) {
        .sidebar {
            width: 280px;
        }
        
        .nav-link:hover {
            transform: none;
        }
    }
    
    @media (max-width: 480px) {
        .sidebar {
            width: 100vw;
            left: -100vw;
        }
        
        .sidebar.active {
            left: 0;
        }
    }
`;

document.head.appendChild(navStyles);

// Keyboard navigation
document.addEventListener('keydown', function (e) {
    const sidebar = document.getElementById('sidebar');
    const navLinks = document.querySelectorAll('.nav-link');
    const activeLink = document.querySelector('.nav-link.active');

    if (!sidebar.classList.contains('active')) return;

    let currentIndex = Array.from(navLinks).indexOf(activeLink);

    switch (e.key) {
        case 'ArrowDown':
            e.preventDefault();
            currentIndex = (currentIndex + 1) % navLinks.length;
            navLinks[currentIndex].focus();
            break;

        case 'ArrowUp':
            e.preventDefault();
            currentIndex = currentIndex <= 0 ? navLinks.length - 1 : currentIndex - 1;
            navLinks[currentIndex].focus();
            break;

        case 'Enter':
        case ' ':
            if (e.target.classList.contains('nav-link')) {
                e.preventDefault();
                e.target.click();
            }
            break;
    }
});

// Add focus styles for accessibility
const focusStyles = document.createElement('style');
focusStyles.textContent = `
    .nav-link:focus {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
        background: rgba(0, 217, 255, 0.1);
    }
    
    .menu-btn:focus {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
        border-radius: 4px;
    }
    
    .close-btn:focus {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
        border-radius: 4px;
    }
`;

document.head.appendChild(focusStyles);