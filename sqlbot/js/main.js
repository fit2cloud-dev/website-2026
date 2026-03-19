/**
 * Cordys CRM Website JavaScript
 * Main interactive functionality
 */

(function() {
    'use strict';

    // DOM Elements
    const header = document.getElementById('header');
    const topBar = document.getElementById('top-bar');
    const navToggle = document.getElementById('nav-toggle');
    const navCenter = document.querySelector('.nav__center');
    const navRight = document.querySelector('.nav__right');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav__link');

    // State
    let isMenuOpen = false;
    let lastScrollY = window.scrollY;

    // Initialize
    document.addEventListener('DOMContentLoaded', init);

    function init() {
        setupScrollHandler();
        setupNavigation();
        setupTopBarDropdown();
        setupSmoothScroll();
        setupAnimations();
        setupAccessibility();
    }

    /**
     * Scroll Handler
     * Adds shadow to header when scrolled and manages top-bar visibility
     */
    function setupScrollHandler() {
        let isTopBarHidden = false;
        
        function handleScroll() {
            const currentScrollY = window.scrollY;
            const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
            
            // Add scrolled class for styling
            if (currentScrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            // Handle top-bar visibility
            if (topBar) {
                if (scrollDirection === 'down' && currentScrollY > 100 && !isTopBarHidden) {
                    // Hide top-bar when scrolling down
                    topBar.classList.add('hidden');
                    header.classList.add('top-bar-hidden');
                    isTopBarHidden = true;
                } else if (scrollDirection === 'up' && isTopBarHidden) {
                    // Show top-bar when scrolling up
                    topBar.classList.remove('hidden');
                    header.classList.remove('top-bar-hidden');
                    isTopBarHidden = false;
                } else if (currentScrollY <= 50 && isTopBarHidden) {
                    // Always show top-bar when near the top
                    topBar.classList.remove('hidden');
                    header.classList.remove('top-bar-hidden');
                    isTopBarHidden = false;
                }
            }

            lastScrollY = currentScrollY;
        }

        // Throttle scroll events for performance
        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(function() {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    /**
     * Navigation Handler
     * Mobile menu toggle and responsive behavior
     */
    function setupNavigation() {
        // Toggle mobile menu
        if (navToggle) {
            navToggle.addEventListener('click', toggleMenu);
        }

        // Close menu when clicking nav links
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (isMenuOpen && !nav.contains(event.target)) {
                closeMenu();
            }
        });

        // Handle escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && isMenuOpen) {
                closeMenu();
            }
        });

        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && isMenuOpen) {
                closeMenu();
            }
        });
    }

    function toggleMenu() {
        if (isMenuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    function openMenu() {
        nav.classList.add('mobile-open');
        navToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
        isMenuOpen = true;
        animateHamburger(true);
    }

    function closeMenu() {
        nav.classList.remove('mobile-open');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
        isMenuOpen = false;
        animateHamburger(false);
    }

    /**
     * Top Bar Dropdown Handler
     * Manages the top bar dropdown menu functionality
     */
    function setupTopBarDropdown() {
        const dropdownBtn = document.getElementById('dropdownBtn');
        const dropdownContent = document.getElementById('dropdownContent');
        
        if (dropdownBtn && dropdownContent) {
            // Toggle dropdown on button click
            dropdownBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                dropdownContent.classList.toggle('show');
                
                // Update aria-expanded attribute for accessibility
                const isExpanded = dropdownContent.classList.contains('show');
                dropdownBtn.setAttribute('aria-expanded', isExpanded);
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', function(e) {
                if (!dropdownBtn.contains(e.target) && !dropdownContent.contains(e.target)) {
                    dropdownContent.classList.remove('show');
                    dropdownBtn.setAttribute('aria-expanded', 'false');
                }
            });
            
            // Handle escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && dropdownContent.classList.contains('show')) {
                    dropdownContent.classList.remove('show');
                    dropdownBtn.setAttribute('aria-expanded', 'false');
                    dropdownBtn.focus();
                }
            });
            
            // Initialize aria attributes
            dropdownBtn.setAttribute('aria-expanded', 'false');
            dropdownBtn.setAttribute('aria-haspopup', 'true');
        }
    }

    function animateHamburger(isOpen) {
        const spans = navToggle.querySelectorAll('span');
        if (spans.length === 3) {
            if (isOpen) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = '';
                spans[1].style.opacity = '1';
                spans[2].style.transform = '';
            }
        }
    }

    /**
     * Smooth Scroll
     * Smooth scrolling for anchor links
     */
    function setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    const offsetTop = targetElement.offsetTop - 70; // Account for fixed header
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });

                    closeMenu(); // Close mobile menu if open
                }
            });
        });
    }

    /**
     * Animation Observer
     * Trigger animations when elements come into view
     */
    function setupAnimations() {
        // Check if Intersection Observer is supported
        if ('IntersectionObserver' in window) {
            const animationObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                        animationObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            // Observe elements for animation
            document.querySelectorAll('.beta__card, .feature__item').forEach(el => {
                animationObserver.observe(el);
            });
        }
    }

    /**
     * Accessibility Features
     */
    function setupAccessibility() {
        // Add keyboard navigation for interactive elements
        document.querySelectorAll('.feature__item, .beta__card').forEach(element => {
            element.setAttribute('tabindex', '0');
            
            element.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    element.click();
                }
            });
        });

        // Add aria-labels for better screen reader support
        const qrCode = document.querySelector('.qr__code');
        if (qrCode) {
            qrCode.setAttribute('aria-label', 'Cordys CRM 微信交流群二维码');
            qrCode.setAttribute('role', 'img');
        }

        // Enhanced focus management
        setupFocusManagement();
    }

    /**
     * Focus Management
     * Improve keyboard navigation experience
     */
    function setupFocusManagement() {
        let focusableElements = [];
        
        function updateFocusableElements() {
            focusableElements = Array.from(document.querySelectorAll(
                'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
            )).filter(el => {
                return !el.hasAttribute('disabled') && 
                       !el.getAttribute('aria-hidden') && 
                       el.offsetParent !== null;
            });
        }

        // Update on DOM changes
        updateFocusableElements();
        
        // Trap focus in mobile menu when open
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Tab' && isMenuOpen) {
                updateFocusableElements();
                const menuFocusable = focusableElements.filter(el => 
                    (navCenter && navCenter.contains(el)) || 
                    (navRight && navRight.contains(el)) || 
                    navToggle.contains(el)
                );
                
                if (menuFocusable.length > 0) {
                    const firstFocusable = menuFocusable[0];
                    const lastFocusable = menuFocusable[menuFocusable.length - 1];
                    
                    if (e.shiftKey) {
                        if (document.activeElement === firstFocusable) {
                            e.preventDefault();
                            lastFocusable.focus();
                        }
                    } else {
                        if (document.activeElement === lastFocusable) {
                            e.preventDefault();
                            firstFocusable.focus();
                        }
                    }
                }
            }
        });
    }

    /**
     * Performance Optimizations
     */
    
    // Preload critical resources
    function preloadResources() {
        const criticalResources = [
            'css/styles.css'
        ];
        
        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = resource;
            document.head.appendChild(link);
        });
    }

    // Lazy load non-critical elements
    function setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const lazyElements = document.querySelectorAll('[data-lazy]');
            
            const lazyObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const element = entry.target;
                        const src = element.getAttribute('data-lazy');
                        
                        if (src) {
                            element.src = src;
                            element.removeAttribute('data-lazy');
                        }
                        
                        lazyObserver.unobserve(element);
                    }
                });
            });
            
            lazyElements.forEach(el => lazyObserver.observe(el));
        }
    }

    /**
     * Error Handling
     */
    window.addEventListener('error', function(e) {
        console.error('JavaScript error occurred:', e.error);
        // In production, you might want to send this to an analytics service
    });

    /**
     * Utility Functions
     */
    
    // Debounce function for performance
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Throttle function for performance
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    /**
     * Analytics and Tracking (Placeholder)
     * In production, you might want to add analytics tracking
     */
    function trackEvent(eventName, properties = {}) {
        // Placeholder for analytics tracking
        console.log('Event tracked:', eventName, properties);
        
        // Example: Google Analytics
        // if (typeof gtag !== 'undefined') {
        //     gtag('event', eventName, properties);
        // }
    }

    // Track page interactions
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('navigation_click', {
                link_text: this.textContent,
                link_url: this.href
            });
        });
    });

    // Initialize lazy loading and preloading
    setupLazyLoading();
    
    // Add visual feedback for development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('🚀 Cordys CRM Website initialized successfully');
        console.log('📱 Responsive breakpoints: Mobile(<768px), Tablet(768-1024px), Desktop(>1024px)');
    }



})();