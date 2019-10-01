const mongoose = require('mongoose')

const connectionURL = 'mongodb://127.0.0.1:27017/task-manager-api'

mongoose.connect(connectionURL, { useNewUrlParser: true, useCreateIndex: true })

const User = mongoose.model('User', {
  name: {
    type: String
  },
  age: {
    type: Number
  }
})

const Task = mongoose.model('Task', {
  description: { type: String },
  completed: { type: Boolean }
})

new Task({ description: 'Do laundry', completed: false }).save()
  .then(e => console.log(e)).catch(e => console.log('error: ', e))

// const me = new User({ name: 'Colin', age: 29 })

// me.save()
//   .then(() => console.log(me)).catch(e => console.log('error: ', e))

