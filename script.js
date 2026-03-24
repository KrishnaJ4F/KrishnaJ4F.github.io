document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Reveal Animation using Intersection Observer
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const revealOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };
    
    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);
    
    revealElements.forEach(el => revealOnScroll.observe(el));

    // 2. Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            const isExpanded = mobileToggle.classList.contains('active');
            mobileToggle.setAttribute('aria-expanded', isExpanded);
        });
    }

    // 3. Smooth scrolling for internal anchor links 
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            // Close mobile menu on click
            if (navLinks && navLinks.classList.contains('active') && mobileToggle) {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
            }

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // 4. Subtle Parallax for Hero Section Elements
    const abstractShape = document.querySelector('.abstract-shape');
    const dashboardPreview = document.querySelector('.hero-visual .dashboard-preview-card');
    
    if (abstractShape || dashboardPreview) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            // Only calculate parallax when hero is likely in view to save GPU cycles
            if (scrollY < 800) { 
                if (abstractShape) {
                    abstractShape.style.transform = `translateY(${scrollY * 0.25}px) rotate(${scrollY * 0.05}deg)`;
                }
                if (dashboardPreview) {
                    // Start from base perspective, translate dynamically
                    dashboardPreview.style.transform = `perspective(1000px) rotateY(-5deg) rotateX(5deg) translateY(${scrollY * -0.05}px)`;
                }
            }
        });

        // Add smooth hover override so cards still pop cleanly during active focus
        if (dashboardPreview) {
            dashboardPreview.addEventListener('mouseenter', () => {
                dashboardPreview.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1.02) translateY(${window.scrollY * -0.05}px)`;
            });
            dashboardPreview.addEventListener('mouseleave', () => {
                dashboardPreview.style.transform = `perspective(1000px) rotateY(-5deg) rotateX(5deg) translateY(${window.scrollY * -0.05}px)`;
            });
        }
    }

    // 5. Navbar Sticky Scroll Effect (Glassmorphism transition)
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });
});
