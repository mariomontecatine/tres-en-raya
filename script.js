const gameboard = (function () {
  let gameboardLayout = new Array(9).fill(null);
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const resetBoard = () => {
    gameboardLayout.fill(null);
  };

  const isBoardFull = () => {
    return !gameboardLayout.includes(null);
  };

  const checkWinner = () => {
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
    resetBoard,
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
      displayController.renderBoard();
      const winner = gameboard.checkWinner();
      const isTie = gameboard.isBoardFull();
      if (winner) {
        console.log(`¡El ganador es ${winner}!`);
        return;
      } else if (!winner && isTie) {
        console.log("Empate!");
        return;
      }
      switchPlayerTurn();
    } else {
      console.log("¡Esa casilla ya está ocupada! Inténtalo de nuevo.");
    }
  };

  const restartGame = () => {
    gameboard.resetBoard();
    currentPlayer = jugador1;
    displayController.renderBoard();

    console.log("¡Juego reiniciado! Empieza Mario.");
  };

  return {
    playRound,
    getCurrentPlayer: () => currentPlayer,
    restartGame,
  };
})();

const displayController = (function () {
  const boardDiv = document.querySelector(".gameboardLayout");
  const restartButton = document.querySelector("#restart-button");

  boardDiv.addEventListener("click", (e) => {
    const selectedSquareIndex = e.target.dataset.index;

    if (!selectedSquareIndex) return;

    gameController.playRound(selectedSquareIndex);
  });

  restartButton.addEventListener("click", () => {
    gameController.restartGame();
  });

  const renderBoard = () => {
    const board = gameboard.getGameboard();

    boardDiv.innerHTML = "";

    board.forEach((cell, index) => {
      const cellElement = document.createElement("button");
      cellElement.classList.add("square");
      cellElement.dataset.index = index;

      if (cell === "X") {
        const img = document.createElement("img");
        img.src = "/images/Fox_artwork.png"; // ruta a tu imagen
        img.alt = "X";
        img.classList.add("chip");
        cellElement.appendChild(img);
      } else if (cell === "O") {
        const img = document.createElement("img");
        img.src = "/images/Fpo-chicken-1.png";
        img.alt = "O";
        img.classList.add("chip");
        cellElement.appendChild(img);
      }

      boardDiv.appendChild(cellElement);
    });
  };

  return {
    renderBoard,
  };
})();
displayController.renderBoard();
