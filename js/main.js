/*
 * XenonaAI Website Scripts
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const body = document.querySelector('body');
    
    // Create mobile menu if it doesn't exist
    if (!document.querySelector('.mobile-menu')) {
        const mobileMenu = document.createElement('div');
        mobileMenu.classList.add('mobile-menu');
        
        const mobileMenuClose = document.createElement('div');
        mobileMenuClose.classList.add('mobile-menu-close');
        mobileMenuClose.innerHTML = '<i class="fas fa-times"></i>';
        
        const mobileMenuLinks = document.createElement('div');
        mobileMenuLinks.classList.add('mobile-menu-links');
        
        // Clone nav links to mobile menu
        const navLinks = document.querySelector('.nav-links').cloneNode(true);
        const navLinksArray = Array.from(navLinks.querySelectorAll('a'));
        
        navLinksArray.forEach(link => {
            const newLink = document.createElement('a');
            newLink.href = link.href;
            newLink.textContent = link.textContent;
            mobileMenuLinks.appendChild(newLink);
        });
        
        // Add download button to mobile menu
        const ctaButton = document.querySelector('.cta-button a').cloneNode(true);
        mobileMenuLinks.appendChild(ctaButton);
        
        mobileMenu.appendChild(mobileMenuClose);
        mobileMenu.appendChild(mobileMenuLinks);
        body.appendChild(mobileMenu);
        
        // Mobile menu close button event
        mobileMenuClose.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            body.style.overflow = 'auto';
        });
        
        // Mobile menu links event
        mobileMenuLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                body.style.overflow = 'auto';
            });
        });
    }
    
    const mobileMenu = document.querySelector('.mobile-menu');
    
    // Mobile menu toggle event
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            body.style.overflow = 'hidden';
        });
    }
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header Scroll Effect
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.boxShadow = 'var(--shadow)';
        } else {
            header.style.boxShadow = 'var(--shadow-sm)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Animate Elements on Scroll
    const animateElements = document.querySelectorAll('.feature-card, .step, .screenshot, .download-card, .faq-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(element);
    });
});