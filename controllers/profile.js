// const User = require('../models/User');

// const getUserProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id);
//     res.json(user);
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// module.exports = { getUserProfile };


const User = require('../models/User');

exports.getProfile = async (req, res) => {
try {
// Get user data from database
const user = await User.findById(req.user.id).select('-password');
res.json(user);
} catch (err) {
console.log(err);
res.status(500).json({ message: 'Internal server error' });
}
};