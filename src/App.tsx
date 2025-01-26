import "./App.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import { boardDefault, generateWordSet } from "./Words";
import React, { useState, createContext, useEffect } from "react";
import GameOver from "./components/GameOver";

interface GameOverState {
  gameOver: boolean;
  guessedWord: boolean;
}

interface CurrAttempt {
  attempt: number;
  letter: number;
}

interface AppContextProps {
  board: string[][];
  setBoard: React.Dispatch<React.SetStateAction<string[][]>>;
  currAttempt: CurrAttempt;
  setCurrAttempt: React.Dispatch<React.SetStateAction<CurrAttempt>>;
  correctWord: string;
  onSelectLetter: (key: string) => void;
  onDelete: () => void;
  onEnter: () => void;
  setDisabledLetters: React.Dispatch<React.SetStateAction<string[]>>;
  disabledLetters: string[];
  gameOver: GameOverState;
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);

function App() {
  const [board, setBoard] = useState<string[][]>(boardDefault);
  const [currAttempt, setCurrAttempt] = useState<CurrAttempt>({ attempt: 0, letter: 0 });
  const [wordSet, setWordSet] = useState<Set<string>>(new Set());
  const [correctWord, setCorrectWord] = useState<string>("");
  const [disabledLetters, setDisabledLetters] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState<GameOverState>({
    gameOver: false,
    guessedWord: false,
  });

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);
    });
  }, []);

  const onEnter = () => {
    if (currAttempt.letter !== 5) return;

    let currWord = "";
    for (let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i];
    }
    if (wordSet.has(currWord.toLowerCase())) {
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letter: 0 });
    } else {
      alert("Word not found");
    }

    if (currWord === correctWord) {
      setGameOver({ gameOver: true, guessedWord: true });
      return;
    }
    if (currAttempt.attempt === 5) {
      setGameOver({ gameOver: true, guessedWord: false });
      return;
    }
  };

  const onDelete = () => {
    if (currAttempt.letter === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letter - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letter: currAttempt.letter - 1 });
  };

  const onSelectLetter = (key: string) => {
    if (currAttempt.letter > 4) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letter] = key;
    setBoard(newBoard);
    setCurrAttempt({
      attempt: currAttempt.attempt,
      letter: currAttempt.letter + 1,
    });
  };

  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <AppContext.Provider
        value={{
          board,
          setBoard,
          currAttempt,
          setCurrAttempt,
          correctWord,
          onSelectLetter,
          onDelete,
          onEnter,
          setDisabledLetters,
          disabledLetters,
          gameOver,
        }}
      >
        <div className="game">
          <Board />
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
