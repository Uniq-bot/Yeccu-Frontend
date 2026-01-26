'use client'
import React from 'react'
import "./CSS/Hero.css"
import Link from 'next/link'
import { motion } from 'framer-motion'
import ScrollIcon from './Scroll'

function Hero() {
  return (
    <div className='relative HeroSection min-h-[96vh]'>
      {/* background image */}
      <div
        className='absolute inset-0 bg-cover bg-center'
        style={{ backgroundImage: "url('/homefirst.jpg')" }}
      />

      {/* Tailwind overlay gradient */}
      <div className='absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60' />

      {/* Content */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className='relative z-10 Overlay px-4 sm:px-8 md:px-20 py-14 sm:py-16 flex flex-col gap-4 md:gap-6 max-w-4xl text-center md:text-left'
      >
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className='text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight'
        >
          ELAVATE <br />
          YOUR <br />
          <span className='text-yellow-400'>Game</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
          className='subtext mt-2 sm:mt-4 max-w-2xl text-white/90 mx-auto md:mx-0'
        >
          Street-ready basketball gear and training for the next generation of baller
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          className="hero-buttons mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto items-stretch sm:items-center"
        >
          <Link href={'/products'} className="btn-primary w-full sm:w-auto">VIEW PRODUCT</Link>
          <Link href={'/contact'} className="btn-outline w-full sm:w-auto">JOIN TRAINING</Link>
        </motion.div>
      </motion.div>
      <div className=''>
        <ScrollIcon />
      </div>
    </div>
  )
}

export default Hero
