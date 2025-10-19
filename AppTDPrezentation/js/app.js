// js/app.js - исправленная версия
class PresentationApp {
    constructor() {
        this.currentSlideIndex = 0;
        this.slides = [];
        this.score = 0;
        this.currentModule = 1;
        this.quizStats = {
            total: 0,
            correct: 0
        };
        
        this.init();
    }

    init() {
        console.log('🚀 Инициализация приложения...');
        
        setTimeout(() => {
            this.hideLoadingScreen();
            this.showApp();
            this.loadSlides();
            this.setupEventListeners();
            this.renderCurrentSlide();
        }, 500);
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 300);
    }

    showApp() {
        const app = document.getElementById('app');
        app.classList.remove('hidden');
        setTimeout(() => {
            app.classList.add('loaded');
        }, 100);
    }

    loadSlides() {
        // ИСПРАВЛЕНИЕ: Используем данные из data.js вместо создания своих
        this.slides = window.PresentationData?.slides || this.createDemoSlides();
        console.log('Загружено слайдов:', this.slides.length);
        document.getElementById('total-slides').textContent = this.slides.length;
        
        // Отладочная информация
        this.validateSlides();
    }

    validateSlides() {
        console.group('🔍 Проверка слайдов:');
        this.slides.forEach((slide, index) => {
            console.log(`Слайд ${index + 1}:`, {
                id: slide.id,
                type: slide.type,
                module: slide.module,
                title: slide.title?.substring(0, 30) + '...'
            });
        });
        console.groupEnd();
    }

    // УДАЛЯЕМ старый метод createSlidesFromGitHubHistory() 
    // и оставляем только демо-слайды для fallback

    createDemoSlides() {
        // Только для fallback если data.js не загрузился
        return [
            {
                id: 1,
                type: 'title',
                module: 1,
                title: 'Demo Presentation',
                subtitle: 'Fallback слайды',
                content: 'Данные не загрузились'
            }
        ];
    }

    // Остальные методы остаются без изменений...
    nextSlide() {
        if (this.currentSlideIndex < this.slides.length - 1) {
            this.currentSlideIndex++;
            this.renderCurrentSlide();
        } else {
            this.showCompletionModal();
        }
        console.log('Текущий слайд:', this.currentSlideIndex + 1, 'из', this.slides.length);
    }

    previousSlide() {
        if (this.currentSlideIndex > 0) {
            this.currentSlideIndex--;
            this.renderCurrentSlide();
        }
        console.log('Текущий слайд:', this.currentSlideIndex + 1, 'из', this.slides.length);
    }

    updateNavigation() {
        const isFirstSlide = this.currentSlideIndex === 0;
        const isLastSlide = this.currentSlideIndex === this.slides.length - 1;
        
        console.log('Навигация:', {
            currentIndex: this.currentSlideIndex,
            totalSlides: this.slides.length,
            isFirstSlide: isFirstSlide,
            isLastSlide: isLastSlide
        });

        document.getElementById('current-slide').textContent = this.currentSlideIndex + 1;
        document.getElementById('total-slides').textContent = this.slides.length;
        
        document.getElementById('prev-btn').disabled = isFirstSlide;
        document.getElementById('next-btn').disabled = isLastSlide;
        
        // Обновляем активный модуль
        const currentSlide = this.slides[this.currentSlideIndex];
        if (currentSlide) {
            document.querySelectorAll('.module-dot').forEach(dot => {
                dot.classList.remove('active');
                if (parseInt(dot.dataset.module) === currentSlide.module) {
                    dot.classList.add('active');
                }
            });
        }
    }

    // js/app.js - ДОБАВЛЯЕМ недостающий метод
setupEventListeners() {
    // Навигация
    document.getElementById('prev-btn').addEventListener('click', () => this.previousSlide());
    document.getElementById('next-btn').addEventListener('click', () => this.nextSlide());
    
    // Клавиатура
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') this.previousSlide();
        if (e.key === 'ArrowRight') this.nextSlide();
        if (e.key === 'Escape') this.closeModal();
    });

    // Модальное окно
    document.getElementById('continue-btn').addEventListener('click', () => {
        this.closeModal();
    });

    // Навигация по модулям
    document.querySelectorAll('.module-dot').forEach(dot => {
        dot.addEventListener('click', (e) => {
            const module = parseInt(e.target.dataset.module);
            this.goToModule(module);
        });
    });

    console.log('✅ Обработчики событий установлены');
}

closeModal() {
    document.getElementById('results-modal').classList.add('hidden');
}

