
const Todo = require('../todo')
require('../../config/mongoose.js')

const db = require("../../config/mongoose.js")

// db.once('open', () => {
//   for (let i = 0; i < 10; i++) {
//     Todo.create({
//       name: `name-${i}`
//     })
//   }
//   console.log('done!')
// })
db.once("open", async () => {
  for (let i = 0; i < 10; i++) {
    await Todo.create({
      name: `name-${i}`,
    });
  }
  console.log("done!");
  db.close()
});
