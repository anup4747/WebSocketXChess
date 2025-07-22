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
  const {isDark} = useGameThemeContext()

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

  const getHoverClasses = () => {
    return isDark 
      ? "hover:bg-gray-600 hover:bg-opacity-50" 
      : "hover:bg-yellow-300 hover:bg-opacity-40";
  };

  return (
    <div
      className={`w-22 h-22 flex items-center justify-center transition duration-100  ${isValidMove ? "drop-shadow-black opacity-80 highlight-valid-move" : ""} ${getSquareColor()} ${getHoverClasses()} ${getHighlightClasses()}`}
      onClick={() => onClick(row, col)}
    >
      {piece?.image ? (
        <img
          src={piece.image}
          alt={`${piece.color} ${piece.type}`}
          className="w-16 h-auto"
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
