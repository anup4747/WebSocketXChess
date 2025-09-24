import React, { createContext, useContext, useState } from "react";
import type { PiecePointsContextType, Piece } from "../types/types";

const PointsContext = createContext<PiecePointsContextType | undefined>(undefined);

export const calculatePoints = (board: (Piece | null)[][]): { whitePoints: number; blackPoints: number } => {
  let whitePoints = 0;
  let blackPoints = 0;

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece) {
        if (piece.color === "white") {
          whitePoints += piece.points;
        } else if (piece.color === "black") {
          blackPoints += piece.points;
        }
      }
    }
  }

  return { whitePoints: 39-whitePoints, blackPoints:39-blackPoints };
};

export const usePoitnsContext = () => {
  const context = useContext(PointsContext);
  if (!context) {
    throw new Error("usePoitnsContext must be used within a PointsContextProvider");
  }
  return context;
};

export const PointsContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [whitePoints, setWhitePoints] = useState(0);
  const [blackPoints, setBlackPoints] = useState(0);

  return (
    <PointsContext.Provider
      value={{
        whitePoints,
        setWhitePoints,
        blackPoints,
        setBlackPoints
    }}
    >
      {children}
    </PointsContext.Provider>
  );
};