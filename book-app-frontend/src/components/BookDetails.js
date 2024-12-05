import React, { useEffect, useState, useContext } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/authContext';

const BookDetail = () => {
    const { id } = useParams(); // Get the book ID from the URL
    const { token } = useContext(AuthContext); // Get the token from context
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/book/getBooks/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include token in the request
                    },
                });
                setBook(response.data);
            } catch (err) {
                setError('Error fetching book details');
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchBook();
        } else {
            setLoading(false); // Stop loading if not authenticated
        }
    }, [id, token]);

    // Redirect to login if not authenticated
    if (!token) {
        return <Navigate to="/login" />;
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>{book.title}</h1>
            <h2>Author: {book.author}</h2>
           
        </div>
    );
};

export default BookDetail;