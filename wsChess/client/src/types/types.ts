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

export interface ChessboardProps {
  isDark?:boolean;
  themeClasses?:string;
  cardClasses?:string;
  buttonClasses?:string;
  primaryButtonClasses?:string;
  toggleTheme?: () => void;
}

export interface PlayOfflineProps{
  isDark?:boolean;
  themeClasses?:string;
  cardClasses?:string;
  buttonClasses?:string;
  primaryButtonClasses?:string;
  toggleTheme?: () => void;
}

export interface ControlProps{
  isDark?:boolean;
  themeClasses?:string;
  cardClasses?:string;
  buttonClasses?:string;
  primaryButtonClasses?:string;
  turn?: string;
  toggleTheme?: () => void;
  resetGame?: () => void;
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
  isDark?:boolean;
}

export interface MenuProps{
  isDark?:boolean;
  themeClasses?:string;
  buttonClasses?:string;
  cardClasses?:string;
  toggleTheme?: () => void;
}

export interface RoomMenuProps{
  isDark?:boolean;
  themeClasses?:string;
  buttonClasses?:string;
  cardClasses?:string;
  primaryButtonClasses?:string;
  inputClasses?:string;
  toggleTheme?: () => void;
}

export interface InConstuctionProps{
  themeClasses?:string;
  buttonClasses?:string;
}

export interface PageNotFoundProps{
  themeClasses?:string;
  buttonClasses?:string;
}
