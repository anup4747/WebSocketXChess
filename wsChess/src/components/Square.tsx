import type { ExtendedSquareProps } from "../types";

const Square: React.FC<ExtendedSquareProps> = ({
  row,
  col,
  piece,
  onClick,
  isValidMove,
  selected,
  isSelected,
}) => {
  const isLight = (row + col) % 2 === 0;
  const isSelectedPawn = isSelected && piece?.type !== null;
  // isSelected
  // console.log(isSelected);
  return (
    <div
      className={`w-22 h-22 flex items-center justify-center ${
        isLight ? "bg-[#dfdfdf]" : "bg-[#7084b6]"
      }  ${isSelectedPawn ? "highlight-pawn" : ""}  ${isValidMove ? "highlight-valid-move" : ""}`}
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
        ""
      )}
    </div>
  );
};

export default Square;
