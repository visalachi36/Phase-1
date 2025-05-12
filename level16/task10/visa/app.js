const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

const isDev = process.env.NODE_ENV !== 'production';

app.set('view engine', 'html');
app.engine('html', (filePath, options, callback) => {
  fs.readFile(filePath, 'utf-8', (err, content) => {
    if (err) return callback(err);
    const rendered = content.replace('{{errorMessage}}', options.errorMessage || 'Error');
    return callback(null, rendered);
  });
});
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Working Route
app.get('/', (req, res) => {
  res.send('Welcome to the Express Error Handling App!');
});

// 🚫 Route that manually throws an error
app.get('/error', (req, res, next) => {
  const error = new Error('This is a manually thrown error.');
  error.status = 500;
  next(error);
});

// 🚫 Route accessing a non-existent resource
app.get('/notfound', (req, res, next) => {
  const error = new Error('Requested resource was not found.');
  error.status = 404;
  next(error);
});

// 🚫 API route error
app.get('/api/error', (req, res, next) => {
  const error = new Error('API error occurred!');
  error.status = 500;
  next(error);
});

// ❌ Catch-all 404 middleware
app.use((req, res, next) => {
  const error = new Error('Route Not Found');
  error.status = 404;
  next(error);
});

// 🌐 Global Error Handler
app.use((err, req, res, next) => {
  const status = err.status || 500;

  if (req.originalUrl.startsWith('/api')) {
    // JSON error response for API
    res.status(status).json({
      status: status,
      message: err.message,
      ...(isDev && { stack: err.stack })
    });
  } else {
    // HTML error page for normal routes
    res.status(status).render('error.html', {
      errorMessage: isDev ? err.message : 'Something went wrong. Please try again later.'
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}/api/error`);
});
