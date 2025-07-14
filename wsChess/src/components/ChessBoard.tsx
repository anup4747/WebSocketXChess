import Square from "./Square";
import type { BoardState } from "../types";

const Chessboard: React.FC<{
  board: BoardState["board"];
  onClick: (row: number, col: number) => void;
}> = ({ board, onClick }) => {
  return (
    <div className="flex items-center justify-center border-white border-4">
      <div className="select-none grid grid-cols-8 gap-0 w-[700px] ">
        {board.map((row, i) =>
          row.map((piece, j) => (
            <Square
              key={`${i}-${j}`}
              row={i}
              col={j}
              piece={piece}
              onClick={onClick}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Chessboard;
