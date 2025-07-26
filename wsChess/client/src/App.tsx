import "./App.css";
import Menu from "./pages/menu";
import React,{ useState, useEffect} from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import PlayOffline from "./pages/offline";
import InConstuction from "./pages/inConstruction";
import PageNotFound from "./pages/pageNotFound";
import ChessRoomMenu from "./pages/roomMenu";
import { GameThemeProvider, useGameThemeContext } from "./context/themeContext";
import { RoomProvider } from "./context/roomContext";
import { PlayerNameProvider } from "./context/playerName";
import { BoardStateProvider } from "./context/boardContext";
import { AnimatePresence, motion } from "framer-motion";
import { BounceLoader } from "react-spinners";
import { io } from "socket.io-client";

const AppContent: React.FC = () => {
  const { themeClasses } = useGameThemeContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const location = useLocation();
  const socket = io("localhost:3000")

  function connectSocket(){
    socket.on("connection", () =>{
      console.log(socket.id)
    })
  }

  useEffect(()=>{
    connectSocket();
  },[])


  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timeout);
  }, [location.pathname]);


  return (
    <>
      {isLoading && (
        <div
          className={`fixed inset-0 ${themeClasses} flex items-center justify-center z-50`}
        >
          <motion.div
            className="bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-5xl sm:text-6xl lg:text-7xl font-bold font-mono mb-2"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.3, ease: "easeOut" }}
          >
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="mr-4 font-bold"
            >
              ♘
            </motion.span>
            ChessLeague
            <br />
            <div className="w-full mt-5 flex items-center justify-center">

            <BounceLoader size={50} color="#4FD1C5" />
            </div>
          </motion.div>
        </div>
      )}

      <section
        className={`flex flex-col items-center justify-center ${themeClasses}`}
      >
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Menu />} />
            <Route path="/playoffline" element={<PlayOffline />} />
            <Route path="/construction" element={<InConstuction />} />
            <Route path="/roommenu" element={<ChessRoomMenu />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </AnimatePresence>
      </section>
    </>
  );
};

const App: React.FC = () => {
  return (
    <PlayerNameProvider>
      <GameThemeProvider>
        <RoomProvider>
          <BoardStateProvider>
            <AppContent />
          </BoardStateProvider>
        </RoomProvider>
      </GameThemeProvider>
    </PlayerNameProvider>
  );
};

export default App;
