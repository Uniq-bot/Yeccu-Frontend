"use client"
import React from 'react'
import AdminNav from '@/components/common/AdminNav'
import Menu from '@/components/adminComponent/NavigationMenu/Menu'
import { useAdminStore } from '@/libs/useAdminStore'
const page = () => {
        const {renderComp}=useAdminStore();
  return (
    <div className='text-black w-full bg-black min-h-screen text-white'>
        <AdminNav />
       <div className='w-4/5 m-auto h-screen bg-red-300'>
         <div>
            <Menu />
        </div>
        <div>
            {renderComp()}
        </div>
       </div>
    </div>
  )
}

export default page