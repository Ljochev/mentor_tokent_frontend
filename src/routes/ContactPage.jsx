import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import './ContactPage.css';

const ContactPage = () => {

const [fullName, setFullName] = useState('');
const [email, setEmail] = useState('');
const [message, setMessage] = useState('');

const sendMessage = async (e) => {
  e.preventDefault();
  try {
    const contactMessageResponse = await fetch('/api/contactMessage' , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName,
        message,
        email,
      }),
    });
    const contactMessage = await contactMessageResponse.json();
    if (contactMessage) {
      alert(`Message was sent to Mentor Token!`);
    } else {
      alert(`Error, message was not sent to Mentor Token!`);
    }
  } catch (error) {
    console.log("This is the error: ", error);
  }
  };

  return (
  <main>
    <div className="lets_talk">
      <div className="lets_talk_info">
        <h2>Let’s Talk!</h2>
        <p>We’re thrilled to connect with you! Whether you have a question,
           need assistance, or want to discuss a potential project,
           we’re here to listen and help. At Mentor Token, we believe in
           the power of collaboration and are committed to providing you
           with the best support and solutions. Fill out the form below,
           and one of our team members will get back to you as soon as possible.</p>
        <span>Let’s create something amazing together!</span>
      </div>
      <form className='lets_talk_form' onSubmit={sendMessage}>
        <div className='lets_talk_name_email'>
        <input 
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        id='fullName'
        type="text" 
        name='fullName' 
        placeholder='Full Name' 
        required/>
        <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        id='email'
        type='email' 
        name='email' 
        placeholder='Email address' 
        required/>
        </div>
        <div className="text_area">
        <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        id=''
        type='text' 
        name='message' 
        placeholder='Your message'
        maxlength="1000" 
        required/>
        <p>{message.length}/1000</p>
        </div>
        <div className='form_button'>
        <Button 
        name={'SEND MESSAGE'}
        // mySubmit={(e) => {e.preventDefault(), sendMessage()}}
        />
        </div>
      </form>
    </div>
  </main>
  )
}

export default ContactPage