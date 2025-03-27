import { useEffect, useState } from "react";
import ImageMapper from "react-img-mapper";
import Button from "../components/Button";

import scena6A from "@assets/images/Scena6/enricoSvenuto.png";
import scena6B from "@assets/images/Scena6/magoPdor.png";
import prigione from "@assets/images/Scena6/prigione.png";
import enricoScappato from "@assets/images/Scena6/enricoScappato.png";
import cagnolino from "@assets/images/Scena6/cagnolino.png";
import borsa from "@assets/images/Scena6/borsa.png";

import Dialogue from "@components/Dialogue";
import confetti from "canvas-confetti";
import { useNavigate } from "react-router";

function itemToDialogue(itemSelected) {
  switch (itemSelected) {
    case "Martello":
      return "Provando a rompere la serratura... scatta un allarme, attirando l'attenzione di Pdor.";
    case "Ketchup":
      return "Il detective versa il ketchup su di sè fingendo una ferita. Pdor lo scopre subito.";
    case "Chiave":
      return "La chiave si spezza nella serratura, rendendo impossibile aprirla.";
    case "Invisibilità":
      return "Il detective indossa il mantello dell'invisibilità e riesce a scappare.";
  }
}

const Scena6 = () => {
  const navigate = useNavigate();
  const [hasDogFood, setHasDogFood] = useState(
    JSON.parse(localStorage.getItem("hasDogFood")) || false
  );
  const [showHint, setShowHint] = useState(false);
  const [dogClicked, setDogClicked] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showBorsa, setShowBorsa] = useState([false, false]);
  const [itemSelected, setItemSelected] = useState(null);
  const [dogAnimation, setDogAnimation] = useState(0);
  // 0: intro slide
  // 1: fine intro (salterino)
  // 2: uscita

  const [scene, setScene] = useState(0);
  // 0: enrico svenuto,
  // 1: enrico parla,
  // 2: mago pdor,
  // 3: prigione,
  // 4: enrico scappa
  // 5: cane si avvicina,
  // 6: oggetti

  const dialogues = [
    {
      speaker: "Detective",
      text: "Enrico svegliati, sono qui per salvarti!",
    },
    {
      speaker: "Enrico",
      text: "Ehm, sì, cosa?",
    },
    {
      speaker: "Mago Pdor",
      text: "Pensavi di portare via Enrico? Questo era tutto un piano… Ora sei mio prigioniero!",
    },
    {
      speaker: "Detective",
      text: "Per fortuna, Enrico riesce a scappare.",
      delay: 800,
    },
  ];

  //per coriandoli
  const defaults = {
    spread: 360,
    ticks: 50,
    gravity: 0,
    decay: 0.94,
    startVelocity: 30,
    colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"],
  };

  //Rimuovi animazione di entrata cagnolino
  useEffect(() => {
    if (scene === 4) {
      setTimeout(() => {
        setDogAnimation(1);
      }, 1500);
    }
  }, [scene]);

  //Gestione hint cagnolino salterino
  useEffect(() => {
    let hintTimeout;

    const startHintTimer = () => {
      hintTimeout = setTimeout(() => {
        setShowHint(true);
      }, 3000);
    };

    const handleUserInteraction = () => {
      clearTimeout(hintTimeout);
      setShowHint(false);
      startHintTimer();
    };

    if (scene === 4) {
      startHintTimer();
      window.addEventListener("click", handleUserInteraction);
      window.addEventListener("keydown", handleUserInteraction);
      window.addEventListener("mousemove", handleUserInteraction);
    }

    return () => {
      clearTimeout(hintTimeout);
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("keydown", handleUserInteraction);
      window.removeEventListener("mousemove", handleUserInteraction);
    };
  }, [scene]);

  //Gestione zzz zzz enrico
  useEffect(() => {
    if (scene < 4) {
      const zzzShape = confetti.shapeFromText({
        text: "Z",
        scalar: 3,
        fontFamily: "Arial",
        color: "#0B1F4A",
      });
      if (zzzShape) {
        const interval = setInterval(() => {
          confetti({
            particleCount: 1,
            shapes: [zzzShape],
            scalar: 1.5, // Slightly increased scalar for larger size
            origin: {
              x: 0.2 + Math.random() * 0.1 - 0.05,
              y: 0.7 + Math.random() * 0.1 - 0.05,
            },
            startVelocity: 10,
            ticks: 300,
            gravity: 0.01,
            drift: -0.05,
            colors: ["#0B1F4A"], // Darker blue
          });
        }, 1000);
        return () => clearInterval(interval);
      }

      return () => clearInterval(interval);
    }
  }, [scene]);

  //Gestione coriandoli e particelle
  useEffect(() => {
    if (scene == 2 || scene == 4) {
      confetti({
        ...defaults,
        particleCount: 80,
        scalar: 1.2,
        shapes: ["star"],
        decay: 0.92,
        startVelocity: 20,
      });
      confetti({
        ...defaults,
        particleCount: 10,
        scalar: 0.75,
        shapes: ["circle"],
        decay: 0.92,
        startVelocity: 15,
      });
    }

    if (scene == 3) {
      const duration = 500;
      const interval = setInterval(() => {
        confetti({
          ...defaults,
          particleCount: 50,
          origin: { x: Math.random(), y: Math.random() - 0.2 },
          scalar: 1.5,
          shapes: ["circle", "square", "star"],
          startVelocity: 50,
          spread: 360,
          colors: ["#0000FF", "#FF0000", "#800080", "#FF4500", "#1E90FF"],
        });
      }, 100);

      setTimeout(() => {
        clearInterval(interval);
      }, duration);
    }
  }, [scene]);

  return (
    <section className="w-full h-svh flex flex-col items-center justify-center relative">
      {dogAnimation == 2 && (
        <div
          className={`w-full h-full absolute z-30 animate-fade-to-white`}
        ></div>
      )}
      <img
        src={prigione}
        alt="Prigione"
        className={`w-full h-full object-contain absolute animate-slide z-10 ${
          scene < 3 ? " hidden" : ""
        }`}
        onClick={() => scene === 4 && setDogClicked(true)}
      />
      <img
        src={cagnolino}
        alt="Cagnolino"
        className={`w-full h-full object-contain absolute${
          dogAnimation == 0 ? " animate-slide-slow" : ""
        }${dogAnimation == 2 ? " animate-move-right" : ""}${
          scene < 4 ? " hidden" : ""
        }${showHint && !dogClicked ? " animate-slight-bounce" : ""}`}
      />
      <img
        src={scena6A}
        alt="Scena 6-soloEnrico"
        className={`w-full h-full object-contain${
          scene === 0 ? " animate-pulse" : ""
        }${scene >= 2 ? " hidden" : ""}`}
      />
      <img
        src={scena6B}
        alt="Scena 6-Mago"
        className={`w-full h-full object-contain${
          scene < 2 || scene === 4 ? " hidden" : ""
        }`}
      />
      <img
        src={enricoScappato}
        alt="Scena 6-EnricoScappato"
        className={`w-full h-full object-contain${
          scene !== 4 ? " hidden" : ""
        }`}
      />
      <img
        src={borsa}
        alt="Borsa oggetti"
        className="w-full h-full object-contain opacity-0 absolute -z-40"
      />

      {dialogues.map(
        (dialogue, index) =>
          index === scene && (
            <Dialogue
              key={"dialogue-" + scene}
              absolute
              classes="bottom-10"
              dialogue={dialogue}
              onClose={() => {
                setScene((prev) => prev + 1);
              }}
            />
          )
      )}

      {showBorsa[1] && (
        <>
          <Button noAnimation classes="absolute top-10 z-40">
            Scegli l'oggetto
          </Button>
          <div className="absolute z-30">
            <img
              src={borsa}
              alt="Borsa oggetti"
              className="w-full h-full object-contain absolute -z-40"
            />
            <ImageMapper
              src={borsa}
              name="Borsa porta oggetti"
              natural
              imgWidth={1920}
              parentWidth={window.innerWidth > 1920 ? 1920 : window.innerWidth}
              responsive={true}
              disabled={!showBorsa}
              areas={[
                {
                  id: "Martello",
                  shape: "poly",
                  coords: [
                    446, 712, 531, 385, 511, 380, 511, 359, 477, 354, 472, 366,
                    439, 356, 426, 349, 455, 251, 499, 258, 502, 273, 517, 273,
                    539, 275, 541, 261, 653, 293, 672, 312, 684, 324, 692, 342,
                    699, 365, 695, 383, 689, 392, 680, 373, 672, 351, 646, 334,
                    626, 331, 619, 354, 612, 383, 606, 397, 594, 397, 512, 732,
                  ],
                  fillColor: "rgba(128, 128, 128, 0.5)",
                },
                {
                  id: "Ketchup",
                  shape: "poly",
                  coords: [
                    919, 456, 911, 387, 873, 324, 870, 268, 894, 225, 889, 190,
                    884, 166, 870, 154, 879, 68, 892, 34, 1086, 36, 1106, 141,
                    1087, 168, 1079, 195, 1080, 222, 1094, 253, 1104, 278, 1101,
                    317, 1084, 337, 1067, 370, 1055, 390, 1057, 441, 1053, 463,
                    1036, 468, 938, 466,
                  ],
                  fillColor: "rgba(128, 128, 128, 0.5)",
                },
                {
                  id: "Chiave",
                  shape: "poly",
                  coords: [
                    1030, 996, 1054, 970, 1056, 792, 1076, 787, 1081, 777, 1059,
                    750, 1086, 734, 1105, 711, 1115, 673, 1112, 639, 1100, 607,
                    1055, 576, 1009, 570, 958, 582, 923, 617, 911, 665, 928,
                    716, 949, 738, 976, 758, 950, 787, 993, 789, 993, 816, 972,
                    832, 994, 861, 974, 880, 972, 904, 996, 921, 982, 938, 987,
                    961, 1018, 990,
                  ],
                  fillColor: "rgba(128, 128, 128, 0.5)",
                },
                {
                  id: "Invisibilità",
                  shape: "poly",
                  coords: [
                    1216, 799, 1220, 546, 1182, 543, 1186, 524, 1216, 521, 1186,
                    512, 1191, 499, 1186, 487, 1189, 472, 1220, 475, 1225, 383,
                    1262, 339, 1269, 289, 1247, 287, 1236, 283, 1238, 194, 1250,
                    187, 1479, 183, 1491, 200, 1487, 277, 1474, 290, 1464, 314,
                    1460, 329, 1469, 346, 1494, 370, 1504, 389, 1504, 487, 1572,
                    497, 1560, 509, 1547, 521, 1552, 534, 1549, 545, 1564, 548,
                    1554, 560, 1542, 572, 1496, 565, 1504, 793, 1487, 832, 1457,
                    849, 1406, 858, 1364, 856, 1320, 855, 1264, 855,
                  ],
                  fillColor: "rgba(128, 128, 128, 0.5)",
                },
              ]}
              onChange={(area) => {
                setItemSelected(area.id);
                setShowBorsa([false, false]);
              }}
              isMulti={false}
            />
          </div>
        </>
      )}
      {showButton && (
        <Button
          classes="absolute bottom-16"
          onClick={() => {
            setShowBorsa([true, false]);
            setShowButton(false);
          }}
        >
          Dai croccantini
        </Button>
      )}
      {showBorsa[0] && (
        <Dialogue
          absolute
          classes="bottom-10"
          dialogue={{
            speaker: "Narratore",
            type: "hint",
            text: "Il cagnolino ti ringrazia dei croccantini e ti porta una borsa con degli oggetti.",
          }}
          onClose={() => {
            setShowBorsa([true, true]);
          }}
        />
      )}
      {dogClicked && dogAnimation == 1 ? (
        hasDogFood ? (
          <Dialogue
            absolute
            classes="bottom-10"
            dialogue={{
              speaker: "Detective",
              text: "Ciao cagnolino... ti piacciono i croccantini?",
            }}
            onClose={() => {
              setShowButton(true);
            }}
          />
        ) : (
          <Dialogue
            absolute
            classes="bottom-10"
            dialogue={{
              speaker: "Detective",
              text: "Ciao cagnolino... Non ho cibo per te, mi dispiace :(",
            }}
            onClose={() => {
              setDogAnimation(2);
              setTimeout(() => {
                localStorage.setItem(
                  "gameover_reason",
                  JSON.stringify("Il cagnolino non poteva aiutarti senza cibo.")
                );
                navigate("/gameover");
              }, 2000);
            }}
          />
        )
      ) : null}
      {!showBorsa[1] && itemSelected != null && (
        <Dialogue
          absolute
          classes="bottom-10"
          dialogue={{
            speaker: "Narratore",
            type: "hint",
            text: itemToDialogue(itemSelected),
          }}
          onClose={() => {
            if (itemSelected === "Invisibilità") {
              navigate("/scena7");
            } else {
              localStorage.setItem(
                "gameover_reason",
                JSON.stringify(itemToDialogue(itemSelected))
              );
              navigate("/gameover");
            }
          }}
        />
      )}
    </section>
  );
};

export default Scena6;
