const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', (req, res) => {
  new User(req.body).save()
    .then(user => res.status(201).send(user))
    .catch(err => res.status(400).send(err))
})

app.get('/users', (req, res) => {
  User.find()
    .then(users => {
      if (!users) { return res.status(404).send() }

      res.send(users)
    })
    .catch(err => res.status(500).send(err))
})

app.get('/users/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      if (!user) { return res.status(400).send() }

      res.send(user)
    })
    .catch(err => res.status(00).send(err))
})

app.post('/tasks', (req, res) => {
  new Task(req.body).save()
    .then(task => res.status(201).send(task))
    .catch(err => res.status(404).send(err))
})

app.get('/tasks', (req, res) => {
  Task.find()
    .then(tasks => {
      if (!tasks) { return res.status(404).send() }

      res.send(tasks)
    })
    .catch(err => res.status(500).send(err))
})

app.get('/tasks/:id', (req, res) => {
  Task.findById(req.params.id)
    .then(task => {
      if (!task) { return res.status(404).send() }

      res.send(task)
    })
    .catch(err => res.status(500).send(err))
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})