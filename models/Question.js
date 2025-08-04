const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  chapterId: { type: String, required: true },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  metadata: { type: Object, default: {} },
}, { timestamps: true });

module.exports = mongoose.model('Question', QuestionSchema); 