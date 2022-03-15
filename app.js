const express = require('express')
// const mongoose = require('mongoose')
const exshbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

require('./config/mongoose.js')

const router = require('./routes')
const app = express()
const PORT = process.env.PORT || 3000

app.engine('hbs', exshbs({ defaultLayout: 'main', extname: 'hbs'}))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

app.use(router)

app.listen(PORT, (req, res) => {
  console.log(`The web is running http://localhost/${PORT}`);
});