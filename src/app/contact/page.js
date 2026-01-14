import ContactForm from '@/components/Contact/ContactForm'
import Detail from '@/components/Contact/Detail'
import React from 'react'

const Contact = () => {
  return (
    <div className='w-full min-h-screen bg-[#111] pb-10 text-white'>
      <div className='flex flex-col items-center py-20 h-30 justify-center px-4'>
        <h1 className='text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#FFD700] py-2 text-center'>
          <span className='text-white'>GET IN</span> TOUCH
        </h1>
        <p className='text-[#99A1AF] text-center text-sm sm:text-base mt-4'>
          Ready to elevate your game? Lets Talk.
        </p>
      </div>
      <div className='w-full flex h-full  justify-center items-center gap-4 sm:gap-8 md:gap-10 px-4'>
        <div className=' w-full h-full  px-5 md:w-2/5'>
          <ContactForm />
        </div>
        <div className='hidden h-full md:block'>
          <Detail />
        </div>
      </div>
    </div>
  )
}

export default Contact