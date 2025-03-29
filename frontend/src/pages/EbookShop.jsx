import React from 'react';

export default function EbookShop() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        📚 Perfume Knowledge Hub
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Ebook card example */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
          <div className="bg-gray-200 h-56 w-full flex items-center justify-center text-gray-500">
            {/* Image placeholder */}
            <span className="text-sm">Ebook Cover</span>
          </div>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Understanding Fragrance Families
            </h3>
            <p className="text-gray-600 mb-4 text-sm">
              A comprehensive guide to understanding different fragrance families and their characteristics.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-purple-600 font-bold">$9.99</span>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-500 text-sm">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Duplicate the above block for more ebooks if needed */}
      </div>
    </div>
  );
}
