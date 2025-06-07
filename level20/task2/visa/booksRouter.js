const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/books", async (req, res) => {  // This is the correct route for `/api/books`
  try {
    const searchQuery = req.query.q || "book";
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`
    );

    const books = response.data.items.map((item) => ({
      id: item.id,
      title: item.volumeInfo.title,
      author: item.volumeInfo.authors ? item.volumeInfo.authors.join(", ") : "Unknown Author",
      coverImage: item.volumeInfo.imageLinks?.thumbnail || "",
      description: item.volumeInfo.description || "No description available",
    }));

    res.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

module.exports = router;
