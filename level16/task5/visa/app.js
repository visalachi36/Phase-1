const express = require('express');
const app = express();

// /search route with query parameters
app.get('/search', (req, res) => {
  const query = req.query.q || 'Nothing';
  const limit = req.query.limit || 5;

  res.send(`Search for: ${query}, Limit: ${limit}`);
});

// Start the server
app.listen(3000, () => {
  console.log('🚀 Server running at http://localhost:3000/search');
});
