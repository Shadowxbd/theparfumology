import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import EbookShop from './pages/EbookShop';
import Recommender from './pages/Recommender';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/ebook-shop" element={<EbookShop />} />
          <Route path="/recommender" element={<Recommender />} />
          <Route path="*" element={<div className="text-center text-gray-500 text-lg">404 - Page not found</div>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
