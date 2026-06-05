/**
 * SQLBot Website JavaScript
 * Main interactive functionality
 */

(function() {
    'use strict';

    // DOM Elements
    const header = document.getElementById('header');
    const topBar = document.getElementById('top-bar');
    const navToggle = document.getElementById('nav-toggle');
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

            if (currentScrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            if (topBar) {
                if (scrollDirection === 'down' && currentScrollY > 100 && !isTopBarHidden) {
                    topBar.classList.add('hidden');
                    header.classList.add('top-bar-hidden');
                    isTopBarHidden = true;
                } else if (scrollDirection === 'up' && isTopBarHidden) {
                    topBar.classList.remove('hidden');
                    header.classList.remove('top-bar-hidden');
                    isTopBarHidden = false;
                } else if (currentScrollY <= 50 && isTopBarHidden) {
                    topBar.classList.remove('hidden');
                    header.classList.remove('top-bar-hidden');
                    isTopBarHidden = false;
                }
            }

            lastScrollY = currentScrollY;
        }

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
        if (navToggle) {
            navToggle.addEventListener('click', toggleMenu);
        }

        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        document.addEventListener('click', function(event) {
            if (isMenuOpen && !nav.contains(event.target)) {
                closeMenu();
            }
        });

        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && isMenuOpen) {
                closeMenu();
            }
        });

        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && isMenuOpen) {
                closeMenu();
            }
        });
    }

    function toggleMenu() {
        isMenuOpen ? closeMenu() : openMenu();
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
     * Top Bar Dropdown Handler
     */
    function setupTopBarDropdown() {
        const dropdownBtn = document.getElementById('dropdownBtn');
        const dropdownContent = document.getElementById('dropdownContent');

        if (dropdownBtn && dropdownContent) {
            dropdownBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                dropdownContent.classList.toggle('show');
                const isExpanded = dropdownContent.classList.contains('show');
                dropdownBtn.setAttribute('aria-expanded', isExpanded);
            });

            document.addEventListener('click', function(e) {
                if (!dropdownBtn.contains(e.target) && !dropdownContent.contains(e.target)) {
                    dropdownContent.classList.remove('show');
                    dropdownBtn.setAttribute('aria-expanded', 'false');
                }
            });

            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && dropdownContent.classList.contains('show')) {
                    dropdownContent.classList.remove('show');
                    dropdownBtn.setAttribute('aria-expanded', 'false');
                    dropdownBtn.focus();
                }
            });

            dropdownBtn.setAttribute('aria-expanded', 'false');
            dropdownBtn.setAttribute('aria-haspopup', 'true');
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
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                    closeMenu();
                }
            });
        });
    }

    /**
     * Accessibility Features
     */
    function setupAccessibility() {
        const qrCode = document.querySelector('.qr__code');
        if (qrCode) {
            qrCode.setAttribute('aria-label', 'SQLBot 微信交流群二维码');
            qrCode.setAttribute('role', 'img');
        }
    }

})();
