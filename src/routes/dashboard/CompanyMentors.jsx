import React, { useEffect, useState } from 'react'
import './CompanyMentors.css'
import { useNavigate, useLocation} from 'react-router-dom'
import MyMentors from '../../components/logged_user/MyMentors.jsx';
import MentorStatistics from '../../components/logged_user/MentorStatistics.jsx';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const CompanyMentors = () => {
const [mentorSelected, setMentorSelected] = useState(null);
const [directJobForm, setDirectJobForm] = useState(false);

  const query = useQuery();
  const handleViewMentor = (mentor) => {
    setMentorSelected(mentor);
  };


  const handleExitMentor = () => {
    setMentorSelected(null);
  };


  useState(() => {
    setMentorSelected(query.get('mentorId'));
  },[]);


  return (
    <div className='company_mentors'>
      {mentorSelected ? <div className="company_mentors_list">
        <MentorStatistics 
      mentorId={mentorSelected} 
      handleExitMentor={handleExitMentor} />
        </div> : 
        <MyMentors handleViewMentor={handleViewMentor}/>
        }

      {directJobForm ? <div className='direct_job_screen'>hello</div> : null}
    </div>
  )
}

export default CompanyMentors