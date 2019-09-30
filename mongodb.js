const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log('Unable to connect to database')
  }

  const db = client.db(databaseName)

  // db.collection('users').updateOne({
  //   _id: new ObjectID('5d921710b8600a24aa697388')
  // }, { $inc: { age: -8 }})
  //   .then(res => console.log('Success', res))
  //   .catch(err => console.log('Error', err))

  db.collection('tasks').updateMany({ completed: false }, {
    $set: { completed: true }
  })

  client.close()
})