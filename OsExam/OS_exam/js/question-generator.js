class QuestionGenerator {
    constructor() {
        this.seed = Date.now();
        this.initializeGenerators();
    }

    initializeGenerators() {
        this.definitionGenerator = new Math.seedrandom(this.seed + 1);
        this.multipleChoiceGenerator = new Math.seedrandom(this.seed + 2);
        this.classificationGenerator = new Math.seedrandom(this.seed + 3);
        this.architectureGenerator = new Math.seedrandom(this.seed + 4);
        this.scenarioGenerator = new Math.seedrandom(this.seed + 5);
    }

    randomInt(min, max, generator) {
        return Math.floor(generator() * (max - min + 1)) + min;
    }

    randomChoice(array, generator) {
        return array[Math.floor(generator() * array.length)];
    }

    // 1. Задание на определение терминов
    generateDefinitionTask() {
        const definitions = [
            {
                term: "Операционная система",
                options: [
                    "Программа для редактирования текстов",
                    "Комплекс программ, управляющих ресурсами компьютера",
                    "Аппаратное обеспечение компьютера",
                    "Язык программирования"
                ],
                correct: 1,
                hint: "ОС обеспечивает интерфейс между пользователем и аппаратурой"
            },
            {
                term: "Ядро ОС",
                options: [
                    "Внешняя оболочка системы",
                    "Центральная часть ОС, управляющая ресурсами",
                    "Пользовательский интерфейс",
                    "Файловая система"
                ],
                correct: 1,
                hint: "Ядро работает в привилегированном режиме и управляет процессами, памятью, устройствами"
            },
            {
                term: "Драйвер устройства",
                options: [
                    "Игровая программа",
                    "Программа для управления конкретным устройством",
                    "Тип операционной системы",
                    "Метод шифрования данных"
                ],
                correct: 1,
                hint: "Драйверы позволяют ОС взаимодействовать с аппаратными устройствами"
            },
            {
                term: "Планировщик процессов",
                options: [
                    "Программа для создания расписаний",
                    "Компонент ОС, распределяющий время процессора",
                    "Устройство ввода",
                    "Тип памяти"
                ],
                correct: 1,
                hint: "Планировщик определяет порядок выполнения процессов"
            },
            {
                term: "Виртуальная память",
                options: [
                    "Реальная физическая память",
                    "Технология расширения оперативной памяти за счет диска",
                    "Тип кэш-памяти",
                    "Метод архивации"
                ],
                correct: 1,
                hint: "Виртуальная память позволяет программам использовать больше памяти, чем есть физически"
            }
        ];

        const task = this.randomChoice(definitions, this.definitionGenerator);
        return {
            type: 'definition',
            title: 'Определение терминов',
            description: `Что такое "${task.term}"?`,
            options: task.options,
            correctAnswer: task.correct,
            hint: task.hint
        };
    }

    // 2. Задание на классификацию ОС
    generateClassificationTask() {
        const classifications = [
            {
                question: "Какая ОС относится к семейству Windows?",
                options: [
                    "Ubuntu",
                    "macOS",
                    "Windows 11",
                    "Linux Mint"
                ],
                correct: 2,
                hint: "Windows - проприетарная ОС от Microsoft"
            },
            {
                question: "Что характерно для ОС реального времени?",
                options: [
                    "Высокие требования к графике",
                    "Гарантированное время реакции",
                    "Только текстовый интерфейс",
                    "Отсутствие многозадачности"
                ],
                correct: 1,
                hint: "ОСРВ должны обрабатывать события в строго определенные временные рамки"
            },
            {
                question: "Какая ОС является открытой?",
                options: [
                    "Windows",
                    "macOS",
                    "Linux",
                    "iOS"
                ],
                correct: 2,
                hint: "Открытые ОС имеют публично доступный исходный код"
            }
        ];

        const task = this.randomChoice(classifications, this.classificationGenerator);
        return {
            type: 'classification',
            title: 'Классификация ОС',
            description: task.question,
            options: task.options,
            correctAnswer: task.correct,
            hint: task.hint
        };
    }

    // 3. Задание на архитектуру ОС
    generateArchitectureTask() {
        const architectures = [
            {
                question: "Какая архитектура описывает монолитное ядро?",
                options: [
                    "Все компоненты ОС работают в пользовательском режиме",
                    "Все компоненты ОС собраны в одном модуле",
                    "Каждый компонент работает как отдельный сервер",
                    "Ядро состоит из микроядра и серверов"
                ],
                correct: 1,
                hint: "Монолитное ядро - вся ОС работает в одном адресном пространстве"
            },
            {
                question: "Что характерно для микроядерной архитектуры?",
                options: [
                    "Минимальное ядро, основные функции в пользовательском пространстве",
                    "Все драйверы входят в ядро",
                    "Отсутствие безопасности",
                    "Низкая производительность"
                ],
                correct: 0,
                hint: "Микроядерная архитектура минимизирует код, работающий в привилегированном режиме"
            },
            {
                question: "Какой компонент ОС управляет памятью?",
                options: [
                    "Планировщик",
                    "Менеджер памяти",
                    "Файловая система",
                    "Драйвер устройства"
                ],
                correct: 1,
                hint: "Менеджер памяти отвечает за распределение и защиту памяти"
            }
        ];

        const task = this.randomChoice(architectures, this.architectureGenerator);
        return {
            type: 'architecture',
            title: 'Архитектура ОС',
            description: task.question,
            options: task.options,
            correctAnswer: task.correct,
            hint: task.hint
        };
    }

    // 4. Задание на сценарии применения
    generateScenarioTask() {
        const scenarios = [
            {
                description: "Для научных вычислений и суперкомпьютеров какая ОС наиболее подходит?",
                options: [
                    "Windows Home",
                    "Linux",
                    "Android",
                    "iOS"
                ],
                correct: 1,
                hint: "Linux доминирует в HPC (High Performance Computing) из-за стабильности и гибкости"
            },
            {
                description: "Какая ОС лучше подходит для встроенных систем с ограниченными ресурсами?",
                options: [
                    "Windows Server",
                    "Embedded Linux",
                    "macOS",
                    "Chrome OS"
                ],
                correct: 1,
                hint: "Embedded Linux можно настроить для работы с минимальными ресурсами"
            },
            {
                description: "Для графического дизайна и монтажа видео чаще используют:",
                options: [
                    "Linux",
                    "Windows",
                    "macOS",
                    "FreeBSD"
                ],
                correct: 2,
                hint: "macOS популярна среди творческих профессионалов из-за оптимизированного ПО"
            }
        ];

        const task = this.randomChoice(scenarios, this.scenarioGenerator);
        return {
            type: 'scenario',
            title: 'Применение ОС',
            description: task.description,
            options: task.options,
            correctAnswer: task.correct,
            hint: task.hint
        };
    }

    // 5. Задание на визуализацию архитектуры
    generateDiagramTask() {
        const diagrams = [
            {
                description: "Какая диаграмма правильно показывает архитектуру монолитного ядра?",
                diagrams: [
                    {
                        label: "Вариант A",
                        html: `
                            <div class="architecture-diagram">
                                <div class="kernel-item">Ядро ОС
                                    <div class="shell-item">Планировщик</div>
                                    <div class="shell-item">Драйверы</div>
                                    <div class="shell-item">Файловая система</div>
                                </div>
                            </div>
                        `
                    },
                    {
                        label: "Вариант B", 
                        html: `
                            <div class="architecture-diagram">
                                <div class="kernel-item">Микроядро</div>
                                <div class="system-item">Сервер процессов</div>
                                <div class="system-item">Сервер памяти</div>
                                <div class="system-item">Сервер файлов</div>
                            </div>
                        `
                    },
                    {
                        label: "Вариант C",
                        html: `
                            <div class="system-diagram">
                                <div class="system-item">Приложение</div>
                                <div class="system-item">Библиотеки</div>
                                <div class="kernel-item">Аппаратура</div>
                            </div>
                        `
                    },
                    {
                        label: "Вариант D",
                        html: `
                            <div class="architecture-diagram">
                                <div class="shell-item">Ядро</div>
                                <div class="kernel-item">Пользователь</div>
                            </div>
                        `
                    }
                ],
                correct: 0,
                hint: "В монолитной архитектуре все компоненты ядра работают вместе"
            },
            {
                description: "Какая диаграмма показывает гибридную архитектуру?",
                diagrams: [
                    {
                        label: "Вариант A",
                        html: `
                            <div class="architecture-diagram">
                                <div class="kernel-item">Микроядро</div>
                                <div class="system-item">Серверы в пользовательском пространстве</div>
                                <div class="system-item">Некоторые драйверы в ядре</div>
                            </div>
                        `
                    },
                    {
                        label: "Вариант B",
                        html: `
                            <div class="architecture-diagram">
                                <div class="kernel-item">Монолитное ядро</div>
                            </div>
                        `
                    },
                    {
                        label: "Вариант C",
                        html: `
                            <div class="system-diagram">
                                <div class="system-item">Только приложения</div>
                            </div>
                        `
                    },
                    {
                        label: "Вариант D",
                        html: `
                            <div class="architecture-diagram">
                                <div class="shell-item">Аппаратура</div>
                                <div class="kernel-item">Пользователь</div>
                            </div>
                        `
                    }
                ],
                correct: 0,
                hint: "Гибридная архитектура сочетает микроядерный подход с некоторыми компонентами в ядре"
            }
        ];

        const task = this.randomChoice(diagrams, this.multipleChoiceGenerator);
        return {
            type: 'diagram',
            title: 'Архитектурные схемы',
            description: task.description,
            diagrams: task.diagrams,
            correctAnswer: task.correct,
            hint: task.hint
        };
    }

    // Генерация набора из 5 уникальных заданий
    generateTaskSet() {
        const taskTypes = [
            this.generateDefinitionTask.bind(this),
            this.generateClassificationTask.bind(this),
            this.generateArchitectureTask.bind(this),
            this.generateScenarioTask.bind(this),
            this.generateDiagramTask.bind(this)
        ];

        // Перемешиваем типы заданий
        for (let i = taskTypes.length - 1; i > 0; i--) {
            const j = Math.floor(this.definitionGenerator() * (i + 1));
            [taskTypes[i], taskTypes[j]] = [taskTypes[j], taskTypes[i]];
        }

        return taskTypes.map(generator => generator());
    }

    updateSeed() {
        this.seed = Date.now();
        this.initializeGenerators();
    }
}

// Полифилл для seedrandom
if (typeof Math.seedrandom === 'undefined') {
    Math.seedrandom = function(seed) {
        return function() {
            seed = (seed * 9301 + 49297) % 233280;
            return seed / 233280;
        };
    };
}