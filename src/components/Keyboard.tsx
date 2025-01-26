import React, { useCallback, useEffect, useContext } from "react";
import Key from "./Key";
import { AppContext } from "../App";

const Keyboard: React.FC = () => {
  const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];

  const keyboardContext = useContext(AppContext);
  if (!keyboardContext) return null;
  const {
    disabledLetters,
    currAttempt,
    gameOver,
    onSelectLetter,
    onEnter,
    onDelete,
  } = keyboardContext;

  const handleKeyboard = useCallback(
    (event: KeyboardEvent) => {
      if (gameOver.gameOver) return;
      if (event.key === "Enter") {
        onEnter();
      } else if (event.key === "Backspace") {
        onDelete();
      } else {
        const allKeys = [...keys1, ...keys2, ...keys3];
        if (allKeys.includes(event.key.toUpperCase())) {
          onSelectLetter(event.key.toUpperCase());
        }
      }
    },
    [currAttempt, gameOver, onEnter, onDelete, onSelectLetter]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);

    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);

  return (
    <div className="keyboard">
      <div className="line1">
        {keys1.map((key) => (
          <Key
            key={key}
            keyVal={key}
            disabled={disabledLetters.includes(key)}
          />
        ))}
      </div>
      <div className="line2">
        {keys2.map((key) => (
          <Key
            key={key}
            keyVal={key}
            disabled={disabledLetters.includes(key)}
          />
        ))}
      </div>
      <div className="line3">
        <Key keyVal={"ENTER"} bigKey disabled={false} /> {/* Pass `disabled` prop */}
        {keys3.map((key) => (
          <Key
            key={key}
            keyVal={key}
            disabled={disabledLetters.includes(key)}
          />
        ))}
        <Key keyVal={"DELETE"} bigKey disabled={false} /> {/* Pass `disabled` prop */}
      </div>
    </div>
  );
};

export default Keyboard;
