const { MongoClient, ObjectId } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectId()
console.log(id.id.length)
console.log(id.toHexString().length)

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log('Unable to connect to database')
  }

  const db = client.db(databaseName)

  // db.collection('users').insertOne({
  //   name: 'Vikram',
  //   age: 26,
  //   _id: id
  // }, (error, result) => {
  //   if (error) {
  //     return console.log('Unable to insert user')
  //   }

  //   console.log(result.ops)
  // })

  // db.collection('users').insertMany([
  //   {
  //     name: 'Jen',
  //     age: 28
  //   },
  //   {
  //     name: 'Gunther',
  //     age: 27
  //   }
  // ], (error, result) => {
  //   if (error) {
  //     return console.log('Unable to insert user')
  //   }

  //   console.log(result.ops)
  // })

  // db.collection('tasks').insertMany([
  //   {
  //     description: 'Get groceries',
  //     completed: true
  //   },
  //   {
  //     description: 'Do laundry',
  //     completed: false
  //   }
  // ], (error, result) => {
  //   if (error) { return console.log('Cannot insert tasks', error) }

  //   console.log(result.ops)
  // })

  client.close()
})