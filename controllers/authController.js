// const User = require('../models/User');
// const jwt = require('jsonwebtoken');

// exports.login = async (req, res) => {
//   try {
//     const user = await User.findOne({ userId: req.body.userId });
//     if (!user) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }
//     const isMatch = await user.comparePassword(req.body.password);
//     if (!isMatch) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }
//     const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     return res.json({ token });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'Server error' });
//   }
// };
