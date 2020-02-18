/**
 * Created by jithin on 02/02/20.
 */
const express = require('express');
const _ = require('lodash');
const jwt = require('jsonwebtoken');

const router = express.Router();
const { User } = require("./models/user");

router.post('/signUp', async (req, res) => {
  const body = _.pick(req.body, ['user']);
  const user = new User(body.user);
  if (!user.email || !user.password) {
    return res.status(400).send({
      message: 'Bad Request',
    });
  }
  try {
    const foundUser = await User.findOne({ email: user.email });
    if (foundUser) {
      return res.status(422).send({
        message: 'Email is already taken.',
      });
    }
    const registerdUser = await user.save();
    const userJson = registerdUser.toJSON();
    const generatedToken = jwt.sign({id: userJson._id,
      email: userJson.email,}, 'QWERTY', {
      expiresIn: '7d',
    });//jwt secret is qwerty

    return res.status(200).send({
      user: userJson,
      token: generatedToken,
    });
  } catch (err) {
    return res.status(500).send({
      message: err,
    });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({
        message: 'Bad Request',
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(422).send({
        message: 'Email is incorrect.',
      });
    }

    const isPasswordValid = await user.comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(422).send({
        message: 'Password is incorrect.',
      });
    }

    const userJson = user.toJSON();
    const generatedToken = jwt.sign({
      id: userJson._id,
      email: userJson.email,
    },'QWERTY', {
      expiresIn: '7d',
    });

    return res.status(200).send({
      user: userJson,
      token: generatedToken,
    });
  } catch (err) {
    return res.status(500).send({
      error: err,
    });
  }
});

module.exports = (app) => {
  app.use('/api/user', router)
};