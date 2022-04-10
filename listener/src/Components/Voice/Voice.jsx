import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from 'axios';
import { Link } from "react-router-dom";
import PrettyTextBox from "../Textbox/PrettyTextBox";
import './PrettyButton.css';
import './Voice.css';
import './Balloon.css';

const Voice = () => {
  const [message, setMessage] = useState('');
  const [ret, setRet] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    listenContinuously();
  }, []);


  const commands = [
    {
      command: 'reset',
      callback: () => resetTranscript()
    },
    {
      command: 'shut up',
      callback: () => setMessage('I wasn\'t talking.')
    },
    {
      command: 'Hello',
      callback: () => setMessage('Hi there!')
    },
  ]
  const {
    transcript,
    interimTranscript,
    finalTranscript,
    resetTranscript,
    listening,
  } = useSpeechRecognition({ commands });

  useEffect(() => {
    if (finalTranscript !== '') {
      // console.log('Got final result:', finalTranscript);
    }
  }, [interimTranscript, finalTranscript]);
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    console.log('This only works on Chrome');
  }
  const listenContinuously = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: 'en-GB',
    });
  };

  const send = (t) => {
    const toSend = { transcript: t };
    axios.post('http://127.0.0.1:5000/test', toSend)
      .then((response) => {
        var result = response.data.Result;
        setRet(result)
        // console.log(result)
      },
        (error) => {
          console.log(error);
        }
      );
  }

  const listenOrPause = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      listenContinuously();
    }
  }

  const suggest = (t) => {
    // DELETE THIS LATER
    SpeechRecognition.stopListening();

    const toSend = { transcript: t };
    axios.post('http://127.0.0.1:5000/suggest', toSend)
      .then((response) => {
        var result = response.data.Result;
        setRet(result)
        // setSeggestions(result);
        result.map((d) => 
        // console.log(d);
        setSuggestions(suggestions => [...suggestions, d])
        );
      },
        (error) => {
          console.log(error);
        }
      );
  }



  const listItems = suggestions.map((d) => <li key={d}>hello</li>);

  const queryObj = { transcript: 'Yuki' };
  // send(queryObj);
  // listenContinuously();

  return (
    <div style={{width: '100%', background: "#E4899B"}}>
      <link href="https://fonts.googleapis.com/css2?family=Kalam:wght@700&family=Sriracha&display=swap" rel="stylesheet"/>
      <div>
        {/* <Link to="/">Restart Meeting</Link> */}
        {/* <Link to="/suggestions">
          <button>
            GET SUGGESTIONS
          </button>
        </Link> */}

      </div>
      <div>
        {/* <span>
          listening:
          {' '}
          {listening ? "CURRENTLY RECORDING" : 'NOT RECORDING'}
        </span> */}
      </div>
      <div>
        {/* {message} */}
        <br />
        {/* {ret} */}
        <br />
        {/* {suggestions[1]} */}
        <p className = "listening">{listening ? "Listening..." : 'Paused'}</p>
        <img src={"https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/7ec86336581871.57215c53a5383.gif"}/>
      </div>
      
      <div>
          {/* <button type="button" onClick={resetTranscript}>RESET TRANSCRIPT</button> */}
          <button type="button" className="normal-button" onClick={listenOrPause}
          style ={{}}>{listening ? "Pause" : 'Listen'}</button>
          <Link to= "/final" state = {{transcript: finalTranscript }}>
            <button type="button" className="normal-button" onClick={SpeechRecognition.stopListening}>END MEETING</button>
          </Link>
          <button type="button" className="normal-button" onClick={() => send(finalTranscript)}>Show Transcript</button>
          <button type="button" className="normal-button" onClick={() => suggest(finalTranscript)}>Show Suggestions</button>
        </div>
        <div class="container">
        <div class="balloon">
          <div><span>{suggestions[0]}</span></div>
          <div><span>{suggestions[1]}</span></div>
          <div><span>{suggestions[2]}</span></div>
          <div><span>{suggestions[3]}</span></div>
          <div><span>{suggestions[4]}</span></div>
          <div><span>{suggestions[5]}</span></div>
        </div>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <div class="balloon">
          <div><span>{suggestions[6]}</span></div>
          <div><span>{suggestions[7]}</span></div>
          <div><span>{suggestions[8]}</span></div>
          <div><span>{suggestions[9]}</span></div>
          <div><span>{suggestions[10]}</span></div>
          <div><span>{suggestions[11]}</span></div>
        </div>
        </div>
      <div>
        <PrettyTextBox text ={transcript}/>
      </div>
      </div>
  );
};

export default Voice;