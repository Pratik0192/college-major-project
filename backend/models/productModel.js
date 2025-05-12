import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  discounted_price: { type: Number, required: true },
  image: { type: Array, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  sizes: { type: Array, required: true },
  frameWidth: { type: String, required: true },
  frameDimensions: { type: String, required: true },
  frameColour: { type: String, required: true },
  brand: { type: String, required: true },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
}, {timestamps: true})

const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;