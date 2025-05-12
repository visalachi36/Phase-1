// Import express
const express = require('express');
const app = express();

// Route: GET /api/users
app.get('/api/users', (req, res) => {
  const users = [
    { id: 1, name: 'Visalachi', email: 'visalachi@example.com' },
    { id: 2, name: 'Aarav', email: 'aarav@example.com' },
    { id: 3, name: 'Meera', email: 'meera@example.com' }
  ];
  res.json(users); // Send JSON response
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log('✅ Server is running at http://localhost:3000/api/users');
});
