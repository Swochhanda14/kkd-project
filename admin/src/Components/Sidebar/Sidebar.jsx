import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='h-screen flex sticky top-0'>
      <div className="hidden md:flex flex-col w-64 bg-gray-800">
        <div className="flex flex-col flex-1 overflow-y-auto">
            <nav className="flex-1 px-2 py-4 bg-gray-800">
                <Link to="/Dashboard" className="flex items-center gap-3 px-4 py-2 text-gray-100 hover:bg-gray-700">
                <i className="fa-solid fa-tachometer"></i>Dashboard
                </Link>
                <Link to="/list" className="flex items-center gap-3 px-4 py-2 text-gray-100 hover:bg-gray-700">
                <i className="fa-solid fa-list"></i>Product List
                </Link>
                <Link to="/addproduct" className="flex items-center gap-3 px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">
                <i className="fa-solid fa-cart-shopping"></i> Add product
                </Link>
                <Link to="/orders" className="flex items-center gap-3 px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">
                <i className="fa-solid fa-clipboard"></i>Orders
                </Link>
            </nav>
        </div>
    </div>
    </div>
  )
}

export default Sidebar
