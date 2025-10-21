// Главный файл приложения
class LinuxQuizGame {
    constructor() {
        this.gameEngine = new GameEngine();
        this.uiController = new UIController(this.gameEngine);
        this.initializeApp();
    }

    initializeApp() {
        console.log('Linux Quiz Game инициализирован');
        
        // Добавляем глобальные обработчики событий
        this.addGlobalEventListeners();
        
        // Показываем welcome screen
        this.uiController.showScreen('welcome');
    }

    addGlobalEventListeners() {
        // Обработка выбора ответов для multiple choice
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('answer-option') && 
                !e.target.closest('#process-steps')) {
                const value = e.target.dataset.value;
                this.uiController.submitAnswer(value);
            }
        });

        // Автофокус на инпуты команд
        document.addEventListener('input', (e) => {
            if (e.target.classList.contains('command-input')) {
                // Можно добавить автодополнение или валидацию
            }
        });
    }
}

// Запуск приложения когда DOM загружен
document.addEventListener('DOMContentLoaded', () => {
    window.linuxQuizGame = new LinuxQuizGame();
});

// Обработка ошибок
window.addEventListener('error', (e) => {
    console.error('Ошибка в приложении:', e.error);
});