goToModule(module) {
    // Находим первый слайд указанного модуля
    const moduleSlideIndex = this.slides.findIndex(slide => slide.module === module);
    if (moduleSlideIndex !== -1) {
        this.currentSlideIndex = moduleSlideIndex;
        this.renderCurrentSlide();
    }
}

    renderCurrentSlide() {
        const slide = this.slides[this.currentSlideIndex];
        if (!slide) {
            console.error('Слайд не найден:', this.currentSlideIndex);
            return;
        }

        const slideContainer = document.getElementById('slide-1');
        slideContainer.innerHTML = this.generateSlideHTML(slide);
        
        this.initializeSlide(slide);
        this.updateNavigation();
        this.updateProgress();
        
        console.log('🎯 Рендерим слайд:', {
            index: this.currentSlideIndex,
            id: slide.id, 
            type: slide.type,
            module: slide.module,
            title: slide.title
        });
    }

    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    generateSlideHTML(slide) {
        switch (slide.type) {
            case 'title':
                return this.generateTitleSlide(slide);
            case 'content':
                return this.generateContentSlide(slide);
            case 'quiz':
                return this.generateQuizSlide(slide);
            case 'minigame':
                return this.generateMinigameSlide(slide);
            case 'summary':
                return this.generateSummarySlide(slide);
            case 'transition':
                return this.generateTransitionSlide(slide);
            default:
                return `<div class="error-slide"><h2>Неизвестный тип слайда: ${slide.type}</h2></div>`;
        }
    }
    
    generateTransitionSlide(slide) {
        return `
            <div class="transition-slide">
                <h2>${slide.title}</h2>
                <h3>${slide.subtitle}</h3>
                <p class="slide-description">${slide.content}</p>
                <div class="transition-arrow">↓</div>
            </div>
        `;
    }
    generateTitleSlide(slide) {
        return `
            <div class="title-slide">
                <div class="module-badge">Модуль ${slide.module}</div>
                <h2>${slide.title}</h2>
                <h3>${slide.subtitle}</h3>
                <p class="slide-description">${slide.content}</p>
                <div class="start-animation">
                    <div class="pulse-dots">
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                    </div>
                </div>
            </div>
        `;
    }

    generateContentSlide(slide) {
        return `
            <div class="content-slide">
                <h2>${slide.title}</h2>
                <div class="slide-content">
                    ${slide.content}
                </div>
            </div>
        `;
    }

    generateQuizSlide(slide) {
        const answersHTML = slide.answers.map((answer, index) => `
            <button class="answer-btn" data-correct="${answer.correct}">
                <span class="answer-letter">${String.fromCharCode(65 + index)}</span>
                <span class="answer-text">${answer.text}</span>
            </button>
        `).join('');

        return `
            <div class="quiz-slide">
                <h2>${slide.title}</h2>
                <div class="question">${slide.question}</div>
                <div class="answers-grid">
                    ${answersHTML}
                </div>
                <div class="explanation hidden">
                    <strong>💡 Объяснение:</strong>
                    <p>${slide.explanation}</p>
                </div>
            </div>
        `;
    }

    generateMinigameSlide(slide) {
        if (slide.gameType === 'drag-drop') {
            return this.generateDragDropGame(slide);
        } else if (slide.gameType === 'match') {
            return this.generateMatchGame(slide);
        }
        
        return `<div>Тип игры не поддерживается: ${slide.gameType}</div>`;
    }

    generateDragDropGame(slide) {
        const componentsHTML = slide.components.map(comp => `
            <div class="component" draggable="true" data-value="${comp}">${comp}</div>
        `).join('');

        const slotsHTML = slide.slots.map((slot, index) => `
            <div class="slot" data-accepts="${slide.components[index]}" data-index="${index}">
                <div class="slot-label">${slot}</div>
                <div class="slot-content"></div>
            </div>
        `).join('');

        return `
            <div class="minigame-slide">
                <h2>${slide.title}</h2>
                <p>${slide.content}</p>
                <div class="game-area">
                    <div class="components-panel">
                        <h3>Элементы</h3>
                        <div class="components-list">
                            ${componentsHTML}
                        </div>
                    </div>
                    <div class="slots-panel">
                        <h3>Цели</h3>
                        <div class="slots-list">
                            ${slotsHTML}
                        </div>
                    </div>
                </div>
                <div class="game-controls">
                    <button class="check-btn" onclick="presentationApp.checkDragDropSolution()">Проверить</button>
                    <button class="reset-btn" onclick="presentationApp.resetGame()">Сбросить</button>
                </div>
                <div class="game-feedback hidden"></div>
            </div>
        `;
    }

    generateMatchGame(slide) {
        const leftHTML = slide.leftItems.map(item => `
            <div class="match-item left" data-value="${item}">${item}</div>
        `).join('');

        const rightHTML = slide.rightItems.map(item => `
            <div class="match-item right" data-value="${item}">${item}</div>
        `).join('');

        return `
            <div class="minigame-slide">
                <h2>${slide.title}</h2>
                <p>${slide.content}</p>
                <div class="match-game-area">
                    <div class="left-column">${leftHTML}</div>
                    <div class="right-column">${rightHTML}</div>
                </div>
                <div class="game-controls">
                    <button class="check-btn" onclick="presentationApp.checkMatchSolution()">Проверить</button>
                </div>
                <div class="game-feedback hidden"></div>
            </div>
        `;
    }

    generateSummarySlide(slide) {
        return `
            <div class="summary-slide">
                <h2>${slide.title}</h2>
                <p>${slide.content}</p>
                <div class="summary-stats">
                    <div class="stat">Правильных ответов: ${this.quizStats.correct}/${this.quizStats.total}</div>
                    <div class="stat">Общий счет: ${this.score}</div>
                    <div class="stat">Уровень: ${this.getUserLevel()}</div>
                </div>
            </div>
        `;
    }

   
    initializeQuiz(slide) {
        const answerButtons = document.querySelectorAll('.answer-btn');
        const explanation = document.querySelector('.explanation');
        
        answerButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const isCorrect = e.currentTarget.dataset.correct === 'true';
                
                // Обновляем статистику
                this.quizStats.total++;
                if (isCorrect) {
                    this.quizStats.correct++;
                    this.addScore(100);
                }
                
                // Показываем результат
                answerButtons.forEach(b => {
                    b.classList.remove('correct', 'incorrect');
                    b.disabled = true;
                    if (b.dataset.correct === 'true') {
                        b.classList.add('correct');
                    } else {
                        b.classList.add('incorrect');
                    }
                });
                
                // Показываем объяснение
                if (explanation) {
                    explanation.classList.remove('hidden');
                }

                // Проигрываем звук
                if (window.audioManager) {
                    window.audioManager.playSound(isCorrect ? 'correct' : 'wrong');
                }
            });
        });
    }

    // В app.js в методе initializeSlide добавляем:
