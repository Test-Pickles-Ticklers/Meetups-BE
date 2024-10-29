const jwt = require('jsonwebtoken');
const { dev_secret } = require('../config');

const auth =(req, res, next) => {
  // Check if Authorization header exists
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header missing' });
  }

  // Extract the token from the header
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Token missing' });
  }

  // Verify the token
  try {
    const decoded = jwt.verify(token, dev_secret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token.' });
  }
}

module.exports = auth;
