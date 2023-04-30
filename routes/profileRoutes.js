// backend/routes/profile.js

const express = require("express");
// const multer = require("multer");
const router = express.Router();
const {authMiddleware} = require('../middleware/Profile');
const {getUserProfile} = require('../controllers/profile');

router.get('/profile', authMiddleware, getUserProfile);

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const upload = multer({ storage: storage });

// const User = require('../models/User');

// // Get profile by id
// router.get("/:id", async (req, res) => {
//   try {
//     const profile = await User.findById(req.params.id);
//     if (!profile) {
//       return res.status(404).json({ message: "Profile not found" });
//     }
//     res.json(profile);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// // Update profile by id
// router.put("/:id", upload.single("image"), async (req, res) => {
//   try {
//     const profile = await User.findById(req.params.id);
//     if (!profile) {
//       return res.status(404).json({ message: "Profile not found" });
//     }

//     profile.name = req.body.name || profile.name;
//     profile.email = req.body.email || profile.email;
//     profile.bio = req.body.bio || profile.bio;

//     if (req.file) {
//       profile.image = req.file.filename;
//     }

//     await profile.save();

//     res.json({ message: "Profile updated successfully", profile });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// });

module.exports = router;
