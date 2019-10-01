const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', (req, res) => {
  const user = new User(req.body)

  user.save()
    .then(user => res.send(user))
    .catch(err => res.status(400).send(err))
})

app.post('/tasks', (req, res) => {
  new Task(req.body).save()
    .then(task => res.send(task))
    .catch(err => res.status(400).send(err))
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})