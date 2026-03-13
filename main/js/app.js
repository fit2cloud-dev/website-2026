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
})();
