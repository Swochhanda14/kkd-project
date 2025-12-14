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
    <div className="flex flex-col items-center justify-center mt-10">
      <h1 className="text-3xl md:text-4xl font-semibold capitalize">
        {props.category}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-10 px-6 md:px-10">
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
    </div>
  );
};

// ✅ Add PropTypes validation
ShopCategory.propTypes = {
  category: PropTypes.string.isRequired,
};

export default ShopCategory;
