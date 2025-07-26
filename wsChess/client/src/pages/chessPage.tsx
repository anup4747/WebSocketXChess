import Chessboard from "../components/ChessBoard";
import React, { useRef } from "react";
import { useGameThemeContext } from "../context/themeContext";
import { useBoardStateContext } from "../context/boardContext";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Controls from "../components/Control";

gsap.registerPlugin(useGSAP);

const PlayChess: React.FC = () => {
  const { themeClasses } = useGameThemeContext();
  const control = useRef<HTMLDivElement | null>(null);
  const { boardState, resetGame } = useBoardStateContext();

  useGSAP(() => {
    gsap.fromTo(
      control.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 1.7, delay: 4.5, ease: "sine.in" }
    );
  });
  return (
    <section
      className={`h-screen flex flex-col justify-center ${themeClasses} `}
    >
      <Chessboard />
      <div ref={control} className="flex justify-center items-center px-4 md:px-8 sm:px-12">
        <Controls resetGame={resetGame} turn={boardState.turn} />
      </div>
    </section>
  );
};

export default PlayChess;
