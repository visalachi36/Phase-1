import express from 'express';
import Post from '../models/Post.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get all posts
router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.find()
      .populate('userId', 'name avatar')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    next(error);
  }
});

// Get user posts
router.get('/user/:userId', async (req, res, next) => {
  try {
    const posts = await Post.find({ userId: req.params.userId })
      .populate('userId', 'name avatar')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    next(error);
  }
});

// Create post
router.post('/', auth, async (req, res, next) => {
  try {
    const { title, content, tags } = req.body;
    
    const post = new Post({
      userId: req.user.userId,
      title,
      content,
      tags
    });
    
    await post.save();
    await post.populate('userId', 'name avatar');
    
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
});

// Update post
router.put('/:postId', auth, async (req, res, next) => {
  try {
    const { title, content, tags } = req.body;
    
    const post = await Post.findOne({
      _id: req.params.postId,
      userId: req.user.userId
    });
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    if (title) post.title = title;
    if (content) post.content = content;
    if (tags) post.tags = tags;
    
    await post.save();
    await post.populate('userId', 'name avatar');
    
    res.json(post);
  } catch (error) {
    next(error);
  }
});

// Delete post
router.delete('/:postId', auth, async (req, res, next) => {
  try {
    const post = await Post.findOneAndDelete({
      _id: req.params.postId,
      userId: req.user.userId
    });
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    res.json({ message: 'Post deleted' });
  } catch (error) {
    next(error);
  }
});

// Like/Unlike post
router.post('/:postId/like', auth, async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    const likeIndex = post.likes.indexOf(req.user.userId);
    
    if (likeIndex === -1) {
      post.likes.push(req.user.userId);
    } else {
      post.likes.splice(likeIndex, 1);
    }
    
    await post.save();
    res.json(post);
  } catch (error) {
    next(error);
  }
});

// Add comment
router.post('/:postId/comments', auth, async (req, res, next) => {
  try {
    const { content } = req.body;
    
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    post.comments.push({
      userId: req.user.userId,
      content
    });
    
    await post.save();
    await post.populate('comments.userId', 'name avatar');
    
    res.status(201).json(post.comments[post.comments.length - 1]);
  } catch (error) {
    next(error);
  }
});

// Delete comment
router.delete('/:postId/comments/:commentId', auth, async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    const comment = post.comments.id(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    
    if (comment.userId.toString() !== req.user.userId && post.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    comment.remove();
    await post.save();
    
    res.json({ message: 'Comment deleted' });
  } catch (error) {
    next(error);
  }
});

export default router;