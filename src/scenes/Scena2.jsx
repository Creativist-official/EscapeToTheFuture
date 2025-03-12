import { useEffect, useState } from "react";
import buttonArrow from "@assets/images/generic/buttonArrow.png";
import foresta from "@assets/images/Scena2/foresta.png";
import alberoMagico from "@assets/images/Scena2/alberoMagico.jpg";
import Button from "@components/Button";
import Dialogue from "../components/Dialogue";
import Confetti from "react-confetti";

const Scena2 = () => {
  const [showHint, setShowHint] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    if (isWin) {
        setConfetti(true);
      const confettiTimer = setTimeout(() => {
        setConfetti(false);
      }, 3000);

      return () => clearTimeout(confettiTimer);
    }
  }, [isWin]);

  useEffect(() => {
    const resetTimer = () => {
      if (!showHint && !isWin && !isError) {
        setShowHint(false);
        clearTimeout(timer);
        timer = setTimeout(() => {
          !isError && !isWin && setShowHint(true);
        }, 7000);
      }
    };

    let timer = setTimeout(() => {
      !isError && !isWin && setShowHint(true);
    }, 7000);

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("click", resetTimer);
    window.addEventListener("touchstart", resetTimer);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("click", resetTimer);
      window.removeEventListener("touchstart", resetTimer);
    };
  }, [showHint, isWin, isError]);

  const { innerWidth: width, innerHeight: height } = window;

  return (
    <section className="w-full h-svh flex flex-col items-center justify-center relative">
      <Button classes="absolute top-2" noAnimation>
        Trova il laboratorio
      </Button>

      {!showHint && isWin && (
        <>
          {confetti && <Confetti numberOfPieces={500} initialVelocityX={10} gravity={2}/>}
          <svg width="100" height="100" className="absolute">
            <circle cx="50" cy="50" r="40" fill="#5c5c5c75">
              <animate
                attributeName="r"
                values="40;45;40"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
          <img
            src={alberoMagico}
            alt="Albero magico"
            className="absolute w-full h-full"
          />
        </>
      )}
      <img
        src={foresta}
        alt="La foresta"
        className="select-none"
        useMap="#image-map"
      />
      <map name="image-map">
        <area
          target=""
          href="#scena2"
          alt="Albero1"
          title="Albero1"
          coords="270,807,287,552,218,459,31,407,24,223,87,69,197,23,345,0,533,6,582,18,513,247,479,352,481,405,392,590,374,725,370,793"
          shape="poly"
          onClick={() => !showHint && setIsError(true)}
        />
        <area
          target=""
          href="#scena2"
          alt="Albero2"
          title="Albero2"
          coords="633,2,583,68,535,156,530,249,491,378,530,417,615,459,740,497,810,582,827,693,842,732,886,753,1034,753,1037,653,1061,561,1110,510,1190,483,1322,436,1378,363,1407,278,1420,244,1376,132,1337,46,1303,7"
          shape="poly"
          onClick={() => !showHint && setIsWin(true)}
        />
        <area
          target=""
          href="#scena2"
          alt="Albero3"
          title="Albero3"
          coords="1485,741,1478,339,1400,302,1405,198,1329,10,1873,10,1878,212,1845,337,1622,451,1672,624,1688,741,1692,766,1488,766"
          shape="poly"
          onClick={() => !showHint && setIsError(true)}
        />
      </map>

      {!showHint ? (
        <>
          {!isError && !isWin && (
            <div>
              <img
                src={buttonArrow}
                alt="Scegli questo albero"
                className="absolute w-14 select-none left-24 lg:left-48 xl:left-72 lg:w-20 bottom-8 hover:scale-120 transition-all duration-300 animate-bounce hover:animate-shake"
                onClick={() => !showHint && setIsError(true)}
              />
              <img
                src={buttonArrow}
                alt="Scegli questo albero"
                className="absolute w-14 lg:w-20 select-none bottom-8 hover:scale-120 transition-all duration-300 animate-bounce hover:animate-shake"
                onClick={() => !showHint && setIsWin(true)}
              />
              <img
                src={buttonArrow}
                alt="Scegli questo albero"
                className="absolute w-14 right-24 select-none xl:right-72 lg:right-48 lg:w-20 bottom-8 hover:scale-120 transition-all duration-300 animate-bounce hover:animate-shake"
                onClick={() => !showHint && setIsError(true)}
              />
            </div>
          )}
        </>
      ) : (
        <Dialogue
          absolute
          classes="bottom-10"
          dialogue={{
            speaker: "Suggerimento",
            text: "Trova l'albero che tende a brillare,\nquando il sole inizia a calare.",
          }}
          onClose={() => setShowHint(false)}
        />
      )}

      {isError && (
        <Dialogue
          absolute
          classes="bottom-10"
          dialogue={{
            speaker: "Suggerimento",
            text: "Oh no! Questo albero non sembra nascondere niente di interessante.",
          }}
          onClose={() => {
            setShowHint(false);
            setIsError(false);
          }}
        />
      )}
    </section>
  );
};

export default Scena2;
