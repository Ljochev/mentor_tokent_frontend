import React from 'react';

const CloseIcon = ({fill='red', size='17px'}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 -960 960 960"  fill={fill}>
        <path stroke={fill}  d="m291-240-51-51 189-189-189-189 51-51 189 189 189-189 51 51-189 189 189 189-51 51-189-189-189 189Z"/></svg>
  )
}

export default CloseIcon