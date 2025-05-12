import couponModel from "../models/couponModel.js";

export const addCoupon = async(req, res) => {
  try {
    const { code, discountType, discountValue, maxDiscount, minOrderAmount, expiryDate } = req.body;

    const exists = await couponModel.findOne({ code: code.toUpperCase() });

    if(exists) {
      return res.json({ success: false, message: "Coupon code already exists" });
    }

    const newCoupon = new couponModel({
      code: code.toUpperCase(),
      discountType,
      discountValue,
      maxDiscount,
      minOrderAmount,
      expiryDate
    })

    await newCoupon.save();

    res.json({ success: true, message: "Coupon created successfully", coupon: newCoupon });

  } catch (error) {
    console.error("Coupon creation error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const getAllCoupons = async(req, res) => {
  try {
    const coupons = await couponModel.find().sort({ createdAt: -1 });
    res.json({ success: true, coupons });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}