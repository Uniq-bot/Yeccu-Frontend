import React from 'react'
import "./CSS/Hero.css"
import Link from 'next/link'
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
      <div className='relative z-10 Overlay px-4 sm:px-8 md:px-20 py-14 sm:py-16 flex flex-col gap-4 md:gap-6 max-w-4xl text-center md:text-left'>
        <h1 className='text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight'>
          ELAVATE <br />
          YOUR <br />
          <span className='text-yellow-400'>Game</span>
        </h1>
        <p className='subtext mt-2 sm:mt-4 max-w-2xl text-white/90 mx-auto md:mx-0'>
          Street-ready basketball gear and training for the next generation of baller
        </p>

        <div className="hero-buttons mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto items-stretch sm:items-center">
          <Link href={'/products'} className="btn-primary w-full sm:w-auto">VIEW PRODUCT</Link>
          <Link href={'/contact'} className="btn-outline w-full sm:w-auto">JOIN TRAINING</Link>
        </div>
      </div>
      <div className=''>
        <ScrollIcon />
      </div>
    </div>
  )
}

export default Hero
