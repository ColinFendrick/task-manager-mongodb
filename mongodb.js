const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const callback = (error, result) => {
  if (error) { return console.log('Cannot find antything')}

  console.log(result)
}

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log('Unable to connect to database')
  }

  const db = client.db(databaseName)

  db.collection('tasks').findOne({
    _id: new ObjectID('5d921a0cfe8d7e253e36dc38')
  }, callback)

  db.collection('users').find({ age: 29 }).toArray(callback)

  db.collection('tasks').find({ completed: false }).toArray(callback)

  client.close()
})