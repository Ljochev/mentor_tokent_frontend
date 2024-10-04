import React, { useEffect, useState } from 'react';
import PhotoCam from'../../assets/log_pages/PhotoCam.svg';
import ViewMorePending from './ViewMorePending';
import './CompanyCard.css';

const CompanyCard = ({job = {},  viewGrid=true,  handleViewMore = () => {}, user="mentor" , company={}}) => {
  const [appliedMentors, setAppliedMentors] = useState([]);
  const [aplications, setAplications] = useState([]);
  const [viewJobApps, setViewJobApps] = useState(false);
  const [token, setToken] = useState('');

  const fetchAplications = async (ID) => {

    try {
      const aplicationsData = await fetch(`/api/company/job/pendingApps/${ID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const aplications = await aplicationsData.json();
      setAplications(aplications);
    } catch (error) {
      console.log("This is the error: ", error);
    }
  };

  const fetchMentor = async (mentorId) => {
    try {
      const mentorData = await fetch(`/api/user/mentorId/${mentorId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const mentor = await mentorData.json();
      setAppliedMentors(prevMentors => [...prevMentors, mentor]);
      
    } catch (error) {
      console.log("This is the error: ", error);
    }
  };

const handleMore = () => {
  setViewJobApps(!viewJobApps);
};

const handleRenew = () => {
  setAplications([]);
    setAppliedMentors([]);
};

useEffect(() => {
  if (token === '') {
    setToken(localStorage.getItem('jwt_token'));
  }
}, []);

useEffect(() => {
  if (token !== '' && user !== 'mentor' && job._id && aplications.length === 0) {
    fetchAplications(job._id);
  }
}, [token]);

useEffect(() => {
  if (aplications.length > 0 && user !== 'mentor' && appliedMentors.length === 0) {
    aplications.forEach(app => fetchMentor(app.mentorId));
  }
}, [aplications]);


    


  return (
    <>
    {
      viewJobApps ?
      <ViewMorePending 
      job={job} 
      handleViewMore={handleMore}  
      company={company} 
      mentors={appliedMentors} 
      aplications={aplications} 
      handleRenew={handleRenew}
      /> : null
    }
    <div  className={viewGrid ? "company_cart" : "company_cart_wide"}>
            <div className="picture_name">
              {
                user === 'mentor' ?
                <img src={job.image ? job.image : PhotoCam}/> :
                <img src={company.image ? company.image : PhotoCam}/>
              }
              <p>{job.name ? job.name : ''}</p>
            </div>
           <p className='cart_job_name'>{job.title ? job.title : 'No jobs found'}</p>
           <p className='cart_desc'>{job.description ? job.description : ''}</p>
          {
            user === 'mentor' ? 
           <div className="company_cart_button">
            <button 
             className='company_cart_button'
             type="button"
             onClick={(e) => {
              e.preventDefault();
              handleViewMore(job);
             }}
             >View More</button> 
           </div> :
           <div className="applied_users_section">
             <div className="applied_users_info">
            <div className="applied_users_pictures">
              {
                appliedMentors.length >= 1 ? 
                <img className='applied_users_picture1' 
                src={appliedMentors[0].image || PhotoCam}></img> : null
              }
              {
                appliedMentors.length >= 2 ? 
                <img className='applied_users_picture2' 
                src={appliedMentors[1].image || PhotoCam}></img> : null

              }
              {
                appliedMentors.length >= 3 ? 
                <img className='applied_users_picture3' 
                src={appliedMentors[2].image || PhotoCam}></img> : null

              }
            </div>
            {
              appliedMentors.length > 3 ?
              <p>3+ Applicants</p> :
              appliedMentors.length === 3 ? 
              <p>3 Applicants</p> :
              appliedMentors.length === 2 ? 
              <p>2 Applicants</p> :
              appliedMentors.length === 1 ? 
              <p>1 Applicant</p> :
              <p>No Applicants</p>
            }
           </div>
              <button 
             className='company_cart_button'
             type="button"
             onClick={(e) => {
              e.preventDefault();
              handleMore();
             }}
             >View More</button>
             </div>
}
          </div>
          </>
  )
}

export default CompanyCard