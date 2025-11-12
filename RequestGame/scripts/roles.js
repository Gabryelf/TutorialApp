// scripts/roles.js
console.log("🎮 roles.js загружен");

class RoleManager {
    constructor() {
        this.currentRole = null;
        this.score = 9;
        this.players = new Map();
    }

    initializeGame() {
        console.log("🚀 Инициализация игры...");
        this.clearSavedData();
        this.loadRoles();
        this.setupModalHandlers();
        console.log("✅ Игра готова к выбору ролей");
    }

    clearSavedData() {
        localStorage.removeItem('selectedRole');
        localStorage.removeItem('playerScore');
        console.log("🧹 Очищены сохраненные данные");
    }

    loadRoles() {
        const roleGrid = document.getElementById('role-grid');
        if (!roleGrid) {
            console.error("❌ Элемент role-grid не найден!");
            return;
        }

        roleGrid.innerHTML = '';

        GAME_CONFIG.roles.forEach(role => {
            const roleCard = document.createElement('div');
            roleCard.className = `role-card role-${role.id}`;
            roleCard.innerHTML = `
                <div class="role-icon">${role.icon}</div>
                <div class="role-name">${role.name}</div>
                <div class="role-description">${this.getRoleDescription(role.id)}</div>
            `;
            roleCard.addEventListener('click', () => this.selectRole(role.id));
            roleGrid.appendChild(roleCard);
        });
        
        console.log("✅ Роли загружены:", GAME_CONFIG.roles.length);
    }

    getRoleDescription(roleId) {
        const descriptions = {
            "client": "Отправляет запросы и получает ответы",
            "dns": "Преобразует доменные имена в IP-адреса",
            "router": "Направляет пакеты по правильному пути",
            "firewall": "Проверяет безопасность соединений",
            "server": "Обрабатывает запросы и формирует ответы",
            "database": "Хранит и предоставляет данные",
            "browser": "Отображает веб-страницы и обрабатывает JavaScript",
            "loadbalancer": "Распределяет нагрузку между серверами",
            "cache": "Сохраняет копии данных для быстрого доступа",
            "cdn": "Доставляет контент из ближайшего местоположения",
            "proxy": "Посредник между клиентом и сервером",
            "api": "Обрабатывает программные интерфейсы",
            "websocket": "Обеспечивает двустороннюю связь в реальном времени",
            "ssl": "Шифрует соединение для безопасности",
            "http": "Определяет формат обмена сообщениями",
            "tcp": "Гарантирует доставку пакетов",
            "admin": "Управляет ходом игры и видит последовательность"
        };
        return descriptions[roleId] || "Важная роль в сети";
    }

    selectRole(roleId) {
        console.log("🎯 Выбрана роль:", roleId);
        
        this.currentRole = roleId;
        this.score = 9;

        // Переключаем экраны
        document.getElementById('role-selection').classList.remove('active');
        document.getElementById('game-screen').classList.add('active');
        
        // Обновляем интерфейс
        this.updateGameInterface();
    }

    updateGameInterface() {
        const role = GAME_CONFIG.roles.find(r => r.id === this.currentRole);
        document.getElementById('player-role').textContent = role.name;
        document.getElementById('player-score').textContent = `Баллы: ${this.score}`;
        
        // Скрываем админские контролы для всех кроме админа
        document.getElementById('admin-controls').style.display = 'none';
        
        // Загружаем соответствующий интерфейс
        if (this.currentRole === 'admin') {
            this.loadAdminInterface();
        } else {
            this.loadPlayerInterface();
        }
    }

