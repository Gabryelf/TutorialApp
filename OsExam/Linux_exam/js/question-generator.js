class QuestionGenerator {
    constructor() {
        this.seed = Date.now();
        this.initializeGenerators();
    }

    initializeGenerators() {
        // Инициализация случайных генераторов для каждого типа заданий
        this.commandGenerator = new Math.seedrandom(this.seed + 1);
        this.multipleChoiceGenerator = new Math.seedrandom(this.seed + 2);
        this.fileSystemGenerator = new Math.seedrandom(this.seed + 3);
        this.processGenerator = new Math.seedrandom(this.seed + 4);
        this.permissionGenerator = new Math.seedrandom(this.seed + 5);
    }

    // Генерация случайного числа в диапазоне
    randomInt(min, max, generator) {
        return Math.floor(generator() * (max - min + 1)) + min;
    }

    // Выбор случайного элемента из массива
    randomChoice(array, generator) {
        return array[Math.floor(generator() * array.length)];
    }

    // 1. Задание на ввод команды
    generateCommandTask() {
        const commands = [
            {
                question: "Создайте директорию с именем 'projects' в текущей папке",
                correct: "mkdir projects",
                hint: "Используйте команду mkdir для создания директории"
            },
            {
                question: "Скопируйте файл 'source.txt' в директорию 'backup'",
                correct: "cp source.txt backup/",
                hint: "Команда cp используется для копирования файлов"
            },
            {
                question: "Переименуйте файл 'oldname.txt' в 'newname.txt'",
                correct: "mv oldname.txt newname.txt",
                hint: "Команда mv используется для перемещения и переименования"
            },
            {
                question: "Найдите все файлы с расширением '.log' в текущей директории",
                correct: "find . -name '*.log'",
                hint: "Используйте команду find с параметром -name"
            },
            {
                question: "Покажите последние 10 строк файла 'server.log'",
                correct: "tail -10 server.log",
                hint: "Команда tail показывает конец файла"
            }
        ];

        const task = this.randomChoice(commands, this.commandGenerator);
        return {
            type: 'command',
            title: 'Ввод команды Linux',
            description: task.question,
            correctAnswer: task.correct,
            hint: task.hint
        };
    }

    // 2. Задание с множественным выбором
    generateMultipleChoiceTask() {
        const questions = [
            {
                question: "Что делает команда 'chmod 755 filename'?",
                options: [
                    "Удаляет файл",
                    "Дает права: владелец - чтение/запись/исполнение, группа и другие - чтение/исполнение",
                    "Меняет владельца файла",
                    "Создает копию файла"
                ],
                correct: 1,
                hint: "755 в восьмеричной системе соответствует rwxr-xr-x"
            },
            {
                question: "Какой командой можно посмотреть запущенные процессы?",
                options: ["ls", "ps", "cd", "cat"],
                correct: 1,
                hint: "Эта команда показывает snapshot процессов"
            },
            {
                question: "Что означает символ '~' в путях Linux?",
                options: [
                    "Корневая директория",
                    "Домашняя директория текущего пользователя",
                    "Текущая директория",
                    "Родительская директория"
                ],
                correct: 1,
                hint: "Это сокращение для домашней директории пользователя"
            }
        ];

        const task = this.randomChoice(questions, this.multipleChoiceGenerator);
        return {
            type: 'multiple_choice',
            title: 'Теоретический вопрос',
            description: task.question,
            options: task.options,
            correctAnswer: task.correct,
            hint: task.hint
        };
    }

    // 3. Задание на структуру файловой системы
    generateFileSystemTask() {
        const structures = [
            {
                description: "Создайте следующую структуру:\n/projects/\n  website/\n    index.html\n    css/\n      style.css\n  documents/",
                commands: [
                    "mkdir -p projects/website/css",
                    "mkdir projects/documents",
                    "touch projects/website/index.html",
                    "touch projects/website/css/style.css"
                ],
                correctSequence: 0,
                hint: "Используйте mkdir -p для создания вложенных директорий и touch для создания файлов"
            },
            {
                description: "Создайте структуру для бэкенд проекта:\n/app/\n  src/\n    controllers/\n    models/\n  config/\n    database.json",
                commands: [
                    "mkdir -p app/src/controllers app/src/models app/config",
                    "touch app/config/database.json",
                    "mkdir app/tests",
                    "touch app/src/main.py"
                ],
                correctSequence: 0,
                hint: "Обратите внимание на вложенность директорий"
            }
        ];

        const task = this.randomChoice(structures, this.fileSystemGenerator);
        return {
            type: 'file_system',
            title: 'Создание структуры файлов',
            description: task.description,
            commands: task.commands,
            correctAnswer: task.correctSequence,
            hint: task.hint
        };
    }

    // 4. Задание на управление процессами
    generateProcessTask() {
        const scenarios = [
            {
                description: "Запустите процесс 'nginx' в фоновом режиме, затем найдите его PID и корректно завершите",
                steps: [
                    "Запуск: nginx",
                    "Поиск PID: ps aux | grep nginx",
                    "Завершение: kill [PID]",
                    "Проверка: ps aux | grep nginx"
                ],
                correctOrder: [0, 1, 2, 3],
                hint: "Используйте & для запуска в фоне, ps для поиска PID, kill для завершения"
            },
            {
                description: "Запустите Python скрипт 'server.py', перенаправьте вывод в файл 'log.txt' и завершите по Ctrl+C",
                steps: [
                    "python server.py > log.txt 2>&1",
                    "Нажмите Ctrl+C для завершения",
                    "Проверьте файл log.txt",
                    "Перезапустите скрипт"
                ],
                correctOrder: [0, 1, 2],
                hint: "> перенаправляет stdout, 2>&1 перенаправляет stderr в stdout"
            }
        ];

        const task = this.randomChoice(scenarios, this.processGenerator);
        return {
            type: 'process',
            title: 'Управление процессами',
            description: task.description,
            steps: task.steps,
            correctAnswer: task.correctOrder,
            hint: task.hint
        };
    }

    // 5. Задание на права доступа
    generatePermissionTask() {
        const problems = [
            {
                description: "Файл 'script.sh' не исполняется. Установите права: владелец - все, группа - чтение/исполнение, другие - нет прав",
                currentRights: "-rw-r--r--",
                targetRights: "-rwxr-x---",
                correctCommand: "chmod 750 script.sh",
                hint: "750 в восьмеричной системе: владелец=7(rwx), группа=5(r-x), другие=0(---)"
            },
            {
                description: "Сделайте файл 'config.txt' доступным только для чтения всем пользователям",
                currentRights: "-rw-rw-r--",
                targetRights: "-r--r--r--",
                correctCommand: "chmod 444 config.txt",
                hint: "444 означает чтение для всех (r--r--r--)"
            }
        ];

        const task = this.randomChoice(problems, this.permissionGenerator);
        return {
            type: 'permission',
            title: 'Права доступа к файлам',
            description: task.description,
            currentRights: task.currentRights,
            targetRights: task.targetRights,
            correctAnswer: task.correctCommand,
            hint: task.hint
        };
    }

    // Генерация набора из 5 уникальных заданий
    generateTaskSet() {
        const taskTypes = [
            this.generateCommandTask.bind(this),
            this.generateMultipleChoiceTask.bind(this),
            this.generateFileSystemTask.bind(this),
            this.generateProcessTask.bind(this),
            this.generatePermissionTask.bind(this)
        ];

        // Перемешиваем типы заданий для нелинейности
        for (let i = taskTypes.length - 1; i > 0; i--) {
            const j = Math.floor(this.commandGenerator() * (i + 1));
            [taskTypes[i], taskTypes[j]] = [taskTypes[j], taskTypes[i]];
        }

        return taskTypes.map(generator => generator());
    }

    // Обновление сида для нового набора заданий
    updateSeed() {
        this.seed = Date.now();
        this.initializeGenerators();
    }
}

// Полифилл для seedrandom если нужен
if (typeof Math.seedrandom === 'undefined') {
    Math.seedrandom = function(seed) {
        return function() {
            seed = (seed * 9301 + 49297) % 233280;
            return seed / 233280;
        };
    };
}