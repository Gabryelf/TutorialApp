class UIController {
    constructor(gameEngine) {
        this.gameEngine = gameEngine;
        this.currentScreen = 'welcome';
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        document.getElementById('start-btn').addEventListener('click', () => this.showScreen('game'));
        document.getElementById('restart-btn').addEventListener('click', () => this.restartGame());
        document.getElementById('continue-btn').addEventListener('click', () => this.nextTask());
        document.getElementById('hint-btn').addEventListener('click', () => this.showHint());
    }

    showScreen(screenName) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });

        document.getElementById(`${screenName}-screen`).classList.add('active');
        this.currentScreen = screenName;

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
        this.hideResultPanel();
        document.getElementById('next-btn').disabled = true;
    }

    displayTask(task) {
        const container = document.getElementById('task-container');
        
        switch(task.type) {
            case 'definition':
            case 'comparison':
            case 'synchronization':
            case 'scenario':
                this.renderMultipleChoiceTask(task, container);
                break;
            case 'diagram':
                this.renderDiagramTask(task, container);
                break;
        }
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

        container.querySelectorAll('.answer-option').forEach(option => {
            option.addEventListener('click', (e) => {
                const value = e.currentTarget.dataset.value;
                this.handleAnswer(value);
            });
        });
    }

    renderDiagramTask(task, container) {
        const diagramsHtml = task.diagrams.map((diagram, index) => `
            <div class="answer-option diagram-option" data-value="${index}">
                <div class="diagram-header">
                    <strong>${diagram.label}</strong>
                    <div class="selection-indicator">○</div>
                </div>
                ${diagram.html}
            </div>
        `).join('');
    
        container.innerHTML = `
            <h2 class="task-title">${task.title}</h2>
            <p class="task-description">${task.description}</p>
            <div class="diagram-task">
                <div class="answer-options diagram-options">${diagramsHtml}</div>
                <div class="selection-hint">Выберите вариант выше</div>
            </div>
        `;
    
        // Обработчик выбора диаграммы с автоматической отправкой
        container.querySelectorAll('.diagram-option').forEach(option => {
            option.addEventListener('click', (e) => {
                console.log('Diagram option clicked, sending answer...');
                
                // Убираем выделение у всех
                container.querySelectorAll('.diagram-option').forEach(opt => {
                    opt.classList.remove('selected');
                    opt.querySelector('.selection-indicator').textContent = '○';
                });
                
                // Добавляем выделение выбранному
                option.classList.add('selected');
                option.querySelector('.selection-indicator').textContent = '✓';
                
                // Немедленно отправляем ответ
                const value = option.dataset.value;
                console.log('Sending value:', value);
                this.handleAnswer(value);
                
                // Блокируем дальнейшие клики
                container.querySelectorAll('.diagram-option').forEach(opt => {
                    opt.style.pointerEvents = 'none';
                });
            });
        });
    }

    handleAnswer(answer) {
        console.log('=== HANDLE ANSWER CALLED ===');
        console.log('Answer:', answer);
        console.log('Type of answer:', typeof answer);
        
        const result = this.gameEngine.submitAnswer(answer);
        console.log('Game engine result:', result);
        
        this.showResultPanel(result);
        
        if (result.isCorrect) {
            this.gameEngine.addScore();
            this.updateScore();
        }
        
        console.log('=== END HANDLE ANSWER ===');
    }



    hideResultPanel() {
        document.getElementById('result-panel').classList.add('hidden');
    }

    nextTask() {
        this.hideResultPanel();
        const nextTask = this.gameEngine.nextTask();
        
        if (nextTask) {
            this.displayTask(nextTask);
            this.updateProgress();
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

    showResultPanel(result) {
        const panel = document.getElementById('result-panel');
        const icon = document.getElementById('result-icon');
        const title = document.getElementById('result-title');
        const message = document.getElementById('result-message');
        const correctAnswer = document.getElementById('correct-answer');

        panel.className = 'result-panel';
        
        if (result.isCorrect) {
            panel.classList.add('result-correct');
            icon.textContent = '🎉';
            title.textContent = 'Правильно!';
            message.textContent = result.feedback;
            correctAnswer.innerHTML = '<strong>+1 балл</strong>';
        } else {
            panel.classList.add('result-incorrect');
            icon.textContent = '💡';
            title.textContent = 'Неправильно';
            message.textContent = result.feedback;
            
            const currentTask = this.gameEngine.getCurrentTask();
            
            // ИСПРАВЛЕНИЕ: для диаграмм используем diagrams, для остальных - options
            if (currentTask.type === 'diagram') {
                correctAnswer.innerHTML = `<strong>Правильный ответ:</strong> ${currentTask.diagrams[currentTask.correctAnswer].label}`;
            } else {
                correctAnswer.innerHTML = `<strong>Правильный ответ:</strong> ${currentTask.options[currentTask.correctAnswer]}`;
            }
        }

        panel.classList.remove('hidden');
    }

    showResults() {
        const results = this.gameEngine.getFinalResults();
        
        document.getElementById('final-score').textContent = `${results.score}/${results.total}`;
        document.getElementById('rank-icon').textContent = results.rank.icon;
        document.getElementById('rank-title').textContent = results.rank.title;
        document.getElementById('rank-description').textContent = results.rank.description;

        const answersReview = document.getElementById('answers-review');
        answersReview.innerHTML = results.answers.map((answer, index) => {
            // ИСПРАВЛЕНИЕ: для диаграмм показываем label, для остальных - options
            let userAnswerText;
            if (answer.task.type === 'diagram') {
                userAnswerText = answer.task.diagrams[answer.userAnswer].label;
            } else {
                userAnswerText = answer.task.options[answer.userAnswer];
            }
            
            return `
                <div class="answer-item ${answer.isCorrect ? 'answer-correct' : 'answer-incorrect'}">
                    <strong>Задание ${index + 1}:</strong> ${answer.task.title}<br>
                    <strong>Ваш ответ:</strong> ${userAnswerText}<br>
                    <strong>Результат:</strong> ${answer.isCorrect ? 'Правильно' : 'Неправильно'}<br>
                    <em>${answer.feedback}</em>
                </div>
            `;
        }).join('');
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

    restartGame() {
        this.gameEngine.restartGame();
        this.showScreen('game');
    }
}