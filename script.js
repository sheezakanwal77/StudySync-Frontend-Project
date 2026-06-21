document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Dynamic Footer Copyright Year
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Sticky Header Scroll Effect
    const headerWrapper = document.querySelector('.header-wrapper');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            headerWrapper.classList.add('scrolled');
        } else {
            headerWrapper.classList.remove('scrolled');
        }
    });

    // 3. Mobile Navigation Drawer Toggle
    const menuBtn = document.querySelector('.menu-btn');
    const mobileOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileDrawer = document.querySelector('.mobile-nav-drawer');
    const mobileLinks = document.querySelectorAll('.mobile-nav-drawer .nav_link');

    function toggleMobileMenu() {
        mobileOverlay.classList.toggle('open');
        mobileDrawer.classList.toggle('open');
        
        // Toggle hamburger menu icon if needed (can rotate or change image source)
        if (mobileDrawer.classList.contains('open')) {
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        } else {
            document.body.style.overflow = '';
        }
    }

    if (menuBtn) menuBtn.addEventListener('click', toggleMobileMenu);
    if (mobileOverlay) mobileOverlay.addEventListener('click', toggleMobileMenu);
    
    // Close drawer when clicking a mobile nav link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileDrawer.classList.contains('open')) {
                toggleMobileMenu();
            }
        });
    });

    // 4. Scroll Spy - Highlight navigation links based on scroll position
    const sections = document.querySelectorAll('section, header, div[id]');
    const navLinks = document.querySelectorAll('.nav .nav_link');
    const mobLinks = document.querySelectorAll('.mobile-nav-drawer .nav_link');

    function scrollSpy() {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 100; // Offset for header height

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < (sectionTop + sectionHeight)) {
                if (sectionId) currentSectionId = sectionId;
            }
        });

        // Helper to update active class
        const updateLinks = (linksArray) => {
            linksArray.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}` || 
                    (currentSectionId === 'home' && link.getAttribute('href') === '#')) {
                    link.classList.add('active');
                }
            });
        };

        updateLinks(navLinks);
        updateLinks(mobLinks);
    }

    window.addEventListener('scroll', scrollSpy);
    scrollSpy(); // Initial call

    // 5. Newsletter Sign-Up with custom toast notification
    const newsletterForm = document.querySelector('.newsletter-form');
    const emailInput = document.querySelector('.newsletter-input');
    const toastMsg = document.querySelector('.toast-msg');

    if (newsletterForm && emailInput && toastMsg) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailValue = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (emailRegex.test(emailValue)) {
                // Success feedback
                toastMsg.classList.add('show');
                emailInput.value = '';
                emailInput.blur();

                // Hide toast after 4 seconds
                setTimeout(() => {
                    toastMsg.classList.remove('show');
                }, 4000);
            } else {
                // Shake effect or custom invalid feedback could be added here
                emailInput.style.borderColor = 'var(--danger)';
                setTimeout(() => {
                    emailInput.style.borderColor = '';
                }, 1000);
            }
        });
    }
});
