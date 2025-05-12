import express from "express"
import { addReview, getProductReviews } from "../controllers/reviewController.js"

const reviewRouter = express.Router();

reviewRouter.post("/add", addReview);
reviewRouter.get("/product/:productId", getProductReviews);

export default reviewRouter