import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import type { InConstuctionProps } from "../types/types";

const InConstuction: React.FC<InConstuctionProps> = ({themeClasses, buttonClasses}) => {
  return (
    <div
      className={`w-full h-screen flex flex-col justify-center items-center ${themeClasses}`}
    >
      <h1 className="text-4xl font-bold mb-5">The Feature is in Construction</h1>
      <Link to="/">
        <button
          className={`w-full px-6 py-3 rounded-xl flex items-center justify-center space-x-3 font-mono transition-colors cursor-pointer ${buttonClasses}`}
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </button>
      </Link>
    </div>
  );
};

export default InConstuction;
