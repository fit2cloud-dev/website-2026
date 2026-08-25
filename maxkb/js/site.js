(function () {
  'use strict';

  var openMenus = [];

  function byText(nodes, text) {
    return Array.prototype.slice.call(nodes).find(function (node) {
      return node.textContent.trim() === text;
    });
  }

  function closeMenus(except) {
    openMenus.forEach(function (entry) {
      if (entry.menu === except) return;
      entry.menu.hidden = true;
      entry.button.setAttribute('aria-expanded', 'false');
      var icon = entry.button.querySelector('svg');
      if (icon) icon.style.transform = '';
    });
  }

  function createLink(item, className) {
    var link = document.createElement('a');
    link.href = item.href;
    link.className = className;
    link.textContent = item.label;
    if (/^https?:/i.test(item.href)) {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
    return link;
  }

  function installDropdown(button, items) {
    if (!button || button.dataset.staticDropdown === 'ready') return;
    button.dataset.staticDropdown = 'ready';
    button.type = 'button';
    button.setAttribute('aria-haspopup', 'true');
    button.setAttribute('aria-expanded', 'false');

    var container = button.parentElement;
    var menu = document.createElement('div');
    menu.dataset.staticDropdownMenu = 'true';
    menu.className = 'absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50';
    menu.hidden = true;
    items.forEach(function (item) {
      menu.appendChild(createLink(item, 'block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary'));
    });
    container.appendChild(menu);
    openMenus.push({ button: button, menu: menu });

    button.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      var shouldOpen = menu.hidden;
      closeMenus(menu);
      menu.hidden = !shouldOpen;
      button.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
      var icon = button.querySelector('svg');
      if (icon) icon.style.transform = shouldOpen ? 'rotate(180deg)' : '';
    });
  }

  function installHeader() {
    var header = document.querySelector('header.sticky');
    if (!header) return;

    var navigationButtons = header.querySelectorAll('nav button');
    installDropdown(byText(navigationButtons, '帮助与支持'), [
      { label: '使用手册', href: 'https://maxkb.cn/docs/' },
      { label: '产品动态', href: '/blog' },
      { label: '论坛求助', href: 'https://bbs.fit2cloud.com/c/mk/11' },
      { label: '培训认证', href: 'https://edu.fit2cloud.com/' },
      { label: '技术白皮书', href: 'https://whitepaper.maxkb.cn/' },
      { label: '如何向团队介绍 MaxKB?', href: 'https://fit2cloud.com/maxkb/download/introduce-maxkb_2026.pdf' }
    ]);

    var mobileButton = Array.prototype.slice.call(header.querySelectorAll('button')).find(function (button) {
      return button.classList.contains('lg:hidden') && button.textContent.trim() === '';
    });
    var headerContainer = header.querySelector('.container-custom');
    if (!mobileButton || !headerContainer || headerContainer.querySelector('[data-static-mobile-menu]')) return;

    mobileButton.type = 'button';
    mobileButton.setAttribute('aria-label', '打开导航菜单');
    mobileButton.setAttribute('aria-expanded', 'false');
    var mobileMenu = document.createElement('div');
    mobileMenu.dataset.staticMobileMenu = 'true';
    mobileMenu.className = 'lg:hidden border-t border-gray-100 py-4';
    mobileMenu.hidden = true;
    mobileMenu.innerHTML = '<div class="flex flex-col space-y-4">' +
      '<a href="/" class="text-gray-700 hover:text-primary transition-colors">首页</a>' +
      '<a href="/price" class="relative inline-block text-gray-700 hover:text-primary transition-colors">价格<span class="absolute text-xs">🔥</span></a>' +
      '<a href="/appliance" class="text-gray-700 hover:text-primary transition-colors">一体机</a>' +
      '<a href="https://apps.fit2cloud.com/maxkb" target="_blank" rel="noopener noreferrer" class="text-gray-700 hover:text-primary transition-colors">工具市场</a>' +
      '<div><div class="text-gray-700 font-medium mb-2">帮助与支持</div><div class="pl-4 space-y-2">' +
      '<a href="https://maxkb.cn/docs/" target="_blank" rel="noopener noreferrer" class="block text-gray-600 hover:text-primary">使用手册</a>' +
      '<a href="/blog" class="block text-gray-600 hover:text-primary">产品动态</a>' +
      '<a href="https://bbs.fit2cloud.com/c/mk/11" target="_blank" rel="noopener noreferrer" class="block text-gray-600 hover:text-primary">论坛求助</a>' +
      '<a href="https://edu.fit2cloud.com/" target="_blank" rel="noopener noreferrer" class="block text-gray-600 hover:text-primary">培训认证</a>' +
      '<a href="https://whitepaper.maxkb.cn/" target="_blank" rel="noopener noreferrer" class="block text-gray-600 hover:text-primary">技术白皮书</a>' +
      '<a href="https://fit2cloud.com/maxkb/download/introduce-maxkb_2026.pdf" target="_blank" rel="noopener noreferrer" class="block text-gray-600 hover:text-primary">如何向团队介绍 MaxKB?</a></div></div>' +
      '<a href="https://space.bilibili.com/1538710292/lists/5307430" target="_blank" rel="noopener noreferrer" class="text-gray-700 hover:text-primary transition-colors">成功案例</a>' +
      '<a href="/contact" class="text-gray-700 hover:text-primary transition-colors">联系我们</a></div>';
    headerContainer.appendChild(mobileMenu);
    mobileButton.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      mobileMenu.hidden = !mobileMenu.hidden;
      mobileButton.setAttribute('aria-expanded', mobileMenu.hidden ? 'false' : 'true');
    });
  }

  function installProductMenu() {
    var topProductsButton = byText(document.querySelectorAll('button'), '了解飞致云旗下开源产品');
    if (!topProductsButton || topProductsButton.dataset.staticDropdown === 'ready') return;
    var products = [
      ['1Panel', '现代化、开源的 Linux 面板', 'https://1panel.cn/'],
      ['Cordys CRM', '新一代的开源 AI CRM 系统', 'https://cordys.cn/'],
      ['MaxKB', '企业级智能体平台', 'https://maxkb.cn/'],
      ['JumpServer', '广受欢迎的开源堡垒机', 'https://jumpserver.org/'],
      ['DataEase', '人人可用的开源 BI 工具', 'https://dataease.cn/'],
      ['SQLBot', '基于大模型的开源智能问数系统', 'https://sqlbot.org/'],
      ['MeterSphere', '新一代的开源持续测试工具', 'https://www.fit2cloud.com/metersphere/index.html'],
      ['Halo', '强大易用的开源建站工具', 'https://halo.run/']
    ];
    var topContainer = topProductsButton.parentElement;
    var topMenu = document.createElement('div');
    topMenu.dataset.staticProductMenu = 'true';
    topMenu.className = 'absolute right-0 top-full mt-1 w-80 bg-white border border-gray-200 rounded-lg shadow-xl py-2 z-[9999]';
    topMenu.hidden = true;
    products.forEach(function (product) {
      var link = document.createElement('a');
      link.href = product[2];
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.className = 'block px-4 py-3 text-gray-800 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0';
      link.innerHTML = '<div class="flex flex-col"><span class="font-semibold text-blue-600 mb-1"></span><span class="text-sm text-gray-600"></span></div>';
      link.querySelectorAll('span')[0].textContent = product[0];
      link.querySelectorAll('span')[1].textContent = product[1];
      topMenu.appendChild(link);
    });
    topContainer.appendChild(topMenu);
    openMenus.push({ button: topProductsButton, menu: topMenu });
    topProductsButton.dataset.staticDropdown = 'ready';
    topProductsButton.type = 'button';
    topProductsButton.setAttribute('aria-haspopup', 'true');
    topProductsButton.setAttribute('aria-expanded', 'false');
    topProductsButton.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      var shouldOpen = topMenu.hidden;
      closeMenus(topMenu);
      topMenu.hidden = !shouldOpen;
      topProductsButton.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
      var icon = topProductsButton.querySelector('svg');
      if (icon) icon.style.transform = shouldOpen ? 'rotate(180deg)' : '';
    });
  }

  function installClosableWidgets() {
    ['购买咨询', '预约专家咨询'].forEach(function (label) {
      Array.prototype.slice.call(document.querySelectorAll('span')).forEach(function (span) {
        if (span.textContent.trim() !== label) return;
        var header = span.parentElement;
        var button = header && header.querySelector('button');
        if (!button || button.dataset.staticClose === 'ready') return;
        button.dataset.staticClose = 'ready';
        button.type = 'button';
        button.setAttribute('aria-label', '关闭' + label);
        button.addEventListener('click', function () {
          var widget = button.closest('.fixed') || button.closest('.office-consultation-float');
          if (widget) widget.hidden = true;
        });
      });
    });
    document.querySelectorAll('.office-consultation-close').forEach(function (button) {
      if (button.dataset.staticClose === 'ready') return;
      button.dataset.staticClose = 'ready';
      button.type = 'button';
      button.setAttribute('aria-label', '关闭预约专家咨询');
      button.addEventListener('click', function () {
        var widget = button.closest('.office-consultation-float');
        if (widget) widget.hidden = true;
      });
    });
  }

  function installPriceActions() {
    var actions = {
      '申请试用': 'https://jsj.top/f/wQsdOJ',
      '立即使用': 'https://community.fit2cloud.com/#/products/maxkb/information'
    };
    document.querySelectorAll('[data-static-component="Price"] button').forEach(function (button) {
      var url = actions[button.textContent.trim()];
      if (!url) return;
      button.type = 'button';
      button.addEventListener('click', function () {
        window.open(url, '_blank', 'noopener,noreferrer');
      });
    });
  }

  function installScenarioTabs() {
    var root = document.querySelector('[data-static-scenarios]');
    if (!root) return;
    var buttons = root.querySelectorAll('[data-scenario-tab]');
    var panels = root.querySelectorAll('[data-scenario-panel]');
    buttons.forEach(function (button) {
      button.type = 'button';
      button.addEventListener('click', function () {
        var selected = button.dataset.scenarioTab;
        buttons.forEach(function (item) {
          var active = item.dataset.scenarioTab === selected;
          item.setAttribute('aria-selected', active ? 'true' : 'false');
          item.className = 'flex items-center space-x-3 px-6 py-4 rounded-xl font-medium transition-all ' +
            (active ? 'bg-primary text-white shadow-lg transform scale-105' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200');
        });
        panels.forEach(function (panel) {
          panel.hidden = panel.dataset.scenarioPanel !== selected;
        });
      });
    });
  }

  function installCompareTabs() {
    var root = document.querySelector('[data-static-component="ComparePage"]');
    if (!root) return;
    var buttons = root.querySelectorAll('[data-static-tab]');
    var panels = root.querySelectorAll('[data-static-tab-panel]');
    buttons.forEach(function (button) {
      button.type = 'button';
      button.addEventListener('click', function () {
        var selected = button.dataset.staticTab;
        buttons.forEach(function (item) {
          var active = item.dataset.staticTab === selected;
          item.setAttribute('aria-selected', active ? 'true' : 'false');
          item.className = 'px-5 py-4 text-sm font-semibold transition-colors ' +
            (active ? 'bg-primary text-white' : 'bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900');
        });
        panels.forEach(function (panel) {
          panel.hidden = panel.dataset.staticTabPanel !== selected;
        });
      });
    });
  }

  function installFileProtocolNavigation() {
    if (window.location.protocol !== 'file:') return;

    document.addEventListener('click', function (event) {
      if (event.defaultPrevented || event.button !== 0 || event.altKey) return;
      var link = event.target.closest && event.target.closest('a[href]');
      if (!link || link.hasAttribute('download')) return;

      var href = link.getAttribute('href');
      if (!href || href.charAt(0) !== '/' || href.indexOf('//') === 0) return;

      var publicUrl = new URL(href, 'https://www.maxkb.cn');
      var filePath = publicUrl.pathname === '/'
        ? 'index.html'
        : publicUrl.pathname.replace(/^\//, '').replace(/\/$/, '') + '/index.html';
      var fileUrl = new URL(filePath + publicUrl.search + publicUrl.hash, document.baseURI).href;
      event.preventDefault();
      if (link.target === '_blank' || event.metaKey || event.ctrlKey || event.shiftKey) {
        window.open(fileUrl, '_blank', 'noopener');
      } else {
        window.location.href = fileUrl;
      }
    });
  }

  installFileProtocolNavigation();
  installHeader();
  installProductMenu();
  installClosableWidgets();
  installPriceActions();
  installScenarioTabs();
  installCompareTabs();

  document.addEventListener('click', function () { closeMenus(); });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeMenus();
  });
})();
