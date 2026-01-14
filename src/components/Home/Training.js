import React from 'react'
import './CSS/Training.css'

function Training() {
  return (
    <div className='Training'>
        <h1>TRAINING  <span className='yellow'>PROGRAMS</span> </h1>
        <p>
            Choose Your path to greatness
        </p>
        <div className='training_container'>
          <div className="Youth_training">
            <h2>YOUTH TRAINING</h2>
            <p>Foundation skills and fundamentals for young ballers ages 8-14 </p>
            <ul>
                <li>Skill Development</li>
                <li>Teamwork Focus</li>
                <li>Fun & engaging </li>
            </ul>
            <button>Enroll Now</button>
        </div>
        <div className="Advanced_training">
            <h2>ADVANCED TRAINING</h2>
            <p>High-intensity programs for competitive players ready to level up </p>
            <ul>
                <li>Elite Coaching</li>
                <li>Game Strategy</li>
                <li>Performance Tracking </li>
            </ul>
            <button>Enroll Now</button>
        </div>
        <div className="Team_camps">
            <h2>TEAM CAMPS</h2>
            <p>Intensive training sessions for teams and groups </p>
            <ul>
                <li>Custom Programs</li>
                <li>Tournament Prep</li>
                <li>Team Bonding </li>
            </ul>
            <button>Enroll Now</button>
        </div>
        </div>
        
        


      
    </div>
  )
}

export default Training