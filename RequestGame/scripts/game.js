// scripts/game.js
console.log("🎲 game.js загружен");

class GameEngine {
    constructor() {
        this.currentTurn = 0;
        this.totalTurns = GAME_CONFIG.scenarios.web_request.sequence.length;
        this.gameState = 'waiting';
    }

    initialize() {
        console.log("🎮 Инициализация игрового движка...");
        this.setupAdminControls();
        this.setupTurnDisplay();
    }

    setupAdminControls() {
        const nextTurnBtn = document.getElementById('next-turn');
        if (nextTurnBtn) {
            nextTurnBtn.addEventListener('click', () => this.nextTurn());
            console.log("✅ Кнопка 'Следующий ход' настроена");
        }
    }

    setupTurnDisplay() {
        const display = document.getElementById('current-player');
        if (display) {
            display.textContent = `Ожидание начала игры...`;
        }
    }

    nextTurn() {
        if (this.currentTurn < this.totalTurns) {
            this.currentTurn++;
            this.updateTurnDisplay();
            this.createConfetti();
            
            console.log(`🔄 Ход ${this.currentTurn} из ${this.totalTurns}`);
            
            if (this.currentTurn === this.totalTurns) {
                this.endGame();
            }
        }
    }

    updateTurnDisplay() {
        const display = document.getElementById('current-player');
        if (display) {
            const currentRoleId = GAME_CONFIG.scenarios.web_request.sequence[this.currentTurn - 1];
            const role = GAME_CONFIG.roles.find(r => r.id === currentRoleId);
            display.textContent = `Сейчас ход: ${role?.icon} ${role?.name}`;
            display.classList.add('pulse');
            
            setTimeout(() => {
                display.classList.remove('pulse');
            }, 1000);
        }
    }

    endGame() {
        console.log("🎉 Игра завершена!");
        const display = document.getElementById('current-player');
        if (display) {
            display.textContent = "🎊 Игра завершена! Все роли сыграны";
            display.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
            display.style.color = 'white';
        }
        
        this.createConfetti(100); // Больше конфетти для завершения игры
    }

    createConfetti(count = 50) {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
        
        for (let i = 0; i < count; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 2 + 's';
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.remove();
                }
            }, 3000);
        }
    }

    resetGame() {
        this.currentTurn = 0;
        this.gameState = 'waiting';
        this.setupTurnDisplay();
        console.log("🔄 Игра сброшена");
    }
}

// Создаем экземпляр игрового движка
const gameEngine = new GameEngine();