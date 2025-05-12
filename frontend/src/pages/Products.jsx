import React, { useContext, useState, useEffect } from "react";
import ProductItem from "../components/ProductItem";
import SidebarFilters from "../components/SidebarFilters";
import { ShopContext } from "../context/ShopContext";
import Loading from "../components/Loading";
import { CiFilter } from "react-icons/ci";
import { useTranslation } from "react-i18next";

const Products = () => {
  const { t } = useTranslation();
  const { products } = useContext(ShopContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  const [sortOption, setSortOption] = useState("recommended");

  useEffect(() => {
    if (products.length > 0) {
      setFilteredProducts(products);
      setLoading(false);
    }
  }, [products]);

  useEffect(() => {
    // Sort products based on the selected option
    const sortProducts = (option) => {
      let sortedProducts;
      if (option === "price-low-high") {
        sortedProducts = [...products].sort((a, b) => a.price - b.price);
      } else if (option === "price-high-low") {
        sortedProducts = [...products].sort((a, b) => b.price - a.price);
      } else if (option === "popularity") {
        sortedProducts = [...products].sort((a, b) => b.reviews - a.reviews);
      } else if (option === "top-rated") {
        sortedProducts = [...products].sort((a, b) => b.rating - a.rating);
      } else {
        sortedProducts = [...products]; // Default "recommended" state: no sorting
      }
      setFilteredProducts(sortedProducts);
    };

    sortProducts(sortOption);
  }, [sortOption, products]);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Number of total pages
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <>
      <div className="mx-2 md:mx-10 bg-white mt-10">
        <div className="flex w-full justify-center">
          {/* Sidebar (1/4) md and lg*/}
          <div className="hidden md:block">
            <SidebarFilters setFilteredProducts={setFilteredProducts} />
          </div>
          {/* Main Content (3/4) */}
          <div className="w-full md:w-3/4">
            <div className="flex justify-end mb-4">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="border text-gray-700 border-gray-300 p-2 rounded-md text-sm"
              >
                <option value="recommended">{t("recommended")}</option>
                <option value="price-high-low">{t("priceHighLow")}</option>
                <option value="price-low-high">{t("priceLowHigh")}</option>
                <option value="popularity">{t("popularity")}</option>
                <option value="top-rated">{t("topRated")}</option>
              </select>
            </div>

            {/* Show Loading while fetching products */}
            {loading ? (
              <Loading />
            ) : (
              <>
                {/* Product Grid */}
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-6 lg:p-4 mt-2">
                  {currentProducts.map((item, index) => (
                    <ProductItem key={index} product={item} />
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center my-8 ">
                  <div className="join">
                    <button
                      className="join-item btn border-none bg-blue-500 mr-1"
                      onClick={() =>
                        currentPage > 1 && setCurrentPage(currentPage - 1)
                      }
                      disabled={currentPage === 1}
                    >
                      «
                    </button>

                    {Array.from({ length: totalPages }, (_, index) => (
                      <button
                        key={index}
                        className={`join-item btn border-none bg-blue-500 ${
                          currentPage === index + 1 ? "btn-active bg-blue-800" : ""
                        }`}
                        onClick={() => setCurrentPage(index + 1)}
                      >
                        {index + 1}
                      </button>
                    ))}

                    <button
                      className="join-item btn border-none ml-1 bg-blue-500"
                      onClick={() =>
                        currentPage < totalPages &&
                        setCurrentPage(currentPage + 1)
                      }
                      disabled={currentPage === totalPages}
                    >
                      »
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer (DaisyUI Drawer Side) */}
      <div className="md:hidden">
        {/* Drawer Toggle Button - Bottom Right */}
        <button
          className="fixed bottom-6 right-6 z-10 bg-blue-800 text-white p-3 rounded-full shadow-lg"
          onClick={() =>
            (document.getElementById("filter-drawer").checked = true)
          }
        >
          <i className="text-xl">
            <CiFilter />
          </i>
        </button>

        {/* Drawer Setup */}
        <div className="drawer drawer-end z-40">
          <input id="filter-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-side">
            <label htmlFor="filter-drawer" className="drawer-overlay"></label>
            <div className="menu p-4 w-72 min-h-full bg-white text-black">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Filters</h3>
                <label htmlFor="filter-drawer" className="btn btn-sm btn-ghost">
                  ✕
                </label>
              </div>
              <SidebarFilters setFilteredProducts={setFilteredProducts} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
