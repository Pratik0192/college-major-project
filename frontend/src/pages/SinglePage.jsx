import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { Heart } from "lucide-react";
import Loading from "../components/Loading";
import Cartjson from "../assets/cartt.json";
import Lottie from "lottie-react";
import ReviewSection from "../components/ReviewSection";
import RelatedProducts from "../components/RelatedProducts";
import TechnicalAndWarranty from "../components/TechnicalAndWarranty";
import ProductRightDetails from "../components/ProductRightDetails";
import ProductLeftImage from "../components/ProductLeftImage";

const SinglePage = () => {
  const { products, addToCart } = useContext(ShopContext);
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [openSections, setOpenSections] = useState({ technicalInfo: false });
  const [size, setSize] = useState("");

  useEffect(() => {
    const fetchProductData = () => {
      const foundProduct = products.find((item) => item._id === productId);
      if (foundProduct) {
        setProductData(foundProduct);

        // Find related products (same category or similar products)
        const related = products
          .filter(
            (item) =>
              item._id !== productId &&
              (item.category === foundProduct.category ||
                item.name.includes(foundProduct.name.split(" ")[0]))
          )
          .slice(0, 4); // Limit to 4 related products

        setRelatedProducts(related);
      }
    };

    fetchProductData();
  }, [productId, products]);

  if (!productData) {
    return (
      <>
        <div className="flex justify-center items-center h-64">
          <Loading />
        </div>
      </>
    );
  }

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="bg-white">
      {/* Product Details Section */}
      <div className="container mx-auto py-8 bg-white">
        <div className="flex flex-col md:flex-row gap-4 lg:gap-8 mt-2 ring-blue-950">
          {/* Left Side - Product Images */}
          <ProductLeftImage productData={productData} />

          {/* Right Side - Product Description */}
          <div className="w-full md:w-1/2 lg:px-4 shadow-sm">
            <div className="bg-white rounded-lg p-6">
              {/* Pricing Section */}
              <div className="flex flex-wrap items-center justify-between text-gray-700">
                <span className="text-3xl sm:text-4xl text-gray-700 line-through">
                  ₹{productData.price}.00
                </span>
                <span className="hidden md:block ml-2 bg-yellow-200 text-yellow-900 font-medium">
                  {Math.round(
                    ((productData.price - productData.discounted_price) /
                      productData.price) *
                      100
                  )}
                  % OFF
                </span>
                <div className="ml-auto text-green flex items-center">
                  <span className="inline-block">
                    <Lottie animationData={Cartjson} className="w-[50px]" />
                  </span>
                  <p className="text-green-700 ml-2 text-sm md:text-lg">
                    In Stock
                  </p>
                </div>
              </div>

              <ProductRightDetails productData={productData} />

              {/* Product Details */}
              <div className="space-y-3 mb-4">
                <p className="text-gray-700">
                  <span className="font-medium">Power:</span>{" "}
                  {productData.power || "Zero Power"}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Frame Color:</span>{" "}
                  {productData.frameColour}
                </p>

                {/* Select Size */}
                <div className="flex flex-col gap-4">
                  <p className="font-medium text-gray-700">Select Size:</p>
                  <div className="flex gap-2 flex-wrap">
                    {productData.sizes.map((item, index) => {
                      const displaySize =
                        item === "small"
                          ? "S"
                          : item === "medium"
                          ? "M"
                          : item === "large"
                          ? "L"
                          : item;
                      return (
                        <button
                          onClick={() => setSize(item)}
                          className={`btn btn-soft text-lg text-black h-12 w-12 ring-1 ring-blue-900 cursor-pointer transition ${
                            item === size
                              ? "bg-blue-500 text-white"
                              : "bg-gray-100"
                          }`}
                          key={index}
                        >
                          {displaySize}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {productData.description && (
                  <p className="text-gray-700">{productData.description}</p>
                )}
              </div>

              {/* Buttons Section */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <button
                  onClick={() => addToCart(productData._id, size)}
                  className="px-6 py-2 w-full md:w-70  font-medium bg-blue-800 rounded text-white text-2xl transition-all shadow-md hover:shadow-none cursor-pointer"
                >
                  Add to Cart
                </button> 
                <Link
                  to="/wishlist"
                  className="hidden md:block cursor-pointer text-black hover:text-blue-500 flex items-center gap-2"
                >
                  <Heart className="w-6 h-6 sm:w-11 sm:h-11 text-blue-800" />
                </Link>
              </div>

              <TechnicalAndWarranty productData={productData} />
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <RelatedProducts relatedProducts={relatedProducts} />

        {/* Reviews Section */}
        <ReviewSection productId={productId} productData={productData} />
      </div>
    </div>
  );
};

export default SinglePage;
