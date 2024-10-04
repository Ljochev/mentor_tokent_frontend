import React, { useEffect, useState }  from 'react';
import { Link } from 'react-router-dom';
import LogPage from '../components/log_page/LogPage.jsx'
import Button from '../components/Button.jsx';
import InputWithLabel from '../components/InputWithLabel.jsx';
import RegisterToggle from '../components/log_page/RegisterToggle.jsx';
import RegisterCompany from '../components/log_page/RegisterCompany.jsx';
import RegisterMentor from '../components/log_page/RegisterMentor.jsx';
import CheckIcon from '../components/log_page/CheckIcon.jsx';
import CloseIcon from '../components/log_page/CloseIcon.jsx';
import EyeLook from '../assets/eye_lookup.svg';
import NoEyeLook from '../assets/eye_no_lookup.svg';
import './RegisterPage.css';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [type, setType] = useState('company');
  const [name, setName] = useState('');
  const [labelName, setLabelName] = useState('Company name');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [ lookPassword, setLookPassword] = useState(false);
  const [ lookConfirm, setLookConfirm] = useState(false);
  
  const [passStrenght, setPassStrenght] = useState(false);
  const [noNameEmail, setNoNameEmail] = useState(false);
  const [eightChar, setEightChar] = useState(false);
  const [numberSymbol, setNumberSymbol] = useState(false);
  const [passMatch, setPassMatch] = useState(false);
  const [emailAddressPattern, setEmailAddressPattern] = useState(false);

  const [continueRegister, setContinueRegister] = useState(false);

    const updateType = (usertype) => {
      setType(usertype);
      setLabelName(
        usertype === 'company' ? 
        `Company name` : `Mentor name`
      );
    };

    const handleLook = (e, type) => {
      e.preventDefault();
      if(type === "password") {
        setLookPassword(!lookPassword);
      } else if(type === "confirmPassword")
        setLookConfirm(!lookConfirm);
      };

    useEffect(() => {
      (noNameEmail && eightChar && numberSymbol) ? setPassStrenght(true) : setPassStrenght(false);

      (password.toUpperCase().includes(name.toUpperCase()) ||
       password.toUpperCase().includes(email.toUpperCase())) ?
       setNoNameEmail(false) : setNoNameEmail(true);

      /^.{8,}$/.test(password) ? setEightChar(true) : setEightChar(false);

      /[\d!@#$%^&*(),.?":{}|<>]/.test(password) ? setNumberSymbol(true) : setNumberSymbol(false);

      ((password === confirmPassword) && password ) ?  setPassMatch(true) : setPassMatch(false);

      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) ? setEmailAddressPattern(true) : setEmailAddressPattern(false);

    },[password, confirmPassword]);

  const registerAccount = async (e) => {
    e.preventDefault();
    const emailaddressPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    
    if (!emailaddressPattern.test(email)) {
      alert("Please enter valid email")
      throw new Error('Failed to login. Please enter valid email format');
  } 
  try {
    const response = await fetch('/api/user/checkEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      alert(`${errorData.message}`)
      throw new Error(errorData.message || 'Registration failed');
  }
    const data = await response.json();
    data ?
     alert(`${email} is already taken, please procead with login or create account with different email`) : 
    setContinueRegister(true)
  } catch (error) {
    console.log("This is the error: ", error.message);
  }
    };
  return (
     <LogPage
    logData ={
      (continueRegister && type === "mentor") ? 
      <RegisterMentor goBack={() => setContinueRegister(false)}
      name = {name}
      email = {email}
      password = {password}
      confirmPassword = {confirmPassword}
      type = {type}
      /> :
       (continueRegister && type === "company")? 
       <RegisterCompany goBack={() => setContinueRegister(false)}
       name = {name}
      email = {email}
      password = {password}
      confirmPassword = {confirmPassword}
      type = {type}
       /> : 
      <>
     <h2>CHOOSE ACCOUNT TYPE</h2>
      <RegisterToggle typeUpdate={updateType}/>
     <form  className='register_form' onSubmit={registerAccount}>
       <InputWithLabel
      value={name}
      label={labelName}
      id="name"
      onChange={(e) => setName(e.target.value)}
      type="text"
      placeholder="name"
      required
      />
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
      placeholder="********"
      required
      />
      <img src={lookPassword ? NoEyeLook : EyeLook} onClick={(e) => handleLook(e,"password")}/>
      </div>
      <div className='password_input'>
      <InputWithLabel
      value={confirmPassword}
      label='Confirm password'
      id="confirmPassword"
      onChange={(e) => setConfirmPassword(e.target.value)}
      type={lookConfirm ? "text" : "password"}
      placeholder="********"
      required
      />
      <img src={lookConfirm ? NoEyeLook : EyeLook} onClick={(e) => handleLook(e,"confirmPassword")}/>
      </div>
      
      <span>{passStrenght ? <CheckIcon/> : <CloseIcon/>} Password Strength : {passStrenght ? "Strong" : "Weak"}</span> <br/>
      <span>{noNameEmail ? <CheckIcon/> : <CloseIcon/>} Cannot contain your name or email address</span><br/>
      <span>{eightChar ? <CheckIcon/> : <CloseIcon/>} At least 8 characters</span><br/>
      <span>{numberSymbol ? <CheckIcon/> : <CloseIcon/>} Contains a number or symbol</span><br/>
      <span >{passMatch ? <CheckIcon/> : <CloseIcon/>} Password match</span>
      
      <Button 
      disabled={!(passStrenght && passMatch && emailAddressPattern)}
      name={"Continue"} 
      width={"100%"}
      />
      </form>
     <p>Already have account? <Link to="/login"> Login.</Link></p>
      </>
    }
    />
)
}

export default RegisterPage