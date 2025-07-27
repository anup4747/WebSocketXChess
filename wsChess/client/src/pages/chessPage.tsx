import Chessboard from "../components/ChessBoard";
import React, { useRef, useEffect } from "react";
import { useGameThemeContext } from "../context/themeContext";
import { useBoardStateContext } from "../context/boardContext";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Controls from "../components/Control";
import PlayerCard from "../components/playerCard";
import { useGameModeContext } from "../context/gameModeContext";
import { usePlayerNameContext } from "../context/playerName";
import { useLocation } from "react-router-dom"; 

gsap.registerPlugin(useGSAP);

const PlayChess: React.FC = () => {
  const { themeClasses } = useGameThemeContext();
  const control = useRef<HTMLDivElement | null>(null);
  const { boardState, resetGame } = useBoardStateContext();
  const playerDashBoard = useRef<HTMLDivElement | null>(null);
  const board = useRef<HTMLDivElement | null>(null);
  const {gameMode,setGameMode} = useGameModeContext();
  const {player1Name, setPlayer1Name, player2Name, setPlayer2Name} = usePlayerNameContext();
  const location = useLocation();

 useEffect(() => {
    if (location.pathname === "/playoffline") {
      setPlayer1Name("Player 1");
      setPlayer2Name("Player 2");
      setGameMode("offline");
    } else if (location.pathname === "/playai") {
      setPlayer1Name("Player 1");
      setPlayer2Name("AI Player");
      setGameMode("ai");
    }
  }, [location.pathname, setPlayer1Name, setPlayer2Name, setGameMode]);

  useGSAP(() => {
     gsap.fromTo(
      playerDashBoard.current,
      { opacity: 0, y: -40 },
      { opacity: 1, y: 0, duration: 1.7, delay: 3.5, ease: "sine" }
    );
    gsap.fromTo(
      board.current,
      { opacity: 0, y: -40 },
      { opacity: 1, y: 0, duration: 1.7, delay: 4.5, ease: "sine" }
    );
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
      <div ref={playerDashBoard} className="flex justify-between mb-6 px-4 md:px-7 sm:px-12">

          <PlayerCard
            name={player1Name} // or "Friend", "Player 1", etc. – make dynamic if needed
            points={12} // You can make this dynamic with state or context
            isTurn={boardState.turn === "black"}
            />

          <PlayerCard
            name={player2Name} // Make dynamic based on mode
            points={18}
            isTurn={boardState.turn === "white"}
          />
      </div> 
      <div ref={board}>

      <Chessboard />
      </div>
      <div ref={control} className="flex justify-center items-center px-4 md:px-8 sm:px-12">
        <Controls resetGame={resetGame} turn={boardState.turn} />
      </div>
    </section>
  );
};

export default PlayChess;
