import "./App.css";
import Chessboard from "./components/ChessBoard";
import Controls from "./components/Control";
import React from "react";

type PieceType = "king" | "queen" | "rook" | "bishop" | "knight" | "pawn";

type Color = "white" | "black";

interface Piece {
  type: PieceType;
  color: Color;
}

interface BoardState {
  board: (Piece | null)[][];
  selected: { row: number; col: number } | null;
  turn: "white" | "black";
}

const App: React.FC = () => {
  const initialBoard: BoardState["board"] = Array(8)
    .fill(null)
    .map(() => Array(8).fill(null));
  // Initialize board with pieces (simplified for brevity)
  initialBoard[0][0] = { type: "rook", color: "black" };
  initialBoard[0][7] = { type: "rook", color: "black" };
  initialBoard[7][0] = { type: "rook", color: "white" };
  initialBoard[7][7] = { type: "rook", color: "white" };
  // Add more pieces as needed...

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
