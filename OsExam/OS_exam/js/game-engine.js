class GameEngine {
    constructor() {
        this.questionGenerator = new QuestionGenerator();
        this.currentTaskIndex = 0;
        this.score = 0;
        this.tasks = [];
        this.userAnswers = [];
        this.isGameActive = false;
    }

    startNewGame() {
        this.currentTaskIndex = 0;
        this.score = 0;
        this.userAnswers = [];
        this.tasks = this.questionGenerator.generateTaskSet();
        this.isGameActive = true;
        
        console.log('Новая игра начата. Задания:', this.tasks);
        return this.tasks[0];
    }

    restartGame() {
        this.questionGenerator.updateSeed();
        return this.startNewGame();
    }

    getCurrentTask() {
        return this.tasks[this.currentTaskIndex];
    }

    submitAnswer(userAnswer) {
        const currentTask = this.getCurrentTask();
        let isCorrect = false;
        let feedback = '';

        switch (currentTask.type) {
            case 'definition':
            case 'classification':
            case 'architecture':
            case 'scenario':
                isCorrect = parseInt(userAnswer) === currentTask.correctAnswer;
                feedback = isCorrect ?
                    `Верно! ${currentTask.options[currentTask.correctAnswer]} - правильный ответ.` :
                    `Неправильно. Правильный ответ: ${currentTask.options[currentTask.correctAnswer]}`;
                break;

            case 'diagram':
                isCorrect = parseInt(userAnswer) === currentTask.correctAnswer;
                feedback = isCorrect ?
                    `Верно! ${currentTask.diagrams[currentTask.correctAnswer].label} - правильный выбор.` :
                    `Неправильно. Правильный ответ: ${currentTask.diagrams[currentTask.correctAnswer].label}`;
                break;
        }

        // Сохраняем ответ пользователя
        this.userAnswers.push({
            task: currentTask,
            userAnswer: userAnswer,
            isCorrect: isCorrect,
            feedback: feedback
        });

        return {
            isCorrect: isCorrect,
            feedback: feedback,
            correctAnswer: currentTask.correctAnswer,
            taskType: currentTask.type
        };
    }

    addScore() {
        this.score++;
    }

    nextTask() {
        this.currentTaskIndex++;
        if (this.currentTaskIndex < this.tasks.length) {
            return this.tasks[this.currentTaskIndex];
        }
        return null;
    }

    isGameComplete() {
        return this.currentTaskIndex >= this.tasks.length;
    }

    getFinalResults() {
        const ranks = [
            { score: 5, title: "Архитектор ОС", description: "Превосходно! Вы мастер операционных систем!", icon: "💻🏗️" },
            { score: 4, title: "Системный инженер", description: "Отлично! Вы глубоко понимаете архитектуру ОС.", icon: "🔧🎯" },
            { score: 3, title: "Разработчик", description: "Хорошо! Вы знаете основы, продолжайте изучать.", icon: "📚🔍" },
            { score: 2, title: "Пользователь ПК", description: "Неплохо, но нужно углубить знания об ОС.", icon: "👨‍💻📖" },
            { score: 0, title: "Новичок", description: "Вам стоит изучить основы операционных систем.", icon: "🎓🌟" }
        ];

        const rank = ranks.find(r => this.score >= r.score) || ranks[ranks.length - 1];

        return {
            score: this.score,
            total: this.tasks.length,
            rank: rank,
            answers: this.userAnswers
        };
    }

    getHint() {
        const currentTask = this.getCurrentTask();
        return currentTask.hint || "Подсказка не доступна для этого задания.";
    }
}