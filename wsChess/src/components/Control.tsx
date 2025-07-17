import React from "react";
import { initialBoard } from "../utils/initialBoardState";
import type { boardStateProp } from "../types";
import { Link } from "react-router-dom";

const Controls: React.FC<{ turn: string; resetGame: () => void }> = ({ turn, resetGame }) => {
  const [boardState, setBoardState] = React.useState<boardStateProp>({
    board: initialBoard,
    selected: null,
    turn: "white",
  });

  
  return (
    <div className="mt-4 flex flex-col items-center">
      <p className="text-lg text-white">Turn: {turn}</p>
      <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={resetGame}
      >
        Reset Game
      </button>
      <Link to="/">
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Home
        </button>
      </Link>
    </div>
  );
};

export default Controls;
