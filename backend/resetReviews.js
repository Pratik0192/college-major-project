import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

import connectDB from "./config/mongodb.js";

const productSchema = new mongoose.Schema({}, { strict: false });
const Product = mongoose.model('product', productSchema, "products");

const resetRatingsAndReviews = async() => {
  await connectDB();

  const result = await Product.updateMany({}, {
    $set: {
      rating: 0,
      reviews: 0
    }
  })
  console.log("update results", result);
  mongoose.disconnect();
}

resetRatingsAndReviews();