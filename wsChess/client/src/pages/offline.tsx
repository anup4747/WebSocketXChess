import Chessboard from "../components/ChessBoard";
import React from "react";
import { useGameThemeContext } from "../context/themeContext";

const PlayOffline: React.FC= () => {
  const {themeClasses} = useGameThemeContext();
    return (
    <section className={`h-screen flex flex-col justify-center ${themeClasses} `}  >
      <Chessboard/>
    </section>
  );
};

export default PlayOffline;
