class UIController {
    constructor(gameEngine) {
        this.gameEngine = gameEngine;
        this.currentScreen = 'welcome';
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Кнопки навигации
        document.getElementById('start-btn').addEventListener('click', () => this.showScreen('game'));
        document.getElementById('restart-btn').addEventListener('click', () => this.restartGame());
        
        // Игровые кнопки
        document.getElementById('next-btn').addEventListener('click', () => this.nextTask());
        document.getElementById('hint-btn').addEventListener('click', () => this.showHint());

        // Обработка ввода команд
        document.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && this.currentScreen === 'game') {
                this.handleEnterKey();
            }
        });
    }

    showScreen(screenName) {
        // Скрыть все экраны
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });

        // Показать целевой экран
        document.getElementById(`${screenName}-screen`).classList.add('active');
        this.currentScreen = screenName;

        // Инициализация экрана
        switch(screenName) {
            case 'game':
                this.startGame();
                break;
            case 'results':
                this.showResults();
                break;
        }
    }

    startGame() {
        const task = this.gameEngine.startNewGame();
        this.updateProgress();
        this.displayTask(task);
        this.clearFeedback();
        document.getElementById('next-btn').disabled = true;
    }

    restartGame() {
        this.gameEngine.restartGame();
        this.showScreen('game');
    }

    displayTask(task) {
        const container = document.getElementById('task-container');
        
        switch(task.type) {
            case 'command':
                this.renderCommandTask(task, container);
                break;
            case 'multiple_choice':
                this.renderMultipleChoiceTask(task, container);
                break;
            case 'file_system':
                this.renderFileSystemTask(task, container);
                break;
            case 'process':
                this.renderProcessTask(task, container);
                break;
            case 'permission':
                this.renderPermissionTask(task, container);
                break;
        }
    }

    renderCommandTask(task, container) {
        container.innerHTML = `
            <h2 class="task-title">${task.title}</h2>
            <p class="task-description">${task.description}</p>
            <div class="command-input-task">
                <span class="prompt">$</span>
                <input type="text" class="command-input" id="command-input" 
                       placeholder="Введите команду..." autocomplete="off">
            </div>
        `;
        
        document.getElementById('command-input').focus();
    }

    renderMultipleChoiceTask(task, container) {
        const optionsHtml = task.options.map((option, index) => `
            <div class="answer-option" data-value="${index}">
                ${String.fromCharCode(65 + index)}) ${option}
            </div>
        `).join('');

        container.innerHTML = `
            <h2 class="task-title">${task.title}</h2>
            <p class="task-description">${task.description}</p>
            <div class="multiple-choice-task">
                <div class="answer-options">${optionsHtml}</div>
            </div>
        `;

        // Добавляем обработчики для вариантов ответа
        container.querySelectorAll('.answer-option').forEach(option => {
            option.addEventListener('click', (e) => {
                container.querySelectorAll('.answer-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                e.currentTarget.classList.add('selected');
                document.getElementById('next-btn').disabled = false;
            });
        });
    }

    renderFileSystemTask(task, container) {
        const commandsHtml = task.commands.map((command, index) => `
            <div class="answer-option" data-value="${index}">
                ${command}
            </div>
        `).join('');

        container.innerHTML = `
            <h2 class="task-title">${task.title}</h2>
            <p class="task-description">${task.description}</p>
            <div class="file-system-task">
                <div class="file-system-layout">
                    <pre>${task.description}</pre>
                </div>
                <p>Выберите правильную последовательность команд:</p>
                <div class="answer-options">${commandsHtml}</div>
            </div>
        `;

        container.querySelectorAll('.answer-option').forEach(option => {
            option.addEventListener('click', (e) => {
                container.querySelectorAll('.answer-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                e.currentTarget.classList.add('selected');
                document.getElementById('next-btn').disabled = false;
            });
        });
    }

    renderProcessTask(task, container) {
        const stepsHtml = task.steps.map((step, index) => `
            <div class="answer-option" data-value="${index}">
                ${step}
            </div>
        `).join('');

        container.innerHTML = `
            <h2 class="task-title">${task.title}</h2>
            <p class="task-description">${task.description}</p>
            <div class="process-task">
                <p>Расставьте шаги в правильном порядке (кликайте по порядку):</p>
                <div class="answer-options" id="process-steps">${stepsHtml}</div>
                <div id="selected-steps" class="selected-steps"></div>
            </div>
        `;

        this.initializeProcessTaskDrag();
    }

    renderPermissionTask(task, container) {
        container.innerHTML = `
            <h2 class="task-title">${task.title}</h2>
            <p class="task-description">${task.description}</p>
            <div class="permission-task">
                <div class="current-rights">
                    <strong>Текущие права:</strong> ${task.currentRights}
                </div>
                <div class="target-rights">
                    <strong>Требуемые права:</strong> ${task.targetRights}
                </div>
                <div class="command-input-task">
                    <span class="prompt">$</span>
                    <input type="text" class="command-input" id="command-input" 
                           placeholder="Введите команду chmod..." autocomplete="off">
                </div>
            </div>
        `;
        
        document.getElementById('command-input').focus();
    }

    initializeProcessTaskDrag() {
        const stepsContainer = document.getElementById('process-steps');
        const selectedContainer = document.getElementById('selected-steps');
        let selectedSteps = [];

        stepsContainer.querySelectorAll('.answer-option').forEach(option => {
            option.addEventListener('click', (e) => {
                const stepIndex = parseInt(e.currentTarget.dataset.value);
                
                if (!selectedSteps.includes(stepIndex)) {
                    selectedSteps.push(stepIndex);
                    this.updateSelectedSteps(selectedSteps, selectedContainer);
                    
                    if (selectedSteps.length > 0) {
                        document.getElementById('next-btn').disabled = false;
                    }
                }
            });
        });
    }

    updateSelectedSteps(selectedSteps, container) {
        const task = this.gameEngine.getCurrentTask();
        container.innerHTML = '<strong>Выбранная последовательность:</strong><br>' +
            selectedSteps.map(idx => task.steps[idx]).join('<br>');
    }

    handleEnterKey() {
        const currentTask = this.gameEngine.getCurrentTask();
        
        if (currentTask.type === 'command' || currentTask.type === 'permission') {
            const input = document.getElementById('command-input');
            if (input && input.value.trim()) {
                this.submitAnswer(input.value.trim());
            }
        }
    }

    submitAnswer(answer) {
        const result = this.gameEngine.submitAnswer(answer);
        this.showFeedback(result);
        document.getElementById('next-btn').disabled = false;
        this.updateScore();
    }

    showFeedback(result) {
        const feedbackArea = document.getElementById('feedback-area');
        feedbackArea.className = `feedback-area ${result.isCorrect ? 'feedback-correct' : 'feedback-incorrect'}`;
        feedbackArea.innerHTML = `
            <strong>${result.isCorrect ? '✓ Правильно!' : '✗ Неправильно'}</strong>
            <p>${result.feedback}</p>
        `;

        // Анимация feedback
        feedbackArea.style.animation = 'none';
        setTimeout(() => {
            feedbackArea.style.animation = 'fadeIn 0.5s ease';
        }, 10);
    }

    showHint() {
        const hint = this.gameEngine.getHint();
        const feedbackArea = document.getElementById('feedback-area');
        feedbackArea.className = 'feedback-area feedback-hint';
        feedbackArea.innerHTML = `
            <strong>💡 Подсказка</strong>
            <p>${hint}</p>
        `;
    }

    nextTask() {
        const nextTask = this.gameEngine.nextTask();
        
        if (nextTask) {
            this.displayTask(nextTask);
            this.updateProgress();
            this.clearFeedback();
            document.getElementById('next-btn').disabled = true;
        } else {
            this.showScreen('results');
        }
    }

    updateProgress() {
        const progress = ((this.gameEngine.currentTaskIndex + 1) / this.gameEngine.tasks.length) * 100;
        document.getElementById('progress-fill').style.width = `${progress}%`;
        document.getElementById('current-task').textContent = this.gameEngine.currentTaskIndex + 1;
    }

    updateScore() {
        document.getElementById('score').textContent = this.gameEngine.score;
    }

    clearFeedback() {
        document.getElementById('feedback-area').innerHTML = '';
        document.getElementById('feedback-area').className = 'feedback-area';
    }

    showResults() {
        const results = this.gameEngine.getFinalResults();
        
        document.getElementById('final-score').textContent = `${results.score}/${results.total}`;
        document.getElementById('rank-icon').textContent = results.rank.icon;
        document.getElementById('rank-title').textContent = results.rank.title;
        document.getElementById('rank-description').textContent = results.rank.description;

        // Показываем обзор ответов
        const answersReview = document.getElementById('answers-review');
        answersReview.innerHTML = results.answers.map((answer, index) => `
            <div class="answer-item ${answer.isCorrect ? 'answer-correct' : 'answer-incorrect'}">
                <strong>Задание ${index + 1}:</strong> ${answer.task.title}<br>
                <strong>Ваш ответ:</strong> ${answer.userAnswer}<br>
                <strong>Результат:</strong> ${answer.isCorrect ? 'Правильно' : 'Неправильно'}<br>
                <em>${answer.feedback}</em>
            </div>
        `).join('');
    }
}