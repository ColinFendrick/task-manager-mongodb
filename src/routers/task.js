const express = require('express')
const router = new express.Router()
const Task = require('../models/task')
const auth = require('../middleware/auth')

router.post('/tasks', auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id
  })

  try {
    await task.save()
    res.status(201).send(task)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.get('/tasks', auth, async (req, res) => {
  const match = {}

  if (req.query.completed) {
    match.completed = req.query.completed === 'true'
  }

  try {
    // const tasks = await Task.find({ owner: req.user._id })
    await req.user.populate({
      path: 'tasks',
      match,
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip)
      }
    }).execPopulate()
    res.send(req.user.tasks)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.get('/tasks/:id', auth, async (req, res) => {

  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id
    })

    if (!task) { return res.status(404).send() }

    res.send(task)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.patch('/tasks/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['description', 'completed']
  const isValidOp = updates.every(update => allowedUpdates.includes(update))
  if (!isValidOp) { return res.status(400).send({ error: 'Update is invalid' }) }

  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id
    })

    if (!task) { return res.status(404).send() }

    updates.forEach(update => task[update] = req.body[update])
    task.save()
    res.send(task)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.delete('/tasks/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id
    })
    if (!task) { res.status(404).send() }
    res.send(task)
  } catch (e) {
    res.status(400).send(e)
  }
})

module.exports = router
