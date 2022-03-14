const express = require("express");
const router = express.Router();

const Todo = require('../../models/todo')

router.get("/new", (req, res) => {
  res.render("new");
});

router.post("/", (req, res) => {
  const body = req.body;
  return Todo.create({
    name: body.name,
  })
    .then(() => res.redirect("/"))
    .catch((error) => console.error(error));
});

router.get("/:todo_id", (req, res) => {
  const id = req.params.todo_id;
  console.log(id)
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render("detail", { todo }))
    .catch((error) => console.error(error));
});

router.get("/:todo_id/edit", (req, res) => {
  const id = req.params.todo_id;
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render("edit", { todo }))
    .catch((error) => console.error(error));
});

router.put("/:todo_id", (req, res) => {
  const id = req.params.todo_id;
  const { name, isDone } = req.body;
  return Todo.updateOne(
    { _id: id },
    { $set: { name, isDone: isDone === "on" } }
  )
    .then(() => res.redirect(`/todos/${id}/edit`))
    .catch((err) => console.log(err));

  // return Todo.findById(id)
  //   .then((todo) => {
  //     todo.name = name
  //     todo.isDone = isDone === 'on'
  //     return todo.save()
  //   })
  //   .then(() => res.redirect(`/${id}/edit`))
  //   .catch((error) => console.error(error));
});

router.delete("/:todo_id", (req, res) => {
  const _id = req.params.todo_id;
  // return Todo.deleteOne({_id: _id})
  //   .then(() => res.redirect('/'))
  //   .catch(err => console.log(err))
  return Todo.findById(_id)
    .then((todo) => {
      todo.remove();
    })
    .then(() => res.redirect("/"))
    .catch((err) => console.error(err));
});


module.exports = router;
