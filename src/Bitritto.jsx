import SplashScreen from "./scenes/SplashScreen";
import Scena1 from "./scenes/Scena1";
import { MemoryRouter, Routes, Route } from "react-router";
import RotatePhone from "./components/RotatePhone";
import { useEffect, useState } from "react";

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
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<SplashScreen location={'SOLE LUNA BITRITTO'} title={'IL LABORATORIO DEL MAGO PDOR'} />} />
            <Route path="/scena1" element={<Scena1/>} />
          </Routes>
        </MemoryRouter>
      )}
    </>
  );
};

export default Bitritto;
