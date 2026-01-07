import React from 'react'
import "./CSS/Hero.css"
import Link from 'next/link'

function Hero() {
  return (
    <div className='relative HeroSection min-h-[70vh]'>
      {/* background image */}
      <div 
        className='absolute inset-0 bg-cover bg-center' 
        style={{ backgroundImage: "url('/homefirst.jpg')" }} 
      />

      {/* Tailwind overlay gradient */}
      <div className='absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60' />

      {/* Content */}
      <div className='relative z-10 Overlay px-6 md:px-20 py-16'>
        <h1 className='text-4xl md:text-6xl font-bold leading-tight'>
          ELAVATE <br />
          YOUR <br />
          <span className='text-yellow-400'>Game</span>
        </h1>
        <p className='subtext mt-4 max-w-xl text-white/90'>
          Street-ready basketball gear and training for the next generation of baller
        </p>

        <div className="hero-button mt-8 flex gap-4">
          <Link href={'/products'} className="btn-primary">VIEW PRODUCT</Link>
          <Link href={'/contact'} className="btn-outline">JOIN TRAINING</Link>
        </div>
      </div>
    </div>
  )
}

export default Hero
