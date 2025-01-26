import React from "react";
import Letter from "./Letter";

const Board: React.FC = () => {
  return (
    <div className="board">
      {[...Array(6)].map((_, attemptVal) => (
        <div key={attemptVal} className="row">
          {[...Array(5)].map((_, letterPos) => (
            <Letter key={letterPos} letterPos={letterPos} attemptVal={attemptVal} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
