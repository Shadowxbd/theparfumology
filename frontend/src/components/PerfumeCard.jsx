import React from 'react';
import { Heart } from 'lucide-react';

export default function PerfumeCard({ perfume }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {perfume.image_url && (
        <img
          src={perfume.image_url}
          alt={perfume.name}
          className="w-full h-48 object-cover"
        />
      )}
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{perfume.name}</h3>
            <p className="text-sm text-gray-600">{perfume.brand}</p>
          </div>
          <button className="text-gray-400 hover:text-red-500">
            <Heart className="h-5 w-5" />
          </button>
        </div>

        {perfume.description && (
          <p className="mt-2 text-sm text-gray-500 line-clamp-2">{perfume.description}</p>
        )}

        {perfume.accords?.length > 0 && (
          <div className="mt-3">
            <h4 className="text-xs font-semibold text-gray-700">Main Accords:</h4>
            <div className="flex flex-wrap gap-1 mt-1">
              {perfume.accords.map((accord, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-full"
                >
                  {accord}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4 flex justify-between items-center">
          {perfume.price && (
            <span className="text-lg font-bold text-purple-600">${perfume.price}</span>
          )}
          {perfume.fragrantica_url && (
            <a
              href={perfume.fragrantica_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-purple-600 hover:text-purple-800"
            >
              View on Fragrantica →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
