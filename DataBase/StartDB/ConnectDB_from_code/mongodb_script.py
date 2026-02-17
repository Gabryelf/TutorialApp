from pymongo import MongoClient
client = MongoClient('mongodb://localhost:27017/'); db = client['test_db']; collection = db['users']
collection.insert_many([{'name': 'Alice', 'age': 25}, {'name': 'Bob', 'age': 30}, {'name': 'Charlie', 'age': 35}])
print(list(collection.find()))
collection.update_one({'name': 'Alice'}, {'$set': {'age': 26}})
collection.delete_one({'name': 'Charlie'})
print(list(collection.find()))
collection.drop(); client.close()
