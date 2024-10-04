import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Button from './Button';
import Logo from './Logo';
import right_arrow from './../assets/arrow-right.svg';
import LoguotIcon from './sidebar/LoguotIcon';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [navigation, setNavigation ] = useState('/');
  const [myToken , setMyToken] = useState('');

  useEffect(() => {
setNavigation(location.pathname);
setMyToken(localStorage.getItem('jwt_token'));
  }, [location]);
  
  const updateNav = (e, value) => {
    e.preventDefault();
    setNavigation(value);
    navigate(value);
  }

  return (
    <header>
      <Link to="/"><Logo/></Link>
      <nav>
        <ul>
        <li to="/" onClick={(e) => updateNav(e,'/')} style={ navigation === '/'?{color: "#696CFF"}: {color: "inherit"}}>Home</li>
        <li to="/about" onClick={(e) => updateNav(e,'/about')} style={ navigation === '/about'?{color: "#696CFF"}: {color: "inherit"}}>About</li>
        <li to="/contact" onClick={(e) => updateNav(e,'/contact')} style={ navigation === '/contact'?{color: "#696CFF"}: {color: "inherit"}}>Contact</li>
        </ul>
      </nav>
      <div className='header-login-bar'>
        {!myToken && <p onClick={(e) => updateNav(e,'/login')}>Login</p>}
        {/* {myToken && <p onClick={(e) => logOut(e,'/')}>Logout <span style={{ color: 'purple' }}>{  `${jwtDecode(myToken).name}`  }</span></p>} */}
        {myToken &&<LoguotIcon/>}
        <Button name={'Get Started'} img_src={right_arrow}/>
        </div>
    </header>
  )
}

export default Header