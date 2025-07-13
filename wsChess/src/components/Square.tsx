import PieceComponent from "./Piece";
import type { SquareProps } from '../types';

const Square: React.FC<SquareProps> = ({ row, col, piece, onClick }) => {
  const isLight = (row + col) % 2 === 0;
  return (
    <div
      className={`w-21 h-21 flex items-center justify-center ${
        isLight ? "bg-[#313033]" : "bg-[#181818]"
      }`}
      onClick={() => onClick(row, col)}
    >
      <PieceComponent piece={piece} row={row} col={col} onClick={onClick} />
    </div>
  );
};

export default Square;
