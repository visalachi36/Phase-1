require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./utils/db');
const journalRoutes = require('./routes/journalRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/entries', journalRoutes);

async function startServer() {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
  }
}

startServer();
