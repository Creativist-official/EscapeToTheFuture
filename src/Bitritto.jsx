import { HashRouter, Routes, Route } from "react-router";
import RotatePhone from "./components/RotatePhone";
import { useEffect, useState } from "react";

import SplashScreen from "./scenes/SplashScreen";
import Scena1 from "./scenes/Scena1";
import JSONEngine from "./Engine/JSONEngine";
import Scena3 from "./scenes/Scena3";

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
            <Route path="/scena3" element={<Scena3/>} />
            <Route path="/engine" element={<JSONEngine/>} ></Route>
          </Routes>
        </HashRouter>
      )}
    </>
  );
};

export default Bitritto;
