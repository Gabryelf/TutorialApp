// js/minigames.js - УЛУЧШЕННАЯ ВЕРСИЯ
class MinigameManager {
    constructor() {
        this.currentGame = null;
        this.draggedElement = null;
    }

    initializeGame(gameType, config, slideElement) {
        this.currentGame = {
            type: gameType,
            config: config,
            state: this.getInitialState(gameType, config),
            slideElement: slideElement
        };

        switch (gameType) {
            case 'drag-drop':
                this.setupDragDropGame(config, slideElement);
                break;
            case 'timeline':
                this.setupTimelineGame(config, slideElement);
                break;
            case 'find-bug':
                this.setupFindBugGame(config, slideElement);
                break;
            case 'match':
                this.setupMatchGame(config, slideElement);
                break;
        }
    }

    getInitialState(gameType, config) {
        const baseState = {
            score: 0,
            completed: false,
            startTime: Date.now()
        };

        switch (gameType) {
            case 'drag-drop':
                return {
                    ...baseState,
                    placedComponents: {},
                    remainingComponents: this.shuffleArray([...config.components])
                };
            case 'timeline':
                return {
                    ...baseState,
                    placedItems: new Array(config.items.length).fill(null),
                    remainingItems: this.shuffleArray([...config.items])
                };
            case 'find-bug':
                return {
                    ...baseState,
                    bugsFound: 0,
                    totalBugs: config.bugs?.length || 3
                };
            case 'match':
                return {
                    ...baseState,
                    selectedLeft: null,
                    selectedRight: null,
                    matchedPairs: {},
                    remainingPairs: {...config.correctPairs}
                };
            default:
                return baseState;
        }
    }

    setupDragDropGame(config, slideElement) {
        const componentsContainer = slideElement.querySelector('.components-list');
        const slotsContainer = slideElement.querySelector('.slots-list');
        
        // Очищаем и пересоздаем компоненты в случайном порядке
        componentsContainer.innerHTML = '';
        this.currentGame.state.remainingComponents.forEach(component => {
            const compElement = document.createElement('div');
            compElement.className = 'component';
            compElement.draggable = true;
            compElement.textContent = component;
            compElement.dataset.value = component;
            componentsContainer.appendChild(compElement);
        });

        // Настройка перетаскивания
        const components = slideElement.querySelectorAll('.component');
        const slots = slideElement.querySelectorAll('.slot');

        components.forEach(component => {
            component.addEventListener('dragstart', this.handleDragStart.bind(this));
            component.addEventListener('dragend', this.handleDragEnd.bind(this));
        });

        slots.forEach(slot => {
            slot.addEventListener('dragover', this.handleDragOver.bind(this));
            slot.addEventListener('dragenter', this.handleDragEnter.bind(this));
            slot.addEventListener('dragleave', this.handleDragLeave.bind(this));
            slot.addEventListener('drop', this.handleDrop.bind(this));
        });

        // Кнопка проверки
        const checkBtn = slideElement.querySelector('.check-btn');
        if (checkBtn) {
            checkBtn.addEventListener('click', () => this.checkDragDropSolution(slideElement));
        }

        const resetBtn = slideElement.querySelector('.reset-btn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.resetGame(slideElement));
        }
    }

    setupMatchGame(config, slideElement) {
        const leftColumn = slideElement.querySelector('.left-column');
        const rightColumn = slideElement.querySelector('.right-column');
        
        // Очищаем колонки
        leftColumn.innerHTML = '';
        rightColumn.innerHTML = '';

        // Перемешиваем правую колонку
        const shuffledRight = this.shuffleArray([...config.rightItems]);
        
        // Создаем левые элементы (в правильном порядке)
        config.leftItems.forEach(item => {
            const leftElement = document.createElement('div');
            leftElement.className = 'match-item left';
            leftElement.textContent = item;
            leftElement.dataset.value = item;
            leftElement.addEventListener('click', () => this.handleMatchSelect(item, 'left', slideElement));
            leftColumn.appendChild(leftElement);
        });

        // Создаем правые элементы (перемешанные)
        shuffledRight.forEach(item => {
            const rightElement = document.createElement('div');
            rightElement.className = 'match-item right';
            rightElement.textContent = item;
            rightElement.dataset.value = item;
            rightElement.addEventListener('click', () => this.handleMatchSelect(item, 'right', slideElement));
            rightColumn.appendChild(rightElement);
        });

        // Кнопка проверки
        const checkBtn = slideElement.querySelector('.check-btn');
        if (checkBtn) {
            checkBtn.addEventListener('click', () => this.checkMatchSolution(slideElement));
        }
    }

