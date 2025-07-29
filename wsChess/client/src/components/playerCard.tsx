import React from "react";
import { useGameThemeContext } from "../context/themeContext";

interface PlayerCardProps {
  name: string;
  points: number;
  isTurn: boolean;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ name, points, isTurn }) => {
  const { cardClasses, themeClasses, getBorder } = useGameThemeContext();

  return (
    <div className={`${themeClasses}`}>
      <div
        className={`flex items-center justify-between w-[200px] max-w-[220px] sm:w-[190px] rounded-xl p-3 shadow-md card
        ${cardClasses}
        ${isTurn ? `${getBorder}` : ""}
        `}
      >
        <div className="flex flex-col ">
          <p className="font-mono">
            <span className="font-bold">{name}</span>
            <br />
            <span className="opacity-90">
              Points: {points}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
