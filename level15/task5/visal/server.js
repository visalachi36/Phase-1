import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db.js';
import contactRoutes from './routes/contacts.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Routes
app.use('/api/contacts', contactRoutes);

connectDB();

app.get('/', (req, res) => {
  res.send('📇 Contact Book API is running!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
