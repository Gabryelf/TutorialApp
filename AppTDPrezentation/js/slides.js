// js/slides.js
class SlideManager {
    constructor() {
        this.slidesData = [];
        this.currentSlideIndex = 0;
    }

    initialize(slidesData) {
        this.slidesData = slidesData;
        this.renderSlide(0);
    }

    renderSlide(index) {
        this.currentSlideIndex = index;
        const slide = this.slidesData[index];
        const slideContainer = document.getElementById('slide-1');
        
        if (!slide) return;

        slideContainer.innerHTML = this.generateSlideContent(slide);
        this.initializeSlideInteractions(slide);
        
        this.updateNavigation();
        this.updateProgressBar();
    }

    generateSlideContent(slide) {
        const baseSlide = `
            <div class="slide-content" data-slide-type="${slide.type}">
                ${this.generateSlideHeader(slide)}
                ${this.generateSlideBody(slide)}
            </div>
        `;
        return baseSlide;
    }

    generateSlideHeader(slide) {
        return `
            <div class="slide-header">
                <div class="slide-badge">Слайд ${slide.id}</div>
                <h2 class="slide-title">${slide.title}</h2>
            </div>
        `;
    }

    generateSlideBody(slide) {
        switch (slide.type) {
            case 'content':
                return this.generateContentBody(slide);
            case 'quiz':
                return this.generateQuizBody(slide);
            case 'minigame':
                return this.generateMinigameBody(slide);
            case 'demo':
                return this.generateDemoBody(slide);
            case 'summary':
                return this.generateSummaryBody(slide);
            default:
                return '<div>Неизвестный тип слайда</div>';
        }
    }

    generateContentBody(slide) {
        return `
            <div class="slide-body">
                <div class="content-wrapper">
                    ${slide.content}
                </div>
                ${slide.tip ? this.generateTip(slide.tip) : ''}
            </div>
        `;
    }

    generateQuizBody(slide) {
        const answersHTML = slide.answers.map((answer, index) => `
            <div class="quiz-answer" data-correct="${answer.correct}">
                <div class="answer-selector">
                    <div class="answer-radio"></div>
                </div>
                <div class="answer-content">
                    <div class="answer-text">${answer.text}</div>
                </div>
            </div>
        `).join('');

        return `
            <div class="slide-body">
                <div class="quiz-wrapper">
                    <div class="question-container">
                        <h3 class="question">${slide.question}</h3>
                    </div>
                    <div class="answers-container">
                        ${answersHTML}
                    </div>
                    <div class="quiz-feedback hidden">
                        <div class="feedback-icon"></div>
                        <div class="feedback-text">${slide.explanation}</div>
                    </div>
                </div>
            </div>
        `;
    }

    generateMinigameBody(slide) {
        let gameHTML = '';
        
        switch (slide.gameType) {
            case 'drag-drop':
                gameHTML = this.generateDragDropGame(slide);
                break;
            case 'timeline':
                gameHTML = this.generateTimelineGame(slide);
                break;
            case 'find-bug':
                gameHTML = this.generateFindBugGame(slide);
                break;
            case 'match':
                gameHTML = this.generateMatchGame(slide);
                break;
        }

        return `
            <div class="slide-body">
                <div class="minigame-wrapper">
                    ${gameHTML}
                    <div class="game-controls">
                        <button class="game-btn check-btn">Проверить</button>
                        <button class="game-btn reset-btn">Начать заново</button>
                    </div>
                    <div class="game-feedback hidden"></div>
                </div>
            </div>
        `;
    }

