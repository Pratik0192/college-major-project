import React, { useState, useRef, useEffect, useContext } from "react";
import logo from "../assets/new_logo.png";
import { Link } from "react-router-dom";
import {
  FaRegUserCircle,
  FaHeart,
  FaShoppingBag,
  FaSignOutAlt,
  FaBoxOpen,
  FaBars,
  FaTimes,
  FaThLarge,
} from "react-icons/fa";
import { ShopContext } from "../context/ShopContext";
import SearchBar from "./SearchBar";
import NavbarRight from "./NavbarRight";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { token, setToken, getCartCount, wishlistItems, navigate } =
    useContext(ShopContext);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }

      if (
        mobileDropdownRef.current &&
        !mobileDropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setWishlistCount(Object.keys(wishlistItems).length);
  }, [wishlistItems]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  return (
    <>
      {/* Drawer Toggle Button & Drawer Container */}
      <div className="drawer drawer-end md:hidden">
        <input
          id="mobile-drawer"
          type="checkbox"
          className="drawer-toggle"
          checked={mobileNavOpen}
          onChange={() => setMobileNavOpen(!mobileNavOpen)}
        />
        <div className="drawer-content">
          <header className="sticky top-0 bg-[#fafafa] border-b border-gray-300 shadow-sm z-50">
            <div className="flex justify-between items-center px-4 py-4">
              <Link to="/" className="flex gap-3 items-center">
                <img src={logo} alt="OptiVerse Logo" className="w-40" />
              </Link>
              <label htmlFor="mobile-drawer" className="cursor-pointer">
                <FaBars size={24} className="text-blue-950" />
              </label>
            </div>
          </header>
        </div>

        {/* Drawer Sidebar */}
        <div className="drawer-side z-50">
          <label
            htmlFor="mobile-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-64 min-h-full bg-white text-base-content">
            <div className="flex justify-between">
              <div className="text-xl font-bold text-blue-950 mb-4">
                {token ? t("welcome") : t("loginContinue")}
              </div>

              <FaTimes
                className="cursor-pointer text-xl text-gray-700"
                onClick={() => setMobileNavOpen(false)}
              />
            </div>

            {/* nav links */}
            <div className="flex flex-col justify-between h-full">
              <div>
                <li className="text-gray-700">
                  <Link to="/products" onClick={() => setMobileNavOpen(false)}>
                    <FaThLarge />
                    {t("allProducts")}
                  </Link>
                </li>
                {token && (
                  <li className="text-gray-700">
                    <Link to="/profile" onClick={() => setMobileNavOpen(false)}>
                      <FaRegUserCircle />
                      {t("profile")}
                    </Link>
                  </li>
                )}
                <li className="text-gray-700">
                  <Link to="/orders" onClick={() => setMobileNavOpen(false)}>
                    <FaBoxOpen />
                    {t("orders")}
                  </Link>
                </li>
                <li className="text-gray-700">
                  <Link to="/wishlist" onClick={() => setMobileNavOpen(false)}>
                    <FaHeart />
                    {t("wishlist")}
                    <span className="badge badge-sm bg-blue-700 text-white ml-auto">
                      {wishlistCount}
                    </span>
                  </Link>
                </li>
                <li className="text-gray-700">
                  <Link to="/cart" onClick={() => setMobileNavOpen(false)}>
                    <FaShoppingBag />
                    {t("cart")}
                    <span className="badge badge-sm bg-blue-700 text-white ml-auto">
                      {getCartCount()}
                    </span>
                  </Link>
                </li>
              </div>
              <div>
                {token && (
                  <li className="text-gray-700">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 text-left"
                    >
                      <FaSignOutAlt />
                      {t("logout")}
                    </button>
                  </li>
                )}
              </div>
              <div className="flex items-center gap-2 ml-3 mt-3">
                <button
                  onClick={() => {
                    i18n.changeLanguage("en");
                    localStorage.setItem("lang", "en");
                  }}
                  className={`text-sm px-2 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 ${
                    i18n.language === "en" ? "border-2 border-black" : ""
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => {
                    i18n.changeLanguage("hi");
                    localStorage.setItem("lang", "hi");
                  }}
                  className={`text-sm px-2 py-1 rounded bg-green-600 text-white hover:bg-green-700 ${
                    i18n.language === "hi" ? "border-2 border-black" : ""
                  }`}
                >
                  हिंदी
                </button>
              </div>
            </div>
          </ul>
        </div>
      </div>

      {/* Desktop Navbar */}
      <header className="hidden md:block sticky top-0 bg-[#fafafa] border-b border-gray-300 shadow-sm z-50">
        <div className="mx-auto flex justify-between items-center px-10 py-4">
          <Link to="/">
            <div className="flex items-center gap-3">
              <img src={logo} alt="OptiVerse Logo" className="w-60" />
            </div>
          </Link>
          <div className="flex bg-[#fafafa] items-center flex-grow mx-8">
            <SearchBar />
          </div>
          <div className="flex items-center gap-x-6">
            <NavbarRight />
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  i18n.changeLanguage("en");
                  localStorage.setItem("lang", "en");
                }}
                className={`text-sm px-2 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 ${
                  i18n.language === "en" ? "border-2 border-black" : ""
                }`}
              >
                EN
              </button>
              <button
                onClick={() => {
                  i18n.changeLanguage("hi");
                  localStorage.setItem("lang", "hi");
                }}
                className={`text-sm px-2 py-1 rounded bg-green-600 text-white hover:bg-green-700 ${
                  i18n.language === "hi" ? "border-2 border-black" : ""
                }`}
              >
                हिंदी
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
