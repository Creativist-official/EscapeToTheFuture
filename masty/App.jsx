import React, { useState } from "react";
import ControlPanel from "./components/puzzles/ControlPanel";
import LockedChest from "./components/puzzles/LockedChest";
import Inventory from "./Inventory";
import ferrisWheelOff from "./assets/images/ruotapanoramica_off.jpg";
import ferrisWheelOn from "./assets/images/ruotapanoramica_on.jpg";
import Button from "../src/components/Button";
import "@assets/style/index.css";

function App() {
  const [scene, setScene] = useState("park"); // Scena iniziale
  const [inventory, setInventory] = useState([]); // Oggetti raccolti
  const [wheelActivated, setWheelActivated] = useState(false); // Stato della ruota

  const addItemToInventory = (item) => {
    if (!inventory.includes(item)) {
      setInventory([...inventory, item]);
    }
  };

  return (
    <>
      <div>
        <h1>Escape Room - Il Parco Misterioso</h1>

        {/* 🎡 Ruota Panoramica visibile sempre */}
        <div>
          <img
            src={wheelActivated ? ferrisWheelOn : ferrisWheelOff}
            alt="Ruota Panoramica"
            style={{ width: "300px", height: "auto" }}
          />
          <p>
            {wheelActivated ? "🎡 La ruota è accesa!" : "La ruota è spenta."}
          </p>
        </div>

        {/* 📌 Scena: Parco Comunale */}
        {scene === "park" && (
          <>
            <p>Ti trovi nel parco comunale.</p>
            <button onClick={() => setScene("ferrisWheel")}>
              Interagisci con la Ruota Panoramica
            </button>
          </>
        )}

        {/* 🎡 Scena: Puzzle della Ruota Panoramica */}
        {scene === "ferrisWheel" && (
          <>
            <ControlPanel
              onSolve={() => {
                setWheelActivated(true);
                setScene("park");
              }}
            />
            <button onClick={() => setScene("park")}>Torna al Parco</button>
          </>
        )}

        {/* 🏆 Scena: Baule con Lucchetto */}
        {scene === "chest" && (
          <>
            <p>
              Dopo aver attivato la ruota panoramica, trovi un baule chiuso.
            </p>
            <LockedChest
              onUnlock={() => addItemToInventory("chiave segreta")}
            />
            <button onClick={() => setScene("park")}>Torna al Parco</button>
          </>
        )}

        {/* 🎒 Mostra l'inventario */}
        <Inventory inventory={inventory} />

        <div className="flex flex-col items-center space-y-4">
          <Button label="Azione 1" onClick={() => alert("Azione 1")} />
          <Button label="Azione 2" onClick={() => alert("Azione 2")} />
          <Button label="Azione 3" onClick={() => alert("Azione 3")} />
        </div>
      </div>
    </>
  );
}

export default App;
