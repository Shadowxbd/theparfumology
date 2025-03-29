import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="relative isolate min-h-screen flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-gray-50">
      <div className="mx-auto max-w-4xl text-center">
        <div className="flex justify-center mb-8">
          <Sparkles className="h-16 w-16 text-purple-600" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Find Your Perfect Scent with AI
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Discover your signature fragrance through our advanced AI recommendation system.
          Tell us your preferences, and we'll match you with the perfect perfume.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/recommender"
            className="rounded-md bg-purple-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
          >
            Get Started
          </Link>
          <Link
            to="/ebook-shop"
            className="text-lg font-semibold leading-6 text-gray-900 hover:text-purple-600"
          >
            Learn More <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
