const SLIDES_CONFIG = [
    // Слайд 1: Титульный
    {
        id: 1,
        icon: "🚀",
        title: "Проектирование Баз Данных",
        subtitle: "Полное руководство от концепции до реализации",
        content: `
            <div class="content-grid">
                <div class="theory-card animate-in">
                    <h2>🎯 Цель курса</h2>
                    <p>Освоить полный цикл проектирования баз данных на реальном примере системы колледжа. От анализа требований до готового приложения.</p>
                    
                    <div class="definition">
                        <strong>База данных</strong> - это не просто хранилище информации, а тщательно спроектированная система, обеспечивающая целостность, производительность и масштабируемость.
                    </div>
                    
                    <h3>Что вы узнаете:</h3>
                    <ul>
                        <li>🔍 Анализ предметной области и выявление сущностей</li>
                        <li>📐 Построение ER-диаграмм и нормализация</li>
                        <li>🗃️ Создание оптимальной SQL-схемы</li>
                        <li>🐍 Работа с БД через Python приложения</li>
                        <li>🛠️ Современные инструменты проектирования</li>
                    </ul>
                </div>
                
                <div class="visualization animate-in">
                    <div style="text-align: center; width: 100%;">
                        <div style="font-size: 5rem; margin-bottom: 20px;">🎓</div>
                        <h3 style="color: var(--primary-light); margin-bottom: 15px;">Система Колледжа</h3>
                        <p style="color: var(--text-secondary); line-height: 1.6;">
                            На протяжении всего курса мы будем проектировать базу данных для образовательного учреждения, 
                            что позволит наглядно изучить все этапы разработки на реальном примере.
                        </p>
                        
                        <div style="margin-top: 30px;">
                            <div class="badge">Студенты</div>
                            <div class="badge">Преподаватели</div>
                            <div class="badge">Курсы</div>
                            <div class="badge">Оценки</div>
                            <div class="badge">Расписание</div>
                        </div>
                    </div>
                </div>
            </div>
        `
    },

    // Слайд 2: Что такое БД
    {
        id: 2,
        icon: "📊",
        title: "Что такое База Данных?",
        subtitle: "Фундаментальные понятия и принципы",
        content: `
            <div class="content-grid">
                <div class="theory-card animate-in">
                    <h2>🎯 Основные понятия</h2>
                    <div class="definition">
                        <strong>База данных (БД)</strong> - организованная совокупность структурированных данных, 
                        хранящихся в электронном виде и управляемых системой управления базами данных (СУБД).
                    </div>
                    
                    <h3>Ключевые характеристики БД:</h3>
                    <ul>
                        <li>📁 <strong>Структурированность</strong> - данные организованы по определенным правилам</li>
                        <li>🔄 <strong>Независимость</strong> - данные отделены от прикладных программ</li>
                        <li>🔒 <strong>Целостность</strong> - обеспечение правильности и согласованности данных</li>
                        <li>🛡️ <strong>Безопасность</strong> - контроль доступа и защита от несанкционированного доступа</li>
                        <li>⚡ <strong>Производительность</strong> - эффективное хранение и быстрый доступ</li>
                    </ul>
                    
                    <div class="interactive-question">
                        <strong>💭 Вопрос для размышления:</strong> Чем база данных отличается от простого файла с данными?
                    </div>
                </div>
                
                <div class="visualization animate-in">
                    <div style="width: 100%;">
                        <h3>Компоненты системы БД:</h3>
                        <div class="entities-grid">
                            <div class="entity">🗃️ Данные</div>
                            <div class="entity">⚙️ СУБД</div>
                            <div class="entity">💻 Приложения</div>
                            <div class="entity">👥 Пользователи</div>
                            <div class="entity">📋 Схема</div>
                            <div class="entity">🔍 Запросы</div>
                        </div>
                        
                        <h3 style="margin-top: 30px;">Типы баз данных:</h3>
                        <div style="display: grid; gap: 15px; margin-top: 15px;">
                            <div style="background: var(--bg-accent); padding: 15px; border-radius: 10px; border-left: 4px solid var(--primary);">
                                <strong>Реляционные (SQL)</strong><br>
                                <span style="color: var(--text-secondary); font-size: 0.9rem;">Таблицы со строгими связями - MySQL, PostgreSQL</span>
                            </div>
                            <div style="background: var(--bg-accent); padding: 15px; border-radius: 10px; border-left: 4px solid var(--accent);">
                                <strong>Нереляционные (NoSQL)</strong><br>
                                <span style="color: var(--text-secondary); font-size: 0.9rem;">Документы, графы, ключ-значение - MongoDB, Redis</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    },

    // Слайд 3: Зачем проектирование
    {
        id: 3,
        icon: "⚠️",
        title: "Зачем проектировать БД?",
        subtitle: "Последствия неправильного проектирования",
        content: `
            <div class="content-grid">
                <div class="theory-card animate-in">
                    <h2>🚨 Проблемы без проектирования</h2>
                    <div class="definition">
                        <strong>Проектирование БД</strong> - это процесс создания оптимальной структуры данных, 
                        который предотвращает серьезные проблемы на этапе эксплуатации системы.
                    </div>
                    
                    <h3>Основные аномалии данных:</h3>
                    <ul>
                        <li>📦 <strong>Избыточность данных</strong> - дублирование информации увеличивает объем хранилища и усложняет обновления</li>
                        <li>🔄 <strong>Аномалии обновления</strong> - необходимость изменять одни и те же данные в нескольких местах</li>
                        <li>➕ <strong>Аномалии добавления</strong> - невозможность добавить данные без связанных записей</li>
                        <li>➖ <strong>Аномалии удаления</strong> - случайная потеря данных при удалении связанных записей</li>
                        <li>🔀 <strong>Несогласованность</strong> - противоречивые данные в разных частях системы</li>
                    </ul>
                </div>
                
                <div class="visualization animate-in">
                    <div style="width: 100%;">
                        <h3>Пример проблемы до нормализации:</h3>
                        
                        <div class="image-container">
                            <img src="https://via.placeholder.com/700x300/1a1a1a/10b981?text=Students_Courses_Teachers+Table" 
                                 alt="Таблица Students_Courses_Teachers" 
                                 class="slide-image">
                            <div class="image-caption">Ненормализованная таблица со связанными данными</div>
                        </div>
                        
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>student_name</th>
                                    <th>course_name</th>
                                    <th>grade</th>
                                    <th>teacher_name</th>
                                    <th>department</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Иванов Иван</td>
                                    <td>Математика</td>
                                    <td>5</td>
                                    <td>Петров Пётр</td>
                                    <td>Физмат</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Иванов Иван</td>
                                    <td>Физика</td>
                                    <td>4</td>
                                    <td>Сидоров Иван</td>
                                    <td>Физмат</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Петров Пётр</td>
                                    <td>Математика</td>
                                    <td>4</td>
                                    <td>Петров Пётр</td>
                                    <td>Физмат</td>
                                </tr>
                            </tbody>
                        </table>
                        
                        <div class="interactive-question" style="margin-top: 20px;">
                            <strong>🤔 Проблема:</strong> Какие данные дублируются в этой таблице? 
                            Что произойдет при смене декана факультета?
                        </div>
                    </div>
                </div>
            </div>
        `
    },

    // Слайд 4: Этапы проектирования
    {
        id: 4,
        icon: "🎯",
        title: "Этапы проектирования БД",
        subtitle: "Системный подход от идеи до реализации",
        content: `
            <div class="content-grid">
                <div class="theory-card animate-in">
                    <h2>📋 Процесс проектирования</h2>
                    <div class="definition">
                        <strong>Проектирование БД</strong> - итерационный процесс преобразования 
                        бизнес-требований в конкретную, эффективную и надежную схему данных.
                    </div>
                    
                    <h3>Основные этапы:</h3>
                    <ol>
                        <li>
                            <strong>📝 Анализ требований</strong><br>
                            Изучение предметной области, сбор и анализ требований к данным
                        </li>
                        <li>
                            <strong>🧩 Концептуальное проектирование</strong><br>
                            Создание ER-диаграмм, определение сущностей и связей
                        </li>
                        <li>
                            <strong>📊 Логическое проектирование</strong><br>
                            Нормализация, преобразование в реляционную модель
                        </li>
                        <li>
                            <strong>⚙️ Физическое проектирование</strong><br>
                            Выбор СУБД, оптимизация, индексы, настройка производительности
                        </li>
                        <li>
                            <strong>🚀 Реализация и тестирование</strong><br>
                            Создание БД, написание приложений, тестирование и оптимизация
                        </li>
                    </ol>
                </div>
                
                <div class="visualization animate-in">
                    <div style="width: 100%; text-align: center;">
                        <h3>Визуализация процесса:</h3>
                        <div style="display: flex; flex-direction: column; gap: 15px; margin-top: 20px;">
                            <div class="entity" style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(52, 211, 153, 0.2)); border-color: var(--accent);">
                                <div style="font-size: 1.5rem;">📝</div>
                                <strong>Требования</strong><br>
                                <small style="color: var(--text-secondary);">Что нужно системе?</small>
                            </div>
                            
                            <div style="color: var(--accent); font-size: 1.2rem;">↓</div>
                            
                            <div class="entity" style="background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(129, 140, 248, 0.2)); border-color: var(--primary);">
                                <div style="font-size: 1.5rem;">🧩</div>
                                <strong>ER-Диаграмма</strong><br>
                                <small style="color: var(--text-secondary);">Сущности и связи</small>
                            </div>
                            
                            <div style="color: var(--accent); font-size: 1.2rem;">↓</div>
                            
                            <div class="entity" style="background: linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(251, 191, 36, 0.2)); border-color: var(--warning);">
                                <div style="font-size: 1.5rem;">📊</div>
                                <strong>Схема БД</strong><br>
                                <small style="color: var(--text-secondary);">Таблицы и отношения</small>
                            </div>
                            
                            <div style="color: var(--accent); font-size: 1.2rem;">↓</div>
                            
                            <div class="entity" style="background: linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(252, 165, 165, 0.2)); border-color: #ef4444;">
                                <div style="font-size: 1.5rem;">🚀</div>
                                <strong>Готовая БД</strong><br>
                                <small style="color: var(--text-secondary);">SQL + Приложение</small>
                            </div>
                        </div>
                        
                        <div class="interactive-question" style="margin-top: 25px;">
                            <strong>💡 Запомните:</strong> Каждый этап важен! Пропуск любого из них может привести к серьезным проблемам.
                        </div>
                    </div>
                </div>
            </div>
        `
    },

    // Слайд 5: Концептуальное проектирование
    {
        id: 5,
        icon: "📋",
        title: "Концептуальное проектирование",
        subtitle: "Создание модели предметной области",
        content: `
            <div class="content-grid">
                <div class="theory-card animate-in">
                    <h2>🎨 Создание концептуальной модели</h2>
                    <div class="definition">
                        <strong>Концептуальная модель</strong> - абстрактное представление данных, 
                        независимое от конкретной СУБД и физической реализации. Она описывает "что" хранить, а не "как".
                    </div>
                    
                    <h3>Ключевые компоненты:</h3>
                    <ul>
                        <li>
                            <strong>🔷 Сущности (Entities)</strong><br>
                            Основные объекты предметной области, которые существуют независимо
                        </li>
                        <li>
                            <strong>📋 Атрибуты (Attributes)</strong><br>
                            Характеристики и свойства сущностей
                        </li>
                        <li>
                            <strong>🔗 Связи (Relationships)</strong><br>
                            Отношения и взаимодействия между сущностями
                        </li>
                        <li>
                            <strong>🎯 Ограничения (Constraints)</strong><br>
                            Правила целостности и бизнес-логики
                        </li>
                    </ul>
                    
                    <div class="interactive-question">
                        <strong>💭 Вопрос:</strong> Почему концептуальная модель не зависит от конкретной СУБД?
                    </div>
                </div>
                
                <div class="visualization animate-in">
                    <div style="width: 100%;">
                        <h3>Сущности системы Колледжа:</h3>
                        <div class="entities-grid">
                            <div class="entity">
                                <div style="font-size: 1.2rem;">🎓</div>
                                Студент
                            </div>
                            <div class="entity">
                                <div style="font-size: 1.2rem;">👨‍🏫</div>
                                Преподаватель
                            </div>
                            <div class="entity">
                                <div style="font-size: 1.2rem;">📚</div>
                                Курс
                            </div>
                            <div class="entity">
                                <div style="font-size: 1.2rem;">🏫</div>
                                Кафедра
                            </div>
                            <div class="entity">
                                <div style="font-size: 1.2rem;">📅</div>
                                Занятие
                            </div>
                            <div class="entity">
                                <div style="font-size: 1.2rem;">📝</div>
                                Оценка
                            </div>
                            <div class="entity">
                                <div style="font-size: 1.2rem;">🔗</div>
                                Зачисление
                            </div>
                            <div class="entity">
                                <div style="font-size: 1.2rem;">🏢</div>
                                Факультет
                            </div>
                        </div>
                        
                        <h3 style="margin-top: 25px;">Пример сущности "Студент":</h3>
                        <div style="background: var(--bg-accent); padding: 20px; border-radius: 12px; margin-top: 15px;">
                            <div style="text-align: center; margin-bottom: 15px;">
                                <strong style="color: var(--primary-light);">🎓 Студент (Student)</strong>
                            </div>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 0.9rem;">
                                <div>• student_id (ID)</div>
                                <div>• first_name (Имя)</div>
                                <div>• last_name (Фамилия)</div>
                                <div>• birth_date (Дата рождения)</div>
                                <div>• email (Email)</div>
                                <div>• phone (Телефон)</div>
                                <div>• enrollment_year (Год поступления)</div>
                                <div>• department_id (Кафедра)</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    },

    // Слайд 6: Выявление сущностей
    {
        id: 6,
        icon: "🔍",
        title: "Выявление сущностей",
        subtitle: "Анализ требований системы Колледжа",
        content: `
            <div class="content-grid">
                <div class="theory-card animate-in">
                    <h2>🔎 Методы выявления сущностей</h2>
                    <div class="definition">
                        <strong>Сущность</strong> - это объект, который существует независимо 
                        и имеет значение для системы. Сущности должны быть значимыми и иметь уникальные идентификаторы.
                    </div>
                    
                    <h3>Критерии сущности:</h3>
                    <ul>
                        <li>✅ <strong>Независимое существование</strong> - может существовать самостоятельно</li>
                        <li>✅ <strong>Уникальный идентификатор</strong> - имеет первичный ключ</li>
                        <li>✅ <strong>Множество атрибутов</strong> - описывается характеристиками</li>
                        <li>✅ <strong>Участие в отношениях</strong> - взаимодействует с другими сущностями</li>
                        <li>✅ <strong>Бизнес-значение</strong> - важна для предметной области</li>
                    </ul>
                    
                    <h3>Что НЕ является сущностью:</h3>
                    <ul>
                        <li>❌ Атрибуты других сущностей</li>
                        <li>❌ Временные состояния</li>
                        <li>❌ Вычисляемые значения</li>
                        <li>❌ Вспомогательные данные</li>
                    </ul>
                </div>
                
                <div class="visualization animate-in">
                    <div style="width: 100%;">
                        <h3>Анализ требований Колледжа:</h3>
                        <div style="background: rgba(30, 41, 59, 0.5); padding: 20px; border-radius: 12px; margin-top: 15px;">
                            <div style="color: var(--accent-light); margin-bottom: 10px;"><strong>Функциональные требования:</strong></div>
                            <p>✓ Учет студентов и преподавателей</p>
                            <p>✓ Формирование учебного плана и расписания</p>
                            <p>✓ Ведение успеваемости и оценок</p>
                            <p>✓ Управление кафедрами и факультетами</p>
                            <p>✓ Отчетность по занятиям и посещаемости</p>
                        </div>
                        
                        <div class="interactive-question" style="margin-top: 20px;">
                            <strong>🤔 Задание:</strong> Какие еще сущности могут понадобиться в системе Колледжа? 
                            Попробуйте добавить 2-3 своих сущности.
                        </div>
                        
                        <div style="margin-top: 25px;">
                            <h4>Выявленные сущности:</h4>
                            <div class="code-block">
    Student (Студент)<br>
    Teacher (Преподаватель)<br>
    Course (Курс)<br>
    Department (Кафедра)<br>
    Faculty (Факультет)<br>
    Class (Занятие)<br>
    Grade (Оценка)<br>
    Enrollment (Зачисление)<br>
    Schedule (Расписание)<br>
    Building (Здание)
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    },

    // Слайд 7: Атрибуты сущностей
    {
        id: 7,
        icon: "📋",
        title: "Атрибуты сущностей",
        subtitle: "Свойства и характеристики объектов",
        content: `
            <div class="content-grid">
                <div class="theory-card animate-in">
                    <h2>🎯 Типы атрибутов</h2>
                    <div class="definition">
                        <strong>Атрибут</strong> - характеристика сущности, содержащая конкретное значение. 
                        Каждый атрибут имеет имя, тип данных и может иметь ограничения.
                    </div>
                    
                    <h3>Классификация атрибутов:</h3>
                    <ul>
                        <li>
                            <strong>🔸 Простые (атомарные)</strong><br>
                            Неделимые значения: имя, дата, возраст
                        </li>
                        <li>
                            <strong>🔹 Составные</strong><br>
                            Состоят из нескольких компонентов: адрес (улица, дом, квартира)
                        </li>
                        <li>
                            <strong>🔺 Однозначные</strong><br>
                            Имеют одно значение для каждой сущности
                        </li>
                        <li>
                            <strong>🔻 Многозначные</strong><br>
                            Могут иметь несколько значений: телефоны, email
                        </li>
                        <li>
                            <strong>💾 Производные</strong><br>
                            Вычисляются из других атрибутов: возраст (из даты рождения)
                        </li>
                    </ul>
                    
                    <div class="interactive-question">
                        <strong>💡 Правило:</strong> В реляционных БД рекомендуется использовать только простые атомарные атрибуты.
                    </div>
                </div>
                
                <div class="visualization animate-in">
                    <div style="width: 100%;">
                        <h3>Атрибуты сущности "Студент":</h3>
                        <div style="background: var(--bg-accent); padding: 25px; border-radius: 12px; margin: 15px 0; border-left: 4px solid var(--primary);">
                            <div style="text-align: center; margin-bottom: 20px;">
                                <strong style="color: var(--primary-light); font-size: 1.2rem;">🎓 Student (Студент)</strong>
                            </div>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                                <div style="background: rgba(99, 102, 241, 0.1); padding: 10px; border-radius: 8px;">
                                    <strong>student_id</strong><br>
                                    <small style="color: var(--text-secondary);">INTEGER, PRIMARY KEY</small>
                                </div>
                                <div style="background: rgba(99, 102, 241, 0.1); padding: 10px; border-radius: 8px;">
                                    <strong>first_name</strong><br>
                                    <small style="color: var(--text-secondary);">VARCHAR(50), NOT NULL</small>
                                </div>
                                <div style="background: rgba(99, 102, 241, 0.1); padding: 10px; border-radius: 8px;">
                                    <strong>last_name</strong><br>
                                    <small style="color: var(--text-secondary);">VARCHAR(50), NOT NULL</small>
                                </div>
                                <div style="background: rgba(99, 102, 241, 0.1); padding: 10px; border-radius: 8px;">
                                    <strong>birth_date</strong><br>
                                    <small style="color: var(--text-secondary);">DATE</small>
                                </div>
                                <div style="background: rgba(99, 102, 241, 0.1); padding: 10px; border-radius: 8px;">
                                    <strong>email</strong><br>
                                    <small style="color: var(--text-secondary);">VARCHAR(100), UNIQUE</small>
                                </div>
                                <div style="background: rgba(99, 102, 241, 0.1); padding: 10px; border-radius: 8px;">
                                    <strong>phone</strong><br>
                                    <small style="color: var(--text-secondary);">VARCHAR(20)</small>
                                </div>
                                <div style="background: rgba(99, 102, 241, 0.1); padding: 10px; border-radius: 8px;">
                                    <strong>enrollment_year</strong><br>
                                    <small style="color: var(--text-secondary);">INTEGER, NOT NULL</small>
                                </div>
                                <div style="background: rgba(99, 102, 241, 0.1); padding: 10px; border-radius: 8px;">
                                    <strong>department_id</strong><br>
                                    <small style="color: var(--text-secondary);">INTEGER, FOREIGN KEY</small>
                                </div>
                            </div>
                        </div>
                        
                        <h3>Примеры типов данных:</h3>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 15px;">
                            <div class="badge">INTEGER</div>
                            <div class="badge">VARCHAR</div>
                            <div class="badge">DATE</div>
                            <div class="badge">BOOLEAN</div>
                            <div class="badge">DECIMAL</div>
                            <div class="badge">TIMESTAMP</div>
                        </div>
                    </div>
                </div>
            </div>
        `
    },

    // Слайд 8: Типы связей
    {
        id: 8,
        icon: "🔗",
        title: "Типы связей между сущностями",
        subtitle: "One-to-One, One-to-Many, Many-to-Many",
        content: `
            <div class="content-grid">
                <div class="theory-card animate-in">
                    <h2>🔗 Основные типы связей</h2>
                    <div class="definition">
                        <strong>Связь</strong> - ассоциация между двумя или более сущностями, 
                        имеющая определенную семантику и кардинальность.
                    </div>
                    
                    <h3>Типы связей по кардинальности:</h3>
                    <ul>
                        <li>
                            <strong>1:1 Один-к-одному</strong><br>
                            Каждой записи в одной таблице соответствует не более одной записи в другой
                        </li>
                        <li>
                            <strong>1:N Один-ко-многим</strong><br>
                            Одна запись в первой таблице связана с несколькими записями во второй
                        </li>
                        <li>
                            <strong>N:M Многие-ко-многим</strong><br>
                            Одна запись в первой таблице связана с несколькими записями во второй и наоборот
                        </li>
                    </ul>
                    
                    <h3>Примеры в системе Колледжа:</h3>
                    <ul>
                        <li>👨‍🏫 Преподаватель → 📚 Курс (1:N)</li>
                        <li>🎓 Студент → 📚 Курс (N:M через Зачисление)</li>
                        <li>🏫 Кафедра → 👨‍🏫 Преподаватель (1:N)</li>
                        <li>📚 Курс → 📅 Занятие (1:N)</li>
                    </ul>
                </div>
                
                <div class="visualization animate-in">
                    <div style="width: 100%; text-align: center;">
                        <h3>Визуализация связей:</h3>
                        
                        <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 15px; align-items: center; margin: 20px 0;">
                            <div class="entity">👨‍🏫 Преподаватель</div>
                            <div style="color: var(--accent); font-weight: bold; font-size: 1.2rem;">1 : N</div>
                            <div class="entity">📚 Курс</div>
                        </div>
                        
                        <div style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 25px;">
                            Один преподаватель ведет много курсов
                        </div>
                        
                        <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 15px; align-items: center; margin: 20px 0;">
                            <div class="entity">🎓 Студент</div>
                            <div style="color: var(--accent); font-weight: bold; font-size: 1.2rem;">N : M</div>
                            <div class="entity">📚 Курс</div>
                        </div>
                        
                        <div style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 25px;">
                            Студенты изучают много курсов, курсы изучаются многими студентами
                        </div>
                        
                        <div class="interactive-question">
                            <strong>🤔 Вопрос:</strong> Какая связь между Студентом и Студенческим билетом?
                        </div>
                    </div>
                </div>
            </div>
        `
    },

    // Слайд 9: ER-диаграммы
    {
        id: 9,
        icon: "📐",
        title: "ER-Диаграммы",
        subtitle: "Визуальное представление модели данных",
        content: `
            <div class="content-grid">
                <div class="theory-card animate-in">
                    <h2>🎨 Нотация Чена</h2>
                    <div class="definition">
                        <strong>ER-диаграмма (Entity-Relationship Diagram)</strong> - графическое представление 
                        сущностей, их атрибутов и связей между ними в предметной области.
                    </div>
                    
                    <h3>Основные элементы нотации:</h3>
                    <ul>
                        <li>
                            <strong>🔷 Прямоугольник</strong> - сущность<br>
                            <small>Пример: Студент, Преподаватель, Курс</small>
                        </li>
                        <li>
                            <strong>🔶 Ромб</strong> - связь<br>
                            <small>Пример: "учится", "преподает", "принадлежит"</small>
                        </li>
                        <li>
                            <strong>⚪ Овал</strong> - атрибут<br>
                            <small>Пример: имя, дата, email</small>
                        </li>
                        <li>
                            <strong>🔑 Подчеркивание</strong> - первичный ключ<br>
                            <small>Уникальный идентификатор сущности</small>
                        </li>
                    </ul>
                    
                    <h3>Преимущества ER-диаграмм:</h3>
                    <ul>
                        <li>🎯 Наглядное представление структуры данных</li>
                        <li>💬 Упрощение коммуникации между разработчиками и заказчиками</li>
                        <li>🔍 Выявление ошибок на ранних этапах</li>
                        <li>📋 Основа для создания физической схемы БД</li>
                    </ul>
                </div>
                
                <div class="visualization animate-in">
                    <div style="width: 100%;">
                        <h3>Пример ER-диаграммы для Колледжа:</h3>
                        
                        <div style="background: var(--bg-accent); padding: 25px; border-radius: 12px; margin: 20px 0;">
                            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; text-align: center;">
                                <div class="entity" style="position: relative;">
                                    🎓 Student
                                    <div class="badge" style="position: absolute; top: -8px; right: -8px;">PK</div>
                                </div>
                                <div class="entity" style="position: relative;">
                                    👨‍🏫 Teacher
                                    <div class="badge" style="position: absolute; top: -8px; right: -8px;">PK</div>
                                </div>
                                <div class="entity" style="position: relative;">
                                    📚 Course
                                    <div class="badge" style="position: absolute; top: -8px; right: -8px;">PK</div>
                                </div>
                            </div>
                            
                            <div style="text-align: center; margin: 20px 0; color: var(--accent); font-weight: bold;">
                                ↓ Связи ↓
                            </div>
                            
                            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; text-align: center;">
                                <div class="entity" style="background: rgba(16, 185, 129, 0.2); border-color: var(--accent);">
                                    📝 Grade
                                </div>
                                <div class="entity" style="background: rgba(16, 185, 129, 0.2); border-color: var(--accent);">
                                    🔗 Enrollment
                                </div>
                                <div class="entity" style="background: rgba(16, 185, 129, 0.2); border-color: var(--accent);">
                                    🏫 Department
                                </div>
                            </div>
                        </div>
                        
                        <div class="interactive-question">
                            <strong>💡 Задание:</strong> Попробуйте нарисовать ER-диаграмму для своей предметной области.
                        </div>
                    </div>
                </div>
            </div>
        `
    },

    // Слайд 10: Нормализация - Введение
    {
        id: 10,
        icon: "⚡",
        title: "Нормализация Баз Данных",
        subtitle: "Искусство избавления от хаоса в данных",
        content: `
            <div class="content-grid">
                <div class="theory-card animate-in">
                    <h2>🎯 Зачем нужна нормализация?</h2>
                    <div class="definition">
                        <strong>Нормализация</strong> - процесс организации данных в БД для 
                        уменьшения избыточности и улучшения целостности через применение нормальных форм.
                    </div>
                    
                    <h3>Основные цели нормализации:</h3>
                    <ul>
                        <li>🚫 Устранение избыточности данных</li>
                        <li>🔄 Предотвращение аномалий обновления</li>
                        <li>➕ Упрощение операций добавления данных</li>
                        <li>➖ Защита от потери данных при удалении</li>
                        <li>🔒 Обеспечение целостности данных</li>
                    </ul>
                    
                    <h3>Нормальные формы:</h3>
                    <ul>
                        <li>📝 <strong>1НФ</strong> - Первая нормальная форма</li>
                        <li>🔍 <strong>2НФ</strong> - Вторая нормальная форма</li>
                        <li>🎯 <strong>3НФ</strong> - Третья нормальная форма</li>
                        <li>🏆 <strong>BCNF</strong> - Нормальная форма Бойса-Кодда</li>
                        <li>🔬 <strong>4НФ</strong> - Четвертая нормальная форма</li>
                    </ul>
                </div>
                
                <div class="visualization animate-in">
                    <div style="width: 100%;">
                        <h3>Пример проблемы до нормализации:</h3>
                        
                        
                        <div class="interactive-question" style="margin-top: 20px;">
                            <strong>🤔 Проблема:</strong> Какие данные дублируются в этой таблице? 
                            Что произойдет при смене декана факультета?
                        </div>
                        
                        <div style="margin-top: 25px; padding: 20px; background: rgba(16, 185, 129, 0.1); border-radius: 12px; border-left: 4px solid var(--accent);">
                            <strong>💡 Решение:</strong> Нормализация разделит эту таблицу на несколько связанных таблиц, 
                            устранив избыточность и аномалии.
                        </div>
                    </div>
                </div>
            </div>
        `
    },


    {
        id: 11,
        icon: "🔄",
        title: "Связи Many-to-Many",
        subtitle: "Реализация сложных отношений между сущностями",
        content: `
            <div class="content-grid">
                <div class="theory-card animate-in">
                    <h2>🔗 Связи Многие-ко-многим</h2>
                    <div class="definition">
                        <strong>N:M связь</strong> возникает, когда одной записи в таблице A соответствует 
                        несколько записей в таблице B, и наоборот. Требует создания промежуточной таблицы.
                    </div>
                    
                    <h3>Характеристики N:M связей:</h3>
                    <ul>
                        <li>📊 Требуют таблицы-связки (junction table)</li>
                        <li>🔗 Содержат два внешних ключа</li>
                        <li>💾 Могут содержать дополнительные атрибуты</li>
                        <li>🎯 Обеспечивают гибкость структуры данных</li>
                    </ul>
                    
                    <h3>Примеры в системе Колледжа:</h3>
                    <ul>
                        <li>🎓 Студенты ←→ 📚 Курсы (через Зачисления)</li>
                        <li>👨‍🏫 Преподаватели ←→ 🏫 Кафедры (через Назначения)</li>
                        <li>📚 Курсы ←→ 📅 Аудитории (через Расписание)</li>
                    </ul>
                    
                    <div class="interactive-question">
                        <strong>💭 Вопрос:</strong> Почему нельзя реализовать связь N:M напрямую между двумя таблицами?
                    </div>
                </div>
                
                <div class="visualization animate-in">
                    <div style="width: 100%;">
                        <h3>Реализация связи Студенты-Курсы:</h3>
                        
                        <div class="image-container">
                            <img src="https://fsd.multiurok.ru/html/2021/10/11/s_6163c9a8752fe/img17.jpg" 
                                 alt="Схема связи многие-ко-многим" 
                                 class="slide-image">
                            <div class="image-caption">Схема связи N:M через таблицу Enrollments</div>
                        </div>
                        
                        <table class="data-table">
                            
                        </table>
                        
                        <div class="code-block" style="margin-top: 20px;">
// SQL создание таблицы-связки<br>
CREATE TABLE Enrollments (<br>
&nbsp;&nbsp;enrollment_id SERIAL PRIMARY KEY,<br>
&nbsp;&nbsp;student_id INTEGER NOT NULL,<br>
&nbsp;&nbsp;course_id INTEGER NOT NULL,<br>
&nbsp;&nbsp;enrollment_date DATE DEFAULT CURRENT_DATE,<br>
&nbsp;&nbsp;FOREIGN KEY (student_id) REFERENCES Students(student_id),<br>
&nbsp;&nbsp;FOREIGN KEY (course_id) REFERENCES Courses(course_id)<br>
);
                        </div>
                    </div>
                </div>
            </div>
        `
    },

    // Слайд 12: Первичные ключи
    {
        id: 12,
        icon: "🔑",
        title: "Первичные ключи",
        subtitle: "Уникальные идентификаторы записей",
        content: `
            <div class="content-grid">
                <div class="theory-card animate-in">
                    <h2>🎯 Первичный ключ (Primary Key)</h2>
                    <div class="definition">
                        <strong>Первичный ключ</strong> - атрибут или набор атрибутов, которые однозначно 
                        идентифицируют каждую запись в таблице. Не может содержать NULL значения.
                    </div>
                    
                    <h3>Требования к первичному ключу:</h3>
                    <ul>
                        <li>✅ <strong>Уникальность</strong> - каждая запись имеет уникальное значение</li>
                        <li>✅ <strong>Неизменность</strong> - значение не должно меняться со временем</li>
                        <li>✅ <strong>Простота</strong> - минимальное количество атрибутов</li>
                        <li>✅ <strong>Осмысленность</strong> - по возможности иметь бизнес-значение</li>
                    </ul>
                    
                    <h3>Типы первичных ключей:</h3>
                    <ul>
                        <li><strong>Естественный ключ</strong> - существующий бизнес-идентификатор</li>
                        <li><strong>Суррогатный ключ</strong> - искусственно созданный идентификатор</li>
                        <li><strong>Составной ключ</strong> - комбинация нескольких атрибутов</li>
                    </ul>
                </div>
                
                <div class="visualization animate-in">
                    <div style="width: 100%;">
                        <h3>Примеры первичных ключей:</h3>
                        
                        <table class="data-table">
                        <div class="image-container">
                        <img src="https://wudgleyd.ru/wp-content/uploads/2/4/c/24c3eba3227ad2b64396ecd359fdcae2.jpeg" 
                             alt="Сурогатный ключ" 
                             class="slide-image">
                        <div class="image-caption">Естественные и сурогатные ключиы</div>
                    </div>
                        </table>
                        
                        <div class="code-with-image" style="margin-top: 20px;">
                            <div class="code-block">
// Суррогатный ключ<br>
CREATE TABLE Students (<br>
&nbsp;&nbsp;student_id SERIAL PRIMARY KEY,<br>
&nbsp;&nbsp;first_name VARCHAR(50)<br>
);<br>
<br>
// Естественный ключ<br>
CREATE TABLE Courses (<br>
&nbsp;&nbsp;course_code VARCHAR(10) PRIMARY KEY,<br>
&nbsp;&nbsp;title VARCHAR(100)<br>
);
                            </div>
                            
                            <div class="image-container">
                                <img src="https://via.placeholder.com/300x150/1a1a1a/10b981?text=PK+в+ERD" 
                                     alt="Первичный ключ в ERD" 
                                     class="slide-image">
                                <div class="image-caption">Обозначение PK в ER-диаграммах</div>
                            </div>
                        </div>
                        
                        <div class="interactive-question">
                            <strong>💡 Рекомендация:</strong> Используйте суррогатные ключи для большинства таблиц - 
                            они обеспечивают стабильность и простоту.
                        </div>
                    </div>
                </div>
            </div>
        `
    },

    // Слайд 13: Внешние ключи
    {
        id: 13,
        icon: "🔗",
        title: "Внешние ключи",
        subtitle: "Обеспечение целостности связей между таблицами",
        content: `
            <div class="content-grid">
                <div class="theory-card animate-in">
                    <h2>🌉 Внешние ключи (Foreign Keys)</h2>
                    <div class="definition">
                        <strong>Внешний ключ</strong> - атрибут в одной таблице, который ссылается на первичный ключ 
                        в другой таблице. Обеспечивает ссылочную целостность данных.
                    </div>
                    
                    <h3>Назначение внешних ключей:</h3>
                    <ul>
                        <li>🔒 <strong>Целостность данных</strong> - предотвращение "осиротевших" записей</li>
                        <li>🔗 <strong>Связность</strong> - явное определение отношений между таблицами</li>
                        <li>📋 <strong>Документирование</strong> - понятная структура базы данных</li>
                        <li>⚡ <strong>Производительность</strong> - оптимизация JOIN операций</li>
                    </ul>
                    
                    <h3>Правила ссылочной целостности:</h3>
                    <ul>
                        <li><strong>RESTRICT</strong> - запрет удаления связанных записей</li>
                        <li><strong>CASCADE</strong> - каскадное удаление/обновление</li>
                        <li><strong>SET NULL</strong> - установка NULL при удалении</li>
                        <li><strong>SET DEFAULT</strong> - установка значения по умолчанию</li>
                        <li><strong>NO ACTION</strong> - аналогично RESTRICT</li>
                    </ul>
                </div>
                
                <div class="visualization animate-in">
                    <div style="width: 100%;">
                        <h3>Примеры внешних ключей в системе:</h3>
                        
                        <div class="image-container">
                            <img src="https://helpiks.org/helpiksorg/baza9/1376858569876.files/image016.jpg" 
                                 alt="Цепочка внешних ключей" 
                                 class="slide-image">
                            <div class="image-caption">Цепочка внешних ключей между таблицами</div>
                        </div>
                        
                        <div class="code-block">
// Создание таблиц с внешними ключами<br>
CREATE TABLE Departments (<br>
&nbsp;&nbsp;department_id SERIAL PRIMARY KEY,<br>
&nbsp;&nbsp;name VARCHAR(100) NOT NULL<br>
);<br>
<br>
CREATE TABLE Students (<br>
&nbsp;&nbsp;student_id SERIAL PRIMARY KEY,<br>
&nbsp;&nbsp;name VARCHAR(100) NOT NULL,<br>
&nbsp;&nbsp;department_id INTEGER,<br>
&nbsp;&nbsp;FOREIGN KEY (department_id) <br>
&nbsp;&nbsp;&nbsp;&nbsp;REFERENCES Departments(department_id)<br>
&nbsp;&nbsp;&nbsp;&nbsp;ON DELETE SET NULL<br>
&nbsp;&nbsp;&nbsp;&nbsp;ON UPDATE CASCADE<br>
);
                        </div>
                        
                        <table class="data-table" style="margin-top: 20px;">
                            
                        </table>
                    </div>
                </div>
            </div>
        `
    },

    // Слайд 14: Индексы и производительность
    {
        id: 14,
        icon: "⚡",
        title: "Индексы и производительность",
        subtitle: "Оптимизация запросов к базе данных",
        content: `
            <div class="content-grid">
                <div class="theory-card animate-in">
                    <h2>📈 Индексы в базах данных</h2>
                    <div class="definition">
                        <strong>Индекс</strong> - структура данных, которая ускоряет операции поиска и сортировки 
                        в таблице за счет дополнительного расхода памяти и замедления операций вставки/обновления.
                    </div>
                    
                    <h3>Типы индексов:</h3>
                    <ul>
                        <li><strong>B-дерево</strong> - стандартный индекс для большинства операций</li>
                        <li><strong>Хэш-индекс</strong> - для точных совпадений (= операции)</li>
                        <li><strong>GiST/SP-GiST</strong> - для геоданных и полнотекстового поиска</li>
                        <li><strong>GIN</strong> - для массивов и JSON данных</li>
                        <li><strong>BRIN</strong> - для очень больших таблиц с упорядоченными данными</li>
                    </ul>
                    
                    <h3>Когда создавать индексы:</h3>
                    <ul>
                        <li>🔍 Часто используемые колонки в WHERE</li>
                        <li>📊 Колонки для JOIN операций</li>
                        <li>📈 Колонки для ORDER BY и GROUP BY</li>
                        <li>✅ Колонки с ограничениями UNIQUE</li>
                    </ul>
                </div>
                
                <div class="visualization animate-in">
                    <div style="width: 100%;">
                        <h3>Примеры создания индексов:</h3>
                        
                        <div class="code-block">
-- Базовые индексы<br>
CREATE INDEX idx_students_name ON Students(last_name, first_name);<br>
CREATE INDEX idx_courses_department ON Courses(department_id);<br>
<br>
-- Уникальный индекс<br>
CREATE UNIQUE INDEX idx_students_email ON Students(email);<br>
<br>
-- Частичный индекс<br>
CREATE INDEX idx_active_students ON Students(enrollment_year) <br>
WHERE enrollment_year >= 2020;<br>
<br>
-- Составной индекс<br>
CREATE INDEX idx_grades_performance ON Grades(student_id, course_id, grade_date);
                        </div>
                        
                        <table class="data-table" style="margin-top: 20px;">
                            <thead>
                                <tr>
                                    <th>Запрос</th>
                                    <th>Без индекса</th>
                                    <th>С индексом</th>
                                    <th>Ускорение</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>SELECT * FROM Students WHERE last_name = 'Иванов'</td>
                                    <td>Полное сканирование</td>
                                    <td>Поиск по индексу</td>
                                    <td>1000x</td>
                                </tr>
                                <tr>
                                    <td>JOIN Students ↔ Enrollments</td>
                                    <td>Nested Loop</td>
                                    <td>Hash Join</td>
                                    <td>100x</td>
                                </tr>
                                <tr>
                                    <td>ORDER BY enrollment_date</td>
                                    <td>External Sort</td>
                                    <td>Index Scan</td>
                                    <td>50x</td>
                                </tr>
                            </tbody>
                        </table>
                        
                        <div class="interactive-question">
                            <strong>⚠️ Предупреждение:</strong> Не создавайте индексы на часто изменяемые колонки - 
                            это замедлит операции INSERT/UPDATE/DELETE.
                        </div>
                    </div>
                </div>
            </div>
        `
    },

    // Слайд 15: Транзакции и ACID
    {
        id: 15,
        icon: "🛡️",
        title: "Транзакции и ACID",
        subtitle: "Обеспечение надежности операций с данными",
        content: `
            <div class="content-grid">
                <div class="theory-card animate-in">
                    <h2>💎 Свойства ACID</h2>
                    <div class="definition">
                        <strong>Транзакция</strong> - последовательность операций с базой данных, 
                        которая выполняется как единое целое. ACID - набор свойств, обеспечивающих надежность.
                    </div>
                    
                    <h3>Компоненты ACID:</h3>
                    <ul>
                        <li>
                            <strong>A - Atomicity (Атомарность)</strong><br>
                            Транзакция выполняется полностью или не выполняется вовсе
                        </li>
                        <li>
                            <strong>C - Consistency (Согласованность)</strong><br>
                            Транзакция переводит БД из одного согласованного состояния в другое
                        </li>
                        <li>
                            <strong>I - Isolation (Изолированность)</strong><br>
                            Параллельные транзакции не влияют друг на друга
                        </li>
                        <li>
                            <strong>D - Durability (Долговечность)</strong><br>
                            Результаты завершенной транзакции сохраняются после сбоев
                        </li>
                    </ul>
                    
                    <h3>Уровни изоляции:</h3>
                    <ul>
                        <li>READ UNCOMMITTED - Чтение незафиксированных данных</li>
                        <li>READ COMMITTED - Чтение только зафиксированных данных</li>
                        <li>REPEATABLE READ - Гарантия повторяемого чтения</li>
                        <li>SERIALIZABLE - Полная изоляция</li>
                    </ul>
                </div>
                
                <div class="visualization animate-in">
                    <div style="width: 100%;">
                        <h3>Пример транзакции в системе Колледжа:</h3>
                        
                        <div class="code-block">
BEGIN TRANSACTION;<br>
<br>
-- 1. Зачисление студента на курс<br>
INSERT INTO Enrollments (student_id, course_id, enrollment_date)<br>
VALUES (123, 456, CURRENT_DATE);<br>
<br>
-- 2. Увеличение счетчика студентов на курсе<br>
UPDATE Courses SET student_count = student_count + 1<br>
WHERE course_id = 456;<br>
<br>
-- 3. Проверка ограничения по количеству студентов<br>
IF (SELECT student_count FROM Courses WHERE course_id = 456) > 30 THEN<br>
&nbsp;&nbsp;ROLLBACK;<br>
&nbsp;&nbsp;RAISE EXCEPTION 'Курс переполнен';<br>
ELSE<br>
&nbsp;&nbsp;COMMIT;<br>
END IF;
                        </div>
                        
                        <div class="images-side-by-side" style="margin-top: 20px;">
                            <div class="image-container">
                                <img src="https://sun9-1.userapi.com/impg/NHH7OemPZLFV-YBkP4wzGuQK8_6W_rdCJRh9WA/udRs8vac1t0.jpg?size=445x128&quality=95&sign=7e8d52a7feccf13649e548895e86d5db&type=album" 
                                     alt="Успешная транзакция или откат" 
                                     class="slide-image">
                                <div class="image-caption">COMMIT - все операции выполнены</div>
                            </div>
                           
                        </div>
                        
                        <div class="interactive-question">
                            <strong>💭 Сценарий:</strong> Что произойдет, если между шагами 1 и 2 произойдет сбой системы?
                        </div>
                    </div>
                </div>
            </div>
        `
    },

    // Слайд 16: Ограничения целостности
    {
        id: 16,
        icon: "🎯",
        title: "Ограничения целостности",
        subtitle: "Правила для обеспечения качества данных",
        content: `
            <div class="content-grid">
                <div class="theory-card animate-in">
                    <h2>📏 Типы ограничений</h2>
                    <div class="definition">
                        <strong>Ограничения целостности</strong> - правила, которые гарантируют корректность 
                        и согласованность данных в базе. Проверяются при каждой операции изменения данных.
                    </div>
                    
                    <h3>Основные типы ограничений:</h3>
                    <ul>
                        <li>
                            <strong>NOT NULL</strong> - запрет NULL значений<br>
                            <small>Пример: студент должен иметь имя</small>
                        </li>
                        <li>
                            <strong>UNIQUE</strong> - уникальность значений<br>
                            <small>Пример: уникальный email студента</small>
                        </li>
                        <li>
                            <strong>PRIMARY KEY</strong> - уникальный идентификатор<br>
                            <small>Комбинация NOT NULL + UNIQUE</small>
                        </li>
                        <li>
                            <strong>FOREIGN KEY</strong> - ссылочная целостность<br>
                            <small>Пример: студент принадлежит существующей кафедре</small>
                        </li>
                        <li>
                            <strong>CHECK</strong> - пользовательские условия<br>
                            <small>Пример: оценка от 2 до 5</small>
                        </li>
                    </ul>
                </div>
                
                <div class="visualization animate-in">
                    <div style="width: 100%;">
                        <h3>Примеры ограничений в системе:</h3>
                        
                        <div class="code-block">
CREATE TABLE Students (<br>
&nbsp;&nbsp;student_id SERIAL PRIMARY KEY,<br>
&nbsp;&nbsp;first_name VARCHAR(50) NOT NULL,<br>
&nbsp;&nbsp;last_name VARCHAR(50) NOT NULL,<br>
&nbsp;&nbsp;email VARCHAR(100) UNIQUE NOT NULL,<br>
&nbsp;&nbsp;birth_date DATE CHECK (birth_date > '1900-01-01'),<br>
&nbsp;&nbsp;enrollment_year INTEGER CHECK (enrollment_year >= 2000),<br>
&nbsp;&nbsp;department_id INTEGER,<br>
&nbsp;&nbsp;FOREIGN KEY (department_id) REFERENCES Departments(department_id)<br>
);<br>
<br>
CREATE TABLE Grades (<br>
&nbsp;&nbsp;grade_id SERIAL PRIMARY KEY,<br>
&nbsp;&nbsp;student_id INTEGER NOT NULL,<br>
&nbsp;&nbsp;course_id INTEGER NOT NULL,<br>
&nbsp;&nbsp;grade INTEGER CHECK (grade BETWEEN 2 AND 5),<br>
&nbsp;&nbsp;grade_date DATE DEFAULT CURRENT_DATE,<br>
&nbsp;&nbsp;FOREIGN KEY (student_id) REFERENCES Students(student_id),<br>
&nbsp;&nbsp;FOREIGN KEY (course_id) REFERENCES Courses(course_id)<br>
);
                        </div>
                        
                        <table class="data-table" style="margin-top: 20px;">
                            <thead>
                                <tr>
                                    <th>Ограничение</th>
                                    <th>Пример нарушения</th>
                                    <th>Реакция СУБД</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>NOT NULL</td>
                                    <td>INSERT с NULL именем</td>
                                    <td>❌ Ошибка</td>
                                </tr>
                                <tr>
                                    <td>UNIQUE</td>
                                    <td>Два студента с одним email</td>
                                    <td>❌ Ошибка</td>
                                </tr>
                                <tr>
                                    <td>CHECK</td>
                                    <td>Оценка 6</td>
                                    <td>❌ Ошибка</td>
                                </tr>
                                <tr>
                                    <td>FOREIGN KEY</td>
                                    <td>Студент с несуществующей кафедрой</td>
                                    <td>❌ Ошибка</td>
                                </tr>
                            </tbody>
                        </table>
                        
                        <div class="interactive-question">
                            <strong>💡 Практика:</strong> Какие еще ограничения можно добавить для таблицы Преподавателей?
                        </div>
                    </div>
                </div>
            </div>
        `
    },

    // Слайд 17: Нормализация - 1НФ
    {
        id: 17,
        icon: "1️⃣",
        title: "Первая нормальная форма (1НФ)",
        subtitle: "Устранение повторяющихся групп данных",
        content: `
            <div class="content-grid">
                <div class="theory-card animate-in">
                    <h2>📝 Требования 1НФ</h2>
                    <div class="definition">
                        <strong>Первая нормальная форма (1НФ)</strong> требует, чтобы все атрибуты были атомарными 
                        (неделимыми) и в таблице не было повторяющихся групп данных.
                    </div>
                    
                    <h3>Критерии 1НФ:</h3>
                    <ul>
                        <li>✅ Все значения атрибутов атомарны</li>
                        <li>✅ Нет повторяющихся групп данных</li>
                        <li>✅ Каждая запись уникальна</li>
                        <li>✅ Порядок строк не имеет значения</li>
                        <li>✅ Все значения в колонке одного типа</li>
                    </ul>
                    
                    <h3>Типичные нарушения 1НФ:</h3>
                    <ul>
                        <li>📦 Составные значения в одной ячейке</li>
                        <li>🔄 Несколько значений в одном поле</li>
                        <li>📊 Повторяющиеся группы колонок</li>
                        <li>🔢 Массивы или списки в ячейках</li>
                    </ul>
                </div>
                
                <div class="visualization animate-in">
                    <div style="width: 100%;">
                        <h3>Преобразование к 1НФ:</h3>
                        
                        <div class="image-container">
                            <img src="https://cf.ppt-online.org/files/slide/f/FZXyuvgHO6DerQPKVnqJ2lTwUI4hBdjz1YoaGt/slide-35.jpg" 
                                 alt="Преобразование к 1НФ" 
                                 class="slide-image">
                            <div class="image-caption">Процесс преобразования таблицы к 1НФ</div>
                        </div>
                        
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th colspan="3" style="text-align: center; background: #ef4444;">❌ До 1НФ</th>
                                </tr>
                                <tr>
                                    <th>Студент</th>
                                    <th>Курсы</th>
                                    <th>Телефон</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Иванов</td>
                                    <td>Математика, Физика</td>
                                    <td>89151112233</td>
                                </tr>
                            </tbody>
                        </table>
                        
                        <div style="text-align: center; margin: 15px 0; color: var(--accent); font-size: 1.2rem;">
                            ↓ преобразуется к ↓
                        </div>
                        
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th colspan="3" style="text-align: center; background: #10b981;">✅ После 1НФ</th>
                                </tr>
                                <tr>
                                    <th>Студент</th>
                                    <th>Курс</th>
                                    <th>Телефон</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Иванов</td>
                                    <td>Математика</td>
                                    <td>89151112233</td>
                                </tr>
                                <tr>
                                    <td>Иванов</td>
                                    <td>Физика</td>
                                    <td>89151112233</td>
                                </tr>
                            </tbody>
                        </table>
                        
                        <div class="interactive-question">
                            <strong>🤔 Задание:</strong> Какие проблемы решает преобразование к 1НФ в этом примере?
                        </div>
                    </div>
                </div>
            </div>
        `
    },

    // Слайд 18: Нормализация - 2НФ
    {
        id: 18,
        icon: "2️⃣",
        title: "Вторая нормальная форма (2НФ)",
        subtitle: "Устранение частичных зависимостей",
        content: `
            <div class="content-grid">
                <div class="theory-card animate-in">
                    <h2>🔍 Требования 2НФ</h2>
                    <div class="definition">
                        <strong>Вторая нормальная форма (2НФ)</strong> требует, чтобы таблица находилась в 1НФ 
                        и все неключевые атрибуты полностью зависели от всего первичного ключа.
                    </div>
                    
                    <h3>Критерии 2НФ:</h3>
                    <ul>
                        <li>✅ Таблица в 1НФ</li>
                        <li>✅ Нет частичных зависимостей</li>
                        <li>✅ Все неключевые атрибуты зависят от ВСЕГО первичного ключа</li>
                        <li>✅ Для таблиц с простым ключом автоматически выполняется 2НФ</li>
                    </ul>
                    
                    <h3>Частичная зависимость:</h3>
                    <p>Возникает, когда неключевой атрибут зависит только от части составного первичного ключа.</p>
                    
                    <div class="interactive-question">
                        <strong>💡 Правило:</strong> Если первичный ключ простой (один атрибут), 
                        таблица автоматически находится во 2НФ.
                    </div>
                </div>
                
                <div class="visualization animate-in">
                    <div style="width: 100%;">
                        <h3>Пример нарушения 2НФ:</h3>
                        
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th colspan="5" style="text-align: center; background: #ef4444;">❌ Нарушение 2НФ</th>
                                </tr>
                                <tr>
                                    <th>student_id</th>
                                    <th>course_id</th>
                                    <th>student_name</th>
                                    <th>course_name</th>
                                    <th>grade</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>101</td>
                                    <td>Иванов</td>
                                    <td>Математика</td>
                                    <td>5</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>102</td>
                                    <td>Иванов</td>
                                    <td>Физика</td>
                                    <td>4</td>
                                </tr>
                            </tbody>
                        </table>
                        
                        <div class="code-block" style="margin-top: 15px;">
// Проблема: составной ключ (student_id, course_id)<br>
// student_name зависит только от student_id ← частичная зависимость!<br>
// course_name зависит только от course_id ← частичная зависимость!<br>
// grade зависит от всего ключа (student_id, course_id) ✓
                        </div>
                        
                        <div style="text-align: center; margin: 20px 0; color: var(--accent); font-size: 1.2rem;">
                            ↓ преобразуется к ↓
                        </div>
                        
                        <div class="images-side-by-side">
                            <div style="background: var(--bg-accent); padding: 15px; border-radius: 12px;">
                                <h4 style="text-align: center; color: #10b981;">✅ Students</h4>
                                <table style="width: 100%; font-size: 0.9rem;">
                                    <tr><td><strong>student_id</strong></td><td>student_name</td></tr>
                                    <tr><td>1</td><td>Иванов</td></tr>
                                </table>
                            </div>
                            <div style="background: var(--bg-accent); padding: 15px; border-radius: 12px;">
                                <h4 style="text-align: center; color: #10b981;">✅ Courses</h4>
                                <table style="width: 100%; font-size: 0.9rem;">
                                    <tr><td><strong>course_id</strong></td><td>course_name</td></tr>
                                    <tr><td>101</td><td>Математика</td></tr>
                                    <tr><td>102</td><td>Физика</td></tr>
                                </table>
                            </div>
                        </div>
                        
                        <div style="background: var(--bg-accent); padding: 15px; border-radius: 12px; margin-top: 15px;">
                            <h4 style="text-align: center; color: #10b981;">✅ Grades</h4>
                            <table style="width: 100%; font-size: 0.9rem;">
                                <tr><td><strong>student_id</strong></td><td><strong>course_id</strong></td><td>grade</td></tr>
                                <tr><td>1</td><td>101</td><td>5</td></tr>
                                <tr><td>1</td><td>102</td><td>4</td></tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        `
    },

    // Слайд 19: Нормализация - 3НФ
    {
        id: 19,
        icon: "3️⃣",
        title: "Третья нормальная форма (3НФ)",
        subtitle: "Устранение транзитивных зависимостей",
        content: `
            <div class="content-grid">
                <div class="theory-card animate-in">
                    <h2>🎯 Требования 3НФ</h2>
                    <div class="definition">
                        <strong>Третья нормальная форма (3НФ)</strong> требует, чтобы таблица находилась во 2НФ 
                        и все неключевые атрибуты нетранзитивно зависели от первичного ключа.
                    </div>
                    
                    <h3>Критерии 3НФ:</h3>
                    <ul>
                        <li>✅ Таблица во 2НФ</li>
                        <li>✅ Нет транзитивных зависимостей</li>
                        <li>✅ Неключевые атрибуты зависят только от первичного ключа</li>
                        <li>✅ Нет зависимостей между неключевыми атрибутами</li>
                    </ul>
                    
                    <h3>Транзитивная зависимость:</h3>
                    <p>Возникает, когда неключевой атрибут A зависит от другого неключевого атрибута B, 
                    который в свою очередь зависит от первичного ключа: PK → B → A</p>
                    
                    <div class="interactive-question">
                        <strong>💡 Правило:</strong> Если A → B и B → C, то существует транзитивная зависимость A → C.
                    </div>
                </div>
                
                <div class="visualization animate-in">
                    <div style="width: 100%;">
                        <h3>Пример нарушения 3НФ:</h3>
                        
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th colspan="5" style="text-align: center; background: #ef4444;">❌ Нарушение 3НФ</th>
                                </tr>
                                <tr>
                                    <th>student_id</th>
                                    <th>name</th>
                                    <th>department_id</th>
                                    <th>department_name</th>
                                    <th>dean</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Иванов</td>
                                    <td>101</td>
                                    <td>Физмат</td>
                                    <td>Сидоров</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Петров</td>
                                    <td>101</td>
                                    <td>Физмат</td>
                                    <td>Сидоров</td>
                                </tr>
                            </tbody>
                        </table>
                        
                        <div class="code-block" style="margin-top: 15px;">
// Проблема: транзитивные зависимости!<br>
// student_id → department_id ✓<br>
// department_id → department_name, dean ✓<br>
// Значит: student_id → department_name, dean (транзитивно!)<br>
// department_name и dean зависят от department_id, а не напрямую от student_id
                        </div>
                        
                        <div style="text-align: center; margin: 20px 0; color: var(--accent); font-size: 1.2rem;">
                            ↓ преобразуется к ↓
                        </div>
                        
                        <div class="images-side-by-side">
                            <div style="background: var(--bg-accent); padding: 15px; border-radius: 12px;">
                                <h4 style="text-align: center; color: #10b981;">✅ Students</h4>
                                <table style="width: 100%; font-size: 0.9rem;">
                                    <tr><td><strong>student_id</strong></td><td>name</td><td>department_id</td></tr>
                                    <tr><td>1</td><td>Иванов</td><td>101</td></tr>
                                    <tr><td>2</td><td>Петров</td><td>101</td></tr>
                                </table>
                            </div>
                            <div style="background: var(--bg-accent); padding: 15px; border-radius: 12px;">
                                <h4 style="text-align: center; color: #10b981;">✅ Departments</h4>
                                <table style="width: 100%; font-size: 0.9rem;">
                                    <tr><td><strong>department_id</strong></td><td>department_name</td><td>dean</td></tr>
                                    <tr><td>101</td><td>Физмат</td><td>Сидоров</td></tr>
                                </table>
                            </div>
                        </div>
                        
                        <div class="interactive-question" style="margin-top: 20px;">
                            <strong>🎉 Результат:</strong> После нормализации до 3НФ мы устранили избыточность данных 
                            и аномалии обновления!
                        </div>
                    </div>
                </div>
            </div>
        `
    },

    // Слайд 20: Денормализация
    {
        id: 20,
        icon: "⚖️",
        title: "Денормализация",
        subtitle: "Баланс между нормализацией и производительностью",
        content: `
            <div class="content-grid">
                <div class="theory-card animate-in">
                    <h2>🔄 Денормализация данных</h2>
                    <div class="definition">
                        <strong>Денормализация</strong> - преднамеренное нарушение нормальных форм для 
                        повышения производительности запросов за счет увеличения избыточности данных.
                    </div>
                    
                    <h3>Когда применять денормализацию:</h3>
                    <ul>
                        <li>📈 Частые сложные JOIN операции</li>
                        <li>⚡ Критичные по времени отчеты</li>
                        <li>📊 Системы OLAP (аналитическая обработка)</li>
                        <li>🔍 Частые агрегатные вычисления</li>
                        <li>💾 Системы чтения (read-heavy)</li>
                    </ul>
                    
                    <h3>Техники денормализации:</h3>
                    <ul>
                        <li><strong>Дублирование колонок</strong> - копирование часто используемых данных</li>
                        <li><strong>Вычисляемые колонки</strong> - хранение результатов вычислений</li>
                        <li><strong>Таблицы отчетов</strong> - предварительно агрегированные данные</li>
                        <li><strong>Горизонтальное разделение</strong> - партиционирование таблиц</li>
                    </ul>
                </div>
                
                <div class="visualization animate-in">
                    <div style="width: 100%;">
                        <h3>Пример денормализации:</h3>
                        
                        <div class="code-block">
-- Нормализованная структура<br>
SELECT s.name, c.title, g.grade<br>
FROM Students s<br>
JOIN Grades g ON s.student_id = g.student_id<br>
JOIN Courses c ON g.course_id = c.course_id<br>
WHERE s.student_id = 123;<br>
<br>
-- Денормализованная структура<br>
SELECT name, course_title, grade<br>
FROM Student_Grades_Denormalized<br>
WHERE student_id = 123;
                        </div>
                        
                        <table class="data-table" style="margin-top: 20px;">
                            <thead>
                                <tr>
                                    <th>Аспект</th>
                                    <th>Нормализация</th>
                                    <th>Денормализация</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Целостность данных</td>
                                    <td>✅ Высокая</td>
                                    <td>⚠️ Требует контроля</td>
                                </tr>
                                <tr>
                                    <td>Производительность чтения</td>
                                    <td>⚠️ Медленнее</td>
                                    <td>✅ Быстрее</td>
                                </tr>
                                <tr>
                                    <td>Производительность записи</td>
                                    <td>✅ Быстрее</td>
                                    <td>⚠️ Медленнее</td>
                                </tr>
                                <tr>
                                    <td>Использование памяти</td>
                                    <td>✅ Экономнее</td>
                                    <td>⚠️ Больше</td>
                                </tr>
                                <tr>
                                    <td>Сложность разработки</td>
                                    <td>✅ Проще</td>
                                    <td>⚠️ Сложнее</td>
                                </tr>
                            </tbody>
                        </table>
                        
                        <div class="interactive-question">
                            <strong>💡 Рекомендация:</strong> Начинайте с полностью нормализованной структуры, 
                            затем денормализуйте только проблемные участки на основе метрик производительности.
                        </div>
                    </div>
                </div>
            </div>
        `
    },

    // Добавляем остальные 30 слайдов...
    // Для демонстрации создадим заглушки

    ...Array.from({length: 30}, (_, i) => ({
        id: i + 11,
        icon: "📚",
        title: `Тема ${i + 11}`,
        subtitle: "Продолжение курса проектирования БД",
        content: `
            <div class="content-grid">
                <div class="theory-card animate-in">
                    <h2>📖 Теоретический материал</h2>
                    <p>Этот раздел содержит углубленную информацию по проектированию баз данных. Здесь рассматриваются продвинутые темы и лучшие практики.</p>
                    
                    <div class="definition">
                        <strong>Важная информация:</strong> Содержание этого слайда будет наполнено детальной информацией 
                        по соответствующей теме проектирования баз данных.
                    </div>
                    
                    <h3>Темы для изучения:</h3>
                    <ul>
                        <li>Глубокая нормализация и нормальные формы</li>
                        <li>Оптимизация производительности БД</li>
                        <li>Индексы и их эффективное использование</li>
                        <li>Транзакции и управление параллельным доступом</li>
                        <li>Репликация и масштабирование БД</li>
                        <li>Безопасность и резервное копирование</li>
                    </ul>
                </div>
                
                <div class="visualization animate-in">
                    <div style="text-align: center; width: 100%;">
                        <div style="font-size: 4rem; margin-bottom: 20px;">🔧</div>
                        <h3 style="color: var(--primary-light); margin-bottom: 15px;">Раздел в разработке</h3>
                        <p style="color: var(--text-secondary); line-height: 1.6;">
                            Этот слайд готовится к публикации. Скоро здесь появится подробная информация 
                            по соответствующей теме проектирования баз данных.
                        </p>
                        
                        <div style="margin-top: 30px;">
                            <div class="badge">Базы данных</div>
                            <div class="badge">Проектирование</div>
                            <div class="badge">SQL</div>
                            <div class="badge">Производительность</div>
                        </div>
                    </div>
                </div>
            </div>
        `
    }))
];