import type { SquareProps } from '../types';

const Square: React.FC<SquareProps> = ({ row, col, piece, onClick }) => {
  const isLight = (row + col) % 2 === 0;
  return (
    <div
      className={`w-22 h-22 flex items-center justify-center ${
        isLight ? "bg-[#dfdfdf]" : "bg-[#7084b6]"
      }`}
      onClick={() => onClick(row, col)}
    >
      {piece?.image ? (
        <img
          src={piece.image}
          alt={`${piece.color} ${piece.type}`}
          className="w-16 h-auto"
        />
      ) : piece ? (
        <span>{`${piece.color} ${piece.type}`}</span> 
      ) : (
        ''
      )}
    </div>
  );
};

export default Square;
