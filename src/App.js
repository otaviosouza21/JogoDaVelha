import React from 'react';
import './game.css';
const XorO = ["O","X"]
const random = Math.floor(Math.random() * 2)


function App() {
  const empty = Array(9).fill('');
  const [gameBoard, setGameBoard] = React.useState(empty);
  const [jogador, setJogador] = React.useState(XorO[random]);
  const [winner, setWinner] = React.useState(null);
  const [forEmpate, setForEmpate] = React.useState(null);

  React.useEffect(forWinner, [jogador]);

  function handleClick(index) {
    if (gameBoard[index] !== '' || winner !== null) return null;
    if (jogador === 'X') setJogador('O');
    if (jogador === 'O') setJogador('X');
    setGameBoard(
      gameBoard.map((cell, cellindex) => {
        return cellindex === index ? jogador : cell;
      }),
    );
  }

  function empate() {
    if (gameBoard.every((item) => item !== '')) {
      setForEmpate(true);
      
    }
  }

  function forWinner() {
    const winner = [
      [gameBoard[0], gameBoard[1], gameBoard[2]],
      [gameBoard[3], gameBoard[4], gameBoard[5]],
      [gameBoard[6], gameBoard[7], gameBoard[8]],

      [gameBoard[0], gameBoard[3], gameBoard[6]],
      [gameBoard[1], gameBoard[4], gameBoard[7]],
      [gameBoard[2], gameBoard[5], gameBoard[8]],

      [gameBoard[0], gameBoard[4], gameBoard[8]],
      [gameBoard[2], gameBoard[4], gameBoard[6]],
    ];
    console.log(gameBoard);
    winner.forEach((item) => {
      if (item.every((item) => item === 'O')) setWinner('O');
      if (item.every((item) => item === 'X')) setWinner('X');
    });
 
    empate();
  }

  function resetGame() {
    setGameBoard(empty);
    setWinner(null);
    setJogador('O');
    setForEmpate(null);
  }
  const button = {
    color: 'white',
    background: 'green',
    marginTop:"20px",
  };

  return (
    <main className="main">
      <h1 className="title">Jogo da Velha</h1>
      {winner === null ? 
      <p>
        Vez de <span className={`vez ${jogador}`}>{jogador}</span>
      </p>
      :
      null
}
      <section className="board">
        {gameBoard.map((cell, index) => {
          return (
            <div
              onClick={() => handleClick(index)}
              key={index}
              className={`fill ${cell} ${winner && "venceu"}`}
            >
              {cell}
            </div>
          );
        })}

        <footer className="footer">
          {winner && (
            <p>
              Jogador <span className={`winner ${winner}`}>{winner}</span>{' '}
              Venceu!
            </p>
          )}
          {forEmpate && <p>EMPATOU</p>}
          <button style={button} onClick={resetGame}>
            Reiniciar
          </button>
        </footer>
      </section>
    </main>
  );
}

export default App;
