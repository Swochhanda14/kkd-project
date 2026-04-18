import React, { useState } from 'react';
import API from '../../API.jsx';
import StarRatingInput from '../StarRatingInput.jsx';
import Rating from '../Rating.jsx';

const DescriptionBox = ({ product, refetch }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loadingReview, setLoadingReview] = useState(false);

  // Get user info from localStorage
  let userInfo = null;
  try {
    const stored = localStorage.getItem('user') || localStorage.getItem('userInfo');
    if (stored) {
      userInfo = JSON.parse(stored);
    }
  } catch { }

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoadingReview(true);
    try {
      if (!rating || rating < 1 || rating > 5) {
        throw new Error('Please select a rating between 1 and 5');
      }
      const payload = { rating, comment };
      const config = {};
      if (userInfo?.token) {
        config.headers = { Authorization: `Bearer ${userInfo.token}` };
      }
      await API.post(`/product/${product._id}/reviews`, payload, config);
      setRating(0);
      setComment('');
      if (refetch) refetch();
    } catch (error) {
      // Optionally handle error
    }
    setLoadingReview(false);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12">
      <div className="mt-10 w-full bg-white rounded-2xl shadow-soft p-6 md:p-8 border border-gray-100">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 border-b border-gray-200 pb-3">Description</h2>
        <p className="text-gray-700 leading-relaxed text-base md:text-lg">{product.description}</p>
      </div>

      <div className="mt-10 w-full bg-white rounded-2xl shadow-soft p-6 md:p-8 border border-gray-100">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Reviews</h2>
          <span className="text-sm font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">{product.reviews?.length || 0} total</span>
        </div>
        {product.reviews?.length === 0 && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-3 rounded-lg">
            No Reviews
          </div>
        )}
        {product.reviews?.map((review) => (
          <div key={review._id} className="py-5 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-150 rounded-lg px-3">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-600 to-red-600 text-white flex items-center justify-center text-lg font-bold shadow-md">
                {review.name?.charAt(0)?.toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-bold text-gray-800">{review.name}</span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{review.createdAt?.substring(0, 10)}</span>
                </div>
                <div className="mb-3">
                  <Rating value={review.rating} />
                </div>
                <p className="text-gray-700 leading-relaxed">{review.comment}</p>
              </div>
            </div>
          </div>
        ))}

        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Write a Customer Review</h3>
          {loadingReview && (
            <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-xl border border-orange-200">
              <svg className="w-5 h-5 text-orange-600 animate-spin" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-orange-700 font-medium">Submitting your review...</span>
            </div>
          )}
          {userInfo ? (
            <form onSubmit={submitHandler} className="space-y-5">
              <div>
                <label className="block font-semibold mb-2 text-gray-700">Rating</label>
                <StarRatingInput rating={rating} setRating={setRating} />
              </div>
              <div>
                <label className="block font-semibold mb-2 text-gray-700">Comment</label>
                <textarea
                  required
                  rows="4"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500 transition-all duration-200 resize-none"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your thoughts about this product..."
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={loadingReview}
                className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-700 hover:to-red-700 transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                Submit Review
              </button>
            </form>
          ) : (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 text-blue-800 p-4 rounded-xl">
              Please <a href="/login" className="text-blue-700 font-bold underline hover:text-blue-800">sign in</a> to write a review.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DescriptionBox;
