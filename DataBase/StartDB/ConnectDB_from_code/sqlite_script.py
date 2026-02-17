import sqlite3
conn = sqlite3.connect('test.db'); c = conn.cursor()
c.execute('CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, age INTEGER)')
c.execute("INSERT INTO users (name, age) VALUES ('Alice', 25), ('Bob', 30), ('Charlie', 35)")
c.execute('SELECT * FROM users'); print(c.fetchall())
c.execute("UPDATE users SET age = 26 WHERE name = 'Alice'")
c.execute("DELETE FROM users WHERE name = 'Charlie'")
c.execute('SELECT * FROM users'); print(c.fetchall())
c.execute('DROP TABLE users'); conn.close()
