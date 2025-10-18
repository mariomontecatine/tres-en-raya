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
  let jugador1 = createPlayer("Jugador 1", "X");
  let jugador2 = createPlayer("Jugador 2", "O");
  let currentPlayer = jugador1;
  let isGameOver = false; // <-- ¡NUEVO INTERRUPTOR!

  const switchPlayerTurn = () => {
    currentPlayer = currentPlayer === jugador1 ? jugador2 : jugador1;
  };

  const playRound = (squareSelected) => {
    if (isGameOver) return;

    const moveSuccesful = gameboard.setChip(squareSelected, currentPlayer.chip);

    if (moveSuccesful) {
      displayController.renderBoard();
      const winner = gameboard.checkWinner();
      const isTie = gameboard.isBoardFull();

      if (winner) {
        displayController.setMessage(`¡El ganador es ${currentPlayer.name}!`);
        isGameOver = true; 
        return;
      }
      if (!winner && isTie) {
        displayController.setMessage("¡Es un empate!"); 
        isGameOver = true; 
        return;
      }

      switchPlayerTurn();
      displayController.setMessage(`Es el turno de ${currentPlayer.name}`);
    } else {
      console.log("¡Esa casilla ya está ocupada! Inténtalo de nuevo.");
    }
  };

  const startGame = (player1Name, player2Name) => {
    jugador1 = createPlayer(player1Name || "Jugador 1", "X");
    jugador2 = createPlayer(player2Name || "Jugador 2", "O");

    restartGame();
  };

  const restartGame = () => {
    gameboard.resetBoard();
    currentPlayer = jugador1;
    isGameOver = false;
    displayController.renderBoard();
    displayController.setMessage(
      `¡Vamos! Empieza ${currentPlayer.name}.`
    ); 
  };

  return {
    playRound,
    getCurrentPlayer: () => currentPlayer,
    restartGame,
    startGame,
  };
})();

const displayController = (function () {
  const boardDiv = document.querySelector(".gameboardLayout");
  const restartButton = document.querySelector("#restart-button");
  const messageElement = document.querySelector(".message");

  const playerSetupDiv = document.querySelector(".player-setup");
  const startButton = document.querySelector("#start-game-button");
  const player1Input = document.querySelector("#player1-name");
  const player2Input = document.querySelector("#player2-name");

  boardDiv.addEventListener("click", (e) => {
    const selectedSquareIndex = e.target.dataset.index;

    if (!selectedSquareIndex) return;

    gameController.playRound(selectedSquareIndex);
  });

  restartButton.addEventListener("click", () => {
    gameController.restartGame();
  });

  startButton.addEventListener("click", () => {
    const player1Name = player1Input.value;
    const player2Name = player2Input.value;
    
    gameController.startGame(player1Name, player2Name);
    
    playerSetupDiv.style.display = 'none';
    restartButton.style.display = 'inherit'
    boardDiv.style.display = 'grid'; 
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
        img.src = "images/Fox_artwork.png"; // ruta a tu imagen
        img.alt = "X";
        img.classList.add("chip");
        cellElement.appendChild(img);
      } else if (cell === "O") {
        const img = document.createElement("img");
        img.src = "images/Fpo-chicken-1.png";
        img.alt = "O";
        img.classList.add("chip");
        cellElement.appendChild(img);
      }

      boardDiv.appendChild(cellElement);
    });
  };

  const setMessage = (message) => {
    messageElement.textContent = message;
  };

  return {
    renderBoard,
    setMessage
  };
})();
