"use client"
import React from 'react'
import Hero from '@/components/Home/Hero'
import About from '@/components/Home/About'
import Training from '@/components/Home/Training'
import { useProductStore } from '@/libs/useProductStore'


const Homee = () => {
  const {fetchPosts}= useProductStore()

  React.useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <div>
      <Hero/>
      <About/>
      <Training/>
      


    </div>
    
  )
}

export default Homee