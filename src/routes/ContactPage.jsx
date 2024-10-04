import React, {useEffect} from 'react';
import Button from '../components/Button';
import './ContactPage.css';

const ContactPage = () => {

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
      <form className='lets_talk_form'>
        <div className='lets_talk_name_email'>
        <input type="text" name='fullName' placeholder='Full Name' />
        <input type='email' name='email' placeholder='Email adress' />
        </div>
        <textarea  type='text' name='message' placeholder='Your message'/>
        <div className='form_button'>
        <Button name={'SEND MESSAGE'}/>
        </div>
      </form>
    </div>
  </main>
  )
}

export default ContactPage