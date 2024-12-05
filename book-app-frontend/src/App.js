import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import Login from './components/Login';
import Signup from './components/Register';
import Book from './components/Book';
import Books from './components/AllBooks';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Books />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/books" element={<Book />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;