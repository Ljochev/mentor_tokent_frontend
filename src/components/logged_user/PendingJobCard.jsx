import React, { useEffect, useState }  from 'react';
import './PendingJobCard.css';

const PendingJobCard = ({ title = null, jobId, aplicationId, handleRenew}) => {
  const [token, setToken] = useState(`${localStorage.getItem("jwt_token")}`);

  
  const handlePending = async (decision, appId) => {
  const status = decision;
  let acceptedStatus;
  if(decision === 'assigned') {
    acceptedStatus = 'in progress';
  } else if(decision === 'rejected') {
    acceptedStatus = 'rejected';
  }
  try {
    const aplicationEdit = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/mentor/application/${appId}`, {
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
    handleRenew();
  } catch(error) {
    console.log("This is the error: ", error);
    };
};

  return (
    <>
    { (title ) ?
        <div  className='pending_job_card'>
            <span>{title}</span>
            <div className='pending_job_card_status'>
              <button className='accept_button' onClick={(e)=> handlePending('assigned',aplicationId)}>Accept</button>
              <button className='reject_button' onClick={(e)=> handlePending('rejected',aplicationId)}>Reject</button>
            </div>
        </div> : <div  className='pending_job_card'>
            <span>No data to be displayed.</span>
        </div>

    }
    </>
  )
}

export default PendingJobCard