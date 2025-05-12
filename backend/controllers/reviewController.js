import reviewModel from "../models/reviewModel.js";
import OrderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";

export const addReview = async(req, res) => {
  try {
    const { userId, productId, orderId, rating, review } = req.body;

    const order = await OrderModel.findOne({ _id: orderId, userId })

    if(!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if(order.status !== "Delivered") {
      return res.status(400).json({ message: "You can only review after delivery" });
    }

    const orderedProduct = order.items.find(item => item._id === productId);

    if(!orderedProduct) {
      return res.status(400).json({ message: "Product not found in order" });
    }

    const  alreadyReviewed = await reviewModel.findOne({ userId, productId, orderId });
    if(alreadyReviewed) {
      return res.status(400).json({ message: "Already reviewed this product for this order" });
    }

    const newReview = new reviewModel({ userId, productId, orderId, rating, review });
    await newReview.save();

    const allProductReviews = await reviewModel.find({ productId });
    const totalRating = allProductReviews.reduce((acc, r) => acc + r.rating, 0);
    const avgRating = totalRating / allProductReviews.length;

    await productModel.findByIdAndUpdate(productId, {
      rating: avgRating.toFixed(1),
      reviews: allProductReviews.length
    })

    res.status(201).json({ message: "Review Added Successfully", review: newReview })

  } catch (error) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

export const getProductReviews = async(req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await reviewModel.find({ productId }).populate("userId", "name");
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "server error", error: err.message })
  }
}