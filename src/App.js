import React, { useState } from 'react';
import './App.css'; // Importing CSS file

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [score, setScore] = useState({ playerX: 0, playerO: 0 });
  const [round, setRound] = useState(1);
  const [playerXName, setPlayerXName] = useState('');
  const [playerOName, setPlayerOName] = useState('');
  const [winner, setWinner] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (winner || board[index]) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      if (gameWinner === 'X') {
        setScore({ ...score, playerX: score.playerX + 1 });
      } else {
        setScore({ ...score, playerO: score.playerO + 1 });
      }
      if (round === 5) {
        setGameOver(true);
      } else {
        setRound(round + 1);
      }
    } else {
      setIsXNext(!isXNext);
    }
  };

  const resetBoard = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setIsXNext(true);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setIsXNext(true);
    setRound(1);
    setScore({ playerX: 0, playerO: 0 });
    setGameOver(false);
  };

  return (
    <div className="game-container">
      <h1>Tic Tac Toe</h1>
      {playerXName === '' || playerOName === '' ? (
        <div>
          <h2>Enter Player Names:</h2>
          <input
            className="input-name"
            type="text"
            placeholder="Player X Name"
            value={playerXName}
            onChange={(e) => setPlayerXName(e.target.value)}
          />
          <input
            className="input-name"
            type="text"
            placeholder="Player O Name"
            value={playerOName}
            onChange={(e) => setPlayerOName(e.target.value)}
          />
        </div>
      ) : (
        <>
          <h2>
            Round {round} - {isXNext ? `${playerXName}'s turn (X)` : `${playerOName}'s turn (O)`}
          </h2>
          <div className="board">
            {board.map((value, index) => (
              <div
                key={index}
                className="square"
                onClick={() => handleClick(index)}
              >
                {value}
              </div>
            ))}
          </div>
          {winner && <h2 className="winner-text">{winner === 'X' ? playerXName : playerOName} Wins this round!</h2>}
          {gameOver ? (
            <>
              <h2 className="game-over-text">Game Over!</h2>
              <h3 className="winner-text">
                {score.playerX > score.playerO
                  ? `${playerXName} Wins the Game!`
                  : score.playerX < score.playerO
                  ? `${playerOName} Wins the Game!`
                  : 'It\'s a tie!'}
              </h3>
              <button className="button" onClick={resetGame}>Restart Game</button>
            </>
          ) : (
            <button className="button" onClick={resetBoard}>Next Round</button>
          )}
          <div className="score">
            <h3>Score:</h3>
            <p>{playerXName}: {score.playerX}</p>
            <p>{playerOName}: {score.playerO}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
