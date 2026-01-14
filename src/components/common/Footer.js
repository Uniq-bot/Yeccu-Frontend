"use client";
import React, { useState } from 'react';
import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube } from 'react-icons/fa';

function Footer(){
    return(
        <footer className="bg-black"> 
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-20 border-b border-yellow-600 border-opacity-40 px-6 md:px-8 py-8">
                <div className="text-left text-gray-500">
                    <h2 className="text-xl md:text-2xl font-bold text-white">YECCU <span className="text-yellow-400">BASKETBALL</span></h2>
                    <p className='text-sm md:text-base mt-3'>Empowering young ballers through premium gear and world-class training.</p>
                    <div className="flex gap-5 mt-6">
                        <a href="https://www.facebook.com" className="p-2.5 border border-gray-500 transition-all duration-200 hover:scale-110">
                            <FaFacebook size={24} className="text-gray-400" />
                        </a>
                        <a href="https://www.instagram.com" className="p-2.5 border border-gray-500 transition-all duration-200 hover:scale-110">
                            <FaInstagram size={24} className="text-gray-400" />
                        </a>
                        <a href="https://www.twitter.com" className="p-2.5 border border-gray-500 transition-all duration-200 hover:scale-110">
                            <FaWhatsapp size={24} className="text-gray-400" />
                        </a>
                        <a href="https://www.youtube.com" className="p-2.5 border border-gray-500 transition-all duration-200 hover:scale-110">
                           <FaYoutube size={24} className="text-gray-400" />
                        </a>
                    </div>
                </div>
                <div className="text-left text-gray-500">
                    <h3 className='text-lg font-semibold text-yellow-400'>Quick Links</h3>
                    <div className="flex flex-col gap-2 mt-4">
                        <a href="/about" className="text-gray-500 no-underline text-sm hover:text-yellow-400 transition-colors">HOME</a>
                        <a href="/products" className="text-gray-500 no-underline text-sm hover:text-yellow-400 transition-colors">PRODUCTS</a>
                        <a href="/blogs" className="text-gray-500 no-underline text-sm hover:text-yellow-400 transition-colors">BLOG</a>
                        <a href="/contact" className="text-gray-500 no-underline text-sm hover:text-yellow-400 transition-colors">CONTACT</a>
                    </div>
                </div>
                <div className="text-left text-gray-500">
                    <h3 className='text-lg font-semibold text-yellow-400'>GET IN TOUCH</h3>
                    <div className="flex flex-col gap-2.5 mt-4">
                        <p className="m-0 p-0 text-sm">Email: info@yeccubasketball.com</p>   
                        <p className="m-0 p-0 text-sm">Phone: +1(555)123-4567</p>
                        <p className="m-0 p-0 text-sm">Address: 123 Court St, Basketball City</p>
                    </div>
                </div>
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
