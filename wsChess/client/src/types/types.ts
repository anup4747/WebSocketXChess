export type PieceType = "king" | "queen" | "rook" | "bishop" | "knight" | "pawn";

export type Color = "white" | "black";

export interface Piece {
  type: PieceType;
  color: Color;
  image?: string; 
}

export interface BoardStateContextType {
  board: (Piece | null)[][];
  selected: { row: number; col: number } | null;
  turn: "white" | "black";
}

export interface PlayerNameContextType {
  playerName: string;
  setPlayerName: (name: string) => void;
}

export interface RoomContextType {
  generateRoomCode: () => string;
  generatedRoomCode: string;
  setGeneratedRoomCode: (code: string) => void;
}

export interface GameThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  themeClasses?: string;
  buttonClasses?: string;
  cardClasses?: string;
  primaryButtonClasses?: string;
  inputClasses?: string;
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

