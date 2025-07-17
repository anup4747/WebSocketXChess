import "./App.css";
import Menu from "./pages/menu";
import React from "react";
import { Routes, Route } from "react-router-dom";
import PlayOffline from "./pages/offline";
import InConstuction from "./pages/inConstruction";
import PageNotFound from "./pages/pageNotFound";

const App: React.FC = () => {

  return (
    <section className="flex flex-col items-center justify-center bg-[#1c1c1c]">
      
      <Routes>
        <Route path="/" element={<Menu/>} />
        <Route path="/playoffline" element={<PlayOffline />} />
        <Route path="/construction" element={<InConstuction />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

    </section>
  );
};

export default App;
