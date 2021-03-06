/**
 * Created by jithin on 29/01/20.
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require('validator');
const bcrypt = require('bcryptjs');

const TodoSchema = new Schema({

});

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    es_indexed: true,
    es_type: 'text',
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{value} is not the valid email',
    }
  },
  todos:[{text: {
    type: String,
    required: true
  },
    done: {
      type: Boolean,
      default: false
    }}],
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  resetPasswordToken: {
    type: String,
  },

});

UserSchema.methods.comparePassword = function(password) {
  const user = this;
  return bcrypt.compareSync(password, user.password);
};

UserSchema.pre('save', function(next) {
  const user = this;
  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err1, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});
const User = mongoose.model('User', UserSchema);
module.exports = { User, TodoSchema };
