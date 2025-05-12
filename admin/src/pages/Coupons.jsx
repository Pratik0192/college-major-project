import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';

const Coupons = () => {
  const [coupons, setCoupons] = useState([]);

  const fetchCoupons = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/coupon/get`);
      if (res.data.success) {
        setCoupons(res.data.coupons);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  return (
    <div className="p-4 text-gray-700">
      <h2 className="text-xl font-semibold mb-4">All Coupons</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border px-3 py-2">Code</th>
              <th className="border px-3 py-2">Type</th>
              <th className="border px-3 py-2">Value</th>
              <th className="border px-3 py-2">Max Discount</th>
              <th className="border px-3 py-2">Min Order</th>
              <th className="border px-3 py-2">Expiry</th>
              <th className="border px-3 py-2">Created</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon, idx) => (
              <tr key={idx}>
                <td className="border px-3 py-2">{coupon.code}</td>
                <td className="border px-3 py-2 capitalize">{coupon.discountType}</td>
                <td className="border px-3 py-2">{coupon.discountValue}</td>
                <td className="border px-3 py-2">{coupon.maxDiscount}</td>
                <td className="border px-3 py-2">{coupon.minOrderAmount}</td>
                <td className="border px-3 py-2">{new Date(coupon.expiryDate).toLocaleDateString()}</td>
                <td className="border px-3 py-2">{new Date(coupon.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Coupons;
