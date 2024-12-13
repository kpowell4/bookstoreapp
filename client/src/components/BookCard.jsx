import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { CartContext } from './MyBooks'; // Import CartContext
import '../css/BookCard.css'; // Import CSS

const BookCard = ({ book, showBorrowButton = true }) => {
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    const handleAddToCart = (event) => {
        event.stopPropagation(); // Prevent navigation to book details when clicking the button
        addToCart(book);
        navigate('/mybooks'); // Navigate to "My Books" page
    };

    const handleCardClick = () => {
        navigate(`/book/bookdetails/${book._id}`); // Navigate to book details page
    };

    return (
        <div className="book-card" onClick={handleCardClick}>
            <img 
                src={book.imageUrl || 'placeholder.jpg'} 
                alt={book.title} 
                className="book-image" 
            />
            <div className="book-details">
                <h3>{book.title}</h3>
                <p>Author: {book.author}</p>
                <p>Category: {book.category}</p>
                <p>Grade Level: {book.level}</p>
            </div>
            {showBorrowButton && (
                <div className="book-actions">
                    <button onClick={handleAddToCart}>Borrow</button>
                </div>
            )}
        </div>
    );
};

export default BookCard;