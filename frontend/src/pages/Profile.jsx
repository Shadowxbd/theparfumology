import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PerfumeCard from '../components/PerfumeCard';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user profile from backend
    axios.get('http://localhost:5000/profile', { withCredentials: true })
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="spinner-border text-purple-600" role="status" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center mt-20 text-gray-600">
        Vous devez être connecté pour accéder à votre profil.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">👤 Mon profil</h1>

      <div className="bg-white shadow-md rounded-lg p-6 mb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Informations personnelles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nom</label>
            <p className="mt-1 text-lg text-gray-900">{user.name || '–'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <p className="mt-1 text-lg text-gray-900">{user.email || '–'}</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">❤️ Mes favoris</h2>
        {user.favorites && user.favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {user.favorites.map((perfume, index) => (
              <PerfumeCard key={index} perfume={perfume} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 italic py-8">
            Vous n’avez pas encore enregistré de parfums en favoris.
          </div>
        )}
      </div>
    </div>
  );
}
