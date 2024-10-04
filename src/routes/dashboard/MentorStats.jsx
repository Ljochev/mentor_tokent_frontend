import React, { useEffect, useState }  from 'react'
import SearchBar from '../../components/SearchBar.jsx'
import './MentorStats.css'
import UserStats from '../../components/logged_user/UserStats.jsx'
import Statistics from '../../components/logged_user/Statistics.jsx'
import QickOverview from '../../components/logged_user/QickOverview.jsx'
import EditMentor from '../../components/logged_user/EditMentor.jsx'

const MentorStats = () => {
  const [token, setToken] = useState(`${localStorage.getItem("jwt_token")}`);
  const [filtered, setFiltered] = useState('all');
  const[ editMentor, setEditMentor] = useState(false);
  const [mentorData, setMentorData] = useState({});

  const handleStatisticFilter = (selection) => {
    setFiltered(selection);
  }

  const handleEditMentor = (userData) => {
    setMentorData(userData);
    setEditMentor(!editMentor);
  }

  return (
    <div className="mentor_Stats">
      { editMentor && <EditMentor handleEditMentor={handleEditMentor} user={mentorData}/>}
      <div className="mentor_Stats_Up">
      <UserStats handleEditMentor={handleEditMentor} edit={editMentor}/>
      </div>
      <div className="mentor_Stats_Down">
        <div className="mentor_performance">
        <Statistics filter={filtered}/>
        </div>
        <div className="mentor_overview">
          <QickOverview handleSelection={handleStatisticFilter}/>
        </div>
      </div>
    </div>
  
  )
}

export default MentorStats