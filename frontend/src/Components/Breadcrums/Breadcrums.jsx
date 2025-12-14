import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import API from '../../API';

const Breadcrums = (props) => {
    const {product}=props;
    const [category,setCategory]=useState([])

    useEffect(()=>{
      API.get('/category').then(res=>{
        setCategory(res.data)
      })
    },[])

    const getCategoryName=(e)=>{
      const cat=category.find((c)=>c._id===e)
      return cat ? cat.cat_name :"unknown"
    }
  return (
    <div className='flex flex-wrap items-center gap-2 px-4 sm:px-6 lg:px-8 py-6 bg-gradient-to-r from-gray-50 to-orange-50/30 border-b border-gray-200'>
      <Link to="/" className='font-semibold text-sm text-gray-600 hover:text-orange-600 transition-colors'>HOME</Link>
      <span className='text-gray-400'>&#62;</span>
      <Link to="/masks" className='font-semibold text-sm text-gray-600 hover:text-orange-600 transition-colors'>SHOP</Link>
      <span className='text-gray-400'>&#62;</span>
      <span className='font-semibold text-sm text-gray-700 uppercase'>{getCategoryName(product.categoryId)}</span>
      <span className='text-gray-400'>&#62;</span>
      <span className='font-bold text-sm text-orange-600 capitalize truncate max-w-xs'>{product.name}</span>
    </div>
  )
}

export default Breadcrums