    loadAdminInterface() {
        console.log("👑 Загружаем интерфейс администратора");
        
        document.getElementById('admin-controls').style.display = 'block';
        document.getElementById('current-scenario').textContent = "Панель администратора";
        
        const scenarioDescription = document.getElementById('scenario-description');
        scenarioDescription.innerHTML = `
            <h3>👑 Вы - администратор игры</h3>
            <p>Ваша задача - управлять последовательностью ходов игроков.</p>
            <div class="sequence-info">
                <h4>📋 Последовательность ролей в сценарии "Веб-запрос":</h4>
                <ol>
                    ${GAME_CONFIG.scenarios.web_request.sequence.map((roleId, index) => {
                        const role = GAME_CONFIG.roles.find(r => r.id === roleId);
                        return `<li><strong>Шаг ${index + 1}:</strong> ${role?.icon} ${role?.name}</li>`;
                    }).join('')}
                </ol>
            </div>
            <p>Нажимайте "Следующий ход" чтобы переходить к следующей роли в последовательности.</p>
        `;
        
        const actionGrid = document.getElementById('action-grid');
        actionGrid.innerHTML = '<p class="admin-message">🎮 Используйте кнопку "Следующий ход" для управления игрой</p>';
        
        this.setupAdminNetworkVisualization();
    }

    setupAdminNetworkVisualization() {
        const vizContainer = document.getElementById('network-viz');
        const sequence = GAME_CONFIG.scenarios.web_request.sequence;
        
        let html = '<div class="network-path-admin">';
        sequence.forEach((roleId, index) => {
            const role = GAME_CONFIG.roles.find(r => r.id === roleId);
            html += `
                <div class="node-admin ${roleId}-node">
                    <div class="node-icon">${role?.icon}</div>
                    <div class="node-name">${role?.name}</div>
                    <div class="step-number">${index + 1}</div>
                </div>
                ${index < sequence.length - 1 ? '<div class="connection-admin">→</div>' : ''}
            `;
        });
        html += '</div>';
        
        vizContainer.innerHTML = html;
    }

    loadPlayerInterface() {
        console.log("🎮 Загружаем игровой интерфейс для роли:", this.currentRole);
        
        const question = getQuestionForRole(this.currentRole);
        if (!question) {
            console.error("❌ Не удалось загрузить вопрос для роли:", this.currentRole);
            return;
        }

        document.getElementById('current-scenario').textContent = `Роль: ${this.getRoleDescription(this.currentRole)}`;
        
        const scenarioDescription = document.getElementById('scenario-description');
        scenarioDescription.innerHTML = `
            <h3>${question.question}</h3>
            <p>Выберите правильное действие:</p>
        `;

        const actionGrid = document.getElementById('action-grid');
        actionGrid.innerHTML = '';

        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'action-btn';
            button.textContent = option;
            button.addEventListener('click', () => this.checkAnswer(index, question));
            actionGrid.appendChild(button);
        });

        this.setupPlayerNetworkVisualization();
    }

    setupPlayerNetworkVisualization() {
        const vizContainer = document.getElementById('network-viz');
        const role = GAME_CONFIG.roles.find(r => r.id === this.currentRole);
        
        vizContainer.innerHTML = `
            <div class="player-network">
                <div class="current-role-highlight">
                    <div class="highlighted-node">
                        <div class="node-icon">${role.icon}</div>
                        <div class="node-name">${role.name}</div>
                        <div class="you-are-here">Вы здесь</div>
                    </div>
                </div>
                <p class="network-info">Ваша роль в сетевом взаимодействии</p>
            </div>
        `;
    }

    checkAnswer(selectedIndex, question) {
        console.log("🔍 Проверка ответа:", selectedIndex, "Правильный:", question.correct);
        
        const buttons = document.querySelectorAll('.action-btn');
        
        if (selectedIndex === question.correct) {
            // Правильный ответ
            buttons[selectedIndex].classList.add('correct');
            this.showSuccessModal(question);
        } else {
            // Неправильный ответ
            buttons[selectedIndex].classList.add('incorrect');
            this.score = Math.max(0, this.score - 1);
            document.getElementById('player-score').textContent = `Баллы: ${this.score}`;
            this.showErrorModal(question);
        }
    }

    showSuccessModal(question) {
        const modal = document.getElementById('success-modal');
        const bonusQuestion = question.bonus;
        
        document.getElementById('success-message').textContent = 
            "Отличная работа! Вы правильно поняли свою роль в сетевом взаимодействии.";
        
        if (bonusQuestion) {
            document.getElementById('bonus-text').textContent = bonusQuestion.question;
            this.setupBonusOptions(bonusQuestion);
            document.getElementById('bonus-question').style.display = 'block';
        } else {
            document.getElementById('bonus-question').style.display = 'none';
        }
        
        modal.style.display = 'block';
    }

    showErrorModal(question) {
        const modal = document.getElementById('error-modal');
        document.getElementById('error-message').textContent = 
            `Немного не туда. У вас осталось ${this.score} баллов.`;
        document.getElementById('hint-text').textContent = question.hint;
        modal.style.display = 'block';
    }


