import express from "express"
import cors from "cors"
import 'dotenv/config'
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import userRouter from "./routes/userRoutes.js"
import productRouter from "./routes/productRoutes.js"
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"
import wishlistRouter from "./routes/wishlistRoute.js"
import couponRouter from "./routes/couponRoute.js"
import reviewRouter from "./routes/reviewRoute.js"

//app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

//middleware
app.use(cors({ origin: "*" }))
app.use(express.json())


//api endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/wishlist', wishlistRouter);
app.use('/api/coupon', couponRouter);
app.use('/api/review', reviewRouter);

app.get('/', (req, res) => {
  res.send("API working")
})

app.listen(port, ()=>console.log('Server Started on PORT: '+port))