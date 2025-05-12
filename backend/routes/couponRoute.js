import express from "express"
import { addCoupon, getAllCoupons } from "../controllers/couponController.js"


const couponRouter = express.Router()

couponRouter.post("/add", addCoupon);
couponRouter.get("/get", getAllCoupons);

export default couponRouter;