// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   userId: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   mobileNumber:{
//     type: String,
// required: true,
// unique: true,

//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     },
//     passwordResetOTP: String,
//     passwordResetOTPExpiration: Date,
//     });
    
//     module.exports = mongoose.model('User', userSchema);


const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// userSchema.pre('save', async function (next) {
//   try {
//     const salt = await bcrypt.genSalt(10);
//     const hash = await bcrypt.hash(this.password, salt);
//     this.password = hash;
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

userSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

const LoginUser = mongoose.model('LoginUser', userSchema);

module.exports = LoginUser;
