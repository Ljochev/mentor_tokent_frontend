import React from 'react';

const SideIcon = ({direction=true, size, ...props }) => {

  return (
    <svg  width={size} height={size} {...props} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"
    transform={direction === true ? "rotate(0)" : "rotate(180)"}
    >
<circle cx="20" cy="20" r="20" fill="#F5F5F9"/>
<circle cx="20" cy="20" r="13" fill="#696CFF"/>
<path fillRule="evenodd" clipRule="evenodd" d="M21.8968 14L15.7143 20L21.8968 26L23.4286 24.5134L18.7779 20L23.4286 15.4866L21.8968 14Z" fill="white"/>
</svg>
  )
}

export default SideIcon