import React, { useEffect, useState }  from 'react';
import './QickOverview.css';

const QickOverview = ({mentorId = null, companyId = null, handleSelection, description = null }) => {
    const [selected, setSelected] = useState('all');
    const [token, setToken] = useState('');
    const [jobAplications, setJobAplications] = useState([]);
    const [totalJobs, setTotalJobs] = useState(0);
    const [assignedJobs, setAssignedJobs] = useState(0);
    const [totalApplications, settotalApplications] = useState(0);
    const [finishedJobs, setFinishedJobs] = useState(0);

    const [companyAplications, setCompanyAplications] = useState([]);
    const [totalMentors, setTotalMentors] = useState(0);
    const [totalAssigned, setTotalAssigned] = useState(0);
    const [finishCompJobs, setFinishCompJobs] = useState(0);




    const fetchMentorAssignedJobs = async (mentorId = null, date = null) => {
        try {
          const applicationResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/mentor/dateApplications/${mentorId}/${date}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });
          const applicationData = await applicationResponse.json();
          setJobAplications(applicationData);
        } catch (error) {
          console.log("This is the error: ", error);
        }
      };
    
      const getCompanyAppsFromDate = async (date) => {
        try {
          const applicationResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/company/dateApplications/${date}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });
          const applicationData = await applicationResponse.json();
          setCompanyAplications(applicationData);
        } catch (error) {
          console.log("This is the error: ", error);
        }
      };
 
      useEffect(() => {
        setToken(localStorage.getItem("jwt_token"));
      },[]);

    useEffect(() => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const lastMonth = currentDate.getMonth()-1; // 0-indexed month
        const currentDay = currentDate.getUTCDate();
    
        const lastMonthDate = new Date(year, lastMonth, currentDay);
        console.log(lastMonthDate, "From QuickOverview");
        if(token !== '') {
          if(companyId === null) {
            fetchMentorAssignedJobs(mentorId, 'null');
          } else {
            getCompanyAppsFromDate(lastMonthDate);
          }
        }
      }, [mentorId, token]);

      useEffect(() => {
        if(token) {
          if (jobAplications.length > 0) { // find all jobs (pending, done and in progress)
            const jobsTotal = jobAplications.filter(job => job.acceptedStatus !== 'rejected');
            setTotalJobs(jobsTotal.length);
            const jobsAssigned = jobAplications.filter(job => job.status === 'assigned');
            setAssignedJobs(jobsAssigned.length);
            const jobsApplied = jobAplications.filter(job => job.applicationType === 'mentorToCompany');
            settotalApplications(jobsApplied.length);
            const jobsDone = jobAplications.filter(job => job.acceptedStatus === 'done');
            // console.log("Here is the data that shows how much done jobs is from mentor"); 
            setFinishedJobs(jobsDone.length);
          } 
          if (companyAplications.length > 0) { // find all jobs (pending, done and in progress)
            
            const jobsAssigned = companyAplications.filter(job => job.status === 'assigned');
            setTotalAssigned(jobsAssigned.length);
            const jobsDone = companyAplications.filter(job => job.acceptedStatus === 'done');
            setFinishCompJobs(jobsDone.length);
            const mentors = [];
            companyAplications.forEach((app) => {
              if(!mentors.includes(app.mentorId)) {
                mentors.push(app.mentorId);
              }
            })
            // console.log(mentors);
            setTotalMentors(mentors.length);
          } 
        }
      }, [selected, jobAplications, companyAplications]);

      const handleSelect = (e, select) => {
        e.preventDefault();
        setSelected(select);
        if(companyId === null) {
          handleSelection(select);
        }
    };

  return (
    <div className="quick_overview">
        <h2>Quick Overview</h2>
        {description ? <span className='overview_desc'>{description}</span> : null}
        {companyId === null ? 
        
        // Mentor Statistics
        <div className="ovewview_display_section">
        <div 
        onClick={(e) => handleSelect(e,'all')}
        className={ selected === 'all' ? "overview_display_selected" : "overview_display"}
        >
            <p>Total Jobs</p>
            <span>{totalJobs}</span>
        </div>
        <div 
        onClick={(e) => handleSelect(e,'assigned')}
        className={ selected === 'assigned' ? "overview_display_selected" : "overview_display"}
        >
            <p>Total Assigned Jobs</p>
            <span>{assignedJobs}</span>
        </div>
        <div 
        onClick={(e) => handleSelect(e,'mentorToCompany')}
        className={ selected === 'mentorToCompany' ? "overview_display_selected" : "overview_display"}
        >
            <p>Jobs That You Have Applied</p>
            <span>{totalApplications}</span>
        </div>
        <div 
        onClick={(e) => handleSelect(e,'done')}
        className={ selected === 'done' ? "overview_display_selected" : "overview_display"}
        >
            <p>Finished Jobs</p>
            <span>{finishedJobs}</span>
        </div>
        </div> : 
        // Company Statistics
        <div className="ovewview_display_section">
        <div 
        onClick={(e) => handleSelect(e,'all')}
        className={ selected === 'all' ? "overview_display_selected" : "overview_display"}
        >
            <p>Total Mentors</p>
            <span>{totalMentors}</span>
        </div>
        <div 
        onClick={(e) => handleSelect(e,'assigned')}
        className={ selected === 'assigned' ? "overview_display_selected" : "overview_display"}
        >
            <p>Total Assigned Jobs</p>
            <span>{totalAssigned}</span>
        </div>
        <div 
        onClick={(e) => handleSelect(e,'done')}
        className={ selected === 'done' ? "overview_display_selected" : "overview_display"}
        >
            <p>Finished Jobs</p>
            <span>{finishCompJobs}</span>
        </div>
        </div>
        } 
    </div>
  )
}

export default QickOverview