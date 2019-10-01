require('../src/db/mongoose')
const Task = require('../src/models/task')

Task.findByIdAndDelete('5d933d4e639d705567579197')
  .then(() => Task.countDocuments({ completed: false }))
  .then(res => console.log(res))
  .catch(e => console.log(e))