initializeSlide(slide) {
    if (slide.type === 'quiz') {
        this.initializeQuiz(slide);
    } else if (slide.type === 'minigame') {
        this.initializeMinigame(slide);
    }
}

initializeMinigame(slide) {
    const slideElement = document.getElementById('slide-1');
    if (window.minigameManager) {
        window.minigameManager.initializeGame(slide.gameType, slide, slideElement);
    }
}

    setupDragDrop(slide) {
        const components = document.querySelectorAll('.component');
        const slots = document.querySelectorAll('.slot');

        components.forEach(comp => {
            comp.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', comp.dataset.value);
                comp.classList.add('dragging');
            });

            comp.addEventListener('dragend', () => {
                comp.classList.remove('dragging');
            });
        });

        slots.forEach(slot => {
            slot.addEventListener('dragover', (e) => {
                e.preventDefault();
                slot.classList.add('drag-over');
            });

            slot.addEventListener('dragleave', () => {
                slot.classList.remove('drag-over');
            });

            slot.addEventListener('drop', (e) => {
                e.preventDefault();
                slot.classList.remove('drag-over');
                
                const componentValue = e.dataTransfer.getData('text/plain');
                const component = document.querySelector(`[data-value="${componentValue}"]`);
                
                if (component) {
                    const slotContent = slot.querySelector('.slot-content');
                    slotContent.textContent = componentValue;
                    slot.dataset.filled = componentValue;
                    component.style.visibility = 'hidden';
                }
            });
        });
    }

    checkDragDropSolution() {
        const slots = document.querySelectorAll('.slot');
        let allCorrect = true;
        let correctCount = 0;

        slots.forEach(slot => {
            const filledValue = slot.dataset.filled;
            const expectedValue = slot.dataset.accepts;
            
            if (filledValue === expectedValue) {
                slot.classList.add('correct');
                correctCount++;
            } else {
                slot.classList.add('incorrect');
                allCorrect = false;
            }
        });

        const feedback = document.querySelector('.game-feedback');
        if (allCorrect) {
            feedback.innerHTML = '<div class="success">🎉 Отлично! Все элементы на своих местах! +150 очков</div>';
            this.addScore(150);
        } else {
            feedback.innerHTML = `<div class="warning">✅ Правильно размещено: ${correctCount}/${slots.length}. Попробуйте еще раз!</div>`;
        }
        feedback.classList.remove('hidden');
    }

    checkMatchSolution() {
        // Базовая реализация для match игры
        this.addScore(100);
        const feedback = document.querySelector('.game-feedback');
        feedback.innerHTML = '<div class="success">🎉 Отлично! Все сопоставления верны! +100 очков</div>';
        feedback.classList.remove('hidden');
    }

    resetGame() {
        const components = document.querySelectorAll('.component');
        const slots = document.querySelectorAll('.slot');
        const feedback = document.querySelector('.game-feedback');
        
        components.forEach(comp => {
            comp.style.visibility = 'visible';
        });
        
        slots.forEach(slot => {
            slot.classList.remove('correct', 'incorrect', 'drag-over');
            const content = slot.querySelector('.slot-content');
            if (content) content.textContent = '';
            delete slot.dataset.filled;
        });
        
        if (feedback) {
            feedback.classList.add('hidden');
        }
    }

    addScore(points) {
        this.score += points;
        document.getElementById('score').textContent = this.score;
        console.log(`➕ Добавлено ${points} очков. Общий счет: ${this.score}`);
    }

    getUserLevel() {
        if (this.score >= 500) return 'Senior';
        if (this.score >= 200) return 'Middle';
        return 'Junior';
    }



    showCompletionModal() {
        document.getElementById('correct-answers').textContent = 
            `${this.quizStats.correct}/${this.quizStats.total}`;
        document.getElementById('points-earned').textContent = this.score;
        document.getElementById('current-level').textContent = this.getUserLevel();
        document.getElementById('results-modal').classList.remove('hidden');
    }

    // js/app.js - исправляем логику навигации


    getModuleName(moduleNumber) {
        const moduleNames = {
            1: 'Архитектура',
            2: 'Бэкенд', 
            3: 'PyGame клиент',
            4: 'Интеграция',
            5: 'Деплой',
            6: 'Оптимизация'
        };
        return moduleNames[moduleNumber] || `Модуль ${moduleNumber}`;
    }

    updateProgress() {
        const progress = ((this.currentSlideIndex + 1) / this.slides.length) * 100;
        document.getElementById('progress-fill').style.width = `${progress}%`;
        
        // Обновляем активный модуль
        const currentSlide = this.slides[this.currentSlideIndex];
        if (currentSlide) {
            document.querySelectorAll('.module-dot').forEach(dot => {
                dot.classList.remove('active');
                if (parseInt(dot.dataset.module) === currentSlide.module) {
                    dot.classList.add('active');
                }
            });
        }
    }


    // Добавляем в app.js поддержку timeline игры
    generateTimelineGame(slide) {
        const shuffledItems = this.shuffleArray([...slide.items]);
        const itemsHTML = shuffledItems.map(item => `
            <div class="timeline-item" draggable="true" data-value="${item}">${item}</div>
        `).join('');

        const slotsHTML = slide.items.map((_, index) => `
            <div class="timeline-slot" data-index="${index}">
                <div class="slot-number">${index + 1}</div>
                <div class="slot-content"></div>
            </div>
        `).join('');

        return `
            <div class="minigame-slide">
                <h2>${slide.title}</h2>
                <p>${slide.content}</p>
                <div class="timeline-game-area">
                    <div class="timeline-items">
                        ${itemsHTML}
                    </div>
                    <div class="timeline-slots">
                        ${slotsHTML}
                    </div>
                </div>
                <div class="game-controls">
                    <button class="check-btn" onclick="presentationApp.checkTimelineSolution()">Проверить</button>
                    <button class="reset-btn" onclick="presentationApp.resetGame()">Сбросить</button>
                </div>
                <div class="game-feedback hidden"></div>
            </div>
        `;
    }

// И метод для проверки timeline
    checkTimelineSolution() {
        const slots = document.querySelectorAll('.timeline-slot');
        const correctOrder = this.slides[this.currentSlideIndex].items;
        let allCorrect = true;

        slots.forEach((slot, index) => {
            const content = slot.querySelector('.slot-content').textContent;
            if (content === correctOrder[index]) {
                slot.classList.add('correct');
            } else {
                slot.classList.add('incorrect');
                allCorrect = false;
            }
        });

        const feedback = document.querySelector('.game-feedback');
        if (allCorrect) {
            feedback.innerHTML = '<div class="success">🎉 Отлично! Правильная последовательность! +120 очков</div>';
            this.addScore(120);
        } else {
            feedback.innerHTML = '<div class="warning">❌ Неправильный порядок. Попробуйте еще раз!</div>';
        }
        feedback.classList.remove('hidden');
    }
}

// Запуск приложения
document.addEventListener('DOMContentLoaded', () => {
    window.presentationApp = new PresentationApp();
});