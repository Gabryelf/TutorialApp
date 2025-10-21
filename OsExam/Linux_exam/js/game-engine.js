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
            case 'command':
                isCorrect = this.checkCommandAnswer(userAnswer, currentTask.correctAnswer);
                feedback = isCorrect ? 
                    `Правильно! Команда "${currentTask.correctAnswer}" выполнена успешно.` :
                    `Неверно. Правильная команда: ${currentTask.correctAnswer}`;
                break;

            case 'multiple_choice':
                isCorrect = parseInt(userAnswer) === currentTask.correctAnswer;
                feedback = isCorrect ?
                    `Верно! ${currentTask.options[currentTask.correctAnswer]} - правильный ответ.` :
                    `Неправильно. Правильный ответ: ${currentTask.options[currentTask.correctAnswer]}`;
                break;

            case 'file_system':
                isCorrect = parseInt(userAnswer) === currentTask.correctAnswer;
                feedback = isCorrect ?
                    'Отлично! Структура создана правильно.' :
                    `Неправильная последовательность. Правильный порядок:\n${currentTask.commands.join('\n')}`;
                break;

            case 'process':
                isCorrect = this.checkArrayAnswer(userAnswer, currentTask.correctAnswer);
                feedback = isCorrect ?
                    'Правильно! Процесс управляется корректно.' :
                    `Неверный порядок. Правильная последовательность:\n${currentTask.correctOrder.map(i => currentTask.steps[i]).join('\n')}`;
                break;

            case 'permission':
                isCorrect = userAnswer.trim() === currentTask.correctAnswer;
                feedback = isCorrect ?
                    `Верно! Права ${currentTask.targetRights} установлены.` :
                    `Неправильно. Правильная команда: ${currentTask.correctAnswer}`;
                break;
        }

        if (isCorrect) {
            this.score++;
        }

        this.userAnswers.push({
            task: currentTask,
            userAnswer: userAnswer,
            isCorrect: isCorrect,
            feedback: feedback
        });

        return {
            isCorrect: isCorrect,
            feedback: feedback,
            score: this.score,
            correctAnswer: currentTask.correctAnswer
        };
    }

    checkCommandAnswer(userAnswer, correctAnswer) {
        // Нормализация ответа для более гибкой проверки
        const normalizedUser = userAnswer.trim().toLowerCase().replace(/\s+/g, ' ');
        const normalizedCorrect = correctAnswer.toLowerCase().replace(/\s+/g, ' ');
        
        return normalizedUser === normalizedCorrect;
    }

    checkArrayAnswer(userAnswer, correctArray) {
        try {
            const userArray = JSON.parse(userAnswer);
            if (!Array.isArray(userArray)) return false;
            
            return userArray.length === correctArray.length && 
                   userArray.every((val, idx) => val === correctArray[idx]);
        } catch {
            return false;
        }
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
            { score: 5, title: "Linux Гуру", description: "Превосходно! Вы настоящий мастер Linux!", icon: "🐧⭐" },
            { score: 4, title: "Системный администратор", description: "Отлично! Вы уверенно работаете в Linux.", icon: "💻🔧" },
            { score: 3, title: "Продвинутый пользователь", description: "Хорошо! Есть базовые знания, но нужно практиковаться.", icon: "📚✓" },
            { score: 2, title: "Начинающий", description: "Неплохо, но требуется больше практики с командами Linux.", icon: "👶🔍" },
            { score: 0, title: "Новичок", description: "Вам стоит изучить основы Linux перед продолжением.", icon: "🎯📖" }
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