const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/task')
const {
  userOne,
  userTwo,
  firstTask,
  setupDatabase
} = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should create task for user', async () => {
  const response = await request(app)
    .post('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({ description: 'Do laundry' })
    .expect(201)

  const task = await Task.findById(response.body._id)
  expect(task).not.toBeNull()
  expect(task.completed).toBe(false)
})

test('Should find tasks', async () => {
  const response = await request(app)
    .get('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
  
  expect(response.body).toHaveLength(2)
})

test('Second user cannot delete first task', async () => {
  await request(app)
    .delete(`/tasks/${firstTask._id}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
  const task = await Task.findById(firstTask._id)
  expect(task).toBeNull()
})
