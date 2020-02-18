/**
 * Created by jithin on 12/02/20.
 */
const jwt = require('jsonwebtoken');
const { User } = require('./models/user');

// auth middleware
const authenticate = async (req, res, next) => {
  const token = req.header('x-auth');

  try {
    if (!token) {
      throw new Error('Please login to continue');
    }
    const decoded = await jwt.verify(token, 'QWERTY');
    const user = await User.findById(decoded.id);
    req.user = user;
    req.token = token;

    if (!user || !token) {
      throw new Error('Please login again');
    }

    next();
  } catch (e) {
    res.status(401).send({ message: e.message });
  }
};

module.exports = { authenticate };
