document.addEventListener('DOMContentLoaded', function() {
    // Модальное окно бронирования
    const bookingModal = document.querySelector('.booking-modal');
    const bookingBtns = document.querySelectorAll('.book-room-btn');
    const modalClose = document.querySelector('.modal-close');

    // Открытие модального окна
    bookingBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const roomType = this.closest('.room-card').querySelector('h2').textContent;
            document.querySelector('.booking-modal h3').textContent = `Бронирование: ${roomType}`;
            bookingModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Закрытие модального окна
    modalClose.addEventListener('click', function() {
        bookingModal.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Закрытие по клику вне модального окна
    window.addEventListener('click', function(e) {
        if (e.target === bookingModal) {
            bookingModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Обработка формы бронирования
    const bookingForm = document.getElementById('bookingForm');
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
                // Имитация отправки данных
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                showNotification('Бронирование успешно отправлено! Мы свяжемся с вами для подтверждения.', 'success');
                bookingForm.reset();
                bookingModal.classList.remove('active');
                document.body.style.overflow = '';
            } catch (error) {
                showNotification('Произошла ошибка при бронировании. Пожалуйста, попробуйте позже.', 'error');
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

    // Валидация формы
    const inputs = bookingForm.querySelectorAll('input[required], select[required]');
    inputs.forEach(input => {
        // Добавляем обработчик для проверки при потере фокуса
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.classList.add('error');
            } else {
                this.classList.remove('error');
            }
        });

        // Убираем класс ошибки при начале ввода
        input.addEventListener('input', function() {
            this.classList.remove('error');
        });
    });

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
        emailInput.addEventListener('input', function() {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(this.value)) {
                this.classList.add('error');
            } else {
                this.classList.remove('error');
            }
        });
    }

    // Проверка дат
    const checkInInput = document.getElementById('checkIn');
    const checkOutInput = document.getElementById('checkOut');

    if (checkInInput && checkOutInput) {
        // Устанавливаем минимальную дату заезда (сегодня)
        const today = new Date().toISOString().split('T')[0];
        checkInInput.min = today;

        checkInInput.addEventListener('change', function() {
            // Устанавливаем минимальную дату выезда (дата заезда + 1 день)
            const nextDay = new Date(this.value);
            nextDay.setDate(nextDay.getDate() + 1);
            checkOutInput.min = nextDay.toISOString().split('T')[0];
            
            // Если дата выезда меньше новой минимальной, очищаем поле
            if (checkOutInput.value && new Date(checkOutInput.value) <= new Date(this.value)) {
                checkOutInput.value = '';
            }
        });
    }
});