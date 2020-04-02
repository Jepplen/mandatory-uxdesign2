import React, { useState } from 'react';
import './App.css';
import Main from "./Main";
import Quiz from "./Quiz";
import "./Button.css";

export default function App() {
  const [main, updateMain] = useState(true);

  return (
    <div className="App">
      {main ? <Main main={updateMain} /> : <Quiz main={updateMain}/>}
    </div>
  );
}
