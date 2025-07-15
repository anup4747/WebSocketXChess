import "./App.css";
import Chessboard, { getValidPawnMoves } from "./components/ChessBoard";
import Controls from "./components/Control";
import React from "react";
import type { boardStateProp } from "./types";
import { initialBoard } from "./utils/initialBoardState";
import { useState } from "react";

const App: React.FC = () => {
  const [validMoves, setValidMoves] = useState<{ row: number; col: number }[]>(
    []
  );

  const [boardState, setBoardState] = React.useState<boardStateProp>({
    board: initialBoard,
    selected: null,
    turn: "white",
  });

  const handleClick = (row: number, col: number) => {
    console.log(boardState.board[row][col]?.type , boardState.board[row][col]?.color);
    setBoardState((state) => {
      if (!state.selected) {
        if (state.board[row][col] == null) {
          setValidMoves([]);
          return { ...state, selected: null };
        }
       
        if (state.board[row][col]?.type == "pawn") {
          // Calculates the valid pawn moves
          const moves = getValidPawnMoves(
            row,
            col,
            state.board[row][col]!,
            state.board
          );
          setValidMoves(moves);
        } else {
          setValidMoves([]); // Clear valid moves for non-pawns
        }
         if (state.board[row][col]?.color === state.turn) {
          return { ...state, selected: { row, col } };
        } 
        return state;
      } else {
        const isValid = validMoves.some((move) => move.row === row && move.col === col);
        if (isValid || state.board[row][col]?.type !== "pawn") {
          const newBoard = state.board.map((r) => [...r]);
          newBoard[row][col] = newBoard[state.selected.row][state.selected.col];
          newBoard[state.selected.row][state.selected.col] = null;
          setValidMoves([]); // Clear valid moves after moving
          return {
            board: newBoard,
            selected: null,
            turn: state.turn === "white" ? "black" : "white",
          };
        }
        setValidMoves([]);
        return { ...state, selected: null };
      }
    });
  };

  const resetGame = () => {
    setBoardState({ board: initialBoard, selected: null, turn: "white" });
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-[#1c1c1c]">
      <h1 className="text-3xl font-bold mb-4 text-white">Chess Game</h1>
      <Chessboard
        board={boardState.board}
        onClick={handleClick}
        selected={boardState.selected}
        validMoves={validMoves}
      />
      <Controls turn={boardState.turn} resetGame={resetGame} />
    </section>
  );
};

export default App;
