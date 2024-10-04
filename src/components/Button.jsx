import React from 'react';
import './Button.css';

const Button = ({
  name, 
  img_src=null, 
  width="fit-content", 
  mySubmit, 
  colour="#696CFF", 
  textColour="white", 
  disabled = false,
  type = 'submit'
}) => {
  return (
    <button 
      name={name} 
      style={{
        width: width,
        type,
        backgroundColor: disabled ? 'grey' : colour,
        border: `1px solid ${colour}`,
        color: textColour,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1
      }}
      onClick={mySubmit}
      type={type}
    >
      {img_src && <img src={img_src} alt={name} />}
      {name}
    </button>
  );
}

export default Button