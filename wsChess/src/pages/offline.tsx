import Chessboard from "../components/ChessBoard";
import React from "react";

const PlayOffline: React.FC<{}> = () => {
    return ( 
        <section className="h-screen flex flex-col justify-center ">
            <Chessboard/>
        </section>
    ) 
}

export default PlayOffline;