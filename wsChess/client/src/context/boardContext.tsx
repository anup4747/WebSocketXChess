import React, { createContext, useContext, useState } from "react";
import { initialBoard } from "../utils/initialBoardState";
import type { BoardStateContextType } from "../types/types";

const BoardStateContext = createContext<BoardStateContextType | undefined>(undefined);

export const useBoardStateContext = () => {
  const context = useContext(BoardStateContext);
  if (!context) {
    throw new Error("useBoardStateContext must be used within a BoardStateProvider");
  }
  return context;
};

export const BoardStateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
   const [boardState, setBoardState] = useState({
      board: initialBoard,
      selected: null,
      turn: "white",
    });

     const resetGame = () => {
        setBoardState({ board: initialBoard, selected: null, turn: "white" });
      };
  

  return (
    <BoardStateContext.Provider
      value={{
        boardState,
        setBoardState,
        resetGame
    }}
    >
      {children}
    </BoardStateContext.Provider>
  );
};