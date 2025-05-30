import mongoose from "mongoose"

const OrderSchema = mongoose.Schema({
  userId: {type: String, required: true},
  items: {type: Array, required: true},
  amount: {type: Number, required: true},
  address: {type: Object, required: true},
  status: {
    type: String, 
    required: true, 
    enum:['Order Placed', 'Packing', 'Shipped', 'Out for Delivery', 'Delivered' ], 
    default: 'Order Placed'
  },
  paymentMethod: {type: String, required: true},
  payment: {type: Boolean, required: true, default: false},
  date: {type: Number, required: true}
})

const OrderModel = mongoose.models.order || mongoose.model('order', OrderSchema);
export default OrderModel;