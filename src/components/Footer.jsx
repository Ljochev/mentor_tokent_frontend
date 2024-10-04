import React from 'react';
import { useNavigate }  from 'react-router-dom';
import Logo from './Logo';
import FacebookLogo from './../assets/FacebookLogo.svg';
import LinkedInLogo from './../assets/LinkedInLogo.svg';
import TweeterLogo from './../assets/TweeterLogo.svg';
import './Footer.css';

const Footer = () => {
const navigate = useNavigate();
  const updateNav = (e,value) => {
    e.preventDefault();
    navigate(value);
    }
  return (
  <footer>
      <div className='footer-top'>
        <div className='footer-info'>
            <Logo onClick={(e) => updateNav(e,'/')}/>
          <p>With Mentor Token, Every failiure transforms into an opportunity for growth.</p>
        </div>
        <div className='footer-pages'>
          <b>Pages</b>
          <p onClick={(e) => updateNav(e,'/')}>Home</p>
          <p onClick={(e) => updateNav(e,'/contact')}>ContactUS</p>
        </div>
        <div className='footer-contact'>
          <b>Contact</b>
          <a href={"mailto:info@mentortoken.com"}>info@mentortoken.com</a>
          <a href="tel:+ (389) 123 456789">+ (389) 123 456789</a>
        </div>
        <div className='footer-follow-us'>
          <b>Follow Us</b>
          <div className='img-section'>
            <a><img src={LinkedInLogo} alt="LinkedInLogo" /></a>
            <a><img src={TweeterLogo} alt="TweeterLogo" /></a>
            <a><img src={FacebookLogo} alt="FacebookLogo" /></a>
          </div>
        </div>
      </div>
      <hr/>
      <p className='footer-bottom'>©2024 Mentor Token.   All right reserved.</p>
  </footer>
  )
}

export default Footer