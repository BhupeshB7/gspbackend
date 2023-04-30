const express = require("express");
const auth = require("../middleware/auth");
const User = require("../models/User");

const router = express.Router();

router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post('/profileUpdate', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (req.body.name) {
      user.name = req.body.name.trim();
    }

    if (req.body.bio) {
      user.bio = req.body.bio.trim();
    }
    if (req.body.address) {
      user.address = req.body.address.trim();
    }
    if (req.body.mobile) {
      const mobile = req.body.mobile.trim();
      const mobileExists = await User.findOne({ mobile });
      if (mobileExists && mobileExists._id.toString() !== user._id.toString()) {
        return res.status(400).json({ error: 'Mobile number already exists' });
      }
      user.mobile = mobile;
    }

    if (req.body.email) {
      const email = req.body.email.trim().toLowerCase();
      const emailExists = await User.findOne({ email });
      if (emailExists && emailExists._id.toString() !== user._id.toString()) {
        return res.status(400).json({ error: 'Email already exists' });
      }
      user.email = email;
    }

    await user.save();

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error for updation');
  }
});


module.exports = router;
