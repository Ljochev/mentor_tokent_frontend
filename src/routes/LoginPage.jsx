import React, { useState }  from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import LogPage from '../components/log_page/LogPage.jsx'
import Button from './../components/Button.jsx';
import InputWithLabel from './../components/InputWithLabel.jsx';
import EyeLook from '../assets/eye_lookup.svg';
import NoEyeLook from '../assets/eye_no_lookup.svg';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
const [ lookPassword, setLookPassword] = useState(false);

const handleLook = (e) => {
  e.preventDefault();
    setLookPassword(!lookPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user/login` , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const jwt_token = await response.json();
      if (jwt_token && jwt_token.token) {
        localStorage.setItem('jwt_token', jwt_token.token);
      }
      const decodedToken = jwtDecode(jwt_token.token);
      decodedToken.type === 'mentor' ?  navigate("/mentorDashboard") : navigate("/companyDashboard");
    } catch (error) {
      console.log("This is the error: ", error);
      setError(`Failed to login. Please check your email and password. ${error.toString()}`);
    }
    };

  return (
      <LogPage
      logData ={
        <>
       <h2>LOG IN TO MENTOR TOKEN</h2>
       <span>Enter your email and pass to login.</span>
       <form  className='login_form' onSubmit={handleLogin}>
        <InputWithLabel
        value={email}
        label='Email'
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="someone@somewhere.com"
        required
        />
        <div className='password_input'>
        <InputWithLabel
        value={password}
        label='Password'
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        type={lookPassword ? "text" : "password"}
        placeholder="password"
        required
        />
      <img src={lookPassword ? NoEyeLook : EyeLook} onClick={(e) => handleLook(e)}/>
      </div>
      <p>Forgot password? <Link to="/passwordReset">Password reset.</Link></p>
       
        <Button 
        name={"Log in"} 
        width={"100%"}
        />
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
       <p>Don’t have account? <Link to="/register"> Register.</Link></p>
        </>
      }
      />
  )
}

export default LoginPage