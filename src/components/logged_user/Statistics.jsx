import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import { jwtDecode } from 'jwt-decode';
import './Statistics.css';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const getMonthName = (monthNumber) => {
  switch (monthNumber) {
    case 0: return "Jan";
    case 1: return "Feb";
    case 2: return "Mar";
    case 3: return "Apr";
    case 4: return "May";
    case 5: return "Jun";
    case 6: return "Jul";
    case 7: return "Aug";
    case 8: return "Sep";
    case 9: return "Oct";
    case 10: return "Nov";
    case 11: return "Dec";
    default: return "Invalid month number";
  }
};

const Statistics = ({mentorId = null, filter = 'all'}) => {
  const [token, setToken] = useState('');
  const [decodedToken, setDecodedToken] = useState('');
  const [jobAplications, setJobAplications] = useState([]);
  const [monthsNames, setMonthsNames] = useState([]);
  const [monthsNumbers, setMothsNumbers] = useState([]);
  const [dataMonths, setDataMonths] = useState(new Array(12).fill(0));

  const fetchMentorAssignedJobs = async (mentorId, lastYearDate) => {
    try {
      const applicationResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/mentor/dateApplications/${mentorId}/${lastYearDate.toISOString()}`, {
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

  const fetchCompanyAssignedJobs = async (lastYearDate) => {
    try {
      const applicationResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/company/dateApplications/${lastYearDate.toISOString()}`, {
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
  

  useEffect(() => {
    const storedToken = localStorage.getItem("jwt_token");
    setToken(storedToken);
    setDecodedToken(jwtDecode(storedToken));
},[]);

  useEffect(() => {
    if(token !== '') {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1; // 0-indexed month
      const monthListName = [];
      const montsByNumber = [];
  
      for (let i = 0; i < 12; i++) {
        monthListName.push(getMonthName((currentMonth + i) % 12));
        montsByNumber.push((currentMonth + i) % 12);
      }
      const lastYear = currentDate.getFullYear() - 1;
      const lastYearDate = new Date(lastYear, currentMonth); // month is 0-indexed
      jwtDecode(token).type === "mentor" ?
      fetchMentorAssignedJobs(mentorId, lastYearDate) : 
      fetchCompanyAssignedJobs(lastYearDate);
      setMonthsNames(monthListName);
      setMothsNumbers(montsByNumber);
    }
  }, [mentorId, token]);

  useEffect(() => {
    if(decodedToken.type === 'mentor') { 
    if (filter === 'all' && jobAplications.length >= 0) { // find all jobs (pending, done and in progress)
      const monthlyData = new Array(12).fill(0);
      jobAplications.forEach(app => {
        const month = new Date(app.updatedAt).getMonth();
        monthsNumbers.forEach((monthNum, i) => {
          if (monthNum === month && app.acceptedStatus !== "rejected") {
            monthlyData[i]++;
          }
        });
      });
      setDataMonths(monthlyData);
    } else if(jobAplications.length >= 0 && filter === 'assigned'){ // find jobs (pending, done or in progress)
      const monthlyData = new Array(12).fill(0);
      jobAplications.forEach(app => {
        const month = new Date(app.updatedAt).getMonth();
        monthsNumbers.forEach((monthNum, i) => {
          if (monthNum === month && app.status === filter) {
            monthlyData[i]++;
          }
        });
      });
      setDataMonths(monthlyData);

    } else if(jobAplications.length >= 0 && filter === 'mentorToCompany'){ // find jobs that mentor applied and not rejected
      const monthlyData = new Array(12).fill(0);
      jobAplications.forEach(app => {
        const month = new Date(app.updatedAt).getMonth();
        monthsNumbers.forEach((monthNum, i) => {
          if (monthNum === month && app.applicationType === filter && app.acceptedStatus !== 'rejected') {
            monthlyData[i]++;
          }
        });
      });
      setDataMonths(monthlyData);

    } else if(jobAplications.length >= 0 && filter === 'done'){ // find jobs that mentor applied and not rejected
      const monthlyData = new Array(12).fill(0);
      jobAplications.forEach(app => {
        const month = new Date(app.updatedAt).getMonth();
        monthsNumbers.forEach((monthNum, i) => {
          if (monthNum === month && app.acceptedStatus === filter) {
            monthlyData[i]++;
          }
        });
      });
      setDataMonths(monthlyData);

    }} else if( decodedToken.type === 'company') {

      if(jobAplications.length >= 0 && filter === 'all'){ // find company jobs 
        const monthlyData = new Array(12).fill(0);
        jobAplications.forEach(app => {
          const month = new Date(app.updatedAt).getMonth();
          monthsNumbers.forEach((monthNum, i) => {
            if (monthNum === month && app.acceptedStatus !== "pending") {
              monthlyData[i]++;
            }
          });
        });
        setDataMonths(monthlyData);
  
      } else if(jobAplications.length >= 0 && filter === 'done'){ // find jobs
        const monthlyData = new Array(12).fill(0);
        jobAplications.forEach(app => {
          const month = new Date(app.updatedAt).getMonth();
          monthsNumbers.forEach((monthNum, i) => {
            if (monthNum === month && app.acceptedStatus === filter) {
              monthlyData[i]++;
            }
          });
        });
        setDataMonths(monthlyData);
  
      } else if(jobAplications.length >= 0 && filter === 'rejected'){ // find jobs 
        const monthlyData = new Array(12).fill(0);
        jobAplications.forEach(app => {
          const month = new Date(app.updatedAt).getMonth();
          monthsNumbers.forEach((monthNum, i) => {
            if (monthNum === month && app.acceptedStatus === filter) {
              monthlyData[i]++;
            }
          });
        });
        setDataMonths(monthlyData);
  
      } else if(jobAplications.length >= 0 && filter === 'in progress'){ // find jobs 
        const monthlyData = new Array(12).fill(0);
        jobAplications.forEach(app => {
          const month = new Date(app.updatedAt).getMonth();
          monthsNumbers.forEach((monthNum, i) => {
            if (monthNum === month && app.acceptedStatus === filter) {
              monthlyData[i]++;
            }
          });
        });
        setDataMonths(monthlyData);
  
      }
    } 
    
    
    

  }, [filter, jobAplications, monthsNumbers]);

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: Math.max(...dataMonths) + 0.3,
        ticks: {
          stepSize: 1,
          color: 'rgba(203, 198, 215, 1)',
          font: {
            size: 12, 
            family: 'Inter, sans-serif',
            weight: 500, 
          },
          callback: (value) => {
            if (value %5 === 0) {
              return value;
            }
            return null;
          },
        },
        grid: {
          display: true,
          drawTicks: false,
          color: (context) => {
            if (context.tick.value % 5 === 0 ) {
              return 'rgba(203, 198, 215, 1)';
            }
            return 'rgba(0, 0, 0, 0)';
          },
          borderColor: 'rgba(0, 0, 0, 0)', 
        },
        border: {
          display: false, 
        },
      },
      x: {
        grid: {
          display: false, 
          borderColor: 'rgba(0, 0, 0, 0)', 
        },
        border: {
          display: false, 
        },
        ticks: {
          display: true, 
          color: 'rgba(203, 198, 215, 1)',
          font: {
              size: 12, 
            family: 'Inter, sans-serif',
            weight: 500, 
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: function () { return ''; }, // Hide title in tooltips
          label: function (tooltipItem) { return tooltipItem.raw; }, // Show only the value
        },
      },
    },
  };

  const userData = {
    labels: monthsNames,
    datasets: [
      {
        data: dataMonths,
        borderColor: 'rgba(105, 108, 255, 1)',
        backgroundColor: 'rgba(105, 108, 255, 1)',
        borderWidth: 3,
        fill: false,
        pointRadius: 0,
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="performance_time">
      <h2>Performance Over Time</h2>
    <div className="statistics_chart">
      <h3>STATISTICS</h3>
      <p>Overrall target accomplishment over the year</p>
      <Line data={userData} options={options} />
    </div>
    </div>
  );
}

export default Statistics;