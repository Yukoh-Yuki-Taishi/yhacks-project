import React, { useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import PrettyTextBox from "../Textbox/PrettyTextBox"

function Final(props) {
  // const {transcript} = this.props.location;
  // console.log(props.location.state);
  const location = useLocation();

  return (
    <div>
        <h1>FINAL PAGE</h1>
        <Link to="/" >Click to restart Recording</Link>
        <PrettyTextBox text = {location.state}/>
    </div>
  )
}

export default Final