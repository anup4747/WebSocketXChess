import { pieceImages } from "./pieceImages";
import type { Piece } from "../types/types";

export const initialBoard: (Piece | null)[][] = Array(8).fill(null).map(() => Array(8).fill(null));

initialBoard[0][0] = { type: "rook", color: "black", image:pieceImages['black-rook'],points: 5 };
initialBoard[0][1] = { type: "knight", color: "black", image:pieceImages['black-knight'],points: 3 };
initialBoard[0][2] = { type: "bishop", color: "black", image:pieceImages['black-bishop'],points: 3 };
initialBoard[0][3] = { type: "queen", color: "black", image:pieceImages['black-queen'],points: 9 };
initialBoard[0][4] = { type: "king", color: "black", image:pieceImages['black-king'],points: 0 };
initialBoard[0][5] = { type: "bishop", color: "black", image:pieceImages['black-bishop'],points: 3 };
initialBoard[0][6] = { type: "knight", color: "black", image:pieceImages['black-knight'],points: 3 };
initialBoard[0][7] = { type: "rook", color: "black", image:pieceImages['black-rook'],points: 5 };
initialBoard[1][0] = { type: "pawn", color: "black", image:pieceImages['black-pawn'],points: 1 };
initialBoard[1][1] = { type: "pawn", color: "black", image:pieceImages['black-pawn'],points: 1 };
initialBoard[1][2] = { type: "pawn", color: "black", image:pieceImages['black-pawn'],points: 1 };
initialBoard[1][3] = { type: "pawn", color: "black", image:pieceImages['black-pawn'],points: 1 };
initialBoard[1][4] = { type: "pawn", color: "black", image:pieceImages['black-pawn'],points: 1 };
initialBoard[1][5] = { type: "pawn", color: "black", image:pieceImages['black-pawn'],points: 1 };
initialBoard[1][6] = { type: "pawn", color: "black", image:pieceImages['black-pawn'],points: 1 };
initialBoard[1][7] = { type: "pawn", color: "black", image:pieceImages['black-pawn'],points: 1 };

initialBoard[7][0] = { type: "rook", color: "white", image:pieceImages['white-rook'],points: 5 };
initialBoard[7][1] = { type: "knight", color: "white", image:pieceImages['white-knight'],points: 3 };
initialBoard[7][2] = { type: "bishop", color: "white", image:pieceImages['white-bishop'],points: 3 };
initialBoard[7][3] = { type: "queen", color: "white", image:pieceImages['white-queen'],points: 9 };
initialBoard[7][4] = { type: "king", color: "white", image:pieceImages['white-king'],points: 0 };
initialBoard[7][5] = { type: "bishop", color: "white", image:pieceImages['white-bishop'],points: 3 };
initialBoard[7][6] = { type: "knight", color: "white", image:pieceImages['white-knight'],points: 3 };
initialBoard[7][7] = { type: "rook", color: "white", image:pieceImages['white-rook'],points: 5 };
initialBoard[6][0] = { type: "pawn", color: "white", image:pieceImages['white-pawn'],points: 1 };
initialBoard[6][1] = { type: "pawn", color: "white", image:pieceImages['white-pawn'],points: 1 };
initialBoard[6][2] = { type: "pawn", color: "white", image:pieceImages['white-pawn'],points: 1 };
initialBoard[6][3] = { type: "pawn", color: "white", image:pieceImages['white-pawn'],points: 1 };
initialBoard[6][4] = { type: "pawn", color: "white", image:pieceImages['white-pawn'],points: 1 };
initialBoard[6][5] = { type: "pawn", color: "white", image:pieceImages['white-pawn'],points: 1 };
initialBoard[6][6] = { type: "pawn", color: "white", image:pieceImages['white-pawn'],points: 1 };
initialBoard[6][7] = { type: "pawn", color: "white", image:pieceImages['white-pawn'],points: 1 };
