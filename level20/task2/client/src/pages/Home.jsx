import { useState } from "react";
import SearchBar from "../components/SearchBar";
import BookCard from "../components/BookCard";

const Home = () => {
  const [books, setBooks] = useState([]);

  const searchBooks = async (query) => {
    if (!query) return;
    const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
    const data = await res.json();
    const results = data.items.map(item => ({
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors || [],
      status: "Want to Read",
    }));
    setBooks(results);
  };

  return (
    <div>
      <h1>BookShelf</h1>
      <SearchBar onSearch={searchBooks} />
      <div>
        {books.map((book, i) => (
          <BookCard key={i} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Home;
