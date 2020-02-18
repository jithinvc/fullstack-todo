/**
 * Created by jithin on 30/12/19.
 */
const express = require('express');
const { authenticate } = require('./authenticate');
const router = express.Router();
const { User }  = require("./models/user");

router.post('/addtodo', authenticate, async (req, res) => {

  try {
    const { user } = req;
    console.log(req.body);
    const todo = {text: req.body.text, id: req.body.id, done: req.body.done};
    user.todos.push(todo);
    await user.save();

    return res.status(200).send({
      todo: res.json(todo),
    });
  }
  catch (e) {
    return res.status(500).send(e);
  }
});

router.get('/getTodos', authenticate, async (req, res) => {
  const resPerPage = 9;
  const page = req.query.page;
  const query = req.query.query;
  const { user } = req;
  try {
// Find Demanded Products - Skipping page values, limit results       per page
    const filter = new RegExp(query);
    const foundTodos = user.todos.filter((val) => val.text.match(filter));
    const paginated = foundTodos.slice((resPerPage * page) - resPerPage, (resPerPage * page));
// Count how many products were found
    const numOfProducts = foundTodos.length;
// Renders The Page
    res.json({
      todos: paginated,
      currentPage: page,
      pages: Math.ceil(numOfProducts/resPerPage),
      numOfResults: numOfProducts
    });
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = (app) => {
  app.use('/api/todo', router)
};