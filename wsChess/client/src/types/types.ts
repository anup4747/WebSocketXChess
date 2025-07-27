export type PieceType = "king" | "queen" | "rook" | "bishop" | "knight" | "pawn";

export type Color = "white" | "black";

export type GameMode = "offline" | "multi" | "ai" | "";

export interface Piece {
  type: PieceType;
  color: Color;
  image?: string; 
}

export interface BoardState {
  board: (Piece | null)[][];
  selected: { row: number; col: number } | null;
  turn: Color;
}

export interface BoardStateContextType {
  board: (Piece | null)[][];
  selected: { row: number; col: number } | null;
  turn: Color;
  resetGame?: () => void;
  updateBoard: (newBoard: (Piece | null)[][], newTurn: Color, newSelected: { row: number; col: number } | null) => void;
}

export interface PlayerNameContextType {
  player1Name: string;
  setPlayer1Name: (name: string) => void;
  player2Name: string;
  setPlayer2Name: (name: string) => void;
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
  getBorder?: string;
  getHoverClasses?:string
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
  className?: string;
}

export interface GameModeContextType {
  gameMode: GameMode;
  setGameMode: (mode: GameMode) => void;
}

