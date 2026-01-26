import React from 'react'
import Logo from '../../assets/yeccu.jpg'
import Image from 'next/image'
import Link from 'next/link'

const AdminNav = () => {
  return (
    <nav className="bg-black border-b border-yellow-700 shadow-md">
      <div className="max-w-7xl w-full sm:w-11/12 lg:w-4/5 m-auto mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title Section */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="relative">
              <Image 
                src={Logo} 
                alt="Logo" 
                width={50} 
                height={50} 
                className="w-10 h-10 sm:w-14 sm:h-14 rounded-lg shadow-md border-2 border-slate-600 hover:border-blue-500 transition-all duration-300"
              />
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-white flex gap-1 sm:gap-2">
                Yeccu
                <span className="text-yellow-400">
                  Admin
                </span>
              </h1>
            </div>
          </div>

          {/* Action Buttons Section */}
          <Link 
            href="/" 
            className="px-3 sm:px-6 lg:px-10 py-2 sm:py-3 bg-yellow-300 font-bold shadow-lg rounded-md text-black hover:bg-yellow-400 transition-colors duration-200 text-xs sm:text-sm md:text-base whitespace-nowrap"
          >
            <span className="hidden sm:inline">Customer View</span>
            <span className="sm:hidden">Home</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default AdminNav