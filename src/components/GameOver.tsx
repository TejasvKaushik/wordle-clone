import React, { useContext } from "react";
import { AppContext } from "../App";

const GameOver: React.FC = () => {
  const gameoverContext = useContext(AppContext);
  if (!gameoverContext) return null;
  const {
    currAttempt,
    gameOver,
    correctWord,
  } = gameoverContext;

  return (
    <div className="gameOver">
      <h3>
        {gameOver.guessedWord
          ? "You Correctly Guessed the Wordle"
          : "You Failed to Guess the Word"}
      </h3>
      <h1>Correct Word: {correctWord}</h1>
      {gameOver.guessedWord && (
        <h3>You guessed in {currAttempt.attempt} attempts</h3>
      )}
    </div>
  );
};

export default GameOver;
