import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { CirclePlus, LayoutDashboard, Image, ListOrdered, Menu, Package, ChevronDown, ChevronUp, BookUser, X, CircleDollarSign } from "lucide-react";
import { motion } from "framer-motion";

const Sidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isUsersOpen, setIsUsersOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isCouponOpen, setIsCouponOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block md:fixed bg-blue-50 left-0 h-screen w-[18%]">
        <div className="flex flex-col gap-4 pt-6 pl-6 text-[15px]">
          <NavLink className="flex items-center gap-3 px-3 py-2 rounded-lg" to='/'>
            <LayoutDashboard className='w-7 text-blue-950' />
            <p className="text-blue-950">Dashboard</p>
          </NavLink>

          <div className="flex flex-col">
            <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-blue-950" onClick={() => setIsCouponOpen(!isCouponOpen)}>
              <div className="flex items-center gap-3">
                <Package className='w-7 text-blue-950' />
                <p>Coupons</p>
              </div>
              {isCouponOpen ? <ChevronUp /> : <ChevronDown />}
            </button>
            <motion.div initial={{ height: 0, opacity: 0 }} animate={isCouponOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
              <div className="pl-5">
                <NavLink className="flex items-center gap-3 px-3 py-2 rounded-lg" to="/addcoupons">
                  <CirclePlus className="w-7 text-blue-950" />
                  <p className='text-blue-950'>Add Coupons</p>
                </NavLink>
                <NavLink className="flex items-center gap-3 px-3 py-2 rounded-lg" to="/coupons">
                  <ListOrdered className="w-7 text-blue-950" />
                  <p className='text-blue-950'>Coupons</p>
                </NavLink>
              </div>
            </motion.div>
          </div>

          {/* Products Section */}
          <div className="flex flex-col">
            <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-blue-950" onClick={() => setIsProductsOpen(!isProductsOpen)}>
              <div className="flex items-center gap-3">
                <Package className='w-7 text-blue-950' />
                <p>Products</p>
              </div>
              {isProductsOpen ? <ChevronUp /> : <ChevronDown />}
            </button>
            <motion.div initial={{ height: 0, opacity: 0 }} animate={isProductsOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
              <div className="pl-5">
                <NavLink className="flex items-center gap-3 px-3 py-2 rounded-lg" to="/add">
                  <CirclePlus className="w-7 text-blue-950" />
                  <p className='text-blue-950'>Add Products</p>
                </NavLink>
                <NavLink className="flex items-center gap-3 px-3 py-2 rounded-lg" to="/list">
                  <ListOrdered className="w-7 text-blue-950" />
                  <p className='text-blue-950'>Inventory</p>
                </NavLink>
              </div>
            </motion.div>
          </div>

          {/* Orders Section */}
          <div className="flex flex-col">
            <button
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-blue-950"
              onClick={() => setIsOrdersOpen(!isOrdersOpen)} // Toggle Orders section
            >
              <div className="flex items-center gap-3">
                <Package className="w-7 text-blue-950" />
                <p>Orders</p>
              </div>
              {isOrdersOpen ? <ChevronUp/> : <ChevronDown />}
            </button>
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={isOrdersOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pl-5">
                <NavLink className="flex items-center gap-3 px-3 py-2 rounded-lg" to="/order">
                  <Package className="w-7 text-blue-950" />
                  <p className='text-blue-950'>All Orders</p>
                </NavLink>
                <NavLink className="flex items-center gap-3 px-3 py-2 rounded-lg" to="/orders/pending">
                  <Package className="w-7 text-blue-950" />
                  <p className='text-blue-950'>Pending Orders</p>
                </NavLink>
                <NavLink className="flex items-center gap-3 px-3 py-2 rounded-lg" to="/orders/completed">
                  <Package className="w-7 text-blue-950" />
                  <p className='text-blue-950'>Completed Orders</p>
                </NavLink>
              </div>
            </motion.div>
          </div>

          {/* Users Section */}
          <div className="flex flex-col">
            <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-blue-950" onClick={() => setIsUsersOpen(!isUsersOpen)}>
              <div className="flex items-center gap-3">
                <BookUser className="w-7 text-blue-950" />
                <p>Users</p>
              </div>
              {isUsersOpen ? <ChevronUp /> : <ChevronDown />}
            </button>
            <motion.div initial={{ height: 0, opacity: 0 }} animate={isUsersOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
              <div className="pl-5">
                <NavLink className="flex items-center gap-3 px-3 py-2 rounded-lg" to="/users">
                  <BookUser className="w-7 text-blue-950" />
                  <p className='text-blue-950'>All Users</p>
                </NavLink>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Mobile Sidebar */}
      {isMobileOpen && (
        <motion.div
          initial={{ x: "-100%" }} 
          animate={{ x: isMobileOpen ? 0 : "-100%" }}
          exit={{ x: "-100%" }}
          transition={{ type: "tween", duration: 0.3 }}
          className="fixed inset-0 bg-opacity-50 z-50 md:hidden" 
          onClick={() => setIsMobileOpen(false)}
        >
          <div className="bg-[#8c1018] w-[70%] h-full p-5" onClick={(e) => e.stopPropagation()}>
            <button className="text-blue-950 mb-5" onClick={() => setIsMobileOpen(false)}>
              <X />
            </button>
            <NavLink className="flex items-center gap-3 py-2 rounded-lg" to='/'>
              <LayoutDashboard className='w-7 text-blue-950' />
              <p className="text-blue-950">Dashboard</p>
            </NavLink>

            <NavLink className="flex items-center gap-3 px-3 py-2 rounded-lg" to='/coupons' >
            <CircleDollarSign className='w-7 text-blue-950' />
            <p className="text-blue-950">Coupons</p>
            </NavLink>

            {/* Products Section */}
            <div className="flex flex-col">
              <button className="flex items-center gap-3 py-2 rounded-lg text-blue-950" onClick={() => setIsProductsOpen(!isProductsOpen)}>
                <div className="flex items-center gap-3 mt-6">
                  <Package className='w-7 text-blue-950' />
                  <p>Products</p>
                </div>
                {isProductsOpen ? <ChevronUp className='mt-6'  /> : <ChevronDown className='mt-6'  />}
              </button>
              <motion.div initial={{ height: 0, opacity: 0 }} animate={isProductsOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                <div className="pl-5">
                  <NavLink className="flex items-center gap-3 px-3 py-2 rounded-lg" to="/add">
                    <CirclePlus className="w-7 text-blue-950" />
                    <p className='text-blue-950'>Add Products</p>
                  </NavLink>
                  <NavLink className="flex items-center gap-3 px-3 py-2 rounded-lg" to="/list">
                    <ListOrdered className="w-7 text-blue-950" />
                    <p className='text-blue-950'>Inventory</p>
                  </NavLink>
                </div>
              </motion.div>
            </div>

            {/* orders section */}
            <div className="flex flex-col">
              <button
                className="flex items-center gap-3 mt-6 py-2 rounded-lg text-blue-950"
                onClick={() => setIsOrdersOpen(!isOrdersOpen)} // Toggle Orders section
              >
                <div className="flex items-center gap-3">
                  <Package className="w-7 text-blue-950" />
                  <p>Orders</p>
                </div>
                {isOrdersOpen ? <ChevronUp/> : <ChevronDown />}
              </button>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={isOrdersOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pl-5">
                  <NavLink className="flex items-center gap-3 px-3 py-2 rounded-lg" to="/order">
                    <Package className="w-7 text-blue-950" />
                    <p className='text-blue-950'>All Orders</p>
                  </NavLink>
                  <NavLink className="flex items-center gap-3 px-3 py-2 rounded-lg" to="/orders/pending">
                    <Package className="w-7 text-blue-950" />
                    <p className='text-blue-950'>Pending Orders</p>
                  </NavLink>
                  <NavLink className="flex items-center gap-3 px-3 py-2 rounded-lg" to="/orders/completed">
                    <Package className="w-7 text-blue-950" />
                    <p className='text-blue-950'>Completed Orders</p>
                  </NavLink>
                </div>
              </motion.div>
            </div>

            {/* Users Section */}
            <div className="flex flex-col">
              <button className="flex items-center gap-3 py-2 rounded-lg text-blue-950" onClick={() => setIsUsersOpen(!isUsersOpen)}>
                <div className="flex items-center mt-6 gap-3">
                  <BookUser className="w-7 text-blue-950" />
                  <p>Users</p>
                </div>
                {isUsersOpen ? <ChevronUp className='mt-6' /> : <ChevronDown className='mt-6' />}
              </button>
              <motion.div initial={{ height: 0, opacity: 0 }} animate={isUsersOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                <div className="pl-5">
                  <NavLink className="flex mt-6 items-center gap-3 px-3 py-2 rounded-lg" to="/users">
                    <BookUser className="w-7 text-blue-950" />
                    <p className='text-blue-950'>All Users</p>
                  </NavLink>
                </div>
              </motion.div>
            </div>
            
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Sidebar;