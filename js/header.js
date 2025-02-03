document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const dropdowns = document.querySelectorAll('.has-dropdown');

    // Открытие/закрытие мобильного меню
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        mainNav.classList.toggle('active');
    });

    // Обработка выпадающих меню на мобильных
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                this.classList.toggle('active');
            }
        });
    });

    // Закрытие меню при ресайзе
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            mobileMenuBtn.classList.remove('active');
            mainNav.classList.remove('active');
            dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
        }
    });
});