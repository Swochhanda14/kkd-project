import React, { useContext, useEffect, useState } from 'react'
// import { ShopContext } from '../Context/ShopContext'
import {useParams} from 'react-router-dom'
import Breadcrums from '../Components/Breadcrums/Breadcrums';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';
import API from '../API';

const Product = () => {
  const {productId}=useParams();
  const [product,setProduct]=useState([]);
  const [related, setRelated] = useState([])

  useEffect(() => {
    API.get(`/product/${productId}`).then(res => {
      setProduct(res.data);
      // Set page title to product name if available
      if (res.data && res.data.name) {
        document.title = `${res.data.name} | Karigar Ko Dukaan`;
      } else {
        document.title = 'Product | Karigar Ko Dukaan';
      }
      // Fetch related products by categoryId after product is loaded
      if (res.data && res.data.categoryId) {
        const categoryId = res.data.categoryId;
        API.get(`/product/related?categoryId=${encodeURIComponent(categoryId)}`).then(r => {
          setRelated(r.data);
        });
      } else {
        setRelated([]);
      }
    });
  }, [productId])

  return (
    <div>
      <Breadcrums product={product}/>
      <ProductDisplay product={product}/>
      <DescriptionBox product={product} />
      <RelatedProducts product={related}/>
    </div>
  )
}

export default Product
