import { useState } from "react";
import { useNavigate } from "react-router";
import Button from "@components/Button";
import letteraC from "@assets/images/Scena1/Lettera_C.webp";
import letteraO from "@assets/images/Scena1/Lettera_O.webp";
import Card from "@components/Card";

const Scena1 = () => {
  const [buttonVisible, setButtonVisible] = useState(true);
  const [divVisible, setDivVisible] = useState(false);
  const [animationFinished, setAnimationFinished] = useState(false);
  const [shake, setShake] = useState(false);
  const [examined, setExamined] = useState(false);
  const navigate = useNavigate();

  const openLetter = (open) => {
    setButtonVisible(!open);
    setDivVisible(open);
  };

  const handleImageLoad = (e) => {
    e.target.style.transform = "scale(1) rotate(360deg)";
    setTimeout(() => {
      setAnimationFinished(true);
    }, 2000); // Duration of the animation
  };

  const handleShake = () => {
    setShake(true);
    setTimeout(() => {
      setExamined(true);
    },); // Duration of the shake animation
  };

  const goToForest = () => {
    navigate("/Scena2");
  };

  return (
    <section className="w-screen h-svh bg-black flex flex-col items-center justify-center bg-[url(../images/Legno.webp)] bg-center bg-cover bg-no-repeat bg-opacity-50 gap-14">
      {buttonVisible && (
        <Button
          label="Apri la lettera"
          onClick={() => animationFinished && openLetter(true)}
          className={`${
            !animationFinished ? "pointer-events-none opacity-50" : ""
          }`}
        />
      )}

      <div className="w-5/11 relative">
        <img
          src={letteraC}
          alt="Lettera"
          className={`w-full transform transition-transform duration-2000 ease-in-out ${
            divVisible ? "hidden" : "block"
          }`}
          style={{ transform: "scale(0) rotate(0deg)" }}
          onLoad={handleImageLoad}
          onClick={() => animationFinished && openLetter(true)}
        />
        <img
          src={letteraO}
          alt="Lettera Aperta"
          className={`w-full transform transition-transform duration-2000 ease-in-out ${
            divVisible ? "block" : "hidden"
          }`}
          style={{ transform: "scale(0) rotate(0deg)" }}
          onLoad={handleImageLoad}
          onClick={() => animationFinished && openLetter(false)}
        />

        {divVisible && (
          <>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div
                className={`select-none absolute bg-gray-200 font-julee flex flex-col items-center justify-center px-6 py-18 gap-2 w-3/4 rounded-sm transition-opacity duration-1000 ease-in-out ${
                  divVisible ? "opacity-100" : "opacity-0"
                } `}
                style={{ zIndex: 10 }}
              >
                <h3 className="xl:text-2xl text-sm font-bold text-black text-center">
                  Ciao, ti scrivo di nascosto questa lettera per aiutarmi a
                  liberare Enrico.
                </h3>
                <p className="xl:text-xl text-xs font-semibold text-blue-800 text-center">
                  Troverai tutte le indicazioni necessarie per trovare il
                  laboratorio dove è prigioniero.
                </p>
                <div className={`absolute w-full left-60 bottom-10 hover:cursor-pointer xl:left-120 xl:bottom-20 ${examined ? "normal-shake" : ""}`}>
                  <Card />
                </div>
              </div>
            </div>

            <div className="absolute bottom-10 flex justify-center items-center">
              <Button
                label="Chiudi lettera"
                onClick={() => openLetter(false)}
              />
              <Button
                label={examined ? "Vai alla foresta" : "Esamina meglio"}
                onClick={examined ? goToForest : handleShake}
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Scena1;
