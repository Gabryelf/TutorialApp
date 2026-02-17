import redis
r = redis.Redis(host='localhost', port=6379, db=0, decode_responses=True)
r.set('user:1', 'Alice'); r.set('user:2', 'Bob'); r.set('user:3', 'Charlie')
print(r.get('user:1'), r.get('user:2'), r.get('user:3'))
r.set('user:1', 'Alicia'); r.delete('user:3')
print(r.get('user:1'), r.get('user:2'), r.get('user:3'))
r.flushdb()
