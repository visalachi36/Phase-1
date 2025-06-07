const axios = require('axios');

exports.searchBooks = async (query) => {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`;
  const res = await axios.get(url);
  return res.data.items.map(book => ({
    id: book.id,
    title: book.volumeInfo.title,
    authors: book.volumeInfo.authors,
    image: book.volumeInfo.imageLinks?.thumbnail || '',
  }));
};
