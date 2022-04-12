if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const bcrypt = require('bcryptjs')
const Todo = require('../todo.js')
const User = require('../user.js')
require('../../config/mongoose.js')

const db = require("../../config/mongoose.js")

const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678',
}
// db.once('open', async () => {
//   try {
//     let salt = bcrypt.genSaltSync(10)
//     let hash = bcrypt.hashSync(SEED_USER.password, salt)
//     const user = await User.create({
//           name: SEED_USER.name,
//           email: SEED_USER.email,
//           password: hash
//         })
//      for (let i = 0; i < 10; i++) {
//        await Todo.create({
//               name: 'name-' + `${i}`,
//               userId: user.id
//             })
//      }
//      console.log('done.')
//      process.exit()
//   } catch(err) {
//     console.warn(err)
//   }
// })
db.once('open', () => {
  bcrypt.genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => 
       User.create({
          name: SEED_USER.name,
          email: SEED_USER.email,
          password: hash
        }))
     .then(user => {
       return Promise.all(Array.from(
         { length: 10 },
          (_, i) => Todo.create({ 
            name: 'name-' + `${i}`,
            userId: user.id
          })
       ))
     })
     .then(() => {
       console.log('done.')
       process.exit()
     })  
}) 
// db.once('open', () => {
//   bcrypt.genSalt(10)
//     .then((salt) => bcrypt.hash(SEED_USER.password, salt))
//     .then(hash => 
//       User.create({
//         name: SEED_USER.name,
//         email: SEED_USER.email,
//         password: hash
//       }))
//       .then((user) => {
//         for (let i = 0; i < 10; i++) {
//           Todo.create({
//             name: 'name-' + `${i}`,
//             userId: user.id
//           })
//         }
//       })
//       .then(() => {
//         console.log('done.')
//         // db.close()
//         process.exit()
//         // setTimeout(() => {
//         //   process.exit()
//         // },100)
//       })
//       .catch(err => console.log(err))
// })
// db.once('open', () => {
//   for (let i = 0; i < 10; i++) {
//     Todo.create({
//       name: `name-${i}`
//     })
//   }
//   console.log('done!')
// })
// db.once("open", async () => {
//   for (let i = 0; i < 10; i++) {
//     await Todo.create({
//       name: `name-${i}`,
//     });
//   }
//   console.log("done!");
//   db.close()
// })