    handleMatchSelect(item, side, slideElement) {
        const state = this.currentGame.state;
        
        if (side === 'left') {
            state.selectedLeft = item;
            // Снимаем выделение с других левых элементов
            slideElement.querySelectorAll('.match-item.left').forEach(el => {
                el.classList.remove('selected');
            });
            // Выделяем текущий
            slideElement.querySelector(`.match-item.left[data-value="${item}"]`).classList.add('selected');
        } else {
            state.selectedRight = item;
            // Снимаем выделение с других правых элементов
            slideElement.querySelectorAll('.match-item.right').forEach(el => {
                el.classList.remove('selected');
            });
            // Выделяем текущий
            slideElement.querySelector(`.match-item.right[data-value="${item}"]`).classList.add('selected');
        }

        // Если выбраны оба элемента, проверяем пару
        if (state.selectedLeft && state.selectedRight) {
            this.checkMatchPair(state.selectedLeft, state.selectedRight, slideElement);
        }
    }

    checkMatchPair(leftItem, rightItem, slideElement) {
        const state = this.currentGame.state;
        const correctPairs = this.currentGame.config.correctPairs;
        
        if (correctPairs[leftItem] === rightItem) {
            // Правильная пара
            state.matchedPairs[leftItem] = rightItem;
            delete state.remainingPairs[leftItem];
            
            // Помечаем элементы как совпавшие
            const leftElement = slideElement.querySelector(`.match-item.left[data-value="${leftItem}"]`);
            const rightElement = slideElement.querySelector(`.match-item.right[data-value="${rightItem}"]`);
            
            leftElement.classList.add('matched');
            rightElement.classList.add('matched');
            leftElement.classList.remove('selected');
            rightElement.classList.remove('selected');
            
            // Сбрасываем выбор
            state.selectedLeft = null;
            state.selectedRight = null;

            // Проверяем завершение
            if (Object.keys(state.remainingPairs).length === 0) {
                this.completeGame(150, slideElement);
            }
        } else {
            // Неправильная пара
            const leftElement = slideElement.querySelector(`.match-item.left[data-value="${leftItem}"]`);
            const rightElement = slideElement.querySelector(`.match-item.right[data-value="${rightItem}"]`);
            
            leftElement.classList.add('incorrect');
            rightElement.classList.add('incorrect');
            
            setTimeout(() => {
                leftElement.classList.remove('incorrect', 'selected');
                rightElement.classList.remove('incorrect', 'selected');
                state.selectedLeft = null;
                state.selectedRight = null;
            }, 1000);
        }
    }

    checkMatchSolution(slideElement) {
        const state = this.currentGame.state;
        const correctPairs = this.currentGame.config.correctPairs;
        let allCorrect = true;

        // Проверяем все пары
        Object.keys(correctPairs).forEach(leftItem => {
            const expectedRight = correctPairs[leftItem];
            const actualRight = state.matchedPairs[leftItem];
            
            if (actualRight !== expectedRight) {
                allCorrect = false;
            }
        });

        const feedback = slideElement.querySelector('.game-feedback');
        if (allCorrect && Object.keys(state.matchedPairs).length === Object.keys(correctPairs).length) {
            feedback.innerHTML = '<div class="success">🎉 Отлично! Все пары правильно сопоставлены! +150 очков</div>';
            this.completeGame(150, slideElement);
        } else {
            const matchedCount = Object.keys(state.matchedPairs).length;
            const totalCount = Object.keys(correctPairs).length;
            feedback.innerHTML = `<div class="warning">✅ Сопоставлено: ${matchedCount}/${totalCount}. Продолжайте!</div>`;
        }
        feedback.classList.remove('hidden');
    }

    // Остальные методы остаются похожими, но с улучшениями...
    handleDragStart(e) {
        this.draggedElement = e.target;
        e.target.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', e.target.dataset.value);
    }

    handleDragEnd(e) {
        e.target.classList.remove('dragging');
        this.draggedElement = null;
    }

    handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    }

    handleDragEnter(e) {
        e.preventDefault();
        if (e.target.classList.contains('slot')) {
            e.target.classList.add('drag-over');
        }
    }

    handleDragLeave(e) {
        if (e.target.classList.contains('slot')) {
            e.target.classList.remove('drag-over');
        }
    }

    handleDrop(e) {
        e.preventDefault();
        const slot = e.target.closest('.slot');
        if (!slot) return;

        slot.classList.remove('drag-over');

        if (!this.draggedElement) return;

        const componentValue = this.draggedElement.dataset.value;
        
        // Проверяем, можно ли поместить компонент в этот слот
        const slotAccepts = slot.dataset.accepts;
        const expectedValue = this.currentGame.config.correctPairs?.[slotAccepts] || slotAccepts;
        
        if (componentValue !== expectedValue) {
            this.showTemporaryFeedback(slot, 'incorrect');
            return;
        }

        // Помещаем компонент в слот
        this.placeComponentInSlot(this.draggedElement, slot);
    }

    placeComponentInSlot(component, slot) {
        component.classList.add('placed');
        component.style.visibility = 'hidden';
        
        const slotContent = slot.querySelector('.slot-content');
        slotContent.textContent = component.textContent;
        slot.classList.add('filled');
        slot.dataset.filled = component.dataset.value;

        // Обновляем состояние игры
        this.currentGame.state.placedComponents[slot.dataset.accepts] = component.dataset.value;
    }

    checkDragDropSolution(slideElement) {
        const slots = slideElement.querySelectorAll('.slot');
        let allCorrect = true;
        let correctCount = 0;

        slots.forEach(slot => {
            const filledValue = slot.dataset.filled;
            const expectedValue = this.currentGame.config.correctPairs?.[slot.dataset.accepts] || slot.dataset.accepts;
            
            if (filledValue === expectedValue) {
                slot.classList.add('correct');
                correctCount++;
            } else {
                slot.classList.add('incorrect');
                allCorrect = false;
            }
        });

        const feedback = slideElement.querySelector('.game-feedback');
        if (allCorrect) {
            feedback.innerHTML = '<div class="success">🎉 Отлично! Все элементы на своих местах! +150 очков</div>';
            this.completeGame(150, slideElement);
        } else {
            feedback.innerHTML = `<div class="warning">✅ Правильно размещено: ${correctCount}/${slots.length}. Попробуйте еще раз!</div>`;
        }
        feedback.classList.remove('hidden');
    }

    completeGame(points, slideElement) {
        this.currentGame.state.completed = true;
        this.currentGame.state.score = points;

        // Показываем результаты
        const feedback = slideElement.querySelector('.game-feedback');
        feedback.innerHTML = `
            <div class="result-success">🎉 Отлично! Задание выполнено!</div>
            <div class="result-explanation">
                Вы заработали ${points} очков за правильное выполнение.
            </div>
        `;
        feedback.classList.remove('hidden');

        // Обновляем общий счет
        if (window.presentationApp) {
            window.presentationApp.addScore(points);
        }

        // Анимация успеха
        slideElement.classList.add('celebrate');
        this.createParticles();
    }

    resetGame(slideElement) {
        // Перезагружаем игру
        const gameType = this.currentGame.type;
        const config = this.currentGame.config;
        this.initializeGame(gameType, config, slideElement);
        
        const feedback = slideElement.querySelector('.game-feedback');
        if (feedback) {
            feedback.classList.add('hidden');
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

    showTemporaryFeedback(element, type) {
        element.classList.add(type);
        setTimeout(() => {
            element.classList.remove(type);
        }, 1000);
    }

    createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        document.body.appendChild(particlesContainer);

        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const angle = Math.random() * Math.PI * 2;
            const distance = 50 + Math.random() * 100;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            
            particle.style.setProperty('--tx', tx + 'px');
            particle.style.setProperty('--ty', ty + 'px');
            particle.style.left = '50%';
            particle.style.top = '50%';
            particle.style.background = this.getRandomParticleColor();
            particle.style.animationDelay = (Math.random() * 0.5) + 's';
            
            particlesContainer.appendChild(particle);
        }

        setTimeout(() => {
            particlesContainer.remove();
        }, 1500);
    }

    getRandomParticleColor() {
        const colors = ['#6366f1', '#8b5cf6', '#06d6a0', '#f59e0b', '#ef4444'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
}

window.minigameManager = new MinigameManager();