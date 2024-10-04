import React, { useEffect, useState } from 'react';
import XbtnCircle from './../../assets/log_pages/X-button_circle.svg';
import InputWithLabel from '../InputWithLabel';
import Button from '../Button';
import './CreateNewJob.css';

const CreateNewJob = ({exitEdit, isDirectJob = true, mentorId = null , refreshFetch = null}) => {
    const [jobName, setJobName] = useState('');
    const [skills, setSkills] = useState([]);
    const [skill, setSkill] = useState('');
    const [category, setCategory] = useState('other');
    const [description, setDescription] = useState('');
    const [token, setToken] = useState('');

const createNewOpenJob = async (e) => {
  try {
    const newJobData = await fetch(`/api/job`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
         title: jobName,
        description,
        category,
        skillsRequired: skills,
        status: "open"
      }),
    });
    const newJob = await newJobData.json();

    alert(`Open job was created!!! ${newJob._id}`);
    exitEdit();
} catch (error) {
console.log("This is the error: ", error);
}
};
    const createNewDirectJob = async (e) => {
  e.preventDefault();
      try {
        const newJobData = await fetch(`/api/job`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
             title: jobName,
            description,
            category,
            skillsRequired: skills,
            status: "direct"
          }),
        });
        const newJob = await newJobData.json();
        const newDirectAplicationData= await fetch(`/api/company/application/${newJob._id}/${mentorId}`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({

          }),
        });
        await newDirectAplicationData.json();
        refreshFetch();
        alert(`Direct job was created!!!`);
        exitEdit();
  } catch (error) {
    console.log("This is the error: ", error);
  }
    };
    const addSkill = (e) => {
      e.preventDefault();
      if(skill !== '') {
        setSkills([...skills,skill]);
        setSkill('');
      }
    };
    const deleteSkill = (e, index) => {
      e.preventDefault();
      const mySkills = skills.filter((skil,i) => (skil && i!==index) );
      setSkills(mySkills);
    };

    const cancelEdit = (e) => {
        e.preventDefault();
        exitEdit();
      };
      useEffect(() => {
        const storedToken = localStorage.getItem("jwt_token");
        setToken(storedToken);
      },[])
  
  return (
    <form  className='create_job_form'>
        <div className="create_job_form_cancel">
      <img src={XbtnCircle} onClick={cancelEdit}></img>
      </div>
      {isDirectJob ? <div className="offer_job_text">
    <h2>Offer Job </h2>
    <span>Create and offer job to a mentor</span>
      </div> : <div className="offer_job_text">
    <h2>Create new job</h2>
    <span>Create and offer job to all mentors</span>
      </div>}
      <div className="category_selection_input">
      <label for="category">Choose category:</label>
<select id="category" name="category" onChange={(e) => setCategory(e.target.value)}>
  <option value="other">Other</option>
  <option value="software">Software</option>
  <option value="sciense">Sciense</option>
  <option value="finanse">Finanse</option>
  <option value="marketing">Marketing</option>
</select>
      </div>
      <InputWithLabel
      value={jobName}
      label='Job Name'
      id="jobName"
      onChange={(e) => setJobName(e.target.value)}
      type="text"
      placeholder={"Job Name"}
      required
      />
      <div className='skill_section'>
      <InputWithLabel
        value={skill}
        label='Skill'
        id="Skill"
        onChange={(e) => setSkill(e.target.value)}
        type="text"
        placeholder="Skill"
        />
      <Button
      name={"Add skill"}
      width={'150px'}
      mySubmit={(e) => {addSkill(e)}}
      />
      </div>
      <div className="skills_display">
      {skills.map((skil, index) => (
        <p key={index}>{skil} 
        <button 
        onClick={(e) => deleteSkill(e,index)}
        >  X</button>
        </p>
        ))}
        </div>
   <div className="text_area_description">
   <label htmlFor="description">Short Description</label>
      <textarea  
        value={description}
        type='text' 
        name='description' 
        placeholder='Write short description about job offering'
        id="description"
        onChange={(e) => setDescription(e.target.value)}
      required
        />
   </div>
   
<Button 
name={isDirectJob ? "Send Job Offer" : "Create new job"} 
width={"100%"}
mySubmit={(e) => {isDirectJob ? createNewDirectJob(e) : createNewOpenJob(e)}}
/>
</form>
  )
}

export default CreateNewJob