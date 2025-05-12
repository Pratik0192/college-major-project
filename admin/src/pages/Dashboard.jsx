import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Widget from '../components/Widget'
import { ShoppingCart, Users, Package, CheckCircle, BarChart } from "lucide-react";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from "chart.js";
import { backendUrl,currency } from '../App';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);


const Dashboard = () => {
  const [products, setProducts] = useState([]);

  const [allOrders, setAllOrders] = useState([])
  const [totalUsers, setTotalUsers] = useState(0);
  const [orders, setOrders] = useState([])

  const fetchAllOrders = async() => {
    try {
      const response = await axios.get(backendUrl + '/api/order/list');
      //console.log(response.data);
      if(response.data.success) {
        setOrders(response.data.orders)
        setAllOrders(response.data.orders);
      } else {
        console.error(response.data.message)
      }
      
    } catch (error) {
      console.error(error.message)
    }
  }
  const statusHandler = async(event, orderId) => {
    try {
      const response = await axios.post(backendUrl+'/api/order/status', { orderId, status: event.target.value })
      if(response.data.success) {
        await fetchAllOrders()
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, []);  

  const deliveredCount = orders.filter(order => order.status === "Delivered").length;
  const pendingCount = orders.filter(order => order.status === "Order Placed").length;
  const processCount = orders.filter(order => ["Packing", "Shipped", "Out for Delivery"].includes(order.status)).length;

  const totalAmount = orders.reduce((sum, order) => sum + Number(order.amount), 0);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchUsersCount = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/user/list`);
        setTotalUsers(res.data.totalUsers);
      } catch (error) {
        console.error("Error fetching total users:", error);
      }
    };

    fetchUsersCount();
  }, []);
  
  const prepareChartData = () => {
    const today = new Date();
    const dates = [];
    const orderCounts = new Array(30).fill(0);
  
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      const dateString = date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }).replace(' ', '-');
      dates.push(dateString);
    }
  
    allOrders.forEach(order => {
      const orderDate = new Date(order.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }).replace(' ', '-');
      const index = dates.indexOf(orderDate);
      if (index !== -1) {
        orderCounts[index]++;
      }
    });
  
    return {
      labels: dates,
      datasets: [
        {
          label: "Number of Orders",
          data: orderCounts,
          backgroundColor: '#2A7B9B',
        },
      ],
    };
  };
  

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Orders in the Last 30 Days',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Orders',
        },
        beginAtZero: true,
      },
    },
  }
  

    
  const doughnutOptions = { responsive: true, maintainAspectRatio: true, cutout: "70%" };

  const newCustomersData = {
    labels: ["New", "Returning"],
    datasets: [
      {
        data: [5, 9], // Example data
        backgroundColor: ["#4CAF50", "#FF6384"],
        hoverBackgroundColor: ["#45a049", "#FF4365"],
      },
    ],
  };

  const totalCustomersData = {
    labels: ["Active", "Inactive"],
    datasets: [
      {
        data: [12, 1], // Example data
        backgroundColor: ["#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#2a90d7", "#FFB733"],
      },
    ],
  };

  const salesLast30DaysData = {
    labels: ["This Month", "Previous Months"],
    datasets: [
      {
        data: [8000, 7200], // Example data
        backgroundColor: ["#FF9800", "#9C27B0"],
        hoverBackgroundColor: ["#FB8C00", "#7B1FA2"],
      },
    ],
  };

  const totalSalesData = {
    labels: ["Completed Sales", "Refunds"],
    datasets: [
      {
        data: [15000, 200], // Example data
        backgroundColor: ["#009688", "#E91E63"],
        hoverBackgroundColor: ["#00897B", "#D81B60"],
      },
    ],
  };


  return (
    <div className='flex flex-col gap-8 container mx-auto md:p-6 text-gray-900' >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" >
            <Widget title="Orders Pending" value={pendingCount} icon={ShoppingCart} bgColor="from-blue-400 to-blue-600" link="/orders/pending" />
            <Widget title="Orders Processing" value={processCount} icon={Package} bgColor="from-yellow-400 to-yellow-600" link="/orders/completed" />
            <Widget title="Orders Completed" value={deliveredCount} icon={CheckCircle} bgColor="from-green-400 to-green-600" link="/orders/completed" />
            <Widget title="Total Users" value={totalUsers} icon={Users} bgColor="from-indigo-400 to-indigo-600" link="/users" />
            <Widget title="Total Products" value={products.length} icon={Package} bgColor="from-purple-400 to-purple-600" link="/list" />
            <Widget title="Total Sales" value={`${currency}${totalAmount}`}icon={BarChart} bgColor="from-pink-400 to-pink-600" link="/order" />
        </div>

        {/* <h1 className='text-center text-lg text-blue-950 bg-gray-300' ></h1> */}

         {/* Doughnut Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white h-100 md:h-75 p-4 rounded-lg shadow-lg">
                <h3 className="text-center font-semibold mb-4">New Customers</h3>
                <Doughnut data={newCustomersData} options={doughnutOptions} />
            </div>
            <div className="bg-white h-100 md:h-75 p-4 rounded-lg shadow-lg">
                <h3 className="text-center font-semibold mb-4">Total Customers</h3>
                <Doughnut data={totalCustomersData} options={doughnutOptions} />
            </div>
            <div className="bg-white h-100 md:h-75 p-4 rounded-lg shadow-lg">
                <h3 className="text-center font-semibold mb-4">Sales Last 30 Days</h3>
                <Doughnut data={salesLast30DaysData} options={doughnutOptions} />
            </div>
            <div className="bg-white h-100 md:h-75 p-4 rounded-lg shadow-lg">
                <h3 className="text-center font-semibold mb-4">Total Sales</h3>
                <Doughnut data={totalSalesData} options={doughnutOptions} />
            </div>
        </div>

          {/* total sales in last 30 days */}
          <div className="bg-white p-4 rounded-lg shadow-lg mt-8">
            <h3 className="text-lg font-semibold mb-4">Orders in the Last 30 Days</h3>
            <Bar data={prepareChartData()} options={chartOptions} />
          </div>

    </div>
  )
}

export default Dashboard