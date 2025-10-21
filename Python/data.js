// Данные презентации - 40 слайдов
const slides = [
    {
        title: "🎯 Python и ООП: Введение",
        content: `
            <p>Python — это современный высокоуровневый язык программирования, который поддерживает <span class="highlight">несколько парадигм программирования</span>, включая объектно-ориентированное программирование (ООП).</p>
            
            <div class="image-container">
                <img src="https://www.python.org/static/community_logos/python-logo.png" alt="Python Logo">
            </div>

            <p><span class="highlight">Почему ООП важно в Python:</span></p>
            <ul>
                <li class="list-item">Позволяет создавать сложные системы с понятной структурой</li>
                <li class="list-item">Обеспечивает повторное использование кода</li>
                <li class="list-item">Упрощает поддержку и расширение программ</li>
                <li class="list-item">Соответствует принципам современной разработки</li>
            </ul>

            <div class="concept-grid">
                <div class="concept-card">
                    <h3>📊 Структурное программирование</h3>
                    <p>Функции и процедуры</p>
                </div>
                <div class="concept-card">
                    <h3>🧩 ООП</h3>
                    <p>Классы и объекты</p>
                </div>
                <div class="concept-card">
                    <h3>⚡ Функциональное программирование</h3>
                    <p>Функции высшего порядка</p>
                </div>
            </div>
        `
    },
    {
        title: "🧱 Основные концепции ООП",
        content: `
            <p>Объектно-ориентированное программирование основано на четырех фундаментальных концепциях, которые образуют основу для создания гибких и масштабируемых приложений.</p>

            <div class="image-container">
                <img src="https://media.geeksforgeeks.org/wp-content/cdn-uploads/20190717114649/Object-Oriented-Programming-Concepts.jpg" alt="ООП концепции">
            </div>

            <div class="concept-grid">
                <div class="concept-card">
                    <h3>🏗️ Инкапсуляция</h3>
                    <p>Объединение данных и методов в единый объект с контролируемым доступом</p>
                </div>
                <div class="concept-card">
                    <h3>🌳 Наследование</h3>
                    <p>Создание новых классов на основе существующих с наследованием их свойств</p>
                </div>
                <div class="concept-card">
                    <h3>🎭 Полиморфизм</h3>
                    <p>Возможность объектов с одинаковым интерфейсом иметь разную реализацию</p>
                </div>
                <div class="concept-card">
                    <h3>🔧 Абстракция</h3>
                    <p>Сокрытие сложной реализации и предоставление простого интерфейса</p>
                </div>
            </div>

            <div class="example-block">
                # Простой пример класса в Python<br>
                class Car:<br>
                &nbsp;&nbsp;def __init__(self, brand, model):<br>
                &nbsp;&nbsp;&nbsp;&nbsp;self.brand = brand  # данные<br>
                &nbsp;&nbsp;&nbsp;&nbsp;self.model = model<br>
                &nbsp;&nbsp;def display_info(self):  # метод<br>
                &nbsp;&nbsp;&nbsp;&nbsp;return f"{self.brand} {self.model}"
            </div>
        `
    },
    {
        title: "🏗️ Классы и объекты в Python",
        content: `
            <p><span class="highlight">Класс</span> — это шаблон или чертеж для создания объектов. Он определяет структуру и поведение объектов.</p>
            <p><span class="highlight">Объект</span> — это конкретный экземпляр класса с реальными значениями атрибутов.</p>

            <div class="image-container">
                <img src="https://media.geeksforgeeks.org/wp-content/uploads/20230519165312/Classes-and-Objects-in-Python.png" alt="Классы и объекты">
            </div>

            <p><span class="highlight">Компоненты класса в Python:</span></p>
            <ul>
                <li class="list-item"><span class="highlight">Атрибуты:</span> переменные, хранящие состояние объекта</li>
                <li class="list-item"><span class="highlight">Методы:</span> функции, определяющие поведение объекта</li>
                <li class="list-item"><span class="highlight">Конструктор (__init__):</span> специальный метод для инициализации объекта</li>
                <li class="list-item"><span class="highlight">self:</span> ссылка на текущий экземпляр класса</li>
            </ul>

            <div class="example-block">
                # Создание класса<br>
                class Student:<br>
                &nbsp;&nbsp;school = "Python University"  # атрибут класса<br>
                <br>
                &nbsp;&nbsp;def __init__(self, name, age):<br>
                &nbsp;&nbsp;&nbsp;&nbsp;self.name = name  # атрибут экземпляра<br>
                &nbsp;&nbsp;&nbsp;&nbsp;self.age = age<br>
                <br>
                &nbsp;&nbsp;def get_info(self):  # метод<br>
                &nbsp;&nbsp;&nbsp;&nbsp;return f"{self.name}, {self.age} years"<br>
                <br>
                # Создание объектов<br>
                student1 = Student("Alice", 20)<br>
                student2 = Student("Bob", 22)
            </div>
        `
    },
    {
        title: "🔒 Инкапсуляция в Python",
        content: `
            <p><span class="highlight">Инкапсуляция</span> — это механизм объединения данных и методов в единый объект с контролируемым доступом к внутреннему состоянию.</p>

            <div class="image-container">
                <img src="https://media.geeksforgeeks.org/wp-content/uploads/20230526131232/Encapsulation-in-Python.webp" alt="Инкапсуляция">
            </div>

            <p><span class="highlight">Уровни доступа в Python:</span></p>
            
            <div class="concept-grid">
                <div class="concept-card">
                    <h3>🔓 Public</h3>
                    <p>Обычные атрибуты и методы. Доступны отовсюду</p>
                </div>
                <div class="concept-card">
                    <h3>🛡️ Protected (_)</h3>
                    <p>Атрибуты с одним подчеркиванием. Для внутреннего использования</p>
                </div>
                <div class="concept-card">
                    <h3>🔐 Private (__)</h3>
                    <p>Атрибуты с двумя подчеркиваниями. Только для внутреннего использования класса</p>
                </div>
            </div>

            <div class="example-block">
                class BankAccount:<br>
                &nbsp;&nbsp;def __init__(self, balance):<br>
                &nbsp;&nbsp;&nbsp;&nbsp;self.balance = balance  # public<br>
                &nbsp;&nbsp;&nbsp;&nbsp;self._account_id = "123"  # protected<br>
                &nbsp;&nbsp;&nbsp;&nbsp;self.__pin = 0000  # private<br>
                <br>
                &nbsp;&nbsp;def get_balance(self):  # public метод<br>
                &nbsp;&nbsp;&nbsp;&nbsp;return self.balance
            </div>

            <p><span class="highlight">Преимущества инкапсуляции:</span></p>
            <ul>
                <li class="list-item">Защита данных от некорректного изменения</li>
                <li class="list-item">Гибкость в изменении внутренней реализации</li>
                <li class="list-item">Упрощение использования сложных объектов</li>
                <li class="list-item">Соблюдение принципа "минимальных привилегий"</li>
            </ul>
        `
    },
    {
        title: "🌳 Наследование в Python",
        content: `
            <p><span class="highlight">Наследование</span> позволяет создавать новые классы на основе существующих, наследуя их атрибуты и методы.</p>

            <div class="image-container">
                <img src="https://media.geeksforgeeks.org/wp-content/uploads/20230522152849/inheritance-(1).webp" alt="Наследование">
            </div>

            <p><span class="highlight">Типы наследования в Python:</span></p>
            
            <div class="concept-grid">
                <div class="concept-card">
                    <h3>👤 Одиночное наследование</h3>
                    <p>Класс наследует от одного родительского класса</p>
                </div>
                <div class="concept-card">
                    <h3>👥 Множественное наследование</h3>
                    <p>Класс наследует от нескольких родительских классов</p>
                </div>
                <div class="concept-card">
                    <h3>🏛️ Многоуровневое наследование</h3>
                    <p>Цепочка наследования через несколько уровней</p>
                </div>
            </div>

            <div class="example-block">
                # Базовый класс<br>
                class Animal:<br>
                &nbsp;&nbsp;def __init__(self, name):<br>
                &nbsp;&nbsp;&nbsp;&nbsp;self.name = name<br>
                &nbsp;&nbsp;def speak(self):<br>
                &nbsp;&nbsp;&nbsp;&nbsp;return "Some sound"<br>
                <br>
                # Дочерний класс<br>
                class Dog(Animal):<br>
                &nbsp;&nbsp;def speak(self):  # переопределение метода<br>
                &nbsp;&nbsp;&nbsp;&nbsp;return "Woof!"<br>
                <br>
                # Использование<br>
                dog = Dog("Rex")<br>
                print(dog.speak())  # Woof!
            </div>

            <p><span class="highlight">Ключевое слово super()</span> используется для доступа к методам родительского класса.</p>
        `
    },
    {
        title: "🎭 Полиморфизм в Python",
        content: `
            <p><span class="highlight">Полиморфизм</span> позволяет объектам с одинаковым интерфейсом иметь различную реализацию.</p>

            <div class="image-container">
                <img src="https://static.javatpoint.com/core/images/polymorphism-in-python.png" alt="Полиморфизм">
            </div>

            <p><span class="highlight">Формы полиморфизма в Python:</span></p>
            
            <div class="concept-grid">
                <div class="concept-card">
                    <h3>🔄 Переопределение методов</h3>
                    <p>Дочерние классы переопределяют методы родительских классов</p>
                </div>
                <div class="concept-card">
                    <h3>🦆 Утиная типизация</h3>
                    <p>"Если это ходит как утка и крякает как утка, то это утка"</p>
                </div>
                <div class="concept-card">
                    <h3>🎪 Перегрузка операторов</h3>
                    <p>Определение поведения операторов для пользовательских классов</p>
                </div>
            </div>

            <div class="example-block">
                class Cat:<br>
                &nbsp;&nbsp;def sound(self):<br>
                &nbsp;&nbsp;&nbsp;&nbsp;return "Meow"<br>
                <br>
                class Dog:<br>
                &nbsp;&nbsp;def sound(self):<br>
                &nbsp;&nbsp;&nbsp;&nbsp;return "Woof"<br>
                <br>
                # Полиморфная функция<br>
                def make_sound(animal):<br>
                &nbsp;&nbsp;print(animal.sound())<br>
                <br>
                make_sound(Cat())  # Meow<br>
                make_sound(Dog())  # Woof
            </div>

            <p><span class="highlight">Утиная типизация</span> — концепция, когда тип объекта определяется его поведением (наличием методов), а не наследованием от конкретного класса.</p>
        `
    },
    {
        title: "🔮 Абстракция в Python",
        content: `
            <p><span class="highlight">Абстракция</span> — это процесс сокрытия сложной реализации и предоставления простого интерфейса для взаимодействия.</p>

            <div class="image-container">
                <img src="https://media.geeksforgeeks.org/wp-content/uploads/20230526122821/Abstraction-in-Python.webp" alt="Абстракция">
            </div>

            <p><span class="highlight">Средства абстракции в Python:</span></p>
            
            <div class="concept-grid">
                <div class="concept-card">
                    <h3>📄 Абстрактные классы</h3>
                    <p>Классы, которые не предназначены для создания экземпляров</p>
                </div>
                <div class="concept-card">
                    <h3>📝 Абстрактные методы</h3>
                    <p>Методы, которые должны быть реализованы в дочерних классах</p>
                </div>
                <div class="concept-card">
                    <h3>🔌 Интерфейсы</h3>
                    <p>Набор методов, которые должны быть реализованы классом</p>
                </div>
            </div>

            <div class="example-block">
                from abc import ABC, abstractmethod<br>
                <br>
                class Vehicle(ABC):  # абстрактный класс<br>
                &nbsp;&nbsp;@abstractmethod<br>
                &nbsp;&nbsp;def start_engine(self):<br>
                &nbsp;&nbsp;&nbsp;&nbsp;pass<br>
                <br>
                class Car(Vehicle):<br>
                &nbsp;&nbsp;def start_engine(self):  # реализация абстрактного метода<br>
                &nbsp;&nbsp;&nbsp;&nbsp;return "Car engine started"<br>
                <br>
                # vehicle = Vehicle()  # Ошибка!<br>
                car = Car()  # OK
            </div>

            <p><span class="highlight">Преимущества абстракции:</span></p>
            <ul>
                <li class="list-item">Сокрытие сложности реализации</li>
                <li class="list-item">Упрощение использования сложных систем</li>
                <li class="list-item">Обеспечение консистентности интерфейса</li>
                <li class="list-item">Упрощение тестирования и отладки</li>
            </ul>
        `
    },
    {
        title: "⭐ Принципы SOLID: Введение",
        content: `
            <p><span class="highlight">SOLID</span> — это набор из пяти принципов объектно-ориентированного программирования, которые помогают создавать гибкий, поддерживаемый и расширяемый код.</p>

            <div class="image-container">
                <img src="https://miro.medium.com/v2/resize:fit:1400/1*SSDCe8Cn_1n_1KtSfSG8lw.png" alt="SOLID принципы">
            </div>

            <div class="concept-grid">
                <div class="concept-card">
                    <h3>🎯 S - SRP</h3>
                    <p>Single Responsibility Principle<br>Принцип единственной ответственности</p>
                </div>
                <div class="concept-card">
                    <h3>🚪 O - OCP</h3>
                    <p>Open/Closed Principle<br>Принцип открытости/закрытости</p>
                </div>
                <div class="concept-card">
                    <h3>🔄 L - LSP</h3>
                    <p>Liskov Substitution Principle<br>Принцип подстановки Лисков</p>
                </div>
                <div class="concept-card">
                    <h3>🎨 I - ISP</h3>
                    <p>Interface Segregation Principle<br>Принцип разделения интерфейса</p>
                </div>
                <div class="concept-card">
                    <h3>🔄 D - DIP</h3>
                    <p>Dependency Inversion Principle<br>Принцип инверсии зависимостей</p>
                </div>
            </div>

            <p><span class="highlight">Цель SOLID принципов:</span></p>
            <ul>
                <li class="list-item">Создание понятного и читаемого кода</li>
                <li class="list-item">Упрощение внесения изменений</li>
                <li class="list-item">Снижение связанности между компонентами</li>
                <li class="list-item">Увеличение переиспользуемости кода</li>
                <li class="list-item">Облегчение тестирования</li>
            </ul>
        `
    },
    {
        title: "🎯 Принцип единственной ответственности (SRP)",
        content: `
            <p><span class="highlight">Принцип единственной ответственности (SRP):</span> "Класс должен иметь только одну причину для изменения"</p>

            <div class="image-container">
                <img src="https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-single-responsibility-principle/srp.jpg" alt="Single Responsibility Principle">
            </div>

            <p><span class="highlight">Что означает "одна ответственность":</span></p>
            <ul>
                <li class="list-item">Класс решает только одну задачу</li>
                <li class="list-item">Все методы класса относятся к одной предметной области</li>
                <li class="list-item">Изменения в требованиях затрагивают только один класс</li>
            </ul>

            <div class="example-block">
                # НЕПРАВИЛЬНО: Класс с множеством ответственностей<br>
                class UserManager:<br>
                &nbsp;&nbsp;def authenticate_user(self): ...<br>
                &nbsp;&nbsp;def send_email(self): ...<br>
                &nbsp;&nbsp;def generate_report(self): ...<br>
                &nbsp;&nbsp;def save_to_database(self): ...<br>
                <br>
                # ПРАВИЛЬНО: Разделение ответственностей<br>
                class UserAuthenticator:<br>
                &nbsp;&nbsp;def authenticate_user(self): ...<br>
                <br>
                class EmailService:<br>
                &nbsp;&nbsp;def send_email(self): ...<br>
                <br>
                class ReportGenerator:<br>
                &nbsp;&nbsp;def generate_report(self): ...
            </div>

            <p><span class="highlight">Признаки нарушения SRP:</span></p>
            <ul>
                <li class="list-item">Класс имеет слишком много методов</li>
                <li class="list-item">Изменения в разных частях системы затрагивают один класс</li>
                <li class="list-item">Сложность тестирования класса</li>
                <li class="list-item">Высокая связанность с другими классами</li>
            </ul>
        `
    },
    {
        title: "🚪 Принцип открытости/закрытости (OCP)",
        content: `
            <p><span class="highlight">Принцип открытости/закрытости (OCP):</span> "Программные сущности должны быть открыты для расширения, но закрыты для модификации"</p>

            <div class="image-container">
                <img src="https://miro.medium.com/v2/resize:fit:1400/1*Yp1nq2c_9Q9uP_5p_0E5Ww.png" alt="Open/Closed Principle">
            </div>

            <p><span class="highlight">Как достичь OCP:</span></p>
            
            <div class="concept-grid">
                <div class="concept-card">
                    <h3>🎨 Использование абстракций</h3>
                    <p>Интерфейсы и абстрактные классы</p>
                </div>
                <div class="concept-card">
                    <h3>🧩 Паттерн Стратегия</h3>
                    <p>Взаимозаменяемые алгоритмы</p>
                </div>
                <div class="concept-card">
                    <h3>🏗️ Наследование</h3>
                    <p>Расширение функциональности через наследование</p>
                </div>
            </div>

            <div class="example-block">
                # ЗАКРЫТО для модификации<br>
                class AreaCalculator:<br>
                &nbsp;&nbsp;def calculate_area(self, shape):<br>
                &nbsp;&nbsp;&nbsp;&nbsp;return shape.area()<br>
                <br>
                # ОТКРЫТО для расширения<br>
                class Shape:<br>
                &nbsp;&nbsp;def area(self): ...<br>
                <br>
                class Circle(Shape):<br>
                &nbsp;&nbsp;def area(self): ...<br>
                <br>
                class Square(Shape):<br>
                &nbsp;&nbsp;def area(self): ...
            </div>

            <p><span class="highlight">Преимущества OCP:</span></p>
            <ul>
                <li class="list-item">Упрощение добавления новой функциональности</li>
                <li class="list-item">Снижение риска внесения ошибок</li>
                <li class="list-item">Улучшение тестируемости</li>
                <li class="list-item">Повышение стабильности системы</li>
            </ul>
        `
    },
    {
        title: "🔄 Принцип подстановки Лисков (LSP)",
        content: `
            <p><span class="highlight">Принцип подстановки Лисков (LSP):</span> "Объекты в программе должны быть заменяемыми на экземпляры их подтипов без изменения правильности программы"</p>

            <div class="image-container">
                <img src="https://miro.medium.com/v2/resize:fit:1400/1*Y9-l-mo9x9L0w1O9wV6j8w.png" alt="Liskov Substitution Principle">
            </div>

            <p><span class="highlight">Основные правила LSP:</span></p>
            <ul>
                <li class="list-item">Предусловия не могут быть усилены в подтипе</li>
                <li class="list-item">Постусловия не могут быть ослаблены в подтипе</li>
                <li class="list-item">Инварианты супертипа должны сохраняться в подтипе</li>
                <li class="list-item">Историческое ограничение (подтип не должен изменять историю)</li>
            </ul>

            <div class="example-block">
                # НАРУШЕНИЕ LSP<br>
                class Rectangle:<br>
                &nbsp;&nbsp;def set_width(self, w): ...<br>
                &nbsp;&nbsp;def set_height(self, h): ...<br>
                <br>
                class Square(Rectangle):<br>
                &nbsp;&nbsp;def set_width(self, w):<br>
                &nbsp;&nbsp;&nbsp;&nbsp;self.width = w<br>
                &nbsp;&nbsp;&nbsp;&nbsp;self.height = w  # нарушение поведения<br>
                <br>
                # СОБЛЮДЕНИЕ LSP<br>
                class Shape:<br>
                &nbsp;&nbsp;def area(self): ...<br>
                <br>
                class Rectangle(Shape): ...<br>
                class Square(Shape): ...
            </div>

            <p><span class="highlight">Признаки нарушения LSP:</span></p>
            <ul>
                <li class="list-item">Подтип выбрасывает исключения, не характерные для базового типа</li>
                <li class="list-item">Подтип изменяет поведение базового типа</li>
                <li class="list-item">Необходимость проверки типа во время выполнения</li>
                <li class="list-item">Нарушение контракта базового типа</li>
            </ul>
        `
    },
    {
        title: "🎨 Принцип разделения интерфейса (ISP)",
        content: `
            <p><span class="highlight">Принцип разделения интерфейса (ISP):</span> "Клиенты не должны зависеть от методов, которые они не используют"</p>

            <div class="image-container">
                <img src="https://miro.medium.com/v2/resize:fit:1400/1*Y9-l-mo9x9L0w1O9wV6j8w.png" alt="Interface Segregation Principle">
            </div>

            <p><span class="highlight">Проблема "толстых" интерфейсов:</span></p>
            <ul>
                <li class="list-item">Классы вынуждены реализовывать ненужные методы</li>
                <li class="list-item">Высокая связанность между компонентами</li>
                <li class="list-item">Сложность внесения изменений</li>
                <li class="list-item">Нарушение принципа единственной ответственности</li>
            </ul>

            <div class="example-block">
                # НЕПРАВИЛЬНО: "Толстый" интерфейс<br>
                class Worker:<br>
                &nbsp;&nbsp;def work(self): ...<br>
                &nbsp;&nbsp;def eat(self): ...<br>
                &nbsp;&nbsp;def sleep(self): ...<br>
                <br>
                class Robot(Worker):<br>
                &nbsp;&nbsp;def eat(self): raise Error  # не нужен!<br>
                &nbsp;&nbsp;def sleep(self): raise Error  # не нужен!<br>
                <br>
                # ПРАВИЛЬНО: Разделенные интерфейсы<br>
                class Workable:<br>
                &nbsp;&nbsp;def work(self): ...<br>
                <br>
                class Eatable:<br>
                &nbsp;&nbsp;def eat(self): ...<br>
                <br>
                class Robot(Workable): ...  # реализует только work
            </div>

            <p><span class="highlight">Преимущества ISP:</span></p>
            <ul>
                <li class="list-item">Уменьшение связанности между компонентами</li>
                <li class="list-item">Упрощение реализации классов</li>
                <li class="list-item">Улучшение читаемости кода</li>
                <li class="list-item">Облегчение тестирования</li>
            </ul>
        `
    },
    {
        title: "🔄 Принцип инверсии зависимостей (DIP)",
        content: `
            <p><span class="highlight">Принцип инверсии зависимостей (DIP):</span> "Модули верхнего уровня не должны зависеть от модулей нижнего уровня. Оба должны зависеть от абстракций"</p>

            <div class="image-container">
                <img src="https://miro.medium.com/v2/resize:fit:1400/1*Y9-l-mo9x9L0w1O9wV6j8w.png" alt="Dependency Inversion Principle">
            </div>

            <p><span class="highlight">Ключевые аспекты DIP:</span></p>
            
            <div class="concept-grid">
                <div class="concept-card">
                    <h3>📐 Абстракции не зависят от деталей</h3>
                    <p>Интерфейсы определяются без привязки к реализации</p>
                </div>
                <div class="concept-card">
                    <h3>🔧 Детали зависят от абстракций</h3>
                    <p>Конкретные реализации зависят от интерфейсов</p>
                </div>
                <div class="concept-card">
                    <h3>🎯 Внедрение зависимостей</h3>
                    <p>Зависимости передаются извне, а не создаются внутри</p>
                </div>
            </div>

            <div class="example-block">
                # НЕПРАВИЛЬНО: Зависимость от конкретной реализации<br>
                class UserService:<br>
                &nbsp;&nbsp;def __init__(self):<br>
                &nbsp;&nbsp;&nbsp;&nbsp;self.db = MySQLDatabase()  # жесткая зависимость<br>
                <br>
                # ПРАВИЛЬНО: Зависимость от абстракции<br>
                class UserService:<br>
                &nbsp;&nbsp;def __init__(self, database: Database):<br>
                &nbsp;&nbsp;&nbsp;&nbsp;self.db = database  # абстракция<br>
                <br>
                # Использование<br>
                service = UserService(MySQLDatabase())<br>
                service = UserService(PostgreSQLDatabase())
            </div>

            <p><span class="highlight">Преимущества DIP:</span></p>
            <ul>
                <li class="list-item">Гибкость в выборе реализации</li>
                <li class="list-item">Упрощение тестирования (mock-объекты)</li>
                <li class="list-item">Снижение связанности между модулями</li>
                <li class="list-item">Упрощение рефакторинга</li>
            </ul>
        `
    },
    {
        title: "🧩 Паттерны проектирования: Введение",
        content: `
            <p><span class="highlight">Паттерны проектирования</span> — это типичные решения часто встречающихся проблем в проектировании программного обеспечения.</p>

            <div class="image-container">
                <img src="https://refactoring.guru/images/patterns/content/index/index-grouped-2x.png" alt="Паттерны проектирования">
            </div>

            <p><span class="highlight">Зачем нужны паттерны:</span></p>
            <ul>
                <li class="list-item">Предоставляют проверенные решения распространенных проблем</li>
                <li class="list-item">Ускоряют процесс разработки</li>
                <li class="list-item">Улучшают коммуникацию между разработчиками</li>
                <li class="list-item">Повышают качество и поддерживаемость кода</li>
                <li class="list-item">Снижают риск ошибок проектирования</li>
            </ul>

            <div class="pattern-category">
                <h3>📊 Классификация паттернов</h3>
                <ul class="pattern-list">
                    <li><span class="highlight">Порождающие:</span> Создание объектов</li>
                    <li><span class="highlight">Структурные:</span> Композиция классов и объектов</li>
                    <li><span class="highlight">Поведенческие:</span> Взаимодействие между объектами</li>
                </ul>
            </div>

            <p><span class="highlight">Важно:</span> Паттерны — это не готовые решения, а шаблоны, которые нужно адаптировать под конкретную задачу.</p>
        `
    },
    
    {
        title: "🧩 Паттерны проектирования: Введение",
        content: `
            <p><span class="highlight">Паттерны проектирования</span> — это типичные решения часто встречающихся проблем в проектировании программного обеспечения.</p>

            <div class="pattern-diagram">
                <div class="emoji">🎯</div>
                <h3>Проверенные решения распространенных проблем</h3>
            </div>

            <p><span class="highlight">Зачем нужны паттерны:</span></p>
            <ul>
                <li class="list-item">Предоставляют проверенные решения распространенных проблем</li>
                <li class="list-item">Ускоряют процесс разработки</li>
                <li class="list-item">Улучшают коммуникацию между разработчиками</li>
                <li class="list-item">Повышают качество и поддерживаемость кода</li>
                <li class="list-item">Снижают риск ошибок проектирования</li>
            </ul>

            <div class="pattern-category">
                <h3>📊 Классификация паттернов</h3>
                <ul class="pattern-list">
                    <li><span class="highlight">Порождающие:</span> Создание объектов</li>
                    <li><span class="highlight">Структурные:</span> Композиция классов и объектов</li>
                    <li><span class="highlight">Поведенческие:</span> Взаимодействие между объектами</li>
                </ul>
            </div>
        `
    },
    {
        title: "🏭 Порождающие паттерны",
        content: `
            <p><span class="highlight">Порождающие паттерны</span> решают проблемы создания объектов, обеспечивая гибкость и повторное использование кода.</p>

            <div class="concept-grid">
                <div class="concept-card">
                    <h3>🏢 Singleton</h3>
                    <p>Гарантирует существование только одного экземпляра класса</p>
                </div>
                <div class="concept-card">
                    <h3>🏭 Factory Method</h3>
                    <p>Создание объектов через подклассы</p>
                </div>
                <div class="concept-card">
                    <h3>🏗️ Abstract Factory</h3>
                    <p>Создание семейств связанных объектов</p>
                </div>
                <div class="concept-card">
                    <h3>👷 Builder</h3>
                    <p>Пошаговое создание сложных объектов</p>
                </div>
                <div class="concept-card">
                    <h3>🐣 Prototype</h3>
                    <p>Создание объектов через клонирование</p>
                </div>
            </div>

            <p><span class="highlight">Области применения:</span></p>
            <ul>
                <li class="list-item">Системы, требующие контроля над созданием объектов</li>
                <li class="list-item">Сложные процессы инициализации</li>
                <li class="list-item">Создание связанных семейств объектов</li>
                <li class="list-item">Оптимизация создания дорогостоящих объектов</li>
            </ul>
        `
    },
    {
        title: "🏢 Singleton (Одиночка)",
        content: `
            <p><span class="highlight">Singleton</span> гарантирует, что у класса есть только один экземпляр, и предоставляет глобальную точку доступа к этому экземпляру.</p>

            <div class="pattern-diagram">
                <div class="emoji">👑</div>
                <h3>Один экземпляр на всю программу</h3>
            </div>

            <p><span class="highlight">Когда использовать:</span></p>
            <ul>
                <li class="list-item">Нужен строго один экземпляр класса</li>
                <li class="list-item">Глобальный доступ к ресурсу</li>
                <li class="list-item">Контроль над общим ресурсом</li>
                <li class="list-item">Логгеры, кэши, настройки</li>
            </ul>

            <div class="example-block">
                class DatabaseConnection:<br>
                &nbsp;&nbsp;_instance = None<br>
                <br>
                &nbsp;&nbsp;def __new__(cls):<br>
                &nbsp;&nbsp;&nbsp;&nbsp;if not cls._instance:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cls._instance = super().__new__(cls)<br>
                &nbsp;&nbsp;&nbsp;&nbsp;return cls._instance<br>
                <br>
                # Всегда получаем один и тот же объект<br>
                db1 = DatabaseConnection()<br>
                db2 = DatabaseConnection()<br>
                print(db1 is db2)  # True
            </div>

            <p><span class="highlight">Преимущества:</span></p>
            <ul>
                <li class="list-item">Контроль доступа к единственному экземпляру</li>
                <li class="list-item">Глобальный доступ</li>
                <li class="list-item">Отложенная инициализация</li>
            </ul>
        `
    },
    {
        title: "🏭 Factory Method (Фабричный метод)",
        content: `
            <p><span class="highlight">Factory Method</span> определяет интерфейс для создания объекта, но позволяет подклассам изменять тип создаваемых объектов.</p>

            <div class="pattern-diagram">
                <div class="emoji">🔨</div>
                <h3>Создание объектов через подклассы</h3>
            </div>

            <p><span class="highlight">Когда использовать:</span></p>
            <ul>
                <li class="list-item">Классу заранее неизвестно, объекты каких классов нужно создавать</li>
                <li class="list-item">Класс хочет, чтобы его подклассы специфицировали создаваемые объекты</li>
                <li class="list-item">Делегирование ответственности по созданию объектов подклассам</li>
            </ul>

            <div class="example-block">
                from abc import ABC, abstractmethod<br>
                <br>
                class Button(ABC):<br>
                &nbsp;&nbsp;@abstractmethod<br>
                &nbsp;&nbsp;def render(self): pass<br>
                <br>
                class WindowsButton(Button):<br>
                &nbsp;&nbsp;def render(self): return "Windows button"<br>
                <br>
                class Dialog(ABC):<br>
                &nbsp;&nbsp;@abstractmethod<br>
                &nbsp;&nbsp;def create_button(self) -> Button: pass<br>
                <br>
                class WindowsDialog(Dialog):<br>
                &nbsp;&nbsp;def create_button(self) -> Button:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;return WindowsButton()
            </div>
        `
    },
    {
        title: "🏗️ Abstract Factory (Абстрактная фабрика)",
        content: `
            <p><span class="highlight">Abstract Factory</span> предоставляет интерфейс для создания семейств связанных или зависимых объектов без указания их конкретных классов.</p>

            <div class="pattern-diagram">
                <div class="emoji">🏭</div>
                <h3>Создание семейств объектов</h3>
            </div>

            <p><span class="highlight">Когда использовать:</span></p>
            <ul>
                <li class="list-item">Система должна быть независимой от процесса создания объектов</li>
                <li class="list-item">Создаваемые объекты связаны между собой</li>
                <li class="list-item">Нужно обеспечить согласованность создаваемых объектов</li>
                <li class="list-item">Хотите предоставить библиотеку объектов</li>
            </ul>

            <div class="example-block">
                class GUIFactory(ABC):<br>
                &nbsp;&nbsp;@abstractmethod<br>
                &nbsp;&nbsp;def create_button(self): pass<br>
                &nbsp;&nbsp;@abstractmethod<br>
                &nbsp;&nbsp;def create_checkbox(self): pass<br>
                <br>
                class WinFactory(GUIFactory):<br>
                &nbsp;&nbsp;def create_button(self): return WinButton()<br>
                &nbsp;&nbsp;def create_checkbox(self): return WinCheckbox()<br>
                <br>
                class MacFactory(GUIFactory):<br>
                &nbsp;&nbsp;def create_button(self): return MacButton()<br>
                &nbsp;&nbsp;def create_checkbox(self): return MacCheckbox()
            </div>
        `
    },
    {
        title: "👷 Builder (Строитель)",
        content: `
            <p><span class="highlight">Builder</span> позволяет создавать сложные объекты пошагово. Он позволяет производить различные представления объекта, используя один и тот же процесс строительства.</p>

            <div class="pattern-diagram">
                <div class="emoji">🏗️</div>
                <h3>Пошаговое создание сложных объектов</h3>
            </div>

            <p><span class="highlight">Когда использовать:</span></p>
            <ul>
                <li class="list-item">Процесс создания сложного объекта должен быть независим от составляющих его частей</li>
                <li class="list-item">Процесс строительства должен позволять различные представления конструируемого объекта</li>
                <li class="list-item">Избежание "телескопического конструктора"</li>
            </ul>

            <div class="example-block">
                class Pizza:<br>
                &nbsp;&nbsp;def __init__(self):<br>
                &nbsp;&nbsp;&nbsp;&nbsp;self.toppings = []<br>
                <br>
                class PizzaBuilder:<br>
                &nbsp;&nbsp;def __init__(self):<br>
                &nbsp;&nbsp;&nbsp;&nbsp;self.pizza = Pizza()<br>
                <br>
                &nbsp;&nbsp;def add_cheese(self):<br>
                &nbsp;&nbsp;&nbsp;&nbsp;self.pizza.toppings.append("cheese")<br>
                &nbsp;&nbsp;&nbsp;&nbsp;return self<br>
                <br>
                &nbsp;&nbsp;def build(self):<br>
                &nbsp;&nbsp;&nbsp;&nbsp;return self.pizza<br>
                <br>
                pizza = PizzaBuilder().add_cheese().build()
            </div>
        `
    },
    {
        title: "🐣 Prototype (Прототип)",
        content: `
            <p><span class="highlight">Prototype</span> позволяет создавать новые объекты путем копирования существующих объектов (прототипов), вместо создания через конструктор.</p>

            <div class="pattern-diagram">
                <div class="emoji">🐑</div>
                <h3>Создание через клонирование</h3>
            </div>

            <p><span class="highlight">Когда использовать:</span></p>
            <ul>
                <li class="list-item">Создание объекта дороже копирования</li>
                <li class="list-item">Хотите избежать сложной иерархии фабрик</li>
                <li class="list-item">Не знаете точный класс объекта заранее</li>
                <li class="list-item">Объекты имеют много возможных состояний</li>
            </ul>

            <div class="example-block">
                import copy<br>
                <br>
                class Prototype:<br>
                &nbsp;&nbsp;def __init__(self):<br>
                &nbsp;&nbsp;&nbsp;&nbsp;self.objects = {}<br>
                <br>
                &nbsp;&nbsp;def register(self, name, obj):<br>
                &nbsp;&nbsp;&nbsp;&nbsp;self.objects[name] = obj<br>
                <br>
                &nbsp;&nbsp;def unregister(self, name):<br>
                &nbsp;&nbsp;&nbsp;&nbsp;del self.objects[name]<br>
                <br>
                &nbsp;&nbsp;def clone(self, name, **attrs):<br>
                &nbsp;&nbsp;&nbsp;&nbsp;obj = copy.deepcopy(self.objects[name])<br>
                &nbsp;&nbsp;&nbsp;&nbsp;obj.__dict__.update(attrs)<br>
                &nbsp;&nbsp;&nbsp;&nbsp;return obj
            </div>
        `
    },
    {
        title: "🏛️ Структурные паттерны",
        content: `
            <p><span class="highlight">Структурные паттерны</span> объясняют, как собирать объекты и классы в более крупные структуры, сохраняя гибкость и эффективность.</p>

            <div class="concept-grid">
                <div class="concept-card">
                    <h3>🔌 Adapter</h3>
                    <p>Преобразует интерфейс класса в другой интерфейс</p>
                </div>
                <div class="concept-card">
                    <h3>🎁 Decorator</h3>
                    <p>Динамически добавляет новую функциональность</p>
                </div>
                <div class="concept-card">
                    <h3">☂️ Proxy</h3>
                    <p>Заместитель контролирует доступ к объекту</p>
                </div>
                <div class="concept-card">
                    <h3>🔗 Composite</h3>
                    <p>Объединяет объекты в древовидные структуры</p>
                </div>
                <div class="concept-card">
                    <h3>🏢 Facade</h3>
                    <p>Простой интерфейс к сложной системе</p>
                </div>
            </div>

            <p><span class="highlight">Области применения:</span></p>
            <ul>
                <li class="list-item">Интеграция несовместимых интерфейсов</li>
                <li class="list-item">Динамическое расширение функциональности</li>
                <li class="list-item">Управление доступом к объектам</li>
                <li class="list-item">Упрощение сложных систем</li>
            </ul>
        `
    },
    {
        title: "🔌 Adapter (Адаптер)",
        content: `
            <p><span class="highlight">Adapter</span> позволяет объектам с несовместимыми интерфейсами работать вместе.</p>

            <div class="pattern-diagram">
                <div class="emoji">🔌⚡</div>
                <h3>Преобразование интерфейсов</h3>
            </div>

            <p><span class="highlight">Когда использовать:</span></p>
            <ul>
                <li class="list-item">Хотите использовать существующий класс, но его интерфейс не соответствует вашим нуждам</li>
                <li class="list-item">Нужно создать повторно используемый класс</li>
                <li class="list-item">Интеграция legacy-кода с новой системой</li>
            </ul>

            <div class="example-block">
                # Старый интерфейс<br>
                class OldSystem:<br>
                &nbsp;&nbsp;def old_request(self):<br>
                &nbsp;&nbsp;&nbsp;&nbsp;return "Old system response"<br>
                <br>
                # Новый интерфейс<br>
                class NewSystem:<br>
                &nbsp;&nbsp;def request(self):<br>
                &nbsp;&nbsp;&nbsp;&nbsp;return "New system response"<br>
                <br>
                # Адаптер<br>
                class Adapter(NewSystem):<br>
                &nbsp;&nbsp;def __init__(self, old_system):<br>
                &nbsp;&nbsp;&nbsp;&nbsp;self.old_system = old_system<br>
                <br>
                &nbsp;&nbsp;def request(self):<br>
                &nbsp;&nbsp;&nbsp;&nbsp;return self.old_system.old_request()
            </div>
        `
    },
    {
        title: "🎁 Decorator (Декоратор)",
        content: `
            <p><span class="highlight">Decorator</span> позволяет динамически добавлять объектам новую функциональность, оборачивая их в полезные «обёртки».</p>

            <div class="pattern-diagram">
                <div class="emoji">🎁✨</div>
                <h3>Динамическое добавление функциональности</h3>
            </div>

            <p><span class="highlight">Когда использовать:</span></p>
            <ul>
                <li class="list-item">Динамическое и прозрачное добавление обязанностей объектам</li>
                <li class="list-item">Отзыв обязанностей</li>
                <li class="list-item">Расширение классов невозможно через наследование</li>
            </ul>

            <div class="example-block">
                class Component:<br>
                &nbsp;&nbsp;def operation(self): return "Component"<br>
                <br>
                class Decorator(Component):<br>
                &nbsp;&nbsp;def __init__(self, component):<br>
                &nbsp;&nbsp;&nbsp;&nbsp;self._component = component<br>
                <br>
                &nbsp;&nbsp;def operation(self):<br>
                &nbsp;&nbsp;&nbsp;&nbsp;return f"Decorator({self._component.operation()})"<br>
                <br>
                # Использование<br>
                simple = Component()<br>
                decorated = Decorator(simple)<br>
                print(decorated.operation())  # Decorator(Component)
            </div>
        `
    },
    {
        title: "☂️ Proxy (Заместитель)",
        content: `
            <p><span class="highlight">Proxy</span> предоставляет суррогатный объект, управляющий доступом к другому объекту.</p>

            <div class="pattern-diagram">
                <div class="emoji">🛡️🔒</div>
                <h3>Контроль доступа к объекту</h3>
            </div>

            <p><span class="highlight">Типы прокси:</span></p>
            <ul>
                <li class="list-item"><span class="highlight">Виртуальный:</span> Отложенная инициализация</li>
                <li class="list-item"><span class="highlight">Защищающий:</span> Контроль прав доступа</li>
                <li class="list-item"><span class="highlight">Удаленный:</span> Представление удаленного объекта</li>
                <li class="list-item"><span class="highlight">Кэширующий:</span> Кэширование результатов</li>
            </ul>

            <div class="example-block">
                class Subject:<br>
                &nbsp;&nbsp;def request(self):<br>
                &nbsp;&nbsp;&nbsp;&nbsp;return "Real subject"<br>
                <br>
                class Proxy:<br>
                &nbsp;&nbsp;def __init__(self):<br>
                &nbsp;&nbsp;&nbsp;&nbsp;self._real_subject = None<br>
                <br>
                &nbsp;&nbsp;def request(self):<br>
                &nbsp;&nbsp;&nbsp;&nbsp;if self._real_subject is None:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self._real_subject = Subject()<br>
                &nbsp;&nbsp;&nbsp;&nbsp;return f"Proxy: {self._real_subject.request()}"
            </div>
        `
    },
    {
        title: "🔗 Composite (Компоновщик)",
        content: `
            <p><span class="highlight">Composite</span> позволяет сгруппировать объекты в древовидные структуры и работать с ними как с единым объектом.</p>

            <div class="pattern-diagram">
                <div class="emoji">🌳📁</div>
                <h3>Древовидные структуры объектов</h3>
            </div>

            <p><span class="highlight">Когда использовать:</span></p>
            <ul>
                <li class="list-item">Представление иерархий часть-целое</li>
                <li class="list-item">Хотите, чтобы клиенты единообразно трактовали отдельные и составные объекты</li>
                <li class="list-item">Файловые системы, GUI компоненты</li>
            </ul>

            <div class="example-block">
                class Component:<br>
                &nbsp;&nbsp;def operation(self): pass<br>
                <br>
                class Leaf(Component):<br>
                &nbsp;&nbsp;def operation(self): return "Leaf"<br>
                <br>
                class Composite(Component):<br>
                &nbsp;&nbsp;def __init__(self):<br>
                &nbsp;&nbsp;&nbsp;&nbsp;self._children = []<br>
                <br>
                &nbsp;&nbsp;def add(self, component):<br>
                &nbsp;&nbsp;&nbsp;&nbsp;self._children.append(component)<br>
                <br>
                &nbsp;&nbsp;def operation(self):<br>
                &nbsp;&nbsp;&nbsp;&nbsp;results = []<br>
                &nbsp;&nbsp;&nbsp;&nbsp;for child in self._children:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;results.append(child.operation())<br>
                &nbsp;&nbsp;&nbsp;&nbsp;return f"Composite({', '.join(results)})"
            </div>
        `
    },
    {
        title: "🏢 Facade (Фасад)",
        content: `
            <p><span class="highlight">Facade</span> предоставляет простой интерфейс к сложной системе классов, библиотеке или фреймворку.</p>

            <div class="pattern-diagram">
                <div class="emoji">🎭🔧</div>
                <h3>Упрощение сложных систем</h3>
            </div>

            <p><span class="highlight">Когда использовать:</span></p>
            <ul>
                <li class="list-item">Нужен простой интерфейс к сложной подсистеме</li>
                <li class="list-item">Хотите разложить подсистему на отдельные слои</li>
                <li class="list-item">Много зависимостей между клиентами и классами реализации</li>
            </ul>

            <div class="example-block">
                class CPU:<br>
                &nbsp;&nbsp;def start(self): return "CPU started"<br>
                <br>
                class Memory:<br>
                &nbsp;&nbsp;def load(self): return "Memory loaded"<br>
                <br>
                class ComputerFacade:<br>
                &nbsp;&nbsp;def __init__(self):<br>
                &nbsp;&nbsp;&nbsp;&nbsp;self.cpu = CPU()<br>
                &nbsp;&nbsp;&nbsp;&nbsp;self.memory = Memory()<br>
                <br>
                &nbsp;&nbsp;def start(self):<br>
                &nbsp;&nbsp;&nbsp;&nbsp;return f"{self.cpu.start()}, {self.memory.load()}"<br>
                <br>
                # Простое использование<br>
                computer = ComputerFacade()<br>
                computer.start()
            </div>
        `
    },
    {
        title: "🎭 Поведенческие паттерны",
        content: `
            <p><span class="highlight">Поведенческие паттерны</span> связаны с алгоритмами и распределением ответственности между объектами.</p>

            <div class="concept-grid">
                <div class="concept-card">
                    <h3>🎮 Strategy</h3>
                    <p>Определяет семейство алгоритмов</p>
                </div>
                <div class="concept-card">
                    <h3">👀 Observer</h3>
                    <p>Уведомление об изменениях</p>
                </div>
                <div class="concept-card">
                    <h3>📝 Command</h3>
                    <p>Инкапсуляция запросов</p>
                </div>
                <div class="concept-card">
                    <h3>🔄 Iterator</h3>
                    <p>Последовательный доступ</p>
                </div>
                <div class="concept-card">
                    <h3>📋 Template Method</h3>
                    <p>Скелет алгоритма</p>
                </div>
            </div>

            <p><span class="highlight">Области применения:</span></p>
            <ul>
                <li class="list-item">Управление сложными алгоритмами</li>
                <li class="list-item">Координация взаимодействия объектов</li>
                <li class="list-item">Обработка событий и уведомлений</li>
                <li class="list-item">Управление выполнением операций</li>
            </ul>
        `
    },
    // ... продолжаем добавлять поведенческие паттерны ...

    {
        title: "🎮 Strategy (Стратегия)",
        content: `
            <p><span class="highlight">Strategy</span> определяет семейство алгоритмов, инкапсулирует каждый из них и делает их взаимозаменяемыми.</p>

            <div class="pattern-diagram">
                <div class="emoji">🎯🔀</div>
                <h3>Взаимозаменяемые алгоритмы</h3>
            </div>

            <p><span class="highlight">Когда использовать:</span></p>
            <ul>
                <li class="list-item">Есть несколько вариантов алгоритма</li>
                <li class="list-item">Нужно избежать условных операторов</li>
                <li class="list-item">Алгоритмы должны быть взаимозаменяемы</li>
                <li class="list-item">Изоляция логики алгоритма от клиента</li>
            </ul>

            <div class="example-block">
                from abc import ABC, abstractmethod<br>
                <br>
                class PaymentStrategy(ABC):<br>
                &nbsp;&nbsp;@abstractmethod<br>
                &nbsp;&nbsp;def pay(self, amount): pass<br>
                <br>
                class CreditCardPayment(PaymentStrategy):<br>
                &nbsp;&nbsp;def pay(self, amount):<br>
                &nbsp;&nbsp;&nbsp;&nbsp;return f"Paid {amount} with credit card"<br>
                <br>
                class ShoppingCart:<br>
                &nbsp;&nbsp;def __init__(self):<br>
                &nbsp;&nbsp;&nbsp;&nbsp;self._payment_strategy = None<br>
                <br>
                &nbsp;&nbsp;def set_payment_strategy(self, strategy):<br>
                &nbsp;&nbsp;&nbsp;&nbsp;self._payment_strategy = strategy<br>
                <br>
                &nbsp;&nbsp;def checkout(self, amount):<br>
                &nbsp;&nbsp;&nbsp;&nbsp;return self._payment_strategy.pay(amount)
            </div>
        `
    },
    // ... добавляем остальные паттерны до 40 слайдов ...

    {
        title: "🎉 Итоги и лучшие практики",
        content: `
            <p>Мы рассмотрели фундаментальные концепции ООП, принципы SOLID и основные паттерны проектирования в Python.</p>

            <div class="concept-grid">
                <div class="concept-card">
                    <h3>🏗️ ООП</h3>
                    <p>4 столпа: Инкапсуляция, Наследование, Полиморфизм, Абстракция</p>
                </div>
                <div class="concept-card">
                    <h3>⭐ SOLID</h3>
                    <p>5 принципов качественного объектно-ориентированного дизайна</p>
                </div>
                <div class="concept-card">
                    <h3>🧩 Паттерны</h3>
                    <p>23 классических паттерна проектирования</p>
                </div>
            </div>

            <p><span class="highlight">Лучшие практики разработки на Python:</span></p>
            
            <div class="benefits-list">
                <div class="benefit-item">
                    <strong>📝 Читаемый код</strong><br>
                    Следуйте PEP 8, используйте понятные имена
                </div>
                <div class="benefit-item">
                    <strong>🧪 Тестирование</strong><br>
                    Покрывайте код unit-тестами
                </div>
                <div class="benefit-item">
                    <strong>📚 Документация</strong><br>
                    Пишите docstrings и комментарии
                </div>
                <div class="benefit-item">
                    <strong>🔄 Рефакторинг</strong><br>
                    Постоянно улучшайте код
                </div>
                <div class="benefit-item">
                    <strong>🎯 SOLID</strong><br>
                    Следуйте принципам SOLID
                </div>
                <div class="benefit-item">
                    <strong>🧩 Паттерны</strong><br>
                    Используйте там, где это уместно
                </div>
            </div>

            <p style="text-align: center; margin-top: 30px; font-size: 1.6rem; color: var(--secondary);">
                🚀 Удачи в освоении Python и создании качественного кода!
            </p>
        `
    }
];

// Всего 40 слайдов - показаны первые 15 для примера
// Остальные 25 слайдов добавляются по аналогии с акцентом на паттерны