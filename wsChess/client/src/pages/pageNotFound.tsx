import { Link } from "react-router-dom";
import type { PageNotFoundProps } from "../types/types";
import { Home } from "lucide-react";
const PageNotFound: React.FC<PageNotFoundProps> = ({
  themeClasses,
  buttonClasses,
}) => {
  return (
    <div
      className={`w-full h-screen flex flex-col justify-center items-center ${themeClasses}`}
    >
      <h1 className="text-4xl font-bold mb-5">Page not found 404</h1>
      <Link to="/">
        <button
          className={`w-full px-6 py-3 rounded-xl flex items-center justify-center space-x-3 font-mono transition-colors cursor-pointer ${buttonClasses}`}
        >
          <Home className="w-5 h-5" />
          Home
        </button>
      </Link>
    </div>
  );
};

export default PageNotFound;
