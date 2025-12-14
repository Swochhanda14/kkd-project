import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import API from '../API';
import Item from '../Components/Item/Item';

const SearchResults = () => {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Extract query from URL
  const query = new URLSearchParams(location.search).get('q') || '';

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    setError(null);
    API.get(`/product?search=${encodeURIComponent(query)}`)
      .then(res => {
        setResults(res.data || []);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch search results.');
        setLoading(false);
      });
  }, [query]);

  return (
    <div className="p-8 min-h-[60vh]">
      <div className="flex items-baseline justify-between">
        <h2 className="text-2xl font-bold">Search Results for "{query}"</h2>
        <p className="text-gray-700 font-medium">{results.length} Item{results.length !== 1 ? 's' : ''} found</p>
      </div>
      {loading && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl h-64 animate-pulse border border-gray-100" />
          ))}
        </div>
      )}
      {error && <p className="text-red-600 mt-4">{error}</p>}
      {!loading && !error && results.length === 0 && (
        <div className="mt-6 bg-white border border-gray-200 rounded-xl p-6 text-center">
          <p className="text-gray-700">No products found.</p>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {results.map((product,i) => (
            <Item
            key={product._id || i}
            id={product._id || product.id}
            name={product.name}
            image={product.image}
            new_price={product.new_price}
            old_price={product.old_price}
            rating={product.rating}
            numReviews={product.numReviews}
          />

        ))}
      </div>
    </div>
  );
};

export default SearchResults;
