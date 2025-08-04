const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// Get all questions
router.get('/', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get question by ID
router.get('/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ error: 'Question not found' });
    res.json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create question
router.post('/', async (req, res) => {
  try {
    const question = new Question(req.body);
    await question.save();
    res.status(201).json(question);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update question
router.put('/:id', async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!question) return res.status(404).json({ error: 'Question not found' });
    res.json(question);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete question
router.delete('/:id', async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question) return res.status(404).json({ error: 'Question not found' });
    res.json({ message: 'Question deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 