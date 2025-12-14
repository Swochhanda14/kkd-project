import React from 'react';
import { Link } from 'react-router-dom';
import Rating from '../Rating';

const Item = (props) => {
  return (
    <Link to={`/product/${props.id}`}>
      <div
        onClick={() => window.scrollTo(0, 0)}
        className="group bg-white shadow-soft rounded-2xl overflow-hidden max-w-sm mx-auto hover:scale-[1.03] transition-all duration-300 border border-gray-100 hover:border-orange-300 hover:shadow-large card-hover"
      >
        <div className="relative overflow-hidden">
          <img
            src={Array.isArray(props.image) ? props.image[0] : props.image}
            alt={props.name}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          {props.old_price && props.old_price > props.new_price && (
            <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              {Math.round(((props.old_price - props.new_price) / props.old_price) * 100)}% OFF
            </div>
          )}
        </div>
        <div className="p-5">
          <h1 className="text-lg font-bold mb-2 truncate text-gray-800 group-hover:text-orange-600 transition-colors duration-200">
            {props.name}
          </h1>
          <div className="mb-3">
            <Rating value={props.rating} text={`${props.numReviews} reviews`} />
          </div>
          <div className="flex gap-3 items-baseline">
            <p className="text-2xl font-extrabold text-orange-600">
              Rs. {props.new_price}
            </p>
            {props.old_price && props.old_price > props.new_price && (
              <p className="text-gray-400 line-through text-base font-medium">
                Rs. {props.old_price}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Item;
