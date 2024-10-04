import React, { useEffect, useState } from 'react';
import AplicationSentCard from './AplicationSentCard.jsx';
import './PendingJobOffers.css';

const PendingJobOffers = ({mentorId, refreshPending, refreshFetch}) => {
const [cardData, setCardData] = useState([]);
const [jobs, setJobs] = useState([]);
const [jobAplications, setJobAplications] = useState([]);
const [token, setToken] = useState('');

const handleRefreshPending = () => {
  refreshFetch();
};
    const fetchPendingDirectJobs = async () => {
        try {
          const applicationResponse = await fetch(`/api/directAplications/${mentorId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });
          const applicationData = await applicationResponse.json();
          setJobAplications(applicationData);
          const idList = applicationData.map(application => application.jobId);
          setJobs([]);
          if (idList.length > 0) {
            const allJobs = await fetch(`/api/job/ids/${idList}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
            });
            const allJobsReceived = await allJobs.json();
            setJobs(allJobsReceived);
          }
        } catch (error) {
          console.log("This is the error: ", error);
        }
      };

      useEffect(() => {
        const tokken = localStorage.getItem("jwt_token");
        setToken(tokken);
      }, []);

      useEffect(() => {
        if(token !== '') {
          fetchPendingDirectJobs();
        }
      }, [token, refreshPending]);


    useEffect(() => {
        const jobsData = jobAplications.map((aplication, i) => {
          const job = jobs.find(job => job._id === aplication.jobId && aplication.acceptedStatus === 'pending');
          if (job) {
            return {
                jobId: job._id,
              title: job.title,
              id: aplication._id,
              acceptedStatus: aplication.acceptedStatus,
            };
          } else {
            return null; 
          }
        }).filter(job => job !== null)
        setCardData(jobsData)
            },[jobs]);


  return (
    <div className='pending_offers'>
    <h2>Pending Job Offers</h2>
        <div className="job_offers_list">
        {
        cardData.length > 0 ?
        cardData.map((job) => 
          <AplicationSentCard
          key={job._id}
        isPendingOffer={true} 
        job={job} 
        handleRefreshPending={handleRefreshPending}
          />
        ) : <AplicationSentCard />
      }
        </div>
    </div>
  )
}

export default PendingJobOffers