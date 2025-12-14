import React from 'react'
import Item from '../Item/Item'


function RelatedProducts(props) {
  const { product } = props
  console.log(product)
  return (
    <div className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-orange-50/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className='text-3xl md:text-4xl font-extrabold mb-4 gradient-text'>Related Products</h1>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto"></div>
          <p className="text-gray-600 mt-4 text-lg">You might also like</p>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8'>
        {product.map((item, i) => {
          // If item.image is an array, use the first image; else use as is
          const imageUrl = Array.isArray(item.image) ? item.image[0] : item.image;
          return <Item key={i} id={item._id} name={item.name} image={imageUrl} new_price={item.new_price} old_price={item.old_price} />
        })}
        </div>
      </div>
    </div>
  )
}

export default RelatedProducts
