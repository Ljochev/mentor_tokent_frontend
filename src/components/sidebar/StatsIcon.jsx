import React from 'react';
import './NavIcon.css';

const StatsIcon = ({fillColor='rgba(86, 106, 127, 1)', size='24'}) => {
  return (
    <div className={fillColor === 'rgba(86, 106, 127, 1)' ? "nav_icon" : "nav_icon_background"}>
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke={fillColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M10 7H7V16H10V7Z" stroke={fillColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M17 7H14V12H17V7Z" stroke={fillColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
<span style={{color: fillColor }} >My Stats</span>
    </div>
  )
}

export default StatsIcon