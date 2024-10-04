import React, { useEffect, useState } from 'react';
import MentorReviewCard from './MentorReviewCard';
import './MentorCardBox.css';

const MentorCardBox = ({handleViewMentor}) => {
  const [token, setToken] = useState(``);
  const [allMentors, setAllMentors] = useState([]);

const fetchAllMentors = async () => {
  try {
    const mentorsResponse = await fetch(`/api/user/mentors`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    const mentors = await mentorsResponse.json()
    setAllMentors(mentors);
    console.log(mentors);
} catch (error) {
console.log("This is the error: ", error);
}
};

useEffect(() => {
setToken(localStorage.getItem("jwt_token"));
},[]);

useEffect(() => {
if(token !== '') {
  fetchAllMentors();
}
},[token]);
  return (
    <div className="mentor_card_box">
      {
        allMentors.length > 0 ?
      allMentors.map(mentor => <MentorReviewCard mentor={mentor} handleViewMentor={handleViewMentor} key={mentor._id}/>) :
      <MentorReviewCard />
      }
        </div>
  )
}

export default MentorCardBox