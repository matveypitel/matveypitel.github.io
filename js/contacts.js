document.addEventListener('DOMContentLoaded', function() {
    // Форма обратной связи
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Сбор данных формы
            const formData = new FormData(contactForm);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });

            try {
                // Имитация отправки данных на сервер
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                showNotification('Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.', 'success');
                contactForm.reset();
            } catch (error) {
                showNotification('Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте позже.', 'error');
            }
        });
    }

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

    // Маска для телефона
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let x = e.target.value.replace(/\D/g, '')
                .match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
            e.target.value = !x[2] ? x[1] : '+7 (' + x[2] + ') ' + (x[3] ? x[3] + '-' + x[4] : x[3]) + (x[5] ? '-' + x[5] : '');
        });
    }

    // Валидация email
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('input', function(e) {
            const email = e.target.value;
            const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            
            if (isValid) {
                this.classList.remove('error');
                this.classList.add('valid');
            } else {
                this.classList.remove('valid');
                this.classList.add('error');
            }
        });
    }

    // Анимация появления элементов при прокрутке
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '50px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Наблюдаем за элементами с анимацией
    document.querySelectorAll('.contact-card, .map-container, .contact-form, .social-link').forEach(elem => {
        elem.style.opacity = '0';
        elem.style.transform = 'translateY(20px)';
        observer.observe(elem);
    });

    // Обработка клика по социальным сетям
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Здесь можно добавить аналитику или другую логику
            console.log(`Clicked on ${this.querySelector('span').textContent}`);
        });
    });

    // Улучшение доступности для клавиатурной навигации
    document.querySelectorAll('a, button, input, select, textarea').forEach(elem => {
        elem.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--color-primary)';
            this.style.outlineOffset = '2px';
        });

        elem.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });

    // Предварительная загрузка карты
    const mapFrame = document.querySelector('.map-frame');
    if (mapFrame) {
        mapFrame.classList.add('loading');
        
        // Имитация загрузки карты
        setTimeout(() => {
            mapFrame.classList.remove('loading');
        }, 1500);
    }
});