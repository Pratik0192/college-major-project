import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { PackageCheck } from 'lucide-react';

const PendingOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchPendingOrders = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/order/list');
      if (response.data.success) {
        const pending = response.data.orders.filter(order => order.status === 'Order Placed');
        setOrders(pending);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchPendingOrders();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <h3>Pending Orders</h3>
      <div className="flex flex-col gap-4">
        {orders.map((order, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text:sm text-gray-700"
          >
            <PackageCheck />
            <div>
              <div>
                {order.items.map((item, idx) => (
                  <p className="py-0.5" key={idx}>
                    {item.name} x {item.quantity} <span>{item.size}</span>
                    {idx !== order.items.length - 1 && ','}
                  </p>
                ))}
              </div>
              <p className="mt-3 mb-2 font-medium">
                {order.address.firstName + ' ' + order.address.lastName}
              </p>
              <div>
                <p>{order.address.street + ','}</p>
                <p>
                  {order.address.city +
                    ', ' +
                    order.address.state +
                    ', ' +
                    order.address.country +
                    ', ' +
                    order.address.zipcode}
                </p>
              </div>
              <p>{order.address.phone}</p>
            </div>
            <div>
              <p className="text-sm sm:text-[15px]">Items: {order.items.length}</p>
              <p className="mt-3">Method: {order.paymentMethod}</p>
              <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p className="text-sm sm:text-[15px]">{order.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingOrders;
