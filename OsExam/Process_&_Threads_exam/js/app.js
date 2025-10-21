class ProcessesThreadsGame {
    constructor() {
        this.gameEngine = new GameEngine();
        this.uiController = new UIController(this.gameEngine);
        this.initializeApp();
    }

    initializeApp() {
        console.log('Processes & Threads Game инициализирован');
        this.uiController.showScreen('welcome');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.processesThreadsGame = new ProcessesThreadsGame();
});