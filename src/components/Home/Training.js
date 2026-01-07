import React from 'react';
import './CSS/Training.css';

function Training() {
  return (
    <div className='Training'>
      <header className="training-header">
        <h1>TRAINING <span>PROGRAMS</span></h1>
        <p>Choose your path to greatness</p>
      </header>

      <div className="cards-container">
        {/* Youth Training */}
        <div className="card">
          <div className="icon-box">👤</div>
          <h2>YOUTH TRAINING</h2>
          <p className="desc">Foundation skills and fundamentals for young ballers ages 8-14</p>
          <ul>
            <li>Skill Development</li>
            <li>Teamwork Focus</li>
            <li>Fun & Engaging</li>
          </ul>
          <button className="enroll-btn">ENROLL NOW</button>
        </div>

        {/* Advanced Training - Highlighted */}
        <div className="card active">
          <div className="icon-box">🏆</div>
          <h2>ADVANCED TRAINING</h2>
          <p className="desc">High-intensity programs for competitive players ready to level up</p>
          <ul>
            <li>Elite Coaching</li>
            <li>Game Strategy</li>
            <li>Performance Tracking</li>
          </ul>
          <button className="enroll-btn fill">ENROLL NOW</button>
        </div>

        {/* Team Camps */}
        <div className="card">
          <div className="icon-box">🎯</div>
          <h2>TEAM CAMPS</h2>
          <p className="desc">Intensive team-building camps for groups and organizations</p>
          <ul>
            <li>Custom Programs</li>
            <li>Tournament Prep</li>
            <li>Team Bonding</li>
          </ul>
          <button className="enroll-btn">ENROLL NOW</button>
        </div>
      </div>
    </div>
  );
}

export default Training;