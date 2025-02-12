import React, { useState } from "react";
import ControlPanel from "./components/puzzles/ControlPanel";
import LockedChest from "./components/puzzles/LockedChest";
import Inventory from "./components/Inventory";

function App() {
   const [scene, setScene] = useState("park"); // Scena iniziale
   const [inventory, setInventory] = useState([]); // Oggetti raccolti

   const addItemToInventory = (item) => {
      if (!inventory.includes(item)) {
         setInventory([...inventory, item]);
      }
   };

   return (
      <div>
         <h1>Escape Room - Il Parco Misterioso</h1>

         {/* 📌 Scena: Parco Comunale */}
         {scene === "park" && (
            <>
               <p>Ti trovi nel parco comunale. Davanti a te c'è una ruota panoramica spenta.</p>
               <button onClick={() => setScene("ferrisWheel")}>Vai alla Ruota Panoramica</button>
            </>
         )}

         {/* 🎡 Scena: Puzzle della Ruota Panoramica */}
         {scene === "ferrisWheel" && (
            <>
               <ControlPanel onSolve={() => setScene("chest")} />
               <button onClick={() => setScene("park")}>Torna al Parco</button>
            </>
         )}

         {/* 🏆 Scena: Baule con Lucchetto */}
         {scene === "chest" && (
            <>
               <p>Dopo aver attivato la ruota panoramica, trovi un baule chiuso.</p>
               <LockedChest onUnlock={() => addItemToInventory("chiave segreta")} />
               <button onClick={() => setScene("park")}>Torna al Parco</button>
            </>
         )}

         {/* 🎒 Mostra l'inventario */}
         <Inventory inventory={inventory} />
      </div>
   );
}

export default App;
