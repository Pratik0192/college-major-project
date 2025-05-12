import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/new_logo.png'
import { CircleUser, Globe } from "lucide-react";

const Navbar = ({setToken}) => {
  return (
    <div className='sticky top-0 bg-[#FAFAFA] border-b border-gray-300 shadow-sm'  >
        <div className="hidden md:flex justify-between items-center px-10 py-4" >
            <Link to='/'>
                <div className="flex items-center gap-3">
                    <img src={logo} alt="OptiVerse Logo" className="w-50" />
                    <p className="text-blue-950 font-bold text-sm text-center" >Admin Panel</p>
                </div>
            </Link>
            <div className='text-blue-950 flex items-center gap-x-6' >
                <ul className="hidden lg:flex cursor-pointer items-center gap-8 text-blue-950 font-semibold" >
                    <li className="cursor-pointer hover:text-blue-500 flex items-center gap-2" >
                        <a href="https://major-project-frontend-five.vercel.app/" target="_blank" rel="noopener noreferrer">
                            <Globe />
                        </a>
                    </li>
                    <button onClick={()=>setToken('')} className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm' >
                        Logout
                    </button>
                </ul>
            </div>
            
        </div>
        
    </div>
  )
}

export default Navbar