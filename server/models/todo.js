/**
 * Created by jithin on 30/12/19.
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  done: {
    type: Boolean,
    default: false
  }
});

module.exports = Todo = mongoose.model('Todos', TodoSchema);