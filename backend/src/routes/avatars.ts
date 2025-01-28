import express from 'express';
import Avatar from '../models/avatar';
import { isAuthenticated, isAdmin } from '../middleware/auth';

const router = express.Router();

// Get all avatars
router.get('/', async (req, res) => {
  try {
    const avatars = await Avatar.find({});
    res.json(avatars);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching avatars', error });
  }
});

// Get a single avatar by ID
router.get('/:id', async (req, res) => {
  try {
    const avatar = await Avatar.findById(req.params.id);
    if (!avatar) {
      return res.status(404).json({ message: 'Avatar not found' });
    }
    res.json(avatar);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching avatar', error });
  }
});

// Create a new avatar (admin only)
router.post('/', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const avatar = new Avatar(req.body);
    await avatar.save();
    res.status(201).json(avatar);
  } catch (error) {
    res.status(400).json({ message: 'Error creating avatar', error });
  }
});

// Update an avatar (admin only)
router.put('/:id', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const avatar = await Avatar.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!avatar) {
      return res.status(404).json({ message: 'Avatar not found' });
    }
    res.json(avatar);
  } catch (error) {
    res.status(400).json({ message: 'Error updating avatar', error });
  }
});

// Delete an avatar (admin only)
router.delete('/:id', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const avatar = await Avatar.findByIdAndDelete(req.params.id);
    if (!avatar) {
      return res.status(404).json({ message: 'Avatar not found' });
    }
    res.json({ message: 'Avatar deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting avatar', error });
  }
});

export default router;
