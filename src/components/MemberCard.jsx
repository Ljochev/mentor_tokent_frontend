import React from 'react';
import { Link } from 'react-router-dom';
import FacebookSocial from './../assets/about_page/FacebookSocial.svg';
import GithubSocial from './../assets/about_page/GithubSocial.svg';
import LinkedInSocial from './../assets/about_page/LinkedInSocial.svg';
import './MemberCard.css';

const MemberCard = ({person}) => {
    const {img, name, position, aboutMe, gitGub, linedIn, facebook} = person;
  return (
    <div className='member_card' >
        <img src={img} alt={name} />
        <h3 >{name}</h3>
        <h4 >{position}</h4>
        <p >{aboutMe}</p>
        <div className='card_social'>
        <Link to={gitGub}><img  src={FacebookSocial}></img></Link>
        <Link to={linedIn}><img  src={GithubSocial}></img></Link>
        <Link to={facebook}><img  src={LinkedInSocial}></img></Link>
        </div>
      </div>
  )
}

export default MemberCard