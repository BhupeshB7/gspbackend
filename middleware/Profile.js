const jwt = require('jsonwebtoken');
// const authMiddleware = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader) {
//     return res.status(401).json({ message: 'No authorization header' });
//   }
//   const token = authHeader.split(' ')[1];
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     console.log(error.message);
//     res.status(401).json({ message: 'Invalid token' });
//     }
//     };
    
//     module.exports = authMiddleware;
// const jwt = require('../utils/jwt');

module.exports = (req, res, next) => {
  try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
      // const decoded = jwt.verify(token);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
  } catch (err) {
      console.log(err);
      res.status(401).json({ message: 'Authorization error' });
  }
};