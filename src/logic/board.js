import { WINNER_COMBOS } from "../constants";
export const checkWinner = (boardToCheck) => {
    //revisamos todas las combinaciones ganadoras para ver si x, o gano
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo;
      if (
        boardToCheck[a] &&
        boardToCheck[a] == boardToCheck[b] &&
        boardToCheck[a] == boardToCheck[c]
      ) {
        return boardToCheck[a]; //Devolvera cual signo es el ganador
      }
    }
};

//Funcion para ver si hay un empate
export const checkEndGame = (newBoard) => {
  //Si el nuevo Lienzo, todo, los cuadrados estan llenos y son diferentes a null. Significa que devolvera True, porque ya termino el juego y no hay ganador
  return newBoard.every((square) => square !== null);
};

