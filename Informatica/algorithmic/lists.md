# 📚 Простые задачи на списки в Python
## От основ к практике

---

> *"Списки в Python — как швейцарский нож для программиста. Умеешь с ними работать — можешь решить большинство задач."*

---

## 📦 **Часть 1: Основные операции со списками**

### Создание и базовые операции
```python
# 1. Создание списка разными способами
empty_list = []                     # Пустой список
numbers = [1, 2, 3, 4, 5]          # Список чисел
fruits = ["apple", "banana", "cherry"]  # Список строк
mixed = [1, "hello", True, 3.14]   # Разные типы данных

# 2. Доступ к элементам
first_fruit = fruits[0]            # "apple" (индексация с 0)
last_fruit = fruits[-1]            # "cherry" (отрицательные индексы)
second_fruit = fruits[1]           # "banana"

# 3. Изменение элементов
fruits[1] = "orange"               # Теперь ["apple", "orange", "cherry"]

# 4. Длина списка
count = len(fruits)                # 3 элемента
```

### Добавление и удаление элементов
```python
# 1. Добавление в конец
fruits.append("grape")            # ["apple", "orange", "cherry", "grape"]

# 2. Добавление на конкретную позицию
fruits.insert(1, "banana")        # ["apple", "banana", "orange", "cherry", "grape"]

# 3. Удаление по значению
fruits.remove("orange")           # ["apple", "banana", "cherry", "grape"]

# 4. Удаление по индексу
removed_fruit = fruits.pop(2)     # Удаляет "cherry", список: ["apple", "banana", "grape"]

# 5. Очистка списка
fruits.clear()                    # []

# 6. Копирование списка
original = [1, 2, 3]
copy = original.copy()            # Копия списка
```

---

## 🎯 **Практические задачи: Уровень 1 (Начальный)**

### Задача 1: Сумма элементов
```python
# Найти сумму всех элементов в списке
def sum_of_list(numbers):
    total = 0
    for number in numbers:
        total += number
    return total

# Альтернативный способ
def sum_of_list_simple(numbers):
    return sum(numbers)

# Пример использования
test_numbers = [1, 2, 3, 4, 5]
result = sum_of_list(test_numbers)  # 15
```

### Задача 2: Поиск максимума
```python
# Найти максимальный элемент в списке
def find_max(numbers):
    if not numbers:
        return None
    
    maximum = numbers[0]
    for number in numbers:
        if number > maximum:
            maximum = number
    return maximum

# Альтернативный способ
def find_max_simple(numbers):
    return max(numbers) if numbers else None

# Пример
test_scores = [85, 92, 78, 90, 88]
best_score = find_max(test_scores)  # 92
```

### Задача 3: Подсчет элементов
```python
# Подсчитать, сколько раз элемент встречается в списке
def count_occurrences(items, target):
    count = 0
    for item in items:
        if item == target:
            count += 1
    return count

# Альтернативный способ
def count_occurrences_simple(items, target):
    return items.count(target)

# Пример
words = ["apple", "banana", "apple", "cherry", "apple"]
apple_count = count_occurrences(words, "apple")  # 3
```

---

## 🔍 **Часть 2: Работа со срезами (slicing)**

```python
# Создаем тестовый список
numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

# 1. Базовые срезы
first_three = numbers[:3]          # [0, 1, 2]
last_three = numbers[-3:]          # [7, 8, 9]
middle = numbers[2:7]              # [2, 3, 4, 5, 6]

# 2. Срезы с шагом
even_indices = numbers[::2]        # [0, 2, 4, 6, 8] (каждый второй)
odd_indices = numbers[1::2]        # [1, 3, 5, 7, 9]

# 3. Реверс списка
reversed_numbers = numbers[::-1]   # [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]

# 4. Изменение через срезы
numbers_copy = numbers[:]          # Полная копия списка
numbers[2:5] = [20, 30, 40]        # Замена элементов 2-4
```

---

## 🎯 **Практические задачи: Уровень 2 (Средний)**

### Задача 4: Удаление дубликатов
```python
# Удалить повторяющиеся элементы, сохраняя порядок
def remove_duplicates(items):
    seen = []
    result = []
    
    for item in items:
        if item not in seen:
            seen.append(item)
            result.append(item)
    
    return result

# Пример
duplicate_numbers = [1, 2, 2, 3, 3, 3, 4, 5, 5]
unique_numbers = remove_duplicates(duplicate_numbers)  # [1, 2, 3, 4, 5]
```

