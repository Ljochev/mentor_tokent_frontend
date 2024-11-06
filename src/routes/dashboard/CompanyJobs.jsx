import React, { useEffect, useState } from 'react'
import './CompanyJobs.css'
import CompanyCard from '../../components/logged_user/CompanyCard.jsx'
import CreateNewJob from '../../components/logged_user/CreateNewJob.jsx';
import ShapePlus from '../../assets/log_pages/ShapePlus.svg'

const CompanyJobs = () => {
  const [offerJob, setOfferJob] = useState(false);
  const [companyJobs, setCompanyJobs] = useState([]);
  const [company, setCompany] = useState({});
  const [token , setToken] = useState('');

  const fetchCompany = async () => {
    try {
      const myUser = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const userData = await myUser.json();
      setCompany(userData);
  
    } catch (error) {
      console.log("This is the error: ", error);
    }
  };

 const getOpenCompanyJobs = async () => {
  try {
    const jobsData = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/job/company/open`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    const jobs = await jobsData.json();
    setCompanyJobs(jobs);
  } catch (error) {
    console.log("This is the error: ", error);
  }
 }
  const handleOpenJob = () => {
    setOfferJob(!offerJob);
  };


  useEffect(() => {
    if(token === '') {
      setToken(localStorage.getItem('jwt_token'));
    }
  },[]);

  useEffect(() => {
    if(token !== '' && companyJobs.length === 0) {
        fetchCompany();
        getOpenCompanyJobs();
    }
  },[token]);
  return (
    <>
    {offerJob ? <div className='sendOpenAplication'>
      <CreateNewJob exitEdit={handleOpenJob} isDirectJob={false} refreshFetch={() => {}}/>
    </div> : null}
    <div className='company_jobs'>
    <div className="company_jobs_title">

              <h2>Your Startup Jobs</h2> 
              <button 
                   className='stats_card_button'
                   type='button'
                   onClick={() => {handleOpenJob()}}
                   ><img src={ShapePlus}/>Create New Job</button>
      </div>
      <div className="company_jobs_list">
        {
          companyJobs.length > 0 ?
          companyJobs.map(job => <CompanyCard key={job._id} job={job} user={"company"} company={company}/>)
          :
          <CompanyCard user={"company"} /> 
        }
        

      </div>

    </div>
    </>
  )
}

export default CompanyJobs