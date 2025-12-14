import React, { useEffect, useState } from 'react';
import Item from '../Item/Item';
import API from '../../API.jsx'

const Popular = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommended = async () => {
      try {
        const res = await API.get('/product/recommend');
        setProducts(res.data);
      } catch (err) {
        setError('Failed to fetch recommended products');
      } finally {
        setLoading(false);
      }
    };
    fetchRecommended();
  }, []);
  console.log(products);
  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (error) return <div className="text-center mt-20 text-red-500">{error}</div>;

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <h1 className="text-3xl md:text-4xl font-semibold">Popular Right Now</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-10 px-6 md:px-10">
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

export default Popular;
