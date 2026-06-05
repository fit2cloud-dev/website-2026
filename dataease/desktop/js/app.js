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
 *     01.  Menu            *
 *     02.  Sticky Menu     *
 *     03.  Back to top     *
 ===========================*/

!(function ($) {
    'use strict';
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

    //Feather icon
    feather.replace();

    const initView = () => {
        const viewer = new Viewer($('#viewer')[0], {
            navbar: false,
            toolbar: false,
        });
        $(window).on('unload', () => {
            viewer.destroy();
        });
    };

    const initCount = () => {
        $.ajax({
            url: 'https://community.fit2cloud.com/installation-statistics?product=DataEaseDesktop&dateRange=AllTime',
            type: 'get',
            success: function (req) {
                $('#countUp').numberAnimate({
                    num: req,
                    speed: 1000,
                    symbol: ',',
                });
            },
        });
    };

    $(document).ready(() => {
        initView();
        initCount()
    });
    $('#wechat-customer-close').on('click', () => {
        $('#wechat-customer').hide();
    })   
})(jQuery);
