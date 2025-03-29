import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, User, BookOpen } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-purple-600" />
              <span className="text-xl font-semibold text-gray-900">Parfumology AI</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link
              to="/recommender"
              className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Get Recommendations
            </Link>
            <Link
              to="/ebook-shop"
              className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              <BookOpen className="h-5 w-5" />
            </Link>
            <Link
              to="/profile"
              className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              <User className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
