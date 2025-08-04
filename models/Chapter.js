const mongoose = require('mongoose');

const ChapterSchema = new mongoose.Schema({
  chapterId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  metadata: { type: Object, default: {} },
}, { timestamps: true });

module.exports = mongoose.model('Chapter', ChapterSchema); 