import React, {useEffect, useState} from 'react';
import getMoscData from './../../mock-data.js';
import Button from './../components/Button.jsx';
import right_arrow from './../assets/arrow-right.svg';
import MemberCard from '../components/MemberCard.jsx';
import './AboutPage.css';

const AboutPage = () => {
  const [myData, setMyData] = useState([]);

  useEffect(()=> {
    setMyData(getMoscData());
  },[]);

  return (
    <main>
      <div className="team_header">
        <h2>Meet our team members</h2>
        <p>We Focus on the details of everything we do. All to help businesses around the world 
        Focus on what's most important to them.</p>
        <Button name={'Get in touch'} img_src={right_arrow}/>
      </div>
      <div className="team_section">
        {myData.map((person,i) => (
          <MemberCard person={person} key={i}/>
        ))}
      </div>
    </main>
  )
}

export default AboutPage
