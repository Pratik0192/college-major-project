import React, { useContext, useEffect, useState } from "react";
import stripelogo from "../assets/stripe_logo.png";
import razorpaylogo from "../assets/razorpay_logo.png"
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import toast from "react-hot-toast"
import Lottie from 'lottie-react'
import Coupon from '../assets/coupon.json';
import truck from '../assets/shipping.json';
import del from '../assets/delivery.json';
import { useTranslation } from "react-i18next";

const Shipping = () => {
  const { t } = useTranslation()
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const { navigate, backendUrl, token, getCartAmount, cartItems, setCartItems, products, delivery_fee,} = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  console.log(getCartAmount());
  

  let discountAmount = 0;

  if(selectedCoupon) {
    const matched = coupons.find((c) => c.code === selectedCoupon);

    if(matched) {
      discountAmount = Math.round((getCartAmount() * matched.discountValue) / 100);
    }
  }

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response);
        try {
          const { data } = await axios.post(backendUrl + '/api/order/verifyrazorpay', response, {headers: {token}})
          if(data.success) {
            navigate('/orders')
            setCartItems({})
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const onSubmitHandler = async(e) => {
    setLoading(true);
    e.preventDefault();
    try {

      let orderItems = []

      for(const items in cartItems) {
        for(const item in cartItems[items]) {
          if(cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if(itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee - discountAmount,
      }

      switch(paymentMethod) {
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place', orderData, {headers: {token}})
          console.log(response.data);
          if(response.data.success) {
            toast.success("Order Placed")
            setCartItems({})
            setTimeout(() => {
              navigate('/orders')
            }, 3000);
          } else {
            toast.error(response.data.message)
          }
          break;
        
        case 'stripe':
          const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, {headers: {token}})
          if(responseStripe.data.success) {
            const { session_url } = responseStripe.data
            window.location.replace(session_url)
          } else {
            toast.error(responseStripe.data.message)
          }
          break

        case 'razorpay':
          const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, { headers: {token}})
          if(responseRazorpay.data.success) {
            console.log(responseRazorpay.data.order);
            initPay(responseRazorpay.data.order)
          }
          break;

        default:
          break;
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const fetchCoupons = async() => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/coupon/get`);
        setCoupons(data?.coupons || []);
        console.log(coupons);
        
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch coupons");
      }
    }

    fetchCoupons()
  }, [])

  return (
    <form className="bg-white min-h-screen p-4 text-gray-700" onSubmit={onSubmitHandler}>
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">
       {/* Left Side: Shipping Form */}
      <div className="w-full lg:w-2/3 bg-white shadow-md p-6 rounded-md">
        <h2 className="text-2xl font-semibold mb-4 text-black">{t("ShippingDetails")}</h2>

        <div className="flex justify-between" >
        <span className="hidden md:block" > <Lottie animationData={truck} className='w-40' /> </span>

        <fieldset className="fieldset w-full bg-white text-black border border-gray-500 p-4 rounded-box">
          <legend className="fieldset-legend text-lg font-semibold text-black">{t("PersonalInformation")}</legend>
          <div className="flex justify-between gap-4">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={onChangeHandler}
              className="input w-full bg-gray-300"
              placeholder="First name"
              required
            />
            
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={onChangeHandler}
              className="input w-full bg-gray-300"
              placeholder="Last name"
              required
            />
          </div>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChangeHandler}
            className="input w-full bg-gray-300"
            placeholder="example@example.com"
            required
          />
        </fieldset>

        </div>

        <div className="flex justify-between" >

        <fieldset className="fieldset w-full border bg-white border-gray-500 p-4 rounded-box mt-4">
          <legend className="fieldset-legend text-lg font-semibold text-black">{t("AddressDetails")}</legend>
          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={onChangeHandler}
            className="input w-full bg-gray-300"
            placeholder="Street"
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-3 bg-white gap-4">
            <div>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={onChangeHandler}
                className="input w-full bg-gray-300"
                placeholder="City"
                required
              />
            </div>

            <div>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={onChangeHandler}
                className="input w-full bg-gray-300"
                placeholder="state"
                required
              />
            </div>

            <div>
              <input
                type="number"
                name="zipcode"
                value={formData.zipcode}
                onChange={onChangeHandler}
                className="input w-full bg-gray-300"
                placeholder="zipcode"
                required
              />
            </div>
          </div>

          <div className="flex justify-between gap-4" >
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={onChangeHandler}
              className="input w-full bg-gray-300"
              placeholder="country"
              required
            />

            <input
              type="number"
              name="phone"
              value={formData.phone}
              onChange={onChangeHandler}
              className="input w-full bg-gray-300"
              placeholder="phone"
              required
            />
          </div>
        </fieldset>
        <span className="hidden md:block mt-10" > <Lottie animationData={del} className='w-80' /> </span>

        </div>

      </div>

        {/* Right Side: Bill Details */}
        <div className="w-full lg:w-1/3 bg-white shadow-md p-6 rounded-md">
          <h2 className="text-2xl font-semibold mb-4">{t("BillDetails")}</h2>

          <div className="flex justify-between py-2">
            <span>{t("Discount")}</span>
            <span className="font-medium">₹{discountAmount}</span>
          </div>

          <div className="flex justify-between py-2">
            <span>{t("DeliveryFee")}</span>
            <span>₹{delivery_fee}</span>
          </div>

          <div className="flex justify-between py-2 font-semibold text-lg">
            <span>{t("Payable")}</span>
            
            <span>
            {discountAmount > 0 && (
              <span className="line-through text-blue-950 text-sm mr-2">₹{getCartAmount() + delivery_fee}</span>
            )}
              
              ₹{getCartAmount() + delivery_fee - discountAmount}</span>
          </div>

          <div className="mt-1">
            <label className="block mb-1 text-xl font-medium">{t("ApplyCoupon")}  <span className="inline-block" > <Lottie animationData={Coupon} className='w-[35px]'  /> </span> </label>
            <select
              value={selectedCoupon || ""}
              onChange={(e) => setSelectedCoupon(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md"
            >
              <option value="" className="text-center mt-2" >-- Select a Coupon --</option>
              {coupons.map((coupon) => (
                <option key={coupon._id} value={coupon.code}>
                  {coupon.code} - {coupon.discount}% OFF
                </option>
              ))}
            </select>
            {selectedCoupon && (
              <p className="text-sm text-green-600 mt-1">
                Coupon Applied: {selectedCoupon} ({coupons.find(c => c.code === selectedCoupon)?.discountValue}% OFF)
              </p>
            )}
          </div>
          
          <button className="w-full btn border border-gray-300 p-2 rounded-md mt-2 text-gray-700" disabled>
            Apply Insurance
          </button>

          {/* Payment Method */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold">{t("PaymentMethod")}</h3>
            <div className="items-center gap-4 mt-2">
              <label className="flex items-center gap-2 cursor-pointer mb-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="stripe"
                  checked={paymentMethod === "stripe"}
                  onChange={() => setPaymentMethod("stripe")}
                  className="w-4 h-4 radio radio-primary checked:bg-white bg-white"
                />
                <img className='h-5' src={stripelogo} alt="" />
              </label>

              <label className="flex items-center gap-2 cursor-pointer mb-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="razorpay"
                  checked={paymentMethod === "razorpay"}
                  onChange={() => setPaymentMethod("razorpay")}
                  className="w-4 h-4 radio radio-primary checked:bg-white  bg-white"
                />
                <img className='h-5' src={razorpaylogo} alt="" />
              </label>

              <label className="flex items-center gap-2 bg-white cursor-pointer mb-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  className="w-4 h-4 radio radio-primary checked:bg-white  bg-white"
                />
                <span className="">Cash on Delivery</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 text-white font-semibold p-3 rounded-md mt-4 cursor-pointer hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Processing..." :  "Place Order"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Shipping;