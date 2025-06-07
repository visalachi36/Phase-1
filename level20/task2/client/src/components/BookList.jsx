import BookCard from './BookCard';

function BookList({ books, onAdd }) {
  return (
    <div className="book-list">
      {books.map((book) => (
        <BookCard key={book.id} book={book} onAdd={onAdd} />
      ))}
    </div>
  );
}

export default BookList;
