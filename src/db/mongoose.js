const mongoose = require('mongoose')
const validator = require('validator')

const connectionURL = 'mongodb://127.0.0.1:27017/task-manager-api'

mongoose.connect(connectionURL, { useNewUrlParser: true, useCreateIndex: true })

const User = mongoose.model('User', {
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) { throw new Error('Age must be positive number') }
    }
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) { throw new Error('Email is invalid') }
    }
  }
})

const Task = mongoose.model('Task', {
  description: { type: String },
  completed: { type: Boolean }
})

// new Task({ description: 'Do laundry', completed: false }).save()
//   .then(e => console.log(e)).catch(e => console.log('error: ', e))

const me = new User({ name: '  Colin  ', email: 'MY@myemail.com' })

me.save()
  .then(() => console.log(me)).catch(e => console.log('error: ', e))

