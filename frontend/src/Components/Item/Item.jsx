import React from 'react';
import { Link } from 'react-router-dom';
import Rating from '../Rating';

const Item = (props) => {
  return (
    <Link to={`/product/${props.id}`}>
      <div
        onClick={() => window.scrollTo(0, 0)}
        className="bg-white shadow-lg rounded-2xl overflow-hidden max-w-sm mx-auto hover:scale-105 transition-transform duration-300 border border-gray-100 hover:border-orange-300"
      >
        <img
          src={Array.isArray(props.image) ? props.image[0] : props.image}
          alt={props.name}
          className="w-full h-64 object-cover"
        />
        <div className="p-4">
          <h1 className="text-xl font-semibold mb-1 truncate">{props.name}</h1>
          <Rating value={props.rating} text={`${props.numReviews} reviews`} />
          {/* Optional: add category or description here if available */}
          <div className="flex gap-4 items-end">
            <p className="text-lg font-bold text-amber-700">
              Rs. {props.new_price}
            </p>
            <p className="text-gray-500 line-through text-lg font-medium">
              Rs. {props.old_price}
            </p>
          </div>
        </div>
      </div>
    
    </Link>
  );
};

export default Item;
