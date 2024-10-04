import React from 'react'
import { useNavigate } from 'react-router-dom'
import './PerformSelected.css'

const PerformSelected = ({size = 22, selected=false, mentorId = null}) => {
  const navigate = useNavigate();


  const handleClick = (e) => {
    e.preventDefault();
    if(selected && mentorId) {
      navigate(`/companyMentors?mentorId=${mentorId}`);
    }
  };

  return (
    <div className={selected ? "performSelected_true" : 'performSelected'} onClick={(e) => handleClick(e)}>
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.0309 17.2075C16.3511 17.0254 15.9477 16.3266 16.1298 15.6468L18.7684 5.79952L8.92112 3.16096C8.24131 2.9788 7.83788 2.28004 8.02003 1.60023C8.20219 0.920416 8.90095 0.516985 9.58076 0.69914L20.6589 3.66753C21.3387 3.84968 21.7422 4.54845 21.56 5.22826L18.5916 16.3064C18.4095 16.9862 17.7107 17.3897 17.0309 17.2075ZM9.22726 21.713C8.54745 21.5308 8.14402 20.832 8.32617 20.1522L10.9647 10.305L1.11748 7.66639C0.437663 7.48424 0.0342321 6.78548 0.216387 6.10566C0.398542 5.42585 1.0973 5.02242 1.77712 5.20458L12.8553 8.17297C13.5351 8.35512 13.9385 9.05388 13.7564 9.73369L10.788 20.8119C10.6058 21.4917 9.90707 21.8951 9.22726 21.713Z" fill={selected ? 'rgba(108, 110, 255, 1)' : 'rgba(203, 198, 215, 1)'}/>
</svg>
    </div>

  )
}

export default PerformSelected