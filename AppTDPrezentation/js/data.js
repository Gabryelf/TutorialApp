// js/data.js
window.PresentationData = {
    slides: [
        {
            id: 1,
            type: 'title',
            module: 1,
            title: 'Idle Tower Defense',
            subtitle: 'Интерактивная обучающая презентация',
            content: 'Изучите полный цикл разработки игры через увлекательные задания и викторины'
        },
        {
            id: 2,
            type: 'content',
            module: 1,
            title: '🎯 Архитектура проекта',
            content: `
                <div class="content-grid">
                    <div class="content-card">
                        <h4>Frontend:</h4>
                        <ul>
                            <li>HTML5 Canvas для графики</li>
                            <li>JavaScript + WebSocket</li>
                            <li>Адаптивный UI</li>
                        </ul>
                    </div>
                    <div class="content-card">
                        <h4>Backend:</h4>
                        <ul>
                            <li>FastAPI framework</li>
                            <li>SQLite database</li>
                            <li>JWT аутентификация</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            id: 3,
            type: 'quiz',
            module: 1,
            title: '📝 Технологии бэкенда',
            question: 'Какую базу данных мы используем в проекте?',
            answers: [
                { text: 'PostgreSQL', correct: false },
                { text: 'MongoDB', correct: false },
                { text: 'SQLite', correct: true },
                { text: 'MySQL', correct: false }
            ],
            explanation: 'SQLite была выбрана за простоту настройки и идеальное соотношение для учебного проекта.'
        },
        {
            id: 4,
            type: 'minigame',
            module: 1,
            title: '🏗️ Собери стек технологий',
            gameType: 'drag-drop',
            content: 'Перетащи технологии в правильные категории',
            components: ['FastAPI', 'HTML5 Canvas', 'SQLite', 'WebSocket'],
            slots: ['Бэкенд', 'Фронтенд', 'База данных', 'Реальное время']
        },
        {
            id: 5,
            type: 'content',
            module: 1,
            title: '🚀 Игровой движок',
            content: `
                <div class="code-block">
                    <pre><code>class GameEngine {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.towers = [];
        this.enemies = [];
    }
    
    update() {
        this.render();
        requestAnimationFrame(() => this.update());
    }
}</code></pre>
                </div>
            `
        },
        {
            id: 6,
            type: 'quiz',
            module: 1,
            title: '🎮 Игровая логика',
            question: 'Какой метод используется для плавной анимации в Canvas?',
            answers: [
                { text: 'setInterval()', correct: false },
                { text: 'setTimeout()', correct: false },
                { text: 'requestAnimationFrame()', correct: true },
                { text: 'render()', correct: false }
            ],
            explanation: 'requestAnimationFrame() обеспечивает плавную анимацию, синхронизированную с частотой обновления экрана.'
        },
        {
            id: 7,
            type: 'summary',
            module: 1,
            title: '✅ Модуль 1 завершен!',
            content: 'Вы изучили базовую архитектуру проекта. Готовы перейти к бэкенд разработке?'
        },

        {
            id: 8,
            type: 'transition',
            module: 1,
            title: '🚀 Переход к Модулю 2',
            subtitle: 'Бэкенд разработка',
            content: 'Теперь изучим серверную часть проекта на FastAPI'
        },

        // Добавляем в js/data.js после первого модуля
        {
            id: 9,
            type: 'title',
            module: 2,
            title: 'Модуль 2: Бэкенд разработка',
            subtitle: 'FastAPI + SQLite + Аутентификация',
            content: 'Создание мощного серверного API для игры'
        },
        {
            id: 10,
            type: 'content',
            module: 2,
            title: '🐍 Модели данных',
            content: `
                <div class="code-block">
                    <pre><code># server/src/models/user.py
        from pydantic import BaseModel
        from typing import Optional
        from datetime import datetime

        class UserCreate(BaseModel):
            username: str
            email: str
            password: str

        class UserResponse(BaseModel):
            id: int
            username: str
            email: str
            created_at: datetime
            last_login: Optional[datetime]</code></pre>
                </div>
                <div class="content-tip">
                    <div class="tip-icon">💡</div>
                    <div class="tip-content">Pydantic модели обеспечивают валидацию данных и автоматическую документацию API</div>
                </div>
            `
        },
        {
            id: 11,
            type: 'quiz',
            module: 2,
            title: '🔐 Аутентификация',
            question: 'Какой метод аутентификации используется в проекте?',
            answers: [
                { text: 'Session-based аутентификация', correct: false },
                { text: 'JWT токены', correct: true },
                { text: 'OAuth 2.0', correct: false },
                { text: 'Basic Auth', correct: false }
            ],
            explanation: 'JWT (JSON Web Tokens) используются для stateless аутентификации - идеально для REST API.'
        },
        {
            id: 12,
            type: 'minigame',
            module: 2,
            title: '🔗 Создание API эндпоинтов',
            gameType: 'drag-drop',
            content: 'Сопоставьте HTTP методы с соответствующими операциями',
            components: [
                'GET /api/users/me',
                'POST /api/auth/register',
                'PUT /api/users/profile',
                'DELETE /api/sessions',
                'GET /api/game/leaderboard'
            ],
            slots: [
                'Получить данные пользователя',
                'Создать нового пользователя',
                'Обновить профиль',
                'Выйти из системы',
                'Получить таблицу лидеров'
            ],
            correctPairs: {
                'GET /api/users/me': 'Получить данные пользователя',
                'POST /api/auth/register': 'Создать нового пользователя',
                'PUT /api/users/profile': 'Обновить профиль',
                'DELETE /api/sessions': 'Выйти из системы',
                'GET /api/game/leaderboard': 'Получить таблицу лидеров'
            }
        },
        {
            id: 13,
            type: 'content',
            module: 2,
            title: '🗄️ Работа с базой данных',
            content: `
                <div class="code-block">
                    <pre><code># server/src/database/sqlite_database.py
        import sqlite3
        from typing import List, Optional

        class SQLiteDatabase:
            def __init__(self, db_path: str):
                self.db_path = db_path
                self.init_database()
            
            def init_database(self):
                conn = sqlite3.connect(self.db_path)
                cursor = conn.cursor()
                
                # Создание таблицы пользователей
                cursor.execute('''
                    CREATE TABLE IF NOT EXISTS users (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        username TEXT UNIQUE NOT NULL,
                        email TEXT UNIQUE NOT NULL,
                        password_hash TEXT NOT NULL,
                        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                    )
                ''')
                
                conn.commit()
                conn.close()</code></pre>
                </div>
            `
        },
        {
            id: 14,
            type: 'quiz',
            module: 2,
            title: '🛡️ Безопасность API',
            question: 'Как защищены пароли пользователей в базе данных?',
            answers: [
                { text: 'Хранение в открытом виде', correct: false },
                { text: 'Шифрование AES', correct: false },
                { text: 'Хеширование bcrypt', correct: true },
                { text: 'Кодирование Base64', correct: false }
            ],
            explanation: 'Пароли хешируются с помощью bcrypt - это обеспечивает защиту даже при компрометации базы данных.'
        },
        {
            id: 15,
            type: 'minigame',
            module: 2,
            title: '🎯 Обработка ошибок',
            gameType: 'find-bug',
            content: 'Найдите ошибки в коде обработки регистрации пользователя',
            code: `@app.post("/api/auth/register")
        async def register(user_data: UserCreate):
            # Проверяем существование пользователя
            existing_user = db.get_user_by_username(user_data.username)
            if existing_user:
                return {"error": "User already exists"}
            
            # Хешируем пароль
            password_hash = hash_password(user_data.password)
            
            # Создаем пользователя
            user = {
                "username": user_data.username,
                "email": user_data.email,
                "password_hash": password_hash
            }
            
            db.create_user(user)
            return {"message": "User created successfully"}`,
            bugs: [
                { line: 4, description: 'Нет проверки email на уникальность' },
                { line: 15, description: 'Нет обработки ошибок при создании пользователя' },
                { line: 16, description: 'Не возвращаются данные созданного пользователя' }
            ]
        },
        {
            id: 16,
            type: 'summary',
            module: 2,
            title: '✅ Бэкенд готов!',
            content: 'API сервер с аутентификацией и базой данных полностью функционирует. Переходим к игровой логике!'
        },

        {
            id: 17,
            type: 'title',
            module: 3,
            title: 'Модуль 3: PyGame клиент',
            subtitle: 'Игровой движок на Python',
            content: 'Создание интерфейса и игровой механики на PyGame'
        },
        {
            id: 18,
            type: 'content',
            module: 3,
            title: '🎮 Архитектура PyGame приложения',
            content: `
                <div class="content-grid">
                    <div class="content-card">
                        <h4>Основные компоненты:</h4>
                        <ul>
                            <li>Game - главный класс игры</li>
                            <li>SceneManager - управление сценами</li>
                            <li>UI Components - кнопки, панели</li>
                            <li>Network Client - общение с сервером</li>
                        </ul>
                    </div>
                    <div class="content-card">
                        <h4>Игровые сцены:</h4>
                        <ul>
                            <li>MainMenu - главное меню</li>
                            <li>GameScene - игровой процесс</li>
                            <li>LoginScene - авторизация</li>
                            <li>Leaderboard - таблица лидеров</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            id: 19,
            type: 'quiz',
            module: 3,
            title: '🖥️ PyGame основы',
            question: 'Какой основной цикл используется в PyGame приложениях?',
            answers: [
                { text: 'Бесконечный while True с обработкой событий', correct: true },
                { text: 'Callback-based система', correct: false },
                { text: 'Event-driven архитектура', correct: false },
                { text: 'Многопоточный подход', correct: false }
            ],
            explanation: 'PyGame использует бесконечный цикл с обработкой событий через pygame.event.get() и обновлением экрана.'
        },
        {
            id: 20,
            type: 'minigame',
            module: 3,
            title: '⚡ Игровой цикл',
            gameType: 'timeline',
            content: 'Расставьте этапы игрового цикла в правильном порядке',
            items: [
                'Обработка событий (events)',
                'Обновление игрового состояния (update)',
                'Отрисовка кадра (render)',
                'Контроль FPS (clock.tick)',
                'Очистка экрана (screen.fill)'
            ]
        },
        {
            id: 21,
            type: 'content',
            module: 3,
            title: '🏗️ Класс Game - ядро приложения',
            content: `
                <div class="code-block">
                    <pre><code># client/game.py
        import pygame
        from scenes.main_menu import MainMenu
        from network.client import GameClient

        class Game:
            def __init__(self):
                pygame.init()
                self.screen = pygame.display.set_mode((800, 600))
                self.clock = pygame.time.Clock()
                self.running = True
                self.current_scene = MainMenu(self)
                self.network = GameClient()
            
            def run(self):
                while self.running:
                    # Обработка событий
                    for event in pygame.event.get():
                        if event.type == pygame.QUIT:
                            self.running = False
                        self.current_scene.handle_event(event)
                    
                    # Обновление и отрисовка
                    self.current_scene.update()
                    self.current_scene.render(self.screen)
                    
                    pygame.display.flip()
                    self.clock.tick(60)</code></pre>
                </div>
            `
        },
        {
            id: 22,
            type: 'quiz',
            module: 3,
            title: '📡 Сетевое взаимодействие',
            question: 'Как PyGame клиент общается с FastAPI сервером?',
            answers: [
                { text: 'Через WebSocket соединения', correct: false },
                { text: 'HTTP запросы с помощью requests', correct: true },
                { text: 'Прямое подключение к базе данных', correct: false },
                { text: 'Файловый обмен', correct: false }
            ],
            explanation: 'PyGame клиент использует библиотеку requests для HTTP запросов к REST API сервера.'
        },
        {
            id: 23,
            type: 'minigame',
            module: 3,
            title: '🎨 Создание UI компонентов',
            gameType: 'drag-drop',
            content: 'Соберите правильную иерархию UI системы',
            components: [
                'Game (корневой класс)',
                'SceneManager',
                'BaseScene',
                'UIComponent',
                'Button',
                'Label',
                'Panel'
            ],
            slots: [
                'Управление всем приложением',
                'Переключение между сценами',
                'Базовая сцена игры',
                'Базовый UI элемент',
                'Кнопка (наследует UIComponent)',
                'Текст (наследует UIComponent)',
                'Контейнер (наследует UIComponent)'
            ]
        },
        {
            id: 24,
            type: 'summary',
            module: 3,
            title: '✅ PyGame клиент готов!',
            content: 'Игровой клиент с интерфейсом и сетевым взаимодействием полностью функционирует. Переходим к интеграции!'
        },

        {
            id: 25,
            type: 'title',
            module: 4,
            title: 'Модуль 4: Интеграция и тестирование',
            subtitle: 'Связываем клиент и сервер',
            content: 'Обеспечение стабильной работы всей системы'
        },
        {
            id: 26,
            type: 'content',
            module: 4,
            title: '🔗 API интеграция',
            content: `
                <div class="code-block">
                    <pre><code># client/network/client.py
        import requests
        import json

        class GameClient:
            def __init__(self, base_url="http://localhost:8000"):
                self.base_url = base_url
                self.token = None
            
            def login(self, username: str, password: str) -> bool:
                response = requests.post(
                    f"{self.base_url}/api/auth/login",
                    json={"username": username, "password": password}
                )
                
                if response.status_code == 200:
                    data = response.json()
                    self.token = data["access_token"]
                    return True
                return False
            
            def get_user_data(self):
                headers = {"Authorization": f"Bearer {self.token}"}
                response = requests.get(
                    f"{self.base_url}/api/users/me",
                    headers=headers
                )
                return response.json() if response.status_code == 200 else None</code></pre>
                </div>
            `
        },
        {
            id: 27,
            type: 'quiz',
            module: 4,
            title: '🔄 Обработка ошибок сети',
            question: 'Что происходит при потере соединения с сервером?',
            answers: [
                { text: 'Игра аварийно завершается', correct: false },
                { text: 'Показывается сообщение об ошибке и предлагается повторить', correct: true },
                { text: 'Игра продолжается в оффлайн режиме', correct: false },
                { text: 'Автоматически переподключается без уведомления', correct: false }
            ],
            explanation: 'При ошибках сети показывается пользовательское сообщение с возможностью повтора операции.'
        },
        {
            id: 28,
            type: 'minigame',
            module: 4,
            title: '🐛 Отладка интеграции',
            gameType: 'find-bug',
            content: 'Найдите проблемы в коде обработки сетевых запросов',
            code: `def save_game_progress(self, progress_data):
            try:
                response = requests.post(
                    f"{self.base_url}/api/game/save",
                    json=progress_data
                )
                
                if response.status_code == 200:
                    print("Progress saved")
                else:
                    print("Failed to save progress")
                    
            except requests.exceptions.ConnectionError:
                print("No internet connection")`,
            bugs: [
                { line: 3, description: 'Нет заголовка Authorization с JWT токеном' },
                { line: 9, description: 'Не обрабатываются другие HTTP ошибки кроме 200' },
                { line: 12, description: 'Недостаточная обработка других исключений сети' }
            ]
        },
        {
            id: 29,
            type: 'content',
            module: 4,
            title: '🧪 Тестирование системы',
            content: `
                <div class="content-grid">
                    <div class="content-card">
                        <h4>Юнит-тесты:</h4>
                        <ul>
                            <li>Тестирование моделей данных</li>
                            <li>Тестирование API эндпоинтов</li>
                            <li>Тестирование игровой логики</li>
                            <li>Mock сетевых запросов</li>
                        </ul>
                    </div>
                    <div class="content-card">
                        <h4>Интеграционные тесты:</h4>
                        <ul>
                            <li>Полный цикл регистрации</li>
                            <li>Сохранение игрового прогресса</li>
                            <li>Загрузка таблицы лидеров</li>
                            <li>Ошибки сети и восстановление</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            id: 30,
            type: 'quiz',
            module: 4,
            title: '📊 Мониторинг производительности',
            question: 'Как отслеживается производительность игры?',
            answers: [
                { text: 'Логирование FPS в консоль', correct: true },
                { text: 'Встроенный профайлер PyGame', correct: false },
                { text: 'Внешние инструменты мониторинга', correct: false },
                { text: 'Не отслеживается', correct: false }
            ],
            explanation: 'FPS логируется для контроля производительности, особенно на слабых устройствах.'
        },
        {
            id: 31,
            type: 'minigame',
            module: 4,
            title: '🔧 Настройка окружения',
            gameType: 'match',
            content: 'Сопоставьте файлы конфигурации с их назначением',
            leftItems: [
                'requirements.txt',
                'config.json',
                '.env.example',
                'pytest.ini',
                'docker-compose.yml'
            ],
            rightItems: [
                'Зависимости Python',
                'Настройки приложения',
                'Шаблон переменных окружения',
                'Конфигурация тестов',
                'Запуск в Docker'
            ]
        },
        {
            id: 32,
            type: 'summary',
            module: 4,
            title: '✅ Интеграция завершена!',
            content: 'Клиент и сервер стабильно работают вместе. Система готова к использованию!'
        },

        {
            id: 33,
            type: 'title',
            module: 5,
            title: 'Модуль 5: Деплой и мониторинг',
            subtitle: 'Запуск в production',
            content: 'Подготовка и развертывание игры на сервере'
        },
        // В data.js ДОБАВЛЯЕМ модули 5-6
{
    id: 34,
    type: 'content',
    module: 5,
    title: '🐳 Docker контейнеризация',
    content: `
        <div class="code-block">
            <pre><code># Dockerfile для сервера
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

# docker-compose.yml
version: '3.8'
services:
  server:
    build: ./server
    ports:
      - "8000:8000"
    volumes:
      - ./data:/app/data</code></pre>
        </div>
    `
},
{
    id: 35,
    type: 'quiz',
    module: 5,
    title: '🚀 Деплой на сервер',
    question: 'Какой сервис можно использовать для деплоя Docker контейнеров?',
    answers: [
        { text: 'AWS EC2', correct: false },
        { text: 'Heroku', correct: false },
        { text: 'DigitalOcean Droplets', correct: false },
        { text: 'Все перечисленные варианты', correct: true }
    ],
    explanation: 'Все эти сервисы поддерживают развертывание Docker контейнеров. Выбор зависит от бюджета и требований к инфраструктуре.'
},
{
    id: 36,
    type: 'minigame',
    module: 5,
    title: '🔧 Настройка production',
    gameType: 'drag-drop',
    content: 'Настройте правильную конфигурацию для production среды',
    components: [
        'DEBUG=False',
        'CORS_ORIGINS=["https://yourdomain.com"]',
        'DATABASE_URL=postgresql://...',
        'JWT_SECRET=very-secret-key',
        'UVICORN_WORKERS=4'
    ],
    slots: [
        'Отладка',
        'Безопасность CORS', 
        'База данных',
        'Безопасность JWT',
        'Производительность'
    ],
    correctPairs: {
        'DEBUG=False': 'Отладка',
        'CORS_ORIGINS=["https://yourdomain.com"]': 'Безопасность CORS',
        'DATABASE_URL=postgresql://...': 'База данных',
        'JWT_SECRET=very-secret-key': 'Безопасность JWT', 
        'UVICORN_WORKERS=4': 'Производительность'
    }
},
{
    id: 37,
    type: 'content',
    module: 5,
    title: '📊 Мониторинг и логи',
    content: `
        <div class="code-block">
            <pre><code># Настройка логирования
import logging
from logging.handlers import RotatingFileHandler

# Файловый handler с ротацией
file_handler = RotatingFileHandler(
    'app.log', 
    maxBytes=10485760,  # 10MB
    backupCount=5
)
file_handler.setLevel(logging.INFO)

# Формат логов
formatter = logging.Formatter(
    '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
file_handler.setFormatter(formatter)

# Добавляем handler к логгеру
logger = logging.getLogger()
logger.addHandler(file_handler)</code></pre>
        </div>
    `
},
{
    id: 38,
    type: 'quiz',
    module: 5,
    title: '🔍 Отслеживание ошибок',
    question: 'Какой инструмент поможет отслеживать ошибки в production?',
    answers: [
        { text: 'Sentry', correct: true },
        { text: 'Photoshop', correct: false },
        { text: 'Visual Studio Code', correct: false },
        { text: 'PyCharm', correct: false }
    ],
    explanation: 'Sentry - это платформа для отслеживания ошибок в реальном времени, которая интегрируется с Python приложениями.'
},
{
    id: 39,
    type: 'summary',
    module: 5,
    title: '✅ Деплой завершен!',
    content: 'Приложение успешно развернуто в production с мониторингом и логированием!'
},
{
    id: 40,
    type: 'title',
    module: 6,
    title: 'Модуль 6: Оптимизация и улучшения',
    subtitle: 'Повышение производительности и UX',
    content: 'Финальные штрихи для идеального пользовательского опыта'
},
{
    id: 41,
    type: 'content',
    module: 6,
    title: '⚡ Оптимизация производительности',
    content: `
        <div class="content-grid">
            <div class="content-card">
                <h4>Бэкенд оптимизации:</h4>
                <ul>
                    <li>Кэширование запросов с Redis</li>
                    <li>Оптимизация SQL запросов</li>
                    <li>Сжатие Gzip ответов</li>
                    <li>Асинхронные операции</li>
                </ul>
            </div>
            <div class="content-card">
                <h4>Фронтенд оптимизации:</h4>
                <ul>
                    <li>Ленивая загрузка ресурсов</li>
                    <li>Оптимизация анимаций</li>
                    <li>Сжатие изображений</li>
                    <li>Кэширование в браузере</li>
                </ul>
            </div>
        </div>
    `
},
{
    id: 42,
    type: 'quiz',
    module: 6,
    title: '🎯 Оптимизация базы данных',
    question: 'Какой индекс улучшит производительность запросов по username?',
    answers: [
        { text: 'CREATE INDEX idx_username ON users(username)', correct: true },
        { text: 'CREATE INDEX idx_email ON users(email)', correct: false },
        { text: 'CREATE INDEX idx_created ON users(created_at)', correct: false },
        { text: 'Индексы не нужны для строковых полей', correct: false }
    ],
    explanation: 'Индекс на поле username значительно ускорит поиск пользователей по имени.'
},
{
    id: 43,
    type: 'minigame',
    module: 6,
    title: '🔧 Выбор инструментов оптимизации',
    gameType: 'match',
    content: 'Сопоставьте проблемы с инструментами оптимизации',
    leftItems: [
        'Медленные SQL запросы',
        'Частые запросы к API',
        'Большие изображения',
        'Повторные вычисления',
        'Медленная загрузка страниц'
    ],
    rightItems: [
        'EXPLAIN ANALYZE, индексы',
        'Redis кэширование',
        'Сжатие, WebP формат',
        'Memoization, кэш',
        'Lazy loading, CDN'
    ],
    correctPairs: {
        'Медленные SQL запросы': 'EXPLAIN ANALYZE, индексы',
        'Частые запросы к API': 'Redis кэширование', 
        'Большие изображения': 'Сжатие, WebP формат',
        'Повторные вычисления': 'Memoization, кэш',
        'Медленная загрузка страниц': 'Lazy loading, CDN'
    }
},
{
    id: 44,
    type: 'content',
    module: 6,
    title: '🎨 Улучшение пользовательского опыта',
    content: `
        <div class="code-block">
            <pre><code># Добавление loading states
async def load_user_data(user_id):
    try:
        # Показываем индикатор загрузки
        show_loading_indicator()
        
        data = await api.get_user_data(user_id)
        return data
        
    finally:
        # Всегда скрываем индикатор
        hide_loading_indicator()

# Обработка ошибок с пользовательскими сообщениями
try:
    await save_game_progress(progress)
except NetworkError:
    show_error("Проблемы с соединением. Попробуйте позже.")
except ServerError:
    show_error("Сервер временно недоступен.")</code></pre>
        </div>
    `
},
{
    id: 45,
    type: 'quiz',
    module: 6,
    title: '📱 Адаптивный дизайн',
    question: 'Какой подход лучше для адаптивного PyGame интерфейса?',
    answers: [
        { text: 'Фиксированные размеры для всех устройств', correct: false },
        { text: 'Относительные размеры и масштабирование', correct: true },
        { text: 'Отдельная версия для мобильных', correct: false },
        { text: 'Игнорировать мобильные устройства', correct: false }
    ],
    explanation: 'Относительные размеры и масштабирование позволяют интерфейсу адаптироваться к разным разрешениям экрана.'
},
{
    id: 46,
    type: 'minigame',
    module: 6,
    title: '🐛 Финальное тестирование',
    gameType: 'find-bug',
    content: 'Найдите последние баги в коде перед релизом',
    code: `def calculate_game_score(wave, enemies_defeated, towers_built):
    # Расчет игрового счета
    base_score = wave * 100
    enemy_bonus = enemies_defeated * 10
    tower_bonus = towers_built * 5
    
    total_score = base_score + enemy_bonus + tower_bonus
    
    # Бонус за быструю победу
    if wave > 10:
        total_score *= 1.5
    
    return total_score

def save_highscore(user_id, score):
    # Сохранение рекорда
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    
    cursor.execute(
        "INSERT INTO highscores (user_id, score) VALUES (?, ?)",
        (user_id, score)
    )
    
    conn.commit()
    conn.close()`,
    bugs: [
        { line: 9, description: 'Нет проверки на отрицательные значения' },
        { line: 13, description: 'Нет ограничения максимального счета' },
        { line: 23, description: 'Нет обработки ошибок базы данных' }
    ]
},
{
    id: 47,
    type: 'summary',
    module: 6,
    title: '🎉 Проект завершен!',
    content: 'Idle Tower Defense полностью готов к использованию! Вы прошли весь путь от идеи до production.'
},
{
    id: 48,
    type: 'content',
    module: 6,
    title: '📈 Итоги разработки',
    content: `
        <div class="content-grid">
            <div class="content-card">
                <h4>Достижения:</h4>
                <ul>
                    <li>✅ Full-stack архитектура</li>
                    <li>✅ FastAPI + SQLite бэкенд</li>
                    <li>✅ PyGame клиент</li>
                    <li>✅ JWT аутентификация</li>
                    <li>✅ Docker деплой</li>
                </ul>
            </div>
            <div class="content-card">
                <h4>Навыки:</h4>
                <ul>
                    <li>🎯 Проектирование архитектуры</li>
                    <li>🎯 Backend разработка</li>
                    <li>🎯 Game development</li>
                    <li>🎯 Интеграция систем</li>
                    <li>🎯 Деплой и мониторинг</li>
                </ul>
            </div>
        </div>
    `
}


        
    ]
};