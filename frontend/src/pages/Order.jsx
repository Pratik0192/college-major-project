import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const Order = () => {
  const { t } = useTranslation()
  const { navigate, backendUrl, token } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [ selectedOrder, setSelectedOrder ] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");

  const statusSteps = [
    "Order Placed",
    "Packing",
    "Shipped",
    "Out for Delivery",
    "Delivered",
  ]

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      //console.log(response.data.orders);

      if (response.data.success) {
        setOrderData(response.data.orders)
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleAddReview = async() => {
    try {
      const res = await axios.post(backendUrl + '/api/review/add', {
        userId: selectedOrder.userId,
        productId: selectedProduct._id,
        orderId: selectedOrder._id,
        rating: Number(rating),
        review: reviewText,
      }, { headers: { token } });
      if(res.data.review) {
        toast.success("Review Added Successfully");
        document.getElementById("review_modal").close();
        setRating(5);
        setReviewText("")
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(() => {
    loadOrderData();
  }, [token]);

  console.log(orderData);
  
  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-sm shadow-gray-200 p-6 rounded-md">
        <div className="flex justify-between" >
          <div className="flex gap-3" >
            <h2 className="text-sm lg:text-2xl text-black font-semibold mb-4">{t("PurchaseSummary")} </h2>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5cca21" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-big"><path d="M21.801 10A10 10 0 1 1 17 3.335"/><path d="m9 11 3 3L22 4"/></svg>
          </div>
          <button
            className="hidden lg:block btn text-sm btn-primary w-20 lg:w-40"
            onClick={() => navigate("/")}
          >
            {t("ContinueShopping")}
          </button>
        </div>
        {orderData.length > 0 ? (
          orderData.map((order, index) => (
            <div key={index} className="mt-2 card bg-white ring-2 ring-gray-200 shadow-xl">
              <div className="card-body flex flex-col md:flex-row items-center gap-6">
                <img
                  src={order.items[0].image[0]}
                  alt={order.items[0].name}
                  className="w-24 h-24 lg:w-36 lg:h-36 object-cover rounded"
                />
                <div className="collapse collapse-arrow join-item border border-gray-300 flex-1 text-gray-800 space-y-1">
                  <input type="radio" name="my-accordion-4" defaultChecked />
                  <div className="collapse-title font-semibold text-md lg:text-xl">
                    {order.items[0].name}
                    <p className="text-sm" >
                      Total Price: ₹{order.amount}
                    </p>
                    <p className="text-sm" >
                      Quantity: {order.items[0].quantity}
                    </p>
                    <p className="text-sm" >
                      Payment: {order.paymentMethod === "COD" ? "Pending" : "Paid"}
                    </p>
                  </div>
                  <div className="collapse-content text-sm" >
                    <hr className="text-gray-300" />
                    <p className="mt-2" >Brand: {order.items.brand}</p>
                    <p>Category: {order.items[0].category}</p>
                    <p>Size: {order.items[0].size}</p>
                    <p>Price: ₹{order.items[0].price}</p>
                    <p>Discounted Price: ₹{order.items[0].discounted_price}</p>
                    <p>Payment Method: {order.paymentMethod}</p>
                    <p>Status: <span className="badge badge-success">{order.status}</span></p>
                    <p>Order Date: {new Date(order.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="self-center flex flex-row gap-4 md:flex-col md:gap-1 items-center ">
                  <button 
                    className="bg-blue-500 text-white font-semibold p-2 rounded-md cursor-pointer border border-blue-500 hover:bg-white hover:text-blue-500 w-16 h-8 lg:w-32 lg:h-12" 
                    onClick={() => {
                      setSelectedOrder(order);
                      document.getElementById("track_order_modal").showModal();
                    }}
                  >
                    {t("TrackOrder")}
                  </button>
                  {/* track order model */}
                  <dialog id="track_order_modal" className="modal">
                    <div className="modal-box bg-white text-gray-800">
                      <h3 className="font-bold text-lg mb-2">Tracking Order: {selectedOrder?.name}</h3>
                      <ul className="steps steps-vertical">
                        {statusSteps.map((step, i) => (
                          <li
                            key={i}
                            className={`step ${
                              selectedOrder &&
                              statusSteps.findIndex(s => s.toLowerCase() === selectedOrder.status.toLowerCase()) >= i
                                ? "step-primary"
                                : ""
                            }`}
                          >
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                      <button>close</button>
                    </form>
                  </dialog> 
                  {/* button cancel order */} 
                  { order.status.toLowerCase() !== "delivered" &&          
                  <button className="bg-red-500 text-white font-semibold p-2 rounded-md cursor-pointer border broder-red-500 hover:bg-white hover:text-red-500 w-16 h-8 lg:w-32 lg:h-12">
                    {t("CancelOrder")}
                  </button>
                  }
                  {order.status.toLowerCase() === "delivered" && (
                    <button 
                      className="bg-green-500 text-white font-semibold p-2 rounded-md cursor-pointer border border-green-500 hover:bg-white hover:text-green-500 w-16 h-8 lg:w-32 lg:h-12"
                      onClick={() => {
                        setSelectedOrder(order);
                        setSelectedProduct(order.items[0]);
                        document.getElementById("review_modal").showModal();
                      }}
                    >
                      {t("AddReview")}
                    </button>
                  )}
                </div>
              </div>
              <hr className="text-gray-400" />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No orders found.</p>
        )}
      </div>

      {/* add review modal */}
      <dialog id="review_modal" className="modal">
  <div className="modal-box bg-white text-gray-800">
    <h3 className="font-bold text-lg mb-4">Write a Review</h3>
    <div className="form-control mb-4 flex flex-col gap-2">
      <label className="label text-gray-800">Rating (1-5)</label>
      <div className="rating">
        {[1, 2, 3, 4, 5].map((r) => (
          <React.Fragment key={r}>
            <input
              type="radio"
              name="rating"
              className="mask mask-star bg-yellow-600"
              aria-label={`${r} star`}
              value={r}
              checked={rating === r.toString()} // Ensure the correct radio is checked
              onChange={(e) => setRating(e.target.value)} // Update state on change
            />
          </React.Fragment>
        ))}
      </div>
    </div>
    <div className="form-control mb-4 flex flex-col gap-2">
      <label className="label text-gray-800">Review</label>
      <textarea
        className="textarea border-gray-400 bg-white w-full"
        placeholder="Write your thoughts..."
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
      />
    </div>
    <div className="modal-action">
      <form method="dialog">
        <button className="btn">Cancel</button>
      </form>
      <button
        className="btn btn-primary"
        onClick={handleAddReview}
      >
        Submit
      </button>
    </div>
  </div>
</dialog>
    </div>
  );
};

export default Order;