import React from 'react'
import logo from '../Assets/logo.png'
import profile from '../Assets/profile.jpg'
import { clearDashboardHistory } from '../../utils/clearDashboardHistory'

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem('adminInfo');
    window.location.href = '/';
  };

  const handleClearHistory = () => {
    clearDashboardHistory();
    window.location.reload();
  };

  return (
    <div className='flex items-center p-4 lg:p-6 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 justify-between font-inter font-normal text-lg sticky top-0 z-10 shadow-lg border-b border-gray-600'>
      <div className='flex items-center gap-3 lg:gap-4'>
        <div className='relative'>
          <img src={logo} alt="Logo" className='h-10 lg:h-12 mix-blend-screen transition-transform duration-300 hover:scale-110' />
        </div>
        <p className='text-white font-bold text-xl lg:text-2xl font-poppins hidden sm:block'>Karigar Ko Dukaan</p>
        <span className='text-white/60 text-sm hidden lg:block'>Admin Panel</span>
      </div>
      <ul className='flex items-center gap-3 lg:gap-5'>
        <li className='relative group'>
          <img src={profile} alt="Profile" className='w-10 h-10 lg:w-12 lg:h-12 rounded-full object-cover border-2 border-white/30 shadow-lg hover:border-white/60 transition-all duration-200 cursor-pointer' />
          <div className='absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-800'></div>
        </li>
        <li>
          <button 
            className='border border-white/30 text-white py-2 px-4 rounded-lg hover:bg-white/10 active:bg-white/20 transition-all duration-200 font-medium text-sm lg:text-base' 
            onClick={handleLogout}
          >
            Logout
          </button>
        </li>
        <li>
          <button 
            className='bg-gradient-to-r from-red-600 to-red-700 text-white py-2 px-4 rounded-lg hover:from-red-700 hover:to-red-800 active:scale-95 transition-all duration-200 font-medium text-sm lg:text-base shadow-md hover:shadow-lg ml-2' 
            onClick={handleClearHistory}
          >
            Clear History
          </button>
        </li>
      </ul>
    </div>
  )
}

export default Navbar
