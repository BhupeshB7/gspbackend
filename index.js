const express = require('express');
const mongoose = require('mongoose');
const userLoginRoutes = require('./routes/userLoginRoutes');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/Admin/admin');
const profileRoutes = require('./routes/profile');
const app = express();

// Connect to MongoDB database
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error(error));
  
  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  // app.use('./uploads', express.static('uploads'));
// error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

   // Admin Routes
   app.use('/api/admin', adminRoutes);
  // routes
  app.use('/api/auth', authRoutes);
  // Register Routes
  app.use('/api/users', require('./routes/userRoutes'));
  // Login Routes
  app.use('/api/users', userLoginRoutes);
  // profile Routes
  app.use('/api/users', profileRoutes);
  //Activation Routes
  app.use('/api/active',require('./routes/UserActivation'));
  //Deposit Routes
  app.use('/api/deposit', require('./routes/deposit'));
  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Server error');
  });
  
  // Start server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  