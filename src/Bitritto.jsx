import SplashScreen from "./scenes/SplashScreen";
import Scena1 from "./scenes/Scena1";
import { MemoryRouter, Routes, Route } from "react-router";

const Bitritto = () => {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<SplashScreen location={'SOLE LUNA BITRITTO'} title={'IL LABORATORIO DEL MAGO PDOR'} />} />
        <Route path="/scena1" element={<Scena1/>} />
      </Routes>
    </MemoryRouter>
  );
};

export default Bitritto;
