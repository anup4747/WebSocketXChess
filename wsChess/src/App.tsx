import "./App.css";
import Chessboard from "./components/ChessBoard";
import Controls from "./components/Control";
import React from "react";
import type { BoardState } from "./types";
import { initialBoard } from "./utils/initialBoardState";

const App: React.FC = () => {

  const [state, setState] = React.useState<BoardState>({
    board: initialBoard,
    selected: null,
    turn: "white",
  });

  const handleClick = (row: number, col: number) => {
    if (!state.selected) {
      if (state.board[row][col]?.color === state.turn) {
        setState({ ...state, selected: { row, col } });
      }
    } else {
      const newBoard = state.board.map((row) => [...row]);
      newBoard[row][col] = newBoard[state.selected.row][state.selected.col];
      newBoard[state.selected.row][state.selected.col] = null;
      setState({
        board: newBoard,
        selected: null,
        turn: state.turn === "white" ? "black" : "white",
      });
    }
  };

  const resetGame = () => {
    setState({ board: initialBoard, selected: null, turn: "white" });
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-[#1c1c1c]">
      <h1 className="text-3xl font-bold mb-4 text-white">Chess Game</h1>
      <Chessboard board={state.board} onClick={handleClick} />
      <Controls turn={state.turn} resetGame={resetGame} />
    </section>
  );
}

export default App;
