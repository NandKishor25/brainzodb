const express = require('express');
const router = express.Router();
const Chapter = require('../models/Chapter');

// Get all chapters
router.get('/', async (req, res) => {
  try {
    const chapters = await Chapter.find();
    res.json(chapters);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get chapter by chapterId
router.get('/:chapterId', async (req, res) => {
  try {
    const chapter = await Chapter.findOne({ chapterId: req.params.chapterId });
    if (!chapter) {
      return res.status(404).json({ error: 'Chapter not found' });
    }
    res.json(chapter);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a chapter
router.post('/', async (req, res) => {
  try {
    const chapter = new Chapter(req.body);
    await chapter.save();
    res.status(201).json(chapter);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a chapter by chapterId
router.put('/:chapterId', async (req, res) => {
  try {
    const chapter = await Chapter.findOneAndUpdate(
      { chapterId: req.params.chapterId },
      req.body,
      { new: true }
    );
    if (!chapter) return res.status(404).json({ error: 'Chapter not found' });
    res.json(chapter);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a chapter by chapterId
router.delete('/:chapterId', async (req, res) => {
  try {
    const chapter = await Chapter.findOneAndDelete({ chapterId: req.params.chapterId });
    if (!chapter) return res.status(404).json({ error: 'Chapter not found' });
    res.json({ message: 'Chapter deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 