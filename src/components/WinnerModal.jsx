import { Square } from "./Square";

export function WinnerModal({winner, resetGame}) {
  /*Aqui cambiamos, si no hay ganador, pues devuelva null */
  if (winner === null) return null;

  const winnerText = winner === false ? "Empate" : "Gano";

  return (
    <section className="winner">
      <div className="text">
        <h2>{winnerText}</h2>
      </div>

      <header className="win">
        {winner && <Square>{winner}</Square>}
      </header>

      <footer>
        <button onClick={resetGame}>Empezar de nuevo</button>
      </footer>
    </section>
  );
}
