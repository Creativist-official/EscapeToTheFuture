import { useEffect, useState } from "react";
import { HashRouter, Routes, Route } from "react-router";
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
        <HashRouter>
          <Routes>
            <Route
              path="/"
              element={
                <div className="h-screen flex items-center justify-center text-white">
                  <h1 className="text-3xl text-white">Hello, Bitritto!</h1>
                </div>
              }
            />
            <Route path="/scena1" element={<Scena1/>} />
          </Routes>
        </HashRouter>
      )}
    </>
  );
};

export default Bitritto;
