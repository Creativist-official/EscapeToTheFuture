import Button from "../components/Button";
import letteraC from "@assets/images/Lettera_C.webp";
import { useState } from "react";
import letteraO from "@assets/images/Lettera_O.webp";

const Scena1 = () => {
  const [imageSrc, setImageSrc] = useState(letteraC);
  const [buttonVisible, setButtonVisible] = useState(true);
  const [divVisible, setDivVisible] = useState(false);

  const handleClick = () => {
    setImageSrc(letteraO);
    setButtonVisible(false);
    setDivVisible(true);
  };

  return (
    <div className="w-screen h-svh bg-black flex flex-col items-center justify-center bg-[url(../images/Legno.webp)] bg-center bg-cover bg-no-repeat bg-opacity-50 gap-10">
      {buttonVisible && (
        <Button label="Apri la lettera" onClick={handleClick} />
      )}
      <div className="w-5/11 relative">
        <img
          src={imageSrc}
          alt="Lettera"
          className="w-full mb-40 transform transition-transform duration-2000 ease-in-out"
          style={{ transform: "scale(0) rotate(0deg)" }}
          onLoad={(e) => {
            e.target.style.transform = "scale(1) rotate(360deg)";
          }}
          onClick={handleClick}
        />
        {divVisible && (
          <>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div
                className={`absolute bg-gray-200 font-schibsted flex flex-col items-center justify-center p-6 gap-2 w-3/4 rounded-sm transition-opacity duration-1000 ease-in-out ${
                  divVisible ? "opacity-100" : "opacity-0"
                }`}
              >
                <h3 className="xl:text-2xl text-sm font-bold text-black text-center">
                  Ciao, ti scrivo di nascosto questa lettera per aiutarmi a
                  liberare Enrico.
                </h3>
                <p className="xl:text-xl text-xs font-semibold text-blue-800 text-center">
                  Troverai tutte le indicazioni necessarie per trovare il
                  laboratorio dove è prigioniero.
                </p>
              </div>
            </div>
            <div className="absolute bottom-40 flex justify-center items-center">
              {/* Pulsante "Chiudi lettera" a sinistra */}
              <Button label="Chiudi lettera" onClick={() => {}} />
              {/* Pulsante "Esamina meglio" a destra */}
              <Button label="Esamina meglio" onClick={() => {}} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Scena1;
