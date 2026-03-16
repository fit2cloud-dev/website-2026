(function () {
    // ==================== 1. 无缝滚动容器复制子元素逻辑 ====================
    const initHorizontalScroll = () => {
        // 获取滚动容器元素
        const horizontalWrapper = document.getElementById('horizontalWrapper');
        // 检查元素是否存在，避免报错
        if (!horizontalWrapper) return;
        // 复制一份子元素，用于无缝衔接（核心逻辑）
        const cloneChildren = horizontalWrapper.innerHTML;
        horizontalWrapper.innerHTML += cloneChildren;
    };

    // ==================== 2. IntersectionObserver渐显逻辑 ====================
    const initRevealAnimation = () => {
        // 配置IntersectionObserver选项
        const observerOptions = {
            threshold: 0.1, // 元素10%进入视口时触发
        };

        // 创建观察者实例
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // 只触发一次，避免重复监听
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // 获取所有.reveal元素并监听
        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach(el => observer.observe(el));
    };

    // ==================== 3. 客户轮播分栏+响应式适配逻辑 ====================
    const initCustomerCarousel = () => {
        const customersContainer = document.getElementById('f2c-scroll-row');
        // 检查容器是否存在，避免报错
        if (!customersContainer) return;

        // 1. 保存原始的customer-item列表（深拷贝，避免重复操作）
        const originalItems = Array.from(customersContainer.querySelectorAll('.columns'));
        // 无原始元素则终止执行
        if (originalItems.length === 0) return;

        // 2. 定义响应式分栏规则
        const getColumnCount = () => {
            if (window.innerWidth >= 992) return 3; // 大屏：3列
            if (window.innerWidth >= 768) return 2; // 中屏：2列
            return 1; // 小屏：1列
        };

        // 3. 核心分栏函数
        const renderColumns = () => {
            // 清空容器（重置状态）
            customersContainer.innerHTML = '';
            const columnCount = getColumnCount();
            // 设置网格列数
            customersContainer.style.gridTemplateColumns = `repeat(${columnCount}, 1fr)`;

            // 均分item到各列
            const itemsPerColumn = Math.ceil(originalItems.length / columnCount);
            const columns = [];

            // 创建滚动列容器
            for (let i = 0; i < columnCount; i++) {
                const column = document.createElement('div');
                column.className = `${i % 2 === 0 ? 'animate-scroll-up' : 'animate-scroll-down'}`; // 奇偶列区分
                columns.push(column);
                customersContainer.appendChild(column);
            }

            // 分配item到对应列
            originalItems.forEach((item, index) => {
                const columnIndex = Math.floor(index / itemsPerColumn);
                if (columnIndex < columnCount) {
                    columns[columnIndex].appendChild(item.cloneNode(true)); // 克隆避免DOM移动问题
                }
            });

            // 复制一份item到列末尾，实现无缝滚动
            columns.forEach(column => {
                const columnItems = Array.from(column.querySelectorAll('.columns'));
                const copyItems = columnItems.map(item => item.cloneNode(true));
                copyItems.forEach(copy => column.appendChild(copy));
            });
        };

        // 4. 初始化 + 窗口变化重新渲染（防抖优化，避免频繁触发）
        renderColumns();
        // 防抖处理resize事件，提升性能
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(renderColumns, 200);
        });
    };

    // ==================== 4. 页面加载完成后统一执行所有初始化逻辑 ====================
    const initAll = () => {
        initHorizontalScroll(); // 初始化无缝滚动容器
        initRevealAnimation(); // 初始化渐显动画
        initCustomerCarousel(); // 初始化客户轮播分栏
    };

    // 监听页面加载完成事件，执行所有初始化
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        initAll();
    } else {
        document.addEventListener('DOMContentLoaded', initAll);
    }
})();
