const express = require('express')
const mongoose = require('mongoose')

const exshbs = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const Todo = require('./models/todo')
const { deleteOne } = require('./models/todo')
const { redirect } = require('express/lib/response')


mongoose.connect("mongodb://localhost/todo-list-g", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

const port = 3000

app.engine('hbs', exshbs({ defaultLayout: 'main', extname: 'hbs'}))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  Todo.find()
  .lean()
  .then(todos => res.render('index', { todos }))
  .catch(error => console.error(error))

})
app.get('/todos/new', (req, res) => {
  res.render('new')
})

app.post('/todos', (req, res) => {
  const body = req.body
  console.log(body)
  return Todo.create({
    name: body.name
  })
  .then(() => res.redirect('/'))
  .catch(error => console.error(error))
})

app.get('/todos/:todo_id', (req, res) => {
  const id = req.params.todo_id;
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('detail', { todo }))
    .catch((error) => console.error(error));
})

app.get("/todos/:todo_id/edit", (req, res) => {
  const id = req.params.todo_id;
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render("edit", { todo }))
    .catch((error) => console.error(error));
});
app.post("/todos/:todo_id/edit", (req, res) => {
  const id = req.params.todo_id;
  const body = req.body;
  // return Todo.updateOne({ _id: id }, { $set: { ...body }})
  return Todo.updateOne({ _id: id }, { $set: { name: body.name }})
    .then(() => res.redirect(`/todos/${id}/edit`))
    .catch(err => console.log(err))
  // return Todo.findById(id)
  //   .then((todo) => {
  //     todo.name = body.name
  //     return todo.save()
  //   })
  //   .then(() => res.redirect(`/todos/${id}/edit`))
  //   .catch((error) => console.error(error));
});
app.post('/todos/:todo_id/delete', (req, res) => {
  const _id = req.params.todo_id
  // return Todo.deleteOne({_id: _id})
  //   .then(() => res.redirect('/'))
  //   .catch(err => console.log(err))
  return Todo.findById(_id)
  .then(todo => {
    todo.remove()
  })
  .then(() => res.redirect('/'))
  .catch(err => console.error(err))
})

app.listen(port, (req, res) => {
  console.log(`The web is running http://localhost/${port}`)
})