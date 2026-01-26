'use client'
import React from 'react'
import './CSS/About.css'
import { motion } from 'framer-motion'

function About() {
  return (
    <div className='Aboutyecuu'>
      
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="about-left"
      >
        <div className='h1'>ABOUT <span className="yellow">YECCU</span></ div>

        <p>
          Born on the streets, built for champions. YECCU Basketball is more than a brand—
          it's a movement. We bring authentic basketball culture to the youth, combining
          premium gear with world-class training programs.
        </p>

        <div className="mission-box">
          <h2>OUR MISSION</h2>
          <p>
            Empowering young ballers to reach their full potential through quality gear,
            expert coaching, and unwavering dedication to the game.
          </p>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="about-right"
      >
        <div className="image-wrapper">
          <img src="/About.jpg" alt="About YECCU" />
          <span className="est-tag">EST. 2025</span>
        </div>
      </motion.div>

    </div>
  )
}

export default About
