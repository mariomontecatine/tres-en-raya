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

const jugador1 = createPlayer('Mario', 'X');
const jugador2 = createPlayer('Luigi', 'O');

console.log(jugador1); 
console.log(jugador2); 