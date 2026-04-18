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
      <h2 className="text-2xl font-bold mb-4">Search Results for "{query}"</h2>
      <p className="mb-4 text-gray-700 font-medium">{results.length} Item{results.length !== 1 ? 's' : ''} found</p>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && results.length === 0 && (
        <p>No products found.</p>
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
