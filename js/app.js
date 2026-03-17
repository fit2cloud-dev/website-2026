(function () {
    // 二级导航
    const submenuLinks = document.querySelectorAll('.has-submenu a');

    submenuLinks.forEach(link => {
        link.addEventListener('click', function () {
            if (window.innerWidth < 992) {
                const parentElement = this.parentElement;
                const submenuElement = parentElement.querySelector('.submenu');

                if (parentElement.classList.contains('open')) {
                    submenuElement.classList.remove('open');
                    parentElement.classList.remove('open');
                } else {
                    submenuElement.classList.add('open');
                    parentElement.classList.add('open');
                }
            }
        });
    });
    // 获取元素并做存在性检查
    const closeBtn = document.getElementById('wechat-customer-close');
    const customerBox = document.getElementById('wechat-customer');
    // 确保元素存在后再绑定事件
    if (closeBtn && customerBox) {
        closeBtn.addEventListener('click', () => {
            customerBox.style.display = 'none';
        });
    }
})();
