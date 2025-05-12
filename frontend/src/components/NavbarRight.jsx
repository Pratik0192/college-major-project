import React, { useContext, useEffect, useRef, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { CircleUser, Heart, ShoppingBag, LogOutIcon, LogInIcon, UserRound, Layers } from "lucide-react";
import {
  FiLogOut,
  FiLogIn,
  FiUserCheck,
  FiLayers
} from "react-icons/fi"
import { AiOutlineShoppingCart, AiOutlineUser, AiOutlineHeart } from "react-icons/ai";


const NavbarRight = () => {

  const { token, setToken, getCartCount, wishlistItems, navigate } = useContext(ShopContext);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setWishlistCount(Object.keys(wishlistItems).length);
  }, [wishlistItems]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  return (
    <ul className="hidden lg:flex items-center gap-5 text-blue-950 font-semibold">
      {/* Desktop Dropdown */}
      <li ref={dropdownRef} className="relative cursor-pointer">
        <div className="flex items-center hover:text-blue-500" onClick={() => setIsOpen(!isOpen)}>
          <AiOutlineUser className="w-7 h-7" />
        </div>

        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute right-0 mt-2 w-60 bg-white shadow-lg border rounded-lg z-50"
          >
            {token ? (
              <div className="px-4 py-2 font-bold text-2xl">WELCOME!</div>
            ) : (
              <div className="px-4 py-2 font-bold text-2xl">LOGIN TO SHOP!</div>
            )}

            {token ? (
              <li
                className="px-4 py-2 hover:bg-gray-100 flex gap-4 cursor-pointer transition duration-200"
                onClick={handleLogout}
              >
                <FiLogOut />
                Logout
              </li>
            ) : (
              <li className="px-4 py-2 hover:bg-gray-100 transition duration-200">
                <Link to="/login" className="flex gap-4">
                  <FiLogIn /> Log in/Sign up
                </Link>
              </li>
            )}
            <li className="px-4 py-2 hover:bg-gray-100 transition duration-200">
              <Link to="/profile" className="flex gap-4">
                <FiUserCheck /> Profile
              </Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 transition duration-200">
              <Link to="/orders" className="flex gap-4">
                <FiLayers /> Orders
              </Link>
            </li>
          </motion.ul>
        )}
      </li>

      {/* Wishlist */}
      <li className="cursor-pointer hover:text-blue-500 relative">
        <Link to="/wishlist">
          <AiOutlineHeart className="w-7 h-7" />
          <p className="absolute right-[-5px] top-[-5px] w-4 text-center leading-4 bg-blue-700 text-white aspect-square rounded-full text-[8px]">
            {wishlistCount}
          </p>
        </Link>
      </li>

      {/* Cart */}
      <li className="cursor-pointer hover:text-blue-500 relative">
        <Link to="/cart">
          <AiOutlineShoppingCart className="w-7 h-7" />
          <p className="absolute right-[-5px] top-[-5px] w-4 text-center leading-4 bg-blue-700 text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>
      </li>
    </ul>
  )
}

export default NavbarRight