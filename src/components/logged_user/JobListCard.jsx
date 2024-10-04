import React, { useEffect, useState } from 'react';
import './JobListCard.css';

const JobListCard = ({title=null, acceptedStatus=null, isCompanyMentor = false, aplicationId = null, handleFilterChange = () => {}}) => {
    const [status, setStatus] = useState('');
    const [color, setColor] = useState('');
    const [backgroundColor, setBackgroundColor] = useState('');
    const [updateProgress, setUpdateProgress] = useState(false);
    const [token, setToken] = useState('');

    useEffect(() => {
        if (acceptedStatus === 'done') {
            setStatus('DONE');
            setColor('rgba(49, 170, 39, 1)');
            setBackgroundColor('rgba(235, 246, 235, 1)');
          } else if (acceptedStatus === 'rejected') {
            setStatus(isCompanyMentor ? 'CANCELED' : 'REJECTED');
            setColor('rgba(242, 7, 106, 1)');
            setBackgroundColor('rgba(255, 240, 243, 1)');
          } else if (acceptedStatus === 'in progress') {
            setStatus('IN PROGRESS');
            setColor('rgba(105, 108, 255, 1)');
            setBackgroundColor('rgba(211, 211, 255, 0.4)');
          }
    },[])

    useEffect(() => {
      if(token === '') {
        const tokken = localStorage.getItem("jwt_token");
        setToken(tokken);
      }
    }, []);


    const updateFinishedAplication = async (aplicationId) => {
                try {
                  const aplicationEdit = await fetch(`/api/mentor/application/${aplicationId}`, {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                      acceptedStatus: "done",
                    }),
                  });
                  const updatedApp = await aplicationEdit.json();
                  console.log("This is the updated aplication: ", updatedApp);
                  handleFilterChange('done');
                  setUpdateProgress(false);
                } catch(error) {
                  console.log("This is the error: ", error);
                };
      };

  return (
    <>
    { (title && acceptedStatus) ?
        <div  className='job_list_card'>
          {updateProgress ? 
        <div className="update_progress">
          <div className="job_done">
         <button 
             type='button'
             onClick={(e) => {e.preventDefault(); updateFinishedAplication(aplicationId);}}
             >Job Done</button>
          </div>
         <div className="job_inprogress">
         <button 
             type='button'
             onClick={(e) => {e.preventDefault(); setUpdateProgress(false);}}
             >Still in progress...</button>
         </div>
        </div>  : null
        }
            <span>{title}</span>
            {isCompanyMentor && acceptedStatus === 'in progress' ?
            <div className="update_progress_status">
               <button 
             type='button'
             onClick={(e) => {e.preventDefault(); setUpdateProgress(true);}}
             >Update Progress</button>
            </div>
             : null}
            <div className='job_list_card_status'>
            <p style={{color: color, backgroundColor: backgroundColor }}>{status}</p>
            </div>
        </div> : <div  className='job_list_card'>
            <span>No data to be displayed.</span>
        </div>
    }
    </>
  )
}

export default JobListCard