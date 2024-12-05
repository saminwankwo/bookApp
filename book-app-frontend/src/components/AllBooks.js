import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Index = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await axios.get('http://localhost:5000/`book/getBooks');
            setBooks(response.data);
        };
        fetchBooks();
    }, []);

    return (
        <div>
            <h1>Book List</h1>
            <h2>Available Books:</h2>
            <ul>
                {books.length > 0 ? (
                    books.map((book) => (
                        <li key={book._id}>
                            {book.title} by {book.author}
                        </li>
                    ))
                ) : (
                    <li>No books found.</li>
                )}
            </ul>
            <div>
                <h2>Manage Your Books</h2>
                <Link to="/login">
                    <button>Login</button>
                </Link>
                <Link to="/signup">
                    <button>Register</button>
                </Link>
            </div>
        </div>
    );
};

export default Index;