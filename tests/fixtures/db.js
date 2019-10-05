const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
  _id: userOneId,
  name: 'Mike',
  email: 'mike@example.com',
  password: '56ajsdfh!',
  tokens: [{
    token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
  }]
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
  _id: userTwoId,
  name: 'Andrew',
  email: 'andrew@andrew.org',
  password: 'house0089u0',
  tokens: [{
    token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
  }]
}

const firstTask = {
  _id: new mongoose.Types.ObjectId(),
  description: 'First',
  completed: false,
  owner: userOneId
}

const secondTask = {
  _id: new mongoose.Types.ObjectId(),
  description: 'Second',
  completed: true,
  owner: userOneId
}

const thirdTask = {
  _id: new mongoose.Types.ObjectId(),
  description: 'Third',
  completed: false,
  owner: userTwoId
}

const setupDatabase = async () => {
  await User.deleteMany()
  await Task.deleteMany()
  await new User(userOne).save()
  await new User(userTwo).save()
  await new Task(firstTask).save()
  await new Task(secondTask).save()
  await new Task(thirdTask).save()
}

module.exports = {
  userOneId,
  userOne,
  userTwoId,
  userTwo,
  firstTask,
  secondTask,
  thirdTask,
  setupDatabase
}
