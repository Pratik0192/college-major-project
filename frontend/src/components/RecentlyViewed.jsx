import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem';

const RecentlyViewed = () => {

  const { products } = useContext(ShopContext);
  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    const recentIds = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
    const recentItems = recentIds
      .map(id => products.find(prod => prod._id === id))
      .filter(Boolean); // Remove undefined (in case of missing product)
    setRecentProducts(recentItems);
  }, [products]);

  const clearRecentlyViewed = () => {
    localStorage.removeItem('recentlyViewed');
    setRecentProducts([]);
  }

  if (recentProducts.length === 0) return null;

  return (
    <div className='my-10 px-4 lg:px-10'>
      <h1 className="text-center text-2xl lg:text-4xl font-semibold mb-4 text-gray-800">Recently Viewed</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-10">
        {recentProducts.map(product => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>

      <div className="text-center mb-4 mt-4">
        <button 
          onClick={clearRecentlyViewed} 
          className="btn btn-danger text-white"
        >
          Clear Recently Viewed
        </button>
      </div>
    </div>
  )
}

export default RecentlyViewed