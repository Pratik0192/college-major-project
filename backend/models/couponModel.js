import mongoose from "mongoose"

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },
  discountType: {
    type: String,
    enum: ['PERCENTAGE', 'FLAT'],
    default: 'PERCENTAGE'
  },
  discountValue: {
    type: Number,
    required: true
  },
  maxDiscount: {
    type: Number,
    default: null
  },
  minOrderAmount: {
    type: Number,
    default: 0
  },
  expiryDate: {
    type: Date,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

const couponModel = mongoose.models.coupon || mongoose.model("coupon", couponSchema);

export default couponModel