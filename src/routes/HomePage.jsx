import React from "react";
import { useNavigate } from 'react-router-dom';
import Button from './../components/Button.jsx';
import bgScene from './../assets/home_page/unsplashScene.png';
import MentorsTemp from './../assets/home_page/Mentors_Token_Template.svg';
import BtmDecoration from './../assets/home_page/buttom_decoration.svg';
import Feautures from "../components/home_page/Feautures.jsx";
import Companies from "../components/home_page/Companies.jsx";
import right_arrow from './../assets/arrow-right.svg';
import './HomePage.css';

const HomePage = () => {
  
  const navigate = useNavigate();

  const updateNav = (e, value) => {
    e.preventDefault();
    navigate(value);
  }

  return (
    <main>
       <div className="home-page-wrap">
        <img className="bg-scene" alt="background scene" src={bgScene}/>
        <div className="home_page_unsplash">
          <div className="unsplash_textbox">
            <h1>
            Grow your StartUp! Monitoring and Evaluating now is easy!
            </h1>
            <p>
            Welcome to Mentor Token, where we redefine the dynamics of start-up success. 
            Our innovative platform offers a transformative approach to mentorship, 
            ensuring that mentors are not just engaged but motivated to drive the success of the ventures they support.
            </p>
          </div>
          <div className="unsplash-get-started">
            <Button name={'Get Started'} img_src={right_arrow}/>
            <p onClick={(e) => updateNav(e,'/contact')}>Get in Touch</p>
          </div>
        </div>
      </div>
      <Companies/>  
      <Feautures/>  
      <div className="home-buttom">
        <span>Every <strong>success</strong> <br/> is rewarded!</span>
        <div className="buttom-img">
          <img  src={MentorsTemp}/>
          <div className="relative">
            <img src={BtmDecoration} />
          </div>
        </div>
      </div>
    </main>
  )
}

export default HomePage