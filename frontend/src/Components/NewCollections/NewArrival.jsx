import React, { useEffect, useState } from 'react';
import Item from '../Item/Item.jsx';
import API from '../../API.jsx';
import { ProductGridSkeleton } from '../Loading/LoadingSkeleton';

const NewCollection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const res = await API.get('/product/related');
        setProducts(res.data);
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };
    fetchRelated();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 mb-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3 gradient-text">New Arrivals</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto mb-2"></div>
          <p className="text-gray-600 text-lg">Fresh additions to our collection</p>
        </div>
        <ProductGridSkeleton count={8} />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 mb-16 px-4 sm:px-6 lg:px-8">
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 text-center max-w-md">
          <div className="text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-800 mb-2">Error</h2>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center mt-20 mb-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3 gradient-text">New Arrivals</h1>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto mb-2"></div>
        <p className="text-gray-600 text-lg">Fresh additions to our collection</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 w-full max-w-7xl">
        {products.map((item, i) => (
          <Item
            key={item._id || i}
            id={item._id || item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
            rating={item.rating}
            numReviews={item.numReviews}
          />
        ))}
      </div>
    </div>
  );
};

export default NewCollection;
