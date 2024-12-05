import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/authContext';

const Books = () => {
    const { token } = useContext(AuthContext);
    const [books, setBooks] = useState([]);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await axios.get('http://localhost:5000/books');
            setBooks(response.data);
        };
        fetchBooks();
    }, [token]);

    const addBook = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/books', { title, author });
        setTitle('');
        setAuthor('');
    };

    return (
        <div>
            <form onSubmit={addBook}>
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                <button type="submit"> Add Book</button>
            </form>
            <ul>
                {books.map((book) => (
                    <li key={book._id}>{book.title} by {book.author}</li>
                ))}
            </ul>
        </div>
    );
};

export default Books;