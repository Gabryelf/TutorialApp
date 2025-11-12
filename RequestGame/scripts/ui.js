// scripts/ui.js
console.log("🎨 ui.js загружен");

class UIManager {
    constructor() {
        this.initializeUI();
    }

    initializeUI() {
        console.log("🖌️ Инициализация пользовательского интерфейса...");
        this.setupAnimations();
        this.setupResponsiveDesign();
        this.setupGlobalEventListeners();
    }

    setupAnimations() {
        // Анимация появления заголовка
        const title = document.querySelector('.title');
        if (title) {
            title.classList.add('slide-in');
        }

        // Анимация появления карточек ролей
        setTimeout(() => {
            const roleCards = document.querySelectorAll('.role-card');
            roleCards.forEach((card, index) => {
                card.style.animationDelay = (index * 0.1) + 's';
                card.classList.add('slide-in');
            });
        }, 500);

        console.log("✨ Анимации настроены");
    }

    setupResponsiveDesign() {
        const adjustLayout = () => {
            const actionGrid = document.getElementById('action-grid');
            if (actionGrid) {
                if (window.innerWidth < 768) {
                    actionGrid.style.gridTemplateColumns = '1fr';
                } else {
                    actionGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
                }
            }
        };

        window.addEventListener('resize', adjustLayout);
        adjustLayout(); // Вызываем сразу при загрузке

        console.log("📱 Адаптивный дизайн настроен");
    }

    setupGlobalEventListeners() {
        // Глобальная обработка ошибок
        window.addEventListener('error', (e) => {
            console.error('🚨 Глобальная ошибка:', e.error);
            this.showNotification('Произошла ошибка в игре. Пожалуйста, обновите страницу.', 'error');
        });

        // Предотвращение выхода из игры
        window.addEventListener('beforeunload', (e) => {
            e.preventDefault();
            e.returnValue = 'Вы уверены, что хотите покинуть игру?';
        });

        console.log("🔧 Глобальные обработчики событий настроены");
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${this.getNotificationColor(type)};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            z-index: 1001;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            animation: slideIn 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    }

    getNotificationColor(type) {
        const colors = {
            success: 'linear-gradient(135deg, #4CAF50, #45a049)',
            error: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
            info: 'linear-gradient(135deg, #2196F3, #1976D2)',
            warning: 'linear-gradient(135deg, #ff9800, #f57c00)'
        };
        return colors[type] || colors.info;
    }

    // Метод для показа экрана загрузки
    showLoadingScreen() {
        const loadingScreen = document.createElement('div');
        loadingScreen.id = 'loading-screen';
        loadingScreen.innerHTML = `
            <div class="loading-content">
                <div class="loading-spinner"></div>
                <h3>Загрузка игры...</h3>
            </div>
        `;
        loadingScreen.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            color: white;
        `;
        
        document.body.appendChild(loadingScreen);
        
        return loadingScreen;
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.remove();
        }
    }
}

// Главная функция инициализации
function initializeApplication() {
    console.log("🚀 Запуск приложения...");
    
    const uiManager = new UIManager();
    
    // Показываем экран загрузки
    const loadingScreen = uiManager.showLoadingScreen();
    
    // Имитируем загрузку ресурсов
    setTimeout(() => {
        // Инициализируем игровые системы
        roleManager.initializeGame();
        gameEngine.initialize();
        
        // Скрываем экран загрузки
        uiManager.hideLoadingScreen();
        
        console.log("🎉 Приложение полностью загружено и готово!");
        uiManager.showNotification('Игра готова! Выберите свою роль.', 'success');
        
    }, 1000);
}

// Запускаем приложение когда DOM готов
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApplication);
} else {
    initializeApplication();
}

// Экспортируем для глобального доступа (для отладки)
window.uiManager = new UIManager();