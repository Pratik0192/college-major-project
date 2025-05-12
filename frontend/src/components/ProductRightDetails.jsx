import React, { useEffect, useState } from "react";
import { Check, Truck } from "lucide-react";
import stripe from "../assets/stripe_logo.png";
import razorpay from "../assets/razorpay_logo.png";
import tryon from "../assets/3d.jpg";
import Lottie from "lottie-react";
import wallet from "../assets/wallet.json";
import review_stars from "../assets/starrs.json";
import TryOn from "./TryOn";

const ProductRightDetails = ({ productData }) => {
  const [countdown, setCountdown] = useState(3600);
  const [showTryOn, setShowTryOn] = useState(false);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return { minutes, seconds: secs };
  };

  const { minutes, seconds } = formatTime(countdown);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
    {/* TryOn Modal */}
      {showTryOn && <TryOn onClose={() => setShowTryOn(false)} />}
      <div className="flex flex-wrap items-center justify-between text-gray-700 ">
        <span className="text-4xl md:text-6xl font-bold text-gray-900">
          {" "}
          ₹{productData.discounted_price}{" "}
        </span>
        <div className="ml-auto text-green flex">
          <Truck className="w-5 md:w-7" />
          <p className="ml-2 text-sm md:text-lg">Shipping</p>
        </div>
      </div>

      {/* Rating Section */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs sm:text-sm text-yellow-600 bg-yellow-100 px-2 py-1 rounded flex gap-2">
          <Lottie animationData={review_stars} className="w-4" />
          {productData.rating}({productData.reviews} reviews)
        </span>
        {/* Try-On Image */}
        <div className="mb-6">
          <div
            className="tooltip tooltip-left"
            data-tip="Click to virtually try on products!"
          >
            <img
              src={tryon}
              className="w-16 sm:w-20 mx-auto lg:mx-0 cursor-pointer"
              alt="Try on"
              onClick={() => setShowTryOn(true)}
            />
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="text-gray-800 mb-4">
        <h3 className="text-2xl font-bold">Benefits</h3>
        <span className="text-gray-800 flex mt-2">
          <Check className="text-green-600" />{" "}
          <p className="ml-2">UV protection</p>
        </span>
        <span className="text-gray-800 flex mt-2">
          <Check className="text-green-600" />{" "}
          <p className="ml-2">Polarization</p>
        </span>
        <span className="text-gray-800 flex mt-2">
          <Check className="text-green-600" />{" "}
          <p className="ml-2">Anti-reflective Lenses</p>
        </span>
      </div>

      {/* Countdown for Free Delivery */}
      <div className="mt-4 text-sm md:text-lg font-semibold text-gray-900 mb-2">
        Free delivery if ordered within{" "}
        <span className="text-red-500">
          {minutes}m {seconds}s
        </span>
      </div>

      <div className="ml-auto text-black gap-2 flex items-center">
        <Lottie animationData={wallet} className="w-[50px] lg:w-[100px]" />
        <p className="text-black ml-2 text-sm md:text-lg">Pay via</p>
        <img src={stripe} alt="" className="w-10 lg:w-20" />
        |
        <img src={razorpay} alt="" className="w-14 lg:w-28" />
      </div>
    </>
  );
};

export default ProductRightDetails;
