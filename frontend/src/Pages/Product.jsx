import React, { useContext, useEffect, useState } from 'react'
// import { ShopContext } from '../Context/ShopContext'
import {useParams} from 'react-router-dom'
import Breadcrums from '../Components/Breadcrums/Breadcrums';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';
import Loading from '../Components/Loading/Loading';
import API from '../API';

const Product = () => {
  const {productId}=useParams();
  const [product,setProduct]=useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingRelated, setLoadingRelated] = useState(false);

  useEffect(() => {
    setLoading(true);
    API.get(`/product/${productId}`).then(res => {
      setProduct(res.data);
      // Set page title to product name if available
      if (res.data && res.data.name) {
        document.title = `${res.data.name} | Karigar Ko Dukaan`;
      } else {
        document.title = 'Product | Karigar Ko Dukaan';
      }
      setLoading(false);
      // Fetch related products by categoryId after product is loaded
      if (res.data && res.data.categoryId) {
        setLoadingRelated(true);
        const categoryId = res.data.categoryId;
        API.get(`/product/related?categoryId=${encodeURIComponent(categoryId)}`).then(r => {
          setRelated(r.data);
          setLoadingRelated(false);
        }).catch(() => {
          setLoadingRelated(false);
        });
      } else {
        setRelated([]);
      }
    }).catch(() => {
      setLoading(false);
    });
  }, [productId])

  if (loading || !product) {
    return (
      <div className="min-h-screen">
        <div className="bg-gradient-to-r from-gray-50 to-orange-50/30 py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="h-8 bg-gray-200 rounded w-64 animate-pulse mb-4"></div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-gray-50 to-orange-50/20 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 bg-white p-6 md:p-10 rounded-2xl shadow-soft border border-gray-100">
              <div className="w-full h-[550px] bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="space-y-6">
                <div className="h-10 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
                <div className="h-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-12 bg-gray-200 rounded w-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Breadcrums product={product}/>
      <ProductDisplay product={product}/>
      <DescriptionBox 
        product={product} 
        refetch={() => {
          API.get(`/product/${productId}`).then(res => {
            setProduct(res.data);
          });
        }} 
      />
      {loadingRelated ? (
        <div className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-orange-50/20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className='text-3xl md:text-4xl font-extrabold mb-4 gradient-text'>Related Products</h1>
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto"></div>
            </div>
            <Loading text="Loading related products..." />
          </div>
        </div>
      ) : (
        <RelatedProducts product={related}/>
      )}
    </div>
  )
}

export default Product
