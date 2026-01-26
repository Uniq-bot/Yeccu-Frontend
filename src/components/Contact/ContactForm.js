"use client"
import React from 'react'
import { motion } from 'framer-motion'

const ContactForm = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="w-full  bg-[#111] border-amber-400 border text-[#D8971F] shadow-lg p-6 flex flex-col"
    >
      <h1 className="text-3xl text-white font-bold  mb-6">
        Send us a message
      </h1>

      <form className="flex flex-col gap-5">
        
        {/* Name */}
        <div className="flex flex-col">
          <label className="text-sm  text-yellow-300 uppercase mb-1">
            Your Name
          </label>
          <input
            type="text"
            placeholder='John Doe'
            className="border border-amber-300 px-4 py-2 focus:outline-none text-white focus:ring-1"
            required
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="text-sm text-yellow-300  uppercase  mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder='johndoe@gmail.com'
            autoComplete="email"
            className="border border-amber-300 text-white px-4 py-2 focus:outline-none "
            required
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col">
          <label className="text-sm text-yellow-300  uppercase  mb-1">
            Phone
          </label>
          <input
            type="tel"
            placeholder='(+977) 120210200'
            autoComplete="tel"
            className="border border-amber-300 text-white px-4 py-2 focus:outline-none "
            required
          />
        </div>

        {/* Message */}
        <div className="flex flex-col">
          <label className="text-sm text-yellow-300  uppercase  mb-1">
            Message
          </label>
          <textarea
            rows="5"
            placeholder='Tell me about your basketball goals...'
            className="border border-amber-300 px-4 text-white py-2 resize-none focus:outline-none "
          ></textarea>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="bg-[#D8971F]/60 hover:bg-[#D8971F] cursor-pointer text-black  font-extrabold py-3 transition duration-300"
        >
          Send Message
        </button>
      </form>
    </motion.div>
  )
}

export default ContactForm
