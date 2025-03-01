import SplashScreen from "@components/SplashScreen";
import { MemoryRouter, Routes, Route } from "react-router";

const Bitritto = () => {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<SplashScreen location={'SOLE LUNA BITRITTO'} title={'IL LABORATORIO DEL MAGO PDOR'} />} />

      </Routes>
    </MemoryRouter>
  );
};

export default Bitritto;
