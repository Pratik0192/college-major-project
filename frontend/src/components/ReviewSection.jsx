import React, { useContext, useEffect, useState } from "react";
import Lottie from "lottie-react";
import review_stars from "../assets/starrs.json"
import { ShopContext } from "../context/ShopContext";

const ReviewSection = ({ productId, productData }) => {

  const { backendUrl } = useContext(ShopContext);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/review/product/${productId}`);
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };

    fetchReviews();
  }, [productId, backendUrl]);

  return (
    <div className="mt-10 bg-white rounded-lg shadow-md p-6">
      <div className="flex gap-2 items-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Customer Reviews
        </h2>
        <Lottie animationData={review_stars} className="w-8 -mt-3" />
        <p className="text-gray-700 -mt-3">
          {productData.rating} ({productData.reviews} reviews)
        </p>
      </div>

      {reviews.length === 0 ? (
        <p className="text-gray-600">No reviews yet.</p>
      ) : reviews.length > 2 ? (
        <>
          <div className="space-y-4">
            {reviews.slice(0, 2).map((review) => (
              <div key={review._id} className="border-b pb-2">
                <p className="font-semibold text-gray-900">
                  {review.userId?.name || "Anonymous"}
                </p>
                <p className="text-gray-700">{review.review}</p>
                <span className="text-yellow-500 flex gap-2">
                  <Lottie animationData={review_stars} className="w-6" />
                  {review.rating}/5
                </span>
              </div>
            ))}
          </div>
          <button
            className="btn mt-4 bg-gray-200 text-blue-800 border-gray-100"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            View All Reviews
          </button>
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box bg-gray-100">
              <h3 className="font-bold text-lg text-blue-950">All Reviews</h3>
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review._id} className="border-b pb-2">
                    <p className="font-semibold text-gray-900">
                      {review.userId?.name || "Anonymous"}
                    </p>
                    <p className="text-gray-700">{review.review}</p>
                    <span className="text-yellow-500">
                      ⭐ {review.rating}/5
                    </span>
                  </div>
                ))}
              </div>
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review._id} className="border-b pb-2">
              <p className="font-semibold text-gray-900">
                {review.userId?.name || "Anonymous"}
              </p>
              <p className="text-gray-700">{review.review}</p>
              <span className="text-yellow-500">⭐ {review.rating}/5</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewSection;
