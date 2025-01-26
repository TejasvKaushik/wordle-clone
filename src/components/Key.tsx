import React, { useContext } from "react";
import { AppContext } from "../App";

interface KeyProps {
  keyVal: string;
  bigKey?: boolean;
  disabled: boolean;
}

const Key: React.FC<KeyProps> = ({ keyVal, bigKey = false, disabled }) => {
    const keyContext = useContext(AppContext);
    if(!keyContext) return null;
  const { gameOver, onSelectLetter, onDelete, onEnter } = keyContext;

  const selectLetter = () => {
    if (gameOver.gameOver) return;
    if (keyVal === "ENTER") {
      onEnter();
    } else if (keyVal === "DELETE") {
      onDelete();
    } else {
      onSelectLetter(keyVal);
    }
  };

  return (
    <div
      className={`key ${bigKey ? "big" : ""} ${disabled ? "disabled" : ""}`}
      onClick={selectLetter}
    >
      {keyVal}
    </div>
  );
};

export default Key;
