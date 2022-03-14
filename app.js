const express = require('express')
// const mongoose = require('mongoose')
const exshbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

require('./config/mongoose.js')

const router = require('./routes')
const app = express()

// mongoose.connect("mongodb://localhost/todo-list-g", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection

// db.on('error', () => {
//   console.log('mongodb error!')
// })
// db.once('open', () => {
//   console.log('mongodb connected!')
// })

const port = 3000

app.engine('hbs', exshbs({ defaultLayout: 'main', extname: 'hbs'}))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

app.use(router)

app.listen(port, (req, res) => {
  console.log(`The web is running http://localhost/${port}`)
})