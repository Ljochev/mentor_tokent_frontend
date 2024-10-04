import React, { useEffect, useState } from 'react';
import PhotoCircle from './../../assets/log_pages/PhotoCircle.svg';
import PhotoCam from './../../assets/log_pages/PhotoCam.svg';
import Logo from './../../assets/logo.svg';
import './PhotoSelection.css';

const PhotoSelection = ({photo=null, selectPicture = (e) => {e.preventDefault()}}) => {
  const [image, setImage] = useState('');

  useEffect(() => {
    if (photo === null) {
      setImage(Logo);
    } else {
      setImage(photo);
    }
  }, [photo]);
  
  return (
    <div className='photo_selection' onClick={(e) =>  selectPicture(e)}>
      <img className='img_circle' src={PhotoCircle}></img>
      <img className='img_photo' src={PhotoCam}></img>
      <img className='img_account' src={image}/>
    </div>
  )
}

export default PhotoSelection