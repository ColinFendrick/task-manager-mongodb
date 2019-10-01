const mongoose = require('mongoose')

const connectionURL = 'mongodb://127.0.0.1:27017/task-manager-api'

mongoose.connect(connectionURL, { useNewUrlParser: true, useCreateIndex: true })

const Task = mongoose.model('Task', {
  description: { type: String, trim: true, required: true },
  completed: { type: Boolean, default: false }
})

// new Task({ description: 'Do laundry' }).save()
//   .then(e => console.log(e)).catch(e => console.log('error: ', e))

