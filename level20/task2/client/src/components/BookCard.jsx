import { Link } from "react-router-dom";
import "./BookCard.css"; // CSS file for styling

const BookCard = ({ book }) => {
  return (
    <div className="book-card">
      <Link to={`/book/${book.id}`} className="book-link">
        <img src={book.coverImage} alt={book.title} className="book-cover" />
        <div className="book-details">
          <h3>{book.title}</h3>
          <p><strong>Author:</strong> {book.author}</p>
          <p className="desc">{book.description.slice(0, 100)}...</p>
        </div>
      </Link>
    </div>
  );
};

export default BookCard;
