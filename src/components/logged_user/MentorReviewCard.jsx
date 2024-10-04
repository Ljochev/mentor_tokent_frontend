import React, {  useState } from 'react';
import PhotoCam from '../../assets/log_pages/PhotoCam.svg';
import LinkedinLogo from '../../assets/log_pages/linkedin-logo.svg';
import './MentorReviewCard.css';

const MentorReviewCard = ({mentor = {}, handleViewMentor, jobAplication = {}, type = 'mentor', handleRenew, handleViewMore}) => {
  const [token, setToken] = useState(`${localStorage.getItem("jwt_token")}`);

 const userDataSkills = mentor.skills;

 const handlePending = async (decision, appId) => {
  const status = decision;
  let acceptedStatus;
  if(decision === 'assigned') {
    acceptedStatus = 'in progress';
  } else if(decision === 'rejected') {
    acceptedStatus = 'rejected';
  }
  try {
    const aplicationEdit = await fetch(`/api/company/application/${appId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        status,
        acceptedStatus,
      }),
    });
    const updatedApp = await aplicationEdit.json();
    console.log("This is the updated aplication: ", updatedApp);
    handleViewMore();
    handleRenew();
  } catch(error) {
    console.log("This is the error: ", error);
    };
};


const handleVisitMentor = (e, mentorId) => {
    e.preventDefault();
    handleViewMentor(mentorId);
};

  return (
    
    <div className='mentor_review_card'>
      {!mentor.skills ? 
      <div className="reviewCardLoading">
        {
          type === 'mentor' ? <h3>Loading...</h3> : <h3>No data!</h3>
        }
      </div>
       :
      <>
      <div className="mentor_info">
          <div className="mentor_picture">
            <img   src={mentor.image ? mentor.image : PhotoCam} />
          </div>
          <div className="mentor_info_data">
            <div className="linkedin_name">
              <h3>{mentor.name}</h3>
              <img className='linkedin_logo' src={LinkedinLogo} alt="linkedin"></img>
            </div>
            <div className="mentor_skills">
              <span>Skills:</span>
              {userDataSkills && userDataSkills.map((skill, i) => (
              <React.Fragment key={i}>
                {i !== 0 && <span className='span_line'>|</span>}
                <span>{skill}</span>
              </React.Fragment>
              ))}
            </div>
          </div>
      </div>
      {
        type === 'mentor' ? <div className="visit_mentor_class">
        <button type='button'
        onClick={(e) => handleVisitMentor(e, mentor._id)}
        >View Mentor</button>
        </div> :
        <div className="decide_pendin_app">
          <button className='accept_button' onClick={(e)=> handlePending('assigned',jobAplication._id)}>Assign Job</button>
          <button className='reject_button' onClick={(e)=> handlePending('rejected',jobAplication._id)}>Reject</button>
        </div>
      }
    </>
}
    </div>
  )
}

export default MentorReviewCard