import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl } from '../App';
import { Link } from 'react-router-dom';

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/user/list`);
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  console.log(users);

  return (
    <div className="p-1 md:p-4">
      <h2 className="text-2xl font-semibold text-center mb-4">All Users</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-blue-950 text-white">
            <tr>
              <th className="p-3 border border-gray-300">#</th>
              <th className="p-3 border border-gray-300">Name</th>
              <th className="p-3 border border-gray-300">Email</th>
              <th className="p-3 border border-gray-300">Mobile</th>
              <th className="p-3 border border-gray-300">Created At</th>
              <th className="p-3 border border-gray-300">Updated At</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user._id} className="odd:bg-gray-100 even:bg-white text-center hover:bg-gray-200 transition">
                  <td className="p-3 border border-gray-300">{index + 1}</td>
                  <td className="p-3 border border-gray-300">{user.name}</td>
                  <td className="p-3 border border-gray-300">{user.email}</td>
                  <td className="p-3 border border-gray-300">{user.phone}</td>
                  <td className="p-3 border border-gray-300">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="p-3 border border-gray-300">{new Date(user.updatedAt).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="p-3 text-center border border-gray-300">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;