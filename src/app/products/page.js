"use client"
import CategoryFilter from '@/components/Product/CategoryFilter'
import ProductCard from '@/components/Product/ProductCard'
import { useProductStore } from '@/libs/useProductStore'
import React, { useState } from 'react'

const Products = () => {
  const {filteredProducts}=useProductStore()
  console.log(filteredProducts)
  
  return (
    <div className='flex flex-col w-full min-h-screen bg-[#111] text-white '>
      <div className='flex flex-col items-center  py-20 h-30 justify-center'>
        <h1 className='text-6xl font-extrabold text-[#FFD700] py-2'>
          <span className='text-white'>OUR</span> PRODUCTS
      </h1>
      <p className='text-[#99A1AF]'>
        Premium basketball gears for Street Legends.
      </p>
      </div>
      <div className='px-6 md:px-12 lg:px-20 pb-20'>
        <CategoryFilter />
        <div className='mt-8'>
          {
            filteredProducts.length === 0 ? (
              <div className='flex flex-col items-center justify-center py-20'>
                <p className='text-center text-[#99A1AF] text-xl'>No products found in this category.</p>
              </div>
            ) : (
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-55 gap-6'>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )
          }
        </div>
      </div>

    </div>
  )
}

export default Products