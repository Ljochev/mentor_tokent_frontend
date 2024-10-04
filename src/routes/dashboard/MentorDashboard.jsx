import React, { useEffect, useState }  from 'react'
import './MentorDashboard.css'
import AssignedJobs from '../../components/logged_user/AssignedJobs';
import PendingJobs from '../../components/logged_user/PendingJobs';
import ApplicationsSent from '../../components/logged_user/ApplicationsSent';


const MentorDashboard = () => {
  const [renewData, setRenewData] = useState(true);

  const handleRenew = () => {
    setRenewData(!renewData);
  }


  return (
    <div className="mentor_dashboard">
      <div className="mentor_dashboard_left">
        <AssignedJobs 
        renewData={renewData}
        />
      </div>
      <div className="mentor_dashboard_right">
        <PendingJobs
        renewData={renewData}
        handleRenew={handleRenew}
        />
        <ApplicationsSent
        renewData={renewData}
        />
      </div>
    </div>
  )
}

export default MentorDashboard
