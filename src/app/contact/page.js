import ContactForm from '@/components/Contact/ContactForm'
import Detail from '@/components/Contact/Detail'
import React from 'react'

const Contact = () => {
  return (
    <div className='w-full min-h-screen bg-[#111] pb-10 text-white'>
      <div className='flex flex-col items-center  py-20 h-30 justify-center'>
        <h1 className='text-6xl font-extrabold text-[#FFD700] py-2'>
          <span className='text-white'>GET IN</span> TOUCH
      </h1>
      <p className='text-[#99A1AF]'>
        Ready to elevate your game? Lets Talk.
      </p>
      </div>
      <div className='w-full flex justify-center gap-10'>
        <ContactForm />
        <Detail />
      </div>
    </div>
  )
}

export default Contact