import express from 'express';
import User from '../models/User.js';
import { auth } from '../middleware/auth.js';
import multer from 'multer';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
});

const upload = multer({ storage });

// Get user profile
router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// Update user profile
router.put('/', auth, async (req, res, next) => {
  try {
    const { name, bio, skills } = req.body;
    
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (name) user.name = name;
    if (bio) user.bio = bio;
    if (skills) user.skills = skills;
    
    await user.save();
    
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// Upload avatar
router.post('/avatar', auth, upload.single('avatar'), async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    user.avatar = req.file.path;
    await user.save();
    
    res.json({ avatar: user.avatar });
  } catch (error) {
    next(error);
  }
});

export default router;