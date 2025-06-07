import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./BookDetail.css";

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/books/${id}`)
      .then(res => res.json())
      .then(data => setBook(data));
  }, [id]);

  if (!book) return <p>Loading...</p>;

  return (
    <div className="detail-container">
      <Link to="/" className="back-btn">← Back to Collection</Link>
      <div className="book-detail-card">
        <img src={book.coverImage} alt={book.title} className="detail-image" />
        <div className="detail-info">
          <h1>{book.title}</h1>
          <h3>by {book.author}</h3>
          <p>{book.description}</p>
          <p><strong>Rating:</strong> {book.rating}</p>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
