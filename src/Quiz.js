import React, { useEffect, useState } from 'react';
import './App.css';
import axios from "axios";
import Popup from "./Popup";
import Spinner from "./Spinner";
import "./Quiz.css";
import "./RadioButton.css";

export default function Quiz(props) {
  const [result, updateResult] = useState(null);
  const [correctAnswersState, updateCorrectAnswersState] = useState(null);
  const [data, updateData] = useState([]);
  const [load, updateLoad] = useState(true);
  const entities = {
   '&#039;': "'",
   '&quot;': '"',
   '&ldquo;': '“',
   '&rdquo;': '”',
   '&rsquo;': "'",
   '&lrm;': "",
   "&ntilde;": "ñ",
   "&eacute;": "é",
   "&amp;": "&" ,
   "&uuml;": "ü"
  }

  let correctAnswers = [];
  let userAnswers = [];
  let userCorrectAnswers = [];

  useEffect(() => {
    getNewQuiz();
  }, [] );

  function restart(){
    updateResult(null);
    updateCorrectAnswersState(null);
    updateLoad(true);
    correctAnswers = [];
    userAnswers = [];
    userCorrectAnswers = [];
    getNewQuiz();
  }

  function getNewQuiz(){
    axios.get("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple")
    .then((response) => {
      updateLoad(false);
      updateData(response.data.results);
    });
  }

  function onClick(e){
    props.main(true);
  }

  function onSubmit(e){
    e.preventDefault();

    let inputList = document.getElementsByTagName('input');

    for(let i = 0; i < inputList.length; i++) {
      if(inputList[i].type === "radio") {
        if(inputList[i].checked){
          userAnswers.push(inputList[i].value);
        }
      }
    }

    for (let i = 0; i < correctAnswers.length; i++) {
      if (userAnswers[i] === correctAnswers[i]){
        userCorrectAnswers.push(1);
      }
    }
    updateResult(userCorrectAnswers.length);
    updateCorrectAnswersState(correctAnswers.length);
  }

  function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  function shuffleArray(array){
    let shuffle = [...array];
    for (let i = 0; i < shuffle.length; i++)
    {
        let rnd = getRandomArbitrary(i, shuffle.length);
        let tempStr = shuffle[rnd];
        shuffle[rnd] = shuffle[i];
        shuffle[i] = tempStr;
    }
    return shuffle;
  }

  if (result){
    if (document.body.style.overflowY === "scroll") {
      document.documentElement.scrollTop = 0;
      document.body.style.overflowY = "hidden";
      document.body.style.paddingRight = "15px";
    }

  } else {
    if (document.body.style.overflowY === "hidden") {
      document.documentElement.scrollTop = 0;
      document.body.style.overflowY = "scroll";
      document.body.style.paddingRight = "0px";
    }
  }

  if (load) {
    return (
      <>
        <h1 tabIndex="0" aria-label="Answer the 10 questions below and become a Quiz Wiz!">Answer the 10 questions and become a Quiz Wiz!</h1>
        <button tabIndex="1"className="button" onClick={onClick} aria-label="This button takes you back to the main page">Back to main</button>
        <Spinner />
      </>
    );
  }


  return (
    <>
      <h1
        tabIndex="0"
        aria-label="Answer the 10 questions below and become a Quiz Wiz!, Each question has four alternative answers in radio buttons, use the arrow keys on your keyboard to navigate back and forth between the four answer alternatives, choose wisely"
        >
          Answer the 10 questions and become a Quiz Wiz!
      </h1>
      <button tabIndex="0" className="button" onClick={onClick} aria-label="This button takes you back to the main page">Back to main</button>
      <form className="form" onSubmit={onSubmit}>
        {data.map((questionObject) => {

          let index = data.indexOf(questionObject);

          let allAnswers = [];
          allAnswers.push(questionObject.correct_answer);
          correctAnswers.push(questionObject.correct_answer);

          for (let i = 0; i < questionObject.incorrect_answers.length; i++) {
            allAnswers.push(questionObject.incorrect_answers[i]);
          }

          for (let i = 0; i < allAnswers.length; i++) {
            allAnswers[i] = allAnswers[i].replace(/&#?\w+;/g, match => entities[match]);
          }

          let shuffledAnswers = shuffleArray(allAnswers);

          return(
            <div className="questionContainer" key={index}>
              <h4 tabIndex="0">Question {index+1}</h4>
              <h3 tabIndex="0">{questionObject.question.replace(/&#?\w+;/g, match => entities[match])}</h3>
              {shuffledAnswers.map((answer) => {
                return(
                  <div className="questionContainer__radiobuttons" key={answer}>
                    <input tabIndex="0" type="radio" aria-label={answer} name={index} id={answer} value={answer} required />
                    <label aria-label={answer} htmlFor={answer}>
                      <p aria-label={answer}>{answer}</p>
                    </label>
                  </div>
                );
            })}
            </div>
          );
        })}
        <button
          tabIndex="0"
          className="button"
          type="submit"
          aria-label="This button submits your answers, you will then be presented with your result?">
            Submit
        </button>
      </form>
      {result ? <Popup reset={restart} quit={props.main} client={result} correct={correctAnswersState}/> : null }
    </>
  );
}
