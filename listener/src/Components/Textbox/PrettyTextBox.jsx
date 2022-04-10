import './PrettyTextBox.css';
import React, { Component } from 'react';

function PrettyTextBox (props) {
  return (
      <div className="field">{props.text}</div>
      );
} export default PrettyTextBox;