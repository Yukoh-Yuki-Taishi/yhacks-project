import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import PrettyTextBox from "../Textbox/PrettyTextBox";
import './Final.css';
import{ init } from '@emailjs/browser';
import emailjs from '@emailjs/browser';
import axios from 'axios';
init("F2qcJ1axt7vjzG28m");


function Final(props) {
  const [email, setEmail] = useState('');
  const [sentence, setSentence] = useState('Send as Email');
  const [summary, setSummary] = useState([]);

  // const {transcript} = this.props.location;
  // console.log(props.location.state);
  const location = useLocation();

  const templateParams = {
    email: email,
    transcript: location.state.transcript,
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

  const summarize = () => {
    const toSend = { transcript: location.state.transcript };
    axios.post('http://127.0.0.1:5000/summarize', toSend)
      .then((response) => {
        var result = response.data.Result;
        setSummary(result)
        console.log(result)
      },
        (error) => {
          console.log(error);
        }
      );
  }

  useEffect(() => {
    summarize(location.state.transcript);
  }, []);

  return (
    <div>
        <h1>Final Transcript</h1>
        <PrettyTextBox text = {location.state.transcript}/>
        <PrettyTextBox text = {summary}/>
        <button type="button" className="user_email" onClick={summarize}>Show Summary</button>
        <input type="email" className="user_email" onChange={(e)=>setEmail(e.target.value)}/>
        <button type="button" className="user_email" onClick={sendEmail}>{sentence}</button>
        <br/>
        <Link to="/" >Click to restart Listening</Link>
    </div>
  )
}

export default Final