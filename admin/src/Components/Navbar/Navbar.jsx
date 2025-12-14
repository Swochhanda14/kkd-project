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
    <div className='flex items-center p-5 bg-gray-700 justify-between font-inter font-normal text-lg sticky top-0 z-10'>
      <div className='ml-10 h-10 flex items-center gap-3'>
        <img src={logo} alt="" className='h-full mix-blend-screen' />
        <p className='text-white font-semibold text-2xl font-[Poppins]'>Karigar Ko Dukaan</p>
      </div>
      <ul className='ml-10 h-10 flex items-center gap-5'>
        <li><img src={profile} alt="" className='w-14 h-14 rounded-full object-cover border-2 border-white shadow' /></li>
        <li><button className='border text-white py-2 px-3 rounded-md active:bg-purple-900' onClick={handleLogout}>Logout</button></li>
        <li><button className='border text-white py-2 px-3 rounded-md bg-red-700 hover:bg-red-800 ml-2' onClick={handleClearHistory}>Clear History</button></li>
      </ul>
    </div>
  )
}

export default Navbar
