const express = require('express');
const app = express();

// ✅ Custom Middleware for Logging
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;

  console.log(`[${timestamp}] ${method} ${url}`);
  next(); // pass control to the next middleware/route
});

// ✅ Test Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Home Page');
});

app.get('/about', (req, res) => {
  res.send('About Us');
});

app.get('/contact', (req, res) => {
  res.send('Contact Us');
});

// ✅ Start Server
app.listen(3000, () => {
  console.log('🚀 Server running at http://localhost:3000/contact');
});
