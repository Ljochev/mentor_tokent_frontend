import React, { useEffect, useState }  from 'react';
import JobListCard from './JobListCard';
import './AssignedJobs.css';

const AssignedJobs = ({companyId=null, mentorId=null, renewData, handleSelectedFilter = (filter) => {}}) => {

    const [jobFilter, setJobFilter] = useState("all");
    const [cardData, setCardData] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [jobAplications, setJobAplications] = useState([]);
    const [token, setToken] = useState('');

    const fetchMentorAssignedJobs = async (filter = 'all', mentorId) => {
    try {
      const applicationResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/mentor/application/${mentorId}/${filter}`, {
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
        const allJobs = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/job/ids/${idList}`, {
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

  const fetchAssignedCompanyJobs = async (filter = 'all') => {
    try {
      const applicationResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/company/application/${filter}`, {
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
        const allJobs = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/job/ids/${idList}`, {
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

  const fetchCompanyMentorJobs = async (mentorId, filter = 'all') => {
    try {
      const applicationResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/company/mentorApplications/${mentorId}/${filter}`, {
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
        const allJobs = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/job/ids/${idList}`, {
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

  const handleFilterChange = (filter) => {
    setJobFilter(filter);
  };

  const handleFetch = (filter) => {
    handleSelectedFilter(filter);
    setJobFilter(filter);
  };


  useEffect(() => {
    if (token) {
      if (companyId === null && mentorId === null) {
        fetchMentorAssignedJobs(jobFilter, mentorId);
      } else if (companyId && mentorId === null) {
        fetchAssignedCompanyJobs(jobFilter);
      } else if (mentorId && companyId === null) {
        fetchCompanyMentorJobs(mentorId, jobFilter);
      }
    }
  }, [jobFilter, token, companyId, mentorId, renewData]);

  useEffect(() => {
    if(token === '') {
      const tokken = localStorage.getItem("jwt_token");
      setToken(tokken);
    }
  }, []);


  useEffect(() => {
    if (token !== '') {
      handleFetch(jobFilter);
    }
  }, [renewData, token]);

    useEffect(() => {
const jobsData = jobAplications.map((aplication, i) => {
  const job = jobs.find(job => job._id === aplication.jobId && aplication.acceptedStatus !== 'pending');
  if (job) {
    return {
      title: job.title,
      id: aplication._id,
      acceptedStatus: aplication.acceptedStatus,
    };
  } else {
    return null; 
  }
}).filter(job => job !== null)
setCardData(jobsData)

    },[jobs])
  
  return (
    <div className="asiigned_jobs">
  <div className="assigned_jobs_class">
    <h2>Assigned Jobs</h2>
    <nav>
      <ul>
        <li 
        id='all'
        className={jobFilter === 'all' ? 'filter_nav_active' : 'filter_nav'}
        onClick={() => handleFetch("all")}
        >All</li>
        <li 
        id='done'
        className={jobFilter === 'done' ? 'filter_nav_active' : 'filter_nav'}
        onClick={() => handleFetch("done")}
        >Done</li>
        <li 
        id='rejected'
        className={jobFilter === 'rejected' ? 'filter_nav_active' : 'filter_nav'}
        onClick={() => handleFetch("rejected")}
        >{(companyId === null && mentorId) ? "Canceled" : "Rejected"}</li>
        <li 
        id='inprogress'
        className={jobFilter === 'in progress' ? 'filter_nav_active' : 'filter_nav'}
        onClick={() => handleFetch("in progress")}
        >In Progress</li>
      </ul>
    </nav>
    <div className="job_list">
      {
        cardData.length > 0 ?
        cardData.map((job) => 
          <JobListCard
          key={job.id}
          id={job.id}
          aplicationId={job.id}
          title ={job.title}
          acceptedStatus = {job.acceptedStatus}
          isCompanyMentor = {(mentorId && companyId === null) ? true : false}
          handleFilterChange={handleFilterChange}
          />
        ) : <JobListCard/>
      }
    </div>
  </div>
    </div>
  )
}

export default AssignedJobs