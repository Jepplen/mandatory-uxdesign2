import React from 'react';
import './App.css';
import "./Main.css";

export default function Main(props) {

  function onClick(e){
    props.main(false);
  }

  return (
    <>
      <h1 tabIndex="0">Welcome to Quiz Wiz</h1>
      <button className="button" onClick={onClick}>Start Quiz</button>
    </>
  );
}
