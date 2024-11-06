import React, { useEffect, useState } from 'react';
import PerformSelected from '../../assets/log_pages/PerformSelected.jsx';
import PhotoCam from '../../assets/log_pages/PhotoCam.svg';
import './BestPerMentors.css';

const BestPerMentors = () => {
const [allMentors, setAllMentors] = useState([]);
const [mentorSelected, setMentorSelected] = useState('');
const [filteredMentors, setFilteredMentors] = useState([{_id:1},{_id:2},{_id:3}]);
const [modifiedMentors, setModifiedMentors] = useState([]);
const [fetchedAplications, setFetchedAplications] = useState(false);
const [token, setToken] = useState(localStorage.getItem("jwt_token"));

useEffect(() => {
  if (!token) {
    const tokken = localStorage.getItem("jwt_token");
    setToken(tokken);
  }
}, [token]);

useEffect(() => {
  const fetchAllMentors = async () => {
    try {
      const mentorsResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user/mentors`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const mentorsList = await mentorsResponse.json();
      setAllMentors(mentorsList);
    } catch (error) {
      console.log("This is the error: ", error);
    }
  };

  if (token) {
    fetchAllMentors();
  }
}, [token]);

useEffect(() => {
  const fetchMentorStats = async (selectedMentor) => {
    try {
      const applicationsResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/company/mentorApplications/${selectedMentor._id}/done`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const mentorApplications = await applicationsResponse.json();
      const mentorData = {
        ...selectedMentor,
        achievedJobs: mentorApplications.length,
      };
      setModifiedMentors((prev) => [...prev, mentorData]);
    } catch (error) {
      console.log("This is the error: ", error);
    }
  };
  if (allMentors.length > 0) {
  setFetchedAplications(true);
    if(fetchedAplications === false) {
      allMentors.forEach(mentor => fetchMentorStats(mentor));
  setFetchedAplications(true);
    }
  }
}, [allMentors]);


useEffect(() => {
  if (modifiedMentors.length > 0 && modifiedMentors.length === allMentors.length) {
    setFilteredMentors([...modifiedMentors].sort((a, b) => b.achievedJobs - a.achievedJobs).slice(0,3));
  }
}, [modifiedMentors]);

useEffect(() => {
  if(filteredMentors && filteredMentors.length > 0)
  setMentorSelected(filteredMentors[0]._id);
},[filteredMentors]);

const handleSelected = (e, id) => {
e.preventDefault();
setMentorSelected(id);
};


  return (
    <div className="best_performing_mentors">
        <h2>Best Performing Mentors</h2>
        <div className="best_mentors_perform">
        {filteredMentors.map((mentor,i) => i < 3 && 
        <div key={mentor._id} className={ mentorSelected === mentor._id ? 'perform_card_selected' : 'perform_card'} onClick={(e) => handleSelected(e,mentor._id)}>
          <div className={ mentorSelected === mentor._id ? 'perform_card_img_selected' : 'perform_card_img'}>
          <img src={mentor.image ? mentor.image : PhotoCam}/>
          </div>
          <p className='performing_mentors_name'>{mentor.name ? mentor.name : "...Loading"}</p>
          <div className="perform_achived">
            <p>{mentor.achievedJobs ? mentor.achievedJobs : 0}</p>
            <span>Achived Jobs</span>
          </div>
          { mentorSelected === mentor._id ? <PerformSelected selected={true} mentorId={mentor._id}/> : <PerformSelected/>}
          </div>
        )}

        </div>
    </div>
  )
}

export default BestPerMentors