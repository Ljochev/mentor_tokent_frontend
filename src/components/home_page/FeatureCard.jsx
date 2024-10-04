import React from 'react'
import './FeatureCard.css'


const FeatureCard = ({logo, name, task}) => {

  return (
    <div className='card-class'>
        <img src={logo} alt={name} />
        <h5>
        {name}
        </h5>
        <h6>
        {task}
        </h6>
        </div>
  )
}

export default FeatureCard