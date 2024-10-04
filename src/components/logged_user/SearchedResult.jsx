import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchedResult.css';

const SearchedResult = ({ user }) => {
  const navigate = useNavigate();

  const handleNavigate = (e, id, type) => {
    e.preventDefault();
    const url = type === 'mentor' ? `/companyMentors?mentorId=${id}` : `/mentorJobFeed?companyId=${id}`;
    navigate(url);
  };

  return (
    <div 
      className='searched_result' 
      onClick={(e) => handleNavigate(e, user._id, user.type)}
    >
      <img className='searched_user_photo' src={user.image} alt={user.name} />
      <span>{user.name}</span>
    </div>
  );
};

export default SearchedResult;