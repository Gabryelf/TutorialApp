class QuestionGenerator {
    constructor() {
        this.seed = Date.now();
        this.initializeGenerators();
    }

    initializeGenerators() {
        this.definitionGenerator = new Math.seedrandom(this.seed + 1);
        this.multipleChoiceGenerator = new Math.seedrandom(this.seed + 2);
        this.comparisonGenerator = new Math.seedrandom(this.seed + 3);
        this.syncGenerator = new Math.seedrandom(this.seed + 4);
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
                term: "Процесс",
                options: [
                    "Программа в состоянии выполнения",
                    "Легковесный поток выполнения",
                    "Механизм синхронизации",
                    "Область памяти для данных"
                ],
                correct: 0,
                hint: "Процесс имеет собственное адресное пространство и ресурсы"
            },
            {
                term: "Поток (Thread)",
                options: [
                    "Отдельная программа",
                    "Легковесный процесс внутри процесса",
                    "Тип операционной системы", 
                    "Метод шифрования данных"
                ],
                correct: 1,
                hint: "Потоки разделяют память родительского процесса"
            },
            {
                term: "Мьютекс",
                options: [
                    "Тип процесса",
                    "Механизм взаимного исключения",
                    "Вид памяти",
                    "Протокол сети"
                ],
                correct: 1,
                hint: "Мьютекс обеспечивает эксклюзивный доступ к ресурсу"
            },
            {
                term: "Семафор",
                options: [
                    "Язык программирования",
                    "Счетчик для управления доступом к ресурсам",
                    "Тип файловой системы",
                    "Метод сжатия данных"
                ],
                correct: 1,
                hint: "Семафоры могут разрешать доступ нескольким потокам одновременно"
            },
            {
                term: "Взаимная блокировка (Deadlock)",
                options: [
                    "Быстрое выполнение программы",
                    "Ситуация, когда процессы ждут друг друга",
                    "Тип многопоточности",
                    "Метод оптимизации"
                ],
                correct: 1,
                hint: "Для взаимной блокировки нужны 4 условия одновременно"
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

    // 2. Задание на сравнение процессов и потоков
    generateComparisonTask() {
        const comparisons = [
            {
                question: "Что общего у процессов и потоков?",
                options: [
                    "Имеют отдельные адресные пространства",
                    "Могут выполняться параллельно",
                    "Требуют отдельных ресурсов ОС",
                    "Не разделяют данные"
                ],
                correct: 1,
                hint: "И процессы, и потоки могут выполняться конкурентно"
            },
            {
                question: "Чем поток отличается от процесса?",
                options: [
                    "Поток тяжелее процесса",
                    "Потоки разделяют память процесса",
                    "Процессы легче потоков",
                    "Потоки требуют больше ресурсов"
                ],
                correct: 1,
                hint: "Потоки - легковесные, разделяют память родительского процесса"
            },
            {
                question: "Что характерно только для процессов?",
                options: [
                    "Разделение памяти с другими процессами",
                    "Собственное адресное пространство",
                    "Быстрое создание и уничтожение",
                    "Минимальные накладные расходы"
                ],
                correct: 1,
                hint: "Каждый процесс имеет изолированное адресное пространство"
            }
        ];

        const task = this.randomChoice(comparisons, this.comparisonGenerator);
        return {
            type: 'comparison',
            title: 'Сравнение процессов и потоков',
            description: task.question,
            options: task.options,
            correctAnswer: task.correct,
            hint: task.hint
        };
    }

    // 3. Задание на синхронизацию
    generateSynchronizationTask() {
        const syncProblems = [
            {
                scenario: "Несколько потоков записывают данные в общий файл. Как обеспечить целостность данных?",
                options: [
                    "Использовать глобальные переменные",
                    "Применить мьютекс для блокировки доступа к файлу",
                    "Увеличить приоритет потоков",
                    "Использовать больше памяти"
                ],
                correct: 1,
                hint: "Мьютекс обеспечивает эксклюзивный доступ к разделяемому ресурсу"
            },
            {
                scenario: "Производитель создает данные, потребитель их обрабатывает. Как синхронизировать?",
                options: [
                    "Использовать семафор для подсчета элементов",
                    "Создать больше процессов",
                    "Уменьшить количество потоков",
                    "Использовать глобальные флаги"
                ],
                correct: 0,
                hint: "Семафоры идеально подходят для задач производитель-потребитель"
            },
            {
                scenario: "Как избежать состояния гонки (race condition)?",
                options: [
                    "Увеличить скорость выполнения",
                    "Использовать механизмы синхронизации",
                    "Уменьшить количество ядер CPU",
                    "Отключить многопоточность"
                ],
                correct: 1,
                hint: "Синхронизация обеспечивает корректный доступ к общим ресурсам"
            }
        ];

        const task = this.randomChoice(syncProblems, this.syncGenerator);
        return {
            type: 'synchronization',
            title: 'Синхронизация потоков',
            description: task.scenario,
            options: task.options,
            correctAnswer: task.correct,
            hint: task.hint
        };
    }

    // 4. Задание на сценарии использования
    generateScenarioTask() {
        const scenarios = [
            {
                description: "Веб-сервер обрабатывает множество одновременных запросов. Какую архитектуру выбрать?",
                options: [
                    "Однопроцессную",
                    "Многопроцессную с изоляцией",
                    "Однопоточную с очередью",
                    "Без использования потоков"
                ],
                correct: 1,
                hint: "Многопроцессная архитектура обеспечивает изоляцию и стабильность"
            },
            {
                description: "Приложение выполняет тяжелые вычисления и должно оставаться отзывчивым. Что использовать?",
                options: [
                    "Блокирующие операции в основном потоке",
                    "Вычисления в отдельном потоке",
                    "Увеличить приоритет процесса",
                    "Отключить интерфейс на время вычислений"
                ],
                correct: 1,
                hint: "Отдельный поток для вычислений не блокирует UI"
            },
            {
                description: "Нужно обработать большое количество независимых задач. Что эффективнее?",
                options: [
                    "Создать отдельный процесс для каждой задачи",
                    "Использовать пул потоков",
                    "Выполнять последовательно",
                    "Использовать один поток"
                ],
                correct: 1,
                hint: "Пул потоков эффективен для множества коротких задач"
            }
        ];

        const task = this.randomChoice(scenarios, this.scenarioGenerator);
        return {
            type: 'scenario',
            title: 'Архитектурные решения',
            description: task.description,
            options: task.options,
            correctAnswer: task.correct,
            hint: task.hint
        };
    }

    // 5. Задание на визуализацию (диаграммы процессов/потоков)
    generateDiagramTask() {
        const diagrams = [
            {
                description: "Какая диаграмма показывает правильную организацию процессов и потоков?",
                diagrams: [
                    {
                        label: "Вариант A",
                        html: `
                            <div class="process-diagram">
                                <div class="process-item">Процесс 1</div>
                                <div class="process-item">Процесс 2</div>
                                <div class="process-item">Процесс 3</div>
                            </div>
                        `
                    },
                    {
                        label: "Вариант B", 
                        html: `
                            <div class="process-diagram">
                                <div class="process-item">Процесс 1
                                    <div class="thread-item">Поток 1.1</div>
                                    <div class="thread-item">Поток 1.2</div>
                                </div>
                            </div>
                        `
                    },
                    {
                        label: "Вариант C",
                        html: `
                            <div class="thread-diagram">
                                <div class="thread-item">Поток 1</div>
                                <div class="thread-item">Поток 2</div>
                                <div class="process-item">Процесс 1</div>
                            </div>
                        `
                    },
                    {
                        label: "Вариант D",
                        html: `
                            <div class="process-diagram">
                                <div class="thread-item">Процесс 1</div>
                                <div class="process-item">Поток 1</div>
                            </div>
                        `
                    }
                ],
                correct: 1,
                hint: "Потоки находятся внутри процессов, а не наоборот"
            }
        ];

        const task = this.randomChoice(diagrams, this.multipleChoiceGenerator);
        return {
            type: 'diagram',
            title: 'Визуализация архитектуры',
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
            this.generateComparisonTask.bind(this),
            this.generateSynchronizationTask.bind(this),
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