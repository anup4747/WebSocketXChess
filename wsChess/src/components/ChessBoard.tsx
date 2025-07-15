import Square from "./Square";
import type { Piece } from "../types";
import type { ChessboardProps } from "../types";

const Chessboard: React.FC<ChessboardProps> = ({ board, onClick, selected , validMoves }) => {
 
  return (
    <div className="flex items-center justify-center border-white border-4">
      <div className="select-none grid grid-cols-8 gap-0 w-[700px] ">
        {board.map((row, r) =>
          row.map((piece, c) => (
            <Square
              key={`${r}-${c}`}
              row={r}
              col={c}
              piece={piece}
              onClick={onClick}
              selected={selected}
              isValidMove={validMoves.some((move) => move.row === r && move.col === c)}
              isSelected={selected?.row === r && selected?.col === c}
            />
          ))
        )}
      </div>
    </div>
  );
};

// highlighting the path
export const getValidPawnMoves = (
    row: number,
    col: number,
    piece: Piece,
    board: (Piece | null)[][]
  ): {row:number, col:number}[] =>{
    
    const moves : {row: number, col:number}[] = [];
    const direction = piece.color === "white" ? -1 : 1 // white moves up, black moves down
    const startRow = piece.color  === "white" ? 6 : 1 // starting row for white or black pawns

    // forward move (1 square)
    if(board[row + direction]?.[col] === null){
      moves.push({row: row + direction,col})
    }

    // forward move (2 square)
    if(row === startRow && board[row + direction]?.[col] === null && board[row+ direction + direction]?.[col] === null){
      moves.push({row: row + direction + direction,col})
    }

    // diagonal moves
    if(
      row !== startRow &&
      board[row + direction]?.[col - 1]?.color !== piece.color &&
      board[row + direction]?.[col - 1] !== null
    ){
      moves.push({ row: row + direction, col: col - 1 });
    }

    console.log(board[row + direction]?.[col - 1] !== null)

    if(
      row !== startRow &&
      board[row + direction]?.[col + 1]?.color !== piece.color &&
      board[row + direction]?.[col + 1] !== null
    ){
      moves.push({ row: row + direction, col: col + 1 });
    }

    return moves;
  }

export default Chessboard;