    generateDragDropGame(slide) {
        const componentsHTML = slide.components.map(component => `
            <div class="game-component" draggable="true">${component}</div>
        `).join('');

        const slotsHTML = slide.slots.map(slot => `
            <div class="game-slot" data-accepts="${slot}">
                <div class="slot-label">${slot}</div>
            </div>
        `).join('');

        return `
            <div class="drag-drop-game">
                <div class="game-instructions">
                    <p>Перетащите компоненты в соответствующие слоты архитектуры</p>
                </div>
                <div class="game-area">
                    <div class="components-panel">
                        <h4>Компоненты</h4>
                        <div class="components-list">
                            ${componentsHTML}
                        </div>
                    </div>
                    <div class="slots-panel">
                        <h4>Архитектура</h4>
                        <div class="slots-container">
                            ${slotsHTML}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    generateTimelineGame(slide) {
        const shuffledItems = this.shuffleArray([...slide.items]);
        const itemsHTML = shuffledItems.map(item => `
            <div class="timeline-item" draggable="true">${item}</div>
        `).join('');

        const slotsHTML = slide.items.map((_, index) => `
            <div class="timeline-slot" data-index="${index}">
                <div class="slot-number">${index + 1}</div>
            </div>
        `).join('');

        return `
            <div class="timeline-game">
                <div class="game-instructions">
                    <p>Расставьте этапы разработки в правильном хронологическом порядке</p>
                </div>
                <div class="timeline-area">
                    <div class="items-panel">
                        <div class="items-list">
                            ${itemsHTML}
                        </div>
                    </div>
                    <div class="timeline-container">
                        <div class="timeline-slots">
                            ${slotsHTML}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    generateFindBugGame(slide) {
        return `
            <div class="find-bug-game">
                <div class="game-instructions">
                    <p>Найдите и кликните на строки с ошибками в коде</p>
                    <div class="bug-counter">Найдено: <span class="bugs-found">0</span> / <span class="total-bugs">${slide.bugsCount || 3}</span></div>
                </div>
                <div class="code-container">
                    <pre class="code-with-bugs"><code>${slide.code}</code></pre>
                </div>
            </div>
        `;
    }

    generateMatchGame(slide) {
        const leftItems = slide.leftItems || [];
        const rightItems = this.shuffleArray([...slide.rightItems || []]);
        
        const leftHTML = leftItems.map(item => `
            <div class="match-item left-item" data-value="${item}">${item}</div>
        `).join('');

        const rightHTML = rightItems.map(item => `
            <div class="match-item right-item" data-value="${item}">${item}</div>
        `).join('');

        return `
            <div class="match-game">
                <div class="game-instructions">
                    <p>Соедините соответствующие элементы из двух колонок</p>
                </div>
                <div class="match-area">
                    <div class="left-column">${leftHTML}</div>
                    <div class="connections-area"></div>
                    <div class="right-column">${rightHTML}</div>
                </div>
            </div>
        `;
    }

    generateDemoBody(slide) {
        return `
            <div class="slide-body">
                <div class="demo-wrapper">
                    <div class="demo-container">
                        ${slide.embed || '<div class="demo-placeholder">Демонстрация</div>'}
                    </div>
                    <div class="demo-description">
                        ${slide.description}
                    </div>
                </div>
            </div>
        `;
    }

    generateSummaryBody(slide) {
        return `
            <div class="slide-body">
                <div class="summary-wrapper">
                    <div class="summary-content">
                        <div class="summary-icon">✅</div>
                        <h3 class="summary-title">${slide.title}</h3>
                        <p class="summary-text">${slide.content}</p>
                        <div class="summary-stats">
                            <div class="stat-item">
                                <span class="stat-label">Пройдено вопросов:</span>
                                <span class="stat-value" id="module-questions">0</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Правильные ответы:</span>
                                <span class="stat-value" id="module-correct">0</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Заработано очков:</span>
                                <span class="stat-value" id="module-points">0</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    generateTip(tip) {
        return `
            <div class="content-tip">
                <div class="tip-icon">💡</div>
                <div class="tip-content">${tip}</div>
            </div>
        `;
    }

    initializeSlideInteractions(slide) {
        switch (slide.type) {
            case 'quiz':
                this.initializeQuizInteractions(slide);
                break;
            case 'minigame':
                this.initializeMinigameInteractions(slide);
                break;
        }
    }

    initializeQuizInteractions(slide) {
        const answers = document.querySelectorAll('.quiz-answer');
        const feedback = document.querySelector('.quiz-feedback');
        
        answers.forEach(answer => {
            answer.addEventListener('click', () => {
                if (answer.classList.contains('selected')) return;
                
                // Снимаем выделение с других ответов
                answers.forEach(a => a.classList.remove('selected', 'correct', 'incorrect'));
                
                // Выделяем текущий ответ
                answer.classList.add('selected');
                
                const isCorrect = answer.dataset.correct === 'true';
                
                if (isCorrect) {
                    answer.classList.add('correct');
                    this.handleCorrectAnswer(slide);
                } else {
                    answer.classList.add('incorrect');
                    this.handleIncorrectAnswer(slide);
                }
                
                // Показываем правильный ответ
                answers.forEach(a => {
                    if (a.dataset.correct === 'true') {
                        a.classList.add('correct');
                    }
                });
                
                // Показываем объяснение
                if (feedback) {
                    feedback.classList.remove('hidden');
                }
                
                // Обновляем прогресс
                this.updateQuizProgress(isCorrect);
            });
        });
    }

    initializeMinigameInteractions(slide) {
        if (window.minigameManager) {
            window.minigameManager.initializeGame(slide.gameType, slide);
        }
        
        // Инициализация кнопок управления игрой
        const checkBtn = document.querySelector('.check-btn');
        const resetBtn = document.querySelector('.reset-btn');
        
        if (checkBtn) {
            checkBtn.addEventListener('click', () => {
                if (window.minigameManager) {
                    window.minigameManager.checkSolution();
                }
            });
        }
        
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                if (window.minigameManager) {
                    window.minigameManager.resetGame();
                }
                this.renderSlide(this.currentSlideIndex); // Перезагружаем слайд
            });
        }
    }

    handleCorrectAnswer(slide) {
        // Воспроизведение звука
        if (window.audioManager) {
            window.audioManager.playSound('correct');
        }
        
        // Добавление очков
        if (window.presentationApp) {
            window.presentationApp.addScore(100);
        }
        
        // Анимация успеха
        this.animateSuccess();
    }

    handleIncorrectAnswer(slide) {
        // Воспроизведение звука
        if (window.audioManager) {
            window.audioManager.playSound('wrong');
        }
        
        // Анимация ошибки
        this.animateError();
    }

    animateSuccess() {
        const slideContent = document.querySelector('.slide-content');
        slideContent.classList.add('success-animation');
        setTimeout(() => {
            slideContent.classList.remove('success-animation');
        }, 1000);
    }

    animateError() {
        const slideContent = document.querySelector('.slide-content');
        slideContent.classList.add('error-animation');
        setTimeout(() => {
            slideContent.classList.remove('error-animation');
        }, 1000);
    }

    updateQuizProgress(isCorrect) {
        // Обновление статистики модуля
        if (window.presentationApp) {
            window.presentationApp.updateModuleStats(isCorrect);
        }
    }

    updateNavigation() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const currentSlideEl = document.getElementById('current-slide');
        const totalSlidesEl = document.getElementById('total-slides');
        
        if (prevBtn) {
            prevBtn.disabled = this.currentSlideIndex === 0;
        }
        
        if (nextBtn) {
            nextBtn.disabled = this.currentSlideIndex === this.slidesData.length - 1;
        }
        
        if (currentSlideEl) {
            currentSlideEl.textContent = this.currentSlideIndex + 1;
        }
        
        if (totalSlidesEl) {
            totalSlidesEl.textContent = this.slidesData.length;
        }
    }

    updateProgressBar() {
        const progressFill = document.getElementById('progress-fill');
        if (progressFill) {
            const progress = ((this.currentSlideIndex + 1) / this.slidesData.length) * 100;
            progressFill.style.width = `${progress}%`;
        }
        
        // Обновление активного модуля в навигации
        this.updateModuleNavigation();
    }

    updateModuleNavigation() {
        const currentSlide = this.slidesData[this.currentSlideIndex];
        if (!currentSlide) return;
        
        const moduleDots = document.querySelectorAll('.module-dot');
        moduleDots.forEach(dot => {
            dot.classList.remove('active');
            if (parseInt(dot.dataset.module) === currentSlide.module) {
                dot.classList.add('active');
            }
        });
    }

    nextSlide() {
        if (this.currentSlideIndex < this.slidesData.length - 1) {
            this.renderSlide(this.currentSlideIndex + 1);
            return true;
        }
        return false;
    }

    previousSlide() {
        if (this.currentSlideIndex > 0) {
            this.renderSlide(this.currentSlideIndex - 1);
            return true;
        }
        return false;
    }

    goToSlide(slideId) {
        const slideIndex = this.slidesData.findIndex(slide => slide.id === slideId);
        if (slideIndex !== -1) {
            this.renderSlide(slideIndex);
        }
    }

    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
}

// Глобальный экземпляр менеджера слайдов
window.slideManager = new SlideManager();