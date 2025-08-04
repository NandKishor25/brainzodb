const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5051;

// MongoDB URI
// Load environment variables from .env file
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
if (!MONGODB_URI) {
  console.error('MongoDB URI not found in environment variables.');
  process.exit(1);
}

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend is running' });
});

// Routes placeholder
app.get('/', (req, res) => {
  res.send('API is running');
});

// Import and use routes (to be created)
const chaptersRouter = require('./routes/chapters');
const questionsRouter = require('./routes/questions');

app.use('/chapters', chaptersRouter);
app.use('/questions', questionsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 