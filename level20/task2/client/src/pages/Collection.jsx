import React, { useEffect, useState } from "react";
import axios from "axios";

const Collection = () => {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);

  const fetchBooks = async (query = "") => {
    try {
      const res = await axios.get(`http://localhost:5000/api/books?q=${query}`);
      setBooks(res.data);
    } catch (err) {
      console.error("Error fetching books", err);
    }
  };

  useEffect(() => {
    fetchBooks(); // fetch all initially
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBooks(search);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search books..."
        />
        <button type="submit">Search</button>
      </form>

      <div className="book-grid">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            {book.coverImage && <img src={book.coverImage} alt={book.title} />}
            <h3>{book.title}</h3>
            <p>{book.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collection;
