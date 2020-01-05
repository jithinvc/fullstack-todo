/**
 * Created by jithin on 30/12/19.
 */
const express = require('express');

const router = express.Router();
const Todo = require("./models/todo");

router.post('/addtodo', (req, res) => {
  const newTodo = new Todo({
    text: req.body.text,
    id: req.body.id,
    done: req.body.done
  });
  console.log(req.body)
  Todo.create(newTodo).then(function(dbtodo) {
    console.log(dbtodo);
    res.json(dbtodo);
  })
    .catch(function(err) {
      // If an error occurred, log it
      console.log(err);
      res.json(err);
    });
});

router.get('/getTodos', async (req, res) => {
  const resPerPage = 9;
  const page = req.query.page;
  const query = req.query.query;
  try {
// Find Demanded Products - Skipping page values, limit results       per page
    const filter = query != '*' ? { text: new RegExp(query) } : {};
    const foundTodos = await Todo.find(filter)
        .skip((resPerPage * page) - resPerPage)
        .limit(resPerPage);
// Count how many products were found
    const numOfProducts = await Todo.count(filter);
// Renders The Page
    res.json({
      todos: foundTodos,
      currentPage: page,
      pages: Math.ceil(numOfProducts / resPerPage),
      numOfResults: numOfProducts
    });
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = app => {
  app.use('/', router)
};