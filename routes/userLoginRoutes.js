const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const router = express.Router();
const auth = require('../middleware/auth');
const session = require('express-session');
router.post('/login', async (req, res) => {
  const { userId, password } = req.body;

  try {
    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // const isValidPassword = await user.isValidPassword(password);

    // if (!isValidPassword) {
    //   return res.status(401).json({ message: 'Invalid password' });
    // }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid  password.' });
    }

    const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Initialize session middleware
router.use(session({
  secret: 'bdfuiwbfucbduiofioewhfcnwdiofhioewnewiohewoid',
  resave: false,
  saveUninitialized: false,
}));
module.exports = router;
