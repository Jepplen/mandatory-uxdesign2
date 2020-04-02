import React from "react";
import FocusTrap from "focus-trap-react";
import "./Popup.css";

export default function Popup(props){
  const score = `Your score is ${props.client} of ${props.correct}`;

  return(
    <>
      <div className="popup-mask">
      <FocusTrap>
          <div className="popup__container" >
            <div className="popup__container__result">
              <h3 className="popup__container__result__text" tabIndex="0" aria-label={score}>{score}</h3>
            </div>
            <button
              className="button"
              id="popup__container__button"
              aria-label="This button restarts the game with ten new questions for you to master"
              onClick={() => props.reset()}>
                Play again
            </button>
            <button
              className="button"
              id="popup__container__button"
              aria-label="This button quits the game, and takes you back the main page"
              onClick={() => props.quit(true)}>
                Quit
            </button>
          </div>
        </FocusTrap>
      </div>
    </>
  );
}
