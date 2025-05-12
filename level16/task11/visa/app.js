const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Create uploads directory if not exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer configuration: destination & filename
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext);
    cb(null, `${base}-${Date.now()}${ext}`);
  }
});

// File filter: only accept image files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage,
  fileFilter
});

// Middleware
app.use(express.static(path.join(__dirname, 'public')));

// Route to show form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'upload.html'));
});

// POST route to handle upload
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('<h2>No file uploaded!</h2><a href="/">Try Again</a>');
  }

  res.send(`
    <h2>File uploaded successfully!</h2>
    <p><strong>Filename:</strong> ${req.file.filename}</p>
    <p><strong>Type:</strong> ${req.file.mimetype}</p>
    <p><strong>Size:</strong> ${req.file.size} bytes</p>
    <img src="/${req.file.path}" width="300" />
    <br><br><a href="/">Upload Another</a>
  `);
});

// Error handler for multer
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError || err.message) {
    return res.status(400).send(`<h2>Error: ${err.message}</h2><a href="/">Try Again</a>`);
  }
  next(err);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
