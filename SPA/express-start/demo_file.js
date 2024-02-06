import { JSONFilePreset } from 'lowdb/node'

// Read or create db.json
const defaultData = { posts: [], users: {}, count: 0 }
const db = await JSONFilePreset('./SPA/express-start/db.json', defaultData)

// Update db.json
await db.update(({ posts }) => posts.push({'id':1,'title':'lowdb is awesome'}));

// Alternatively you can call db.write() explicitely later
// to write to db.json
/* db.data.posts.push('hello world')
await db.write() */

db.data.users.name='Lucy';
await db.write()

db.data.count++;
await db.write()