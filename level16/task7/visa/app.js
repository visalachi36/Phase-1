const express = require('express');
const app = express();
const path = require('path');

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
  console.log('🚀 Static file server running at http://localhost:3000');
});
