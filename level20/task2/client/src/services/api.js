import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/books';

export async function searchBooks(query) {
  const response = await axios.get(`${API_BASE}/search?q=${query}`);
  return response.data;
}

export async function addBookToCollection(book) {
  const response = await axios.post(API_BASE, {
    title: book.volumeInfo.title,
    authors: book.volumeInfo.authors,
    description: book.volumeInfo.description,
    thumbnail: book.volumeInfo.imageLinks?.thumbnail,
  });
  return response.data;
}

export async function getMyBooks() {
  const response = await axios.get(API_BASE);
  return response.data;
}
