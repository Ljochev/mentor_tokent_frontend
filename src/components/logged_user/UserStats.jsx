import React, { useEffect, useState }  from 'react';
import PhotoCam from '../../assets/log_pages/PhotoCircle.svg';
import LoggedUser from '../../assets/log_pages/LoggedUser.svg';
import LinkedinLogo from '../../assets/log_pages/linkedin-logo.svg';
import MailLogo from '../../assets/log_pages/mail.svg';
import PhoneLogo from '../../assets/log_pages/phone.svg';
import EditIcon from '../../assets/log_pages/edit_icon.svg';
import ShapePlus from '../../assets/log_pages/ShapePlus.svg';
import ArrowLeft from '../../assets/arrow-left.svg';
import CreateNewJob from './CreateNewJob.jsx';
import './UserStats.css';

const UserStats = ({title='mentor', handleEditMentor,handleExitMentor, edit, mentorId = null, refreshFetch }) => {
  const [token, setToken] = useState('');
  const [userData, setUserData] = useState({});
  const [userDataSkills, setUserDataSkills] = useState([]);
  const [offerJob, setOfferJob] = useState(false);
  
    const getUser = async () => {
        try {
          const userResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });
          const data = await userResponse.json();
          setUserData(data);
      setUserDataSkills(data.skills);
    } catch (error) {
      console.log("This is the error: ", error);
    }
    };

    const getMentor = async (mentor) => {
      try {
        const userResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user/mentorId/${mentor}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await userResponse.json();
        setUserData(data);
    setUserDataSkills(data.skills);
  } catch (error) {
    console.log("This is the error: ", error);
  }
  };

    const editUser = (e) => {
        e.preventDefault();
        handleEditMentor(userData);
    };

    const handleDirectJob = () => {
      setOfferJob(!offerJob);
    };

    const handleGoBack = (e) => {
      e.preventDefault();
      handleExitMentor();
    };


    useEffect(() => {
      const storedToken = localStorage.getItem("jwt_token");
      setToken(storedToken);
    },[])

    useEffect(() => {

    if (token !== '' && title === 'mentor') {
      getUser();
    } else if(token !== '' && title === 'company' && mentorId) {
      getMentor(mentorId);
    }
      },[edit, token, refreshFetch]);


  return (
  <>
    {offerJob ? <div className='sendDitrectAplication'>
      <CreateNewJob exitEdit={handleDirectJob} mentorId={mentorId} refreshFetch={refreshFetch}/>
    </div> : null}
   <div className="user_stats">
    {
                  title === 'mentor' ?
                  <h2>My Stats</h2> :
                  <div className="mentor_back_btn">
                    <button
                    type='button'
                    onClick={(e) => handleGoBack(e)}
                    ><img src={ArrowLeft} ></img>All Mentors</button>
                  </div>
              }
     <div className="user_stats_section">
        <div className="user_stats_card">
            <div className="stats_card_photo">
        <img className='photo_stats_card' src={userData.image ? userData.image : PhotoCam} alt="user"></img>
        <img className='photo_stats_status' src={LoggedUser} alt="status"></img>
            </div>
            <div className="card_items">
            <div className="name_linkedin">
        <h2>{userData.name}</h2>
        <img className='linkedin_logo' src={LinkedinLogo} alt="linkedin"></img>
            </div>
            <span className='user_stats_desc'>{userData.role}</span>
            <div className="user_stats_email_phone">
        <img className='linkedin_logo' src={MailLogo} alt="mail"></img>
            <span>{userData.email   }</span>
            </div>
            <div className="user_stats_email_phone">
        <img className='linkedin_logo' src={PhoneLogo} alt="phone"></img>
            <span>{userData.phone}</span>
            </div>
            </div>
        </div>
        <div className="user_about_section">
            <div className="about_edit">
            {
                  title === 'mentor' ?
                <span>About</span> :
                <span>About Mentor</span> 
              }
                {
                  title === 'mentor' ? 
                    <img onClick={(e) => editUser(e)} className='photo_stats_card' src={EditIcon}></img>
                   : 
                   <button 
                   className='stats_card_button'
                   type='button'
                   onClick={() => {handleDirectJob()}}
                   >
                  <img src={ShapePlus}/>Offer New Job</button>
                }
            </div>
            <div className="about_skills">
                <span>Skills:</span>
                {userDataSkills && userDataSkills.map((skill, i) => (
  <React.Fragment key={i}>
    {i !== 0 && <span className='span_line'>|</span>}
    <span>{skill}</span>
  </React.Fragment>
))}
            </div>
            <p>{userData.desc}</p>
        </div>
     </div>
   </div>
  </>
  )
}

export default UserStats