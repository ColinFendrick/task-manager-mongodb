const { MongoClient } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log('Unable to connect to database')
  }

  const db = client.db(databaseName)

  db.collection('users').deleteMany({ age: 26 })
    .then(e => console.log(e)).catch(e => console.log(e))

  db.collection('tasks').deleteOne({
    description: 'Do laundry'
  }).then(e => console.log(e)).catch(e => console.log(e))
  client.close()
})