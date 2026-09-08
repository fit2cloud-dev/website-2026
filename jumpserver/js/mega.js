/*!
 * JumpServer mega-nav 组件（精简版）
 * 原文件是从 HashiCorp 官网整包复制而来，2026-09-07 优化时移除了
 * 重复打包的 jQuery 2.1.1（约 241 KB），改用页面已加载的 jQuery 3.5.1。
 * 同时附带了一份 fit2cloud 自己写的"点击外部关闭"逻辑（原生 JS）。
 *
 * 依赖：jquery-3.5.1.min.js（页面已加载，位置在 mega.js 之前）
 * 依赖页面元素：#mega-nav-ctrl / #mega-nav-body-ct / #mega-nav-close
 */

//
// HashiCorp Mega Nav
// --------------------------------------------------

var HashiMegaNav = function() {
  var productClass = 'mega-nav-grid-item',
      productActiveClass = 'is-active',
      url = window.location.hostname,
      products = [
        'vagrant',
        'packer',
        'terraform',
        'vault',
        'nomad',
        'consul'
      ];

  for (var i = 0; i < products.length; i++) {
    if (url.indexOf(products[i]) !== -1) {
      $('.' + productClass + '-' + products[i]).addClass(productActiveClass);
    }
  }

  var $body = $('#mega-nav-body-ct');
  var $arrow = $('#mega-nav-ctrl');
  var $nav = $arrow.parent();
  var $close = $('#mega-nav-close');

  function matchesBreakpoint() {
    return window.matchMedia("(min-width: 980px)").matches;
  }

  function openNav() {
    if(matchesBreakpoint()) {
      $body.slideDown('fast');
      $nav.addClass('open');
    } else {
      $body.fadeIn('fast');
    }
  }

  function closeNav() {
    if(matchesBreakpoint()) {
      $body.slideUp('fast');
      $nav.removeClass('open');
    } else {
      $body.fadeOut('fast');
    }
  }

  function isNavOpen() {
    return $nav.hasClass('open');
  }

  $arrow.unbind().on('click', function(e) {
    e.preventDefault(); // Don't jump page to "#"

    if(isNavOpen()) {
      closeNav();
    } else {
      openNav();
    }
  });

  $close.unbind().on('click', function() {
    closeNav();
  });
}

// Handle document ready function.
// NOTE: jQuery 3.0+ no longer fires the "ready" event via .on("ready", ...).
// Must use .ready() or the ready shortcut $(fn) instead. Keeping the
// turbolinks:load handler for theoretical future use; static pages skip it.
$(document).ready(HashiMegaNav);
$(document).on("turbolinks:load", HashiMegaNav);
// HashiSidebar is the sidebar implementation for mobile websites. It
// appears at a configurable breakpoint in the CSS.
var HashiSidebar = function() {
  var $sidebar = $('.sidebar');
  var $toggle = $('.navbar-toggle');
  var $overlay = $('.sidebar-overlay');

  function sidebarActive() {
    return $sidebar.hasClass('open');
  }

  function hideSidebar() {
    if(sidebarActive()) {
      $sidebar.removeClass('open');
      $overlay.removeClass('active');
    }
  }

  // Hide the sidebar when the user clicks on the overlay. The overlay is
  // only "clickable" when it's active.
  $overlay.unbind().on('click', function(e){
    hideSidebar();
  });

  // Show the sidebar when the user clicks the hamburger menu.
  $toggle.unbind().on('click', function(e) {
    e.preventDefault(); // Don't jump page to "#"

    // Only activate the sidebar if it's not already active. Since these
    // are class selectors, it's possible that we are watching multiple
    // elements.
    if(!sidebarActive()) {
      $overlay.addClass('active');
      $sidebar.toggleClass('open');
    }
  });
}

// Handle document ready function (see note above re jQuery 3.0+ behavior).
$(document).ready(HashiSidebar);
$(document).on("turbolinks:load", HashiSidebar);
'use strict'

/**
 * Wrapper for segment's track function that will track multiple elements,
 * normalize parameters, and easily switch between tracking links or events.
 * @param  {String} selector - query selector, multi element compatible
 * @param  {Function} cb - optional function that should return params, and will receive the element as a parameter
 * @param  {Boolean} [link] - if true, tracks a link click
 */
function track(selector, cb, link) {
  each(document.querySelectorAll(selector), function(el) {
    var params = cb
    if (typeof cb === 'function') {
      params = cb(el)
    }
    var event = params.event
    delete params.event
    if (link) {
      // analytics.trackLink(el, event, params)
    } else {
      el.addEventListener('click', function() {
        // analytics.track(event, params)
      })
    }
  })
}

/**
 * Iterates through a NodeList, not built-in for all browsers.
 * (https://developer.mozilla.org/en-US/docs/Web/API/NodeList)
 * @param  {NodeList} list a NodeList instance
 * @param  {Function} cb a function to execute for each node
 */
function each(list, cb) {
  for (var i = 0; i < list.length; i++) {
    cb(list[i], i)
  }
}

// Expose as commonjs for module bundlers if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { track: track }
}
;

// ============================================================
// 已清理的「HashiCorp 整包复制」残留代码块（2026-09-07 优化）
// ------------------------------------------------------------
//   - objectFitImages + Siema 轮播（绑定 turbolinks:load）
//   - GreenSock GSAP 全集（绑定 turbolinks:load）
//   - hashicorp quick-nav 锚点生成（绑定 turbolinks:load）
// JumpServer 是纯静态站，无 Turbolinks，上述三个块永远不会被执行，
// 共释放 ~148 KB 原始（gzip 后约 -30 KB）。
// ============================================================


(function() {
    if (window.__fit2cloudMegaNavOutsideCloseBound) {
        return;
    }

    window.__fit2cloudMegaNavOutsideCloseBound = true;

    function closeMegaNav(nav) {
        if (!nav || !nav.classList.contains('open')) {
            return;
        }

        nav.classList.remove('open');

        var bodyContainer = nav.querySelector('.mega-nav-body-ct');
        if (bodyContainer) {
            bodyContainer.style.display = 'none';
        }

        var ctrl = nav.querySelector('.mega-nav-ctrl');
        if (ctrl) {
            ctrl.setAttribute('aria-expanded', 'false');
        }
    }

    document.addEventListener('click', function(event) {
        var openNavs = document.querySelectorAll('.mega-nav-sandbox .mega-nav.open');

        if (!openNavs.length) {
            return;
        }

        for (var i = 0; i < openNavs.length; i++) {
            var nav = openNavs[i];

            if (!nav.contains(event.target)) {
                closeMegaNav(nav);
            }
        }
    });
})();
