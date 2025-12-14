import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Item from '../Components/Item/Item';
import API from '../API';

const ShopCategory = (props) => {
  const [product, setProduct] = useState([]);
  const [categories, setCategory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [productRes, categoryRes] = await Promise.all([
        API.get('/product'),
        API.get('/category')
      ]);
      setProduct(productRes.data);
      setCategory(categoryRes.data);
    };

    fetchData();
  }, []);

  const getCategoryName = (catId) => {
    const category = categories.find((cat) => cat._id === catId);
    return category ? category.cat_name : 'unknown';
  };

  const filteredProducts = product.filter(
    (item) =>
      props.category?.toLowerCase().trim() ===
      getCategoryName(item.categoryId)?.toLowerCase().trim()
  );
  console.log(filteredProducts);
  return (
    <div className="flex flex-col items-center justify-center mt-10 mb-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12 w-full">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3 gradient-text capitalize">
          {props.category}
        </h1>
        <div className="w-32 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto mb-2"></div>
        <p className="text-gray-600 text-lg">{filteredProducts.length} products available</p>
      </div>
      {filteredProducts.length === 0 ? (
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-soft p-12 text-center">
          <div className="text-6xl mb-4">📦</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No products found</h2>
          <p className="text-gray-600">Check back later for new items in this category!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 w-full max-w-7xl">
        {filteredProducts.map((item, i) => (
          <Item
            key={i}
            id={item._id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
            rating={item.rating}
            numReviews={item.numReviews}
          />
        ))}
        </div>
      )}
    </div>
  );
};

// ✅ Add PropTypes validation
ShopCategory.propTypes = {
  category: PropTypes.string.isRequired,
};

export default ShopCategory;
