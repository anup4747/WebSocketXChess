import type { PieceType, SquareProps } from '../types';

const PieceComponent: React.FC<SquareProps> = ({ piece }) => {
  if (!piece || !piece.type) return null;
  const symbols: Record<PieceType, { white: string; black: string }> = {
    king: { white: "♔", black: "♚" },
    queen: { white: "♕", black: "♛" },
    rook: { white: "♖", black: "♜" },
    bishop: { white: "♗", black: "♝" },
    knight: { white: "♘", black: "♞" },
    pawn: { white: "♙", black: "♟" },
  };
  return <span className="text-6xl">{symbols[piece.type][piece.color]}</span>;
};

export default PieceComponent;
