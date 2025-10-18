const Gameboard = (function() {
  const GameboardLayout = new Array(9).fill(null);
  
  return {
    getGameboard() {
        return GameboardLayout;
    },
    setChip(position, type) {
       if  (GameboardLayout[position]===null) {
        return   GameboardLayout[position] = type;
       }
       else {
        return;
       }
    },
  };
})();