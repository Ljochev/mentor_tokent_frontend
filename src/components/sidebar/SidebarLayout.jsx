import React, { useState, useEffect } from 'react';
import SideIcon from './SideIcon';
import Logo from '../Logo';
import { useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode }  from "jwt-decode";
import DashboardIcon from './DashboardIcon';
import StatsIcon from './StatsIcon';
import LoguotIcon from './LoguotIcon';
import JobFeedIcon from './JobFeedIcon';
import MentorsIcon from './MentorsIcon'
import PhotoCam from '../../assets/log_pages/PhotoCam.svg';
import SearchBar from '../SearchBar';
import './SidebarLayout.css';


const SidebarLayout = ({type, children}) => {
  const navigate = useNavigate();
  const location = useLocation();

    const [sidebar, setSidebar] = useState(true);
    const [navigation, setNavigation ] = useState('');
    const [decodedToken, setDecodedToken] = useState('');
    const [token , setToken] = useState('');
    const [user, setUser] = useState({});
  const [editImg, setEditImg] = useState(false);
    const [image, setImage] = useState('');

    const fetchUser = async () => {
      try {
        const myUser = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        const userData = await myUser.json();
        setUser(userData);
      } catch (error) {
        console.log("This is the error: ", error);
      }
    };

    const editImage = async (picture) => {
      try {
        const userResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            image: picture,
          }),
        });
        const data = await userResponse.json()
  } catch (error) {
    console.log("This is the error: ", error);
  }
  };

    useEffect(() => {
      setNavigation(location.pathname);
      if(!token) {
        const tokken = jwtDecode(localStorage.getItem('jwt_token'));
        setToken(localStorage.getItem('jwt_token'));
        setDecodedToken(tokken);
      }
        }, [location]);

      useEffect(() => {
        if(token) {
          fetchUser();
        }
      },[token]);

      useEffect(() => {
        if(user) {
          const picture = user.image;
          setImage(picture);
        }
      },[user]);


        const updateNav = (e, value) => {
          e.preventDefault();
          setNavigation(value);
          navigate(value);
        }
        
    
    const handleSidebar = (e) => {
      e.preventDefault();
      setSidebar(!sidebar);
    }
    const selectPicture = (e) => {
      e.preventDefault();
      setEditImg(!editImg);
    };
    const handleImageUpload = (e) => {
      if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setImage(event.target.result);
          editImage(event.target.result);
        };
        reader.readAsDataURL(e.target.files[0]);
        setEditImg(false);
      }
    };
  return (
    <>
      {type === 'mentor' ? (
        <div className='logged_layout'>
          
          <div className={sidebar ? 'sidbar_class_open' : 'sidbar_class_closed'}>
          <SideIcon 
            direction={sidebar}
            size={'40px'}
            onClick={(e)=>{handleSidebar(e)}} 
            style={{ cursor: 'pointer', zIndex: 2000 }} 
            className={ sidebar ? 'logo_logo_open' : 'logo_logo_closed' }
            alt="Logo"            
            />
          <div className='sidebar_nav_class'>
            <Logo color={'rgba(105, 108, 255, 1)'} textColor={'rgba(86, 106, 127, 1)'}/>
            {/* <div className='sidebar_layout'> */}
            <nav>
        <ul>
          <li  onClick={(e) => updateNav(e,'/mentorDashboard')}>
            <DashboardIcon fillColor={ navigation === '/mentorDashboard'? "#696CFF": 'rgba(86, 106, 127, 1)'}/>
            {navigation === '/mentorDashboard' && <div className="show_side"></div>}
            </li>
          <li  onClick={(e) => updateNav(e,'/mentorStats')}>
            <StatsIcon fillColor={ navigation === '/mentorStats'? "#696CFF": 'rgba(86, 106, 127, 1)'}/>
            {navigation === '/mentorStats' && <div className="show_side"></div>}
            </li>
          <li  onClick={(e) => updateNav(e,'/mentorJobFeed')}>
            <JobFeedIcon fillColor={ navigation === '/mentorJobFeed' ? "#696CFF": 'rgba(86, 106, 127, 1)'}/>
            {navigation === '/mentorJobFeed' && <div className="show_side"></div>}
            </li>
        </ul>
      </nav>
          {/* </div> */}
          </div>
          <LoguotIcon status={sidebar} />
            </div>
          <div className='dashboard_class'>
          <div className="top_navigation_sidebar">
              <div className="search_bar_side">
          <SearchBar accountType={decodedToken.type} token={token}/>
              </div>
              
          <div className="user_info">
    <img className='user_photo' src={image ? image : PhotoCam} onClick={(e) =>selectPicture(e)}></img>
    <div className="user_info_wrap">
            <span>{decodedToken !== '' ? decodedToken.name : ''}</span>
            <span style={{color: 'rgba(185, 184, 188, 1)'}}>{decodedToken.type ? (decodedToken.type !== 'company' ? 'Mentor' : '') : ''}</span>
    </div>
          </div>
            </div>
            {children}
          </div>
        </div>
      ) : (
        <div className='logged_layout'>
          <div className={sidebar ? 'sidbar_class_open' : 'sidbar_class_closed'}>
          <SideIcon 
            direction={sidebar}
            size={'40px'}
            onClick={(e)=>{handleSidebar(e)}} 
            style={{ cursor: 'pointer', zIndex: 2000 }} 
            className={ sidebar ? 'logo_logo_open' : 'logo_logo_closed' }
            alt="Logo"            
            />
          <div className='sidebar_nav_class'>
            <Logo color={'rgba(105, 108, 255, 1)'} textColor={'rgba(86, 106, 127, 1)'}/>
            <nav>
        <ul>
          <li  onClick={(e) => updateNav(e,'/companyDashboard')}>
            <DashboardIcon fillColor={ navigation === '/companyDashboard'? "#696CFF": 'rgba(86, 106, 127, 1)'}/>
            {navigation === '/companyDashboard' && <div className="show_side"></div>}
            </li>
          <li  onClick={(e) => updateNav(e,'/companyMentors')}>
            <MentorsIcon fillColor={ navigation === '/companyMentors'? "#696CFF": 'rgba(86, 106, 127, 1)'}/>
            {navigation === '/companyMentors' && <div className="show_side"></div>}
            </li>
          <li  onClick={(e) => updateNav(e,'/companyJobs')}>
            <JobFeedIcon name={'Jobs'} fillColor={ navigation === '/companyJobs' ? "#696CFF": 'rgba(86, 106, 127, 1)'}/>
            {navigation === '/companyJobs' && <div className="show_side"></div>}
            </li>
        </ul>
      </nav>
          </div>
            <LoguotIcon status={sidebar} />
          </div>
          <div className='dashboard_class'>
            <div className="top_navigation_sidebar">
              <div className="search_bar_side">
          <SearchBar accountType={decodedToken.type} token={token}/>
              </div>
          <div className="user_info">
          {editImg ? 
        <input  type="file" onChange={handleImageUpload} />
       : null
    }
    <img className='user_photo_company' src={image ? image : PhotoCam} onClick={(e) =>selectPicture(e)}></img>
    <div className="user_info_wrap">
            <span>{decodedToken !== '' ? decodedToken.name : ''}</span>
            <span style={{color: 'rgba(185, 184, 188, 1)'}}>{decodedToken.type ? (decodedToken.type !== 'mentor' ? 'Company' : '') : ''}</span>
    </div>
          </div>
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  )
}

export default SidebarLayout