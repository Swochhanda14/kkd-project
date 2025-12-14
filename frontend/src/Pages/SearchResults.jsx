import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import API from '../API';
import Item from '../Components/Item/Item';
import { ProductGridSkeleton } from '../Components/Loading/LoadingSkeleton';

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
    <div className="min-h-[60vh] py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-orange-50/20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 pb-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-3xl md:text-4xl font-extrabold gradient-text">
              Search Results for <span className="text-orange-600">"{query}"</span>
            </h2>
            <p className="text-gray-700 font-semibold bg-white px-4 py-2 rounded-full shadow-sm">
              {results.length} Item{results.length !== 1 ? 's' : ''} found
            </p>
          </div>
        </div>
        {loading && (
          <div className="mt-8">
            <ProductGridSkeleton count={8} />
          </div>
        )}
        {error && (
          <div className="mt-6 bg-red-50 border-2 border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-600 font-semibold">{error}</p>
          </div>
        )}
        {!loading && !error && results.length === 0 && (
          <div className="mt-12 bg-white rounded-2xl shadow-soft p-12 text-center border border-gray-100">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No products found</h3>
            <p className="text-gray-600">Try searching with different keywords</p>
          </div>
        )}
        {!loading && !error && results.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
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
        )}
      </div>
    </div>
  );
};

export default SearchResults;