### Задача 5: Поиск общих элементов
```python
# Найти общие элементы в двух списках
def find_common(list1, list2):
    common = []
    
    for item in list1:
        if item in list2 and item not in common:
            common.append(item)
    
    return common

# Пример
list_a = [1, 2, 3, 4, 5]
list_b = [3, 4, 5, 6, 7]
common_items = find_common(list_a, list_b)  # [3, 4, 5]
```

### Задача 6: Разделение списка
```python
# Разделить список на четные и нечетные элементы
def split_by_parity(numbers):
    even = []
    odd = []
    
    for number in numbers:
        if number % 2 == 0:
            even.append(number)
        else:
            odd.append(number)
    
    return even, odd

# Пример
numbers_list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens, odds = split_by_parity(numbers_list)  
# evens = [2, 4, 6, 8, 10], odds = [1, 3, 5, 7, 9]
```

---

## 🔄 **Часть 3: Сортировка и преобразование**

### Встроенная сортировка
```python
# Создаем список для сортировки
unsorted_numbers = [5, 2, 8, 1, 9, 3]

# 1. Сортировка по возрастанию (изменяет оригинал)
unsorted_numbers.sort()           # [1, 2, 3, 5, 8, 9]

# 2. Сортировка по убыванию
unsorted_numbers.sort(reverse=True)  # [9, 8, 5, 3, 2, 1]

# 3. Сортировка без изменения оригинала
numbers = [5, 2, 8, 1, 9, 3]
sorted_numbers = sorted(numbers)  # [1, 2, 3, 5, 8, 9]
numbers                           # Оригинал не изменился: [5, 2, 8, 1, 9, 3]

# 4. Сортировка строк
words = ["banana", "apple", "cherry", "date"]
sorted_words = sorted(words)      # ["apple", "banana", "cherry", "date"]
```

### Сортировка по ключу
```python
# Список студентов с оценками
students = [
    ["Alice", 85],
    ["Bob", 92],
    ["Charlie", 78],
    ["Diana", 90]
]

# Сортировка по оценке (по убыванию)
def sort_by_grade(student_list):
    sorted_students = sorted(student_list, key=lambda x: x[1], reverse=True)
    return sorted_students

# Ручная сортировка (пузырьковая)
def bubble_sort_by_grade(students):
    n = len(students)
    
    for i in range(n):
        for j in range(n - i - 1):
            if students[j][1] < students[j + 1][1]:
                students[j], students[j + 1] = students[j + 1], students[j]
    
    return students

sorted_students = sort_by_grade(students)
# [["Bob", 92], ["Diana", 90], ["Alice", 85], ["Charlie", 78]]
```

---

## 🎯 **Практические задачи: Уровень 3 (Продвинутый)**

### Задача 7: Вращение списка
```python
# Сдвинуть элементы списка на k позиций вправо
def rotate_list(items, k):
    n = len(items)
    if n == 0:
        return items
    
    k = k % n  # Обрабатываем случай, когда k > n
    
    # Способ 1: С использованием срезов
    return items[-k:] + items[:-k]

# Пример
original = [1, 2, 3, 4, 5, 6, 7]
rotated = rotate_list(original, 3)  # [5, 6, 7, 1, 2, 3, 4]
```

### Задача 8: Поиск второго максимума
```python
# Найти второй по величине элемент в списке
def find_second_max(numbers):
    if len(numbers) < 2:
        return None
    
    # Инициализируем первые два элемента
    if numbers[0] > numbers[1]:
        max1, max2 = numbers[0], numbers[1]
    else:
        max1, max2 = numbers[1], numbers[0]
    
    # Проходим по остальным элементам
    for number in numbers[2:]:
        if number > max1:
            max2 = max1
            max1 = number
        elif number > max2 and number != max1:
            max2 = number
    
    return max2

# Пример
numbers = [10, 20, 4, 45, 99, 99, 45]
second_max = find_second_max(numbers)  # 45 (99 - максимум)
```

