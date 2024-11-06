import React, { useEffect, useState }  from 'react';
import PendingJobCard from './PendingJobCard';
import './PendingJobs.css';

const PendingJobs = ({renewData, handleRenew}) => {

  const [cardData, setCardData] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [jobAplications, setJobAplications] = useState([]);
  const [token, setToken] = useState('');

  const fetchMentorAssignedJobs = async () => {
    try {
      const aplicationResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/mentor/application/null/pending`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const aplicationData = await aplicationResponse.json()
      setJobAplications(aplicationData);
      const idList = aplicationData.map(application => application.jobId);
      if(idList.length > 0) {
      const allJobs = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/job/ids/${idList}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const allJobsRecived = await allJobs.json();
      setJobs(allJobsRecived);
    }
    } catch (error) {
  console.log("This is the error: ", error);
}
};
useEffect(() => {
  if(token !== '') {
    fetchMentorAssignedJobs();
  }
},[token, renewData]);

useEffect(() => {
  const tokken = localStorage.getItem("jwt_token");
  setToken(tokken);
}, []);

    useEffect(() => {
      const jobsData = jobAplications.map((aplication, i) => {
        const job = jobs.find(job => job._id === 
          aplication.jobId && 
          aplication.acceptedStatus === 'pending' &&
          aplication.applicationType === 'companyToMentor');
        if (job) {
          return {
            title: job.title,
            jobId: job._id,
            aplicationId: aplication._id,
          };
        } else {
          return null; 
        }
      }).filter(job => job !== null);
      setCardData(jobsData);
    },[jobs])

  return (
    <div className='pending_jobs'>
        <h2>Pending Jobs</h2>
        <p>Jobs offered from your startup</p>
    <div className="job_list">    
      {    cardData.length > 0 ?
        cardData.map(job =>   ( 
          <PendingJobCard   
          key={job.jobId}
          id={job.jobId}
          title ={job.title}
          jobId = {job.jobId}
          aplicationId = {job.aplicationId}
          handleRenew={handleRenew}
          />    
        ))    :  <PendingJobCard/>
      }    
    </div>   
        </div>
  )
}

export default PendingJobs


