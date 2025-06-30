import { useState } from "react";
import "./App.css";
import confetti from "canvas-confetti";
import { Square } from "./components/Square";
import { TURNS } from "./constants";
import { checkWinner, checkEndGame } from "./logic/board";
import { WinnerModal } from "./components/winnerModal";
import { Board } from "./components/Board";

//FUCION DE LA APP

function App() {
  console.log("Aqui se inicia varias veces cuando se este renderizando");

  //Creacion del lienzo
  const [board, setBoard] = useState(() => {
    console.log(
      "Aqui se inicia una vez cuando se este creando el board, se esta inicializando"
    );

    const boardFromStorage = window.localStorage.getItem("board");
    return boardFromStorage
      ? JSON.parse(boardFromStorage)
      : Array(9).fill(null);
  });

  //Creacion de estado de los turnos
  const [turn, setTurn] = useState(TURNS.X);

  //Crear ganador
  const [winner, setWinner] = useState(null);

  //Hay que poner los valores iniciales para reiniciarlo. Se hace asi porque tal vez haya estados que si querramos guardar
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    window.localStorage.removeItem("board");
    window.localStorage.removeItem("turn");
  };

  //Actualizacion del lienzo.
  const updateBoard = (index) => {
    //No actulizar en un cuadrado si ya tiene algo, o si ya hay un ganador. Asi que hace terminar la funcion desde ahi.
    if (board[index] || winner) return;

    //Actualizar el lienzo
    const newBoard = [...board];
    newBoard[index] = turn; // x, o
    setBoard(newBoard);

    const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X; //Si el turno es igual a de las x, el turno sera de los circulos, y si no sera de la x
    setTurn(newTurn);

    //Aqui vamos a guardar partida, despues del ultimo turno, vamos a guardar el estado del tablero y el nuevo tablero y se debe de guardar en string
    window.localStorage.setItem("board", JSON.stringify(newBoard));
    window.localStorage.setItem("turn", JSON.stringify(newBoard));

    //Revisar si tenemos un ganador. Asi que llamamos
    const newWinner = checkWinner(newBoard); //Tenermos que verificar el nuevo lienzo, no vamos a revisar el antiguo
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      //Como es true y ya termino el juego. el ganador sera falso porque efectivamente, no hay ganador
      setWinner(false);
    }
    //Apartado para saber si no hay un ganador y se llenaron todas las casillas
  };

  //Esto es el renderizado de la apliacion
  return (
    <>
      <h1>Juego del gato</h1>
      <button onClick={resetGame}>Empezar de nuevo</button>
      <main className="board">
        <section className="game">
          <Board board={board} updateBoard={updateBoard} />
        </section>

        <section className="turn">
          {/**Cuando el Turns sea igual a  turns.x, sera seleccionado el de la X*/}
          <Square isSelected={turn == TURNS.X}>{TURNS.X}</Square>
          <Square isSelected={turn == TURNS.O}>{TURNS.O}</Square>
        </section>

        <WinnerModal winner={winner} resetGame={resetGame} />
      </main>
    </>
  );
}

export default App;
