import React, { useState } from 'react';
import './SearchPage.css';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);

  const handleSearch = () => {
    // Example dummy data – replace with your API call
    const allBooks = [
      {
        title: "A Complete Manual for Campus Placements",
        authors: "Gkp",
        description: "Clearing the aptitude Test is the first step towards getting placed on a campus recruitment drive."
      },
      {
        title: "Placements Playbook",
        authors: "Siddesh Choudhary, Chirag Singhal, Praveen Saran, Rajat Kadam, Vedarth Choksi",
        description: "Getting a top campus placement is considered a hallowed accomplishment in college life."
      },
      {
        title: "Modern Circuit Placement",
        authors: "Gi-Joon Nam, Jingsheng Jason Cong",
        description: "Describes advanced techniques in VLSI circuit placement."
      },
      {
        title: "College Placement Test Study Guide",
        authors: "College Placement Test Prep Team",
        description: "Test Prep Book & Practice Test Questions for College Placement Exams."
      },
      // More books added
      {
        title: "The Mythical Man-Month: Essays on Software Engineering",
        authors: "Frederick P. Brooks Jr.",
        description: "A collection of essays on software engineering, focusing on the challenges of managing large software projects."
      },
      {
        title: "Design Patterns: Elements of Reusable Object-Oriented Software",
        authors: "Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides",
        description: "A classic text on design patterns in object-oriented software development."
      },
      {
        title: "Refactoring: Improving the Design of Existing Code",
        authors: "Martin Fowler",
        description: "A guide to refactoring techniques for improving the structure and design of existing codebases."
      },
      {
        title: "The Clean Coder: A Code of Conduct for Professional Programmers",
        authors: "Robert C. Martin",
        description: "A practical guide to becoming a professional programmer with a focus on craftsmanship and ethical conduct."
      },
      {
        title: "You Don't Know JS (book series)",
        authors: "Kyle Simpson",
        description: "A deep dive into the JavaScript language, ideal for both beginner and advanced developers."
      },
      {
        title: "Code Complete: A Practical Handbook of Software Construction",
        authors: "Steve McConnell",
        description: "An essential resource for software developers, focusing on software construction best practices."
      },
      {
        title: "Introduction to the Theory of Computation",
        authors: "Michael Sipser",
        description: "A comprehensive textbook on the theory of computation, focusing on automata theory and formal languages."
      },
      {
        title: "The Art of Computer Programming",
        authors: "Donald E. Knuth",
        description: "A multi-volume series considered one of the most comprehensive references in the field of computer science."
      }
    ];

    const filteredBooks = allBooks.filter(book =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setBooks(filteredBooks);
  };

  return (
    <div className="search-results-container">
      <h2>Search Books</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {books.length === 0 ? (
        <p>No books found</p>
      ) : (
        books.map((book, index) => (
          <div className="book-card" key={index}>
            <div className="book-title">{book.title}</div>
            <div className="book-author">{book.authors}</div>
            <div className="book-description">{book.description}</div>
            <button className="add-button">Add</button>
          </div>
        ))
      )}
    </div>
  );
};

export default SearchPage;
