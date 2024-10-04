import React, { useEffect, useState }  from 'react'
import './CompanyDashboard.css'
import AssignedJobs from '../../components/logged_user/AssignedJobs';
import BestPerMentors from '../../components/logged_user/BestPerMentors.jsx';
import Statistics from '../../components/logged_user/Statistics.jsx';


const CompanyDashboard = () => {
    const [jobFilter, setJobFilter] = useState("all");
    const [assignedJobs, setAssignedJobs] = useState([]);
    const [aplications, setAplications] = useState([]);
    const [token, setToken] = useState('');
    const [filtered, setFiltered] = useState("all");
   

    useEffect(() => {
      const storedToken =localStorage.getItem("jwt_token");
      setToken(storedToken);

},[]);

    const handleFilteredStats = ( filter) => {
      setFiltered(filter);
    };

  
    return (
      <div className="company_dashboard">
        <div className="company_dashboard_left">
          <AssignedJobs 
          companyId={true}
          handleSelectedFilter = {handleFilteredStats}
          />
        </div>
        <div className="company_dashboard_right">
          <BestPerMentors/>
          <Statistics filter={filtered}/>
        </div>
      </div>
    )
  }

export default CompanyDashboard