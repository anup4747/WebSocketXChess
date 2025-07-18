import Chessboard from "../components/ChessBoard";
import React from "react";
import type { PlayOfflineProps } from "../types/types";

const PlayOffline: React.FC<PlayOfflineProps> = ({
  isDark,
  toggleTheme,
  themeClasses,
  cardClasses,
  buttonClasses,
  primaryButtonClasses,
}) => {
  return (
    <section className="h-screen flex flex-col justify-center ">
      <Chessboard
        toggleTheme={toggleTheme}
        themeClasses={themeClasses}
        cardClasses={cardClasses}
        buttonClasses={buttonClasses}
        primaryButtonClasses={primaryButtonClasses}
        isDark={isDark}
      />
    </section>
  );
};

export default PlayOffline;
