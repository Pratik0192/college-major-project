import React, { useContext, useState } from 'react';
import { Search, X } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const SearchBar = () => {
  const [search, setSearch] = useState('');
  const { products } = useContext(ShopContext);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative w-full flex justify-center px-4 py-4 bg-[#fafafa] z-50">
      <div className="w-full max-w-2xl relative">
        {/* Input Field */}
        <div className="flex items-center border border-gray-300 rounded-4xl px-2 bg-white">
          <input
            type="text"
            placeholder="Search for Products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 p-3 text-md outline-none rounded-4xl text-gray-600 bg-white"
          />
          {search ? (
            <button onClick={() => setSearch('')}>
              <X className="w-5 text-gray-500" />
            </button>
          ) : (
            <Search className="w-5 text-gray-500" />
          )}
        </div>

        {/* Filtered Product List */}
        {search && (
          <div className="absolute w-full bg-gray-100 border border-gray-300 mt-2 rounded-md shadow-lg z-10 max-h-[400px] overflow-y-auto">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Link
                  to={`/product/${product._id}`}
                  key={product._id}
                  onClick={() => setSearch('')}
                  className="flex items-start gap-4 p-3 hover:bg-white bg-[#f1f1f1] rounded-md transition-shadow hover:shadow-sm"
                >
                  <img
                    src={product.image[0]}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-md border"
                  />
                  <div className="flex flex-col w-full">
                    <h3 className="text-sm font-semibold text-gray-800">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-500">{product.brand} • {product.frameDimensions}</p>

                    {/* Price & Discount */}
                    <div className="flex items-center gap-2 mt-1 text-sm text-gray-700 font-medium">
                      <span className="line-through text-xs text-gray-500">₹{product.price}</span>
                      <span className="text-green-600 font-semibold">₹{product.discounted_price}</span>
                      <span className="text-xs text-red-500 font-semibold">
                        {Math.round(((product.price - product.discounted_price) / product.price) * 100)}% OFF
                      </span>
                    </div>

                    {/* Rating & Reviews */}
                    {product.rating > 0 && product.reviews > 0 && (
                      <p className="text-xs text-yellow-600 mt-1">
                        ★ {product.rating} ({product.reviews} reviews)
                      </p>
                    )}
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-gray-500 p-3 text-center">No matching products found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
