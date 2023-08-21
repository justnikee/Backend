const jwt = require('jsonwebtoken');
const { Users } = require('../model/users');

const requireSignIn = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ success: false, message: 'Authorization token is missing' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await Users.findById(req.user._id);
    console.log(user.role);

    if (user.role !== 1) {
      return res.status(401).json({ success: false, message: 'Unauthorized Access!' });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ success: false, error, message: 'isAdmin middleware error' });
  }
};

module.exports = {
  requireSignIn,
  isAdmin
};