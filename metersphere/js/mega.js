/* mega.js - 精简版：仅保留自定义代码
 * 原文件 10694 行，其中 99% 为嵌入式 jQuery 2.1.1 和 Turbolinks 库
 * index.html 已通过独立文件加载 jQuery 3.6.4，无需重复嵌入
 */

/* ============================================================
 * 1. Mega Nav - 飞致云旗下开源产品 右侧滑出面板
 * ============================================================ */
var HashiMegaNav = function() {
  var $body = $('#mega-nav-body-ct');
  var $arrow = $('#mega-nav-ctrl');
  var $nav = $arrow.parent();
  var $close = $('#mega-nav-panel-close');
  var $overlay = $('.mega-nav-overlay');
  var $tagline = $('#mega-nav-tagline-click');

  function openNav() {
    $body.show();
    $('body').addClass('mega-nav-no-scroll');
    setTimeout(function() {
      $nav.addClass('open');
    }, 10);
  }

  function closeNav() {
    $nav.removeClass('open');
    setTimeout(function() {
      if (!$nav.hasClass('open')) {
        $body.hide();
        $('body').removeClass('mega-nav-no-scroll');
      }
    }, 350);
  }

  function isNavOpen() {
    return $nav.hasClass('open');
  }

  $arrow.off('click').on('click', function(e) {
    e.preventDefault();
    if (isNavOpen()) {
      closeNav();
    } else {
      openNav();
    }
  });

  $close.off('click').on('click', function(e) {
    e.stopPropagation();
    closeNav();
  });

  $overlay.off('click').on('click', function(e) {
    e.stopPropagation();
    closeNav();
  });

  $tagline.off('click').on('click', function(e) {
    e.preventDefault();
    if (isNavOpen()) {
      closeNav();
    } else {
      openNav();
    }
  });
};

/* ============================================================
 * 2. Sidebar - 移动端侧边栏
 * ============================================================ */
var HashiSidebar = function() {
  var $sidebar = $('.sidebar');
  var $toggle = $('.navbar-toggle');
  var $overlay = $('.sidebar-overlay');

  function sidebarActive() {
    return $sidebar.hasClass('open');
  }

  function hideSidebar() {
    if (sidebarActive()) {
      $sidebar.removeClass('open');
      $overlay.removeClass('active');
    }
  }

  $overlay.off('click').on('click', function(e) {
    hideSidebar();
  });

  $toggle.off('click').on('click', function(e) {
    e.preventDefault();
    if (!sidebarActive()) {
      $overlay.addClass('active');
      $sidebar.toggleClass('open');
    }
  });
};

/* ============================================================
 * 3. 点击外部区域关闭 Mega Nav
 * ============================================================ */
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
    document.body.classList.remove('mega-nav-no-scroll');

    var bodyContainer = nav.querySelector('.mega-nav-body-ct');
    if (bodyContainer) {
      setTimeout(function() {
        if (!nav.classList.contains('open')) {
          bodyContainer.style.display = 'none';
        }
      }, 350);
    }

    var ctrl = nav.querySelector('.mega-nav-ctrl');
    if (ctrl) {
      ctrl.setAttribute('aria-expanded', 'false');
    }
  }

  document.addEventListener('click', function(event) {
    var openNavs = document.querySelectorAll('.mega-nav-sandbox .mega-nav.open');
    if (!openNavs.length) return;
    for (var i = 0; i < openNavs.length; i++) {
      if (!openNavs[i].contains(event.target)) {
        closeMegaNav(openNavs[i]);
      }
    }
  });
})();

/* ============================================================
 * 初始化
 * ============================================================ */
$(function() {
  HashiMegaNav();
  HashiSidebar();
});
