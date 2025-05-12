import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import tryon from '../assets/3d.jpg';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import TryOn from './TryOn';

const NavItem = ({ text, subItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { products } = useContext(ShopContext);

  // Define productId for specific categories
  const productIdMap = {
    "EYEGLASSES": "67b08c02dbb5e2974708eba6",
    "SCREEN GLASSES": "67cd50ab49ad01051e04c712",
    "KIDS GLASSES": "67a0d97582f66be488f1899b",
    "SUN GLASSES":"67c88108e217688a493099ad"

  };

  const productId = productIdMap[text];
  const product = products.find((p) => p._id === productId);

  return (
    <li
      className="relative cursor-pointer hover:text-blue-950"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Clicking on EYEGLASSES or SCREEN GLASSES navigates to their product */}
      <Link
        to={productId ? `/product/${productId}` : "/products"}
        className="relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 
        after:bg-blue-950 after:origin-left after:transition-transform after:duration-300 
        after:scale-x-0 hover:after:scale-x-100"
      >
        {text}
      </Link>

      {/* Dropdown content */}
      {isOpen && (
        <motion.ul
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="absolute left-0 mt-2 w-80 bg-white shadow-md rounded-md border z-50"
        >
          {product ? (
            <Link
              to={`/product/${product._id}`}
              onClick={() => setIsOpen(false)}
              className="flex gap-4 p-3 hover:bg-gray-100 transition"
            >
              <img
                src={product.image[0]}
                alt={product.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <p className="font-semibold text-gray-800">{product.name}</p>
                <p className="text-sm text-gray-600">Price: ₹{product.price}</p>
                <p className="text-sm text-gray-600">Rating: {product.rating}</p>

              </div>
            </Link>
          ) : (
            subItems &&
            subItems.map((item, index) => (
              <li key={index} className="px-4 py-2 hover:bg-gray-100 transition">
                <Link to="/products"> {item} </Link>
              </li>
            ))
          )}
        </motion.ul>
      )}
    </li>
  );
};



const Navbar1 = () => {
  const [showTryOn, setShowTryOn] = useState(false);

  const navItems = [
    { text: "EYEGLASSES"},
    { text: "SCREEN GLASSES"},
    { text: "KIDS GLASSES" },
    { text: "CONTACT LENSES", subItems: ["Daily", "Monthly", "Colored"] },
    { text: "SUN GLASSES" }
  ];

  return (
    <header className="hidden lg:block top-0 bg-gray-50 border-b border-gray-300 shadow-sm px-4 sm:px-10 py-2 z-40">
            {showTryOn && <TryOn onClose={() => setShowTryOn(false)} />}
      <div className="mx-auto px-4 py-4 flex items-center justify-between">
        {/* Navigation */}
        <ul className="hidden lg:flex items-center gap-8 text-blue-950 font-semibold">
          {navItems.map((item, index) => (
            <NavItem key={index} text={item.text} subItems={item.subItems} />
          ))}
        </ul>

        {/* Logo */}
        <div className='tooltip tooltip-left' data-tip="Click to virtually try on products!">
            <img
              src={tryon}
              className="w-16 sm:w-20 mx-auto lg:mx-0 cursor-pointer"
              alt="Try on"
              onClick={() => setShowTryOn(true)}
            />
        </div>
      </div>
    </header>
  );
};

export default Navbar1;
