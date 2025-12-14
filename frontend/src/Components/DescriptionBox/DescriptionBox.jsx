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
      await API.post(
        `/product/${product._id}/reviews`,
        {
          rating,
          comment,
        },
        {
          headers: {
            Authorization: userInfo?.token ? `Bearer ${userInfo.token}` : undefined,
          },
        }
      );
      setRating(0);
      setComment('');
      if (refetch) refetch();
    } catch (error) {
      // Optionally handle error
    }
    setLoadingReview(false);
  };

  return (
    <div className="px-6 md:px-20">
      <div className="mt-10 w-full md:w-2/3 bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-semibold mb-3">Description</h2>
        <p className="text-gray-700 leading-relaxed">{product.description}</p>
      </div>

      <div className="mt-10 w-full md:w-2/3 bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Reviews</h2>
          <span className="text-sm text-gray-600">{product.reviews?.length || 0} total</span>
        </div>
        {product.reviews?.length === 0 && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-3 rounded-lg">
            No Reviews
          </div>
        )}
        {product.reviews?.map((review) => (
          <div key={review._id} className="py-4 border-b last:border-b-0">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-700 text-white flex items-center justify-center text-sm font-semibold">
                {review.name?.charAt(0)?.toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{review.name}</span>
                  <span className="text-xs text-gray-500">{review.createdAt?.substring(0, 10)}</span>
                </div>
                <div className="mt-1">
                  <Rating value={review.rating} />
                </div>
                <p className="mt-2 text-gray-700">{review.comment}</p>
              </div>
            </div>
          </div>
        ))}

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Write a Customer Review</h3>
          {loadingReview && <p>Loading...</p>}
          {userInfo ? (
            <form onSubmit={submitHandler} className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Rating</label>
                <StarRatingInput rating={rating} setRating={setRating} />
              </div>
              <div>
                <label className="block font-medium mb-1">Comment</label>
                <textarea
                  required
                  rows="3"
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-600"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={loadingReview}
                className="bg-orange-700 text-white px-5 py-2 rounded-lg hover:bg-orange-800 transition disabled:opacity-50"
              >
                Submit
              </button>
            </form>
          ) : (
            <div className="bg-blue-50 border border-blue-200 text-blue-800 p-3 rounded-lg">
              Please <a href="/login" className="text-blue-700 underline">sign in</a> to write a review.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DescriptionBox;
