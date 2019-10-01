require('../src/db/mongoose')
const User = require('../src/models/user')

// 5d935f9c14c16a7958197ef3
// User.findByIdAndUpdate('5d935f9c14c16a7958197ef3', { age: 1000 })
//   .then(() => User.countDocuments({ age: 1000 }))
//   .then(res => console.log(res))
//   .catch(e => console.log(e))

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age })
  const count = await User.countDocuments({ age })
  return count
}

updateAgeAndCount('5d935f9c14c16a7958197ef3', 69)
  .then(count => console.log(count))
  .catch(e => console.log(e))