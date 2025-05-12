import { Activity, Layers, LocateFixedIcon } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext'
import assets from  '../assets/picuser.jpg'
import axios from 'axios';

const Profile = () => {
  const {backendUrl,token} = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      //console.log(response.data.orders);

      if (response.data.success) {
        setOrderData(response.data.orders)
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);
  console.log(orderData);



  return (
    <>
      {token ?(
        <div className='text-gray-900 text-center py-12 ' > 
          <div className='bg-gray-300 items-center text-center justify-center py-6 w-3/4 mx-auto flex justify-evenly' >
            <img src={assets} alt="" className='w-12 h-12 lg:w-32 lg:h-32 ml-2 rounded-full'/>
            <h1 className='text-sm lg:text-2xl text-center items-center' >Hi you can manage your addresses and orders from here!</h1>
          </div>
          <div className='flex items-center text-center justify-center'>
              <Layers className='mr-2' /> {/* Add margin to the right of the icon */}
              <h1 className='text-2xl mt-2 text-blue-950'>Orders History</h1>
          </div>
          <Link to='/orders' >
          <button className='bg-blue-500 rounded-full w-32 h-7 cursor-pointer mt-2 text-white'>Manage Orders</button>
          </Link>
          
          <div className='items-center text-center justify-center py-6 w-3/4 mx-auto justify-evenly grid grid-cols-1 lg:grid-cols-2 ' >
          {orderData.length > 0 ? (
          orderData.map((order, index) => (
            <div key={index} className="card bg-white">
              <div className="card-body flex flex-col md:flex-row items-start gap-6 ">
                <img
                  src={order.items[0].image[0]}
                  alt={order.items[0].name}
                  className="w-32 h-32 object-cover rounded items-center justify-center"
                />
                <div className=" border border-gray-300 flex-1 text-gray-800 space-y-1">
                  <div className="font-semibold text-xl">
                    {order.items[0].name}
                    <p className="text-sm" >
                      Total Price: ₹{order.amount}
                    </p>
                    <p className="text-sm" >
                      Quantity: {order.items[0].quantity}
                    </p>
                  </div>
                  <div className=" text-sm" >
                    <hr className="text-gray-300" />
                    <p className="mt-2" >Brand: {order.items[0].brand}</p>
                    <p>Size: {order.items[0].size}</p>
                    <p>Price: ₹{order.items[0].price}</p>
                    <p>Discounted Price: ₹{order.items[0].discounted_price}</p>
                    <p>Payment Method: {order.paymentMethod}</p>
                    <p>Order Date: {new Date(order.date).toLocaleDateString()}</p>
                  </div>
                </div>

              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No orders found.</p>
        )}
        </div>

        <div className='flex items-center text-center justify-center'>
          <LocateFixedIcon  className='mr-2' />
          <h1 className='text-2xl mt-2 text-blue-950'>Saved Addresses</h1>
        </div>
        <div className='items-center text-center justify-center py-6 w-3/4 mx-auto justify-evenly grid grid-cols-1 lg:grid-cols-2 ' >
        {orderData.length > 0 ? (
          orderData.map((order, index) => (
            <div key={index} className="card bg-white">
              <div className="card-body flex flex-col md:flex-row items-start gap-6 ">
                <div className="border border-gray-300 flex-1 text-gray-800 space-y-1">
                  <p className="font-semibold text-xl" >
                      Deliver to : {order.address.firstName}
                  </p>
                  <p className="text-md" >
                      Country: {order.address.country}
                  </p>
                  <p className="text-md" >
                      State: {order.address.state}
                  </p>
                  <p className="text-md" >
                      City: {order.address.city}
                  </p>
                  <p className="text-md" >
                      Street: {order.address.street}
                  </p>
                  <p className="text-md" >
                      Zipcode: {order.address.zipcode}
                  </p>
                  
                </div>
              </div>
            </div>
          )) 
          ): (
            <p className="text-center text-gray-500">No address found.</p>
            )
        }

        </div>

        
        </div>
      ) : (
        <div className='text-gray-900 text-center py-12' >
          <div className="mx-auto w-24 h-24 flex items-center justify-center bg-gray-100 rounded-full mb-4">
            <Activity />
          </div>
          <h1 className='text-2xl' > Login to view your profile! </h1>
           <Link
            to="/login"
            className="btn btn-primary px-6 py-2 mt-4 rounded-full"
          >
            Login
          </Link>
          </div>
      )
      }
    </>
  )
}

export default Profile