import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App';
import toast from "react-hot-toast";

const Login = ({setToken}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitHandler = async (e) =>{
        try{
            e.preventDefault();
            const response = await axios.post(backendUrl + '/api/user/admin' , {email,password}  )
            if(response.data.success){
                setToken(response.data.token)
                toast.success("Logged in")
            }else{
                toast.error(response.data.message)
            }
        }catch(error){
            console.error('Login error:', error);
            toast.error(error.message)
        }
    }

  return (
    <div className='min-h-screen flex items-center justify-center w-full' >
        <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md flex flex-col gap-4" >
            <h1 className='text-2xl font-bold mb-4' >Admin Panel</h1>
            <form onSubmit={onSubmitHandler} className='flex flex-col gap-4'>
                <div className=" min-w-72 flex flex-col gap-3" >
                    <p className="text-sm font-medium text-gray-700 mb-2" >Email Address</p>
                    <input onChange={(e)=>setEmail(e.target.value)} value={email} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'  type="email" placeholder='youremail' required />
                </div>
                <div className=" min-w-72 flex flex-col gap-3" >
                    <p className="text-sm font-medium text-gray-700 mb-2" >Password</p>
                    <input onChange={(e)=>setPassword(e.target.value)} value={password} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'  type="password" placeholder='password?' required />
                </div>
                <button type='submit' className='cursor-pointer mt-2 w-full py-2 px-4 rounded-md text-white bg-blue-950' >
                    Login
                </button>
            </form>
        </div>
    </div>
  )
}

export default Login