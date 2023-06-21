const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const util = require('util');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Database Connection
mongoose
  .connect('mongodb://127.0.0.1:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// User Model
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

const postSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  datetime: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  }
});

const Post = mongoose.model('posts', postSchema);

// Passport Configuration
passport.use(
  new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false, { message: 'Invalid email or password' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: 'Invalid email or password' });
      }

      const token = jwt.sign({ userId: user._id }, 'ninnachikachika'); // Generate a token
      const userData = {
        _id: user._id,
        username: user.username,
        email: user.email,
        token: token // Include the token in the response
      };
      console.log(token);
      return done(null, userData);
    } catch (error) {
      console.error('Error finding user:', error);
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

// Routes
app.post('/api/posts', isAuthenticated, async (req, res) => {
  const { id, title, body, username } = req.body;
  const datetime = new Date().toISOString();

  try {
    const newPost = new Post({ id, title, datetime, body, username });
    const savedPost = await newPost.save();
    res.json(savedPost);
  } catch (error) {
    console.error('Error saving post:', error);
    res.status(500).json({ error: 'An error occurred while saving the post' });
  }
});

app.get('/api/posts', isAuthenticated, async (req, res) => {
  try {
    const posts = await Post.find({});
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'An error occurred while fetching posts' });
  }
});

app.get('/api/posts/:id', isAuthenticated, async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Post.findOne({ id: postId });
    if (!post) {
      res.status(404).json({ error: 'Post not found' });
    } else {
      res.json(post);
    }
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ error: 'An error occurred while fetching the post' });
  }
});

app.put('/api/posts/:id', isAuthenticated, async (req, res) => {
  const postId = req.params.id;
  const { title, body } = req.body;

  try {
    const result = await Post.updateOne({ id: postId }, { $set: { title, body } });
    if (result.n === 0) {
      res.status(404).json({ error: 'Post not found' });
    } else {
      res.json({ message: 'Post updated successfully' });
    }
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ error: 'An error occurred while updating the post' });
  }
});


app.delete('/api/posts/:id', isAuthenticated, async (req, res) => {
  const postId = req.params.id;

  try {
    const deletedPost = await Post.findOneAndRemove({ id: postId });
    if (!deletedPost) {
      res.status(404).json({ error: 'Post not found' });
    } else {
      res.json({ message: 'Post deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'An error occurred while deleting the post' });
  }
});

app.post('/api/login', passport.authenticate('local'), (req, res) => {
  res.status(200).json(req.user);
});

app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already taken' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    return res.status(200).json({ message: 'Registration successful' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});


// Logout Route
app.get('/api/logout', async (req, res) => {
  try {
    const logoutAsync = util.promisify(req.logout.bind(req));
    await logoutAsync();
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
        res.status(500).json({ error: 'An error occurred during logout' });
      } else {
        res.status(200).json({ message: 'Logout successful' });
      }
    });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ error: 'An error occurred during logout' });
  }
});

// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
  const token = req.body.token; // Get the token from the request headers
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, 'ninnachikachika', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Failed to authenticate token' });
    }

    // Token is valid
    req.userId = decoded.userId; // Add the decoded user ID to the request object
    next(); // Call the next middleware
  });
};

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
