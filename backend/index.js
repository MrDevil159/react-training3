const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 5000; 

app.use(cors());
mongoose.connect('mongodb+srv://myAtlasDBUser:myatlas-001@myatlasclusteredu.p3jpgqa.mongodb.net/Post?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

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
  id: Number,
  title: String,
  datetime: String,
  body: String,
  username: String
});

const Post = mongoose.model('posts', postSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/api/posts', async (req, res) => {
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

// app.get('/api/posts', (req, res) => {
//   Post.find({})
//     .then((posts) => {
//       res.json(posts);
//     })
//     .catch((error) => {
//       console.error('Error fetching posts:', error);
//       res.status(500).json({ error: 'An error occurred while fetching posts' });
//     });
// });

// app.get('/api/posts/:id', (req, res) => {
//   const postId = req.params.id;

//   Post.findOne({ id: postId })
//     .then((post) => {
//       if (!post) {
//         res.status(404).json({ error: 'Post not found' });
//       } else {
//         res.json(post);
//       }
//     })
//     .catch((error) => {
//       console.error('Error fetching post:', error);
//       res.status(500).json({ error: 'An error occurred while fetching the post' });
//     });
// });


// app.put('/api/posts/:id', (req, res) => {
//   const postId = req.params.id;
//   const { title, body } = req.body;

//   Post.updateOne({ id: postId }, { $set: { title, body } })
//     .then((result) => {
//       if (result.n === 0) {
//         res.status(404).json({ error: 'Post not found' });
//       } else {
//         res.json({ message: 'Post updated successfully' });
//       }
//     })
//     .catch((error) => {
//       console.error('Error updating post:', error);
//       res.status(500).json({ error: 'An error occurred while updating the post' });
//     });
// });

app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find({});
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'An error occurred while fetching posts' });
  }
});

app.get('/api/posts/:id', async (req, res) => {
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

app.put('/api/posts/:id', async (req, res) => {
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


app.delete('/api/posts/:id', async (req, res) => {
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


//Required for Encryption
const saltRounds = 10;
app.post('/api/login', async (req, res) => {
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
    console.log(user);
    return res.status(200).json(user);
  } catch (error) {
    console.error('Error finding user:', error);
    return res.status(500).json({ error: 'Failed to find user' });
  }
});

app.post('/api/register', async (req, res) => {
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
});



app.post('/api/verify-token', async (req, res) => {

  try {
    console.log(req.body)
    const _id = req.body._id;
    const username = req.body.username;
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
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
