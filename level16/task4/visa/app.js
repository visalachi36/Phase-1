// Import express
const express = require('express');
const app = express();

// Route with parameter
app.get('/users/:id', (req, res) => {
  const userId = req.params.id; // Extracting 'id' from the route
  res.send(`User ID: ${userId}`);
});

// Start the server
app.listen(3000, () => {
  console.log('🚀 Server running at http://localhost:3000/users/42');
});
