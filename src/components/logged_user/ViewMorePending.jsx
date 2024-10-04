import React from 'react';
import Logo from '../../assets/logo.svg';
import Xbtn from '../../assets/log_pages/X-button.svg';
import MentorReviewCard from './MentorReviewCard';
import './ViewMorePending.css';

const ViewMorePending = ({job, image=Logo,company, handleViewMore, mentors = [] , aplications = [], handleRenew}) => {
  return (
    <div className='view_more_pending'>
    <div className="view_card_pending">
        <div className="close_icon">
    <img src={Xbtn} alt="Close" onClick={handleViewMore}></img>
        </div>
        <div className="more_job_card_items">
    <div className="picture_name">
          <img src={company.image ? company.image : image}/>
          <p>{company.name ? company.name : 'No data'}</p>
        </div>
       <p className='cart_job_name'>{job.title ? job.title : 'No data'}</p>
       <p className='cart_desc'>{job.description ? job.description : 'No data' }</p>
       <p className='cart_job_name'>Mentors that applied to the job</p>
       <div className="applied_mentors_box">
  {mentors && aplications ? (
    aplications.map((aplication) => {
      const mentor = mentors.find((mentor) => mentor._id === aplication.mentorId);
      
      return mentor ? (
        <MentorReviewCard
          key={aplication._id}  // Ensure each card has a unique key
          jobAplication={aplication}
          mentor={mentor}
          type={'company'}
          handleRenew={handleRenew}
          handleViewMore={handleViewMore}
        />
      ) : null;
    })
  ) : (
    <MentorReviewCard />
  )}
</div>
        </div>
    </div>
</div>
  )
}

export default ViewMorePending

