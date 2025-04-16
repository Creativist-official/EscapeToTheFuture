import { HashRouter, Routes, Route } from "react-router";
import RotatePhone from "./components/RotatePhone";
import { useEffect, useState } from "react";

import JSONEngine from "./Engine/JSONEngine";
import GameOver from "./scenes/GameOver";
import SplashScreen from "./scenes/SplashScreen";

import Scena1 from "./scenes/Scena1";
import Scena2 from "./scenes/Scena2";
import Scena3 from "./scenes/Scena3";
import Scena4 from "./scenes/Scena4";
import Scena5 from "./scenes/Scena5";
import Scena6 from "./scenes/Scena6";
import Scena7 from "./scenes/Scena7";
import Win from "./scenes/Win";

const Bitritto = () => {
  const [isPortrait, setIsPortrait] = useState(window.matchMedia("(orientation: portrait)").matches);

  useEffect(() => {
    const handleOrientationChange = () => {
      setIsPortrait(window.matchMedia("(orientation: portrait)").matches);
    };

    window.addEventListener("resize", handleOrientationChange);

    return () => {
      window.removeEventListener("resize", handleOrientationChange);
    };
  }, []);

  
  return (
    <>
      {isPortrait ? (
        <RotatePhone />
      ) : (
        <HashRouter>
          <Routes>
            <Route path="/" element={<SplashScreen location={'SOLE LUNA BITRITTO'} title={'IL LABORATORIO DEL MAGO PDOR'} />} />
            <Route path="/scena1" element={<Scena1/>} />
            <Route path="/scena2" element={<Scena2/>} />
            <Route path="/scena3" element={<Scena3/>} />
            <Route path="/scena4" element={<Scena4/>} />
            <Route path="/scena5" element={<Scena5/>} />
            <Route path="/scena6" element={<Scena6/>} />
            <Route path="/scena7" element={<Scena7/>} />
            <Route path="/engine" element={<JSONEngine/>} />
            {/* Game over */}
            <Route path="*" element={<GameOver reason={localStorage.getItem("gameover_reason") === null ? "Hai perso!" : localStorage.getItem("gameover_reason")} />} />
            {/* Win */}
            <Route path="/win" element={<Win/>} />
          </Routes>
        </HashRouter>
      )}
    </>
  );
};

export default Bitritto;
