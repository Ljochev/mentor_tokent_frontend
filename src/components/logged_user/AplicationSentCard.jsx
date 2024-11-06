import React, { useEffect, useState } from 'react';
import clockIcon from '../../assets/log_pages/clock_icon.svg';
import './AplicationSentCard.css';

const AplicationSentCard = ({job=null, isPendingOffer = false, handleRefreshPending = () => {}}) => {

  const [token, setToken] = useState('');

const cancelJobOffer = async (JobId, AppId) => {
  
    try {
      const deletedJobResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/job/${JobId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const deletedJob = await deletedJobResponse.json();

      const deletedAplicationResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/company/application/${AppId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const deletedAplication = await deletedAplicationResponse.json();

alert(`Job with jobId :${deletedJob}, and aplication with id :${deletedAplication}, was deleted`);
    } catch (error) {
      console.log("This is the error: ", error);
    }
};

const handleCancelOffer = (e, job) => {
e.preventDefault();
if(token !== '') {
cancelJobOffer(job.jobId, job.id);
}
handleRefreshPending();
};


useEffect(() => {
  const tokken = localStorage.getItem("jwt_token");
  setToken(tokken);
}, []);


  let date ='';
if(job) {
  date = new Date(job.createdAt).toLocaleDateString();
}
  return (
    <>
    { 
      isPendingOffer ? ((job ) ?

      <div  className='aplications_sent_card'>
          <span>{job.title}</span>
          <button
          type='button'
          onClick={(e) => {handleCancelOffer(e, job)}}
          >Cancel Offer</button>
      </div> : 
      <div  className='aplications_sent_card'>
      <span>No data to be displayed.</span>
  </div> ) : (job ) ?

<div  className='aplications_sent_card'>
    <span>{job.title}</span>
    <div className="clock_time_rotate">
    <p className="clock_text" >{date}</p>
    <img src={clockIcon}/>
    </div>
</div> : 
<div  className='aplications_sent_card'>
<span>No data to be displayed.</span>
</div>
    

    }
    </>
  )
}

export default AplicationSentCard