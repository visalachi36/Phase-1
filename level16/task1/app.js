// app.js
const express = require('express');
const app = express();

// Root route
app.get('/', (req, res) => {
  res.send("Hello from Express! I'm visalachi" );
});

// Server listen on port 3000
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
