const bcrypt = require('bcrypt');
const User = require('../models/user');

const saltRounds = 10;

async function registerUser(req, res) {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already taken' });
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    return res.status(200).json({ message: 'Registration successful' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error('Error finding user:', error);
    return res.status(500).json({ error: 'Failed to find user' });
  }
}

async function verifyToken(req, res) {
  try {
    const { _id, username } = req.body;
    const user = await User.findById(_id);
    if (user && user.username === username) {
      res.status(200).json({ message: 'Token verified and matched' });
    } else {
      res.status(401).json({ message: 'Token verification failed' });
    }
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Token verification failed' });
  }
}

module.exports = { registerUser, loginUser, verifyToken };
