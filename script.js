const gameboard = (function () {
  const gameboardLayout = new Array(9).fill(null);

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
      switchPlayerTurn();
    } else {
      console.log("¡Esa casilla ya está ocupada! Inténtalo de nuevo.");
    }
  };

  return {
    playRound,
    getCurrentPlayer: () => currentPlayer
  };
})();
