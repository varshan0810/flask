import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import './Form.css'


const Form = () => {
    const [feedback,setFeedback] = useState({name:'',dept:'',comment:''});
const submitDetails = async(e)=>{
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/submit-form", feedback);
      alert(response.data.message);
      setFeedback({ name: '', dept: '', comment: '' });
      
  } catch (err) {
      console.error(err);
  }
};
const handleChange=(e)=>{
    const {name,value} = e.target;
    setFeedback(prev =>({...prev,[name] : value}))
}
  return (
    <div className='form-container'>
      <h2 className='heading'>Registration Form</h2>
      <form onSubmit={submitDetails}>
        <input
          className='inputt'
          type="text"
          name="name"
          placeholder="Enter your name"
          value={feedback.name}
          onChange={handleChange}
        />
        <input
          className='inputt'
          type="text"
          name="dept"
          placeholder="Enter your dept"
          value={feedback.dept}
          onChange={handleChange}
        />
        <input
          className='inputt'
          type="text"
          name="comment"
          placeholder="Enter your feedback"
          value={feedback.comment}
          onChange={handleChange}
        />
        <div>
          <button className='buttonn'>Submit</button>
        </div>
      </form>
    </div> 
  )
}

export default Form