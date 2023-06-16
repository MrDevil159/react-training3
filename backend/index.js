const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000; 

app.use(cors({
  origin: 'http://localhost:3000'
}));
mongoose.connect('mongodb://127.0.0.1:27017/Post', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const postSchema = new mongoose.Schema({
  id: Number,
  title: String,
  datetime: String,
  body: String,
});

const Post = mongoose.model('posts', postSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Create a new post
app.post('/api/posts', async (req, res) => {
  const { id, title, body } = req.body;
  const datetime = new Date().toISOString();

  try {
    const newPost = new Post({ id, title, datetime, body });
    const savedPost = await newPost.save();
    res.json(savedPost);
  } catch (error) {
    console.error('Error saving post:', error);
    res.status(500).json({ error: 'An error occurred while saving the post' });
  }
});


// Get all posts
app.get('/api/posts', (req, res) => {
  Post.find({})
    .then((posts) => {
      res.json(posts);
    })
    .catch((error) => {
      console.error('Error fetching posts:', error);
      res.status(500).json({ error: 'An error occurred while fetching posts' });
    });
});

// Get a single post by ID
app.get('/api/posts/:id', (req, res) => {
  const postId = req.params.id;

  Post.findById(postId)
    .then((post) => {
      if (!post) {
        res.status(404).json({ error: 'Post not found' });
      } else {
        res.json(post);
      }
    })
    .catch((error) => {
      console.error('Error fetching post:', error);
      res.status(500).json({ error: 'An error occurred while fetching the post' });
    });
});


// Update a post
app.put('/api/posts/:id', (req, res) => {
  const postId = req.params.id;
  const { title, body } = req.body;

  Post.updateOne({ id: postId }, { $set: { title, body } })
    .then((result) => {
      if (result.n === 0) {
        res.status(404).json({ error: 'Post not found' });
      } else {
        res.json({ message: 'Post updated successfully' });
      }
    })
    .catch((error) => {
      console.error('Error updating post:', error);
      res.status(500).json({ error: 'An error occurred while updating the post' });
    });
});



// Delete a post
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



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
