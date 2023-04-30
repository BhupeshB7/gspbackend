const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const User = require('../../models/Admin/Admin');
const User = require('../../models/User');
const router = express.Router();
const { hashPassword } = require('../../utils/passwordUtils');
const adminAuth = require('../../controllers/Admin/adminAuth')
const JWT_SECRET = process.env.JWT_SECRET;
//register
// router.post( '/register',async (req, res) => {
//     try {
//       const { name, email, password,} = req.body;
  
  
//       // Check if email already exists
//       const emailExists = await User.findOne({ email });
//       if (emailExists) {
//         return res.status(400).json({ error: 'Email already exists' });
//       }

//         // Hash the password
//         const hashedPassword = await hashPassword(req.body.password);
            
//       // Create new user
//       const user = new User({
//         name,
//         email,
//         password: hashedPassword
//       });
  
//       // Save user to database
//       await user.save();
  
//       res.json('user created Successfully!');
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Server error' });
//     }
//   });
  //
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  if (user.role !== 'admin') {
    return res.status(403).json({ message: 'You are not authorized to access this resource' });
  }

  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });

  res.json({ token });
});

router.get('/api/users', async (req, res) => {
  const users = await User.find();

  res.json(users);
});

router.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // if (user.role !== 'admin') {
  //   return res.status(403).json({ message: 'You are not authorized to access this resource' });
  // }

  await User.findByIdAndDelete(id);

  res.json({ message: 'User deleted successfully' });
});

// Get all users (admin only)
router.get('/users', adminAuth, async (req, res) => {
    try {
      const users = await User.find();
      res.send(users);
    } catch (error) {
      res.status(500).send({ error: 'Internal server error.' });
    }
  });
  
module.exports = router;