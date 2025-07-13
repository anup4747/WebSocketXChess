const Controls: React.FC<{ turn: string; resetGame: () => void }> = ({ turn, resetGame }) => {
      return (
        <div className="mt-4 flex flex-col items-center">
          <p className="text-lg text-white">Turn: {turn}</p>
          <button
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={resetGame}
          >
            Reset Game
          </button>
        </div>
      );
    };

export default Controls;