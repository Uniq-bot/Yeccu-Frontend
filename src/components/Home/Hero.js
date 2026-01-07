import React from 'react'
import "./CSS/Hero.css"
function Hero() {
  return (
    <div>
      <div className='HeroSection'>
        <div className='Background'></div>
        <div className='Overlay'><h1>ELAVATE <br />
        YOUR <br />
        <span className='yellow'>Game</span>
        </h1>
        <p className='subtext'>Street-ready basketball gear and training for the next generation of baller</p>
            
        </div>
         <div className="hero-buttons">
          <button className="btn-primary">VIEW PRODUCT</button>
          <button className="btn-outline">JOIN TRAINING</button>
          </div>
        
      </div>
    </div>
  )
}

export default Hero