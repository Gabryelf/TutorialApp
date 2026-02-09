// Основной скрипт презентации WSL2 + Docker

class Presentation {
    constructor() {
        this.currentSlide = 1;
        this.totalSlides = 6;
        this.quizAnswers = {};
        this.interactiveTask = null;
        this.terminalHistory = [];
        
        this.init();
    }
    
    init() {
        // Инициализация навигации
        this.setupNavigation();
        
        // Инициализация терминала
        this.setupTerminal();
        
        // Инициализация интерактивных элементов
        this.setupInteractiveElements();
        
        // Инициализация копирования кода
        this.setupCodeCopy();
        
        // Инициализация файлового задания
        this.setupFileTask();
        
        // Обновление прогресса
        this.updateProgress();
        
        // Добавляем обработчик клавиатуры
        this.setupKeyboardNavigation();
    }
    
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const prevBtn = document.getElementById('prevSlide');
        const nextBtn = document.getElementById('nextSlide');
        
        // Навигация по клику на пункты меню
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const slideId = link.getAttribute('href').replace('#slide-', '');
                this.goToSlide(parseInt(slideId));
            });
        });
        
        // Кнопки вперед/назад
        prevBtn.addEventListener('click', () => this.prevSlide());
        nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Кнопка "Начать сначала"
        document.getElementById('startOver')?.addEventListener('click', () => {
            this.goToSlide(1);
            this.terminalClear();
            this.terminalLog('🚀 Презентация перезапущена. Начнем сначала!');
        });
        
        // Кнопка "Поделиться"
        document.getElementById('shareProject')?.addEventListener('click', () => {
            this.terminalLog('📤 Подготовка ссылки для публикации проекта...');
            setTimeout(() => {
                this.terminalLog('✅ Готово! Используйте этот код для развертывания:');
                this.terminalLog('   git clone https://github.com/your-repo/django-docker-template.git');
                this.terminalLog('   cd django-docker-template && docker-compose up');
            }, 1000);
        });
    }
    
    setupTerminal() {
        const clearBtn = document.querySelector('.terminal-clear-btn');
        const testBtn = document.querySelector('.run-test-btn');
        
        // Очистка терминала
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.terminalClear());
        }
        
        // Тестовая команда Docker
        if (testBtn) {
            testBtn.addEventListener('click', () => {
                this.terminalLog('🐳 Запускаю тестовый контейнер Nginx...');
                this.terminalLog('   docker run -d -p 8080:80 --name test-nginx nginx');
                setTimeout(() => {
                    this.terminalLog('✅ Контейнер запущен! Проверьте: http://localhost:8080');
                    this.terminalLog('   Для остановки выполните: docker stop test-nginx');
                }, 1500);
            });
        }
        
        // Проверка WSL
        const wslCheckBtn = document.querySelector('[data-check="wsl-version"]');
        if (wslCheckBtn) {
            wslCheckBtn.addEventListener('click', () => {
                this.terminalLog('🔍 Проверяю установку WSL...');
                this.terminalLog('   wsl --version');
                setTimeout(() => {
                    this.terminalLog('✅ WSL версия: 2.0.9.0', 'success');
                    this.terminalLog('✅ Ядро: 5.15.90.1', 'success');
                    this.terminalLog('✅ WSLg: 1.0.51', 'success');
                }, 1000);
            });
        }
    }
    
    terminalLog(message, type = 'info') {
        const terminalContent = document.getElementById('terminalContent');
        if (!terminalContent) return;
        
        const line = document.createElement('div');
        line.className = 'terminal-line';
        
        const prompt = document.createElement('span');
        prompt.className = 'prompt';
        prompt.textContent = '$';
        
        const command = document.createElement('span');
        command.className = `command ${type}`;
        command.textContent = ' ' + message;
        
        line.appendChild(prompt);
        line.appendChild(command);
        terminalContent.appendChild(line);
        
        // Сохраняем в историю
        this.terminalHistory.push({ message, type, timestamp: new Date() });
        
        // Автопрокрутка
        terminalContent.scrollTop = terminalContent.scrollHeight;
    }
    
    terminalClear() {
        const terminalContent = document.getElementById('terminalContent');
        if (terminalContent) {
            terminalContent.innerHTML = `
                <div class="terminal-line">
                    <span class="prompt">$</span> <span class="command">Терминал очищен</span>
                </div>
                <div class="terminal-line">
                    <span class="prompt">$</span> <span class="command">Готов к выполнению команд</span>
                </div>
            `;
        }
        this.terminalHistory = [];
    }
    
    setupInteractiveElements() {
        // Кнопка скачивания проекта
        const downloadBtn = document.getElementById('downloadProject');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => {
                this.terminalLog('📥 Подготавливаю архив с проектом...');
                setTimeout(() => {
                    this.terminalLog('✅ Архив готов! Начинаю скачивание...', 'success');
                    
                    // Создаем виртуальный архив (в реальности это был бы реальный файл)
                    const content = this.generateProjectArchive();
                    const blob = new Blob([content], { type: 'application/zip' });
                    const url = URL.createObjectURL(blob);
                    
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'django-docker-template.zip';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                    
                    this.terminalLog('📁 Файл django-docker-template.zip успешно скачан!');
                }, 1500);
            });
        }
    }
    
    generateProjectArchive() {
        // Возвращает текстовое представление архива
        // В реальном приложении здесь была бы генерация реальных файлов
        return `Django Docker Template Archive
Содержит полную конфигурацию для запуска Django проекта в Docker.
Создано на основе презентации "WSL2 + Docker + Django".
`;
    }
    
    setupCodeCopy() {
        // Копирование кода при клике на кнопки
        document.addEventListener('click', (e) => {
            if (e.target.closest('.copy-btn')) {
                const btn = e.target.closest('.copy-btn');
                const targetId = btn.getAttribute('data-clipboard-target');
                const target = document.querySelector(targetId);
                
                if (target) {
                    const text = target.textContent;
                    this.copyToClipboard(text);
                    
                    // Визуальный фидбэк
                    const originalText = btn.innerHTML;
                    btn.innerHTML = '<i class="fas fa-check"></i> Скопировано!';
                    btn.style.background = 'var(--success)';
                    
                    this.terminalLog('📋 Код скопирован в буфер обмена');
                    
                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.style.background = '';
                    }, 2000);
                }
            }
        });
    }
    
    copyToClipboard(text) {
        navigator.clipboard.writeText(text).catch(err => {
            console.error('Ошибка копирования:', err);
            // Fallback для старых браузеров
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
        });
    }
    
    setupFileTask() {
        // Инициализация задания на сборку файлов
        const task = new FileBuilderTask();
        this.interactiveTask = task;
    }
    
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Стрелки для навигации
            if (e.key === 'ArrowRight' || e.key === ' ') {
                e.preventDefault();
                this.nextSlide();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                this.prevSlide();
            }
            
            // Цифры для перехода к слайду
            if (e.key >= '1' && e.key <= '6') {
                this.goToSlide(parseInt(e.key));
            }
            
            // Escape для очистки терминала
            if (e.key === 'Escape') {
                this.terminalClear();
            }
        });
    }
    
    goToSlide(slideNumber) {
        // Валидация номера слайда
        if (slideNumber < 1) slideNumber = 1;
        if (slideNumber > this.totalSlides) slideNumber = this.totalSlides;
        
        // Скрываем текущий слайд
        const currentSlide = document.querySelector('.slide.active');
        if (currentSlide) {
            currentSlide.classList.remove('active');
        }
        
        // Показываем новый слайд
        const newSlide = document.getElementById(`slide-${slideNumber}`);
        if (newSlide) {
            newSlide.classList.add('active');
            this.currentSlide = slideNumber;
            
            // Обновляем навигацию
            this.updateNavigation();
            
            // Прокручиваем к началу слайда
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Логируем переход
            const slideTitles = {
                1: 'Введение: WSL2 + Docker + Django',
                2: 'Установка WSL2 на Windows',
                3: 'Установка и настройка Ubuntu в WSL2',
                4: 'Установка Docker Engine в Ubuntu WSL2',
                5: 'Запуск Django проекта в Docker',
                6: 'Практическое задание: Сборка проекта'
            };
            
            this.terminalLog(`📄 Переход на слайд ${slideNumber}: ${slideTitles[slideNumber]}`);
        }
    }
    
    nextSlide() {
        this.goToSlide(this.currentSlide + 1);
    }
    
    prevSlide() {
        this.goToSlide(this.currentSlide - 1);
    }
    
    updateNavigation() {
        // Обновляем активную ссылку в навигации
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#slide-${this.currentSlide}`) {
                link.classList.add('active');
            }
        });
        
        // Обновляем индикатор слайда
        const indicator = document.getElementById('currentSlide');
        if (indicator) {
            indicator.textContent = this.currentSlide;
        }
        
        // Обновляем состояние кнопок
        const prevBtn = document.getElementById('prevSlide');
        const nextBtn = document.getElementById('nextSlide');
        
        if (prevBtn) {
            prevBtn.disabled = this.currentSlide === 1;
        }
        
        if (nextBtn) {
            nextBtn.disabled = this.currentSlide === this.totalSlides;
        }
    }
    
    updateProgress() {
        // В этой презентации нет прогресс-бара, но можно добавить
        const progress = (this.currentSlide / this.totalSlides) * 100;
        // Можно обновлять какой-то индикатор прогресса
    }
}

