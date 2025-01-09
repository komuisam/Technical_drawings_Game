// src/App.tsx
import "./App.css";
import Board from "./tools/board";

function App() {
  return (
    <>
      <div>
        <h1>Juego Educativo de Dibujo Técnico</h1>
        <h2>Herramientas de Dibujo</h2>

        <Board id="jxgbox" />
      </div>
    </>
  );
}

export default App;
