import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from 'axios';
import { Link } from "react-router-dom";
import './Voice.css';

const Voice = () => {
  const [message, setMessage] = useState('');
  const [ret, setRet] = useState("");

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
      console.log('Got final result:', finalTranscript);
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

  const summarize = (t) => {
    SpeechRecognition.stopListening();

    const toSend = { transcript: t };
    axios.post('http://127.0.0.1:5000/summarize', toSend)
      .then((response) => {
        var result = response.data.Result;
        setRet(result)
        console.log(result)
      },
        (error) => {
          console.log(error);
        }
      );
  }

  const suggest = (t) => {
    // DELETE THIS LATER
    SpeechRecognition.stopListening();

    const toSend = { transcript: t };
    axios.post('http://127.0.0.1:5000/suggest', toSend)
      .then((response) => {
        var result = response.data.Result;
        setRet(result)
        console.log(result)
      },
        (error) => {
          console.log(error);
        }
      );
  }

  const queryObj = { transcript: 'Yuki' };
  // send(queryObj);
  listenContinuously();

  return (
    <div style={{background: "#E4899B"}}>
      <div>
        {/* <Link to="/">Restart Meeting</Link> */}
        <Link to="/suggestions">
          <button>
            GET SUGGESTIONS
          </button>
        </Link>

      </div>
      <div>
        {/* <span>
          listening:
          {' '}
          {listening ? "CURRENTLY RECORDING" : 'NOT RECORDING'}
        </span> */}
        <div>
          <button type="button" onClick={resetTranscript}>RESET TRANSCRIPT</button>
          <button type="button" onClick={listenContinuously}>Listen</button>
          <Link to="/final">
            <button type="button" onClick={SpeechRecognition.stopListening}>END MEETING</button>
          </Link>
          <button type="button" onClick={() => summarize(finalTranscript)}>Summarize</button>
          <button type="button" onClick={() => send(finalTranscript)}>Send</button>
          <button type="button" onClick={() => suggest(finalTranscript)}>GET SUGGESTIONS HERE</button>

        </div>
      </div>
      <div>
        {message}
        <br />
        {ret}
        <br />
        <p className = "listening">Listening...</p>
        <img src={"https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/7ec86336581871.57215c53a5383.gif"}/>
      </div>
      <div>
        <span>{transcript}</span>
      </div>
    </div>
  );
};

export default Voice;