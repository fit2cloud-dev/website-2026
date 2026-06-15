/* Template Name: Landrick - Saas & Software Landing Page Template
   Author: Shreethemes
   E-mail: shreethemes@gmail.com
   Created: August 2019
   Version: 2.1
   Updated: March 2020
   File Description: Main JS file of the template
*/

/****************************/
/*         INDEX            */
/*===========================
 *     01.  Loader          *
 *     02.  Menu            *
 *     03.  Sticky Menu     *
 *     03.  Back to top     *
 ===========================*/

!(function ($) {
    'use strict';
    // Loader
    $(window).on('load', function () {
        $('#status').fadeOut();
        $('#preloader').delay(350).fadeOut('slow');
        $('body').delay(350).css({
            overflow: 'visible',
        });
    });

    // Menu
    $('.navbar-toggle').on('click', function (event) {
        $(this).toggleClass('open');
        $('#navigation').slideToggle(400);
    });

    $('.navigation-menu>li').slice(-1).addClass('last-elements');

    $('.menu-arrow,.submenu-arrow').on('click', function (e) {
        if ($(window).width() < 992) {
            e.preventDefault();
            $(this).parent('li').toggleClass('open').find('.submenu:first').toggleClass('open');
        }
    });

    $('.navigation-menu a').each(function () {
        if (this.href == window.location.href) {
            $(this).parent().addClass('active');
            $(this).parent().parent().parent().addClass('active');
            $(this).parent().parent().parent().parent().parent().addClass('active');
        }
    });

    // Clickable Menu
    $('.has-submenu a').click(function () {
        if (window.innerWidth < 992) {
            if ($(this).parent().hasClass('open')) {
                $(this).siblings('.submenu').removeClass('open');
                $(this).parent().removeClass('open');
            } else {
                $(this).siblings('.submenu').addClass('open');
                $(this).parent().addClass('open');
            }
        }
    });

    $('.mouse-down').on('click', function (event) {
        var $anchor = $(this);
        $('html, body')
            .stop()
            .animate(
                {
                    scrollTop: $($anchor.attr('href')).offset().top - 72,
                },
                1500,
                'easeInOutExpo',
            );
        event.preventDefault();
    });

    //Sticky
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();

        if (scroll >= 50) {
            $('.sticky').addClass('nav-sticky');
        } else {
            $('.sticky').removeClass('nav-sticky');
        }
    });

    // Back to top
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn();
        } else {
            $('.back-to-top').fadeOut();
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 3000);
        return false;
    });

    // 电梯
    $(window).scroll(function () {
        var $scroll = $(document).scrollTop();
        // 拖动滚轮，点亮对应的楼层标签
        $('.elevator').each(function (i, ele) {
            var $stepTop = $(ele).offset().top - 500;
            // 楼层的top大于滚动条的距离
            if ($scroll >= $stepTop) {
                $('#elevator .sidebar-nav li').eq(i).addClass('active').siblings().removeClass('active');
            }
            if (i === 0 && $scroll < $stepTop) {
                $('#elevator .sidebar-nav li').eq(i).removeClass('active');
            }
        });
    });

    // // 获取每个楼梯的offset().top，点击楼层让对应的内容模块移动到对应的位置
    let $stepItem = $('#elevator .sidebar-nav li');
    $stepItem.on('click', function () {
        $(this).addClass('active').siblings('li').removeClass('active');
        var $stepTop = $($(this).children().attr('href')).offset().top - 100;
        // 获取每个楼梯的offsetTop值
        $('html,body').animate({
            scrollTop: $stepTop,
        });
    });

    //Tooltip
    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });
    //Popover
    $(function () {
        $('[data-toggle="popover"]').popover();
    });
    //Feather icon
    feather.replace();

    $('#wechat-customer-close').on('click', () => {
        $('#wechat-customer').hide();
    });

    (function loadGa4Events() {
        var scripts = document.getElementsByTagName('script');
        for (var i = scripts.length - 1; i >= 0; i--) {
            var src = scripts[i].src;
            if (src && src.indexOf('app.js') !== -1) {
                var ga4Src = src.replace(/app\.js(?:\?.*)?$/, 'ga4-events.js');
                var ga4Script = document.createElement('script');
                ga4Script.src = ga4Src;
                ga4Script.async = true;
                document.body.appendChild(ga4Script);
                break;
            }
        }
    })();
})(jQuery);
