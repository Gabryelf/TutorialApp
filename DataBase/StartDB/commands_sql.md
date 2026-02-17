
# 🚀 SQL-шпаргалка: все команды для работы с базой данных

> **Яркий справочник для начинающих и не только.**  
> Здесь собраны все основные команды SQL с примерами, пояснениями и цветовыми подсказками.

---

## 📚 Содержание
1. [DDL — создание структуры](#ddl)
2. [DML — манипуляция данными](#dml)
3. [DQL — выборка данных](#dql)
4. [DCL — управление доступом](#dcl)
5. [TCL — транзакции](#tcl)
6. [Служебные команды](#utility)
7. [Полезные функции](#functions)
8. [Шпаргалка по JOIN](#joins)

---

## 🏗️ DDL — Data Definition Language {#ddl}
*Команды для создания и изменения структуры БД*

### `CREATE` — создание объектов
```sql
-- 🔷 Создание базы данных
CREATE DATABASE database_name;
CREATE DATABASE IF NOT EXISTS store_db;

-- 🔷 Создание таблицы
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,        -- 📌 первичный ключ
    username VARCHAR(50) NOT NULL UNIQUE,      -- 📌 уникальное, не пустое
    email VARCHAR(100) NOT NULL,
    age INT CHECK (age >= 18),                 -- 📌 проверка возраста
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true
);

-- 🔷 Создание временной таблицы
CREATE TEMP TABLE temp_cart AS SELECT * FROM products WHERE price < 100;

-- 🔷 Создание индекса
CREATE INDEX idx_users_email ON users(email);

-- 🔷 Создание уникального индекса
CREATE UNIQUE INDEX idx_users_username ON users(username);
```

### `ALTER` — изменение структуры
```sql
-- 🟡 Добавление столбца
ALTER TABLE users ADD COLUMN phone VARCHAR(20);

-- 🟡 Удаление столбца
ALTER TABLE users DROP COLUMN phone;

-- 🟡 Изменение типа данных
ALTER TABLE users MODIFY COLUMN age SMALLINT;

-- 🟡 Переименование столбца
ALTER TABLE users RENAME COLUMN username TO login;

-- 🟡 Добавление ограничения
ALTER TABLE users ADD CONSTRAINT check_age CHECK (age >= 16);

-- 🟡 Удаление ограничения
ALTER TABLE users DROP CONSTRAINT check_age;

-- 🟡 Добавление внешнего ключа
ALTER TABLE orders 
ADD CONSTRAINT fk_user 
FOREIGN KEY (user_id) REFERENCES users(id);
```

### `DROP` — удаление объектов
```sql
-- 🔴 Удаление таблицы
DROP TABLE users;
DROP TABLE IF EXISTS users;

-- 🔴 Удаление базы данных
DROP DATABASE old_database;

-- 🔴 Удаление индекса
DROP INDEX idx_users_email;

-- 🔴 Удаление внешнего ключа
ALTER TABLE orders DROP FOREIGN KEY fk_user;
```

### `TRUNCATE` — очистка таблицы
```sql
-- 🟠 Быстрое удаление всех данных (без возможности отката)
TRUNCATE TABLE logs;
TRUNCATE cart;  -- быстрее чем DELETE, сбрасывает счётчики
```

### `RENAME` — переименование
```sql
-- 🔄 Переименование таблицы
RENAME TABLE old_name TO new_name;
ALTER TABLE users RENAME TO customers;
```

---

## ✏️ DML — Data Manipulation Language {#dml}
*Команды для работы с данными*

### `INSERT` — добавление записей
```sql
-- ✅ Вставка одной записи
INSERT INTO users (username, email, age) 
VALUES ('john_doe', 'john@example.com', 25);

-- ✅ Вставка нескольких записей
INSERT INTO products (name, price, category) VALUES
    ('Ноутбук', 75000, 'Электроника'),
    ('Мышь', 1500, 'Аксессуары'),
    ('Коврик', 800, 'Аксессуары');

-- ✅ Вставка с SELECT
INSERT INTO premium_users (user_id, username, email)
SELECT id, username, email FROM users WHERE total_spent > 10000;

-- ✅ Вставка с игнорированием ошибок
INSERT IGNORE INTO users (id, username) VALUES (1, 'admin');

-- ✅ Вставка с обновлением при конфликте (MySQL)
INSERT INTO users (id, username) VALUES (1, 'admin')
ON DUPLICATE KEY UPDATE username = 'admin';
```

### `UPDATE` — обновление записей
```sql
-- 📝 Обновление одной записи
UPDATE users 
SET email = 'new@email.com' 
WHERE id = 5;

-- 📝 Массовое обновление
UPDATE products 
SET price = price * 1.1,        -- повышение на 10%
    updated_at = NOW() 
WHERE category = 'Электроника';

-- 📝 Обновление с использованием другой таблицы
UPDATE orders o
JOIN users u ON o.user_id = u.id
SET o.discount = 10
WHERE u.is_premium = true;

-- ⚠️ ВСЕГДА используйте WHERE! Иначе обновятся все строки
-- UPDATE users SET is_active = false;  -- 😱 Опасно!
```

### `DELETE` — удаление записей
```sql
-- 🗑️ Удаление конкретной записи
DELETE FROM users WHERE id = 10;

-- 🗑️ Удаление по условию
DELETE FROM logs WHERE created_at < '2023-01-01';

-- 🗑️ Удаление с лимитом (MySQL, PostgreSQL)
DELETE FROM cart LIMIT 100;

-- 🗑️ Удаление с использованием подзапроса
DELETE FROM orders 
WHERE user_id IN (SELECT id FROM users WHERE is_banned = true);

-- ⚠️ ВСЕГДА проверяйте SELECT перед DELETE!
-- SELECT * FROM users WHERE is_banned = true;  -- сначала проверь
-- DELETE FROM users WHERE is_banned = true;    -- потом удаляй
```

### `REPLACE` — замена записи (MySQL)
```sql
-- 🔄 Если запись существует — обновит, нет — вставит
REPLACE INTO users (id, username, email) 
VALUES (1, 'admin', 'admin@site.com');
```

---

## 🔍 DQL — Data Query Language {#dql}
*Команды для выборки данных*

### `SELECT` — базовая выборка
```sql
-- 👁️ Выбрать все столбцы
SELECT * FROM users;

-- 👁️ Выбрать конкретные столбцы
SELECT username, email, created_at FROM users;

-- 👁️ Выбрать с псевдонимами
SELECT 
    username AS "Имя пользователя",
    email AS "Эл. почта",
    age AS "Возраст"
FROM users;

-- 👁️ Выбрать уникальные значения
SELECT DISTINCT category FROM products;

-- 👁️ Выбрать с вычислениями
SELECT 
    name,
    price,
    price * 0.87 AS price_with_discount,
    price * 1.2 AS retail_price
FROM products;
```

### `WHERE` — фильтрация
```sql
-- 🔎 Сравнения
SELECT * FROM users WHERE age >= 18;
SELECT * FROM products WHERE price BETWEEN 1000 AND 5000;
SELECT * FROM orders WHERE status IN ('paid', 'shipped');

-- 🔎 Текстовый поиск
SELECT * FROM users WHERE username LIKE 'john%';        -- начинается с john
SELECT * FROM users WHERE email LIKE '%@gmail.com';     -- заканчивается на @gmail.com
SELECT * FROM products WHERE name LIKE '%ноутбук%';     -- содержит слово

-- 🔎 Логические операторы
SELECT * FROM products 
WHERE (category = 'Электроника' OR category = 'Телефоны') 
  AND price < 50000
  AND stock > 0;

-- 🔎 Работа с NULL
SELECT * FROM users WHERE deleted_at IS NULL;           -- не удалённые
SELECT * FROM profiles WHERE avatar IS NOT NULL;        -- с аватаркой

-- 🔎 Регулярные выражения (MySQL)
SELECT * FROM users WHERE email REGEXP '^[a-z]+@[a-z]+\\.(com|ru)$';
```

### `JOIN` — объединение таблиц
```sql
-- 🤝 INNER JOIN (только совпадающие)
SELECT 
    o.id AS order_id,
    u.username,
    p.name AS product_name
FROM orders o
INNER JOIN users u ON o.user_id = u.id
INNER JOIN products p ON o.product_id = p.id;

-- 🤝 LEFT JOIN (все из левой + совпадающие из правой)
SELECT 
    u.username,
    COUNT(o.id) AS order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id;

-- 🤝 RIGHT JOIN (все из правой + совпадающие из левой)
SELECT * FROM orders
RIGHT JOIN users ON orders.user_id = users.id;

-- 🤝 FULL OUTER JOIN (все записи из обеих) — PostgreSQL
SELECT * FROM employees
FULL OUTER JOIN departments ON employees.dept_id = departments.id;

-- 🤝 CROSS JOIN (декартово произведение)
SELECT * FROM sizes CROSS JOIN colors;
```

### `GROUP BY` — группировка
```sql
-- 📊 Количество заказов по пользователям
SELECT 
    user_id,
    COUNT(*) AS orders_count,
    SUM(total) AS total_spent,
    AVG(total) AS avg_order_value
FROM orders
GROUP BY user_id;

-- 📊 Группировка с условием HAVING
SELECT 
    category,
    COUNT(*) AS product_count,
    AVG(price) AS avg_price
FROM products
GROUP BY category
HAVING COUNT(*) > 5 AND AVG(price) > 1000;

-- 📊 Группировка с ROLLUP (итоги)
SELECT 
    category,
    brand,
    SUM(quantity) AS total_sold
FROM sales
GROUP BY category, brand WITH ROLLUP;
```

### `ORDER BY` — сортировка
```sql
-- 🔽 Сортировка по возрастанию (ASC — по умолчанию)
SELECT * FROM products ORDER BY price;

-- 🔽 Сортировка по убыванию
SELECT * FROM products ORDER BY price DESC;

-- 🔽 Множественная сортировка
SELECT * FROM orders 
ORDER BY status ASC, created_at DESC;

-- 🔽 Сортировка по вычисляемому полю
SELECT 
    name,
    price,
    price * 0.87 AS discounted
FROM products
ORDER BY discounted DESC;
```

### `LIMIT` и `OFFSET` — ограничение выборки
```sql
-- ⏱️ Первые 10 записей
SELECT * FROM users LIMIT 10;

-- ⏱️ Пропустить 20, взять 10 (пагинация)
SELECT * FROM products 
ORDER BY id 
LIMIT 10 OFFSET 20;  -- страница 3, по 10 записей

-- ⏱️ Короткий синтаксис MySQL
SELECT * FROM products LIMIT 20, 10;  -- OFFSET 20, LIMIT 10
```

### Подзапросы (Subqueries)
```sql
-- 🔄 Подзапрос в WHERE
SELECT * FROM products 
WHERE category_id = (
    SELECT id FROM categories WHERE name = 'Electronics'
);

-- 🔄 Подзапрос с IN
SELECT * FROM users 
WHERE id IN (
    SELECT user_id FROM orders WHERE total > 10000
);

-- 🔄 Подзапрос в SELECT
SELECT 
    name,
    price,
    (SELECT AVG(price) FROM products) AS avg_price,
    price - (SELECT AVG(price) FROM products) AS diff
FROM products;

-- 🔄 Подзапрос в FROM (производная таблица)
SELECT 
    dept_name,
    avg_salary
FROM (
    SELECT 
        department_id,
        AVG(salary) AS avg_salary
    FROM employees
    GROUP BY department_id
) AS dept_stats
JOIN departments ON dept_stats.department_id = departments.id;
```

---

## 🔐 DCL — Data Control Language {#dcl}
*Управление правами доступа*

### `GRANT` — предоставление прав
```sql
-- 👑 Дать все права на БД пользователю
GRANT ALL PRIVILEGES ON mydb.* TO 'user'@'localhost';

-- 👑 Дать права на чтение
GRANT SELECT ON mydb.* TO 'readonly'@'%';

-- 👑 Дать права на конкретные действия
GRANT SELECT, INSERT, UPDATE ON mydb.orders TO 'manager'@'localhost';

-- 👑 Дать права с возможностью передачи
GRANT ALL PRIVILEGES ON *.* TO 'admin'@'localhost' WITH GRANT OPTION;

-- 👑 Создание пользователя и выдача прав (MySQL)
CREATE USER 'app'@'%' IDENTIFIED BY 'secure_password';
GRANT SELECT, INSERT, UPDATE ON mydb.* TO 'app'@'%';
```

### `REVOKE` — отзыв прав
```sql
-- 🔒 Отзыв всех прав
REVOKE ALL PRIVILEGES ON mydb.* FROM 'user'@'localhost';

-- 🔒 Отзыв конкретных прав
REVOKE INSERT, UPDATE ON mydb.* FROM 'app'@'%';

-- 🔒 Отзыв права передачи
REVOKE GRANT OPTION ON *.* FROM 'admin'@'localhost';
```

---

## 💼 TCL — Transaction Control Language {#tcl}
*Управление транзакциями*

```sql
-- 🏦 Начало транзакции
START TRANSACTION;
BEGIN;  -- PostgreSQL
BEGIN WORK;  -- альтернатива

-- 🏦 Выполнение операций
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

-- 🏦 Подтверждение транзакции
COMMIT;

-- 🏦 Откат транзакции
ROLLBACK;

-- 🏦 Точка сохранения
SAVEPOINT before_delete;
DELETE FROM temp_data WHERE created_at < '2024-01-01';
-- Ой, передумали
ROLLBACK TO SAVEPOINT before_delete;

-- 🏦 Завершить транзакцию и начать новую
COMMIT AND CHAIN;

-- 🏦 Установка уровня изоляции
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
```

---

## 🛠️ Utility Commands {#utility}
*Служебные команды*

### Информация о БД
```sql
-- 📋 Показать базы данных (MySQL)
SHOW DATABASES;

-- 📋 Показать таблицы (MySQL, PostgreSQL)
SHOW TABLES;
\dt  -- PostgreSQL

-- 📋 Описание структуры таблицы
DESCRIBE users;
SHOW COLUMNS FROM users;  -- MySQL
\d users  -- PostgreSQL

-- 📋 Показать все индексы
SHOW INDEX FROM users;  -- MySQL

-- 📋 Показать текущие процессы (MySQL)
SHOW PROCESSLIST;

-- 📋 Информация о БД (SQLite)
.databases
.tables
.schema users
```

### Администрирование
```sql
-- 🔧 Подключение к БД (в CLI)
USE database_name;  -- MySQL
\c database_name    -- PostgreSQL

-- 🔧 Показать текущего пользователя
SELECT USER();  -- MySQL
SELECT current_user;  -- PostgreSQL

-- 🔧 Показать версию
SELECT VERSION();

-- 🔧 Анализ запроса
EXPLAIN SELECT * FROM users WHERE email = 'test@test.com';
EXPLAIN ANALYZE SELECT ...;  -- PostgreSQL

-- 🔧 Оптимизация таблицы (MySQL)
OPTIMIZE TABLE users;

-- 🔧 Проверка таблицы (MySQL)
CHECK TABLE users;
```

---

## 🧮 Полезные функции {#functions}

### Агрегатные функции
```sql
-- 📊 COUNT — количество
SELECT COUNT(*) FROM users;
SELECT COUNT(DISTINCT category) FROM products;

-- 📊 SUM — сумма
SELECT SUM(total) AS revenue FROM orders WHERE status = 'paid';

-- 📊 AVG — среднее
SELECT AVG(price) FROM products WHERE category = 'Electronics';

-- 📊 MIN / MAX — минимум и максимум
SELECT 
    MIN(price) AS cheapest,
    MAX(price) AS most_expensive
FROM products;

-- 📊 GROUP_CONCAT / STRING_AGG — объединение строк
SELECT 
    category,
    GROUP_CONCAT(name) AS products  -- MySQL
    -- STRING_AGG(name, ', ') AS products  -- PostgreSQL
FROM products 
GROUP BY category;
```

### Строковые функции
```sql
-- 📝 Конкатенация
SELECT CONCAT(first_name, ' ', last_name) AS full_name FROM users;  -- MySQL
SELECT first_name || ' ' || last_name FROM users;  -- PostgreSQL, SQLite

-- 📝 Длина строки
SELECT LENGTH('Hello') AS len;  -- 5
SELECT CHAR_LENGTH('Привет') AS len;  -- 6 (длина в символах)

-- 📝 Регистр
SELECT UPPER(email), LOWER(username) FROM users;
SELECT UCASE('hello'), LCASE('HELLO');  -- MySQL

-- 📝 Обрезка
SELECT TRIM('  text  ');  -- 'text'
SELECT LTRIM('  text');   -- 'text'
SELECT RTRIM('text  ');   -- 'text'

-- 📝 Извлечение подстроки
SELECT SUBSTRING('Hello World', 1, 5);  -- 'Hello'
SELECT SUBSTR('Hello World', 7, 5);     -- 'World'

-- 📝 Замена
SELECT REPLACE('Hello World', 'World', 'SQL');  -- 'Hello SQL'

-- 📝 Поиск позиции
SELECT POSITION('World' IN 'Hello World');  -- 7 (MySQL)
SELECT INSTR('Hello World', 'World');       -- 7 (MySQL)
```

### Числовые функции
```sql
-- 🔢 Округление
SELECT ROUND(15.67);      -- 16
SELECT ROUND(15.67, 1);   -- 15.7
SELECT CEIL(15.1);        -- 16
SELECT FLOOR(15.9);       -- 15

-- 🔢 Абсолютное значение
SELECT ABS(-10);  -- 10

-- 🔢 Случайное число
SELECT RAND();        -- 0..1 (MySQL)
SELECT RANDOM();      -- -1..1 (PostgreSQL)

-- 🔢 Модуль
SELECT MOD(10, 3);  -- 1

-- 🔢 Степень и корень
SELECT POWER(2, 3);  -- 8
SELECT SQRT(16);     -- 4
```

### Функции даты и времени
```sql
-- 📅 Текущие дата и время
SELECT NOW();           -- 2024-01-15 14:30:00
SELECT CURRENT_DATE;    -- 2024-01-15
SELECT CURRENT_TIME;    -- 14:30:00
SELECT CURDATE();       -- MySQL
SELECT CURTIME();       -- MySQL

-- 📅 Извлечение частей даты
SELECT 
    YEAR(created_at),
    MONTH(created_at),
    DAY(created_at),
    HOUR(created_at),
    MINUTE(created_at)
FROM orders;

-- 📅 Форматирование даты
SELECT DATE_FORMAT(created_at, '%d.%m.%Y %H:%i') FROM orders;  -- MySQL
SELECT TO_CHAR(created_at, 'DD.MM.YYYY HH24:MI') FROM orders;  -- PostgreSQL

-- 📅 Добавление интервала
SELECT DATE_ADD(NOW(), INTERVAL 7 DAY);      -- +7 дней
SELECT DATE_SUB(NOW(), INTERVAL 1 MONTH);    -- -1 месяц

-- 📅 Разница между датами
SELECT DATEDIFF('2024-01-20', '2024-01-15');  -- 5 дней
SELECT TIMESTAMPDIFF(HOUR, start_time, end_time);  -- разница в часах
```

### Условные функции
```sql
-- ⚖️ CASE (аналог if-else)
SELECT 
    name,
    price,
    CASE 
        WHEN price < 1000 THEN 'Дешево'
        WHEN price BETWEEN 1000 AND 10000 THEN 'Средне'
        WHEN price > 10000 THEN 'Дорого'
        ELSE 'Неизвестно'
    END AS price_category
FROM products;

-- ⚖️ IF (MySQL, SQLite)
SELECT 
    name,
    IF(is_active, 'Активен', 'Неактивен') AS status
FROM users;

-- ⚖️ COALESCE — первое не-NULL значение
SELECT 
    username,
    COALESCE(display_name, username, 'Без имени') AS name
FROM users;

-- ⚖️ NULLIF — NULL если равны
SELECT NULLIF(status, 'deleted') FROM orders;  -- замена 'deleted' на NULL
```

---

## 🔗 Шпаргалка по JOIN {#joins}

```sql
-- 📌 INNER JOIN — только пересечение
SELECT * FROM A INNER JOIN B ON A.id = B.a_id;

-- 📌 LEFT JOIN — всё из A + совпадения из B
SELECT * FROM A LEFT JOIN B ON A.id = B.a_id;

-- 📌 RIGHT JOIN — всё из B + совпадения из A
SELECT * FROM A RIGHT JOIN B ON A.id = B.a_id;

-- 📌 FULL OUTER JOIN — всё из A и B
SELECT * FROM A FULL OUTER JOIN B ON A.id = B.a_id;

-- 📌 CROSS JOIN — декартово произведение
SELECT * FROM A CROSS JOIN B;
```

---

## ⚠️ Важные правила

| 🟢 Делать | 🔴 Не делать |
|-----------|--------------|
| Всегда использовать `WHERE` в `UPDATE`/`DELETE` | `DELETE` без `WHERE` |
| Проверять `SELECT` перед `DELETE` | Доверять пользовательскому вводу (SQL injection) |
| Использовать индексы на часто поисковых полях | Создавать слишком много индексов |
| Делать бэкапы перед массовыми изменениями | Использовать `SELECT *` в продакшене |
| Использовать транзакции для связанных операций | Хранить пароли в открытом виде |

---

## 🎯 Быстрый старт: минимальный набор команд

```sql
-- 1. Создать БД
CREATE DATABASE myapp;

-- 2. Создать таблицу
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE
);

-- 3. Вставить данные
INSERT INTO users (name, email) VALUES ('Иван', 'ivan@mail.com');

-- 4. Выбрать данные
SELECT * FROM users WHERE name LIKE 'И%';

-- 5. Обновить данные
UPDATE users SET email = 'new@mail.com' WHERE id = 1;

-- 6. Удалить данные
DELETE FROM users WHERE id = 1;

-- 7. Удалить таблицу
DROP TABLE users;
```

---

> 💡 **Совет:** Сохрани эту шпаргалку — она пригодится и новичку, и профессионалу.  
> 🎨 **Цветовая легенда:** 🟦 DDL, 🟩 DML, 🟨 запросы, 🟥 опасные операции, 🟪 администрирование

*Удачи в изучении SQL! 🚀*
