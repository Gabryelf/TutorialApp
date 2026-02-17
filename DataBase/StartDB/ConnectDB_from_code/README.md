# 📦 Скрипты для SQLite3, Redis и MongoDB на Python

## 1. SQLite3 (`sqlite_script.py`)
```python
import sqlite3
conn = sqlite3.connect('test.db'); c = conn.cursor()
c.execute('CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, age INTEGER)')
c.execute("INSERT INTO users (name, age) VALUES ('Alice', 25), ('Bob', 30), ('Charlie', 35)")
c.execute('SELECT * FROM users'); print(c.fetchall())
c.execute("UPDATE users SET age = 26 WHERE name = 'Alice'")
c.execute("DELETE FROM users WHERE name = 'Charlie'")
c.execute('SELECT * FROM users'); print(c.fetchall())
c.execute('DROP TABLE users'); conn.close()
```

## 2. Redis (`redis_script.py`)
```python
import redis
r = redis.Redis(host='localhost', port=6379, db=0, decode_responses=True)
r.set('user:1', 'Alice'); r.set('user:2', 'Bob'); r.set('user:3', 'Charlie')
print(r.get('user:1'), r.get('user:2'), r.get('user:3'))
r.set('user:1', 'Alicia'); r.delete('user:3')
print(r.get('user:1'), r.get('user:2'), r.get('user:3'))
r.flushdb()
```

## 3. MongoDB (`mongodb_script.py`)
```python
from pymongo import MongoClient
client = MongoClient('mongodb://localhost:27017/'); db = client['test_db']; collection = db['users']
collection.insert_many([{'name': 'Alice', 'age': 25}, {'name': 'Bob', 'age': 30}, {'name': 'Charlie', 'age': 35}])
print(list(collection.find()))
collection.update_one({'name': 'Alice'}, {'$set': {'age': 26}})
collection.delete_one({'name': 'Charlie'})
print(list(collection.find()))
collection.drop(); client.close()
```

---


# 🗄️ Работа с базами данных в Python: SQLite3, Redis, MongoDB

Руководство по установке и запуску трёх популярных баз данных с минимальными Python-скриптами.

---

## 📋 Содержание
- [Требования](#требования)
- [SQLite3](#sqlite3)
- [Redis](#redis)
- [MongoDB](#mongodb)
- [Проверка установки](#проверка-установки)

---

## ✅ Требования

- Python 3.6+
- pip (менеджер пакетов Python)
- Права администратора (для установки серверов БД)

---

## 🗃️ SQLite3

SQLite3 **встроен** в Python, дополнительная установка не требуется.

### Установка драйвера
```bash
# Драйвер уже встроен, ничего ставить не нужно
```

### Запуск скрипта
```bash
python sqlite_script.py
```

### Ожидаемый вывод
```
[(1, 'Alice', 25), (2, 'Bob', 30), (3, 'Charlie', 35)]
[(1, 'Alice', 26), (2, 'Bob', 30)]
```

### Файлы
После выполнения появится файл `test.db` — это и есть база данных.

---

## 🔴 Redis

### Установка Redis сервера

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install redis-server
sudo systemctl start redis
sudo systemctl enable redis
```

**macOS:**
```bash
brew install redis
brew services start redis
```

**Windows:**
- Скачайте установщик с [github.com/microsoftarchive/redis/releases](https://github.com/microsoftarchive/redis/releases)
- Или используйте WSL

### Установка Python-драйвера
```bash
pip install redis
```

### Проверка работы Redis
```bash
redis-cli ping
# Должен ответить: PONG
```

### Запуск скрипта
```bash
python redis_script.py
```

### Ожидаемый вывод
```
Alice Bob Charlie
Alicia Bob None
```

---

## 🍃 MongoDB

### Установка MongoDB сервера

**Linux (Ubuntu/Debian):**
```bash
# Импорт ключа
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Добавление репозитория
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Установка
sudo apt update
sudo apt install -y mongodb-org

# Запуск
sudo systemctl start mongod
sudo systemctl enable mongod
```

**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Windows:**
- Скачайте установщик с [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
- Установите как службу

### Установка Python-драйвера
```bash
pip install pymongo
```

### Проверка работы MongoDB
```bash
mongosh --eval "db.runCommand({ connectionStatus: 1 })"
```

### Запуск скрипта
```bash
python mongodb_script.py
```

### Ожидаемый вывод
```
[{'_id': ObjectId('...'), 'name': 'Alice', 'age': 25}, {'_id': ObjectId('...'), 'name': 'Bob', 'age': 30}, {'_id': ObjectId('...'), 'name': 'Charlie', 'age': 35}]
[{'_id': ObjectId('...'), 'name': 'Alice', 'age': 26}, {'_id': ObjectId('...'), 'name': 'Bob', 'age': 30}]
```

---

## 🔍 Проверка установки всех БД

Создайте файл `check_install.py`:

```python
import sqlite3
import redis
from pymongo import MongoClient

print("✅ SQLite3:", sqlite3.sqlite_version)

try:
    r = redis.Redis(host='localhost', port=6379, socket_connect_timeout=2)
    r.ping()
    print("✅ Redis: доступен")
except:
    print("❌ Redis: не доступен")

try:
    client = MongoClient('mongodb://localhost:27017/', serverSelectionTimeoutMS=2000)
    client.server_info()
    print("✅ MongoDB: доступен")
except:
    print("❌ MongoDB: не доступен")
```

Запустите:
```bash
python check_install.py
```

---

## 📁 Структура проекта

```
project/
├── sqlite_script.py      # Работа с SQLite3
├── redis_script.py       # Работа с Redis
├── mongodb_script.py     # Работа с MongoDB
├── check_install.py      # Проверка установки
└── README.md             # Документация
```

---

## ⚡ Быстрый старт

```bash
# 1. Установите драйверы
pip install redis pymongo

# 2. Установите и запустите серверы БД
#    (инструкции выше для каждой ОС)

# 3. Запустите скрипты по очереди
python sqlite_script.py
python redis_script.py
python mongodb_script.py
```

---

## 🆘 Решение проблем

| Проблема | Решение |
|----------|---------|
| `ModuleNotFoundError: No module named 'redis'` | `pip install redis` |
| `Connection refused` для Redis | Проверьте, запущен ли Redis: `sudo systemctl status redis` |
| `Connection refused` для MongoDB | Проверьте, запущен ли MongoDB: `sudo systemctl status mongod` |
| Ошибка аутентификации MongoDB | По умолчанию аутентификация отключена. Для тестов не требуется |

---

## 📚 Дополнительные ресурсы

- [SQLite3 документация](https://docs.python.org/3/library/sqlite3.html)
- [Redis Python драйвер](https://github.com/redis/redis-py)
- [PyMongo документация](https://pymongo.readthedocs.io/)

---

## 📝 Лицензия

MIT — свободно используйте в учебных целях.

---

## ✅ Все готово! Спасибо за внимание!
