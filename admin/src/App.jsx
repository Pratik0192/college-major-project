import './App.css';
import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import AddProducts from './pages/AddProducts';
import AllProducts from './pages/AllProducts';
import Orders from './pages/Orders';
import Users from './pages/Users';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Login from './components/Login';
import PendingOrders from './pages/PendingOrders';
import CompletedOrders from './pages/CompletedOrders';
import Coupons from './pages/Coupons';
import AddCoupons from './pages/AddCoupons';

export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = "Rs."

const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):'' );

  useEffect(()=>{
      localStorage.setItem('token',token)
  },[token])

  return (
    <>    
    <Toaster />
    <div className='bg-gray-50 min-h-screen'>
      {
        token === ""
        ? <Login setToken={setToken} />
        : 
        <>
        <Navbar setToken={setToken} />
        <div className='flex'>
          <div className='lg:w-80'>
            <Sidebar />
          </div>

          <div className='flex-1 p-4'>
            <Routes>
              <Route path="/" element={<Dashboard token={token} />} />
              <Route path="/coupons" element={<Coupons token={token} />}   />
              <Route path="/addcoupons" element={<AddCoupons token={token} />}   />
              <Route path="/add" element={<AddProducts token={token} />}   />
              <Route path="/list" element={<AllProducts token={token} />} />
              <Route path="/order" element={<Orders token={token} />} />
              <Route path="/orders/pending" element={<PendingOrders token={token} />} />
              <Route path="/orders/completed" element={<CompletedOrders token={token} />} />
              <Route path="/users" element={<Users token={token} />}  />
            </Routes>
          </div>
        </div>
        </>
      }
    </div>
    </>
  );
}

export default App;
