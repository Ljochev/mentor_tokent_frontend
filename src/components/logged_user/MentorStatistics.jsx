import React, { useState } from 'react';
import UserStats from './UserStats.jsx';
import AssignedJobs from './AssignedJobs.jsx';
import PendingJobOffers from './PendingJobOffers.jsx';
import './MentorStatistics.css';

const MentorStatistics = ({mentorId, handleExitMentor}) => {
const [refreshPending, setRefreshPending] = useState(false);

const refreshFetch = () => {
setRefreshPending(!refreshPending);
};
  return (
    <div className="mentor_statistics">
          <UserStats title={'company'} mentorId={mentorId} handleExitMentor={handleExitMentor} refreshFetch={refreshFetch}/>
          <div className="mentor_statistics_job_section">
            <div className="job_section_left">
              <AssignedJobs mentorId={mentorId} renewData={refreshPending}/>
            </div>
            <div className="job_section_right">
              <PendingJobOffers mentorId={mentorId} refreshPending={refreshPending} refreshFetch={refreshFetch}/>
            </div>
        </div>
    </div>
  )
}

export default MentorStatistics