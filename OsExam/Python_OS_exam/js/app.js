class PythonMultiprocessingGame {
    constructor() {
        this.gameEngine = new GameEngine();
        this.uiController = new UIController(this.gameEngine);
        this.initializeApp();
    }

    initializeApp() {
        console.log('Python Multiprocessing Game инициализирован');
        this.uiController.showScreen('welcome');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.pythonMultiprocessingGame = new PythonMultiprocessingGame();
});