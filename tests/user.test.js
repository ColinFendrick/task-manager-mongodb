const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')

const userOne = {
  name: 'Mike',
  email: 'mike@example.com',
  password: '56ajsdfh!'
}

beforeEach(async () => {
  await User.deleteMany()
  await new User(userOne).save()
})

test('Should signup a new user', async () => {
  await request(app).post('/users').send({
    name: 'Andrew',
    email: 'andrew@example.com',
    password: 'MyPass777'
  }).expect(201)
})

test('Should log in user', async () => {
  await request(app).post('/users/login').send({
    email: userOne.email,
    password: userOne.password
  }).expect(200)
})

test('Should fail to log in non-existent user', async () => {
  await request(app).post('/users/login').send({
    email: 'nonexistent@email.com',
    password: 'badtestdata'
  }).expect(400)
})
