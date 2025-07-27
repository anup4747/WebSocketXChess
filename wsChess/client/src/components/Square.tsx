import type { ExtendedSquareProps } from "../types/types";
import { useGameThemeContext } from "../context/themeContext";

const Square: React.FC<ExtendedSquareProps> = ({
  row,
  col,
  piece,
  onClick,
  isValidMove,
  isSelected,
}) => {
  const isLight = (row + col) % 2 === 0;
  const isSelectedPiece = isSelected && piece?.type !== null;
  const {isDark, getHoverClasses} = useGameThemeContext()

  const getHighlightClasses = () => {
    let classes = "";
    
    if (isSelectedPiece) {
      classes += isDark 
        ? " border-4 border-blue-400 ring-opacity-60 bg-blue-900 bg-opacity-40" 
        : " border-4 border-blue-500 ring-opacity-60 bg-blue-200 bg-opacity-60";
    }
    
    if (isValidMove) {
      classes += isDark 
        ? " border-4 border-green-400 bg-green-900 bg-opacity-30" 
        : " border-4 border-green-500 bg-green-200 bg-opacity-50";
    }
    
    return classes;
  };

  const getSquareColor = () => {
    if (isDark) {
      return isLight ? "bg-gray-200" : "bg-gray-700";
    } else {
      return isLight ? "bg-amber-100" : "bg-amber-600";
    }
  };


  return (
    <div
      className={`w-full aspect-square flex items-center justify-center transition duration-100  ${isValidMove ? "drop-shadow-black opacity-80 highlight-valid-move" : ""} ${getSquareColor()} ${getHoverClasses} ${getHighlightClasses()}`}
      onClick={() => onClick(row, col)}
    >
      {piece?.image ? (
        <img
          src={piece.image}
          alt={`${piece.color} ${piece.type}`}
          className="sm:w-14 md:w-17 lg:w-17 h-auto object-contain"
        />
      ) : piece ? (
        <span className={`text-sm font-mono font-bold ${
          isDark ? "text-gray-200" : "text-gray-800"
        }`}>
          {`${piece.color} ${piece.type}`}</span>
      ) : (
        ""
      )}
    </div>
  );
};

export default Square;
