import { useEffect, useState } from "react";
import { HashRouter, Routes, Route } from "react-router";
import { Application } from "@pixi/react";
import RotatePhone from "@components/RotatePhone";

import Scena1 from "@scenes/Scena1";

const Bitritto = () => {
  const [isPortrait, setIsPortrait] = useState(
    window.matchMedia("(orientation: portrait)").matches
  );

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
        <Application resizeTo={window}>
          <HashRouter>
            <Routes>
              <Route path="/" element={null} />
              <Route path="/scena1" element={<Scena1 />} />
            </Routes>
          </HashRouter>
        </Application>
      )}
    </>
  );
};

export default Bitritto;
