import { useEffect, useState } from 'react';
import { getMyBooks } from '../services/api';
import BookList from '../components/BookList';

function MyBooks() {
  const [myBooks, setMyBooks] = useState([]);

  useEffect(() => {
    async function fetchBooks() {
      const books = await getMyBooks();
      setMyBooks(books);
    }
    fetchBooks();
  }, []);

  return (
    <div className="page">
      <h2>📚 My Book Collection</h2>
      <BookList books={myBooks} onAdd={() => {}} />
    </div>
  );
}

export default MyBooks;
