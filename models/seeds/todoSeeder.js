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

db.once('open', () => {
  for (let i = 0; i < SEED.length; i++) {
    bcrypt.genSalt(10)
      .then(salt => bcrypt.hash(SEED[i].password, salt))
      .then(hash => {
        const newUser = new User({
          name: SEED[i].name,
          email: SEED[i].email,
          password: hash
        })
        newUser.save()
          .then(user => {
            return Promise.all(Array.from({ length: 10 }, (_, i) =>
              Todo.create({
                name: 'name-' + `${i}`,
                userId: user.id
              })
            ))
          })
          .then((data) => {
            console.log('done.')
            // setTimeout(() =>
            // process.exit(), 1000)
            process.exit()
          })
      })
  }
  // const seedData = new Promise((resolve, reject) => {
  //   for (let i = 0; i < SEED.length; i++) {
  //     bcrypt.genSalt(10)
  //       .then(salt => bcrypt.hash(SEED[i].password, salt))
  //       .then(hash =>
  //         User.create({
  //           name: SEED[i].name,
  //           email: SEED[i].email,
  //           password: hash,
  //         }))
  //         // .then(data => console.log(data))
  //   }
  // })
  // return seedData
  // .then(data => console.log(data))
  // .catch(err => console.log(err))
  // return Promise.all(seedData)
  //   .then(seedData => console.log(seedDate))
  //   .catch(err => console.log(err))
  // bcrypt
  //   .genSalt(10)
  //   .then((salt) => bcrypt.hash(SEED_USER.password, salt))
  //   .then((hash) =>
  //     User.create({
  //       name: SEED_USER.name,
  //       email: SEED_USER.email,
  //       password: hash,
  //     })
  //   )
  //   .then((user) => {
  //     return Promise.all(
  //       Array.from({ length: 10 }, (_, i) =>
  //         Todo.create({
  //           name: 'name-' + `${i}`,
  //           userId: user.id,
  //         })
  //       )
  //     )
  //   })
  //   .then(() => {
  //     console.log('done.')
  //     process.exit()
  //   })
})
// db.once('open', () => {
//   bcrypt.genSalt(10)
//     .then(salt => bcrypt.hash(SEED_USER.password, salt))
//     .then(hash =>
//        User.create({
//           name: SEED_USER.name,
//           email: SEED_USER.email,
//           password: hash
//         }))
//      .then(user => {
//        return Promise.all(Array.from(
//          { length: 10 },
//           (_, i) => Todo.create({
//             name: 'name-' + `${i}`,
//             userId: user.id
//           })
//        ))
//      })
//      .then(() => {
//        console.log('done.')
//        process.exit()
//      })
// })
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