### Задача 9: Слияние отсортированных списков
```python
# Объединить два отсортированных списка в один отсортированный
def merge_sorted_lists(list1, list2):
    result = []
    i, j = 0, 0
    
    while i < len(list1) and j < len(list2):
        if list1[i] < list2[j]:
            result.append(list1[i])
            i += 1
        else:
            result.append(list2[j])
            j += 1
    
    # Добавляем оставшиеся элементы
    result.extend(list1[i:])
    result.extend(list2[j:])
    
    return result

# Пример
list1 = [1, 3, 5, 7]
list2 = [2, 4, 6, 8]
merged = merge_sorted_lists(list1, list2)  # [1, 2, 3, 4, 5, 6, 7, 8]
```

---

## 📊 **Часть 4: Работа со вложенными списками**

### Двумерные списки (матрицы)
```python
# Создание матрицы 3x3
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

# Доступ к элементам
first_row = matrix[0]          # [1, 2, 3]
element_22 = matrix[1][1]      # 5 (вторая строка, второй столбец)

# Обход матрицы
def print_matrix(mat):
    for row in mat:
        for element in row:
            print(element, end=" ")
        print()

# Сумма всех элементов матрицы
def sum_matrix(mat):
    total = 0
    for row in mat:
        for element in row:
            total += element
    return total

# Транспонирование матрицы
def transpose_matrix(mat):
    rows = len(mat)
    cols = len(mat[0])
    
    result = []
    for j in range(cols):
        new_row = []
        for i in range(rows):
            new_row.append(mat[i][j])
        result.append(new_row)
    
    return result

# Пример
matrix_sum = sum_matrix(matrix)  # 45
transposed = transpose_matrix(matrix)
# [[1, 4, 7], [2, 5, 8], [3, 6, 9]]
```

---

## 🎯 **Практические задачи: Уровень 4 (Сложный)**

### Задача 10: Списковые включения (List Comprehensions)
```python
# 1. Создать список квадратов чисел от 1 до 10
squares = [x**2 for x in range(1, 11)]  # [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

# 2. Отфильтровать четные числа
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
even_numbers = [x for x in numbers if x % 2 == 0]  # [2, 4, 6, 8, 10]

# 3. Преобразовать список строк
words = ["hello", "world", "python", "programming"]
uppercase_words = [word.upper() for word in words]  
# ["HELLO", "WORLD", "PYTHON", "PROGRAMMING"]

# 4. Создать список пар (число, его квадрат)
pairs = [(x, x**2) for x in range(1, 6)]
# [(1, 1), (2, 4), (3, 9), (4, 16), (5, 25)]

# 5. Работа с вложенными циклами
matrix = [[1, 2], [3, 4], [5, 6]]
flattened = [num for row in matrix for num in row]  # [1, 2, 3, 4, 5, 6]
```

### Задача 11: Статистика списка
```python
# Вычислить различные статистические показатели
def calculate_statistics(numbers):
    if not numbers:
        return None
    
    # Основные показатели
    minimum = min(numbers)
    maximum = max(numbers)
    total = sum(numbers)
    count = len(numbers)
    average = total / count
    
    # Медиана
    sorted_numbers = sorted(numbers)
    middle = count // 2
    
    if count % 2 == 0:
        median = (sorted_numbers[middle - 1] + sorted_numbers[middle]) / 2
    else:
        median = sorted_numbers[middle]
    
    return {
        "count": count,
        "sum": total,
        "min": minimum,
        "max": maximum,
        "average": average,
        "median": median
    }

# Пример
test_data = [4, 7, 1, 9, 3, 5, 8]
stats = calculate_statistics(test_data)
# {'count': 7, 'sum': 37, 'min': 1, 'max': 9, 'average': 5.285..., 'median': 5}
```

### Задача 12: Группировка элементов
```python
# Сгруппировать элементы по определенному признаку
def group_by_length(words):
    groups = {}
    
    for word in words:
        length = len(word)
        
        if length in groups:
            groups[length].append(word)
        else:
            groups[length] = [word]
    
    return groups

# Пример
word_list = ["cat", "dog", "elephant", "bird", "lion", "giraffe"]
grouped = group_by_length(word_list)
# {3: ['cat', 'dog'], 8: ['elephant'], 4: ['bird', 'lion'], 7: ['giraffe']}
```

---

## 🔧 **Часть 5: Полезные техники и паттерны**

### 1. Обмен значениями
```python
# Традиционный способ
a = 5
b = 10
temp = a
a = b
b = temp  # a=10, b=5

# Python способ
a, b = 5, 10
a, b = b, a  # a=10, b=5 (обмен без временной переменной)
```

