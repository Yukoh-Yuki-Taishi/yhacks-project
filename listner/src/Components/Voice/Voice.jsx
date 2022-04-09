import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from 'axios';
import { Link } from "react-router-dom";


const Voice = () => {
  const [message, setMessage] = useState('');
  const [ret, setRet] = useState("hello");

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

  const queryObj = { transcript: 'Yuki' };
  // send(queryObj);

  return (
    <div>
      <div>
        {/* <Link to="/">Restart Meeting</Link> */}
        <Link to="/suggestions">
          <button>
            GET SUGGESTIONS
          </button>
        </Link>

      </div>
      <div>
        <span>
          listening:
          {' '}
          {listening ? "CURRENTLY RECORDING" : 'NOT RECORDING'}
        </span>
        <div>
          <button type="button" onClick={resetTranscript}>RESET TRANSCRIPT</button>
          <button type="button" onClick={listenContinuously}>Listen</button>
          <Link to="/">
            <button type="button" onClick={SpeechRecognition.stopListening}>END MEETING</button>
          </Link>
          <button type="button" onClick={() => send(finalTranscript)}>Send</button>
        </div>
      </div>
      <div>
        {message}
        <br />
        {ret}
      </div>
      <div>
        <span>{transcript}</span>
      </div>
    </div>
  );
};

export default Voice;