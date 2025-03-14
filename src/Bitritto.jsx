import { HashRouter, Routes, Route } from "react-router";
import RotatePhone from "./components/RotatePhone";
import { useEffect, useState } from "react";

import JSONEngine from "./Engine/JSONEngine";
import SplashScreen from "./scenes/SplashScreen";
import Scena1 from "./scenes/Scena1";
import Scena2 from "./scenes/Scena2";
import Scena3 from "./scenes/Scena3";
import Scena4 from "./scenes/Scena4";
import Scena5 from "./scenes/Scena5";

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
            <Route path="/engine" element={<JSONEngine/>} />
          </Routes>
        </HashRouter>
      )}
    </>
  );
};

export default Bitritto;
