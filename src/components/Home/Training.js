'use client'
import React from 'react'
import './CSS/Training.css'
import { motion } from 'framer-motion'

function Training() {
  return (
    <div className='Training'>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          TRAINING  <span className='yellow'>PROGRAMS</span> 
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
            Choose Your path to greatness
        </motion.p>
        <div className='training_container'>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            className="Youth_training"
          >
            <h2>YOUTH TRAINING</h2>
            <p>Foundation skills and fundamentals for young ballers ages 8-14 </p>
            <ul>
                <li>Skill Development</li>
                <li>Teamwork Focus</li>
                <li>Fun & engaging </li>
            </ul>
            <button>Enroll Now</button>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          className="Advanced_training"
        >
            <h2>ADVANCED TRAINING</h2>
            <p>High-intensity programs for competitive players ready to level up </p>
            <ul>
                <li>Elite Coaching</li>
                <li>Game Strategy</li>
                <li>Performance Tracking </li>
            </ul>
            <button>Enroll Now</button>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          className="Team_camps"
        >
            <h2>TEAM CAMPS</h2>
            <p>Intensive training sessions for teams and groups </p>
            <ul>
                <li>Custom Programs</li>
                <li>Tournament Prep</li>
                <li>Team Bonding </li>
            </ul>
            <button>Enroll Now</button>
        </motion.div>
        </div>
        
        


      
    </div>
  )
}

export default Training