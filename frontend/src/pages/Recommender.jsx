import React, { useState } from 'react';
import axios from 'axios';
import PerfumeCard from '../components/PerfumeCard';

export default function Recommender() {
  const [formData, setFormData] = useState({
    gender: '',
    scent: '',
    budget: '',
    occasion: '',
  });

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResults([]);
    try {
      const response = await axios.post(
        'http://localhost:5000/recommend',
        {
          gender: formData.gender,
          scent: formData.scent,
          budget: formData.budget,
          mood: formData.occasion, // backend uses "mood"
        },
        { withCredentials: true }
      );

      const filtered = response.data.filter(p => p.image && p.name);
      setResults(filtered);
    } catch (err) {
      if (err.response?.status === 401) {
        alert('⛔ Veuillez vous connecter pour accéder aux recommandations.');
      } else {
        alert('❌ Une erreur est survenue.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        🎯 Get Your Personalized Recommendations
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 space-y-6"
      >
        {[
          {
            id: 'gender',
            label: 'Who is this fragrance for?',
            options: [
              { value: '', label: 'Select an option' },
              { value: 'masculine', label: 'Masculine' },
              { value: 'feminine', label: 'Feminine' },
              { value: 'unisex', label: 'Unisex' },
            ],
          },
          {
            id: 'scent',
            label: 'What type of scent do you prefer?',
            options: [
              { value: '', label: 'Select an option' },
              { value: 'floral', label: 'Floral' },
              { value: 'woody', label: 'Woody' },
              { value: 'oriental', label: 'Oriental' },
              { value: 'fresh', label: 'Fresh' },
              { value: 'citrus', label: 'Citrus' },
            ],
          },
          {
            id: 'budget',
            label: "What's your budget?",
            options: [
              { value: '', label: 'Select an option' },
              { value: 'budget', label: 'Under $50' },
              { value: 'moderate', label: '$50 - $100' },
              { value: 'luxury', label: '$100+' },
            ],
          },
          {
            id: 'occasion',
            label: "What's the occasion?",
            options: [
              { value: '', label: 'Select an option' },
              { value: 'daily', label: 'Daily Wear' },
              { value: 'work', label: 'Work' },
              { value: 'date', label: 'Date Night' },
              { value: 'special', label: 'Special Occasion' },
            ],
          },
        ].map(({ id, label, options }) => (
          <div key={id}>
            <label
              htmlFor={id}
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {label}
            </label>
            <select
              id={id}
              value={formData[id]}
              onChange={(e) =>
                setFormData({ ...formData, [id]: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500"
            >
              {options.map((opt, i) => (
                <option key={i} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          {loading ? 'Chargement...' : 'Get Recommendations'}
        </button>
      </form>

      <div className="mt-10 space-y-6">
        {results.length > 0 ? (
          results.map((perfume, index) => (
            <PerfumeCard key={index} perfume={perfume} />
          ))
        ) : (
          !loading && (
            <div className="text-center text-gray-500">
              Aucune recommandation pour l’instant. Remplissez le formulaire.
            </div>
          )
        )}
      </div>
    </div>
  );
}
