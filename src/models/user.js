const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema({
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
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) { throw new Error('Email is invalid') }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validate(value) {
      if (value.toLowerCase().includes('password')) { throw new Error('Your password cannot contain \'password\'') }
    }
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }],
  avatar: { type: Buffer }
}, {
  timestamps: true
})

userSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'owner'
})

userSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this._id.toString() }, 'thisisasecret')

  this.tokens = this.tokens.concat({ token })
  await this.save()

  return token
}

userSchema.methods.toJSON  = function () {
  const userObject = this.toObject()

  delete userObject.password
  delete userObject.tokens
  delete userObject.avatar
  return userObject
}

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })

  if (!user) { throw new Error('Unable to login') }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) { throw new Error('Unable to login') }

  return user
}

// Match plain text password
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8)
  }

  next()
})

// Delete all tasks after removing user
userSchema.pre('remove', async function (next) {
  await Task.deleteMany({ owner: user._id })
  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
