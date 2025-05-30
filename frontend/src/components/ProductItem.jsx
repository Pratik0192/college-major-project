import { Search, Star } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { useTranslation } from "react-i18next";

const ProductItem = ({ product }) => {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
  const [currentImage, setCurrentImage] = useState(product.image[0]); // Default image
  const { addToWishlist, removeWishlist, wishlistItems } = useContext(ShopContext)

  // Derive isWishlisted directly from context
  const isWishlisted = wishlistItems[product._id];

  // Ensure product.colors is an array
  const productColors = Array.isArray(product.colors) ? product.colors : [];

  const toggleWishlist = async (e) => {
    e.preventDefault(); // Prevent navigation
    if (isWishlisted) {
      await removeWishlist(product._id);
    } else {
      await addToWishlist(product._id);
    }
  };

  return (
    <Link to={`/product/${product._id}`}>
      <div
        className={`relative bg-white border border-gray-200 rounded-lg p-1 md:p-4 shadow-sm transition duration-300 ${
          isHovered ? "scale-101 shadow-md" : "scale-100"
        }`}
        onMouseEnter={() => {
          setIsHovered(true);
          if (product.image.length > 1) {
            setCurrentImage(product.image[1]); // Show second image on hover
          }
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          setCurrentImage(product.image[0]); // Reset to first image
        }}
      >   

      <div className="badge badge-primary text-xs md:text-sm items-center">{Math.round(((product.price - product.discounted_price) / product.price) * 100)}% {t("off")}</div>

        {/* Wishlist Icon */}
        <button
          onClick={toggleWishlist}
          className="absolute top-1 md:top-5 right-3 text-xl md:text-2xl transition-transform transform hover:scale-110 cursor-pointer"
        >
          {isWishlisted ? (
            <FaHeart className="text-red-500"  />
          ) : (
            <FaRegHeart className="text-gray-600 hover:text-blue-500" />
          )}
        </button>

        { product.rating !== 0 &&  
          <div className="hidden md:block absolute bottom-45 left-10 z-50 ">
            <p className="mt-2 text-md text-gray-600 flex gap-1 ">
              <Star className="w-5 text-yellow-600 -mt-0.5" /> {product.rating} ({product.reviews} reviews)
            </p>
          </div>
        }

        {/* Product Image */}
        <div className="h-35 lg:h-56 overflow-hidden flex items-center justify-center vignette-effect">
          <img
            src={currentImage}
            alt={product.name}
            className="w-full h-full object-contain transition-opacity duration-300 vignette-effect"
          />
        </div>
    
        <div className="divider divider-primary">
        <div className="mt-0 md:mt-2 text-sm lg:text-sm truncate w-full text-gray-700 font-medium overflow-hidden whitespace-nowrap">
          {product.name}
        </div>
      </div>

        <div className="bg-gradient-to-r from-cyan-50 to-sky-50" >
       
        
        <div className="flex items-center gap-2">
          <span className="text-xs lg:text-sm text-gray-700">{t("colors")}</span>
          <p className="text-xs lg:text-sm flex gap-1 truncate w-full overflow-hidden whitespace-nowrap text-gray-700">
            {product.frameColour}
          </p>
        </div>
        
        {/* Price & Offered Price */}
        <div className="flex justify-between mt-2">
          <div className="flex items-center gap-2">
            <span className="text-blue-500 font-semibold">₹{product.discounted_price}</span>
            <span className="text-blue-900 line-through">₹{product.price}</span>
          </div>          
        </div>
        
        <div className="flex justify-between" >
          <p className="text-sm text-gray-700" > {t("priceDropped")} <span className="text-lg font-bold text-pink-500"  >₹{product.price - product.discounted_price}</span></p>
          <div className="hidden md:block dropdown dropdown-top dropdown-end dropdown-hover">
            <div tabIndex={0} role="button" className="btn m-1 rounded-2xl border-2 border-dashed border-black bg-white px-1 py-1 md:px-3 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"> <Search className="w-3 h-3 md:w-5 md:h-5" /> </div>
            <ul tabIndex={0} className="dropdown-content font-semibold menu bg-gray-100 text-gray-800 rounded-box z-1 w-52 p-2 shadow-sm border-2 border-dashed">
              <li><a> {t("name")}: {product.name} </a></li>
              <li><a>{t("category")}: {product.category }</a></li>
              <li><a>{t("frameWidth")}: {product.frameWidth} </a></li>
              <li><a>{t("frameDimensions")}: {product.frameDimensions} </a></li>
              <li><a>{t("brand")}: {product.brand} </a></li>
            </ul>
          </div>
        </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;