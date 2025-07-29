import Square from "./Square";
import type { Piece } from "../types/types";
import React, { useEffect, useState } from "react";
import { useGameThemeContext } from "../context/themeContext";
import { useBoardStateContext } from "../context/boardContext";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { calculatePoints } from "../context/pointsContext";
import { usePoitnsContext } from "../context/pointsContext";
import { initialBoard } from "../utils/initialBoardState";

gsap.registerPlugin(useGSAP);

const Chessboard: React.FC = () => {
  const { getBorder } = useGameThemeContext();
  const [validMoves, setValidMoves] = useState<{ row: number; col: number }[]>(
    []
  );
  const { setBlackPoints, setWhitePoints } = usePoitnsContext();
  const { board, turn, selected, updateBoard } = useBoardStateContext();

  useEffect(() => {
    const { whitePoints, blackPoints } = calculatePoints(initialBoard);
    setWhitePoints(whitePoints);
    setBlackPoints(blackPoints);

  },[setBlackPoints, setWhitePoints]);

  const handleClick = (row: number, col: number) => {

    if (!selected) {
      if (board[row][col]?.color !== turn) {
        setValidMoves([]);
        return;
      }
      let moves: { row: number; col: number }[] = [];
      if (board[row][col]?.type == "pawn") {
        // Calculates the valid pawn moves
        moves = getValidPawnMoves(row, col, board[row][col]!, board);
      } else if (board[row][col]?.type === "rook") {
        // Calculate valid rook moves
        moves = getValidRookMoves(row, col, board[row][col]!, board);
      } else if (board[row][col]?.type === "knight") {
        // Calculate valid knight moves
        moves = getValidKnightMoves(row, col, board[row][col]!, board);
      } else if (board[row][col]?.type === "bishop") {
        // Calculate valid knight moves
        moves = getValidBishopMoves(row, col, board[row][col]!, board);
      } else if (board[row][col]?.type === "queen") {
        // Calculate valid knight moves
        moves = getValidQueenMoves(row, col, board[row][col]!, board);
      } else if (board[row][col]?.type === "king") {
        // Calculate valid knight moves
        moves = getValidKingMoves(row, col, board[row][col]!, board);
      }
      setValidMoves(moves);
      updateBoard(board, turn, { row, col });
    } else {
      const isValid = validMoves.some(
        (move) => move.row === row && move.col === col
      );
      if (isValid) {
        const newBoard = board.map((r) => [...r]);
        newBoard[row][col] = newBoard[selected.row][selected.col];
        newBoard[selected.row][selected.col] = null;
        gsap.to(`.square-${row}-${col}`, {
          scale: 1.2,
          duration: 0.3,
          ease: "power2.out",
          yoyo: true,
          repeat: 1,
        });
        setValidMoves([]);
        updateBoard(newBoard, turn === "white" ? "black" : "white", null);
        
      } else {
        setValidMoves([]);
        updateBoard(board, turn, null);
      }
    }
  };

  return (
    <section className="px-4 md:px-8 sm:px-12">
      <div className="flex items-center justify-center">
        <div className={`flex items-center justify-center ${getBorder}`}>
          <div className="select-none grid grid-cols-8 gap-0 w-full max-w-[650px] sm:w-[90vw] sm:max-w-[600px] md:max-w-[500px]">
            {board.map((row, r: number) =>
              row.map((piece, c: number) => (
                <Square
                  key={`${r}-${c}`}
                  row={r}
                  col={c}
                  piece={piece}
                  onClick={handleClick}
                  selected={selected}
                  isValidMove={validMoves.some(
                    (move) => move.row === r && move.col === c
                  )}
                  isSelected={selected?.row === r && selected?.col === c}
                  className={`square-${r}-${c}`}
                />
              ))
            )}
          </div>
        </div>
      </div>
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
    board[row + direction]?.[col - 1]?.color !== piece.color &&
    board[row + direction]?.[col - 1] !== null
  ) {
    moves.push({ row: row + direction, col: col - 1 });
  }

  if (
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
