import React, { useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';

const AddCoupons = () => {
  const [formData, setFormData] = useState({
    code: '',
    discountType: 'PERCENTAGE',
    discountValue: '',
    maxDiscount: '',
    minOrderAmount: '',
    expiryDate: ''
  });

  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleAddCoupon = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await axios.post(`${backendUrl}/api/coupon/add`, formData);
      if (res.data.success) {
        setMessage(res.data.message);
        setFormData({
          code: '',
          discountType: 'PERCENTAGE',
          discountValue: '',
          maxDiscount: '',
          minOrderAmount: '',
          expiryDate: ''
        });
      } else {
        setMessage(res.data.message);
      }
    } catch (error) {
      setMessage('Something went wrong');
      console.error(error.message);
    }
  };

  return (
    <div className="p-4 text-gray-700">
      <h2 className="text-xl font-semibold mb-4">Create New Coupon</h2>
      <form onSubmit={handleAddCoupon} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <input type="text" name="code" placeholder="Coupon Code" value={formData.code} onChange={handleInputChange} required className="border p-2 rounded" />
        
        <select name="discountType" value={formData.discountType} onChange={handleInputChange} className="border p-2 rounded">
          <option value="PERCENTAGE">Percentage</option>
          <option value="FLAT">Flat</option>
        </select>

        <input type="number" name="discountValue" placeholder="Discount Value" value={formData.discountValue} onChange={handleInputChange} required className="border p-2 rounded" />
        
        <input type="number" name="maxDiscount" placeholder="Max Discount" value={formData.maxDiscount} onChange={handleInputChange} className="border p-2 rounded" />
        
        <input type="number" name="minOrderAmount" placeholder="Min Order Amount" value={formData.minOrderAmount} onChange={handleInputChange} className="border p-2 rounded" />
        
        <input type="date" name="expiryDate" value={formData.expiryDate} onChange={handleInputChange} required className="border p-2 rounded" />
        
        <div className="sm:col-span-2 lg:col-span-3">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Coupon</button>
        </div>
      </form>

      {message && <p className="text-sm text-blue-600 mb-4">{message}</p>}
    </div>
  );
};

export default AddCoupons;
