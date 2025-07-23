export type PieceType = "king" | "queen" | "rook" | "bishop" | "knight" | "pawn";

export type Color = "white" | "black";

export interface Piece {
  type: PieceType;
  color: Color;
  image?: string; 
}

export interface boardStateProp {
  board: (Piece | null)[][];
  selected: { row: number; col: number } | null;
  turn: "white" | "black";
}

export interface ControlProps{
  turn: string;
  resetGame: () => void;
}

export interface SquareProps {
  row: number;
  col: number;
  piece: Piece | null;
  onClick: (row: number, col: number) => void;
}

export interface ExtendedSquareProps extends SquareProps {
  selected: { row: number; col: number } | null;
  isValidMove?: boolean; // valid move highlighting
  isSelected?: boolean;  // check if it is seclected
}