setupBonusOptions(bonusQuestion) {
    const optionsContainer = document.getElementById('bonus-options');
    optionsContainer.innerHTML = '';

    console.log("🎲 Создаем перемешанные бонусные варианты. Правильный индекс:", bonusQuestion.correct);

    // Создаем кнопки для бонусных вариантов
    bonusQuestion.options.forEach((option, index) => {
        const div = document.createElement('div');
        div.className = 'bonus-option';
        div.textContent = option;
        div.setAttribute('data-index', index);
        
        div.addEventListener('click', (e) => {
            const selectedIndex = parseInt(e.target.getAttribute('data-index'));
            console.log("🎯 Выбран бонусный вариант:", selectedIndex, "Правильный:", bonusQuestion.correct);
            
            // Блокируем все варианты после выбора
            document.querySelectorAll('.bonus-option').forEach(opt => {
                opt.style.pointerEvents = 'none';
            });
            
            if (selectedIndex === bonusQuestion.correct) {
                // Правильный бонусный ответ
                this.score += 3;
                document.getElementById('player-score').textContent = `Баллы: ${this.score}`;
                div.style.background = '#4CAF50';
                div.style.color = 'white';
                div.innerHTML += ' ✅';
                
                console.log("🎉 Бонусные баллы добавлены! Новый счет:", this.score);
            } else {
                // Неправильный бонусный ответ
                div.style.background = '#ff6b6b';
                div.style.color = 'white';
                div.innerHTML += ' ❌';
                
                // Показываем правильный вариант
                document.querySelectorAll('.bonus-option').forEach(opt => {
                    const optIndex = parseInt(opt.getAttribute('data-index'));
                    if (optIndex === bonusQuestion.correct) {
                        opt.style.background = '#4CAF50';
                        opt.style.color = 'white';
                        opt.innerHTML += ' ✅';
                    }
                });
                
                console.log("❌ Неправильный бонусный ответ");
            }
        });
        
        optionsContainer.appendChild(div);
    });

    console.log("✅ Бонусные варианты созданы:", bonusQuestion.options.length);
}


    setupModalHandlers() {
        // Закрытие модальных окон
        document.querySelectorAll('.close-modal').forEach(closeBtn => {
            closeBtn.addEventListener('click', (e) => {
                e.target.closest('.modal').style.display = 'none';
            });
        });

        // Кнопки продолжения
        document.getElementById('continue-success').addEventListener('click', () => {
            document.getElementById('success-modal').style.display = 'none';
        });

        document.getElementById('try-again').addEventListener('click', () => {
            document.getElementById('error-modal').style.display = 'none';
        });

        // Клик вне модального окна
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.style.display = 'none';
            }
        });

        // Кнопка возврата к выбору роли
        this.setupBackButton();
    }

    setupBackButton() {
        const backButton = document.createElement('button');
        backButton.textContent = '← Выбрать другую роль';
        backButton.className = 'btn-back';
        backButton.style.cssText = `
            position: fixed;
            top: 600px;
            left: 20px;
            background: #6c757d;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 5px;
            cursor: pointer;
            z-index: 1000;
        `;
        backButton.addEventListener('click', () => {
            document.getElementById('game-screen').classList.remove('active');
            document.getElementById('role-selection').classList.add('active');
        });
        
        document.getElementById('game-screen').appendChild(backButton);
    }
}

// Создаем экземпляр менеджера ролей
const roleManager = new RoleManager();