/**
 * JumpServer GA4 event tracking (G-2ZRQ481R4Z)
 * Centralized click, scroll, and engagement events for all HTML pages.
 */
(function () {
    'use strict';

    if (typeof gtag !== 'function') {
        return;
    }

    var GA4_ID = 'G-2ZRQ481R4Z';

    var LEAD_FORMS = {
        kyOYpi: 'enterprise_trial',
        sQ91MK: 'technical_consultation',
        pkJruR: 'quote_consultation',
    };

    var SOLUTION_PAGES = {
        'hardware.html': 'hardware',
        'xinchuang.html': 'xinchuang',
        'distributed.html': 'distributed',
        'remoteapp.html': 'remoteapp',
        'database.html': 'database',
        'e-commerce.html': 'e-commerce',
        'pam.html': 'pam',
        'pam-comparison.html': 'pam-comparison',
    };

    var BLOG_CATEGORY_PREFIXES = [
        'release',
        'security',
        'tutorial',
        'news',
        'case',
        'community',
        'pam',
        'database',
        'industry',
        'skills',
        'xinchuang',
    ];

    function trimText(text, max) {
        return (text || '').replace(/\s+/g, ' ').trim().substring(0, max || 100);
    }

    function getPathname() {
        return (window.location.pathname || '').toLowerCase();
    }

    function getFilename(pathname) {
        var parts = pathname.split('/');
        return parts[parts.length - 1] || 'index.html';
    }

    function getBlogCategory(slug) {
        for (var i = 0; i < BLOG_CATEGORY_PREFIXES.length; i++) {
            var prefix = BLOG_CATEGORY_PREFIXES[i];
            if (slug.indexOf(prefix + '-') === 0) {
                return prefix;
            }
        }
        return 'other';
    }

    function getPageContext() {
        var pathname = getPathname();
        var filename = getFilename(pathname);
        var pageCategory = 'other';
        var contentGroup = 'other';
        var contentId = '';
        var blogCategory = '';

        if (
            pathname === '/' ||
            pathname.endsWith('/index.html') ||
            filename === 'index.html' ||
            filename === ''
        ) {
            pageCategory = 'home';
            contentGroup = 'home';
        } else if (filename === 'landing.html') {
            pageCategory = 'landing';
            contentGroup = 'home';
        } else if (filename === 'index-en.html') {
            pageCategory = 'home_en';
            contentGroup = 'home';
        } else if (filename === 'whyjumpserver.html') {
            pageCategory = 'product_advantage';
            contentGroup = 'product';
        } else if (filename === 'features.html') {
            pageCategory = 'version_compare';
            contentGroup = 'product';
        } else if (filename === 'enterprise.html') {
            pageCategory = 'enterprise';
            contentGroup = 'product';
        } else if (SOLUTION_PAGES[filename]) {
            pageCategory = 'solution';
            contentGroup = 'solution';
            contentId = SOLUTION_PAGES[filename];
        } else if (filename === 'customers.html') {
            pageCategory = 'customer_list';
            contentGroup = 'customers';
        } else if (pathname.indexOf('/customers/') !== -1) {
            pageCategory = 'customer_detail';
            contentGroup = 'customers';
            contentId = filename.replace('.html', '');
        } else if (filename === 'blog.html') {
            pageCategory = 'blog_list';
            contentGroup = 'blog';
        } else if (pathname.indexOf('/blog/') !== -1) {
            pageCategory = 'blog_article';
            contentGroup = 'blog';
            contentId = filename.replace('.html', '');
            blogCategory = getBlogCategory(contentId);
        } else if (filename === 'video.html') {
            pageCategory = 'video';
            contentGroup = 'resources';
        } else if (filename === 'about.html') {
            pageCategory = 'about';
            contentGroup = 'company';
        }

        return {
            page_path: pathname,
            page_title: document.title,
            page_category: pageCategory,
            content_group: contentGroup,
            content_id: contentId,
            blog_category: blogCategory,
            language: document.documentElement.lang || 'zh-CN',
        };
    }

    var pageContext = getPageContext();

    function trackEvent(eventName, params) {
        var payload = Object.assign({}, pageContext, params || {});
        gtag('event', eventName, payload);
    }

    function isSameOrigin(href) {
        try {
            return new URL(href, window.location.origin).origin === window.location.origin;
        } catch (e) {
            return false;
        }
    }

    function isInternalHtmlLink(href) {
        if (!href || href.indexOf('javascript:') === 0) {
            return false;
        }
        if (href.charAt(0) === '#') {
            return false;
        }
        if (!isSameOrigin(href)) {
            return false;
        }
        return href.indexOf('.html') !== -1 || href.endsWith('/');
    }

    function getOutboundDestination(href) {
        if (href.indexOf('docs.jumpserver.org') !== -1 || href.indexOf('docs.jumpserver.com') !== -1) {
            return 'docs';
        }
        if (href.indexOf('github.com/jumpserver') !== -1) {
            return 'github';
        }
        if (href.indexOf('bilibili.com') !== -1) {
            return 'bilibili';
        }
        if (href.indexOf('whitepaper.jumpserver.org') !== -1) {
            return 'whitepaper';
        }
        if (href.indexOf('kb.fit2cloud.com') !== -1) {
            return 'knowledge_base';
        }
        if (href.indexOf('bbs.fit2cloud.com') !== -1) {
            return 'community_forum';
        }
        if (href.indexOf('edu.fit2cloud.com') !== -1) {
            return 'training';
        }
        if (href.indexOf('apps.fit2cloud.com') !== -1) {
            return 'app_store';
        }
        if (href.indexOf('jinshuju.net') !== -1) {
            return 'jinshuju';
        }
        if (href.indexOf('fit2cloud.com') !== -1) {
            return 'fit2cloud';
        }
        if (href.indexOf('jumpserver.com') !== -1) {
            return 'english_site';
        }
        return 'external';
    }

    function handleLinkClick(link) {
        var href = link.href;
        if (!href) {
            return;
        }

        var text = trimText(link.textContent);
        var hrefLower = href.toLowerCase();

        if (hrefLower.indexOf('jinshuju.net/f/') !== -1) {
            var formMatch = href.match(/jinshuju\.net\/f\/([^/?#]+)/i);
            var formId = formMatch ? formMatch[1] : '';
            trackEvent('generate_lead', {
                lead_type: LEAD_FORMS[formId] || 'other',
                form_id: formId,
                link_text: text,
                link_url: href,
            });
            return;
        }

        if (
            hrefLower.indexOf('offline_install') !== -1 ||
            (link.classList.contains('menu-btn') && text.indexOf('下载') !== -1)
        ) {
            trackEvent('file_download', {
                file_name: 'JumpServer',
                file_extension: 'installer',
                link_text: text,
                link_url: href,
            });
            return;
        }

        if (hrefLower.indexOf('introduce-jumpserver') !== -1 && hrefLower.indexOf('.pdf') !== -1) {
            trackEvent('file_download', {
                file_name: 'introduce-jumpserver_2026.pdf',
                file_extension: 'pdf',
                link_text: text,
                link_url: href,
            });
            return;
        }

        if (hrefLower.indexOf('bilibili.com/video/') !== -1) {
            var videoMatch = href.match(/BV[\w]+/i);
            trackEvent('video_click', {
                video_provider: 'bilibili',
                video_id: videoMatch ? videoMatch[0] : '',
                link_text: text,
                link_url: href,
            });
            return;
        }

        if (hrefLower.indexOf('tel:') === 0) {
            trackEvent('contact_click', {
                contact_method: 'phone',
                link_text: text,
            });
            return;
        }

        if (hrefLower.indexOf('mailto:') === 0) {
            trackEvent('contact_click', {
                contact_method: 'email',
                link_text: text,
            });
            return;
        }

        if (link.getAttribute('href') === '#contact' || hrefLower.endsWith('#contact')) {
            trackEvent('contact_section_click', {
                link_text: text,
            });
            return;
        }

        if (isInternalHtmlLink(href)) {
            var path = '';
            try {
                path = new URL(href, window.location.origin).pathname;
            } catch (e) {
                path = href;
            }

            if (path.indexOf('/customers/') !== -1) {
                var customerSlug = getFilename(path.toLowerCase()).replace('.html', '');
                trackEvent('select_content', {
                    content_type: 'customer_case',
                    item_id: customerSlug,
                    link_text: text,
                    link_url: href,
                });
                return;
            }

            if (path.indexOf('/blog/') !== -1) {
                var articleSlug = getFilename(path.toLowerCase()).replace('.html', '');
                trackEvent('select_content', {
                    content_type: 'blog_article',
                    item_id: articleSlug,
                    blog_category: getBlogCategory(articleSlug),
                    link_text: text,
                    link_url: href,
                });
                return;
            }

            if (link.closest('#navigation, .navigation-menu, .de-footer-links, .de-footer-nav')) {
                trackEvent('navigation_click', {
                    link_text: text,
                    link_url: href,
                    nav_area: link.closest('#navigation, .navigation-menu') ? 'header' : 'footer',
                });
                return;
            }
        }

        if (!isSameOrigin(href)) {
            trackEvent('outbound_click', {
                destination: getOutboundDestination(hrefLower),
                link_text: text,
                link_url: href,
            });
            return;
        }

        if (link.closest('.mega-nav-list')) {
            trackEvent('outbound_click', {
                destination: 'fit2cloud_product',
                link_text: text,
                link_url: href,
            });
        }
    }

    document.addEventListener('click', function (event) {
        var link = event.target.closest('a');
        if (!link) {
            return;
        }
        handleLinkClick(link);
    });

    function initScrollDepth() {
        var thresholds = [25, 50, 75, 90];
        var reached = {};
        var ticking = false;

        function checkScroll() {
            var docHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (docHeight <= 0) {
                return;
            }
            var percent = Math.round((window.scrollY / docHeight) * 100);

            thresholds.forEach(function (threshold) {
                if (percent >= threshold && !reached[threshold]) {
                    reached[threshold] = true;
                    trackEvent('scroll_depth', {
                        percent_scrolled: threshold,
                    });
                }
            });
        }

        window.addEventListener(
            'scroll',
            function () {
                if (!ticking) {
                    window.requestAnimationFrame(function () {
                        checkScroll();
                        ticking = false;
                    });
                    ticking = true;
                }
            },
            { passive: true },
        );
    }

    function initContactSectionView() {
        var contact = document.getElementById('contact');
        if (!contact || typeof IntersectionObserver === 'undefined') {
            return;
        }

        var seen = false;
        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting && !seen) {
                        seen = true;
                        trackEvent('section_view', {
                            section_name: 'contact',
                        });
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.3 },
        );

        observer.observe(contact);
    }

    function initWechatWidgetTracking() {
        var closeBtn = document.getElementById('wechat-customer-close');
        if (!closeBtn) {
            return;
        }

        closeBtn.addEventListener('click', function () {
            trackEvent('widget_close', {
                widget_name: 'wechat_customer',
            });
        });
    }

    function initPageContext() {
        gtag('config', GA4_ID, {
            content_group: pageContext.content_group,
            page_category: pageContext.page_category,
            content_id: pageContext.content_id || undefined,
            blog_category: pageContext.blog_category || undefined,
        });

        trackEvent('page_context', {
            event_category: 'engagement',
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            initPageContext();
            initScrollDepth();
            initContactSectionView();
            initWechatWidgetTracking();
        });
    } else {
        initPageContext();
        initScrollDepth();
        initContactSectionView();
        initWechatWidgetTracking();
    }
})();
