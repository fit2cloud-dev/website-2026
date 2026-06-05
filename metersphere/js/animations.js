/**
 * MeterSphere 现代化动感效果
 * 使用 IntersectionObserver 实现滚动触发动画
 */
(function () {
    'use strict';

    // 揭示动画 Observer
    var revealObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    // 给 section 加 revealed 标记
                    var section = entry.target.closest('.reveal-section');
                    if (section) {
                        section.classList.add('revealed');
                    }
                    // 给内部子元素加 revealed
                    var reveals = entry.target.querySelectorAll('.reveal-left, .reveal-right');
                    reveals.forEach(function (el) {
                        el.classList.add('revealed');
                    });
                    // 只触发一次
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        }
    );

    // 观察所有 reveal-section
    var sections = document.querySelectorAll('.reveal-section');
    sections.forEach(function (section) {
        revealObserver.observe(section);
    });

    // ========== 手机端汉堡菜单 ==========
    // 等待 DOM 就绪
    function initMobileMenu() {
        var toggle = document.querySelector('.navbar-toggle');
        var navigation = document.querySelector('#navigation');
        if (!toggle || !navigation) return;

        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            navigation.classList.toggle('open');
            toggle.classList.toggle('open');
        });

        // 点击菜单项后自动关闭（手机端）
        var menuLinks = navigation.querySelectorAll('.navigation-menu a');
        menuLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                if (window.innerWidth <= 833) {
                    navigation.classList.remove('open');
                    toggle.classList.remove('open');
                }
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMobileMenu);
    } else {
        initMobileMenu();
    }
})();
