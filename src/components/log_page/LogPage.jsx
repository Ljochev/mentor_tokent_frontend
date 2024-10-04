import React from 'react';
import { Link } from 'react-router-dom';
import VectaryTexture from '../../assets/log_pages/VectaryTexture.png';
import Logo from '../Logo.jsx';
import MentorLogo from '../../assets/logo.svg';
import rocket from '../../assets/Rocket.svg';
import './LogPage.css';

const LogPage = ({logData}) => {
  return (
    <div className="log_page_wrap">
    <img className="bg-log-scene" alt="background log scene" src={VectaryTexture}/>
    <div className="log_page_info">
      <div>
      <h1>GROW<br/>YOUR STARTUP!</h1>
      <span>MONITORING AND EVALUATING NOW IS EASY!</span>
      </div>
      <div className="log_page_logo">
      <Link to='/'>
       <Logo color={"white"}/>
      </Link>
        <p>mentortoken.com</p>
      </div>
    </div>
    <div className="log_section">
    <img className="log_rocket" src={rocket}/>
    <Link to='/'><img className="mentor_logo_img" src={MentorLogo}/></Link>
    <div className="log_section_component">
    {logData}
    </div>
    </div>
  </div>
  )
}

export default LogPage