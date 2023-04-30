// const bcrypt = require('bcrypt');
// const emailUtil = require('../utils/email');
// const User = require('../models/User');
// exports.forgotPassword = async (req, res, next) => {
//   try {
//     const { email } = req.body;

//     // Check if user exists in database
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).send({ message: 'User not found' });
//     }

//     // Generate OTP
//     const otp = Math.floor(100000 + Math.random() * 900000);

//     // Send OTP to user's email
//     await emailUtil.sendEmail(user.email, 'Reset Password OTP', `Your OTP is ${otp}`);

//     // Save OTP in user document
//     user.resetPasswordOTP = otp;
//     await user.save();

//     res.status(200).send({ message: 'OTP sent to email' });
//   } catch (err) {
//     next(err);
//   }
// };

// exports.resetPassword = async (req, res, next) => {
//   try {
//     const { email, otp, newPassword } = req.body;

//     // Check if user exists in database
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).send({ message: 'User not found' });
//     }

//     // Check if OTP is valid
//     if (otp !== user.resetPasswordOTP) {
//       return res.status(400).send({ message: 'Invalid OTP' });
//     }

//     // Hash new password and update user document
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(newPassword, salt);
//     user.password = hashedPassword;
//     user.resetPasswordOTP = null;
//     await user.save();

//     res.status(200).send({ message: 'Password updated successfully' });
//   } catch (err) {
//     next(err);
//   }
// };





// const nodemailer = require('nodemailer');
// const bcrypt = require('bcrypt');
// const User = require('../models/User'); // Replace with your user model

// // Set up nodemailer transporter
// const transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 465,
//   secure: true,
//   auth: {
//     user: 'globalsuccess080@gmail.co',
//     pass: 'Global@123'
//   }
// });

// // Handle forgot password request
// exports.forgotPassword = (req, res) => {
//   const { email } = req.body;

//   // Check if user with email exists
//   User.findOne({ email }).exec((err, user) => {
//     if (err || !user) {
//       return res.status(400).json({ error: 'User with that email does not exist' });
//     }

//     // Generate random OTP
//     const OTP = Math.floor(1000 + Math.random() * 9000);

//     // Hash the OTP and save it to user document
//     bcrypt.hash(OTP.toString(), 10, (err, hash) => {
//       if (err) {
//         return res.status(500).json({ error: 'Server error. Please try again later.' });
//       }
//       user.resetPasswordOTP = hash;
//       user.save((err) => {
//         if (err) {
//           return res.status(500).json({ error: 'Server error. Please try again later.' });
//         }
//         // Set up email message
//         const mailOptions = {
//           from: 'globalsuccess080@gmail.com',
//           to: email,
//           subject: 'Forgot Password Verification',
//           text: `Your OTP for resetting password is ${OTP}`
//         };

//         // Send email message
//         transporter.sendMail(mailOptions, (error, info) => {
//           if (error) {
//             console.log(error);
//             return res.status(500).json({ error: 'Server error. Please try again later.' });
//           } else {
//             console.log('OTP sent successfully:', info.response);
//             return res.json({ message: 'OTP sent successfully. Please check your email.' });
//           }
//         });
//       });
//     });
//   });
// };

// // Handle OTP verification for password reset
// exports.verifyOTP = (req, res) => {
//   const { email, otp } = req.body;

//   // Find user with email
//   User.findOne({ email }).exec((err, user) => {
//     if (err || !user) {
//       return res.status(400).json({ error: 'User with that email does not exist' });
//     }

//     // Compare OTP hash with input OTP
//     bcrypt.compare(otp.toString(), user.resetPasswordOTP, (err, result) => {
//       if (err || !result) {
//         return res.status(400).json({ error: 'OTP verification failed. Please try again.' });
//       }

//       // OTP verification successful
//       // Generate new password and save it to user document
//       const newPassword = Math.random().toString(36).slice(-8); // Generate 8-character random password
//       bcrypt.hash(newPassword, 10, (err, hash) => {
//         if (err) {
//           return res.status(500).json({ error: 'Server error. Please try again later.' });
//         }
//         user.password = hash;
//         user.resetPasswordOTP = undefined;
//         user.save((err) => {
//           if (err) {
//             return res.status(500).json({ error: 'Server error. Please try again later.' });
//           }
//           // Set up email message with new password
//           const      mailOptions = {
//             from: 'globalsuccess080@gmail.com',
//             to: email,
//             subject: 'New Password',
//             text: `Your new password is ${newPassword}. Please change it after login.`
//           };
    
//           // Send email message
//           transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//               console.log(error);
//               return res.status(500).json({ error: 'Server error. Please try again later.' });
//             } else {
//               console.log('New password sent successfully:', info.response);
//               return res.json({ message: 'New password sent successfully to your email.' });
//             }
//           });
//         });
//       });
//     });
//   });
// };

    