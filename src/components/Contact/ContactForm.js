"use client"
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { contactInWhatsApp } from '@/libs/contactInWhatsapp'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill in all required fields');
      return;
    }

    contactInWhatsApp(formData);
    
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };

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

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        
        {/* Name */}
        <div className="flex flex-col">
          <label className="text-sm  text-yellow-300 uppercase mb-1">
            Your Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder='John Doe'
            className="border border-amber-300 px-4 py-2 focus:outline-none text-white focus:ring-1 bg-transparent"
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
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder='johndoe@gmail.com'
            autoComplete="email"
            className="border border-amber-300 text-white px-4 py-2 focus:outline-none bg-transparent"
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
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder='(+977) 120210200'
            autoComplete="tel"
            className="border border-amber-300 text-white px-4 py-2 focus:outline-none bg-transparent"
            required
          />
        </div>

        {/* Message */}
        <div className="flex flex-col">
          <label className="text-sm text-yellow-300  uppercase  mb-1">
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            placeholder='Tell me about your basketball goals...'
            className="border border-amber-300 px-4 text-white py-2 resize-none focus:outline-none bg-transparent"
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
