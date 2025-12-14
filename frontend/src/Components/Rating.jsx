import React from 'react'
import {FaStar, FaStarHalfAlt, FaRegStar} from 'react-icons/fa'

const Rating = ({value,text}) => {
  return (
    <div className='flex gap-3 items-center flex-wrap'>
      <div className='flex gap-0.5 items-center'>
      <span className="text-yellow-400">
        { value>=1 ? <FaStar className="w-5 h-5" /> : value >=0.5 ? <FaStarHalfAlt className="w-5 h-5" /> : <FaRegStar className="w-5 h-5 text-gray-300" /> }
      </span>
      <span className="text-yellow-400">
        { value>=2 ? <FaStar className="w-5 h-5" /> : value >=1.5 ? <FaStarHalfAlt className="w-5 h-5" /> : <FaRegStar className="w-5 h-5 text-gray-300" /> }
      </span>
      <span className="text-yellow-400">
        { value>=3 ? <FaStar className="w-5 h-5" /> : value >=2.5 ? <FaStarHalfAlt className="w-5 h-5" /> : <FaRegStar className="w-5 h-5 text-gray-300" /> }
      </span>
      <span className="text-yellow-400">
        { value>=4 ? <FaStar className="w-5 h-5" /> : value >=3.5 ? <FaStarHalfAlt className="w-5 h-5" /> : <FaRegStar className="w-5 h-5 text-gray-300" /> }
      </span>
      <span className="text-yellow-400">
        { value>=5 ? <FaStar className="w-5 h-5" /> : value >=4.5 ? <FaStarHalfAlt className="w-5 h-5" /> : <FaRegStar className="w-5 h-5 text-gray-300" /> }
      </span>
      </div>
      {text && <span className="text-sm text-gray-600 font-medium">{text}</span>}
    </div>
  )
}

export default Rating