// ===== КЛАСС ДЛЯ ФАЙЛОВОГО ЗАДАНИЯ =====
class FileBuilderTask {
    constructor() {
        this.selectedFiles = [];
        this.requiredFiles = ['Dockerfile', 'docker-compose.yml', 'requirements.txt', 'settings.py'];
        this.startTime = Date.now();
        this.timerInterval = null;
        this.taskCompleted = false;
        
        this.codeBlocks = [
            {
                id: 'dockerfile',
                name: 'Dockerfile',
                type: 'Docker',
                content: `FROM python:3.11-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install -r requirements.txt\nCOPY . .\nCMD ["gunicorn", "config.wsgi:application"]`,
                correct: true
            },
            {
                id: 'docker-compose',
                name: 'docker-compose.yml',
                type: 'YAML',
                content: `version: '3.8'\nservices:\n  web:\n    build: .\n    ports:\n      - "8000:8000"\n  db:\n    image: postgres:15`,
                correct: true
            },
            {
                id: 'requirements',
                name: 'requirements.txt',
                type: 'Text',
                content: `Django>=5.0\ngunicorn\npsycopg2-binary\npillow`,
                correct: true
            },
            {
                id: 'settings',
                name: 'settings.py',
                type: 'Python',
                content: `DATABASES = {\n    'default': {\n        'ENGINE': 'django.db.backends.postgresql',\n        'HOST': 'db'\n    }\n}`,
                correct: true
            },
            {
                id: 'readme',
                name: 'README.md',
                type: 'Markdown',
                content: `# Django Docker Project\nПроект на Django с Docker`,
                correct: false
            },
            {
                id: 'gitignore',
                name: '.gitignore',
                type: 'Text',
                content: `__pycache__/\n*.pyc\n.env\n.DS_Store`,
                correct: false
            }
        ];
        
        this.init();
    }
    
