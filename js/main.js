document.addEventListener('DOMContentLoaded', function() {
    // Прелоадер
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 500);
    }

    // Мобильное меню
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');
    const dropdownItems = document.querySelectorAll('.has-dropdown');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navList.classList.toggle('active');
            
            // Анимация гамбургер-меню
            const spans = this.querySelectorAll('span');
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Выпадающее меню на мобильных
    dropdownItems.forEach(item => {
        const link = item.querySelector('a');
        if (link) {
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    item.classList.toggle('active');
                }
            });
        }
    });

    // Слайдер на главной странице
    const heroSlider = {
        currentSlide: 0,
        slides: document.querySelectorAll('.slide'),
        interval: null,
        
        init() {
            if (this.slides.length === 0) return;
            
            // Кнопки навигации
            const prevButton = document.querySelector('.prev-slide');
            const nextButton = document.querySelector('.next-slide');
            
            if (prevButton) {
                prevButton.addEventListener('click', () => this.prevSlide());
            }
            if (nextButton) {
                nextButton.addEventListener('click', () => this.nextSlide());
            }
            
            // Автопереключение
            this.startAutoplay();
            
            // Остановка автопереключения при наведении
            const slider = document.querySelector('.hero-slider');
            if (slider) {
                slider.addEventListener('mouseenter', () => this.stopAutoplay());
                slider.addEventListener('mouseleave', () => this.startAutoplay());
            }
        },
        
        showSlide(index) {
            this.slides.forEach(slide => slide.classList.remove('active'));
            this.currentSlide = (index + this.slides.length) % this.slides.length;
            this.slides[this.currentSlide].classList.add('active');
        },
        
        nextSlide() {
            this.showSlide(this.currentSlide + 1);
        },
        
        prevSlide() {
            this.showSlide(this.currentSlide - 1);
        },
        
        startAutoplay() {
            this.interval = setInterval(() => this.nextSlide(), 5000);
        },
        
        stopAutoplay() {
            clearInterval(this.interval);
        }
    };
    
    heroSlider.init();

    // Форма бронирования
    const bookingForm = document.querySelector('.booking-container');
    if (bookingForm) {
        bookingForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Сбор данных формы
            const formData = new FormData(bookingForm);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });

            try {
                // Здесь будет отправка данных на сервер
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                showNotification('Запрос на бронирование отправлен! Мы свяжемся с вами в ближайшее время.');
                bookingForm.reset();
            } catch (error) {
                showNotification('Произошла ошибка. Пожалуйста, попробуйте позже.', 'error');
            }
        });
    }

    // Анимация появления элементов при прокрутке
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-item, .room-card, .offer-card').forEach(elem => {
        observer.observe(elem);
    });

    // Функция показа уведомлений
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Плавная прокрутка к якорям
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Переключатель языков
    const langButtons = document.querySelectorAll('.language-selector button');
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            langButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            // Здесь будет логика переключения языка
        });
    });

    // Обработка скролла для фиксированной шапки
    let lastScroll = 0;
    const header = document.querySelector('.main-header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        
        lastScroll = currentScroll;
    });
});