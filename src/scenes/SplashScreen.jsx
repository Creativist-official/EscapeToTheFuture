import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Button from "@components/Button";
import ampolla from "@assets/images/ampolla.png";

import ambientSound from "@assets/sounds/splashscreen/horror-lightning-strike-247744.mp3";
import startSound from "@assets/sounds/splashscreen/among-us-sound-157106.mp3";
import bubblesSound from "@assets/sounds/splashscreen/water-bubbles-257594.mp3";

const SplashScreen = ({ title, location }) => {
  const [hasRequestedFullscreen, setHasRequestedFullscreen] = useState(false);

  // Gestione audio
  // Ogni audio della scena fa parte di questo array di oggetti.
  // Ogni oggetto è composto da Nome e Playing(true/false)
  const [playing, setPlaying] = useState({
    "ambient": {
      playing: false,
    },
    "start": { 
      playing: false 
    },
    "bubbles": { 
      playing: false 
    },
  });
  const navigate = useNavigate();
  // reset localstorage
  localStorage.clear();

  useEffect(() => {
    if (hasRequestedFullscreen) return;
    // Reset playing
    setPlaying({
        "ambient": {
          player: new Audio(ambientSound),
          playing: false,
        },
        "start": { 
          player: new Audio(startSound),
          playing: false 
        },
        "bubbles": { 
          player: new Audio(bubblesSound),
          playing: false 
        },
      });

    const handleFullscreenChange = () => {
      if (document.fullscreenElement) {
        setHasRequestedFullscreen(true);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    
    // Richiedi permesso per riproduzione audio
    document.addEventListener("click", async () => {
      try {
        await document.body.requestFullscreen();
      } catch (err) {
        console.error(err.name, err.message);
      }
    });

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };


  }, [hasRequestedFullscreen]);

  return (
    <div className="w-full flex flex-col items-center justify-center gap-2 md:gap-10 h-svh bg-[url(../images/bg-splash.webp)] bg-center bg-clip-border bg-cover bg-origin-border bg-no-repeat gap-auto">
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Bottone per consentire audio */}
      <div className="absolute top-0 right-0 p-2 scale-60">
        <Button
          onClick={async () => {
            if (!playing["ambient"].playing){
              const ambient = playing["ambient"].player;
              ambient.loop = true;
              // Volume 60
              ambient.volume = 0.5;
              ambient.play();
              setPlaying((prev) => ({
                ...prev,
                "ambient": { ...prev["ambient"], playing: true }
              }));
            } else {
              const ambient = playing["ambient"].player;
              ambient.pause();
              setPlaying((prev) => ({
                ...prev,
                "ambient": { ...prev["ambient"], playing: false }
              }));
            }
            }}
          >{playing["ambient"].playing ? "Disattiva" : "Attiva"} musica</Button>
      </div>
      

          <h1 className="2xl:w-1/2 md:w-2/3 w-2/3 text-5xl md:text-7xl xl:text-8xl font-bold text-center select-none font-elite text-orange-600 z-1">
          {title}
          </h1>
          <div className="flex items-end justify-center gap-1">
          <h3 className="font-elite text-3xl md:text-3xl xl:text-6xl z-1 text-white select-none">
            {location}
          </h3>
          <img
            onClick={
            async () => {
              if (!playing["bubbles"].playing) {
              const bubbles = playing["bubbles"].player;
              bubbles.play();
              setPlaying((prev) => ({
                ...prev,
                "bubbles": { ...prev["bubbles"], playing: true }
              }));
              setTimeout(() => {
                bubbles.pause();
                setPlaying((prev) => ({
                ...prev,
                "bubbles": { ...prev["bubbles"], playing: false }
                }));
              }, 3000);
              }
            }
            }
            src={ampolla}
            alt="ampolla"
            className="select-none h-10 xl:h-16 z-1 transition-transform duration-300 ease-in-out transform hover:scale-120 animate-shake"
          />
          </div>
          <Button
          onClick={async () => {
            // Carica e riproduci il suono di inizio
            if (!playing["start"].playing) {
            const start = playing["start"].player;
            start.play();
            setPlaying((prev) => ({
              ...prev,
              "start": { ...prev["start"], playing: true }
            }));
            }
            // Fade out audio ambient
          const ambient = playing["ambient"].player;
            const fadeOutInterval = setInterval(() => {
            if (ambient.volume > 0.1) {
              ambient.volume = Math.max(0, ambient.volume - 0.1);
            } else {
              clearInterval(fadeOutInterval);
              ambient.pause();
            }
            }, 500);
          setPlaying((prev) => ({
            ...prev,
            "ambient": { ...prev["ambient"], playing: false }
          }));

          if (!hasRequestedFullscreen) {
            try {
              await document.body.requestFullscreen();
            } catch (err) {
              console.error(err.name, err.message);
            }
          }
          navigate("/scena1")
        }}
      >INIZIA</Button>
    </div>
  );
};

export default SplashScreen;
