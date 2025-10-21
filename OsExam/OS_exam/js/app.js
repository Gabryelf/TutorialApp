class OSArchitectureGame {
    constructor() {
        this.gameEngine = new GameEngine();
        this.uiController = new UIController(this.gameEngine);
        this.initializeApp();
    }

    initializeApp() {
        console.log('OS Architecture Game инициализирован');
        this.uiController.showScreen('welcome');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.osArchitectureGame = new OSArchitectureGame();
});