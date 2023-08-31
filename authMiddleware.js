const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decodedToken = jwt.verify(token, 'your-secret-key');
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
  }
};
