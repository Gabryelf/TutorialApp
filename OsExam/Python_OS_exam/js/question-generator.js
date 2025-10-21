class QuestionGenerator {
    constructor() {
        this.seed = Date.now();
        this.initializeGenerators();
    }

    initializeGenerators() {
        this.codeGenerator = new Math.seedrandom(this.seed + 1);
        this.multipleChoiceGenerator = new Math.seedrandom(this.seed + 2);
        this.syncGenerator = new Math.seedrandom(this.seed + 3);
        this.memoryGenerator = new Math.seedrandom(this.seed + 4);
        this.scenarioGenerator = new Math.seedrandom(this.seed + 5);
    }

    randomInt(min, max, generator) {
        return Math.floor(generator() * (max - min + 1)) + min;
    }

    randomChoice(array, generator) {
        return array[Math.floor(generator() * array.length)];
    }

    // 1. Задание на анализ кода Python
    generateCodeTask() {
        const codeExamples = [
            {
                code: `import threading
import time

def worker():
    print("Поток запущен")
    time.sleep(2)
    print("Поток завершен")

threads = []
for i in range(3):
    t = threading.Thread(target=worker)
    threads.append(t)
    t.start()

for t in threads:
    t.join()`,
                question: "Что произойдет при выполнении этого кода?",
                options: [
                    "Будут созданы 3 процесса",
                    "Будут созданы 3 потока, которые выполнятся параллельно",
                    "Код выполнится последовательно без многопоточности",
                    "Произойдет ошибка из-за GIL"
                ],
                correct: 1,
                hint: "Thread создает потоки, а не процессы. GIL не предотвращает создание потоков."
            },
            {
                code: `import multiprocessing

def square(x):
    return x * x

if __name__ == "__main__":
    with multiprocessing.Pool(4) as pool:
        results = pool.map(square, [1, 2, 3, 4, 5])
    print(results)`,
                question: "Какой результат будет выведен?",
                options: [
                    "[1, 2, 3, 4, 5]",
                    "[1, 4, 9, 16, 25]",
                    "Ошибка выполнения",
                    "Ничего не выведется"
                ],
                correct: 1,
                hint: "Pool.map применяет функцию к каждому элементу списка параллельно"
            },
            {
                code: `import threading

counter = 0

def increment():
    global counter
    for _ in range(1000):
        counter += 1

threads = []
for i in range(10):
    t = threading.Thread(target=increment)
    threads.append(t)
    t.start()

for t in threads:
    t.join()

print(counter)`,
                question: "Какое значение будет выведено?",
                options: [
                    "10000",
                    "Меньше 10000 из-за состояния гонки",
                    "Больше 10000",
                    "Ошибка синхронизации"
                ],
                correct: 1,
                hint: "Операция += не атомарна в Python, возникает состояние гонки"
            }
        ];

        const task = this.randomChoice(codeExamples, this.codeGenerator);
        return {
            type: 'code',
            title: 'Анализ кода Python',
            description: task.question,
            code: task.code,
            options: task.options,
            correctAnswer: task.correct,
            hint: task.hint
        };
    }

    // 2. Задание на многопоточность vs многопроцессность
    generateMultipleChoiceTask() {
        const questions = [
            {
                question: "Что такое GIL в Python?",
                options: [
                    "Графический интерфейс Linux",
                    "Глобальная блокировка интерпретатора",
                    "Генератор итераторов языка",
                    "Глобальный индекс библиотек"
                ],
                correct: 1,
                hint: "GIL предотвращает одновременное выполнение байткода Python несколькими потоками"
            },
            {
                question: "Когда следует использовать multiprocessing вместо threading?",
                options: [
                    "Для I/O-bound задач",
                    "Для CPU-bound задач",
                    "Для работы с сетью",
                    "Для чтения файлов"
                ],
                correct: 1,
                hint: "multiprocessing обходит GIL, создавая отдельные процессы с собственными интерпретаторами"
            },
            {
                question: "Какой модуль использовать для асинхронного программирования?",
                options: [
                    "multiprocessing",
                    "threading", 
                    "asyncio",
                    "subprocess"
                ],
                correct: 2,
                hint: "asyncio предназначен для асинхронного I/O с использованием корутин"
            }
        ];

        const task = this.randomChoice(questions, this.multipleChoiceGenerator);
        return {
            type: 'multiple_choice',
            title: 'Многопоточность в Python',
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
                scenario: "Как правильно синхронизировать доступ к общему ресурсу из нескольких потоков?",
                options: [
                    "Использовать global переменные",
                    "Применить threading.Lock()",
                    "Увеличить количество потоков",
                    "Использовать больше памяти"
                ],
                correct: 1,
                hint: "Lock обеспечивает эксклюзивный доступ к критической секции"
            },
            {
                scenario: "Для чего используется threading.Event?",
                options: [
                    "Для создания новых потоков",
                    "Для сигнализации между потоками",
                    "Для управления памятью",
                    "Для ускорения выполнения"
                ],
                correct: 1,
                hint: "Event позволяет потокам ждать сигнала от других потоков"
            },
            {
                scenario: "Что делает метод queue.Queue.get()?",
                options: [
                    "Создает новую очередь",
                    "Блокирует поток до появления элемента",
                    "Удаляет очередь",
                    "Запускает поток"
                ],
                correct: 1,
                hint: "Queue.get() блокирует поток, пока в очереди не появится элемент для извлечения"
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

    // 4. Задание на управление памятью
    generateMemoryTask() {
        const memoryQuestions = [
            {
                question: "Как работает сборщик мусора в Python?",
                options: [
                    "Удаляет файлы с диска",
                    "Освобождает память от неиспользуемых объектов",
                    "Очищает оперативную память полностью",
                    "Управляет виртуальной памятью"
                ],
                correct: 1,
                hint: "GC использует подсчет ссылок и generational garbage collection"
            },
            {
                question: "Что такое reference counting?",
                options: [
                    "Подсчет файлов в директории",
                    "Подсчет ссылок на объект в памяти",
                    "Количество потоков в процессе",
                    "Размер памяти процесса"
                ],
                correct: 1,
                hint: "Когда счетчик ссылок объекта достигает нуля, память освобождается"
            },
            {
                question: "Как предотвратить утечку памяти в Python?",
                options: [
                    "Использовать del для ненужных объектов",
                    "Увеличить размер кучи",
                    "Отключить сборщик мусора",
                    "Использовать только глобальные переменные"
                ],
                correct: 0,
                hint: "Явное удаление ссылок помогает GC быстрее освобождать память"
            }
        ];

        const task = this.randomChoice(memoryQuestions, this.memoryGenerator);
        return {
            type: 'memory',
            title: 'Управление памятью',
            description: task.question,
            options: task.options,
            correctAnswer: task.correct,
            hint: task.hint
        };
    }

    // 5. Задание на сценарии применения
    generateScenarioTask() {
        const scenarios = [
            {
                description: "Нужно обработать 1000 изображений. Какой подход выбрать?",
                options: [
                    "threading - потоки легковесные",
                    "multiprocessing - истинная параллельность для CPU-bound",
                    "asyncio - асинхронность эффективна",
                    "Последовательно в одном потоке"
                ],
                correct: 1,
                hint: "Обработка изображений - CPU-bound задача, multiprocessing обходит GIL"
            },
            {
                description: "Требуется скачать 100 веб-страниц. Что эффективнее?",
                options: [
                    "multiprocessing - создаст процессы",
                    "threading - I/O-bound задача",
                    "asyncio - оптимально для I/O",
                    "Последовательные запросы"
                ],
                correct: 2,
                hint: "Для I/O-bound задач asyncio наиболее эффективен благодаря отсутствию накладных расходов потоков"
            },
            {
                description: "Как организовать общение между процессами?",
                options: [
                    "Использовать глобальные переменные",
                    "Применить multiprocessing.Queue",
                    "Создать больше потоков",
                    "Использовать файловую систему"
                ],
                correct: 1,
                hint: "multiprocessing.Queue обеспечивает безопасную передачу данных между процессами"
            }
        ];

        const task = this.randomChoice(scenarios, this.scenarioGenerator);
        return {
            type: 'scenario',
            title: 'Практические сценарии',
            description: task.description,
            options: task.options,
            correctAnswer: task.correct,
            hint: task.hint
        };
    }

    // 6. Задание на визуализацию архитектуры
    generateDiagramTask() {
        const diagrams = [
            {
                description: "Какая диаграмма показывает правильную архитектуру многопоточного приложения?",
                diagrams: [
                    {
                        label: "Вариант A",
                        html: `
                            <div class="process-diagram">
                                <div class="process-item">Процесс Python
                                    <div class="thread-item">Главный поток</div>
                                    <div class="thread-item">Рабочий поток 1</div>
                                    <div class="thread-item">Рабочий поток 2</div>
                                </div>
                            </div>
                        `
                    },
                    {
                        label: "Вариант B", 
                        html: `
                            <div class="process-diagram">
                                <div class="process-item">Процесс 1</div>
                                <div class="process-item">Процесс 2</div>
                                <div class="process-item">Процесс 3</div>
                            </div>
                        `
                    },
                    {
                        label: "Вариант C",
                        html: `
                            <div class="memory-diagram">
                                <div class="memory-item">Память процесса 1</div>
                                <div class="memory-item">Память процесса 2</div>
                                <div class="thread-item">Общий поток</div>
                            </div>
                        `
                    }
                ],
                correct: 0,
                hint: "В многопоточном приложении потоки разделяют память родительского процесса"
            },
            {
                description: "Какая архитектура подходит для CPU-bound задачи с использованием multiprocessing?",
                diagrams: [
                    {
                        label: "Вариант A",
                        html: `
                            <div class="process-diagram">
                                <div class="process-item">Главный процесс
                                    <div class="thread-item">Поток 1</div>
                                    <div class="thread-item">Поток 2</div>
                                </div>
                            </div>
                        `
                    },
                    {
                        label: "Вариант B",
                        html: `
                            <div class="process-diagram">
                                <div class="process-item">Главный процесс</div>
                                <div class="process-item">Рабочий процесс 1</div>
                                <div class="process-item">Рабочий процесс 2</div>
                                <div class="process-item">Рабочий процесс 3</div>
                            </div>
                        `
                    }
                ],
                correct: 1,
                hint: "multiprocessing создает отдельные процессы, каждый со своим интерпретатором Python"
            }
        ];

        const task = this.randomChoice(diagrams, this.multipleChoiceGenerator);
        return {
            type: 'diagram',
            title: 'Архитектура приложений',
            description: task.description,
            diagrams: task.diagrams,
            correctAnswer: task.correct,
            hint: task.hint
        };
    }

    // Генерация набора из 5 уникальных заданий
    generateTaskSet() {
        const taskTypes = [
            this.generateCodeTask.bind(this),
            this.generateMultipleChoiceTask.bind(this),
            this.generateSynchronizationTask.bind(this),
            this.generateMemoryTask.bind(this),
            this.generateScenarioTask.bind(this),
            this.generateDiagramTask.bind(this)
        ];

        // Выбираем 5 случайных типов заданий
        const selectedTypes = [];
        while (selectedTypes.length < 5) {
            const randomType = this.randomChoice(taskTypes, this.codeGenerator);
            if (!selectedTypes.includes(randomType)) {
                selectedTypes.push(randomType);
            }
        }

        return selectedTypes.map(generator => generator());
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