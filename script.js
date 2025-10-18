const gameboard = (function () {
  const gameboardLayout = new Array(9).fill(null);
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Horizontales
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Verticales
    [0, 4, 8],
    [2, 4, 6], // Diagonales
  ];

  const isBoardFull = () => {
    return !gameboardLayout.includes(null);
  };

  const checkWinner = () => {
    // Itera sobre cada combinación ganadora
    for (const combo of winningCombos) {
      const [a, b, c] = combo;

      if (
        gameboardLayout[a] &&
        gameboardLayout[a] === gameboardLayout[b] &&
        gameboardLayout[a] === gameboardLayout[c]
      ) {
        return gameboardLayout[a];
      }
    }

    return null;
  };

  return {
    getGameboard() {
      return gameboardLayout;
    },
    setChip(position, type) {
      if (gameboardLayout[position] === null) {
        return (gameboardLayout[position] = type);
      } else {
        return;
      }
    },
    checkWinner,
    isBoardFull,
  };
})();

function createPlayer(nameInput, chipType) {
  const player = { name: nameInput, chip: chipType };
  return player;
}

const gameController = (function () {
  const jugador1 = createPlayer("Mario", "X");
  const jugador2 = createPlayer("Luigi", "O");
  let currentPlayer = jugador1;

  const switchPlayerTurn = () => {
    currentPlayer = currentPlayer === jugador1 ? jugador2 : jugador1;
  };

  const playRound = (squareSelected) => {
    console.log(
      `${currentPlayer.name} coloca su ficha en la casilla ${squareSelected}.`
    );

    const moveSuccesful = gameboard.setChip(squareSelected, currentPlayer.chip);

    if (moveSuccesful) {
      const winner = gameboard.checkWinner();
      const isTie = gameboard.isBoardFull();
      if (winner) {
        console.log(`¡El ganador es ${winner}!`);
        return;
      }else if (!winner && isTie) {
        console.log("Empate!");
        return;
      }
       else {
        switchPlayerTurn();
      }
    } else {
      console.log("¡Esa casilla ya está ocupada! Inténtalo de nuevo.");
    }
  };

  return {
    playRound,
    getCurrentPlayer: () => currentPlayer,
  };
})();
