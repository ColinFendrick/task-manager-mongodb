require('../src/db/mongoose')
const User = require('../src/models/user')

// 5d935f9c14c16a7958197ef3
User.findByIdAndUpdate('5d935f9c14c16a7958197ef3', { age: 1000 })
  .then(() => User.countDocuments({ age: 1000 }))
  .then(res => console.log(res))
  .catch(e => console.log(e))