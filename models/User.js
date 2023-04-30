const mongoose = require('mongoose');
const validator = require('validator');
// const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Invalid email'
    }
  },
  password: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^(\+\d{1,3}[- ]?)?\d{10}$/.test(v);
      },
      message: 'Invalid mobile number'
    }
  },
  sponsorId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  bio: {
    type: String,
  },
  image: {
    type: String,
  },
  tokens: [{
    token: {
      type: String,
      required: true,
    },
  }],
  verifytoken:{
    type: String,
},
role: {
  type: String,
  enum: ['user', 'admin'],
  default: 'user',
},
is_active: { type: Boolean, default: false }, 
 }, {timestamps: true},
);
// userSchema.methods.isValidPassword = async function (password) {
//   try {
//     return await bcrypt.compare(password, this.password);
//   } catch (error) {
//     throw new Error(error);
//   }
// };
module.exports = mongoose.model('User', userSchema);
