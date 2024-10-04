import React from 'react'
import FeatureCard from './FeatureCard'
import rocketIcon from './../../assets/home_page/rocketIcon.svg'
import analyticsIcon from './../../assets/home_page/analyticsIcon.svg'
import rewardIcon from './../../assets/home_page/rewardIcon.svg'
import libraryIcon from './../../assets/home_page/libraryIcon.svg'
import rocket from './../../assets/Rocket.svg'
import './Features.css'

const Feautures = () => {
  return (
    <div className="features-class">
      <img className='rocket' src={rocket} alt="rocket" />
        <h4>FEATURES</h4>
        <div className='features-about'>
        <p>Boost Your Startup's Journey:<br/>
        Discover Mentor Token's Robust<br/>
        Features</p>
        </div>
        <div className="features-card-container">
      <FeatureCard 
      logo={rocketIcon}
      name="Goal Setting"
      task="Set clear and achievable goals for your startup's success."
      />
      <FeatureCard 
      logo={analyticsIcon}
      name="Performance Tracking"
      task="Monitor mentor performance in real-time and track progress."
      />
      <FeatureCard 
      logo={rewardIcon}
      name="Reward System"
      task="Motivate mentors with a secure and rewarding token-based reward system."
      />
      <FeatureCard 
      logo={libraryIcon}
      name="Knowledge Library"
      task="Access a comprehensive knowledge library to equip mentors with the skills, and motivation"
      />
        </div>
      </div>
  )
}

export default Feautures