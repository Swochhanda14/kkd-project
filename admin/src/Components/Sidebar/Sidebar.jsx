import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: "/Dashboard", label: "Dashboard", icon: "fa-solid fa-tachometer-alt" },
    { path: "/list", label: "Product List", icon: "fa-solid fa-list" },
    { path: "/addproduct", label: "Add Product", icon: "fa-solid fa-cart-plus" },
    { path: "/orders", label: "Orders", icon: "fa-solid fa-clipboard-list" },
  ];

  const isActive = (path) => {
    if (path === "/Dashboard") {
      return location.pathname === "/Dashboard" || location.pathname === "/";
    }
    return location.pathname === path;
  };

  return (
    <div className='h-screen flex sticky top-0'>
      <div className="hidden md:flex flex-col w-64 bg-gradient-to-b from-gray-800 to-gray-900 shadow-xl border-r border-gray-700">
        <div className="flex flex-col flex-1 overflow-y-auto custom-scrollbar">
            <nav className="flex-1 px-3 py-6 space-y-2">
                {menuItems.map((item) => (
                  <Link 
                    key={item.path}
                    to={item.path} 
                    className={`flex items-center gap-3 px-4 py-3 text-gray-200 rounded-xl transition-all duration-200 group ${
                      isActive(item.path) 
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg' 
                        : 'hover:bg-gray-700/50 hover:text-white'
                    }`}
                  >
                    <i className={`${item.icon} text-lg w-5 text-center ${isActive(item.path) ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}></i>
                    <span className="font-medium">{item.label}</span>
                    {isActive(item.path) && (
                      <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </Link>
                ))}
            </nav>
        </div>
    </div>
    </div>
  )
}

export default Sidebar
