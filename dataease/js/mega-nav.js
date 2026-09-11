/* DataEase 官网 - 顶栏「飞致云旗下开源产品」下拉（mega nav）
 *
 * 从原 js/mega.js 中提取，只保留该下拉所需的逻辑。
 * 原 mega.js 实际是 jQuery 副本 + Turbolinks + HashiMegaNav + HashiSidebar
 * + 动画初始化 + inner-quicknav 的打包，其中仅 HashiMegaNav 与
 * 「点击外部关闭」为站点实际所需，其余均无引用（且 Turbolinks 体积 430KB）。
 */
(function ($) {
    'use strict';

    function megaNav() {
        var $body = $('#mega-nav-body-ct');
        var $ctrl = $('#mega-nav-ctrl');
        var $nav = $ctrl.parent();

        if (!$body.length || !$ctrl.length) {
            return;
        }

        // 桌面端为下拉面板，小屏为全屏浮层，两者动画方式不同
        function isDesktop() {
            return window.matchMedia('(min-width: 980px)').matches;
        }

        function openNav() {
            $nav.addClass('open');
            $ctrl.attr('aria-expanded', 'true');
            if (isDesktop()) {
                $body.slideDown('fast');
            } else {
                $body.fadeIn('fast');
            }
        }

        function closeNav() {
            $nav.removeClass('open');
            $ctrl.attr('aria-expanded', 'false');
            if (isDesktop()) {
                $body.slideUp('fast');
            } else {
                $body.fadeOut('fast');
            }
        }

        $ctrl.off('click.megaNav').on('click.megaNav', function (e) {
            e.preventDefault();
            if ($nav.hasClass('open')) {
                closeNav();
            } else {
                openNav();
            }
        });
    }

    // 点击面板外部收起
    function outsideClose() {
        if (window.__deMegaNavOutsideCloseBound) {
            return;
        }
        window.__deMegaNavOutsideCloseBound = true;

        document.addEventListener('click', function (event) {
            var openNavs = document.querySelectorAll('.mega-nav-sandbox .mega-nav.open');
            if (!openNavs.length) {
                return;
            }
            for (var i = 0; i < openNavs.length; i++) {
                var nav = openNavs[i];
                if (!nav.contains(event.target)) {
                    nav.classList.remove('open');
                    var body = nav.querySelector('.mega-nav-body-ct');
                    if (body) {
                        body.style.display = 'none';
                    }
                    var ctrl = nav.querySelector('.mega-nav-ctrl');
                    if (ctrl) {
                        ctrl.setAttribute('aria-expanded', 'false');
                    }
                }
            }
        });
    }

    $(megaNav);
    outsideClose();
})(jQuery);
