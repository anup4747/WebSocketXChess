import Square from "./Square";
import type { Piece } from "../types/types";
import type { boardStateProp } from "../types/types";
import React, { useState } from "react";
import { initialBoard } from "../utils/initialBoardState";
import Controls from "./Control";
import { useGameThemeContext } from "../context/themeContext";

const Chessboard: React.FC = () => {

  const {isDark} = useGameThemeContext();
  const [validMoves, setValidMoves] = useState<{ row: number; col: number }[]>(
    []
  );

  const [boardState, setBoardState] = React.useState<boardStateProp>({
    board: initialBoard,
    selected: null,
    turn: "white",
  });

  const handleClick = (row: number, col: number) => {
    setBoardState((state) => {
      if (!state.selected) {
        if (state.board[row][col]?.type == "pawn") {
          // Calculates the valid pawn moves
          const pawnValidMoves = getValidPawnMoves(
            row,
            col,
            state.board[row][col]!,
            state.board
          );
          setValidMoves(pawnValidMoves);
        } else if (state.board[row][col]?.type === "rook") {
          // Calculate valid rook moves
          const hookMoves = getValidRookMoves(
            row,
            col,
            state.board[row][col]!,
            state.board
          );
          setValidMoves(hookMoves);
        } else if (state.board[row][col]?.type === "knight") {
          // Calculate valid knight moves
          const knightValidMoves = getValidKnightMoves(
            row,
            col,
            state.board[row][col]!,
            state.board
          );
          setValidMoves(knightValidMoves);
        } else if (state.board[row][col]?.type === "bishop") {
          // Calculate valid knight moves
          const bishopValidMoves = getValidBishopMoves(
            row,
            col,
            state.board[row][col]!,
            state.board
          );
          setValidMoves(bishopValidMoves);
        } else if (state.board[row][col]?.type === "queen") {
          // Calculate valid knight moves
          const queenValidMoves = getValidQueenMoves(
            row,
            col,
            state.board[row][col]!,
            state.board
          );
          setValidMoves(queenValidMoves);
        } else if (state.board[row][col]?.type === "king") {
          // Calculate valid knight moves
          const kingValidMoves = getValidKingMoves(
            row,
            col,
            state.board[row][col]!,
            state.board
          );
          setValidMoves(kingValidMoves);
        } else {
          setValidMoves([]);
        }
        if (state.board[row][col] == null) {
          setValidMoves([]);
          return { ...state, selected: null };
        }
        if (state.board[row][col]?.color === state.turn) {
          return { ...state, selected: { row, col } };
        }
        return state;
      } else {
        const isValid = validMoves.some(
          (move) => move.row === row && move.col === col
        );

        if (isValid) {
          const newBoard = state.board.map((r) => [...r]);
          newBoard[row][col] = newBoard[state.selected.row][state.selected.col];
          newBoard[state.selected.row][state.selected.col] = null;
          // Clear valid moves after moving
          setValidMoves([]);
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

  const getBorder = () => {
    if (isDark) {
      return "border-4 border-white";
    } else {
      return "border-4 border-green-700";
    }
  };
  return (
    <section>
      <div className={`flex items-center justify-center ${getBorder()}`}>
        <div className="select-none grid grid-cols-8 gap-0 w-[700px] ">
          {boardState.board.map((row, r) =>
            row.map((piece, c) => (
              <Square
                key={`${r}-${c}`}
                row={r}
                col={c}
                piece={piece}
                onClick={handleClick}
                selected={boardState.selected}
                isValidMove={validMoves.some(
                  (move) => move.row === r && move.col === c
                )}
                isSelected={
                  boardState.selected?.row === r &&
                  boardState.selected?.col === c
                }
              />
            ))
          )}
        </div>
      </div>
      <Controls
        resetGame={resetGame}
        turn={boardState.turn}
      />
    </section>
  );
};

// highlighting the valid pawn path
const getValidPawnMoves = (
  row: number,
  col: number,
  piece: Piece,
  board: (Piece | null)[][]
): { row: number; col: number }[] => {
  const moves: { row: number; col: number }[] = [];
  const direction = piece.color === "white" ? -1 : 1; // white moves up, black moves down
  const startRow = piece.color === "white" ? 6 : 1; // starting row for white or black pawns

  // forward move (1 square)
  if (board[row + direction]?.[col] === null) {
    moves.push({ row: row + direction, col });
  }

  // forward move (2 square)
  if (
    row === startRow &&
    board[row + direction]?.[col] === null &&
    board[row + direction + direction]?.[col] === null
  ) {
    moves.push({ row: row + direction + direction, col });
  }

  // diagonal moves
  if (
    row !== startRow &&
    board[row + direction]?.[col - 1]?.color !== piece.color &&
    board[row + direction]?.[col - 1] !== null
  ) {
    moves.push({ row: row + direction, col: col - 1 });
  }

  if (
    row !== startRow &&
    board[row + direction]?.[col + 1]?.color !== piece.color &&
    board[row + direction]?.[col + 1] !== null
  ) {
    moves.push({ row: row + direction, col: col + 1 });
  }

  return moves;
};
// highlighting the valid rook path
const getValidRookMoves = (
  row: number,
  col: number,
  piece: Piece,
  board: (Piece | null)[][]
): { row: number; col: number }[] => {
  const moves: { row: number; col: number }[] = [];

  // Horizontal moves (left)
  for (let c = col - 1; c >= 0; c--) {
    if (board[row][c] === null) {
      moves.push({ row, col: c });
    } else if (board[row][c]?.color !== piece.color) {
      moves.push({ row, col: c }); // Capture opponent's piece
      break;
    } else {
      break; // Blocked by same-color piece
    }
  }

  // Horizontal moves (right)
  for (let c = col + 1; c < 8; c++) {
    if (board[row][c] === null) {
      moves.push({ row, col: c });
    } else if (board[row][c]?.color !== piece.color) {
      moves.push({ row, col: c }); // Capture opponent's piece
      break;
    } else {
      break; // Blocked by same-color piece
    }
  }

  // Vertical moves (up)
  for (let r = row - 1; r >= 0; r--) {
    if (board[r][col] === null) {
      moves.push({ row: r, col });
    } else if (board[r][col]?.color !== piece.color) {
      moves.push({ row: r, col }); // Capture opponent's piece
      break;
    } else {
      break; // Blocked by same-color piece
    }
  }

  // Vertical moves (down)
  for (let r = row + 1; r < 8; r++) {
    if (board[r][col] === null) {
      moves.push({ row: r, col });
    } else if (board[r][col]?.color !== piece.color) {
      moves.push({ row: r, col }); // Capture opponent's piece
      break;
    } else {
      break; // Blocked by same-color piece
    }
  }

  return moves;
};
// highlighting the valid bishop path
const getValidBishopMoves = (
  row: number,
  col: number,
  piece: Piece,
  board: (Piece | null)[][]
): { row: number; col: number }[] => {
  const moves: { row: number; col: number }[] = [];

  // (up-right: row decreases, col increases)
  for (let i = 1; row - i >= 0 && col + i < 8; i++) {
    if (board[row - i][col + i] === null) {
      moves.push({ row: row - i, col: col + i });
    } else if (board[row - i][col + i]?.color !== piece.color) {
      moves.push({ row: row - i, col: col + i }); // Capture opponent's piece
      break;
    } else {
      break; // Blocked by same-color piece
    }
  }

  // (up-left: row decreases, col decreases)
  for (let i = 1; row - i >= 0 && col - i >= 0; i++) {
    if (board[row - i][col - i] === null) {
      moves.push({ row: row - i, col: col - i });
    } else if (board[row - i][col - i]?.color !== piece.color) {
      moves.push({ row: row - i, col: col - i }); // Capture opponent's piece
      break;
    } else {
      break; // Blocked by same-color piece
    }
  }

  // (down-right: row increases, col increases)
  for (let i = 1; row + i < 8 && col + i < 8; i++) {
    if (board[row + i][col + i] === null) {
      moves.push({ row: row + i, col: col + i });
    } else if (board[row + i][col + i]?.color !== piece.color) {
      moves.push({ row: row + i, col: col + i }); // Capture opponent's piece
      break;
    } else {
      break; // Blocked by same-color piece
    }
  }

  // (down-left: row increases, col decreases)
  for (let i = 1; row + i < 8 && col - i >= 0; i++) {
    if (board[row + i][col - i] === null) {
      moves.push({ row: row + i, col: col - i });
    } else if (board[row + i][col - i]?.color !== piece.color) {
      moves.push({ row: row + i, col: col - i }); // Capture opponent's piece
      break;
    } else {
      break; // Blocked by same-color piece
    }
  }

  return moves;
};
// highlighting the valid knight path
const getValidKnightMoves = (
  row: number,
  col: number,
  piece: Piece,
  board: (Piece | null)[][]
): { row: number; col: number }[] => {
  const moves: { row: number; col: number }[] = [];
  const offsets = [
    { row: -2, col: -1 }, // Up 2, left 1
    { row: -2, col: 1 }, // Up 2, right 1
    { row: 2, col: -1 }, // Down 2, left 1
    { row: 2, col: 1 }, // Down 2, right 1
    { row: -1, col: -2 }, // Up 1, left 2
    { row: -1, col: 2 }, // Up 1, right 2
    { row: 1, col: -2 }, // Down 1, left 2
    { row: 1, col: 2 }, // Down 1, right 2
  ];

  // Check each possible L-shaped move
  for (const offset of offsets) {
    const newRow = row + offset.row;
    const newCol = col + offset.col;
    // Check if the move is within board bounds
    if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
      // Allow move if square is empty or has an opponent's piece
      if (
        board[newRow][newCol] === null ||
        board[newRow][newCol]?.color !== piece.color
      ) {
        moves.push({ row: newRow, col: newCol });
      }
    }
  }
  return moves;
};
// highlighting the valid king path
const getValidKingMoves = (
  row: number,
  col: number,
  piece: Piece,
  board: (Piece | null)[][]
): { row: number; col: number }[] => {
  const moves: { row: number; col: number }[] = [];

  const offsets = [
    { row: -1, col: 0 }, // Up
    { row: 1, col: 0 }, // Down
    { row: 0, col: -1 }, // Left
    { row: 0, col: 1 }, // Right
    { row: -1, col: -1 }, // Up-left
    { row: -1, col: 1 }, // Up-right
    { row: 1, col: -1 }, // Down-left
    { row: 1, col: 1 }, // Down-right
  ];

  for (const offset of offsets) {
    const newRow = row + offset.row;
    const newCol = col + offset.col;
    // Check if the move is within board bounds
    if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
      // Allow move if square is empty or has an opponent's piece
      if (
        board[newRow][newCol] === null ||
        board[newRow][newCol]?.color !== piece.color
      ) {
        moves.push({ row: newRow, col: newCol });
      }
    }
  }

  return moves;
};
// highlighting the valid queen path
const getValidQueenMoves = (
  row: number,
  col: number,
  piece: Piece,
  board: (Piece | null)[][]
): { row: number; col: number }[] => {
  const moves: { row: number; col: number }[] = [];
  // Horizontal moves (left)
  for (let c = col - 1; c >= 0; c--) {
    if (board[row][c] === null) {
      moves.push({ row, col: c });
    } else if (board[row][c]?.color !== piece.color) {
      moves.push({ row, col: c }); // Capture opponent's piece
      break;
    } else {
      break; // Blocked by same-color piece
    }
  }

  // Horizontal moves (right)
  for (let c = col + 1; c < 8; c++) {
    if (board[row][c] === null) {
      moves.push({ row, col: c });
    } else if (board[row][c]?.color !== piece.color) {
      moves.push({ row, col: c }); // Capture opponent's piece
      break;
    } else {
      break; // Blocked by same-color piece
    }
  }

  // Vertical moves (up)
  for (let r = row - 1; r >= 0; r--) {
    if (board[r][col] === null) {
      moves.push({ row: r, col });
    } else if (board[r][col]?.color !== piece.color) {
      moves.push({ row: r, col }); // Capture opponent's piece
      break;
    } else {
      break; // Blocked by same-color piece
    }
  }

  // Vertical moves (down)
  for (let r = row + 1; r < 8; r++) {
    if (board[r][col] === null) {
      moves.push({ row: r, col });
    } else if (board[r][col]?.color !== piece.color) {
      moves.push({ row: r, col }); // Capture opponent's piece
      break;
    } else {
      break; // Blocked by same-color piece
    }
  }

  // (up-right: row decreases, col increases)
  for (let i = 1; row - i >= 0 && col + i < 8; i++) {
    if (board[row - i][col + i] === null) {
      moves.push({ row: row - i, col: col + i });
    } else if (board[row - i][col + i]?.color !== piece.color) {
      moves.push({ row: row - i, col: col + i }); // Capture opponent's piece
      break;
    } else {
      break; // Blocked by same-color piece
    }
  }

  // (up-left: row decreases, col decreases)
  for (let i = 1; row - i >= 0 && col - i >= 0; i++) {
    if (board[row - i][col - i] === null) {
      moves.push({ row: row - i, col: col - i });
    } else if (board[row - i][col - i]?.color !== piece.color) {
      moves.push({ row: row - i, col: col - i }); // Capture opponent's piece
      break;
    } else {
      break; // Blocked by same-color piece
    }
  }

  // (down-right: row increases, col increases)
  for (let i = 1; row + i < 8 && col + i < 8; i++) {
    if (board[row + i][col + i] === null) {
      moves.push({ row: row + i, col: col + i });
    } else if (board[row + i][col + i]?.color !== piece.color) {
      moves.push({ row: row + i, col: col + i }); // Capture opponent's piece
      break;
    } else {
      break; // Blocked by same-color piece
    }
  }

  // (down-left: row increases, col decreases)
  for (let i = 1; row + i < 8 && col - i >= 0; i++) {
    if (board[row + i][col - i] === null) {
      moves.push({ row: row + i, col: col - i });
    } else if (board[row + i][col - i]?.color !== piece.color) {
      moves.push({ row: row + i, col: col - i }); // Capture opponent's piece
      break;
    } else {
      break; // Blocked by same-color piece
    }
  }

  return moves;
};
export default Chessboard;
