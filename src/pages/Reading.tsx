import React, { useEffect, useState } from "react";
import "./Reading.css";
import { Book } from "../types";
import { getReading } from "../queries/getReading";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Reading: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    async function fetchBooks() {
      const data = await getReading();
      setBooks(data);
    }

    fetchBooks();
  }, []);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="star filled" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="star half" />);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="star empty" />);
    }

    return stars;
  };

  if (books.length === 0)
    return <div className="loading">Loading literary treasures...</div>;

  return (
    <div className="reading-container">
      <div className="reading-header">
        <h1 className="reading-title">📚 Literary Journey</h1>
        <p className="reading-intro">
          Books that have shaped my perspectives, ignited curiosity, and fueled
          personal growth
        </p>
      </div>

      <div className="books-grid">
        {books.map((book, index) => (
          <div
            key={book.id}
            className="book-card"
            style={{ "--delay": `${index * 0.1}s` } as React.CSSProperties}
          >
            <div className="book-content">
              <img src={book.image} alt={book.title} className="book-cover" />
              <div className="book-info">
                <h3 className="book-title">{book.title}</h3>
                <h4 className="book-author">{book.author}</h4>
                <div className="book-rating">
                  {renderStars(book.rating)}
                  <span className="rating-number">({book.rating}/5)</span>
                </div>
                <p className="book-description">{book.description}</p>
                <div className="book-meta">
                  <span className="book-category">{book.category}</span>
                </div>
              </div>
            </div>
            {book.keyTakeaways.length > 0 && (
              <div className="key-takeaways">
                <h5>Key Takeaways:</h5>
                <ul>
                  {book.keyTakeaways.map((takeaway, takeawayIndex) => (
                    <li key={takeawayIndex}>{takeaway}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reading;
