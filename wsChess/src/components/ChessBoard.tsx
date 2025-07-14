import Square from "./Square";
import type { BoardState } from '../types';

const Chessboard: React.FC<{
  board: BoardState["board"];
  onClick: (row: number, col: number) => void;
}> = ({ board, onClick }) => {
  return (
    <div className="select-none grid grid-cols-8 gap-0 w-[700px] border-white border">
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
  );
};

export default Chessboard;
