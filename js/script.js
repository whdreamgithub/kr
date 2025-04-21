// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化
    initFAQAccordion();
    initProductFilter();
    initContactForm();
    initInquiryForm();
});

// FAQ手风琴效果
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length === 0) return;
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // 切换当前FAQ项的活动状态
            item.classList.toggle('active');
            
            // 关闭其他FAQ项
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });
}

// 产品筛选功能
function initProductFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    if (filterButtons.length === 0 || productCards.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 移除所有按钮的活动状态
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // 为当前按钮添加活动状态
            button.classList.add('active');
            
            // 获取筛选类别
            const filterValue = button.getAttribute('data-filter');
            
            // 筛选产品卡片
            productCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// 联系表单提交
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 获取表单数据
        const formData = new FormData(contactForm);
        const formValues = Object.fromEntries(formData.entries());
        
        // 在这里你可以添加表单验证逻辑
        
        // 模拟表单提交
        alert('感谢您的留言！我们将尽快回复您。');
        contactForm.reset();
    });
}

// 询价表单提交
function initInquiryForm() {
    const inquiryForm = document.querySelector('.inquiry-form');
    
    if (!inquiryForm) return;
    
    inquiryForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 获取表单数据
        const formData = new FormData(inquiryForm);
        const formValues = Object.fromEntries(formData.entries());
        
        // 在这里你可以添加表单验证逻辑
        
        // 模拟表单提交
        alert('感谢您的询价！我们的销售团队将尽快与您联系。');
        inquiryForm.reset();
    });
}

// 平滑滚动到锚点
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
}); 