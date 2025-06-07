const express = require("express");
const app = express();
const booksRouter = require("./booksRouter"); // Correct path to the router

// Middleware to parse incoming JSON requests
app.use(express.json());

// Mount the booksRouter
app.use("/api", booksRouter);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});

