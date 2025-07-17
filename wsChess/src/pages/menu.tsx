// Menu Component
import { Link } from "react-router-dom";
const Menu: React.FC<{}> = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      <h1 className="text-5xl font-bold mb-8 text-white">Chess Game</h1>
      <Link to="/construction">
        <button className="mb-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-xl">
          Play with Computer
        </button>
      </Link>
      <Link to="/construction">
        <button className="mb-4 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 text-xl">
          Play Multiplayer
        </button>
      </Link>
      <Link to="/playoffline">
        <button className="mb-4 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 text-xl">
          Play Offline
        </button>
      </Link>
      <Link to="/construction">
        <button className="mb-4 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 text-xl">
          Settings
        </button>
      </Link>
    </div>
  );
};

export default Menu;
