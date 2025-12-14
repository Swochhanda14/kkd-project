import React, { useState, useEffect } from 'react'
import Sidebar from '../Components/Sidebar/Sidebar'
import API from '../API'
import { Link } from 'react-router-dom'

const ProductList = () => {
  const [products, setProduct] = useState([]);
  const [categories, setCategory] = useState([]);
  useEffect(() => {
    API.get('/product').then(res => {
      setProduct(res.data)
    })

    API.get('/category').then(res => {
      setCategory(res.data);
    })


  }, [])

  const getCategoryName = (catId) => {
    const category = categories.find((cat) => cat._id === catId)
    return category ? category.cat_name : "unknown"
  }

  const remove = async (id) => {
    confirm("Do you want to delete this product?")
    try {
      await API.delete(`/product/${id}`);
      setProduct(products.filter(product => product._id !== id));
      alert('Product Deleted Successfully');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='flex gap-5 min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50/30'>
      <Sidebar />
      <div className='p-6 lg:p-8 w-full'>
        <div className="mb-8">
          <h1 className='text-3xl font-extrabold font-inter text-gray-800 mb-2'>All Products</h1>
          <p className="text-gray-600">Manage your product inventory</p>
        </div>
        <div className="bg-white rounded-2xl shadow-soft overflow-hidden border border-gray-100">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-600 to-purple-600">
                  <th scope="col" className="p-4 text-left text-sm font-bold text-white">S.N</th>
                  <th scope="col" className="p-4 text-left text-sm font-bold text-white">Image</th>
                  <th scope="col" className="p-4 text-left text-sm font-bold text-white">Name</th>
                  <th scope="col" className="p-4 text-left text-sm font-bold text-white">Category</th>
                  <th scope="col" className="p-4 text-left text-sm font-bold text-white">Quantity</th>
                  <th scope="col" className="p-4 text-left text-sm font-bold text-white">New Price</th>
                  <th scope="col" className="p-4 text-left text-sm font-bold text-white">Old Price</th>
                  <th scope="col" className="p-4 text-left text-sm font-bold text-white">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products && products.map((product, i) => (
                  <tr className="bg-white transition-all duration-200 hover:bg-indigo-50/50" key={i}>
                    <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">{++i}</td>
                    <td className="p-4 whitespace-nowrap">
                      <img src={Array.isArray(product.image) ? product.image[0] : product.image} className='w-16 h-16 object-cover rounded-lg shadow-md' alt={product.name} />
                    </td>
                    <td className="p-4 text-sm font-semibold text-gray-900 max-w-xs truncate">
                      {product.name}
                    </td>
                    <td className="p-4 whitespace-nowrap text-sm font-medium text-gray-700">
                      <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold">
                        {getCategoryName(product.categoryId)}
                      </span>
                    </td>
                    <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">{product.quantity}</td>
                    <td className="p-4 whitespace-nowrap text-sm font-bold text-green-600">Rs. {product.new_price}</td>
                    <td className="p-4 whitespace-nowrap text-sm font-medium text-gray-500 line-through">Rs. {product.old_price}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Link to={`/updateproduct/${product._id}`}>
                          <button className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors duration-200 flex items-center justify-center">
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                        </Link>
                        <button 
                          onClick={() => {
                            if (window.confirm("Do you want to delete this product?")) {
                              remove(product._id);
                            }
                          }}
                          className="w-9 h-9 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors duration-200 flex items-center justify-center"
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductList
