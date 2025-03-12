import { useState } from "react";
import { useNavigate } from "react-router";
import Button from "@components/Button";
import letteraC from "@assets/images/Scena1/Lettera_C.webp";
import letteraO from "@assets/images/Scena1/Lettera_O.webp";

const Scena1 = () => {
  const [imageSrc, setImageSrc] = useState(letteraC);
  const [buttonVisible, setButtonVisible] = useState(true);
  const [divVisible, setDivVisible] = useState(false);
  const navigate = useNavigate();

  const openLetter = (open) => {
    //! Dal punto di vista delle performance... caricherai l'immagine solo dopo aver cliccato, causando forse problemi se connessione lenta
    // Io metterei entrambe le immagini e una diventa display none quando deve sparire così le carica entrambe (fai valutazioni con network slow 3g)
    setImageSrc(open ? letteraO : letteraC); 
    setButtonVisible(!open);
    setDivVisible(open);
  };

  //! Non deve essere possibile aprire la lettera prima che l'animazione sia finita
  //* Aggiungerei dei suoni alla lettera che arriva e al gioco che parte (vediamo dopo però)

  return (
    <section className="w-screen h-svh bg-black flex flex-col items-center justify-center bg-[url(../images/Scena1/Legno.webp)] bg-center bg-cover bg-no-repeat bg-opacity-50 gap-10">
      {buttonVisible && (
        <Button onClick={() => openLetter(true)} >Apri la lettera</Button>
      )}
      <div className="w-5/11 relative">
        <img
          src={imageSrc}
          alt="Lettera"
          className="w-full transform transition-transform duration-2000 ease-in-out"
          style={{ transform: "scale(0) rotate(0deg)" }}
          onLoad={(e) => {
            e.target.style.transform = "scale(1) rotate(360deg)";
          }}
          onClick={() => openLetter(true)}
        />
        {divVisible && (
          <>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div
                className={`absolute bg-gray-200 font-julee flex flex-col items-center justify-center p-6 gap-2 w-3/4 rounded-sm transition-opacity duration-1000 ease-in-out ${
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
            <div className="absolute bottom-10 flex justify-center items-center">
              <Button label="Chiudi lettera" onClick={() => openLetter(false)} />
              <Button label="Esamina meglio" onClick={() => {/*Deve girare con animazione la foto per mostrare filastrocca */}} />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Scena1;
