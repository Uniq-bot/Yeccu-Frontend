"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube } from 'react-icons/fa';

function Footer(){
    return(
        <footer className="bg-black"> 
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-20 border-b border-yellow-600 border-opacity-40 px-6 md:px-8 py-8">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5 }}
                  className="text-left text-gray-500"
                >
                    <h2 className="text-xl md:text-2xl font-bold text-white">YECCU <span className="text-yellow-400">BASKETBALL</span></h2>
                    <p className='text-sm md:text-base mt-3'>Empowering young ballers through premium gear and world-class training.</p>
                    <div className="flex gap-5 mt-6">
                        <motion.a 
                          whileHover={{ scale: 1.15, rotate: 5 }}
                          whileTap={{ scale: 0.95 }}
                          href="https://www.facebook.com" 
                          className="p-2.5 border border-gray-500"
                        >
                            <FaFacebook size={24} className="text-gray-400" />
                        </motion.a>
                        <motion.a 
                          whileHover={{ scale: 1.15, rotate: 5 }}
                          whileTap={{ scale: 0.95 }}
                          href="https://www.instagram.com" 
                          className="p-2.5 border border-gray-500"
                        >
                            <FaInstagram size={24} className="text-gray-400" />
                        </motion.a>
                        <motion.a 
                          whileHover={{ scale: 1.15, rotate: 5 }}
                          whileTap={{ scale: 0.95 }}
                          href="https://www.twitter.com" 
                          className="p-2.5 border border-gray-500"
                        >
                            <FaWhatsapp size={24} className="text-gray-400" />
                        </motion.a>
                        <motion.a 
                          whileHover={{ scale: 1.15, rotate: 5 }}
                          whileTap={{ scale: 0.95 }}
                          href="https://www.youtube.com" 
                          className="p-2.5 border border-gray-500"
                        >
                           <FaYoutube size={24} className="text-gray-400" />
                        </motion.a>
                    </div>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-left text-gray-500"
                >
                    <h3 className='text-lg font-semibold text-yellow-400'>Quick Links</h3>
                    <div className="flex flex-col gap-2 mt-4">
                        <a href="/about" className="text-gray-500 no-underline text-sm hover:text-yellow-400 transition-colors">HOME</a>
                        <a href="/products" className="text-gray-500 no-underline text-sm hover:text-yellow-400 transition-colors">PRODUCTS</a>
                        <a href="/blogs" className="text-gray-500 no-underline text-sm hover:text-yellow-400 transition-colors">BLOG</a>
                        <a href="/contact" className="text-gray-500 no-underline text-sm hover:text-yellow-400 transition-colors">CONTACT</a>
                    </div>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-left text-gray-500"
                >
                    <h3 className='text-lg font-semibold text-yellow-400'>GET IN TOUCH</h3>
                    <div className="flex flex-col gap-2.5 mt-4">
                        <p className="m-0 p-0 text-sm">Email: info@yeccubasketball.com</p>   
                        <p className="m-0 p-0 text-sm">Phone: +1(555)123-4567</p>
                        <p className="m-0 p-0 text-sm">Address: 123 Court St, Basketball City</p>
                    </div>
                </motion.div>
            </div>
            <div className='text-center text-gray-500 py-6'>
                    <p className="m-0">
                        © {new Date().getFullYear()} YECCU Basketball. All rights reserved. Built for champions.
                    </p>
            </div>

        </footer>
    )
}

export default Footer;
