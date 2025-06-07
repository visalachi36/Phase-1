// controllers/bookController.js
import Book from '../models/User.js';

// ✅ SEARCH
export const search = async (req, res) => {
  const { q } = req.query;
  try {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${q}`);
    const data = await response.json();
    res.json(data.items || []);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching data from Google Books API' });
  }
};

// ✅ ADD BOOK
export const addBook = async (req, res) => {
  try {
    const newBook = new Book(req.body);
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add book' });
  }
};

// ✅ GET ALL BOOKS
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve books' });
  }
};

// ✅ UPDATE BOOK
export const updateBook = async (req, res) => {
  try {
    const updated = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Could not update book' });
  }
};

// ✅ DELETE BOOK
export const deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Could not delete book' });
  }
};