    init() {
        this.startTimer();
        this.renderCodeBlocks();
        this.setupEventListeners();
        this.updateStats();
    }
    
    startTimer() {
        this.timerInterval = setInterval(() => {
            this.updateTimer();
        }, 1000);
    }
    
    updateTimer() {
        const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        const timerElement = document.getElementById('taskTimer');
        
        if (timerElement) {
            timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
    }
    
    renderCodeBlocks() {
        const blocksPool = document.getElementById('blocksPool');
        if (!blocksPool) return;
        
        blocksPool.innerHTML = this.codeBlocks.map(block => `
            <div class="code-block-draggable" data-block-id="${block.id}" draggable="true">
                <div class="block-header">
                    <span class="block-name">${block.name}</span>
                    <span class="block-type">${block.type}</span>
                </div>
                <div class="block-content">
                    <pre>${block.content.substring(0, 80)}...</pre>
                </div>
            </div>
        `).join('');
        
        this.setupDragAndDrop();
    }
    
    setupDragAndDrop() {
        const blocksPool = document.getElementById('blocksPool');
        const filesPreview = document.getElementById('filesPreview');
        
        if (!blocksPool || !filesPreview) return;
        
        // Drag start для блоков
        blocksPool.addEventListener('dragstart', (e) => {
            if (e.target.classList.contains('code-block-draggable')) {
                const blockId = e.target.dataset.blockId;
                e.dataTransfer.setData('text/plain', blockId);
                e.target.classList.add('dragging');
            }
        });
        
        blocksPool.addEventListener('dragend', (e) => {
            if (e.target.classList.contains('code-block-draggable')) {
                e.target.classList.remove('dragging');
            }
        });
        
        // Drop в область файлов
        filesPreview.addEventListener('dragover', (e) => {
            e.preventDefault();
            filesPreview.classList.add('drag-over');
        });
        
        filesPreview.addEventListener('dragleave', () => {
            filesPreview.classList.remove('drag-over');
        });
        
        filesPreview.addEventListener('drop', (e) => {
            e.preventDefault();
            filesPreview.classList.remove('drag-over');
            
            const blockId = e.dataTransfer.getData('text/plain');
            this.addFileToProject(blockId);
        });
    }
    
    addFileToProject(blockId) {
        // Проверяем, не добавлен ли уже этот файл
        if (this.selectedFiles.some(f => f.id === blockId)) {
            this.showNotification('Этот файл уже добавлен!', 'warning');
            return;
        }
        
        // Проверяем, не превышен ли лимит файлов
        if (this.selectedFiles.length >= 4) {
            this.showNotification('Можно добавить только 4 файла!', 'warning');
            return;
        }
        
        const block = this.codeBlocks.find(b => b.id === blockId);
        if (!block) return;
        
        this.selectedFiles.push(block);
        this.renderFilesPreview();
        this.updateStats();
        
        // Обновляем состояние блока в пуле
        this.updateBlockInPool(blockId, true);
    }
    
    removeFileFromProject(blockId) {
        this.selectedFiles = this.selectedFiles.filter(f => f.id !== blockId);
        this.renderFilesPreview();
        this.updateStats();
        
        // Обновляем состояние блока в пуле
        this.updateBlockInPool(blockId, false);
    }
    
    updateBlockInPool(blockId, used) {
        const blockElement = document.querySelector(`[data-block-id="${blockId}"]`);
        if (blockElement) {
            blockElement.classList.toggle('used', used);
            if (used) {
                blockElement.style.opacity = '0.3';
                blockElement.style.cursor = 'not-allowed';
            } else {
                blockElement.style.opacity = '1';
                blockElement.style.cursor = 'grab';
            }
        }
    }
    
    renderFilesPreview() {
        const filesPreview = document.getElementById('filesPreview');
        if (!filesPreview) return;
        
        if (this.selectedFiles.length === 0) {
            filesPreview.innerHTML = `
                <div class="empty-files">
                    <i class="fas fa-file-code"></i>
                    <p>Перетащите сюда блоки кода из списка</p>
                </div>
            `;
        } else {
            let html = '<div class="files-list">';
            
            this.selectedFiles.forEach(file => {
                html += `
                    <div class="file-item">
                        <div class="file-header">
                            <div class="file-name">
                                <i class="fas fa-file"></i>
                                <span>${file.name}</span>
                            </div>
                            <button class="remove-file-btn" data-file-id="${file.id}">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        <div class="file-content">
                            <pre>${file.content}</pre>
                        </div>
                    </div>
                `;
            });
            
            html += '</div>';
            filesPreview.innerHTML = html;
            
            // Добавляем обработчики для кнопок удаления
            filesPreview.querySelectorAll('.remove-file-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const fileId = e.target.closest('.remove-file-btn').dataset.fileId;
                    this.removeFileFromProject(fileId);
                });
            });
        }
    }
    
    updateStats() {
        const filesCount = document.getElementById('filesCount');
        const pointsCounter = document.getElementById('taskPoints');
        const correctFiles = document.getElementById('correctFiles');
        
        if (filesCount) {
            filesCount.textContent = `${this.selectedFiles.length} файлов`;
        }
        
        if (pointsCounter) {
            const correctSelected = this.selectedFiles.filter(f => f.correct).length;
            pointsCounter.textContent = `${correctSelected}/4`;
        }
        
        if (correctFiles) {
            const correctSelected = this.selectedFiles.filter(f => f.correct).length;
            correctFiles.textContent = `${correctSelected}/4 правильно`;
        }
        
        // Обновляем состояние кнопки проверки
        const checkBtn = document.getElementById('checkFiles');
        if (checkBtn) {
            checkBtn.disabled = this.selectedFiles.length === 0;
        }
    }
    
    setupEventListeners() {
        // Кнопки управления
        document.getElementById('resetFiles')?.addEventListener('click', () => this.resetTask());
        document.getElementById('checkFiles')?.addEventListener('click', () => this.checkSolution());
        document.getElementById('showFilesHint')?.addEventListener('click', () => this.showHint());
    }
    
    checkSolution() {
        if (this.selectedFiles.length === 0) {
            this.showNotification('Добавьте файлы в проект!', 'warning');
            return;
        }
        
        if (this.selectedFiles.length !== 4) {
            this.showNotification('Нужно выбрать ровно 4 файла!', 'warning');
            return;
        }
        
        const correctSelected = this.selectedFiles.filter(f => f.correct).length;
        const incorrectSelected = this.selectedFiles.filter(f => !f.correct);
        
        // Показываем результат
        this.showResult(correctSelected, incorrectSelected);
        
        if (correctSelected === 4 && this.selectedFiles.length === 4) {
            this.taskCompleted = true;
            this.calculateScore();
        }
    }
    
    showResult(correctCount, incorrectFiles) {
        const resultElement = document.getElementById('taskResult');
        const messageElement = document.getElementById('resultMessage');
        
        if (!resultElement || !messageElement) return;
        
        if (correctCount === 4) {
            messageElement.textContent = 'Вы правильно выбрали все 4 файла! Проект готов к сборке!';
            messageElement.style.color = 'var(--success)';
            this.showNotification('Отлично! Все файлы выбраны правильно! 🎉', 'success');
            
            // Добавляем лог в терминал
            if (window.presentation) {
                window.presentation.terminalLog('✅ Практическое задание выполнено успешно!');
                window.presentation.terminalLog('   Все необходимые файлы для Docker развертывания собраны.');
            }
        } else {
            let message = `Вы правильно выбрали ${correctCount} из 4 файлов.`;
            
            if (incorrectFiles.length > 0) {
                const incorrectNames = incorrectFiles.map(f => f.name).join(', ');
                message += ` Файлы "${incorrectNames}" не являются обязательными для Docker развертывания.`;
            }
            
            messageElement.textContent = message;
            messageElement.style.color = 'var(--text-primary)';
            
            this.showNotification(`Есть ошибки! Правильно выбрано ${correctCount} из 4 файлов.`, 'warning');
        }
        
        resultElement.style.display = 'block';
        setTimeout(() => {
            resultElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
    }
    
    calculateScore() {
        const timeElapsed = Math.floor((Date.now() - this.startTime) / 1000);
        let score = 100;
        
        // Штраф за время (потеря 1 очка за каждые 30 секунд)
        score -= Math.floor(timeElapsed / 30);
        
        // Минимальный балл
        score = Math.max(score, 50);
        
        // Обновляем счет
        const scoreElement = document.getElementById('taskScore');
        if (scoreElement) {
            scoreElement.textContent = score;
        }
        
        return score;
    }
    
    showHint() {
        const hintFiles = this.requiredFiles.join(', ');
        this.showNotification(`Подсказка: Обязательные файлы - ${hintFiles}`, 'info');
    }
    
    resetTask() {
        this.selectedFiles = [];
        this.renderFilesPreview();
        this.renderCodeBlocks();
        this.updateStats();
        
        // Скрываем результат
        const resultElement = document.getElementById('taskResult');
        if (resultElement) {
            resultElement.style.display = 'none';
        }
        
        this.showNotification('Задание сброшено! Попробуйте еще раз. 🔄', 'info');
    }
    
    showNotification(message, type = 'info') {
        // Создаем элемент уведомления
        const notification = document.createElement('div');
        notification.className = `terminal-notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: ${type === 'success' ? 'var(--success)' : 
                        type === 'warning' ? 'var(--warning)' : 
                        type === 'danger' ? 'var(--danger)' : 'var(--info)'};
            color: white;
            border-radius: var(--radius-md);
            z-index: 2000;
            animation: slideInRight 0.3s ease;
            box-shadow: var(--shadow-lg);
            font-family: 'JetBrains Mono', monospace;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    window.presentation = new Presentation();
    
    // Добавляем анимации для блоков кода
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        .terminal-notification {
            animation: slideInRight 0.3s ease;
        }
        
        .file-item {
            background: var(--bg-input);
            border-radius: var(--radius-md);
            margin-bottom: 1rem;
            overflow: hidden;
            border: 1px solid var(--bg-tertiary);
            transition: var(--transition-base);
        }
        
        .file-item:hover {
            border-color: var(--primary);
            box-shadow: var(--shadow-md);
        }
        
        .file-item .file-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.75rem 1rem;
            background: rgba(0, 180, 216, 0.05);
            border-bottom: 1px solid var(--bg-tertiary);
        }
        
        .file-name {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: var(--primary);
            font-weight: 500;
        }
        
        .remove-file-btn {
            background: none;
            border: none;
            color: var(--text-secondary);
            cursor: pointer;
            padding: 0.25rem;
            border-radius: var(--radius-sm);
            transition: var(--transition-base);
        }
        
        .remove-file-btn:hover {
            background: var(--danger);
            color: white;
        }
        
        .file-content {
            padding: 1rem;
            max-height: 150px;
            overflow-y: auto;
        }
        
        .file-content pre {
            margin: 0;
            font-size: 0.8rem;
            color: var(--text-secondary);
            font-family: 'JetBrains Mono', monospace;
        }
        
        /* Терминальный вывод */
        .terminal-output-panel {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: var(--bg-secondary);
            border-top: 1px solid var(--bg-tertiary);
            z-index: 1000;
            max-height: 300px;
            display: flex;
            flex-direction: column;
        }
        
        .terminal-output-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.75rem 1rem;
            background: var(--bg-tertiary);
            border-bottom: 1px solid var(--bg-input);
        }
        
        .terminal-output-content {
            flex: 1;
            padding: 1rem;
            overflow-y: auto;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.9rem;
            line-height: 1.6;
        }
        
        .terminal-clear-btn {
            background: var(--bg-input);
            color: var(--text-secondary);
            border: 1px solid var(--bg-tertiary);
            padding: 0.25rem 0.75rem;
            border-radius: var(--radius-sm);
            font-size: 0.8rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 0.25rem;
            transition: var(--transition-base);
        }
        
        .terminal-clear-btn:hover {
            background: var(--bg-tertiary);
            color: var(--text-primary);
            border-color: var(--primary);
        }
        
        /* Стили для итогового проекта */
        .project-download {
            margin: 2rem 0;
        }
        
        .download-card {
            background: var(--gradient-card);
            border-radius: var(--radius-lg);
            padding: 2rem;
            display: flex;
            align-items: center;
            gap: 1.5rem;
            border: 1px solid var(--bg-tertiary);
        }
        
        .download-icon {
            font-size: 3rem;
            color: var(--primary);
        }
        
        .download-content h4 {
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
            color: var(--text-primary);
        }
        
        .download-content p {
            color: var(--text-secondary);
            margin-bottom: 1rem;
        }
        
        .download-btn {
            background: var(--gradient-primary);
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: var(--radius-md);
            font-family: inherit;
            font-weight: 500;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            transition: var(--transition-base);
        }
        
        .download-btn:hover {
            transform: translateY(-2px);
            box-shadow: var(--glow-primary);
        }
        
        /* Структура проекта */
        .structure-tree {
            background: #1a1a1a;
            border-radius: var(--radius-md);
            padding: 1.5rem;
            overflow-x: auto;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.9rem;
            color: var(--text-secondary);
            border: 1px solid var(--bg-tertiary);
        }
        
        /* Адаптивность */
        @media (max-width: 768px) {
            .tech-stack {
                flex-direction: column;
            }
            
            .tech-arrow {
                transform: rotate(90deg);
            }
            
            .objectives-grid {
                grid-template-columns: 1fr;
            }
            
            .blocks-grid {
                grid-template-columns: 1fr;
            }
            
            .download-card {
                flex-direction: column;
                text-align: center;
            }
            
            .terminal-output-panel {
                max-height: 200px;
            }
        }
        
        /* Анимация появления элементов */
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .slide-body > * {
            animation: fadeInUp 0.5s ease forwards;
            opacity: 0;
        }
        
        .slide-body > *:nth-child(1) { animation-delay: 0.1s; }
        .slide-body > *:nth-child(2) { animation-delay: 0.2s; }
        .slide-body > *:nth-child(3) { animation-delay: 0.3s; }
        .slide-body > *:nth-child(4) { animation-delay: 0.4s; }
        
        /* Подсветка активного элемента */
        .nav-link.active {
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0%, 100% { box-shadow: var(--glow-primary); }
            50% { box-shadow: 0 0 5px rgba(0, 180, 216, 0.5); }
        }
        
        /* Эффект для кнопок */
        .control-btn:hover, .check-btn:hover, .run-test-btn:hover {
            animation: bounce 0.3s ease;
        }
        
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-3px); }
        }
    `;
    document.head.appendChild(style);
});

// Глобальные хоткеи для разработчиков
document.addEventListener('keydown', (e) => {
    // Ctrl+Shift+T для тестовой команды
    if (e.ctrlKey && e.shiftKey && e.key === 'T') {
        if (window.presentation) {
            window.presentation.terminalLog('🧪 Запуск тестовой команды...');
            window.presentation.terminalLog('   docker run --rm hello-world');
            setTimeout(() => {
                window.presentation.terminalLog('   Hello from Docker!', 'success');
                window.presentation.terminalLog('   ✅ Docker работает корректно!', 'success');
            }, 1000);
        }
        e.preventDefault();
    }
    
    // Ctrl+Shift+S для перехода к заданию
    if (e.ctrlKey && e.shiftKey && e.key === 'S') {
        if (window.presentation) {
            window.presentation.goToSlide(6);
        }
        e.preventDefault();
    }
});