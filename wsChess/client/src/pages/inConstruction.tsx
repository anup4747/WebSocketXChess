import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { useGameThemeContext } from "../context/themeContext";

const InConstuction: React.FC= () => {
  const {themeClasses, buttonClasses} = useGameThemeContext()
  
  return (
    <div
      className={`w-full h-screen flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 ${themeClasses}`}
    >
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-5">The Feature is in Construction</h1> 
      <Link to="/">
        <button
          className={`w-full sm:w-auto px-6 py-3 rounded-xl flex items-center justify-center space-x-3 font-mono transition-colors cursor-pointer ${buttonClasses}`}
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </button>
      </Link>
    </div>
  );
};

export default InConstuction;
