const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const authRoutes = require('./authRoutes');
const postRoutes = require('./postRoutes');
require('../config/passport');

// Middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', passport.authenticate('jwt', { session: false }), postRoutes);

// Connect to MongoDB
mongoose
  .connect('mongodb://127.0.0.1:27017/test', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((error) => console.error('Failed to connect to MongoDB:', error));
