import React from 'react'
import CartItems from '../Components/CartItems/CartItems'

const Cart = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center mb-12">
          <h1 className='text-4xl md:text-5xl font-extrabold mb-4 gradient-text'>Your Cart</h1>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto"></div>
          <p className="text-gray-600 mt-4 text-lg">Review your selected items</p>
        </div>
        <CartItems />
      </div>
    </div>
  )
}

export default Cart
