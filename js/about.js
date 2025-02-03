document.addEventListener('DOMContentLoaded', function() {
    // Анимация появления элементов при прокрутке
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '50px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Наблюдаем за элементами с анимацией
    document.querySelectorAll('.mission-card, .team-member, .achievement').forEach(elem => {
        observer.observe(elem);
    });

    // Галерея изображений
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        // Добавляем состояние загрузки
        item.classList.add('loading');
        
        // Обработка загрузки изображений
        const img = item.querySelector('img');
        if (img) {
            img.onload = function() {
                item.classList.remove('loading');
            };
            
            img.onerror = function() {
                item.classList.remove('loading');
                item.classList.add('error');
            };
        }

        // Обработка клика по изображению для просмотра
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            openLightbox(imgSrc);
        });
    });

    // Создание и управление лайтбоксом
    function openLightbox(imgSrc) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <button class="lightbox-close">&times;</button>
                <img src="${imgSrc}" alt="Увеличенное изображение">
            </div>
        `;
        
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        
        // Анимация появления
        setTimeout(() => lightbox.classList.add('active'), 10);
        
        // Обработчики закрытия
        const closeBtn = lightbox.querySelector('.lightbox-close');
        closeBtn.addEventListener('click', closeLightbox);
        
        lightbox.addEventListener('click', function(e) {
            if (e.target === this) {
                closeLightbox();
            }
        });
    }

    function closeLightbox() {
        const lightbox = document.querySelector('.lightbox');
        if (lightbox) {
            lightbox.classList.remove('active');
            setTimeout(() => {
                lightbox.remove();
                document.body.style.overflow = '';
            }, 300);
        }
    }

    // Анимация счетчиков достижений
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        
        function step(timestamp) {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const current = Math.floor(progress * (end - start) + start);
            obj.textContent = current;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        }
        
        window.requestAnimationFrame(step);
    }

    // Применяем анимацию к числовым значениям
    const achievementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numberElements = entry.target.querySelectorAll('[data-value]');
                numberElements.forEach(elem => {
                    const endValue = parseInt(elem.getAttribute('data-value'));
                    animateValue(elem, 0, endValue, 2000);
                });
                achievementObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.achievements-section').forEach(section => {
        achievementObserver.observe(section);
    });
});