// Инициализация презентации
document.addEventListener('DOMContentLoaded', function() {
    const slideContainer = document.getElementById('slideContainer');
    const currentSlideElement = document.getElementById('current-slide');
    const totalSlidesElement = document.getElementById('total-slides');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const sliderThumb = document.getElementById('sliderThumb');
    const sliderTrack = document.querySelector('.slider-track');
    const pageContainer = document.querySelector('.page-container');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Установка общего количества слайдов
    totalSlidesElement.textContent = totalSlides;
    
    // Заполнение слайдов
    slides.forEach((slide, index) => {
        const slideElement = document.createElement('div');
        slideElement.className = `slide ${index === 0 ? 'active' : ''}`;
        slideElement.innerHTML = `
            <h2 class="slide-title">${slide.title}</h2>
            <div class="slide-content">
                ${slide.content}
            </div>
        `;
        slideContainer.appendChild(slideElement);
    });
    
    // Создаем подсказку прокрутки
    const scrollHint = document.createElement('div');
    scrollHint.className = 'scroll-hint';
    scrollHint.innerHTML = '<span>⬇️</span> Прокрутите вниз';
    document.querySelector('.page-container').appendChild(scrollHint);
    
    // Обновление позиции слайдера
    function updateSliderPosition() {
        const trackHeight = sliderTrack.offsetHeight - sliderThumb.offsetHeight;
        const position = (currentSlide / (totalSlides - 1)) * trackHeight;
        sliderThumb.style.top = `${position}px`;
    }
    
    // Переход к слайду по клику на слайдер
    function setupSliderClick() {
        sliderTrack.addEventListener('click', (e) => {
            const trackRect = sliderTrack.getBoundingClientRect();
            const clickPosition = e.clientY - trackRect.top;
            const trackHeight = trackRect.height - sliderThumb.offsetHeight;
            const slideIndex = Math.round((clickPosition / trackHeight) * (totalSlides - 1));
            goToSlide(slideIndex);
        });
    }
    
    // Перетаскивание слайдера
    function setupSliderDrag() {
        let isDragging = false;
        
        sliderThumb.addEventListener('mousedown', (e) => {
            isDragging = true;
            e.preventDefault();
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            const trackRect = sliderTrack.getBoundingClientRect();
            let position = e.clientY - trackRect.top - sliderThumb.offsetHeight / 2;
            const trackHeight = trackRect.height - sliderThumb.offsetHeight;
            
            // Ограничиваем позицию в пределах трека
            position = Math.max(0, Math.min(position, trackHeight));
            
            const slideIndex = Math.round((position / trackHeight) * (totalSlides - 1));
            goToSlide(slideIndex);
        });
        
        document.addEventListener('mouseup', () => {
            isDragging = false;
        });
        
        // Touch события для мобильных устройств
        sliderThumb.addEventListener('touchstart', (e) => {
            isDragging = true;
            e.preventDefault();
        });
        
        document.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            
            const trackRect = sliderTrack.getBoundingClientRect();
            let position = e.touches[0].clientY - trackRect.top - sliderThumb.offsetHeight / 2;
            const trackHeight = trackRect.height - sliderThumb.offsetHeight;
            
            position = Math.max(0, Math.min(position, trackHeight));
            
            const slideIndex = Math.round((position / trackHeight) * (totalSlides - 1));
            goToSlide(slideIndex);
        });
        
        document.addEventListener('touchend', () => {
            isDragging = false;
        });
    }
    
    // Проверка необходимости прокрутки
    function checkScrollNeeded() {
        const pageHeight = document.documentElement.scrollHeight;
        const viewportHeight = window.innerHeight;
        const isScrollNeeded = pageHeight > viewportHeight + 100;
        
        if (isScrollNeeded) {
            scrollHint.style.display = 'flex';
        } else {
            scrollHint.style.display = 'none';
        }
    }
    
    // Обновление отображения текущего слайда
    function updateSlideDisplay() {
        // Обновляем номер текущего слайда
        currentSlideElement.textContent = currentSlide + 1;
        
        // Показываем/скрываем кнопки навигации
        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide === totalSlides - 1;
        
        // Обновляем активный слайд
        document.querySelectorAll('.slide').forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });
        
        // Обновляем позицию слайдера
        updateSliderPosition();
        
        // Прокручиваем к началу страницы при смене слайда
        pageContainer.scrollTop = 0;
        
        // Проверяем необходимость прокрутки после отрисовки
        setTimeout(checkScrollNeeded, 100);
    }
    
    // Переключение между слайдами
    function goToSlide(index) {
        if (index >= 0 && index < totalSlides) {
            currentSlide = index;
            updateSlideDisplay();
        }
    }
    
    // Обработчики событий
    prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
    
    // Обработка клавиатуры
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            goToSlide(currentSlide - 1);
        } else if (e.key === 'ArrowRight') {
            goToSlide(currentSlide + 1);
        }
    });
    
    // Скрытие подсказки при прокрутке
    pageContainer.addEventListener('scroll', () => {
        if (pageContainer.scrollTop > 100) {
            scrollHint.style.opacity = '0';
            setTimeout(() => {
                scrollHint.style.display = 'none';
            }, 300);
        }
    });
    
    // Инициализация
    updateSlideDisplay();
    setupSliderClick();
    setupSliderDrag();
    
    // Адаптация к изменению размера окна
    window.addEventListener('resize', () => {
        updateSliderPosition();
        setTimeout(checkScrollNeeded, 100);
    });
    
    // Проверяем прокрутку при загрузке
    window.addEventListener('load', checkScrollNeeded);
});