if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const bcrypt = require('bcryptjs')
const Todo = require('../todo.js')
const User = require('../user.js')
require('../../config/mongoose.js')

const db = require('../../config/mongoose.js')

// const SEED_USER = {
//   name: 'root',
//   email: 'root@example.com',
//   password: '12345678'
// }
const SEED = [
  {
    name: 'root',
    email: 'root@example.com',
    password: '12345678'
  },
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678'
  },
  {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678'
  }
]

db.once('open', async () => {
  try {
    for (let user of SEED) {
      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(user.password, salt)
      user = await User.create(
        {
          name: user.name,
          email: user.email,
          password: hash
        }
      )
      for (let i = 0; i < 10; i++) {
        await Todo.create({
          name: 'name-' + `${i}`,
          userId: user.id
        })
      }
    }
    console.log('done.')
    process.exit()
  } catch (err) {
    console.warn(err)
  }
})
