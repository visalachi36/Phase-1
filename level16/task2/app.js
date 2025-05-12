// app.js
const express = require('express');
const app = express();

// Root route
app.get('/', (req, res) => {
  res.send('About Our Page');
});

// About route
app.get('/about', (req, res) => {
  res.send('About Us page');
});

// Contact route
app.get('/contact', (req, res) => {
  res.send('Contact Us page');
});

// Services route
app.get('/services', (req, res) => {
  res.send('Our Services page');
});

// Start the server
app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
