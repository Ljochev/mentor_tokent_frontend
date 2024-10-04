import React, { useState, useEffect } from 'react';
import './RegisterToggle.css';
import Button from '../Button';

const RegisterToggle = ({typeUpdate}) => {
  const [type, setType ] = useState('company');
  const [startupColor, setStartupColor ] = useState('');
  const [startupTextColor, setStartupTextColor ] = useState('');
  const [mentorColor, setMentorColor ] = useState('');
  const [mentorTextColor, setMentorTextColor ] = useState('');

    useEffect(() => {
        type === 'company' ?
         (setStartupColor("rgba(105, 108, 255, 1)"), setStartupTextColor("rgba(86, 106, 127, 1)")) :
          (setStartupColor("rgba(245, 245, 249, 1)"), setStartupTextColor("white"));
        type === 'mentor' ?
         (setMentorColor("rgba(105, 108, 255, 1)"), setMentorTextColor("rgba(86, 106, 127, 1)")) :
          (setMentorColor("rgba(245, 245, 249, 1)"), setMentorTextColor("white"));
          typeUpdate(type);
          }, [type]);

          const updateType = (e, value) => {
            e.preventDefault();
            setType(value);
          };

  return (
    <div className='toggle_register'>
        <Button 
        mySubmit={(e) => updateType(e,'company') }
        name="Startup"  
        width='50%' 
        colour={startupColor} 
        textColour={mentorTextColor} />
        <Button 
        mySubmit={(e) => updateType(e,'mentor') }
        name="Mentor"   
        width='50%' 
        colour={mentorColor}
        textColour={startupTextColor} />
    </div>
  )
}

export default RegisterToggle