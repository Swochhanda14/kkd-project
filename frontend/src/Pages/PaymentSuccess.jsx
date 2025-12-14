import React from 'react';
import { Link } from 'react-router-dom'; // Corrected import

const PaymentSuccess = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl max-w-lg text-center border border-green-100 animate-scale-in">
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">Order Placed Successfully!</h1>
        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
          Your order has been successfully placed. Thank you for shopping with us! We'll send you a confirmation email shortly.
        </p>
        <div className="mt-8">
          <Link to='/'>
            <button className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-orange-700 hover:to-red-700 transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;