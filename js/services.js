document.addEventListener('DOMContentLoaded', function() {
    // Обработка модальных окон
    const modalButtons = document.querySelectorAll('[data-modal]');
    const modals = document.querySelectorAll('.modal');
    
    modalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            openModal(modal);
        });
    });

    // Закрытие модальных окон
    modals.forEach(modal => {
        const closeButton = modal.querySelector('.modal-close');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                closeModal(modal);
            });
        }

        // Закрытие по клику вне модального окна
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    // Функция открытия модального окна
    function openModal(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Функция закрытия модального окна
    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Обработка форм
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Сбор данных формы
            const formData = new FormData(form);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });

            // Здесь будет отправка данных на сервер
            try {
                // Имитация отправки данных
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Показ уведомления об успехе
                showNotification('Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.');
                
                // Очистка формы
                form.reset();
            } catch (error) {
                showNotification('Произошла ошибка. Пожалуйста, попробуйте позже.', 'error');
            }
        });
    });

    // Функция показа уведомлений
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Анимация появления
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Автоматическое скрытие
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
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

    document.querySelectorAll('.service-card, .service-item').forEach(elem => {
        observer.observe(elem);
    });

    // Маска для телефона
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let x = e.target.value.replace(/\D/g, '')
                .match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
            e.target.value = !x[2] ? x[1] : '+7 (' + x[2] + ') ' + (x[3] ? x[3] + '-' + x[4] : x[3]) + (x[5] ? '-' + x[5] : '');
        });
    });
});