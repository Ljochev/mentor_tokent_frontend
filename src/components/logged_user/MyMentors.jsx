import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import QuickOverview from '../../components/logged_user/QickOverview.jsx';
import MentorCardBox from './MentorCardBox.jsx';
import './MyMentors.css';

const MyMentors = ({handleViewMentor}) => {
    const [decodedToken, setDecodedToken] = useState('');
    useEffect(() => {
          const storedToken =localStorage.getItem("jwt_token");
          const decoded = jwtDecode(storedToken);
          setDecodedToken(decoded);
    },[]);

  return (
    <div className="my_mentors_layout">
        <MentorCardBox handleViewMentor={handleViewMentor}/>
        <div className="company_overview">
            <QuickOverview description={'In the last month'} companyId = {decodedToken.id}/>
        </div>
    </div>
  )
}

export default MyMentors