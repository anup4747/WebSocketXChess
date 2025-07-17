import Square from "./Square";
import type { Piece } from "../types";
import type { ChessboardProps } from "../types";

const Chessboard: React.FC<ChessboardProps> = ({
  board,
  onClick,
  selected,
  validMoves,
}) => {
  return (
    <div className="flex items-center justify-center border-white border-4">
      <div className="select-none grid grid-cols-8 gap-0 w-[700px] ">
        {board.map((row, r) =>
          row.map((piece, c) => (
            <Square
              key={`${r}-${c}`}
              row={r}
              col={c}
              piece={piece}
              onClick={onClick}
              selected={selected}
              isValidMove={validMoves.some(
                (move) => move.row === r && move.col === c
              )}
              isSelected={selected?.row === r && selected?.col === c}
            />
          ))
        )}
      </div>
    </div>
  );
};

// highlighting the path
export const getValidPawnMoves = (
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

export const getValidRookMoves = (
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

export const getValidKnightMoves = (
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

export default Chessboard;
