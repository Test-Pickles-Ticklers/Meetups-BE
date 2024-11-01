const jwt = require('jsonwebtoken');
const { dev_secret } = require('../config');

const auth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Token missing' });
  }

  try {
    const decoded = jwt.verify(token, dev_secret);
    req.user = { email: decoded.email };
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token.' });
  }
};

module.exports = auth;