### 2. Создание диапазонов
```python
# Создание списка чисел
numbers_1_to_10 = list(range(1, 11))          # [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
even_numbers = list(range(0, 21, 2))          # [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
descending = list(range(10, 0, -1))           # [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
```

### 3. Проверка условий
```python
# Проверка, все ли элементы удовлетворяют условию
def all_positive(numbers):
    for number in numbers:
        if number <= 0:
            return False
    return True

# Проверка, хотя бы один элемент удовлетворяет условию
def any_even(numbers):
    for number in numbers:
        if number % 2 == 0:
            return True
    return False

# Пример
test_nums = [1, 3, 5, 7, 9]
all_pos = all_positive(test_nums)    # True
any_even_num = any_even(test_nums)   # False
```

---

## 📝 **Чеклист для работы со списками**

### Перед началом работы:
- [ ] Определите, нужно ли сохранять порядок элементов
- [ ] Решите, допускаются ли дубликаты
- [ ] Подумайте о размере данных
- [ ] Выберите подходящие операции (добавление, удаление, поиск)

### При выборе алгоритма:
- [ ] Для маленьких списков (<100 элементов) простые алгоритмы работают хорошо
- [ ] Для поиска в больших списках рассмотрите бинарный поиск (если данные отсортированы)
- [ ] Для частых вставок/удалений в середину списка рассмотрите другие структуры

### Оптимизация:
- [ ] Используйте списковые включения вместо циклов, когда это возможно
- [ ] Избегайте копирования больших списков без необходимости
- [ ] Используйте встроенные функции (sum, max, min, sorted) вместо собственных реализаций

---

## 🎓 **Заключительные задачи для самопроверки**

### Задача 13: Чтение с конца
```python
# Вернуть список в обратном порядке без использования [::-1] и reverse()
def reverse_list_manual(items):
    result = []
    
    for i in range(len(items) - 1, -1, -1):
        result.append(items[i])
    
    return result

# Или с помощью цикла while
def reverse_list_while(items):
    result = []
    i = len(items) - 1
    
    while i >= 0:
        result.append(items[i])
        i -= 1
    
    return result
```

### Задача 14: Чередование списков
```python
# Смешать два списка, чередуя их элементы
def interleave_lists(list1, list2):
    result = []
    min_length = min(len(list1), len(list2))
    
    for i in range(min_length):
        result.append(list1[i])
        result.append(list2[i])
    
    # Добавляем оставшиеся элементы из более длинного списка
    result.extend(list1[min_length:])
    result.extend(list2[min_length:])
    
    return result

# Пример
list_a = [1, 2, 3]
list_b = ['a', 'b', 'c', 'd', 'e']
mixed = interleave_lists(list_a, list_b)  
# [1, 'a', 2, 'b', 3, 'c', 'd', 'e']
```

### Задача 15: Сжатие списка
```python
# Удалить все нули из списка, сдвинув остальные элементы влево
def compress_zeros(numbers):
    result = []
    
    for number in numbers:
        if number != 0:
            result.append(number)
    
    # Добиваем нулями до исходной длины
    while len(result) < len(numbers):
        result.append(0)
    
    return result

# Пример
original = [0, 1, 0, 3, 0, 0, 5, 7, 0]
compressed = compress_zeros(original)  # [1, 3, 5, 7, 0, 0, 0, 0, 0]
```

---

## 💡 **Советы для эффективной работы:**

1. **Знайте свои инструменты:** 
   - `append()` - O(1) для добавления в конец
   - `insert()` - O(n) для вставки в середину
   - `in` оператор - O(n) для поиска в неотсортированном списке

2. **Избегайте распространенных ошибок:**
   ```python
   # Плохо: изменяем список во время итерации
   for item in my_list:
       if condition(item):
           my_list.remove(item)  # Может привести к неожиданному поведению
   
   # Хорошо: создаем новый список
   new_list = [item for item in my_list if not condition(item)]
   ```

3. **Используйте правильные методы:**
   ```python
   # Для подсчета
   count = my_list.count(value)  # Вместо цикла
   
   # Для поиска
   if value in my_list:  # Вместо ручной проверки
   
   # Для сортировки
   sorted_list = sorted(my_list)  # Вместо написания сортировки
   ```

---

> *"Мастерство работы со списками приходит с практикой. Начните с простых задач, постепенно усложняйте их, и скоро вы обнаружите, что можете решать сложные проблемы с помощью этих простых структур."*

Удачи в практике! 🚀
