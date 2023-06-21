const Post = require('../models/post');

const createPost = async (req, res) => {
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
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'An error occurred while fetching posts' });
  }
};

const getPostById = async (req, res) => {
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
};

const updatePost = async (req, res) => {
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
};

const deletePost = async (req, res) => {
  const postId = req.params.id;

  try {
    const result = await Post.deleteOne({ id: postId });
    if (result.deletedCount === 0) {
      res.status(404).json({ error: 'Post not found' });
    } else {
      res.json({ message: 'Post deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'An error occurred while deleting the post' });
  }
};

module.exports = { createPost, getPosts, getPostById, updatePost, deletePost };
