// Основной скрипт презентации

class Presentation {
    constructor() {
        this.currentSlide = 1;
        this.totalSlides = 5;
        this.quizAnswers = {};
        this.interactiveTask = null;
        
        this.init();
    }
    
    init() {
        // Инициализация навигации
        this.setupNavigation();
        
        // Инициализация квизов
        this.setupQuizzes();
        
        // Инициализация SQL редактора
        this.setupSQLEditor();
        
        // Инициализация drag & drop
        this.setupDragDrop();
        
        // Обновление прогресс-бара
        this.updateProgress();
        
        // Добавляем обработчик клавиатуры
        this.setupKeyboardNavigation();
        
        // Инициализируем интерактивное задание
        this.setupInteractiveTask();
    }
    
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const prevBtn = document.getElementById('prevSlide');
        const nextBtn = document.getElementById('nextSlide');
        const restartBtn = document.getElementById('restartCourse');
        
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
        
        // Перезапуск курса
        if (restartBtn) {
            restartBtn.addEventListener('click', () => this.goToSlide(1));
        }
    }
    
    setupInteractiveTask() {
        // Инициализируем задание, когда переходим на 5-й слайд
        const checkForTask = () => {
            if (this.currentSlide === 5 && !this.interactiveTask) {
                setTimeout(() => {
                    this.interactiveTask = new InteractiveTask();
                }, 500);
            }
        };
        
        // Проверяем при каждом переходе
        const originalGoToSlide = this.goToSlide.bind(this);
        this.goToSlide = (slideNumber) => {
            originalGoToSlide(slideNumber);
            checkForTask();
        };
        
        // Проверяем сразу
        checkForTask();
    }
    
    setupQuizzes() {
        const quizOptions = document.querySelectorAll('.quiz-option');
        
        quizOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                const isCorrect = e.target.dataset.answer === 'correct';
                const quiz = e.target.closest('.quiz');
                
                // Отключаем все кнопки в этом квизе
                quiz.querySelectorAll('.quiz-option').forEach(btn => {
                    btn.disabled = true;
                });
                
                // Показываем правильные/неправильные ответы
                quiz.querySelectorAll('.quiz-option').forEach(btn => {
                    if (btn.dataset.answer === 'correct') {
                        btn.classList.add('correct');
                    } else if (btn === e.target && !isCorrect) {
                        btn.classList.add('wrong');
                    }
                });
                
                // Показываем сообщение
                if (isCorrect) {
                    this.showNotification('Правильно! 🎉', 'success');
                } else {
                    this.showNotification('Попробуйте еще раз! 💡', 'warning');
                }
                
                // Сохраняем результат
                const slideId = quiz.closest('.slide').id;
                this.quizAnswers[slideId] = isCorrect;
            });
        });
    }
    
    setupSQLEditor() {
        const runBtn = document.getElementById('runQuery');
        const sqlEditor = document.getElementById('sqlEditor');
        const resultTable = document.getElementById('queryResult');
        const tableSelect = document.getElementById('tableSelect');
        
        if (!runBtn || !sqlEditor) return;
        
        // Примеры данных
        const sampleData = {
            students: [
                { id: 1, имя: 'Иван', фамилия: 'Иванов', группа: 'ИВТ-101', курс: 'Информатика' },
                { id: 2, имя: 'Анна', фамилия: 'Петрова', группа: 'М-202', курс: 'Математика' },
                { id: 3, имя: 'Алексей', фамилия: 'Сидоров', группа: 'Ф-303', курс: 'Физика' },
                { id: 4, имя: 'Мария', фамилия: 'Козлова', группа: 'ИВТ-101', курс: 'Информатика' },
                { id: 5, имя: 'Дмитрий', фамилия: 'Николаев', группа: 'М-202', курс: 'Математика' }
            ],
            teachers: [
                { id: 1, имя: 'Петр', фамилия: 'Смирнов', кафедра: 'Программирование' },
                { id: 2, имя: 'Ольга', фамилия: 'Иванова', кафедра: 'Математика' },
                { id: 3, имя: 'Сергей', фамилия: 'Петров', кафедра: 'Физика' }
            ],
            courses: [
                { id: 1, название: 'Базы данных', преподаватель: 'Петр Смирнов' },
                { id: 2, название: 'Математический анализ', преподаватель: 'Ольга Иванова' },
                { id: 3, название: 'Физика', преподаватель: 'Сергей Петров' }
            ]
        };
        
        runBtn.addEventListener('click', () => {
            const query = sqlEditor.value.trim().toLowerCase();
            const table = tableSelect.value;
            
            // Простая имитация SQL парсера
            let results = [...sampleData[table]];
            
            if (query.includes('where')) {
                // Базовая фильтрация
                if (query.includes('информатика')) {
                    results = results.filter(r => r.курс === 'Информатика');
                }
                if (query.includes('математика')) {
                    results = results.filter(r => r.курс === 'Математика');
                }
                if (query.includes('ивт')) {
                    results = results.filter(r => r.группа.includes('ИВТ'));
                }
            }
            
            if (query.includes('order by')) {
                // Базовая сортировка
                if (query.includes('id')) {
                    results.sort((a, b) => a.id - b.id);
                }
                if (query.includes('имя')) {
                    results.sort((a, b) => a.имя.localeCompare(b.имя));
                }
            }
            
            // Отображение результатов
            this.displaySQLResults(results, resultTable);
            
            // Анимация кнопки
            runBtn.classList.add('running');
            setTimeout(() => runBtn.classList.remove('running'), 500);
            
            this.showNotification('Запрос выполнен успешно! ✅', 'success');
        });
        
        // Подсказки при наборе
        sqlEditor.addEventListener('input', () => {
            this.highlightSQL(sqlEditor);
        });
        
        // Инициализация подсветки
        this.highlightSQL(sqlEditor);
    }
    
    highlightSQL(textarea) {
        const keywords = ['select', 'from', 'where', 'insert', 'update', 'delete', 'create', 
                         'table', 'drop', 'alter', 'order by', 'group by', 'join', 'inner', 
                         'left', 'right', 'on', 'as', 'and', 'or', 'not', 'null', 'like'];
        
        let code = textarea.value;
        
        // Подсветка ключевых слов
        keywords.forEach(keyword => {
            const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
            code = code.replace(regex, `<span class="sql-keyword">${keyword}</span>`);
        });
        
        // Подсветка строк
        code = code.replace(/'([^']+)'/g, `<span class="sql-string">'$1'</span>`);
        
        // Подсветка чисел
        code = code.replace(/\b\d+\b/g, `<span class="sql-number">$&</span>`);
        
        // Создаем скрытый div для подсветки синтаксиса
        const pre = textarea.previousElementSibling;
        if (!pre || !pre.classList.contains('sql-highlight')) {
            const div = document.createElement('div');
            div.className = 'sql-highlight';
            div.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                padding: 1rem;
                font-family: 'Courier New', monospace;
                font-size: 1rem;
                line-height: 1.5;
                color: transparent;
                pointer-events: none;
                overflow: hidden;
                white-space: pre-wrap;
                word-wrap: break-word;
            `;
            textarea.parentNode.style.position = 'relative';
            textarea.parentNode.appendChild(div);
        }
        
        const highlightDiv = textarea.parentNode.querySelector('.sql-highlight');
        highlightDiv.innerHTML = code;
    }
    
    displaySQLResults(data, container) {
        if (!data || data.length === 0) {
            container.innerHTML = '<div class="no-results">Нет данных</div>';
            return;
        }
        
        const headers = Object.keys(data[0]);
        let html = '<table class="result-table-inner">';
        
        // Заголовок таблицы
        html += '<thead><tr>';
        headers.forEach(header => {
            html += `<th>${header}</th>`;
        });
        html += '</tr></thead>';
        
        // Тело таблицы
        html += '<tbody>';
        data.forEach(row => {
            html += '<tr>';
            headers.forEach(header => {
                html += `<td>${row[header] || 'NULL'}</td>`;
            });
            html += '</tr>';
        });
        html += '</tbody></table>';
        
        container.innerHTML = html;
        
        // Анимация появления строк
        const rows = container.querySelectorAll('tr');
        rows.forEach((row, index) => {
            row.style.animationDelay = `${index * 0.1}s`;
            row.classList.add('fade-in-row');
        });
    }
    
    setupDragDrop() {
        const designArea = document.getElementById('designArea');
        const addTableBtn = document.querySelector('.add-table-btn');
        
        if (!designArea) return;
        
        // Делаем таблицы перетаскиваемыми
        const tables = designArea.querySelectorAll('.table-design');
        tables.forEach(table => {
            table.setAttribute('draggable', 'true');
            
            table.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', table.innerHTML);
                table.classList.add('dragging');
            });
            
            table.addEventListener('dragend', () => {
                table.classList.remove('dragging');
            });
        });
        
        // Разрешаем бросать в область дизайна
        designArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            designArea.classList.add('drag-over');
        });
        
        designArea.addEventListener('dragleave', () => {
            designArea.classList.remove('drag-over');
        });
        
        designArea.addEventListener('drop', (e) => {
            e.preventDefault();
            designArea.classList.remove('drag-over');
            
            // Создаем новую таблицу
            const tableHTML = e.dataTransfer.getData('text/plain');
            const newTable = document.createElement('div');
            newTable.className = 'table-design';
            newTable.innerHTML = tableHTML;
            newTable.setAttribute('draggable', 'true');
            
            // Позиционируем относительно места drop
            const rect = designArea.getBoundingClientRect();
            newTable.style.position = 'absolute';
            newTable.style.left = `${e.clientX - rect.left - 50}px`;
            newTable.style.top = `${e.clientY - rect.top - 50}px`;
            
            designArea.appendChild(newTable);
            
            // Добавляем события для новой таблицы
            this.setupTableEvents(newTable);
            
            this.showNotification('Таблица добавлена! 📊', 'success');
        });
        
        // Кнопка добавления таблицы
        if (addTableBtn) {
            addTableBtn.addEventListener('click', () => {
                const newTable = document.createElement('div');
                newTable.className = 'table-design';
                newTable.setAttribute('draggable', 'true');
                newTable.innerHTML = `
                    <div class="table-header">
                        <h5>новая_таблица</h5>
                    </div>
                    <div class="table-fields">
                        <div class="field pk">id INT PK</div>
                        <div class="field">поле1 VARCHAR</div>
                        <div class="field">поле2 INT</div>
                    </div>
                `;
                
                designArea.appendChild(newTable);
                this.setupTableEvents(newTable);
                
                this.showNotification('Новая таблица создана! 🆕', 'success');
            });
        }
    }
    
    setupTableEvents(table) {
        table.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', table.innerHTML);
            table.classList.add('dragging');
        });
        
        table.addEventListener('dragend', () => {
            table.classList.remove('dragging');
        });
        
        // Редактирование по двойному клику
        table.addEventListener('dblclick', () => {
            const header = table.querySelector('.table-header h5');
            const oldName = header.textContent;
            const newName = prompt('Введите новое имя таблицы:', oldName);
            
            if (newName && newName !== oldName) {
                header.textContent = newName;
                this.showNotification(`Таблица переименована в "${newName}"`, 'info');
            }
        });
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
            if (e.key >= '1' && e.key <= '5') {
                this.goToSlide(parseInt(e.key));
            }
            
            // Escape для сброса
            if (e.key === 'Escape') {
                this.showNotification('Презентация активна', 'info');
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
            this.updateProgress();
            
            // Прокручиваем к началу слайда
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Показываем уведомление для первого и последнего слайда
            if (slideNumber === 1) {
                this.showNotification('Начало презентации 🚀', 'info');
            } else if (slideNumber === this.totalSlides) {
                this.showNotification('Последний слайд! 🎉', 'success');
            }
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
            prevBtn.classList.toggle('disabled', this.currentSlide === 1);
        }
        
        if (nextBtn) {
            nextBtn.disabled = this.currentSlide === this.totalSlides;
            nextBtn.classList.toggle('disabled', this.currentSlide === this.totalSlides);
        }
    }
    
    updateProgress() {
        const progress = (this.currentSlide / this.totalSlides) * 100;
        const progressBar = document.getElementById('progressBar');
        
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
    }
    
    showNotification(message, type = 'info') {
        // Создаем элемент уведомления
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
            </div>
        `;
        
        // Стили уведомления
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'warning' ? '#f59e0b' : '#3b82f6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            z-index: 2000;
            transform: translateX(150%);
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            max-width: 300px;
        `;
        
        document.body.appendChild(notification);
        
        // Анимация появления
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Автоматическое скрытие
        setTimeout(() => {
            notification.style.transform = 'translateX(150%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    // Статистика прохождения
    getProgressStats() {
        const completedQuizzes = Object.values(this.quizAnswers).filter(Boolean).length;
        const totalQuizzes = Object.keys(this.quizAnswers).length;
        
        return {
            completedQuizzes,
            totalQuizzes,
            progressPercentage: totalQuizzes > 0 ? Math.round((completedQuizzes / totalQuizzes) * 100) : 0
        };
    }
}

// ===== КЛАСС ДЛЯ ИНТЕРАКТИВНОГО ЗАДАНИЯ =====
class InteractiveTask {
    constructor() {
        this.selectedFields = [];
        this.correctFields = ['id', 'имя', 'фамилия', 'группа', 'курс'];
        this.startTime = null;
        this.timerInterval = null;
        this.taskCompleted = false;
        
        this.fieldsPool = [
            {
                id: 'id',
                name: 'id',
                type: 'INT PRIMARY KEY',
                description: 'Уникальный идентификатор студента',
                correct: true
            },
            {
                id: 'имя',
                name: 'имя',
                type: 'VARCHAR(50)',
                description: 'Имя студента',
                correct: true
            },
            {
                id: 'фамилия',
                name: 'фамилия',
                type: 'VARCHAR(50)',
                description: 'Фамилия студента',
                correct: true
            },
            {
                id: 'группа',
                name: 'группа',
                type: 'VARCHAR(20)',
                description: 'Учебная группа',
                correct: true
            },
            {
                id: 'курс',
                name: 'курс',
                type: 'VARCHAR(50)',
                description: 'Название учебного курса',
                correct: true
            },
            {
                id: 'любимый_цвет',
                name: 'любимый_цвет',
                type: 'VARCHAR(20)',
                description: 'Любимый цвет студента',
                correct: false
            },
            {
                id: 'рост',
                name: 'рост',
                type: 'INT',
                description: 'Рост в сантиметрах',
                correct: false
            },
            {
                id: 'номер_паспорта',
                name: 'номер_паспорта',
                type: 'VARCHAR(20)',
                description: 'Номер паспорта',
                correct: false
            },
            {
                id: 'адрес_проживания',
                name: 'адрес_проживания',
                type: 'TEXT',
                description: 'Полный домашний адрес',
                correct: false
            }
        ];
        
        this.init();
    }
    
    init() {
        this.startTimer();
        this.renderFieldsPool();
        this.setupEventListeners();
        this.updateStats();
        
        // Показываем начальное уведомление
        this.showNotification('Добавьте 5 полей в таблицу "студенты"!', 'info');
    }
    
    startTimer() {
        this.startTime = Date.now();
        this.timerInterval = setInterval(() => {
            this.updateTimer();
        }, 1000);
    }
    
    updateTimer() {
        const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        const timerElement = document.getElementById('timer');
        
        if (timerElement) {
            timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
    }
    
    renderFieldsPool() {
        const poolElement = document.getElementById('fieldsPool');
        if (!poolElement) return;
        
        poolElement.innerHTML = this.fieldsPool.map(field => `
            <div class="field-item" data-field-id="${field.id}" draggable="true">
                <div class="field-header">
                    <span class="field-name">${field.name}</span>
                    <span class="field-type">${field.type}</span>
                </div>
                <div class="field-description">${field.description}</div>
            </div>
        `).join('');
    }
    
    setupEventListeners() {
        // Drag & Drop для полей
        this.setupDragAndDrop();
        
        // Кнопки управления
        document.getElementById('resetFields')?.addEventListener('click', () => this.resetTask());
        document.getElementById('checkSolution')?.addEventListener('click', () => this.checkSolution());
        document.getElementById('showSolution')?.addEventListener('click', () => this.showHint());
        document.getElementById('completeTask')?.addEventListener('click', () => this.completeCourse());
    }
    
    setupDragAndDrop() {
        const fieldsPool = document.getElementById('fieldsPool');
        const tablePreview = document.getElementById('tablePreview');
        
        if (!fieldsPool || !tablePreview) return;
        
        // Drag start для полей в пуле
        fieldsPool.addEventListener('dragstart', (e) => {
            if (e.target.classList.contains('field-item')) {
                const fieldId = e.target.dataset.fieldId;
                e.dataTransfer.setData('text/plain', fieldId);
                e.target.classList.add('dragging');
            }
        });
        
        fieldsPool.addEventListener('dragend', (e) => {
            if (e.target.classList.contains('field-item')) {
                e.target.classList.remove('dragging');
            }
        });
        
        // Drop в область таблицы
        tablePreview.addEventListener('dragover', (e) => {
            e.preventDefault();
            tablePreview.classList.add('drag-over');
        });
        
        tablePreview.addEventListener('dragleave', () => {
            tablePreview.classList.remove('drag-over');
        });
        
        tablePreview.addEventListener('drop', (e) => {
            e.preventDefault();
            tablePreview.classList.remove('drag-over');
            
            const fieldId = e.dataTransfer.getData('text/plain');
            this.addFieldToTable(fieldId);
        });
    }
    
    addFieldToTable(fieldId) {
        // Проверяем, не добавлено ли уже это поле
        if (this.selectedFields.some(f => f.id === fieldId)) {
            this.showNotification('Это поле уже добавлено!', 'warning');
            return;
        }
        
        // Проверяем, не превышен ли лимит полей
        if (this.selectedFields.length >= 5) {
            this.showNotification('Можно добавить только 5 полей!', 'warning');
            return;
        }
        
        const field = this.fieldsPool.find(f => f.id === fieldId);
        if (!field) return;
        
        this.selectedFields.push(field);
        this.renderTablePreview();
        this.updateStats();
        
        // Обновляем состояние поля в пуле
        this.updateFieldInPool(fieldId, true);
        
        // Звуковой эффект
        this.playSound('add');
    }
    
    removeFieldFromTable(fieldId) {
        this.selectedFields = this.selectedFields.filter(f => f.id !== fieldId);
        this.renderTablePreview();
        this.updateStats();
        
        // Обновляем состояние поля в пуле
        this.updateFieldInPool(fieldId, false);
        
        // Звуковой эффект
        this.playSound('remove');
    }
    
    updateFieldInPool(fieldId, used) {
        const fieldElement = document.querySelector(`[data-field-id="${fieldId}"]`);
        if (fieldElement) {
            fieldElement.classList.toggle('used', used);
            if (used) {
                fieldElement.style.opacity = '0.5';
                fieldElement.style.cursor = 'not-allowed';
            } else {
                fieldElement.style.opacity = '1';
                fieldElement.style.cursor = 'grab';
            }
        }
    }
    
    renderTablePreview() {
        const tablePreview = document.getElementById('tablePreview');
        const headerPreview = document.querySelector('.table-header-preview');
        
        if (!tablePreview || !headerPreview) return;
        
        // Очищаем header (оставляем только ID)
        headerPreview.innerHTML = '<div class="field-cell pk">ID</div>';
        
        // Добавляем выбранные поля в header
        this.selectedFields.forEach(field => {
            const fieldElement = document.createElement('div');
            fieldElement.className = 'field-cell';
            fieldElement.innerHTML = `
                ${field.name}
                <button class="remove-btn" data-field-id="${field.id}">
                    <i class="fas fa-times"></i>
                </button>
            `;
            
            headerPreview.appendChild(fieldElement);
            
            // Добавляем обработчик для кнопки удаления
            fieldElement.querySelector('.remove-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                this.removeFieldFromTable(field.id);
            });
        });
        
        // Обновляем body preview
        if (this.selectedFields.length === 0) {
            tablePreview.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-mouse-pointer"></i>
                    <p>Перетащите сюда поля из списка ниже</p>
                </div>
            `;
        } else {
            // Создаем пример данных
            const sampleData = [
                { id: 1, имя: 'Иван', фамилия: 'Иванов', группа: 'ИВТ-101', курс: 'Информатика' },
                { id: 2, имя: 'Анна', фамилия: 'Петрова', группа: 'М-202', курс: 'Математика' },
                { id: 3, имя: 'Алексей', фамилия: 'Сидоров', группа: 'Ф-303', курс: 'Физика' }
            ];
            
            let html = `
                <div class="sample-data">
                    <p><i class="fas fa-info-circle"></i> Таблица готова! Добавлено ${this.selectedFields.length} полей.</p>
                    <div class="sample-table">
            `;
            
            // Добавляем пример данных
            sampleData.forEach(row => {
                html += '<div class="sample-row">';
                html += `<span class="sample-value">${row.id}</span>`;
                
                this.selectedFields.forEach(field => {
                    if (field.id !== 'id') {
                        const value = row[field.id] || '...';
                        html += `<span class="sample-value">${value}</span>`;
                    }
                });
                
                html += '</div>';
            });
            
            html += '</div></div>';
            tablePreview.innerHTML = html;
        }
    }
    
    updateStats() {
        const fieldsCount = document.getElementById('fieldsCount');
        const pointsCounter = document.getElementById('pointsCounter');
        const correctCount = document.getElementById('correctCount');
        
        if (fieldsCount) {
            fieldsCount.textContent = `${this.selectedFields.length} полей`;
        }
        
        if (pointsCounter) {
            const correctSelected = this.selectedFields.filter(f => f.correct).length;
            pointsCounter.textContent = `${correctSelected}/5`;
        }
        
        if (correctCount) {
            const correctSelected = this.selectedFields.filter(f => f.correct).length;
            correctCount.textContent = `${correctSelected}/5 правильно`;
        }
        
        // Обновляем состояние кнопки завершения
        const completeBtn = document.getElementById('completeTask');
        if (completeBtn) {
            const correctSelected = this.selectedFields.filter(f => f.correct).length;
            const isComplete = correctSelected === 5 && this.selectedFields.length === 5;
            completeBtn.disabled = !isComplete;
            
            if (isComplete) {
                completeBtn.style.animation = 'pulse 1s infinite';
            } else {
                completeBtn.style.animation = 'none';
            }
        }
    }
    
    checkSolution() {
        if (this.selectedFields.length === 0) {
            this.showNotification('Добавьте поля в таблицу!', 'warning');
            return;
        }
        
        if (this.selectedFields.length !== 5) {
            this.showNotification('Нужно выбрать ровно 5 полей!', 'warning');
            return;
        }
        
        const correctSelected = this.selectedFields.filter(f => f.correct).length;
        const incorrectSelected = this.selectedFields.filter(f => !f.correct);
        
        // Подсвечиваем поля
        const headerFields = document.querySelectorAll('.table-header-preview .field-cell');
        headerFields.forEach((fieldCell, index) => {
            if (index === 0) return; // Пропускаем ID
            
            const field = this.selectedFields[index - 1];
            fieldCell.classList.remove('correct', 'incorrect');
            fieldCell.classList.add(field.correct ? 'correct' : 'incorrect');
        });
        
        // Звуковой эффект
        if (correctSelected === 5) {
            this.playSound('success');
        } else {
            this.playSound('error');
        }
        
        // Показываем результат
        this.showResult(correctSelected, incorrectSelected);
        
        if (correctSelected === 5 && this.selectedFields.length === 5) {
            this.taskCompleted = true;
            this.calculateScore();
        }
        
        // Увеличиваем счетчик попыток
        const attempts = parseInt(localStorage.getItem('taskAttempts') || '0');
        localStorage.setItem('taskAttempts', (attempts + 1).toString());
    }
    
    showResult(correctCount, incorrectFields) {
        const resultElement = document.getElementById('taskResult');
        const messageElement = document.getElementById('resultMessage');
        
        if (!resultElement || !messageElement) return;
        
        if (correctCount === 5) {
            messageElement.textContent = 'Вы правильно выбрали все 5 полей! Отличная работа!';
            messageElement.style.color = 'var(--success)';
            this.showNotification('Превосходно! Все поля выбраны правильно! 🎉', 'success');
        } else {
            let message = `Вы правильно выбрали ${correctCount} из 5 полей.`;
            
            if (incorrectFields.length > 0) {
                const incorrectNames = incorrectFields.map(f => f.name).join(', ');
                message += ` Поля "${incorrectNames}" не подходят для таблицы студентов.`;
            }
            
            if (this.selectedFields.length < 5) {
                message += ` Выбрано ${this.selectedFields.length} полей, нужно 5.`;
            }
            
            messageElement.textContent = message;
            messageElement.style.color = 'var(--text-primary)';
            
            this.showNotification(`Есть ошибки! Правильно выбрано ${correctCount} из 5 полей.`, 'warning');
        }
        
        resultElement.style.display = 'block';
        setTimeout(() => {
            resultElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
    }
    
    calculateScore() {
        if (!this.startTime) return;
        
        const timeElapsed = Math.floor((Date.now() - this.startTime) / 1000);
        let score = 100;
        
        // Штраф за время (потеря 1 очка за каждые 10 секунд)
        score -= Math.floor(timeElapsed / 10);
        
        // Штраф за неправильные попытки
        const attempts = parseInt(localStorage.getItem('taskAttempts') || '0');
        score -= attempts * 5;
        
        // Минимальный балл
        score = Math.max(score, 50);
        
        // Обновляем счет
        const scoreElement = document.getElementById('score');
        if (scoreElement) {
            scoreElement.textContent = score;
        }
        
        // Сохраняем результат
        localStorage.setItem('taskScore', score.toString());
        localStorage.setItem('taskTime', timeElapsed.toString());
        
        return score;
    }
    
    showHint() {
        const hintFields = this.correctFields.join(', ');
        this.showNotification(`Подсказка: Правильные поля - ${hintFields}`, 'info');
        
        // Увеличиваем счетчик попыток
        const attempts = parseInt(localStorage.getItem('taskAttempts') || '0');
        localStorage.setItem('taskAttempts', (attempts + 1).toString());
        
        // Звуковой эффект
        this.playSound('hint');
    }
    
    resetTask() {
        this.selectedFields = [];
        this.renderTablePreview();
        this.renderFieldsPool();
        this.updateStats();
        
        // Скрываем результат
        const resultElement = document.getElementById('taskResult');
        if (resultElement) {
            resultElement.style.display = 'none';
        }
        
        // Сбрасываем стили полей
        const headerFields = document.querySelectorAll('.table-header-preview .field-cell');
        headerFields.forEach(fieldCell => {
            fieldCell.classList.remove('correct', 'incorrect');
        });
        
        this.showNotification('Задание сброшено! Попробуйте еще раз. 🔄', 'info');
        
        // Звуковой эффект
        this.playSound('reset');
    }
    
    completeCourse() {
        if (!this.taskCompleted) {
            this.showNotification('Сначала выполните задание правильно!', 'warning');
            return;
        }
        
        // Останавливаем таймер
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
        
        // Показываем финальное сообщение
        this.showNotification('Курс успешно завершен! 🎓', 'success');
        
        // Звуковой эффект
        this.playSound('complete');
        
        // Анимация кнопки
        const completeBtn = document.getElementById('completeTask');
        if (completeBtn) {
            completeBtn.style.animation = 'none';
            completeBtn.innerHTML = '<i class="fas fa-check-circle"></i> Курс завершен!';
            completeBtn.style.background = 'var(--gradient-success)';
            completeBtn.disabled = true;
        }
        
        // Прокручиваем к началу слайда
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Показываем финальное сообщение
        setTimeout(() => {
            const finalScore = this.calculateScore();
            const timeElapsed = Math.floor((Date.now() - this.startTime) / 1000);
            const minutes = Math.floor(timeElapsed / 60);
            const seconds = timeElapsed % 60;
            
            alert(`🎉 Поздравляем! Вы успешно завершили курс "Введение в базы данные".\n\n📊 Ваши результаты:\n✅ Правильно выбраны все 5 полей\n⏱️ Время выполнения: ${minutes}:${seconds.toString().padStart(2, '0')}\n⭐ Набрано очков: ${finalScore}\n\nПродолжайте изучать мир баз данных!`);
        }, 500);
    }
    
    playSound(type) {
        // Простая реализация звуков через Web Audio API
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            let frequency = 440;
            let duration = 0.1;
            
            switch(type) {
                case 'add':
                    frequency = 523.25; // C5
                    break;
                case 'remove':
                    frequency = 392.00; // G4
                    break;
                case 'success':
                    frequency = 659.25; // E5
                    duration = 0.3;
                    break;
                case 'error':
                    frequency = 349.23; // F4
                    duration = 0.2;
                    break;
                case 'hint':
                    frequency = 493.88; // B4
                    break;
                case 'reset':
                    frequency = 329.63; // E4
                    break;
                case 'complete':
                    // Мелодия завершения
                    [523.25, 659.25, 783.99].forEach((freq, index) => {
                        setTimeout(() => {
                            const osc = audioContext.createOscillator();
                            const gain = audioContext.createGain();
                            osc.connect(gain);
                            gain.connect(audioContext.destination);
                            osc.frequency.value = freq;
                            gain.gain.value = 0.3;
                            osc.start();
                            gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);
                            osc.stop(audioContext.currentTime + 0.3);
                        }, index * 100);
                    });
                    return;
            }
            
            oscillator.frequency.value = frequency;
            gainNode.gain.value = 0.3;
            
            oscillator.start();
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
            oscillator.stop(audioContext.currentTime + duration);
            
        } catch (e) {
            // Если Web Audio API не поддерживается, ничего не делаем
            console.log('Web Audio API не поддерживается');
        }
    }
    
    showNotification(message, type = 'info') {
        // Используем существующую функцию из основного скрипта
        if (window.presentation && window.presentation.showNotification) {
            window.presentation.showNotification(message, type);
        } else {
            // Фолбэк уведомление
            const notification = document.createElement('div');
            notification.className = `simple-notification ${type}`;
            notification.textContent = message;
            notification.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                padding: 1rem 1.5rem;
                background: ${type === 'success' ? '#10b981' : type === 'warning' ? '#f59e0b' : '#3b82f6'};
                color: white;
                border-radius: 0.5rem;
                z-index: 2000;
                animation: slideIn 0.3s ease;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            `;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        }
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    window.presentation = new Presentation();
    
    // Добавляем глобальные функции для отладки
    window.debugPresentation = {
        goToSlide: (num) => window.presentation?.goToSlide(num),
        getStats: () => window.presentation?.getProgressStats(),
        reset: () => {
            window.presentation = new Presentation();
            window.presentation.goToSlide(1);
        },
        completeTask: () => {
            if (window.presentation?.interactiveTask) {
                window.presentation.interactiveTask.taskCompleted = true;
                window.presentation.interactiveTask.completeCourse();
            }
        }
    };
});

// Добавляем CSS для анимаций и стилей
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    .sql-keyword { color: #569cd6; font-weight: bold; }
    .sql-string { color: #ce9178; }
    .sql-number { color: #b5cea8; }
    
    .fade-in-row {
        animation: fadeInRow 0.5s ease forwards;
    }
    
    @keyframes fadeInRow {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .table-design {
        transition: all 0.3s ease;
        cursor: move;
    }
    
    .table-design.dragging {
        opacity: 0.5;
        transform: scale(1.05);
    }
    
    .table-design:hover {
        box-shadow: 0 10px 25px rgba(99, 102, 241, 0.2);
    }
    
    #designArea.drag-over {
        background: rgba(99, 102, 241, 0.05);
        border: 2px dashed var(--primary);
    }
    
    .notification {
        animation: slideInRight 0.3s ease;
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(150%);
        }
        to {
            transform: translateX(0);
        }
    }
    
    .nav-control.disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
    
    .nav-control.disabled:hover {
        transform: none;
    }
    
    .running {
        animation: pulse 0.5s ease;
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(0.95); }
    }
    
    /* Стили для интерактивного задания */
    @keyframes slideIn {
        from { transform: translateX(150%); }
        to { transform: translateX(0); }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); }
        to { transform: translateX(150%); }
    }
    
    .simple-notification {
        animation: slideIn 0.3s ease;
    }
    
    .table-header-preview .field-cell:first-child {
        position: relative;
    }
    
    .table-header-preview .field-cell:first-child::after {
        content: 'PK';
        font-size: 0.625rem;
        background: var(--success);
        color: white;
        padding: 0.125rem 0.375rem;
        border-radius: var(--radius-sm);
        margin-left: 0.5rem;
    }
    
    .sample-data {
        text-align: center;
        width: 100%;
    }
    
    .sample-data p {
        color: var(--text-secondary);
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
    }
    
    .sample-table {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        align-items: center;
    }
    
    .sample-row {
        display: flex;
        gap: 0.5rem;
        justify-content: center;
        flex-wrap: wrap;
    }
    
    .sample-value {
        padding: 0.5rem 1rem;
        background: var(--bg-tertiary);
        border-radius: var(--radius-md);
        font-family: 'Courier New', monospace;
        font-size: 0.875rem;
        color: var(--text-secondary);
        min-width: 80px;
        text-align: center;
    }
    
    .field-item.dragging {
        opacity: 0.5;
        transform: scale(0.95);
        box-shadow: 0 10px 20px rgba(0,0,0,0.2);
    }
    
    #tablePreview.drag-over {
        background: rgba(99, 102, 241, 0.05);
        border: 2px dashed var(--primary);
    }
    
    .field-cell.correct {
        animation: pulseCorrect 0.5s ease;
    }
    
    .field-cell.incorrect {
        animation: shake 0.5s ease;
    }
    
    @keyframes pulseCorrect {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    .complete-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
    
    .complete-btn:not(:disabled) {
        animation: pulse 1s infinite;
    }
    
    .result-table-inner {
        width: 100%;
        border-collapse: collapse;
    }
    
    .result-table-inner th {
        background: var(--bg-tertiary);
        padding: 0.75rem;
        text-align: left;
        font-weight: 500;
        color: var(--text-primary);
        border-bottom: 2px solid var(--bg-secondary);
    }
    
    .result-table-inner td {
        padding: 0.75rem;
        border-bottom: 1px solid var(--bg-tertiary);
        color: var(--text-secondary);
    }
    
    .result-table-inner tr:hover {
        background: var(--bg-tertiary);
    }
    
    .no-results {
        text-align: center;
        padding: 2rem;
        color: var(--text-light);
        font-style: italic;
    }
    
    /* Адаптивные стили */
    @media (max-width: 768px) {
        .sample-row {
            flex-direction: column;
            align-items: center;
        }
        
        .sample-value {
            width: 100%;
            max-width: 200px;
        }
        
        .fields-controls {
            flex-direction: column;
        }
        
        .control-btn {
            width: 100%;
            justify-content: center;
        }
    }
    
    /* Стили для консоли отладки */
    .debug-panel {
        position: fixed;
        bottom: 10px;
        right: 10px;
        background: rgba(0,0,0,0.9);
        color: white;
        padding: 10px;
        border-radius: 5px;
        font-size: 12px;
        z-index: 9999;
        display: none;
    }
    
    .debug-panel.active {
        display: block;
    }
`;
document.head.appendChild(additionalStyles);

// Глобальные хоткеи для разработчиков
document.addEventListener('keydown', (e) => {
    // Ctrl+Shift+D для отладки
    if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        const debugPanel = document.querySelector('.debug-panel') || (() => {
            const panel = document.createElement('div');
            panel.className = 'debug-panel';
            panel.innerHTML = `
                <div>Debug Mode Active</div>
                <div>Current Slide: <span id="debug-slide">${window.presentation?.currentSlide || 1}</span></div>
                <div>Task Completed: <span id="debug-task">${window.presentation?.interactiveTask?.taskCompleted || false}</span></div>
            `;
            document.body.appendChild(panel);
            return panel;
        })();
        
        debugPanel.classList.toggle('active');
        e.preventDefault();
    }
    
    // Ctrl+Shift+C для автоматического выполнения задания
    if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        if (window.presentation?.interactiveTask && !window.presentation.interactiveTask.taskCompleted) {
            window.presentation.interactiveTask.selectedFields = window.presentation.interactiveTask.fieldsPool.filter(f => f.correct);
            window.presentation.interactiveTask.renderTablePreview();
            window.presentation.interactiveTask.updateStats();
            window.presentation.interactiveTask.checkSolution();
            alert('Задание автоматически выполнено!');
        }
        e.preventDefault();
    }
});