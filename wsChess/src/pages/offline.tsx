import Chessboard from "../components/ChessBoard";
import Controls from "../components/Control";
import React from "react";

const PlayOffline: React.FC<{}> = () => {
    return ( 
        <section className="h-screen flex flex-col justify-center ">
            <Chessboard/>
            <Controls />
        </section>
    ) 
}

export default PlayOffline;

