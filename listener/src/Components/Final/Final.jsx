import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import PrettyTextBox from "../Textbox/PrettyTextBox";
import{ init } from '@emailjs/browser';
import emailjs from '@emailjs/browser';
init("F2qcJ1axt7vjzG28m");


function Final(props) {
  const [email, setEmail] = useState('');
  const [sentence, setSentence] = useState('Send as Email');

  // const {transcript} = this.props.location;
  // console.log(props.location.state);
  const location = useLocation();

  const templateParams = {
    email: email,
    transcript: location.state,
  };

  const sendEmail = () => {
    if (email !== ''){
      emailjs.send('service_jkgii6i', 'template_gnmcs29', templateParams)
      .then(function(response) {
          console.log('SUCCESS!', response.status, response.text);
          setSentence('Sent　✅')
        }, function(error) {
          console.log('FAILED...', error);
        });
    } else {
      alert("type email address");
    }
  }

  return (
    <div>
        <h1>Final Transcript</h1>
        <PrettyTextBox text = {location.state}/>
        <input type="email" name="user_email" onChange={(e)=>setEmail(e.target.value)}/>
        <button type="button" onClick={sendEmail}>{sentence}</button>
        <br/>
        <Link to="/" >Click to restart Listening</Link>
    </div>
  )
}

export default Final